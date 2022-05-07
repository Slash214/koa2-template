const router = require('koa-router')()
const { select, addFile } = require('../controller/test')
const koaFrom = require('formidable-upload-koa')  // 使用的插件获取的图片文件

router.prefix('/test')

router.get('/list', select)
router.post('/upload', koaFrom(), addFile)

module.exports = router