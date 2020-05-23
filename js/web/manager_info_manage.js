$(function() {
	/*回收员数据分页显示*/
	layui.use('table', function() {
		var table = layui.table;

		table.render({
			elem: '#manager_info_manager',
			height: 'full-50',
			url: 'http://localhost:9901/manager/getAllManagerInfo/2',
			page: true ,
			loading: true,
			text: {
				none: '暂无相关数据'
			},
			cellMinWidth: 80,
			cols: [
				[{
					field: 'managerId',
					width: '6%',
					title: 'ID',
					sort: true
				},{
					field: 'managerName',
					width: '10%',
					title: '姓名',
					sort: true
				}, {
					field: 'phone',
					width: '10%',
					title: '联系电话',
				}, {
					field: 'email',
					width: '15%',
					title: '邮箱',
				}, {
					field: 'salary',
					width: '10%',
					title: '工资',
					sort: true
				}, {
					field: 'address',
					width: '13%',
					title: '地址'
				}, {
					field: 'credit',
					width: '12%',
					title: '信誉评分',
					sort: true
				},/* {
					field: 'createTime',
					width: '13%',
					title: '创建时间',
					templet: '#createTime'
				}, {
					field: 'updateTime',
					width: '13%',
					title: '更新时间',
					templet: '#updateTime'
				},*/ {
					field: 'roleId',
					width: '10%',
					title: '身份',
					templet: '#status'
				}, {
					fixed: 'right',
					width: '14%',
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
		table.on('tool(manager_info_manager_filter)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
			//获得当前行数据
			var data = obj.data;
			layEvent = obj.event; //获得 lay-event 对应的值
			if(layEvent === 'manager_lock') {
				//锁定回收员
				layer.confirm('您确定要冻结此管理员吗？', {icon: 3, title:'冻结管理员'}, function(index){  		
					$.get("http://localhost:9901/manager/updateManager/2/" + data.managerId, function(result) {	
						if(result.status == 200) {
							layer.msg('已冻结', {
								icon: 1,
							  	time: 2000 
							}, 	function(){
							  window.location.reload()
							});
						} else {
							layer.msg(result.msg, {
								icon: 2,
							  	time: 2000 
							}, 	function(){
							  window.location.reload()
							});
						}						
					})				
				});		
			} else if(layEvent === 'manager_unlock') {
				//解锁回收员
				layer.confirm('您确定要恢复此管理员的状态吗？', {icon: 3, title:'恢复管理员'}, function(index){						
					$.get("http://localhost:9901/manager/updateManager/1/" + data.managerId, function(result) {	
						if(result.status == 200) {
							layer.msg('已恢复', {
								icon: 1,
							  	time: 2000 
							}, 	function(){
							  window.location.reload()
							});
						} else {
							layer.msg(result.msg, {
								icon: 2,
							  	time: 2000 
							}, 	function(){
							  window.location.reload()
							});
						}						
					})
				});	
			} else if(layEvent === 'manager_delete') {
				//删除回收员
				layer.confirm('您确定要删除此管理员吗？', {icon: 3, title:'管理回收员'}, function(index){						
					$.get("http://localhost:9901/manager/deleteManager/" + data.managerId, function(result) {	
						if(result.status == 200) {
							layer.msg('已删除', {
								icon: 1,
							  	time: 2000 
							}, 	function(){
							  window.location.reload()
							});
						} else {
							layer.msg(result.msg, {
								icon: 2,
							  	time: 2000 
							}, 	function(){
							  window.location.reload()
							});
						}						
					})
				});	
			} else if(layEvent === 'manager_update') {
				//取消管理员身份
				layer.confirm('您确定将此取消此管理员的身份吗？', {icon: 3, title:'取消管理员'}, function(index){						
					$.get("http://localhost:9901/manager/updateManagerPosition/3/" + data.managerId, function(result) {	
						if(result.status == 200) {
							layer.msg('取消成功', {
								icon: 1,
							  	time: 2000 
							}, 	function(){
							  window.location.reload()
							});
						} else {
							layer.msg(result.msg, {
								icon: 2,
							  	time: 2000 
							}, 	function(){
							  window.location.reload()
							});
						}						
					})
				});	
			}
		});
		
	});
});
