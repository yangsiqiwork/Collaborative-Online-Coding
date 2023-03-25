var express = require("express");
var router = express.Router();
var path = require('path');


//访问根目录时，发送index.html文件给他
router.get("/", function(req, res){  
    res.sendFile("index.html", {root: path.join(__dirname, '../../public/')});
});


module.exports = router;