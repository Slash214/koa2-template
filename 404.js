/**
 * @description 404路由
 * @author 爱呵呵
 */

const router = require('koa-router')()

router.get("(.*)", async (ctx, next) => {
   ctx.body = { message: '404 路由', status: 404 }
})


module.exports = router;
 