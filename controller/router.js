var file=require("../models/file.js");
var formidable = require('formidable');
var path=require('path');
var fs=require('fs');

exports.showIndex=function(req,res,next){
    // res.render('index.ejs',{
    //     "albums":file.getAllAlbum()
    // });
    file.getAllAlbums(function(err,allAlbums){
        if(err){
            next();
            return;
        }
        res.render("index.ejs",{
            "albums":allAlbums
        })
    })
}
// 相册页
exports.showAlbum=function(req,res,next){
    // 遍历相册的所有图片
    var albumName=req.params.albumName;
    // 具体业务交给model
    file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
        if(err){
            next();
            return;
        }
        res.render("album",{
             "albumname":albumName,
             "images":imagesArray
        });
    });  
}
//上传页
exports.showUp=function(req,res,next){
    // 用file调用getAllAlbums函数，得到所有文件夹名字之后做的事情，写在回调函数中
    file.getAllAlbums(function(err,albums){
        res.render("up",{
        "albums":albums
    });
    })
}

//上传表单
exports.doPost=function(req,res,next){
    var form = new formidable.IncomingForm();
 
    //设置上传的缓存位置
    form.uploadDir=path.normalize(__dirname+'/../tempup/'); 
    form.parse(req, function(err, fields, files) {
        // console.log(fields);//要上传去的文件夹名
        // console.log(files);//上传文件的信息（大小、名字、类型、时间、位置）
        //给缓存的文件改名
        if(err){
            next();
            return;
        }

        // 判断文件大小
        var sizeMax=1024*1024;
        var size=parseInt(files.picture.size);
        if(size>sizeMax){
            res.send("图片大小不能超过1M");
            fs.unlink(files.picture.path);
            return;
        }

        var filesname=fields.files;
        var filename=files.picture.name;
        var oldpath=files.picture.path;
        var newpath=path.normalize(__dirname+'/../uploads/'+filesname+'/'+filename);
        console.log(oldpath);
        console.log(newpath);
        fs.rename(oldpath,newpath,function(err){
            if(err){
                res.send('上传失败');
                next();
                return;
            }
            res.send('上传成功');
        })
    });
    return;
}