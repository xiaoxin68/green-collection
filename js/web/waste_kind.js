$(function() {
	/*轮播数据分页显示*/
	layui.use('table', function() {
		var table = layui.table;

		table.render({
			elem: '#garbage',
			height: 500,
			url: 'http://192.168.1.142:9000/garbage/queryGarbageList' //数据接口
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
					width: '15%',
					title: '废品ID',
					sort: true
				}, {
					field: 'garbagename',
					width: '15%',
					title: '废品名称',
					sort: true
				}, {
					field: 'price',
					width: '10%',
					title: '废品价格',
					sort: true
				}, {
					field: 'description',
					width: '40%',
					title: '描述',
					minWidth: 200
				}, {
					fixed: 'right',
					width: '20%',
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
			limits: [10, 15, 20, 25, 50]
		});

		//监听工具条
		table.on('tool(garbage_filter)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
			var data = obj.data //获得当前行数据
				,
				layEvent = obj.event; //获得 lay-event 对应的值
			if(layEvent === 'detail') {
					window.location.href="../web/waste_detail.html?id="+data.id;
			}else if(layEvent === 'del') {
				layer.confirm('真的删除行么', function(index) {
					obj.del(); //删除对应行（tr）的DOM结构
					delGarbageById(data.id);
					layer.close(index);
				});
			}
		});

		//删除记录
		function delGarbageById(id) {
			$.get("http://192.168.1.142:9000/garbage/delGarbageById/" + id,
				function(data, status) {
					layer.msg('删除成功');
				});
		}
	
	});
});
