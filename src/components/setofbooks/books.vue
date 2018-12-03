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
                                    <li v-for="item in bookMenus" :key="item.index" class="ng-binding ng-scope" :class="item.name == menu.name ? 'bookHeadMenuOn' : ''" @click.stop="chooseMenu(item)" v-text="item.value"></li>
                                    <span class="hover_bar"></span> 
                                </ul> 
                            </div> 
                            <div class="bookOperate"> 
                                <div class="book-search_wrapper" v-if="menu.name !== 'assistBalances'"> 
                                    <el-date-picker v-model="query.yearMonth" type="month" placeholder="选择年月" format="yyyy-MM" value-format="yyyyMM"></el-date-picker>
                                    <input class="subjects" on-enter="searching()" type="text" v-model="query.search" placeholder="请输入搜索条件"> 
                                    <div class="searchButton" @click.stop="searching">检索</div> 
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
                            </div> 
                        </div> 
                    </div> 

                    <div class="page-content"> 
                        <!-- 总账 -->
                        <div class="bookContent ng-scope" v-if="menu.name == 'general'"> 
                            <div class="bookTableTitle"> 
                                <table> 
                                    <thead> 
                                        <tr> 
                                            <th class="col-ledger-subject span-10 subject-number" ng-click="switchDetails()">
                                                科目编号 
                                                <span ng-class="showDetailed? 'icon-put':'icon-put rotate-270'" class="icon-put"></span> 
                                            </th> 
                                            <th class="col-ledger-name span-22">科目名称</th> 
                                            <th class="col-ledger-issue span-10">期号</th> 
                                            <th class="col-ledger-brief span-12">摘要</th> 
                                            <th class="col-ledger-debit span-12">借方金额</th> 
                                            <th class="col-ledger-credit span-12">贷方金额</th> 
                                            <th class="col-ledger-direction span-7">方向</th> 
                                            <th class="col-ledger-balance span-12">余额</th> 
                                        </tr> 
                                    </thead> 
                                </table> 
                            </div> 
                            <div class="contentPage ps-theme-default" id="ledgerConTable"> 
                                <table class="bookTable"> 
                                    <tbody class="bookBody">
                                        <template v-for="(row, index) in listData" v-if="listData && listData.length > 0">
                                            <tr class="bookRow ng-scope" :key="index + '_one'"> 
                                                <td class="col-ledger-subject span-10" rowspan="3"> 
                                                    <div class="subjectText ng-binding" v-text="row.courseCoding"></div>
                                                </td> 
                                                <td class="col-ledger-name span-22 ng-binding" rowspan="3" :title="row.courseName" v-text="row.courseName"></td> 
                                                <td class="col-ledger-issue span-10 ng-binding" v-text="row.issue"></td> 
                                                <td class="col-ledger-brief span-12 ng-binding">期初余额</td> 
                                                <td class="col-ledger-debit span-12 ng-binding">{{row.debite1 | moneyFilter}}</td> 
                                                <td class="col-ledger-credit span-12 ng-binding">{{row.credit1 | moneyFilter}}</td> 
                                                <td class="col-ledger-direction fontColor span-7 ng-binding" :class="row.direction1 == 0? 'directionLend': row.direction1 == 2 ? 'directionLoan':'fontColor'" v-text="row.direction1 == 0 ? '借' : row.direction1 == 2 ? '贷' : '平'"></td> 
                                                <td class="col-ledger-balance span-12 ng-binding">{{row.residual1 | moneyFilter}}</td> 
                                            </tr>
                                            <tr class="bookRow ng-scope" :key="index + '_two'"> 
                                                <td class="col-ledger-subject span-10 ng-hide" rowspan=""> 
                                                    <div class="subjectText ng-binding" ></div>
                                                </td> 
                                                <td class="col-ledger-name span-22 ng-binding ng-hide" rowspan="" ></td>
                                                <td class="col-ledger-issue span-10 ng-binding" v-text="row.issue"></td> 
                                                <td class="col-ledger-brief span-12 ng-binding">本期合计</td> 
                                                <td class="col-ledger-debit span-12 ng-binding">{{row.debite2 | moneyFilter}}</td> 
                                                <td class="col-ledger-credit span-12 ng-binding">{{row.credit2 | moneyFilter}}</td> 
                                                <td class="col-ledger-direction fontColor span-7 ng-binding" :class="row.direction2 == 0? 'directionLend': row.direction2 == 2 ? 'directionLoan':'fontColor'" v-text="row.direction2 == 0 ? '借' : row.direction2 == 2 ? '贷' : '平'"></td> 
                                                <td class="col-ledger-balance span-12 ng-binding">{{row.residual2 | moneyFilter}}</td> 
                                            </tr>
                                            <tr class="bookRow ng-scope" :key="index + '_three'"> 
                                                <td class="col-ledger-subject span-10 ng-hide" rowspan=""> 
                                                    <div class="subjectText ng-binding" ></div>
                                                </td> 
                                                <td class="col-ledger-name span-22 ng-binding ng-hide" rowspan="" ></td>
                                                <td class="col-ledger-issue span-10 ng-binding" v-text="row.issue"></td> 
                                                <td class="col-ledger-brief span-12 ng-binding">本年累计</td> 
                                                <td class="col-ledger-debit span-12 ng-binding">{{row.debite3 | moneyFilter}}</td> 
                                                <td class="col-ledger-credit span-12 ng-binding">{{row.credit3 | moneyFilter}}</td> 
                                                <td class="col-ledger-direction fontColor span-7 ng-binding" :class="row.direction3 == 0? 'directionLend': row.direction3 == 2 ? 'directionLoan':'fontColor'" v-text="row.direction3 == 0 ? '借' : row.direction3 == 2 ? '贷' : '平'"></td> 
                                                <td class="col-ledger-balance span-12 ng-binding">{{row.residual3 | moneyFilter}}</td> 
                                            </tr>
                                        </template>
                                    </tbody> 
                                </table> 
                            </div> 
                        </div>
                        <!-- 明细账 -->
                        <div class="bookContent ng-scope" v-if="menu.name == 'subsidiary'"> 
                            <div class="bookTableTitle"> 
                                <table> 
                                    <thead> 
                                        <tr> 
                                            <th class="col-breakdown-subject span-10">科目编号</th> 
                                            <th class="col-breakdown-name span-20">科目名称</th> 
                                            <th class="col-breakdown-issue span-10">期号</th> 
                                            <th class="col-breakdown-number span-8">凭证编号</th> 
                                            <th class="col-breakdown-brief span-9">摘要</th> 
                                            <th class="col-breakdown-debit span-12">借方金额</th> 
                                            <th class="col-breakdown-credit span-12">贷方金额</th> 
                                            <th class="col-breakdown-direction span-7">方向</th> 
                                            <th class="col-breakdown-balance span-12">余额</th> 
                                        </tr> 
                                    </thead> 
                                </table> 
                            </div> 
                            <div class="contentPage" id="breakdownConTable"> 
                                <div class="searchBreak ng-scope" ng-if="hasBreakdown"> 
                                    <p class="ng-binding">财税通提醒您：请输入检索条件</p> 
                                </div>
                                <table class="bookTable"> 
                                    <tbody class="bookBody"> 
                                        <!-- ngRepeat: row in book.breakdown --> 
                                    </tbody> 
                                </table> 
                            </div> 
                            <div class="site-mask anime" ng-class="{'site-mask--shade': showDetail}"> 
                                <div class="site-popup anime booksDetailContainer" ng-class="{'site-popup--expand': showDetail}"> 
                                    <div class="voucherTop"> 
                                        <p>明细账详细</p> 
                                        <div class="vouDelBtn" ng-click="closeDetail()"></div> 
                                    </div> 
                                    <div class="voucherTableWrap"> 
                                        <div class="voucherCenter" id="voucherPro"> 
                                            <div class="bookTableTitle"> 
                                                <table> 
                                                    <thead> 
                                                        <tr> 
                                                            <th class="col-breakdown-subject span-10">科目编号</th> 
                                                            <th class="col-breakdown-name span-20">科目名称</th> 
                                                            <th class="col-breakdown-issue span-10">期号</th> 
                                                            <th class="col-breakdown-number span-8">凭证编号</th> 
                                                            <th class="col-breakdown-brief span-21">摘要</th> 
                                                            <th class="col-breakdown-debit span-9">借方金额</th> 
                                                            <th class="col-breakdown-credit span-9">贷方金额</th> 
                                                            <th class="col-breakdown-direction span-4">方向</th> 
                                                            <th class="col-breakdown-balance span-9">余额</th> 
                                                        </tr> 
                                                    </thead> 
                                                </table> 
                                            </div> 
                                            <div class="contentPage voucherDetail" id="breakdownDetailPopup"> 
                                                <div class="searchBreak" ng-show="book.detail.length == 0"> 
                                                    <p>财税通提醒您：系统未找到您要检索的明细账详细！</p> 
                                                </div> 
                                                <table class="bookTable"> 
                                                    <tbody class="bookBody"> 
                                                    </tbody> 
                                                </table> 
                                            </div> 
                                        </div> 
                                    </div> 
                                </div> 
                            </div> 
                        </div>
                        <!-- 余额表 -->
                        <div class="bookContent ng-scope" v-if="menu.name == 'balances'"> 
                            <div class="bookTableTitle balanceTitle">
                                <!-- 余额表表头 -->
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
                            <div class="contentPage ps-theme-default"> 
                                <table class="bookTable balanceTable"> 
                                    <tbody class="bookBody">
                                        <!-- 余额表主体 -->
                                        <tr class="bookRow ng-scope" ng-repeat="row in book.balances.balances | filter: filterBalance" ng-if="(showChild || row[0].length === 4 || row[1] === '合计') && (showEmptyValue || '' !== row[4].trim() || '' !== row[5].trim())"> 
                                            <td class="col-balance-subject span-9 ng-scope" ng-style="{'padding-left': (row[11].length ? ((row[11].length * 5) - 10) : ((row[0].length * 5) - 20)) + 'px'}" ng-if="row[1] !== '合计'" style="padding-left: 0px;"> 
                                                <div class="borderPic borderNone" ng-style="{'height': '28px'}" ng-class="row[0].length === 4 && row[10] !== 'item' ? 'borderNone':''" style="height: 28px;"> 
                                                    <div class="subjectText ng-binding">1001</div> 
                                                    <div class="icon-assist ng-hide" ng-show="row[10] === 'itemSubject'"></div> 
                                                </div> 
                                                <div class="icon-30 icon-detail" ng-click="viewSubDetail(row[0].trim())"></div> 
                                            </td>
                                            <td class="col-balance-name span-15 ng-binding ng-scope" title="库存现金" ng-if="row[1] !== '合计'">库存现金</td>
                                            <td class="col-balance-debit span-9 ng-binding"> </td> 
                                            <td class="col-balance-credit span-9 ng-binding"> </td> 
                                            <td class="col-balance-debit span-9 ng-binding"> </td> 
                                            <td class="col-balance-credit span-9 ng-binding">100.00</td> 
                                            <td class="col-balance-debit span-10 ng-binding"> </td> 
                                            <td class="col-balance-credit span-10 ng-binding">100.00</td> 
                                        </tr>
                                        <tr class="bookRow ng-scope" ng-repeat="row in book.balances.balances | filter: filterBalance" ng-if="(showChild || row[0].length === 4 || row[1] === '合计') && (showEmptyValue || '' !== row[4].trim() || '' !== row[5].trim())"> 
                                            <td class="col-balance-subject span-9 ng-scope" ng-style="{'padding-left': (row[11].length ? ((row[11].length * 5) - 10) : ((row[0].length * 5) - 20)) + 'px'}" ng-if="row[1] !== '合计'" style="padding-left: 0px;"> 
                                                <div class="borderPic borderNone" ng-style="{'height': '28px'}" ng-class="row[0].length === 4 && row[10] !== 'item' ? 'borderNone':''" style="height: 28px;"> 
                                                    <div class="subjectText ng-binding">2001</div> 
                                                    <div class="icon-assist ng-hide" ng-show="row[10] === 'itemSubject'"></div> 
                                                </div> 
                                                <div class="icon-30 icon-detail" ng-click="viewSubDetail(row[0].trim())"></div> 
                                            </td>
                                            <td class="col-balance-name span-15 ng-binding ng-scope" title="短期借款" ng-if="row[1] !== '合计'">短期借款</td>
                                            <td class="col-balance-debit span-9 ng-binding"> </td> 
                                            <td class="col-balance-credit span-9 ng-binding"> </td> 
                                            <td class="col-balance-debit span-9 ng-binding">100.00</td> 
                                            <td class="col-balance-credit span-9 ng-binding"> </td> 
                                            <td class="col-balance-debit span-10 ng-binding">100.00</td> 
                                            <td class="col-balance-credit span-10 ng-binding"> </td> 
                                        </tr>
                                        <tr class="bookRow ng-scope" ng-repeat="row in book.balances.balances | filter: filterBalance" ng-if="(showChild || row[0].length === 4 || row[1] === '合计') && (showEmptyValue || '' !== row[4].trim() || '' !== row[5].trim())"> 
                                            <td class="col-total span-28 ng-binding ng-scope" colspan="2" ng-if="row[1] === '合计'">合计</td>
                                            <td class="col-balance-debit span-9 ng-binding"> </td> 
                                            <td class="col-balance-credit span-9 ng-binding"> </td> 
                                            <td class="col-balance-debit span-9 ng-binding">100.00</td> 
                                            <td class="col-balance-credit span-9 ng-binding">100.00</td> 
                                            <td class="col-balance-debit span-10 ng-binding">100.00</td> 
                                            <td class="col-balance-credit span-10 ng-binding">100.00</td> 
                                        </tr>
                                    </tbody> 
                                </table> 
                            </div> 
                        </div>
                        <!-- 序时簿 -->
                        <div class="bookContent ng-scope" v-if="menu.name == 'chronological'"> 
                            <div class="bookTableTitle"> 
                                <table> 
                                    <thead> 
                                        <tr> 
                                            <th class="col- span-10">凭证编号</th> 
                                            <th class="col- span-10">期间</th> 
                                            <th class="col- span-20">摘要</th> 
                                            <th class="col- span-10">科目编号</th> 
                                            <th class="col- span-30">科目名称</th> 
                                            <th class="col- span-10">借方金额</th> 
                                            <th class="col- span-10">贷方金额</th> 
                                        </tr> 
                                    </thead> 
                                </table> 
                            </div> 
                            <div class="contentPage ps-theme-default" id="chronological"> 
                                <table class="bookTable vorcherTable"> 
                                    <tbody class="bookBody"> 
                                        <tr class="bookRow ng-scope" ng-repeat="row in book.voucher"> 
                                            <td class="col-voucher-subject span-10 ng-binding" rowspan="2" ng-show="row.first"> 1 </td> 
                                            <td class="col-voucher-period span-10 ng-binding" rowspan="2" ng-show="row.first"> 2018-10 </td> 
                                            <td class="col-voucher-digest span-20 ng-binding">测试</td> 
                                            <td class="col-voucher-number span-10 ng-binding">1001</td> 
                                            <td class="col-voucher-name span-30 ng-binding">库存现金</td> 
                                            <td class="col-voucher-debit span-10 ng-binding"> 100.00 </td> 
                                            <td class="col-voucher-credit span-10 ng-binding"> — </td> 
                                        </tr>
                                        <tr class="bookRow ng-scope" ng-repeat="row in book.voucher"> 
                                            <td class="col-voucher-subject span-10 ng-binding ng-hide" rowspan="2" ng-show="row.first"> 1 </td> 
                                            <td class="col-voucher-period span-10 ng-binding ng-hide" rowspan="2" ng-show="row.first"> 2018-10 </td> 
                                            <td class="col-voucher-digest span-20 ng-binding">测试2</td> 
                                            <td class="col-voucher-number span-10 ng-binding">2001</td> 
                                            <td class="col-voucher-name span-30 ng-binding">短期借款</td> 
                                            <td class="col-voucher-debit span-10 ng-binding"> — </td> 
                                            <td class="col-voucher-credit span-10 ng-binding"> 100.00 </td> 
                                        </tr>
                                    </tbody> 
                                </table> 
                            </div> 
                        </div>
                        <!-- 辅助核算明细账 -->
                        <div class="bookContent itemBreakdownContent ng-scope" v-if="menu.name == 'assistSubsidiary'"> 
                            <div class="bookTableTitle"> 
                                <table> 
                                    <thead> 
                                        <tr> 
                                            <th class="col-breakdown-itemCode span-6 ng-binding">客户编号</th> 
                                            <th class="col-breakdown-itemName span-10 ng-binding">客户名称</th> 
                                            <th class="col-breakdown-issue span-10">期号</th> 
                                            <th class="col-breakdown-subject span-10">科目编码</th> 
                                            <th class="col-breakdown-name span-14">科目名称</th> 
                                            <th class="col-breakdown-number span-5">凭证编号</th> 
                                            <th class="col-breakdown-brief span-10">摘要</th> 
                                            <th class="col-breakdown-debit span-10">借方金额</th>
                                            <th class="col-breakdown-credit span-10">贷方金额</th> 
                                            <th class="col-breakdown-direction span-5">方向</th> 
                                            <th class="col-breakdown-balance span-10">余额</th> 
                                        </tr> 
                                    </thead> 
                                </table> 
                            </div> 
                            <div class="navMenuBox"> 
                                <div v-for="navMenu in assistMenu.list" :class="navMenu.type === assistMenu.cur.type ? 'menuOn' : ''" ng-click="selectNavMenu(navMenu)" class="ng-binding ng-scope" :key="navMenu.index" v-text="navMenu.value"></div>
                            </div> 
                            <div class="contentPage ps-theme-default" id="itemBreakdownConTable"> 
                                <div class="searchBreak ng-scope" ng-if="0 === book.itemBreakdown[assistMenu.cur.type].length"> 
                                    <p class="ng-binding">财税通提醒您：辅助核算明细账不存在</p> 
                                </div>
                                <table class="bookTable"> 
                                    <tbody class="bookBody"> 
                                        <!-- ngRepeat: row in book.itemBreakdown[assistMenu.cur.type] --> 
                                    </tbody> 
                                </table> 
                            </div> 
                            <div class="site-mask anime" ng-class="{'site-mask--shade': showDetail}"> 
                                <div class="site-popup anime booksDetailContainer" ng-class="{'site-popup--expand': showDetail}"> 
                                    <div class="voucherTop"> 
                                        <p>明细账详细</p> 
                                        <div class="vouDelBtn" ng-click="closeDetail()"></div> 
                                    </div> 
                                    <div class="voucherTableWrap"> 
                                        <div class="voucherCenter" id="voucherPro"> 
                                            <div class="bookTableTitle"> 
                                                <table> 
                                                    <thead> 
                                                        <tr> 
                                                            <th class="col-breakdown-subject span-10">科目编号</th> 
                                                            <th class="col-breakdown-name span-20">科目名称</th> 
                                                            <th class="col-breakdown-issue span-10">期号</th> 
                                                            <th class="col-breakdown-number span-8">凭证编号</th> 
                                                            <th class="col-breakdown-brief span-21">摘要</th> 
                                                            <th class="col-breakdown-debit span-9">借方金额</th> 
                                                            <th class="col-breakdown-credit span-9">贷方金额</th> 
                                                            <th class="col-breakdown-direction span-4">方向</th> 
                                                            <th class="col-breakdown-balance span-9">余额</th> 
                                                        </tr> 
                                                    </thead> 
                                                </table> 
                                            </div> 
                                            <div class="contentPage voucherDetail" id="breakdownDetailPopup"> 
                                                <div class="searchBreak" ng-show="book.detail.length == 0"> 
                                                    <p>财税通提醒您：系统未找到您要检索的明细账详细！</p> 
                                                </div> 
                                                <table class="bookTable"> 
                                                    <tbody class="bookBody"> 
                                                        <!-- ngRepeat: row in book.detail --> 
                                                    </tbody> 
                                                </table> 
                                            </div> 
                                        </div> 
                                    </div> 
                                </div> 
                            </div> 
                        </div>
                        <!-- 辅助核算余额表 -->
                        <div class="bookContent itemBalanceContent ng-scope" v-if="menu.name == 'assistBalances'"> 
                            <div class="bookTableTitle balanceTitle"> 
                                <table> 
                                    <thead> 
                                        <tr> 
                                            <th rowspan="2" class="col-balance-subject span-9 ng-binding">客户编码</th> 
                                            <th rowspan="2" class="col-balance-name span-15 ng-binding">客户名称</th> 
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
                            <div class="navMenuBox"> 
                                <div ng-repeat="navMenu in assistMenu.list" ng-class="navMenu.type === assistMenu.cur.type ? 'menuOn' : ''" ng-click="selectNavMenu(navMenu)" class="ng-binding ng-scope menuOn"> 客户 </div>
                                <div ng-repeat="navMenu in assistMenu.list" ng-class="navMenu.type === assistMenu.cur.type ? 'menuOn' : ''" ng-click="selectNavMenu(navMenu)" class="ng-binding ng-scope"> 供应商 </div>
                                <div ng-repeat="navMenu in assistMenu.list" ng-class="navMenu.type === assistMenu.cur.type ? 'menuOn' : ''" ng-click="selectNavMenu(navMenu)" class="ng-binding ng-scope"> 部门 </div>
                                <div ng-repeat="navMenu in assistMenu.list" ng-class="navMenu.type === assistMenu.cur.type ? 'menuOn' : ''" ng-click="selectNavMenu(navMenu)" class="ng-binding ng-scope"> 员工 </div>
                                <div ng-repeat="navMenu in assistMenu.list" ng-class="navMenu.type === assistMenu.cur.type ? 'menuOn' : ''" ng-click="selectNavMenu(navMenu)" class="ng-binding ng-scope"> 存货 </div>
                                <div ng-repeat="navMenu in assistMenu.list" ng-class="navMenu.type === assistMenu.cur.type ? 'menuOn' : ''" ng-click="selectNavMenu(navMenu)" class="ng-binding ng-scope"> 项目 </div>
                            </div> 
                            <div class="contentPage ps-theme-default" id="itemBalanceConTable"> 
                                <!-- ngIf: 0 === book.itemBalance.itemBalances[assistMenu.cur.type].length -->
                                <div class="searchBreak ng-scope" ng-if="0 === book.itemBalance.itemBalances[assistMenu.cur.type].length"> 
                                    <p class="ng-binding">财税通提醒您：辅助核算余额表不存在</p> 
                                </div>
                                <!-- end ngIf: 0 === book.itemBalance.itemBalances[assistMenu.cur.type].length --> 
                                <table class="bookTable balanceTable"> 
                                    <tbody class="bookBody"> 
                                        <!-- ngRepeat: row in book.itemBalance.itemBalances[assistMenu.cur.type] --> 
                                    </tbody> 
                                </table> 
                            </div> 
                        </div>
                    </div>
                </div> 
            </div> 
        </div>
    </div>
