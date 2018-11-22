<template>
    <div>
        <div class="module-content ng-scope"> 
            <div class="module-content_wrapper"> 
                <div class="module-content_page"> 
                    <div class="page-title"> 
                        <div class="sheetTitle"> 
                            <div class="sheetMenus"> 
                                <ul> 
                                    <li class="text ng-binding ng-scope" v-for="menu in menus" :class="menu.isSelected ? 'setHeadMenuOn': ''" @click.stop="selectSheet(menu)" :key="menu.index" v-text="menu.title"></li>
                                    <span class="hover_bar"></span> 
                                </ul> 
                            </div> 
                            <div class="sheetOperate"> 
                                <div class="operate_wrapper"> 
                                    <div class="icon-operate" title="打印" ng-click="print(currentMenu)" v-if="1 != 1"></div> 
                                    <div class="btn-operate" @click.stop="exportReport">导出选择</div> 
                                    <div class="btn-operate viewMode" v-if="isAsset"> 
                                        <select class="select-item" v-model="assetDefault.type">
                                            <option :value="item.value" v-for="item in assetDefault.types" :key="item.index" v-text="item.title"></option>
                                        </select> 
                                        <div class="checkDomBox" data-toggle="tooltip" title="查看说明文档" ng-click="checkDomPdf()" v-if="1 != 1">?</div> 
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                    <div class="page-content">
                        <!-- 资产负债表 -->
                        <div class="sheetContent" v-if="currentMenu.type === 'balance'"> 
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
                            <div class="contentPage ps-theme-default" id="assetConTable"> 
                                <div class="searchBreak" ng-show="0===sheet.asset.length"> 
                                    <p class="ng-binding">财税通提醒您：资产负债表不存在</p> 
                                </div> 
                                <div class="sheetBody"> 
                                    <!-- ngRepeat: row in sheet.asset --> 
                                </div> 
                            </div> 
                        </div>

                        <!-- 利润表 -->
                        <div class="sheetContent" v-if="currentMenu.type === 'income'"> 
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
                                    <p class="ng-binding">财税通提醒您：利润表不存在</p> 
                                </div> 
                                <div class="sheetBody"> 
                                    <!-- ngRepeat: row in sheet.income --> 
                                </div> 
                            </div> 
                        </div>

                        <!-- 利润季表 -->
                        <div class="sheetContent incomeQuarterTable" v-if="currentMenu.type === 'incomeByQuarter'"> 
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
                                <div class="searchBreak" ng-show="0===sheet.incomeQuarter.length" v-if="1 != 1"> 
                                    <p class="ng-binding">财税通提醒您：利润季表不存在</p> 
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
                            <div class="sheetContent" v-if="currentMenu.type == 'cash'"> 
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

                        <!-- 现金流量季表 -->
                        <div class="sheetContent incomeQuarterTable" v-if="currentMenu.type === 'cashByQuarter'"> 
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
            // 头部tab菜单
            menus: [
                {index: 1, title: '资产负债表', isSelected: true, type: 'balance'},
                {index: 2, title: '利润表', isSelected: false, type: 'income'},
                {index: 3, title: '利润季表', isSelected: false, type: 'incomeByQuarter'},
                {index: 4, title: '现金流量表', isSelected: false, type: 'cash'},
                {index: 5, title: '现金流量季表', isSelected: false, type: 'cashByQuarter'}
            ],
            // 资产负债表选中标识
            isAsset: true,
            currentMenu: {index: 1, title: '资产负债表', isSelected: true, type: 'balance'},
            assetDefault: {
                types : [
                    {index: 1, title: '默认模式', value: 'default'},
                    {index: 2, title: '一级科目模式 Ⅰ', value: 'balance'},
                    {index: 3, title: '一级科目模式 Ⅱ', value: 'assign'},
                    {index: 4, title: '明细科目模式', value: 'child'},
                ],
                type: 'default'
            },
        }
    },
    created() {

    },
    filters: {

    },
    methods: {
        // tab切换
        selectSheet(opt) {
            console.log("tab切换:", opt)
            opt.isSelected = true
            this.currentMenu = opt
            if (opt.type == 'balance') {
                this.isAsset = true
            } else {
                this.isAsset = false
            }
            for (let menu of this.menus) {
                if (opt.type != menu.type) {
                    menu.isSelected = false
                }
            }
        },
        // select
        exportReport() {
            console.log("导出：", this.assetDefault.type)
        }
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

.sheetTitle .sheetOperate {
    width: 40%;
    height: 100%;
    float: right;
    padding-top: 10px;
}

.operate_wrapper {
    width: 100%;
    height: 100%;
}

.operate_wrapper .icon-operate {
    width: 30px;
    height: 30px;
    background: url(./i/print.png) 50% no-repeat;
    float: right;
    margin-left: 10px;
    cursor: pointer;
}

.operate_wrapper .btn-operate {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #5fbbfc;
    border-radius: 4px;
    float: right;
    margin-left: 10px;
    color: #5fbbfc;
}

.operate_wrapper .btn-operate:hover {
    cursor: pointer;
    color: #fff;
    background: #5fbbfc;
}

.operate_wrapper .viewMode {
    width: 135px;
    position: relative;
}

.viewMode .select-item {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-family: inherit;
}

.viewMode .checkDomBox {
    position: absolute;
    border: 1px solid #a9a9a9;
    background: #fff;
    color: #a9a9a9;
    width: 18px;
    line-height: 16px;
    border-radius: 50%;
    font-size: 12px;
    top: -8px;
    right: -8px;
    cursor: pointer;
}
/**表单主体*/
.sheetContent {
    height: 100%;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    border-radius: 3px;
}
.sheetTableTitle {
    min-height: 40px;
    color: #fff;
    background: #5fbbfd;
    border: 1px solid #dadfe8;
    font-weight: 400;
    border-bottom: none;
    border-radius: 3px 3px 0 0;
}
.sheetRow, .sheetTableTitle {
    display: table;
    width: 100%;
}
.sheetTableTitle p {
    line-height: 40px;
}
.sheetContent [class|=col] {
    display: table-cell;
    border-right: 1px solid #dadfe8;
    border-bottom: 1px solid #dadfe8;
}
.sheetTableTitle [class|=col] {
    position: relative;
    text-align: center;
}
.sheetContent .contentPage {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    position: relative;
    overflow-y: hidden;
    border: 1px solid #dadfe8;
    border-radius: 0 0 3px 3px;
    border-top: none;
}
.searchBreak {
    margin: 50px auto;
    background: url(./i/notFound.png) 50% no-repeat;
    padding-top: 200px;
    font-size: 18px;
    letter-spacing: 2px;
    text-align: center;
}

.sheetBody {
    position: absolute;
    width: 100%;
    font-size: 12px;
}

/**利润表*/
.sheetTableTitle .col-balance-switch:before, .sheetTableTitle .col-balance-switch span {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    top: 10px;
    right: -10px;
    background-color: #5fbbfc;
    cursor: pointer;
}

.sheetTableTitle .col-balance-switch span {
    display: block;
    opacity: .6;
    background-image: url(./i/interactive.png);
    z-index: 1;
    transition: .3s;
}

/**利润季表*/
.sheetRow p {
    height: 30px;
    padding: 5px 0;
    line-height: 20px;
    background: #fff;
    white-space: pre;
}
.sheetBody .sheetRow:hover p {
    background: rgba(255,232,136,.5);
}
.sheetContent [class|=col] {
    display: table-cell;
    border-right: 1px solid #dadfe8;
    border-bottom: 1px solid #dadfe8;
}
.sheetBody p:first-child, .sheetBody p:nth-child(5) {
    padding-left: 8px;
}
.incomeQuarterTable .sheetBody p:first-child {
    white-space: pre-wrap;
}
.sheetBody .col-row {
    text-align: center;
}
.sheetBody .col-balance, .sheetBody .col-quarter {
    text-align: right;
}
.sheetBody p:nth-child(3), .sheetBody p:nth-child(4), .sheetBody p:nth-child(7) {
    padding-right: 8px;
}
.sheetRow:nth-child(2n) p {
    background: #ebf4ff;
}


/**隐藏滚动条*/
#incomeQuarter::-webkit-scrollbar, #assetConTable::-webkit-scrollbar, #incomeConTable::-webkit-scrollbar, #incomeConTable::-webkit-scrollbar, #cash::-webkit-scrollbar, #cashQuarter::-webkit-scrollbar {
  width: 0 !important;
}
#incomeQuarter, #assetConTable, #incomeConTable, #incomeConTable, #cash, #cashQuarter{
  -ms-overflow-style: none !important;
  overflow: -moz-scrollbars-none !important;
  overflow: auto;
}
</style>