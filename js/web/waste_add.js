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
