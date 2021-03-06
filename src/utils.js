/**
 * 浏览器的localStorage
 * @type {[Function]}
 */
const dbGet = (name) => {
  let value = localStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value)
  }
  return value
}

const dbSet = (name, value) => {
  if (typeof value === typeof {}) {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(name, value)
}

const dbRemove = (name) => {
  return localStorage.removeItem(name)
}

/**
 * 浏览器的sessionStorage
 * @type {[Function]}
 */
const ssdbGet = (name) => {
  let value = sessionStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value)
  }
  return value
}

const ssdbSet = (name, value) => {
  if (typeof value === typeof {}) {
    value = JSON.stringify(value)
  }
  return sessionStorage.setItem(name, value)
}

const ssdbRemove = (name) => {
  return sessionStorage.removeItem(name)
}

/**
 * 浏览器的cookie操作
 * @param  {[key]}    [传key]
 * @return {[value]}  [获取key的值]
 */
const getCookie = (key) => {
  let arr = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
  let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}
const setCookie = (key, value, days) => {
  // 设置cookie过期事件,默认是30天
  var expire = new Date();
  days = days || 30;
  expire.setTime(expire.getTime() + (+days) * 24 * 60 * 60 * 1000);
  // 薛天玲 设置cookie 放入子域名下 让微信H5也能取到
  document.cookie = key + "=" + encodeURIComponent(value) + ";expires=" + expire.toGMTString() + ";domain=" + "bl.com";
  let result = encodeURIComponent(value);
  document.cookie = key + "=" + result + ";expires=" + expire.toGMTString() + ";domain=" + "10.199.5.19";
};
const deleteCookie = (key) => {
  var expire = new Date();
  expire.setTime(expire.getTime() - 1);
  var cval = getCookie(key);
  if (cval != null) {
    // 把toGMTString改成了toUTCString，两者等价。但是ECMAScript推荐使用toUTCString方法。toGMTString的存在仅仅是
    // 为了向下兼容
    document.cookie = key + "=" + cval + ";expires=" + expire.toUTCString();
  }
}

/**
 * 日期格式化
 * @param  {[type]} format  yyyy-MM-dd hh:mm:ss
 * @return {[type]}        [description]
 */

const dateFormat = (format, time) => {
  let dt = new Date();
  if (time) {
    if (typeof time !== 'number') {
      time = time.toString().replace(/-/g, '/')
    }
    dt = new Date(time);
  }
  var date = {
    "M+": dt.getMonth() + 1,
    "d+": dt.getDate(),
    "h+": dt.getHours(),
    "m+": dt.getMinutes(),
    "s+": dt.getSeconds(),
    "q+": Math.floor((dt.getMonth() + 3) / 3),
    "S+": dt.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length))
    }
  }
  return format
}

/**
 * 数组对象排序,默认升序
 * @DateTime 2017-04-27T12:47:07+0800
 * @param    {[array]}               arrs [需要排序的数组]
 * @param    {[all]}                 prop [数组属性]
 * @return   {[array]}               [排序后的数组]
 */
const orderBy = (arrs, prop, sort = 1) => {
  return arrs.sort(function (obj1, obj2) {
    let val1 = obj1[prop];
    let val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
      if (!sort) {
        [val1, val2] = [val2, val1]
      }
    }
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  })
}

/**
 * 生成时间戳
 * @DateTime 2017-05-18T10:02:36+0800
 * @return   {[String]}                 [时间戳]
 */
const getTimeFormatToday = (date) => {
  let today = new Date(date * 1000)
  let year = today.getFullYear() + '';
  let month = (today.getMonth() + 1) + '';
  month = (month.length === 1) ? '0' + month : month;
  let day = today.getDate() + '';
  day = (day.length === 1) ? '0' + day : day;
  let hour = today.getHours() + '';
  hour = (hour.length === 1) ? '0' + hour : hour;
  let min = today.getMinutes() + '';
  min = (min.length === 1) ? '0' + min : min;
  let sec = today.getSeconds() + '';
  sec = (sec.length === 1) ? '0' + sec : sec;

  return year + month + day + hour + min + sec;
}

/**
 * 解决滑动上面的浮层下面的内容滚动
 * @DateTime 2017-08-06T12:05:23+0800
 * @return   {[type]}                 [description]
 */
const fixedBody = () => {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  document.body.style.cssText += 'position:fixed;width:100%;height:100%;top:-' + scrollTop + 'px;';
}

const looseBody = () => {
  var body = document.body;
  body.style.position = '';
  body.style.width = '';
  body.style.height = '';
  var top = body.style.top;
  document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
  body.style.top = '';
}

/**
 * 日期倒计时最多到天数
 * @DateTime 2017-9-22T12:05:23+0800
 * @param endTime 活动到期时间   2017-10-10 22:22:22
 * @param intervalId 定时器id
 * @return   {[object]}                 [description]
 */
