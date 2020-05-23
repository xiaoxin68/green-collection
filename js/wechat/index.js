$(function() {
	//获取轮播信息
	queryUpdatedCarousel(5);
	
	/*轮播图*/
	layui.use('carousel', function() {
		var carousel = layui.carousel;
		//建造实例
		carousel.render({
			elem: '#lbt'
			,width: '100%' //设置容器宽度
			,height: '200px'
			,interval: 4000
			,arrow: 'always' //始终显示箭头
			,anim: 'default' //切换动画方式
			,autoplay: true
			,arrow: 'always'
		});
	});
	
	
	//查询通知信息
	queryUpdatedAnnounce(3);
	
	
	/*通知*/
	layui.use('carousel', function() {
		var carousel = layui.carousel;
		//建造实例
		carousel.render({
			elem: '#news'
			,width: '100%' //设置容器宽度
			,height: '40px'
			,interval: 3000
			,arrow: 'always' //始终显示箭头
			,anim: 'updown' //切换动画方式
			,autoplay: true
			,arrow: 'none'
		});
	});
})

//获取轮播信息
function queryUpdatedCarousel(size){
	$.get("http://192.168.1.119:9911/cms/queryUpdatedCarousel/" + size,
		function(data, status) {
			new Vue({
				el: '#lbt', //元素
				data: {
					info: data.data
				}
			})
		}
	)
}

//查看相许轮播信息
function viewCarouselDetailById(id) {
	window.location.href="../../html/web/content_lbt_detail.html?id="+id;
}

//查询新闻记录
/*function queryUpdatedNews(size){
	$.get("http://192.168.1.119:9911/cms/queryUpdatedNews/" + size,
		function(data, status) {
			new Vue({
				el: '#lbt', //元素
				data: {
					info: data.data
				}
			})
		}
	)
}
*/

//获取通知信息
function queryUpdatedAnnounce(size){
	$.get("http://192.168.1.119:9911/cms/queryUpdatedAnnounce/" + size,
		function(data, status) {
			for (var i =0;i<data.data.length;i++) {
				data.data[i].createTime = timestampToTime(data.data[i].createTime);
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

//查看通知详细信息
function viewNewsDetailById(id) {
	window.location.href="../../html/web/content_announce_detail.html?id="+id;
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