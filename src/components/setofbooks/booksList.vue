<template>
  <div class="module-content ng-scope booksList">
    <div class="module-content_wrapper">
      <div class="module-content_page">
        <div class="page-title">
          <div class="accountsTitle-left">
            <div class="accountsTitle-size">账套列表</div>
            <div class="btn-refreshList anime" title="刷新" ng-click="updateAccounts()"></div>
          </div>
          <div class="accountsTitle-right">
            <div class="com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                 @click="showAddAccPop" ui-button="" btn-type="hollow" ng-show="showAddAccBtn()">
              <div><span class="ng-scope">添加账套</span></div>
            </div>
          </div>
        </div>
        <div class="page-content">
          <div class="accountsBody">
            <div ng-class="'accBody-tableHead-' + tableInfo[user.type].headLines" class="accBody-tableHead-2">
              <div class="tabHeadBox">
                <div ng-repeat="title in tableInfo[user.type].head" ng-class="title.span" class="ng-scope span-5">
                  <div ng-show="title.value !== '数据源' &amp;&amp; title.value !== '数据中心'" title=""
                       ng-class="title.path ? 'isOrderBy' : ''" ng-click="orderByValue(title.path)" class="ng-binding">
                    序号 <span ng-show="orderBy.order == title.path"
                             ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                             class="ng-hide icon-orderBy-up">▼</span></div>
                  <div class="multiRowBox ng-hide" ng-show="title.value == '数据源'">
                    <div class="multiRow-head">数据源</div>
                    <div class="multiRow-body"></div>
                  </div>
                  <div class="multiRowBox ng-hide" ng-show="title.value == '数据中心'">
                    <div class="multiRow-head">数据中心</div>
                    <div class="multiRow-body"></div>
                  </div>
                </div>
                <div ng-repeat="title in tableInfo[user.type].head" ng-class="title.span" class="ng-scope span-32">
                  <div ng-show="title.value !== '数据源' &amp;&amp; title.value !== '数据中心'" title="按 账套名称 排序"
                       ng-class="title.path ? 'isOrderBy' : ''" ng-click="orderByValue(title.path)"
                       class="ng-binding isOrderBy"> 账套名称 <span ng-show="orderBy.order == title.path"
                                                                ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                                                class="ng-hide icon-orderBy-up">▼</span></div>
                  <div class="multiRowBox ng-hide" ng-show="title.value == '数据源'">
                    <div class="multiRow-head">数据源</div>
                    <div class="multiRow-body"></div>
                  </div>
                  <div class="multiRowBox ng-hide" ng-show="title.value == '数据中心'">
                    <div class="multiRow-head">数据中心</div>
                    <div class="multiRow-body"></div>
                  </div>
                </div>
                <div ng-repeat="title in tableInfo[user.type].head" ng-class="title.span" class="ng-scope span-10">
                  <div ng-show="title.value !== '数据源' &amp;&amp; title.value !== '数据中心'" title="按 纳税类型 排序"
                       ng-class="title.path ? 'isOrderBy' : ''" ng-click="orderByValue(title.path)"
                       class="ng-binding isOrderBy"> 纳税类型 <span ng-show="orderBy.order == title.path"
                                                                ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                                                class="ng-hide icon-orderBy-up">▼</span></div>
                  <div class="multiRowBox ng-hide" ng-show="title.value == '数据源'">
                    <div class="multiRow-head">数据源</div>
                    <div class="multiRow-body"></div>
                  </div>
                  <div class="multiRowBox ng-hide" ng-show="title.value == '数据中心'">
                    <div class="multiRow-head">数据中心</div>
                    <div class="multiRow-body"></div>
                  </div>
                </div>
                <div ng-repeat="title in tableInfo[user.type].head" ng-class="title.span" class="ng-scope span-40">
                  <div class="multiRowBox" ng-show="title.value == '数据源'">
                    <div class="multiRow-head">数据源</div>
                    <div class="multiRow-body">
                      <div ng-repeat="sub in title.subLevel" title="按 开票 排序" ng-class="sub.class"
                           ng-click="orderByValue(sub.path)" class="ng-binding ng-scope span-33 isOrderBy"> 开票 <span
                        ng-show="orderBy.order == sub.path"
                        ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                        class="ng-hide icon-orderBy-up">▼</span></div>
                      <div ng-repeat="sub in title.subLevel" title="按 银行 排序" ng-class="sub.class"
                           ng-click="orderByValue(sub.path)" class="ng-binding ng-scope span-33 isOrderBy"> 银行 <span
                        ng-show="orderBy.order == sub.path"
                        ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                        class="ng-hide icon-orderBy-up">▼</span></div>
                      <div ng-repeat="sub in title.subLevel" title="按 扫描 排序" ng-class="sub.class"
                           ng-click="orderByValue(sub.path)" class="ng-binding ng-scope span-33 isOrderBy"> 扫描 <span
                        ng-show="orderBy.order == sub.path"
                        ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                        class="ng-hide icon-orderBy-up">▼</span></div>
                    </div>
                  </div>
                </div>
                <div ng-repeat="title in tableInfo[user.type].head" ng-class="title.span" class="ng-scope span-13">
                  <div class="ng-binding isOrderBy"> 状态 <span ng-show="orderBy.order == title.path"
                                                              ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                                              class="ng-hide icon-orderBy-up">▼</span></div>
                  <div class="multiRowBox ng-hide" ng-show="title.value == '数据源'">
                    <div class="multiRow-head">数据源</div>
                    <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel --> </div>
                  </div>
                  <div class="multiRowBox ng-hide" ng-show="title.value == '数据中心'">
                    <div class="multiRow-head">数据中心</div>
                    <div class="multiRow-body"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="accBody-tabBody ps-container ps-theme-default">
              <div>
                <div class="tabBodyBox accTabBody ng-scope rowLight" @click="enterAccount">
                  <div ng-class="tableInfo[user.type].body.index" class="ng-binding span-5"> 1</div>
                  <div ng-class="tableInfo[user.type].body.name" title="天机" style="text-align:left"
                       class="ng-binding span-32"> 天机
                    <div class="icon-tags">
                      <div class="icon-tag icon-zero ng-hide" ng-show="x.automaticType"></div>
                      <div class="icon-tag icon-specialIndustry ng-hide" ng-show="x.isSpecialIndustry"></div>
                    </div>
                    <div class="remarkTag ng-hide" ng-show="(x.vouStat.remarked || 0) !== 0"></div>
                  </div>
                  <div ng-class="tableInfo[user.type].body.taxpayerType" class="ng-binding span-10"> 小规模</div>
                  <div ng-class="tableInfo[user.type].body.dataOrigin" ng-if="tableInfo[user.type].body.dataOrigin"
                       class="ng-scope span-40 multiLine">
                    <div class="span-33 ng-binding"> 0</div>
                    <div class="span-33 ng-binding"> 0</div>
                    <div class="span-33 ng-binding"> 0/0</div>
                  </div>
                  <div ng-class="tableInfo[user.type].body.issueState" class="span-13">
                    <span class="accountStateBox ng-binding stateBox-ing" ng-class="getTabView('class', x.issueState)"> 做账中 </span>
                  </div>
                </div>
                <!--<div class="tabBodyBox accTabBody ng-scope" ng-class="{'rowLight': light.row == x._id}"
                     ng-click="enterAccount(x)">
                  <div ng-class="tableInfo[user.type].body.index" class="ng-binding span-5"> 2</div>
                  <div ng-class="tableInfo[user.type].body.name" title="天柃" style="text-align:left"
                       class="ng-binding span-32"> 天柃
                    <div class="icon-tags">
                      <div class="icon-tag icon-zero ng-hide" ng-show="x.automaticType"></div>
                      <div class="icon-tag icon-specialIndustry ng-hide" ng-show="x.isSpecialIndustry"></div>
                    </div>
                    <div class="remarkTag ng-hide" ng-show="(x.vouStat.remarked || 0) !== 0"></div>
                  </div>
                  <div ng-class="tableInfo[user.type].body.taxpayerType" class="ng-binding span-10"> 一般</div>
                  &lt;!&ndash; ngIf: tableInfo[user.type].body.customer &ndash;&gt; &lt;!&ndash; ngIf: tableInfo[user.type].body.common &ndash;&gt;
                  &lt;!&ndash; ngIf: tableInfo[user.type].body.mgr &ndash;&gt; &lt;!&ndash; ngIf: tableInfo[user.type].body.dataOrigin &ndash;&gt;
                  <div ng-class="tableInfo[user.type].body.dataOrigin" ng-if="tableInfo[user.type].body.dataOrigin"
                       class="ng-scope span-40 multiLine">
                    <div class="span-33 ng-binding"> 0</div>
                    <div class="span-33 ng-binding"> 0</div>
                    <div class="span-33 ng-binding"> 0/0</div>
                  </div>&lt;!&ndash; end ngIf: tableInfo[user.type].body.dataOrigin &ndash;&gt;
                  &lt;!&ndash; ngIf: tableInfo[user.type].body.isAllAudited &ndash;&gt;
                  <div ng-class="tableInfo[user.type].body.issueState" class="span-13"> &lt;!&ndash; ngIf: !x.equilibrium &ndash;&gt;
                    <span class="accountStateBox ng-binding stateBox-not" ng-class="getTabView('class', x.issueState)"> 未开始 </span>
                    <span class="icon-deleteAccount" title="删除账套" ng-show="canDeleteAcount(x)"
                          ng-click="showDelAccPop(x, $event)"></span></div>
                </div>
                <div class="tabBodyBox accTabBody ng-scope" ng-class="{'rowLight': light.row == x._id}"
                     ng-click="enterAccount(x)">
                  <div ng-class="tableInfo[user.type].body.index" class="ng-binding span-5"> 3</div>
                  <div ng-class="tableInfo[user.type].body.name" title="123" style="text-align:left"
                       class="ng-binding span-32"> 123
                    <div class="icon-tags">
                      <div class="icon-tag icon-zero ng-hide" ng-show="x.automaticType"></div>
                      <div class="icon-tag icon-specialIndustry ng-hide" ng-show="x.isSpecialIndustry"></div>
                    </div>
                    <div class="remarkTag ng-hide" ng-show="(x.vouStat.remarked || 0) !== 0"></div>
                  </div>
                  <div ng-class="tableInfo[user.type].body.taxpayerType" class="ng-binding span-10"> 独资合伙</div>
                  &lt;!&ndash; ngIf: tableInfo[user.type].body.customer &ndash;&gt; &lt;!&ndash; ngIf: tableInfo[user.type].body.common &ndash;&gt;
                  &lt;!&ndash; ngIf: tableInfo[user.type].body.mgr &ndash;&gt; &lt;!&ndash; ngIf: tableInfo[user.type].body.dataOrigin &ndash;&gt;
                  <div ng-class="tableInfo[user.type].body.dataOrigin" ng-if="tableInfo[user.type].body.dataOrigin"
                       class="ng-scope span-40 multiLine">
                    <div class="span-33 ng-binding"> 0</div>
                    <div class="span-33 ng-binding"> 0</div>
                    <div class="span-33 ng-binding"> 0/0</div>
                  </div>&lt;!&ndash; end ngIf: tableInfo[user.type].body.dataOrigin &ndash;&gt;
                  &lt;!&ndash; ngIf: tableInfo[user.type].body.isAllAudited &ndash;&gt;
                  <div ng-class="tableInfo[user.type].body.issueState" class="span-13"> &lt;!&ndash; ngIf: !x.equilibrium &ndash;&gt;
                    <span class="accountStateBox ng-binding stateBox-not" ng-class="getTabView('class', x.issueState)"> 未开始 </span>
                    <span class="icon-deleteAccount" title="删除账套" ng-show="canDeleteAcount(x)"
                          ng-click="showDelAccPop(x, $event)"></span></div>
                </div>-->
                <div class="dataIsNull" v-if="show.dataIsNull">暂无账套信息</div>
              </div>
              <!--<div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
              </div>
              <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <!--<div class="btn-scrollTopBox anime ng-hide" ng-click="scrollBarTop()" ng-style="scrollBarTopStyle()"
           ng-show="show.scrollTopBtn" title="回到顶部" style="bottom: 11px;"></div>-->
    </div>
  </div>
</template>

<script>
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        show: {
          // 是否有账套标识
          dataIsNull: false,
          // 账套列表
          tableList: [],
          accountsId: '1'
        }
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      enterAccount() {
        console.log("选择账套")
        this.$router.push(
          {
            name: 'voucher',
            params: {id: 1}
          }
          )
      },
      // 添加账套
      showAddAccPop() {
        console.log("添加账套")
        this.$emit("accPop")
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit('sel', {index: 1})
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
</style>
