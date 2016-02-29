/**
 *  common-util
 *  封装通用方法
 *  Created by Jacky.L on 4/16/14.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  util = require('util'),
  http = require('http'),
  crypto = require('crypto');

/**
 * 验证手机号
 * @param phone
 * @returns {boolean}
 */
exports.isValidPhone = function (phone){
  var reg = /^(13|15|18|17)[0-9]{9}$/;
  return reg.test(phone);
};

//获取num位随机数
exports.getRandomCode = function (num) {
  //随机数
  var source = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x",
    "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
    "Y", "Z"
  ];
  num = num || 5;
  var code = "";
  for (var i = 0; i < num; i++) {
    code += source[Math.round(Math.random() * 61)];
  }
  return code;
};

/**
 * 判断timstamps数组中的时间是否都在时间区间内
 * @param begin
 * @param end
 * @param timestamps    时间数组
 * @param timeInterval  循环间距
 * @returns {boolean}
 */
exports.isBetweenTimeZone = function (begin, end, timestamps, timeInterval) {

  for (var i=0; i<timestamps.length; i++) {
    var time = timestamps[i];
    if (timeInterval) {
      var sub = (time - begin) % timeInterval;
      var floor = (Math.floor(time - begin)) / timeInterval;
      if (sub < 0 || (time - (floor * timeInterval)) > end)
        return false;
    } else if(time < begin || time > end) {
      return false;
    }
  }
  return true;
};

/**
 * 验证时间合法性
 * @param timestamps
 * @param base
 * @param slot
 * @returns {boolean}
 */
exports.isValidatedTime = function (timestamps, base, slot) {
  //
  for (var i=0; i<timestamps.length; i++) {
    if ((timestamps[i] - base) % slot !== 0)
      return false;
  }
  return true;
};

var MD5 = function (data, salt, upper){
  if (data && salt) data += salt;
  if (upper)
    return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
  else
    return crypto.createHash('md5').update(data).digest('hex');
};

/**
 * MD5加密
 * @param data
 * @returns {*}
 */
exports.commonMD5 = function (data, salt, upper) {
  return MD5(data, salt, upper);
};

/**
 * Juliye MD5加密
 * @param data
 * @param isInit
 * @returns {*}
 */
exports.genJuliyeMD5 = function (data, isInit) {
  if (isInit){
    // 明文 - md5 - md5
    return MD5(MD5(data), 'wecare', true);
  }else{
    // data(一次md5) - md5
    return MD5(data, 'wecare', true);
  }
};



exports.commonResult = function (statusCode, msgStr, data) {
  return {status: statusCode, msg: msgStr, res: data};
};

/**
 * 通用应答的Response实体结构
 * @param res
 * @param status
 * @param data
 * @param type
 */
exports.commonResponse = function (res, status, data, type) {
  //console.log("response: " + util.inspect(res) );//+ status + data + type
  var contentType = 'application/json';
  if (type) contentType = type;
  if (data === undefined) data = {};
  res.status(status)
    .set('Content-Type', contentType)
    .json(data);
};
/**
 * 获取当前要查询的分页条件
 * @param req
 * @param defaultFrom
 * @param defaultPageSize
 * @returns {{$slice: *[]}}
 */
exports.getCurrentPageSlice = function (req, defaultFrom, defaultPageSize, defaultSort) {
  var from = defaultFrom;
  var pageSize = defaultPageSize;
  var size = parseInt(req.query.pageSize);
  var num = parseInt(req.query.pageNum);
  var sorts = {'createdAt': 1};//按日期从小到大排列//{'createDate': -1}//按日期从大到小排序
  //pageSlice.sort = sort;
  //console.info(size + " : " + num + "  :" + typeof(size));
  if ((typeof(size) === 'number') && size > 0)
    pageSize = size;
  if ((typeof(num) === 'number') && num > 0)
    from = num * pageSize;
  var slices = {skip: from, limit: pageSize};
  if (defaultSort) {
    sorts = defaultSort;
    slices.sort = sorts;
  } else {
    slices.sort = sorts;
  }

  console.info(util.inspect(slices));
  return slices;
};
/**
 * 判断请求中是否有body内容
 * @param req
 * @returns {boolean}
 */
exports.hasBody = function (req) {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
};
/**
 * 判断请求body类型是否为form表单
 * @param req
 * @returns {boolean}
 */
exports.isFormReq = function (req) {
  console.log(util.inspect(req.headers));
  var type = req.headers["content-type"];
  console.log(util.inspect(type));
  return (type.indexOf('multipart/form-data') > -1)
    || (type.indexOf('application/x-www-form-urlencoded') > -1);
};
/**
 * 判断请求body类型是否为Json实体
 * @param req
 * @returns {boolean}
 */
exports.isJsonReq = function (req) {
  var type = req.headers.content_type;
  return type.indexOf('application/json ') > -1;
};
/**
 * 请求中是否明确指定返回类型为html
 * @param req
 */
