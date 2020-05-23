$(function() {
	//获取参数id
	var a = GetRequest();
	var id = a['id'];

	//获取轮播图详细信息
	viewCarouselDetailById(id);

});

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

//查看轮播图详细信息
function viewCarouselDetailById(id) {
	$.get("http://192.168.1.119:9911/cms/viewCarouselDetail/" + id,
		function(data, status) {
			//时间格式化
			data.createTime = timestampToTime(data.createTime);
			new Vue({
				el: '#app', //元素
				data: {
					info: data
				}
			})
		}
	)
}

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
