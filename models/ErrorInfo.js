/**
 * @description 失败信息集合， 包括 errno 和 message
 * @author 爱呵呵
 */

module.exports = {
    NoPageRouter: {
      code: 404,
      message: 'The current route is empty'
    },
    ParamsNotNull: {
      code: 5002,
      message: '参数不能为空'
    },
    TokenNotNull: {
      code: 5003,
      message: '令牌不存在'
    },
    TokenFailure: {
      code: 5004,
      message: '令牌过期了'
    },
    ImgFileNotNull: {
      code: 5005,
      message: '图片文件不存在'
    }
}