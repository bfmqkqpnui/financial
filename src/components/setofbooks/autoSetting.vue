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
                                <div class="com-button anime com-button--hollow" @click.stop="createSalary"> 
                                    <div>
                                        <span class="ng-scope">添加人员</span>
                                    </div> 
                                </div>
                                <!-- end ngIf: isMyAccount && isCurrentIssue --> 
                                <div class="icon-download icon-30 ng-hide" ng-click="downloadSalary()" v-if="1 != 1"></div> 
                                <input id="salary" type="file" accept=".xls,.xlsx" file-model="" keep-file="false" v-if="1 != 1"> 
                            </div> 
                            <div class="page-content"> 
                                <div class="pageWrapper ps-theme-default" id="componentSalaries"> 
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
                                                <tr v-for="(s, index) in salaryData.salaryList" :key="index" v-if="salaryData && salaryData.salaryList && salaryData.salaryList.length > 0">
                                                    <!-- 序号 -->
                                                    <td class="col-index ng-binding" v-text="index + 1"></td>
                                                    <!-- 姓名 -->
                                                    <td class="col-name ng-binding" v-text="s.name"></td>
                                                    <!-- 身份证号码 -->
                                                    <td class="col-number ng-binding" v-text="s.identityCardNumber"></td>
                                                    <!-- 是否雇员 -->
                                                    <td class="col-isEmployee ng-binding" v-text="s.isEmployee == 1 ? '是' : '否'"></td>
                                                    <!-- 手机号码 -->
                                                    <td class="col-phone ng-binding" v-text="s.cellPhoneNumber"></td>
                                                    <!-- 收入额 -->
                                                    <td class="col-basic ng-binding">{{s.revenuePosition | moneyFilter}}</td>
                                                    <!-- 养老 -->
                                                    <td class="col-annuity ng-binding">{{s.endowmentInsurance | moneyFilter}}</td>
                                                    <!-- 医疗 -->
                                                    <td class="col-medicare ng-binding">{{s.medicalInsurance | moneyFilter}}</td>
                                                    <!-- 失业 -->
                                                    <td class="col-unemployment ng-binding">{{s.unemploymentInsurance | moneyFilter}}</td>
                                                    <!-- 个人公积金 -->
                                                    <td class="col-accumulationFundPersonal ng-binding">{{s.accumulationFund | moneyFilter}}</td>
                                                    <!-- 个人所得税 -->
                                                    <td class="col-tax ng-binding">{{s.individualIncomeTax | moneyFilter}}</td>
                                                    <!-- 实发工资 -->
                                                    <td class="col-actual ng-binding">{{s.netPayroll | moneyFilter}}</td>
                                                    <!-- 单位社保 -->
                                                    <td class="col-socialSecurityCompany ng-binding">{{s.socialSecurity | moneyFilter}}</td>
                                                    <!-- 单位公积金 -->
                                                    <td class="col-accumulationFundCompany ng-binding">{{s.unitAccumulationFund | moneyFilter}}</td> 
                                                    <td class="col-operation"> 
                                                        <span @click.stop="updateSalary(s)">-编辑-</span> 
                                                        <div class="icon-delete basic-icon g-icon-delte-line" title="删除" @click.stop="deleteEmp(s)"></div> 
                                                    </td> 
                                                </tr>
                                                <tr> 
                                                    <td colspan="5" style="text-align:center">合计</td>
                                                    <!-- 收入额 -->
                                                    <td class="ng-binding">{{salaryData.totalRevenuePosition ? salaryData.totalRevenuePosition : 0 | moneyFilter}}</td>
                                                    <!-- 养老 -->
                                                    <td class="ng-binding">{{salaryData.totalEndowmentInsurance ? salaryData.totalEndowmentInsurance : 0 | moneyFilter}}</td>
                                                    <!-- 医疗 -->
                                                    <td class="ng-binding">{{salaryData.totalMedicalInsurance ? salaryData.totalMedicalInsurance : 0 | moneyFilter}}</td>
                                                    <!-- 失业 -->
                                                    <td class="ng-binding">{{salaryData.totalUnemploymentInsurance ? salaryData.totalUnemploymentInsurance : 0 | moneyFilter}}</td>
                                                    <!-- 个人公积金 -->
                                                    <td class="ng-binding">{{salaryData.totalAccumulationFund ? salaryData.totalAccumulationFund : 0 | moneyFilter}}</td>
                                                    <!-- 个人所得税 -->
                                                    <td class="ng-binding">{{salaryData.totalIndividualIncomeTax ? salaryData.totalIndividualIncomeTax : 0 | moneyFilter}}</td>
                                                    <!-- 实发工资 -->
                                                    <td class="ng-binding">{{salaryData.totalNetPayroll ? salaryData.totalNetPayroll : 0 | moneyFilter}}</td>
                                                    <!-- 单位社保 -->
                                                    <td class="ng-binding">{{salaryData.totalSocialSecurity ? salaryData.totalSocialSecurity : 0 | moneyFilter}}</td>
                                                    <!-- 单位公积金 -->
                                                    <td class="ng-binding">{{salaryData.totalUnitAccumulationFund ? salaryData.totalUnitAccumulationFund : 0 | moneyFilter}}</td>
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
        <div class="site-mask anime site-mask--shade" v-if="showEmpMaskFlag"> 
            <div class="site-popup anime popup-salary ng-isolate-scope site-popup--expand" style="transform-style: preserve-3d; transition: all 50ms ease 0s;"> 
                <div class="site-popup_head"> 
                    <p class="ng-binding" v-text="salaryTitle"></p> 
                    <div class="site-popup_close g-icon-close" @click.stop="toggleAddSalaryPop('hide')"></div> 
                </div> 
                <div class="site-popup_body"> 
                    <div class="entry-container"> 
                        <div class="container_scroll ps-theme-default" id="componentSalary"> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">姓名</p> 
                                <input class="grid-content" type="text" v-model.trim="salary.name"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">身份证号码</p> 
                                <input class="grid-content" type="text" v-model.trim="salary.identityCardNumber"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">是否雇员</p> 
                                <select v-model="salary.isEmployee" class="grid-content">
                                    <option label="是" value="1">是</option>
                                    <option label="否" value="0">否</option>
                                </select> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">手机号码</p> 
                                <input class="grid-content" type="text" v-model.trim="salary.cellPhoneNumber"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">收入额</p> 
                                <input class="grid-content" type="number" v-model.trim="salary.revenuePosition" @keyup="salaryOnChange"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">个人社保-养老</p> 
                                <input class="grid-content" type="number" v-model.trim="salary.endowmentInsurance" @keyup="salaryOnChange"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">个人社保-医疗</p> 
                                <input class="grid-content" type="number" v-model.trim="salary.medicalInsurance" @keyup="salaryOnChange"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">个人社保-失业</p> 
                                <input class="grid-content" type="number" v-model.trim="salary.unemploymentInsurance" @keyup="salaryOnChange"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">个人公积金</p> 
                                <input class="grid-content" type="number" v-model.trim="salary.accumulationFund" @keyup="accumulationFundOnChange"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">个人所得税</p> 
                                <input class="grid-content" type="number" v-model.trim="salary.individualIncomeTax" @keyup="salaryOnChange"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">实发工资</p> 
                                <input class="grid-content" type="number" v-model.trim="salary.netPayroll" disabled="disabled"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">单位社保</p> 
                                <input class="grid-content" type="number" v-model.trim="salary.socialSecurity"> 
                            </div> 
                            <div class="entry-row"> 
                                <p class="grid-label popup-label">单位公积金</p> 
                                <input class="grid-content" type="number" v-model.trim="salary.unitAccumulationFund"> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
                <div class="site-popup_footer"> 
                    <p class="popup-error ng-binding" v-text="errMsg"></p> 
                    <div class="entry-row"> 
                        <div class="btn-cancel com-button anime ng-isolate-scope com-button--cancel" @click.stop="toggleAddSalaryPop('hide')"> 
                            <div>
                                <span class="ng-scope">取消</span>
                            </div> 
                        </div> 
                        <div class="btn-ok com-button anime ng-isolate-scope com-button--ok" @click.stop="confirmAddSalary"> 
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
                        <p class="typeTitle typeTitle--warn ng-binding">是否删除“{{salary.name}}”条目？</p> 
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
import api from "./api/index"
import utils from "../../utils"
export default {
    data() {
        return {
            token: utils.dbGet("userInfo").token,
            adminId: utils.dbGet("userInfo").id,
            accountId: utils.dbGet("account").id,
            // 新建更新弹层
            showEmpMaskFlag: false,
            delFlag: false,
            // 工资对象
            salary: {},
            // 弹层标题
            salaryTitle: '',
            // 工资列表
            salaryData: {},
            // 错误信息
            errMsg: '',
        }
    },
    created() {
        this.querySalarys()
    },
    filters: {
        moneyFilter(value) {
            if (utils.isExist(value)) {
                let hasPoint = value.toString().split(".");
                if (hasPoint.length == 1) {
                return value + ".00";
                } else if (hasPoint.length > 1) {
                if (hasPoint[1].length < 2) {
                    return value + "0";
                } else {
                    return value;
                }
                }
            }
        }
    },
    methods: {
        // 显示添加弹层
        toggleAddSalaryPop(type) {
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
                this.salary = opt
                this.toggleDeletEmp('show')
            }
        },
        // 创建薪水
        createSalary() {
            this.salaryTitle = '添加人员'
            this.configSalary()
            this.toggleAddSalaryPop('show')
        },
        // 编辑薪水
        updateSalary(opt) {
            this.salaryTitle = '编辑人员'
            this.salary = opt
            this.toggleAddSalaryPop('show')
        },
        // 查询薪水列表
        querySalarys() {
            console.log("查询薪水列表")
            this.salaryList = []
            if (this.accountId) {
                let params = {
                    accountSetId: this.accountId,
                    token: this.token
                }
                console.log("查询薪水列表入参：", JSON.stringify(params))
                api.queryAllSalary(params).then(res => {
                    console.log("查询薪水列表结果：", res.body)
                    if (res.body.result == 0) {
                        this.salaryData = res.body.data
                    }
                })
            }
        },
        // 确认删除职员薪水
        confirmDelteEmp() {
            console.log("确认删除职员")
            let params = this.salary
            params.accountSetId = this.accountId
            params.token = this.token
            if (params.id) {
                this.toggleDeletEmp('hide')
                console.log("确认删除职员薪水入参：", JSON.stringify(params))
                api.deleteSalary(params).then(res => {
                    console.log("确认删除职员薪水结果：", JSON.stringify(params))
                    if (res.body.result == 0) {
                        this.$emit("success", res.body.msg)
                        this.querySalarys()
                    } else {
                        this.$emit("error", res.body.msg)
                    }
                })
            }
        },
        // 确认添加职员薪水
        confirmAddSalary() {
            console.log("确认添加或者更新职员薪水")
            if (this.checkData()) {
                this.toggleAddSalaryPop('hide')
                let params = this.salary
                params.accountSetId = this.accountId
                params.token = this.token
                if (params.id) {
                    console.log("确认更新职员薪水入参：", JSON.stringify(params))
                    api.updateSalary(params).then(res => {
                        console.log("确认更新职员薪水结果：", res.body)
                        if (res.body.result == 0) {
                            this.$emit("success", res.body.msg)
                            this.querySalarys()
                        } else {
                            this.$emit("error", res.body.msg)
                        }
                    })
                } else {
                    console.log("确认添加职员薪水入参：", JSON.stringify(params))
                    api.insertSalary(params).then(res => {
                        console.log("确认添加职员薪水结果：", res.body)
                        if (res.body.result == 0) {
                            this.$emit("success", res.body.msg)
                            this.querySalarys()
                        } else {
                            this.$emit("error", res.body.msg)
                        }
                    })
                }
            }
        },
        // 初始化薪水
        configSalary() {
            this.salary = {
                // 姓名
                name: '',
                // 身份证号码
                identityCardNumber: '',
                // 是否雇员(0否，1是)
                isEmployee: 1,
                // 手机号码
                cellPhoneNumber: '',
                // 收入额
                revenuePosition: 0,
                // 养老保险
                endowmentInsurance: 0,
                // 医疗保险
                medicalInsurance: 0,
                // 失业保险
                unemploymentInsurance: 0,
                // 公积金
                accumulationFund: 0,
                // 个人所得税
                individualIncomeTax: 0,
                // 实发工资
                netPayroll: 0,
                // 单位社保
                socialSecurity: 0,
                // 单位公积金
                unitAccumulationFund: 0
            }
        },
        checkData() {
            if (this.salary.name && this.salary.name.length > 0) {
                if (utils.checkCardByPerson(this.salary.identityCardNumber)) {
                    if (utils.valPhone(this.salary.cellPhoneNumber)) {
                        return true
                    } else {
                        this.errMsg = '请填写正确的手机号码'
                        return false  
                    }
                } else {
                    this.errMsg = '请填写正确的身份证号'
                    return false 
                }
            } else {
                this.errMsg = '请填写员工姓名'
                return false
            }
        },
        salaryOnChange() {
            // 实发工资 = 收入额 - 养老 - 医疗 - 失业 - 公积金 - 个人所得税
            this.salary.netPayroll = Number(this.salary.revenuePosition) - Number(this.salary.endowmentInsurance) - Number(this.salary.medicalInsurance) - Number(this.salary.unemploymentInsurance) - Number(this.salary.accumulationFund) - Number(this.salary.individualIncomeTax)
        },
        accumulationFundOnChange() {
            this.salary.unitAccumulationFund = this.salary.accumulationFund
            this.salaryOnChange()
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
/**添加弹层样式*/
.popup-salary {
    width: 460px;
}
.popup-salary .site-popup_head>p {
    line-height: 60px;
    font-size: 18px;
    text-align: center;
}
.popup-salary .entry-container {
    width: 100%;
    padding: 35px 15px 25px 25px;
}
.popup-salary .container_scroll {
    position: relative;
    height: 480px;
}
.popup-salary .entry-row {
    padding-right: 10px;
    width: 100%;
    height: 30px;
    margin-top: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.popup-salary .entry-row:first-child {
    margin-top: 0;
}
.popup-salary .grid-label {
    width: 120px;
}
.popup-salary .popup-label {
    display: inline-block;
    text-align: right;
    font-size: 14px;
    line-height: 30px;
    padding: 0 8px;
}
.popup-salary input {
    font-size: 13px;
    color: rgba(42,51,59,.8);
}
.popup-salary .grid-content {
    max-width: 250px;
}
.popup-salary .site-popup_footer {
    padding: 0 25px 25px;
}
.popup-salary .popup-error {
    color: red;
    font-size: 12px;
    padding-left: 130px;
    height: 30px;
}
.popup-salary .site-popup_footer .entry-row {
    margin: 0;
}
.popup-salary .btn-cancel {
    width: 60px;
    margin: 0 30px;
}
.popup-salary .btn-ok {
    width: 250px;
}
/**隐藏滚动条*/
#componentSalary::-webkit-scrollbar, #componentSalaries::-webkit-scrollbar {
  width: 0 !important;
}
#componentSalary, #componentSalaries{
  -ms-overflow-style: none !important;
  overflow: -moz-scrollbars-none !important;
  overflow: auto;
}
</style>