$(function(){
	// nav_top部分
	var $lis = $('#top_nav .sub_nav');
	//鼠标滑过
	$lis.on('mouseenter',function(){
		$(this).children('span').addClass('active');
		$(this).children('div').css('display','block');
	
		//鼠标划出
	}).mouseleave(function(){
		$(this).children('span').removeClass('active');
		$(this).children('div').css('display','none');
	});
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
//在性别年龄滑过显示，离开影藏
	$('#age').on('mouseenter',function(){
		$(this).children('div').show();
	}).mouseleave(function(){
		$(this).children('div').hide();
	});

	//bannar 部分滚动实现
	var $bannar = $('#bannar li');
	var b_index =1;
	setInterval(function(){
		if(b_index == $bannar.length ){
			b_index=0;
		}
		$bannar.eq(b_index).addClass('bannar_show').siblings().removeClass('bannar_show');
		$bannar.eq(b_index).children('img').animate({'opacity':1},1000).parent().siblings().children('img').animate({'opacity':0},1000);
		$('#bannar_mark span').eq(b_index).addClass('active3').siblings().removeClass('active3');
		b_index++;
	},4000)
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
	//更新活动剩余时间结束
		var time_remain = document.getElementsByClassName('time_remain');//console.log(time_remain);
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
				//console.log($('#endtime'))
				// 写入页面
				for(var i =0;i<time_remain.length;i++){
					time_remain[i].innerHTML = hourLeft+' 天 ' + hourLeft + ' 时 ' + minLeft + ' 分 ' + secLeft + ' 秒 ';
				}
	
			}
			// 页面加载时就显示时间
			showTime();
			// 每隔一秒显示一次倒计时
			var timer = setInterval(showTime,1000);
			//tab标签切换
	var $spans = $('#mid_tab .mid_list span');//console.log($spans)
	$spans.on('mouseenter',function(){
		var $mid_index = $(this).index();
		$(this).addClass('active4').parent().siblings().find('span').removeClass('active4');
		$(this).next().show().parents('li').siblings().children('div').hide();
	});
	//今日优选
	$(".choiceul_1 li").on("mouseenter",function(){
		$(this).css("opacity","0.3");
	}).mouseleave(function(){
		$(this).css("opacity","1");
	})
	//精彩预告
	$(".choice_ul li").on("mouseenter",function(){
		$(this).css("opacity","0.3");
	}).mouseleave(function(){
		$(this).css("opacity","1");
	})
	
	/*-----------------二级自导航滚动一定高度显示-----------------------------*/
	$(window).scroll(function(){
		if($(document).scrollTop()>=200){
			$('#inHide').show();
		}else if($(document).scrollTop()<200){
			$('#inHide').hide();
		}
		
	})
	//划入改变高度
	var $spanc=$(".detail span")
	$spanc.on("mouseenter",function(){
		$spanc.css({'height':'130',"border":"1px solid #999",'background':'#fff'})
	})
	$spanc.on("mouseleave",function(){
		$spanc.css({'height':'32',"border":"none",})
	})
	//划入显示背景高亮全部
	var $box=$(".detail_cont1")
	$box.on("mouseenter",function(){
		$(".detail p").addClass('atv');
	})
	$box.on("mouseleave",function(){
		$(".detail p").removeClass('atv');
	})
	
	
	/*------------------右侧定位栏tab标签切换----------------------------*/
	$('#hotList li').on('mouseenter',function(){
		$(this).addClass('catch').siblings().removeClass('catch');
		$(this).children('div').show().parent().siblings().children('div').hide();
		
	})
	$(".hot_list dl").on("mouseenter",function(){
		$(this).css({"opacity":"0.8","background":"#fecce9"});
	}).mouseleave(function(){
		$(this).css({"opacity":"1","background":"#fff"})
	})
	  $(function(){
            // 2）用jquery选择器获取页面元素
            var $focus = $('#focus');
            var $bigpic = $('#bigpic');
            var $smallpic = $('#smallpic');

            var index = 0;//显示图片索引
            var len = $bigpic.children('li').length;

            // 初始化
            show();

            // 3）使用jquery事件与动画
            var timer = setInterval(animation,1500);

            // 鼠标移入停止，移除继续
            $focus.on('mouseenter',function(){
                clearInterval(timer);
            }).on('mouseleave',function(){
                timer = setInterval(animation,1500);
            });

            // 点击小图切换效果
            $smallpic.on('click','li',function(){
                index = $(this).index();
                show();
            });
			
            //前后按钮
            $focus.on('click','a.prev',function(){
                index--;
                show();
            }).on('click','a.next',function(){
                index++;
                show();
            });

            // 图片切换
            function animation(){
                index++;
                show();
            }

            // 显示图片
            // 当前大图透明度为1，其他为0
            // 当前小兔透明度为1，其他为0.5
            function show(){
                if(index==len){
                    index=0;
                }else if(index < 0){
                    index = len - 1;
                }
                $bigpic.children('li').eq(index).animate({opacity:1}).siblings().animate({opacity:0});
                $smallpic.children('li').eq(index).animate({opacity:1}).siblings().animate({opacity:0.5});
            }
        });
        
})
