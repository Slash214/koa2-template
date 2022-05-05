const router = require('koa-router')()
const { select } = require('../controller/test')

router.get('/user', select)

module.exports = router