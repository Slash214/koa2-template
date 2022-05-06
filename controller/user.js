const { SuccessModel, ErrorModel } = require('../models/ResModel')
const jwt = require('jsonwebtoken')
const config = require('../conf')
const { ParamsNotNull } = require('../models/ErrorInfo')

class UserCtl {
    async login(ctx) {
        const { userName, password } = ctx.request.body

        // 登陆生成token 代码逻辑
        if (userName && password) {
           let obj = { userName, password, gender: 1, level: 1, avatar: 'https://img.pinkyang.cn/2022.04.13-zsd.png' }
           let item = jwt.sign(obj, config.Token, { expiresIn: '1h' })  // expiresIn 表时间 1h = 一小时， 3d == 3天 
           obj.token = item
           ctx.body = new SuccessModel({ data: obj })
           return
        }

        ctx.body = new ErrorModel(ParamsNotNull)
    }

    async select(ctx) {
        ctx.body = new SuccessModel({ message: 'token验证成功', data: [] })
    }
}

module.exports = new UserCtl()