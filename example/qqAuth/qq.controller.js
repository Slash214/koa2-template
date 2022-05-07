/**
 * @description qq授权 控制器 axios 请求的腾讯接口
 * @author 爱呵呵
 */

class QQCtl {
    async QQauth(ctx) {
      const { code } = ctx.request.query
      console.log("code", code) // 打印查看是否获取到

      
      // 存在code 继续走下面 逻辑 不存在就返回 
      let token = '', openid = '', userInfo = ''

      token = await QQCtl.QQgetAccessToken(code) // 根据code 换取token
      console.log('返回的token',token) 
      openid = await QQCtl.QQgetOpenID(token)
      console.log('返回的token',openid)

      if (openid && token) {
        userInfo = await  QQCtl.QQgetUserInfo(token, openid)  // 如果都获取到了，获取用户信息
        console.log("返回的结果", userInfo)
      }

        // 封装： 
        if (userInfo) {
            let { nickname, openids, gender, province, city, year, figureurl_qq_2, figureurl_qq_1 } = userInfo || {}
            let obj = {
                nickname,
                openid: openids,
                gender: gender === '男' ? 1 : 2,
                province,
                city, 
                year,
                avatar:figureurl_qq_2 ? figureurl_qq_2 : figureurl_qq_1
            }  
            console.log('封装的obj', obj)  
            // item = await register({ userInfo: obj, way: 'qq' })  这里是我的存储数据库
            /** 从这里到封装 都是改变我获取的用户信息存储到数据库里面，根据数据库的存储，创建新用户，如果有
            * 用户我就查询并获取用户的id 然后返回给前端 用户的 id
            */
            ctx.state = {
                id: item.data.id
            }
            // 使用的njk 去渲染的页面
            // await ctx.render('login', ctx.state)  // 如果获取到用户 id 返回 前端一个页面并携带参数 用户ID
        }

    }
    static async QQgetAccessToken(code) {
      let result, 
      appId = '', 
      appKey = '' , 
      state = '自定义', 
      redirectUrl = 'https://xxxxx/qqauthor'

      // 这里 使用 Promise 返回应该更简单一些
      await axios({
        url: `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${appId}&client_secret=${appKey}&code=${code}&state=${state}&redirect_uri=${redirectUrl}&fmt=json`,
        method: 'GET'
      }).then(res => { 
        console.log('获取成功', res.data)  
        result = res.data?.access_token
      }).catch(err => {
        console.log(err)
        result = err
      })
      
      return result
    }
    static async QQgetOpenID(accessToken) {
      let result = ''

      await axios({
        url: `https://graph.qq.com/oauth2.0/me?access_token=${accessToken}&fmt=json`,
        method: 'GET'
      }).then(res => {
        console.log('获取的数据', res)
        result = res.data?.openid
      }).catch(err => {
        console.log(err)
        result = err
      })

      return result
    }
    static async QQgetUserInfo(token, openid) {
      // 根据Openid 和 Token 获取用户的信息
      let result    
      await axios({
        url: `https://graph.qq.com/user/get_user_info?access_token=${token}&oauth_consumer_key=101907569&openid=${openid}`,
        method: 'GET'  
      }).then(res => {
        result =  res?.data
      }).catch(err => {
        console.log(err)
        result = err
      })
      
      return result
    }
}

module.exports = new QQCtl()