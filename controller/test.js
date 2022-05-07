const { SuccessModel, ErrorModel } = require('../models/ResModel')
const { saveFile } = require('../utils/upload')
const { ImgFileNotNull } = require('../models/ErrorInfo')

class TestCtl {
    async select (ctx) {
        ctx.body = new SuccessModel({})
    }
    async addFile (ctx) {
        const file = ctx.req.files['file']  // 上传的参数名file
        // console.log(file.name)
        // console.log(file instanceof Object)
        if (!file.size || !file.name) {
           ctx.body = new ErrorModel(ImgFileNotNull)
           return
        }
        const { size, path, name, type } = file
        let url = await saveFile({
            name,
            type,
            size,
            filePath: path
        })

        ctx.body = new SuccessModel({ data: url })
    }
}

module.exports = new TestCtl()