/**
 * @description 数据返回模型
 * @author 爱呵呵
 */


// 基础模块
class BaseModel {
    constructor({ data, message, code }) {
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
        if (code) {
            this.code = code
        }
    }
}

// 成功返回模型
class SuccessModel extends BaseModel {
    constructor({ data = [], message = 'success'}) {
        super({
            message,
            code: 200,
            data
        })
    }
}

// 失败返回模型
class ErrorModel extends BaseModel {
    constructor({ code, message }) {
        super({
            code,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}