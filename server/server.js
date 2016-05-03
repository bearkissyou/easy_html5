var http = require('http');
var fs=require('fs');
var mime=require('./mime').types;
var path=require('path');

var _argv={
	host:'localhost',
	port:'80',
	dir:null
}

function __init__(dir){
	console.log('根目录为::::'+dir);
	_argv['dir']=dir;
}

function __start__(){
	fs.readFile(path.join(_argv['dir'],'/conf/config.json'),'utf-8',function(e,f){
		if(e){
			console.log(e.message);
		}else{
			var _config=JSON.parse(f);
			for(var i in _config['proxy']){
				_argv[i]=_config['proxy'][i];
			}

			__startServer__();
		}
	})
}

function __proxy__(request,response){
	var options = {
        host:_argv.host,
        port:_argv.port,
        path:request.url,       
        method:request.method,
        headers:request.headers
    };

    var req = http.request(options, function(res) {
	    res.pipe(response, {
	      end: true
	    });
    	
    })
    req.on('error',function(e){
    	console.log('problem with request: ' + e.message);
    	response.statusCode=500;
    	response.end();
    })

    req.setTimeout(10*1000, function(){
	   console.log('Request Timeout From ChatServer in 10 seconds, then response code 500');
	   response.statusCode=500;
	   response.end();
	});

	request.setTimeout(10*1000, function(){
	   console.log('Timeout');
	   response.statusCode=500;
	   response.end();
	 });
    request.pipe(req,{
    	end:true
    });
}

function __static__(ext,request,response){
	console.log('文件路径为:::::'+path.join(_argv.dir,request.url));
	var _path=path.join(_argv.dir,request.url);
	fs.exists(_path,function(exists){
		if(exists){
			fs.readFile(_path,function(e,f){
				if (e) {
		            response.writeHead(500, {'Content-Type': 'text/plain'});
		            response.end(e);
		        } else {
		        	response.writeHead(200, {'Content-Type': mime[ext]});
		            response.write(f);
		            response.end();
		        }
			});
		}else{
			response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end();
		}
	})
}


function __startServer__(){
	console.log('服务器启动，开始监听9999端口');
	var proxy = http.createServer(function(request,response) {
		var ext = path.extname(request.url);
		ext = ext ? ext.slice(1) : 'unknown';

		if(mime[ext]){
			__static__(ext,request,response);
		}else{
			__proxy__(request,response);
		}
	}).listen(9999);
}

module.exports={
	init:__init__,
	start:__start__
}
