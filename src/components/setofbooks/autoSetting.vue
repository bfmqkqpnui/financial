<template>
    <div>
        <div class="module-content ng-scope"> 
            <div class="module-content_wrapper"> 
                <div class="module-content_page page-automation"> 
                    <div class="page-title"> 
                        <!-- ngRepeat: t in tabs -->
                        <p class="title ng-binding ng-scope title--on" ng-click="selectTab(t.type)">工资模块</p>
                        <!-- end ngRepeat: t in tabs --> 
                        <div class="title-gap"></div> 
                    </div> 
                    <div by="tab" class="ng-isolate-scope">
                        <div class="page-tab page-deficit ng-hide" ng-show="on"> 
                            <div class="page-tools"> </div> 
                            <div class="page-content"> 
                                <div class="pageWrapper deficit"> 
                                    <div class="tableContainer"> 
                                        <div class="deficit-options ng-isolate-scope ng-hide" ng-show="showOptionBox" click-test="" listen="showOptionBox" onmouselost="closeOptionBox()" zcyffmcd=""> 
                                            <!-- ngRepeat: sub in subjectsShow --> 
                                        </div> 
                                        <div class="table-fixedTitle"> 
                                            <table> 
                                                <thead> 
                                                    <tr> 
                                                        <th class="col-enable">启用</th> 
                                                        <th class="col-index">序号</th> 
                                                        <th class="col-monitor">监控科目</th> 
                                                        <th class="col-borrow">借款科目</th> 
                                                        <th class="col-balance">期末预留余额</th> 
                                                    </tr> 
                                                </thead> 
                                            </table> 
                                        </div> 
                                        <div class="table-content ps-theme-default" scroll="" scroll-behavior="top" data-ps-id="e39434eb-bcab-f255-11a1-3cb531f60e5c"> 
                                            <table> 
                                                <tbody class="contentBody"> 
                                                    <!-- ngRepeat: deficit in deficits --> 
                                                </tbody> 
                                            </table> 
                                        </div> 
                                        <div class="table-create" ng-show="isMyAccount"> 
                                            <table> 
                                                <tbody class="contentBody"> 
                                                    <tr> 
                                                        <td class="col-enable col-center"></td> 
                                                        <td class="col-reset col-center" ng-click="reset()">清空</td> 
                                                        <td class="col-monitor col-left"> 
                                                            <label for=""> 
                                                                <div class="simInput ng-binding"> </div>
                                                            </label> 
                                                            <div class="inputBox"> 
                                                                <input class="input-off ng-pristine ng-untouched ng-valid ng-empty" type="text" ng-model="cache.source.monitorSubject" ng-focus="subjectOnFocus($event, newDeficit, true, 'monitorSubject')" ng-disabled="!isMyAccount">
                                                            </div>
                                                        </td> 
                                                        <td class="col-borrow col-left"> 
                                                            <label for=""> 
                                                                <div class="simInput ng-binding"> </div>
                                                            </label> 
                                                            <div class="inputBox"> 
                                                                <input class="input-off ng-pristine ng-untouched ng-valid ng-empty" type="text" ng-model="cache.source.borrowSubject" ng-focus="subjectOnFocus($event, newDeficit, true, 'borrowSubject')" ng-disabled="!isMyAccount">
                                                            </div>
                                                        </td> 
                                                        <td class="col-balance col-right"> 
                                                            <label for=""> 
                                                                <div class="simInput ng-binding"> </div>
                                                            </label> 
                                                            <div class="inputBox"> 
                                                                <input class="input-off ng-pristine ng-untouched ng-valid ng-empty" type="text" ng-model="cache.source.end" ng-change="endOnChange()" ng-blur="endOnBlur()" ng-focus="balanceOnFocus($event, deficit, true)" ng-disabled="!isMyAccount">
                                                            </div>
                                                        </td> 
                                                    </tr> 
                                                </tbody> 
                                            </table> 
                                        </div> 
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                    <div by="tab" class="ng-isolate-scope">
                        <div class="page-tab page-automation page-automation--salary" ng-show="on"> 
                            <div class="page-tools"> 
                                <div class="com-button anime ng-isolate-scope com-button--hollow" ng-class="class" ng-click="salaryConfig() ;click();" ui-button="" btn-type="hollow" ng-show="isMyAccount && isCurrentIssue"> 
                                    <div>
                                        <span class="ng-scope">工资配置</span>
                                    </div> 
                                </div> 
                                <div class="com-button anime ng-isolate-scope com-button--hollow" ng-class="class" ng-click="downloadTemplate() ;click();" ui-button="" btn-type="hollow"> 
                                    <div>
                                        <span class="ng-scope">下载模板</span>
                                    </div> 
                                </div> 
                                <!-- ngIf: isMyAccount && isCurrentIssue -->
                                <div class="com-button anime ng-scope ng-isolate-scope com-button--hollow" ng-class="class" ng-click=";click();" ng-if="isMyAccount && isCurrentIssue" ui-button="" btn-type="hollow"> 
                                    <div> 
                                        <label for="salary" class="ng-scope">导入工资单</label> 
                                    </div> 
                                </div>
                                <!-- end ngIf: isMyAccount && isCurrentIssue --> <!-- ngIf: isMyAccount && isCurrentIssue -->
                                <div class="com-button anime ng-scope ng-isolate-scope com-button--hollow" ng-class="class" ng-click="create() ;click();" ng-if="isMyAccount && isCurrentIssue" ui-button="" btn-type="hollow"> 
                                    <div>
                                        <span class="ng-scope">添加人员</span>
                                    </div> 
                                </div>
                                <!-- end ngIf: isMyAccount && isCurrentIssue --> 
                                <div class="icon-download icon-30 ng-hide" ng-click="downloadSalary()" ng-show="salaryList.length"></div> 
                                <input id="salary" type="file" accept=".xls,.xlsx" file-model="" keep-file="false"> 
                            </div> 
                            <div class="page-content"> 
                                <div class="pageWrapper ps-container ps-theme-default" scroll="" scroll-behavior="top" data-ps-id="962b4a51-29c0-c053-2a8b-d5844f57b7e7"> 
                                    <div class="tableContainer"> 
                                        <table> 
                                            <thead> 
                                                <tr> 
                                                    <td class="col-index" rowspan="2">序号</td> 
                                                    <td class="col-name" rowspan="2">姓名</td> 
                                                    <td class="col-number" rowspan="2">身份证号码</td> 
                                                    <td class="col-isEmployee" rowspan="2">是否雇员</td> 
                                                    <td class="col-phone" rowspan="2">手机号码</td> 
                                                    <td class="col-basic" rowspan="2">收入额</td> 
                                                    <td class="col-socialSecurityPersonal" colspan="3">个人社保</td> 
                                                    <td class="col-accumulationFundPersonal" rowspan="2">个人公积金</td> 
                                                    <td class="col-tax" rowspan="2">个人所得税</td> 
                                                    <td class="col-actual" rowspan="2">实发工资</td> 
                                                    <td class="col-socialSecurityCompany" rowspan="2">单位社保</td> 
                                                    <td class="col-accumulationFundCompany" rowspan="2">单位公积金</td> 
                                                    <td class="col-operation" rowspan="2">操作</td> 
                                                </tr> 
                                                <tr> 
                                                    <td class="col-annuity">养老</td> 
                                                    <td class="col-medicare">医疗</td> 
                                                    <td class="col-unemployment">失业</td> 
                                                </tr> 
                                            </thead> 
                                            <tbody> 
                                                <!-- ngRepeat: s in salaryList --> 
                                                <tr> 
                                                    <td colspan="5" style="text-align:center">合计</td> 
                                                    <td class="ng-binding">0.00</td> 
                                                    <td class="ng-binding">0.00</td> 
                                                    <td class="ng-binding">0.00</td> 
                                                    <td class="ng-binding">0.00</td> 
                                                    <td class="ng-binding">0.00</td> 
                                                    <td class="ng-binding">0.00</td> 
                                                    <td class="ng-binding">0.00</td> 
                                                    <td class="ng-binding">0.00</td> 
                                                    <td class="ng-binding">0.00</td> 
                                                    <td></td> 
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

