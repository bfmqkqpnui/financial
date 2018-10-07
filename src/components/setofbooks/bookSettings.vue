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
              <div class="btn-template" ng-click="dwldFaTpl()">下载模板</div>
              <div class="btn-fileAssets" ng-show="isMyAccount"> 导入固定资产
                <input type="file" id="fileSingle" name="file[]"
                       accept=".xlsx"
                       onchange="angular.element(this).scope().onSelectFile()">
              </div>
              <div class="btn-addAssets" ng-click="addFixedAsset()" ng-show="isMyAccount">添加固定资产</div>
              <div class="btn-reconciliationAssets" ng-click="checkEquilibrium(true)">对账</div>
              <div class="icon-download" ng-click="dwldData()" title="下载固定资产清单"></div>
            </div>
            <div class="setBtnMenu btnReportBox" v-if="setMenu.type == 'report'">
              <div class="btn-switchCurrency-off ng-binding" ng-click="amountPop(true)"></div>
              <div class="btn-switchCurrency-off ng-binding" ng-click="assistCurrencyAmountPop(true)"></div>
              <div class="btn-check" ng-click="switchNullData()">
                <div class="icon-isShowNullNum-off"></div>
                隐藏空值
              </div>
              <div class="btn-fileReport" ng-click="fileReportPop(true)">
                导入报表
              </div>
              <div class="btn-cancelReport" ng-show="checkChange()" ng-click="cancelEdit()">取消</div>
              <div class="btn-saveReport" ng-show="checkChange()" ng-click="save()">保存修改</div>
            </div>
            <div class="setBtnMenu btnReportBox selectModuleBtn" v-if="setMenu.type == 'report'">
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
                  <div class="content-rel setSubjectListBox" style="overflow-y: auto">
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
                      <div class="content-rel ps-theme-default ps-active-y" v-if="subjects.length > 0">
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
                                  <span v-if="item.children && item.children.length > 0" data-toggle="tooltip" title="折叠/展开"
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
                                      <span v-if="item.children && item.children.length > 0" data-toggle="tooltip" title="折叠/展开"
                                            :class="item.active ? 'icon-arrows-0-hover' : 'icon-arrows-90-hover'"
                                            @click="flexChildrenSubject(item)"
                                            class="ng-hide icon-arrows-90-hover"></span>
                                      <div class="btn-operateBox" v-if="operationFlag">
                                        <div class="btn-operate" ng-mouseenter="operateOnEnter($event)">
                                          <div class="operateBox bottom" >
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
                  <!-- ngRepeat: menu in assistMenu.list -->
                  <div ng-repeat="menu in assistMenu.list" ng-class="menu.type == assistMenu.cur.type ? 'menuOn' : ''"
                       ng-click="selectAssistType(menu)" class="ng-binding ng-scope menuOn"> 客户
                  </div><!-- end ngRepeat: menu in assistMenu.list -->
                  <div ng-repeat="menu in assistMenu.list" ng-class="menu.type == assistMenu.cur.type ? 'menuOn' : ''"
                       ng-click="selectAssistType(menu)" class="ng-binding ng-scope"> 供应商
                  </div><!-- end ngRepeat: menu in assistMenu.list -->
                  <div ng-repeat="menu in assistMenu.list" ng-class="menu.type == assistMenu.cur.type ? 'menuOn' : ''"
                       ng-click="selectAssistType(menu)" class="ng-binding ng-scope"> 部门
                  </div><!-- end ngRepeat: menu in assistMenu.list -->
                  <div ng-repeat="menu in assistMenu.list" ng-class="menu.type == assistMenu.cur.type ? 'menuOn' : ''"
                       ng-click="selectAssistType(menu)" class="ng-binding ng-scope"> 员工
                  </div><!-- end ngRepeat: menu in assistMenu.list -->
                  <div ng-repeat="menu in assistMenu.list" ng-class="menu.type == assistMenu.cur.type ? 'menuOn' : ''"
                       ng-click="selectAssistType(menu)" class="ng-binding ng-scope"> 存货
                  </div><!-- end ngRepeat: menu in assistMenu.list -->
                  <div ng-repeat="menu in assistMenu.list" ng-class="menu.type == assistMenu.cur.type ? 'menuOn' : ''"
                       ng-click="selectAssistType(menu)" class="ng-binding ng-scope"> 项目
                  </div><!-- end ngRepeat: menu in assistMenu.list --> </div>
                <!-- 辅助核算 -->
                <div class="content-rel assistBox">
                  <div class="content-rel">
                    <div class="tableBox tableFixed">
                      <table>
                        <thead>
                        <tr>
                          <th class="span-10">开启</th>
                          <th class="span-20 ng-binding">客户编码</th>
                          <th class="span-50 ng-binding span-70"
                              ng-class="{'span-70':assistMenu.cur.type !== 'inventory'}">客户名称
                          </th> <!-- ngIf: assistMenu.cur.type === 'inventory' --> </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="content-rel" id="assistTableBox">
                      <table class="createAssist">
                        <tbody> <!-- ngIf: setMenu.type.type == 'assist' -->
                        <tr ng-if="setMenu.type.type == 'assist'" class="ng-scope">
                          <td class="span-10 createBox" style="padding:0">
                            <div class="icon-create"></div>
                          </td>
                          <td class="span-20" style="padding:0">
                            <label for="vxnkguao-0-0">
                              <span class="ng-binding"></span>
                              <div ng-click="oprClick($index, data, 'create-code', $event)">
                                <input type="text"
                                       ng-keydown="oprKeyDown($event, 'create')"
                                       id="vxnkguao-0-0"
                                       ng-focus="oprOnFocus(newAssist, tableData.assist[assistMenu.cur.type].length - 1, 0, 'create', $event)"
                                       maxlength="12"
                                       ng-model="newAssist.code"
                                       placeholder="请输入编码"
                                       style="z-index:1"
                                       ng-disabled="!isMyAccount"
                                       select-default=""
                                       class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
                              </div>
                            </label></td>
                          <td class="span-50 span-70" ng-class="{'span-70':assistMenu.cur.type !== 'inventory'}">
                            <label for="vxnkguao-0-1">
                              <span class="ng-binding"></span>
                              <div ng-click="oprClick($index, data, 'create-name', $event)">
                                <input type="text"
                                       id="vxnkguao-0-1"
                                       ng-model="newAssist.name"
                                       placeholder="请输入名称"
                                       style="z-index:1"
                                       maxlength="60"
                                       class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
                              </div>
                            </label>
                          </td>
                          <td class="span-20 ng-hide" ng-show="assistMenu.cur.type === 'inventory'">
                            <label for="vxnkguao-0-2">
                              <span class="ng-binding"></span>
                              <div ng-click="oprClick($index, data, 'create-unit', $event)">
                                <input type="text"
                                       id="vxnkguao-0-2"
                                       ng-model="newAssist.unit"
                                       placeholder="请输入单位"
                                       style="z-index:1"
                                       maxlength="10"
                                       class="ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength">
                              </div>
                            </label></td>
                        </tr><!-- end ngIf: setMenu.type.type == 'assist' --> </tbody>
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
                  <div class="navSubjectMenuBox" ng-hide="reportMenu.type.type != 'report'">
                    <div class="navSubjectMenuMask ng-hide" ng-show="reportMenu.type.type != 'report'"></div>
                    <!-- ngRepeat: menu in navMenu.list -->
                    <div ng-repeat="menu in navMenu.list"
                         ng-class="menu.type == navMenu.reportType.type ? 'menuOn' : ''"
                         ng-click="subjectClassify(menu, 'reportType')" class="ng-binding ng-scope menuOn"> 资产
                    </div><!-- end ngRepeat: menu in navMenu.list -->
                    <div ng-repeat="menu in navMenu.list"
                         ng-class="menu.type == navMenu.reportType.type ? 'menuOn' : ''"
                         ng-click="subjectClassify(menu, 'reportType')" class="ng-binding ng-scope"> 负债
                    </div><!-- end ngRepeat: menu in navMenu.list -->
                    <div ng-repeat="menu in navMenu.list"
                         ng-class="menu.type == navMenu.reportType.type ? 'menuOn' : ''"
                         ng-click="subjectClassify(menu, 'reportType')" class="ng-binding ng-scope"> 权益
                    </div><!-- end ngRepeat: menu in navMenu.list -->
                    <div ng-repeat="menu in navMenu.list"
                         ng-class="menu.type == navMenu.reportType.type ? 'menuOn' : ''"
                         ng-click="subjectClassify(menu, 'reportType')" class="ng-binding ng-scope"> 成本
                    </div><!-- end ngRepeat: menu in navMenu.list -->
                    <div ng-repeat="menu in navMenu.list"
                         ng-class="menu.type == navMenu.reportType.type ? 'menuOn' : ''"
                         ng-click="subjectClassify(menu, 'reportType')" class="ng-binding ng-scope"> 损益
                    </div><!-- end ngRepeat: menu in navMenu.list --> </div>
                  <div class="content-rel setSubjectListBox">
                    <div class="content-rel">
                      <div class="reportTableFixed">
                        <div class="content-rel">
                          <div class="reportTable-left">
                            <div class="viewInfoSize ng-binding">数据</div>
                          </div>
                          <div class="reportTable-right"> <!-- ngRepeat: menu in reportMenu.list -->
                            <div ng-repeat="menu in reportMenu.list"
                                 ng-class="menu.type == reportMenu.type.type ? 'menuOn' : ''"
                                 ng-hide="(checkChange() &amp;&amp; menu.type == 'asset') || (checkChange() &amp;&amp; menu.type == 'income')"
                                 ng-click="switchReport(menu, 'reportType')"
                                 ng-show="menu.type === 'assistInitBalance' &amp;&amp; tableData.assistInitBalance.balancesSubjectsShow.length"
                                 class="ng-binding ng-scope"> 辅助核算余额表
                            </div><!-- end ngRepeat: menu in reportMenu.list -->
                            <div ng-repeat="menu in reportMenu.list"
                                 ng-class="menu.type == reportMenu.type.type ? 'menuOn' : ''"
                                 ng-hide="(checkChange() &amp;&amp; menu.type == 'asset') || (checkChange() &amp;&amp; menu.type == 'income')"
                                 ng-click="switchReport(menu, 'reportType')"
                                 ng-show="menu.type === 'assistInitBalance' &amp;&amp; tableData.assistInitBalance.balancesSubjectsShow.length"
                                 class="ng-binding ng-scope"> 资产负债表
                            </div><!-- end ngRepeat: menu in reportMenu.list -->
                            <div ng-repeat="menu in reportMenu.list"
                                 ng-class="menu.type == reportMenu.type.type ? 'menuOn' : ''"
                                 ng-hide="(checkChange() &amp;&amp; menu.type == 'asset') || (checkChange() &amp;&amp; menu.type == 'income')"
                                 ng-click="switchReport(menu, 'reportType')"
                                 ng-show="menu.type === 'assistInitBalance' &amp;&amp; tableData.assistInitBalance.balancesSubjectsShow.length"
                                 class="ng-binding ng-scope"> 利润表
                            </div><!-- end ngRepeat: menu in reportMenu.list -->
                            <div ng-repeat="menu in reportMenu.list"
                                 ng-class="menu.type == reportMenu.type.type ? 'menuOn' : ''"
                                 ng-hide="(checkChange() &amp;&amp; menu.type == 'asset') || (checkChange() &amp;&amp; menu.type == 'income')"
                                 ng-click="switchReport(menu, 'reportType')"
                                 ng-show="menu.type === 'assistInitBalance' &amp;&amp; tableData.assistInitBalance.balancesSubjectsShow.length"
                                 class="ng-binding ng-scope"> 现金流量表
                            </div><!-- end ngRepeat: menu in reportMenu.list -->
                            <div ng-repeat="menu in reportMenu.list"
                                 ng-class="menu.type == reportMenu.type.type ? 'menuOn' : ''"
                                 ng-hide="(checkChange() &amp;&amp; menu.type == 'asset') || (checkChange() &amp;&amp; menu.type == 'income')"
                                 ng-click="switchReport(menu, 'reportType')"
                                 ng-show="menu.type === 'assistInitBalance' &amp;&amp; tableData.assistInitBalance.balancesSubjectsShow.length"
                                 class="ng-binding ng-scope menuOn"> 科目余额表
                            </div><!-- end ngRepeat: menu in reportMenu.list --> </div>
                        </div>
                      </div>
                      <div class="tableBox tableFixed" style="top:0">
                        <table>
                          <thead>
                          <tr>
                            <!-- ngRepeat: title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type]) -->
                            <th ng-repeat="title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type])"
                                ng-class="title.class" class="ng-binding ng-scope span-16">科目编码
                            </th>
                            <!-- end ngRepeat: title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type]) -->
                            <th ng-repeat="title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type])"
                                ng-class="title.class" class="ng-binding ng-scope span-35">科目名称
                            </th>
                            <!-- end ngRepeat: title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type]) -->
                            <th ng-repeat="title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type])"
                                ng-class="title.class" class="ng-binding ng-scope span-5">借贷
                            </th>
                            <!-- end ngRepeat: title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type]) -->
                            <th ng-repeat="title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type])"
                                ng-class="title.class" class="ng-binding ng-scope span-11">借方累计
                            </th>
                            <!-- end ngRepeat: title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type]) -->
                            <th ng-repeat="title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type])"
                                ng-class="title.class" class="ng-binding ng-scope span-11">贷方累计
                            </th>
                            <!-- end ngRepeat: title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type]) -->
                            <th ng-repeat="title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type])"
                                ng-class="title.class" class="ng-binding ng-scope span-11">期末余额
                            </th>
                            <!-- end ngRepeat: title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type]) -->
                            <th ng-repeat="title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type])"
                                ng-class="title.class" class="ng-binding ng-scope span-11">年初余额
                            </th>
                            <!-- end ngRepeat: title in (getThList() ? setMenu['currency'] : setMenu[reportMenu.type.type]) -->
                          </tr>
                          </thead>
                        </table>
                      </div>
                      <div>
                        <div class="content-rel" id="scrollBar-report">
                          <table class="reportTable"
                                 ng-show="reportMenu.type.type == 'report' &amp;&amp; currency.type == 'balances'">
                            <tbody>
                            <!-- ngRepeat: data in tableData['reportMap'][navMenu.reportType.index] | orderBy:'subject' --> </tbody>
                          </table>
                          <div class="assistInitBalance ng-hide" ng-show="reportMenu.type.type == 'assistInitBalance'">
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
                          <table class="reportTable ng-hide"
                                 ng-show="reportMenu.type.type == 'report' &amp;&amp; currency.type == 'currency'">
                            <tbody> <!-- ngRepeat: data in tableData['currency'] | orderBy:'subject' --> </tbody>
                          </table>
                          <table class="cashTable ng-hide" ng-show="reportMenu.type.type == 'cash'">
                            <tbody> <!-- ngRepeat: row in reportData['cash'] --> </tbody>
                          </table>
                          <table class="incomeTable ng-hide" ng-show="reportMenu.type.type == 'income'">
                            <tbody> <!-- ngRepeat: row in reportData['income'] --> </tbody>
                          </table>
                          <table class="assetTable ng-hide" ng-show="reportMenu.type.type == 'asset'">
                            <tbody> <!-- ngRepeat: row in reportData['asset'] --> </tbody>
                          </table>
                          <div ng-show="(reportMenu.type.type == 'asset' &amp;&amp; reportData['asset'].length == 0) ||
                (reportMenu.type.type == 'income' &amp;&amp; reportData['income'].length == 0)"
                               style="text-align:center;margin-top:100px" class="ng-hide"><img
                            src="data:image/png;base64,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">
                            <p style="color:rgba(50,63,77,.5);margin-top:40px;font-size:18px" class="ng-binding">
                              小君提示您：系统未找到 的 利润表 </p></div>
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
                        <tr> <!-- ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 序号 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-4"> 序号 <span ng-show="order.type == title.type" ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span></th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 资产名称 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-14"> 资产名称 <span ng-show="order.type == title.type"
                                                                              ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span></th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 入账时间 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-8"> 入账时间 <span ng-show="order.type == title.type"
                                                                             ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="icon-orderBy-up"></span></th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 原值 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-8"> 原值 <span ng-show="order.type == title.type" ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span></th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 预计残值 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-8"> 预计残值 <span ng-show="order.type == title.type"
                                                                             ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span></th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 总折旧周期(月) 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-10"> 总折旧周期(月) <span ng-show="order.type == title.type"
                                                                                  ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span></th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 折旧周期(期初) 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-10"> 折旧周期(期初) <span ng-show="order.type == title.type"
                                                                                  ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span></th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 累计折旧(期初) 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-10"> 累计折旧(期初) <span ng-show="order.type == title.type"
                                                                                  ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span></th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 本月折旧 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-8"> 本月折旧 <span ng-show="order.type == title.type"
                                                                             ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span></th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 净值(期末) 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-8"> 净值(期末) <span ng-show="order.type == title.type"
                                                                               ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span></th>
                          <!-- end ngRepeat: title in setMenu['assets'] -->
                          <th ng-repeat="title in setMenu['assets']" data-toggle="tooltip" title="按 状态 排序"
                              ng-class="title.class" ng-click="orderByAssets(title.type)"
                              class="ng-binding ng-scope span-12"> 状态 <span ng-show="order.type == title.type"
                                                                            ng-class="((order.order + order.type) == title.type)
                              ? 'icon-orderBy-down' : 'icon-orderBy-up'" class="ng-hide icon-orderBy-up"></span></th>
                          <!-- end ngRepeat: title in setMenu['assets'] --> </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="content-rel" id="scrollBar-assets">
                      <div ng-show="tableData['assets'].length == 0" style="text-align:center;margin-top:100px"><img
                        src="data:image/png;base64,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">
                        <p style="color:rgba(50,63,77,.5);margin-top:40px" class="ng-binding"> 未搜索到 2018-08 期的固定资产 </p>
                      </div>
                      <table>
                        <tbody> <!-- ngRepeat: data in tableData['assets'] | orderBy: order.order + order.type -->
                        <tr ng-show="showInfo(tableData['assets'].length)" style="font-weight:700" class="ng-hide">
                          <td colspan="3">合计：</td>
                          <td style="text-align:right" class="ng-binding"></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td style="text-align:right" class="ng-binding"></td>
                          <td style="text-align:right" class="ng-binding"></td>
                          <td style="text-align:right" class="ng-binding"></td>
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
                    <div class="com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                         ng-click="downloadTemplate() ;click();" ui-button="" btn-type="hollow">
                      <div><span class="ng-scope">下载模板</span></div>
                    </div>
                    <div class="com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                         ng-click=";click();" ui-button="" btn-type="hollow" ng-show="canOperate">
                      <div><label for="amortise" class="ng-scope">导入待摊费用</label></div>
                    </div>
                    <div class="com-button anime ng-isolate-scope com-button--hollow" ng-class="class"
                         ng-click="create() ;click();" ui-button="" btn-type="hollow" ng-show="canOperate">
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
                      <div ng-show="amortise.entries.length === 0" style="text-align:center;margin-top:100px"><img
                        src="data:image/png;base64,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">
                        <p style="color:rgba(50,63,77,.5);margin-top:40px" class="ng-binding"> 未搜索到 2018-08 期的待摊费用 </p>
                      </div>
                      <table>
                        <tbody> <!-- ngRepeat: data in amortise.entries -->
                        <tr ng-show="amortise.entries.length !== 0" style="font-weight:700" class="ng-hide">
                          <td colspan="3" style="text-align:center">合计：</td>
                          <td style="text-align:right" class="ng-binding"></td>
                          <td style="text-align:center">-</td>
                          <td style="text-align:center">-</td>
                          <td style="text-align:center">-</td>
                          <td style="text-align:center">-</td>
                          <td style="text-align:right" class="ng-binding"></td>
                          <td style="text-align:center">-</td>
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
                    <div class="communicate clear ng-hide" ng-show="user.type === 'fscAdmin' ||
                    user.type === 'fscMgr' ||
                    user.type === 'fscCommon'">
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
                         :key="index" data-toggle="tooltip">
                      <div class="enclosure-containBox">
                        <div class="content-rel enclosure-J">
                          <img :src="a.fileUrl">
                          <div class="icon-deleteEnclosure" data-toggle="tooltip" title="删除"
                               @click="deleteFile(a)"></div>
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
  </div>
