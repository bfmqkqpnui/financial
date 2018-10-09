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
              :class="defaultMenu.userManager ? 'com-navMenu_menu--focus' : ''" @click="navTo('user')">
              <div class="menu_icon menu_icon--focus menu_icon--accounts" ng-class="getIcon(menu)"></div>
              <div class="menu_name ng-binding">用户管理</div>
              <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">用户管理</p>
            </div>

            <div
              class="com-navMenu_menu anime ng-scope com-navMenu_menu--expand com-navMenu_menu--2"
              :class="defaultMenu.booksManager ? 'com-navMenu_menu--focus' : ''" @click="navTo('books')">
              <div class="menu_icon menu_icon--focus menu_icon--accounts"></div>
              <div class="menu_name ng-binding">账套管理</div>
              <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">账套管理</p>
            </div>

            <div
              class="com-navMenu_menu anime ng-scope com-navMenu_menu--expand com-navMenu_menu--3"
              :class="defaultMenu.dataManager ? 'com-navMenu_menu--focus' : ''" @click="navTo('data')">
              <div class="menu_icon menu_icon--focus menu_icon--accounts" ng-class="getIcon(menu)"></div>
              <div class="menu_name ng-binding">数据管理</div>
              <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">数据管理</p>
            </div>

            <div
              class="com-navMenu_menu anime ng-scope com-navMenu_menu--expand com-navMenu_menu--4"
              :class="defaultMenu.contractManager ? 'com-navMenu_menu--focus' : ''" @click="navTo('contract')">
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
      <navComponent :menuType="menuType" @showAddAccountPop="showAddAccountPop" @success="success" @err="setErrMsg"></navComponent>
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

    <!-- 错误蒙层信息 -->
    <div class="site-mask anime ng-isolate-scope" v-show="errMsg" style="opacity: 1">
      <div class="site-popup anime popup-message flex--column site-popup--expand">
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

    <!-- 操作成功 -->
    <div class="site-mask anime ng-isolate-scope site-mask--shade" v-if="isSuccess">
      <div class="site-popup anime popup-message flex--column site-popup--expand">
        <div class="site-popup_head">
          <div class="site-popup_title">财税通提醒您：</div>
          <div class="site-popup_close g-icon-close" @click="hideShade"></div>
        </div>
        <div class="site-popup_body">
          <div class="site-popup_type">
            <div class="typeIcon g-icon-done"></div>
            <p class="typeTitle typeTitle--done">操作成功</p>
          </div>
          <div class="site-popup_message">
            <p class="ng-binding" v-text="successMsg"></p>
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
        // 默认一级菜单目录类型
        menuType: "",
        // 错误消息
        errMsg: '',
        // 操作成功
        isSuccess: false,
        // 成功消息
        successMsg: '',
        // 选择
        defaultMenu: {
          userManager: false,
          booksManager: true,
          dataManager: false,
          contractManager: false
        },
        booksSecondMenu: [
          {index: 1, value: '账套列表', isSelect: true},
        ],
        //
        show: {
          canBatchImport: false,    //是否批量导入
          hint: '',                 // 添加账套错误信息
          successMaskAccount: false,  // 添加账套成功后蒙层是否展示
        }
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
              if (res.body.result == 0) {
                this.hint.password = ''
                this.close()
              } else {
                this.hint.password = res.body.msg
              }
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
              this.close()
              utils.dbSet("userInfo", JSON.stringify(res.body.data))
              this.copyUserConfig()
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
        console.log("呼叫home组件", message)
        if (utils.isExist(message)) {
          this.errMsg = message
          let that = this
          setInterval(function () {
            that.errMsg = ''
          }, 2000)
        }
      },
      navTo(menuName) {
        if (utils.isExist(menuName)) {
          switch (menuName) {
            case 'user':
              this.defaultUsersMenuConfig()
              break;
            case 'books':
              this.defaultBooksMenuConfig()
              break;
            case 'data':
              this.defaultDatasMenuConfig()
              break;
            case 'contract':
              this.defaultContractsMenuConfig()
              break;
            default:
              this.defaultBooksMenuConfig()
          }
        } else {
          this.defaultBooksMenuConfig()
        }
      },
      // 账套管理
      defaultBooksMenuConfig() {
        this.defaultMenu.userManager = false
        this.defaultMenu.booksManager = true
        this.defaultMenu.dataManager = false
        this.defaultMenu.contractManager = false
        this.menuList = this.booksSecondMenu
        let params = {}
        params.Type = 'accounts'
        this.menuType = params
        this.$router.push({path: '/home'})
      },
      // 用户管理
      defaultUsersMenuConfig() {
        this.defaultMenu.userManager = true
        this.defaultMenu.booksManager = false
        this.defaultMenu.dataManager = false
        this.defaultMenu.contractManager = false
        let params = {}
        params.Type = 'user'
        this.menuType = params
        this.$router.push({path: '/home/user'})
      },
      // 数据管理
      defaultDatasMenuConfig() {
        this.defaultMenu.userManager = false
        this.defaultMenu.booksManager = false
        this.defaultMenu.dataManager = true
        this.defaultMenu.contractManager = false
        let params = {}
        params.Type = 'data'
        this.menuType = params
      },
      // 合同管理
      defaultContractsMenuConfig() {
        this.defaultMenu.userManager = false
        this.defaultMenu.booksManager = false
        this.defaultMenu.dataManager = false
        this.defaultMenu.contractManager = true
        let params = {}
        params.Type = 'contract'
        this.menuType = params
      },
      // 批量导入账套
      showBatchPop() {
        console.log("批量导入账套")
      },
      showAddAccountPop() {
        console.log("显示添加账套组件")
        this.show.addAccountPop = true
      },
      hideAddAccountPop() {
        console.log("隐藏添加账套组件")
        this.show.addAccountPop = false
        this.submitAddAccInfo.companyName = ''
        this.submitAddAccInfo.contact = ''
        this.submitAddAccInfo.corporateContact = ''
        this.submitAddAccInfo.taxPaymentPeriod = '2'
        this.submitAddAccInfo.taxTypes = '2'

        this.show.successMaskAccount = false
      },
      success(message){
        if (utils.isExist(message)) {
          this.isSuccess = true
          this.successMsg = message
          let that = this
          setTimeout(function () {
            that.successMsg = ''
            that.isSuccess = false
          }, 2000)
        }
      },
      hideShade(){
        this.isSuccess = false
        this.successMsg = ''
      }
    },
    components: {},
    mounted() {
      this.copyUserConfig()
      this.defaultBooksMenuConfig()
    }
  }
</script>

<style src="../../../static/css/common.css"></style>
<style src="./css/index.css" scoped></style>
