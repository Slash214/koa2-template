const router = require('koa-router')()
const { select } = require('../controller/test')

router.get('/test', select)


module.exports = router