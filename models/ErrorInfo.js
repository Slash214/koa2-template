/**
 * @description 失败信息集合， 包括 errno 和 message
 * @author 爱呵呵
 */


 module.exports = {
    // 没有当前路由
    NoPageRouter: {
      code: 5000,
      message: 'The current route is empty'
    },
    // 菜单生成失败 存在相同名称
    MenuCreateFail: {
      code: 5001,
      message: '当前名称已存在'
    },
    // 参数不能为空
    ParameterIsNull: {
      code: 5002,
      message: '参数不能为空'
    },
    // 删除失败 可能不存在ID，可能SQL执行错误
    SQLDetailFail: {
      code: 5003,
      message: '删除失败,当前ID不存在'
    },
    UpdateInfoFail: {
      code: 5004,
      message: '更新失败'
    },
    LoginNoFind: {
      code: 5005,
      message: '账号密码错误'
    },
    addFail: {
      code: 5006,
      message: '增加失败'
    },
    uploadFileSizeFailInfo: {
      code: 5007,
      message: '图片尺寸不能超过1MB'
    }
  }