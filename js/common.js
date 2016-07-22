/*
	获取从min到max之间的随机数
		min:最小值
		max:最大值
 */
function randomNumber(min,max){
	// 得到一个范围内的随机数
	return parseInt(Math.random()*(max-min + 1)) + min;
}


/*
	获取元素节点（删除非元素节点）
	// 过滤文本节点
 */
function filterNode(nodeList){
	var element = [];
	for(var i=0;i<nodeList.length;i++){
		if(nodeList[i].nodeType == 1){
			element.push(nodeList[i]);
		}
	}
	return element;
}

// 获取下一个元素节点
function getNextElement(node){
	var nextElement = node.nextSibling;
	while(nextElement.nodeType != 1){
		nextElement = nextElement.nextSibling;
	}
	return nextElement;
}

// 获取前一个元素节点
function getPrevElement(node){
	var prevElement = node.previousSibling;
	while(prevElement.nodeType != 1){
		prevElement = prevElement.previousSibling;
	}
	return prevElement;
}

/*
	事件绑定封装函数
 */
function addEvent(node,type,fn,cat){
	cat = cat || false;
	//addEventListener(type,fn,catch)
	if(node.addEventListener){
		node.addEventListener(type,fn,cat);
	}else if(node.attachEvent){
		node.attachEvent('on'+type,fn);
	}else{
		node['on'+type] = fn;
	}
}
//测试驱动开发
//addEvent(btn,'click',function(){});
//addEvent(document,'mousemove',function(){});


/*
	封装cookie的增删改查
 */
function addCookie(name,value,expires){
	var str = name + '=' + value;

	// 如果有失效时间，则写入，如果没有失效时间，则为临时cookie
	if(expires) str += ';expires=' + expires;
	document.cookie = str;
}
// addCookie(name,value,expires)
// document.cookie;==> name=value
// addCookie(name,value);//临时cookie

function getCookie(name){
	var cookies = document.cookie;
	if(!cookies){
		return '';
	}

	cookies = cookies.split('; ');

	// 输出结果
	var res = '';
	cookies.forEach(function(cookie){
		var _temp = cookie.split('=');
		if(_temp[0] === name){
			res = _temp[1];
		}
	});

	return res;
}
//getCookie('username') ==> xie
//getCookie('password') ==> 123
//getCookie('skin') ==> css1
//

function removeCookie(name){
	var now = new Date();
	document.cookie = name + '=null;expires=' + now;
}


/*
	删除前后空格
 */
function trim(str){
	var reg = /^\s*|\s*$/g;
	return str.replace(reg,'');
}
//trim('good    ');//'good'
//trim('good good study');//'good good study'
//trim('          ');//''
//
// 获取页面元素
// document.getElementById(id)
// document.getElementsByTagName('div');
// document.getElementsByClassName('box');
// document.getElementsByName('checkbox');
function getByClass(className){
	if(document.getElementsByClassName){
		return document.getElementsByClassName(className);
	}else{
		var node = document.getElementsByTagName('*');

		// 遍历所有标签
		var arr = [];
		for(var i=0;i<node.length;i++){
			var _className = node[i].className;
			// 如果当前标签包含传入的className
			if(_className.indexOf(className) != -1){
				arr.push(node[i]);
			}
		}

		return arr;
	}
}
//getByClass('box')
//

function getStyle(ele,attr){
	// 如果传进来的是id
	if(typeof ele === 'string'){
		ele = document.getElementById(ele);
	}

	// 判断浏览器，并返回值
	var _style = window.getComputedStyle ? getComputedStyle(ele)[attr] : ele.currentStyle[attr]
	return _style ? _style : 0;
}

/*
	动画函数
	ele:改变样式的元素对象
	opt:目标属性
	callback:回调函数，动画完成后执行
 */
function animate(ele,opt,callback){
	time = opt.time || 50;

	// 如果当前存在正在执行的动画，先清除
	if(ele.timerList && ele.timerList.length){
		for(var name in ele.timerList){
			// if(name == 'length') continue;
			clearAnimate(name);
			typeof callback === 'function' && callback();
		}
	}

	// 开始动画
	// 为当前ele对象创建一个存放定时器的属性timerList
	ele.timerList = {};

	// 创建一个不可枚举的length属性
	// 不可通过for..in获取
	Object.defineProperty(ele.timerList,'length',{enumerable:false,writable:true,value:0});

	// 为每个属性创建一个定时器，实现多个动画同时执行
	for(var attr in opt){
		(function(attr){
			// 为每个属性设一个定时器
			ele.timerList[attr] = setInterval(function(){
				//当前样式
				var currentStyle = parseFloat(getStyle(ele,attr));
				var speed = (opt[attr] - currentStyle)/8;

				//opacity速度
				var ospped = speed>0 ? .1 : -.1;

				// 其他属性速度
				speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);

				// 变化到目标属性值时清除定时器
				if(currentStyle == opt[attr]){
					clearAnimate(attr);
					if(ele.timerList.length == 0){
						typeof callback === 'function' && callback();
					}
					return;
				}
				if(attr == "opacity"){
					ele.style.opacity = (currentStyle+ospped);
					ele.style.filter = "alpha(opacity="+(currentStyle+ospped)*100+")";
				}else{
					ele.style[attr] = currentStyle + speed + 'px';
				}
			},time);
			ele.timerList.length++;
		})(attr);
	}

	// 清除定时器
	function clearAnimate(attr){
		clearInterval(ele.timerList[attr]);
		delete ele.timerList[attr];
		ele.timerList.length--;
	}
}