<template>
  <div>
    <!-- 凭证主体 -->
    <div class="module-content ng-scope">
      <div class="module-content_wrapper">
        <div class="module-content_page page-vouchers">
          <div class="page-title"><p class="title title--on" ng-class="{'title--on': tab === 'list'}"
                                     ng-click="selectTab('list')">凭证列表</p>
            <p class="title ng-hide" ng-class="{'title--on': tab === 'report'}" ng-click="selectTab('report')"
               ng-show="!isCurrentIssue">结账报告</p>
            <p class="title" ng-class="{'title--on': tab === 'accrue'}" ng-click="selectTab('accrue')">计提配置</p>
            <p class="title" ng-class="{'title--on': tab === 'adjust'}" ng-click="selectTab('adjust')">往来调账</p>
            <div class="title-gap"></div>
          </div>
          <div class="page-tab ng-isolate-scope" ng-show="on" ui-vouchers-list="" by="tab">
            <div class="page-tools">
              <div class="title-gap"></div>
              <div class="searchInput"><input class="search ng-pristine ng-untouched ng-valid ng-empty" type="text"
                                              placeholder="搜索凭证..." ng-model="voucherFilter"> <i
                class="search-icon icon-search icon-30" ng-show="voucherFilter === ''"></i> <i
                class="search-icon g-icon-close icon-30 ng-hide" ng-hide="voucherFilter === ''"
                ng-click="clearFilter()"></i></div>
              <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                   ng-click=";click();" ui-button="" btn-type="hollow" btn-click="initialize()">
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
            <div class="page-content">
              <div class="contentTitle">
                <div class="titleBar">
                  <div class="v-col-type"></div>
                  <div class="v-col-content"><p class="h-name">摘要</p>
                    <p class="h-subject">科目</p>
                    <p class="h-debit">借方金额</p>
                    <p class="h-credit">贷方金额</p></div>
                  <div class="v-col-audit">
                    <div class="button icon-25 fullAuditIndicator icon-unaudited" title="全部审核" ng-class="{true: 'icon-audited', false:'icon-unaudited'}
                          [isAllAudited]" ng-click="switchVouchersState()"></div>
                  </div>
                </div>
              </div>
              <div class="toolTitle" ng-show="vouchers.length !== 0">
                <ul class="voucherTypes">
                  <li><span class="circle cir-types vou-gather"></span>收</li>
                  <li><span class="circle cir-types vou-payment"></span>付</li>
                  <li><span class="circle cir-types vou-transfer"></span>转</li>
                </ul>
                <div class="button sortSwitcher" ng-click="switchListOrder()"><p class="ng-binding">降序排列</p>
                  <div class="icon-sort icon-20 sort"></div>
                </div>
                <div class="button sortSwitcher" ng-click="sortByTransaction()" ng-show="isCurrentIssue"><p>按收付转排序</p>
                  <div class="icon-sort icon-20 sort"></div>
                </div>
                <div class="button sortSwitcher" ng-click="sortByCatagory()" ng-show="isCurrentIssue"><p>按业务类型排序</p>
                  <div class="icon-sort icon-20 sort"></div>
                </div>
                <div class="button vouOprSwitcher" ng-click="splitVouchers()" ng-show="isCurrentIssue"><p>拆分凭证</p>
                </div>
                <div class="button vouOprSwitcher" ng-click="integrationVouchers()" ng-show="isCurrentIssue"><p>
                  汇总凭证</p></div>
                <div class="gap"></div>
                <p class="button subTitle ng-binding" title="全部收缩" ng-click="switchFoldeds()"> 共有3张凭证，已审核2张 </p>
                <div class="vouSwitcher">
                  <div class="anime icon-expand expand" ng-class="{'expand-s' : isAllFolded}"></div>
                </div>
              </div>
              <div class="contentPage ps-container ps-theme-default ps-active-y" style="overflow-y: auto!important">
                <div class="pageWrapper">
                  <!-- ngRepeat: v in vouchers | filter: voucherFilter | orderBy: voucherListOrder -->
                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-payment" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="付款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl0" class="ng-binding">记-001</label>
                          <!-- ngIf: !v.vAudited --><input id="vl0" type="text" ng-model="v.vSeq" ng-if="!v.vAudited"
                                                           ng-focus="seqInputOnfocus($event)"
                                                           ng-blur="changeVoucherSeq(v)"
                                                           ng-click="$event.stopPropagation();"
                                                           ng-keydown="seqInputKeydown($event)"
                                                           class="ng-pristine ng-untouched ng-valid ng-scope">
                          <!-- end ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">缴税</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                               ng-click="deleteVoucher(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-delete"></div>
                            <p class="optTag optTag--orange">删除</p></div>
                          <!-- end ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-edit"></div>
                            <p class="optTag optTag--blue">编辑</p></div>
                          <!-- end ngIf: !v.vAudited && canEditVoucher(v) -->
                          <!-- ngIf: v.vAudited || !isMyAccount --> <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">1111</p>
                        <p class="col-subNum ng-binding">1001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">库存现金</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">100.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">0.00</p>
                        <p class="col-credit ng-binding">100.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator icon-unaudited" data-toggle="tooltip"
                           title="确认审核" ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div><!-- end ngRepeat: v in vouchers | filter: voucherFilter | orderBy: voucherListOrder -->
                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-payment" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="付款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl1" class="ng-binding">记-002</label>
                          <!-- ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">付款</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) --> <!-- ngIf: v.vAudited || !isMyAccount -->
                          <div class="button entryOpt ng-scope" ng-if="v.vAudited || !isMyAccount"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-view"></div>
                            <p class="optTag optTag--blue">查看</p></div><!-- end ngIf: v.vAudited || !isMyAccount -->
                          <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">提现</p>
                        <p class="col-subNum ng-binding">1001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">库存现金</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">100.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">提现</p>
                        <p class="col-subNum ng-binding">1002</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">银行存款</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding">100.00</p>
                        <p class="col-credit ng-binding"></p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">100.00</p>
                        <p class="col-credit ng-binding">100.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator" data-toggle="tooltip" title="取消审核"
                           ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div><!-- end ngRepeat: v in vouchers | filter: voucherFilter | orderBy: voucherListOrder -->
                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-gather" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="收款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl2" class="ng-binding">记-003</label>
                          <!-- ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">其他</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) --> <!-- ngIf: v.vAudited || !isMyAccount -->
                          <div class="button entryOpt ng-scope" ng-if="v.vAudited || !isMyAccount"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-view"></div>
                            <p class="optTag optTag--blue">查看</p></div><!-- end ngIf: v.vAudited || !isMyAccount -->
                          <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">aa</p>
                        <p class="col-subNum ng-binding">1002</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">银行存款</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding">111.00</p>
                        <p class="col-credit ng-binding"></p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">bb</p>
                        <p class="col-subNum ng-binding">1012001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">其他货币资金 - 银行汇票</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">111.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">111.00</p>
                        <p class="col-credit ng-binding">111.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator" data-toggle="tooltip" title="取消审核"
                           ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div><!-- end ngRepeat: v in vouchers | filter: voucherFilter | orderBy: voucherListOrder -->


                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-payment" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="付款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl0" class="ng-binding">记-001</label>
                          <!-- ngIf: !v.vAudited --><input id="vl0" type="text" ng-model="v.vSeq" ng-if="!v.vAudited"
                                                           ng-focus="seqInputOnfocus($event)"
                                                           ng-blur="changeVoucherSeq(v)"
                                                           ng-click="$event.stopPropagation();"
                                                           ng-keydown="seqInputKeydown($event)"
                                                           class="ng-pristine ng-untouched ng-valid ng-scope">
                          <!-- end ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">缴税</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                               ng-click="deleteVoucher(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-delete"></div>
                            <p class="optTag optTag--orange">删除</p></div>
                          <!-- end ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-edit"></div>
                            <p class="optTag optTag--blue">编辑</p></div>
                          <!-- end ngIf: !v.vAudited && canEditVoucher(v) -->
                          <!-- ngIf: v.vAudited || !isMyAccount --> <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">1111</p>
                        <p class="col-subNum ng-binding">1001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">库存现金</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">100.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">0.00</p>
                        <p class="col-credit ng-binding">100.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator icon-unaudited" data-toggle="tooltip"
                           title="确认审核" ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div>
                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-payment" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="付款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl0" class="ng-binding">记-001</label>
                          <!-- ngIf: !v.vAudited --><input id="vl0" type="text" ng-model="v.vSeq" ng-if="!v.vAudited"
                                                           ng-focus="seqInputOnfocus($event)"
                                                           ng-blur="changeVoucherSeq(v)"
                                                           ng-click="$event.stopPropagation();"
                                                           ng-keydown="seqInputKeydown($event)"
                                                           class="ng-pristine ng-untouched ng-valid ng-scope">
                          <!-- end ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">缴税</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                               ng-click="deleteVoucher(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-delete"></div>
                            <p class="optTag optTag--orange">删除</p></div>
                          <!-- end ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-edit"></div>
                            <p class="optTag optTag--blue">编辑</p></div>
                          <!-- end ngIf: !v.vAudited && canEditVoucher(v) -->
                          <!-- ngIf: v.vAudited || !isMyAccount --> <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">1111</p>
                        <p class="col-subNum ng-binding">1001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">库存现金</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">100.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">0.00</p>
                        <p class="col-credit ng-binding">100.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator icon-unaudited" data-toggle="tooltip"
                           title="确认审核" ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div>
                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-payment" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="付款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl0" class="ng-binding">记-001</label>
                          <!-- ngIf: !v.vAudited --><input id="vl0" type="text" ng-model="v.vSeq" ng-if="!v.vAudited"
                                                           ng-focus="seqInputOnfocus($event)"
                                                           ng-blur="changeVoucherSeq(v)"
                                                           ng-click="$event.stopPropagation();"
                                                           ng-keydown="seqInputKeydown($event)"
                                                           class="ng-pristine ng-untouched ng-valid ng-scope">
                          <!-- end ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">缴税</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                               ng-click="deleteVoucher(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-delete"></div>
                            <p class="optTag optTag--orange">删除</p></div>
                          <!-- end ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-edit"></div>
                            <p class="optTag optTag--blue">编辑</p></div>
                          <!-- end ngIf: !v.vAudited && canEditVoucher(v) -->
                          <!-- ngIf: v.vAudited || !isMyAccount --> <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">1111</p>
                        <p class="col-subNum ng-binding">1001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">库存现金</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">100.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">0.00</p>
                        <p class="col-credit ng-binding">100.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator icon-unaudited" data-toggle="tooltip"
                           title="确认审核" ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div>
                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-payment" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="付款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl0" class="ng-binding">记-001</label>
                          <!-- ngIf: !v.vAudited --><input id="vl0" type="text" ng-model="v.vSeq" ng-if="!v.vAudited"
                                                           ng-focus="seqInputOnfocus($event)"
                                                           ng-blur="changeVoucherSeq(v)"
                                                           ng-click="$event.stopPropagation();"
                                                           ng-keydown="seqInputKeydown($event)"
                                                           class="ng-pristine ng-untouched ng-valid ng-scope">
                          <!-- end ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">缴税</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                               ng-click="deleteVoucher(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-delete"></div>
                            <p class="optTag optTag--orange">删除</p></div>
                          <!-- end ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-edit"></div>
                            <p class="optTag optTag--blue">编辑</p></div>
                          <!-- end ngIf: !v.vAudited && canEditVoucher(v) -->
                          <!-- ngIf: v.vAudited || !isMyAccount --> <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">1111</p>
                        <p class="col-subNum ng-binding">1001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">库存现金</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">100.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">0.00</p>
                        <p class="col-credit ng-binding">100.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator icon-unaudited" data-toggle="tooltip"
                           title="确认审核" ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div>
                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-payment" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="付款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl0" class="ng-binding">记-001</label>
                          <!-- ngIf: !v.vAudited --><input id="vl0" type="text" ng-model="v.vSeq" ng-if="!v.vAudited"
                                                           ng-focus="seqInputOnfocus($event)"
                                                           ng-blur="changeVoucherSeq(v)"
                                                           ng-click="$event.stopPropagation();"
                                                           ng-keydown="seqInputKeydown($event)"
                                                           class="ng-pristine ng-untouched ng-valid ng-scope">
                          <!-- end ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">缴税</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                               ng-click="deleteVoucher(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-delete"></div>
                            <p class="optTag optTag--orange">删除</p></div>
                          <!-- end ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-edit"></div>
                            <p class="optTag optTag--blue">编辑</p></div>
                          <!-- end ngIf: !v.vAudited && canEditVoucher(v) -->
                          <!-- ngIf: v.vAudited || !isMyAccount --> <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">1111</p>
                        <p class="col-subNum ng-binding">1001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">库存现金</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">100.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">0.00</p>
                        <p class="col-credit ng-binding">100.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator icon-unaudited" data-toggle="tooltip"
                           title="确认审核" ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div>
                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-payment" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="付款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl0" class="ng-binding">记-001</label>
                          <!-- ngIf: !v.vAudited --><input id="vl0" type="text" ng-model="v.vSeq" ng-if="!v.vAudited"
                                                           ng-focus="seqInputOnfocus($event)"
                                                           ng-blur="changeVoucherSeq(v)"
                                                           ng-click="$event.stopPropagation();"
                                                           ng-keydown="seqInputKeydown($event)"
                                                           class="ng-pristine ng-untouched ng-valid ng-scope">
                          <!-- end ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">缴税</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                               ng-click="deleteVoucher(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-delete"></div>
                            <p class="optTag optTag--orange">删除</p></div>
                          <!-- end ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-edit"></div>
                            <p class="optTag optTag--blue">编辑</p></div>
                          <!-- end ngIf: !v.vAudited && canEditVoucher(v) -->
                          <!-- ngIf: v.vAudited || !isMyAccount --> <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">1111</p>
                        <p class="col-subNum ng-binding">1001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">库存现金</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">100.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">0.00</p>
                        <p class="col-credit ng-binding">100.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator icon-unaudited" data-toggle="tooltip"
                           title="确认审核" ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div>
                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-payment" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="付款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl0" class="ng-binding">记-001</label>
                          <!-- ngIf: !v.vAudited --><input id="vl0" type="text" ng-model="v.vSeq" ng-if="!v.vAudited"
                                                           ng-focus="seqInputOnfocus($event)"
                                                           ng-blur="changeVoucherSeq(v)"
                                                           ng-click="$event.stopPropagation();"
                                                           ng-keydown="seqInputKeydown($event)"
                                                           class="ng-pristine ng-untouched ng-valid ng-scope">
                          <!-- end ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">缴税</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                               ng-click="deleteVoucher(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-delete"></div>
                            <p class="optTag optTag--orange">删除</p></div>
                          <!-- end ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-edit"></div>
                            <p class="optTag optTag--blue">编辑</p></div>
                          <!-- end ngIf: !v.vAudited && canEditVoucher(v) -->
                          <!-- ngIf: v.vAudited || !isMyAccount --> <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">1111</p>
                        <p class="col-subNum ng-binding">1001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">库存现金</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">100.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">0.00</p>
                        <p class="col-credit ng-binding">100.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator icon-unaudited" data-toggle="tooltip"
                           title="确认审核" ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div>
                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-payment" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="付款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl0" class="ng-binding">记-001</label>
                          <!-- ngIf: !v.vAudited --><input id="vl0" type="text" ng-model="v.vSeq" ng-if="!v.vAudited"
                                                           ng-focus="seqInputOnfocus($event)"
                                                           ng-blur="changeVoucherSeq(v)"
                                                           ng-click="$event.stopPropagation();"
                                                           ng-keydown="seqInputKeydown($event)"
                                                           class="ng-pristine ng-untouched ng-valid ng-scope">
                          <!-- end ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">缴税</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                               ng-click="deleteVoucher(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-delete"></div>
                            <p class="optTag optTag--orange">删除</p></div>
                          <!-- end ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-edit"></div>
                            <p class="optTag optTag--blue">编辑</p></div>
                          <!-- end ngIf: !v.vAudited && canEditVoucher(v) -->
                          <!-- ngIf: v.vAudited || !isMyAccount --> <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">1111</p>
                        <p class="col-subNum ng-binding">1001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">库存现金</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">100.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">0.00</p>
                        <p class="col-credit ng-binding">100.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator icon-unaudited" data-toggle="tooltip"
                           title="确认审核" ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div>
                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-payment" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="付款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl0" class="ng-binding">记-001</label>
                          <!-- ngIf: !v.vAudited --><input id="vl0" type="text" ng-model="v.vSeq" ng-if="!v.vAudited"
                                                           ng-focus="seqInputOnfocus($event)"
                                                           ng-blur="changeVoucherSeq(v)"
                                                           ng-click="$event.stopPropagation();"
                                                           ng-keydown="seqInputKeydown($event)"
                                                           class="ng-pristine ng-untouched ng-valid ng-scope">
                          <!-- end ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">缴税</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                               ng-click="deleteVoucher(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-delete"></div>
                            <p class="optTag optTag--orange">删除</p></div>
                          <!-- end ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-edit"></div>
                            <p class="optTag optTag--blue">编辑</p></div>
                          <!-- end ngIf: !v.vAudited && canEditVoucher(v) -->
                          <!-- ngIf: v.vAudited || !isMyAccount --> <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">1111</p>
                        <p class="col-subNum ng-binding">1001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">库存现金</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">100.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">0.00</p>
                        <p class="col-credit ng-binding">100.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator icon-unaudited" data-toggle="tooltip"
                           title="确认审核" ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div>
                  <div class="anime entryContainer ng-scope entryContainer--unremarked" on-repeat-finished=""
                       ng-show="showVoucherList"
                       ng-repeat="v in vouchers | filter: voucherFilter | orderBy: voucherListOrder"
                       ng-class="v.hasRemark ? 'entryContainer--remarked' : 'entryContainer--unremarked'">
                    <div class="anime containerBorder"></div>
                    <div class="v-col-type">
                      <div class="circle cir-vouList vou-payment" ng-class="{'vou-gather':v.transaction == '1',
              'vou-payment':v.transaction == '2','vou-transfer':v.transaction == '3'}" title="付款凭证"></div>
                    </div>
                    <div class="v-col-content">
                      <div class="entryTitlebar" ng-click="switchFolded(v)">
                        <div class="col-index"><label for="vl0" class="ng-binding">记-001</label>
                          <!-- ngIf: !v.vAudited --><input id="vl0" type="text" ng-model="v.vSeq" ng-if="!v.vAudited"
                                                           ng-focus="seqInputOnfocus($event)"
                                                           ng-blur="changeVoucherSeq(v)"
                                                           ng-click="$event.stopPropagation();"
                                                           ng-keydown="seqInputKeydown($event)"
                                                           class="ng-pristine ng-untouched ng-valid ng-scope">
                          <!-- end ngIf: !v.vAudited --> </div>
                        <p class="col-summary ng-binding">缴税</p>
                        <p class="col-source ng-binding"> 数据来源： <span class="span-source ng-binding"
                                                                      ng-class="{'span-source-on' : v.vSource == '系统生成'}">手动新建</span>
                        </p>
                        <div class="entryOptsBox"> <!-- ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                               ng-click="deleteVoucher(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-delete"></div>
                            <p class="optTag optTag--orange">删除</p></div>
                          <!-- end ngIf: !v.vAudited && canDeleteVoucher(v) -->
                          <!-- ngIf: !v.vAudited && canEditVoucher(v) -->
                          <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                               ng-click="showVoucherEditor(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-edit"></div>
                            <p class="optTag optTag--blue">编辑</p></div>
                          <!-- end ngIf: !v.vAudited && canEditVoucher(v) -->
                          <!-- ngIf: v.vAudited || !isMyAccount --> <!-- ngIf: canEditRemark -->
                          <div class="button entryOpt ng-scope" ng-if="canEditRemark"
                               ng-click="editVoucherRemark(v, $event)">
                            <div class="optIcon icon-40 icon-voucher-remark"></div>
                            <p class="optTag optTag--blue">批注 </p></div><!-- end ngIf: canEditRemark --> </div>
                      </div> <!-- ngRepeat: e in v.entries -->
                      <div class="entryBar ng-scope" ng-repeat="e in v.entries" ng-show="!v.vFold"
                           ng-click="showVoucherEditor(v, $event)"><p class="col-name ng-binding">1111</p>
                        <p class="col-subNum ng-binding">1001</p>
                        <p class="col- ng-binding col-subName"
                           ng-class="(e.isForeign || e.isAmount) ? 'col-subName-f' : 'col-subName'">库存现金</p>
                        <div class="col-cur ng-hide" ng-show="e.isForeign || e.isAmount"><p ng-show="e.isAmount"
                                                                                            class="ng-binding ng-hide">
                          数量: 1.00 </p>
                          <p ng-show="e.isAmount" class="ng-binding ng-hide"> 单价: 0.00CNY </p>
                          <p ng-show="e.isForeign && !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
                          <p ng-show="e.isForeign" class="ng-binding ng-hide"> 汇率: 0.0000 </p></div>
                        <p class="col-debit ng-binding"></p>
                        <p class="col-credit ng-binding">100.00</p></div><!-- end ngRepeat: e in v.entries -->
                      <div class="sumBar">
                        <div class="sumIcon icon-sum"></div>
                        <p class="col-name">总借贷</p>
                        <p class="col-subject"></p>
                        <p class="col-debit ng-binding">0.00</p>
                        <p class="col-credit ng-binding">100.00</p></div>
                      <div class="remarkBar ng-hide" ng-show="v.hasRemark || v.vRemarkOnEdit"
                           ng-click="editVoucherRemark(v, $event)"><p class="remark-label">批注：</p>
                        <div class="remark-content ng-binding" title="">  <!-- ngIf: v.vRemarkOnEdit --> </div>
                      </div>
                    </div>
                    <div class="v-col-audit">
                      <div class="button icon-25 icon-audited auditIndicator icon-unaudited" data-toggle="tooltip"
                           title="确认审核" ng-class="{true: 'icon-audited', false:'icon-unaudited'}[v.vAudited]"
                           ng-click="switchVoucherState(v, $event)"></div>
                    </div>
                  </div>
                </div>
                <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                  <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                </div>
                <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                  <div class="ps-scrollbar-y" tabindex="0" style="top: 0px;"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="page-tab ng-isolate-scope ng-hide" ng-show="on" ui-vouchers-config="" by="tab">
            <div class="page-tools">
              <div class="title-gap"></div>
              <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow ng-hide" ng-class="class"
                   ng-click=";click();" ng-show="hasChange" btn-click="cancel()" ui-button="" btn-type="hollow">
                <div><span class="ng-scope">取消</span></div>
              </div>
              <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow ng-hide" ng-class="class"
                   ng-click=";click();" ng-show="hasChange" btn-click="save()" ui-button="" btn-type="hollow">
                <div><span class="ng-scope">保存</span></div>
              </div>
            </div>
            <div class="page-content">
              <div class="contentPage ps-container ps-theme-default" scroll="" scroll-behavior="top"
                   data-ps-id="53852e84-2079-40e0-14bd-c1dde3f13c87">
                <div class="pageWrapper vouchersConfig">
                  <div class="ui-accrue ng-isolate-scope" type="page"> <!-- ngIf: theme === 'page' -->
                    <!-- ngIf: theme === 'pop' --> </div>
                </div>
                <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                  <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                </div>
                <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                  <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="page-tab ng-isolate-scope ng-hide" ng-show="on" ui-vouchers-report="" by="tab">
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
                    <!-- ngRepeat: report in reports -->
                    <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                      <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                    </div>
                    <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                      <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                    </div>
                  </div>
                  <div class="noData" ng-show="reports.length === 0">
                    <div class="icon-noData"></div>
                    <p>本期无结账数据</p></div>
                </div>
              </div>
            </div>
          </div>
          <div class="page-tab ng-isolate-scope ng-hide" ng-show="on" ui-vouchers-adjust="" by="tab">
            <div class="page-tools" style="margin-right:30px">
              <div class="title-gap"></div>
              <div class="searchInput"><input class="search ng-pristine ng-untouched ng-valid ng-empty" type="text"
                                              placeholder="搜索科目..." ng-model="subFilter"> <i
                class="search-icon icon-search icon-30" ng-show="subFilter === ''"></i> <i
                class="search-icon g-icon-close icon-30 ng-hide" ng-hide="subFilter === ''"
                ng-click="clearFilter()"></i></div>
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
                  <div class="page-sidebar page-sidebar--right"> <!-- ngRepeat: n in navSidebars -->
                    <div class="page-sidebar_item ng-binding ng-scope"
                         ng-class="{'page-sidebar_item--on': n.type === nav.type}" ng-repeat="n in navSidebars"
                         ng-click="switchAdjustType(n)">现金收款付款
                    </div><!-- end ngRepeat: n in navSidebars -->
                    <div class="page-sidebar_item ng-binding ng-scope"
                         ng-class="{'page-sidebar_item--on': n.type === nav.type}" ng-repeat="n in navSidebars"
                         ng-click="switchAdjustType(n)">预收预付调整
                    </div><!-- end ngRepeat: n in navSidebars --> </div>
                  <div class="page-table">
                    <div class="page-table-rel">
                      <div class="table-header">
                        <table>
                          <tbody>
                          <tr>
                            <td class="span-30">科目名称</td>
                            <td class="span-20">科目余额</td>
                            <td class="span-20"> 调整金额 <i class="icon-transform btn-transform icon-transform--white"
                                                         ng-click="transformAll()" ng-show="canEdit"></i></td>
                            <td class="span-30">调整科目</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="table-body ps-container ps-theme-default" scroll=""
                           data-ps-id="8ad1b3c9-4cbe-a9df-2117-420cde942c4d">
                        <table ng-show="data[nav.type].length !== 0">
                          <tbody><!-- ngRepeat: row in data[nav.type] | filter: {from: subFilter} --> </tbody>
                        </table>
                        <div ng-show="data[nav.type].length === 0" class="noData ng-hide"><i class="icon-nodata"></i>
                          <p>暂无数据</p></div>
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
      </div>
    </div>

    <!-- 新建或更新凭证弹层 -->
    <div class="site-mask anime ng-scope site-mask--shade" v-if="showVoucherFlag">
      <div id="ui-ve" class="site-popup popupContainer ng-isolate-scope site-popup--expand"
           style="transform-style: preserve-3d; transition: all 50ms ease 0s;">
        <div class="button popupExit icon-25 g-icon-close" @click.stop="close()"></div>
        <p class="popupTitle ng-binding" v-text="cacheEntry.title"></p>
        <div class="disableEditTips ng-hide" ng-show="isAdmin">管理员仅拥有查看权限，无法修改！</div>
        <div class="disableEditTips ng-hide" ng-show="!isAdmin && freeze">凭证已审核，数据不允许编辑！</div>
        <div class="popupContent">
          <p class="entryTitle ng-binding">记-000&nbsp;&nbsp;凭证名称：</p>
          <div class="entryContainer">
            <div class="entryHead">
              <div class="tbRow"><p class="h-summary">摘要</p>
                <div class="h-subject-c">科目</div>
                <div class="h-currency ng-binding ng-hide" ng-show="voucher.hasForeigns || voucher.hasAmount"></div>
                <p class="h-debit">借方金额</p>
                <p class="h-credit">贷方金额</p></div>
            </div>
            <div class="entryBody">
              <div class="ui-et ng-isolate-scope ps-container ps-theme-default" id="ui-et-807744">
                <div class="entrysContainer">
                  <div class="entryBar ng-scope" ng-repeat="e in entries" on-repeat-finished="">
                    <div class="button insert icon-16 g-icon-insert-line ng-scope" title="下方插入行"
                         ng-click="insertEntry($index)"></div>
                    <div class="col-summary">
                      <label class="tbLabel" for="zweirtqs-0-0">
                        <p class="ng-binding"></p>
                      </label>
                      <input class="tbInput ng-pristine ng-valid ng-empty ng-touched" id="zweirtqs-0-0" type="text"
                             @click.stop="cellFocusOnClick($event)" ng-focus="pointerMgr.onFocus($event)"
                             ng-change="entrySummaryOnChanged(e)" ng-model="e.brief"></div>
                    <div class="col-subNum">
                      <label class="tbLabel ng-binding" for="zweirtqs-0-1"></label>
                    </div>
                    <div class="col-subName-c">
                      <label class="tbLabel" for="zweirtqs-0-1">
                        <p class="ng-binding"></p>
                      </label>
                    </div>
                    <div class="col-subject-c" @click.stop="showSelect">
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-empty"
                             id="zweirtqs-0-1" type="text" ng-model="cacheEntry.origin.subject"
                             ng-focus="entrySubjectOnFocus($index, $event)" ng-change="entrySubjectOnChange($event)">
                    </div>

                    <div class="col-currency ng-hide zweirtqs-0-2">
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

                    <div class="col-debit" @click.self="cellFocusOnClick">
                      <label class="tbLabel ng-binding" for="zweirtqs-0-6"> </label>
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
                             id="zweirtqs-0-6" ng-model="e.debit"
                             ng-change="entryAmountOnChange(e, 'debit')"
                             ng-focus="entryAmountOnFocus($event)" ng-blur="entryAmountOnBlur(e, 'debit')">
                    </div>
                    <div class="col-credit" @click.self="cellFocusOnClick">
                      <label class="tbLabel ng-binding" for="zweirtqs-0-7"> </label>
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
                             id="zweirtqs-0-7" ng-model="e.credit"
                             ng-change="entryAmountOnChange(e, 'credit')">
                    </div>
                    <div class="button delete icon-16 g-icon-delte-line ng-scope" data-toggle="tooltip" title="删除行"
                         ng-click="deleteEntry($index)" ng-if="!freeze"></div>
                  </div>

                  <!-- end ngRepeat: e in entries -->
                  <div class="entryBar ng-scope" ng-repeat="e in entries" on-repeat-finished=""> <!-- ngIf: !freeze -->
                    <div class="button insert icon-16 g-icon-insert-line ng-scope" data-toggle="tooltip" title="下方插入行"
                         ng-click="insertEntry($index)" ng-if="!freeze"></div><!-- end ngIf: !freeze -->
                    <div class="col-summary">
                      <label class="tbLabel" for="zweirtqs-1-0">
                        <p class="ng-binding"></p>
                      </label>
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-empty" id="zweirtqs-1-0" type="text"
                             ng-click="cellFocusOnClick($event)" ng-focus="pointerMgr.onFocus($event)"
                             ng-change="entrySummaryOnChanged(e)" ng-model="e.brief">
                    </div>
                    <div class="col-subNum"><label class="tbLabel ng-binding" for="zweirtqs-1-1"></label></div>
                    <div class="col-subName-c">
                      <label class="tbLabel" for="zweirtqs-1-1">
                        <p class="ng-binding"></p>
                      </label>
                    </div>

                    <div class="col-subject-c">
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-empty"
                             id="zweirtqs-1-1" type="text" ng-model="cacheEntry.origin.subject"
                             ng-disabled="freeze" @click.stop="entrySubjectOnClick"
                             ng-focus="entrySubjectOnFocus($index, $event)"
                             ng-blur="entrySubjectOnBlur($index, $event)"
                             ng-change="entrySubjectOnChange($event)"
                             ng-class="{'selectAssist': assistSelector.on && cacheEntry.index === $index}">
                    </div>
                    <div class="col-currency ng-hide zweirtqs-1-2" ng-class="pointerMgr.getTag($index, 2)"
                         ng-show="hasForeigns || hasAmount">
                      <label class="accAttr ng-binding ng-hide"
                             ng-click="accAttrAmountOnClick($event, $index)"> 数量: 1.00 </label>
                      <label class="accAttr ng-binding ng-hide"
                             ng-click="accAttrPriceOnClick($event, $index)"> 单价: 0.00 CNY </label>
                      <label
                        class="accAttr ng-binding ng-hide" ng-show="e.isForeign"
                        ng-click="accAttrCurrencyOnClick($event, $index)"> CNY: 0.00 </label> <label
                      class="accAttr ng-binding ng-hide" ng-show="e.isForeign && !e.isAmount"
                      ng-click="accAttrRateOnClick($event, $index)"> 汇率: 0.0000 </label></div>
                    <div class="col-debit"><label class="tbLabel ng-binding" for="zweirtqs-1-6"> </label> <input
                      class="tbInput ng-pristine ng-untouched ng-valid ng-not-empty" type="number" id="zweirtqs-1-6"
                      ng-click="cellFocusOnClick($event)" ng-change="entryAmountOnChange(e, 'debit')"
                      ng-focus="entryAmountOnFocus($event)" ng-blur="entryAmountOnBlur(e, 'debit')" ng-model="e.debit"
                      ng-disabled="freeze"></div>
                    <div class="col-credit"><label class="tbLabel ng-binding" for="zweirtqs-1-7"> </label> <input
                      class="tbInput ng-pristine ng-untouched ng-valid ng-not-empty" type="number" id="zweirtqs-1-7"
                      ng-click="cellFocusOnClick($event)" ng-change="entryAmountOnChange(e, 'credit')"
                      ng-focus="entryAmountOnFocus($event)" ng-blur="entryAmountOnBlur(e, 'credit')" ng-model="e.credit"
                      ng-disabled="freeze"></div> <!-- ngIf: !freeze -->
                    <div class="button delete icon-16 g-icon-delte-line ng-scope" data-toggle="tooltip" title="删除行"
                         ng-click="deleteEntry($index)" ng-if="!freeze"></div><!-- end ngIf: !freeze --> </div>
                  <!-- end ngRepeat: e in entries -->
                  <div class="entryBar ng-scope" ng-repeat="e in entries" on-repeat-finished=""> <!-- ngIf: !freeze -->
                    <div class="button insert icon-16 g-icon-insert-line ng-scope" data-toggle="tooltip" title="下方插入行"
                         ng-click="insertEntry($index)" ng-if="!freeze"></div><!-- end ngIf: !freeze -->
                    <div class="col-summary"><label class="tbLabel" for="zweirtqs-2-0"><p class="ng-binding"></p>
                    </label>
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-empty" id="zweirtqs-2-0" type="text"
                             ng-click="cellFocusOnClick($event)" ng-focus="pointerMgr.onFocus($event)"
                             ng-change="entrySummaryOnChanged(e)" ng-model="e.brief" ng-disabled="freeze"></div>
                    <div class="col-subNum"><label class="tbLabel ng-binding" for="zweirtqs-2-1"></label></div>
                    <div class="col-subName-c">
                      <label class="tbLabel" for="zweirtqs-2-1">
                        <p class="ng-binding"></p>
                      </label>
                    </div>
                    <div class="col-subject-c">
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-empty"
                             id="zweirtqs-2-1" type="text" ng-model="cacheEntry.origin.subject"
                             ng-disabled="freeze" ng-click="entrySubjectOnClick($event)"
                             ng-focus="entrySubjectOnFocus($index, $event)"
                             ng-blur="entrySubjectOnBlur($index, $event)"
                             ng-change="entrySubjectOnChange($event)"
                             ng-class="{'selectAssist': assistSelector.on && cacheEntry.index === $index}">
                    </div>
                    <div class="col-currency ng-hide zweirtqs-2-2">
                      <label class="accAttr ng-binding ng-hide"
                             ng-click="accAttrAmountOnClick($event, $index)"> 数量: 1.00 </label>
                      <label class="accAttr ng-binding ng-hide"
                             ng-click="accAttrPriceOnClick($event, $index)"> 单价: 0.00 CNY </label>
                      <label class="accAttr ng-binding ng-hide"
                             ng-click="accAttrCurrencyOnClick($event, $index)"> CNY: 0.00 </label>
                      <label class="accAttr ng-binding ng-hide"
                             ng-click="accAttrRateOnClick($event, $index)"> 汇率: 0.0000 </label></div>
                    <div class="col-debit"><label class="tbLabel ng-binding" for="zweirtqs-2-6"> </label> <input
                      class="tbInput ng-pristine ng-untouched ng-valid ng-not-empty" type="number" id="zweirtqs-2-6"
                      ng-click="cellFocusOnClick($event)" ng-change="entryAmountOnChange(e, 'debit')"
                      ng-focus="entryAmountOnFocus($event)" ng-blur="entryAmountOnBlur(e, 'debit')" ng-model="e.debit"
                      ng-disabled="freeze"></div>
                    <div class="col-credit"><label class="tbLabel ng-binding" for="zweirtqs-2-7"> </label> <input
                      class="tbInput ng-pristine ng-untouched ng-valid ng-not-empty" type="number" id="zweirtqs-2-7"
                      ng-click="cellFocusOnClick($event)" ng-change="entryAmountOnChange(e, 'credit')"
                      ng-focus="entryAmountOnFocus($event)" ng-blur="entryAmountOnBlur(e, 'credit')" ng-model="e.credit"
                      ng-disabled="freeze"></div> <!-- ngIf: !freeze -->
                    <div class="button delete icon-16 g-icon-delte-line ng-scope" data-toggle="tooltip" title="删除行"
                         ng-click="deleteEntry($index)" ng-if="!freeze"></div><!-- end ngIf: !freeze --> </div>
                  <!-- end ngRepeat: e in entries -->
                  <div class="entryBar ng-scope" ng-repeat="e in entries" on-repeat-finished=""> <!-- ngIf: !freeze -->
                    <div class="button insert icon-16 g-icon-insert-line ng-scope" data-toggle="tooltip" title="下方插入行"
                         ng-click="insertEntry($index)" ng-if="!freeze"></div><!-- end ngIf: !freeze -->
                    <div class="col-summary"><label class="tbLabel" for="zweirtqs-3-0"><p class="ng-binding"></p>
                    </label>
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-empty" id="zweirtqs-3-0" type="text"
                             ng-click="cellFocusOnClick($event)" ng-focus="pointerMgr.onFocus($event)"
                             ng-change="entrySummaryOnChanged(e)" ng-model="e.brief" ng-disabled="freeze"></div>
                    <div class="col-subNum"><label class="tbLabel ng-binding" for="zweirtqs-3-1"></label></div>
                    <div ng-class="{
                    'col-subName-f' : hasForeigns || hasAmount,
                    'col-subName-c' : !(hasForeigns || hasAmount)
                 }" class="col-subName-c"><label class="tbLabel" for="zweirtqs-3-1"><p class="ng-binding"></p></label>
                    </div>
                    <div ng-class="{
                    'col-subject-f' : hasForeigns || hasAmount,
                    'col-subject-c' : !(hasForeigns || hasAmount),
                    'col-subject-on' : e.subOnFocus
                 }" class="col-subject-c">
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-empty"
                             id="zweirtqs-3-1" type="text" ng-model="cacheEntry.origin.subject"
                             ng-disabled="freeze" ng-click="entrySubjectOnClick($event)"
                             ng-focus="entrySubjectOnFocus($index, $event)"
                             ng-blur="entrySubjectOnBlur($index, $event)"
                             ng-change="entrySubjectOnChange($event)"
                             ng-class="{'selectAssist': assistSelector.on && cacheEntry.index === $index}">
                    </div>
                    <div class="col-currency ng-hide zweirtqs-3-2" ng-class="pointerMgr.getTag($index, 2)"
                         ng-show="hasForeigns || hasAmount">
                      <label class="accAttr ng-binding ng-hide"
                             ng-show="e.isAmount"
                             ng-click="accAttrAmountOnClick($event, $index)"> 数量:
                        1.00 </label>
                      <label class="accAttr ng-binding ng-hide" ng-show="e.isAmount"
                             ng-click="accAttrPriceOnClick($event, $index)"> 单价: 0.00 CNY </label>
                      <label
                        class="accAttr ng-binding ng-hide" ng-show="e.isForeign"
                        ng-click="accAttrCurrencyOnClick($event, $index)"> CNY: 0.00 </label> <label
                      class="accAttr ng-binding ng-hide" ng-show="e.isForeign && !e.isAmount"
                      ng-click="accAttrRateOnClick($event, $index)"> 汇率: 0.0000 </label></div>
                    <div class="col-debit"><label class="tbLabel ng-binding" for="zweirtqs-3-6"> </label> <input
                      class="tbInput ng-pristine ng-untouched ng-valid ng-not-empty" type="number" id="zweirtqs-3-6"
                      ng-click="cellFocusOnClick($event)" ng-change="entryAmountOnChange(e, 'debit')"
                      ng-focus="entryAmountOnFocus($event)" ng-blur="entryAmountOnBlur(e, 'debit')" ng-model="e.debit"
                      ng-disabled="freeze"></div>
                    <div class="col-credit"><label class="tbLabel ng-binding" for="zweirtqs-3-7"> </label> <input
                      class="tbInput ng-pristine ng-untouched ng-valid ng-not-empty" type="number" id="zweirtqs-3-7"
                      ng-click="cellFocusOnClick($event)" ng-change="entryAmountOnChange(e, 'credit')"
                      ng-focus="entryAmountOnFocus($event)" ng-blur="entryAmountOnBlur(e, 'credit')" ng-model="e.credit"
                      ng-disabled="freeze"></div> <!-- ngIf: !freeze -->
                    <div class="button delete icon-16 g-icon-delte-line ng-scope" data-toggle="tooltip" title="删除行"
                         ng-click="deleteEntry($index)" ng-if="!freeze"></div><!-- end ngIf: !freeze --> </div>
                  <!-- end ngRepeat: e in entries -->
                  <div class="entryBar ng-scope" ng-repeat="e in entries" on-repeat-finished=""> <!-- ngIf: !freeze -->
                    <div class="button insert icon-16 g-icon-insert-line ng-scope" data-toggle="tooltip" title="下方插入行"
                         ng-click="insertEntry($index)" ng-if="!freeze"></div><!-- end ngIf: !freeze -->
                    <div class="col-summary"><label class="tbLabel" for="zweirtqs-4-0"><p class="ng-binding"></p>
                    </label>
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-empty" id="zweirtqs-4-0" type="text"
                             ng-click="cellFocusOnClick($event)" ng-focus="pointerMgr.onFocus($event)"
                             ng-change="entrySummaryOnChanged(e)" ng-model="e.brief" ng-disabled="freeze"></div>
                    <div class="col-subNum"><label class="tbLabel ng-binding" for="zweirtqs-4-1"></label></div>
                    <div ng-class="{
                    'col-subName-f' : hasForeigns || hasAmount,
                    'col-subName-c' : !(hasForeigns || hasAmount)
                 }" class="col-subName-c"><label class="tbLabel" for="zweirtqs-4-1"><p class="ng-binding"></p></label>
                    </div>
                    <div ng-class="{
                    'col-subject-f' : hasForeigns || hasAmount,
                    'col-subject-c' : !(hasForeigns || hasAmount),
                    'col-subject-on' : e.subOnFocus
                 }" class="col-subject-c">
                      <input class="tbInput ng-pristine ng-untouched ng-valid ng-empty"
                             id="zweirtqs-4-1" type="text" ng-model="cacheEntry.origin.subject"
                             ng-disabled="freeze" ng-click="entrySubjectOnClick($event)"
                             ng-focus="entrySubjectOnFocus($index, $event)"
                             ng-blur="entrySubjectOnBlur($index, $event)"
                             ng-change="entrySubjectOnChange($event)"
                             ng-class="{'selectAssist': assistSelector.on && cacheEntry.index === $index}">
                    </div>
                    <div class="col-currency ng-hide zweirtqs-4-2" ng-class="pointerMgr.getTag($index, 2)"
                         ng-show="hasForeigns || hasAmount">
                      <label class="accAttr ng-binding ng-hide"
                             ng-show="e.isAmount"
                             ng-click="accAttrAmountOnClick($event, $index)"> 数量:
                        1.00 </label>
                      <label class="accAttr ng-binding ng-hide" ng-show="e.isAmount"
                             ng-click="accAttrPriceOnClick($event, $index)"> 单价: 0.00 CNY </label> <label
                      class="accAttr ng-binding ng-hide" ng-show="e.isForeign"
                      ng-click="accAttrCurrencyOnClick($event, $index)"> CNY: 0.00 </label> <label
                      class="accAttr ng-binding ng-hide" ng-show="e.isForeign && !e.isAmount"
                      ng-click="accAttrRateOnClick($event, $index)"> 汇率: 0.0000 </label></div>
                    <div class="col-debit"><label class="tbLabel ng-binding" for="zweirtqs-4-6"> </label> <input
                      class="tbInput ng-pristine ng-untouched ng-valid ng-not-empty" type="number" id="zweirtqs-4-6"
                      ng-click="cellFocusOnClick($event)" ng-change="entryAmountOnChange(e, 'debit')"
                      ng-focus="entryAmountOnFocus($event)" ng-blur="entryAmountOnBlur(e, 'debit')" ng-model="e.debit"
                      ng-disabled="freeze"></div>
                    <div class="col-credit"><label class="tbLabel ng-binding" for="zweirtqs-4-7"> </label> <input
                      class="tbInput ng-pristine ng-untouched ng-valid ng-not-empty" type="number" id="zweirtqs-4-7"
                      ng-click="cellFocusOnClick($event)" ng-change="entryAmountOnChange(e, 'credit')"
                      ng-focus="entryAmountOnFocus($event)" ng-blur="entryAmountOnBlur(e, 'credit')" ng-model="e.credit"
                      ng-disabled="freeze"></div> <!-- ngIf: !freeze -->
                    <div class="button delete icon-16 g-icon-delte-line ng-scope" data-toggle="tooltip" title="删除行"
                         ng-click="deleteEntry($index)" ng-if="!freeze"></div><!-- end ngIf: !freeze --> </div>
                  <!-- end ngRepeat: e in entries -->
                </div>
                <div ng-show="!assistSelector.on" source="subjects" filter="cacheEntry.origin.subject"
                     output="cacheEntry.out" on="subSelector.on" options="subSelector"
                     addsub="entrySubjectCreate()" cfmsub="entrySubjectSelected(e)" class="ng-isolate-scope"
                     id="ui-sub-421765"
                     style="position: fixed; z-index: 1; top: 0px; left: 0px; width: 0px; height: 0px;">
                  <div id="ui-ss-container" click-test="" listen="options.on" onmouselost="ui_close()"
                       class="ng-isolate-scope" mdbuspon=""
                       style="top: 270px; left: 230.375px; width: 507px; height: 59px; display: none;">
                    <ul>
                      <li ng-class="{'hide' : (!options.hints.showCreate) || (!subUnknown)}" ng-click="createSub()"
                          class="hide">新建此科目
                      </li>
                      <li class="forbidden hide" ng-class="{'hide' : options.hints.showCreate || (!subUnknown)}">[无效科目]
                      </li> <!-- ngRepeat: sub in cacheList -->
                      <li ng-repeat="sub in cacheList" ng-class="{
                'nonLeaf' : !sub.isLeaf && !options.hints.allowNonLeaf,
	    		'highlighted' : sub.isHighlighted
            }" ng-style="options.hints.autoIndent &&
                {'padding-left' : (sub.level - 1) * 15 + 8 + 'px'}" ng-click="ui_selectSubject($index)"
                          class="ng-binding ng-scope" style="padding-left: 8px;">1001 库存现金
                      </li><!-- end ngRepeat: sub in cacheList -->
                      <li ng-repeat="sub in cacheList" ng-class="{
                'nonLeaf' : !sub.isLeaf && !options.hints.allowNonLeaf,
	    		'highlighted' : sub.isHighlighted
            }" ng-style="options.hints.autoIndent &&
                {'padding-left' : (sub.level - 1) * 15 + 8 + 'px'}" ng-click="ui_selectSubject($index)"
                          class="ng-binding ng-scope" style="padding-left: 8px;">1002 银行存款
                      </li><!-- end ngRepeat: sub in cacheList -->
                      <li ng-repeat="sub in cacheList" ng-class="{
                'nonLeaf' : !sub.isLeaf && !options.hints.allowNonLeaf,
	    		'highlighted' : sub.isHighlighted
            }" ng-style="options.hints.autoIndent &&
                {'padding-left' : (sub.level - 1) * 15 + 8 + 'px'}" ng-click="ui_selectSubject($index)"
                          class="ng-binding ng-scope" style="padding-left: 8px;">1004 备用金
                      </li><!-- end ngRepeat: sub in cacheList -->
                      <li ng-repeat="sub in cacheList" ng-class="{
                'nonLeaf' : !sub.isLeaf && !options.hints.allowNonLeaf,
	    		'highlighted' : sub.isHighlighted
            }" ng-style="options.hints.autoIndent &&
                {'padding-left' : (sub.level - 1) * 15 + 8 + 'px'}" ng-click="ui_selectSubject($index)"
                          class="ng-binding ng-scope nonLeaf" style="padding-left: 8px;">1012 其他货币资金
                      </li><!-- end ngRepeat: sub in cacheList -->
                      <li ng-repeat="sub in cacheList" ng-class="{
                'nonLeaf' : !sub.isLeaf && !options.hints.allowNonLeaf,
	    		'highlighted' : sub.isHighlighted
            }" ng-style="options.hints.autoIndent &&
                {'padding-left' : (sub.level - 1) * 15 + 8 + 'px'}" ng-click="ui_selectSubject($index)"
                          class="ng-binding ng-scope" style="padding-left: 23px;">1012001 其他货币资金 - 银行汇票
                      </li><!-- end ngRepeat: sub in cacheList -->
                      <li ng-repeat="sub in cacheList" ng-class="{
                'nonLeaf' : !sub.isLeaf && !options.hints.allowNonLeaf,
	    		'highlighted' : sub.isHighlighted
            }" ng-style="options.hints.autoIndent &&
                {'padding-left' : (sub.level - 1) * 15 + 8 + 'px'}" ng-click="ui_selectSubject($index)"
                          class="ng-binding ng-scope" style="padding-left: 23px;">1012002 其他货币资金 - 银行本票
                      </li>
                     </ul>
                  </div>
                </div>
                <div click-test="" listen="assistSelector.enableClickTest" onmouselost="assistBoxOnblur()"
                     class="assistBox ng-isolate-scope ng-hide" ng-show="assistSelector.on" id="assistBox-ui-et-807744"
                     mlaajzfx="" style="top: 270px; left: 230.375px; width: 507px;">
                  <div source="assistSelector.source" on="assistSelector.on"
                       suggestion="assistSelector.suggestion" auto-comfirm="true"
                       output="assistSelector.output" enable-click-test="assistSelector.enableClickTest"
                       selected="cacheEntry.origin.items" finish="assistSelector.finish"
                       callback="entryAssistSelected()" class="ng-isolate-scope">
                    <div class="assistSelector ng-hide" ng-show="on">
                      <div class="content ps-container ps-theme-default"
                           data-ps-id="7a6964c4-2d7c-1227-3fcb-1469400e40fb">
                        <!-- ngRepeat: (type, select) in selector -->
                        <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                          <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                        </div>
                        <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                          <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                        </div>
                      </div>
                      <div class="footer ng-hide" ng-show="!autoComfirm">
                        <div class="btnBox">
                          <div class="btn-confirm solidBtn" ng-click="confirm()"> 确认</div>
                          <div class="btn-more solidBtn" ng-click="more()"> 确认并继续</div>
                        </div>
                      </div>
                      <div on="creator.on" source="creator.source" output="suggestion"
                           callback="created()"
                           class="ng-isolate-scope">
                        <div class="site-mask anime" ng-class="{'site-mask--shade': on}">
                          <div class="pop-container site-popup anime assistCreator"
                               ng-class="{'site-popup--expand' : on}"><p class="title"> 添加辅助核算项 </p>
                            <div class="icon-close" ng-click="close()"></div>
                            <div class="content ps-container ps-theme-default"
                                 data-ps-id="91f90cf4-8fbf-b56e-1070-61ab84ac571e">
                              <div class="item"><label for="assistCreator-code-mewjieip">编码</label>
                                <div class="inputBox">
                                  <input type="text" id="assistCreator-code-mewjieip"
                                         ng-model="creator.code"
                                         class="ng-pristine ng-untouched ng-valid ng-empty"></div>
                              </div>
                              <div class="item">
                                <label for="assistCreator-name-mewjieip">名称</label>
                                <div class="inputBox">
                                  <input type="text" id="assistCreator-name-mewjieip"
                                         ng-model="creator.name"
                                         class="ng-pristine ng-untouched ng-valid ng-empty"></div>
                              </div>
                              <div class="item ng-hide" ng-show="creator.type === 'inventory'"><label
                                for="assistCreator-unit-mewjieip">单位</label>
                                <div class="inputBox">
                                  <input type="text" id="assistCreator-unit-mewjieip"
                                         ng-model="creator.unit"
                                         class="ng-pristine ng-untouched ng-valid ng-empty"></div>
                              </div>
                              <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                                <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                              </div>
                              <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                                <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                              </div>
                            </div>
                            <div class="footer">
                              <div class="btn-cancel solidBtn" ng-click="cancel()"> 取消</div>
                              <div class="right">
                                <div class="btn-save solidBtn" ng-click="save()"> 保存</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="accAttrBox-ui-et-807744" class="accAttrBox ng-isolate-scope" click-test=""
                     listen="options.active" onmouselost="accAttrBoxOnBlur()" ng-style="accAttrBox.on &&{
             'pointer-events' : 'painted',
             'opacity' : '1'
         }" mryezilm="">
                  <div class="accAttrContainer">
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
                    <div class="accFooter">
                      <div class="boxButton accCancel com-button anime ng-isolate-scope com-button--cancel"
                           ng-class="class" ng-click=";click();" ui-button="" btn-type="cancel"
                           btn-click="accAttrBoxCancel()">
                        <div><span class="ng-scope">取消</span></div>
                      </div>
                      <div class="boxButton accSave com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                           ng-click=";click();" ui-button="" btn-click="accAttrBoxOk(cacheEntry)">
                        <div><span class="ng-scope">保存</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="balanceBox-ui-et-807744" class="balanceBox">
                  <p ng-style="isBalanceNegative && {'color' : 'red'}" class="ng-binding"
                     style="left: 738.641px; width: 249px;pointer-events:painted;opacity:1">余额：0.00</p>
                </div>
              </div>
            </div>
            <div class="entryFooter">
              <div class="tbRow"><p class="f-summary">合计</p>
                <p class="f-subject">差值： <span ng-class="{'span-nb' : voucher.vDiff != 0}"
                                               class="ng-binding">0.00</span>
                </p>
                <p class="f-debit ng-binding">0.00</p>
                <p class="f-credit ng-binding">0.00</p></div>
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
          <div class="footBtn save com-button anime ng-isolate-scope com-button--ok" ng-class="class"
               ng-click=";click();"
               ng-show="!freeze" ui-button="" btn-click="save()">
            <div><span class="ng-scope">保存</span></div>
          </div>
          <div class="footBtn continue com-button anime ng-isolate-scope com-button--ok" ng-class="class"
               ng-click=";click();" ng-show="!freeze" ui-button="" btn-click="more()">
            <div><span class="ng-scope">保存并新建</span></div>
          </div>
        </div>
        <div></div>
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
        accountId: '',
        // 新建凭证弹层
        showVoucherFlag: false,
        // 新建或者编辑凭证对象
        cacheEntry: {
          title: '新建凭证',
          // 摘要
          brief: '',
          // 科目编号
          subjectId: '',
          // 科目名称
          subjectName: '',
          // 借方现金
          debitCash: '',
          // 贷方现金
          lenderCash: '',
        },
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      // 关闭新建凭证弹层
      close() {
        this.showVoucherFlag = false
      },
      // 创建新的凭证
      createVoucher() {
        this.showVoucherFlag = true
      },
      // 新建或者更新凭证的科目
      entrySubjectOnClick() {
        console.log("新建或者更新凭证的科目")
      },
      // 展示下拉框
      showSelect() {
        console.log("展示下拉框")
      },
      // 借方贷方点击事件
      cellFocusOnClick() {
        console.log("借方贷方点击事件")
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {

    },
    created() {
      this.accountId = utils.dbGet("account").id
      console.log("创建组建开始", this.accountId)
      if (utils.isExist(this.accountId)) {
        this.$emit('sel', {index: 2, type: 'accounts'})
      } else {
        // this.$router.push({path: '/login'})
      }
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {},
    filters: {
      moneyFilter(value) {
        if (utils.isExist(value)) {
          let hasPoint = value.split(".")
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
    }
  }
</script>

<style scoped>
  [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak, .ng-hide:not(.ng-hide-animate) {
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

  .page-vouchers .page-title .title--on, .page-vouchers .page-title .title--on:hover {
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

  .page-vouchers [class|=col], .page-vouchers [class|=h] {
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

  .page-vouchers .page-content [class|=h] {
    text-align: center;
    color: #fff;
  }

  .page-vouchers .page-content .col-name, .page-vouchers .page-content .h-name {
    width: 25%;
  }

  .page-vouchers .page-content .col-subject, .page-vouchers .page-content .h-subject {
    width: 45%;
  }

  .page-vouchers .page-content .col-credit, .page-vouchers .page-content .col-debit, .page-vouchers .page-content .h-credit, .page-vouchers .page-content .h-debit {
    width: 15%;
  }

  .page-vouchers .page-content .col-credit, .page-vouchers .page-content .col-debit {
    text-align: right;
  }

  .page-vouchers .page-content .sumBar .col-credit, .page-vouchers .page-content .sumBar .col-debit {
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

  .page-vouchers .page-content .entryTitlebar, .page-vouchers .page-content .sumBar {
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

  .page-vouchers .page-content .entryContainer:hover .span-source, .page-vouchers .page-content .span-source-on {
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
</style>
