/**
 * @description  请求微信官方接口这里使用的是axios
 * @author 爱呵呵
 */

const wxPay = require("wechatpay-node-v3");
const { wechatApp } = require("./index");
const Util = require("./wechat.utils");
const fs = require("node:fs");

class WechatCtl {
  async payOrder(ctx) {
    let {
      code = "",
      total_fee,
      openid,
      desc = "默认的商品描述",
    } = ctx.request.body;

    //
    if (!code && !openid) {
      ctx.body = new ErrorModel(ParamsError);
      return;
    }

    if (!openid) {
      let res = await WechatCtl._getOpenid(
        code,
        wechatApp.appId,
        wechatApp.secret
      );
      openid = res?.openid;
    }

    const pay = new WxPay({
      appid: wechatApp.appId,
      mchid: wechatApp.mch_id,
      publicKey: fs.readFileSync("./conf/apiclient_cert.pem"),
      privateKey: fs.readFileSync("./conf/apiclient_key.pem"),
    });

    const params = {
      description: desc, // 订单描述
      out_trade_no: Util.getWxPayOrdrID(), // 订单号，一般每次发起支付都要不一样，可使用随机数生成
      notify_url: "http://192.168.1.5:4005/wechat/notic", //支付成功后，微信会向该地址发起请求
      amount: {
        total: total_fee * 100, // 支付金额，单位为分
      },
      payer: {
        openid: openid, // 微信小程序用户的openid，一般需要前端发送过来
      },
      scene_info: {
        payer_client_ip: Util.get_client_ip(ctx), // 支付者ip，这个不用写也没有问题
      },
    };

    const result = await pay.transactions_jsapi(params);

    if (result?.status === 200) {
      ctx.body = new SuccessModel({ data: result });
    } else {
      ctx.body = new ErrorModel(PayIsError);
    }
  }
  static async _getOpenid(code, appid, secret) {
    return new Promise((reslove, reject) => {
      axios
        .get(
          `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
          {}
        )
        .then((res) => {
          reslove(res.data);
        })
        .catch((err) => {
          console.log(err);
          reject(res.data);
        });
    });
  }
}

// class WechatCtl {
//     async create(ctx) {
//         // 开始的请求 需要code 是因为 在服务端完成获取用户Openid的情况
//         // 如传入Openid 就不需要code 换取, 但肯定需要商品的价格
//         // 如果存在Openid 就不需要了
//         let { code, total_fee, openid } = ctx.request.body

//         console.log('check params', code ,total_fee, openid)  // check 参数

//         if (!total_fee && openid || code) {
//             ctx.body = { message: '参数不完整', code: 5006 }
//             return
//         }

//         if (!openid) {
//             // 不存在openid 就使用code 获取当前用户的openid
//             let result = await WechatCtl._getOpenid(code, wechatApp.appId, wechatApp.secret)
//             openid = result?.openid
//         }

//         console.log('获取的opendid', openid)

//         let apiUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";  // 微信官方接口
//         total_fee = total_fee * 100   //订单价格,单位是分
//         let detail = '商品的描述'; //商品的描述
//         let out_trade_no = Util.getWxPayOrdrID(); //订单号
//         let timeStamp = Util.createTimeStamp(); //时间节点
//         let nonce_str = Util.createNonceStr() + Util.createTimeStamp(); //随机字符串
//         let spbill_create_ip = Util.get_client_ip(ctx); //请求ip
//         let notify_url ='https://lovehaha.cn/xcx/wechat/notify';   // 下面路由的地址。上线了需要真的地址
//         let formData = Util.getfromData(wechatApp.appId, detail, wechatApp.mch_id, nonce_str,notify_url, openid, out_trade_no, spbill_create_ip, total_fee)

//         // console.log('当前表单', formData)
//         const item  = await WechatCtl._ReqInfo({ formData, apiUrl, nonce_str, timeStamp })
//         // 返回成功的信息
//         ctx.body = new SuccessModel(item)
//     }

//     async notic(ctx) {
//         console.log(ctx.request.body)
//         console.log('支付成功')

//         // 这里就是微信支付成功回会请求触发的接口
//     }

//     static async _getOpenid() {
//         return new Promise((reslove, reject) => {
//             axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`, {
//             }).then(res => {
//               reslove(res.data)
//             }).catch(err => {
//               console.log(err)
//               reject(res.data)
//             })
//         })
//     }

//     static async _ReqInfo({ formData, apiUrl, nonce_str, timeStamp }) {
//         return new Promise((reslove, reject) => {
//             axios({
//                 method: 'POST',
//                 url: apiUrl,
//                 data: formData
//             }).then(res => {
//                 let result_code = Util.getXMLNodeValue('result_code', res.data.toString("utf-8"));
//                 let resultCode = result_code.split('[')[2].split(']')[0];
//                 console.log('状态', resultCode)
//                 if (resultCode = 'SUCCESS') {
//                     console.log('请求成功')
//                     let item = WechatCtl.dealPaymentSuccessful(resultCode, res.data, nonce_str, timeStamp)
//                     console.log(item)
//                     reslove(item)
//                 } else {
//                     let item = {
//                         msg: '失败',
//                         resultCode,
//                     }
//                     reslove(item)
//                 }
//             }).catch(err => {
//                 console.log(err)
//                 console.log('请求失败')
//             })
//         })
//     }

//     static dealPaymentSuccessful(resultCode, body, nonce_str, timeStamp) {
//         if(resultCode === 'SUCCESS'){
//             //成功
//             let prepay_id = Util.getXMLNodeValue('prepay_id', body.toString("utf-8")).split('[')[2].split(']')[0]; //获取到prepay_id
//             //签名
//             let _paySignjs = Util.paysignjs(wechatApp.appId, nonce_str, 'prepay_id='+ prepay_id,'MD5',timeStamp);
//             let args = {
//                 appId: wechatApp.appId,
//                 timeStamp: timeStamp,
//                 nonceStr: nonce_str,
//                 signType: "MD5",
//                 package: prepay_id,
//                 paySign: _paySignjs,
//                 status:200
//             };
//             return args;
//         }
//         // 没有处理失败的
//     }
// }

module.exports = new WechatCtl();
