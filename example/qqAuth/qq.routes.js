/**
 * @description qq授权登陆 路由层
 * @author 爱呵呵
 */

const router = require('koa-router')()
const { QQauth } = require('./qq.controller')

router.prefix('/qq')
router.get('/auth', QQauth)


 