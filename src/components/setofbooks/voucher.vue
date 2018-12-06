<template>
  <div>
    <!-- 凭证主体 -->
    <div class="module-content ng-scope">
      <div class="module-content_wrapper">
        <div class="module-content_page page-vouchers">
          <div class="page-title">
            <p class="title" :class="{'title--on': tabType === 'list'}" @click="chooseTabType('list')">凭证列表</p>
            <p class="title ng-hide" :class="{'title--on': tabType === 'report'}" ng-click="chooseTabType('report')"
               ng-show="!isCurrentIssue">结账报告</p>
            <p class="title ng-hide" :class="{'title--on': tabType === 'accrue'}" ng-click="chooseTabType('accrue')">计提配置</p>
            <p class="title ng-hide" :class="{'title--on': tabType === 'adjust'}" ng-click="chooseTabType('adjust')">往来调账</p>
            <div class="title-gap"></div>
          </div>
          <!-- 列表-->
          <div class="page-tab ng-isolate-scope" v-if="tabType == 'list'">
            <!-- 页面工具 -->
            <div class="page-tools">
              <div class="title-gap"></div>
              <div class="searchInput">
                <input class="search ng-pristine ng-untouched ng-valid ng-empty" type="text"
                                              placeholder="搜索凭证..." v-model.trim="voucherFilter"> 
                <i class="search-icon icon-search icon-30" v-if="voucherFilter === ''"></i>
                <i class="search-icon g-icon-close icon-30" v-if="voucherFilter.length > 0"
                @click.stop="clearFilter"></i>
              </div>
              <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow" @click.stop="initialize">
                <div><span class="ng-scope"> 刷新列表</span></div>
              </div>
              <div class="funcBtn com-button anime ng-isolate-scope com-button--disabled com-button--cancel"
                   ng-class="class" ng-click=";click();" ui-button="" btn-type="hollow"
                   btn-enabled="canSwitchIssueState" btn-click="switchCarryoverState()">
                <div><span class="ng-binding ng-scope"> 结账</span></div>
              </div>
              <div class="funcBtn com-button anime ng-isolate-scope com-button--disabled com-button--cancel"
                   ng-class="class" ng-click=";click();" ng-show="isCurrentIssue" ui-button="" btn-type="hollow"
                   btn-enabled="canAccrue" btn-click="openAccrueReport()">
                <div><span class="ng-scope"> 自动计提</span></div>
              </div>
              <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow" @click.stop="createVoucher">
                <div><span class="ng-scope"> 新建凭证</span></div>
              </div>
              <div class="button funcBtn30 icon-archive icon-30 ng-hide" title="查看交接文件" ng-show="canCheckArchives"
                   ng-click="showArchives()"><span ng-show="hasFileToPost" class="ng-hide"></span></div>
              <div class="button funcBtn30 icon-attach icon-30" title="查看辅助文件" ng-click="showAttaches()"></div>
              <div class="button funcBtn30 icon-bin icon-30" title="查看回收票据" ng-click="showBin()"></div>
            </div>
            <!-- 表单主体 -->
            <div class="page-content">
              <div class="contentTitle">
                <div class="titleBar">
                  <div class="v-col-type"></div>
                  <div class="v-col-content">
                    <p class="h-name">摘要</p>
                    <p class="h-subject">科目</p>
                    <p class="h-debit">借方金额</p>
                    <p class="h-credit">贷方金额</p>
                  </div>
                  <div class="v-col-audit">
                    <div class="button icon-25 fullAuditIndicator" :title="isAllAudited?'取消全部审核':'全部审核'" :class="isAllAudited ? 'icon-audited' : 'icon-unaudited'" @click.stop="switchVouchersState"></div>
                  </div>
                </div>
              </div>
              <div class="toolTitle" v-if="voucherData.voucherList.length !== 0">
                <ul class="voucherTypes">
                  <li><span class="circle cir-types vou-gather"></span>收</li>
                  <li><span class="circle cir-types vou-payment"></span>付</li>
                  <li><span class="circle cir-types vou-transfer"></span>转</li>
                </ul>
                <template v-if="1 != 1">
                  <div class="button sortSwitcher" ng-click="switchListOrder()">
                    <p class="ng-binding">降序排列</p>
                    <div class="icon-sort icon-20 sort"></div>
                  </div>
                  <div class="button sortSwitcher" ng-click="sortByTransaction()" ng-show="isCurrentIssue">
                    <p>按收付转排序</p>
                    <div class="icon-sort icon-20 sort"></div>
                  </div>
                  <div class="button sortSwitcher" ng-click="sortByCatagory()" ng-show="isCurrentIssue">
                    <p>按业务类型排序</p>
                    <div class="icon-sort icon-20 sort"></div>
                  </div>
                  <div class="button vouOprSwitcher" ng-click="splitVouchers()" ng-show="isCurrentIssue">
                    <p>拆分凭证</p>
                  </div>
                  <div class="button vouOprSwitcher" ng-click="integrationVouchers()" ng-show="isCurrentIssue">
                    <p>汇总凭证</p>
                  </div>
                </template> 
                <div class="gap"></div>
                <p class="button subTitle ng-binding" title="全部收缩" ng-click="switchFoldeds" v-if="voucherData"> 共有{{voucherData.totalCount}}张凭证，已审核{{voucherData.checkedCount}}张 </p>
                <div class="vouSwitcher">
                  <div class="anime icon-expand expand" :class="{'expand-s' : !voucherData.allShowDetails}"></div>
                </div>
              </div>
              <!-- 表单主体 -->
              <div class="contentPage ps-theme-default" id="voucherListComponent" style="overflow-y: auto;">
                <div class="pageWrapper">
                  <div class="anime entryContainer ng-scope" v-for="(v, index) in voucherData.voucherList" :key="index"
                       :class="v.isStartPostil == 1 ? 'entryContainer--remarked' : 'entryContainer--unremarked'"
                       v-if="voucherData && voucherData.voucherList">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList" :class="{'vou-gather':v.vType == '1', 'vou-payment':v.vType == '2','vou-transfer':v.vType == '3'}" :title="v.vName"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" @click.stop="switchFolded(v, index)">
                        <div class="col-index">
                          <label for="vl0" class="ng-binding" v-text="v.vId"></label>
                          <input id="vl0" type="text" v-model="v.vId" ng-if="!v.vAudited"
                                ng-focus="seqInputOnfocus($event)" ng-blur="changeVoucherSeq(v)"
                                ng-click="$event.stopPropagation();" ng-keydown="seqInputKeydown($event)"
                                class="ng-pristine ng-untouched ng-valid ng-scope">
                        </div>
                        <p class="col-summary ng-binding"></p>
                        <p class="col-source ng-binding"> 数据来源： 
                          <span class="span-source ng-binding" v-text="v.comesFrom"></span>
                        </p>
                        <div class="entryOptsBox">
                          <template v-if="v.status == 0">
                            <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                               @click.stop="preDelete(v)">
                            <div class="optIcon icon-40 icon-voucher-delete"></div>
                            <p class="optTag optTag--orange">删除</p></div>
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                               @click.stop="showVoucherEditor(v)">
                            <div class="optIcon icon-40 icon-voucher-edit"></div>
                            <p class="optTag optTag--blue">编辑</p></div>
                          </template>
                          <template v-if="v.status == 1">
                            <div class="button entryOpt ng-scope" @click.stop="showVoucherEditor(v)">
                              <div class="optIcon icon-40 icon-voucher-view"></div> 
                              <p class="optTag optTag--blue">查看</p> 
                            </div>
                          </template>
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               @click.stop="editVoucherRemark(v)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注</p>
                          </div>
                        </div>
                      </div>
                      <div class="entryBar ng-scope" v-for="(e, idx) in v.voucherEntryList" v-if="v.showDetails"
                           @click.stop="showVoucherEditor(v)" :key="idx"><p class="col-name ng-binding" v-text="e.digest"></p>
                        <p class="col-subNum ng-binding" v-text="e.course ? e.course.coding : ''"></p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'" v-text="e.course ? e.course.courseName : ''"></p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount">
                          <p ng-show="e.isAmount" class="ng-binding ng-hide">数量: 1.00</p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide">单价: 0.00CNY</p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide">CNY: 0.00</p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide">汇率: 0.0000</p>
                        </div>
                        <p class="col-debit ng-binding">{{e.borrow == 0 ? '' : e.borrow | moneyFilter}}</p>
                        <p class="col-credit ng-binding">{{e.loan == 0 ? '' : e.loan | moneyFilter}}</p>
                      </div>
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">{{v.totalBorrow | moneyFilter}}</p>
                        <p class="col-credit ng-binding">{{v.totalLoan | moneyFilter}}</p>
                      </div>
                      <div class="remarkBar" v-if="v.isStartPostil == 1">
                        <p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">
                          <input type="text" class="ng-pristine ng-untouched ng-valid ng-scope" v-model="v.postil" @blur="updateVoucherDataByStatusAndRemark(v, 'remark')">
                        </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator" data-toggle="tooltip"
                           :title="v.status == 0 ? '确认审核' : '取消审核'" :class="v.status == 0 ? 'icon-unaudited' : 'icon-audited'"
                           @click.stop="updateVoucherDataByStatusAndRemark(v, 'examine')">
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 计提配置 -->
          <div class="page-tab ng-isolate-scope" v-if="tabType == 'accrue'"></div>
          <!-- <div class="page-tab ng-isolate-scope" ng-show="on" ui-vouchers-report="" by="tab">
            <div class="page-tools">
              <div class="title-gap"></div>
              <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow ng-hide" ng-class="class"
                   ng-click=";click();" ng-show="hasChange" btn-click="cancel()" ui-button="" btn-type="hollow">
                <div></div>
              </div>
            </div>
            <div class="page-content">
              <div class="contentPage">
                <div class="pageWrapper reportContainer">
                  <div class="closeReport ps-container ps-theme-default ng-hide" scroll="" scroll-behavior="top"
                       ng-show="reports.length > 0" data-ps-id="33c37b23-ca94-3907-2afb-9f4bade9b5af">
                  </div>
                  <div class="noData" ng-show="reports.length === 0">
                    <div class="icon-noData"></div>
                    <p>本期无结账数据</p></div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- 往来调账 -->
          <div class="page-tab ng-isolate-scope" v-if="tabType == 'adjust'">
            <div class="page-tools" style="margin-right:30px">
              <div class="title-gap"></div>
              <div class="searchInput">
                <input class="search ng-pristine ng-untouched ng-valid ng-empty" type="text"
                                              placeholder="搜索科目..." ng-model="subFilter"> 
                  <i class="search-icon icon-search icon-30" ng-show="subFilter === ''"></i> 
                  <i class="search-icon g-icon-close icon-30 ng-hide" ng-hide="subFilter === ''" ng-click="clearFilter()"></i>
              </div>
              <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow ng-hide" ng-class="class"
                   ng-click=";click();" ng-show="hasChange && canEdit" btn-click="cancel()" ui-button=""
                   btn-type="hollow">
                <div><span class="ng-scope">取消</span></div>
              </div>
              <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow ng-hide" ng-class="class"
                   ng-click=";click();" ng-show="hasChange && canEdit" btn-click="save()" ui-button=""
                   btn-type="hollow">
                <div><span class="ng-scope">保存</span></div>
              </div>
            </div>
            <div class="page-content">
              <div class="contentPage ps-container ps-theme-default" scroll="" scroll-behavior="top"
                   data-ps-id="6553c580-accb-10b1-35f9-4be2666362ad">
                <div class="pageWrapper vouchersAdjust">
                  <div class="page-sidebar page-sidebar--right">
                    <div class="page-sidebar_item ng-binding ng-scope"
                         ng-class="{'page-sidebar_item--on': n.type === nav.type}" ng-repeat="n in navSidebars"
                         ng-click="switchAdjustType(n)">现金收款付款
                    </div>
                    <div class="page-sidebar_item ng-binding ng-scope"
                         ng-class="{'page-sidebar_item--on': n.type === nav.type}" ng-repeat="n in navSidebars"
                         ng-click="switchAdjustType(n)">预收预付调整
                    </div>
                  </div>
                  <div class="page-table">
                    <div class="page-table-rel">
                      <div class="table-header">
                        <table>
                          <tbody>
                          <tr>
                            <td class="span-30">科目名称</td>
                            <td class="span-20">科目余额</td>
                            <td class="span-20"> 调整金额 
                              <i class="icon-transform btn-transform icon-transform--white"
                                ng-click="transformAll()" ng-show="canEdit"></i>
                            </td>
                            <td class="span-30">调整科目</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="table-body ps-container ps-theme-default" scroll=""
                           data-ps-id="8ad1b3c9-4cbe-a9df-2117-420cde942c4d">
                        <table ng-show="data[nav.type].length !== 0">
                          <tbody></tbody>
                        </table>
                        <div ng-show="data[nav.type].length === 0" class="noData ng-hide"><i class="icon-nodata"></i>
                          <p>暂无数据</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新建或更新凭证弹层 -->
    <div class="site-mask anime ng-scope site-mask--shade" v-if="showVoucherFlag">
      <div id="ui-ve" class="site-popup popupContainer ng-isolate-scope site-popup--expand"
           style="transform-style: preserve-3d; transition: all 50ms ease 0s;">
        <div class="button popupExit icon-25 g-icon-close" @click.stop="close"></div>
        <p class="popupTitle ng-binding" v-text="cacheEntry.status == 'create' ? '新建凭证' : cacheEntry.status == 'edit' ? '编辑凭证' : '查看凭证'"></p>
        <div class="disableEditTips ng-hide" ng-show="isAdmin">管理员仅拥有查看权限，无法修改！</div>
        <div class="disableEditTips" v-if="voucher.status == 1">凭证已审核，数据不允许编辑！</div>
        <div class="popupContent">
          <p class="entryTitle ng-binding">记-000&nbsp;&nbsp;凭证名称：{{voucher.voucherEntryList[0].digest}} </p>
          <div class="entryContainer">
            <div class="entryHead">
              <div class="tbRow"><p class="h-summary">摘要</p>
                <div class="h-subject-c">科目</div>
                <div class="h-currency ng-binding ng-hide" ng-show="voucher.hasForeigns || voucher.hasAmount"></div>
                <p class="h-debit">借方金额</p>
                <p class="h-credit">贷方金额</p></div>
            </div>
            <div class="entryBody">
              <div class="ui-et ng-isolate-scope ps-theme-default" id="ui-et-807744" style="overflow-y: auto;">
                <div class="entrysContainer">
                  <div class="entryBar ng-scope" v-for="(e, index) in voucher.voucherEntryList" :key="index">
                    <div class="button insert icon-16 g-icon-insert-line ng-scope" title="下方插入行" v-if="voucher.status != 1"
                         @click.stop="insertEntry(index)"></div>
                     <!-- 摘要 -->     
                     <div class="col-summary">
                      <label class="tbLabel" :for="forId(index, 0)">
                        <p class="ng-binding" v-text="e.digest"></p>
                      </label>
                      <input class="tbInput ng-pristine ng-valid ng-empty ng-touched" :id="forId(index, 0)" type="text"
                             ng-change="entrySummaryOnChanged(e)" @focus="inputBlur(index)" v-model="e.digest" v-if="voucher.status != 1" />
                     </div>
                    <!-- 科目编号 -->
                    <div class="col-subNum">
                      <label class="tbLabel ng-binding" :for="forId(index, 1)" v-text="e.course ? e.course.coding : ''"></label>
                    </div>
                    <!-- 科目名称 -->
                    <div class="col-subName-c">
                      <label class="tbLabel" :for="forId(index, 1)">
                        <p class="ng-binding" v-text="e.course ? e.course.courseName : ''"></p>
                      </label>
                    </div>
                    <!-- 科目下拉选项 -->
                    <div class="col-subject-c" :class="e.canShowSelectFlag?'col-subject-on' : ''">
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-empty"
                             type="text" v-model="e.course.coding" :id="forId(index, 1)"
                             v-if="voucher.status != 1"
                             @focus="inputFocus(index, $event)" ng-change="entrySubjectOnChange($event)">
                    </div>

                    <div class="col-currency ng-hide zweirtqs-0-2" v-if="1 != 1">
                      <label class="accAttr ng-binding ng-hide" ng-click="accAttrAmountOnClick($event, $index)"> 数量:
                        1.00 </label>
                      <label class="accAttr ng-binding ng-hide" ng-click="accAttrPriceOnClick($event, $index)">
                        单价: 0.00 CNY </label>
                      <label
                        class="accAttr ng-binding ng-hide" ng-click="accAttrCurrencyOnClick($event, $index)">
                        CNY: 0.00 </label>
                      <label class="accAttr ng-binding ng-hide" ng-click="accAttrRateOnClick($event, $index)">
                        汇率: 0.0000 </label>
                    </div>

                    <div class="col-debit">
                      <label class="tbLabel ng-binding" :for="forId(index, 6)">{{e.borrow == 0 ? '' : e.borrow | moneyFilter}}</label>
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
                             :id="forId(index, 6)" v-model="e.borrow" v-if="voucher.status != 1"
                             @change="entryAmountOnChange(e, 'debit')"
                             @focus="cellFocusOnClick($event)">
                    </div>
                    <div class="col-credit">
                      <label class="tbLabel ng-binding" :for="forId(index, 7)">{{e.loan == 0 ? '' : e.loan | moneyFilter}}</label>
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-not-empty" type="number" v-if="voucher.status != 1"
                             :id="forId(index, 7)" v-model="e.loan" @focus="cellFocusOnClick($event)"
                             @change="entryAmountOnChange(e, 'lender')">
                    </div>
                    <div class="button delete icon-16 g-icon-delte-line ng-scope" data-toggle="tooltip" title="删除行"
                         @click.stop="deleteEntry(index)" ng-if="!freeze" v-if="voucher.status != 1"></div>
                  </div>

                  <div class="accAttrContainer" v-if="1 != 1">
                    <div class="accRow ng-hide" ng-show="cacheEntry.isAmount"><p class="accTag">数量:</p> <input
                      class="accInput ng-pristine ng-untouched ng-valid ng-empty" type="text"
                      ng-model="cacheEntry.amount"
                      ng-disabled="freeze" ng-focus="accAttrAmountOnFocus($event)" ng-blur="accAttrAmountOnBlur()"
                      ng-change="accAttrAmountOnChange()"></div>
                    <div class="accRow ng-hide" ng-show="cacheEntry.isAmount"><p class="accTag">单价:</p> <input
                      class="accInput ng-pristine ng-untouched ng-valid ng-empty" type="text"
                      ng-model="cacheEntry.price"
                      ng-disabled="freeze" ng-focus="accAttrPriceOnFocus($event)" ng-blur="accAttrPriceOnBlur()"
                      ng-change="accAttrPriceOnChange()"></div>
                    <div class="accRow ng-hide" ng-show="cacheEntry.isForeign"><p class="accTag ng-binding">:</p> <input
                      class="accInput ng-pristine ng-untouched ng-valid ng-empty" type="text"
                      ng-model="cacheEntry.currency" ng-disabled="freeze" ng-focus="accAttrCurrencyOnFocus($event)"
                      ng-blur="accAttrCurrencyOnBlur()" ng-change="accAttrCurrencyOnChange()"></div>
                    <div class="accRow ng-hide" ng-show="cacheEntry.isForeign"><p class="accTag">汇率:</p> <input
                      class="accInput ng-pristine ng-untouched ng-valid ng-empty" type="text" ng-model="cacheEntry.rate"
                      ng-disabled="freeze" ng-focus="accAttrRateOnFocus($event)" ng-blur="accAttrRateOnBlur()"
                      ng-change="accAttrRateOnChange()"></div>
                  </div>
                </div>
                <div id="balanceBox-ui-et-807744" class="balanceBox">
                  <p ng-style="isBalanceNegative && {'color' : 'red'}" class="ng-binding"
                     style="left: 738.641px; width: 249px;pointer-events:painted;opacity:1">余额：0.00</p>
                </div>
              </div>
            </div>
            <!-- 弹层下拉框 Begin -->
            <div v-if="cacheEntry.on  && voucher.status != 1" class="ng-isolate-scope" id="ui-sub-871971" style="position: fixed; z-index: 1; top: 0px; left: 0px; width: 0px; height: 0px;"> 
              <div id="ui-ss-container" class="ng-isolate-scope" style="left: 230.225px; width: 507px; height: 59px;" :style="{'top': ((cacheEntry.index - 1) * 60 + 210) + 'px'}"> 
                <ul> 
                  <li  ng-click="createSub()" class="hide">新建此科目</li> 
                  <li class="forbidden hide">[无效科目]</li> <!-- ngRepeat: sub in cacheList --> 
                  <li v-for="(sub, idx) in subjectList" @click.stop="selectSubject(sub)" class="ng-binding ng-scope" :class="sub.hasSon ? 'nonLeaf' : ''" :style="{'padding-left': sub.coding.length == 4 ? '8px' : sub.coding.length == 7 ? '23px' : '38px'}" :key="idx">{{sub.codingName}}</li>
                  </ul>
                </div>
              </div>
            <!-- 弹层下拉框 End -->
            <div class="entryFooter">
              <div class="tbRow"><p class="f-summary">合计</p>
                <p class="f-subject">差值： <span :class="{'span-nb' : voucher.interpolation != 0}"
                                               class="ng-binding">{{voucher.interpolation | moneyFilter}}</span>
                </p>
                <p class="f-debit ng-binding">{{voucher.totalBorrow | moneyFilter}}</p>
                <p class="f-credit ng-binding">{{voucher.totalLoan | moneyFilter}}</p></div>
            </div>
          </div>
        </div>
        <div class="popupFooter">
          <div class="button footBtn template ng-hide" ng-show="freeze && isMyAccount" ng-click="newTemplate()">
            存储模板
          </div>
          <div class="button footBtn template ng-hide"> 模板
            <div class="selectBox">
              <div class="button item new" ng-click="newTemplate()">存储模板</div>
              <div class="button item use" ng-click="useTemplate()">使用模板</div>
            </div>
          </div>
          <template v-if="voucher.status != 1">
            <div class="footBtn save com-button anime ng-isolate-scope com-button--ok" @click.stop="saveVoucher('save')">
              <div><span class="ng-scope">保存</span></div>
            </div>
            <div class="footBtn continue com-button anime ng-isolate-scope com-button--ok" @click.stop="saveAndCreate">
              <div><span class="ng-scope">保存并新建</span></div>
            </div>
          </template>
        </div>
        <div></div>
      </div>
    </div>

    <!-- 添加提示弹层 -->
    <div class="site-mask anime ng-isolate-scope site-mask--shade" v-if="waringMsgFlag || errorMsgFlag"> 
      <div class="site-popup anime flex--column site-popup--expand" :class="[waringMsgFlag ? 'popup-confirm' : '',errorMsgFlag ? 'popup-message' : '']"> 
        <div class="site-popup_head"> 
          <div class="site-popup_title">财税通提醒您：</div> 
          <div class="site-popup_close g-icon-close" @click.stop="hideMask" v-if="errorMsgFlag"></div>
        </div> 
        <div class="site-popup_body"> 
          <div class="site-popup_type" v-if="errorMsgFlag"> 
            <div class="typeIcon g-icon-error"></div>
            <p class="typeTitle typeTitle--error">操作失败</p> 
          </div>
          <div class="site-popup_message" v-if="errorMsgFlag"> 
              <p class="ng-binding">您尚未填写任何内容，无法保存。</p> 
            </div>
          <div class="site-popup_type" v-if="waringMsgFlag"> 
            <div class="typeIcon g-icon-warn"></div> 
            <p class="typeTitle typeTitle--warn ng-binding">{{waringMsg}}</p> 
          </div> 
        </div> 
        
        <div class="site-popup_footer"> 
          <div class="btn--cancel com-button anime ng-isolate-scope com-button--cancel" @click.stop="hideMask" v-if="waringMsgFlag"> 
            <div>
              <span class="ng-scope">否</span>
            </div> 
          </div> 
          <div class="btn--ok com-button anime ng-isolate-scope com-button--ok" @click.stop="saveVoucher('again')" v-if="waringMsgFlag"> 
            <div>
              <span class="ng-scope">是</span>
            </div> 
          </div> 
        </div> 
      </div> 
    </div>

    <!-- 删除确认 -->
    <div class="site-mask anime ng-isolate-scope site-mask--shade" v-if="canDeleted"> 
      <div class="site-popup anime popup-confirm flex--column site-popup--expand"> 
        <div class="site-popup_head"> 
          <div class="site-popup_title">财税通提醒您：</div> 
        </div> 
        <div class="site-popup_body"> 
          <div class="site-popup_type"> 
            <div class="typeIcon g-icon-warn"></div> 
            <p class="typeTitle typeTitle--warn ng-binding">您确定要删除该张凭证吗？</p> 
          </div> 
        </div> 
        <div class="site-popup_footer"> 
          <div class="btn--cancel com-button anime ng-isolate-scope com-button--cancel" @click.stop="toggleShowDelete('hide')"> 
            <div>
              <span class="ng-scope">否</span>
            </div> 
          </div> 
          <div class="btn--ok com-button anime ng-isolate-scope com-button--ok" @click.stop="deleteVoucher"> 
            <div>
              <span class="ng-scope">是</span>
            </div> 
          </div> 
        </div> 
      </div> 
    </div>
  </div>
