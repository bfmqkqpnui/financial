let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

const SERVICE_BASE_URL = '/h5api'
const PLATFORM = isiOS ? 'iOS' : isAndroid ? 'Android' : ''


export default {
  PLATFORM, // 移动终端
  SERVICE_BASE_URL, //接口代理
}
