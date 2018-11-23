<template>
    <div>
        <div class="module-content ng-scope"> 
            <div class="module-content_wrapper"> 
                <div class="module-content_page page-automation"> 
                    <div class="page-title"> 
                        <!-- ngRepeat: t in tabs -->
                        <p class="title ng-binding ng-scope title--on">工资模块</p>
                        <!-- end ngRepeat: t in tabs --> 
                        <div class="title-gap"></div> 
                    </div> 
                    <div>
                        <div class="page-tab page-automation page-automation--salary"> 
                            <div class="page-tools"> 
                                <div class="com-button anime com-button--hollow" ng-click="salaryConfig() ;click();" v-if="1 != 1"> 
                                    <div>
                                        <span class="ng-scope">工资配置</span>
                                    </div> 
                                </div> 
                                <div class="com-button anime com-button--hollow" ng-click="downloadTemplate() ;click();" v-if="1 != 1"> 
                                    <div>
                                        <span class="ng-scope">下载模板</span>
                                    </div> 
                                </div> 
                                <!-- ngIf: isMyAccount && isCurrentIssue -->
                                <div class="com-button anime ng-scope com-button--hollow" v-if="1 != 1"> 
                                    <div> 
                                        <label for="salary" class="ng-scope">导入工资单</label> 
                                    </div> 
                                </div>
                                <!-- end ngIf: isMyAccount && isCurrentIssue --> <!-- ngIf: isMyAccount && isCurrentIssue -->
                                <div class="com-button anime com-button--hollow" @click.stop="toggleCreateEmp('show')"> 
                                    <div>
                                        <span class="ng-scope">添加人员</span>
                                    </div> 
                                </div>
                                <!-- end ngIf: isMyAccount && isCurrentIssue --> 
                                <div class="icon-download icon-30 ng-hide" ng-click="downloadSalary()" v-if="1 != 1"></div> 
                                <input id="salary" type="file" accept=".xls,.xlsx" file-model="" keep-file="false" v-if="1 != 1"> 
                            </div> 
                            <div class="page-content"> 
                                <div class="pageWrapper ps-container ps-theme-default"> 
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
                                                <tr ng-repeat="s in salaryList"> 
                                                    <td class="col-index ng-binding">1</td> 
                                                    <td class="col-name ng-binding">张三</td> 
                                                    <td class="col-number ng-binding">513432198104105117</td> 
                                                    <td class="col-isEmployee ng-binding">是</td> 
                                                    <td class="col-phone ng-binding">15000657221</td> 
                                                    <td class="col-basic ng-binding">11,000.00</td> 
                                                    <td class="col-annuity ng-binding">800.00</td> 
                                                    <td class="col-medicare ng-binding">500.00</td> 
                                                    <td class="col-unemployment ng-binding">200.00</td> 
                                                    <td class="col-accumulationFundPersonal ng-binding">2,400.00</td> 
                                                    <td class="col-tax ng-binding">850.00</td> 
                                                    <td class="col-actual ng-binding">6,250.00</td> 
                                                    <td class="col-socialSecurityCompany ng-binding">0.00</td> 
                                                    <td class="col-accumulationFundCompany ng-binding">2,400.00</td> 
                                                    <td class="col-operation"> 
                                                        <span ng-click="edit(s)">-编辑-</span> 
                                                        <div class="icon-delete basic-icon g-icon-delte-line" title="删除" @click.stop="deleteEmp('s')"></div> 
                                                    </td> 
                                                </tr>
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

        <!-- 创建或更新弹层 -->
        <div class="site-mask anime site-mask--shade"> 
            <div class="site-popup anime popup-salary ng-isolate-scope site-popup--expand" style="transform-style: preserve-3d; transition: all 50ms ease 0s;"> 
                <div class="site-popup_head"> 
                    <p class="ng-binding">添加人员</p> 
                    <div class="site-popup_close g-icon-close" ng-click="hide()"></div> 
                </div> 
                <div class="site-popup_body"> 
                    <div class="entry-container"> 
                        <div class="container_scroll ps-container ps-theme-default ps-active-y"> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">姓名</p> 
                                <input class="grid-content" type="text" ng-model="salary.name"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">身份证号码</p> 
                                <input class="grid-content" type="text" ng-model="salary.certificates"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">是否雇员</p> 
                                <select ng-model="salary.isEmployee" class="grid-content" ng-options="s for s in employeeSelects">
                                    <option label="是" value="string:是" selected="selected">是</option>
                                    <option label="否" value="string:否">否</option>
                                </select> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">手机号码</p> 
                                <input class="grid-content" type="text" ng-model="salary.phone"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">收入额</p> 
                                <input class="grid-content" type="number" ng-model="salary.basic" ng-change="basicOnChange()"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">个人社保-养老</p> 
                                <input class="grid-content" type="number" ng-model="salary.annuity" ng-change="annuityOnChange()"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">个人社保-医疗</p> 
                                <input class="grid-content" type="number" ng-model="salary.medicare" ng-change="medicareOnChange()"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">个人社保-失业</p> 
                                <input class="grid-content" type="number" ng-model="salary.unemployment" ng-change="unemploymentOnChange()"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">个人公积金</p> 
                                <input class="grid-content" type="number" ng-model="salary.accumulationFundPersonal" ng-change="accumulationFundPersonalOnChange()"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">个人所得税</p> 
                                <input class="grid-content" type="number" ng-model="salary.taxPersonal" ng-change="taxPersonalOnChange()"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">实发工资</p> 
                                <input class="grid-content" type="number" ng-model="salary.actual"  disabled="disabled"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">单位社保</p> 
                                <input class="grid-content" type="number" ng-model="salary.socialSecurityCompany"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">单位公积金</p> 
                                <input class="grid-content" type="number" ng-model="salary.accumulationFundCompany" ng-change="accumulationFundCompanyOnChange()"> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
                <div class="site-popup_footer"> 
                    <p class="popup-error ng-binding"></p> 
                    <div class="entry-row"> 
                        <div class="btn-cancel com-button anime ng-isolate-scope com-button--cancel" ng-click="hide() ;click();"> 
                            <div>
                                <span class="ng-scope">取消</span>
                            </div> 
                        </div> 
                        <div class="btn-ok com-button anime ng-isolate-scope com-button--ok" ng-click="ok() ;click();"> 
                            <div>
                                <span class="ng-scope">确定</span>
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
        </div>

        <!-- 删除 -->
        <div class="site-mask anime ng-isolate-scope site-mask--shade" v-if="delFlag"> 
            <div class="site-popup anime popup-confirm flex--column site-popup--expand"> 
                <div class="site-popup_head"> 
                    <div class="site-popup_title">财税通提醒您：</div> 
                </div> 
                <div class="site-popup_body"> 
                    <div class="site-popup_type"> 
                        <div class="typeIcon g-icon-warn"></div> 
                        <p class="typeTitle typeTitle--warn ng-binding">是否删除“张三”条目？</p> 
                    </div> 
                </div> 
                <div class="site-popup_footer"> 
                    <div class="btn--cancel com-button anime ng-isolate-scope com-button--cancel" @click.stop="toggleDeletEmp('hide')"> 
                        <div>
                            <span class="ng-scope">否</span>
                        </div> 
                    </div> 
                    <div class="btn--ok com-button anime ng-isolate-scope com-button--ok" @click.stop="confirmDelteEmp"> 
                        <div>
                            <span class="ng-scope">是</span>
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
            // 新建更新弹层
            showEmpMaskFlag: false,
            delFlag: false,
            employee: {}
        }
    },
    created() {

    },
    filters: {

    },
    methods: {
        // 显示添加弹层
        toggleCreateEmp(type) {
            if (type && type == 'show') {
                this.showEmpMaskFlag = true
            } else {
                this.showEmpMaskFlag = false
            }
        },
        // 删除弹层
        toggleDeletEmp(type) {
            if (type && type == 'show') {
                this.delFlag = true
            } else {
                this.delFlag = false
            }
        },
        // 删除对象赋值
        deleteEmp(opt) {
            if (opt) {
                this.employee = opt
                this.toggleDeletEmp('show')
            }
        },
        // 确认删除职员
        confirmDelteEmp() {
            console.log("确认删除职员")
        },
    }
}
</script>
<style scoped>
[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak, .ng-hide {
    display: none !important;
}
/**头部*/
.page-automation .page-title {
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
.page-automation .page-title .title {
    margin-right: 20px;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
}
.page-automation .page-title .title--on, .page-automation .page-title .title--on:hover {
    border-bottom: 5px solid #5fbbfc;
}
.page-automation .page-title .title--on, .page-automation .page-title .title--on:hover {
    border-bottom: 5px solid #5fbbfc;
}
.page-automation .title-gap {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
}
.page-automation .page-tools {
    position: absolute;
    top: 0;
    right: 0;
    height: 40px;
    width: 60%;
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
.page-automation .page-tools .com-button {
    margin-left: 10px;
}

/**表格*/
.page-automation .pageWrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
}
.page-automation .tableContainer {
    width: 100%;
    border-radius: 3px;
    overflow: hidden;
}
.page-automation table {
    table-layout: fixed;
    width: 100%;
    border: 1px solid #dadfe8;
}
.page-automation td {
    padding: 0 8px;
    text-align: right;
}
.page-automation thead td {
    height: 40px;
    background-color: #5fbbfc;
    text-align: center;
    color: #fff;
    border-right: 1px solid #fff;
}
.page-automation--salary .col-index {
    width: 3%;
}
.page-automation--salary .col-name {
    width: 7%;
}
.page-automation--salary .col-number {
    width: 13%;
}
.page-automation--salary .col-isEmployee {
    width: 5%;
}
.page-automation--salary .col-phone {
    width: 9%;
}
.page-automation--salary thead .col-socialSecurityPersonal {
    border-bottom: 1px solid #fff;
}
.page-automation--salary .col-operation {
    position: relative;
    width: 6%;
}
.page-automation thead td:last-child {
    border: none;
}
.page-automation tbody td {
    font-size: 12px;
    border: 1px solid #dadfe8;
    line-height: 30px;
}
.page-automation--salary tbody .col-index, .page-automation--salary tbody .col-isEmployee, .page-automation--salary tbody .col-name, .page-automation--salary tbody .col-number, .page-automation--salary tbody .col-phone {
    text-align: center;
}

.page-automation--salary tbody .col-operation {
    text-align: center;
    color: #5fbbfc;
}
.page-automation--salary tbody .col-operation span {
    cursor: pointer;
}
.page-automation--salary .col-operation .icon-delete {
    background-position: 50%;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 30px;
    cursor: pointer;
    display: none;
}
.page-automation--salary tr:hover .icon-delete {
    display: block;
}
.page-automation tbody tr:nth-child(2n) {
    background-color: #ebf4ff;
}
.page-automation tbody tr:hover {
    background-color: rgba(255,232,136,.5);
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

