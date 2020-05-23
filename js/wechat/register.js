$('#ks_button').click(function() {
	
	var jqxhr = $.post('http://wx.monkeypaixiaoxin.cn/user/register', $('#registerForm').serialize(), function(data) {
		
		if(data.status == 200) {
			alert('注册成功！');
			window.location.href = 'register_success.html';
		} else {
			alert('网络繁忙！！');
		}
				
	}).error(function () {
		window.location.href = 'register_success.html';
	});
	
});
