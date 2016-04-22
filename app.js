var express = require('express');
var app = express();

app.use(express.static('./'));

var port = 3000;
app.listen(port,function(){
    console.log("Expressサーバーがポート%dで起動しました。モード:%s",port,app.settings.env)
});
