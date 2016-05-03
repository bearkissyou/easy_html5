var __config__={
	baseUrl : './js',
	paths : {
		$ : './libs/zepto.min',
		http:'./http',
		page:'./page',
		ui:'./ui',
		config:'./config',
		__:'./native',
		libs:'./libs',
		c:'./c'
	},
	shim:{
		http:{
			deps:['$']
		},
		__:{
			deps:['base64']
		},
		toast:{
			deps:['$']
		}
	}
};

if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
	__config__['args']=new Date().getTime();
}

requirejs.config(__config__);

requirejs(['$','__'],function(_$,__){
	try{
		if(__.isIphone()){
			$('body').prepend('<div style="height:1rem;background:#19273f;"></div>')
		}
		__exec__();
		var _js=$('body').data('loadjs');
		requirejs(['c/'+_js],function(m){
			m.init();
		});	
	}catch(e){

	}
});

function __exec__(){
	$('body').on('tap','.header-left',function(){
		history.back();
	});
}

Date.prototype.format=function(fmt){
	var o = {   
	    "M+" : this.getMonth()+1,                 //月份   
	    "d+" : this.getDate(),                    //日   
	    "h+" : this.getHours(),                   //小时   
	    "m+" : this.getMinutes(),                 //分   
	    "s+" : this.getSeconds(),                 //秒   
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
	    "S"  : this.getMilliseconds()             //毫秒   
	};   
	if(/(y+)/.test(fmt))   
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	for(var k in o)   
		if(new RegExp("("+ k +")").test(fmt))   
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	return fmt; 
}

String.prototype.trim=function(){
	return this.replace(/^\s+/,'').replace(/\s+$/,'');
}