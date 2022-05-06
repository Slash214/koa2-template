const { SuccessModel } = require('../models/ResModel')

class TestCtl {
    async select (ctx) {
        ctx.body = new SuccessModel({})
    }
}

module.exports = new TestCtl()