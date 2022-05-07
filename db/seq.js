/**
 * @description sequelize 实例
 * @author 爱呵呵
 */

 const Sequelize = require('sequelize')
 const { MYSQL_CONF } = require('../../conf/db')
 const { isProd } = require('../../env')
 
const { host, user, password, database } = MYSQL_CONF

// 时间的时区问题
const conf = {
    host,
    dialect: 'mysql',
    timezone: '+08:00'
}
 
 
// 线上环境 使用 连接池
if (isProd) {
    conf.pool = {
        max: 5, // 连接池最大连接数量
        min: 0, // 最小
        idle: 10000 // 如果一个连接池 10 s 没有被使用 就被释放
    }
}
 
const seq = new Sequelize(database, user, password, conf)
// 后面依次是 数据库名称 和 账号名 密码
 
module.exports = seq