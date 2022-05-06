/**
 * @description 用户路由  logincheck 首先了token 检验，如不需要可直接移除
 * @author 爱呵呵
 */

const router = require('koa-router')()
const { login, select } = require('../controller/user')
const loginCheck = require('../middlewares/loginCheck')

router.prefix('/user')

router.post('/login', login)
router.get('/list', loginCheck, select)

module.exports = router