/**
 * @description 数据库存储配置
 * @author 爱呵呵
 * @param host  数据库IP地址
 * @param user  数据库用户名 
 * @param password  数据库登陆密码
 * @param port  数据库端口号 默认 3306
 * @param database 数据库名称
 */

const { isProd } = require('../env')  // 线上地址不一样

let MYSQL_CONF = {}

if (isProd) {
    MYSQL_CONF = {
        host: '',
        user: 'root',
        password: '',
        port: '',
        database: ''
    }
} else {
    MYSQL_CONF = {
        host: '',
        user: '',
        password: '',
        port: '',
        database: ''
    }
}

module.exports = { MYSQL_CONF }