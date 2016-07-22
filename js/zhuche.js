$(function(){
	/*------------注册用户名验证--------------*/
	$('#userName').blur(function(){
		var name = $('#userName').val();
		var reg = /(\d){1,11}/;
		if(name== ''){
			alert('用户名不能有空');
			return false;
		}else if(!reg.test(name)){
			alert('用户名不符合要求');
			return false;
		}	
	})
	/*------------注册密码验证--------------*/
	$('#passWord').blur(function(){//console.log(11);
		var password = $('#password').val();
		var reg = /(\w|-){6,20}/
		if(password == ''){
			alert('用户名不能为空');
			return false;
		}else if(!reg.test(password)){
			alert('用户名不符合要求');
			return false;
		}
	})
		/*------------获取验证码-------------*/
		$(".btns").on("click",function(){
			var arr = '0123456789abcdefghijklmnopqrstuvwxyz';
			var randomNum = '';
			for(var i=0;i<4;i++){
				var index = parseInt(Math.random()*arr.length);
				randomNum += arr[index];
			}
			$(".duanzm").val(randomNum );
				
		})
	
	/*-----------------保存注册信息到临时cookie  提交数据----------------------*/
			$('#submit_btn').on('click',function(){
				//获取输入框的值
				var name = $('#userName').val();console.log(name)
				var password = $('#passWord').val();console.log(password)
				addCookie('name',name);
				addCookie('password',password);
				//document.cookie = addCookie(name,value,now);
				//document.cookie = 'name=' + name + ';expires=' + now;
				//document.cookie = 'password=' + psw + ';expires=' + now;
				$('form').submit();
			});	
			
})