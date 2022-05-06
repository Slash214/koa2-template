/**
 * @description 登陆检查 检查 token 是否过期 
 * @author 爱呵呵
 */

const jwt = require('jsonwebtoken')
const config = require('../conf')
const { ErrorModel } = require('../models/ResModel')
const { TokenNotNull, TokenFailure } = require('../models/ErrorInfo')

async function loginCheck(ctx, next) {
  let url = ctx.url.split('?')[0]
  console.log('获取的url', url)
  if (url === '/user/login' || url === '/user/register') {
    await next()
    return
  }

  let token = ctx.request.headers['token']
  console.log('获取的token', token)

  if (token) {
    // try {
    console.log(1)
    jwt.verify(token, config.Token, async (err,decoded ) => {
        console.log('数据', decoded)
        console.log('错误信息', typeof err)
        if (err) {
          ctx.body = new ErrorModel({ message: err, code: 5004 })
          return
        }

        const { iat, exp } = decoded
        let nowtime = tamp(Date.parse(new Date()).toString())
        if (nowtime - iat <= exp) {
          await next()
        } else {
          ctx.body = new ErrorModel(TokenFailure)
        }

    }) 
  } else {
    ctx.body = new ErrorModel(TokenNotNull)
  }
}


function tamp(time) {
    return time.substr(0, 10);
}

module.exports = loginCheck