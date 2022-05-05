const Koa = require('koa')
const app = new Koa()
const body = require('koa-body')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const cors = require('koa2-cors')
const routing = require('./routes')
const noRouter = require('./404')

// 允许跨域
app.use(cors())

// 错误拦截
onerror(app)

// 中间件
app.use(body({
    jsonLimit: 2 * 1024 * 1024,
}))
app.use(logger())

routing(app)
app.use(noRouter.routes(), noRouter.allowedMethods())
// 日志
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


app.on('error', (err, ctx) => {
    console.error('server error | 服务器错误', err, ctx)
})

module.exports = app
