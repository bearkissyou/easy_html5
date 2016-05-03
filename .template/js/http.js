'use strict';

define(function(require,exports,module){
	// var __DOMAIN__="http://"+window.location.host+"/uppMobileApi/business/call.action";
	var __DOMAIN__="http://"+window.location.host+"/business/call.action";

	var page=require('page');
	var md5=require('./md5');
	var ui=require('./ui');

	var __subLoading__,__fullLoading__;

	var _sys=null;

	var u = navigator.userAgent;
	if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
		_sys='ANDROID';
	}else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
		_sys ='IOS';
	}else{
		_sys ='OTHER';
	}

	function _post_(servCode,params,loading){
		params['userId']=window.sessionStorage.getItem('USERID');
		params['tokenId']=window.sessionStorage.getItem('TOKEN');

		var _p={
			head:{
				servCode:servCode,
				callTime:new Date().getTime()+"",
				protocolVersion:"1.0",
				callSource:_sys,
				requestTime:new Date().getTime()+"",
				sourceSystem:"2",
				appVersion:"1.0",
				systemVersion:"8.1",
				versionNo:"1.0",
				mobileModel:"iPhone Simulator",
				sequenceCode:"89e588022590a35b216708787029d75d",
				mobileNo:"",
				sequenceNum:new Date().getTime()+""
			},
			body:params,
			sign:"ZJXL2013_09*&"
		}
	
		var _sign = md5(JSON.stringify(_p));
		_p["sign"] = _sign;

		var _showLoading=true;
		if(loading==false){
			_showLoading=false;
		}
		if(_showLoading){
			__subLoading__.start();
		}

		var _deffered=$.Deferred();
		$.ajax({
			url:__DOMAIN__,
			dataType:'json',
			type:'POST',
			timeout:30000,
			data:JSON.stringify({param:_p})
		}).done(function(r){
			console.log(r);
			if(_showLoading){
				__subLoading__.close();
			}
			if(r&&r.head&&r.head.result=='1'&&r.head.errorMessage.indexOf('E000013')!=-1){
				// page.back();
			}else{
				_deffered.resolve(r);
			}
		}).fail(function(){
			_deffered.reject();
			if(_showLoading){
				__subLoading__.close();
			}
			ui.toast('网络不给力');
		});

		return _deffered;
	}

	function __loading__(a) {
	    function b(a) {
	        this.page_body = document.getElementsByTagName("body")[0],
	        this.init(a)
	    }
	    var c = function(a) {
	        var b;
	        for (b in a) return ! 1;
	        return ! 0
	    },
	    d = function(a, b, c, d) {
	        a.beginPath(),
	        a.arc(b - d, c - d, d, 0, Math.PI / 2),
	        a.lineTo(d, c),
	        a.arc(d, c - d, d, Math.PI / 2, Math.PI),
	        a.lineTo(0, d),
	        a.arc(d, d, d, Math.PI, 3 * Math.PI / 2),
	        a.lineTo(b - d, 0),
	        a.arc(b - d, d, d, 3 * Math.PI / 2, 2 * Math.PI),
	        a.closePath()
	    },
	    e = function(a, b, c, e, f, g, h) {
	        2 * g > e || 2 * g > f || (a.save(), a.translate(b, c), d(a, e, f, g), a.fillStyle = h || "black", a.globalAlpha = .5, a.fill(), a.restore())
	    };
	    return b.prototype = {
	        constructor: b,
	        init: function(a) {
	            var b = !c(a);
	            this.id = b && a.id ? a.id: "loading",
	            this.block = b && a.block ? a.block: 12,
	            this.height = b && a.height ? a.height: 15,
	            this.width = b && a.width ? a.width: 3,
	            this.time = b && a.time ? a.time: 100,
	            this.full = a.full || !1
	        },
	        start: function() {
	            for (var a = !0,
	            b = this.page_body.childNodes,
	            c = 0,
	            d = b.length; d > c; c++) a = "canvas" == b[c].nodeName.toLowerCase() && "loading" == b[c].id ? !1 : !0;
	            a && (this.createDom(), this.setStyle(), this.draw())
	        },
	        createDom: function() {
	            this.canvas = document.createElement("canvas"),
	            this.offcanvas = document.createElement("canvas"),
	            this.full ? (this.fullBg = document.createElement("div"), this.fullBg.appendChild(this.canvas), this.page_body.appendChild(this.fullBg)) : this.page_body.appendChild(this.canvas)
	        },
	        setStyle: function() {
	            this.fullBg && (this.fullBg.style.backgroundColor = "rgba(0, 0, 0, .6)", this.fullBg.style.position = "fixed", this.fullBg.style.top = "0", this.fullBg.style.zIndex = 99, this.fullBg.style.width = "100%", this.fullBg.style.height = "100%"),
	            this.canvas.id = this.id,
	            this.canvas.width = this.offcanvas.width = 160,
	            this.canvas.height = this.offcanvas.height = 160,
	            this.canvas.style.width = this.offcanvas.style.width = "80px",
	            this.canvas.style.height = this.offcanvas.style.height = "80px",
	            this.canvas.style.position = "fixed",
	            this.canvas.style.zIndex = 999,
	            this.canvas.style.top = "30%",
	            this.canvas.style.left = "50%",
	            this.canvas.style.marginLeft = "-40px"
	        },
	        draw: function() {
	            this.ctx = this.canvas.getContext("2d"),
	            this.offctx = this.offcanvas.getContext("2d"),
	            this.offctx.width = 6 * this.height,
	            this.offctx.height = 6 * this.height,
	            this.offctx.translate(this.offctx.width / 1.5, this.offctx.height / 1.5);
	            var a = 2;
	            this.view(a)
	        },
	        loop: function(a) {
	            this.offctx.rotate(2 * Math.PI / this.block),
	            this.offctx.beginPath(),
	            this.offctx.fillStyle = "rgba(255,255,255," + a + ")",
	            this.offctx.arc(0, this.offctx.width / 2 - 2 * this.height, this.width / 2, 0, Math.PI, !0),
	            this.offctx.arc(0, this.offctx.width / 2 - this.height, this.width / 2, Math.PI, 0, !0),
	            this.offctx.closePath(),
	            this.offctx.fill()
	        },
	        view: function(a) {
	            var b = this;
	            this.offctx.rotate(2 * Math.PI / this.block),
	            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
	            this.full || e(this.ctx, 0, 0, this.canvas.width, this.canvas.height, 10),
	            this.ctx.drawImage(this.offcanvas, 0, 0),
	            this.offctx.clearRect( - this.offctx.width / 2, -this.offctx.height / 2, this.offctx.width, this.offctx.height),
	            a >= this.block ? a = 1 : a += 1;
	            for (var c = 1; c <= this.block; c++) this.loop(c / this.block);
	            this.timeout = setTimeout(function() {
	                b.view(a)
	            },
	            b.time)
	        },
	        removeDom: function() {
	            for (var a = this,
	            b = !0,
	            c = this.page_body.childNodes,
	            d = 0,
	            e = c.length; e > d; d++)"canvas" == c[d].nodeName.toLowerCase() && "loading" == c[d].id && (b = !1),
	            c[d].childNodes[0] && "canvas" == c[d].childNodes[0].nodeName.toLowerCase() && "loading" == c[d].childNodes[0].id && (b = !1);
	            b || (this.canvas.parentNode.removeChild(this.canvas), clearTimeout(a.timeout)),
	            !b && this.full && (this.fullBg.parentNode.removeChild(this.fullBg), clearTimeout(a.timeout))
	        },
	        close: function() {
	            this.removeDom()
	        }
	    },
	    new b(a)
	};

	__subLoading__=__loading__({
	    width: 5,
	    height: 20
	});

	__fullLoading__=__loading__({
	    width: 5,
	    height: 20,
	    full: !0
	});

	module.exports={
		post:_post_,
		DOMAIN:__DOMAIN__
	}
});




