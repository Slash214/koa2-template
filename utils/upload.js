/**
 * @description 工具函数 图片上传逻辑
 * @author 爱呵呵 JoshuaYang
 */

const path = require('path')
const fse = require('fs-extra')

// 如果上线了  存储目录 改变 请检查自己目录的层级关系
// const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', 'uploadFiles')

// 是否需要创建目录  如果没有会自动创建
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
      fse.ensureDir(DIST_FOLDER_PATH)
    }
})

// 文件最大体积 1M 
const MIX_SIZE = 1024 * 1024 * 1024


/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} filePath 文件路径
 */

 async function saveFile({
    name,
    type,
    size,
    filePath
  }) {
    if (size > MIX_SIZE) {
      await fse.remove(filePath) //删除临时文件
      return new ErrorModel(uploadFileSizeFailInfo)
    }
  
    // 这里应该是有统一的文件服务管理，上传文件返回图片url  这里可以制作成七牛云图片上传类型
    // 调用api 上传，但目前没有使用下面保存文件的方法 
    // 移动文件
  
    
    let time = +new Date()
    const fileName = time + '_' + name // 防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName) //目的地
    await fse.move(filePath, distFilePath)
  
    // 返回信息  /2.jpg 的信息
    return '/' + fileName
  }
  
  
  module.exports = {
    saveFile
  }