/**
 * @description 微信支付逻辑订单信息处理
 * @author Joshua yang
 * @desc 补充：如果是wechatpay-node-v3 方法 这个utils的方法就可以不使用了！
 */


 var crypto = require('crypto')
 const {wechatApp} = require('./index')

 function getWxPayOrdrID(){
   var myDate = new Date();
   var year = myDate.getFullYear();
   var mouth = myDate.getMonth() + 1;
   var day = myDate.getDate();
   var hour = myDate.getHours();
   var minute = myDate.getMinutes();
   var second = myDate.getSeconds();
   var msecond = myDate.getMilliseconds(); //获取当前毫秒数(0-999)
   if(mouth < 10){ /*月份小于10  就在前面加个0*/
       mouth = String(String(0) + String(mouth));
   }
   if(day < 10){ /*日期小于10  就在前面加个0*/
       day = String(String(0) + String(day));
   }
   if(hour < 10){ /*时小于10  就在前面加个0*/
       hour = String(String(0) + String(hour));
   }
   if(minute < 10){ /*分小于10  就在前面加个0*/
       minute = String(String(0) + String(minute));
   }
   if(second < 10){ /*秒小于10  就在前面加个0*/
       second = String(String(0) + String(second));
   }
   if (msecond < 10) {
       msecond = String(String(00) + String(second));
   } else if(msecond >= 10 && msecond < 100){
       msecond = String(String(0) + String(second));
   }

   var currentDate = String(year) + String(mouth) + String(day) + String(hour) + String(minute) + String(second) + String(msecond);
   return currentDate;
 }

 // 封装成订单数据
 function getfromData(appId, detail, mch_id, nonce_str,notify_url, openid, out_trade_no, spbill_create_ip, total_fee) {
   var formData = "<xml>";
   formData += "<appid>"+appId+"</appid>"; //appid
   formData += "<body>" + detail + "</body>"; //商品描述
   formData += "<mch_id>"+mch_id+"</mch_id>"; //商户号
   formData += "<nonce_str>"+nonce_str+"</nonce_str>"; //随机字符串
   formData += "<notify_url>"+notify_url+"</notify_url>";
   formData += "<openid>" + openid + "</openid>";
   formData += "<out_trade_no>" + out_trade_no + "</out_trade_no>";//订单号
   formData += "<spbill_create_ip>"+spbill_create_ip+"</spbill_create_ip>";
   formData += "<total_fee>" + total_fee + "</total_fee>";
   formData += "<trade_type>JSAPI</trade_type>";
   formData += "<sign>" + paysignjsapi(appId,detail,mch_id,nonce_str,notify_url,openid,out_trade_no,spbill_create_ip,total_fee,'JSAPI') + "</sign>";
   formData += "</xml>";
   return formData;
 }

 // 随机字符串产生函数
 function createNonceStr() {
   return Math.random().toString(36).substr(2, 15)
 }
 // 时间戳产生函数
 function createTimeStamp() {
   return parseInt(new Date().getTime() / 1000) + ''
 }

 var get_client_ip = function(req) {
   var ip = req.headers['x-forwarded-for'] ||
       req.ip ||
       req.connection.remoteAddress ||
       req.socket.remoteAddress ||
       req.connection.socket.remoteAddress || '';
   if(ip.split(',').length>0){
       ip = ip.split(',')[0]
   }
   return ip;
 };

 function paysignjsapi(appid,body,mch_id,nonce_str,notify_url,openid,out_trade_no,spbill_create_ip,total_fee,trade_type) {
   var ret = {
       appid: appid,
       body: body,
       mch_id: mch_id,
       nonce_str: nonce_str,
       notify_url: notify_url,
       openid: openid,
       out_trade_no: out_trade_no,
       spbill_create_ip: spbill_create_ip,
       total_fee: total_fee,
       trade_type: trade_type
   };
   var string = raw(ret);
   string = string + '&key='+ wechatApp.key;
   console.log('string', string);
   var sign = crypto.createHash('md5').update(string, 'utf8').digest('hex');
   return sign.toUpperCase()
 }

 //解析xml
 function getXMLNodeValue(node_name, xml) {
   var tmp = xml.split("<" + node_name + ">");
   console.log('$', tmp[1]);
   var _tmp = tmp[1].split("</" + node_name + ">");
   return _tmp[0];
 }


 function paysignjs(appid, nonceStr, package, signType, timeStamp) {
   var ret = {
       appId: appid,
       nonceStr: nonceStr,
       package: package,
       signType: signType,
       timeStamp: timeStamp
   };
   var string = raw1(ret);
   string = string + '&key='+wechatApp.key;
   return crypto.createHash('md5').update(string, 'utf8').digest('hex');
 }


 function raw1(args) {
   var keys = Object.keys(args);
   keys = keys.sort()
   var newArgs = {};
   keys.forEach(function(key) {
       newArgs[key] = args[key];
   });

   var string = '';
   for(var k in newArgs) {
       string += '&' + k + '=' + newArgs[k];
   }
   string = string.substr(1);
   return string;
 }

 function raw(args) {
   var keys = Object.keys(args);
   keys = keys.sort();
   var newArgs = {};
   keys.forEach(function(key) {
       newArgs[key.toLowerCase()] = args[key];
   });
   var string = '';
   for(var k in newArgs) {
       string += '&' + k + '=' + newArgs[k];
   }
   string = string.substr(1);
   return string;
 }

 module.exports = {
   getXMLNodeValue,
   paysignjs,
   get_client_ip,
   createTimeStamp,
   createNonceStr,
   getWxPayOrdrID,
   getfromData
 }
