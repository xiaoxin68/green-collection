//打开字滑入效果
window.onload = function(){
	$(".connect p").eq(0).animate({"left":"0%"}, 600);
	$(".connect p").eq(1).animate({"left":"0%"}, 400);
};
//jquery.validate表单验证
$(document).ready(function(){
	//登陆表单验证
	$("#loginForm").validate({
		rules:{
			username:{
				required:true,//必填
				minlength:3, //最少6个字符
				maxlength:32,//最多20个字符
			},
			password:{
				required:true,
				minlength:3, 
				maxlength:32,
			},
		},
		//错误信息提示
		messages:{
			username:{
				required:"必须填写用户名",
				minlength:"用户名至少为3个字符",
				maxlength:"用户名至多为32个字符",
				remote: "用户名已存在",
			},
			password:{
				required:"必须填写密码",
				minlength:"密码至少为3个字符",
				maxlength:"密码至多为32个字符",
			},
		},

	});
	
	$("#registerForm").validate({
		rules:{
			username:{
				required:true,//必填
				minlength:3, //最少6个字符
				maxlength:32,//最多20个字符
				remote:{
					url:"http://kouss.com/demo/Sharelink/remote.json",//用户名重复检查，别跨域调用
					type:"post",
				},
			},
			nickname:{
				required:true,//必填
				minlength:3, //最少6个字符
				maxlength:32//最多20个字符
			},
			password:{
				required:true,
				minlength:3, 
				maxlength:32,
			},
			email:{
				required:true,
				email:true,
			},
			confirm_password:{
				required:true,
				minlength:3,
				equalTo:'.password'
			},
			phone:{
				required:true,
				phone:true,//自定义的规则
				digits:true,//整数
			},
		},
		//错误信息提示
		messages:{
			username:{
				required:"必须填写用户名",
				minlength:"用户名至少为3个字符",
				maxlength:"用户名至多为32个字符",
				remote: "用户名已存在",
			},
			nickname:{
				required:"必须填写昵称",
				minlength:"昵称至少为3个字符",
				maxlength:"昵称至多为32个字符",
			},
			password:{
				required:"必须填写密码",
				minlength:"密码至少为3个字符",
				maxlength:"密码至多为32个字符",
			},
			email:{
				required:"请输入邮箱地址",
				email: "请输入正确的email地址"
			},
			confirm_password:{
				required: "请再次输入密码",
				minlength: "确认密码不能少于3个字符",
				equalTo: "两次输入密码不一致",//与另一个元素相同
			},
			phone:{
				required:"请输入手机号码",
				digits:"请输入正确的手机号码",
			}
		
		},
		
	});
	//添加自定义验证规则
	jQuery.validator.addMethod("phone", function(value, element) { 
		var length = value.length; 
		var phone = /^[1][3,4,5,7,8][0-9]{9}$/
		return this.optional(element) || (length == 11 && phone.test(value)); 
	}, "手机号码格式错误"); 
});

