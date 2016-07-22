
$(function(){
	/*------------登录用户验证--------------*/
	$('#userName').blur(function(){
		var name = $('#userName').val();
		var reg = /(\d){1,11}/;
		var regEmail = /[0-9a-zA-Z][\w\-\.]*@[a-zA-Z\d]+(\.[a-zA-Z]{2,3})+/;
		if(name == ''){
			alert('用户名不能有空');
			return false;
		}else if(!reg.test(name) && !regEmail.test(name)){
			alert('用户名不符合要求');
			return false;
		}	
	})
	/*------------登录密码验证--------------*/
	$('#password').blur(function(){
		var password = $('#password').val();
		var reg = /(\w|-){6,20}/
		if(password== ''){
			alert('用户名不能为空');
			return false;
		}else if(!reg.test(password)){
			alert('用户名不符合要求');
			return false;
		}
	})
	/*-----------------登录选择是否记住密码实现免登陆 提交数据----------------------*/
		//绑定提交按钮实现7天免登录，即记住密码

		$('#submitBtn').on('click',function(e){

				//获取输入框的值
				var name = $('#userName').val();
				var password = $('#password').val();
				var cookie = document.cookie;
				if(cookie){
					var arr = cookie.split('; ');
					for(var i = 0;i<arr.length;i++){
						var arr2 = arr[i].split('=');
						if(arr2[0]=='name' ){
							if(arr2[1] != $('#userName').val()){
								e.preventDefault ? e.preventDefault() : retrunValue = false;
								return;
							}
						}else if(arr2[0]=='password'){
							if(arr2[1] != $('#password').val()){console.log($('#password').val());
								e.preventDefault ? e.preventDefault() : retrunValue = false;
								return;
							}
						}
					}
					$('form').submit();
				}		
				//1）判断账号是否输入正确
				if($('#checkbox')[0].checked){
					//确定cookie的过去时间
					var now = new Date();
					now.setFullYear(now.getFullYear()+10);

					addCookie('name',name,now);
					addCookie('password',password,now);
					//document.cookie = addCookie(name,value,now);
					//document.cookie = 'name=' + name + ';expires=' + now;
					//document.cookie = 'password=' + psw + ';expires=' + now;
				}

				
		});
			//判断cookie是否有值，重新登陆时实现自动登陆

			var cookie = document.cookie;
			if(cookie){
				var arr = cookie.split('; ');
				for(var i = 0;i<arr.length;i++){
					var arr2 = arr[i].split('=');
					if(arr2[0]=='name'){
						
						$('#userName').val();
					}else if(arr2[0]=='password'){
						
						$('#password').val(arr2[1]);
					}
				}
				//$('form').submit();
			}		
})