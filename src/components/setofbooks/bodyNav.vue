<template>
  <div class="module-title ng-scope">
    <div class="com-issue ng-isolate-scope" ui-issue="" i-link-system="true" i-show-title="true">
      <div class="com-issue_display" ng-show="iShowTitle === 'true'" ng-click="showPicker()">
        <div class="display_icon icon-40"></div>
        <div class="display_tag ng-binding">2018-03期</div>
      </div>
      <div class="com-issue_container anime com-issue_container--hidden"
           ng-class="{'com-issue_container--hidden': !show}">
        <div click-test="" listen="clicktest" onmouselost="hidePicker()" class="ng-isolate-scope" yjpijgfx="">
          <div class="year">
            <div class="year_btn--last ng-hide" ng-show="isLastYearValid()" ng-click="lastYear()"></div>
            <div class="year_tag ng-binding">2018</div>
            <div class="year_btn--next ng-hide" ng-show="isNextYearValid()" ng-click="nextYear()"></div>
          </div>
          <div class="month"> <!-- ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 1
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 2
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope month_box--valid month_box--focus" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 3
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 4
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 5
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 6
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 7
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 8
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 9
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 10
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 11
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 12
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] --> </div>
        </div>
      </div>
    </div>
    <div class="com-cs ng-scope" ui-comp-status="">
      <div class="brief"><p class="brief_name ng-binding">天机</p>
        <p class="brief_type ng-binding">[小规模纳税人&amp;季报]</p></div>
      <div class="state ng-binding">
        <div class="button equilibrium ng-hide" ng-hide="equilibrium" ng-click="showEquilibrium()"></div>
        做账中
      </div>
      <div class="button switch ng-hide" v-show="canSwitch" ng-click="switchState()">
        <div class="switch_icon"></div>
        <p class="switch_tag ng-binding">做账中</p></div>
    </div>

    <div class="module-title_gap"></div>
    <div class="com-memo anime ng-scope" ui-memo="">
      <div class="icon-noteBtn" ng-click="toggle($event)" title="备忘录"></div>
      <div class="pointer ng-binding ng-hide" ng-show="memos.length !== 0">0</div>
      <div class="memoBox ng-isolate-scope" v-if="remarkComponentFlag">
        <div class="memo-title">备忘录</div>
        <div class="memo-containerBox">
          <div class="container-top"><textarea placeholder="填写备忘" ng-model="text"
                                               class="ng-pristine ng-untouched ng-valid ng-empty"></textarea></div>
          <div class="container-bottom">
            <div class="memo-container-left ng-binding">2018-09</div>
            <div class="memo-container-right anime" title="提交备忘" ng-click="addMemo()"></div>
          </div>
        </div>
        <div class="memo-listBox ps-container ps-theme-default" scroll="" scroll-behavior="top"
             data-ps-id="80fe126e-101d-d442-4a93-44b9f8f08a6f"> <!-- ngRepeat: x in memos -->
          <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
            <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
          </div>
          <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
            <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="com-ds ng-scope" ui-data-source="">
      <div class="com-ds_switch icon-dataSource icon-40" title="数据源" ng-click="open()"></div>
      <div class="com-ds_frame anime" ng-class="{'com-ds_frame--on': on}">
        <div class="frame_menus"> <!-- ngRepeat: menu in menuTool.list --><!-- ngIf: menu.show -->
          <div class="frame_menu anime ng-scope"
               ng-class="{'frame_menu--on': menu.type == menuTool.currentMenu.type}"
               ng-repeat="menu in menuTool.list" ng-if="menu.show">
            <div class="frame_menu-tab anime ng-binding"
                 ng-class="{'frame_menu-tab--on': menu.type == menuTool.currentMenu.type}"
                 ng-click="selectMenu(menu)">银行数据
            </div>
          </div><!-- end ngIf: menu.show --><!-- end ngRepeat: menu in menuTool.list --><!-- ngIf: menu.show -->
          <div class="frame_menu anime ng-scope"
               ng-class="{'frame_menu--on': menu.type == menuTool.currentMenu.type}"
               ng-repeat="menu in menuTool.list" ng-if="menu.show">
            <div class="frame_menu-tab anime ng-binding"
                 ng-class="{'frame_menu-tab--on': menu.type == menuTool.currentMenu.type}"
                 ng-click="selectMenu(menu)">进项清单
            </div>
          </div><!-- end ngIf: menu.show --><!-- end ngRepeat: menu in menuTool.list --><!-- ngIf: menu.show -->
          <div class="frame_menu anime ng-scope"
               ng-class="{'frame_menu--on': menu.type == menuTool.currentMenu.type}"
               ng-repeat="menu in menuTool.list" ng-if="menu.show">
            <div class="frame_menu-tab anime ng-binding"
                 ng-class="{'frame_menu-tab--on': menu.type == menuTool.currentMenu.type}"
                 ng-click="selectMenu(menu)">销项数据
            </div>
          </div><!-- end ngIf: menu.show --><!-- end ngRepeat: menu in menuTool.list --><!-- ngIf: menu.show -->
          <div class="frame_menu anime ng-scope"
               ng-class="{'frame_menu--on': menu.type == menuTool.currentMenu.type}"
               ng-repeat="menu in menuTool.list" ng-if="menu.show">
            <div class="frame_menu-tab anime ng-binding"
                 ng-class="{'frame_menu-tab--on': menu.type == menuTool.currentMenu.type}"
                 ng-click="selectMenu(menu)">报销费用
            </div>
          </div><!-- end ngIf: menu.show --><!-- end ngRepeat: menu in menuTool.list --><!-- ngIf: menu.show -->
          <div class="frame_menu anime ng-scope"
               ng-class="{'frame_menu--on': menu.type == menuTool.currentMenu.type}"
               ng-repeat="menu in menuTool.list" ng-if="menu.show">
            <div class="frame_menu-tab anime ng-binding"
                 ng-class="{'frame_menu-tab--on': menu.type == menuTool.currentMenu.type}"
                 ng-click="selectMenu(menu)">扫描票据
            </div>
          </div><!-- end ngIf: menu.show --><!-- end ngRepeat: menu in menuTool.list --><!-- ngIf: menu.show -->
          <div class="frame_menu anime ng-scope"
               ng-class="{'frame_menu--on': menu.type == menuTool.currentMenu.type}"
               ng-repeat="menu in menuTool.list" ng-if="menu.show">
            <div class="frame_menu-tab anime ng-binding"
                 ng-class="{'frame_menu-tab--on': menu.type == menuTool.currentMenu.type}"
                 ng-click="selectMenu(menu)">电子发票
            </div>
          </div><!-- end ngIf: menu.show --><!-- end ngRepeat: menu in menuTool.list --> </div>
        <div class="frame_page frame_page--wrapper ng-hide" ui-data-source-bank=""
             ng-show="menuTool.currentMenu.type === 'bank'">
          <header>
            <div class="title ng-binding"> （0家）</div>
            <div class="button refresh icon-30 g-icon-refresh" ng-click="refreshBankList()" title="刷新数据"></div>
            <div class="flex-polyfill"></div>
            <div class="robot com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                 ng-click=";click();" title="银行数据重新处理(再学习过程)" ui-button="" btn-type="hollow"
                 btn-click="robotLearnBankflow()" ng-show="canOperate">
              <ng-transclude><span class="ng-scope"> 重新学习 </span></ng-transclude>
            </div>
            <div class="upload com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                 ng-click=";click();" title="银行交易流水 (限xls/xlsx格式)" ui-button="" btn-type="hollow"
                 ng-show="canOperate">
              <ng-transclude><label for="uploadBank" class="ng-scope">上传</label></ng-transclude>
            </div>
            <input id="uploadBank" type="file" ng-file-model="transaction_file" multiple="multiple"
                   accept=".xls,.xlsx" on-upload="uploadTransactionDetail(values)" class="ng-isolate-scope">
          </header>
          <section scroll="" scroll-behavior="top" class="ps-container ps-theme-default"
                   data-ps-id="1c0bc3b7-a386-dbdd-9045-eff3d658a907">
            <!-- ngRepeat: bankInfo in cacheData.listFromBank -->
            <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
              <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
            </div>
            <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
              <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
            </div>
          </section>
        </div>
        <div class="frame_page frame_page--wrapper ng-hide" ui-data-source-scan=""
             ng-show="menuTool.currentMenu.type === 'scan'">
          <header>
            <div class="title ng-binding"> （0张）</div>
            <div class="refresh icon-30 button g-icon-refresh" ng-click="refreshScannerList()" title="刷新数据"></div>
            <div class="flex-polyfill"></div>
            <div class="legends">
              <div class="legend">
                <div class="legend_icon legend_icon--unknown icon-16"></div>
                <div class="legend_text">未知票据</div>
              </div>
              <div class="legend">
                <div class="legend_icon legend_icon--scaning icon-16"></div>
                <div class="legend_text">正在识别</div>
              </div>
              <div class="legend">
                <div class="legend_icon legend_icon--done icon-16"></div>
                <div class="legend_text">识别完成</div>
              </div>
              <div class="legend">
                <div class="legend_icon legend_icon--deleted icon-16"></div>
                <div class="legend_text">已删票据</div>
              </div>
            </div>
            <div class="filter">
              <div class="ui-select ng-isolate-scope" options="scannerFilters" title="title"
                   current="scannerFilter">
                <div class="select-title" ng-click="expand()"><p class="name ng-binding ng-hide" ng-show="mask"></p>
                  <p class="name ng-binding" ng-hide="mask">全部票据</p> <i class="icon anime"
                                                                        ng-class="{'icon--revert': showOptions}"></i>
                </div>
                <div class="select-list anime ng-isolate-scope ps-container ps-theme-default"
                     ng-class="{'select-list--expand': showOptions}" scroll="" click-test="" listen="showOptions"
                     onmouselost="hide()" data-ps-id="6db145ef-4f2f-3320-5dfd-f20bd4fb8886" waysdthr="">
                  <!-- ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                         ng-repeat="option in options" ng-click="select(option)"
                                                         title="全部票据">全部票据</p>
                  <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                             ng-repeat="option in options" ng-click="select(option)"
                                                             title="未知票据">未知票据</p>
                  <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                             ng-repeat="option in options" ng-click="select(option)"
                                                             title="正在识别">正在识别</p>
                  <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                             ng-repeat="option in options" ng-click="select(option)"
                                                             title="已删票据">已删票据</p>
                  <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                             ng-repeat="option in options" ng-click="select(option)"
                                                             title="识别完成">识别完成</p>
                  <!-- end ngRepeat: option in options -->
                  <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                    <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                  </div>
                  <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                    <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="robot com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                 ng-click=";click();" title="扫描票据重新处理(再学习过程)" ui-button="" btn-type="hollow"
                 btn-click="robotLearnScanner()" ng-show="canOperate">
              <ng-transclude><span class="ng-scope"> 重新学习 </span></ng-transclude>
            </div>
          </header>
          <section scroll="" scroll-behavior="top" class="ps-container ps-theme-default"
                   data-ps-id="3d4a6a2e-0bc6-093a-1adc-d27969151f73">
            <div class="bills">
              <!-- ngRepeat: data in cacheData.listFromScanner | filter: { stateFlag: scannerFilter.flag } --> </div>
            <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
              <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
            </div>
            <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
              <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
            </div>
          </section>
        </div>
        <div class="frame_page frame_page--wrapper com-ds-helper ng-hide" ui-data-source-helper=""
             ng-show="menuTool.currentMenu.type === 'helper'">
          <header>
            <div class="title ng-binding"> （0张）</div>
            <div class="button refresh icon-30 g-icon-refresh" ng-click="refreshInvoiceList()" title="刷新数据"></div>
            <div class="flex-polyfill"></div> <!-- ngIf: isInvoiceFromClient --> <!-- ngIf: isInvoiceFromClient -->
            <!-- ngIf: isInvoiceFromClient -->
            <div class="robot com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                 ng-click=";click();" title="开票数据重新处理(再学习过程)" ui-button="" btn-type="hollow"
                 btn-click="robotLearnInvoice()" ng-show="canOperate">
              <ng-transclude><span class="ng-scope"> 重新学习 </span></ng-transclude>
            </div>
            <div class="upload com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                 ng-click=";click();" ui-button="" btn-type="hollow" title="开票数据(限xls/xlsx格式)" ng-show="canOperate">
              <ng-transclude><label for="uploadInvoice" class="ng-scope">上传</label></ng-transclude>
            </div>
            <input id="uploadInvoice" type="file" ng-file-model="invoice_files" multiple="multiple"
                   accept=".xls,.xlsx" on-upload="uploadInvoiceDetail(values)" class="ng-isolate-scope">
            <div class="button deleteIcon icon-30 g-icon-delete-multi ng-hide" title="删除所有数据"
                 ng-show="canDeleteInvoice" ng-click="deleteInvoice()"></div>
          </header>
          <section class="invoices--valid" ng-style="{'max-height': hasDeletedContent ? '50%' : 'unset'}"
                   style="max-height: unset;">
            <div class="invoiceTitle">
              <div class="totals">1、销售数据</div>
              <div class="flex-polyfill"></div>
              <div class="button download g-icon-download icon-30 ng-hide" title="下载开票数据"
                   ng-show="invoiceSource() === 'file'" ng-click="openLink(cacheData.listFromInvoice.src)"></div>
            </div>
            <div class="tableTitle"><p class="col-time-invoice">发票号码</p>
              <p class="col-payer">购买单位</p>
              <p class="col-item">商品摘要</p>
              <p class="col-sum-invoice">金额</p>
              <p class="col-taxRate">税率</p>
              <p class="col-tax">税额</p>
              <p class="col-taxTotal">含税价</p>
              <p class="col-invoice">发票</p></div>
            <div class="tableContent ps-container ps-theme-default" scroll="" scroll-behavior="top"
                 data-ps-id="6733b133-74fe-5a5f-39e9-70f4ccb26015">
              <!-- ngRepeat: invoice in cacheData.listFromInvoice.resources -->
              <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
              </div>
              <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
              </div>
            </div>
            <div class="tableFooter">
              <div class="tableRow"><p class="col-time-invoice">合计：</p>
                <p class="col-payer">-</p>
                <p class="col-item">-</p>
                <p class="col-sum-invoice ng-binding" title="0.00">0.00</p>
                <p class="col-taxRate">-</p>
                <p class="col-tax ng-binding" title="0.00">0.00</p>
                <p class="col-taxTotal ng-binding" title="0.00">0.00</p>
                <p class="col-invoice">-</p></div>
            </div>
          </section>
          <section class="invoices--invalid ng-hide" ng-show="hasDeletedContent">
            <div class="invoiceTitle">
              <div class="totals">2、作废发票</div>
            </div>
            <div class="tableTitle"><p class="col-time-invoice">发票号码</p>
              <p class="col-payer">购买单位</p>
              <p class="col-item">商品摘要</p>
              <p class="col-sum-invoice">金额</p>
              <p class="col-taxRate">税率</p>
              <p class="col-tax">税额</p>
              <p class="col-taxTotal">含税价</p></div>
            <div class="tableContent ps-container ps-theme-default" scroll="" scroll-behavior="top"
                 data-ps-id="8a91b259-1f05-0381-e626-5a24c173ae74">
              <!-- ngRepeat: invoice in cacheData.listFromInvoice.discards -->
              <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
              </div>
              <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
              </div>
            </div>
          </section>
        </div>
        <div class="frame_page frame_page--wrapper ds-einvoice ng-isolate-scope ng-hide" ng-show="on"
             ui-data-source-einvoice="" by="menuTool.currentMenu.type">
          <header>
            <div class="title ng-binding"> 电子发票 （0张）</div>
            <div class="refresh icon-30 button g-icon-refresh" ng-click="refresh()" title="刷新数据"></div>
            <div class="flex-polyfill"></div>
            <div class="legends">
              <div class="legend">
                <div class="legend_icon legend_icon--unknown icon-16"></div>
                <div class="legend_text">未知票据</div>
              </div>
              <div class="legend">
                <div class="legend_icon legend_icon--scaning icon-16"></div>
                <div class="legend_text">正在识别</div>
              </div>
              <div class="legend">
                <div class="legend_icon legend_icon--done icon-16"></div>
                <div class="legend_text">识别完成</div>
              </div>
              <div class="legend">
                <div class="legend_icon legend_icon--deleted icon-16"></div>
                <div class="legend_text">已删票据</div>
              </div>
            </div>
            <div class="filter">
              <div class="ui-select ng-isolate-scope" options="eInvoicesFilters" title="title"
                   current="eInvoicesFilter">
                <div class="select-title" ng-click="expand()"><p class="name ng-binding ng-hide" ng-show="mask"></p>
                  <p class="name ng-binding" ng-hide="mask">全部票据</p> <i class="icon anime"
                                                                        ng-class="{'icon--revert': showOptions}"></i>
                </div>
                <div class="select-list anime ng-isolate-scope ps-container ps-theme-default"
                     ng-class="{'select-list--expand': showOptions}" scroll="" click-test="" listen="showOptions"
                     onmouselost="hide()" data-ps-id="b5bbc908-128d-2038-ef29-71fee3c929dc" sihfqjmw="">
                  <!-- ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                         ng-repeat="option in options" ng-click="select(option)"
                                                         title="全部票据">全部票据</p>
                  <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                             ng-repeat="option in options" ng-click="select(option)"
                                                             title="未知票据">未知票据</p>
                  <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                             ng-repeat="option in options" ng-click="select(option)"
                                                             title="正在识别">正在识别</p>
                  <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                             ng-repeat="option in options" ng-click="select(option)"
                                                             title="已删票据">已删票据</p>
                  <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                             ng-repeat="option in options" ng-click="select(option)"
                                                             title="识别完成">识别完成</p>
                  <!-- end ngRepeat: option in options -->
                  <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                    <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                  </div>
                  <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                    <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="upload com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                 ng-click=";click();" ui-button="" btn-type="hollow" title="电子发票(限pdf格式)" ng-show="canOperate">
              <ng-transclude><label for="uploadEinvoice" class="ng-scope">上传</label></ng-transclude>
            </div>
            <input id="uploadEinvoice" type="file" accept=".jpg, .pdf" multiple="multiple" file-model=""
                   keep-file="false"></header>
          <section scroll="" scroll-behavior="top" class="ps-container ps-theme-default"
                   data-ps-id="58b19276-5304-2b48-4887-023a5663cff9">
            <div class="bills">
              <!-- ngRepeat: data in eInvoices | filter: { stateFlag: eInvoicesFilter.flag } --> </div>
            <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
              <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
            </div>
            <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
              <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
            </div>
          </section>
        </div>
        <div class="frame_page frame_page--wrapper com-ds-ivat ng-isolate-scope ng-hide" ng-show="on"
             ui-data-source-ivat="" by="menuTool.currentMenu.type">
          <header>
            <div class="title ng-binding">进项数据 （0张）</div>
            <div class="button refresh icon-30 g-icon-refresh" ng-click="refresh()" title="刷新数据"></div>
            <div class="flex-polyfill"></div> <!-- ngIf: isIvatFromClient --> <!-- ngIf: isIvatFromClient -->
            <!-- ngIf: isIvatFromClient -->
            <div class="com-button anime ng-isolate-scope com-button--hollow" ng-class="class" ng-click=";click();"
                 title="进项数据重新处理(再学习过程)" ui-button="" btn-type="hollow" btn-click="robotLearnInputDetail()"
                 ng-show="canOperate">
              <ng-transclude><span class="ng-scope"> 重新学习 </span></ng-transclude>
            </div>
            <div class="com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                 ng-click="downloadInvoicesTemplate() ;click();" ui-button="" btn-type="hollow">
              <ng-transclude><span class="ng-scope">下载模板</span></ng-transclude>
            </div>
            <div class="upload com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                 ng-click=";click();" title="进项清单(限xls/xlsx格式)" ui-button="" btn-type="hollow" ng-show="canOperate">
              <ng-transclude><label for="uploadIvat" class="ng-scope">上传</label></ng-transclude>
            </div>
            <input id="uploadIvat" type="file" accept=".xls,.xlsx" file-model="" keep-file="false">
            <div class="button deleteIcon icon-30 g-icon-delete-multi ng-hide" title="删除所有数据"
                 ng-show="canDeleteIvat" ng-click="delete()"></div>
          </header>
          <section ng-show="hasIvat" class="ng-hide">
            <div class="invoiceTitle">
              <div ng-show="hasQuerying" class="list--querying ng-hide">数据查询中，预计凭证5分钟后生成。</div>
              <div ng-show="!hasQuerying" class="list--queryed">数据查询完成，凭证已自动生成。</div>
            </div>
            <div class="tableTitle"><p class="col-time-invoice">发票号码</p>
              <p class="col-payer">销售单位</p>
              <p class="col-item">商品摘要</p>
              <p class="col-sum-invoice">金额</p>
              <p class="col-taxRate">税率</p>
              <p class="col-tax">税额</p>
              <p class="col-taxTotal">含税价</p>
              <p class="col-invoice">发票</p></div>
            <div class="tableContent ps-container ps-theme-default" scroll="" scroll-behavior="top"
                 data-ps-id="76a5340d-07c6-8edf-19ce-1e88e9d96c44"> <!-- ngRepeat: entry in ivatInfo.resources -->
              <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
              </div>
              <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
              </div>
            </div>
            <div class="tableFooter">
              <div class="tableRow"><p class="col-time-invoice">合计：</p>
                <p class="col-payer">-</p>
                <p class="col-item">-</p>
                <p class="col-sum-invoice ng-binding" title="0.00">0.00</p>
                <p class="col-taxRate">-</p>
                <p class="col-tax ng-binding" title="0.00">0.00</p>
                <p class="col-taxTotal ng-binding" title="0.00">0.00</p>
                <p class="col-invoice">-</p></div>
            </div>
          </section>
        </div>
        <div class="frame_page frame_page--wrapper ds-fee ng-isolate-scope ng-hide" ng-show="on"
             ui-data-source-fee="" by="menuTool.currentMenu.type">
          <header>
            <div class="title">报销费用&nbsp;</div>
            <div class="button refresh icon-30 g-icon-refresh" ng-click="refresh()" title="刷新数据"></div>
            <div class="flex-polyfill"></div>
            <div class="com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                 ng-click="downloadTemplate() ;click();" ui-button="" btn-type="hollow">
              <ng-transclude><span class="ng-scope">下载模板</span></ng-transclude>
            </div>
            <div class="upload com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                 ng-click=";click();" ui-button="" btn-type="hollow" title="报销费用单(限xls/xlsx格式)"
                 ng-show="canOperate">
              <ng-transclude><label for="uploadFee" class="ng-scope">上传</label></ng-transclude>
            </div>
            <input id="uploadFee" type="file" accept=".xls,.xlsx" file-model="" keep-file="false"></header>
          <section scroll="" scroll-behavior="top" ng-show="hasFee" class="ps-container ps-theme-default ng-hide"
                   data-ps-id="cf11e607-a96b-fd24-02fe-87d3da30da96">
            <div class="invoiceTitle">
              <div class="flex-polyfill"></div>
              <div class="button deleteIcon icon-30 g-icon-delete-multi ng-hide" title="删除所有数据"
                   ng-show="canDeleteFee" ng-click="delete()"></div>
              <div class="button download g-icon-download icon-30" title="下载报销费用单"
                   ng-click="download(feeInfo.src)"></div>
            </div>
            <div class="tableTitle"><p class="col-summary">摘要</p>
              <p class="col-subject">入账科目</p>
              <p class="col-type">类别</p>
              <p class="col-money">金额</p>
              <p class="col-payment">支付方式</p>
              <p class="col-name">报销人</p>
              <p class="col-remark">备注</p></div>
            <div class="tableContent"> <!-- ngRepeat: entry in feeInfo.items --> </div>
            <div class="tableFooter">
              <div class="tableRow"><p class="col-summary">合计：</p>
                <p class="col-subject">-</p>
                <p class="col-type">-</p>
                <p class="col-money ng-binding" title=""></p>
                <p class="col-payment">-</p>
                <p class="col-name">-</p>
                <p class="col-remark">-</p></div>
            </div>
            <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
              <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
            </div>
            <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
              <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
            </div>
          </section>
        </div>
        <div class="frame_page"></div>
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

<style>

</style>
