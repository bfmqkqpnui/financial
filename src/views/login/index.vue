<template>
  <div>
    <div class="loginBox ng-scope" v-if="state !== 'findPassword'">
      <div class="login-title">
        <div class="title-box">
          <div class="icon-logo"></div>
        </div>
      </div>
      <div class="login-body">
        <div class="body-box">
          <!-- 登录 -->
          <div class="loginFrame ng-scope" v-if="state === 'login'">
            <div class="register" @click="linkUrl('register')">注册</div>
            <p>用户登录</p>
            <div class="inputBox-userName">
              <input type="text" placeholder="登录账号" v-model="userInfo.phone" maxlength="30"
                     class="ng-pristine ng-valid ng-empty ng-valid-maxlength ng-touched">
              <div class="icon-email"></div>
            </div>
            <div class="inputBox-password">
              <input type="password" placeholder="密码" v-model="userInfo.passWord" maxlength="20"
                     class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength" @keydown.enter="login">
              <div class="icon-password"></div>
            </div>
            <div class="options-select">
              <div class="select-remember">
                <div class="middle" @click="switchSavePassword">
                  <div :class="savePassword ? 'icon-isOn' : 'icon-isOff'"></div>
                  记住密码
                </div>
              </div>
              <div class="select-forget">
                <div class="middle" @click="linkUrl('findPwd')">忘记密码</div>
              </div>
            </div>
            <div class="loginBtnBox">
              <div class="loginHint ng-binding ng-hide" v-text="errorMsg"></div>
              <div class="btn-login anime" @click="login">登录</div>
            </div>
          </div>

          <!-- 注册 -->
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
                     class="ng-pristine ng-untouched ng-valid ng-empty">
              <div class="btn-getVerifyCode ng-scope" v-show="!isCountDownTime" @click="getRegisterCode()">获取验证码
              </div>
              <div class="btn-getVerifyCode ng-scope" v-show="isCountDownTime" v-text="seconds"></div>
            </div>
            <div class="inputBox-password">
              <input type="password" placeholder="密码" v-model="registerInfo.passWord" maxlength="20"
                     class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
              <div class="icon-password"></div>
            </div>
            <div class="registerBtnBox">
              <div class="registerHint ng-binding" v-text="errorMsg"></div>
              <div class="btn-register anime" @click="register()">注册</div>
            </div>
          </div>

          <!-- 找回密码 -->
          <div class="registerFrame ng-scope" v-if="state === 'findPwd'">
            <div class="register" @click="linkUrl('login')">登录</div>
            <p>找回密码</p>
            <div class="inputBox-userName">
              <input type="text" placeholder="手机号" v-model="findPwd.phone" maxlength="30"
                     class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
              <div class="icon-phone"></div>
            </div>
            <div class="inputBox-verifyCode">
              <input type="text" placeholder="验证码" v-model="findPwd.code"
                     class="ng-pristine ng-untouched ng-valid ng-empty">
              <div class="btn-getVerifyCode ng-scope" v-show="!isCountDownTime" @click="getFindPwdCode()">获取验证码</div>
              <div class="btn-getVerifyCode ng-scope" v-show="isCountDownTime" v-text="seconds"></div>
            </div>
            <div class="inputBox-password">
              <input type="password" placeholder="密码"
                     v-model="findPwd.passWord" maxlength="20"
                     class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
              <div class="icon-password"></div>
            </div>
            <div class="registerBtnBox">
              <div class="registerHint ng-binding" v-text="errorMsg"></div>
              <div class="btn-register anime" @click="resetPwd()">密码重置</div>
            </div>
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
  import api from './api/index'
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
          phone: '',
          passWord: ''
        },
        // 当前注册信息
        registerInfo: {
          phone: '',
          code: '',
          passWord: '',
          email: ''
        },
        findPwd: {
          phone: '',
          code: '',
          passWord: '',
          email: ''
        },
        // 倒计时
        isCountDownTime: false,
        seconds: 60,
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
          this.loginInit()
          this.registerInfoInit()
          this.findPwdInfoInit()
          this.isCountDownTime = false
        }
      },
      // 注册
      register() {
        console.log("注册")
        if (this.checkInfo('register')) {
          api.validateCode({phone: this.registerInfo.phone, code: this.registerInfo.code}).then(res => {
            if (res.body.result == 0) {
              api.regist({phone: this.registerInfo.phone, passWord: this.registerInfo.passWord}).then(res => {
                if (res.body.result == 1) {
                  this.errorMsg = '注册成功'
                } else {
                  this.errorMsg = res.body.msg
                }
              })
            } else {
              this.errorMsg = res.body.msg
            }
          })
        }
      },
      // 登录
      login() {
        console.log("登录")
        if (utils.valPhone(this.userInfo.phone) && utils.isExist(this.userInfo.passWord)) {
          let params = {
            phone: this.userInfo.phone,
            passWord: this.userInfo.passWord
          }
          api.login(params).then(res => {
            console.log(JSON.stringify(res.body))
            if (res.body.result == 0) {
              this.errorMsg = ''
              utils.dbSet("userInfo", JSON.stringify(res.body.data))
              this.$router.push({path: '/home'});
            } else {
              this.errorMsg = res.body.msg
            }
          });
        } else {
          if (!utils.valPhone(this.userInfo.phone)) {
            this.errorMsg = "手机号码不正确"
          } else if (!utils.isExist(this.userInfo.passWord)) {
            this.errorMsg = "登录密码不能为空"
          }
        }
      },
      // 获取注册校验码
      getRegisterCode() {
        console.log("获取注册校验码")
        if (utils.isExist(this.registerInfo.phone) && utils.valPhone(this.registerInfo.phone)) {
          api.sendCode({phone: this.registerInfo.phone}).then(res => {
            if (res.body.result == 0) {
              this.isCountDownTime = true
              this.errorMsg = ''
              let that = this;
              let timer = setInterval(function () {
                if (that.seconds > 1) {
                  that.seconds -= 1
                } else {
                  clearInterval(timer)
                  that.isCountDownTime = false
                  that.seconds = 60
                }
              }, 1000)
            }
          })
        } else {
          this.errorMsg = "手机号码不正确"
        }
      },
      // 获取找回密码校验码
      getFindPwdCode() {
        console.log("获取找回密码校验码")
        if (utils.isExist(this.findPwd.phone) && utils.valPhone(this.findPwd.phone)) {
          api.sendCode({phone: this.findPwd.phone}).then(res => {
            if (res.body.result == 0) {
              this.isCountDownTime = true
              this.errorMsg = ''
              let that = this;
              let timer = setInterval(function () {
                if (that.seconds > 1) {
                  that.seconds -= 1
                } else {
                  clearInterval(timer)
                  that.isCountDownTime = false
                  that.seconds = 60
                }
              }, 1000)
            }
          })
        } else {
          this.errorMsg = "手机号码不正确"
        }
      },
      // 记住密码
      switchSavePassword() {
        this.savePassword = !this.savePassword
      },
      // 登录初始化
      loginInit() {
        this.userInfo.userName = ''
        this.userInfo.passWord = ''
        this.savePassword = true
      },
      // 注册初始化
      registerInfoInit() {
        this.registerInfo.phone = ''
        this.registerInfo.passWord = ''
        this.registerInfo.email = ''
        this.registerInfo.code = ''
      },
      // 找回密码初始化
      findPwdInfoInit() {
        this.findPwd.phone = ''
        this.findPwd.passWord = ''
        this.findPwd.email = ''
        this.findPwd.code = ''
      },
      // 密码重置
      resetPwd() {
        if (this.checkInfo('findPwd')) {
          api.validateCode({phone: this.findPwd.phone, code: this.findPwd.code}).then(res => {
            if (res.body.result == 0) {

            } else {
              this.errorMsg = res.body.msg
            }
          })
        }
      },
      checkInfo(typeName) {
        let flag = false;
        if (utils.isExist(typeName) && typeName == 'findPwd') {
          if (utils.isExist(this.findPwd.phone) && utils.valPhone(this.findPwd.phone)) {
            if (utils.isExist(this.findPwd.code)) {
              if (utils.isExist(this.findPwd.passWord)) {
                flag = true
              } else {
                this.errorMsg = "请输入登录密码"
              }
            } else {
              this.errorMsg = "请输入校验码"
            }
          } else {
            this.errorMsg = "手机号码不正确"
          }
        } else {
          if (utils.isExist(this.registerInfo.phone) && utils.valPhone(this.registerInfo.phone)) {
            if (utils.isExist(this.registerInfo.code)) {
              if (utils.isExist(this.registerInfo.passWord)) {
                flag = true
              } else {
                this.errorMsg = "请输入登录密码"
              }
            } else {
              this.errorMsg = "请输入校验码"
            }
          } else {
            this.errorMsg = "手机号码不正确"
          }
        }
        return flag;
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
