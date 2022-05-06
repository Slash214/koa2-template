/**
 * @description  请求微信官方接口这里使用的是axios 
 * @author 爱呵呵
 */


const { wechatApp } = require('./index')
const Util = require('./wechat.utils')

class WechatCtl {
    async create(ctx) {
        // 开始的请求 需要code 是因为 在服务端完成获取用户Openid的情况 
        // 如传入Openid 就不需要code 换取, 但肯定需要商品的价格
        // 如果存在Openid 就不需要了
        let { code, total_fee, openid } = ctx.request.body

        console.log('check params', code ,total_fee, openid)  // check 参数
        
        if (!total_fee && openid || code) {
            ctx.body = { message: '参数不完整', code: 5006 }
            return
        }
   
        if (!openid) {
            // 不存在openid 就使用code 获取当前用户的openid  
            let result = await WechatCtl._getOpenid(code, wechatApp.appId, wechatApp.secret)
            openid = result?.openid
        }

        console.log('获取的opendid', openid)

        let apiUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";  // 微信官方接口
        total_fee = total_fee * 100   //订单价格,单位是分
        let detail = '商品的描述'; //商品的描述
        let out_trade_no = Util.getWxPayOrdrID(); //订单号
        let timeStamp = Util.createTimeStamp(); //时间节点
        let nonce_str = Util.createNonceStr() + Util.createTimeStamp(); //随机字符串
        let spbill_create_ip = Util.get_client_ip(ctx); //请求ip
        let notify_url ='https://lovehaha.cn/xcx/wechat/notify';   // 下面路由的地址。上线了需要真的地址
        let formData = Util.getfromData(wechatApp.appId, detail, wechatApp.mch_id, nonce_str,notify_url, openid, out_trade_no, spbill_create_ip, total_fee)
        
        // console.log('当前表单', formData)
        const item  = await WechatCtl._ReqInfo({ formData, apiUrl, nonce_str, timeStamp })
        // 返回成功的信息
        ctx.body = new SuccessModel(item)
    }

    async notic(ctx) {
        console.log(ctx.request.body)
        console.log('支付成功')
        
        // 这里就是微信支付成功回会请求触发的接口
    }
    
    static async _getOpenid() {
        return new Promise((reslove, reject) => {
            axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`, {
            }).then(res => {
              reslove(res.data)
            }).catch(err => {
              console.log(err)
              reject(res.data)
            })
        })
    }

    static async _ReqInfo({ formData, apiUrl, nonce_str, timeStamp }) {
        return new Promise((reslove, reject) => {
            axios({
                method: 'POST',
                url: apiUrl,
                data: formData
            }).then(res => {
                let result_code = Util.getXMLNodeValue('result_code', res.data.toString("utf-8"));
                let resultCode = result_code.split('[')[2].split(']')[0];
                console.log('状态', resultCode)
                if (resultCode = 'SUCCESS') {
                    console.log('请求成功')
                    let item = WechatCtl.dealPaymentSuccessful(resultCode, res.data, nonce_str, timeStamp)
                    console.log(item)
                    reslove(item)
                } else {
                    let item = {
                        msg: '失败',
                        resultCode,
                    }
                    reslove(item)
                }
            }).catch(err => {
                console.log(err)
                console.log('请求失败')
            })
        })
    }

    static dealPaymentSuccessful(resultCode, body, nonce_str, timeStamp) {
        if(resultCode === 'SUCCESS'){ 
            //成功
            let prepay_id = Util.getXMLNodeValue('prepay_id', body.toString("utf-8")).split('[')[2].split(']')[0]; //获取到prepay_id
            //签名
            let _paySignjs = Util.paysignjs(wechatApp.appId, nonce_str, 'prepay_id='+ prepay_id,'MD5',timeStamp);
            let args = {
                appId: wechatApp.appId,
                timeStamp: timeStamp,
                nonceStr: nonce_str,
                signType: "MD5",
                package: prepay_id,
                paySign: _paySignjs,
                status:200
            };
            return args;
        }
        // 没有处理失败的
    }
}

module.exports = new WechatCtl()