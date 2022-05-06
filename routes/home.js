/**
 * @description 首页路由 /路由，可以配合pug，njk等生成页面，但我这里考虑只是单纯的接口于是并没集成静态页面生成的
 * @author 爱呵呵
 */

const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    ctx.body = { message: 'Hello World', code: 200 }
})
 
module.exports = router