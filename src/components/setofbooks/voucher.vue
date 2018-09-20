<template>
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
              <ng-transclude><span class="ng-scope"> 刷新列表</span></ng-transclude>
            </div>
            <div class="funcBtn com-button anime ng-isolate-scope com-button--disabled com-button--cancel"
                 ng-class="class" ng-click=";click();" ui-button="" btn-type="hollow"
                 btn-enabled="canSwitchIssueState" btn-click="switchCarryoverState()">
              <ng-transclude><span class="ng-binding ng-scope"> 结账</span></ng-transclude>
            </div>
            <div class="funcBtn com-button anime ng-isolate-scope com-button--disabled com-button--cancel"
                 ng-class="class" ng-click=";click();" ng-show="isCurrentIssue" ui-button="" btn-type="hollow"
                 btn-enabled="canAccrue" btn-click="openAccrueReport()">
              <ng-transclude><span class="ng-scope"> 自动计提</span></ng-transclude>
            </div>
            <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                 ng-click=";click();" ng-show="canCreateVoucher" ui-button="" btn-type="hollow"
                 btn-click="createVoucher()">
              <ng-transclude><span class="ng-scope"> 新建凭证</span></ng-transclude>
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
            <div class="contentPage ps-container ps-theme-default ps-active-y" scroll="" scroll-behavior="top"
                 data-ps-id="4bbadf81-f1f5-3674-536e-993a57f0c4a8">
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
                        <div class="button entryOpt ng-scope" ng-if="!v.vAudited &amp;&amp; canDeleteVoucher(v)"
                             ng-click="deleteVoucher(v, $event)">
                          <div class="optIcon icon-40 icon-voucher-delete"></div>
                          <p class="optTag optTag--orange">删除</p></div>
                        <!-- end ngIf: !v.vAudited && canDeleteVoucher(v) -->
                        <!-- ngIf: !v.vAudited && canEditVoucher(v) -->
                        <div class="button entryOpt ng-scope" ng-if="!v.vAudited &amp;&amp; canEditVoucher(v)"
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
                        <p ng-show="e.isForeign &amp;&amp; !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
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
                        <p ng-show="e.isForeign &amp;&amp; !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
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
                        <p ng-show="e.isForeign &amp;&amp; !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
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
                        <p ng-show="e.isForeign &amp;&amp; !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
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
                        <p ng-show="e.isForeign &amp;&amp; !e.isAmount" class="ng-binding ng-hide"> CNY: 0.00 </p>
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
              </div>
              <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
              </div>
              <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px; height: 432px;">
                <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 391px;"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="page-tab ng-isolate-scope ng-hide" ng-show="on" ui-vouchers-config="" by="tab">
          <div class="page-tools">
            <div class="title-gap"></div>
            <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow ng-hide" ng-class="class"
                 ng-click=";click();" ng-show="hasChange" btn-click="cancel()" ui-button="" btn-type="hollow">
              <ng-transclude><span class="ng-scope">取消</span></ng-transclude>
            </div>
            <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow ng-hide" ng-class="class"
                 ng-click=";click();" ng-show="hasChange" btn-click="save()" ui-button="" btn-type="hollow">
              <ng-transclude><span class="ng-scope">保存</span></ng-transclude>
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
              <ng-transclude></ng-transclude>
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
                 ng-click=";click();" ng-show="hasChange &amp;&amp; canEdit" btn-click="cancel()" ui-button=""
                 btn-type="hollow">
              <ng-transclude><span class="ng-scope">取消</span></ng-transclude>
            </div>
            <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow ng-hide" ng-class="class"
                 ng-click=";click();" ng-show="hasChange &amp;&amp; canEdit" btn-click="save()" ui-button=""
                 btn-type="hollow">
              <ng-transclude><span class="ng-scope">保存</span></ng-transclude>
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
</template>

<script>
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {}
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {},
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {

    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style scoped>

</style>
