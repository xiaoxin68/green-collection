$(function() {
	layui.use('table', function() {
		var table = layui.table;

		table.render({
			elem: '#content_announce',
			height: 500,
			url: 'http://192.168.1.119:9911/cms/queryAnnounceList' //数据接口
				,
			page: true //开启分页
				,
			loading: true,
			text: {
				none: '暂无相关数据'
			} //默认：无数据。注：该属性为 layui 2.2.5 开始新增
			,
			cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
				,
			cols: [
				[{
					field: 'announceId',
					width: '9%',
					title: 'ID',
					sort: true
				}, {
					field: 'posterId',
					width: '10%',
					title: '上传者ID',
					sort: true
				}, {
					field: 'posterName',
					width: '10%',
					title: '上传者'
				}, {
					field: 'announceTitle',
					width: '18%',
					title: '标题',
					minWidth: 200
				}, {
					field: 'announceContent',
					width: '20%',
					title: '内容',
					minWidth: 100
				}, {
					field: 'createTime',
					width: '17%',
					title: '上传时间',
					minWidth: 100,
					templet: '#createTimeTemplate'
				}, {
					fixed: 'right',
					width: '15%',
					align: 'center',
					title: '操作',
					toolbar: '#barDemo'
				}]
			],
			request: {
				pageName: 'page',
				limitName: 'size'
			},
			limit: 10,
			limits: [10, 20, 30, 40, 50]
		});

		//监听工具条
		table.on('tool(content_announce_filter)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
			var data = obj.data //获得当前行数据
				,
				layEvent = obj.event; //获得 lay-event 对应的值
			if(layEvent === 'detail') {
				//layer.msg('查看操作');
				window.location.href="../../html/web/content_announce_detail.html?id="+data.announceId;
			} else if(layEvent === 'del') {
				layer.confirm('真的删除行么', function(index) {
					obj.del(); //删除对应行（tr）的DOM结构
					delAnnouncelById(data.announceId);
					layer.close(index);
				});
			}
		});

		//删除通知记录
		function delAnnouncelById(id) {
			$.get("http://192.168.1.119:9911/cms/delAnnounce/" + id,
				function(data, status) {
					layer.msg('删除成功');
				});
		}

	});
})

//添加
$("#z_button").click(function() {
	//页面层
	layer.open({
		type: 2,
		title: "发布通知公告",
		skin: 'layui-layer-rim', //加上边框
		area: ['500px', '280px'], //宽高
		content: ['./content_announce_add.html', 'no']
	});
});

//表单提交
$("#z_submit").click(function() {
	var options = {
		type: 'post',
		url: 'http://192.168.1.119:9911/cms/addAnnounce',
		success: function(ret) {
			layui.layer.msg('添加成功！！');
			setTimeout("window.parent.location.reload()", 1000);
		},
		error: function(ret) {
			layer.msg('添加失败，请确认信息');
		}
	};

	$('#myForm').ajaxSubmit(options);
});


//时间格式化
function timestampToTime(timestamp) {
	var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	Y = date.getFullYear() + '-';
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	D = date.getDate() + ' ';
	h = date.getHours() + ':';
	m = date.getMinutes() + ':';
	s = date.getSeconds();
	return Y + M + D + h + m + s;
}