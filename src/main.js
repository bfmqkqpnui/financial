// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import FastClick from 'fastclick'
import bluer from './components/index'
import utils from "./utils";

Vue.config.productionTip = false
Vue.use(VueResource)

Vue.use(bluer)
// FastClick 调用提高移动端点击响应时间
FastClick.attach(document.body)
require('./base')
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.credentials = true;
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    // console.log("拦截结果：" , JSON.stringify(response.body),response.body.result == 2, location)
    // 优化如果token失效重新跳转到登录页面登录  || typeof response.body.result == "undefined"
    if (response.body.result == 2) {
      localStorage.removeItem('userInfo')
      // console.log(">>>" + location.origin)
      location.href = location.origin
    } else {
      return response
    }
  });
})


router.beforeEach(({ meta, path, fullPath, query }, from, next) => {
  if (meta.title) {
    Vue.$title = Vue.prototype.$title = meta.title
    document.title = meta.title
  }
  if (meta.needLogin) {
    let User = utils.dbGet("userInfo")
    if(User != null && User.id != null && User.id != ''){
      next();
    }else{
      next({path:'/login'})
    }
  } else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
