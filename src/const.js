let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
// 代理路径全局变量
let SERVICE_BASE_URL = '/apiPath'
const PLATFORM = isiOS ? 'iOS' : isAndroid ? 'Android' : ''
if (process.env.NODE_ENV === 'production') {
  SERVICE_BASE_URL = '/apiPath'
}

export default {
  PLATFORM, // 移动终端
  SERVICE_BASE_URL, //接口代理
}
