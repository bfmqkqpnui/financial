<template>
  <div>
    <div class="module-content settingBox">
      <div class="module-content_wrapper">
        <div class="module-content_page">
          <div class="page-title">
            <div class="setHeadMenu">
              <ul>
                <li v-for="(menu,index) in setMenu.list"
                    :class="setMenu.type == menu.type ? 'menuOn' : ''" @click="selectType(menu)"
                    @mouseover="changeActive(menu)" @mouseout="removeActive(menu)"
                    v-text="menu.value">
                </li>
                <span :class="setTitleClass"></span>
              </ul>
            </div>
            <div class="setBtnMenu btnReportBox" v-if="setMenu.type == 'subject'">
              <div class="page-searchBox">
                <input type="text" placeholder="搜索科目" ng-model="filter.search"
                       class="ng-pristine ng-untouched ng-valid ng-empty">
                <div class="icon-search icon-30" ng-show="!filter.search"></div>
                <div class="icon-close icon-30 ng-hide" ng-click="clearSearch()" ng-show="filter.search"></div>
              </div>
            </div>
            <div class="setBtnMenu btnReportBox" v-if="setMenu.type == 'assets'">
              <div class="btn-template" @click="downTemp">下载模板</div>
              <div class="btn-fileAssets" ng-show="isMyAccount"> 导入固定资产
                <input type="file" id="fileSingle" name="file" accept=".xlsx">
              </div>
              <div class="btn-addAssets" @click="addFixedAsset('添加')">添加固定资产</div>
              <div class="btn-reconciliationAssets" @click="checkEquilibrium">对账</div>
              <div class="icon-download" @click="dwldData" title="下载固定资产清单"></div>
            </div>
            <div class="setBtnMenu btnReportBox" v-if="setMenu.type == 'report'">
              <div class="btn-switchCurrency-off ng-binding" ng-click="amountPop(true)" v-if="isNullBtnFlag"></div>
              <div class="btn-switchCurrency-off ng-binding" ng-click="assistCurrencyAmountPop(true)"
                   v-if="isNullBtnFlag"></div>
              <div class="btn-check" ng-click="switchNullData()" v-if="isNullBtnFlag">
                <div class="icon-isShowNullNum-off"></div>
                隐藏空值
              </div>
              <div class="btn-fileReport" ng-click="fileReportPop(true)" v-if="isNullBtnFlag">
                导入报表
              </div>
              <template v-if="reportMenu.type == 'cashFlow'">
                <div class="btn-cancelReport" @click.stop="cancelEditCashFlow()">取消</div>
                <div class="btn-saveReport" @click.stop="saveCashFlow()">保存修改</div>
              </template>
              <template v-if="reportMenu.type == 'subjectBalance'">
                <div class="btn-cancelReport" @click.stop="cancelEditSubjectBalance()">取消</div>
                <div class="btn-saveReport" @click.stop="saveSubjectBalance()">保存修改</div>
              </template>

            </div>
            <div class="setBtnMenu btnReportBox selectModuleBtn"
                 v-if="setMenu.type == 'report' && reportMenu.type == 'liabilities'">
              <select ng-options="type.name for type in adjustAsset.list" ng-model="adjustAsset.type"
                      ng-change="changeAdjustAsset(true)" class="ng-pristine ng-untouched ng-valid ng-not-empty">
                <option label="默认模式" value="object:2025" selected="selected">默认模式</option>
                <option label="一级科目模式 Ⅰ" value="object:2026">一级科目模式 Ⅰ</option>
                <option label="一级科目模式 Ⅱ" value="object:2027">一级科目模式 Ⅱ</option>
                <option label="明细科目模式" value="object:2028">明细科目模式</option>
              </select>
              <div class="icon-help" data-toggle="tooltip" title="查看帮助文档"
                   ng-show="reportMenu.type.type == 'asset'" ng-click="checkHelpPdf()">?
              </div>
            </div>
            <div class="setBtnMenu btnReportBox" v-if="setMenu.type == 'info'">
              <div class="btn-cancelReport" @click="cancelEdit"> 取消</div>
              <div class="btn-saveReport" @click="save"> 保存修改</div>
            </div>
          </div>

          <div class="page-content">
            <!-- 科目设置 -->
            <div v-if="setMenu.type == 'subject'">
              <div class="contentArea">
                <div class="content-abs tableData-subject">
                  <!-- 表格右侧tab -->
                  <div class="navSubjectMenuBox">
                    <div class="navSubjectMenuMask ng-hide"></div>
                    <!-- ngRepeat: menu in navMenu.list -->
                    <div :class="item.isSelected? 'menuOn' : ''"
                         @click="subjectClassify(item, 'subject')" class="ng-binding ng-scope"
                         v-for="item in navMenuSubject"
                         :key="item.index" v-text="item.name">
                    </div>
                  </div>
                  <div class="content-rel setSubjectListBox">
                    <div class="content-rel">
                      <!-- 表格头部 -->
                      <div class="tableBox tableFixed">
                        <div class="tableHead"> <!-- ngRepeat: title in setMenu['subject'] -->
                          <div class="tableTh ng-binding ng-scope span-25" ng-repeat="title in setMenu['subject']"
                               ng-class="title.class">科目编码
                          </div><!-- end ngRepeat: title in setMenu['subject'] -->
                          <div class="tableTh ng-binding ng-scope span-55" ng-repeat="title in setMenu['subject']"
                               ng-class="title.class">科目名称
                          </div><!-- end ngRepeat: title in setMenu['subject'] -->
                          <div class="tableTh ng-binding ng-scope span-10" ng-repeat="title in setMenu['subject']"
                               ng-class="title.class">借贷
                          </div><!-- end ngRepeat: title in setMenu['subject'] -->
                          <div class="tableTh ng-binding ng-scope span-10" ng-repeat="title in setMenu['subject']"
                               ng-class="title.class">币种
                          </div><!-- end ngRepeat: title in setMenu['subject'] --> </div>
                      </div>

                      <!-- 表格主体 -->
                      <div class="content-rel ps-theme-default" v-if="subjects.length > 0" style="overflow-y: auto"
                           id="subjectTable">
                        <div class="tableBox ng-scope" v-for="data in subjects" :key="data.subjectId">
                          <div class="tableBody" @click.stop="highlightRow(data)"
                               :class="data.select ? 'highlight' : ''">
                            <div class="tableTd span-25" style="font-weight:700">
                              <div class="subjectText ng-binding" v-text="data.subjectId"></div>
                              <span v-if="data.children && data.children.length > 0" data-toggle="tooltip" title="折叠/展开"
                                    :class="data.active ? 'icon-arrows-0-hover' : 'icon-arrows-90-hover'"
                                    @click.stop="flexChildrenSubject(data)"></span>
                              <div class="btn-operateBox" v-if="operationFlag">
                                <div class="btn-operate" ng-mouseenter="operateOnEnter($event)">
                                  <div class="operateBox bottom">
                                    <div class="edit operate" ng-click="showSubjectPop(data, 'edit', $event)"> 科目编辑
                                    </div>
                                    <div class="addSameLevel operate"
                                         ng-click="showSubjectPop(data, 'addSubLevel', $event)"
                                         ng-show="data.subject === '1405' ? !usedStock : true"> 新增子级科目
                                    </div>
                                    <!--<div class="merge operate ng-hide" ng-show="data.isLeaf &amp;&amp; !data.system"
                                         ng-click="mergeSubject(data, $event)"> 科目合并
                                    </div>-->
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="tableTd span-55 ng-binding" v-text="data.subjectName"></div>
                            <div class="span-10 tableTd ng-binding"
                                 :class="data.direction == 1 ? '-sizeColor-red' : '-sizeColor-green'"
                                 style="text-align:center" v-text="data.direction == 1? '借' : '贷'">
                            </div>
                            <div class="tableTd span-10 ng-binding" v-text="data.currency"></div>
                          </div>
                          <!-- 科目子节点 -->
                          <div v-show="!data.active">
                            <div class="tableBox ng-scope" v-for="item in data.children" :key="item.subjectId">
                              <div class="tableBody" @click.stop="highlightRow(item)"
                                   :class="item.select? 'highlight' : ''">
                                <div class="tableTd span-25"
                                     style="padding-left: 15px;">
                                  <div class="borderLeft"
                                       style="width: 10px;"></div>
                                  <div class="subjectText ng-binding" v-text="item.subjectId"></div>
                                  <span v-if="item.children && item.children.length > 0" data-toggle="tooltip"
                                        title="折叠/展开"
                                        :class="data.active ? 'icon-arrows-0-hover' : 'icon-arrows-90-hover'"
                                        @click.stop="flexChildrenSubject(data)"></span>
                                  <div class="btn-operateBox" v-if="operationFlag">
                                    <div class="btn-operate" ng-mouseenter="operateOnEnter($event)">
                                      <div class="operateBox bottom">
                                        <div class="edit operate" ng-click="showSubjectPop(data, 'edit', $event)"> 科目编辑
                                        </div>
                                        <div class="addSameLevel operate"
                                             ng-click="showSubjectPop(data, 'addSubLevel', $event)"
                                             ng-show="data.subject === '1405' ? !usedStock : true"> 新增子级科目
                                        </div>
                                        <!--<div class="merge operate ng-hide" ng-show="data.isLeaf &amp;&amp; !data.system"
                                             ng-click="mergeSubject(data, $event)"> 科目合并
                                        </div>-->
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="tableTd span-55 ng-binding" v-text="item.subjectName"></div>
                                <div class="span-10 tableTd ng-binding" style="text-align:center"
                                     :class="item.direction == 1 ? '-sizeColor-red' : '-sizeColor-green'"
                                     v-text="item.direction == 1?'借':'贷'">
                                </div>
                                <div class="tableTd span-10 ng-binding" v-text="item.currency"></div>
                                <span class="icon-delete ng-hide"></span></div>

                              <div v-if="!item.active">
                                <div class="tableBox ng-scope" v-for="itemC in item.children" :key="itemC.subjectId">
                                  <div class="tableBody" @click.stop="highlightRow(itemC)"
                                       :class="itemC.isSelect ? 'highlight' : ''">
                                    <div class="tableTd span-25"
                                         style="padding-left: 25px;">
                                      <div class="borderLeft"
                                           style="width: 20px;"></div>
                                      <div class="subjectText ng-binding" v-text="itemC.subjectId"></div>
                                      <span v-if="item.children && item.children.length > 0" data-toggle="tooltip"
                                            title="折叠/展开"
                                            :class="item.active ? 'icon-arrows-0-hover' : 'icon-arrows-90-hover'"
                                            @click="flexChildrenSubject(item)"
                                            class="ng-hide icon-arrows-90-hover"></span>
                                      <div class="btn-operateBox" v-if="operationFlag">
                                        <div class="btn-operate" ng-mouseenter="operateOnEnter($event)">
                                          <div class="operateBox bottom">
                                            <div class="edit operate" ng-click="showSubjectPop(data, 'edit', $event)">
                                              科目编辑
                                            </div>
                                            <div class="addSameLevel operate"
                                                 ng-click="showSubjectPop(data, 'addSubLevel', $event)"
                                                 ng-show="data.subject === '1405' ? !usedStock : true"> 新增子级科目
                                            </div>
                                            <div class="addSubLevel operate"
                                                 ng-click="showSubjectPop(data, 'addSameLevel', $event)"> 新增同级科目
                                            </div>
                                            <div class="merge operate ng-hide" ng-click="mergeSubject(data, $event)"
                                                 ng-show="data.isLeaf &amp;&amp; !data.system"> 科目合并
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="tableTd span-55 ng-binding" v-text="itemC.subjectName"></div>
                                    <div class="span-10 tableTd ng-binding" style="text-align:center"
                                         :class="itemC.direction == 1 ? '-sizeColor-red' : '-sizeColor-green'"
                                         v-text="itemC.direction  == 1 ? '借' : '贷'">
                                    </div>
                                    <div class="tableTd span-10 ng-binding" v-text="itemC.currency"></div>
                                    <span class="icon-delete ng-hide"
                                          ng-click="deleteSubject(data);$event.stopPropagation();"
                                          ng-show="isMyAccount &amp;&amp; !data.system"></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 辅助核算 -->
            <div v-if="setMenu.type == 'assist'">
              <div class="content-abs tableData-assist">
                <div class="navSubjectMenuBox">
                  <div class="navSubjectMenuMask ng-hide"></div>
                  <div :class="menu.isSelected ? 'menuOn' : ''" v-for="menu in navMenuAssist" :key="menu.index"
                       @click="subjectClassify(menu,'assist')" class="ng-binding ng-scope" v-text="menu.name">
                  </div>
                </div>
                <!-- 辅助核算 -->
                <div class="content-rel assistBox">
                  <div class="content-rel">
                    <div class="tableBox tableFixed">
                      <table>
                        <thead>
                        <tr v-for="menu in navMenuAssist" :key="menu.index" v-if="menu.isSelected">
                          <th class="span-10">开启</th>
                          <th class="span-20 ng-binding">{{menu.name}}编码</th>
                          <th class="span-50 ng-binding" :class="{'span-70':menu.type != 'profitAndLoss'}">
                            {{menu.name}}名称
                          <th class="span-20 ng-scope" v-if="menu.type == 'profitAndLoss'">单位</th>
                          </th>
                        </tr>
                        </thead>
                      </table>
                    </div>

                    <div class="content-rel" id="assistTableBox" style="overflow-y: auto">
                      <div id="scrollBar-assist" class="ps-theme-default">
                        <table>
                          <tbody>
                          <tr v-for="(data,index) in assistTableData" class="ng-scope" :key="index">
                            <td class="span-10 selectBox">
                              <span @click="switchAssist(data)" class="icon25-select"
                                    :class="{'icon25-selected': data.status == 1}"></span>
                            </td>
                            <td class="span-20">
                              <label>
                                <span class="ng-binding" v-text="data.coding"></span>
                                <div @click="oprClick(data, index, 0)">
                                  <input type="text" maxlength="12" :id="forId(index,0)"
                                         v-model="cacheAssist.coding"
                                         @keydown.enter="updateAss(index, 0)"
                                         class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
                                </div>
                              </label>
                            </td>
                            <td class="span-50" :class="{'span-70':data.assistAccountingType != '5'}">
                              <label>
                                <span class="ng-binding" v-text="data.assistAccountingName"></span>
                                <div @click="oprClick(data, index, 1)">
                                  <input type="text" maxlength="60" :id="forId(index,1)"
                                         v-model="cacheAssist.assistAccountingName"
                                         @keydown.enter="updateAss(index, 1)"
                                         class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
                                </div>
                              </label>
                              <div class="icon25-delete" @click.stop="deleteAssist(data)"></div>
                            </td>
                            <td class="span-20" v-if="data.assistAccountingType == '5'">
                              <label>
                                <span class="ng-binding" v-text="data.unitStr"></span>
                                <div @click="oprClick(data, index, 2)">
                                  <input type="text" :id="forId(index, 2)" maxlength="10"
                                         v-model="cacheAssist.unitStr"
                                         @keydown.enter="updateAss(index, 2)"
                                         class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
                                </div>
                                <div class="icon25-delete" @click.stop="deleteAssist(data)"></div>
                              </label>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>

                      <!-- 可以输入的table -->
                      <table class="createAssist">
                        <tbody>
                        <tr v-for="menu in navMenuAssist" :key="menu.index" v-if="menu.isSelected" class="ng-scope">
                          <td class="span-10 createBox" style="padding:0">
                            <div class="icon-create"></div>
                          </td>
                          <td class="span-20" style="padding:0">
                            <label>
                              <span class="ng-binding"></span>
                              <div>
                                <input type="text" maxlength="12" v-model="newAssist.coding"
                                       placeholder="请输入编码" style="z-index:1" id="vxnkguao-0-0"
                                       class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
                              </div>
                            </label>
                          </td>
                          <td class="span-50" :class="{'span-70':menu.type != 'profitAndLoss'}">
                            <label>
                              <span class="ng-binding"></span>
                              <div>
                                <input type="text" v-model="newAssist.assistAccountingName" @keydown.enter="addAss"
                                       id="vxnkguao-0-1"
                                       placeholder="请输入名称" style="z-index:1" maxlength="60"
                                       class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
                              </div>
                            </label>
                          </td>
                          <td class="span-20" v-if="menu.type == 'profitAndLoss'">
                            <label>
                              <span class="ng-binding"></span>
                              <div>
                                <input type="text" v-model="newAssist.unitStr" @keydown.enter="addAss" id="vxnkguao-0-2"
                                       placeholder="请输入单位" style="z-index:1" maxlength="10"
                                       class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
                              </div>
                            </label>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 初始报表 -->
            <div v-if="setMenu.type == 'report'">
              <div class="contentArea">
                <div class="content-abs tableData-report">
                  <!-- 表格右侧tab -->
                  <div class="navSubjectMenuBox" :class="reportMenu.type != 'subjectBalance' ? 'ng-hide' : ''">
                    <div class="navSubjectMenuMask ng-hide"></div>
                    <div :class="item.isSelected? 'menuOn' : ''"
                         @click="subjectClassify(item, 'report')" class="ng-binding ng-scope"
                         v-for="item in navMenuSubject"
                         :key="item.index" v-text="item.name">
                    </div>
                  </div>
                  <!-- 报表主体 -->
                  <div class="content-rel setSubjectListBox">
                    <div class="content-rel">
                      <div class="reportTableFixed">
                        <div class="content-rel">
                          <div class="reportTable-left">
                            <div class="viewInfoSize ng-binding"></div>
                          </div>
                          <div class="reportTable-right">
                            <div v-for="menu in reportMenu.list" @click.stop="switchReport(menu)"
                                 v-if="menu.type != 'auxiliaryBalance'"
                                 class="ng-binding ng-scope" v-text="menu.name"
                                 :class="menu.isSelected ? 'menuOn' : ''">
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="tableBox tableFixed" style="top:0">
                        <table>
                          <!-- 科目余额表 -->
                          <thead v-if="reportMenu.type == 'subjectBalance'">
                          <tr>
                            <th class="ng-binding ng-scope span-16">科目编码</th>
                            <th class="ng-binding ng-scope span-35">科目名称</th>
                            <th class="ng-binding ng-scope span-5">借贷</th>
                            <th class="ng-binding ng-scope span-11">借方累计</th>
                            <th class="ng-binding ng-scope span-11">贷方累计</th>
                            <th class="ng-binding ng-scope span-11">期末余额</th>
                            <th class="ng-binding ng-scope span-11">年初余额</th>
                          </tr>
                          </thead>
                          <!-- 资产负债表 -->
                          <thead v-if="reportMenu.type == 'liabilities'">
                          <tr>
                            <th class="ng-binding ng-scope span-15">资产</th>
                            <th class="ng-binding ng-scope span-5">行次</th>
                            <th class="ng-binding ng-scope span-15">期末余额</th>
                            <th class="ng-binding ng-scope span-15">年初余额</th>
                            <th class="ng-binding ng-scope span-15">负债和所有者权益</th>
                            <th class="ng-binding ng-scope span-5">行次</th>
                            <th class="ng-binding ng-scope span-15">期末余额</th>
                            <th class="ng-binding ng-scope span-15">年初余额</th>
                          </tr>
                          </thead>
                          <!-- 利润表 || 现金流量表 -->
                          <thead v-if="reportMenu.type == 'profit' || reportMenu.type == 'cashFlow'">
                          <tr>
                            <th class="ng-binding ng-scope span-55">项目</th>
                            <th class="ng-binding ng-scope span-5">行次</th>
                            <th class="ng-binding ng-scope span-20">本年累计金额</th>
                            <th class="ng-binding ng-scope span-20">本月金额</th>
                          </tr>
                          </thead>
                        </table>
                      </div>


                      <div>
                        <div class="content-rel tableBox tableFixed" id="scrollBar-report"
                             style="overflow-y: auto;top:40px;padding-bottom: 40px;">
                          <!-- 科目余额表 -->
                          <table class="reportTable" v-if="reportMenu.type == 'subjectBalance'">
                            <tbody>
                            <tr v-for="(data, index) in subjectBalanceList" class="ng-scope evenOff" :key="index">
                              <td class="span-16 ng-binding"
                                  :style="{'font-weight': data.course.coding.length == 4 ? 'bold' : '', 'padding-left': data.course.coding.length == 4 ? '5px' : (data.course.coding.length - 4) * 5 + 'px'}">
                                <div class="borderLeft" v-if="data.course.coding.length > 4"
                                     :style="{'width': (((data.course.coding.length * 5) - 25) + 'px')}">
                                </div>
                                {{data.course.coding}}
                              </td>

                              <td class="ng-binding span-35" v-text="data.course.courseName"></td>

                              <td class="ng-binding"
                                  :class="data.course.debitOrCredit == 0 ? '-sizeColor-red span-5' : '-sizeColor-green span-5'"
                                  v-text="data.course.debitOrCredit == 1 ? '贷' : '借'">
                              </td>
                              <!-- 借方累计 -->
                              <td class="span-11">
                                <span class="ng-binding" :class="data.insertInput ? 'ng-hide' : ''">{{data.debitTheCumulative | moneyFilter}}</span>
                                <div :class="data.insertInput ? '' : 'ng-hide'">
                                  <label class="tdLabel ng-binding" :for="forIdByCashFlow(index, 3)">
                                    {{data.debitTheCumulative | moneyFilter}}
                                  </label>
                                  <input type="number" class="tdInput ng-pristine ng-untouched ng-valid ng-not-empty"
                                         :id="forIdByCashFlow(index, 3)" v-model="data.debitTheCumulative"
                                         @change="onChangeBalanceData(data)" @keyup="onChangeBalanceData(data)">
                                </div>
                              </td>
                              <!-- 贷方累计 -->
                              <td class="span-11">
                                <span class="ng-binding" :class="data.insertInput ? 'ng-hide' : ''">{{data.theLenderHas | moneyFilter}}</span>
                                <div :class="data.insertInput ? '' : 'ng-hide'">
                                  <label class="tdLabel ng-binding" :for="forIdByCashFlow(index, 4)">
                                    {{data.theLenderHas | moneyFilter}}
                                  </label>
                                  <input type="number" class="tdInput ng-pristine ng-untouched ng-valid ng-not-empty"
                                         :id="forIdByCashFlow(index, 4)" v-model="data.theLenderHas"
                                         @change="onChangeBalanceData(data)" @keyup="onChangeBalanceData(data)">
                                </div>
                              </td>
                              <!-- 期末余额 -->
                              <td class="span-11">
                                <span class="ng-binding" :class="data.insertInput ? 'ng-hide' : ''">{{data.theEndingBalance | moneyFilter}}</span>
                                <div :class="data.insertInput ? '' : 'ng-hide'">
                                  <label class="tdLabel ng-binding" :for="forIdByCashFlow(index, 5)">
                                    {{data.theEndingBalance | moneyFilter}}
                                  </label>
                                  <input type="number" class="tdInput ng-pristine ng-untouched ng-valid ng-not-empty"
                                         :id="forIdByCashFlow(index, 5)" v-model="data.theEndingBalance"
                                         @change="onChangeBalanceData(data)" @keyup="onChangeBalanceData(data)">
                                </div>
                              </td>
                              <!-- 年初余额 -->
                              <td class="span-11 ng-binding">{{data.atTheBeginningOfTheBalance | moneyFilter}}</td>
                            </tr>
                            </tbody>
                          </table>
                          <!-- 辅助核算余额表 -->
                          <div class="assistInitBalance ng-hide">
                            <div click-test="" listen="enableClickTest" onmouselost="assistBoxSetOnblur()"
                                 class="span-50 dowmWrap ng-isolate-scope ng-hide" ng-show="showSelector"
                                 id="assistBox-" cnclgqll="">
                              <div source="selectorSource" on="showSelector"
                                   suggestion="tableData.assist" auto-comfirm="false"
                                   enable-click-test="enableClickTest" output="newAss" finish="a"
                                   callback="addAssist(newAss)" class="ng-isolate-scope">
                                <div class="assistSelector ng-hide" ng-show="on">
                                  <div class="content"> <!-- ngRepeat: (type, select) in selector --> </div>
                                  <div class="footer" ng-show="!autoComfirm">
                                    <div class="btnBox">
                                      <div class="btn-confirm solidBtn" ng-click="confirm()"> 确认</div>
                                      <div class="btn-more solidBtn" ng-click="more()"> 确认并继续</div>
                                    </div>
                                  </div>
                                  <div on="creator.on" source="creator.source" output="suggestion"
                                       callback="created()" class="ng-isolate-scope">
                                    <div class="site-mask anime" ng-class="{'site-mask--shade': on}">
                                      <div class="pop-container site-popup anime assistCreator"
                                           ng-class="{'site-popup--expand' : on}"><p class="title"> 添加辅助核算项 </p>
                                        <div class="icon-close" ng-click="close()"></div>
                                        <div class="content">
                                          <div class="item"><label for="assistCreator-code-dmweocnl">编码</label>
                                            <div class="inputBox"><input type="text" id="assistCreator-code-dmweocnl"
                                                                         ng-model="creator.code"
                                                                         class="ng-pristine ng-untouched ng-valid ng-empty">
                                            </div>
                                          </div>
                                          <div class="item">
                                            <label for="assistCreator-name-dmweocnl">名称</label>
                                            <div class="inputBox">
                                              <input type="text" id="assistCreator-name-dmweocnl"
                                                     ng-model="creator.name"
                                                     class="ng-pristine ng-untouched ng-valid ng-empty">
                                            </div>
                                          </div>
                                          <div class="item ng-hide" ng-show="creator.type === 'inventory'">
                                            <label for="assistCreator-unit-dmweocnl">单位</label>
                                            <div class="inputBox">
                                              <input type="text" id="assistCreator-unit-dmweocnl"
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
                                  </div>
                                </div>
                              </div>
                            </div>
                            <table class="reportTable">
                              <tbody>
                              <!-- ngRepeat: data in tableData.assistInitBalance.balancesSubjectsShow --> </tbody>
                            </table>
                          </div>
                          <!--  -->
                          <table class="reportTable ng-hide"
                                 ng-show="reportMenu.type.type == 'report' &amp;&amp; currency.type == 'currency'">
                            <tbody> <!-- ngRepeat: data in tableData['currency'] | orderBy:'subject' --> </tbody>
                          </table>
                          <!-- 现金流量表 -->
                          <table class="cashTable" v-if="reportMenu.type == 'cashFlow'">
                            <tbody>
                            <tr v-for="(row,index) in cashList" class="ng-scope evenOff">
                              <!-- 第一列 -->
                              <td class="span-55 ng-binding" :style="{'font-weight': row.bold ? 'bold' : ''}"
                                  v-html="row.project">
                              </td>
                              <!-- 第二列 -->
                              <td class="span-5 ng-binding" v-text="row.lineTime"></td>
                              <!-- 第三列 -->
                              <td class="span-20">
                                <span :class="row.bold ? 'bold' : 'noBold'" class="ng-binding">{{row.cumulativeAmountThisYear | moneyFilter}}</span>

                                <div :class="row.hasInput ? '' : 'ng-hide'">
                                  <label class="tdLabel ng-binding" :for="forIdByCashFlow(index,2)">
                                    {{row.cumulativeAmountThisYear | moneyFilter}}
                                  </label>
                                  <input class="tdInput ng-pristine ng-untouched ng-valid ng-empty" @change="calc(2)"
                                         @keyup="calc(2)" :id="forIdByCashFlow(index,2)" type="number"
                                         v-model="row.cumulativeAmountThisYear">
                                </div>
                              </td>
                              <!-- 第四列 -->
                              <td class="span-20" style="padding-right:15px">
                                <span class="ng-binding" :class="row.bold ? 'bold' : 'noBold'">{{row.amountOfThisMonth | moneyFilter}}</span>
                                <div :class="row.hasInput ? '' : 'ng-hide'">
                                  <label class="tdLabel ng-binding" :for="forIdByCashFlow(index,3)">
                                    {{row.amountOfThisMonth | moneyFilter}}
                                  </label>
                                  <input
                                    class="tdInput ng-pristine ng-untouched ng-valid ng-empty" @keyup="calc(3)"
                                    @change="calc(3)" :id="forIdByCashFlow(index,3)" type="number"
                                    v-model="row.amountOfThisMonth"></div>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                          <!-- 利润表 -->
                          <table class="incomeTable" v-if="reportMenu.type == 'profit'">
                            <tbody>
                            <tr v-for="row in profitList" class="ng-scope"
                                :style="{'font-weight': row.bold ? 'bold' : ''}">
                              <td class="span-55 ng-binding" v-html="row.project"></td>
                              <td class="span-5 ng-binding" v-text="row.lineTime"></td>
                              <td class="span-20 ng-binding">{{row.amountOfThisMonth | moneyFilter}}</td>
                              <td class="span-20 ng-binding">{{row.cumulativeAmountThisYear | moneyFilter}}</td>
                            </tr>
                            </tbody>
                          </table>
                          <!-- 资产负债表 -->
                          <table class="assetTable" v-if="reportMenu.type == 'liabilities'">
                            <tbody>
                            <tr class="ng-scope" v-for="(item, index) in balanceSheet" :key="index">
                              <td class="span-15 ng-binding"
                                  :style="{'font-weight': item.firstColumnBold ? 'bold' : ''}"
                                  v-html="item.assets1"></td>
                              <td class="span-5 ng-binding" v-text="item.lineTime1"></td>
                              <td class="span-15 ng-binding">{{item.endingBalance1 | moneyFilter}}</td>
                              <td class="span-15 ng-binding">{{item.beginningBalance1 | moneyFilter}}</td>
                              <td class="span-15 ng-binding"
                                  :style="{'font-weight': item.secondColumnBold ? 'bold' : ''}"
                                  v-html="item.assets2"></td>
                              <td class="span-5 ng-binding" v-text="item.lineTime2"></td>
                              <td class="span-15 ng-binding">{{item.endingBalance2 | moneyFilter}}</td>
                              <td class="span-15 ng-binding">{{item.beginningBalance2 | moneyFilter}}</td>
                            </tr>
                            </tbody>
                          </table>

                          <div v-if="(reportMenu.type == 'liabilities' && balanceSheet.length == 0) ||
                (reportMenu.type == 'profit' && profitList.length == 0)"
                               style="text-align:center;margin-top:100px">
                            <img src="./i/notFound.png">
                            <p style="color:rgba(50,63,77,.5);margin-top:40px;font-size:18px" class="ng-binding">
                              财税通提示您：系统未找到利润表 </p></div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 固定资产 -->
            <div v-if="setMenu.type == 'assets'">
              <div class="contentArea assetsBox">
                <div class="content-abs tableData-assets">
                  <div class="content-rel" style="padding:40px 0 0 0">
                    <div class="tableBox tableFixed" style="top:0">
                      <table>
                        <thead>
                        <tr>
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 序号 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-4"> 序号
                            <span ng-show="order.type == title.type" ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span>
                          </th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 资产名称 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-14"> 资产名称
                            <span ng-show="order.type == title.type"
                                  ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span>
                          </th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 入账时间 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-8"> 入账时间
                            <span ng-show="order.type == title.type"
                                  ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="icon-orderBy-up"></span>
                          </th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 原值 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-8"> 原值
                            <span ng-show="order.type == title.type" ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span>
                          </th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 预计残值 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-8"> 预计残值
                            <span ng-show="order.type == title.type"
                                  ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span>
                          </th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 总折旧周期(月) 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-10"> 总折旧周期(月)
                            <span ng-show="order.type == title.type"
                                  ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span>
                          </th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 折旧周期(期初) 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-10"> 折旧周期(期初)
                            <span ng-show="order.type == title.type"
                                  ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span>
                          </th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 累计折旧(期初) 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-10"> 累计折旧(期初)
                            <span ng-show="order.type == title.type"
                                  ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span>
                          </th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 本月折旧 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-8"> 本月折旧
                            <span ng-show="order.type == title.type"
                                  ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span>
                          </th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 净值(期末) 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-8"> 净值(期末)
                            <span ng-show="order.type == title.type"
                                  ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span>
                          </th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 状态 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-12"> 状态
                            <span ng-show="order.type == title.type"
                                  ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span>
                          </th>
                          <!-- end ngRepeat: title in setMenu['assets'] --> </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="content-rel" id="scrollBar-assets">
                      <div v-if="assetTableList.length == 0" style="text-align:center;margin-top:100px">
                        <img src="./i/notFound.png">
                        <p style="color:rgba(50,63,77,.5);margin-top:40px" class="ng-binding"> 未搜索到固定资产 </p>
                      </div>
                      <table>
                        <tbody> <!-- ngRepeat: data in tableData['assets'] | orderBy: order.order + order.type -->
                        <tr v-for="(item, index) in assetTableList" :key="index"
                            v-if="item.accountSetId != null && item.accountSetId != ''"
                            @mouseenter="showAssetStatus(index,item)" @mouseleave="hideAssetStatus(index,item)">
                          <td class="span-4 ng-binding" v-text="index+1"></td>
                          <td class="span-14 ng-binding" v-text="item.assetName"></td>
                          <td class="span-8 ng-binding" v-text="item.dateRecorded"></td>
                          <td class="span-8 ng-binding">{{item.originalValue | moneyFilter}}</td>
                          <td class="span-8 ng-binding">{{item.expectedSalvage | moneyFilter}}</td>
                          <td class="span-10 ng-binding" v-text="item.depreciationPeriod"></td>
                          <td class="span-10 ng-binding" v-text="item.accumulatedDepreciationPeriod"></td>
                          <td class="span-10 ng-binding">{{item.accumulatedDepreciation | moneyFilter}}</td>
                          <td class="span-8 ng-binding">{{item.thisMonthDepreciation | moneyFilter}}</td>
                          <td class="span-8 ng-binding">{{item.netWorth | moneyFilter}}</td>
                          <td class="span-12">
                            <div class="ng-scope" v-text="item.statusDescription" v-if="item.edit"
                                 :class="item.status == 1 || item.status == 2 || item.status == 3 || item.status == 4? 'prepare' : 'depreciationIng'">
                            </div>
                            <div v-if="!item.edit" class="depreciationNewIng ng-scope" @click="editFixedAsset(item)">
                              - 编辑 -
                            </div>
                            <div v-if="!item.dispose" class="depreciationNewIng ng-scope" @click="disposeIng(item)">
                              - 处理 -
                            </div>
                            <div v-if="!item.cancel" class="depreciationNewIng ng-scope" @click="cancel(item)">
                              - 取消 -
                            </div>
                            <div class="deleteAssets-btn" data-toggle="tooltip" title="删除该条固定资产"
                                 @click.stop="deleteFixedAsset(item)"></div>
                          </td>
                        </tr>
                        <tr v-for="(item, index) in assetTableList" :key="index" style="font-weight:700"
                            v-if="item.accountSetId == null">
                          <td colspan="3">合计：</td>
                          <td style="text-align:right" class="ng-binding" v-text="item.sumOriginalValue"></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td style="text-align:right" class="ng-binding">{{item.sumAccumulatedDepreciation |
                            moneyFilter}}
                          </td>
                          <td style="text-align:right" class="ng-binding">{{item.sumThisMonthDepreciation |
                            moneyFilter}}
                          </td>
                          <td style="text-align:right" class="ng-binding">{{item.sumNetWorth | moneyFilter}}</td>
                          <td></td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 待摊费用 -->
            <div class="ng-isolate-scope" v-if="setMenu.type === 'amortise'">
              <div class="contentArea amortiseBox">
                <div class="content-abs tableData-amortise">
                  <div class="menuBox">
                    <div class="com-button anime ng-isolate-scope com-button--hollow" @click.stop="downloadTemplate">
                      <div><span class="ng-scope">下载模板</span></div>
                    </div>
                    <div class="com-button anime ng-isolate-scope com-button--hollow">
                      <div><label for="amortise" class="ng-scope">导入待摊费用</label></div>
                    </div>
                    <div class="com-button anime ng-isolate-scope com-button--hollow" @click.stop="addAmortise('添加')">
                      <div><span class="ng-scope">添加待摊费用</span></div>
                    </div>
                    <input id="amortise" type="file" file-model="" keep-file="false"></div>
                  <div class="content-rel" style="padding:40px 0 0 0">
                    <div class="tableBox tableFixed" style="top:0">
                      <table>
                        <thead>
                        <tr>
                          <th class="span-6">序号</th>
                          <th class="span-14">费用名称</th>
                          <th class="span-10">摊销起始期</th>
                          <th class="span-10">摊销金额</th>
                          <th class="span-10">摊销期限(月)</th>
                          <th class="span-10">已摊销期数(月)</th>
                          <th class="span-10">已摊销金额</th>
                          <th class="span-10">未摊销金额</th>
                          <th class="span-10">本月摊销</th>
                          <th class="span-10">状态</th>
                        </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="content-rel ps-container ps-theme-default" scroll="" scroll-behavior="top"
                         data-ps-id="713bceff-15c2-2e04-2e8f-e7f4906e762f">
                      <div v-if="amortiseTableList.length === 0" style="text-align:center;margin-top:100px"><img
                        src="./i/notFound.png">
                        <p style="color:rgba(50,63,77,.5);margin-top:40px" class="ng-binding"> 未搜索到待摊费用 </p>
                      </div>
                      <table>
                        <tbody>
                        <tr class="ng-scope state--editable" v-for="(item, index) in amortiseTableList" :key="index"
                            v-if="item.accountSetId != null">
                          <td class="col-index span-6 ng-binding" v-text="index+1"></td>
                          <td class="col-name span-14 ng-binding" v-text="item.costName"></td>
                          <td class="col-bi span-10 ng-binding" v-text="item.amortizationPeriod"></td>
                          <td class="col-cash span-10 ng-binding">{{item.amortizationAmount | moneyFilter}}</td>
                          <td class="col-dp span-10 ng-binding" v-text="item.amortizationSchedule"></td>
                          <td class="col-biup span-10 ng-binding" v-text="item.amortizedPeriod"></td>
                          <td class="col-biuv span-10 ng-binding">{{item.amortizedAmount | moneyFilter}}</td>
                          <td class="col-spl span-10 ng-binding">{{item.unamortizedAmount | moneyFilter}}</td>
                          <td class="col-tiv span-10 ng-binding">{{item.thisMonthAmortization | moneyFilter}}</td>
                          <td class="col-state span-10">
                            <span class="state-tag" v-text="item.statusDescription"></span>
                            <div class="state-container" :class="item.status == 2 ? 'onlyMiddle' : ''">
                              <div class="btn-op com-button anime ng-isolate-scope com-button--ok"
                                   v-if="item.status == 1"
                                   @click.stop="editAmortise(item)">
                                <div><span class="ng-scope">编辑</span></div>
                              </div>
                              <div class="btn-op com-button anime ng-isolate-scope com-button--ok"
                                   v-if="item.status == 1"
                                   @click.stop="deleteAmortise(item)">
                                <div><span class="ng-scope">删除</span></div>
                              </div>
                              <div class="btn-op com-button anime ng-isolate-scope com-button--ok"
                                   v-if="item.status == 2" style="justify-content: center;"
                                   @click.stop="showAmortise(item)">
                                <div><span class="ng-scope">查看</span></div>
                              </div>
                            </div>
                          </td>
                        </tr>

                        <tr v-for="(item, index) in amortiseTableList" :key="index" style="font-weight:700"
                            v-if="item.accountSetId == null">
                          <td colspan="3" style="text-align:center">合计：</td>
                          <td style="text-align:right" class="ng-binding">{{item.sumAmortizationAmount | moneyFilter}}
                          </td>
                          <td style="text-align:center">-</td>
                          <td style="text-align:center">-</td>
                          <td style="text-align:center">-</td>
                          <td style="text-align:center">-</td>
                          <td style="text-align:right" class="ng-binding">{{item.sumThisMonthAmortization |
                            moneyFilter}}
                          </td>
                          <td style="text-align:center">-</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 账套信息 -->
            <div style="height: 100%;">
              <div class="ps-theme-default ps-active-y" id="accountInfo" v-if="setMenu.type == 'info'"
                   style="overflow-y: auto">
                <div class="basic column">
                  <div class="title"><span class="sideLine"></span> 基本信息</div>
                  <div class="content clear">
                    <div class="leftBox">
                      <div class="accountName">
                        <label class="inputLabel">账套信息</label>
                        <div class="input-normal">
                          <input type="text" id="accountName" v-model="accountInfo.companyName"
                                 class="ng-pristine ng-untouched ng-valid ng-empty">
                        </div>
                      </div>
                      <div class="secretKey">
                        <label class="inputLabel" style="height:30px">企业密钥</label>
                        <div class="secretKey-warp">
                          <div class="input-normal">
                            <div id="secretKey" class="ng-binding" v-text="accountInfo.secretKey"></div>
                          </div>
                          <div class="getSecretKey btn" @click="querySecret">获取</div>
                        </div>
                      </div>
                    </div>
                    <div class="rightBox">
                      <div class="taxTypeBox selectBox"><label class="inputLabel">纳税类型</label>
                        <div class="item ng-binding ng-scope" v-for="taxType in accountOptions" :key="taxType.key"><span
                          class="icon-select" @click="selectCoType(taxType.key, 'taxType')"
                          :class="{'icon-selected': taxType.key === accountInfo.taxTypes}"></span> {{taxType.value}}
                        </div>
                      </div>
                      <div class="taxPeriod selectBox">
                        <label class="inputLabel">纳税周期</label>
                        <div class="item ng-binding ng-scope">
                          <span class="icon-select" @click="selectCoType(1, 'taxPaymentPeriod')"
                                :class="{'icon-selected': accountInfo.taxPaymentPeriod === 1}"></span> 月报
                        </div>
                        <div class="item ng-binding ng-scope">
                          <span class="icon-select" @click="selectCoType(2, 'taxPaymentPeriod')"
                                :class="{'icon-selected': accountInfo.taxPaymentPeriod === 2}"></span> 季报
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="connect column">
                  <div class="title"><span class="sideLine"></span> 联系信息</div>
                  <div class="content">
                    <div class="company clear" ng-hide="user.type === 'fscAdmin' ||
                    user.type === 'fscMgr' ||
                    user.type === 'fscCommon'">
                      <div class="leftBox"><span class="icon-person"></span>
                        <label class="inputLabel">企业联系人</label>
                        <div class="input-normal" style="margin-bottom:0">
                          <input type="text" v-model="accountInfo.corporateContact"
                                 class="ng-pristine ng-untouched ng-valid ng-empty">
                        </div>
                      </div>
                      <div class="rightBox"><span class="icon-phone"></span>
                        <label class="inputLabel">联系方式</label>
                        <div class="input-normal" style="margin-bottom:0">
                          <input type="text" v-model="accountInfo.contact"
                                 class="ng-pristine ng-untouched ng-valid ng-empty">
                        </div>
                      </div>
                    </div>
                    <div class="communicate clear ng-hide" ng-show="user.type === 'acAdmin' ||
                    user.type === 'acMgr' ||
                    user.type === 'acCommon'">
                      <div class="leftBox"><span class="icon-person"></span>
                        <label class="inputLabel">财税专家</label>
                        <div class="input-normal" style="margin-bottom:0">
                          <input type="text"
                                 ng-model="companyInfo.info.fscAccountant.name"
                                 ng-class="{'disabled': true}"
                                 ng-disabled="true"
                                 class="ng-pristine ng-untouched ng-valid ng-empty disabled"
                                 disabled="disabled"></div>
                      </div>
                      <div class="rightBox"><span class="icon-phone"></span>
                        <label class="inputLabel">联系方式</label>
                        <div class="input-normal" style="margin-bottom:0">
                          <input type="text"
                                 ng-model="companyInfo.info.fscAccountant.phone"
                                 ng-class="{'disabled': true}"
                                 ng-disabled="true"
                                 class="ng-pristine ng-untouched ng-valid ng-empty disabled"
                                 disabled="disabled">
                        </div>
                      </div>
                    </div>
                    <div class="communicate clear ng-hide">
                      <div class="leftBox"><span class="icon-person"></span>
                        <label class="inputLabel">财税顾问</label>
                        <div class="input-normal" style="margin-bottom:0">
                          <input type="text"
                                 ng-model="companyInfo.info.acAccountant.name"
                                 ng-class="{'disabled': true}"
                                 ng-disabled="true"
                                 class="ng-pristine ng-untouched ng-valid ng-empty disabled"
                                 disabled="disabled"></div>
                      </div>
                      <div class="rightBox"><span class="icon-phone"></span>
                        <label class="inputLabel">联系方式</label>
                        <div class="input-normal" style="margin-bottom:0">
                          <input type="text"
                                 ng-model="companyInfo.info.acAccountant.phone"
                                 ng-class="{'disabled': true}"
                                 ng-disabled="true"
                                 class="ng-pristine ng-untouched ng-valid ng-empty disabled"
                                 disabled="disabled"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 税务信息 -->
                <div class="tax column">
                  <div class="title"><span class="sideLine"></span> 税务信息</div>
                  <div class="content clear">
                    <div class="leftBox">
                      <div class="taxNumber">
                        <label for="taxNumber" class="inputLabel">税号</label>
                        <div class="input-normal">
                          <input type="text" id="taxNumber" v-model="accountInfo.taxNumber"
                                 class="ng-pristine ng-untouched ng-valid ng-empty">
                        </div>
                      </div>
                      <div class="taxBureau">
                        <label for="taxBureau" class="inputLabel">税管所</label>
                        <div class="input-normal">
                          <input type="text" id="taxBureau" v-model="accountInfo.taxAdministrationOffice"
                                 class="ng-pristine ng-untouched ng-valid ng-empty">
                        </div>
                      </div>
                      <div class="taxAdmin">
                        <label for="taxAdmin" class="inputLabel">专员号</label>
                        <div class="input-normal">
                          <input type="text" id="taxAdmin"
                                 v-model="accountInfo.taxOfficeNumber"
                                 class="ng-pristine ng-untouched ng-valid ng-empty"></div>
                      </div>
                      <div class="taxAdminPhone">
                        <label for="taxAdminPhone" class="inputLabel">联系方式</label>
                        <div class="input-normal">
                          <input type="text" id="taxAdminPhone"
                                 v-model="accountInfo.taxOfficeContact"
                                 class="ng-pristine ng-untouched ng-valid ng-empty"></div>
                      </div>
                      <div class="certificateExpired-warp">
                        <label class="inputLabel">证书到期日</label>
                        <div class="input-normal">
                          <div class=""></div>
                          <input type="text" class="certificateExpired ng-pristine ng-untouched ng-valid ng-empty"
                                 v-model="accountInfo.expiryDateOfTaxCertificate"
                                 placeholder="格式：XXXX-XX-XX">
                        </div>
                      </div>
                    </div>
                    <div class="rightBox">
                      <div class="taxPrinter selectBox"><label class="inputLabel">税控机</label>
                        <div class="item ng-binding ng-scope" @click="selectCoType(1, 'hasTaxPrinter')">
                          <span class="icon-select"
                                :class="{'icon-selected': accountInfo.hasTaxPrinter === 1}"></span>
                          有
                        </div><!-- end ngRepeat: taxPrinter in companyInfo.taxPrinter.list -->
                        <div class="item ng-binding ng-scope" @click="selectCoType(2, 'hasTaxPrinter')">
                          <span class="icon-select"
                                :class="{'icon-selected': accountInfo.hasTaxPrinter === 2}"></span>
                          无
                        </div>
                      </div>
                      <div class="incomeTax selectBox">
                        <label class="inputLabel">所得税申报</label>
                        <div class="item ng-binding ng-scope" ng-repeat="incomeTax in companyInfo.incomeTax.list"
                             @click="selectCoType(1, 'declarationOfIncome')">
                          <span class="icon-select"
                                :class="{'icon-selected': accountInfo.declarationOfIncome === 1}"></span>
                          国税
                        </div>
                        <div class="item ng-binding ng-scope" ng-repeat="incomeTax in companyInfo.incomeTax.list"
                             @click="selectCoType(2, 'declarationOfIncome')">
                          <span class="icon-select"
                                :class="{'icon-selected': accountInfo.declarationOfIncome === 2}"></span>
                          地税
                        </div>
                      </div>
                      <div class="incomeTax selectBox">
                        <label class="inputLabel">所得税类型</label>
                        <div class="item ng-binding ng-scope" @click="selectCoType(1, 'incomeTaxType')">
                          <span class="icon-select"
                                :class="{'icon-selected': accountInfo.incomeTaxType === 1}"></span>
                          查账征收
                        </div>
                        <div class="item ng-binding ng-scope" @click="selectCoType(2, 'incomeTaxType')">
                          <span class="icon-select"
                                :class="{'icon-selected': accountInfo.incomeTaxType === 2}"></span>
                          核定征收
                        </div><!-- end ngRepeat: type in companyInfo.taxType.list -->
                      </div>
                      <div class="incomeTax selectBox"><label class="inputLabel">核定征收率</label>
                        <div class="input-normal">
                          <input type="number" id="taxRate" v-model="accountInfo.taxAssessmentRate"
                                 class="ng-pristine ng-untouched ng-valid ng-empty">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 企业经营信息 -->
                <div class="companyManage column">
                  <div class="title"><span class="sideLine"></span> 企业经营信息</div>
                  <div class="content clear">
                    <div class="leftBox">
                      <div class="companyName"><label for="companyName" class="inputLabel">公司名称</label>
                        <div class="input-normal">
                          <input type="text" id="companyName" v-model="accountInfo.companyName"
                                 class="ng-pristine ng-untouched ng-valid ng-empty"></div>
                      </div>
                      <div class="industry"><label for="industry" class="inputLabel">所属行业</label>
                        <div class="input-normal">
                          <input type="text" id="industry" v-model="accountInfo.industryInvolved"
                                 class="ng-pristine ng-untouched ng-valid ng-empty"></div>
                      </div>
                      <div class="address"><label for="address" class="inputLabel">注册地址</label>
                        <div class="input-normal">
                          <input type="text" id="address" v-model="accountInfo.registeredAddress"
                                 class="ng-pristine ng-untouched ng-valid ng-empty"></div>
                      </div>
                    </div>
                    <div class="rightBox">
                      <div class="range"><label class="inputLabel">经营范围</label> <textarea
                        v-model="accountInfo.businessScope"
                        class="ng-pristine ng-untouched ng-valid ng-empty"></textarea></div>
                    </div>
                  </div>
                </div>
                <div class="bank column">
                  <div class="title">
                    <span class="sideLine"></span> 银行信息
                  </div>
                  <div class="content">
                    <div class="infoBox-bankHead">
                      <div class="bankTd-add" data-toggle="tooltip" title="添加银行" @click="addBank">
                        <div class="icon-addBankInfo"></div>
                      </div>
                      <div class="bankTd-type">账户类型</div>
                      <div class="bankTd-bank">开户银行</div>
                      <div class="bankTd-num">银行账号</div>
                    </div>
                    <div class="infoBox-bankBody ng-scope" v-for="(bank,index) in accountInfo.accountSetBankList"
                         :key="index">
                      <div class="bankTd-index ng-binding" v-text="index+1"></div>
                      <div class="bankTd-type">
                        <select class="form-control ng-pristine ng-valid ng-not-empty ng-touched"
                                v-model="bank.accountType">
                          <option label="基本账户" value="1">基本账户</option>
                          <option label="社保账户" value="2">社保账户</option>
                          <option label="一般账户" value="3">一般账户</option>
                        </select>
                      </div>
                      <div class="bankTd-bank">
                        <!--<label class="ng-binding tdLabel-on tdLabel"></label>-->
                        <input class="tdInput ng-pristine ng-untouched ng-valid ng-empty align" type="text"
                               v-model="bank.depositBank" ng-keypress="keyPress($event, ('#bn-' + $index))">
                      </div>
                      <div class="bankTd-num">
                        <!--<label class="ng-binding tdLabel-on tdLabel"></label>-->
                        <input class="tdInput ng-pristine ng-untouched ng-valid ng-empty align" type="text"
                               v-model="bank.bankAccount">
                      </div>
                      <div class="icon-removeBank" data-toggle="tooltip" title="删除银行" @click="removeBank(index)"></div>
                    </div>
                  </div>
                </div>
                <div class="adjunct column">
                  <div class="title"><span class="sideLine"></span> 企业附件</div>
                  <div class="content clear">
                    <div class="enclosureBox-add span-20">
                      <div class="enclosure-containBox" data-toggle="tooltip" title="添加附件">
                        <input type="file" id="fileEnclosure" name="file[]" @change="fileUpload" ref="inputer">
                        <div class="icon-assEnclosure"></div>
                      </div>
                    </div>
                    <!-- 附件 -->
                    <div class="enclosureBox span-20 ng-scope" v-for="(a,index) in accountInfo.enterpriseAnnexList"
                         :key="index" data-toggle="tooltip" @click.stop="downloadFile(a)">
                      <div class="enclosure-containBox">
                        <div class="content-rel enclosure-J">
                          <img src="./i/upLoadDefault.png">
                          <div class="icon-deleteEnclosure" data-toggle="tooltip" title="删除"
                               @click.stop="deleteFile(a)"></div>
                        </div>
                      </div>
                      <div class="enclosure-sizeBox overflowHiddenEllipsis ng-binding" v-text="a.fileName"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- 添加固定资产 -->
    <div class="site-mask anime ng-isolate-scope site-mask--shade" v-if="isFixedAssets">
      <div class="site-popup anime popup-fixedAssetInfo site-popup--expand">
        <div class="site-popup_head">
          <p class="ng-binding">{{assetsTitle}}固定资产</p>
          <div class="site-popup_close g-icon-close" @click.stop="hide"></div>
        </div>
        <div class="site-popup_body">
          <div class="entry-container">
            <div class="entry-row">
              <p class="grid-label popup-label">资产名称</p>
              <input class="grid-content ng-valid ng-dirty ng-touched ng-empty" type="text" v-model="asset.assetName">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">入账日期</p>
              <input class="grid-content grid-content--lock ng-pristine ng-untouched ng-valid ng-not-empty" type="text"
                     v-model="asset.dateRecorded" disabled="disabled">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">原值</p>
              <input class="grid-content ng-valid ng-dirty ng-touched ng-not-empty" type="number"
                     v-model="asset.originalValue">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">预计残值率</p>
              <input class="grid-content ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
                     v-model="asset.expectedSalvageRate">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">折旧周期</p>
              <input class="grid-content ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
                     v-model="asset.depreciationPeriod">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">累计折旧周期</p>
              <input class="grid-content ng-valid ng-dirty ng-touched ng-not-empty" type="number"
                     v-model="asset.accumulatedDepreciationPeriod">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">累计折旧</p>
              <input class="grid-content ng-valid ng-dirty ng-touched ng-not-empty" type="number"
                     v-model="asset.accumulatedDepreciation">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">入账科目</p>
              <select class="grid-content ng-pristine ng-untouched ng-valid ng-not-empty"
                      v-model="asset.courseId">
                <option v-for="sub in accountingCourselist" :value="sub.id" class="ng-binding ng-scope">
                  {{sub.coding}} - {{sub.courseName}}
                </option>
              </select>
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">折旧方法</p>
              <select class="grid-content ng-pristine ng-untouched ng-valid ng-not-empty"
                      v-model="asset.depreciationMethod">
                <option v-for="a in fixedAssetModel" class="ng-binding ng-scope" :value="a.value"
                        v-text="a.name"></option>
              </select>
            </div>
            <div class="entry-row flex-left">
              <p class="grid-label popup-label">本月计提</p>
              <label class="checkbox icon-select"
                     :class="{'icon-selected': asset.thisMonthPlan}">
                <input type="checkbox" v-model="asset.thisMonthPlan" id="fixedAssetAccrued"
                       class="ng-valid ng-dirty ng-valid-parse ng-touched ng-empty">
              </label>
            </div>
          </div>
        </div>
        <div class="site-popup_footer">
          <p class="popup-error ng-binding" v-text="asset.error"></p>
          <div class="entry-row">
            <div class="btn-cancel com-button anime ng-isolate-scope com-button--cancel" @click.stop="hide">
              <div><span class="ng-scope">取消</span></div>
            </div>
            <div class="btn-ok com-button anime ng-isolate-scope com-button--ok" @click.stop="ok">
              <div><span class="ng-scope">确定</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 确认删除固定资产 -->
    <div class="site-mask anime ng-isolate-scope site-mask--shade" v-if="isRealDelAssetMask">
      <div class="site-popup anime popup-confirm flex--column site-popup--expand" ng-class="{'site-popup--expand': on}">
        <div class="site-popup_head">
          <div class="site-popup_title">财税通提醒您：</div>
        </div>
        <div class="site-popup_body">
          <div class="site-popup_type">
            <div class="typeIcon g-icon-warn"></div>
            <p class="typeTitle typeTitle--warn ng-binding">确定要删除资产 “{{asset.assetName}}” 吗？</p></div>
        </div>
        <div class="site-popup_footer">
          <div class="btn--cancel com-button anime ng-isolate-scope com-button--cancel" @click.stop="cancelAsset">
            <div><span class="ng-scope">否</span></div>
          </div>
          <div class="btn--ok com-button anime ng-isolate-scope com-button--ok" @click.stop="realDelAsset">
            <div><span class="ng-scope">是</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 固定资产折旧操作 -->
    <div class="site-mask anime site-mask--shade" v-if="showDisposeAssets">
      <div class="disposeAssetsBox anime site-popup--expand" ng-class="{'site-popup--expand' : showDisposeAssets}">
        <div class="voucherBox">
          <div class="disposeAssets-title"> 固定资产处理操作
            <div class="closeDisposeAssetsPop-icon" data-toggle="tooltip" title="关闭"
                 @click.stop="disposeSelectPop('false')"></div>
          </div>
          <div class="disposeAssets-btn-sell" @click="disposeSelect('4')">出售</div>
          <div class="disposeAssets-btn-scrap" @click="disposeSelect('3')">报废</div>
          <div class="disposeAssets-btn-loss" @click="disposeSelect('2')">盘亏</div>
        </div>
      </div>
    </div>

    <!-- 添加待摊费用 -->
    <div class="site-mask anime site-mask--shade" v-if="isAmortise">
      <div class="site-popup anime popup-amortise site-popup--expand">
        <div class="site-popup_head">
          <p class="ng-binding">{{amortiseTitle}}待摊费用</p>
          <div class="site-popup_close g-icon-close" @click.stop="hide"></div>
        </div>
        <div class="site-popup_body">
          <div class="entry-container">
            <div class="entry-row">
              <p class="grid-label popup-label">费用名称</p>
              <input class="grid-content ng-pristine ng-untouched ng-valid ng-empty" type="text"
                     :disabled="amortise.show" :class="amortise.show? 'grid-content--lock' : ''"
                     v-model="amortise.costName"></div>
            <div class="entry-row">
              <p class="grid-label popup-label">摊销起始期</p>
              <input class="grid-content grid-content--lock ng-pristine ng-untouched ng-valid ng-not-empty" type="text"
                     disabled="disabled" v-model="amortise.amortizationPeriod"></div>
            <div class="entry-row">
              <p class="grid-label popup-label">摊销金额</p>
              <input class="grid-content ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
                     :disabled="amortise.show" :class="amortise.show? 'grid-content--lock' : ''"
                     v-model="amortise.amortizationAmount">
            </div>
            <div class="entry-row flex-left">
              <p class="grid-label popup-label">摊销期限</p>
              <input class="grid-content grid-content--short ng-pristine ng-untouched ng-valid ng-not-empty"
                     :disabled="amortise.show" type="number" v-model="amortise.amortizationSchedule"
                     :class="amortise.show? 'grid-content--lock' : ''">
              <span class="grid-tail">月</span>
            </div>
            <div class="entry-row flex-left">
              <p class="grid-label popup-label">已摊销期数</p>
              <input class="grid-content grid-content--short ng-pristine ng-untouched ng-valid ng-not-empty"
                     :disabled="amortise.show" type="number" v-model="amortise.amortizedPeriod"
                     :class="amortise.show? 'grid-content--lock' : ''">
              <span class="grid-tail">月</span>
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">已摊销金额</p>
              <input class="grid-content ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
                     :disabled="amortise.show" v-model="amortise.amortizedAmount"
                     :class="amortise.show? 'grid-content--lock' : ''"></div>
            <div class="entry-row">
              <p class="grid-label popup-label">入账科目</p>
              <select class="grid-content grid-content--lock ng-pristine ng-untouched ng-valid ng-not-empty"
                      :disabled="amortise.show" v-model="amortise.courseId"
                      :class="amortise.show? 'grid-content--lock' : ''">
                <option v-for="sub in accountingAmortiseCourselist" :value="sub.id" class="ng-binding ng-scope">
                  {{sub.coding}} - {{sub.courseName}}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="site-popup_footer">
          <p class="popup-error ng-binding" v-text="amortise.error"></p>
          <template v-if="amortise.show">
            <div class="entry-row">
              <div class="btn-cancel com-button anime ng-isolate-scope com-button--cancel" @click.stop="hide">
                <div><span class="ng-scope">取消</span></div>
              </div>
              <div class="btn-ok com-button anime ng-isolate-scope com-button--ok" @click.stop="hide">
                <div><span class="ng-scope">确定</span></div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="entry-row">
              <div class="btn-cancel com-button anime ng-isolate-scope com-button--cancel" @click.stop="hide">
                <div><span class="ng-scope">取消</span></div>
              </div>
              <div class="btn-ok com-button anime ng-isolate-scope com-button--ok" @click.stop="okAmortise">
                <div><span class="ng-scope">确定</span></div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 确认删除待摊费用 -->
    <div class="site-mask anime ng-isolate-scope site-mask--shade" v-if="isRealDelAmortiseMask">
      <div class="site-popup anime popup-confirm flex--column site-popup--expand" ng-class="{'site-popup--expand': on}">
        <div class="site-popup_head">
          <div class="site-popup_title">财税通提醒您：</div>
        </div>
        <div class="site-popup_body">
          <div class="site-popup_type">
            <div class="typeIcon g-icon-warn"></div>
            <p class="typeTitle typeTitle--warn ng-binding">是否删除“{{amortise.costName}}”条目？</p></div>
        </div>
        <div class="site-popup_footer">
          <div class="btn--cancel com-button anime ng-isolate-scope com-button--cancel" @click.stop="cancelDelAmortise">
            <div><span class="ng-scope">否</span></div>
          </div>
          <div class="btn--ok com-button anime ng-isolate-scope com-button--ok" @click.stop="realDelAmortise">
            <div><span class="ng-scope">是</span></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from './api/index'
  import utils from '../../utils'

  /**
   * 累计折旧
   固定资产折旧费用根据固定资产的原值和规定的折旧率计算确定，按照一定的标准分摊记入各期的间接费用和期间费用。生产车间用房屋建筑物、机器设备
   的折旧，作为间接费用，计入制造费用帐户，厂部行政用办公房屋的，计入管理费用帐户，由当期收入负担。折旧合计数计入“累计折旧”帐户的贷方。

   比如说购入一台电脑5000元，电脑一般折旧年限为5年

   1、残值：
   5000元*残值率5%=250元
   2、年折旧额：
   （5000-250）/5=950（元）
   3、月折旧额：
   950/12=79.17（元）

   分录：
   借：管理费用：79.17
   贷：累计折旧 79.17
   * **/
  export default {
    name: "bookSettings",
    data() {
      return {
        isNullBtnFlag: false,
        operationFlag: false,
        subjects: [],
        setTitleClass: '',
        // 科目设置右侧tab导航
        navMenuSubject: [
          {"index": 1, "type": "assets", "name": "资产", isSelected: true},
          {"index": 2, "type": "liabilities", "name": "负债", isSelected: false},
          {"index": 3, "type": "rightsAndInterests", "name": "权益", isSelected: false},
          {"index": 4, "type": "cost", "name": "成本", isSelected: false},
          {"index": 5, "type": "profitAndLoss", "name": "损益", isSelected: false}
        ],
        // 辅助核算右侧tab导航
        navMenuAssist: [
          {"index": 1, "type": "assets", "name": "客户", isSelected: true},
          {"index": 2, "type": "liabilities", "name": "供应商", isSelected: false},
          {"index": 3, "type": "rightsAndInterests", "name": "部门", isSelected: false},
          {"index": 4, "type": "cost", "name": "员工", isSelected: false},
          {"index": 5, "type": "profitAndLoss", "name": "存货", isSelected: false},
          {"index": 6, "type": "cost", "name": "项目", isSelected: false}
        ],
        // 报表tab按钮
        reportMenu: {
          type: 'subjectBalance',
          list: [
            {index: 1, type: 'auxiliaryBalance', name: '辅助核算余额表', isSelected: false},
            {index: 2, type: 'liabilities', name: '资产负债表', isSelected: false},
            {index: 3, type: 'profit', name: '利润表', isSelected: false},
            {index: 4, type: 'cashFlow', name: '现金流量表', isSelected: false},
            {index: 5, type: 'subjectBalance', name: '科目余额表', isSelected: true},
          ]
        },
        setMenu: {
          type: 'subject',
          list: [
            {index: 1, type: 'subject', value: '科目设置', isSelected: true},
            {index: 2, type: 'assist', value: '辅助核算', isSelected: true},
            {index: 3, type: 'report', value: '初始报表', isSelected: true},
            {index: 4, type: 'assets', value: '固定资产', isSelected: true},
            {index: 5, type: 'amortise', value: '待摊费用', isSelected: true},
            {index: 6, type: 'info', value: '账套信息', isSelected: true},
          ]
        },
        accountId: utils.dbGet("account").id,
        token: utils.dbGet("userInfo").token,
        adminId: utils.dbGet("userInfo").id,
        accountInfo: {},
        accountOptions: [
          {key: 1, value: '一般纳税人'},
          {key: 2, value: '小规模纳税人'},
          {key: 3, value: '个人独资企业或有限合伙'},
        ],
        // 辅助核算table标题
        assistTableTitle: {},
        assistTableData: [],
        newAssist: {
          status: 1,
          coding: '',
          assistAccountingName: '',
          assistAccountingType: '1',
          unitStr: ''
        },
        // 辅助核算缓存
        cacheAssist: {
          status: '',
          coding: '',
          assistAccountingName: '',
          assistAccountingType: '',
          unitStr: ''
        },
        // 显示固定资产标识
        isFixedAssets: false,
        // 折旧方法
        fixedAssetModel: [
          {value: 1, name: '平均折旧', isSelected: true},
          {value: 2, name: '一次性折旧', isSelected: false},
        ],
        // 添加固定资产对象
        asset: {
          // 资产名字
          assetName: '',
          // 入账日期
          dateRecorded: '',
          // 原值
          originalValue: 0,
          // 预计残值率
          expectedSalvageRate: 0.05,
          // 折旧周期
          depreciationPeriod: 60,
          // 累计折旧周期
          accumulatedDepreciationPeriod: 0,
          // 累计折旧
          accumulatedDepreciation: 0,
          // 入账科目
          courseId: '',
          // 折旧方法
          depreciationMethod: 1,
          // 本月计提
          thisMonthPlan: false,
          // 入账科目列表
          accountedSubject: [],
          // 错误信息
          error: '',
          // 固定资产编号
          id: '',
        },
        // 固定资产折旧弹层
        showDisposeAssets: false,
        // 待摊费用弹层
        isAmortise: false,
        // 固定资产数据
        assetTableList: [],
        // 当前日期
        dateNow: "",
        // 固定资产科目列表
        accountingCourselist: [],
        // 确认删除固定资产蒙层
        isRealDelAssetMask: false,
        // 确认删除待摊费用资产蒙层
        isRealDelAmortiseMask: false,
        // 待摊费用科目列表
        accountingAmortiseCourselist: [],
        // 待摊费用对象列表
        amortiseTableList: [],
        // 添加待摊费用对象
        amortise: {
          // 费用名称
          costName: '',
          // 摊销起始期
          amortizationPeriod: '',
          // 摊销金额
          amortizationAmount: 0,
          // 摊销期限（单位：月）
          amortizationSchedule: 12,
          // 已摊销期数（单位：月）
          amortizedPeriod: 0,
          // 已摊销金额
          amortizedAmount: 0,
          // 入账科目主键
          courseId: '',
          // 新增错误信息
          error: '',
          // 待摊费用编号
          id: '',
        },
        // 待摊费用蒙层title
        amortiseTitle: '',
        // 固定资产蒙层title
        assetsTitle: '',
        // 资产负债表
        balanceSheet: [],
        // 利润表
        profitList: [],
        // 现金流量表
        cashList: [],
        // 科目余额表
        subjectBalanceList: []
      }
    },
    methods: {
      // 科目编码伸缩展示
      flexChildrenSubject(opt) {
        console.log("科目编码伸缩展示:", opt)
        opt.active = !opt.active
      },
      // 表单当前行选中 添加class
      highlightRow(opt) {
        console.log("表单当前行选中 添加class》", opt)
      },
      // 查询科目设置-资产
      queryAssets() {
        /*let url = "../../../static/repository/subject.json"
        return url;*/
        let params = {
          accountSetId: '',
          courseType: '',
          token: ''
        }
        return params;
      },
      // 查询科目设置-负债
      queryLiabilities() {
        let url = "../../../static/repository/liabilities.json"
        return url;
      },
      // 查询科目设置-权益
      queryRightsAndInterests() {
        let url = "";
        return url;
      },
      // 查询科目设置-成本
      queryCost() {
        let url = "";
        return url;
      },
      // 查询科目设置-损益
      queryProfitAndLoss() {
        let url = "";
        return url;
      },
      // 查询导航数据
      queryNavMenuData(url) {
        console.log(url, "<<<<")
        if (utils.isExist(url)) {
          api.queryAccountSet(url).then(res => {
            console.log(res.body)
            if (res.body.result == 0) {
              this.subjects = res.body.data
            }
          })
        }
      },
      // 右侧导航选中事件
      subjectClassify(opt, type) {
        console.log("右侧导航选中事件", opt, type)
        switch (type) {
          case 'subject':
            if (utils.isExist(opt)) {
              this.navMenuSubject.forEach(function (el) {
                if (opt.index == el.index) {
                  el.isSelected = true
                } else {
                  el.isSelected = false
                }
              })
              this.subjects = []
              let params = {
                accountSetId: this.accountId,
                token: this.token
              }
              if (opt.index == 1) { // 资产
                params.courseType = 1;
              } else if (opt.index == 2) { // 负债
                params.courseType = 2;
              } else if (opt.index == 3) { // 权益
                params.courseType = 3;
              } else if (opt.index == 4) { // 成本
                params.courseType = 4;
              } else if (opt.index == 5) { // 损益
                params.courseType = 5;
              }
              this.queryNavMenuData(params)
            }
            break;
          case 'assist':
            if (utils.isExist(opt)) {
              this.navMenuAssist.forEach(function (el) {
                if (opt.index == el.index) {
                  el.isSelected = true
                } else {
                  el.isSelected = false
                }
              })
              this.assistTableData = []

              let params = {
                accountSetId: this.accountId,
                token: this.token
              }

              if (opt.index == 1) { // 客户
                this.newAssist.assistAccountingType = 1
                params.assistAccountingType = 1
              } else if (opt.index == 2) { // 供应商
                this.newAssist.assistAccountingType = 2
                params.assistAccountingType = 2
              } else if (opt.index == 3) { // 部门
                this.newAssist.assistAccountingType = 3
                params.assistAccountingType = 3
              } else if (opt.index == 4) { // 员工
                this.newAssist.assistAccountingType = 4
                params.assistAccountingType = 4
              } else if (opt.index == 5) { // 存货
                this.newAssist.assistAccountingType = 5
                params.assistAccountingType = 5
              } else if (opt.index == 6) { // 项目
                this.newAssist.assistAccountingType = 6
                params.assistAccountingType = 6
              }
              api.queryAllAssists(params).then(res => {
                console.log("添加辅助核算结果：", res.body)
                if (res.body.result == 0) {
                  if (res.body.data != null) {
                    this.assistTableData = res.body.data
                  }
                }
              })
            }
            break;
          case 'report':
            // 初始报表
            if (utils.isExist(opt)) {
              this.navMenuSubject.forEach(function (el) {
                if (opt.index == el.index) {
                  el.isSelected = true
                } else {
                  el.isSelected = false
                }
              })

              let params = {
                accountSetId: this.accountId,
                token: this.token
              }
              if (opt.index == 1) { // 资产
                params.courseType = 1;
              } else if (opt.index == 2) { // 负债
                params.courseType = 2;
              } else if (opt.index == 3) { // 权益
                params.courseType = 3;
              } else if (opt.index == 4) { // 成本
                params.courseType = 4;
              } else if (opt.index == 5) { // 损益
                params.courseType = 5;
              }
              console.log("报告入参：", params)
              api.querySubjectBalances(params).then(res => {
                console.log("查询科目余额数据结果：", res.body)
                if (res.body.result == 0) {
                  this.subjectBalanceList = res.body.data
                } else {
                  this.$emit('error', res.body.msg)
                }
              })
            }
            break;
        }
      },
      // 顶部导航tab
      selectType(opt) {
        console.log("顶部导航tab", opt)
        if (utils.isExist(opt)) {
          this.setMenu.type = opt.type
          if (opt.index == 1) {
            this.subjectClassify({index: 1}, 'subject')
          } else if (opt.index == 2) {
            this.subjectClassify({index: 1}, 'assist')
          } else if (opt.index == 3) {
            this.subjectClassify({index: 1}, 'report')
          } else if (opt.index == 4) {
            console.log("固定资产")
            this.getAccountingCourse()
            this.queryFixedAssets()
          } else if (opt.index == 5) {
            console.log("待摊费用")
            this.queryAmortiseProject()
            this.queryAmortiseData()
          } else if (opt.index == 6) {
            this.queryAccountInfo()
          }
        }
      },
      changeActive(opt) {
        if (utils.isExist(opt)) {
          this.setTitleClass = 'li-' + Number(opt.index - 1)
        }
      },
      removeActive(opt) {
        if (utils.isExist(opt)) {
          this.setTitleClass = ''
        }
      },
      // 根据账套编号查询账套信息
      queryAccountInfo() {
        console.log("根据账套编号查询账套信息", this.accountId, this.token)
        if (utils.isExist(this.accountId) && utils.isExist(this.token)) {
          api.queryAccountById({id: this.accountId, token: this.token}).then(res => {
            console.log("账套信息>>>", res.body)
            if (res.body.result == 0) {
              this.accountInfo = res.body.data
            }
          })
        }
      },
      // 查询账套企业密钥
      querySecret() {
        console.log("查询账套企业密钥", this.accountId)
        if (utils.isExist(this.accountId) && utils.isExist(this.token) && !utils.isExist(this.accountInfo.secretKey)) {
          api.querySecretKey({accountSetId: this.accountId, token: this.token}).then(res => {
            console.log("企业密钥>>>", res.body)
          })
        }
      },
      // 账套信息 复选框
      selectCoType(value, type) {
        console.log("复选框选择》", value, type, this.accountInfo)
        switch (type) {
          case 'hasTaxPrinter': // 程控机
            if (this.accountInfo.hasTaxPrinter == Number(value)) {
              this.accountInfo.hasTaxPrinter = ""
            } else {
              this.accountInfo.hasTaxPrinter = Number(value)
            }
            break;
          case 'taxType': // 纳税类型
            if (this.accountInfo.taxTypes == Number(value)) {
              this.accountInfo.taxTypes = ""
            } else {
              this.accountInfo.taxTypes = Number(value)
            }
            break;
          case 'taxPaymentPeriod': // 纳税周期
            if (this.accountInfo.taxPaymentPeriod == Number(value)) {
              this.accountInfo.taxPaymentPeriod = ""
            } else {
              this.accountInfo.taxPaymentPeriod = Number(value)
            }
            break;
          case 'declarationOfIncome': // 所得税申报
            if (this.accountInfo.declarationOfIncome == Number(value)) {
              this.accountInfo.declarationOfIncome = ""
            } else {
              this.accountInfo.declarationOfIncome = Number(value)
            }
            break;
          case 'incomeTaxType': // 所得税类型
            if (this.accountInfo.incomeTaxType == Number(value)) {
              this.accountInfo.incomeTaxType = ""
            } else {
              this.accountInfo.incomeTaxType = Number(value)
            }
            break;
        }
      },
      // 账套信息 保存修改
      save() {
        console.log("账套信息 保存修改")
        let params = this.accountInfo
        params.id = this.accountId
        params.token = this.token
        for (let i = params.accountSetBankList.length - 1; i >= 0; i--) {
          if (!(utils.isExist(params.accountSetBankList[i].depositBank) && utils.isExist(params.accountSetBankList[i].bankAccount))) {
            params.accountSetBankList.splice(i, 1)
          }
        }
        api.updateAccount(params).then(res => {
          console.log("账套信息保存》", res.body)
          if (res.body.result == 0) {
            this.$emit('success', res.body.msg)
            this.accountInfo = res.body.data
          } else {
            this.$emit('error', res.body.msg)
          }
        })
      },
      // 账套信息 取消修改
      cancelEdit() {
        this.queryAccountInfo()
      },
      addBank() {
        console.log("添加銀行信息", this.accountInfo.accountSetBankList)
        this.accountInfo.accountSetBankList.push({
          index: this.accountInfo.accountSetBankList.length,
          depositBank: '',
          bankAccount: '',
          accountType: 1
        })
      },
      removeBank(index) {
        this.accountInfo.accountSetBankList.splice(index, 1)
      },
      // 上传企业附件
      fileUpload() {
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.file = inputDOM.files[0];
        console.log("inputDOM.files[0]:" + inputDOM.files[0]);
        var formdata = new window.FormData();
        formdata.append('file', inputDOM.files[0]);
        formdata.append('accountSetId', this.accountId);
        api.upload(formdata).then(res => {
          console.log("上传结果：", res.body)
          if (res.body.result == 0) {
            this.accountInfo.enterpriseAnnexList.push(res.body.data)
          }
        })
      },
      deleteFile(opt) {
        if (utils.isExist(opt)) {
          api.delFile({id: opt.id, token: this.token, accountSetId: this.accountId}).then(res => {
            console.log("删除文件结果：", res.body)
            if (res.body.result == 0) {
              const that = this
              this.accountInfo.enterpriseAnnexList.forEach(function (el, idx) {
                if (res.body.data.id == el.id) {
                  that.accountInfo.enterpriseAnnexList.splice(idx, 1)
                }
              })
            }
          })
        }
      },
      addAss() {
        console.log("添加辅助核算", this.newAssist)
        let params = this.newAssist
        params.accountSetId = this.accountId
        params.token = this.token
        if (this.checkAssistIsNull(params)) {
          api.addAssist(params).then(res => {
            console.log("添加结果：", res.body)
            if (res.body.result == 0) {
              this.assistTableData.push(res.body.data)
              console.log("满足条件，实现添加辅助，失去焦点")
              document.getElementById("vxnkguao-0-0").blur()
              document.getElementById("vxnkguao-0-1").blur()
              if (this.newAssist.assistAccountingType == 5) {
                document.getElementById("vxnkguao-0-2").blur()
              }
              this.newAssist.assistAccountingName = ''
              this.newAssist.coding = ''
              this.newAssist.unitStr = ''
            }
          })
        }
      },
      updateAss(index, value) {
        console.log("更新辅助核算", this.cacheAssist)
        let params = this.cacheAssist
        params.accountSetId = this.accountId
        params.token = this.token

        if (this.checkAssistIsNull(params)) {
          api.updateAssists(params).then(res => {
            console.log("更新辅助结果：", res.body)
            if (res.body.result == 0) {
              this.assistTableData.forEach(function (el) {
                if (res.body.data.id == el.id) {
                  el.coding = res.body.data.coding
                  el.assistAccountingName = res.body.data.assistAccountingName
                }
              })
              document.getElementById("assist_" + index + "_" + value).blur()
            }
          })
        }
      },
      checkAssistIsNull(opt) {
        let flag = false
        if (utils.isExist(opt)) {
          if (utils.isExist(opt.coding)) {
            if (utils.checkNumOrStr(opt.coding)) {
              if (utils.isExist(opt.assistAccountingName)) {
                flag = true
              } else {
                this.$emit('error', "名称不能为空")
              }
            } else {
              this.$emit('error', "编号只能为字母或者数字")
            }
          } else {
            this.$emit('error', "编号不能为空")
          }
        }
        return flag
      },
      forId(index, value) {
        return "assist_" + index + "_" + value
      },
      forIdByCashFlow(index, value) {
        return "cash_" + index + "_" + value
      },
      oprClick(opt, index, value) {
        console.log("table td选中", opt, index, value)
        this.cacheAssist = opt
      },
      deleteAssist(opt) {
        console.log("删除该tab内的table一行记录", opt)
        let params = {}
        params.id = opt.id
        params.accountSetId = this.accountId
        params.token = this.token

        api.deleteAssists(params).then(res => {
          console.log("删除结果：", res.body, this.assistTableData)
          if (res.body.result == 0) {
            const that = this
            this.assistTableData.forEach(function (el, index) {
              if (res.body.data.id == el.id) {
                that.assistTableData.splice(index, 1)
              }
            })
          }
        })
      },
      switchAssist(opt) {
        console.log("复选框取非", opt)
        this.assistTableData.forEach(function (el) {
          console.log("assistTableData> ", el)
          if (opt.id == el.id) {
            console.log("value>", el.status)
            if (el.status == 1) {
              el.status = 0
            } else {
              el.status = 1
            }
            console.log("value<<<", el.status)
          }
        })
      },
      // 下载
      downloadFile(opt) {
        console.log("xiazai: ", opt.fileUrl)
        window.open(opt.fileUrl);
      },
      // 下载模板
      downTemp() {
        console.log("下载模板")
      },
      // 导入固定资产
      importFixedAssets() {
        console.log("导入固定资产")
      },
      // 添加固定资产
      addFixedAsset(title) {
        console.log("添加固定资产")
        this.isFixedAssets = true
        this.asset.dateRecorded = this.dateNow
        if (utils.isExist(title)) {
          this.assetsTitle = title
        } else {
          this.assetsTitle = '添加'
        }
      },
      // 对账
      checkEquilibrium() {
        console.log("对账")
      },
      // 下载固定资产清单
      dwldData() {
        console.log("下载固定资产清单")
      },
      // 隐藏固定资产弹层
      hide() {
        console.log("隐藏固定资产弹层 || 隐藏待摊费用弹层")
        this.isFixedAssets = false
        this.isAmortise = false
        this.isRealDelAmortiseMask = false
      },
      // 查询固定资产
      queryFixedAssets() {
        api.queryFixedAssets({accountSetId: this.accountId, token: this.token}).then(res => {
          console.log("查询固定资产:", res.body)
          if (res.body.result == 0) {
            let array = res.body.data
            array.forEach(function (el) {
              el.edit = true
              el.dispose = true
              el.cancel = true
            })
            this.assetTableList = array
          }
        })
      },
      // 确认添加固定资产
      ok() {
        console.log("确认添加固定资产>", this.asset)
        if (this.addBefore(this.asset)) {
          let params = this.asset
          params.thisMonthPlan ? params.thisMonthPlan = 1 : params.thisMonthPlan = 0
          params.accountSetId = this.accountId
          params.token = this.token
          if (utils.isExist(params.id)) {
            api.updateFiexdAsset(params).then(res => {
              console.log("更新固定资产结果：", res.body)
              if (res.body.result == 0) {
                this.isFixedAssets = false
                this.queryFixedAssets()
                this.configAsset()
              }
            })
          } else {
            api.addFixedAsset(params).then(res => {
              console.log("添加固定资产结果：", res.body)
              if (res.body.result == 0) {
                this.isFixedAssets = false
                this.queryFixedAssets()
                this.configAsset()
              }
            })
          }
        }
      },
      // 校验
      addBefore(opt) {
        let flag = false
        if (utils.isExist(opt)) {
          if (utils.isExist(opt.assetName)) {
            if (!isNaN(opt.originalValue) && Number(opt.originalValue) > 0) {
              flag = true
            } else {
              this.asset.error = '请填写固定资产原值'
            }
          } else {
            this.asset.error = '请填写固定资产名称'
          }
        }
        return flag
      },
      // 初始化
      configAsset() {
        this.asset = {
          // 资产名字
          assetName: '',
          // 入账日期
          dateRecorded: '',
          // 原值
          originalValue: 0,
          // 预计残值率
          expectedSalvageRate: 0.05,
          // 折旧周期
          depreciationPeriod: 60,
          // 累计折旧周期
          accumulatedDepreciationPeriod: 0,
          // 累计折旧
          accumulatedDepreciation: 0,
          // 入账科目
          courseId: '',
          // 折旧方法
          depreciationMethod: 1,
          // 本月计提
          thisMonthPlan: false,
          // 入账科目列表
          accountedSubject: [],
          // 错误信息
          error: ''
        }
        const that = this
        this.accountingCourselist.forEach(function (el) {
          if (el.coding == "5602") {
            that.asset.courseId = el.id
          }
        })
      },
      // 固定资产处理弹层
      disposeSelectPop(value) {
        if (value == "false") {
          this.showDisposeAssets = false
        } else {
          this.showDisposeAssets = true
        }
      },
      // 处理 出售 盘亏 报废
      disposeSelect(value) {
        if (Number(value)) {
          api.changeAssetStatus({id: this.asset.id, status: value, token: this.token}).then(res => {
            console.log("出售盘亏变卖结果：", res.body)
            if (res.body.result == 0) {
              this.showDisposeAssets = false
              this.queryFixedAssets()
              this.configAsset()
            }
          })
        }
      },
      // 获取当前日期
      getDate() {
        api.getDate({token: this.token}).then(res => {
          console.log("获取当前日期", res.body)
          if (res.body.result == 0) {
            this.dateNow = res.body.data
          }
        })
      },
      // 获取入账科目
      getAccountingCourse() {
        api.queryAccountingCourse({accountSetId: this.accountId, token: this.token}).then(res => {
          console.log("获取入账科目:", res.body)
          if (res.body.result == 0) {
            this.accountingCourselist = res.body.data
            const that = this
            this.accountingCourselist.forEach(function (el) {
              if (el.coding == "5602") {
                that.asset.courseId = el.id
              }
            })
          }
        })
      },
      // focus时展示固定资产每条数据的状态
      showAssetStatus(index, item) {
        if (item.status == 2 || item.status == 3 || item.status == 4) {
          this.assetTableList[index].cancel = false
        }
        if (item.status == 5) {
          this.assetTableList[index].dispose = false
        }
        this.assetTableList[index].edit = false
      },
      // focus时隐藏固定资产每条数据的状态
      hideAssetStatus(index) {
        this.assetTableList[index].cancel = true
        this.assetTableList[index].dispose = true
        this.assetTableList[index].edit = true
      },
      // 更新当前选中的固定资产数据
      editFixedAsset(opt) {
        console.log("更新当前选中的固定资产数据", opt)
        this.asset = opt
        this.addFixedAsset('编辑')
      },
      // 处理当前选中的固定资产数据
      disposeIng(opt) {
        console.log("处理当前选中的固定资产数据", opt)
        if (utils.isExist(opt)) {
          this.asset = opt
          this.showDisposeAssets = true
        }
      },
      // 取消当前选中的固定资产数据
      cancel(opt) {
        console.log("取消当前选中的固定资产数据")
        if (utils.isExist(opt)) {
          this.asset = opt
          this.disposeSelect(1)
        }
      },
      // 删除当前选中的固定资产数据
      deleteFixedAsset(opt) {
        console.log("删除当前选中的固定资产数据", opt)
        if (utils.isExist(opt)) {
          this.isRealDelAssetMask = true
          this.asset = opt
        }
      },
      // 取消删除固定资产
      cancelAsset() {
        console.log("取消删除固定资产")
        this.isRealDelAssetMask = false
        this.configAsset()
      },
      // 确认删除固定资产
      realDelAsset() {
        console.log("确认删除固定资产")
        this.isRealDelAssetMask = false
        api.delAsset({id: this.asset.id, token: this.token}).then(res => {
          console.log("删除固定资产结果：", res.body)
          if (res.body.result == 0) {
            this.cancelAsset()
            this.queryFixedAssets()
          } else {
            this.$emit('error', res.body.msg)
          }
        })
      },
      // 查询待摊费用
      queryAmortiseData() {
        console.log("查询待摊费用")
        api.queryUnamortizedexpense({accountSetId: this.accountId, token: this.token}).then(res => {
          console.log("查询结果：", res.body)
          if (res.body.result == 0) {
            this.amortiseTableList = res.body.data
          }
        })
      },
      // 查询待摊科目
      queryAmortiseProject() {
        console.log("查询待摊科目")
        api.queryAmortizedExpenseCourse({accountSetId: this.accountId, token: this.token}).then(res => {
          console.log("查询结果：", res.body)
          if (res.body.result == 0) {
            this.accountingAmortiseCourselist = res.body.data
            const that = this
            this.accountingAmortiseCourselist.forEach(function (el) {
              if (el.coding == "5602") {
                that.amortise.courseId = el.id
              }
            })
          }
        })
      },
      // 初始化添加待摊费用对象
      configAmortise() {
        this.amortise = {
          // 费用名称
          costName: '',
          // 摊销起始期
          amortizationPeriod: '',
          // 摊销金额
          amortizationAmount: 0,
          // 摊销期限（单位：月）
          amortizationSchedule: 12,
          // 已摊销期数（单位：月）
          amortizedPeriod: 0,
          // 已摊销金额
          amortizedAmount: 0,
          // 入账科目主键
          courseId: '',
          // 错误信息
          error: ''
        }
        const that = this
        this.accountingAmortiseCourselist.forEach(function (el) {
          if (el.coding == "5602") {
            that.amortise.courseId = el.id
          }
        })
      },
      // 添加待摊费用
      addAmortise(title) {
        this.amortise.amortizationPeriod = this.dateNow
        this.isAmortise = true
        if (utils.isExist(title)) {
          this.amortiseTitle = title
        } else {
          this.amortiseTitle = '添加'
        }
      },
      // 待摊费用-导入模板
      downloadTemplate() {
        console.log("待摊费用-导入模板")
      },
      queryAmortise() {
        console.log("查询待摊费用")
      },
      // 添加待摊费用数据
      okAmortise() {
        console.log("添加或更新待摊费用数据", this.amortise)
        if (this.addBeforeAmortise(this.amortise)) {
          let params = this.amortise
          params.token = this.token
          params.accountSetId = this.accountId
          if (utils.isExist(params.id)) {
            api.updateAmortized(params).then(res => {
              console.log("更新结果：", res.body)
              if (res.body.result == 0) {
                this.isAmortise = false
                this.queryAmortiseData()
                this.configAmortise()
              } else {
                this.amortise.error = res.body.msg
              }
            })
          } else {
            api.addAmortized(params).then(res => {
              console.log("添加结果：", res.body)
              if (res.body.result == 0) {
                this.isAmortise = false
                this.queryAmortiseData()
                this.configAmortise()
              } else {
                this.amortise.error = res.body.msg
              }
            })
          }
        }
      },
      // 添加前置校验
      addBeforeAmortise(opt) {
        let flag = false
        if (utils.isExist(opt)) {
          if (utils.isExist(opt.costName)) {
            if (!isNaN(opt.amortizationAmount) && Number(opt.amortizationAmount) > 0) {
              if (!isNaN(opt.amortizationSchedule) && Number(opt.amortizationSchedule) > 0) {
                if (!isNaN(opt.amortizedPeriod) && Number(opt.amortizedPeriod) >= 0) {
                  if (!isNaN(opt.amortizedAmount) && Number(opt.amortizedAmount) >= 0) {
                    if (Number(opt.amortizedPeriod) > 0 && Number(opt.amortizedAmount) == 0) {
                      this.amortise.error = '已摊销金额不能为0'
                    } else {
                      if (Number(opt.amortizedPeriod) == 0 && Number(opt.amortizedAmount) > 0) {
                        this.amortise.error = '已摊销期数不能为0'
                      } else {
                        if (Number(opt.amortizedAmount) <= Number(opt.amortizationAmount)) {
                          flag = true
                        } else {
                          this.amortise.error = '已摊销金额不能大于摊销总额'
                        }
                      }
                    }
                  } else {
                    this.amortise.error = '请填写正确的已摊销金额'
                  }
                } else {
                  this.amortise.error = '请填写正确的已摊销期数'
                }
              } else {
                this.amortise.error = '请填写正确的摊销期限'
              }
            } else {
              this.amortise.error = '请填写正确的摊销金额'
            }
          } else {
            this.amortise.error = '请填写待摊费用名称'
          }
        }
        return flag
      },
      // 展示新增待摊费用蒙层
      editAmortise(opt) {
        console.log("展示新增待摊费用蒙层", opt)
        if (utils.isExist(opt)) {
          this.amortise = opt
          this.addAmortise('编辑')
        }
      },
      // 显示删除待摊费用蒙层
      deleteAmortise(opt) {
        console.log("显示删除待摊费用蒙层", opt)
        if (utils.isExist(opt)) {
          this.amortise = opt
          this.isRealDelAmortiseMask = true
        }
      },
      // 取消删除待摊费用
      cancelDelAmortise() {
        this.isRealDelAmortiseMask = false
        this.configAmortise()
      },
      // 确认删除待摊费用
      realDelAmortise() {
        this.isRealDelAmortiseMask = false
        console.log("确认删除待摊费用")
        api.delAmortized({id: this.amortise.id, token: this.token}).then(res => {
          console.log("删除待摊费用结果：", res.body)
          if (res.body.result == 0) {
            this.configAmortise()
            this.queryAmortiseData()
          } else {
            this.$emit('error', res.body.msg)
          }
        })
      },
      // 查看待摊费用
      showAmortise(opt) {
        console.log("查看待摊费用", opt)
        if (utils.isExist(opt)) {
          this.amortise = opt
          this.amortise.show = true
          this.addAmortise('查看')
        }
      },
      // 切换报表
      switchReport(menu) {
        console.log("初始报表切换报表", menu)
        this.loading("show")
        const that = this
        this.reportMenu.list.forEach(function (el) {
          if (menu.type == el.type) {
            el.isSelected = true
            that.reportMenu.type = menu.type
          } else {
            el.isSelected = false
          }
        })

        switch (menu.type) {
          // 科目余额表
          case 'subjectBalance':
            console.log("查询科目余额表数据")
            let params = {
              accountSetId: this.accountId,
              token: this.token
            }
            this.navMenuSubject.forEach(function (el) {
              if (el.isSelected) {
                params.courseType = el.index
              }
            })
            api.querySubjectBalances(params).then(res => {
              console.log("查询科目余额表数据结果：", res.body)
              if (res.body.result == 0) {
                this.subjectBalanceList = res.body.data
              } else {
                this.$emit('error', res.body.msg)
              }
              this.loading("hide")
            })
            break;
          // 现金流量表
          case 'cashFlow':
            console.log("查询现金流量表数据")
            api.queryReoprtByCashFlow({accountSetId: this.accountId, token: this.token}).then(res => {
              console.log("查询现金流量表结果：", res.body)
              if (res.body.result == 0) {
                this.cashList = res.body.data
              } else {
                this.$emit('error', res.body.msg)
              }
              this.loading("hide")
            })
            break;
          // 利润表
          case 'profit':
            console.log("查询利润表数据")
            api.queryReoprtByProfit({accountSetId: this.accountId, token: this.token}).then(res => {
              console.log("查询利润表结果：", res.body)
              if (res.body.result == 0) {
                this.profitList = res.body.data
              } else {
                this.$emit('error', res.body.msg)
              }
              this.loading("hide")
            })
            break;
          // 资产负债表
          case 'liabilities':
            console.log("查询资产负债表数据")
            api.queryReoprtByLiabilities({accountSetId: this.accountId, token: this.token}).then(res => {
              console.log("查询资产负债表结果：", res.body)
              if (res.body.result == 0) {
                this.balanceSheet = res.body.data
              } else {
                this.$emit('error', res.body.msg)
              }
              this.loading("hide")
            })
            break;
          // 辅助核算余额表
          case 'auxiliaryBalance':
            console.log("查询辅助核算余额表数据")
            this.loading("hide")
            break;
          default:
            console.log("默认查询科目余额表数据")
            this.loading("hide")
        }
      },
      // 计算现金流量数据
      /**
       * 行次  1+2-3-4-5-6=7
       *      8+9+10-11-12=13
       *      14+15-16-17-18=19
       *      7+13+19=20
       *      20+21=22
       * */
      calc(colum) {
        console.log("计算列：", colum, this.cashList[1].cumulativeAmountThisYear)
        if (colum == '2') {
          this.cashList[7].cumulativeAmountThisYear = Number(this.cashList[1].cumulativeAmountThisYear) + Number(this.cashList[2].cumulativeAmountThisYear) - Number(this.cashList[3].cumulativeAmountThisYear) - Number(this.cashList[4].cumulativeAmountThisYear) - Number(this.cashList[5].cumulativeAmountThisYear) - Number(this.cashList[6].cumulativeAmountThisYear)
          this.cashList[14].cumulativeAmountThisYear = Number(this.cashList[9].cumulativeAmountThisYear) + Number(this.cashList[10].cumulativeAmountThisYear) + Number(this.cashList[11].cumulativeAmountThisYear) - Number(this.cashList[12].cumulativeAmountThisYear) - Number(this.cashList[13].cumulativeAmountThisYear)
          this.cashList[21].cumulativeAmountThisYear = Number(this.cashList[16].cumulativeAmountThisYear) + Number(this.cashList[17].cumulativeAmountThisYear) - Number(this.cashList[18].cumulativeAmountThisYear) - Number(this.cashList[19].cumulativeAmountThisYear) - Number(this.cashList[20].cumulativeAmountThisYear)
          this.cashList[22].cumulativeAmountThisYear = Number(this.cashList[7].cumulativeAmountThisYear) + Number(this.cashList[14].cumulativeAmountThisYear) + Number(this.cashList[21].cumulativeAmountThisYear)
          this.cashList[24].cumulativeAmountThisYear = Number(this.cashList[22].cumulativeAmountThisYear) + Number(this.cashList[23].cumulativeAmountThisYear)
        } else {
          this.cashList[7].amountOfThisMonth = Number(this.cashList[1].amountOfThisMonth) + Number(this.cashList[2].amountOfThisMonth) - Number(this.cashList[3].amountOfThisMonth) - Number(this.cashList[4].amountOfThisMonth) - Number(this.cashList[5].amountOfThisMonth) - Number(this.cashList[6].amountOfThisMonth)
          this.cashList[14].amountOfThisMonth = Number(this.cashList[9].amountOfThisMonth) + Number(this.cashList[10].amountOfThisMonth) + Number(this.cashList[11].amountOfThisMonth) - Number(this.cashList[12].amountOfThisMonth) - Number(this.cashList[13].amountOfThisMonth)
          this.cashList[21].amountOfThisMonth = Number(this.cashList[16].amountOfThisMonth) + Number(this.cashList[17].amountOfThisMonth) - Number(this.cashList[18].amountOfThisMonth) - Number(this.cashList[19].amountOfThisMonth) - Number(this.cashList[20].amountOfThisMonth)
          this.cashList[22].amountOfThisMonth = Number(this.cashList[7].amountOfThisMonth) + Number(this.cashList[14].amountOfThisMonth) + Number(this.cashList[21].amountOfThisMonth)
          this.cashList[24].amountOfThisMonth = Number(this.cashList[22].amountOfThisMonth) + Number(this.cashList[23].amountOfThisMonth)
        }
      },
      // 取消保存当前变更的数据
      cancelEditCashFlow() {
        console.log("取消保存当前变更的数据")
        this.switchReport({type: 'cashFlow'})
      },
      // 保存现金流量表数据
      saveCashFlow() {
        console.log("保存现金流量表数据")
        api.updateCashFlow({token: this.token, cashflowstatementList: this.cashList}).then(res => {
          console.log("保存现金流量表数据结果：", res.body)
        })
      },
      // 取消保存科目余额表数据
      cancelEditSubjectBalance() {
        console.log("取消保存科目余额表数据")
        this.switchReport({type: 'subjectBalance'})
      },
      // 保存科目余额表数据
      saveSubjectBalance() {
        console.log("保存科目余额表数据")
        api.updateSubjectBalances({token: this.token, accountBalanceList: this.subjectBalanceList}).then(res => {
          console.log("保存科目余额表数据结果：", res.body)
          if (res.body.result == 0) {
            this.cancelEditSubjectBalance()
          } else {
            this.$emit('error', res.body.msg)
          }
        })
      },
      // 计算科目余额表数据
      onChangeBalanceData(opt) {
        console.log("计算科目余额表数据")
        // 贷方累计
        opt.theLenderHas = Number(opt.theLenderHas)
        // 期末余额
        opt.theEndingBalance = Number(opt.theEndingBalance)
        // 借方累计
        opt.debitTheCumulative = Number(opt.debitTheCumulative)
        if (opt.course.debitOrCredit == 0) { // 借
          opt.atTheBeginningOfTheBalance = opt.theLenderHas + opt.theEndingBalance - opt.debitTheCumulative
          if (opt.course.coding.length > 4) {
            let defaultCoding = opt.course.coding.substring(0, 4)
            let parentTheLenderHas = 0, parentTheEndingBalance = 0, parentDebitTheCumulative = 0,
              parentAtTheBeginningOfTheBalance = 0
            this.subjectBalanceList.forEach(el => {
              if (el && el.course.coding.indexOf(defaultCoding) > -1 && el.course.coding.length == 7) {
                parentTheLenderHas += el.theLenderHas
                parentTheEndingBalance += el.theEndingBalance
                parentDebitTheCumulative += el.debitTheCumulative
              }else if (el && el.course.coding.indexOf(defaultCoding) > -1 && el.course.coding.length == 9) {
                let preDefaultCoding = opt.course.coding.substring(0, 7)
                let preParentTheLenderHas = 0, preParentTheEndingBalance = 0, preParentDebitTheCumulative = 0,
                  preParentAtTheBeginningOfTheBalance = 0
                this.subjectBalanceList.forEach(el => {
                  if (el && el.course.coding.indexOf(preDefaultCoding) > -1 && el.course.coding.length == 9) {
                    preParentTheLenderHas += el.theLenderHas
                    preParentTheEndingBalance += el.theEndingBalance
                    preParentDebitTheCumulative += el.debitTheCumulative
                  }
                })
                preParentAtTheBeginningOfTheBalance = preParentTheLenderHas + preParentTheEndingBalance - preParentDebitTheCumulative
                this.subjectBalanceList.forEach(el => {
                  if (el && el.course.coding == preDefaultCoding) {
                    el.theLenderHas = preParentTheLenderHas
                    el.theEndingBalance = preParentTheEndingBalance
                    el.debitTheCumulative = preParentDebitTheCumulative
                    el.atTheBeginningOfTheBalance = preParentAtTheBeginningOfTheBalance
                  }
                })
              }
            })
            parentAtTheBeginningOfTheBalance = parentTheLenderHas + parentTheEndingBalance - parentDebitTheCumulative
            this.subjectBalanceList.forEach(el => {
              if (el && el.course.coding == defaultCoding) {
                el.theLenderHas = parentTheLenderHas
                el.theEndingBalance = parentTheEndingBalance
                el.debitTheCumulative = parentDebitTheCumulative
                el.atTheBeginningOfTheBalance = parentAtTheBeginningOfTheBalance
              }
            })
          }
        } else if (opt.course.debitOrCredit == 1) { // 贷
          opt.atTheBeginningOfTheBalance = opt.debitTheCumulative + opt.theEndingBalance - opt.theLenderHas
          if (opt.course.coding.length > 4) {
            console.log(">>>>>>>>>")
            let defaultCoding = opt.course.coding.slice(0, 4)
            console.log(">>>>1>>>>>", defaultCoding)
            defaultCoding = opt.course.coding.substring(0, 4)
            console.log(">>>>2>>>>>", defaultCoding)
            defaultCoding = opt.course.coding.substr(0, 4)
            console.log(">>>>3>>>>>", defaultCoding)
            let parentTheLenderHas = 0, parentTheEndingBalance = 0, parentDebitTheCumulative = 0,
              parentAtTheBeginningOfTheBalance = 0
            console.log(">>>>>4>>>>>", parentTheLenderHas, parentTheEndingBalance, parentDebitTheCumulative, parentAtTheBeginningOfTheBalance)
            this.subjectBalanceList.forEach(el => {
              if (el && el.course.coding.indexOf(defaultCoding) > -1 && el.course.coding.length == 7) {
                debugger
                parentTheLenderHas += el.theLenderHas
                parentTheEndingBalance += el.theEndingBalance
                parentDebitTheCumulative += el.debitTheCumulative
              }
              if (el && el.course.coding.indexOf(defaultCoding) > -1 && el.course.coding.length == 9) {
                let preDefaultCoding = opt.course.coding.substring(0, 7)
                let preParentTheLenderHas = 0, preParentTheEndingBalance = 0, preParentDebitTheCumulative = 0,
                  preParentAtTheBeginningOfTheBalance = 0
                this.subjectBalanceList.forEach(e => {
                  if (e && e.course.coding.indexOf(preDefaultCoding) > -1 && e.course.coding.length == 9) {
                    preParentTheLenderHas += e.theLenderHas
                    preParentTheEndingBalance += e.theEndingBalance
                    preParentDebitTheCumulative += e.debitTheCumulative
                  }
                })
                preParentAtTheBeginningOfTheBalance = preParentDebitTheCumulative + preParentTheEndingBalance - preParentTheLenderHas
                this.subjectBalanceList.forEach(e => {
                  if (e && e.course.coding == preDefaultCoding) {
                    e.theLenderHas = preParentTheLenderHas
                    e.theEndingBalance = preParentTheEndingBalance
                    e.debitTheCumulative = preParentDebitTheCumulative
                    e.atTheBeginningOfTheBalance = preParentAtTheBeginningOfTheBalance
                  }
                })
              }
            })
            console.log(">>>>>5>>>>>", parentTheLenderHas, parentTheEndingBalance, parentDebitTheCumulative, parentAtTheBeginningOfTheBalance)
            parentAtTheBeginningOfTheBalance = parentDebitTheCumulative + parentTheEndingBalance - parentTheLenderHas
            console.log(">>>>>6>>>>>", parentTheLenderHas, parentTheEndingBalance, parentDebitTheCumulative, parentAtTheBeginningOfTheBalance)
            this.subjectBalanceList.forEach(el => {
              if (el && el.course.coding == defaultCoding) {
                el.theLenderHas = parentTheLenderHas
                el.theEndingBalance = parentTheEndingBalance
                el.debitTheCumulative = parentDebitTheCumulative
                el.atTheBeginningOfTheBalance = parentAtTheBeginningOfTheBalance
              }
            })
          }
        }
      },
      loading(type) {
        if (type) {
          this.$emit("loading", type)
        } else {
          this.$emit("loading", "hide")
        }
      },
    },
    created() {
      this.subjectClassify({index: 1}, 'subject')
    },
    mounted() {
      this.getDate()
    },
    filters: {
      moneyFilter(value) {
        if (utils.isExist(value)) {
          let val = Number(value)
          let hasPoint = val.toString().split(".")
          if (hasPoint.length == 1) {
            val = val + ".00";
          } else if (hasPoint.length > 1) {
            if (hasPoint[1].length < 2) {
              val = val + "0";
            }
          }
          return val;
        }
      }
    }
  }
</script>

<style scoped src="./css/index.css"></style>
<style scoped>

</style>
