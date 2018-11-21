<template>
  <div class="site-content ng-scope">
    <!-- 二级目录 -->
    <div class="topnav">
      <ul class="">
        <li v-for="item in secondMenuList" @click="selMenu(item)" v-text="item.value" :key="item.index"
            :class="item.isSelect?'focus':''"></li>
      </ul>
    </div>
    <!-- title -->
    <div class="module-title ng-scope" v-if="!isBooksList">
      <div class="com-issue ng-isolate-scope" v-if="iShowTitle">
        <div class="com-issue_display" ng-show="iShowTitle === 'true'" ng-click="showPicker()">
          <div class="display_icon icon-40"></div>
          <div class="display_tag ng-binding">2018-08期</div>
        </div>
        <div class="com-issue_container anime com-issue_container--hidden">
          <div class="ng-isolate-scope">
          </div>
        </div>
      </div>

      <div class="com-cs ng-scope">
        <div class="brief"><p class="brief_name ng-binding" v-text="accountInfo.companyName"></p>
          <p class="brief_type ng-binding">{{accountInfo | accountInfoFilter}}</p></div>
        <div class="state ng-binding" v-text="accountInfo.statusEnum">
        </div>
        <!--<div class="button switch ng-hide" ng-show="canSwitch" ng-click="switchState()">
          <div class="switch_icon"></div>
          <p class="switch_tag ng-binding">做账中</p>
        </div>-->
      </div>
      <div class="module-title_gap"></div>
      <div class="com-memo anime ng-scope" v-if="isMemo">
        <div class="icon-noteBtn" ng-click="toggle($event)" title="备忘录"></div>
        <div class="pointer ng-binding ng-hide" ng-show="memos.length !== 0">0</div>
        <div class="memoBox ng-isolate-scope ng-hide">
          <div class="memo-title">备忘录</div>
          <div class="memo-containerBox">
            <div class="container-top">
              <textarea placeholder="填写备忘" ng-model="text" class="ng-pristine ng-valid ng-empty ng-touched"></textarea>
            </div>
            <div class="container-bottom">
              <div class="memo-container-left ng-binding">2018-09</div>
              <div class="memo-container-right anime" title="提交备忘" ng-click="addMemo()"></div>
            </div>
          </div>
          <div class="memo-listBox ps-container ps-theme-default" scroll="" scroll-behavior="top"
               data-ps-id="76fed98d-b984-5a52-76ef-d62e5befe930"> <!-- ngRepeat: x in memos -->
            <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
              <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
            </div>
            <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
              <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 路由 -->
    <router-view @sel="selMenu" @accPop="addPop" @error="error" @success="success" @loading="showLoading"></router-view>
  </div>
</template>

