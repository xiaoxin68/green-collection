$(function() {
	doInit();
})

function doInit() {
	var params = GetRequest();
	var validate = params['validate'];

	//获取登陆者的信息
	getUserInfo(validate);
}


//获取页面传递参数
function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}


//获取登陆者的信息
function getUserInfo(validate) {
	$.get("http://localhost:9901/manager/doValidate/" + validate,
		function(data, status) {
			if(data.status == 200) {
				var identity;
				var roleId = data.data.roleId;
				if (roleId == 1) {
					identity = '超级管理员';
				} else if (roleId == 2) {
					identity = '管理员';
				} else if (roleId == 3) {
					identity = '回收员';
				}
				new Vue({
					el: '#user_info', //元素
					data: {
						info: data.data,
						position: identity
					}
				})
			} else {
				window.location.href = 'login_web.html';
			}
		}
	)	
}


//注销登录
function logout() {
	
	layer.confirm('您确定要退出吗？', {icon: 3, title:'退出登录'}, function(index){	
		var params = GetRequest();
		var validate = params['validate'];	
		$.get("http://localhost:9901/manager/logout/" + validate ,
			function(data, status) {
				if(data.status == 200) {		
					window.location.href = 'login_web.html';
				} else {
					alert("网络繁忙！！");
				}
			}
		)		
	});	
}
