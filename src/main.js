// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import FastClick from 'fastclick'


Vue.config.productionTip = false
Vue.use(VueResource)
// FastClick 调用提高移动端点击响应时间
FastClick.attach(document.body)

Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.credentials = true;
Vue.http.interceptors.push((request, next) => {
  console.log("拦截结果：" + request.body)
  if (request.body && request.body.needLogin) {
    delete request.body.needLogin
  }
  next((response) => {
    // 优化如果token失效重新跳转到登录页面登录
    if (response.body.resCode &&
      response.body.result == "2") {
      console.log(location.href)
      localStorage.removeItem('userInfo')
      location.href = '//localhost:8899/login'
    } else {
      return response
    }
  });
})

require('./base')
router.beforeEach(({ meta, path, fullPath, query }, from, next) => {
  if (meta.title) {
    Vue.$title = Vue.prototype.$title = meta.title
    document.title = meta.title
  }
  if (meta.needLogin) {

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
