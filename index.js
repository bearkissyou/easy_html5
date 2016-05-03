var _exec=require('child_process').exec;
var server=require('./server/server');

var __argv__={
	root:process.cwd(),//当前工作目录
	build:'test'//编译为具体环境代码
	// task:'manifest'//需要执行的任务
};

for(var i in process.argv){
	if(/--(.+)=(.+)/.test(process.argv[i])){
		__argv__[RegExp.$1]=RegExp.$2;
	}
}

process.chdir(process.argv[1]);

var _cmd=[];
if(__argv__['task']){
	_cmd.push('gulp');
	if(__argv__['task']=='manifest'){//编译manifest文件
		_cmd.push('manifest');
	}else if(__argv__['task']=='build'){//编译
		_cmd.push('build --build='+__argv__['build']);
	}else if(__argv__['task']=='create'){

	}else if(__argv__['task']=='server'){
		console.log('启动web服务器');
		if(__argv__['operate']=='start'){
			server.init(__argv__.root);
			server.start();
		}
		return;
	}

	_cmd.push('--root='+__argv__['root']);
	console.log(_cmd.join(' '));
	_exec(_cmd.join(' '),function(_,__){
		console.log(__);
	})
}