</template>
<script>
import api from './api/accountBook'
import utils from "../../utils"
export default {
  data() {
    return {
        token: utils.dbGet("userInfo").token,
        adminId: utils.dbGet("userInfo").id,
        accountId: utils.dbGet("account").id,
        query: {
            yearMonth: '',
            search: ''
        },
        // 会计账簿tools
        bookMenus: [
            {index: 1, name: 'general', value: '总账'},
            {index: 2, name: 'subsidiary', value: '明细账'},
            {index: 3, name: 'balances', value: '余额表'},
            {index: 4, name: 'chronological', value: '序时簿'},
            {index: 5, name: 'assistSubsidiary', value: '辅助核算明细账'},
            {index: 6, name: 'assistBalances', value: '辅助核算余额表'}
        ],
        menu: {index: 3, name: 'balances', value: '余额表'},
        assistMenu: {
            list: [
                {index: 1, type: 'customer', value: '客户'},
                {index: 1, type: 'supplier', value: '供应商'},
                {index: 1, type: 'department', value: '部门'},
                {index: 1, type: 'employee', value: '员工'},
                {index: 1, type: 'stock', value: '存货'},
                {index: 1, type: 'project', value: '项目'},
            ],
            cur: {index: 1, type: 'customer', value: '客户'},
        },
        navMenu: {
            type: ''
        },
        listData: [],
    };
  },
  methods: {
      // 检索数据
      searching() {
          this.chooseMenu(this.menu)
      },
      // 选择tab菜单
      chooseMenu(opt) {
          this.menu = opt
          this.listData = []
          this.queryDataByMenu(this.menu)
          for (let menu of this.bookMenus) {
              if (menu && menu.index == opt.index) {
                menu.isSelected = true
              } else {
                menu.isSelected = false
              }
          }
      },
      // 根据菜单类型查询数据
      queryDataByMenu(opt) {
          if (opt && opt.name) {
            switch (opt.name) {
                case 'general':
                // 总账
                console.log("查询总账")
                this.getGenCon()
                break
                case 'subsidiary':
                // 明细账
                console.log("查询明细账")
                break
                case 'balances':
                // 余额表
                console.log("查询余额表")
                break
                case 'chronological':
                // 序时簿
                console.log("查询序时簿")
                break
                case 'assistSubsidiary':
                // 辅助核算明细账
                console.log("查询辅助核算明细账")
                break
                case 'assistBalances':
                // 辅助核算余额表
                console.log("查询辅助核算余额表")
                break
            }
          }
      },
      // 查询总账
      getGenCon() {
          let params = {
              accountSetId: this.accountId,
              token: this.token,
              yearMonth: this.getYearAndMonth(),
              search: this.query.search
          }
          console.log('查询总账入参：', JSON.stringify(params))
          api.queryAllByGenerals(params).then(res => {
              console.log('查询总账结果：', res.body)
              if (res.body.result == 0) {
                  this.listData = res.body.data
              }
          })
      },
      getYearAndMonth() {
        console.log(typeof this.query.yearMonth, this.query.yearMonth)
        if (typeof this.query.yearMonth == 'object') {
            let year = new Date(this.query.yearMonth).getFullYear()
            let month = new Date(this.query.yearMonth).getMonth() + 1
            if (month < 10) {
                month = '0' + month
            }
            console.log(year + '' + month)
            return year + '' + month
        } else {
            return this.query.yearMonth
        }
      }
  },
  created() {
    this.queryDataByMenu(this.menu)
    this.query.yearMonth = new Date()
  },
  filters: {
    moneyFilter(value) {
        if (utils.isExist(value)) {
            let hasPoint = value.toString().split(".")
            if (hasPoint.length == 1) {
                return value + ".00"
            } else if (hasPoint.length > 1) {
                if (hasPoint[1].length < 2) {
                    return value + "0"
                } else {
                    return Number(value).toFixed(2)
                }
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
  letter-spacing: 0.9px;
  color: rgba(42, 51, 59, 0.6);
  cursor: pointer;
}

.bookMenus ul li:hover {
  color: #2a333b;
  border-bottom: 5px solid rgba(95, 187, 252, 0.8);
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
.book-balance_wrapper,
.bookTitle .bookOperate {
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

.book-balance_wrapper,
.bookTitle .bookOperate {
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
  letter-spacing: 0.9px;
}
.book-balance_wrapper .selectSheetType > div {
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
.bookOperate .option-content,
.bookOperate .option-title {
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
.bookTable,
.bookTableTitle table {
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
.bookContent [class|="col"] {
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
.bookTable tr td:first-child,
.bookTable tr td:nth-child(2) {
  text-align: left;
  padding-left: 6px;
  background: #fff;
}
.balanceTable tr td:first-child,
.balanceTable tr td:nth-child(2) {
  background: none;
}

.col-balance-subject .borderPic {
  width: 100%;
  padding-left: 4px;
  border-left: 1px dashed #b7b8b9;
}
.contentPage .balanceTable .borderNone {
  border-left: none;
}
.icon-assist,
.subjectText {
  float: left;
}
.col-balance-subject .icon-detail {
  display: none;
  position: absolute;
  right: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background: url(./i/searchBook.png)
    no-repeat 50%;
  cursor: pointer;
}
.searchBreak {
    margin: 50px auto;
    background: url(./i/notFound.png) 50% no-repeat;
    padding-top: 200px;
    font-size: 18px;
    letter-spacing: 2px;
    text-align: center;
}
/**辅助核算右侧菜单*/
.itemBalanceContent, .itemBreakdownContent {
    padding-right: 30px;
}
.itemBalanceContent .navMenuBox {
    top: 60px;
}
.navMenuBox {
    width: 30px;
    color: #5fbbfc;
    text-align: center;
    position: absolute;
    right: 0;
}
.itemBreakdownContent .navMenuBox {
    top: 40px;
}
.navMenuBox>div {
    padding: 10px 4px;
    border-right: 1px solid #5fbbfc;
    border-bottom: 1px solid #5fbbfc;
    cursor: pointer;
}
.navMenuBox .menuOn, .navMenuBox>div:hover {
    color: #fff;
    background: #5fbbfc;
}
.navMenuBox .menuOn {
    cursor: default;
}
.navMenuBox>div:first-child {
    border-top-right-radius: 4px;
    border-top: 1px solid #5fbbfc;
}
.navMenuBox .menuOn, .navMenuBox>div:hover {
    color: #fff;
    background: #5fbbfc;
}

/**总账*/

.bookContent [class|=col] {
    display: table-cell;
    border-right: 1px solid #dadfe8;
    border-bottom: 1px solid #dadfe8;
}
.bookTable tr td:first-child, .bookTable tr td:nth-child(2) {
    text-align: left;
    padding-left: 6px;
    background: #fff;
}
.bookTable .bookRow:nth-child(2n) {
    background: #ebf4ff;
}
.bookTable .bookRow:hover {
  background: rgba(255, 232, 136, 0.5);
  cursor: default;
}
.balanceTable tr td:first-child, .balanceTable tr td:nth-child(2) {
    background: none;
}
.bookTable .directionLend {
    color: #00bc16;
}
.bookTable .directionLoan {
    color: rgba(255,0,0,.8);
}
.vorcherTable tr td:first-child, .vorcherTable tr td:nth-child(2) {
    text-align: center;
}
/**隐藏滚动条*/
#ledgerConTable::-webkit-scrollbar, #chronological::-webkit-scrollbar, #itemBreakdownConTable::-webkit-scrollbar, #itemBalanceConTable::-webkit-scrollbar {
  width: 0 !important;
}
#ledgerConTable, #chronological, #itemBreakdownConTable, #itemBalanceConTable {
  -ms-overflow-style: none !important;
  overflow: -moz-scrollbars-none !important;
}
</style>
