var gulp=require('gulp');
var manifest=require('gulp-manifest');
var exec=require('child_process').exec;

var __argv__={
	root:''//当前工作目录
};

for(var i in process.argv){
	if(/--(.+)=(.+)/.test(process.argv[i])){
		__argv__[RegExp.$1]=RegExp.$2;
	}
}

gulp.task('manifest',function(){
	gulp.src([__argv__['root']+'/**/*'], { base: __argv__['root']})
		.pipe(manifest({
			hash:true,
			timestamp:true,
			preferOnline:false,
			filename:'main.manifest',
			exclude:'main.manifest'
		}))
		.pipe(gulp.dest(__argv__['root']))
})

gulp.task('build',function(){
	process.chdir(__argv__['root']);

	if(__argv__['build']=='test'){
		console.log('测试环境编译完毕');
		exec('cp -rf conf/test/config.js js/',function(_,__){

		});
	}else if(__argv__['build']=='product'){
		console.log('生产环境编译完毕');
		exec('cp -rf conf/product/config.js js/',function(_,__){
			
		});
	}
})

gulp.task('default',function(){
	console.log('没有任务被执行，请检查任务参数');
})

