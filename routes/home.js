/**
 * @description 首页路由
 * @author 爱呵呵
 */

const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    ctx.body = { message: 'Hello World', code: 200 }
})
 
module.exports = router