var express = require('express');
var ejs = require('ejs');

var app = express();
// テンプレートエンジンの設定
app.engine('ejs', ejs.renderFile);
// 静的ファイルの設定
app.use(express.static('public'));

// BodyParserにより「req.body.message」が解析可能に
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


var data = {
    'Taro': 'taro@yamada',
    'Hanako': 'hanako@flower',
    'Sachiko': 'sachico@happy',
    'Ichiro': 'ichiro@baseball',
};

// トップページ
app.get("/", (req, res) => {
    var msg = 'This is Index Page!<br>'
        + '※メッセージを書いて送信して下さい。';
    res.render('index.ejs',
        {
            title: 'Index',
            content: msg,
            data:data,
        });
});


// ※POST送信の処理
app.post('/', (req, res) => {
    var msg = 'This is Posted Page!<br>' +
        'あなたは「<b>' + req.body.message +
        '</b>」と送信しました。';
    res.render('index.ejs',
        {
            title: 'Posted',
            content: msg,
        });
});


// otherページ
// app.get("/other", (req, res) => {
//     var name = req.query.name;
//     var pass = req.query.pass;
//     var msg = 'あなたの名前は「' + name +
//         '」<br>パスワードは「' + pass + '」です。';
//     res.render('index.ejs',
//         {
//             title: 'other',
//             content: msg,
//             link:{href:'/', text:'※トップに戻る'}
//         });
// });




var server = app.listen(8080, () => {
    console.log('Start server port:8080');
})