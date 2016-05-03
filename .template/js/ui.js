(function(__){
	if(typeof define==='function'&&define.amd){
		define(function(){
			return __;
		})
	}else if(typeof module==='object'){
		module.exports.ui=__;
	}else{
		window.ui=__;
	}
})((function(){
	function __options__(){
		return {
			title:'',
			msg:'',
			textAlign:'center',
			closeWhenTap:true,
			buttons:[{
				text:'取消',
				type:'cancel'
			},{
				text:'确定',
				type:'submit'
			}],
			fn:null,
			autoClose:true,
			displayField:[],
			valueField:[],
			listeners:{
				beforeShow:function(){},
				show:function(){}
			}
		};
	}

	function __generateUiId__(){
		return 'ui-'+new Date().getTime();
	}

	function UI(__){
		this.__id__=__generateUiId__();

		this.__create__=function(){}
		this.getId=function(){
			return this.__id__;
		}
		this.show=function(){
			$('#'+this.__id__).css('display','block');
		}
		this.hide=function(){
			$('#'+this.__id__).css('display','none');
		},
		this.close=function(){
			$('#'+this.__id__).remove();
		}
		this.__init__=function(){
			if(__.listeners.beforeShow){
				__.listeners.beforeShow.call(this);
			}
			this.__create__();
			__.listeners.show.call(this);

			var _self=this;

			$('#'+this.__id__+' .ui-shade').bind('tap',function(){
				if(__.closeWhenTap){
					_self.close();
				}else{
					_self.hide();
				}
			});
		}
	}

	function Dialog(options){
		var __=$.extend({},__options__(),options);
		UI.call(this,__);

		function __create__(){
			var _html=[];
			_html.push('<div id="'+this.__id__+'" style="font-family:\'Microsoft YaHei\';font-size: 16px;text-align:'+__.textAlign+'">');
				_html.push('<div class="ui-shade" style="opacity: 0.5; z-index: 9; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: rgb(0, 0, 0);"></div>');
				_html.push('<div class="ui-content" style="color: rgb(51, 51, 51); border-radius: 5px; z-index: 99; overflow: hidden; width: 80%; height: auto; position: absolute; top: 50%; left: 10%; background: rgb(242, 242, 242);">');
					_html.push('<div class="d-head" style="cursor: move; position: relative;"></div>');
					_html.push('<div class="d-body" style=" overflow-x: auto;">');
						if(__.msg){
							_html.push('<div class="d-alert" style="padding: 20px 10px;">'+__.msg+'</div>');
						}else if(__.html){
							_html.push(__.html);
						}
					_html.push('</div>');
					_html.push('<div class="ui-d-foot" style="display: flex;background:#ffffff;height: 50px;line-height: 50px;border-top:solid 1px #e8e8e8;">');
						var _css;
						for(var i=0;i<__.buttons.length;i++){
							_css="flex: 1 1 0%;border-right: solid 1px #e8e8e8;";
							if(i==__.buttons.length-1){
								_css="flex: 1 1 0%;";
							}

							if(__.buttons[i].type=='submit'){
								_css+='color: rgb(255, 144, 0);';
							}
							_html.push('<div _i="'+i+'" style="'+_css+'">'+__.buttons[i].text+'</div>');
						}
					_html.push('</div>');
				_html.push('</div>');
			_html.push('</div>');

			$('body').append(_html.join(''));

			$('.ui-content').css('margin-top','-'+$('.ui-content').height()/2+'px');

			var _self=this;
			$('.ui-d-foot>div').bind('tap',function(){
				if(__.fn){
					__.fn.call(_self,parseInt($(this).attr('_i')));
				}

				return false;
			});
		}
		this.__create__=__create__;

		this.__init__();
	}


	function ListDialog(options){
		var __=$.extend({},__options__(),options);
		UI.call(this,__);

		function __create__(){
			var _html=[];
			_html.push('<div id="'+this.__id__+'" style="font-family:\'Microsoft YaHei\';font-size: 16px;text-align:'+__.textAlign+'">');
				_html.push('<div class="ui-shade" style="opacity: 0.5; z-index: 9; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: rgb(0, 0, 0);"></div>');
				_html.push('<div class="ui-content" style="color: rgb(51, 51, 51); border-radius: 5px; z-index: 99; overflow: hidden; width: 80%; height: auto; position: absolute; top: 50%; left: 10%; background: rgb(242, 242, 242);">');
					_html.push('<div class="d-head" style="cursor: move; position: relative;"></div>');
					_html.push('<div class="d-body" style="overflow-x: auto;">');
						_html.push(__.html);
					_html.push('</div>');
				_html.push('</div>');
			_html.push('</div>');

			$('body').append(_html.join(''));

			$('.ui-content').css('margin-top','-'+$('.ui-content').height()/2+'px');

			var _self=this;
			$('#'+this.__id__+' li').bind('tap',function(){
				if(__.fn){
					__.fn.call(this,$(this));
				}

				return false;
			});
		}
		this.__create__=__create__;

		this.__init__();
	}


	function __showSoftInput__(args){
		var __=$.extend({},__options__(),args);

		var _html=[];
		_html.push("<ul id='softinput-num' style='width:100%;height:20rem;position: absolute;bottom: 0px;text-align: center;font-size: 3rem;border-collapse:collapse;'>");
			_html.push("<li style='border-top:solid 1px #bbbbbb;height:5rem;position:relative;'>");
				_html.push("<div _n='1' style='width:33.3%;height:100%;'>");
					_html.push("<label style=''>1</label>");
					_html.push("<label style='font-size: 0.6rem;display: block;'></label>");
				_html.push("</div>");
				_html.push("<div _n='2' style='position: absolute;top:0px;left:33.3%;border-left:solid 1px #bbbbbb;border-right:solid 1px #bbbbbb;width:33.4%;height:100%;'>");
					_html.push("<label style=''>2</label>");
					_html.push("<label style='font-size: 0.6rem;display: block;'>ABC</label>");
				_html.push("</div>");
				_html.push("<div _n='3' style='position: absolute;top:0px;left:66.6%;width:33.3%;height:100%;'>");
					_html.push("<label style=''>3</label>");
					_html.push("<label style='font-size: 0.6rem;display: block;'>DEF</label>");
				_html.push("</div>");
			_html.push("</li>");
			_html.push("<li style='border-top:solid 1px #bbbbbb;height:5rem;position:relative;'>");
				_html.push("<div _n='4' style='width:33.3%;height:100%;'>");
					_html.push("<label style=''>4</label>");
					_html.push("<label style='font-size: 0.6rem;display: block;'>GHI</label>");
				_html.push("</div>");
				_html.push("<div _n='5' style='position: absolute;top:0px;left:33.3%;border-left:solid 1px #bbbbbb;border-right:solid 1px #bbbbbb;width:33.4%;height:100%;'>");
					_html.push("<label style=''>5</label>");
					_html.push("<label style='font-size: 0.6rem;display: block;'>JKL</label>");
				_html.push("</div>");
				_html.push("<div _n='6' style='position: absolute;top:0px;left:66.6%;width:33.3%;height:100%;'>");
					_html.push("<label style=''>6</label>");
					_html.push("<label style='font-size: 0.6rem;display: block;'>MNO</label>");
				_html.push("</div>");
			_html.push("</li>");
			_html.push("<li style='border-top:solid 1px #bbbbbb;height:5rem;position:relative;'>");
				_html.push("<div _n='7' style='width:33.3%;height:100%;'>");
					_html.push("<label style=''>7</label>");
					_html.push("<label style='font-size: 0.6rem;display: block;'>PQRS</label>");
				_html.push("</div>");
				_html.push("<div _n='8' style='position: absolute;top:0px;left:33.3%;border-left:solid 1px #bbbbbb;border-right:solid 1px #bbbbbb;width:33.4%;height:100%;'>");
					_html.push("<label style=''>8</label>");
					_html.push("<label style='font-size: 0.6rem;display: block;'>TUV</label>");
				_html.push("</div>");
				_html.push("<div _n='9' style='position: absolute;top:0px;left:66.6%;width:33.3%;height:100%;'>");
					_html.push("<label style=''>9</label>");
					_html.push("<label style='font-size: 0.6rem;display: block;'>WXYZ</label>");
				_html.push("</div>");
			_html.push("</li>");
			_html.push("<li style='border-top:solid 1px #bbbbbb;height:5rem;position:relative;'>");
				_html.push("<div _n='n' style='width:33.3%;height:100%;background: #d2d5db;'>");
					_html.push("<label style=''></label>");
					_html.push("<label style='font-size: 0.6rem;display: block;'></label>");
				_html.push("</div>");
				_html.push("<div _n='0' style='position: absolute;top:0px;left:33.3%;border-left:solid 1px #bbbbbb;border-right:solid 1px #bbbbbb;width:33.4%;height:100%;'>");
					_html.push("<label style=''>0</label>");
					_html.push("<label style='font-size: 0.6rem;display: block;'></label>");
				_html.push("</div>");
				_html.push("<div _n='b' style='position: absolute;top:0px;left:66.6%;width:33.3%;height:100%;background: #d2d5db;'>");
					_html.push("<div class='ui-delete'></div>");
					// _html.push("<label style='font-size: 0.6rem;display: block;'></label>");
				_html.push("</div>");
			_html.push("</li>");
		_html.push("</ul>");

		$('body').append(_html.join(''));

		$('#softinput-num>li>div').bind('tap',function(){
			if(__.callback){
				__.callback($(this).attr('_n'));
			}

			if(__.autoClose){
				$('#popwindow').remove();
			}

			return false;
		})
	}

	function __showPopWindow__(args){
		var __=$.extend({},__options__(),args);
		UI.call(this,__);

		function __create__(){
			var _html=[];
			_html.push("<div id='"+this.__id__+"' style='text-align: center;font-size: 1.6rem;'>");
			_html.push('<div class="ui-shade" style="opacity: 0.1; z-index: 9; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: rgb(0, 0, 0);"></div>');
			_html.push("<ul style='z-index:99;width: 15rem;position: absolute;top: 5rem;right:1.5rem;background: #ffffff;box-shadow: 0px 0px 20px rgba(37,37,37,0.7);'>");
			for(var i=0;i<__.displayField.length;i++){
				_html.push("<li _index='"+i+"' style='height: 4rem;line-height: 2.5;border-top:solid 1px #e8e8e8;'><label>"+__.displayField[i]+"</label></li>");
			}
			_html.push("</ul>");
			_html.push("</div>");
			$('body').append(_html.join(''));

			$('#'+this.__id__+' li').bind('tap',function(){
				if(__.callback){
					__.callback(parseInt($(this).attr('_index')))
				}

				return false;
			});
		}

		this.__create__=__create__;

		this.__init__();
	}

	function __dialog__(_){
		if(_.type=='dialog'){
			return new Dialog(_);
		}else if(_.type=='listdialog'){
			return new ListDialog(_);
		}else{
			return new Dialog(_);
		}
	}


	function __toast__(_){
		if(typeof _=='string'){
			_={msg:_};
		}
		var __=$.extend({},{time:2000},_);

		$("#toastMessage").remove();
        var msgDIV = [];
        msgDIV.push('<span id="toastMessage" style="display:-webkit-box;-webkit-box-orient:horizontal;">');
        msgDIV.push('<div style="-webkit-box-flex:1;"></div>');
        msgDIV.push('<div style="background:#000000;padding:5px;">'+__.msg+'</div>');
        msgDIV.push('<div style="-webkit-box-flex:1;"></div>');
        msgDIV.push('</span>');
        var _el = $(msgDIV.join('')).appendTo('body');
        _el.css({
            position:'absolute',
            bottom:'20px',
            'z-index':'99',
            width:'100%;',
            color:'white','font-size':'18px'
        });

        _el.fadeIn(__.time/2,function(){
           _el.fadeOut(__.time/2); 
        });
	}

	return {
		showSoftInput:__showSoftInput__,
		showPopWindow:__showPopWindow__,
		dialog:__dialog__,
		toast:__toast__
	};
})($))




