

class TestCtl {
    async select (ctx) {
        ctx.body = { message: '测试', code: 200 }
    }
}

module.exports = new TestCtl()