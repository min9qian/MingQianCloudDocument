const mysql = require('mysql');

const db = mysql.createPool({
    host: 'sh-cynosdbmysql-grp-rjjn7l2w.sql.tencentcdb.com',
    port: 27666,
    user: 'MingQian',
    password: 'Zhoujingx1ma',
    database: 'database_cloud_document'
})

module.exports = db