</template>

<script>
import api from "./api/index"
import utils from "../../utils"
//Js部分尽量采用ES6语法，webpack babel插件会转义兼容
export default {
  //组件私有数据（必须是function，而且要return对象类型）
  data() {
    return {
      // 当前tab
      tabType: "list",
      token: utils.dbGet("userInfo").token,
      adminId: utils.dbGet("userInfo").id,
      accountId: utils.dbGet("account").id,
      // 新建凭证弹层
      showVoucherFlag: false,
      // 新建或者编辑凭证对象
      cacheEntry: {
        title: "新建凭证",
        on: false,
        index: 1,
        status: 'create',
        saveType: ''
      },
      // 科目
      subjectList: [],
      // 凭证列表模板数据
      voucher: {
        voucherEntryList: [
          {
            digest: "",
            courseId: "",
            course: {
              coding: "",
              courseName: ""
            },
            borrow: 0,
            loan: 0,
            canShowSelectFlag: true,
            balance: 0,
            hasFocus: false
          },
          {
            digest: "",
            courseId: "",
            course: {
              coding: "",
              courseName: ""
            },
            borrow: 0,
            loan: 0,
            canShowSelectFlag: true,
            balance: 0,
            hasFocus: false
          },
          {
            digest: "",
            courseId: "",
            course: {
              coding: "",
              courseName: ""
            },
            borrow: 0,
            loan: 0,
            canShowSelectFlag: true,
            balance: 0,
            hasFocus: false
          },
          {
            digest: "",
            courseId: "",
            course: {
              coding: "",
              courseName: ""
            },
            borrow: 0,
            loan: 0,
            canShowSelectFlag: true,
            balance: 0,
            hasFocus: false
          },
          {
            digest: "",
            courseId: "",
            course: {
              coding: "",
              courseName: ""
            },
            borrow: 0,
            loan: 0,
            canShowSelectFlag: true,
            balance: 0,
            hasFocus: false
          }
        ],
        interpolation: 0,
        totalBorrow: 0,
        totalLoan: 0
      },
      // 警告弹层标识
      waringMsgFlag: false,
      // 警告
      waringMsg: "",
      // 失败弹层标识
      errorMsgFlag: false,
      // 搜索关键词
      voucherFilter: "",
      // 凭证列表数据
      voucherData: {
        voucherList: []
      },
      // 取消所有审核标识
      isAllAudited: false,
      isSelectAll: [],
      // 是否显示删除弹层
      canDeleted: false,
    };
  },
  //计算属性
  computed: {},
  //函数集，自己封装，便于开发使用
  methods: {
    // 关闭新建凭证弹层
    close() {
      this.showVoucherFlag = false;
      this.inputBlur(this.cacheEntry.index - 1);
      if (this.cacheEntry.status != 'create') {
        this.queryVoucherList()
      }
    },
    // 创建新的凭证
    createVoucher() {
      this.showVoucherFlag = true;
      this.cacheEntry.status = 'create'
      this.entriesConfig();
    },
    // 新建或者更新凭证的科目
    entrySubjectOnClick() {
      console.log("新建或者更新凭证的科目");
    },
    // 展示下拉框
    showSelect(opt) {
      console.log("展示下拉框", opt);
      // opt.canShowSelectFlag = true
    },
    // 借方贷方点击事件
    cellFocusOnClick(event) {
      console.log("借方贷方点击事件");
      event.currentTarget.select();
    },
    // 查询科目列表数据
    querySubject() {
      console.log("查询科目列表数据");
      api
        .querySubjectListData({
          accountSetId: this.accountId,
          token: this.token
        })
        .then(res => {
          console.log("查询科目列表数据结果：", res.body);
          if (res.body.result == 0) {
            this.subjectList = res.body.data;
          }
        });
    },
    // 获取id
    forId(index, value) {
      return "zweirtqs_" + index + "_" + value;
    },
    inputFocus(index, event) {
      // console.log("inputFocus:", index)
      this.cacheEntry.on = true;
      this.cacheEntry.index = Number(index) + 1;
      this.voucher.voucherEntryList[this.cacheEntry.index - 1].hasFocus = true;
      event.currentTarget.select();
    },
    inputBlur(index) {
      // console.log("inputBlur:", index)
      this.cacheEntry.on = false;
      this.voucher.voucherEntryList[index].hasFocus = false;
    },
    // 选择科目
    selectSubject(opt) {
      console.log("选择科目", opt, this.cacheEntry.index);
      if (!opt.hasSon) {
        this.inputBlur(this.cacheEntry.index);
        this.voucher.voucherEntryList[this.cacheEntry.index - 1].course.coding =
          opt.coding;
        this.voucher.voucherEntryList[
          this.cacheEntry.index - 1
        ].course.courseName = opt.courseName;
        this.voucher.voucherEntryList[this.cacheEntry.index - 1].courseId =
          opt.id;
      }
    },
    // 借贷方金额变更
    entryAmountOnChange(opt, type) {
      if (type == "debit") {
        opt.loan = 0;
      } else if (type == "lender") {
        opt.borrow = 0;
      }
      this.calcTotal();
    },
    // 计算
    calcTotal() {
      let total = 0,
        debit = 0,
        lender = 0;
      this.voucher.voucherEntryList.forEach(el => {
        if (el) {
          debit += Number(el.borrow);
          lender += Number(el.loan);
        }
      });
      console.log("计算", debit, lender);
      total = debit - lender;
      this.voucher.interpolation = total;
      this.voucher.totalBorrow = debit;
      this.voucher.totalLoan = lender;
    },
    // 保存
    saveVoucher(type) {
      console.log(9572, type, this.cacheEntry)
      if (this.cacheEntry.status == 'create') {
        this.cacheEntry.saveType = 'save'
        console.log("保存凭证");
        if (type && type == "again") {
          this.realSave();
          if (this.cacheEntry.saveType == 'saveAndCreate') {
            this.createVoucher()
          }
        } else {
          if (this.beforeSave()) {
            console.log("可以保存");
            this.realSave();
          }
        }
      } else {
        // 更新
        this.cacheEntry.saveType = 'save'
        this.updateVoucherData(type)
      }
    },
    // 新增实现
    realSave() {
      this.close();
      this.hideMask();
      let params = this.voucher.voucherEntryList;
      for (let i = params.length - 1; i >= 0; i--) {
        if (
          !params[i].digest &&
          !params[i].course.coding &&
          !params[i].course.courseName &&
          params[i].borrow == 0 &&
          params[i].loan == 0
        ) {
          params.splice(i, 1);
        }
      }
      this.voucher.token = this.token;
      this.voucher.accountSetId = this.accountId;
      console.log("保存信息参数：", JSON.stringify(this.voucher));
      api.addSubjectData(this.voucher).then(res => {
        console.log("保存信息结果：", res.body);
        if (res.body.result == 0) {
          this.queryVoucherList()
        } else {
          this.$emit('error', res.body.msg)
        }
      });
    },
    // realUpdate
    realUpdate() {
      this.close();
      this.hideMask();
      let params = this.voucher.voucherEntryList;
      for (let i = params.length - 1; i >= 0; i--) {
        if (
          !params[i].digest &&
          !params[i].course.coding &&
          !params[i].course.courseName &&
          params[i].borrow == 0 &&
          params[i].loan == 0
        ) {
          params.splice(i, 1);
        }
      }
      this.voucher.token = this.token;
      this.voucher.accountSetId = this.accountId;
      console.log("更新信息参数：", JSON.stringify(this.voucher));
      api.updateVoucher(this.voucher).then(res => {
        console.log("更新信息结果：", res.body)
        if (res.body.result == 0) {
          this.queryVoucherList()
        } else {
          this.$emit('error', res.body.msg)
        }
      })
    },
    // 保存并新增
    saveAndCreate() {
      if (this.cacheEntry.status == 'create') {
        console.log("保存并新增");
        this.cacheEntry.saveType = 'saveAndCreate'
        if (this.beforeSave()) {
          console.log("可以保存");
          this.realSave();
          this.createVoucher()
        }
      } else {
        console.log("更新并新增");
        this.cacheEntry.saveType = 'saveAndCreate'
        if (this.beforeSave()) {
          console.log("可以更新");
          this.updateVoucherData();
          this.createVoucher()
        }
      }
      
    },
    // 保存前置
    beforeSave() {
      let flag = true;
      let params = [];
      this.voucher.voucherEntryList.forEach((el, index) => {
        if (el) {
          params.push(el);
        }
      });
      const that = this;
      let length = 0;
      for (let i = params.length - 1; i >= 0; i--) {
        if (
          !params[i].brief &&
          !params[i].subjectId &&
          !params[i].subjectName &&
          params[i].debitCash == 0 &&
          params[i].lenderCash == 0
        ) {
          length += 1;
        }
      }
      console.log("保存前置结果：", params);
      if (length != params.length && params.length > 0) {
        for (let i = 0; i < params.length - 1; i++) {
          if (
            !params[i].course.coding &&
            (params[i].digest || params[i].borrow != 0 || params[i].loan != 0)
          ) {
            flag = false;
            that.waringMsg = "第" + (i + 1) + "行科目为空,是否继续保存?";
            that.waringMsgFlag = true;
            break;
          }
        }
        if (this.voucher.interpolation != 0) {
          flag = false;
          that.waringMsg = "借贷尚未平衡,是否继续保存?";
          that.waringMsgFlag = true;
        }
      } else {
        this.errorMsgFlag = true;
        flag = false;
      }
      return flag;
    },
    // 隐藏蒙层
    hideMask() {
      this.waringMsgFlag = false;
      this.errorMsgFlag = false;
    },
    // 初始化
    entriesConfig() {
      this.voucher = {
        voucherEntryList: [
          {
            digest: "",
            courseId: "",
            course: {
              coding: "",
              courseName: ""
            },
            borrow: 0,
            loan: 0,
            canShowSelectFlag: true,
            balance: 0,
            hasFocus: false
          },
          {
            digest: "",
            courseId: "",
            course: {
              coding: "",
              courseName: ""
            },
            borrow: 0,
            loan: 0,
            canShowSelectFlag: true,
            balance: 0,
            hasFocus: false
          },
          {
            digest: "",
            courseId: "",
            course: {
              coding: "",
              courseName: ""
            },
            borrow: 0,
            loan: 0,
            canShowSelectFlag: true,
            balance: 0,
            hasFocus: false
          },
          {
            digest: "",
            courseId: "",
            course: {
              coding: "",
              courseName: ""
            },
            borrow: 0,
            loan: 0,
            canShowSelectFlag: true,
            balance: 0,
            hasFocus: false
          },
          {
            digest: "",
            courseId: "",
            course: {
              coding: "",
              courseName: ""
            },
            borrow: 0,
            loan: 0,
            canShowSelectFlag: true,
            balance: 0,
            hasFocus: false
          }
        ],
        interpolation: 0,
        totalBorrow: 0,
        totalLoan: 0
      };
    },
    // 刷新列表
    initialize() {
      console.log("刷新列表");
    },
    // 清除搜索关键词
    clearFilter() {
      console.log("清除搜索关键词");
      this.voucherFilter = "";
    },
    // 显示列表 批注
    editVoucherRemark(opt) {
      console.log("显示列表 批注", opt);
      opt.isStartPostil = 1
    },
    // 查询凭证列表
    queryVoucherList() {
      api
        .queryVoucher({
          accountSetId: this.accountId,
          token: this.token
        })
        .then(res => {
          console.log("查询凭证列表结果：", res.body);
          if (res.body.result == 0) {
            let array = res.body.data
            if (array && array.voucherList && array.voucherList.length > 0) {
              array.voucherList.forEach(el => {
                if (el) {
                  el.showDetails = true
                  this.isSelectAll.push(el.id)
                }
              })
            }
            array.allShowDetails = true
            array.unAllShowDetails = false
            this.voucherData = array
            if (this.voucherData.totalCount && this.voucherData.totalCount > 0 && this.voucherData.totalCount == this.voucherData.checkedCount) {
              this.isAllAudited = true
            } else {
              this.isAllAudited = false
            }
            console.log("显示list:", this.voucherData);
          }
        });
    },
    chooseTabType(type) {
      if (type) {
        this.tabType = type;
      } else {
        this.tabType = "list";
      }
    },
    switchFolded(opt) {
      opt.showDetails = !opt.showDetails
      /* if (opt.showDetails) {
        this.isSelectAll.push(opt.id)
        if (this.voucherData.voucherList.length == this.isSelectAll.length) {
          this.voucherData.allShowDetails = true
          this.voucherData.unAllShowDetails = false
        } 
      } else {
        let index = this.voucherData.voucherList.indexOf(opt.id)
        console.log(8888, index)
        if (index >= 0) {
          this.isSelectAll.splice(index, 1)
          if (this.isSelectAll.length == 0) {
            this.voucherData.allShowDetails = false
            this.voucherData.unAllShowDetails = true
          }
        }
      } */
      // console.log(9999, this.isSelectAll)
    },
    switchFoldeds() {
      this.voucherData.allShowDetails = !this.voucherData.allShowDetails
      this.voucherData.unAllShowDetails = !this.voucherData.unAllShowDetails
      if (this.voucherData.allShowDetails) {
        this.isSelectAll = []
        this.voucherData.voucherList.forEach(el => {
          if (el) {
            el.showDetails = true
            this.isSelectAll.push(el.id)
          }
        })
      } else {
        this.voucherData.voucherList.forEach(el => {
          if (el) {
            el.showDetails = false
          }
        })
        this.isSelectAll = []
      }
    },
    // 显示更新凭证弹层
    showVoucherEditor(v) {
      this.voucher = v
      if (this.voucher.voucherEntryList.length < 5) {
        let length = 5 - this.voucher.voucherEntryList.length
        console.log("显示更新凭证弹层", v, length)
        for (let i = 0; i < length; i++) {
          this.createVoucherEntryList()
        }
      }
      if (v.status == 0) {
        this.cacheEntry.status = 'edit'
      } else if (v.status == 1) {
        this.cacheEntry.status = 'show'
      }
      
      this.showVoucherFlag = true
    },
    createVoucherEntryList() {
      this.voucher.voucherEntryList.push({
            digest: "",
            courseId: "",
            course: {
              coding: "",
              courseName: ""
            },
            borrow: 0,
            loan: 0,
            canShowSelectFlag: true,
            balance: 0,
            hasFocus: false
          })
    },
    updateVoucherData(type) {
      console.log("更新111：", type, this.cacheEntry)
      if (type && type == "again") {
        this.realUpdate();
        if (this.cacheEntry.saveType == 'saveAndCreate') {
          this.createVoucher()
        }
      } else {
        console.log("可以更新前缀");
        if (this.beforeSave()) {
          console.log("可以更新");
          this.realUpdate();
        }
      }
    },
    toggleShowDelete(type) {
      if (type && type == 'show') {
        this.canDeleted = true
      } else {
        this.canDeleted = false
      }
    },
    // 删除前置
    preDelete(opt) {
      this.voucher = opt
      this.toggleShowDelete('show')
    },
    deleteVoucher() {
      console.log("删除：")
      let params = {}
      params.id = this.voucher.id
      params.token = this.token
      params.accountSetId = this.accountId
      console.log("删除凭证入参：", JSON.stringify(params))
      this.toggleShowDelete('hide')
      api.deleteVoucher(params).then(res => {
        console.log("删除凭证结果：", res.body)
        if (res.body.result == 0) {
          this.queryVoucherList()
        } else {
          this.$emit("error", res.body.msg)
        }
      })
    },
    insertEntry(index) {
      let array = this.voucher.voucherEntryList
      let defaultOrigin = {
            digest: "",
            courseId: "",
            course: {
              coding: "",
              courseName: ""
            },
            borrow: 0,
            loan: 0,
            canShowSelectFlag: true,
            balance: 0,
            hasFocus: false
          }
      array.splice(index + 1, 0, defaultOrigin)
      console.log(88888888, index, array.length)
    },
    deleteEntry(index) {
      if (this.voucher.voucherEntryList.length > 5) {
        this.voucher.voucherEntryList.splice(index, 1)
      }
    },
    //
    switchVouchersState() {
      let params = {
        token: this.token
      }
      let arr = []
      console.log(2008, this.isAllAudited)
      if (this.isAllAudited) {
        this.voucherData.voucherList.forEach(el => {
          if (el) {
            arr.push({
              id: el.id,
              status: 0
            })
          }
        })
      } else {
        this.voucherData.voucherList.forEach(el => {
          if (el) {
            arr.push({
              id: el.id,
              status: 1
            })
          }
        })
      }
      params.voucherStatusList = arr
      api.batchVoucherStatus(params).then(res => {
        console.log("批量更新审批状态结果：", res.body)
        if (res.body.result == 0) {
          this.queryVoucherList()
        } else {
          this.queryVoucherList()
          this.$emit("error", res.body.msg)
        }
      })
    },
    updateVoucherDataByStatusAndRemark(opt, type){
      if (type == 'remark') {
      } else if (type == 'examine') {
        if (opt.status == 0) {
          opt.status = 1
        } else if (opt.status == 1) {
          opt.status = 0
        }
      }
      console.log("更新状态和批注：", opt)
      opt.token = this.token
      api.updateVoucher(opt).then(res => {
        console.log("更新信息结果：", res.body)
        if (res.body.result == 0) {
          this.queryVoucherList()
        } else {
          this.$emit('error', res.body.msg)
        }
      })
    },
  },
  //生命周期钩子：组件实例渲染完成时调用
  mounted() {},
  created() {
    this.accountId = utils.dbGet("account").id;
    console.log("创建组建开始", this.accountId);
    if (utils.isExist(this.accountId)) {
      this.$emit("sel", { index: 2, type: "accounts" });
    } else {
      // this.$router.push({path: '/login'})
    }
    // 查询列表数据
    this.queryVoucherList();
    // 查询科目列表
    this.querySubject();
  },
  //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
  components: {},
  filters: {
    moneyFilter(value) {
      if (utils.isExist(value)) {
        let hasPoint = value.toString().split(".");
        if (hasPoint.length == 1) {
          return value + ".00";
        } else if (hasPoint.length > 1) {
          if (hasPoint[1].length < 2) {
            return value + "0";
          } else {
            return value;
          }
        }
      }
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el, e) {
        console.log("指令的定义", e);
        if (e.value) {
          el.focus();
        }
      }
    }
  }
};
</script>

