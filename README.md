# overview
#### 这是一个关于封装koa2的API接口项目,根据我自己的使用习惯封装的API接口框架,使用了 koa2  mysql2 sequelize 目前正在开发中,打算制作两个版本一个是集成简单的增删查改, 一个是demo展示包括比较常见的qq授权登陆,微信转发,图片上传等功能,

# 使用方法
> git clone https://github.com/Slash214/koa2-template.git    
> cd koa2-template    
> npm install    
> npm run dev 本地开发 ，线上 npm run prd  确保安装了pm2 否则会报错    

# 依赖说明 versions
-  node v14.16.1 npm 6.x
-  mysql2  (mysql8.0+) v2.3.3
-  koa2-cors  跨域包 v2.0.6
-  date-fns  时间格式工具包 v7.0.3
-  koa-router koa路由 v10.1.1
-  cross-env  环境切换 v7.0.3
-  koa  v2.13.4
-  sequelize 数据库操作 v6.19.2 
-  formidable-upload-koa  图片上传插件
-  fs-extra 文件读写
-  jsonwebtoken jwt生成令牌
-  axios  网络请求


# Koa2-Api-Template
### 功能开发
- 支持基础的增删查改
- 完成微信支付代码逻辑
- 完成QQ授权登陆代码
- 图片上传
- 等待开发中


#  项目结构目录说明

- utils  工具函数目录
- routes 路由目录
- models 返回的数据模型目录
- middlewaares  中间件目录
- controller 控制器目录 
- conf 常量配置
- bin  入口函数
- example 案例代码


# 2023-12-10 更新微信支付方法 使用：wechatpay-node-v3 库完成 更简单方便!