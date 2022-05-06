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
}