const express = require('express');
const app = express();
const http = require('http').createServer(app);
let path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static'),
    errorHandler = require('errorhandler'),
    expressErrorHandler = require('express-error-handler'),
    expressSession = require('express-session'),
    ejs = require('ejs'),
    fs = require('fs'),
    url = require('url'),
    cors = require('cors') //ajax 요청시 cors 지원

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));
app.use(cors());

const router = express.Router();

//메인 페이지 라우터
const index = require('./routes/index.js');
router.route('/').get(index);

//우편 만들기 라우터
const makeletter = require('./routes/make-letter.js');
router.route('/make/letter').get(makeletter);

//우편 POST 라우터
const postletter = require('./routes/post-letter.js');
router.route('/post/letter').post(postletter);

//우편 POST 후 공유화면 라우터
const shareletter = require('./routes/share-letter.js');
router.route('/share/:url_id').get(shareletter);

//우편 VIEW 라우터 (URL)
const arrivedletter = require('./routes/arrived-letter.js');
router.route('/:url_id').get(arrivedletter);

//질문 풀이 시작 라우터
const getqustion = require('./routes/get-question.js');
router.route('/get/question').post(getqustion);

//질문 풀이 라우터
const solvequstion = require('./routes/solve-question.js');
router.route('/solve/question').post(solvequstion);

app.use('/', router);

// 404 에러 페이지 처리
errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


//웹서버 생성
http.listen(app.get('port'),
    function () {
        console.log('server started - port: ' + app.get('port'));
    }
);