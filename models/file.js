var fs=require('fs');

//callback含有参数存放所有文件夹名字的array
exports.getAllAlbums=function(callback){
    fs.readdir('./uploads',function(err,files){
        if(err){
            console.log('meizhaodao');
            callback("没有找到uploads文件夹",null);
            return;
        }
        var allAlbums=[];
        (function iterator(i){
            if(i==files.length){
                console.log(allAlbums);
                callback(null,allAlbums);
                return;
            }
              fs.stat('./uploads/'+files[i],function(err,stats){
                  if(err){
                      callback("找不到文件"+files[i],null);
                      return;
                  }
                    if(stats.isDirectory()){
                        allAlbums.push(files[i]);
                    }
                    iterator(i+1);
              })
        })(0);
    })
}

// 通过文件名得到所有图片
exports.getAllImagesByAlbumName=function(albumName,callback){
    fs.readdir('./uploads/'+albumName,function(err,files){
        if(err){
            console.log('meizhaodao');
            callback("没有找到uploads文件夹",null);
            return;
        }
        var allImages=[];
        (function iterator(i){
            if(i==files.length){
                console.log(allImages);
                callback(null,allImages);
                return;
            }
              fs.stat('./uploads/'+albumName+'/'+files[i],function(err,stats){
                  if(err){
                      callback("找不到文件"+files[i],null);
                      return;
                  }
                    if(stats.isFile()){
                        allImages.push(files[i]);
                    }
                    iterator(i+1);
              })
        })(0);
    })
}