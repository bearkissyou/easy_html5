var fs=require('fs');

function __readFile__(path,fn){
	fs.readFile(path,function(err,data) {
       fn(err,data);
	});
}

module.exports={
	readFile:__readFile__
}