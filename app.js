const express = require('express')
// 提交表单数据中间件，否则req.body为undefined
const bodyParser = require('body-parser');

// 路由中去掉#号，改为history模式
const history = require('connect-history-api-fallback')
// 解决跨域问题
const cors = require('cors');

const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(history());

// 封装res.cc函数
app.use((req, res, next) => {
    // status 默认值为1，表示失败的情况
    res.cc = function (err, status = 1){
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})

app.use(express.static(__dirname + '/static'))

const loginRouter = require('./router/login')
const registerRouter = require('./router/register')
app.use('/', loginRouter);
app.use('/', registerRouter);

app.listen(5000, (err) => {
    if(!err) console.log('服务器成功运行！');
})