const timerCountDown = (endTime, intervalId) => {
  let target_date = new Date(endTime).getTime() // set target date
  let current_date = new Date().getTime() // get fixed current date
  let difference = target_date - current_date;
  if (difference < 0) {
    if (intervalId) {
      clearInterval(intervalId);
    }
    return {
      days: -1,
      hours: -1,
      minutes: -1,
      seconds: -1
    };
  }
  let _second = 1000,
    _minute = _second * 60,
    _hour = _minute * 60,
    _day = _hour * 24;
  let days = Math.floor(difference / _day),
    hours = Math.floor((difference % _day) / _hour),
    minutes = Math.floor((difference % _hour) / _minute),
    seconds = Math.floor((difference % _minute) / _second);
  // fix dates so that it will show two digets
  days = (String(days).length >= 2) ? days : days;
  hours = (String(hours).length >= 2) ? hours : '0' + hours;
  minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
  seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

const giveCardCountDown = (difference, intervalId) => {
  difference = Number(difference);
  if (difference < 0) {
    // stop timer
    if (intervalId) {
      clearInterval(intervalId);
    }
    return {
      hours: "00",
      minutes: "00",
      seconds: "00"
    };
  }
  let _second = 1000, // 秒
    _minute = _second * 60, // 分
    _hour = _minute * 60; // 时
  // _day = _hour * 24; // 天
  let hours = Math.floor(difference / _hour),
    minutes = Math.floor((difference % _hour) / _minute),
    seconds = Math.floor((difference % _minute) / _second);
  hours = (String(hours).length >= 2) ? hours : '0' + hours;
  minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
  seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

/**
 * 计算2个日期之间相差多少天 多少小时
 * @DateTime 2017-9-22T12:05:23+0800
 * @param beginTime 活动到期时间   2017-10-10 22:22:22
 * @return   {[object]}                 [description]
 */
const diffTime = (beginTime, endTime) => {
  beginTime = beginTime.replace(/-/g, "/")
  let target_date = new Date(beginTime).getTime() // set target date
  let current_date = null;
  if (endTime) {
    endTime = endTime.replace(/-/g, "/")
    current_date = new Date(endTime).getTime() // get fixed current date
  } else {
    current_date = new Date().getTime()
  }
  let difference = Math.abs(target_date - current_date);
  let _second = 1000,
    _minute = _second * 60,
    _hour = _minute * 60,
    _day = _hour * 24;
  let days = Math.floor(difference / _day),
    hours = Math.floor((difference % _day) / _hour),
    minutes = Math.floor((difference % _hour) / _minute),
    seconds = Math.floor((difference % _minute) / _second);
  // fix dates so that it will show two digets
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

// 验证手机号
const valPhone = (phone) => {
  if (phone == "") {
    return false;
  } else if (!/^1\d{10}$/.test(phone)) {
    return false;
  }
  return true;
}

// 验证邮箱
const checkEmail = (mail) => {
  if (mail == null || mail == "") {
    return false;
  } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(mail)) {
    return false;
  } else {
    return true;
  }
}

// 验证身份证号码
const checkCardByPerson = (card) => {
  if (card == null || card == "") {
    return false;
  } else if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(card)) {
    return false
  } else {
    return true;
  }
}

// 验证数字或者字母
const checkNumOrStr = (value) => {
  if (value == null || value == "") {
    return false;
  } else if (!/^[0-9a-zA-Z]+$/.test(value)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 获取url里 ? 的字段
 * @param    {[String]}                 name [key]
 * @return   {[type]}                      [value]
 */
const GetQueryString = name => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // let r = location.search.substr(1).match(reg);
  if (location.href.split('?')[1]) {
    let r = location.href.split('?')[1].match(reg);
    if (r != null) return decodeURIComponent(r[2]);
  }
  return null;
}

/**
 * url 去除token
 * chenpeng
 */

const urlRemoveToken = (url = location.href) => {
  return String(url).replace(/(?![?&])(token)=\w+/gi, '')
}

const isExist = opt => {
  let flag = false;
  if (opt !== null && opt !== "" && typeof opt !== "undefined") {
    flag = true;
  }
  return flag;
}

export default {
  dbGet,
  dbSet,
  dbRemove,
  ssdbGet,
  ssdbSet,
  ssdbRemove,
  getCookie,
  setCookie,
  deleteCookie,
  dateFormat,
  orderBy,
  valPhone,
  getTimeFormatToday,
  fixedBody,
  looseBody,
  timerCountDown,
  diffTime,
  GetQueryString,
  urlRemoveToken,
  isExist,
  giveCardCountDown,
  checkEmail,
  checkNumOrStr,
  checkCardByPerson
}