<style scoped>
[ng\:cloak],
[ng-cloak],
[data-ng-cloak],
[x-ng-cloak],
.ng-cloak,
.x-ng-cloak,
.ng-hide:not(.ng-hide-animate) {
  display: none !important;
}

/**凭证列表*/
.page-vouchers .page-title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 0 10px;
}

.page-vouchers .page-title .title {
  margin-right: 20px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  cursor: pointer;
}

.page-vouchers .page-title .title--on,
.page-vouchers .page-title .title--on:hover {
  border-bottom: 5px solid #5fbbfc;
}

.page-vouchers .title-gap {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.page-vouchers .page-tools {
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  width: 70%;
  z-index: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 0 10px;
}

.page-vouchers .page-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

/**搜索*/
.page-vouchers .searchInput {
  position: relative;
}

.page-vouchers .searchInput .search {
  height: 30px;
}

.icon-search {
  background-image: url(./i/search.png);
}

.page-vouchers .searchInput .search-icon {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}

.page-vouchers .funcBtn30 {
  position: relative;
  margin-left: 10px;
}

/**搜索按钮间距*/
.page-vouchers .funcBtn {
  margin-left: 10px;
  width: 100px;
}

/**查看交接文件*/
.icon-archive {
  background-image: url(./i/archive.png);
}

/**查看辅助文件*/
.icon-attach {
  background-image: url(./i/attach.png);
}

/**查看回收票据*/
.icon-bin {
  background-image: url(./i/bin.png);
}

/**数据表格主体*/
.page-vouchers .page-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

/**contentTitle*/
.page-vouchers .contentTitle {
  padding-left: 10px;
  padding-right: 10px;
  min-height: 40px;
}

.page-vouchers .page-content .titleBar {
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 2px;
  background-color: #5fbbfc;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.page-vouchers .v-col-type {
  min-width: 30px;
  max-width: 30px;
  border-right: 1px solid #dadfe8;
}

.page-vouchers .page-content .titleBar .v-col-type {
  border: none;
}

/**page-vouchers v-col-content*/
.page-vouchers .v-col-content {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.page-vouchers [class|="col"],
.page-vouchers [class|="h"] {
  box-sizing: border-box;
  position: relative;
  float: left;
  height: 40px;
  line-height: 40px;
  padding: 0 8px;
  border-right: 1px solid #dadfe8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.page-vouchers .page-content [class|="h"] {
  text-align: center;
  color: #fff;
}

.page-vouchers .page-content .col-name,
.page-vouchers .page-content .h-name {
  width: 25%;
}

.page-vouchers .page-content .col-subject,
.page-vouchers .page-content .h-subject {
  width: 45%;
}

.page-vouchers .page-content .col-credit,
.page-vouchers .page-content .col-debit,
.page-vouchers .page-content .h-credit,
.page-vouchers .page-content .h-debit {
  width: 15%;
}

.page-vouchers .page-content .col-credit,
.page-vouchers .page-content .col-debit {
  text-align: right;
}

.page-vouchers .page-content .sumBar .col-credit,
.page-vouchers .page-content .sumBar .col-debit {
  color: #66b2ff;
}

.page-vouchers .page-content .col-subNum {
  width: 10%;
}

.page-vouchers .page-content .col-subName {
  width: 35%;
}

/**v-col-audit*/
.page-vouchers .v-col-audit {
  position: relative;
  min-width: 50px;
  max-width: 50px;
}

.page-vouchers .page-content .auditIndicator {
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  margin: auto;
}

.page-vouchers .page-content .fullAuditIndicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.icon-unaudited {
  background-image: url(./i/unaudited.png);
}

/**.page-vouchers .toolTitle*/
.page-vouchers .toolTitle {
  min-height: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0 10px;
  margin-top: 8px;
}

.page-vouchers .toolTitle .voucherTypes {
  width: 120px;
}

.page-vouchers .toolTitle .voucherTypes li {
  float: left;
  width: 40px;
  line-height: 20px;
  text-indent: 15px;
  position: relative;
  font-size: 12px;
}

.page-vouchers .page-content .circle {
  position: absolute;
  z-index: 1;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  display: inline-block;
}

.page-vouchers .voucherTypes .cir-types {
  top: 5px;
  left: 0;
}

.page-vouchers .page-content .vou-gather {
  background-color: #ff8c8c;
}

.page-vouchers .page-content .vou-payment {
  background-color: #ffcb6a;
}

.page-vouchers .page-content .vou-transfer {
  background-color: #99aeff;
}

.page-vouchers .toolTitle .sortSwitcher {
  position: relative;
  height: 20px;
  margin-right: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
}

.page-vouchers .toolTitle .sortSwitcher p {
  line-height: 20px;
  font-size: 12px;
}

.page-vouchers .toolTitle .sortSwitcher .sort {
  width: 18px;
  height: 18px;
}

.icon-sort {
  background-image: url(./i/sort.png);
}

.page-vouchers .toolTitle .vouOprSwitcher {
  position: relative;
  height: 20px;
  margin-right: 10px;
}

.page-vouchers .toolTitle .vouOprSwitcher p {
  line-height: 20px;
  font-size: 12px;
}

.page-vouchers .toolTitle .gap {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.page-vouchers .toolTitle .subTitle {
  line-height: 20px;
  font-size: 12px;
}

.page-vouchers .toolTitle .vouSwitcher {
  position: relative;
  width: 10px;
  height: 20px;
}

.page-vouchers .toolTitle .expand {
  position: absolute;
  top: 7px;
  right: 0;
  width: 7px;
  height: 9px;
}

.icon-expand {
  background-image: url(./i/expand.png);
}

.page-vouchers .toolTitle .expand-s {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}

/**数据内容*/
.page-vouchers .page-content .contentPage {
  position: relative;
  height: 100%;
}

.page-vouchers .page-content .pageWrapper {
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
}

.page-vouchers .entryContainer {
  position: relative;
  width: 100%;
  margin-top: 3px;
  margin-bottom: 7px;
  background-color: #fff;
  box-shadow: 0 0 2px 0 #5fbbfc;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.page-vouchers .page-content .containerBorder {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.page-vouchers .v-col-type {
  min-width: 30px;
  max-width: 30px;
  border-right: 1px solid #dadfe8;
}

.page-vouchers .page-content .entryTitlebar,
.page-vouchers .page-content .sumBar {
  position: relative;
  width: 100%;
  display: table;
}

.page-vouchers .page-content .entryTitlebar {
  border-bottom: 1px solid #dadfe8;
}

.page-vouchers .page-content .col-index {
  width: 10%;
}

.page-vouchers .page-content .col-index > input {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  line-height: 40px;
  opacity: 0;
  border: none;
  outline: none;
  padding: 0 8px;
}

.page-vouchers .page-content .col-summary {
  width: 15%;
}

.page-vouchers .page-content .col-source {
  width: 75%;
  color: #b6c0d3;
}

.page-vouchers .page-content .entryContainer:hover .span-source,
.page-vouchers .page-content .span-source-on {
  color: #ffa448;
}

/**标签*/
.page-vouchers .page-content .entryOptsBox {
  position: absolute;
  right: 0;
  display: none;
}

.page-vouchers .entryContainer:hover .entryOptsBox {
  display: block;
}

.page-vouchers .page-content .entryOpt {
  position: relative;
  float: right;
  width: 65px;
  height: 40px;
}

.page-vouchers .page-content .entryOpt .optIcon {
  position: absolute;
  left: 0;
  top: 0;
}

.page-vouchers .page-content .entryOpt .optTag {
  position: absolute;
  right: 8px;
  font-size: 12px;
  line-height: 40px;
}

.page-vouchers .page-content .entryOpt .optTag--orange {
  color: #ff8a52;
}

.page-vouchers .page-content .entryOpt .optTag--blue {
  color: #5fbbfc;
}

.icon-voucher-edit {
  background-image: url(./i/edit.png);
}

.icon-voucher-delete {
  background-image: url(./i/delete.png);
}

.icon-voucher-remark {
  background-image: url(./i/remark.png);
}

.icon-voucher-view {
  background-image: url(./i/view.png);
}

.page-vouchers .page-content .entryContainer .entryBar {
  height: 40px;
  border-bottom: 1px solid #dadfe8;
}

.page-vouchers .entryContainer:hover .entryBar:nth-child(2n) {
  background-color: #ebf4ff;
}

.page-vouchers .page-content .col-cur {
  width: 12%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}

.page-vouchers .page-content .col-cur > p {
  font-size: 12px;
  line-height: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.page-vouchers .page-content .sumIcon {
  position: absolute;
  top: 14px;
  left: 8px;
  width: 13px;
  height: 13px;
}

.icon-sum {
  background-image: url(./i/sum.png);
}

.page-vouchers .page-content .sumBar .col-name {
  padding-left: 30px;
}

.page-vouchers .remarkBar {
  position: relative;
  line-height: 40px;
  padding: 0 8px;
  border-top: 1px solid #dadfe8;
  border-right: 1px solid #dadfe8;
  color: #ff8a52;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.page-vouchers .remarkBar .remark-content {
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 880px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.page-vouchers .entryContainer--unremarked:hover {
  box-shadow: 0 0 3px #5fbbfc;
}

.page-vouchers .entryContainer--unremarked:hover .containerBorder {
  box-shadow: inset 0 0 0 2px #5fbbfc;
}

.page-vouchers .page-content .cir-vouList {
  left: 10px;
  top: 14px;
}

.icon-audited {
  background-image: url(./i/audited.png);
}

.icon-unaudited {
  background-image: url(./i/unaudited.png);
}

#ui-ss-container {
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
  min-height: 150px;
  background-color: #fff;
}
#ui-ss-container ul {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  font-weight: 100;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 5px 5px 20px #adadad;
}
#ui-ss-container li {
  padding: 0 0 0 10px;
  width: 100%;
  line-height: 30px;
  list-style: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #2da8ff;
  cursor: pointer;
}
#ui-ss-container li:hover {
  background-color: #f5f5f5;
  color: #2da8ff;
}
#ui-ss-container .nonLeaf {
  color: #d3d3d3;
  cursor: not-allowed;
}
#ui-ss-container .highlighted {
  color: #fff;
  background-color: #2da8ff;
}
#ui-ss-container .forbidden {
  cursor: not-allowed;
}
#ui-ss-container .hide {
  display: none;
}
/**隐藏滚动条*/
#voucherListComponent::-webkit-scrollbar, #ui-et-807744::-webkit-scrollbar {
  width: 0 !important;
}
#voucherListComponent, #ui-et-807744 {
  -ms-overflow-style: none !important;
}
#voucherListComponent, #ui-et-807744 {
  overflow: -moz-scrollbars-none !important;
}

.page-vouchers .remarkBar input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 14px;
  padding: 0;
  border: none;
  background-color: #fff;
}

.page-vouchers .entryContainer--remarked {
  box-shadow: 0 0 3px #ff8a52;
}
</style>
