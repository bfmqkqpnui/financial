<template>
    <div>
        <div class="module-content ng-scope"> 
            <div class="module-content_wrapper"> 
                <div class="module-content_page"> 
                    <div class="page-title"> 
                        <div class="historyTitle"> 
                            <div class="historyMenus"> 
                                <ul>
                                    <li :class="tabType == 'ledger' ? 'historyHeadMenuOn': ''" @click="selectHistorySheet('ledger')" class="ng-binding ng-scope"> 总账 </li>
                                    <li :class="tabType == 'breakdown' ? 'historyHeadMenuOn': ''" @click="selectHistorySheet('breakdown')" class="ng-binding ng-scope"> 明细账 </li>
                                    <li :class="tabType == 'balance' ? 'historyHeadMenuOn': ''" @click="selectHistorySheet('balance')" class="ng-binding ng-scope"> 余额表 </li>
                                    <li :class="tabType == 'voucher' ? 'historyHeadMenuOn': ''" @click="selectHistorySheet('voucher')" class="ng-binding ng-scope"> 序时簿 </li>
                                    <span class="hover_bar"></span> 
                                </ul> 
                            </div> 
                        </div> 
                    </div> 
                    <div class="page-content"> 
                        <!-- 总账 -->
                        <div class="historyContent" v-if="tabType == 'ledger'"> 
                            <div class="historyTableTitle"> 
                                <table> 
                                    <thead> 
                                        <tr> 
                                            <th class="col-ledger-subject span-10">科目编号</th> 
                                            <th class="col-ledger-name span-25">科目名称</th> 
                                            <th class="col-ledger-issue span-10">期号</th> 
                                            <th class="col-ledger-brief span-12">摘要</th> 
                                            <th class="col-ledger-debit span-12">借方金额</th> 
                                            <th class="col-ledger-credit span-12">贷方金额</th> 
                                            <th class="col-ledger-direction span-4">方向</th> 
                                            <th class="col-ledger-balance span-12">余额</th> 
                                        </tr> 
                                    </thead> 
                                </table> 
                            </div> 
                            <div class="contentPage ps-container ps-theme-default">
                                <div class="searchBreak" ng-show="0 === histories.ledger.length"> 
                                    <p>财税通提醒您：未上传历史数据！</p> 
                                </div> 
                                <table class="historyTable"> 
                                    <tbody class="historyBody">
                                        <!-- ngRepeat: row in histories.ledger --> 
                                    </tbody> 
                                </table> 
                            </div> 
                        </div> 
                        <!-- 明细账 -->
                        <div class="historyContent" v-if="tabType == 'breakdown'">
                             <div class="historyTableTitle"> 
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
                            <div class="contentPage ps-container ps-theme-default"> 
                                <div class="searchBreak" ng-show="0 === histories.breakdown.length"> 
                                    <p>财税通提醒您：未上传历史数据！</p> 
                                </div> 
                                <table class="historyTable"> 
                                    <tbody class="historyBody"> 
                                        <!-- ngRepeat: row in histories.breakdown --> 
                                    </tbody> 
                                </table> 
                            </div> 
                        </div> 
                        <!-- 余额表 -->
                        <div class="historyContent" v-if="tabType == 'balance'"> 
                            <div class="historyTableTitle balanceTitle"> 
                                <table> 
                                    <thead> 
                                        <tr> 
                                            <th rowspan="2" class="col-balance-subject span-9" ng-click="switchChild()">
                                                科目编号 
                                                <span ng-class="showChild? 'icon-put':'icon-put rotate-270'" class="icon-put rotate-270"></span> 
                                            </th> 
                                            <th rowspan="2" class="col-balance-name span-15">科目名称</th> 
                                            <th colspan="2" class="col-balance-issue span-18">期初余额</th> 
                                            <th colspan="2" class="col-balance-issue span-18">本期发生额</th> 
                                            <th colspan="2" class="col-balance-issue span-18">本年累计发生额</th> 
                                            <th colspan="2" class="col-balance-issue span-20">期末余额</th> 
                                        </tr> 
                                        <tr> 
                                            <th class="col-debit span-9">借方</th> 
                                            <th class="col-lender span-9">贷方</th> 
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
                                <div class="searchBreak" ng-show="0 === histories.balance.length"> 
                                    <p>财税通提醒您：未上传历史数据！</p> 
                                </div> 
                                <table class="historyTable balanceTable"> 
                                    <tbody class="historyBody"> 
                                        <!-- ngRepeat: row in histories.balance | filter:query.str --> 
                                    </tbody> 
                                </table> 
                            </div>
                        </div> 
                        <!-- 序时簿 -->
                        <div class="historyContent" v-if="tabType == 'voucher'"> 
                            <div class="historyTableTitle"> 
                                <table> 
                                    <thead> 
                                        <tr> 
                                            <td class="col- span-10">凭证编号</td> 
                                            <td class="col- span-10">期间</td> 
                                            <td class="col- span-20">摘要</td> 
                                            <td class="col- span-10">科目编号</td> 
                                            <td class="col- span-30">科目名称</td> 
                                            <td class="col- span-10">借方金额</td> 
                                            <td class="col- span-10">贷方金额</td> 
                                        </tr> 
                                    </thead> 
                                </table> 
                            </div> 
                            <div class="contentPage ps-container ps-theme-default"> 
                                <div class="searchBreak" ng-show="0 === histories.voucher.length"> 
                                    <p>财税通提醒您：未上传历史数据！</p> 
                                </div> 
                                <table class="historyTable vorcherTable"> 
                                    <tbody class="historyBody"> 
                                        <!-- ngRepeat: row in histories.voucher --> 
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
import api from "./api/index";
import utils from "../../utils";
export default {
    data() {
        return {
            // 当前tab
            tabType: 'ledger',
        }
    },
    methods: {
        // tab选择事件
        selectHistorySheet(type) {
            if (type) {
                this.tabType = type
            } else {
                this.tabType = "ledger"
            }
        },
        // 加载中
        loading(type) {
            if (type) {
                this.$emit("loading", type)
            } else {
                this.$emit("loading", "hide")
            }
        },
    }
}
</script>

<style scoped>
.historyTitle {
    width: 100%;
    height: 40px;
}

.historyTitle .historyMenus {
    width: 40%;
    height: 100%;
    float: left;
}

.historyMenus ul li {
    height: 40px;
    line-height: 40px;
    float: left;
    margin-right: 20px;
    font-size: 14px;
    letter-spacing: .9px;
    color: rgba(42,51,59,.6);
    cursor: pointer;
}

.historyMenus ul li.historyHeadMenuOn {
    cursor: default;
    color: #2a333b;
    border-bottom: 5px solid #5fbbfc;
}

.historyMenus ul li:hover {
    color: #2a333b;
    border-bottom: 5px solid rgba(95,187,252,.8);
}

.historyTableTitle {
    min-height: 40px;
    line-height: 40px;
    color: #fff;
    background: #5fbbfd;
    font-weight: 400;
    text-align: center;
    border-radius: 3px 3px 0 0;
    border: 1px solid #dadfe8;
    border-bottom: none;
}

.historyTable, .historyTableTitle table {
    width: 100%;
    table-layout: fixed;
}

.historyTableTitle table thead tr th {
    font-weight: 400;
}

.historyContent [class|=col] {
    display: table-cell;
    border-right: 1px solid #dadfe8;
    border-bottom: 1px solid #dadfe8;
}

.historyContent .contentPage table tbody tr td:last-child, .historyTableTitle table thead tr th:last-child {
    border-right: none;
    padding-right: 15px;
}

.historyContent .contentPage {
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
</style>

