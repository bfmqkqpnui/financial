<template>
  <div>
    <div class="module-content ng-scope booksList">
      <div class="module-content_wrapper">
        <div class="module-content_page">
          <div class="page-title">
            <div class="accountsTitle-left">
              <div class="accountsTitle-size">账套列表</div>
              <div class="btn-refreshList anime" title="刷新" @click="queryAllAccounts"></div>
            </div>
            <div class="accountsTitle-right">
              <div class="com-button anime ng-isolate-scope com-button--hollow" @click="showAddAccPop">
                <div><span class="ng-scope">添加账套</span></div>
              </div>
            </div>
          </div>
          <div class="page-content">
            <div class="accountsBody">
              <div class="accBody-tableHead-2">
                <div class="tabHeadBox">
                  <div class="ng-scope span-5">
                    <div class="ng-binding">序号</div>
                  </div>
                  <div class="ng-scope span-32">
                    <div ng-click="orderByValue(title.path)" class="ng-binding"> 账套名称</div>
                  </div>
                  <div class="ng-scope span-10">
                    <div ng-click="orderByValue(title.path)" class="ng-binding">纳税类型</div>
                  </div>
                  <div class="ng-scope span-40">
                    <div class="multiRowBox" ng-show="title.value == '数据源'">
                      <div class="multiRow-head">数据源</div>
                      <div class="multiRow-body">
                        <div class="ng-binding ng-scope span-33">开票</div>
                        <div class="ng-binding ng-scope span-33">银行</div>
                        <div class="ng-binding ng-scope span-33">扫描</div>
                      </div>
                    </div>
                  </div>
                  <div class="ng-scope span-13">
                    <div class="ng-binding">状态</div>
                  </div>
                </div>
              </div>
              <div class="accBody-tabBody ps-container ps-theme-default">
                <div>
                  <!-- 有账套数据 -->
                  <div class="tabBodyBox accTabBody ng-scope" v-for="(item,index) in show.tableList" @click="enterAccount(item)" :key="index">
                    <div ng-class="tableInfo[user.type].body.index" class="ng-binding span-5" v-text="index+1"></div>
                    <div ng-class="tableInfo[user.type].body.name" :title="item.companyName" style="text-align:left"
                         class="ng-binding span-32" v-text="item.companyName">
                      <div class="remarkTag ng-hide" ng-show="(x.vouStat.remarked || 0) !== 0"></div>
                    </div>
                    <div class="ng-binding span-10" v-text="item.taxTypesEnum"></div>
                    <div class="ng-scope span-40 multiLine">
                      <div class="span-33 ng-binding" v-text="item.invoiceNum"></div>
                      <div class="span-33 ng-binding" v-text="item.bankNum"></div>
                      <div class="span-33 ng-binding">{{item.scan1}}/{{item.scan2}}</div>
                    </div>
                    <div ng-class="tableInfo[user.type].body.issueState" class="span-13">
                      <span class="accountStateBox ng-binding stateBox-ing" ng-class="getTabView('class', x.issueState)" v-text="item.statusEnum"></span>
                    </div>
                  </div>
                  <!-- 无账套数据 -->
                  <div class="dataIsNull" v-if="show.dataIsNull">暂无账套信息</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加账套蒙层 -->
    <div class="site-mask anime site-mask--shade" v-if="show.addAccountPop">
      <div class="site-popup anime pop-container site-popup--expand"><p>添加账套</p>
        <div class="btn-closePop" title="关闭" @click.stop="hideAddAccountPop"></div>
        <div class="messageBox">
          <div class="message-title">企业名称</div>
          <div class="message-input">
            <input type="text" v-model="submitAddAccInfo.companyName" maxlength="30"
                   class="ng-valid ng-valid-maxlength ng-touched ng-dirty ng-empty">
            <div class="icon-required"></div>
          </div>
        </div>
        <div class="messageBox">
          <div class="message-title">联&nbsp;系&nbsp;人</div>
          <div class="message-input">
            <input type="text" v-model="submitAddAccInfo.corporateContact" maxlength="20"
                   class="ng-valid ng-valid-maxlength ng-dirty ng-touched ng-empty"></div>
        </div>
        <div class="messageBox">
          <div class="message-title">联系电话</div>
          <div class="message-input">
            <input type="text" id="accAddPhone" v-model="submitAddAccInfo.contact" maxlength="11"
                   class="ng-valid ng-valid-maxlength ng-dirty ng-touched ng-empty"></div>
        </div>
        <div class="messageBox">
          <div class="message-title">纳税类型</div>
          <div class="message-input">
            <select v-model="submitAddAccInfo.taxTypes"
                    class="ng-pristine ng-valid ng-not-empty ng-touched">
              <option :label="item.value" v-for="(item, index) in accountOptions" v-text="item.value" :value="item.key" :key="index"></option>
            </select>
          </div>
        </div>
        <div class="messageBox">
          <div class="message-title">纳税周期</div>
          <div class="message-input">
            <div class="popSelectBox ng-binding ng-scope" @click.stop="selectRoleType('2')">
              <div :class="submitAddAccInfo.taxPaymentPeriod == '2' ? 'icon-select-radio-on' : 'icon-select-radio-off'"></div>
              季报
            </div>
            <div class="popSelectBox ng-binding ng-scope" @click.stop="selectRoleType('1')">
              <div :class="submitAddAccInfo.taxPaymentPeriod == '1' ? 'icon-select-radio-on' : 'icon-select-radio-off'"></div>
              月报
            </div>
          </div>
        </div>
        <div class="messageBox submitBox">
          <div class="message-title">
            <div class="btn-cancel" @click.stop="hideAddAccountPop">取消</div>
          </div>
          <div class="message-input">
            <div class="btn-submit anime" @click.stop="addAccount()">确定</div>
            <div class="size-hint ng-binding" v-text="show.hint"></div>
          </div>
        </div>
        <div class="batchGuide" v-if="show.canBatchImport">
          <div @click.stop="showBatchPop">批量导入账套</div>
        </div>
      </div>
    </div>

    <!-- 账套添加成功蒙层 -->
    <div class="site-mask anime site-mask--shade" v-if="show.successMaskAccount">
      <div class="site-popup anime pop-container site-popup--expand"
           ng-class="{'site-popup--expand': show.nextOperatePop}">
        <p>添加成功</p>
        <div class="btn-closePop" title="关闭" @click.stop="hideAddAccountPop()"></div>
        <br>
        <div class="btn-go-account anime" @click.stop="enterAccount(continueAccountInfo)"> 去做账</div>
        <div class="btn-go-on anime" @click.stop="showAddAccPop"> 继续添加</div>
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
        adminId: utils.dbGet("userInfo").id,
        token: utils.dbGet("userInfo").token,
        // 添加账套对象
        submitAddAccInfo: {
          adminId: utils.dbGet("userInfo").id,
          token: utils.dbGet("userInfo").token,
          companyName: '',         // 企业名字
          corporateContact: '',    // 联系人
          contact: '',        // 联系电话
          taxTypes: '2', // 纳税类型
          taxPaymentPeriod: '2',    // 纳税周期
        },
        // 继续做账对象
        continueAccountInfo: {},
        accountOptions: [
          {key: '1', value: '小规模纳税人'},
          {key: '2', value: '一般纳税人'},
          {key: '3', value: '个人独资企业或有限合伙'},
        ],
        show: {
          addAccountPop: false,
          successMaskAccount: false,
          hint: '',
          // 是否有账套标识
          dataIsNull: true,
          // 账套列表
          tableList: [],
          isSelectedAccountsId: '',
        }
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      enterAccount(opt) {
        console.log("选择账套",opt)
        utils.dbSet("account", JSON.stringify(opt))
        this.$router.push({name: 'voucher'})
      },
      // 添加账套
      showAddAccPop() {
        console.log("添加账套")
        // this.$emit("accPop")
        this.show.addAccountPop = true
        this.show.successMaskAccount = false
      },
      // 关闭账套添加
      hideAddAccountPop() {
        this.show.addAccountPop = false
      },
      // 查询所有账套
      queryAllAccounts() {
        console.log("查询所有账套",this.adminId, this.token)
        if (utils.isExist(this.adminId) && utils.isExist(this.token)) {
          api.queryAccounts({adminId: this.adminId, token: this.token}).then(res => {
            console.log("》", res.body)
            if (res.body.result == 0) {
              this.show.tableList = res.body.data
              this.show.dataIsNull = false
            }else {
              this.show.dataIsNull = true
            }
          })
        }
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
      selectRoleType(value) {
        console.log("纳税周期选择", value)
        this.submitAddAccInfo.taxPaymentPeriod = value
      },
      // 添加账套
      addAccount() {
        console.log("添加账套:", this.submitAddAccInfo)
        if (utils.isExist(this.submitAddAccInfo.companyName)) {
          this.show.hint = ''
          api.createAccount(this.submitAddAccInfo).then(res => {
            console.log("添加结果》", res.body)
            if (res.body.result == 0) {
              this.continueAccountInfo = res.body.data
              this.show.successMaskAccount = true
              this.queryAllAccounts()
            } else {
              this.$emit('error', res.body.msg)
            }
          })
          this.hideAddAccountPop()
        } else {
          this.show.hint = '请填写账套企业名称.'
        }
      },
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {

    },
    created() {
      this.$emit('sel', {index: 1,type: 'accounts'})
      this.queryAllAccounts()
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style scoped>
  /**第一行*/
  .accountsTitle-left, .accountsTitle-right {
    height: 30px;
    margin-top: 10px;
  }

  .accountsTitle-left {
    float: left;
  }

  .accountsTitle-left .accountsTitle-size, .accountsTitle-left .btn-refreshList {
    float: left;
  }

  .accountsTitle-left .accountsTitle-size {
    height: 30px;
    padding-top: 2px;
    border-bottom: 5px solid #5fbbfc;
  }

  .accountsTitle-left .btn-refreshList {
    width: 25px;
    height: 25px;
    margin-left: 10px;
    background: url(./i/refresh.png) no-repeat 50%;
    cursor: pointer;
    margin-top: -2px;
  }

  .accountsTitle-left, .accountsTitle-right {
    height: 30px;
    margin-top: 10px;
  }

  .accountsTitle-right {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    -ms-flex-flow: row-reverse;
    flex-flow: row-reverse;
  }

  /**page-content*/
  .accountsBody {
    width: 100%;
    height: 100%;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  [class*=-tableHead-2] {
    height: 60px;
  }

  [class*=accBody-tableHead] {
    width: 100%;
    background: #5fbbfc;
    border-radius: 3px 3px 0 0;
    border-left: 1px solid #5fbbfc;
    border-right: 1px solid #5fbbfc;
  }

  [class*=-tableHead-2] .tabHeadBox > div {
    line-height: 60px;
  }

  [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak, .ng-hide:not(.ng-hide-animate) {
    display: none !important;
  }

  .tabHeadBox .multiRowBox {
    height: 60px;
  }

  .tabHeadBox .multiRowBox .multiRow-body, .tabHeadBox .multiRowBox .multiRow-head {
    width: 100%;
    height: 50%;
    line-height: 30px;
    position: relative;
  }

  .tabHeadBox .multiRowBox .multiRow-head {
    border-bottom: 1px solid #fff;
  }

  .multiRowBox .multiRow-body > div {
    float: left;
  }

  .multiRowBox .multiRow-body > div {
    border-right: 1px solid #fff;
  }

  .multiLine > div:last-child, .multiRowBox .multiRow-body > div:last-child {
    border-right: none;
  }

  .multiLine > div {
    float: left;
    height: 100%;
    position: relative;
    border-right: 1px solid #dadfe8;
  }

  .accBody-tabBody {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
  }

  .accTabBody {
    cursor: pointer;
  }

  /**蒙层**/
  .pop-container .btn-closePop {
    background: url(../../views/home/i/closePop.png) no-repeat 50%;
  }
  .message-input .icon-required {
    background: url(../../views/home/i/required.png) no-repeat 50%;
    background-size: 7px;
  }
  .popSelectBox .icon-select-radio-on {
    background: url(../../views/home/i/selected.png) no-repeat 50%;
  }
  .popSelectBox .icon-select-radio-off {
    background: url(../../views/home/i/unselected.png) no-repeat 50%;
  }
  [class*=btn-go-] {
    width: 42%;
    line-height: 30px;
    text-align: center;
    border: 1px solid #5fbbfc;
    border-radius: 4px;
    color: #5fbbfc;
    cursor: pointer;
    float: left;
    margin: 20px 20px 20px 0;
  }
  [class*=btn-go-]:last-child {
    float:right;
    margin: 20px  0;
  }
  [class*=btn-go-]:hover {
    background: #5fbbfc;
    color: #fff;
  }
  .module-content.booksList {
    top: 50px;
  }

  .accTabBody .remarkTag:before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    right: 0;
    border-top: 25px solid #ff8a52;
    border-left: 25px solid transparent;
}

.accTabBody .remarkTag:after {
    content: "批";
    position: absolute;
    top: 1px;
    right: 1px;
    line-height: 12px;
    font-size: 12px;
    color: #fff;
    z-index: 1;
}
</style>
