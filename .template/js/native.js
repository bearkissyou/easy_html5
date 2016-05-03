'use strict';

define(function(require,exports,module){
	var base64=require('base64');
	//
	function _isAndroidOrIos(){
		var u = navigator.userAgent;
		if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
			return 0;
		}else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
			return 1;
		}else{
			return -1;
		}
	}

	function _exec(_,__){
		var _type=_isAndroidOrIos();
		if(typeof _==='object'){
			console.log(JSON.stringify(_));
			if(_type==0&&window.daka&&window.daka.exec&&_['a']){
				window.daka.exec(_['a'].action,_['a'].args?_['a'].args:[]);
			}else if(_type==1&&_['i']){
				if(_['i'].args){
					window.location='native:'+_['i'].action+':'+_['i'].args;
				}else{
					window.location='native:'+_['i'].action;
				}
			}else{
			}
		}else{
			console.log(_,__);
			if(_type==0&&window.daka&&window.daka.exec){
				window.daka.exec(_,__);
			}else if(_type==1){
				if(/^http:.+&v=i_(.+)/.test(window.location.href)){
					window.location='/native:/'+_+'/'+__.join(':');
				}
			}else{
			}
		}
	}

	function _isWeiXin_(){ 
		var ua = window.navigator.userAgent.toLowerCase(); 
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
			return true; 
		}else{ 
			return false; 
		} 
	}

	function __isIphone__(){
		return _isAndroidOrIos()==1;
	}

	function __statis__(event){
		_exec('statis',[event]);
	}

	module.exports={
		exec:_exec,
		isWeiXin:_isWeiXin_,
		isIphone:__isIphone__,
		statis:__statis__
	}
});