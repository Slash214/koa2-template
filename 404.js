/**
 * @description 404路由
 * @author 爱呵呵
 */

const router = require('koa-router')()
const { ErrorModel } = require('./models/ResModel')
const { NoPageRouter } = require('./models/ErrorInfo')

router.get("(.*)", async (ctx, next) => {
   ctx.body = new ErrorModel(NoPageRouter)
})


module.exports = router;
 