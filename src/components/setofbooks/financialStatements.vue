<template>
    <div>
        <div class="module-content ng-scope"> 
            <div class="module-content_wrapper"> 
                <div class="module-content_page"> 
                    <div class="page-title"> 
                        <div class="sheetTitle"> 
                            <div class="sheetMenus"> 
                                <ul> 
                                <!-- ngRepeat: menu in menus -->
                                    <li class="text ng-binding ng-scope setHeadMenuOn" ng-repeat="menu in menus" ng-class="menu.title == currentMenu.title? 'setHeadMenuOn': ''" ng-click="selectSheet(menu)"> 资产负债表 </li>
                                    <!-- end ngRepeat: menu in menus -->
                                    <li class="text ng-binding ng-scope" ng-repeat="menu in menus" ng-class="menu.title == currentMenu.title? 'setHeadMenuOn': ''" ng-click="selectSheet(menu)"> 利润表 </li>
                                    <!-- end ngRepeat: menu in menus -->
                                    <li class="text ng-binding ng-scope" ng-repeat="menu in menus" ng-class="menu.title == currentMenu.title? 'setHeadMenuOn': ''" ng-click="selectSheet(menu)"> 利润季表 </li>
                                    <!-- end ngRepeat: menu in menus -->
                                    <li class="text ng-binding ng-scope" ng-repeat="menu in menus" ng-class="menu.title == currentMenu.title? 'setHeadMenuOn': ''" ng-click="selectSheet(menu)"> 现金流量表 </li>
                                    <!-- end ngRepeat: menu in menus -->
                                    <li class="text ng-binding ng-scope" ng-repeat="menu in menus" ng-class="menu.title == currentMenu.title? 'setHeadMenuOn': ''" ng-click="selectSheet(menu)"> 现金流量季表 </li>
                                    <!-- end ngRepeat: menu in menus --> 
                                    <span class="hover_bar"></span> 
                                </ul> 
                            </div> 
                            <div class="sheetOperate" ng-hide="currentMenu.type == 'finance' "> 
                                <div class="operate_wrapper"> 
                                    <div class="icon-operate" title="打印" ng-click="print(currentMenu)"></div> 
                                    <div class="btn-operate" ng-click="clickPopup()">导出选择</div> 
                                    <div class="btn-operate viewMode" ng-show="currentMenu.type == 'asset'"> 
                                        <select click-auth="" class="select-item ng-pristine ng-untouched ng-valid ng-not-empty" ng-model="default.type" ng-options="x.type as x.name for x in assetModels" ng-change="selectModel(default.type)">
                                            <option label="默认模式" value="string:default" selected="selected">默认模式</option>
                                            <option label="一级科目模式Ⅰ" value="string:balance">一级科目模式Ⅰ</option>
                                            <option label="一级科目模式 Ⅱ" value="string:assign">一级科目模式 Ⅱ</option>
                                            <option label="明细科目模式" value="string:child">明细科目模式</option>
                                        </select> 
                                        <div class="checkDomBox" data-toggle="tooltip" title="查看说明文档" ng-click="checkDomPdf()">?</div> 
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                    <div class="page-content">
                        <!-- 资产负债表 -->
                        <div class="sheetContent" ng-show="currentMenu.title == '资产负债表'"> 
                            <div class="sheetTableTitle"> 
                                <p class="col-asset span-20">资产</p> 
                                <p class="col-row span-5">行次</p> 
                                <p class="col-balance span-13">期末余额</p> 
                                <p class="col-balance span-12">年初余额</p> 
                                <p class="col-debt span-20">负债和所有者权益</p> 
                                <p class="col-row span-5">行次</p> 
                                <p class="col-balance span-13">期末余额</p> 
                                <p class="col-balance span-12">年初余额</p> 
                            </div> 
                            <div class="contentPage ps-container ps-theme-default" id="assetConTable" data-ps-id="e98ad079-23ca-953e-b596-c96f806671b4"> 
                                <div class="searchBreak" ng-show="0===sheet.asset.length"> 
                                    <p class="ng-binding">财税通提醒您：资产负债表不存在</p> 
                                </div> 
                                <div class="sheetBody"> 
                                    <!-- ngRepeat: row in sheet.asset --> 
                                </div> 
                                <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                                    <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                                </div>
                                <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                                    <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                                </div>
                            </div> 
                        </div>
                        <!-- 利润表 -->
                        <div class="sheetContent ng-hide" ng-show="currentMenu.title == '利润表'"> 
                            <div class="sheetTableTitle"> 
                                <p class="col-item span-65">项目</p> 
                                <p class="col-row span-5">行次</p> 
                                <!-- ngIf: sheetYearAfter --> <!-- ngIf: sheetYearAfter --> <!-- ngIf: !sheetYearAfter -->
                                <p ng-if="!sheetYearAfter" class="col-balance span-15 col-balance-switch ng-scope">
                                    本年累计金额 <span title="交换数据列的位置" ng-click="switchSheetYearMode()"></span> 
                                </p>
                                <!-- end ngIf: !sheetYearAfter --> <!-- ngIf: !sheetYearAfter -->
                                <p ng-if="!sheetYearAfter" class="col-balance span-15 ng-scope">本月金额</p>
                                <!-- end ngIf: !sheetYearAfter --> 
                            </div> 
                            <div class="contentPage" id="incomeConTable"> 
                                <div class="searchBreak" ng-show="0===sheet.income.length"> 
                                    <p class="ng-binding">财税通提醒您：资产负债表不存在</p> 
                                </div> 
                                <div class="sheetBody"> 
                                    <!-- ngRepeat: row in sheet.income --> 
                                </div> 
                            </div> 
                        </div>

                        <div class="sheetContent incomeQuarterTable ng-hide" ng-show="currentMenu.title == '利润季表'"> 
                            <div class="sheetTableTitle"> 
                                <p class="col-item span-40">项目</p> 
                                <p class="col-row span-5">行次</p> 
                                <p class="col-balance span-15">本年累计金额</p> 
                                <p class="col-quarter span-10">第一季度</p> 
                                <p class="col-quarter span-10">第二季度</p> 
                                <p class="col-quarter span-10">第三季度</p> 
                                <p class="col-quarter span-10">第四季度</p> 
                            </div> 
                            <div class="contentPage" id="incomeQuarter"> 
                                <div class="searchBreak ng-hide" ng-show="0===sheet.incomeQuarter.length"> 
                                    <p class="ng-binding">财税通提醒您：资产负债表不存在</p> 
                                </div> 
                                <div class="sheetBody"> 
                                    <!-- ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">一、营业收入</p> 
                                        <p class="col-row span-5 ng-binding">1</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">  减：营业成本</p> 
                                        <p class="col-row span-5 ng-binding">2</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">    税金及附加</p> 
                                        <p class="col-row span-5 ng-binding">3</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">      其中：消费税</p> 
                                        <p class="col-row span-5 ng-binding">4</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           营业税</p> 
                                        <p class="col-row span-5 ng-binding">5</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           城市维护建设税</p> 
                                        <p class="col-row span-5 ng-binding">6</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           资源税</p> 
                                        <p class="col-row span-5 ng-binding">7</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           土地增值税</p> 
                                        <p class="col-row span-5 ng-binding">8</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           城镇土地使用税、房产税、车船税、印花税</p> 
                                        <p class="col-row span-5 ng-binding">9</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           教育费附加、矿产资源补偿、排污费</p> 
                                        <p class="col-row span-5 ng-binding">10</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">    销售费用</p> 
                                        <p class="col-row span-5 ng-binding">11</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">      其中：商品修理费</p> 
                                        <p class="col-row span-5 ng-binding">12</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           广告费和业务宣传费</p> 
                                        <p class="col-row span-5 ng-binding">13</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">    管理费用</p> 
                                        <p class="col-row span-5 ng-binding">14</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">      其中：开办费</p> 
                                        <p class="col-row span-5 ng-binding">15</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           业务招待费</p> 
                                        <p class="col-row span-5 ng-binding">16</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           研究费</p> 
                                        <p class="col-row span-5 ng-binding">17</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">    财务费用</p> 
                                        <p class="col-row span-5 ng-binding">18</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">      其中：利息费用(收入以"-"号填列)</p> 
                                        <p class="col-row span-5 ng-binding">19</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">  加：投资收益(损失以"-"号填列)</p> 
                                        <p class="col-row span-5 ng-binding">20</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">二、营业利润(损失以"-"号填列)</p> 
                                        <p class="col-row span-5 ng-binding">21</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">  加：营业外收入</p> 
                                        <p class="col-row span-5 ng-binding">22</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">　　　 其中：政府补助</p> 
                                        <p class="col-row span-5 ng-binding">23</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">  减：营业外支出</p> 
                                        <p class="col-row span-5 ng-binding">24</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">　　　 其中：坏账损失</p> 
                                        <p class="col-row span-5 ng-binding">25</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           无法收回的长期债券投资损失</p> 
                                        <p class="col-row span-5 ng-binding">26</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           无法收回的长期股权投资损失</p> 
                                        <p class="col-row span-5 ng-binding">27</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           自然灾害等不可抗力因素造成的损失</p> 
                                        <p class="col-row span-5 ng-binding">28</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">           税收滞纳金</p> 
                                        <p class="col-row span-5 ng-binding">29</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">三、利润总额(亏损总额以"-"号填列)</p> 
                                        <p class="col-row span-5 ng-binding">30</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">  减：所得税费用</p> 
                                        <p class="col-row span-5 ng-binding">31</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.incomeQuarter"> 
                                        <p class="col-item span-40 ng-binding">四、净利润(净亏损以"-"号填列)</p> 
                                        <p class="col-row span-5 ng-binding">32</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                        <p class="col-quarter span-10 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.incomeQuarter --> 
                                    </div> 
                                </div> 
                            </div>
                            <!-- 现金流量表 -->
                            <div class="sheetContent ng-hide" ng-show="currentMenu.title == '现金流量表'"> 
                                <div class="sheetTableTitle"> <p class="col-item span-65">项目</p> 
                                <p class="col-row span-5">行次</p> 
                                <!-- ngIf: sheetYearAfter --> <!-- ngIf: sheetYearAfter --> <!-- ngIf: !sheetYearAfter -->
                                <p ng-if="!sheetYearAfter" class="col-balance span-15 col-balance-switch ng-scope"> 
                                    本年累计金额 <span title="交换数据列的位置" ng-click="switchSheetYearMode()"></span> 
                                </p>
                                <!-- end ngIf: !sheetYearAfter --> <!-- ngIf: !sheetYearAfter -->
                                <p ng-if="!sheetYearAfter" class="col-balance span-15 ng-scope">本月金额</p>
                                <!-- end ngIf: !sheetYearAfter --> 
                            </div> 
                            <div class="contentPage" id="cash"> 
                                <div class="searchBreak" ng-show="0===sheet.cash.length"> 
                                    <p class="ng-binding">财税通提醒您：资产负债表不存在</p> 
                                </div> 
                                <div class="sheetBody"> 
                                    <!-- ngRepeat: row in sheet.cash --> 
                                </div> 
                            </div> 
                        </div> 
                        <div class="sheetContent incomeQuarterTable ng-hide" ng-show="currentMenu.title == '现金流量季表'"> 
                            <div class="sheetTableTitle"> 
                                <p class="col-item span-32">项目</p> 
                                <p class="col-row span-5">行次</p> 
                                <p class="col-balance span-15">本年累计金额</p> 
                                <p class="col-quarter span-12">第一季度</p> 
                                <p class="col-quarter span-12">第二季度</p> 
                                <p class="col-quarter span-12">第三季度</p> 
                                <p class="col-quarter span-12">第四季度</p> 
                            </div> 
                            <div class="contentPage" id="cashQuarter"> 
                                <div class="searchBreak ng-hide" ng-show="0===sheet.cashQuarter.length"> 
                                    <p class="ng-binding">财税通提醒您：资产负债表不存在</p> 
                                </div> 
                                <div class="sheetBody"> 
                                    <!-- ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">一、经营活动产生的现金流量：</p> 
                                        <p class="col-row span-5 ng-binding"></p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  销售产成品、商品、提供劳务收到的现金</p> 
                                        <p class="col-row span-5 ng-binding">1</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  收到其他与经营活动有关的现金</p> 
                                        <p class="col-row span-5 ng-binding">2</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  购买原材料、商品、接受劳务支付的现金</p> 
                                        <p class="col-row span-5 ng-binding">3</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  支付的职工薪酬</p> 
                                        <p class="col-row span-5 ng-binding">4</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  支付的税费</p> 
                                        <p class="col-row span-5 ng-binding">5</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  支付其他与经营活动有关的现金</p> 
                                        <p class="col-row span-5 ng-binding">6</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  经营活动产生的现金流量净额</p> 
                                        <p class="col-row span-5 ng-binding">7</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">二、投资活动产生的现金流量：</p> 
                                        <p class="col-row span-5 ng-binding"></p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  收回短期投资、长期债券投资和长期股权投资收到的现金</p> 
                                        <p class="col-row span-5 ng-binding">8</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  取得投资收益收到的现金</p> 
                                        <p class="col-row span-5 ng-binding">9</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  处置固定资产、无形资产和其他非流动资产收回的现金净额</p> 
                                        <p class="col-row span-5 ng-binding">10</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  短期投资、长期债券投资和长期股权投资支付的现金</p> 
                                        <p class="col-row span-5 ng-binding">11</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  购建固定资产、无形资产和其他非流动资产支付的现金</p> 
                                        <p class="col-row span-5 ng-binding">12</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  投资活动产生的现金流量净额</p> 
                                        <p class="col-row span-5 ng-binding">13</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">三、筹资活动产生的现金流量：</p> 
                                        <p class="col-row span-5 ng-binding"></p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  取得借款收到的现金</p> 
                                        <p class="col-row span-5 ng-binding">14</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  吸收投资者投资收到的现金</p> 
                                        <p class="col-row span-5 ng-binding">15</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  偿还借款本金支付的现金</p> 
                                        <p class="col-row span-5 ng-binding">16</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  偿还借款利息支付的现金</p> 
                                        <p class="col-row span-5 ng-binding">17</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  分配利润支付的现金</p> 
                                        <p class="col-row span-5 ng-binding">18</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  筹资活动产生的现金流量净额</p> 
                                        <p class="col-row span-5 ng-binding">19</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">四、现金净增加额</p> 
                                        <p class="col-row span-5 ng-binding">20</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">  加：期初现金余额</p> 
                                        <p class="col-row span-5 ng-binding">21</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter -->
                                    <div class="sheetRow ng-scope" ng-repeat="row in sheet.cashQuarter"> 
                                        <p class="col-item span-32 ng-binding">五、期末现金余额</p> 
                                        <p class="col-row span-5 ng-binding">22</p> 
                                        <p class="col-balance span-15 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                        <p class="col-quarter span-12 ng-binding"> </p> 
                                    </div>
                                    <!-- end ngRepeat: row in sheet.cashQuarter --> 
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    created() {

    },
    filters: {

    },
    methods: {

    }
}
</script>
<style scoped>
/**头部标题*/
.sheetTitle {
    width: 100%;
    height: 40px;
}
.sheetTitle .sheetMenus {
    width: 60%;
    height: 100%;
    float: left;
}

.sheetMenus ul li {
    height: 40px;
    line-height: 40px;
    float: left;
    margin-right: 20px;
    font-size: 14px;
    letter-spacing: .9px;
    color: rgba(42,51,59,.6);
    cursor: pointer;
}

.sheetMenus ul li:hover {
    color: #2a333b;
    border-bottom: 5px solid rgba(95,187,252,.8);
}

.sheetMenus ul li.setHeadMenuOn {
    cursor: default;
    color: #2a333b;
    border-bottom: 5px solid #5fbbfc;
}


</style>