/**
 * @description 微信支付逻辑代码
 * @author 爱呵呵
 */

/**
 * @description 使用说明 根据我之前页面的结构，routes 路由层 接受前端发起的微信支付请求，在controller控制器层处理逻辑代码
 * 在utils目录里面存放微信支付的工具函数，比如加密，随机字符串产生函数，生成订单数据等等，在这里我统一放到wechat文件夹方便
 * 大家参考！
 */

// 目录说明
// wechat-routes
// wechat-controller
// db 数据库的操作了就是
// wechat-utils --工具函数


//以下四个变量都从微信公众平台获取或设置  此为测试账号，不可调试

// 2023-12-10 update
// 使用：wechatpay-node-v3 库实现


const wechatApp = {
    appId: 'appId',
    secret: '小程序密钥',
    key: '商家密钥',
    mch_id: '商家号'
}

module.exports = {
    wechatApp
}
