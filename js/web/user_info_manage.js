$(function() {
	/*社区用户数据分页显示*/
	layui.use('table', function() {
		var table = layui.table;

		table.render({
			elem: '#user_info_manager',
			height: 'full-50',
			url: 'http://localhost:9901/user/getAllUserInfo',
			page: true ,
			loading: true,
			text: {
				none: '暂无相关数据'
			},
			cellMinWidth: 80,
			cols: [
				[{
					field: 'username',
					width: '10%',
					title: '用户名',
					sort: true
				}, {
					field: 'nickname',
					width: '10%',
					title: '昵称',
					sort: true
				}, {
					field: 'email',
					width: '13%',
					title: '邮箱'
				}, {
					field: 'phone',
					width: '12%',
					title: '电话'
				}, {
					field: 'address',
					width: '10%',
					title: '地址',
					minWidth: 100
				}, {
					field: 'createTime',
					width: '13%',
					title: '创建时间',
					templet: '#createTime'
				}, {
					field: 'updateTime',
					width: '13%',
					title: '更新时间',
					templet: '#updateTime'
				}, {
					field: 'isLocked',
					width: '10%',
					title: '当前状态',
					templet: '#status'
				}, {
					fixed: 'right',
					width: '9%',
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
		table.on('tool(user_info_manager_filter)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
			//获得当前行数据
			var data = obj.data;
			layEvent = obj.event; //获得 lay-event 对应的值
			if(layEvent === 'user_lock') {
				//锁定用户
				layer.confirm('您确定要锁定此用户吗？', {icon: 3, title:'锁定用户'}, function(index){  		
					$.get("http://localhost:9901/user/lockUser/2/" + data.username, function(result) {	
						if(result.status == 200) {
							layer.msg('已锁定', {
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
			} else if(layEvent === 'user_unlock') {
				//解锁用户
				layer.confirm('您确定要解锁此用户吗？', {icon: 3, title:'解锁用户'}, function(index){		
					$.get("http://localhost:9901/user/lockUser/1/" + data.username, function(result) {			
						if(result.status == 200) {
							layer.msg('已解锁', {
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


		
<!--时间格式化-->
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

