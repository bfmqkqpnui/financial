<template>
  <div>
    <ui-view class="ng-scope">
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
        <aside class="site-aside anime" ng-class="{'site-aside--shrink': isShrinked}">
          <div class="site-aside_logoBox icon-logo" ng-class="logo">
            <span>财税通</span>
            <div class="aside_flipper" ng-class="{'aside_flipper--flip': isShrinked}" ng-click="switchShrinked()">
              <div class="flipper anime"></div>
            </div>
            <div class="asite_group" ng-class="userGroupIcon"></div>
          </div>
          <div class="site-aside_menuBox ps-container ps-theme-default" scroll=""
               data-ps-id="de3f4491-8f0a-0ec7-abc2-903474880cd9">
            <div class="com-navMenu ng-isolate-scope" menu-tag="isShrinked"> <!-- ngRepeat: menu in menus -->
              <div
                class="com-navMenu_menu anime ng-scope com-navMenu_menu--expand com-navMenu_menu--1"
                ng-repeat="menu in menus" ng-class="getStatus(menu)" ng-click="navTo(menu)">
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








              <!-- end ngRepeat: menu in menus -->
              <div class="com-navMenu_menu anime ng-scope com-navMenu_menu--0" ng-repeat="menu in menus"
                   ng-class="getStatus(menu)" ng-click="navTo(menu)">
                <div class="menu_icon menu_icon--vouchers" ng-class="getIcon(menu)"></div>
                <div class="menu_name ng-binding">凭证列表</div>
                <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">凭证列表</p></div>
              <!-- end ngRepeat: menu in menus -->
              <div class="com-navMenu_menu anime ng-scope com-navMenu_menu--0" ng-repeat="menu in menus"
                   ng-class="getStatus(menu)" ng-click="navTo(menu)">
                <div class="menu_icon menu_icon--books" ng-class="getIcon(menu)"></div>
                <div class="menu_name ng-binding">会计账簿</div>
                <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">会计账簿</p></div>
              <!-- end ngRepeat: menu in menus -->
              <div class="com-navMenu_menu anime ng-scope com-navMenu_menu--0" ng-repeat="menu in menus"
                   ng-class="getStatus(menu)" ng-click="navTo(menu)">
                <div class="menu_icon menu_icon--sheets" ng-class="getIcon(menu)"></div>
                <div class="menu_name ng-binding">财务报表</div>
                <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">财务报表</p></div>
              <!-- end ngRepeat: menu in menus -->
              <div class="com-navMenu_menu anime ng-scope com-navMenu_menu--0" ng-repeat="menu in menus"
                   ng-class="getStatus(menu)" ng-click="navTo(menu)">
                <div class="menu_icon menu_icon--setting" ng-class="getIcon(menu)"></div>
                <div class="menu_name ng-binding">账套设置</div>
                <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">账套设置</p></div>
              <!-- end ngRepeat: menu in menus -->
              <div class="com-navMenu_menu anime ng-scope com-navMenu_menu--0" ng-repeat="menu in menus"
                   ng-class="getStatus(menu)" ng-click="navTo(menu)">
                <div class="menu_icon menu_icon--bind" ng-class="getIcon(menu)"></div>
                <div class="menu_name ng-binding">凭证打印</div>
                <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">凭证打印</p></div>
              <!-- end ngRepeat: menu in menus -->
              <div class="com-navMenu_menu anime ng-scope com-navMenu_menu--0" ng-repeat="menu in menus"
                   ng-class="getStatus(menu)" ng-click="navTo(menu)">
                <div class="menu_icon menu_icon--histories" ng-class="getIcon(menu)"></div>
                <div class="menu_name ng-binding">历史数据</div>
                <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">历史数据</p></div>
              <!-- end ngRepeat: menu in menus -->
              <div class="com-navMenu_menu anime ng-scope com-navMenu_menu--0" ng-repeat="menu in menus"
                   ng-class="getStatus(menu)" ng-click="navTo(menu)">
                <div class="menu_icon menu_icon--automation" ng-class="getIcon(menu)"></div>
                <div class="menu_name ng-binding">自动配置</div>
                <p class="menu_tag anime ng-binding ng-hide" ng-show="menuTag">自动配置</p></div>
              <!-- end ngRepeat: menu in menus --> </div>
            <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
              <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
            </div>
            <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
              <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
            </div>
          </div>
          <div class="site-aside_opBox">
            <div class="opBox" ng-click="editUserInfo()">
              <div class="opBox_icon anime icon-user"></div>
              <div class="opBox_name anime ng-binding">菟子</div>
              <div class="opBox_tag anime ng-hide" ng-show="isShrinked">编辑用户信息</div>
            </div>
            <div class="opBox opBox--logout" ng-click="logout()">
              <div class="opBox_icon anime icon-logout"></div>
              <div class="opBox_name anime">退出</div>
              <div class="opBox_tag anime ng-hide" ng-show="isShrinked">退出</div>
            </div>
          </div>
          <div class="button site-aside_help" title="帮助中心" ng-show="!isShrinked" ng-click="help($event)"></div>
        </aside> <!-- uiView: -->
        <section class="site-content ng-scope" ui-view="">
          <add-account-pop class="ng-scope">
            <div class="site-mask anime" ng-class="{'site-mask--shade': show.addAccountPop}">
              <div class="site-popup anime pop-container" ng-class="{'site-popup--expand': show.addAccountPop}"><p>
                添加账套</p>
                <div class="btn-closePop" title="关闭" ng-click="closeAddAccPop()"></div>
                <div class="messageBox">
                  <div class="message-title">企业名称</div>
                  <div class="message-input"><input type="text" id="accAddName" ng-change="emptyKeyWord()"
                                                    ng-model="submitAddAccInfo.name" maxlength="30"
                                                    ng-keydown="keyDown($event, 'submitAddAcc')"
                                                    ng-click="selectAllSize('accAddName')"
                                                    class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
                    <div class="icon-required"></div>
                  </div>
                </div>
                <div class="messageBox">
                  <div class="message-title">联&nbsp;系&nbsp;人</div>
                  <div class="message-input"><input type="text" id="accAddContact" ng-change="emptyKeyWord()"
                                                    ng-model="submitAddAccInfo.contact" maxlength="20"
                                                    ng-keydown="keyDown($event, 'submitAddAcc')"
                                                    ng-click="selectAllSize('accAddContact')"
                                                    class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
                  </div>
                </div>
                <div class="messageBox">
                  <div class="message-title">联系电话</div>
                  <div class="message-input"><input type="text" id="accAddPhone" ng-change="emptyKeyWord()"
                                                    ng-model="submitAddAccInfo.phone" maxlength="11"
                                                    ng-keydown="keyDown($event, 'submitAddAcc')"
                                                    ng-click="selectAllSize('accAddPhone')"
                                                    class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
                  </div>
                </div>
                <div class="messageBox ng-hide" ng-show="showAccInfo()">
                  <div class="message-title">所属客户</div>
                  <div class="message-input"><select ng-model="submitAddAccInfo.ac" ng-change="emptyKeyWord()"
                                                     ng-options="one.name for one in optionInfo.adminList"
                                                     class="ng-pristine ng-untouched ng-valid ng-empty">
                    <option value="?" selected="selected"></option>
                  </select>
                    <div class="icon-required"></div>
                  </div>
                </div>
                <div class="messageBox">
                  <div class="message-title">初始账期</div>
                  <div class="message-input">
                    <div class="accAddInitIssueBox-select ng-binding" ng-click="showIssue = true">
                      <div class="com-issue ng-isolate-scope" ui-issue="" i-link-system="false" i-show-title="false"
                           i-picked="submitAddAccInfo.initIssue" i-show="showIssue">
                        <div class="com-issue_display ng-hide" ng-show="iShowTitle === 'true'" ng-click="showPicker()">
                          <div class="display_icon icon-40"></div>
                          <div class="display_tag ng-binding">2049-12期</div>
                        </div>
                        <div class="com-issue_container anime com-issue_container--hidden"
                             ng-class="{'com-issue_container--hidden': !show}">
                          <div click-test="" listen="clicktest" onmouselost="hidePicker()" class="ng-isolate-scope"
                               rowofumn="">
                            <div class="year">
                              <div class="year_btn--last" ng-show="isLastYearValid()" ng-click="lastYear()"></div>
                              <div class="year_tag ng-binding">2049</div>
                              <div class="year_btn--next ng-hide" ng-show="isNextYearValid()"
                                   ng-click="nextYear()"></div>
                            </div>
                            <div class="month"> <!-- ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
                              <div class="month_box anime ng-binding ng-scope month_box--valid" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 1
                              </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
                              <div class="month_box anime ng-binding ng-scope month_box--valid" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 2
                              </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
                              <div class="month_box anime ng-binding ng-scope month_box--valid" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 3
                              </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
                              <div class="month_box anime ng-binding ng-scope month_box--valid" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 4
                              </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
                              <div class="month_box anime ng-binding ng-scope month_box--valid" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 5
                              </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
                              <div class="month_box anime ng-binding ng-scope month_box--valid" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 6
                              </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
                              <div class="month_box anime ng-binding ng-scope month_box--valid" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 7
                              </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
                              <div class="month_box anime ng-binding ng-scope month_box--valid" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 8
                              </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
                              <div class="month_box anime ng-binding ng-scope month_box--valid" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 9
                              </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
                              <div class="month_box anime ng-binding ng-scope month_box--valid" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 10
                              </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
                              <div class="month_box anime ng-binding ng-scope month_box--valid" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 11
                              </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
                              <div class="month_box anime ng-binding ng-scope month_box--valid month_box--focus"
                                   ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 12
                              </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] --> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="messageBox">
                  <div class="message-title">纳税类型</div>
                  <div class="message-input"><select ng-model="submitAddAccInfo.taxpayerType"
                                                     ng-change="changeTaxpayerType()"
                                                     ng-options="tax for tax in optionInfo.addTax"
                                                     class="ng-pristine ng-untouched ng-valid ng-empty">
                    <option value="?" selected="selected"></option>
                    <option label="一般纳税人" value="string:一般纳税人">一般纳税人</option>
                    <option label="小规模纳税人" value="string:小规模纳税人">小规模纳税人</option>
                    <option label="个人独资企业或有限合伙" value="string:个人独资企业或有限合伙">个人独资企业或有限合伙</option>
                  </select></div>
                </div>
                <div class="messageBox">
                  <div class="message-title">纳税周期</div>
                  <div class="message-input"> <!-- ngRepeat: r in optionInfo.taxPeriod -->
                    <div class="popSelectBox ng-binding ng-scope" ng-repeat="r in optionInfo.taxPeriod"
                         ng-click="selectRoleType(r)">
                      <div ng-class="submitAddAccInfo.taxPeriod == r
                    ? 'icon-select-radio-on' : 'icon-select-radio-off'" class="icon-select-radio-off"></div>
                      季报
                    </div><!-- end ngRepeat: r in optionInfo.taxPeriod -->
                    <div class="popSelectBox ng-binding ng-scope" ng-repeat="r in optionInfo.taxPeriod"
                         ng-click="selectRoleType(r)">
                      <div ng-class="submitAddAccInfo.taxPeriod == r
                    ? 'icon-select-radio-on' : 'icon-select-radio-off'" class="icon-select-radio-off"></div>
                      月报
                    </div><!-- end ngRepeat: r in optionInfo.taxPeriod --> </div>
                </div>
                <div class="messageBox submitBox">
                  <div class="message-title">
                    <div class="btn-cancel" ng-click="closeAddAccPop()">取消</div>
                  </div>
                  <div class="message-input">
                    <div class="btn-submit anime" ng-click="submitAddAcc()">确定</div>
                    <div class="size-hint ng-binding ng-hide" ng-show="show.hint"></div>
                  </div>
                </div>
                <div class="batchGuide">
                  <div ng-click="showBatchPop()">批量导入账套</div>
                </div>
              </div>
            </div>
          </add-account-pop>
          <batch-account-pop class="ng-scope">
            <div class="site-mask anime" ng-class="{'site-mask--shade': show.batchAccountPop}">
              <div class="site-popup anime pop-container batchPop"
                   ng-class="{'site-popup--expand': show.batchAccountPop}"><p>批量添加账套</p>
                <div class="messageBox batchImport ng-hide" ng-show="showAccInfo()">
                  <div class="message-title">上传文件</div>
                  <div class="message-input"> <!-- ngIf: fileOn -->
                    <div class="btn-file anime ng-binding">上传excel文件</div>
                    <div class="icon-fileOn ng-hide" ng-show="submitBatchAccInfo.file"></div>
                    <div class="icon-required"></div>
                  </div>
                </div>
                <div class="messageBox ng-hide" ng-show="showAccInfo()">
                  <div class="message-title">所属客户</div>
                  <div class="message-input"><select ng-model="submitBatchAccInfo.ac" placeholder="请选择所属客户"
                                                     ng-change="emptyKeyWord()"
                                                     ng-options="one.name for one in optionInfo.adminList"
                                                     class="ng-pristine ng-untouched ng-valid ng-empty">
                    <option value="?" selected="selected"></option>
                  </select>
                    <div class="icon-required"></div>
                    <p class="batchMsg">批量建账可能需要较长时间，请耐心等待</p></div>
                </div>
                <div class="messageBox submitBox">
                  <div class="message-title">
                    <div class="btn-cancel" ng-click="closeBatchAccPop()">取消</div>
                  </div>
                  <div class="message-input">
                    <div class="btn-submit anime" ng-click="submitBatchAcc()">确定</div>
                    <div class="size-hint ng-binding ng-hide" ng-show="show.hint"></div>
                  </div>
                </div>
                <div class="batchGuide">
                  <div ng-click="downBatchTemplate()">下载excel模板</div>
                </div>
              </div>
            </div>
          </batch-account-pop>
          <acc-next-operate class="ng-scope">
            <div class="site-mask anime" ng-class="{'site-mask--shade': show.nextOperatePop}">
              <div class="site-popup anime pop-container" ng-class="{'site-popup--expand': show.nextOperatePop}"><p>
                添加成功</p>
                <div class="btn-closePop" title="关闭" ng-click="closeAddAccPop()"></div>
                <br>
                <div class="btn-go-import anime" ng-click="nextOperate('import')"> 导入报表</div>
                <div class="btn-go-account anime" ng-click="nextOperate('account')"> 去做账</div>
                <div class="btn-go-on anime" ng-click="nextOperate('on')"> 继续添加</div>
              </div>
            </div>
          </acc-next-operate>
          <acc-send-message class="ng-scope">
            <div class="site-mask anime" ng-class="{'site-mask--shade': show.sendMessage}">
              <div class="site-popup pop-container anime accSendMessageBox"
                   ng-class="{'site-popup--expand': show.sendMessage}">
                <div class="btn-closePop" title="关闭" ng-click="closeAddAccPop()"></div>
                <div class="acc-sendMessage-container">
                  <div class="sendMessageBox-left"> <!-- ngRepeat: menu in sendInfo.menu -->
                    <div ng-repeat="menu in sendInfo.menu"
                         ng-class="menu == sendInfo.type ? 'checkMenuView-on' : 'checkMenuView-off'"
                         ng-click="showMenuNav(menu)" class="ng-binding ng-scope checkMenuView-on"> 发送信息
                    </div><!-- end ngRepeat: menu in sendInfo.menu -->
                    <div ng-repeat="menu in sendInfo.menu"
                         ng-class="menu == sendInfo.type ? 'checkMenuView-on' : 'checkMenuView-off'"
                         ng-click="showMenuNav(menu)" class="ng-binding ng-scope checkMenuView-off"> 历史消息
                    </div><!-- end ngRepeat: menu in sendInfo.menu --> </div>
                  <div class="sendMessageBox-right" ng-show="sendInfo.type == '发送信息'">
                    <div class="sendMessage-listBox">
                      <div class="coListBox">
                        <div class="coList-search">
                          <div class="search-selectAll ng-binding" ng-click="selectAllToggle()"> 全选</div>
                          <div class="search-keyWord"><input type="text" ng-model="search.sendListKeyWord"
                                                             placeholder="搜索公司"
                                                             class="ng-pristine ng-untouched ng-valid ng-empty">
                            <div class="icon-clearSearchInfo ng-hide" ng-click="emptyKeyWord()" title="清空关键字"
                                 ng-show="search.sendListKeyWord"></div>
                          </div>
                        </div>
                        <div class="coList-list ps-container ps-theme-default" id="coListBox"
                             data-ps-id="7b2ff6f0-cd1d-db9b-abc5-8baa10a4d493">
                          <!-- ngRepeat: co in accountsInfo.list | filter: search.sendListKeyWord -->
                          <div class="companyBox ng-scope" title="天机"
                               ng-repeat="co in accountsInfo.list | filter: search.sendListKeyWord"
                               ng-click="sendToggle(co)">
                            <div class="number ng-binding" ng-class="sendInfo.selectMap[co._id] ? 'isSelectColor' : ''">
                              1
                            </div>
                            <div class="companyName ng-binding">天机</div>
                          </div><!-- end ngRepeat: co in accountsInfo.list | filter: search.sendListKeyWord -->
                          <div class="companyBox ng-scope" title="天柃"
                               ng-repeat="co in accountsInfo.list | filter: search.sendListKeyWord"
                               ng-click="sendToggle(co)">
                            <div class="number ng-binding" ng-class="sendInfo.selectMap[co._id] ? 'isSelectColor' : ''">
                              2
                            </div>
                            <div class="companyName ng-binding">天柃</div>
                          </div><!-- end ngRepeat: co in accountsInfo.list | filter: search.sendListKeyWord -->
                          <div class="companyBox ng-scope" title="123"
                               ng-repeat="co in accountsInfo.list | filter: search.sendListKeyWord"
                               ng-click="sendToggle(co)">
                            <div class="number ng-binding" ng-class="sendInfo.selectMap[co._id] ? 'isSelectColor' : ''">
                              3
                            </div>
                            <div class="companyName ng-binding">123</div>
                          </div><!-- end ngRepeat: co in accountsInfo.list | filter: search.sendListKeyWord -->
                          <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                            <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                          </div>
                          <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                            <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="sendMessage-infoBox">
                      <div class="messageNameBox">
                        <div class="title">消息名称</div>
                        <div class="messageInfoBox"><input type="text" ng-model="sendInfo.model.title"
                                                           disabled="disabled"
                                                           class="ng-pristine ng-untouched ng-valid ng-not-empty"></div>
                      </div>
                      <div class="messageTemplateBox">
                        <div class="title">消息模板</div>
                        <div class="messageInfoBox"><select ng-model="sendInfo.model" ng-change="changeTemplate()"
                                                            ng-options="t.title for t in sendInfo.template"
                                                            class="ng-pristine ng-untouched ng-valid ng-not-empty">
                          <option label="请选择模板" value="object:401" selected="selected">请选择模板</option>
                          <option label="票据提醒" value="object:402">票据提醒</option>
                          <option label="抄税提醒" value="object:403">抄税提醒</option>
                          <option label="清卡提醒" value="object:404">清卡提醒</option>
                          <option label="进项票认证提醒" value="object:405">进项票认证提醒</option>
                          <option label="税金提醒" value="object:406">税金提醒</option>
                          <option label="其他提醒" value="object:407">其他提醒</option>
                        </select></div>
                      </div>
                      <div class="messageObjBox">
                        <div class="title">发送对象</div>
                        <div class="messageInfoBox ps-container ps-theme-default" id="selectCoNameBox"
                             data-ps-id="83139aae-5579-8e6c-c972-246cb2544806">
                          <!-- ngRepeat: (key, value) in sendInfo.selectMap -->
                          <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                            <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                          </div>
                          <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                            <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                          </div>
                        </div>
                      </div>
                      <div class="messageSizeBox">
                        <div class="title">消息内容</div>
                        <div class="messageInfoBox"><textarea
                          class="messageTextarea ng-pristine ng-untouched ng-valid ng-empty" ng-change="emptyKeyWord()"
                          ng-model="sendInfo.content"></textarea></div>
                      </div>
                      <div class="messageSubmitBox">
                        <div class="title"></div>
                        <div class="messageInfoBox">
                          <div class="btn-submitMessage anime" ng-click="submitMessage()"> 发送
                            <div class="messageHint ng-binding ng-hide" ng-show="show.hint"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="sendMessageBox-right historyInfoBox ng-hide" ng-show="sendInfo.type == '历史消息'">
                    <div class="historyTabHead">
                      <div class="tabHeadBox">
                        <div class="span-5">序号</div>
                        <div class="span-15">发送时间</div>
                        <div class="span-10">消息名称</div>
                        <div class="span-15">发送对象</div>
                        <div class="span-25">消息内容</div>
                        <div class="span-10">发送人</div>
                        <div class="span-20">状态</div>
                      </div>
                    </div>
                    <div class="historyTabBody ps-container ps-theme-default" id="historyTabBody"
                         data-ps-id="eef34a70-3858-637c-a4a4-0cfe1fd6104e"> <!-- ngRepeat: h in sendInfo.history -->
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
          </acc-send-message>
          <div class="site-mask anime ng-scope ng-isolate-scope" ng-class="{'site-mask--shade': on}">
            <div class="site-mask anime popup-bn ng-isolate-scope" ng-class="{'site-mask--shade': show}" by="fscEditor">
              <div class="site-popup anime popup-bn_container flex--column" ng-class="{'site-popup--expand': show}">
                <div class="site-popup_head">
                  <div class="site-popup_title">小君提醒您：</div>
                </div>
                <div class="site-popup_body"><input type="text" placeholder="请补充上传银行账号后四位数字" ng-model="num"
                                                    ng-change="test()"
                                                    class="ng-pristine ng-untouched ng-valid ng-empty">
                  <p class="ng-binding"></p></div>
                <div class="site-popup_footer">
                  <div class="btn--cancel com-button anime ng-isolate-scope com-button--cancel" ng-class="class"
                       ng-click=";click();" ui-button="" btn-type="cancel" btn-click="cancel()">
                    <ng-transclude><span class="ng-scope">取消</span></ng-transclude>
                  </div>
                  <div class="btn--ok com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                       ng-click=";click();" ui-button="" btn-click="ok()">
                    <ng-transclude><span class="ng-scope">确定</span></ng-transclude>
                  </div>
                </div>
              </div>
            </div>
            <div class="site-mask anime ng-isolate-scope" ng-class="{'site-mask--shade': on}">
              <div class="site-popup anime popup-banklist flex--column" ng-class="{'site-popup--expand': on}">
                <div class="site-popup_head">
                  <div class="site-popup_title">小君提醒您：</div>
                </div>
                <div class="site-popup_body"><p class="label">请选择对应的银行账号</p>
                  <div class="ui-select ng-isolate-scope" options="banklist" title="title" current="selectedBank">
                    <div class="select-title" ng-click="expand()"><p class="name ng-binding ng-hide" ng-show="mask"></p>
                      <p class="name ng-binding" ng-hide="mask"></p> <i class="icon anime"
                                                                        ng-class="{'icon--revert': showOptions}"></i>
                    </div>
                    <div class="select-list anime ng-isolate-scope ps-container ps-theme-default"
                         ng-class="{'select-list--expand': showOptions}" scroll="" click-test="" listen="showOptions"
                         onmouselost="hide()" data-ps-id="472c224c-f39e-7712-8501-4cba01ac956b" luhugrxn="">
                      <!-- ngRepeat: option in options -->
                      <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                        <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                      </div>
                      <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                        <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="site-popup_footer">
                  <div class="btn--cancel com-button anime ng-isolate-scope com-button--cancel" ng-class="class"
                       ng-click=";click();" ui-button="" btn-type="cancel" btn-click="close()">
                    <ng-transclude><span class="ng-scope">取消</span></ng-transclude>
                  </div>
                  <div class="btn--ok com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                       ng-click=";click();" ui-button="" btn-click="ok()">
                    <ng-transclude><span class="ng-scope">确定</span></ng-transclude>
                  </div>
                </div>
              </div>
            </div>
            <div windowize="" class="site-popup anime popup-fscEditor flex--column ng-isolate-scope"
                 ng-class="{'site-popup--expand': on}" qeuypvlw=""
                 style="transform-style: preserve-3d; transition: all 50ms ease 0s;">
              <div class="site-popup_head"><h3>文件平台</h3> <h6 class="ng-binding">， 期</h6>
                <div class="site-popup_close g-icon-close" ng-click="close()"></div>
              </div>
              <section>
                <div class="section-title ng-hide" ng-hide="lock"><p>查看类型：</p>
                  <div class="ui-select ng-isolate-scope" options="filteredCategories" title="title"
                       current="filteredCategory">
                    <div class="select-title" ng-click="expand()"><p class="name ng-binding ng-hide" ng-show="mask"></p>
                      <p class="name ng-binding" ng-hide="mask">所有类型</p> <i class="icon anime"
                                                                            ng-class="{'icon--revert': showOptions}"></i>
                    </div>
                    <div class="select-list anime ng-isolate-scope ps-container ps-theme-default"
                         ng-class="{'select-list--expand': showOptions}" scroll="" click-test="" listen="showOptions"
                         onmouselost="hide()" data-ps-id="6ead84e4-e18e-e6ea-0e85-a830b8ad5d85" hmdrgwam="">
                      <!-- ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                             ng-repeat="option in options" ng-click="select(option)"
                                                             title="所有类型">所有类型</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="银行流水">银行流水</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="银行回单">银行回单</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="销项发票清单">销项发票清单</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="电子发票">电子发票</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="进项发票清单">进项发票清单</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="报销费用">报销费用</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="工资单">工资单</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="其他">其他</p>
                      <!-- end ngRepeat: option in options -->
                      <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                        <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                      </div>
                      <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                        <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                      </div>
                    </div>
                  </div>
                  <div class="flex-gap"></div>
                  <div class="com-button anime ng-isolate-scope com-button--ok ng-hide" ng-class="class"
                       ng-click="multiPost() ;click();" ng-show="canMultiPost">
                    <ng-transclude><span class="ng-scope">全部入账</span></ng-transclude>
                  </div>
                  <div class="ui-select ng-isolate-scope" options="selectableCategories" mask="选择上传类型" title="title"
                       current="selectedCategory" onselected="onupload()">
                    <div class="select-title" ng-click="expand()"><p class="name ng-binding" ng-show="mask">选择上传类型</p>
                      <p class="name ng-binding ng-hide" ng-hide="mask">银行流水</p> <i class="icon anime"
                                                                                    ng-class="{'icon--revert': showOptions}"></i>
                    </div>
                    <div class="select-list anime ng-isolate-scope ps-container ps-theme-default"
                         ng-class="{'select-list--expand': showOptions}" scroll="" click-test="" listen="showOptions"
                         onmouselost="hide()" data-ps-id="b2f35cc2-5534-9fb3-7bbd-372ee245bba8" qmfhcimi="">
                      <!-- ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                             ng-repeat="option in options" ng-click="select(option)"
                                                             title="银行流水">银行流水</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="银行回单">银行回单</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="销项发票清单">销项发票清单</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="电子发票">电子发票</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="进项发票清单">进项发票清单</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="报销费用">报销费用</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="工资单">工资单</p>
                      <!-- end ngRepeat: option in options --><p class="option anime ng-binding ng-scope"
                                                                 ng-repeat="option in options" ng-click="select(option)"
                                                                 title="其他">其他</p>
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
                <div class="section-content">
                  <div class="file-list ps-container ps-theme-default" scroll="" scroll-behavior="bottom"
                       data-ps-id="b9d0d834-c702-c982-e634-0ed702bdf506"> <!-- ngRepeat: file in filteredFiles --> <p
                    class="file-placeholder ng-binding" ng-hide="hasFile"></p>
                    <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                      <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                    </div>
                    <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                      <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                    </div>
                  </div>
                  <input id="fscfile" type="file" multiple="multiple" file-model="" keep-file="false"></div>
              </section>
            </div>
          </div>
          <div class="site-mask anime ng-scope ng-isolate-scope" ng-class="{'site-mask--shade': on}">
            <div windowize="" class="site-popup anime popup-accTpl flex--column ng-isolate-scope"
                 ng-class="{'site-popup--expand': on}" lkxgysns=""
                 style="transform-style: preserve-3d; transition: all 50ms ease 0s;">
              <div class="site-popup_head"><h3>文件模板下载</h3>
                <div class="site-popup_close g-icon-close" ng-click="close()"></div>
              </div>
              <section>
                <div class="box" ng-click="download('库存模块入库单模板')">
                  <div class="shade icon--cgshd"></div>
                  <div class="name">入库单</div>
                </div>
                <div class="box" ng-click="download('库存模块出库单模板')">
                  <div class="shade icon--ckd"></div>
                  <div class="name">出库单</div>
                </div>
                <div class="box" ng-click="download('报销费用模板')">
                  <div class="shade icon--bxfy"></div>
                  <div class="name">报销费用</div>
                </div>
                <div class="box" ng-click="download('工资表模板')">
                  <div class="shade icon--gzd"></div>
                  <div class="name">工资单</div>
                </div>
                <div class="lineBreak"></div>
              </section>
            </div>
          </div>
          <div class="module-title ng-scope" style="z-index:20">
            <div class="acTitleBox">
              <div class="acTitle-search ng-hide" ng-hide="showSearchNav()">
                <div class="btn-acTitleSearch" ng-click="advanceSearchToggle()">
                  <div class="icon-acTitleSearch"></div>
                  <div class="size-acTitleSearch">高级搜索</div>
                </div>
                <advance-search-pop>
                  <div class="pop-container pop-advancedSearch target anime ng-isolate-scope ng-hide"
                       ng-show="show.advanceSearch" click-test="" listen="show.advanceSearch"
                       onmouselost="closeViewWin()" dboyrnjc=""> <!-- ngIf: showQueryLine('ac') -->
                    <!-- ngIf: showQueryLine('fscAccountant') --> <!-- ngIf: showQueryLine('acAccountant') -->
                    <div class="messageBox">
                      <div class="message-title">纳税类型</div>
                      <div class="message-input"><select ng-model="search.advancedInfo.taxpayerType"
                                                         ng-change="emptyKeyWord()"
                                                         ng-options="x for x in optionInfo.searchTax"
                                                         class="ng-pristine ng-untouched ng-valid ng-empty">
                        <option value="string:" selected="selected"></option>
                        <option label="一般纳税人" value="string:一般纳税人">一般纳税人</option>
                        <option label="小规模纳税人" value="string:小规模纳税人">小规模纳税人</option>
                        <option label="个人独资企业或有限合伙" value="string:个人独资企业或有限合伙">个人独资企业或有限合伙</option>
                      </select></div>
                    </div>
                    <div class="messageBox">
                      <div class="message-title">纳税周期</div>
                      <div class="message-input"><select ng-model="search.advancedInfo.taxPeriod"
                                                         ng-change="emptyKeyWord()"
                                                         ng-options="x for x in optionInfo.searchTaxPeriod"
                                                         class="ng-pristine ng-untouched ng-valid ng-empty">
                        <option value="string:" selected="selected"></option>
                        <option label="季报" value="string:季报">季报</option>
                        <option label="月报" value="string:月报">月报</option>
                      </select></div>
                    </div>
                    <div class="messageBox">
                      <div class="message-title">企业名称</div>
                      <div class="message-input"><input type="text" ng-model="search.advancedInfo.name"
                                                        ng-change="emptyKeyWord()"
                                                        ng-keydown="keyDown($event, 'submitSearch')"
                                                        class="ng-pristine ng-untouched ng-valid ng-empty"></div>
                    </div>
                    <div class="messageBox">
                      <div class="message-title">自动做账</div>
                      <div class="message-input">
                        <div class="popSelectBox" ng-click="selectZeroDeclaration()">
                          <div ng-class="search.advancedInfo.automaticType
            ? 'icon-select-radio-on' : 'icon-select-radio-off'" class="icon-select-radio-off"></div>
                        </div>
                      </div>
                    </div>
                    <div class="messageBox">
                      <div class="message-title">工业特殊行业</div>
                      <div class="message-input">
                        <div class="popSelectBox" ng-click="selectSpecialIndustry()">
                          <div ng-class="search.advancedInfo.isSpecialIndustry
            ? 'icon-select-radio-on' : 'icon-select-radio-off'" class="icon-select-radio-off"></div>
                        </div>
                      </div>
                    </div>
                    <div class="messageBox submitBox">
                      <div class="message-title">
                        <div class="btn-cancel" ng-click="cancelSearch()">取消</div>
                      </div>
                      <div class="message-input">
                        <div class="btn-submit anime" ng-click="submitSearch()">确定</div>
                        <div class="size-hint ng-binding ng-hide" ng-show="show.hint != ''"></div>
                      </div>
                    </div>
                  </div>
                </advance-search-pop>
              </div>
              <div class="acTitle-search anime" ng-show="showSearchNav()">
                <div class="btn-acTitleSearch">
                  <div class="icon-acTitleSearch" ng-click="focus('searchCommonKeyWord')"></div>
                  <input type="text" class="anime ng-pristine ng-untouched ng-valid ng-empty" placeholder="搜索"
                         id="searchCommonKeyWord" ng-class="search.commonKeyWord ? 'valueIsNotNull' : ''"
                         ng-model="search.commonKeyWord" ng-change="changeCommonKey()">
                  <div class="icon-clearSearchInfo ng-hide" ng-click="emptyKeyWord()" title="清空关键字"
                       ng-show="search.commonKeyWord"></div>
                </div>
              </div>
              <div class="acTitle-detailInfo">
                <div class="detailInfoBox ng-binding"
                     ng-show="!search.commonKeyWord &amp;&amp; !showAdvancedSearchInfo()"> 系统账期 2018-08 ; 账套总数 3 家
                </div>
                <div class="searchInfoBox ng-binding ng-hide" ng-hide="!showAdvancedSearchInfo()"> 搜索 “” , 账套总数 3 家
                  <span class="size-clearSearchInfo" ng-click="cancelSearch()"> 清除</span></div>
              </div>
              <div class="acTitle-right">
                <div class="icon-messageBtn anime ng-hide"
                     ng-show="(user.type === 'acMgr' || user.type === 'acCommon' || user.type === 'mgr' || user.type === 'common')"
                     ng-click="showSendMessage()" title="发送消息"></div>
                <div class="icon-chartBtn anime" ng-click="chartsToggle()" title="统计图表"></div>
              </div>
            </div>
          </div>
          <div class="module-content ng-scope">
            <acc-chart>
              <div class="accChart-mask anime ng-hide" ng-show="show.charts"></div>
              <div class="accChartBox anime ng-isolate-scope ng-hide" ng-show="show.charts" click-test=""
                   listen="show.charts" onmouselost="closeViewWin()" latuzkyf=""><p class="accChart-title">账套状态比例图</p>
                <p class="accChart-info ng-binding"> 系统账期 2018-08 ; 账套总数 3 家 </p>
                <div class="accChart-chart" ng-show="accountsInfo.sum != 0" id="accChart"></div>
                <div class="accChart-chart chart-0 ng-hide" ng-hide="accountsInfo.sum != 0"></div>
                <div class="accChart-list"> <!-- ngRepeat: data in accountsInfo.chart -->
                  <div ng-repeat="data in accountsInfo.chart" class="stateBox-not">
                    <div class="span-20">
                      <div class="listStyle"></div>
                    </div>
                    <div class="span-20 ng-binding">未开始：</div>
                    <div class="span-30 ng-binding">3 家</div>
                    <div class="span-30"> 占 <span class="percent ng-binding">100 %</span></div>
                  </div><!-- end ngRepeat: data in accountsInfo.chart -->
                  <div ng-repeat="data in accountsInfo.chart" class="stateBox-ing">
                    <div class="span-20">
                      <div class="listStyle"></div>
                    </div>
                    <div class="span-20 ng-binding">做账中：</div>
                    <div class="span-30 ng-binding">0 家</div>
                    <div class="span-30"> 占 <span class="percent ng-binding">0 %</span></div>
                  </div><!-- end ngRepeat: data in accountsInfo.chart -->
                  <div ng-repeat="data in accountsInfo.chart" class="stateBox-isAccounts">
                    <div class="span-20">
                      <div class="listStyle"></div>
                    </div>
                    <div class="span-20 ng-binding">已结账：</div>
                    <div class="span-30 ng-binding">0 家</div>
                    <div class="span-30"> 占 <span class="percent ng-binding">0 %</span></div>
                  </div><!-- end ngRepeat: data in accountsInfo.chart -->
                  <div ng-repeat="data in accountsInfo.chart" class="stateBox-isTax">
                    <div class="span-20">
                      <div class="listStyle"></div>
                    </div>
                    <div class="span-20 ng-binding">已报税：</div>
                    <div class="span-30 ng-binding">0 家</div>
                    <div class="span-30"> 占 <span class="percent ng-binding">0 %</span></div>
                  </div><!-- end ngRepeat: data in accountsInfo.chart --> </div>
              </div>
            </acc-chart>
            <div class="module-content_wrapper">
              <div class="module-content_page">
                <div class="page-title">
                  <div class="accountsTitle-left">
                    <div class="accountsTitle-size">账套列表</div>
                    <div class="btn-refreshList anime" title="刷新" ng-click="updateAccounts()"></div>
                  </div>
                  <div class="accountsTitle-right">
                    <div class="com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                         ng-click="showAddAccPop() ;click();" ui-button="" btn-type="hollow" ng-show="showAddAccBtn()">
                      <ng-transclude><span class="ng-scope">添加账套</span></ng-transclude>
                    </div> <!-- ngIf: canShowTemplates() --> </div>
                </div>
                <div class="page-content">
                  <div class="accountsBody">
                    <div ng-class="'accBody-tableHead-' + tableInfo[user.type].headLines" class="accBody-tableHead-2">
                      <div class="tabHeadBox"> <!-- ngRepeat: title in tableInfo[user.type].head -->
                        <div ng-repeat="title in tableInfo[user.type].head" ng-class="title.span"
                             class="ng-scope span-5">
                          <div ng-show="title.value !== '数据源' &amp;&amp; title.value !== '数据中心'" title=""
                               ng-class="title.path ? 'isOrderBy' : ''" ng-click="orderByValue(title.path)"
                               class="ng-binding"> 序号 <span ng-show="orderBy.order == title.path"
                                                            ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                                            class="ng-hide icon-orderBy-up">▼</span></div>
                          <div class="multiRowBox ng-hide" ng-show="title.value == '数据源'">
                            <div class="multiRow-head">数据源</div>
                            <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel --> </div>
                          </div>
                          <div class="multiRowBox ng-hide" ng-show="title.value == '数据中心'">
                            <div class="multiRow-head">数据中心</div>
                            <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel --> </div>
                          </div>
                        </div><!-- end ngRepeat: title in tableInfo[user.type].head -->
                        <div ng-repeat="title in tableInfo[user.type].head" ng-class="title.span"
                             class="ng-scope span-32">
                          <div ng-show="title.value !== '数据源' &amp;&amp; title.value !== '数据中心'" title="按 账套名称 排序"
                               ng-class="title.path ? 'isOrderBy' : ''" ng-click="orderByValue(title.path)"
                               class="ng-binding isOrderBy"> 账套名称 <span ng-show="orderBy.order == title.path"
                                                                        ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                                                        class="ng-hide icon-orderBy-up">▼</span></div>
                          <div class="multiRowBox ng-hide" ng-show="title.value == '数据源'">
                            <div class="multiRow-head">数据源</div>
                            <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel --> </div>
                          </div>
                          <div class="multiRowBox ng-hide" ng-show="title.value == '数据中心'">
                            <div class="multiRow-head">数据中心</div>
                            <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel --> </div>
                          </div>
                        </div><!-- end ngRepeat: title in tableInfo[user.type].head -->
                        <div ng-repeat="title in tableInfo[user.type].head" ng-class="title.span"
                             class="ng-scope span-10">
                          <div ng-show="title.value !== '数据源' &amp;&amp; title.value !== '数据中心'" title="按 纳税类型 排序"
                               ng-class="title.path ? 'isOrderBy' : ''" ng-click="orderByValue(title.path)"
                               class="ng-binding isOrderBy"> 纳税类型 <span ng-show="orderBy.order == title.path"
                                                                        ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                                                        class="ng-hide icon-orderBy-up">▼</span></div>
                          <div class="multiRowBox ng-hide" ng-show="title.value == '数据源'">
                            <div class="multiRow-head">数据源</div>
                            <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel --> </div>
                          </div>
                          <div class="multiRowBox ng-hide" ng-show="title.value == '数据中心'">
                            <div class="multiRow-head">数据中心</div>
                            <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel --> </div>
                          </div>
                        </div><!-- end ngRepeat: title in tableInfo[user.type].head -->
                        <div ng-repeat="title in tableInfo[user.type].head" ng-class="title.span"
                             class="ng-scope span-30">
                          <div ng-show="title.value !== '数据源' &amp;&amp; title.value !== '数据中心'" title=""
                               ng-class="title.path ? 'isOrderBy' : ''" ng-click="orderByValue(title.path)"
                               class="ng-binding ng-hide"> 数据源 <span ng-show="orderBy.order == title.path"
                                                                     ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                                                     class="ng-hide icon-orderBy-up">▼</span></div>
                          <div class="multiRowBox" ng-show="title.value == '数据源'">
                            <div class="multiRow-head">数据源</div>
                            <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel -->
                              <div ng-repeat="sub in title.subLevel" title="按 开票 排序" ng-class="sub.class"
                                   ng-click="orderByValue(sub.path)" class="ng-binding ng-scope span-33 isOrderBy"> 开票
                                <span ng-show="orderBy.order == sub.path"
                                      ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                      class="ng-hide icon-orderBy-up">▼</span></div>
                              <!-- end ngRepeat: sub in title.subLevel -->
                              <div ng-repeat="sub in title.subLevel" title="按 银行 排序" ng-class="sub.class"
                                   ng-click="orderByValue(sub.path)" class="ng-binding ng-scope span-33 isOrderBy"> 银行
                                <span ng-show="orderBy.order == sub.path"
                                      ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                      class="ng-hide icon-orderBy-up">▼</span></div>
                              <!-- end ngRepeat: sub in title.subLevel -->
                              <div ng-repeat="sub in title.subLevel" title="按 扫描 排序" ng-class="sub.class"
                                   ng-click="orderByValue(sub.path)" class="ng-binding ng-scope span-33 isOrderBy"> 扫描
                                <span ng-show="orderBy.order == sub.path"
                                      ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                      class="ng-hide icon-orderBy-up">▼</span></div>
                              <!-- end ngRepeat: sub in title.subLevel --> </div>
                          </div>
                          <div class="multiRowBox ng-hide" ng-show="title.value == '数据中心'">
                            <div class="multiRow-head">数据中心</div>
                            <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel -->
                              <div ng-repeat="sub in title.subLevel" title="按 开票 排序" ng-click="orderByValue(sub.path)"
                                   ng-class="sub.class" class="ng-binding ng-scope span-33 isOrderBy"> 开票 <span
                                ng-show="orderBy.order == sub.path"
                                ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                class="ng-hide icon-orderBy-up">▼</span></div>
                              <!-- end ngRepeat: sub in title.subLevel -->
                              <div ng-repeat="sub in title.subLevel" title="按 银行 排序" ng-click="orderByValue(sub.path)"
                                   ng-class="sub.class" class="ng-binding ng-scope span-33 isOrderBy"> 银行 <span
                                ng-show="orderBy.order == sub.path"
                                ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                class="ng-hide icon-orderBy-up">▼</span></div>
                              <!-- end ngRepeat: sub in title.subLevel -->
                              <div ng-repeat="sub in title.subLevel" title="按 扫描 排序" ng-click="orderByValue(sub.path)"
                                   ng-class="sub.class" class="ng-binding ng-scope span-33 isOrderBy"> 扫描 <span
                                ng-show="orderBy.order == sub.path"
                                ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                class="ng-hide icon-orderBy-up">▼</span></div>
                              <!-- end ngRepeat: sub in title.subLevel --> </div>
                          </div>
                        </div><!-- end ngRepeat: title in tableInfo[user.type].head -->
                        <div ng-repeat="title in tableInfo[user.type].head" ng-class="title.span"
                             class="ng-scope span-10">
                          <div ng-show="title.value !== '数据源' &amp;&amp; title.value !== '数据中心'" title="按 账期 排序"
                               ng-class="title.path ? 'isOrderBy' : ''" ng-click="orderByValue(title.path)"
                               class="ng-binding isOrderBy"> 账期 <span ng-show="orderBy.order == title.path"
                                                                      ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                                                      class="ng-hide icon-orderBy-up">▼</span></div>
                          <div class="multiRowBox ng-hide" ng-show="title.value == '数据源'">
                            <div class="multiRow-head">数据源</div>
                            <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel --> </div>
                          </div>
                          <div class="multiRowBox ng-hide" ng-show="title.value == '数据中心'">
                            <div class="multiRow-head">数据中心</div>
                            <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel --> </div>
                          </div>
                        </div><!-- end ngRepeat: title in tableInfo[user.type].head -->
                        <div ng-repeat="title in tableInfo[user.type].head" ng-class="title.span"
                             class="ng-scope span-13">
                          <div ng-show="title.value !== '数据源' &amp;&amp; title.value !== '数据中心'" title="按 状态 排序"
                               ng-class="title.path ? 'isOrderBy' : ''" ng-click="orderByValue(title.path)"
                               class="ng-binding isOrderBy"> 状态 <span ng-show="orderBy.order == title.path"
                                                                      ng-class="orderBy.type == '-' ? 'icon-orderBy-down' : 'icon-orderBy-up'"
                                                                      class="ng-hide icon-orderBy-up">▼</span></div>
                          <div class="multiRowBox ng-hide" ng-show="title.value == '数据源'">
                            <div class="multiRow-head">数据源</div>
                            <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel --> </div>
                          </div>
                          <div class="multiRowBox ng-hide" ng-show="title.value == '数据中心'">
                            <div class="multiRow-head">数据中心</div>
                            <div class="multiRow-body"> <!-- ngRepeat: sub in title.subLevel --> </div>
                          </div>
                        </div><!-- end ngRepeat: title in tableInfo[user.type].head --> </div>
                    </div>
                    <div class="accBody-tabBody ps-container ps-theme-default" id="accountsListBox"
                         data-ps-id="2fa84bb2-41e2-ac83-9c32-aad942f518c5">
                      <acc-tab-body-list> <!-- ngRepeat: x in accountsInfo.list |
                filter: search.commonKeyWord |
                orderBy: orderBy.type + orderBy.order -->
                        <div class="tabBodyBox accTabBody ng-scope" on-repeat-finished="" ng-repeat="x in accountsInfo.list |
                filter: search.commonKeyWord |
                orderBy: orderBy.type + orderBy.order" ng-class="{'rowLight': light.row == x._id}"
                             ng-click="enterAccount(x)">
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
                          <!-- ngIf: tableInfo[user.type].body.customer -->
                          <!-- ngIf: tableInfo[user.type].body.common --> <!-- ngIf: tableInfo[user.type].body.mgr -->
                          <!-- ngIf: tableInfo[user.type].body.dataOrigin -->
                          <div ng-class="tableInfo[user.type].body.dataOrigin"
                               ng-if="tableInfo[user.type].body.dataOrigin" class="ng-scope span-30 multiLine">
                            <div class="span-33 ng-binding"> 0</div>
                            <div class="span-33 ng-binding"> 0</div>
                            <div class="span-33 ng-binding"> 0/0</div>
                          </div><!-- end ngIf: tableInfo[user.type].body.dataOrigin -->
                          <!--<div ng-class="tableInfo[user.type].body.issueTime + ' ' +
      (compareIssue(x.issueTime, accountsInfo.systemIssue) ? 'colorRed' : '')" class="ng-binding span-10 colorRed">
                            2018-03
                          </div> --><!-- ngIf: tableInfo[user.type].body.file -->
                          <!-- ngIf: tableInfo[user.type].body.isAllAudited -->
                          <div ng-class="tableInfo[user.type].body.issueState" class="span-13">
                            <!-- ngIf: !x.equilibrium --> <span class="accountStateBox ng-binding stateBox-ing"
                                                                ng-class="getTabView('class', x.issueState)"> 做账中 </span>
                            <!--<span class="icon-deleteAccount" title="删除账套" ng-show="canDeleteAcount(x)"
                                  ng-click="showDelAccPop(x, $event)"></span>-->
                          </div>
                        </div><!-- end ngRepeat: x in accountsInfo.list |
                filter: search.commonKeyWord |
                orderBy: orderBy.type + orderBy.order -->
                        <div class="tabBodyBox accTabBody ng-scope" on-repeat-finished="" ng-repeat="x in accountsInfo.list |
                filter: search.commonKeyWord |
                orderBy: orderBy.type + orderBy.order" ng-class="{'rowLight': light.row == x._id}"
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
                          <!-- ngIf: tableInfo[user.type].body.customer -->
                          <!-- ngIf: tableInfo[user.type].body.common --> <!-- ngIf: tableInfo[user.type].body.mgr -->
                          <!-- ngIf: tableInfo[user.type].body.dataOrigin -->
                          <div ng-class="tableInfo[user.type].body.dataOrigin"
                               ng-if="tableInfo[user.type].body.dataOrigin" class="ng-scope span-30 multiLine">
                            <div class="span-33 ng-binding"> 0</div>
                            <div class="span-33 ng-binding"> 0</div>
                            <div class="span-33 ng-binding"> 0/0</div>
                          </div><!-- end ngIf: tableInfo[user.type].body.dataOrigin -->
                          <div ng-class="tableInfo[user.type].body.issueTime + ' ' +
      (compareIssue(x.issueTime, accountsInfo.systemIssue) ? 'colorRed' : '')" class="ng-binding span-10 colorRed">
                            2018-03
                          </div> <!-- ngIf: tableInfo[user.type].body.file -->
                          <!-- ngIf: tableInfo[user.type].body.isAllAudited -->
                          <div ng-class="tableInfo[user.type].body.issueState" class="span-13">
                            <!-- ngIf: !x.equilibrium --> <span class="accountStateBox ng-binding stateBox-not"
                                                                ng-class="getTabView('class', x.issueState)"> 未开始 </span>
                            <span class="icon-deleteAccount" title="删除账套" ng-show="canDeleteAcount(x)"
                                  ng-click="showDelAccPop(x, $event)"></span></div>
                        </div><!-- end ngRepeat: x in accountsInfo.list |
                filter: search.commonKeyWord |
                orderBy: orderBy.type + orderBy.order -->
                        <div class="tabBodyBox accTabBody ng-scope" on-repeat-finished="" ng-repeat="x in accountsInfo.list |
                filter: search.commonKeyWord |
                orderBy: orderBy.type + orderBy.order" ng-class="{'rowLight': light.row == x._id}"
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
                          <!-- ngIf: tableInfo[user.type].body.customer -->
                          <!-- ngIf: tableInfo[user.type].body.common --> <!-- ngIf: tableInfo[user.type].body.mgr -->
                          <!-- ngIf: tableInfo[user.type].body.dataOrigin -->
                          <div ng-class="tableInfo[user.type].body.dataOrigin"
                               ng-if="tableInfo[user.type].body.dataOrigin" class="ng-scope span-30 multiLine">
                            <div class="span-33 ng-binding"> 0</div>
                            <div class="span-33 ng-binding"> 0</div>
                            <div class="span-33 ng-binding"> 0/0</div>
                          </div><!-- end ngIf: tableInfo[user.type].body.dataOrigin -->
                          <div ng-class="tableInfo[user.type].body.issueTime + ' ' +
      (compareIssue(x.issueTime, accountsInfo.systemIssue) ? 'colorRed' : '')" class="ng-binding span-10 colorRed">
                            2018-03
                          </div> <!-- ngIf: tableInfo[user.type].body.file -->
                          <!-- ngIf: tableInfo[user.type].body.isAllAudited -->
                          <div ng-class="tableInfo[user.type].body.issueState" class="span-13">
                            <!-- ngIf: !x.equilibrium --> <span class="accountStateBox ng-binding stateBox-not"
                                                                ng-class="getTabView('class', x.issueState)"> 未开始 </span>
                            <span class="icon-deleteAccount" title="删除账套" ng-show="canDeleteAcount(x)"
                                  ng-click="showDelAccPop(x, $event)"></span></div>
                        </div><!-- end ngRepeat: x in accountsInfo.list |
                filter: search.commonKeyWord |
                orderBy: orderBy.type + orderBy.order -->
                        <div class="dataIsNull ng-hide" ng-show="show.dataIsNull">暂无账套信息</div>
                      </acc-tab-body-list>
                      <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                        <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                      </div>
                      <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                        <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                      </div>
                    </div> <!-- ngIf: showAccPageBox() --> </div>
                </div>
              </div>
              <div class="btn-scrollTopBox anime ng-hide" ng-click="scrollBarTop()" ng-style="scrollBarTopStyle()"
                   ng-show="show.scrollTopBtn" title="回到顶部" style="bottom: 11px;"></div>
            </div>
          </div>
        </section>
        <section class="site-popups">
          <div class="site-mask anime ng-scope" ng-class="{'site-mask--shade': on}">
            <div class="site-popup anime personalBox" ng-class="{'site-popup--expand': on}">
              <div ng-class="page.title == '信息编辑' ? 'comInfoSwitchBtn-info-on' : 'comInfoSwitchBtn-info-off'"
                   ng-click="switchPage('信息编辑')" class="comInfoSwitchBtn-info-on">信息编辑
              </div>
              <div ng-class="page.title == '密码修改' ? 'comInfoSwitchBtn-password-on' : 'comInfoSwitchBtn-password-off'"
                   ng-click="switchPage('密码修改')" class="comInfoSwitchBtn-password-off">密码修改
              </div>
              <div ng-class="page.title == '充值' ? 'comInfoSwitchBtn-charge-on' : 'comInfoSwitchBtn-charge-off'"
                   ng-click="switchPage('充值')" ng-show="user.type === 'individual'"
                   class="ng-hide comInfoSwitchBtn-charge-off"><p>充值</p></div>
              <div class="title ng-binding">用户信息编辑
                <div class="icon-pre ng-hide"
                     ng-show="page.title === '充值' &amp;&amp; (pay.status === 'failure' || pay.status === 'scan')"
                     ng-click="prePay()"></div>
                <div class="closedIcon" ng-click="close()"></div>
              </div>
              <div class="personalInfoContent" ng-show="page.title == '信息编辑'">
                <div class="com-infor">
                  <div class="com-title">用&nbsp;户&nbsp;名</div>
                  <input ng-model="copyUser.name" type="text" ng-change="checkName()"
                         class="ng-pristine ng-untouched ng-valid ng-empty">
                  <div class="errorTips ng-binding ng-hide" ng-show="hint.name !== ''"></div>
                </div>
                <div class="com-infor margin-top-bottom">
                  <div class="com-title">手&nbsp;机&nbsp;号</div>
                  <input ng-model="copyUser.phone" class="inputDisabled ng-pristine ng-untouched ng-valid ng-empty"
                         type="text" disabled="disabled">
                  <div class="lockIcon"></div>
                </div>
                <div class="com-infor margin-top-bottom">
                  <div class="com-title">电子邮箱</div>
                  <input ng-model="copyUser.email" type="tel" ng-change="checkEmail()"
                         class="ng-pristine ng-untouched ng-valid ng-empty">
                  <div class="errorTips ng-binding ng-hide" ng-show="hint.email !== ''"></div>
                </div>
                <div class="com-infor margin-top-bottom">
                  <div class="com-title cancelBtn" ng-click="close()">取消</div>
                  <div class="submitBtn-edit com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                       ng-click=";click();" ui-button="" btn-click="editInfo()">
                    <ng-transclude><span class="ng-scope">确定</span></ng-transclude>
                  </div>
                </div>
              </div>
              <div class="personalInfoContent ng-hide" ng-show="page.title == '密码修改'">
                <div class="com-infor">
                  <div class="com-title">旧&nbsp;密&nbsp;码</div>
                  <input type="text" ng-blur="checkPassword()" ng-model="copyUser.oldPassword"
                         class="ng-pristine ng-untouched ng-valid ng-empty"></div>
                <div class="com-infor margin-top-bottom" style="margin-top:45px">
                  <div class="com-title">新&nbsp;密&nbsp;码</div>
                  <input type="password" ng-hide="viewPassword" ng-change="checkPassword()"
                         ng-model="copyUser.newPassword" class="ng-pristine ng-untouched ng-valid ng-empty"> <input
                  type="text" ng-show="viewPassword" ng-change="checkPassword()" ng-model="copyUser.newPassword"
                  class="ng-pristine ng-untouched ng-valid ng-empty ng-hide">
                  <div ng-class="viewPassword ? 'eyeIcon-on' : 'eyeIcon-off'" ng-click="switchPassword()"
                       class="eyeIcon-off"></div>
                  <div class="errorTips ng-binding ng-hide" ng-show="hint.password !== ''"></div>
                </div>
                <div class="com-infor margin-top-bottom" style="margin-top:45px">
                  <div class="com-title cancelBtn" ng-click="close()">取消</div>
                  <div class="submitBtn-edit com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                       ng-click=";click();" ui-button="" btn-click="editPwd()">
                    <ng-transclude><span class="ng-scope">确定</span></ng-transclude>
                  </div>
                </div>
              </div>
              <div class="personalInfoContent chargeInfoContent ng-hide" ng-show="page.title == '充值'">
                <div class="chargeBox ng-hide" ng-show="pay.status === 'non' &amp;&amp; !chargeCardSucceed">
                  <div class="charge-balanceWrap">
                    <div class="charge-balance">
                      <div class="com-title">账期余额</div>
                      <div class="ng-binding">NaN账期</div>
                    </div>
                    <div class="charge-explain icon-question" title="账期是指以月为单位的会计期间，每月结账完成为一个完整账期"></div>
                    <div class="charge-text ng-binding">（总账期期，已使用期）</div>
                  </div>
                  <div class="chargeTab">
                    <div class="chargeTab-title"> <!-- ngRepeat: tab in chargeTabs --> </div>
                    <div class="chargeTab-content">
                      <div class="content-package ng-hide" ng-show="chargeTab.type === 'package'">
                        <div class="com-infor" style="height:auto">
                          <div class="com-title">充值套餐</div>
                          <div class="chargePackagesWrap"> <!-- ngRepeat: package in chargePackages --> </div>
                        </div>
                        <div class="com-infor" style="margin-top:30px">
                          <div class="com-title">应付金额</div>
                          <div><span class="payMoney ng-binding"></span>元</div>
                        </div>
                        <div class="com-infor">
                          <div class="com-payMode">请选择支付方式</div>
                          <div class="payModesWrap"> <!-- ngRepeat: channel in pay.channels --> </div>
                        </div>
                      </div>
                      <div class="content-card ng-hide" ng-show="chargeTab.type === 'card'">
                        <div ng-show="!isUsedCharge">
                          <div class="com-infor">
                            <div class="com-title">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</div>
                            <input type="text" ng-blur="checkchargeCard()" ng-model="copyUser.chargeCard"
                                   class="ng-pristine ng-untouched ng-valid ng-empty">
                            <div class="errorTips ng-binding ng-hide" ng-show="hint.chargeCard !== ''"></div>
                          </div>
                          <div class="com-infor margin-top-bottom" style="margin-top:20px">
                            <div class="com-title">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</div>
                            <input type="text" ng-blur="checkChargePassword()" ng-model="copyUser.chargePassword"
                                   class="ng-pristine ng-untouched ng-valid ng-empty">
                            <div class="errorTips ng-binding ng-hide" ng-show="hint.chargePassword !== ''"></div>
                          </div>
                          <div class="com-infor margin-top-bottom" style="margin-top:20px">
                            <div class="com-title cancelBtn" ng-click="close()">取消</div>
                            <div class="submitBtn-edit com-button anime ng-isolate-scope com-button--ok"
                                 ng-class="class" ng-click=";click();" ui-button="" btn-click="chargeByCard()">
                              <ng-transclude><span class="ng-scope">确定</span></ng-transclude>
                            </div>
                          </div>
                        </div>
                        <div ng-show="isUsedCharge" class="isUsedCharge ng-hide"><p class="text">您已使用过精英卡充值，不可重复充值</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="chargeBox charge--scan ng-hide" ng-show="pay.status === 'scan'">
                  <div class="qrcodeWrap">
                    <div class="qrcodeBox"><img width="216" height="216"></div>
                    <p class="text ng-binding"></p></div>
                </div>
                <div class="chargeBox charge--succeed ng-hide" ng-show="pay.status === 'succeed' || chargeCardSucceed">
                  <p class="succeed-text payResultText">恭喜您，充值成功！</p>
                  <div class="succeed-back back com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                       ng-click=";click();" ui-button="" btn-click="back()">
                    <ng-transclude><span class="ng-scope">确定</span></ng-transclude>
                  </div>
                </div>
                <div class="chargeBox charge--failure ng-hide" ng-show="pay.status === 'failure'"><p
                  class="failure-text payResultText">充值失败，请返回重新充值！</p>
                  <div class="failure-back back com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                       ng-click=";click();" ui-button="" btn-click="back()">
                    <ng-transclude><span class="ng-scope">返回</span></ng-transclude>
                  </div>
                </div>
              </div>
              <div class="personalInfoFooter"
                   ng-hide="page.title == '充值' &amp;&amp; (pay.status !== 'non' || chargeTab.type === 'package' || chargeCardSucceed)">
                <div class="weChat-sepBox">
                  <div class="weChat-sepBorder"></div>
                  <div class="weChat-sepSize">微信通知设置</div>
                </div>
                <div class="weChat-QRCodeBox">
                  <div class="weChat-QRCode-left"><p>关注解放君微信公众号，并在公众号中登录您的账号，您就可以：</p>
                    <p>1. 获得票据识别完成提醒通知；</p>
                    <p>2. 及时了解版本更新信息；</p></div>
                  <div class="weChat-QRCode-right"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="site-mask anime ng-scope" ng-class="{'site-mask--shade': on}">
            <div id="ui-ve" windowize="" class="site-popup popupContainer ng-isolate-scope"
                 ng-class="{'site-popup--expand': on}" qrppnkbf=""
                 style="transform-style: preserve-3d; transition: all 50ms ease 0s;">
              <div class="button popupExit icon-25 g-icon-close" ng-click="close()"></div>
              <p class="popupTitle ng-binding"></p>
              <div class="shortcut-key-box">
                <div class="shortcut-key">
                  <table class="shortcut-table">
                    <tbody><!-- ngRepeat: keyData in shortcutData -->
                    <tr ng-repeat="keyData in shortcutData" class="ng-scope">
                      <td class="ng-binding">保存并关闭</td>
                      <td class="ng-binding">Ctrl + S</td>
                    </tr><!-- end ngRepeat: keyData in shortcutData -->
                    <tr ng-repeat="keyData in shortcutData" class="ng-scope">
                      <td class="ng-binding">保存并新建</td>
                      <td class="ng-binding">Ctrl + A</td>
                    </tr><!-- end ngRepeat: keyData in shortcutData -->
                    <tr ng-repeat="keyData in shortcutData" class="ng-scope">
                      <td class="ng-binding">摘要复制</td>
                      <td class="ng-binding">。。</td>
                    </tr><!-- end ngRepeat: keyData in shortcutData -->
                    <tr ng-repeat="keyData in shortcutData" class="ng-scope">
                      <td class="ng-binding">下一个单元格</td>
                      <td class="ng-binding">回车键</td>
                    </tr><!-- end ngRepeat: keyData in shortcutData -->
                    <tr ng-repeat="keyData in shortcutData" class="ng-scope">
                      <td class="ng-binding">调整借贷方向</td>
                      <td class="ng-binding">空格键</td>
                    </tr><!-- end ngRepeat: keyData in shortcutData -->
                    <tr ng-repeat="keyData in shortcutData" class="ng-scope">
                      <td class="ng-binding">借贷方补平</td>
                      <td class="ng-binding">=</td>
                    </tr><!-- end ngRepeat: keyData in shortcutData --> </tbody>
                  </table>
                </div>
              </div>
              <div class="disableEditTips ng-hide" ng-show="isAdmin">管理员仅拥有查看权限，无法修改！</div>
              <div class="disableEditTips ng-hide" ng-show="!isAdmin &amp;&amp; freeze">凭证已审核，数据不允许编辑！</div>
              <div class="popupContent"><p class="entryTitle ng-binding">记-&nbsp;&nbsp;凭证名称：</p>
                <div class="entryContainer">
                  <div class="entryHead">
                    <div class="tbRow"><p class="h-summary">摘要</p>
                      <div ng-class="{
                          'h-subject-c' : !voucher.hasForeigns &amp;&amp; !voucher.hasAmount,
                          'h-subject-f' : voucher.hasForeigns || voucher.hasAmount
                      }" class="h-subject-c">科目
                      </div>
                      <div class="h-currency ng-binding ng-hide"
                           ng-show="voucher.hasForeigns || voucher.hasAmount"></div>
                      <p class="h-debit">借方金额</p>
                      <p class="h-credit">贷方金额</p></div>
                  </div>
                  <div class="entryBody">
                    <div class="ui-et ng-isolate-scope ps-container ps-theme-default" scroll="" scroll-behavior="bottom"
                         options="uiEntry" data-ps-id="4c9f3733-ba1e-9b53-d16f-095b46ef1872" id="ui-et-688312">
                      <div class="entrysContainer"> <!-- ngRepeat: e in entries --> </div>
                      <ui-subselector ng-show="!assistSelector.on" source="subjects" filter="cacheEntry.origin.subject"
                                      output="cacheEntry.out" on="subSelector.on" options="subSelector"
                                      addsub="entrySubjectCreate()" cfmsub="entrySubjectSelected(e)"
                                      class="ng-isolate-scope" id="ui-sub-406849"
                                      style="position: fixed; z-index: 1; top: 0px; left: 0px; width: 0px; height: 0px;">
                        <div id="ui-ss-container" click-test="" listen="options.on" onmouselost="ui_close()"
                             class="ng-isolate-scope" sfeezldg="" style="top: 0px; left: 0px; display: none;">
                          <ul>
                            <li ng-class="{'hide' : (!options.hints.showCreate) || (!subUnknown)}"
                                ng-click="createSub()">新建此科目
                            </li>
                            <li class="forbidden hide" ng-class="{'hide' : options.hints.showCreate || (!subUnknown)}">
                              [无效科目]
                            </li> <!-- ngRepeat: sub in cacheList --> </ul>

                        </div>
                      </ui-subselector>
                      <div click-test="" listen="assistSelector.enableClickTest" onmouselost="assistBoxOnblur()"
                           class="assistBox ng-isolate-scope ng-hide" ng-show="assistSelector.on"
                           id="assistBox-ui-et-688312" ifgmiyhb="">
                        <ui-assist-selector source="assistSelector.source" on="assistSelector.on"
                                            suggestion="assistSelector.suggestion" auto-comfirm="true"
                                            output="assistSelector.output"
                                            enable-click-test="assistSelector.enableClickTest"
                                            selected="cacheEntry.origin.items" finish="assistSelector.finish"
                                            callback="entryAssistSelected()" class="ng-isolate-scope">
                          <div class="assistSelector ng-hide" ng-show="on">
                            <div class="content"> <!-- ngRepeat: (type, select) in selector --> </div>
                            <div class="footer ng-hide" ng-show="!autoComfirm">
                              <div class="btnBox">
                                <div class="btn-confirm solidBtn" ng-click="confirm()"> 确认</div>
                                <div class="btn-more solidBtn" ng-click="more()"> 确认并继续</div>
                              </div>
                            </div>
                            <ui-assist-creator on="creator.on" source="creator.source" output="suggestion"
                                               callback="created()" class="ng-isolate-scope">
                              <div class="site-mask anime" ng-class="{'site-mask--shade': on}">
                                <div class="pop-container site-popup anime assistCreator"
                                     ng-class="{'site-popup--expand' : on}"><p class="title"> 添加辅助核算项 </p>
                                  <div class="icon-close" ng-click="close()"></div>
                                  <div class="content">
                                    <div class="item"><label for="assistCreator-code-rdiazwti">编码</label>
                                      <div class="inputBox"><input type="text" id="assistCreator-code-rdiazwti"
                                                                   ng-model="creator.code"
                                                                   class="ng-pristine ng-untouched ng-valid ng-empty">
                                      </div>
                                    </div>
                                    <div class="item"><label for="assistCreator-name-rdiazwti">名称</label>
                                      <div class="inputBox"><input type="text" id="assistCreator-name-rdiazwti"
                                                                   ng-model="creator.name"
                                                                   class="ng-pristine ng-untouched ng-valid ng-empty">
                                      </div>
                                    </div>
                                    <div class="item ng-hide" ng-show="creator.type === 'inventory'"><label
                                      for="assistCreator-unit-rdiazwti">单位</label>
                                      <div class="inputBox"><input type="text" id="assistCreator-unit-rdiazwti"
                                                                   ng-model="creator.unit"
                                                                   class="ng-pristine ng-untouched ng-valid ng-empty">
                                      </div>
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
                            </ui-assist-creator>
                          </div>
                        </ui-assist-selector>
                      </div>
                      <div id="accAttrBox-ui-et-688312" class="accAttrBox ng-isolate-scope" click-test=""
                           listen="options.active" onmouselost="accAttrBoxOnBlur()" ng-style="accAttrBox.on &amp;&amp;{
             'pointer-events' : 'painted',
             'opacity' : '1'
         }" obpowrpm="">
                        <div class="accAttrContainer">
                          <div class="accRow ng-hide" ng-show="cacheEntry.isAmount"><p class="accTag">数量:</p> <input
                            class="accInput ng-pristine ng-untouched ng-valid ng-empty" type="text"
                            ng-model="cacheEntry.amount" ng-disabled="freeze" ng-focus="accAttrAmountOnFocus($event)"
                            ng-blur="accAttrAmountOnBlur()" ng-change="accAttrAmountOnChange()"></div>
                          <div class="accRow ng-hide" ng-show="cacheEntry.isAmount"><p class="accTag">单价:</p> <input
                            class="accInput ng-pristine ng-untouched ng-valid ng-empty" type="text"
                            ng-model="cacheEntry.price" ng-disabled="freeze" ng-focus="accAttrPriceOnFocus($event)"
                            ng-blur="accAttrPriceOnBlur()" ng-change="accAttrPriceOnChange()"></div>
                          <div class="accRow ng-hide" ng-show="cacheEntry.isForeign"><p class="accTag ng-binding">:</p>
                            <input class="accInput ng-pristine ng-untouched ng-valid ng-empty" type="text"
                                   ng-model="cacheEntry.currency" ng-disabled="freeze"
                                   ng-focus="accAttrCurrencyOnFocus($event)" ng-blur="accAttrCurrencyOnBlur()"
                                   ng-change="accAttrCurrencyOnChange()"></div>
                          <div class="accRow ng-hide" ng-show="cacheEntry.isForeign"><p class="accTag">汇率:</p> <input
                            class="accInput ng-pristine ng-untouched ng-valid ng-empty" type="text"
                            ng-model="cacheEntry.rate" ng-disabled="freeze" ng-focus="accAttrRateOnFocus($event)"
                            ng-blur="accAttrRateOnBlur()" ng-change="accAttrRateOnChange()"></div>
                          <div class="accFooter">
                            <div class="boxButton accCancel com-button anime ng-isolate-scope com-button--cancel"
                                 ng-class="class" ng-click=";click();" ui-button="" btn-type="cancel"
                                 btn-click="accAttrBoxCancel()">
                              <ng-transclude><span class="ng-scope">取消</span></ng-transclude>
                            </div>
                            <div class="boxButton accSave com-button anime ng-isolate-scope com-button--ok"
                                 ng-class="class" ng-click=";click();" ui-button=""
                                 btn-click="accAttrBoxOk(cacheEntry)">
                              <ng-transclude><span class="ng-scope">保存</span></ng-transclude>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="balanceBox-ui-et-688312" class="balanceBox" ng-style="balanceBox.on &amp;&amp; {
             'pointer-events' : 'painted',
             'opacity' : '1'
         }"><p ng-style="isBalanceNegative &amp;&amp; {
            'color' : 'red'
        }" class="ng-binding">余额：0.00</p></div>
                      <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                        <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                      </div>
                      <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                        <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                      </div>
                    </div>
                  </div>
                  <div class="entryFooter">
                    <div class="tbRow"><p class="f-summary">合计</p>
                      <p class="f-subject">差值： <span ng-class="{'span-nb' : voucher.vDiff != 0}"
                                                     class="ng-binding span-nb"></span></p>
                      <p class="f-debit ng-binding"></p>
                      <p class="f-credit ng-binding"></p></div>
                  </div>
                </div>
              </div>
              <div class="popupFooter">
                <div class="button footBtn template ng-hide" ng-show="freeze &amp;&amp; isMyAccount"
                     ng-click="newTemplate()">存储模板
                </div>
                <div class="button footBtn template ng-hide" ng-show="!freeze &amp;&amp; isMyAccount"> 模板
                  <div class="selectBox">
                    <div class="button item new" ng-click="newTemplate()">存储模板</div>
                    <div class="button item use" ng-click="useTemplate()">使用模板</div>
                  </div>
                </div>
                <div class="footBtn save com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                     ng-click=";click();" ng-show="!freeze" ui-button="" btn-click="save()">
                  <ng-transclude><span class="ng-scope">保存</span></ng-transclude>
                </div>
                <div class="footBtn continue com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                     ng-click=";click();" ng-show="!freeze" ui-button="" btn-click="more()">
                  <ng-transclude><span class="ng-scope">保存并新建</span></ng-transclude>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div class="com-eq ng-isolate-scope">
            <div class="site-mask anime" ng-class="{'site-mask--shade': on}">
              <div class="site-popup pop-container anime equilibriumPop" ng-class="{'site-popup--expand': on}"><p>
                报表不平衡原因列表</p>
                <div class="button close icon-25 g-icon-close" title="关闭" ng-click="close()"></div>
                <div class="equilibriumHead">
                  <div class="tabHeadBox">
                    <div class="span-10">期号</div>
                    <div class="span-30">原因</div>
                    <div class="span-60">具体原因</div>
                  </div>
                </div>
                <div class="equilibriumBody ps-container ps-theme-default" id="equilibriumBody" scroll=""
                     data-ps-id="bb6692af-d295-f99a-90ab-25884ccc9209"> <!-- ngRepeat: x in equilibriumList -->
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
          <div class="ui-updates ng-scope ng-hide" ng-show="on &amp;&amp; notice.detail.length">
            <div class="title"><span class="icon-notice"></span> 小君更新啦！</div>
            <div class="body">
              <div class="content"> <!-- ngRepeat: detail in notice.detail --> </div>
              <div class="footer">
                <div class="btn-ok" ng-click="confirm()"> 我知道了</div>
                <div class="btn-detail" ng-click="getDetail()"><a href="" target="_blank">查看详情</a></div>
              </div>
            </div>
          </div>
          <div class="ui-notice ng-isolate-scope">
            <ul class="notice-container ps-container ps-theme-default" scroll=""
                data-ps-id="753b1528-a071-8b61-36fa-d7aa9ac61dd3"> <!-- ngRepeat: notice in notices -->
              <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
              </div>
              <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
              </div>
            </ul>
          </div>
          <div class="site-mask anime ng-isolate-scope" ng-class="{'site-mask--shade': on}">
            <div id="ui-stock-editor" windowize="" class="site-popup popupContainer ng-isolate-scope"
                 ng-class="{'site-popup--expand': on}" rkpxinmf=""
                 style="transform-style: preserve-3d; transition: all 50ms ease 0s;">
              <div class="button popupExit icon-25 g-icon-close" ng-click="close()"></div>
              <div class="button-upload com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                   ng-click="uploadStock() ;click();" ui-button="" btn-type="hollow"
                   ng-show="!freeze &amp;&amp; mode !== 'edit' &amp;&amp; mode !== 'transform'">
                <ng-transclude><span class="ng-scope">excel导入</span></ng-transclude>
              </div>
              <input id="upload-stock" type="file" accept=".xls,.xlsx" file-model="" keep-file="false" ng-show="false"
                     class="ng-hide">
              <p class="popupTitle ng-binding"></p>
              <div class="popupContent">
                <div class="stockEntry-table">
                  <div class="stockEntry-table-rel">
                    <div class="stockEntry-table-header">
                      <table>
                        <tbody>
                        <tr>
                          <td class="span-5">序号</td>
                          <td class="span-7">编号</td>
                          <td class="span-25">名称</td>
                          <td class="span-9">规格</td>
                          <td class="span-9">单位</td>
                          <td class="span-10">数量</td>
                          <td class="span-15">单价</td>
                          <td class="span-20">金额</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="stockEntry-table-body ps-container ps-theme-default" scroll=""
                         data-ps-id="5973a8be-116c-edf9-43b1-9c740ca83ad8">
                      <div id="stockEntry" options="stockEntryOptions" source="stock" type="editor"
                           cache-source="cacheStock" stock-type="type" mode="mode" class="ng-isolate-scope">
                        <table>
                          <tbody><!-- ngRepeat: stockEntry in source.items --> </tbody>
                        </table>
                        <div class="stockSelctor">
                          <ui-stock-selector options="stockSelector" type="type" on="showStockSelector"
                                             search="curEntry[curCol]" class="ng-isolate-scope">
                            <div id="ui-stock-selector" ng-show="on &amp;&amp; selects.length"
                                 ng-style="{'top':options.style.top, 'left':options.style.left, 'height':options.style.height, 'width':options.style.width}"
                                 click-test="" listen="on" onmouselost="close()" class="ng-isolate-scope ng-hide"
                                 kzkvfwej="" style="top: 0px; left: 0px; height: 200px; width: 0px;">
                              <div class="stockSelectorBox" ng-style="{'position': 'relative', 'height': '100%'}"
                                   style="position: relative; height: 100%;">
                                <!-- ngRepeat: select in selects track by $index -->
                                <div class="invalid" ng-show="!selects.length">[无可选项]</div>
                              </div>
                            </div>
                          </ui-stock-selector>
                        </div>
                        <div class="stockBalancePrompter">
                          <div id="ui-stock-balance-prompter" ng-show="on" ng-style="{
       'top':options.style.top,
       'left':options.style.left,
       'height':options.style.height,
       'width':options.style.width}" options="stockBalancePrompter" type="type" on="showStockBalancePrompter"
                               mode="mode" stocks="stocks" class="ng-isolate-scope ng-hide"
                               style="top: 0px; left: 0px; width: 0px;"><p class="ng-binding">数量：</p>
                            <p class="ng-binding">金额：</p></div>
                        </div>
                      </div>
                      <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                        <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                      </div>
                      <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                        <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                      </div>
                    </div>
                    <div class="stockEntry-table-footer">
                      <table>
                        <tbody>
                        <tr>
                          <td class="span-5">合计</td>
                          <td class="span-75" colspan="5"></td>
                          <td class="span-20 ng-binding" ng-style="{'text-align': 'right', 'padding': '0 8px'}"
                              style="text-align: right; padding: 0px 8px;"></td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="popupFooter">
                <div class="button-ok com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                     ng-click="ok() ;click();" ui-button="" btn-type="ok" ng-show="!freeze">
                  <ng-transclude><span class="ng-scope">&nbsp;&nbsp;&nbsp;&nbsp;保存&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </ng-transclude>
                </div>
              </div>
            </div>
          </div>
          <div class="site-mask anime ng-scope" ng-class="{'site-mask--shade': on}">
            <div id="ui-stock-resource-editor" windowize="" class="site-popup popupContainer ng-isolate-scope"
                 ng-class="{'site-popup--expand': on}" lumfsszo=""
                 style="transform-style: preserve-3d; transition: all 50ms ease 0s;">
              <div class="button popupExit icon-25 g-icon-close" ng-click="close()"></div>
              <p class="popupTitle ng-binding"></p>
              <div class="reget ng-hide" ng-show="mode === 'create'"><input type="number" ng-model="regetStocks"
                                                                            class="ng-pristine ng-untouched ng-valid ng-empty">
                <span>张</span> <span class="btn-reget com-button--hollow com-button" ng-click="reget()">重新获取</span>
              </div>
              <div class="popup-tips ng-hide" ng-show="mode === 'create'"><span ng-show="queryingTotal" class="ng-hide">进项数据尚未全部查询完成，请稍后拉取！</span>
                <span class="popup-tip tip--querying ng-binding">正在查询：张</span> <span
                  class="popup-tip tip--succeed ng-binding">查询成功：张</span> <span
                  class="popup-tip tip--failure ng-binding">查询失败：张</span>
                <div class="btn-reSearch com-button--hollow com-button ng-hide" ng-click="reSearch()"
                     ng-show="failureTotal">重新查询
                </div>
              </div>
              <div class="popupContent"> <!-- ngIf: !stocks.length -->
                <div class="noData ng-scope" ng-if="!stocks.length">
                  <div class="icon-onData"></div>
                </div><!-- end ngIf: !stocks.length --> <!-- ngIf: on --> <!-- ngIf: on -->
                <div class="stockResource--right ng-hide" ng-show="stocks.length">
                  <div class="stockEntry-table">
                    <div class="stockEntry-table-rel">
                      <div class="stockEntry-table-header">
                        <table>
                          <tbody>
                          <tr>
                            <td class="span-6">编号</td>
                            <td class="span-20">名称</td>
                            <td class="span-10">规格</td>
                            <td class="span-10">单位</td>
                            <td class="span-17">数量</td>
                            <td class="span-17">单价</td>
                            <td class="span-20">金额</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="stockEntry-table-body ps-container ps-theme-default" scroll=""
                           data-ps-id="20240faa-a382-78f7-3b35-7748acfdde99">
                        <div id="stockEntry" options="stockEntryOptions" type="resource" source="stock"
                             cache-source="cacheStock" stock-type="type" mode="mode" stocks="stocks"
                             class="ng-isolate-scope">
                          <table>
                            <tbody><!-- ngRepeat: stockEntry in source.items --> </tbody>
                          </table>
                          <div class="stockSelctor">
                            <ui-stock-selector options="stockSelector" type="type" on="showStockSelector"
                                               search="curEntry[curCol]" class="ng-isolate-scope">
                              <div id="ui-stock-selector" ng-show="on &amp;&amp; selects.length"
                                   ng-style="{'top':options.style.top, 'left':options.style.left, 'height':options.style.height, 'width':options.style.width}"
                                   click-test="" listen="on" onmouselost="close()" class="ng-isolate-scope ng-hide"
                                   muomzqxw="" style="top: 0px; left: 0px; height: 200px; width: 0px;">
                                <div class="stockSelectorBox" ng-style="{'position': 'relative', 'height': '100%'}"
                                     style="position: relative; height: 100%;">
                                  <!-- ngRepeat: select in selects track by $index -->
                                  <div class="invalid" ng-show="!selects.length">[无可选项]</div>
                                </div>
                              </div>
                            </ui-stock-selector>
                          </div>
                          <div class="stockBalancePrompter">
                            <div id="ui-stock-balance-prompter" ng-show="on" ng-style="{
       'top':options.style.top,
       'left':options.style.left,
       'height':options.style.height,
       'width':options.style.width}" options="stockBalancePrompter" type="type" on="showStockBalancePrompter"
                                 mode="mode" stocks="stocks" class="ng-isolate-scope ng-hide"
                                 style="top: 0px; left: 0px; width: 0px;"><p class="ng-binding">数量：</p>
                              <p class="ng-binding">金额：</p></div>
                          </div>
                        </div>
                        <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                          <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                        </div>
                        <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                          <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                        </div>
                      </div>
                      <div class="stockEntry-table-footer">
                        <table>
                          <tbody>
                          <tr>
                            <td class="span-6">合计</td>
                            <td class="span-74" colspan="5"></td>
                            <td class="span-20 ng-binding" ng-style="{'text-align': 'right', 'padding': '0 8px'}"
                                style="text-align: right; padding: 0px 8px;"></td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="stockResource-footer">
                        <div class="button-pre com-button anime ng-isolate-scope com-button--hollow ng-hide"
                             ng-class="class" ng-click="generate() ;click();" ui-button="" btn-type="hollow"
                             ng-show="!freeze &amp;&amp; mode === 'create'">
                          <ng-transclude><span class="ng-binding ng-scope">生成入库单</span></ng-transclude>
                        </div>
                        <div class="button-go com-button com-button--hollow">
                          <div class="mask">跳转至</div>
                          <div class="options ps-container ps-theme-default" scroll=""
                               data-ps-id="92044b79-fc5a-fdbc-8051-55bdff279e72"> <!-- ngRepeat: item in goOptions -->
                            <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                              <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                            </div>
                            <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                              <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                            </div>
                          </div>
                        </div>
                        <div class="button-pre com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                             ng-click="pre() ;click();" ui-button="" btn-type="hollow">
                          <ng-transclude><span class="ng-scope">上一张</span></ng-transclude>
                        </div>
                        <div class="progress ng-binding">1 /</div>
                        <div class="button-next com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                             ng-click="next() ;click();" ui-button="" btn-type="hollow">
                          <ng-transclude><span class="ng-scope">下一张</span></ng-transclude>
                        </div>
                        <div class="button-ok com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                             ng-click="ok() ;click();" ui-button="" btn-type="ok"
                             ng-show="!freeze &amp;&amp; mode !== 'create'">
                          <ng-transclude><span class="ng-scope">&nbsp;&nbsp;保存&nbsp;&nbsp;</span></ng-transclude>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <contract-pop class="ng-isolate-scope">
            <div class="site-mask anime" ng-class="{'site-mask--shade': on}">
              <div id="ui-contract-pop" windowize="" class="site-popup popupContainer ng-isolate-scope"
                   ng-class="{'site-popup--expand': on, 'pop--read': mode === 'read', 'pop--write': mode === 'write'}"
                   rbteilqc="" style="transform-style: preserve-3d; transition: all 50ms ease 0s;">
                <div class="button popup-close icon-25 g-icon-close" ng-click="close()"></div>
                <div class="popup-title">合同简要</div>
                <div class="popup-content">
                  <div class="contract-acAndfsc contractWrap ng-hide"
                       ng-show="type === 'acAndFsc' &amp;&amp; mode === 'read'">
                    <div class="content-basicInfo">
                      <div class="basicInfo-left">
                        <div class="overText">甲方：<span ng-show="contract.fristPartyCompany"
                                                       class="ng-binding ng-hide"></span></div>
                        <div class="overText">乙方：<span ng-show="contract.secondPartyCompany"
                                                       class="ng-binding ng-hide"></span></div>
                        <div class="overText ng-binding">服务类型：</div>
                      </div>
                      <div class="basicInfo-right">
                        <div class="overText">甲方代表：<span ng-show="contract.fristPartyPerson"
                                                         class="ng-binding ng-hide"></span><span
                          ng-show="contract.fristPartyPhone" class="ng-binding ng-hide">（）</span></div>
                        <div class="overText">乙方代表：<span ng-show="contract.secondPartyPerson"
                                                         class="ng-binding ng-hide"></span><span
                          ng-show="contract.secondPartyPhone" class="ng-binding ng-hide">（）</span></div>
                        <div class="overText">起止时间：<span
                          ng-show="contract.commencementDate &amp;&amp; contract.completionDate"
                          class="ng-binding ng-hide"> ~ </span></div>
                      </div>
                    </div>
                    <div class="content-product">
                      <table>
                        <colgroup>
                          <col width="130px">
                          <col width="150px">
                          <col>
                        </colgroup>
                        <tbody>
                        <tr class="head">
                          <td class="text--center">产品</td>
                          <td class="text--center">价格/账期/月（元）</td>
                          <td>备注</td>
                        </tr> <!-- ngRepeat: production in contract.productions --> </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="contract-acAndfsc contractWrap ng-hide"
                       ng-show="type === 'acAndFsc' &amp;&amp; mode === 'write'">
                    <div class="content-basicInfo">
                      <div class="basicInfo-left">
                        <div class="row">
                          <div class="row-label">甲方：</div>
                          <div class="row-value value--fixed"><input type="text" ng-disabled="true"
                                                                     ng-model="contract.fristPartyCompany"
                                                                     class="disabled ng-pristine ng-untouched ng-valid ng-empty"
                                                                     disabled="disabled"></div>
                        </div>
                        <div class="row">
                          <div class="row-label">乙方：</div>
                          <div class="row-value value--fixed"><input type="text" ng-disabled="true"
                                                                     ng-model="contract.secondPartyCompany"
                                                                     class="disabled ng-pristine ng-untouched ng-valid ng-empty"
                                                                     disabled="disabled"></div>
                        </div>
                        <div class="row">
                          <div class="row-label">服务类型：</div>
                          <div class="row-value value--fixed"><input type="text" ng-model="contract.type"
                                                                     ng-disabled="true"
                                                                     class="disabled ng-pristine ng-untouched ng-valid ng-empty"
                                                                     disabled="disabled"></div>
                        </div>
                      </div>
                      <div class="basicInfo-right">
                        <div class="row">
                          <div class="row-label">甲方代表：</div>
                          <div class="row-value input-name"><input type="text" ng-model="contract.fristPartyPerson"
                                                                   class="ng-pristine ng-untouched ng-valid ng-empty">
                          </div>
                          <div class="input-line"></div>
                          <div class="row-value input-phone"><input type="text" ng-model="contract.fristPartyPhone"
                                                                    class="ng-pristine ng-untouched ng-valid ng-empty">
                          </div>
                        </div>
                        <div class="row">
                          <div class="row-label">乙方代表：</div>
                          <div class="row-value input-name"><input type="text" ng-model="contract.secondPartyPerson"
                                                                   class="ng-pristine ng-untouched ng-valid ng-empty">
                          </div>
                          <div class="input-line"></div>
                          <div class="row-value input-phone"><input type="text" ng-model="contract.secondPartyPhone"
                                                                    class="ng-pristine ng-untouched ng-valid ng-empty">
                          </div>
                        </div>
                        <div class="row">
                          <div class="row-label">起止时间：</div>
                          <div class="row-value input-name"><input type="text" ng-model="contract.commencementDate"
                                                                   placeholder="2017-01-01"
                                                                   class="ng-pristine ng-untouched ng-valid ng-empty">
                          </div>
                          <div class="input-line"></div>
                          <div class="row-value input-phone"><input type="text" ng-model="contract.completionDate"
                                                                    placeholder="2017-01-01"
                                                                    class="ng-pristine ng-untouched ng-valid ng-empty">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="content-product">
                      <table>
                        <colgroup>
                          <col width="130px">
                          <col width="150px">
                          <col>
                        </colgroup>
                        <tbody>
                        <tr class="head">
                          <td class="text--center">产品</td>
                          <td class="text--center">价格/账期/月（元）</td>
                          <td>备注</td>
                        </tr> <!-- ngRepeat: production in contract.productions --> </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="contract-fscAndjfjun contractWrap ng-hide"
                       ng-show="type === 'fscAndJfjun' &amp;&amp; mode === 'read'">
                    <div class="content-basicInfo">
                      <div class="basicInfo-left">
                        <div class="overText">甲方：<span ng-show="contract.fristPartyCompany"
                                                       class="ng-binding ng-hide"></span></div>
                        <div class="overText">乙方：<span ng-show="contract.secondPartyCompany"
                                                       class="ng-binding ng-hide"></span></div>
                        <div class="overText ng-binding">授权类型：</div>
                        <div class="overText">最高充值：<span class="ng-binding">元</span></div>
                      </div>
                      <div class="basicInfo-right">
                        <div class="overText">甲方代表：<span ng-show="contract.fristPartyPerson"
                                                         class="ng-binding ng-hide"></span><span
                          ng-show="contract.fristPartyPhone" class="ng-binding ng-hide">（）</span></div>
                        <div class="overText">乙方代表：<span ng-show="contract.secondPartyPerson"
                                                         class="ng-binding ng-hide"></span><span
                          ng-show="contract.secondPartyPhone" class="ng-binding ng-hide">（）</span></div>
                        <div class="overText">起止时间：<span
                          ng-show="contract.commencementDate &amp;&amp; contract.completionDate"
                          class="ng-binding ng-hide"> ~ </span></div>
                      </div>
                    </div>
                    <div class="content-product">
                      <table>
                        <colgroup>
                          <col width="30px">
                          <col width="150px">
                          <col width="150px">
                          <col>
                        </colgroup>
                        <tbody>
                        <tr class="head">
                          <td class="text--center" colspan="2">产品</td>
                          <td class="text--center">价格/账期/月（元）</td>
                          <td>备注</td>
                        </tr> <!-- ngRepeat: production in contract.productions --> </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="popup-footer ng-hide" ng-show="mode === 'write'">
                  <div class="footer-button btn-cancel com-button anime ng-isolate-scope com-button--cancel"
                       ng-class="class" ng-click=";click();" ui-button="" btn-click="cancel()" btn-type="cancel">
                    <ng-transclude><span class="ng-scope">取消</span></ng-transclude>
                  </div>
                  <div class="footer-button btn-ok com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                       ng-click=";click();" ui-button="" btn-click="save()">
                    <ng-transclude><span class="ng-scope">保存</span></ng-transclude>
                  </div>
                </div>
              </div>
            </div>
          </contract-pop>
          <ui-resource-browser class="ng-scope">
            <div class="site-mask anime" ng-class="{'site-mask--shade': on}">
              <div class="site-popup anime ng-isolate-scope" windowize="" id="ui-rb"
                   ng-class="{'site-popup--expand': on}" dfacnorl=""
                   style="transform-style: preserve-3d; transition: all 50ms ease 0s;">
                <div class="popupContainer">
                  <div class="button closePopup icon-25 g-icon-close" ng-click="close()"></div>
                  <div class="disableEditTips ng-binding">您仅拥有查看权限，无法修改！</div>
                  <div class="popupTitle"><p class="title ng-binding">回收站 <span ng-hide="isRecycle"
                                                                                class="ng-binding ng-hide">&nbsp;（共-1条）</span>
                  </p>
                    <div class="searchBar ng-hide" ng-hide="isRecycle">
                      <div class="icon-16 icon-search"></div>
                      <input class="anime ng-pristine ng-untouched ng-valid ng-empty" type="text" placeholder="搜索"
                             ng-model="searchKey" ng-change="resFilterChanged()"></div>
                    <div class="typeMenuBox" ng-show="isRecycle"><span
                      ng-class="{'menuHLight':type === 'delete_scanner'}" ng-click="type = 'delete_scanner'"
                      class="ng-binding">票据(0张)</span> <span ng-class="{'menuHLight':type === 'delete_bank'}"
                                                             ng-click="type = 'delete_bank'"
                                                             class="ng-binding">记录(0条)</span></div>
                  </div>
                  <div class="popupContent reListBox ng-hide" ng-show="isImageLike">
                    <div class="reTitle">
                      <div class="col-vou">原始票据</div>
                      <div class="col-summary">摘要</div>
                      <div ng-class="{
              'col-subject-long' : !imgResourceList.hasForeigns &amp;&amp; !imgResourceList.hasAmount,
              'col-subject' : imgResourceList.hasForeigns || imgResourceList.hasAmount
            }" class="col-subject-long">科目
                      </div>
                      <div class="col-cur ng-binding ng-hide"
                           ng-show="imgResourceList.hasForeigns || imgResourceList.hasAmount"></div>
                      <div class="col-debit">借方金额</div>
                      <div class="col-credit">贷方金额</div>
                    </div>
                    <div class="reContainer ps-container ps-theme-default" scroll="" scroll-behavior="top"
                         data-ps-id="c11843f1-87f6-af05-5a53-2784a1b0a1d5">
                      <!-- ngRepeat: res in imgResourceListFilter -->
                      <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                        <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                      </div>
                      <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                        <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                      </div>
                    </div>
                  </div>
                  <div class="popupContent recordListBox ng-hide" ng-show="isRecordLike">
                    <div class="reTitle">
                      <div class="col-summary">摘要</div>
                      <div ng-class="{
              'col-subject-long' : !recordResourceList.hasForeigns &amp;&amp; !recordResourceList.hasAmount,
              'col-subject' : recordResourceList.hasForeigns || recordResourceList.hasAmount
            }" class="col-subject-long">科目
                      </div>
                      <div class="col-cur ng-binding ng-hide"
                           ng-show="recordResourceList.hasForeigns || recordResourceList.hasAmount"></div>
                      <div class="col-debit">借方金额</div>
                      <div class="col-credit">贷方金额</div>
                    </div>
                    <div class="reContainer ps-container ps-theme-default" scroll="" scroll-behavior="top"
                         data-ps-id="02f86c14-0c8a-a6c8-4e0c-d44466a4fa27">
                      <!-- ngRepeat: res in recordResourceListFilter -->
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
          </ui-resource-browser>
          <ui-resource-editor class="ng-scope">
            <div class="site-mask anime" ng-class="{'site-mask--shade': options.on}">
              <div id="ui-re" windowize="" class="site-popup anime ui-re ng-isolate-scope"
                   ng-class="{'site-popup--expand': options.on}" kxtarwnl=""
                   style="transform-style: preserve-3d; transition: all 50ms ease 0s;">
                <div class="popupContainer">
                  <div class="button popupExit icon-25 g-icon-close" ng-click="close()"></div> <!-- ngIf: !imgMode -->
                  <div class="disableEditTips ng-binding ng-scope" ng-if="!imgMode">您仅拥有查看权限，无法修改！</div>
                  <!-- end ngIf: !imgMode -->
                  <div class="popupTitle"><p class="title ng-binding"></p>
                    <div class="backBtn com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                         ng-click=";click();" ui-button="" btn-type="hollow" btn-click="showResList()"
                         ng-show="canReturnList">
                      <ng-transclude><span class="ng-scope">返回</span></ng-transclude>
                    </div>
                    <div class="voucherIndex ng-binding" ng-click="switchVoucherIdOptionPop()"
                         ng-class="{'voucherIndexHLight':showVoucherIdOptionPop}"></div>
                    <div class="resStateTips ng-binding"></div>
                  </div>
                  <div class="voucherOptionMask ng-hide" ng-show="showVoucherIdOptionPop"
                       ng-click="switchVoucherIdOptionPop()"></div>
                  <div class="voucherOption ng-hide" ng-show="showVoucherIdOptionPop">
                    <!-- ngRepeat: relativeInfo in relativeVoucherList --> </div>
                  <div class="popupContent">
                    <div class="entryHead">
                      <div class="tbRow">
                        <div class="h-summary">摘要</div>
                        <div ng-class="{
              'h-subject-c' : !isContainForeigns() &amp;&amp; !isContainAmount(),
              'h-subject-f' : isContainForeigns() || isContainAmount()
            }" class="h-subject-c">科目
                        </div>
                        <div class="h-cur ng-binding ng-hide" ng-show="isContainForeigns() || isContainAmount()"></div>
                        <div class="h-debit">借方金额</div>
                        <div class="h-credit">贷方金额</div>
                      </div>
                    </div> <!-- ngIf: showBankRecord --> <!-- ngIf: showInvoice -->
                    <div class="reImg ng-hide" ng-show="showImg">
                      <div class="imgBox">
                        <ui-img options="uiImg" class="ng-isolate-scope" id="ui-img-970815">
                          <div id="ui-img"><p style="display: none;">加载中...</p>
                            <canvas id="ui-img-view"></canvas>
                            <div id="ui-img-viewDiv-box"
                                 style="width: 738px; height: 424px; left: 0px; top: 0px; background-color: white; opacity: 0;">
                              <div id="ui-img-viewDiv"
                                   style="top: 0px; bottom: 0px; left: 0px; right: 0px; margin: auto; background-size: contain; background-position: center center; background-repeat: no-repeat;"></div>
                            </div>
                            <canvas id="ui-img-mask" width="738" height="424"
                                    style="top: 0px; left: 0px; opacity: 0;"></canvas>
                            <canvas id="ui-img-zoom" ng-class="{'roundZoom': options.zoomCursor}"
                                    style="width: 300px; height: 300px; left: 747px; top: 0px; right: 0px; bottom: 0px; opacity: 0;"
                                    width="300" height="300"></canvas>
                          </div>
                        </ui-img>
                        <p ng-show="currentResource.dupSet.length === 0" class="ng-hide">尚未匹配</p></div>
                      <div class="imgToolBox">
                        <div title="向右旋转" class="button imgTool icon-35 icon-rotateLeft" ng-click="rotate(1)"></div>
                        <div title="向左旋转" class="button imgTool icon-35 icon-rotateRight" ng-click="rotate(-1)"></div>
                        <div title="查看原图" class="button imgTool icon-35 icon-source" ng-click="popupImgSrc()"></div>
                        <div title="删除" class="button imgTool icon-35 icon-delete ng-hide" ng-click="delete()"
                             ng-show="canEdit &amp;&amp; !copyCurrentResource.deleted"></div>
                      </div>
                    </div>
                    <div class="entryContainer" ng-class="entryHeight" ng-show="showEntry">
                      <div class="ui-et ng-isolate-scope ps-container ps-theme-default" scroll=""
                           scroll-behavior="bottom" options="uiEntry" data-ps-id="8ad463cf-c86e-ac7a-b3c2-7b3037de9704"
                           id="ui-et-512245">
                        <div class="entrysContainer"> <!-- ngRepeat: e in entries --> </div>
                        <ui-subselector ng-show="!assistSelector.on" source="subjects"
                                        filter="cacheEntry.origin.subject" output="cacheEntry.out" on="subSelector.on"
                                        options="subSelector" addsub="entrySubjectCreate()"
                                        cfmsub="entrySubjectSelected(e)" class="ng-isolate-scope" id="ui-sub-499987"
                                        style="position: fixed; z-index: 1; top: 0px; left: 0px; width: 0px; height: 0px;">
                          <div id="ui-ss-container" click-test="" listen="options.on" onmouselost="ui_close()"
                               class="ng-isolate-scope" catxufof="" style="top: 0px; left: 0px; display: none;">
                            <ul>
                              <li ng-class="{'hide' : (!options.hints.showCreate) || (!subUnknown)}"
                                  ng-click="createSub()">新建此科目
                              </li>
                              <li class="forbidden hide"
                                  ng-class="{'hide' : options.hints.showCreate || (!subUnknown)}">[无效科目]
                              </li> <!-- ngRepeat: sub in cacheList --> </ul>
                          </div>
                        </ui-subselector>
                        <div click-test="" listen="assistSelector.enableClickTest" onmouselost="assistBoxOnblur()"
                             class="assistBox ng-isolate-scope ng-hide" ng-show="assistSelector.on"
                             id="assistBox-ui-et-512245" tzaolbyw="">
                          <ui-assist-selector source="assistSelector.source" on="assistSelector.on"
                                              suggestion="assistSelector.suggestion" auto-comfirm="true"
                                              output="assistSelector.output"
                                              enable-click-test="assistSelector.enableClickTest"
                                              selected="cacheEntry.origin.items" finish="assistSelector.finish"
                                              callback="entryAssistSelected()" class="ng-isolate-scope">
                            <div class="assistSelector ng-hide" ng-show="on">
                              <div class="content"> <!-- ngRepeat: (type, select) in selector --> </div>
                              <div class="footer ng-hide" ng-show="!autoComfirm">
                                <div class="btnBox">
                                  <div class="btn-confirm solidBtn" ng-click="confirm()"> 确认</div>
                                  <div class="btn-more solidBtn" ng-click="more()"> 确认并继续</div>
                                </div>
                              </div>
                              <ui-assist-creator on="creator.on" source="creator.source" output="suggestion"
                                                 callback="created()" class="ng-isolate-scope">
                                <div class="site-mask anime" ng-class="{'site-mask--shade': on}">
                                  <div class="pop-container site-popup anime assistCreator"
                                       ng-class="{'site-popup--expand' : on}"><p class="title"> 添加辅助核算项 </p>
                                    <div class="icon-close" ng-click="close()"></div>
                                    <div class="content">
                                      <div class="item"><label for="assistCreator-code-rxknlzoh">编码</label>
                                        <div class="inputBox"><input type="text" id="assistCreator-code-rxknlzoh"
                                                                     ng-model="creator.code"
                                                                     class="ng-pristine ng-untouched ng-valid ng-empty">
                                        </div>
                                      </div>
                                      <div class="item"><label for="assistCreator-name-rxknlzoh">名称</label>
                                        <div class="inputBox"><input type="text" id="assistCreator-name-rxknlzoh"
                                                                     ng-model="creator.name"
                                                                     class="ng-pristine ng-untouched ng-valid ng-empty">
                                        </div>
                                      </div>
                                      <div class="item ng-hide" ng-show="creator.type === 'inventory'"><label
                                        for="assistCreator-unit-rxknlzoh">单位</label>
                                        <div class="inputBox"><input type="text" id="assistCreator-unit-rxknlzoh"
                                                                     ng-model="creator.unit"
                                                                     class="ng-pristine ng-untouched ng-valid ng-empty">
                                        </div>
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
                              </ui-assist-creator>
                            </div>
                          </ui-assist-selector>
                        </div>
                        <div id="accAttrBox-ui-et-512245" class="accAttrBox ng-isolate-scope" click-test=""
                             listen="options.active" onmouselost="accAttrBoxOnBlur()" ng-style="accAttrBox.on &amp;&amp;{
             'pointer-events' : 'painted',
             'opacity' : '1'
         }" nenopqab="">
                          <div class="accAttrContainer">
                            <div class="accRow ng-hide" ng-show="cacheEntry.isAmount"><p class="accTag">数量:</p> <input
                              class="accInput ng-pristine ng-untouched ng-valid ng-empty" type="text"
                              ng-model="cacheEntry.amount" ng-disabled="freeze" ng-focus="accAttrAmountOnFocus($event)"
                              ng-blur="accAttrAmountOnBlur()" ng-change="accAttrAmountOnChange()"></div>
                            <div class="accRow ng-hide" ng-show="cacheEntry.isAmount"><p class="accTag">单价:</p> <input
                              class="accInput ng-pristine ng-untouched ng-valid ng-empty" type="text"
                              ng-model="cacheEntry.price" ng-disabled="freeze" ng-focus="accAttrPriceOnFocus($event)"
                              ng-blur="accAttrPriceOnBlur()" ng-change="accAttrPriceOnChange()"></div>
                            <div class="accRow ng-hide" ng-show="cacheEntry.isForeign"><p class="accTag ng-binding">
                              :</p> <input class="accInput ng-pristine ng-untouched ng-valid ng-empty" type="text"
                                           ng-model="cacheEntry.currency" ng-disabled="freeze"
                                           ng-focus="accAttrCurrencyOnFocus($event)" ng-blur="accAttrCurrencyOnBlur()"
                                           ng-change="accAttrCurrencyOnChange()"></div>
                            <div class="accRow ng-hide" ng-show="cacheEntry.isForeign"><p class="accTag">汇率:</p> <input
                              class="accInput ng-pristine ng-untouched ng-valid ng-empty" type="text"
                              ng-model="cacheEntry.rate" ng-disabled="freeze" ng-focus="accAttrRateOnFocus($event)"
                              ng-blur="accAttrRateOnBlur()" ng-change="accAttrRateOnChange()"></div>
                            <div class="accFooter">
                              <div class="boxButton accCancel com-button anime ng-isolate-scope com-button--cancel"
                                   ng-class="class" ng-click=";click();" ui-button="" btn-type="cancel"
                                   btn-click="accAttrBoxCancel()">
                                <ng-transclude><span class="ng-scope">取消</span></ng-transclude>
                              </div>
                              <div class="boxButton accSave com-button anime ng-isolate-scope com-button--ok"
                                   ng-class="class" ng-click=";click();" ui-button=""
                                   btn-click="accAttrBoxOk(cacheEntry)">
                                <ng-transclude><span class="ng-scope">保存</span></ng-transclude>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="balanceBox-ui-et-512245" class="balanceBox" ng-style="balanceBox.on &amp;&amp; {
             'pointer-events' : 'painted',
             'opacity' : '1'
         }"><p ng-style="isBalanceNegative &amp;&amp; {
            'color' : 'red'
        }" class="ng-binding">余额：0.00</p></div>
                        <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                          <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                        </div>
                        <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                          <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                        </div>
                      </div>
                    </div>
                    <div class="reRobot ng-hide" ng-show="isNeedConfirm">
                      <aside>
                        <div>人工智能已为您修正：</div>
                      </aside>
                      <aside> <!-- ngRepeat: tip in robotTips --> </aside>
                    </div>
                    <div class="reSum">
                      <div class="reSumRow">
                        <div class="info">借方总计:</div>
                        <div class="reSumValue ng-binding">0.00</div>
                      </div>
                      <div class="reSumRow">
                        <div class="info">贷方总计:</div>
                        <div class="reSumValue ng-binding">0.00</div>
                      </div>
                      <div class="reSumRow">
                        <div class="info">差值:</div>
                        <div class="reSumValue ng-binding">0.00</div>
                      </div>
                    </div>
                    <div class="reFooter">
                      <div class="button footBtn template ng-hide" ng-show="lockTag &amp;&amp; isMyAccount"
                           ng-click="newTemplate()">存储模板
                      </div>
                      <div class="button footBtn template ng-hide" ng-show="!lockTag &amp;&amp; isMyAccount"> 模板
                        <div class="selectBox">
                          <div class="button item new" ng-click="newTemplate()">存储模板</div>
                          <div class="button item use" ng-click="useTemplate()">使用模板</div>
                        </div>
                      </div>
                      <div class="footbtn batch ng-hide" ng-show="canBatchEdit">
                        <div class="icon-25 batch-select" ng-class="{'batch-selected': batchMode}"
                             ng-click="swicthBatch()"></div>
                        批量编辑
                      </div>
                      <div class="footBtn prev com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                           ng-click=";click();" ng-hide="getResourceDataChangeFlag()" ui-button="" btn-click="prevRes()"
                           btn-type="hollow">
                        <ng-transclude><span class="ng-scope">上一张</span></ng-transclude>
                      </div>
                      <div class="footBtn next com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                           ng-click=";click();" ng-hide="getResourceDataChangeFlag()" ui-button="" btn-click="nextRes()"
                           btn-type="hollow">
                        <ng-transclude><span class="ng-scope">下一张</span></ng-transclude>
                      </div>
                      <div class="footBtn cancel com-button anime ng-isolate-scope com-button--cancel ng-hide"
                           ng-class="class" ng-click=";click();" ng-show="getResourceDataChangeFlag()" ui-button=""
                           btn-click="cancel()" btn-type="cancel">
                        <ng-transclude><span class="ng-scope">取消</span></ng-transclude>
                      </div>
                      <p class="counter ng-binding">1/0</p>
                      <div class="footBtn save com-button anime ng-isolate-scope com-button--ok ng-hide"
                           ng-class="class" ng-click=";click();" ng-show="getResourceDataChangeFlag()" ui-button=""
                           btn-click="save()">
                        <ng-transclude><span class="ng-scope">保存</span></ng-transclude>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ui-resource-editor>
          <ui-bank-editor></ui-bank-editor>
          <ui-subject-creator class="ng-isolate-scope">
            <div class="site-mask anime" id="ui-sc" ng-class="{'site-mask--shade': on}">
              <div windowize="" class="site-popup anime ng-isolate-scope" id="ui-sc-c"
                   ng-class="{'site-popup--expand': on}" bdcvvzrn=""
                   style="transform-style: preserve-3d; transition: all 50ms ease 0s;">
                <div class="button popupExit icon-25 g-icon-close" ng-click="close()"></div>
                <p class="popupTitle">新建子级科目</p>
                <div class="popupContent">
                  <div class="row"><p class="tag">上级科目</p>
                    <div class="inputWrapper"><input class="parent anime ng-pristine ng-untouched ng-valid ng-empty"
                                                     type="text" ng-model="subject.parent"
                                                     ng-click="parentOnClick($event)" ng-focus="parentOnFocus($event)"
                                                     ng-blur="parentOnBlur()"></div>
                  </div>
                  <div class="row"><p class="tag">科目名称</p>
                    <div class="inputWrapper"><input class="name anime ng-pristine ng-untouched ng-valid ng-empty"
                                                     type="text" ng-model="subject.name"></div>
                  </div>
                  <div class="row"><p class="tag">外币符号</p>
                    <div class="inputWrapper"> <!-- ngIf: !curLock --><select
                      class="currency anime ng-pristine ng-untouched ng-valid ng-scope ng-empty"
                      ng-model="subject.currency" ng-options="cur.type as cur.title for cur in currencies"
                      ng-if="!curLock">
                      <option value="?" selected="selected"></option>
                      <option value="string:CNY"></option>
                      <option label="USD-美元" value="string:USD">USD-美元</option>
                      <option label="EUR-欧元" value="string:EUR">EUR-欧元</option>
                      <option label="JPY-日元" value="string:JPY">JPY-日元</option>
                      <option label="HKD-港元" value="string:HKD">HKD-港元</option>
                      <option label="GBP-英镑" value="string:GBP">GBP-英镑</option>
                      <option label="AUD-澳元" value="string:AUD">AUD-澳元</option>
                      <option label="NZD-新西兰元" value="string:NZD">NZD-新西兰元</option>
                      <option label="SGD-新加坡元" value="string:SGD">SGD-新加坡元</option>
                      <option label="CHF-瑞士法郎" value="string:CHF">CHF-瑞士法郎</option>
                      <option label="CAD-加拿大元" value="string:CAD">CAD-加拿大元</option>
                      <option label="MYR-马来西亚林吉特" value="string:MYR">MYR-马来西亚林吉特</option>
                      <option label="RUB-俄罗斯卢布" value="string:RUB">RUB-俄罗斯卢布</option>
                      <option label="KRW-韩元" value="string:KRW">KRW-韩元</option>
                      <option label="INR-印度卢比" value="string:INR">INR-印度卢比</option>
                      <option label="IDR-印尼盾" value="string:IDR">IDR-印尼盾</option>
                      <option label="SEK-瑞典克朗" value="string:SEK">SEK-瑞典克朗</option>
                    </select><!-- end ngIf: !curLock --> <!-- ngIf: curLock --> </div>
                  </div>
                  <div class="row"><p class="tag">计量单位</p>
                    <div class="inputWrapper"><p class="warn ng-hide" ng-show="!isUnitValid">最多不超过4个汉字或8个英文字母</p> <input
                      class="unit anime ng-pristine ng-untouched ng-valid ng-empty" type="text" ng-model="subject.unit"
                      ng-change="unitOnChange()"></div>
                  </div>
                </div>
                <div class="popupFooter">
                  <div class="footBtn cancel com-button anime ng-isolate-scope com-button--cancel" ng-class="class"
                       ng-click=";click();" ui-button="" btn-type="cancel" btn-click="close()">
                    <ng-transclude><span class="ng-scope">取消</span></ng-transclude>
                  </div>
                  <div class="footBtn ok com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                       ng-click=";click();" ui-button="" btn-click="ok()">
                    <ng-transclude><span class="ng-scope">确定</span></ng-transclude>
                  </div>
                </div>
                <ui-subselector source="subjects" filter="subject.parent" output="subject.out" on="subSelector.on"
                                options="subSelector" cfmsub="subjectSelected()" class="ng-isolate-scope"
                                id="ui-sub-483049"
                                style="position: fixed; z-index: 1; top: 0px; left: 0px; width: 0px; height: 0px;">
                  <div id="ui-ss-container" click-test="" listen="options.on" onmouselost="ui_close()"
                       class="ng-isolate-scope" awilbcln="" style="top: 0px; left: 0px; display: none;">
                    <ul>
                      <li ng-class="{'hide' : (!options.hints.showCreate) || (!subUnknown)}" ng-click="createSub()"
                          class="hide">新建此科目
                      </li>
                      <li class="forbidden" ng-class="{'hide' : options.hints.showCreate || (!subUnknown)}">[无效科目]</li>
                      <!-- ngRepeat: sub in cacheList --> </ul>

                  </div>
                </ui-subselector>
              </div>
            </div>
          </ui-subject-creator>
          <div class="site-mask anime ng-isolate-scope" ng-class="{'site-mask--shade': on}">
            <div class="site-popup anime popup-spinner flex--column" ng-class="{'site-popup--expand': on}">
              <div class="site-popup_head">
                <div class="site-popup_title">小君提醒您：</div>
              </div>
              <div class="site-popup_body">
                <div class="loading-container">
                  <div class="loading">
                    <div class="l1">
                      <div></div>
                    </div>
                    <div class="l2">
                      <div></div>
                    </div>
                    <div class="l3">
                      <div></div>
                    </div>
                    <div class="l4">
                      <div></div>
                    </div>
                  </div>
                  <p class="ng-binding">正在加载中</p></div>
              </div>
            </div>
          </div>
          <div class="site-mask anime ng-isolate-scope" ng-class="{'site-mask--shade': on}">
            <div class="site-popup anime popup-message flex--column" ng-class="{'site-popup--expand': on}">
              <div class="site-popup_head">
                <div class="site-popup_title">小君提醒您：</div>
                <div class="site-popup_close g-icon-close" ng-click="hide()"></div>
              </div>
              <div class="site-popup_body">
                <div class="site-popup_type">
                  <div class="typeIcon g-icon-info"></div>
                  <p class="typeTitle typeTitle--info"></p></div>
                <div class="site-popup_message"><p v-hide="msgList" class="ng-binding"></p>
                  <div v-show="msgList" class="msgList_wrapper" id="msgListWrapper">
                    <div class="site-popup_msgList"> <!-- ngRepeat: x in msgList track by $index --></div>
                  </div>
                </div>
              </div>
              <div class="site-popup_footer"></div>
            </div>
          </div>
          <div class="site-mask anime ng-isolate-scope" ng-class="{'site-mask--shade': on}">
            <div class="site-popup anime popup-confirm flex--column" ng-class="{'site-popup--expand': on}">
              <div class="site-popup_head">
                <div class="site-popup_title">小君提醒您：</div>
              </div>
              <div class="site-popup_body">
                <div class="site-popup_type">
                  <div class="typeIcon g-icon-warn"></div>
                  <p class="typeTitle typeTitle--warn ng-binding"></p></div>
              </div>
              <div class="site-popup_footer">
                <div class="btn--cancel com-button anime ng-isolate-scope com-button--cancel" ng-class="class"
                     ng-click=";click();" ui-button="" btn-type="cancel" btn-click="abort()">
                  <ng-transclude><span class="ng-scope">否</span></ng-transclude>
                </div>
                <div class="btn--ok com-button anime ng-isolate-scope com-button--ok" ng-class="class"
                     ng-click=";click();" ui-button="" btn-type="ok" btn-click="confirm()">
                  <ng-transclude><span class="ng-scope">是</span></ng-transclude>
                </div>
              </div>
            </div>
          </div>
          <ui-voucher-template class="ng-scope"><!-- ngIf: voucherTpl.init.saveTplBody -->
            <!-- ngIf: voucherTpl.init.useTplBody --> </ui-voucher-template>
          <div class="site-mask anime arrearage-notice ng-scope" ng-class="{'site-mask--shade': on}">
            <div class="site-popup anime pop-container" ng-class="{'site-popup--expand': on}">
              <div class="arrearage-content">
                <div class="arrearage-content__msg">
                  <div class="title"><i class="title-icon"></i>
                    <p class="title-msg">您的账号已经欠款，请及时补缴！</p></div>
                  <div class="content"><p class="content-msg">3个工作日后如仍有欠款，系统会自动禁止该号登录。</p>
                    <p class="content-msg">如有疑问，请联系4006-820-668</p></div>
                </div>
                <div class="arrearage-content__img"></div>
              </div>
              <div class="arrearage-submitBox">
                <div class="btn-cancel" ng-click="close()">我知道了</div>
                <div class="btn-charge anime" ng-click="toCharge()">充值</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ui-view>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        // 客服标识是否需要展示
        canShow: false,
      }
    }
  }
</script>

<style src="../../../static/css/common.css">
</style>
<style src="./css/index.css" scoped></style>
