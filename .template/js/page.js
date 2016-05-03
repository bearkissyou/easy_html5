'use strict';

define(function(require,exports,module){
	var _history_={},_url=window.location.href;

	var state = {
		url: _url,
		data: null
	};
	// history.pushState(state, '', _url);
	// var _historyIndex_=0;
	// _history_[_url]={
	// 	id:'index',
	// 	index:0,
	// };

	// window.onpopstate=function(e){
	// 	if(e.state){
	// 		__backPage__(e.state.url,e.state.data);
	// 	}
	// }

	function __openPage__(url,data){
		var _deffered=$.Deferred();
		$.ajax({url:url,dataType:'html',type:'GET'}).then(function(html){
			history.pushState({
				url:url,
				data:data,
			},'',url);

			var _el=$(html);
			var _id=_el.attr('id');

			$('#'+_id).remove();

			_history_[url]={
				id:_id,
				index:++_historyIndex_,
			};

			$('.page-display').addClass('page-hide').removeClass('page-display');

			_el.addClass('page-display');
			$('body').append(_el);
			
			_deffered.resolve();
		}).fail(function(){
			_deffered.reject();
		});

		return _deffered;
	}

	function __backPage__(url,data){
		var _displayId=$('.page-display').attr('id');
		if(require(_displayId)&&require(_displayId).back){
			require(_displayId).back();
		}
		$('.page-display').addClass('page-hide').removeClass('page-display');
		var _id=_history_[url]['id'];
		if(require(_id)&&require(_id).display){
			require(_id).display();
		}
		$('#'+_id).removeClass('page-hide').addClass('page-display');
	}

	function __backToIndex__(){
		__back__('./index.html');
	}

	function __backFromIframe__(){
		history.go(-1);
	}

	function __back__(_){
		if(typeof _=='number'){
			history.go(_);
		}else{
			history.back();
		}
	}


	function __location__(url,args){
		var _=[];
		if(args&&typeof args=='object'){
			for(var i in args){
				_.push(i+'='+args[i]);
			}
		}
		if(_.length>0){
			url+='?'+_.join('&');
		}
		window.location.href=url;
	}

	function __getArgv__(){
		var _args={};
		var __ = window.location.search.substring(1,location.search.length).split('&');
		var _;
		for(var i=0;i<__.length;i++){
			_=__[i].split('=');
			_args[_[0]]=_[1];
		}

		return _args;
	}

	module.exports={
		open:__location__,
		backToIndex:__backToIndex__,
		back:__back__,
		getArgv:__getArgv__
	}
});


