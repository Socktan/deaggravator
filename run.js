var http = require('http');
var express = require('express');
var app = express();
var compress = require('compression');
var bodyParser = require('body-parser');

app.use(compress());

console.log('__dirname = ' + __dirname);

app.use('/', express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
        console.log('listening');
    }
);

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, 'dist/media');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({storage: storage});

app.post('/uploads', upload.single('sourceVideo'), function (req, res, next) {
    //console.log(req.body);
    //console.log(req.file);
    res.send(req.file);
});
