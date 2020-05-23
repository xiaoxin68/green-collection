$(function(){
	//获取参数id
	var a = GetRequest();
	page = a['page'];
	size = a['size'];
	//初始化页面数据
	queryNews(page,size);
})

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

//获取指定页数指定条数的新闻数据
function queryNews(page,size){
	
	count = 0;
	$.get("http://192.168.1.119:9911/cms/queryNews?page="+page+"&size="+size,
		function(data, status) {
			$('#count').val(data.count);
			//时间格式化
			for (var i =0;i<data.data.length;i++) {
				data.data[i].createTime = timestampToTime(data.data[i].createTime);
				data.data[i].content = data.data[i].content.slice(0,70)+"...";
			}
			new Vue({
				el: '#news', //元素
				data: {
					info: data.data
				}
			})
		}
	)
}

//根据id查看新闻详情
function viewNewsDetailById(id){
	window.location.href="../../web/content_news_detail.html?id="+id;
}

//上一页
$('.z_left').click(function(){
	if(page == 1){
		alert("当前已经是第一页了！！！");
		//layer.alert('当前已经是第一页了!!!');
		return false;
	}else{
		page--;
		window.location.href="content_news.html?page="+page+"&size="+size;
	}
})

//下一页
$('.z_right').click(function(){
	if(page == (Math.ceil($("#count").val()/size))){
		alert("当前已经是最后一页了！！！");
		//layer.msg('当前已经是最后一页了!!!');
		return false;
	}else{
		page++;
		window.location.href="content_news.html?page="+page+"&size="+size;
	}
})

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