exports.acceptHtml = function (req) {
  var accept = req.headers.accept;
  console.info(accept + "   typeof accept: " + typeof(accept));
  if (typeof(accept) != 'undefined')
    return accept.indexOf('text/html') > -1;
  else
    return false;
};
/**
 * 获取MongoDB中的ObjectId对象
 * @returns {*}
 */
exports.getNewObjectId = function (id) {
  if(id)
    id = mongoose.Types.ObjectId(id);
  else
    id = mongoose.Types.ObjectId();
  console.info("new Object ID : " + id);
  return id;
};
/**
 *
 * @param hanz
 * @returns {Array}
 */
//exports.getPinyinNormal = function (hanz) {
//  var res = [];
//  if (typeof(hanz) == 'string') {
//    var tmp = pinyin(hanz, {
//      style: pinyin.STYLE_NORMAL
//    });
//    for (var x = 0; x < tmp.length; x++) {
//      res[x] = tmp[x][0];
//    }
//  }
//  return res;
//};
/**
 * 获取
 * @param doc
 * @param newdoc
 * @param params
 */
exports.getFormatDocObj = function (doc, newdoc, params) {

  var len = 0;

  if (params)
    len = params.length;

  console.log("params length is: " + len);

  for (var i = 0; i < len; i++) {
    var param = params[i];
    //console.log("param: " + param);
    if (newdoc[param] || newdoc[param] == "" || newdoc[param] == 0) {//如果有该元素 或者 该元素为空或零
      doc[param] = newdoc[param];
    }
  }
  return doc;
};

/**
 *
 * @param uuid
 * @returns {*}
 */
exports.isUUID24bit = function(uuid){
  return uuid_24bit_style.test(uuid);
};
/**
 *
 * @param tplId
 * @param number
 * @param text
 * @private
 */
exports.sendSms = function (tplId, number, text) {
  console.log("Current env is:" + server.env + "; Begin Sending message:" + tplId
    + "  :  " + number + "  :  " + text);

  if (!number || number == "") {
    return;
  }

  // 测试环境短信屏蔽列表
  var idList = ["586493","668197","998943","1015711","1155697","1155701"];
  if (process.env.NODE_ENV != "production" && idList.indexOf(tplId) > 0) { //非生产环境且在屏蔽列表中
    return;
  }



  //测试环境短信验证码
  //if (process.env.NODE_ENV != "production" && tplId == "408913") {
  //  tplId = "410070";
  //}
  if (process.env.NODE_ENV != "production") {
    text += '_[开发模式]';
  }

  request.post(sms.SMS_SERVER + sms.SMS_SEND_API,
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('send message failed:', err);
      }
      console.log('send message successful!  Server responded with:' + body);
    }).form({
      "apikey": sms.API_KEY,
      "mobile": number,
      "tpl_id": tplId,//"642401",
      "tpl_value": text//"#code#=xxxx"
    });
};
/**
 *
 * @param params
 * @returns {boolean}
 */
exports.isAllExist = function (params) {
  for (var i = 0; i < params.length; i++) {
    if (!(params[i] || params[i] == 0 || params == ""))
      return false;
  }
  return true;
};

/**
 * @param params
 * @returns {boolean}
 */
exports.isProductionEnv = function(){
  if(process.env.NODE_ENV == "production"){
    return true;
  }
  else{
    return false;
  }
};

/**
 * @param params
 * @returns {boolean}
 */
exports.isProductionNotice = function(){
  if(process.env.NODE_ENV == "production"){
    return "";
  }
  else{
    return "［测试模式］";
  }
};
/**
 * 参数是否存在
 * @param param
 * @returns {boolean}
 */
exports.isExist = function (param) {
  if (param == 0 || param == "" || !param)
    return false;
  return true;
};
/**
 *
 * @returns {string}
 */
exports.generateAuthCode = function () {
  return (Math.random() + "").substr(2, 6);
};
/**
 * MM月dd日hh时mm分
 * @param time
 * @returns {string}
 */
exports.genCommonDate = function (time) {
  var d = new Date(time);
  var dstring = "";
  dstring += d.getMonth() + 1;
  dstring += "月";
  dstring += d.getDate();
  dstring += "日";
  dstring += d.getHours() + "时" + d.getMinutes() + "分";

  return dstring;
};

/**
 * 获取每天零点的timestamp
 *
 * @param date
 * @returns {*}
 */
exports.getDateBeginTS = function (date) {

  var dateValue ;

  if (date)
    dateValue = new Date(date);
  else
    dateValue = new Date();

  var begin = new Date(dateValue.toLocaleDateString()).valueOf();

  return begin;
};

/**
 * yyyy-MM-dd
 * @param time
 * @returns {string}
 */
exports.getDate = function (time) {
  var d = new Date(time);
  return d.format("yyyy-MM-dd");
};

/**
 * yyyy-MM-dd
 * @param time
 * @returns {string}
 */
exports.getyyyyMMdd = function (time) {
  var d = new Date(time);
  return d.format("yyyyMMdd");
};

/**
 * 日期格式化方法
 * @param format
 * @returns {*}
 */
Date.prototype.format = function(format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};