</template>

<script>
  import api from './api/index'
  import utils from '../../utils'

  export default {
    name: "bookSettings",
    data() {
      return {
        operationFlag: false,
        subjects: [],
        setTitleClass: '',
        navMenuSubject: [
          {"index": 1, "type": "assets", "name": "资产", isSelected: true},
          {"index": 2, "type": "liabilities", "name": "负债", isSelected: false},
          {"index": 3, "type": "rightsAndInterests", "name": "权益", isSelected: false},
          {"index": 4, "type": "cost", "name": "成本", isSelected: false},
          {"index": 5, "type": "profitAndLoss", "name": "损益", isSelected: false}
        ],
        navMenuAssist: [
          {"index": 1, "type": "assets", "name": "客户", isSelected: true},
          {"index": 2, "type": "liabilities", "name": "供应商", isSelected: false},
          {"index": 3, "type": "rightsAndInterests", "name": "部门", isSelected: false},
          {"index": 4, "type": "cost", "name": "员工", isSelected: false},
          {"index": 5, "type": "profitAndLoss", "name": "存货", isSelected: false},
          {"index": 6, "type": "cost", "name": "项目", isSelected: false}
        ],
        // 报表tab按钮
        reportMenu: [
          {index: 1, type: 'income', name: '辅助核算余额表', isSelected: false},
          {index: 2, type: 'income', name: '辅助核算余额表', isSelected: false},
          {index: 3, type: 'income', name: '辅助核算余额表', isSelected: false},
          {index: 4, type: 'income', name: '辅助核算余额表', isSelected: false},
          {index: 5, type: 'income', name: '辅助核算余额表', isSelected: false},
        ],
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
        accountId: utils.dbGet("account"),
        token: utils.dbGet("userInfo").token,
        adminId: utils.dbGet("userInfo").id,
        accountInfo: {},
        accountOptions: [
          {key: 1, value: '一般纳税人'},
          {key: 2, value: '小规模纳税人'},
          {key: 3, value: '个人独资企业或有限合伙'},
        ],
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
          /*api.querySubprojects(url).then(res => {
            console.log(res.body, "<<<>>>")
            this.subjects = res.body
          })*/
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
                // this.queryNavMenuData(this.queryAssets())
                params.courseType = '1';
              } else if (opt.index == 2) { // 负债
                // this.queryNavMenuData(this.queryLiabilities())
                params.courseType = '2';
              } else if (opt.index == 3) { // 权益
                params.courseType = '3';
              } else if (opt.index == 4) { // 成本
                params.courseType = '4';
              } else if (opt.index == 5) { // 损益
                params.courseType = '5';
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
              this.subjects = []
              let params = {
                accountSetId: this.accountId,
                token: this.token
              }
              if (opt.index == 1) { // 客户
                // this.queryNavMenuData(this.queryAssets())
                params.courseType = '1';
              } else if (opt.index == 2) { // 供应商
                // this.queryNavMenuData(this.queryLiabilities())
                params.courseType = '2';
              } else if (opt.index == 3) { // 部门
                params.courseType = '3';
              } else if (opt.index == 4) { // 员工
                params.courseType = '4';
              } else if (opt.index == 5) { // 存货
                params.courseType = '5';
              } else if (opt.index == 6) { // 项目
                params.courseType = '5';
              }
              // this.queryNavMenuData(params)
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

          } else if (opt.index == 3) {

          } else if (opt.index == 4) {

          } else if (opt.index == 5) {

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
          index: this.banks.length,
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
    },
    created() {
      this.subjectClassify({index: 1}, 'subject')
    }
  }
</script>

<style scoped>
  [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak, .ng-hide:not(.ng-hide-animate) {
    display: none !important;
  }

  /**表格头部样式*/
  .settingBox .setBtnMenu, .settingBox .setHeadMenu {
    height: 30px;
    position: relative;
    margin-top: 10px;
  }

  .settingBox .setHeadMenu {
    float: left;
  }

  .settingBox .setHeadMenu ul li {
    float: left;
    height: 30px;
    width: 60px;
    text-align: center;
    padding: 2px 0 0;
    list-style: none;
    letter-spacing: .9px;
    color: rgba(42, 51, 59, .6);
    margin-right: 15px;
  }

  .settingBox .setHeadMenu ul li.menuOn, .settingBox .setHeadMenu ul li.menuOn:hover {
    cursor: default;
    border-bottom: 5px solid #5fbbfc;
    color: #2a333b;
  }

  .settingBox .setHeadMenu ul li:hover {
    cursor: pointer;
    color: #2a333b;
  }

  .settingBox .setBtnMenu {
    position: absolute;
    right: 0;
  }

  .settingBox .page-searchBox {
    height: 100%;
    width: 200px;
    position: relative;
  }

  .settingBox input, .settingBox select, .settingBox textarea {
    box-sizing: border-box;
  }

  .settingBox .page-searchBox .icon-close, .settingBox .page-searchBox .icon-search {
    position: absolute;
    top: 50%;
    right: 0;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    display: inline-block;
  }

  .settingBox .page-searchBox .icon-search {
    background: url(./i/search.png) no-repeat 50%;
  }

  .settingBox .hover_bar {
    width: 60px;
    height: 5px;
    position: absolute;
    bottom: -5px;
  }

  .settingBox .setHeadMenu ul li ~ .hover_bar.li-0 {
    left: 0;
  }

  .settingBox .hover_bar, .settingBox .setHeadMenu ul li.li-0:hover ~ .hover_bar {
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(45, 168, 255, .4);
  }

  .settingBox .setHeadMenu ul li.li-1:hover ~ .hover_bar, .settingBox .setHeadMenu ul li ~ .hover_bar.li-1 {
    left: 75px;
  }

  .settingBox .setHeadMenu ul li.li-4:hover ~ .hover_bar, .settingBox .setHeadMenu ul li ~ .hover_bar.li-4 {
    left: 300px;
  }

  .settingBox .setHeadMenu ul li.li-1:hover ~ .hover_bar, .settingBox .setHeadMenu ul li ~ .hover_bar.li-1 {
    left: 75px;
  }

  .settingBox .setHeadMenu ul li.li-2:hover ~ .hover_bar, .settingBox .setHeadMenu ul li ~ .hover_bar.li-2 {
    left: 150px;
  }

  .settingBox .setHeadMenu ul li.li-3:hover ~ .hover_bar, .settingBox .setHeadMenu ul li ~ .hover_bar.li-3 {
    left: 225px;
  }

  .settingBox .setHeadMenu ul li.li-5:hover ~ .hover_bar, .settingBox .setHeadMenu ul li ~ .hover_bar.li-5 {
    left: 375px;
  }

  .settingBox .btnReportBox > [class*=btn-], .settingBox .btnReportBox > div.btn-check, .settingBox .btnReportBox > div.btn-check:hover, .settingBox .reportTable-left > [class*=btn-] {
    height: 30px;
    line-height: 28px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    float: left;
    position: relative;
    margin-left: 10px;
    overflow: hidden;
    background: #fff;
    border: 1px solid #5fbbfc;
    color: #5fbbfc;
    padding: 0 20px;
  }

  .settingBox .btnReportBox > div.btn-check, .settingBox .btnReportBox > div.btn-check:hover {
    padding: 0 20px 0 40px;
    color: #38aafc;
  }

  .settingBox .icon-addAssets, .settingBox .icon-cancelReport, .settingBox .icon-fileAssets, .settingBox .icon-reconciliationAssets, .settingBox .icon-saveReport, .settingBox [class*=icon-isShowNullNum-] {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    margin-top: -12px;
    left: 15px;
    background: red;
  }

  .settingBox .icon-isShowNullNum-off {
    background: url(./i/unselected.png) no-repeat 50%;
  }

  .settingBox .setBtnMenu .icon-download {
    height: 30px;
    width: 30px;
    cursor: pointer;
    float: right;
    background: url(./i/download.png) no-repeat 50%;
    margin-left: 10px;
  }

  /**page-content*/
  .settingBox .page-content {
    overflow: visible;
  }

  .settingBox .tableData-report, .settingBox .tableData-subject {
    padding-right: 30px;
  }

  .settingBox [class*=tableData-] {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  /**右側tab菜單*/
  /*.settingBox .navSubjectMenuBox {
    width: 30px;
    color: #5fbbfc;
    text-align: center;
    position: absolute;
    top: 40px;
    right: 0;
  }*/

  .settingBox .navSubjectMenuBox > div {
    padding: 10px 4px;
    background: #fff;
    border-bottom: 1px solid #5fbbfc;
    border-right: 1px solid #5fbbfc;
    cursor: pointer;
  }

  .settingBox .navSubjectMenuBox > div.navSubjectMenuMask {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background: hsla(0, 0%, 100%, .5);
    border: 1px solid hsla(0, 0%, 100%, .5);
    cursor: default;
  }

  .settingBox .navSubjectMenuBox > div:nth-child(2) {
    border-top: 1px solid #5fbbfc;
    border-radius: 0 5px 0 0;
  }

  .settingBox .navSubjectMenuBox > div.menuOn, .settingBox .navSubjectMenuBox > div.menuOn:hover {
    color: #fff;
    background: #5fbbfc;
    cursor: default;
  }

  .settingBox .navSubjectMenuBox > div:hover {
    background: #f4f4f4;
  }

  /**table主体*/
  .settingBox .setSubjectListBox, .settingBox .setTaxListBox, .settingBox .tableData-assets, .settingBox .tableData-info {
    overflow: hidden;
  }

  .settingBox .setSubjectListBox {
    border-bottom: 1px solid rgba(182, 192, 210, .5);
  }

  .settingBox .setSubjectListBox, .settingBox .setTaxListBox, .settingBox .tableData-report .setSubjectListBox {
    border-radius: 3px;
    background: #fff;
    padding: 40px 0 0;
  }

  .settingBox .tableBox, .settingBox .tableBox .tableBody, .settingBox .tableBox .tableHead {
    width: 100%;
  }

  .settingBox [class*=tableData-] .reportTableFixed, .settingBox [class*=tableData-] .tableFixed {
    position: absolute;
    top: -40px;
    left: 0;
  }

  .settingBox [class*=tableData-] > .content-rel .tableBox {
    width: 100%;
  }

  .settingBox .tableBox .tableHead {
    height: 40px;
    background: #5fbbfc;
    color: #fff;
    border-left: 1px solid #5fbbfc;
    border-right: 1px solid #5fbbfc;
  }

  .settingBox .tableBox .tableHead .tableTh {
    line-height: 40px;
    text-align: center;
  }

  .settingBox .tableBox .tableBody .tableTd, .settingBox .tableBox .tableHead .tableTh {
    height: 100%;
    float: left;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .settingBox .tableBox .tableHead .tableTh {
    border-right: 1px solid hsla(0, 0%, 100%, .3);
  }

  .settingBox #scrollBar-subject > .tableBox {
    border-left: 1px solid rgba(182, 192, 210, .5);
    border-right: 1px solid rgba(182, 192, 210, .5);
  }

  .settingBox .tableBody, .settingBox table td {
    font-size: 12px;
  }

  .settingBox .tableBox .tableBody {
    height: 30px;
    background: #fff;
  }

  .settingBox .tableBox .tableBody .tableTd {
    position: relative;
    line-height: 30px;
    padding: 0 5px;
  }

  .settingBox .tableBox .tableBody .tableTd {
    border-right: 1px solid rgba(182, 192, 210, .5);
    border-bottom: 1px solid rgba(182, 192, 210, .5);
  }

  .settingBox [class*=-sizeColor-red] {
    color: #ff6364;
  }

  .settingBox [class*=-sizeColor-green] {
    color: #53cf93;
  }

  .settingBox .tableData-assets table tbody tr td:first-child, .settingBox .tableData-assets table tbody tr td:last-child, .settingBox .tableData-assets table tbody tr td:nth-child(3), .settingBox .tableData-assets table tbody tr td:nth-child(6), .settingBox .tableData-assets table tbody tr td:nth-child(7), .settingBox .tableData-report table.assetTable tr td:nth-child(2), .settingBox .tableData-report table.assetTable tr td:nth-child(6), .settingBox .tableData-report table.cashTable tr td:nth-child(2), .settingBox .tableData-report table.incomeTable tr td:nth-child(2), .settingBox .tableData-report table tbody tr td:nth-child(3), .settingBox .tableData-report table tbody tr td:nth-child(4), .settingBox .tableData-subject .tableBody div:last-child, .settingBox .tableData-subject .tableBody div:nth-last-child(2) {
    text-align: center;
  }

  .settingBox .tableData-subject .tableBody div:last-child, .settingBox .tableData-subject .tableHead div:last-child {
    border-right: none;
  }

  .settingBox .tableData-subject .tableBody:hover, .settingBox .tableData-tax table tbody tr:hover, .settingBox [class*=tableData-] table tbody tr:hover {
    background: rgba(255, 232, 136, .5);
  }

  /**伸缩展示*/
  .settingBox .tableBody .btn-operateBox {
    height: 30px;
    position: absolute;
    right: 5px;
    top: 50%;
    margin-top: -15px;
    display: none;
  }

  .settingBox .icon-arrows-90, .settingBox .icon-arrows-90-hover {
    background: url(./i/arrows.png) center -10px no-repeat;
    background-size: 10px;
  }

  .settingBox .icon-arrows-0, .settingBox .icon-arrows-0-hover {
    background: url(./i/arrows.png) center 0 no-repeat;
    background-size: 10px;
  }

  .icon-assist, .subjectText {
    float: left;
  }

  .settingBox [class*=icon-arrows-] {
    width: 10px;
    height: 10px;
    display: inline-table;
  }

  .settingBox .icon-arrows-0-hover:hover, .settingBox .icon-arrows-90-hover:hover {
    cursor: pointer;
  }

  /**科目编辑等*/
  .settingBox .tableData-subject .tableBody div:first-child:hover .btn-operateBox {
    display: inline-block;
  }

  .settingBox .tableBody .btn-operateBox > div {
    width: 24px;
    height: 30px;
    float: left;
    margin-left: 5px;
    cursor: pointer;
    border-radius: 3px;
  }

  .settingBox .tableBody .btn-operateBox .btn-operate {
    background: url(./i/operate.png) 50% no-repeat;
    position: relative;
  }

  /**子集菜单*/
  .settingBox .tableBody .btn-operateBox .btn-operate .operateBox {
    border-radius: 3px;
    background-color: #fff;
    display: none;
    position: absolute;
    width: 100px;
    z-index: 10;
    left: -70px;
  }

  .settingBox .tableBody .btn-operateBox .btn-operate .bottom {
    top: 30px;
  }

  .settingBox .tableBody .btn-operateBox .btn-operate:hover .operateBox {
    display: inline-block;
  }

  .settingBox .tableBody .btn-operateBox .btn-operate .bottom:before {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 6px 7px;
    border-color: transparent transparent #5fbbfc;
    position: absolute;
    top: -7px;
    right: 12px;
  }

  .settingBox .tableData-subject .btn-operateBox .operateBox .operate {
    text-align: center;
    font-weight: 400;
    height: 30px;
    border-left: 1px solid #5fbbfc;
    border-right: 1px solid #5fbbfc;
    border-bottom: 1px solid #5fbbfc;
  }

  .settingBox .btn-operateBox .operateBox .operate:first-child {
    border-top: 1px solid #5fbbfc;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .settingBox .tableData-subject .btn-operateBox .operateBox .operate:hover {
    background-color: #5fbbfc;
  }

  .settingBox .btn-operateBox .operateBox .operate:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  #scrollBar-subject::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  #scrollBar-subject::-webkit-scrollbar-track   {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  #scrollBar-subject::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #bdbdbd;
  }

  /*滑块效果*/
  #scrollBar-subjecty::-webkit-scrollbar-thumb:hover {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.4);
  }

  /**账套信息*/
  #accountInfo {
    width: 100%;
    height: 100%;
    position: relative;
  }

  #accountInfo .column {
    width: 100%;
    position: relative;
    border: 1px solid rgba(182, 192, 210, .5);
    margin-bottom: 20px;
    line-height: 30px;
    border-radius: 3px;
  }

  #accountInfo .column .title {
    width: 100%;
    font-size: 14px;
    line-height: 40px;
    border-bottom: 1px solid rgba(182, 192, 210, .5);
    position: relative;
    text-indent: 20px;
    letter-spacing: .9px;
    color: #2a333b;
  }

  #accountInfo span {
    display: inline-block;
  }

  #accountInfo .column .title .sideLine {
    width: 10px;
    height: 100%;
    background: #ff8a52;
    position: absolute;
    left: 0;
  }

  #accountInfo .column .content {
    width: 100%;
  }

  #accountInfo .column .content .leftBox, #accountInfo .column .content .rightBox {
    float: left;
    width: 50%;
    height: 100%;
    position: relative;
    padding: 20px;
  }

  #accountInfo .column .content .leftBox {
    border-right: 1px solid rgba(182, 192, 210, .5);
  }

  #accountInfo .inputLabel {
    text-align: right;
    display: inline-block;
    width: 90px;
  }

  #accountInfo .input-normal {
    width: 300px;
    height: 30px;
    display: inline-block;
    margin-left: 10px;
    margin-bottom: 20px;
  }

  input[type="number"], input[type="password"], input[type="text"], select {
    width: 100%;
    height: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(95, 187, 252);
    border-image: initial;
    background: rgb(235, 240, 245);
    border-radius: 4px;
  }

  #accountInfo .secretKey {
    position: relative;
    height: 50px;
  }

  #accountInfo .secretKey label {
    height: 30px;
    top: 0;
    left: 0;
    position: absolute;
  }

  #accountInfo .basic .secretKey-warp {
    width: 300px;
    display: inline-block;
    position: relative;
    height: 50px;
    left: 105px;
  }

  #accountInfo .secretKey-warp .input-normal {
    width: 220px;
    margin-left: 0;
  }

  #secretKey {
    border: 0;
    background: #ebf0f5;
    border-radius: 3px;
    padding-left: 8px;
    width: 100%;
    height: 100%;
  }

  #accountInfo .btn {
    cursor: pointer;
    border: 1px solid rgba(182, 192, 210, .5);
    text-align: center;
  }

  #accountInfo .getSecretKey {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 30px;
    padding: 0 10px;
    border-radius: 4px;
    height: 30px;
    color: #5fbbfc;
    border: 1px solid #5fbbfc;
  }

  #accountInfo .clear:after {
    content: "";
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
  }

  #accountInfo .selectBox {
    margin-bottom: 20px;
    white-space: nowrap;
  }

  #accountInfo .inputLabel {
    text-align: right;
    display: inline-block;
    width: 90px;
  }

  #accountInfo .selectBox .item {
    display: initial;
    text-indent: 25px;
    position: relative;
    margin-left: 30px;
  }

  #accountInfo .icon-select {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url(./i/unselected.png) no-repeat 50%;
    position: absolute;
    left: -25px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    cursor: pointer;
  }

  #accountInfo .icon-selected {
    background: url(./i/selected.png) no-repeat 50%;
  }

  #accountInfo .column .content .leftBox {
    border-right: 1px solid rgba(182, 192, 210, .5);
  }

  #accountInfo .connect .communicate .leftBox, #accountInfo .connect .company .leftBox {
    border-right: 0;
  }

  #accountInfo .connect .inputLabel, #accountInfo .tax .rightBox .inputLabel {
    text-align: right;
    display: inline-block;
    width: 75px;
  }

  #accountInfo .icon-person {
    float: left;
    width: 30px;
    height: 30px;
    background: url(./i/person.png) no-repeat 50%;
  }

  #accountInfo .icon-phone {
    float: left;
    width: 30px;
    height: 30px;
    background: url(./i/accountInfoPhone.png) no-repeat 50%;
  }

  #accountInfo .connect .inputLabel, #accountInfo .tax .rightBox .inputLabel {
    text-align: right;
    display: inline-block;
    width: 75px;
  }

  #accountInfo .companyManage .range {
    position: relative;
  }

  #accountInfo .companyManage .range label {
    position: absolute;
    top: 0;
  }

  .companyManage .range textarea {
    width: 380px;
    height: 130px;
    border: 1px solid rgba(182, 192, 210, .5);
    background: #ebf0f5;
    border-radius: 4px;
    position: absolute;
    left: 105px;
    border: 1px solid #5fbbfc;
    padding: 8px;
  }

  #accountInfo .column .content {
    width: 100%;
  }

  .settingBox .infoBox-leftBottom [class*=basicInfo-], .settingBox .infoBox-leftBottom [class*=companyInfo-], .settingBox .infoNameBox-bottom, .settingBox .infoNameBox-top, .settingBox [class*=infoBox-] {
    width: 100%;
  }

  .settingBox .infoBox-bankBody, .settingBox .infoBox-bankHead {
    height: 50px;
    border-bottom: 1px solid #ebf0f5;
  }

  .settingBox .infoBox-bankHead {
    background: #fff;
  }

  .settingBox .infoBox-bankBody > div, .settingBox .infoBox-bankHead > div, .settingBox .infoBox-left, .settingBox .infoBox-right, .settingBox .left-infoNameBox, .settingBox .right-infoOtherBox {
    height: 100%;
  }

  .settingBox .infoBox-bankBody > div, .settingBox .infoBox-bankHead > div {
    float: left;
    line-height: 50px;
    text-align: center;
  }

  .settingBox .infoBox-bankHead > div {
    font-weight: 700;
  }

  .settingBox .infoBox-bankBody [class*=bankTd-], .settingBox .infoBox-bankHead [class*=bankTd-] {
    width: 30%;
    position: relative;
    border-right: 1px solid rgba(182, 192, 210, .5);
  }

  .settingBox .infoBox-bankHead [class*=bankTd-] {
    border-left: 1px solid #ebf0f5;
  }

  .settingBox .infoBox-bankBody .bankTd-index, .settingBox .infoBox-bankHead .bankTd-add {
    width: 10%;
  }

  .settingBox .infoBox-bankHead .bankTd-add {
    cursor: pointer;
  }

  .settingBox .bankTd-add .icon-addBankInfo {
    width: 25px;
    height: 25px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -12px 0 0 -12px;
    background: url(./i/icon-gather-25.png) -125px -100px no-repeat;
    opacity: .5;
  }

  .settingBox .icon-assEnclosure {
    background: url(./i/icon-gather-25.png) -125px -100px no-repeat;
    opacity: .5;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
  }

  #accountInfo .icon-addBankInfo, #accountInfo .icon-assEnclosure {
    background: url(./i/add.png) no-repeat 50%;
  }

  #accountInfo .adjunct [class*=enclosureBox] {
    padding: 10px;
    height: 150px;
    float: left;
    cursor: pointer;
  }

  .settingBox .enclosureBox-add .enclosure-containBox {
    background: rgba(102, 178, 255, .1);
  }

  .settingBox .enclosureBox-add:hover .enclosure-containBox {
    background: rgba(102, 178, 255, .2);
    overflow: hidden;
  }

  #accountInfo .adjunct .enclosure-containBox {
    height: 100px;
    border: 3px solid #f5f7fa;
    position: relative;
  }

  .settingBox input#fileAmounts, .settingBox input#fileBalance, .settingBox input#fileCash, .settingBox input#fileCurrencies, .settingBox input#fileEnclosure, .settingBox input#fileSingle {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    opacity: 0;
    z-index: 3;
  }

  .settingBox .icon-assEnclosure, .settingBox .icon-deleteEnclosure {
    width: 25px;
    height: 25px;
    position: absolute;
  }

  .settingBox .infoBox-bankBody {
    background: #fff;
    position: relative;
  }

  #accountInfo .bank select {
    width: auto;
    height: auto;
    border: 0;
    background: #fff;
    border-radius: 0;
    text-indent: 0;
  }

  .settingBox input.tdInput, .settingBox label.tdLabel {
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 96%;
    height: 85%;
    padding: 0 5px;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
  }

  .settingBox label.tdLabel {
    background: #e6f2ff;
    border: 1px solid #90c7ff;
  }

  .settingBox label.tdLabel {
    cursor: default;
    z-index: 2;
    line-height: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .settingBox .bankTd-bank label.tdLabel {
    line-height: 41px;
  }

  #accountInfo .bank label {
    text-align: center;
  }

  .settingBox .infoBox-bankBody .icon-removeBank {
    width: 25px;
    height: 25px;
    border-radius: 3px;
    background: url(./i/remove.png) 0 -25px no-repeat;
    background-size: 25px;
    position: absolute;
    z-index: 5;
    right: 15px;
    top: 12px;
    cursor: pointer;
    display: none;
  }

  .settingBox .infoBox-bankBody:hover .icon-removeBank {
    display: inline-block;
  }

  .settingBox input.tdInput:focus {
    opacity: 1;
    z-index: 3;
  }

  input:focus, select:focus {
    outline: none;
    background: #fff;
  }

  .settingBox input:focus, .settingBox select:focus, .settingBox textarea:focus {
    outline: none;
  }

  input.align {
    text-align: center;
  }

  input.align:focus {
    text-align: left;
  }

  .settingBox .icon-deleteEnclosure {
    border-radius: 3px;
    background: url(./i/icon-gather-25.png) -175px -50px no-repeat hsla(0, 0%, 100%, .7);
    top: 10px;
    right: 10px;
    opacity: 0;
  }

  .settingBox .enclosure-containBox img {
    width: 99%;
    height: 99%;
  }

  .settingBox .enclosureBox:hover .icon-deleteEnclosure {
    opacity: .5;
  }

  .settingBox .enclosureBox:hover .icon-deleteEnclosure:hover {
    opacity: 1;
  }

  /**辅助核算*/
  .settingBox .navSubjectMenuBox {
    width: 30px;
    color: #5fbbfc;
    text-align: center;
    position: absolute;
    top: 40px;
    right: 0;
  }

  .settingBox .navSubjectMenuBox > div {
    padding: 10px 4px;
    background: #fff;
    border-bottom: 1px solid #5fbbfc;
    border-right: 1px solid #5fbbfc;
    cursor: pointer;
  }

  .settingBox .navSubjectMenuBox > div.navSubjectMenuMask {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background: hsla(0, 0%, 100%, .5);
    border: 1px solid hsla(0, 0%, 100%, .5);
    cursor: default;
  }

  .settingBox .navSubjectMenuBox > div:nth-child(2) {
    border-top: 1px solid #5fbbfc;
    border-radius: 0 5px 0 0;
  }

  .settingBox .assistBox {
    overflow: hidden;
    border-radius: 3px;
    background: #fff;
    padding: 40px 0 0;
  }

  .assistBox .content-rel {
    border-left: 0 solid rgba(182, 192, 210, .5);
  }

  .settingBox [class*=tableData-] table {
    width: 100%;
    background: #fff;
  }

  .settingBox [class*=tableData-] table tr {
    border-bottom: 1px solid rgba(182, 192, 210, .5);
  }

  .settingBox [class*=tableData-] table th {
    height: 40px;
    background: #5fbbfc;
    color: #fff;
    font-weight: 400;
  }

  .settingBox [class*=tableData-] table td, .settingBox [class*=tableData-] table th {
    border-right: 1px solid rgba(182, 192, 210, .5);
    position: relative;
    padding: 0 4px;
  }

  .settingBox [class*=tableData-] table tr th:last-child {
    border-right: 1px solid #5fbbfc;
  }

  .settingBox .tableData-assist .assistBox .content-rel .content-rel {
    border: 1px solid rgba(182, 192, 210, .5);
  }

  #assistTableBox {
    padding-bottom: 31px;
  }

  #assistTableBox, .fullScrollBar {
    position: relative;
    height: 100%;
  }

  .settingBox [class*=tableData-] table tbody tr {
    height: 30px;
  }

  .tableData-assist table td {
    position: relative;
    height: 30px;
  }

  .assistBox .createBox, .assistBox .selectBox {
    position: relative;
  }

  .settingBox .tableData-assist table td:first-child {
    border-left: 0;
  }

  .settingBox [class*=tableData-] {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .settingBox .tableData-assist {
    padding-right: 30px;
  }
  .assistBox .icon-create {
    background: url(./i/add.png) 50% no-repeat;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
  }
  .tableData-assist table label {
    display: inline-block;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    line-height: 30px;
  }
  .tableData-assist table label span {
    position: absolute;
    left: 0;
    text-indent: 4px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tableData-assist table label>div {
    height: 100%;
    width: 100%;
    padding: 2px;
    box-sizing: border-box;
    position: absolute;
    top: 2px;
  }
  .tableData-assist input {
    background-color: #e8efff;
    border: 1px solid #66b2ff;
  }
  .tableData-assist table label input {
    position: relative;
    z-index: -1;
    top: -4px;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .tableData-assist table label input:focus {
    z-index: 1;
  }

  /**初始报表*/
  .settingBox [class*=tableData-] .reportTableFixed, .settingBox [class*=tableData-] .tableFixed {
    position: absolute;
    top: -40px;
    left: 0;
  }
  .settingBox [class*=tableData-] .reportTableFixed {
    width: 100%;
    height: 40px;
    top: -40px;
    padding: 7px 20px;
    border-radius: 4px 4px 0 0;
    border-left: 1px solid #38aafc;
    border-top: 1px solid #38aafc;
    border-right: 1px solid #38aafc;
    color: rgba(42,51,59,.6);
  }
  .settingBox .reportTableFixed [class*=reportTable-], .settingBox .reportTableFixed [class*=reportTable-]>div {
    height: 100%;
  }
  .settingBox .reportTableFixed .reportTable-left, .settingBox .reportTableFixed [class*=reportTable-]>div {
    float: left;
  }
  .settingBox .reportTableFixed .reportTable-left {
    position: relative;
  }
  .settingBox .reportTableFixed .reportTable-right {
    float: right;
  }
  .settingBox .reportTableFixed .reportTable-left .viewInfoSize {
    width: 180px;
  }
  .settingBox .reportTableFixed .reportTable-right>div {
    margin-left: 30px;
    cursor: pointer;
  }
</style>
