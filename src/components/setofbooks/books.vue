<template>
    <div>
        <div class="module-content ng-scope"> 
            <div class="module-content_wrapper"> 
                <div class="module-content_page"> 
                    <div class="page-title"> 
                        <div class="bookTitle"> 
                            <!-- 会计账簿 tab列表 -->
                            <div class="bookMenus"> 
                                <ul>
                                    <li ng-repeat="x in bookMenu" ng-class="x.type == menu.type? 'bookHeadMenuOn': ''" ng-click="selectBookSheet(x)" class="ng-binding ng-scope"> 总账 </li>
                                    <li ng-repeat="x in bookMenu" ng-class="x.type == menu.type? 'bookHeadMenuOn': ''" ng-click="selectBookSheet(x)" class="ng-binding ng-scope"> 明细账 </li>
                                    <li ng-repeat="x in bookMenu" ng-class="x.type == menu.type? 'bookHeadMenuOn': ''" ng-click="selectBookSheet(x)" class="ng-binding ng-scope bookHeadMenuOn"> 余额表 </li>
                                    <li ng-repeat="x in bookMenu" ng-class="x.type == menu.type? 'bookHeadMenuOn': ''" ng-click="selectBookSheet(x)" class="ng-binding ng-scope"> 序时簿 </li>
                                    <li ng-repeat="x in bookMenu" ng-class="x.type == menu.type? 'bookHeadMenuOn': ''" ng-click="selectBookSheet(x)" class="ng-binding ng-scope"> 辅助核算明细账 </li>
                                    <li ng-repeat="x in bookMenu" ng-class="x.type == menu.type? 'bookHeadMenuOn': ''" ng-click="selectBookSheet(x)" class="ng-binding ng-scope"> 辅助核算余额表 </li>
                                    <span class="hover_bar"></span> 
                                </ul> 
                            </div> 
                            <div class="bookOperate"> 
                                <div class="book-search_wrapper" ng-show="menu.type !== 'itemBalance'"> 
                                    <div class="selectedIssue beginIssue ng-binding" ng-click="issuePicker.beginIssue.show = true"> 
                                        <div class="com-issue ng-isolate-scope"> 
                                            <div class="com-issue_display ng-hide" ng-show="iShowTitle === 'true'" ng-click="showPicker()"> 
                                                <div class="display_icon icon-40"></div> 
                                                <div class="display_tag ng-binding">2018-08期</div> 
                                            </div> 
                                            <div class="com-issue_container anime com-issue_container--hidden" ng-class="{'com-issue_container--hidden': !show}"> 
                                                <div click-test="" listen="clicktest" onmouselost="hidePicker()" class="ng-isolate-scope" essfhzzl=""> 
                                                </div> 
                                            </div> 
                                        </div> 2018-08 
                                    </div> 
                                    <hr class="split"> 
                                        <div class="selectedIssue endIssue ng-binding" ng-click="issuePicker.endIssue.show = true"> 
                                            <div class="com-issue ng-isolate-scope"> 
                                                <div class="com-issue_display ng-hide" ng-show="iShowTitle === 'true'" ng-click="showPicker()"> 
                                                    <div class="display_icon icon-40"></div> 
                                                    <div class="display_tag ng-binding">2018-08期</div> 
                                                </div> 
                                                <div class="com-issue_container anime com-issue_container--hidden" ng-class="{'com-issue_container--hidden': !show}"> 
                                                    <div onmouselost="hidePicker()" class="ng-isolate-scope"></div> 
                                                </div> 
                                            </div> 2018-08 
                                        </div> 
                                        <input class="subjects ng-pristine ng-untouched ng-valid ng-isolate-scope ng-empty" on-enter="searching()" type="text" ng-model="query.subject" placeholder="多个搜索条件用逗号隔开"> 
                                        <div class="searchButton" ng-click="searching()">检索</div> 
                                    </div> 
                                    <div class="btn-options ng-hide" ng-show="menu.type === 'ledger' || menu.type === 'breakdown'" v-if="1 != 1"> 
                                        <div class="option-title"> 显示选项 </div> 
                                        <div class="option-content"> 
                                            <div class="option-item" ng-click="switchAssist()"> 
                                                <div class="ticked" ng-class="showAssist ? 'tickedOn':'ticked'"></div> 
                                                <div>辅助核算</div> 
                                            </div> 
                                            <div class="option-item" ng-click="switchEmptyValue()"> 
                                                <div class="ticked tickedOn" ng-class="showEmptyValue ? 'tickedOn':'ticked'"></div> 
                                                <div>显示空值</div> 
                                            </div> 
                                        </div> 
                                    </div> 
                                    <div class="book-balance_wrapper ng-scope" ng-if="menu.type === 'balances'  || menu.type === 'itemBalance'"> 
                                        <div class="selectSheetType selectBox ng-hide" ng-show="isShowAdditions"> 
                                            <div ng-click="showList()" class="ng-binding">其他余额表 
                                                <div class="icon-selectBalance"></div> 
                                            </div> 
                                            <ul class="balance-selectList ng-isolate-scope ng-hide" onmouselost="closeSelectList()" ng-show="additionList"> 
                                                <li ng-repeat="x in addition" ng-show="addition[$index].show()" ng-click="changeList(x)" class="ng-binding ng-scope ng-hide">外币金额</li>
                                                <li ng-repeat="x in addition" ng-show="addition[$index].show()" ng-click="changeList(x)" class="ng-binding ng-scope ng-hide">数量金额</li>
                                                <li ng-repeat="x in addition" ng-show="addition[$index].show()" ng-click="changeList(x)" class="ng-binding ng-scope ng-hide">数量外币</li>
                                                <li ng-repeat="x in addition" ng-show="addition[$index].show()" ng-click="changeList(x)" class="ng-binding ng-scope ng-hide">辅助核算外币金额</li>
                                                <li ng-repeat="x in addition" ng-show="addition[$index].show()" ng-click="changeList(x)" class="ng-binding ng-scope ng-hide">辅助核算数量金额</li>
                                                <li ng-repeat="x in addition" ng-show="addition[$index].show()" ng-click="changeList(x)" class="ng-binding ng-scope ng-hide">辅助核算数量外币</li>
                                            </ul> 
                                        </div> 
                                        <div class="btn-options" v-if="1 != 1"> 
                                            <div class="option-title"> 显示选项 </div> 
                                            <div class="option-content"> 
                                                <div class="option-item" ng-click="switchAssist()">
                                                    <div class="ticked" ng-class="showAssist ? 'tickedOn':'ticked'"></div> 
                                                    <div>辅助核算</div> 
                                                </div> 
                                                <div class="option-item" ng-click="switchEmptyValue()"> 
                                                    <div class="ticked tickedOn" ng-class="showEmptyValue ? 'tickedOn':'ticked'"></div> 
                                                    <div>显示空值</div> 
                                                </div> 
                                                <div class="option-item" ng-click="switchYearTotal()"> 
                                                    <div class="ticked" ng-class="showYearTotal ? 'tickedOn':'ticked'"></div> 
                                                    <div>本年累计</div> 
                                                </div> 
                                            </div> 
                                        </div> 
                                    </div>
                                    <div class="icon-download" title="下载" ng-click="export()" ng-hide="showAssist || menu.type === 'itemBreakdown' || filter.subAndName" v-if="1 != 1"></div> 
                                    <div class="icon-print" title="打印" ng-click="printBook()" ng-hide="showAssist || menu.type === 'itemBreakdown' || menu.type === 'itemBalance' || filter.subAndName" v-if="1 != 1"></div> 
                                </div> 
                            </div> 
                        </div> 

                        <div class="page-content"> 
                            <div class="site-mask anime" ng-class="{'site-mask--shade': showBlanceMask}"> 
                                <div class="site-popup anime foreignCurrencyWrap" ng-class="{'site-popup--expand': showBlanceMask}"> 
                                    <div class="foreignPopupTitle"> 
                                        <p class="ng-binding"></p> 
                                        <div class="icon-amountExport" title="下载" ng-click="export()" ng-hide="showAssist"></div> 
                                        <div class="icon-amountPrint" title="打印" ng-click="printBook()" ng-hide="showAssist"></div> 
                                        <div class="buttonPopupExit" ng-click="closeAmountPopup(false)"></div> 
                                    </div> 
                                    <div class="foreignContentPopup"> 
                                        <div class="bookTableTitle"> 
                                        </div> 
                                        <div class="contentPage ps-container ps-theme-default" scroll-behavior="top"> 
                                            <table class="bookTable amountTableBodyWrap"> 
                                                <tbody class="bookBody"> 
                                                </tbody> 
                                            </table> 
                                        </div> 
                                    </div> 
                                </div> 
                            </div> 
                            <div class="bookContent ng-scope" ng-if="menu.type == 'balances'"> 
                                <div class="bookTableTitle balanceTitle"> 
                                    <table> 
                                        <thead> 
                                            <tr> 
                                                <th rowspan="2" class="col-balance-subject span-9" ng-click="switchChild()">科目编号 
                                                    <span ng-class="showChild? 'icon-put':'icon-put rotate-270'" class="icon-put rotate-270"></span> 
                                                </th> 
                                                <th rowspan="2" class="col-balance-name span-15">科目名称</th> 
                                                <th colspan="2" class="col-balance-issue span-18">期初余额</th> 
                                                <th colspan="2" class="col-balance-issue span-18">本期发生额</th> 
                                                <th colspan="2" class="col-balance-issue span-20">期末余额</th> 
                                            </tr> 
                                            <tr> 
                                                <th class="col-debit span-9">借方</th> 
                                                <th class="col-lender span-9">贷方</th> 
                                                <th class="col-debit span-9">借方</th> 
                                                <th class="col-lender span-9">贷方</th> 
                                                <th class="col-debit span-10">借方</th> 
                                                <th class="col-lender span-10">贷方</th> 
                                            </tr> 
                                        </thead> 
                                    </table> 
                                </div> 
                                <div class="contentPage ps-container ps-theme-default"> 
                                    <table class="bookTable balanceTable"> 
                                        <tbody class="bookBody"> 
                                            <tr class="bookRow ng-scope" ng-repeat="row in book.balances.balances | filter: filterBalance" ng-if="(showChild || row[0].length === 4 || row[1] === '合计') && (showEmptyValue || '' !== row[4].trim() || '' !== row[5].trim())"> 
                                                <td class="col-balance-subject span-9 ng-scope" ng-style="{'padding-left': (row[11].length ? ((row[11].length * 5) - 10) : ((row[0].length * 5) - 20)) + 'px'}" ng-if="row[1] !== '合计'" style="padding-left: 0px;"> 
                                                    <div class="borderPic borderNone" ng-style="{'height': '28px'}" ng-class="row[0].length === 4 && row[10] !== 'item' ? 'borderNone':''" style="height: 28px;"> 
                                                        <div class="subjectText ng-binding">1601</div> 
                                                        <div class="icon-assist ng-hide" ng-show="row[10] === 'itemSubject'"></div> 
                                                    </div> 
                                                    <div class="icon-30 icon-detail" ng-click="viewSubDetail(row[0].trim())"></div> 
                                                </td>
                                                <td class="col-balance-name span-15 ng-binding ng-scope" title="固定资产" ng-if="row[1] !== '合计'">固定资产</td>
                                                <td class="col-balance-debit span-9 ng-binding"> </td> 
                                                <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                <td class="col-balance-debit span-9 ng-binding"> </td> 
                                                <td class="col-balance-credit span-9 ng-binding">10,000.00</td> 
                                                <td class="col-balance-debit span-10 ng-binding"> </td> 
                                                <td class="col-balance-credit span-10 ng-binding">10,000.00</td> 
                                            </tr>
                                            <tr class="bookRow ng-scope" ng-repeat="row in book.balances.balances | filter: filterBalance" ng-if="(showChild || row[0].length === 4 || row[1] === '合计') && (showEmptyValue || '' !== row[4].trim() || '' !== row[5].trim())"> 
                                                <td class="col-balance-subject span-9 ng-scope" ng-style="{'padding-left': (row[11].length ? ((row[11].length * 5) - 10) : ((row[0].length * 5) - 20)) + 'px'}" ng-if="row[1] !== '合计'" style="padding-left: 0px;"> 
                                                    <div class="borderPic borderNone" ng-style="{'height': '28px'}" ng-class="row[0].length === 4 && row[10] !== 'item' ? 'borderNone':''" style="height: 28px;"> 
                                                        <div class="subjectText ng-binding">1602</div> 
                                                        <div class="icon-assist ng-hide" ng-show="row[10] === 'itemSubject'"></div> 
                                                    </div> 
                                                    <div class="icon-30 icon-detail" ng-click="viewSubDetail(row[0].trim())"></div> 
                                                </td>
                                                <td class="col-balance-name span-15 ng-binding ng-scope" title="累计折旧" ng-if="row[1] !== '合计'">累计折旧</td>
                                                <td class="col-balance-debit span-9 ng-binding"> </td> 
                                                <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                <td class="col-balance-debit span-9 ng-binding">8,000.00</td> 
                                                <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                <td class="col-balance-debit span-10 ng-binding">8,000.00</td> 
                                                <td class="col-balance-credit span-10 ng-binding"> </td> 
                                            </tr>
                                            <tr class="bookRow ng-scope" ng-repeat="row in book.balances.balances | filter: filterBalance" ng-if="(showChild || row[0].length === 4 || row[1] === '合计') && (showEmptyValue || '' !== row[4].trim() || '' !== row[5].trim())"> 
                                                <td class="col-balance-subject span-9 ng-scope" ng-style="{'padding-left': (row[11].length ? ((row[11].length * 5) - 10) : ((row[0].length * 5) - 20)) + 'px'}" ng-if="row[1] !== '合计'" style="padding-left: 0px;"> 
                                                    <div class="borderPic borderNone" ng-style="{'height': '28px'}" ng-class="row[0].length === 4 && row[10] !== 'item' ? 'borderNone':''" style="height: 28px;"> 
                                                        <div class="subjectText ng-binding">1606</div> 
                                                        <div class="icon-assist ng-hide" ng-show="row[10] === 'itemSubject'"></div> 
                                                    </div> 
                                                    <div class="icon-30 icon-detail" ng-click="viewSubDetail(row[0].trim())"></div> 
                                                </td>
                                                <td class="col-balance-name span-15 ng-binding ng-scope" title="固定资产清理" ng-if="row[1] !== '合计'">固定资产清理</td>
                                                <td class="col-balance-debit span-9 ng-binding"> </td> 
                                                <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                <td class="col-balance-debit span-9 ng-binding">2,000.00</td> 
                                                <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                <td class="col-balance-debit span-10 ng-binding">2,000.00</td> 
                                                <td class="col-balance-credit span-10 ng-binding"> </td> 
                                            </tr>
                                            <tr class="bookRow ng-scope" ng-repeat="row in book.balances.balances | filter: filterBalance" ng-if="(showChild || row[0].length === 4 || row[1] === '合计') && (showEmptyValue || '' !== row[4].trim() || '' !== row[5].trim())"> 
                                                <td class="col-total span-28 ng-binding ng-scope" colspan="2" ng-if="row[1] === '合计'">合计</td>
                                                <td class="col-balance-debit span-9 ng-binding"> </td> 
                                                <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                <td class="col-balance-debit span-9 ng-binding">10,000.00</td> 
                                                <td class="col-balance-credit span-9 ng-binding">10,000.00</td> 
                                                <td class="col-balance-debit span-10 ng-binding">10,000.00</td> 
                                                <td class="col-balance-credit span-10 ng-binding">10,000.00</td> 
                                            </tr>
                                        </tbody> 
                                    </table> 
                                    <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
                                        <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                                    </div>
                                    <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
                                        <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                                    </div>
                                </div> 
                            </div>
                            <div class="printBox ng-scope"> 
                                <div ng-repeat="balance in print.balances.noChildBalances" ng-if="menu.type === 'balances' && !showChild && showEmptyValue && !(defaultModel.type === 'currencies' || defaultModel.type === 'quantities' || defaultModel.type === 'mixed')" style="page-break-after:always" class="noChild ng-scope"> 
                                    <div class="sheetTitle"> 
                                        <div class="name ng-binding">余额表</div> 
                                        <div class="info" style="overflow:hidden"> 
                                            <p class="company ng-binding">123234</p> 
                                            <p class="time ng-binding">2018-08</p> 
                                            <p class="hidecompany ng-binding">123234</p> 
                                            <p class="unit">单位: 元</p> 
                                        </div> 
                                    </div> 
                                    <div class="bookTableTitle balanceTitle"> 
                                        <table> 
                                            <tbody>
                                                <tr> 
                                                    <th rowspan="2" class="col-balance-subject span-9" ng-click="switchChild()">科目编号 </th> 
                                                    <th rowspan="2" class="col-balance-name span-17">科目名称</th> 
                                                    <th colspan="2" class="col-balance-issue span-18">期初余额</th> 
                                                    <th colspan="2" class="col-balance-issue span-18">本期发生额</th> 
                                                    <!-- ngIf: showYearTotal --> 
                                                    <th colspan="2" class="col-balance-issue span-18">期末余额</th> 
                                                </tr> 
                                                <tr> 
                                                    <th class="col-debit span-9">借方</th> 
                                                    <th class="col-lender span-9">贷方</th> 
                                                    <th class="col-debit span-9">借方</th> 
                                                    <th class="col-lender span-9">贷方</th> 
                                                    <!-- ngIf: showYearTotal --> <!-- ngIf: showYearTotal --> 
                                                    <th class="col-debit span-9">借方</th> 
                                                    <th class="col-lender span-9">贷方</th> 
                                                </tr> 
                                            </tbody>
                                        </table> 
                                    </div> 
                                    <div class="contentPage" id="balanceConTable"> 
                                        <table class="bookBody balanceTable"> 
                                            <tbody>
                                                <tr class="bookRow ng-scope" ng-repeat="row in balance" ng-if="(showChild || (row[0].length === 4 || row[1] === '合计')) && (showEmptyValue || '' !== row[4].trim() || '' !== row[5].trim())"> 
                                                    <!-- ngIf: row[1] !== '合计' -->
                                                    <td class="col-balance-subject span-9 ng-scope padingA" ng-class="row[0].length === 4 ? 'padingA':(row[0].length === 7? 'padingB':'padingC')" ng-if="row[1] !== '合计'"> 
                                                        <p class="borderPic ng-binding borderNone" ng-class="row[0].length === 4 ? 'borderNone':''">1601</p> 
                                                    </td>
                                                    <!-- end ngIf: row[1] !== '合计' --> <!-- ngIf: row[1] !== '合计' -->
                                                    <td class="col-balance-name span-17 ng-binding ng-scope" ng-if="row[1] !== '合计'">固定资产</td>
                                                    <!-- end ngIf: row[1] !== '合计' --> <!-- ngIf: row[1] === '合计' --> 
                                                    <td class="col-balance-debit span-9 ng-binding"> </td> 
                                                    <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                    <td class="col-balance-debit span-9 ng-binding"> </td> 
                                                    <td class="col-balance-credit span-9 ng-binding">10,000.00</td> 
                                                    <!-- ngIf: showYearTotal --> <!-- ngIf: showYearTotal --> 
                                                    <td class="col-balance-debit span-9 ng-binding"> </td> 
                                                    <td class="col-balance-credit span-9 ng-binding">10,000.00</td> 
                                                </tr>
                                                <tr class="bookRow ng-scope" ng-repeat="row in balance" ng-if="(showChild || (row[0].length === 4 || row[1] === '合计')) && (showEmptyValue || '' !== row[4].trim() || '' !== row[5].trim())"> 
                                                    <!-- ngIf: row[1] !== '合计' -->
                                                    <td class="col-balance-subject span-9 ng-scope padingA" ng-class="row[0].length === 4 ? 'padingA':(row[0].length === 7? 'padingB':'padingC')" ng-if="row[1] !== '合计'"> 
                                                        <p class="borderPic ng-binding borderNone" ng-class="row[0].length === 4 ? 'borderNone':''">1602</p> 
                                                    </td>
                                                    <!-- end ngIf: row[1] !== '合计' --> <!-- ngIf: row[1] !== '合计' -->
                                                    <td class="col-balance-name span-17 ng-binding ng-scope" ng-if="row[1] !== '合计'">累计折旧</td>
                                                    <!-- end ngIf: row[1] !== '合计' --> <!-- ngIf: row[1] === '合计' --> 
                                                    <td class="col-balance-debit span-9 ng-binding"> </td> 
                                                    <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                    <td class="col-balance-debit span-9 ng-binding">8,000.00</td> 
                                                    <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                    <!-- ngIf: showYearTotal --> <!-- ngIf: showYearTotal --> 
                                                    <td class="col-balance-debit span-9 ng-binding">8,000.00</td> 
                                                    <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                </tr>
                                                <tr class="bookRow ng-scope" ng-repeat="row in balance" ng-if="(showChild || (row[0].length === 4 || row[1] === '合计')) && (showEmptyValue || '' !== row[4].trim() || '' !== row[5].trim())"> 
                                                <!-- ngIf: row[1] !== '合计' -->
                                                    <td class="col-balance-subject span-9 ng-scope padingA" ng-class="row[0].length === 4 ? 'padingA':(row[0].length === 7? 'padingB':'padingC')" ng-if="row[1] !== '合计'"> 
                                                        <p class="borderPic ng-binding borderNone" ng-class="row[0].length === 4 ? 'borderNone':''">1606</p> 
                                                    </td>
                                                    <!-- end ngIf: row[1] !== '合计' --> <!-- ngIf: row[1] !== '合计' -->
                                                    <td class="col-balance-name span-17 ng-binding ng-scope" ng-if="row[1] !== '合计'">固定资产清理</td>
                                                    <!-- end ngIf: row[1] !== '合计' --> <!-- ngIf: row[1] === '合计' --> 
                                                    <td class="col-balance-debit span-9 ng-binding"> </td> 
                                                    <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                    <td class="col-balance-debit span-9 ng-binding">2,000.00</td> 
                                                    <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                    <!-- ngIf: showYearTotal --> <!-- ngIf: showYearTotal --> 
                                                    <td class="col-balance-debit span-9 ng-binding">2,000.00</td> 
                                                    <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                </tr>
                                                <tr class="bookRow ng-scope" ng-repeat="row in balance" ng-if="(showChild || (row[0].length === 4 || row[1] === '合计')) && (showEmptyValue || '' !== row[4].trim() || '' !== row[5].trim())"> 
                                                    <td class="col-total span-26 ng-binding ng-scope" colspan="2" ng-if="row[1] === '合计'">合计</td>
                                                    <!-- end ngIf: row[1] === '合计' --> 
                                                    <td class="col-balance-debit span-9 ng-binding"> </td> 
                                                    <td class="col-balance-credit span-9 ng-binding"> </td> 
                                                    <td class="col-balance-debit span-9 ng-binding">10,000.00</td> 
                                                    <td class="col-balance-credit span-9 ng-binding">10,000.00</td> 
                                                    <!-- ngIf: showYearTotal --> <!-- ngIf: showYearTotal --> 
                                                    <td class="col-balance-debit span-9 ng-binding">10,000.00</td> 
                                                    <td class="col-balance-credit span-9 ng-binding">10,000.00</td> 
                                                </tr>
                                            </tbody>
                                        </table> 
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
    return {};
  },
  methods: {},
  create() {},
  filters: {}
};
</script>
<style scoped>
[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak, .ng-hide:not(.ng-hide-animate) {
    display: none !important;
}

.bookTitle {
    width: 100%;
    height: 40px;
    position: relative;
}

.bookTitle .bookMenus {
    height: 100%;
    float: left;
}

.bookMenus ul li {
    height: 40px;
    line-height: 40px;
    float: left;
    margin-right: 20px;
    font-size: 14px;
    letter-spacing: .9px;
    color: rgba(42,51,59,.6);
    cursor: pointer;
}

.bookMenus ul li:hover {
    color: #2a333b;
    border-bottom: 5px solid rgba(95,187,252,.8);
}

.bookMenus ul li.bookHeadMenuOn {
    cursor: default;
    color: #2a333b;
    border-bottom: 5px solid #5fbbfc;
}

/**余额表*/
.bookTitle .bookOperate {
    height: 100%;
    position: absolute;
    right: 0;
    padding-top: 10px;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
}
.book-balance_wrapper, .bookTitle .bookOperate {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.book-search_wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.book-search_wrapper .selectedIssue {
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #ebf0f5;
    border-radius: 4px;
    border: 1px solid #5fbbfc;
}
.book-search_wrapper .split {
    width: 10px;
    margin: auto;
    border-bottom: 1px solid #5fbbfd;
    border-top: none;
}
/**年月日*/
.selectedIssue .com-issue_container {
    top: 30px;
}
.com-issue_container .year {
    position: relative;
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #ebf4ff;
}
/**搜索*/
.book-search_wrapper .subjects {
    height: 30px;
    background: #ebf0f5;
    border-radius: 4px;
    border: 1px solid #5fbbfc;
    width: 170px;
    margin-left: 10px;
}
.book-search_wrapper .searchButton {
    width: 60px;
    margin-left: 10px;
    color: #5fbbfc;
    background: #fff;
    border: 1px solid #5fbbfc;
    border-radius: 4px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
}

.book-balance_wrapper, .bookTitle .bookOperate {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.book-balance_wrapper {
    margin-right: 5px;
}
.book-balance_wrapper .selectSheetType {
    height: 30px;
    float: right;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #5fbbfc;
    border-radius: 4px;
    padding: 0 10px;
    outline: none;
    text-align: center;
    font-family: inherit;
    margin-left: 10px;
}
.book-balance_wrapper .selectBox {
    text-align: left;
    color: #5fbbfc;
    position: relative;
    letter-spacing: .9px;
}
.book-balance_wrapper .selectSheetType>div {
    margin-right: 10px;
}
.bookTitle .icon-selectBalance {
    width: 10px;
    height: 10px;
    position: absolute;
    right: 0;
    top: 0;
    margin: 9px;
    background: url(./i/down.png) 50% no-repeat;
}

.balance-selectList {
    width: 100%;
    position: absolute;
    top: 28px;
    left: 0;
    background: #fff;
    border: 1px solid #5fbbfd;
    z-index: 10;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
}

.bookOperate .btn-options {
    position: relative;
    margin-left: 10px;
}
.bookOperate .option-title {
    width: 80px;
    text-align: center;
    line-height: 30px;
    color: #5fbbfc;
}
.bookOperate .option-content, .bookOperate .option-title {
    border: 1px solid #5fbbfc;
    border-radius: 4px;
    background: #fff;
}
.bookOperate .option-content {
    display: none;
    padding: 10px;
    position: absolute;
    top: 35px;
    right: 0;
    z-index: 11;
}
.bookOperate .option-content:before {
    content: "";
    position: absolute;
    height: 5px;
    width: 100%;
    top: -5px;
    left: 0;
}
.bookOperate .option-content:after {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    top: -5px;
    right: 20px;
    border-style: solid;
    border-width: 0 6px 5px;
    border-color: transparent transparent #5fbbfc;
}
.bookOperate .option-item {
    width: 100px;
    color: #5fbbfc;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
/**科目余额表*/
.bookContent {
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
    text-align: center;
}
.bookTableTitle {
    width: 100%;
    line-height: 40px;
    color: #fff;
    background: #5fbbfd;
    text-align: center;
    border-left: 1px solid #dadfe8;
    border-top: 1px solid #dadfe8;
    border-radius: 3px 3px 0 0;
}
.balanceTitle {
    line-height: 60px;
}
.bookTable, .bookTableTitle table {
    width: 100%;
    table-layout: fixed;
}

.col-balance-subject {
    position: relative;
}
.balanceTitle table tr th {
    height: 30px;
    line-height: 30px;
}
.bookTableTitle table thead tr th {
    font-weight: 400;
}
.bookContent [class|=col] {
    display: table-cell;
    border-right: 1px solid #dadfe8;
    border-bottom: 1px solid #dadfe8;
}
.balanceTitle .col-balance-subject {
    position: relative;
}
.balanceTitle .col-balance-name {
    cursor: pointer;
}
.bookContent .contentPage {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    position: relative;
    overflow-y: hidden;
    border-radius: 0 0 3px 3px;
    border: 1px solid #dadfe8;
    border-top: none;
}
.bookTable tr td {
    height: 30px;
    font-size: 12px;
    line-height: 28px;
    padding: 0 2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.bookTable tr td:first-child, .bookTable tr td:nth-child(2) {
    text-align: left;
    padding-left: 6px;
    background: #fff;
}
.balanceTable tr td:first-child, .balanceTable tr td:nth-child(2) {
    background: none;
}
</style>
