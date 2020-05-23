$(function() {
	/*轮播数据分页显示*/
	layui.use('table', function() {
		var table = layui.table;

		table.render({
			elem: '#content_lbt',
			height: 500
				//,url: 'data/content_lbt.json' //数据接口
				,
			url: 'http://192.168.1.119:9911/cms/queryCarouselList' //数据接口
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
					field: 'id',
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
					width: '15%',
					title: '上传者姓名'
				}, {
					field: 'description',
					width: '33%',
					title: '描述',
					minWidth: 200
				}/*, {
					field: 'photoPath',
					width: '10%',
					title: '图片',
					minWidth: 100
				}*/, {
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
		table.on('tool(content_lbt_filter)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
			var data = obj.data //获得当前行数据
				,
				layEvent = obj.event; //获得 lay-event 对应的值
			if(layEvent === 'detail') {
				window.location.href="../../html/web/content_lbt_detail.html?id="+data.id;
			} else if(layEvent === 'del') {
				layer.confirm('真的删除行么', function(index) {
					obj.del(); //删除对应行（tr）的DOM结构
					delCarouselById(data.id);
					layer.close(index);
				});
			}
		});

		//删除记录
		function delCarouselById(id) {
			$.get("http://192.168.1.119:9911/cms/delCarousel/" + id,
				function(data, status) {
					layer.msg('删除成功');
				});
		}
	});
});

//图片上传预览    IE是用了滤镜。
function previewImage(file) {
	var MAXWIDTH = 90;
	var MAXHEIGHT = 90;
	var div = document.getElementById('preview');
	div.innerHTML = '<img id=imghead onclick=$("#previewImg").click()>';
	var img = document.getElementById('imghead');
	img.onload = function() {
		var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
		img.width = rect.width;
		img.height = rect.height;
		//           img.style.marginLeft = rect.left+'px';
		img.style.marginTop = rect.top + 'px';
	}
	var reader = new FileReader();
	reader.onload = function(evt) {
		img.src = evt.target.result;
	}
	reader.readAsDataURL(file.files[0]);
}
//图片上传
function clacImgZoomParam(maxWidth, maxHeight, width, height) {
	var param = {
		top: 0,
		left: 0,
		width: width,
		height: height
	};
	if(width > maxWidth || height > maxHeight) {
		rateWidth = width / maxWidth;
		rateHeight = height / maxHeight;

		if(rateWidth > rateHeight) {
			param.width = maxWidth;
			param.height = Math.round(height / rateWidth);
		} else {
			param.width = Math.round(width / rateHeight);
			param.height = maxHeight;
		}
	}
	param.left = Math.round((maxWidth - param.width) / 2);
	param.top = Math.round((maxHeight - param.height) / 2);
	return param;
}

//添加
$("#z_button").click(function() {
	//页面层
	layer.open({
		type: 2,
		title: "添加信息",
		skin: 'layui-layer-rim', //加上边框
		area: ['500px', '380px'], //宽高
		content: ['./content_lbt_add.html', 'no']
	});
});

//表单提交
$("#z_submit").click(function() {
	var options = {
		type: 'post',
		url: 'http://192.168.1.119:9911/cms/addCarousel',
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
	var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}