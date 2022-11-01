const db = require('../db/index')

exports.login = (req, res) => {
    // 接受表单数据
    const userinfo = req.body;
    // 定义SQL语句
    const sql = `select * from users where account=?`;
    // 执行SQL语句，根据用户名查询用户的信息
    db.query(sql, userinfo.account, (err, results) => {
        // 执行SQL语句失败
        if(err) return res.cc(err);

        // 执行SQL语句成功， 但是获取到的数据条数不等于1
        if(results.length != 1) return res.cc('登录失败！');

        // 判断密码是否正确
        if(results[0].password !== userinfo.password) return res.cc('登录失败');

        res.send({
            status: 0,
            message: '登录成功！',
        });

    })
}