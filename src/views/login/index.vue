<template>
  <div>
    <div class="loginBox ng-scope" v-if="state !== 'findPassword'">
      <div class="login-title">
        <div class="title-box">
          <div class="icon-logo"></div>
        </div>
      </div>
      <div class="login-body">
        <div class="body-box"> <!-- ngIf: state === 'login' -->
          <div class="loginFrame ng-scope" v-if="state === 'login'">
            <div class="register" @click="linkUrl('register')">注册</div>
            <p>用户登录</p>
            <div class="inputBox-userName">
              <input type="text" placeholder="登录账号" v-model="userInfo.username" maxlength="30"
                     class="ng-pristine ng-valid ng-empty ng-valid-maxlength ng-touched">
              <div class="icon-email"></div>
            </div>
            <div class="inputBox-password">
              <input type="password" placeholder="密码" v-model="userInfo.password" maxlength="20"
                     class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
              <div class="icon-password"></div>
            </div>
            <div class="options-select">
              <div class="select-remember">
                <div class="middle" ng-click="switchSavePassword()">
                  <div :class="savePassword ? 'icon-isOn' : 'icon-isOff'" class="icon-isOn"></div>
                  记住密码
                </div>
              </div>
              <div class="select-forget">
                <div class="middle" ng-click="linkUrl('findPassword')">忘记密码</div>
              </div>
            </div>
            <div class="loginBtnBox">
              <div class="loginHint ng-binding ng-hide" ng-show="errorMsg != ''"></div>
              <div class="btn-login anime" ng-click="login()">登录</div>
            </div>
          </div><!-- end ngIf: state === 'login' --> <!-- ngIf: state === 'register' --><!-- ngIf: state === 'apply' -->

          <div class="registerFrame ng-scope" v-if="state === 'register'">
            <div class="register" @click="linkUrl('login')">登录</div>
            <p>会计师注册</p>
            <div class="inputBox-userName">
              <input type="text" placeholder="手机号" v-model="registerInfo.phone" maxlength="30"
                     class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
              <div class="icon-phone"></div>
            </div>
            <div class="inputBox-verifyCode">
              <input type="text" placeholder="验证码" v-model="registerInfo.code"
                     class="ng-pristine ng-untouched ng-valid ng-empty"> <!-- ngIf: countDownTime > 0 -->
              <!-- ngIf: countDownTime <= 0 -->
              <div class="btn-getVerifyCode ng-scope" ng-if="countDownTime <= 0" ng-click="getRegisterCode()">获取验证码
              </div><!-- end ngIf: countDownTime <= 0 -->
            </div>
            <div class="inputBox-password">
              <input type="password" placeholder="密码"
                     v-model="registerInfo.password" maxlength="20"
                     class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
              <div class="icon-password"></div>
            </div>
            <div class="registerBtnBox">
              <div class="registerHint ng-binding" v-show="errorMsg"></div>
              <div class="btn-register anime" ng-click="register()">注册</div>
            </div>
            <!--<div class="linkOther" ng-click="linkUrl('apply')">
              <u class="">代理记账公司注册入口</u>
            </div>-->
          </div>
        </div>
      </div>
      <div class="login-bottom">
        <div class="bottom-box">
          <p>沪ICP备14021340号 | Copyright © 2013-2017 jfjun.com All Rights Reserved 灵兮科技 版权所有</p>
          <p>上海灵兮信息科技有限公司 地址: 上海市 杨浦区 隆昌路619号2号楼A29—A31室</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../../utils'
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        // 默认登陆页面记住密码
        savePassword: true,
        //当前登陆页面状态
        state: 'login',
        // 当前页面注册或者登陆错误信息
        errorMsg: '',
        // 当前登陆用户信息
        userInfo: {
          username: '',
          password: ''
        },
        // 当前注册信息
        registerInfo: {
          phone: '',
          code: '',
          password: ''
        }
      }
    }
    ,
    //计算属性
    computed: {}
    ,
    //函数集，自己封装，便于开发使用
    methods: {
      // 切换登录页当前状态
      linkUrl(state) {
        if (utils.isExist(state)) {
          this.state = state
          this.errorMsg = ''
        }
      }
    }
    ,
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {

    }
    ,
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>
<style src="../../../static/css/common.css"></style>
<style src="./css/index.css" scoped></style>
