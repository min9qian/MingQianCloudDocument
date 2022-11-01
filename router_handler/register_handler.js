const db = require('../db/index')


exports.register = (req, res) => {
    // 获取客户端提交到服务器的用户信息
    const userinfo = req.body;
    // 对表单属性进行合法性的校验
    if(userinfo.repassword !== userinfo.password){
        return res.cc('两次密码输入不一致，注册失败');
    }

    // 定义SQL语句 查询用户名是否被占用
    const sqlStr = 'select * from users where account=?';
    db.query(sqlStr, userinfo.account, (err, results) => {
        // 执行SQL语句失败
        if(err) {
            return res.cc(err);
        }

        // 用户名查重
        if(results.length > 0){
            // return res.send({ status: 1, message: '用户名被占用，请更换用户名！'});
            return res.cc('用户名被占用，请更换用户名！');
        }

        // 定义插入新用户的 SQL语句
        const sql = 'insert into users set ?';

        
        db.query(sql, {account: userinfo.account, password: userinfo.password}, (err, results) => {

            if(err) return res.cc(err);

            if(results.affectedRows !== 1) return res.cc('用户注册失败，请稍后再试！');

            return res.cc('用户注册成功！', 0);
        })

    })

}