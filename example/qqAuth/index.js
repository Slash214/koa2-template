/**
 * @description qq授权登陆
 * @author 爱呵呵
 */


/**
 * qq登陆 当初也是踩坑不少 感兴趣的小伙伴可以去掘金看看,顺便点个赞吧.嘿嘿嘿
 * 流程 为此特意记录了下来: https://juejin.cn/post/6977399909532041247
 * 1: 注册开发者账号 成为开发者 去腾讯开发者平台 https://open.tencent.com/ (获取自己的appid和appkey)
 * 2: 放置“QQ登录”按钮_OAuth2.0 前端添加点击事件
 * 3: 服务端逻辑
 * {
 *     获取Authorization Code
 *    通过Authorization Code 获取 Access Token  （Code ————> 换 Token）
 *    通过Access Token 获取 用户的Openid
 *    最后通过获取的 Token 和 Openid 获取用户的信息
 * }
 */

// ps 想看详细的过程和踩坑过程推荐去掘金查看