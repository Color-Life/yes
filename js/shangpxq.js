$(function(){
	// nav_top部分
	var $lis = $('#top_nav .sub_nav');
	//鼠标滑过
	$lis.on('mouseenter',function(){
		$(this).children('span').addClass('active');
		$(this).children('div').css('display','block');
	//	console.log()
		//鼠标划出
	}).mouseleave(function(){
		$(this).children('span').removeClass('active');
		$(this).children('div').css('display','none');
	});
	//购买块的划过显示，离开隐藏
	$('.promotion').on("mouseenter",function(){
		$(".more_info").css("display","block")
	}).mouseleave(function(){
		$('.more_info').css("display","none")
	})
	$('.promotion_info').on("mouseenter",function(){
		$(".more_infos").css("display","block")
	}).mouseleave(function(){
		$(".more_infos").css("display","none")
	})
	//购物车滑过显示，离开影藏
	$('#sbv_gou').on('mouseenter',function(){
		$('#shop').css('display','block');
	}).mouseleave(function(){
		$('#shop').css('display','none');
	});
	//在售分类滑过显示，离开影藏以及内部小tab标签切换
	$('#sell').on('mouseenter',function(){
		$('#sell_list').css('display','block');
	}).mouseleave(function(){
		$('#sell_list').css('display','none');
	});
	/*tab标签切换部分 start*/
	var $tabs = $('#classify li');
	$tabs.on('mouseenter',function(){
		var index = $(this).index();
		$(this).addClass('active1');
		$('#sell_list .show').eq(index).addClass('active2')
	}).mouseleave(function(){
		var index = $(this).index();
		$(this).removeClass('active1');
		$('#sell_list .show').eq(index).removeClass('active2');
	});
/*tab标签切换部分 end*/
/*固定定位快捷那就 start*/
	$('#fixed_mark li').on('mouseover',function(){console.log(11);
		$(this).addClass('marked').siblings().removeClass('marked');
		$(this).children('div').show();
	}).mouseout(function(){
		$(this).children('div').hide();
		$(this).removeClass('marked')
	})
/*固定定位快捷那就 end*/
	/*点击回到顶部*/
	$('#getTop').on('click',function(){
		$(window).scrollTop(0);
	})
	/*更新活动剩余时间结束*/
		var activity = document.getElementById('activity');
		var endTimeStr = '2016/10/31 00:00:00';
		var endT = new Date(endTimeStr);//日期对象
		function showTime(){
				// 获取当前时间
				var now = new Date();//日期对象

				// 计算当前时间和结束时间的差值（毫秒）
				var offsetTime = endT.getTime() - now.getTime();
				// 得到秒数&剩余的秒数
				var seconds = parseInt(offsetTime/1000);
				var secLeft = seconds%60;

				// 得到分钟数&剩余的分钟数
				var minuets = parseInt(seconds/60);
				var minLeft = minuets%60;

				// 得到小时数&剩余的小时数
				var hours = parseInt(minuets/60);
				var hourLeft = hours%24;
				var tian = parseInt(hours/24)
				// 写入页面
			activity.innerHTML = hourLeft+' 天 ' + hourLeft + ' 时 ' + minLeft + ' 分 ' + secLeft + ' 秒 ';
	
			}
			// 页面加载时就显示时间
			showTime();
			// 每隔一秒显示一次倒计时
			var timer = setInterval(showTime,1000);
			/*图片放大镜效果*/
		var $smallImg = $("#smallImg");//小图
		var $bigImg = $("#bigImg")//大图
		var $filter = $("#filter");//小可视区域
		var $bigCursor = $("#bigCursor");//大可视区域
		//定义可视区大小
		$filter.width(175);
		$filter.height(175);
		//filter的边长
		dw = $filter.outerWidth();
		//大小可视区比例
		var scale = $smallImg.outerWidth()/dw;
		$smallImg.mousemove(function(evt){

			$bigCursor.css("display","block");
			$filter.css("display","block");
			var e = evt || event;
			var disX = e.clientX - $smallImg.offset().left - dw/2;
			var disW = $smallImg.outerWidth() - dw;
			//console.log(e.pageY);
			var disY = e.pageY - $smallImg.offset().top - dw/2;
			var disH = $smallImg.outerWidth() - dw;
			var small = $smallImg.offset().left
			var leftSide = $smallImg.offset().left + dw/2;
			// console.log(leftSide)
			var topSide = $smallImg.offset().top + dw/2;
			var topsmal = $smallImg.offset().top;
			var rightSide = $smallImg.offset().left + $smallImg.outerWidth() - dw/2;
			var right_w = $smallImg.offset().left + $smallImg.outerWidth();
			var downSide = $smallImg.offset().top + $smallImg.outerHeight() - dw/2;
			var downbig = $smallImg.offset().top + $smallImg.outerHeight();
			if(e.clientX >= leftSide && e.clientX <= rightSide && 
				e.pageY >= topSide && e.pageY <= downSide) {
				//小图的位置
				$filter.css("left",disX);
				$filter.css("top",disY);
				//大图的位置
				$bigImg.css("left",-disX*scale);
				$bigImg.css("top",-disY*scale);
			} else if(e.clientX < leftSide && e.clientX > small && 
				e.pageY >= topSide && e.pageY <= downSide){
				//小图的位置
				$filter.css("left",0);
				$filter.css("top",disY);
				//大图的位置
				$bigImg.css("left",0);
				$bigImg.css("top",-disY*scale);
			}else if(e.clientX < right_w && e.clientX > rightSide && 
				e.pageY >= topSide && e.pageY <= downSide){
				//小图的位置
				$filter.css("left",disW);
				$filter.css("top",disY);
				//大图的位置
				$bigImg.css("left",-disW*scale);
				$bigImg.css("top",-disY*scale);
			}else if(e.clientX >= leftSide && e.clientX <= rightSide && 
				e.pageY > topsmal && e.pageY < topSide){
				//小图的位置
				$filter.css("left",disX);
				$filter.css("top",0);
				//大图的位置
				$bigImg.css("left",-disX*scale);
				$bigImg.css("top",0);
			}else if(e.clientX >= leftSide && e.clientX <= rightSide && 
				e.pageY > downSide && e.pageY < downbig){
				//小图的位置
				$filter.css("left",disX);
				$filter.css("top",disH);
				//大图的位置
				$bigImg.css("left",-disX*scale);
				$bigImg.css("top",-disH*scale);
			}
		}).mouseout(function(){
			//离开隐藏区域
			$bigCursor.css("display","none");
			$filter.css("display","none");
		});
/*绑定点击事件改变图片的src属性*/
		$('#bigList li').on('click',function(){
			//console.log(11);
			$('#bigImg')[0].src =$(this).children('img')[0].src;
			$('#smallImg').children('img')[0].src=$(this).children('img')[0].src;
		})
/*产品展示轮播图*/
	//定时轮播
	var index = 1;
	var time = '';
	curose();
	function curose(){
		time = setInterval(function(){
			if(index ==3){
				$('#show_list').css('left',0);
				index =1;
			}
			$('#show_list').animate({'left':-index*760},1000);
			index++;
		},4000);
	}
	
	//鼠标滑过，清楚定时器
	$('#show_list').on('mouseover',function(){
		clearInterval(time);
	}).mouseout(function(){
		curose();
	})
	//改变按钮背景颜色
	$('#list_btn span').on('mouseover',function(){
		clearInterval(time);
		$(this).css('background','#ccc');
	}).mouseout(function(){
		$(this).css('background','#666');
		curose();
	})
	//点击按钮实现左右移动
	$('#list_btn span').on('click',function(){
		var count_index = $(this).index();
		clearInterval(time);
		//console.log(count_index)
		if(count_index ==0){
			index++;
			if(index ==0){
				$('#show_list').css('left',0);
				index =3;
			}
			$('#show_list').animate({'left':-index*760},1000);
		}else{
			index--;
			
			if(index ==3){
				$('#show_list').css('left',0);
				index =0;
			}
			$('#show_list').animate({'left':-index*760},1000);
		}
	})	
/*衣服选择状态*/
	
	//颜色选择划过边框高亮；
	$('.yanse_ul li').on("mouseenter",function(){
		$(this).css('border',"1px solid #F34660");
	}).mouseleave(function(){
		$(this).css('border',"1px solid #CDCBCE")
	})
	//颜色选中添加右下勾选同时添加边框高亮；
	$("#yanse_ul li").on("click",function(){
		
		if($(this).children("i").css("display")=="none"){
			$(this).children("i").css("display","block");
		}else{
			$(this).children("i").css("display","none");
		}
	});
	//尺码选择
	$(".chima_ul li").on("mouseenter",function(){
		$(this).css('border',"1px solid #F34660");
	}).mouseleave(function(){
		$(this).css('border',"1px solid #CDCBCE");
	})
	//尺码选中勾上与添加边框高亮；
	$(".chima_ul li").on("click",function(){
		if($(this).children("i").css("display")=="none"){
			$(this).children("i").css("display","block");
		}else{
			$(this).children("i").css("display","none");
		}
	})
	//点击数量减与加
	//获得文本框对象
   	var tshuzi = $(".shuzi");
	//初始化数量为1,并失效减
	$('.jian').attr('disabled',true);
	//数量增加操作
    $(".jia").click(function(){    
        tshuzi.val(parseInt(tshuzi.val())+1)
        if (parseInt(tshuzi.val())!=1){
            $('.jian').attr('disabled',false);
        }
      
    }) 
    //数量减少操作
    $(".jian").click(function(){
        tshuzi.val(parseInt(tshuzi.val())-1);
        if (parseInt(tshuzi.val())==1){
            $('.jian').attr('disabled',true);
        }
      
    })
	//商品详情
	$(".jump li").on("mouseenter",function(){
		$(this).addClass("secli");
	}).mouseleave(function(){
		$(this).removeClass("secli");
	});
	
	//添加购物车
	$("	").on("click",function(){
		var $name=$("h3");
		var $price = $(".about_price").children('.price');
		var $yanseimg =$(".yanse_ul li");
		var $chima =$(".chima_ul li");
		var $shuliang =$(".jian_jia").children(".shuzi");
		var yanse = 'yanse_ul' + index;
		var index = $li.index();
		var value = {};
		
		value.name = $(".detail_tit").children("h3").text();
		value.yanseImg = $(".yanse_ul li").children('img').attr('src');
		value.price = $price.text();
		var Cookie = document.cookie;
		if(Cookie.indexOf(yanse) != -1){
					// 遍历cookie，获取原来的数量
					$.each(Cookie.split('; '),function(idx,val){
						// val:goods0={"imgurl":"images/shirt_1.jpg","name":"短袖衬衣","price":"98.88","qty":1}
						var name = val.split('=')[0];
						if(name == yanse){
							value.qty = JSON.parse(val.split('=')[1]).qty + 1;

							// 得到当前商品数量后，没必要再遍历后面的商品，所以直接退出
							return false;
						}
					});
				}else{
					value.qty = 1;
				}
				var cookie1 = yanse + '=' + JSON.stringify(value);
				console.log(cookie1)
				// name:goods0=
				// value:{name:"短袖衬衣",imgurl:"images/shirt_1.jpg",price:98.88}
				document.cookie = cookie1;
	})
	/*// 点击按钮时，把商品信息存入cookie
			$('.goumai').on('click','click',function(){
				var $li = $(this).closest('li');
				var $price = $li.children('.price');

				var index = $li.index();
				var goodName = 'goods' + index;

				// 创建一个空对象，用来保存商品信息
				var value = {};
				value.imgurl = $li.children('img').attr('src');
				value.name = $price.prev().text();
				value.price = $price.text();

				// 写入商品数量
				var lastCookie = document.cookie;
				if(lastCookie.indexOf(goodName) != -1){
					// 遍历cookie，获取原来的数量
					$.each(lastCookie.split('; '),function(idx,val){
						// val:goods0={"imgurl":"images/shirt_1.jpg","name":"短袖衬衣","price":"98.88","qty":1}
						var name = val.split('=')[0];
						if(name == goodName){
							value.qty = JSON.parse(val.split('=')[1]).qty + 1;

							// 得到当前商品数量后，没必要再遍历后面的商品，所以直接退出
							return false;
						}
					});
				}else{
					value.qty = 1;
				}

				// JSON.parse():把json字符串转换成json对象
				// JSON.stringify():把json对象转换成json字符串（JSON.parse的逆向操作）
				var _cookie = goodName + '=' + JSON.stringify(value);
				console.log(_cookie)
				// name:goods0=
				// value:{name:"短袖衬衣",imgurl:"images/shirt_1.jpg",price:98.88}
				document.cookie = _cookie;
			});*/
})