<script>
  import utils from '../../utils'
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    props: {
      menuType: {
        type: Object,
      }
    },
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        accountsSecondMenu: [
          {index: 1, value: '账套列表', isSelect: false, type: "accounts"},
          {index: 2, value: '凭证列表', isSelect: true, type: "accounts"},
          {index: 3, value: '会计账簿', isSelect: false, type: "accounts"},
          {index: 4, value: '财务报表', isSelect: false, type: "accounts"},
          {index: 5, value: '账套设置', isSelect: false, type: "accounts"},
          {index: 6, value: '凭证打印', isSelect: false, type: "accounts"},
          {index: 7, value: '历史数据', isSelect: false, type: "accounts"},
          {index: 8, value: '自动配置', isSelect: false, type: "accounts"},
        ],
        userSecondMenu: [{
          index: 1, value: '用户管理', isSelect: true, type: 'user'
        }],
        dataSecondMenu: [{index: 1, value: '数据列表', isSelect: true, type: "data"}],
        contractSecondMenu: [{index: 1, value: '合同列表', isSelect: true, type: "contract"}],
        accountsDefaultSecondMenu: [{index: 1, value: '账套列表', isSelect: true, type: "accounts"}],
        isBooksList: true,  // 是否账套
        secondMenuList: [], // 二级目录
        secondMenu: '', //
        iShowTitle: false,
        isMemo: false,
        accountInfo: {},
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      selMenu(opt) {
        console.log("<<", opt.index, opt.type)
        if (utils.isExist(opt.type) && opt.type == "accounts") { // 账套单独逻辑
          if (opt.index > 1) {
            this.isBooksList = false
            this.secondMenuList = this.accountsSecondMenu
          } else {
            this.isBooksList = true
            this.secondMenuList = this.accountsDefaultSecondMenu
          }
          if (this.secondMenuList.length > 1) {
            this.secondMenuList.forEach(function (el, idx) {
              if (el.index == opt.index) {
                el.isSelect = true
              } else {
                el.isSelect = false
              }
            })
          }
          this.accountInfo = utils.dbGet("account")
          switch (opt.index) {
            case 1:
              this.$router.push({name: 'accounts'})
              break;
            case 2:
              this.$router.push({name: 'voucher'})
              break;
            case 3:
              this.$router.push({name: 'books'})
              break;
            case 4:
              this.$router.push("/home")
              break;
            case 5:
              this.$router.push({name: 'bookSettings'})
              break;
            case 6:
              this.$router.push("/home")
              break;
            case 7:
              this.$router.push({name: 'histories'})
              break;
            case 8:
              this.$router.push("/home")
              break;
            case 9:
              this.$router.push("/home")
              break;
            case 10:
              this.$router.push("/home")
              break;
            case 11:
              this.$router.push("/home")
              break;
            case 12:
              this.$router.push("/home")
              break;
          }
        } else {
          // 其他逻辑
          if (utils.isExist(opt.type)) {
            if (opt.type == "user") {
              this.secondMenuList = this.userSecondMenu
              this.$router.push({name: 'user'})
            } else if (opt.type == "data") {
              this.secondMenuList = this.dataSecondMenu
              this.$router.push({name: 'data'})
            } else if (opt.type == "contract") {
              this.secondMenuList = this.contractSecondMenu
              this.$router.push({name: 'contract'})
            }
          }
        }
      },
      // 添加账套
      addPop() {
        console.log("addPop触发")
        this.$emit("showAddAccountPop")
      },
      error(msg) {
        console.log("操作失敗", msg)
        this.$emit("err", msg)
      },
      success(msg) {
        console.log("操作成功")
        this.$emit("success", msg)
      },
      showLoading(type){
        if(type){
          this.$emit("loading", type)
        }else{
          this.$emit("loading", "hide")
        }
      },
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      console.log("账套信息：",this.accountInfo)
    },
    created() {
      // this.secondMenu = this.menuType
      // this.selMenu(this.secondMenu)
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {},
    filters: {
      accountInfoFilter(opt) {
        let content = ''
        if (utils.isExist(opt)) {
          let operType = opt.taxTypes == 1 ? '一般纳税人' : opt.taxTypes == 2 ? '小规模纳税人' : opt.taxTypes == 3 ? '个人独资企业或有限合伙' : ''
          let reportType = opt.taxPaymentPeriod == 1 ? '月报' : opt.taxPaymentPeriod == 2 ? '季报' : ''
          content = '[' + operType + '&' + reportType + ']'
        }
        return content
      }
    }
  }
</script>

<style scoped>
  .topnav {
    width: 100%;
    height: 50px;
    background: #2a333b;
  }

  .topnav ul {
    padding: 0 0 0 200px;
    height: 50px;
    line-height: 50px;
  }

  .topnav ul li {
    display: inline-block;
    color: #d3d3d3;
    margin: 0 10px;
    padding: 0 20px;
    text-align: center;
    cursor: pointer;
  }

  .topnav ul li:hover {
    background-color: rgba(95, 187, 252, .2);
  }

  .topnav ul li.focus {
    background-color: #5fbbfc;
    color: #fff;
  }

  .topnav span {
    display: inline-block;
  }

  .topnav span:before {
    content: url("./i/list.png");
    margin-right: .2rem;
    vertical-align: middle;
  }

  .topnav .body {
  }

  .module-content.booksList {
    top: 50px;
  }

  [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak, .ng-hide:not(.ng-hide-animate) {
    display: none !important;
  }
</style>
