/**
 * @description 环境变量
 * @author 爱呵呵
 */

const ENV = process.env.NODE_ENV

module.exports = {
    isDev: ENV === 'dev',
    isProd: ENV === 'production', 
}