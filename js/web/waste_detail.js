$(function() {
	//获取参数id
	var s=location.search.substring(1);
	var myArray=new Array();
	myArray=s.split("=");
	var id=myArray[1];
//	alert(id);
	viewGarbageDetailById(id);

});


//查看通知详细信息
function viewGarbageDetailById(id) {
	$.get("http://192.168.1.142:9000/garbage/viewGarbageDetail/" + id,
		function(data, status) {	
			new Vue({
				el: '#garbageimg', //元素
				console.log(data);
				data: {
					garbage: data.photopath
				}
			})
			new Vue({
				el: '#garbageid', //元素
				data: {
					garbage: data
				}
			})
			new Vue({
				el: '#garbagename', //元素
				data: {
					garbage: data
				}
			})
			new Vue({
				el: '#garbageprice', //元素
				data: {
					garbage: data
				}
			})
			new Vue({
				el: '#garbagedescription', //元素
				data: {
					garbage: data
				}
			})
			
		}
	)
}
