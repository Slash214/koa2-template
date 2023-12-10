/**
 * @description 微信支付 路由层
 * @author 爱呵呵
 */

const router = require('koa-router')()
const { notic, payOrder } = require('./wechat.controller')

router.prefix('/wechat')
router.get('/notify', notic)
router.post('/pay', payOrder)
