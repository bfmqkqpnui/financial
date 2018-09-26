<template>
  <div>
    <div class="site ng-scope">
      <div class="customerService ng-isolate-scope" v-show="canShow">
        <div class="customerService-side"><p>在线咨询</p></div>
        <div class="customerService-pop">
          <div class="customerService_item">
            <div class="customerService_item_left">
              <div class="customerService_title">在线客服：</div> <!-- ngRepeat: qq in qqList -->
              <div class="btn--basic customerService_item-qq ng-binding ng-scope" ng-click="openQQ(qq.number)"
                   ng-repeat="qq in qqList">小君客服
              </div><!-- end ngRepeat: qq in qqList -->
              <div class="customerService_content"></div>
              <div class="customerService_footer ng-binding"> 09:00-18:00</div>
            </div>
            <div class="customerService_item_right">
              <div class="customerService_icon icon-qq"></div>
            </div>
          </div>
          <div class="customerService_item">
            <div class="customerService_item_left">
              <div class="customerService_title">请拨打电话：</div>
              <div class="customerService_content">
                <div class="ng-binding">021-12345678</div>
              </div>
            </div>
            <div class="customerService_item_right">
              <div class="customerService_icon icon-phone"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="site-aside anime" ng-class="{'site-aside--shrink': isShrinked}">
        <div class="site-aside_logoBox icon-logo">
          <span>财税通</span>
          <div class="aside_flipper">
            <div class="flipper anime"></div>
          </div>
          <div class="asite_group" ng-class="userGroupIcon"></div>
        </div>

        <div class="site-aside_menuBox ps-container ps-theme-default">
          <div class="com-nadata-ps-id=de3f4491-8f0a-0ec7-abc2-903474880cd9">
            <div
              class="com-navMenu_menu anime ng-scope com-navMenu_menu--expand com-navMenu_menu--1"
              ng-click="navTo(menu)">
              <div class="menu_icon menu_icon--focus menu_icon--accounts" ng-class="getIcon(menu)"></div>
              <div class="menu_name ng-binding">用户管理</div>
              <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">用户管理</p>
            </div>

            <div
              class="com-navMenu_menu anime ng-scope com-navMenu_menu--focus com-navMenu_menu--expand com-navMenu_menu--2"
              ng-repeat="menu in menus" ng-class="getStatus(menu)" ng-click="navTo(menu)">
              <div class="menu_icon menu_icon--focus menu_icon--accounts" ng-class="getIcon(menu)"></div>
              <div class="menu_name ng-binding">账套管理</div>
              <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">账套管理</p>
            </div>

            <div
              class="com-navMenu_menu anime ng-scope com-navMenu_menu--expand com-navMenu_menu--3"
              ng-repeat="menu in menus" ng-class="getStatus(menu)" ng-click="navTo(menu)">
              <div class="menu_icon menu_icon--focus menu_icon--accounts" ng-class="getIcon(menu)"></div>
              <div class="menu_name ng-binding">数据管理</div>
              <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">数据管理</p>
            </div>

            <div
              class="com-navMenu_menu anime ng-scope com-navMenu_menu--expand com-navMenu_menu--4"
              ng-repeat="menu in menus" ng-class="getStatus(menu)" ng-click="navTo(menu)">
              <div class="menu_icon menu_icon--focus menu_icon--accounts" ng-class="getIcon(menu)"></div>
              <div class="menu_name ng-binding">合同管理</div>
              <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">合同管理</p>
            </div>
          </div>
        </div>

        <div class="site-aside_opBox">
          <div class="opBox" @click="editUserInfo()">
            <div class="opBox_icon anime icon-user"></div>
            <div class="opBox_name anime ng-binding" v-text="user.name"></div>
            <div class="opBox_tag anime ng-hide" v-show="isShrinked">编辑用户信息</div>
          </div>
          <div class="opBox opBox--logout" @click="logout()">
            <div class="opBox_icon anime icon-logout"></div>
            <div class="opBox_name anime">退出</div>
            <div class="opBox_tag anime ng-hide" ng-show="isShrinked">退出</div>
          </div>
        </div>
      </div>
      <!-- 二级导航 -->
      <navComponent :menuList="menuList"></navComponent>
    </div>


    <!-- 当前用户信息 -->
    <div class="site-mask anime ng-scope site-mask--shade" v-if="canShowInfo">
      <div class="site-popup anime personalBox site-popup--expand">
        <div :class="page.title == 'info' ? 'comInfoSwitchBtn-info-on' : 'comInfoSwitchBtn-info-off'"
             @click="switchPage('info')">信息编辑
        </div>
        <div :class="page.title == 'pwd' ? 'comInfoSwitchBtn-password-on' : 'comInfoSwitchBtn-password-off'"
             @click="switchPage('pwd')">密码修改
        </div>
        <div class="title ng-binding">{{page.content}}
          <div class="closedIcon" @click="close()"></div>
        </div>

        <!-- 信息组件 -->
        <div class="personalInfoContent" v-if="page.title == 'info'">
          <div class="com-infor">
            <div class="com-title">用&nbsp;户&nbsp;名</div>
            <input v-model="copyUser.name" type="text" class="ng-pristine ng-untouched ng-valid ng-not-empty">
            <div class="errorTips ng-binding" v-text="hint.name"></div>
          </div>
          <div class="com-infor margin-top-bottom">
            <div class="com-title">手&nbsp;机&nbsp;号</div>
            <input v-model="copyUser.phone" class="inputDisabled ng-pristine ng-untouched ng-valid ng-not-empty"
                   type="text" disabled="disabled">
            <div class="lockIcon"></div>
          </div>
          <div class="com-infor margin-top-bottom">
            <div class="com-title">电子邮箱</div>
            <input v-model="copyUser.email" type="text" class="ng-pristine ng-untouched ng-valid ng-empty">
            <div class="errorTips ng-binding" v-text="hint.email"></div>
          </div>
          <div class="com-infor margin-top-bottom">
            <div class="com-title cancelBtn" @click="close()">取消</div>
            <div class="submitBtn-edit com-button anime ng-isolate-scope com-button--ok" @click="editInfo()">
              <div><span class="ng-scope">确定</span></div>
            </div>
          </div>
        </div>
        <!-- 密码组件 -->
        <div class="personalInfoContent" v-if="page.title == 'pwd'">
          <div class="com-infor">
            <div class="com-title">旧&nbsp;密&nbsp;码</div>
            <input type="password" v-model="copyUser.oldPassword"
                   class="ng-pristine ng-untouched ng-valid ng-empty"></div>
          <div class="com-infor margin-top-bottom" style="margin-top:45px">
            <div class="com-title">新&nbsp;密&nbsp;码</div>
            <input type="password" v-if="viewPassword" v-model="copyUser.newPassword"
                   class="ng-pristine ng-untouched ng-valid ng-empty">
            <input type="text" v-if="!viewPassword" v-model="copyUser.newPassword"
                   class="ng-pristine ng-untouched ng-valid ng-empty">
            <div :class="viewPassword ? 'eyeIcon-on' : 'eyeIcon-off'" @click="switchPassword()"></div>
            <div class="errorTips ng-binding" v-text="hint.password"></div>
          </div>
          <div class="com-infor margin-top-bottom" style="margin-top:45px">
            <div class="com-title cancelBtn" @click="close()">取消</div>
            <div class="submitBtn-edit com-button anime ng-isolate-scope com-button--ok" @click="editPwd()">
              <div><span class="ng-scope">确定</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 蒙层信息 -->
    <div class="site-mask anime ng-isolate-scope" v-if="errMsg">
      <div class="site-popup anime popup-message flex--column site-popup--expand" ng-class="{'site-popup--expand': on}">
        <div class="site-popup_head">
          <div class="site-popup_title">财税通提醒您：</div>
          <div class="site-popup_close g-icon-close" ng-click="hide()"></div>
        </div>
        <div class="site-popup_body">
          <div class="site-popup_type">
            <div class="typeIcon g-icon-error"></div>
            <p class="typeTitle typeTitle--error">操作失败</p></div>
          <div class="site-popup_message"><p class="ng-binding" v-text="errMsg"></p>
          </div>
        </div>
        <div class="site-popup_footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../../utils'
  import api from './api/index'

  export default {
    name: "home",
    data() {
      return {
        // 客服标识是否需要展示
        canShow: false,
        //个人信息展示
        canShowInfo: false,
        // 用户编辑
        isShrinked: false,
        // tab
        page: {
          title: 'info',
          content: '用户信息编辑'
        },
        // 是否显示登录密码***
        viewPassword: true,
        // 错误信息对象
        hint: {
          name: '',
          phone: '',
          email: '',
          password: ''
        },
        //密码修改对象
        copyUser: {
          name: '',
          phone: '',
          email: '',
          oldPassword: '',
          newPassword: ''
        },
        user: {
          id: '',
          name: '',
          phone: '',
          email: '',
          password: '',
          token: ''
        },
        // 二级菜单集合
        menuList: [],
        // 错误消息
        errMsg: '',
      }
    },
    methods: {
      // 退出
      logout() {
        console.log("退出")
        localStorage.removeItem("userInfo")
        this.$router.push("/login")
      },
      // 用户信息tabqiehuan
      switchPage(title) {
        this.page.title = title
        if (title == 'info') {
          this.page.content = '用户信息编辑'
        } else if (title == 'pwd') {
          this.page.content = '用户密码修改'
        }
      },
      // 编辑用户信息
      editUserInfo() {
        this.canShowInfo = true
        this.infoInit()
        this.hintInit()
      },
      // 关闭用户信息
      close() {
        this.canShowInfo = false
        this.switchPage('info')
      },
      // 设置登录密码是否铭文展示
      switchPassword() {
        this.viewPassword = !this.viewPassword
      },
      // 修改登录密码
      editPwd() {
        console.log("修改登录密码")
        if (this.copyUser.oldPassword && this.copyUser.newPassword && utils.isExist(this.copyUser.oldPassword) && utils.isExist(this.copyUser.newPassword)) {
          if (this.copyUser.oldPassword == this.copyUser.newPassword) {
            this.hint.password = '*旧密码和新密码不能相同'
          } else {
            this.hint.password = ''
            let params = {
              id: this.user.id,
              oldPassWord: this.copyUser.oldPassword,
              newPassWord: this.copyUser.newPassword,
              token: this.user.token
            }
            api.updatePwd(params).then(res => {
              console.log(JSON.stringify(res.body))
            })
          }
        } else {
          this.hint.password = '*请完整输入旧密码及新密码'
        }
      },
      // 修改个人信息
      editInfo() {
        console.log("修改个人信息")
        if (this.checkEmail() && this.checkName()) {
          let params = {
            phone: this.user.phone,
            adminName: this.copyUser.name,
            email: this.copyUser.email,
            id: this.user.id,
            token: this.user.token
          }
          api.updateInfo(params).then(res => {
            console.log(JSON.stringify(res.body))
            if (res.body.result == 0) {
              utils.dbSet("userInfo", JSON.stringify(res.body.data))
              this.this.copyUserConfig()
            } else {
              this.setErrMsg(res.body.msg)
            }
          })
        }
      },
      pwdInit() {
        this.copyUser.oldPassword = ''
        this.copyUser.newPassword = ''
      },
      infoInit() {
        this.copyUser.name = this.user.name
        this.copyUser.email = this.user.email
        this.copyUser.phone = this.user.phone
      },
      hintInit() {
        this.hint.name = ''
        this.hint.phone = ''
        this.hint.email = ''
        this.hint.oldPassword = ''
        this.hint.newPassword = ''
      },
      // 获取用户信息
      copyUserConfig() {
        let User = utils.dbGet("userInfo")
        if (utils.isExist(User)) {
          this.copyUser.name = User.adminName
          this.copyUser.phone = User.phone
          this.copyUser.email = User.email
          this.user.name = User.adminName
          this.user.phone = User.phone
          this.user.email = User.email
          this.user.id = User.id
          this.user.token = User.token
        }
      },
      checkEmail() {
        let flag = utils.checkEmail(this.copyUser.email)
        if (!flag) {
          this.hint.email = '*邮箱格式不正确'
        } else {
          this.hint.email = ''
        }
        return flag;
      },
      checkName() {
        if (utils.isExist(this.copyUser.name)) {
          this.hint.name = ''
          return true;
        } else {
          this.hint.name = '*用户名不能为空'
          return false;
        }
      },
      setErrMsg(message) {
        if (utils.isExist(message)) {
          this.errMsg = message
        }
      }
    },
    components: {},
    mounted() {
      this.copyUserConfig()
    }
  }
</script>

<style src="../../../static/css/common.css"></style>
<style src="./css/index.css" scoped></style>
