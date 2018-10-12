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
              <div class="btn-addAssets" @click="addFixedAsset" ng-show="isMyAccount">添加固定资产</div>
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
                              <div ng-click="oprClick($index, data, 'create-name', $event)">
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
                              <div ng-click="oprClick($index, data, 'create-unit', $event)">
                                <input type="text" v-model="newAssist.unitStr" @keydown.enter="addAss"
                                       id="vxnkguao-0-2"
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
                  <div class="navSubjectMenuBox">
                    <div class="navSubjectMenuMask ng-hide"></div>
                    <div :class="item.isSelected? 'menuOn' : ''"
                         @click="subjectClassify(item, 'report')" class="ng-binding ng-scope"
                         v-for="item in navMenuSubject"
                         :key="item.index" v-text="item.name">
                    </div>
                  </div>
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
                        <tr v-for="(item, index) in assetTableList" :key="index">
                          <td class="span-4 ng-binding" v-text="index+1"></td>
                          <td class="span-14 ng-binding" v-text="item.name"></td>
                          <td class="span-8 ng-binding" v-text="item.beginIssue"></td>
                          <td class="span-8 ng-binding" v-text="item.initVal"></td>
                          <td class="span-8 ng-binding" v-text="item.residualRate"></td>
                          <td class="span-10 ng-binding" v-text="item.depreciationPeriod"></td>
                          <td class="span-10 ng-binding" v-text="item.beginIssueUsedPeriod"></td>
                          <td class="span-10 ng-binding" v-text="item.beginIssueUsedVal"></td>
                          <td class="span-8 ng-binding" v-text="item.mouthNow"></td>
                          <td class="span-8 ng-binding" v-text="item.netVal"></td>
                          <td class="span-12">
                            <div ng-if="checkAssetsState(data) == 3"
                                 ng-class="{'depreciationIng': isMyAccount, 'myAcc-depreciationIng': !isMyAccount}"
                                 ng-click="disposeIng(data)" class="ng-scope depreciationIng"
                                 v-text="item.status"></div>
                            <div class="deleteAssets-btn" data-toggle="tooltip" title="删除该条固定资产"
                                 ng-click="deleteFixedAsset(data)"></div>
                          </td>
                        </tr>
                        <tr ng-repeat="data in tableData['assets'] | orderBy: order.order + order.type"
                            ng-style="{'background': $index === highlight.row ? 'rgba(255, 241, 178, 0.4)' : ''}"
                            ng-dblclick="showSubjectPop(data, 'readAssets', $event)" ng-click="highlightRow($index)"
                            on-repeat-finished="" class="ng-scope" style="">
                          <td class="span-4 ng-binding">1</td>
                          <td class="span-14 ng-binding">xxx</td>
                          <td class="span-8 ng-binding">2018-08</td>
                          <td class="span-8 ng-binding">6,000.00</td>
                          <td class="span-8 ng-binding">300.00</td>
                          <td class="span-10 ng-binding">60</td>
                          <td class="span-10 ng-binding">0</td>
                          <td class="span-10 ng-binding">0.00</td>
                          <td class="span-8 ng-binding"></td>
                          <td class="span-8 ng-binding">6,000.00</td>
                          <td class="span-12"> <!-- ngIf: checkAssetsState(data) == 1 -->
                            <div ng-if="checkAssetsState(data) == 1"
                                 ng-class="{'prepare': isMyAccount, 'myAcc-prepare': !isMyAccount}"
                                 ng-click="editFixedAsset(data)" class="ng-scope prepare"></div>
                            <div class="deleteAssets-btn" data-toggle="tooltip" title="删除该条固定资产"
                                 ng-show="account.currentIssue === data.beginIssue &amp;&amp;
                                          account.currentIssue === account.selectIssue &amp;&amp;
                                          account.selectIssue === data.beginIssue &amp;&amp;
                                        isMyAccount" ng-click="deleteFixedAsset(data)"></div>
                            <div class="lockAssets-icon ng-hide" data-toggle="tooltip" title="已锁定"
                                 ng-show="account.currentIssue !== account.selectIssue "></div>
                          </td>
                        </tr>
                        <tr ng-repeat="data in tableData['assets'] | orderBy: order.order + order.type"
                            ng-style="{'background': $index === highlight.row ? 'rgba(255, 241, 178, 0.4)' : ''}"
                            ng-dblclick="showSubjectPop(data, 'readAssets', $event)" ng-click="highlightRow($index)"
                            on-repeat-finished="" class="ng-scope" style="">
                          <td class="span-4 ng-binding">2</td>
                          <td class="span-14 ng-binding">yyy</td>
                          <td class="span-8 ng-binding">2018-08</td>
                          <td class="span-8 ng-binding">4,000.00</td>
                          <td class="span-8 ng-binding">0.00</td>
                          <td class="span-10 ng-binding">1</td>
                          <td class="span-10 ng-binding">0</td>
                          <td class="span-10 ng-binding">0.00</td>
                          <td class="span-8 ng-binding"></td>
                          <td class="span-8 ng-binding">4,000.00</td>
                          <td class="span-12"> <!-- ngIf: checkAssetsState(data) == 1 -->
                            <div ng-if="checkAssetsState(data) == 1"
                                 ng-class="{'prepare': isMyAccount, 'myAcc-prepare': !isMyAccount}"
                                 ng-click="editFixedAsset(data)" class="ng-scope prepare"></div>
                            <div class="deleteAssets-btn" data-toggle="tooltip" title="删除该条固定资产"
                                 ng-show="account.currentIssue === data.beginIssue &amp;&amp;
                                          account.currentIssue === account.selectIssue &amp;&amp;
                                          account.selectIssue === data.beginIssue &amp;&amp;
                                        isMyAccount" ng-click="deleteFixedAsset(data)"></div>
                            <div class="lockAssets-icon ng-hide" data-toggle="tooltip" title="已锁定"
                                 ng-show="account.currentIssue !== account.selectIssue "></div>
                          </td>
                        </tr>


                        <tr ng-show="showInfo(tableData['assets'].length)" style="font-weight:700" class="">
                          <td colspan="3">合计：</td>
                          <td style="text-align:right" class="ng-binding">10,000.00</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td style="text-align:right" class="ng-binding">0.00</td>
                          <td style="text-align:right" class="ng-binding">0.00</td>
                          <td style="text-align:right" class="ng-binding">10,000.00</td>
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
                    <div class="com-button anime ng-isolate-scope com-button--hollow" @click.stop="addAmortise">
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
                        src="./i/notFound.png">
                        <p style="color:rgba(50,63,77,.5);margin-top:40px" class="ng-binding"> 未搜索到待摊费用 </p>
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
          <p class="ng-binding">添加固定资产</p>
          <div class="site-popup_close g-icon-close" @click.stop="hide"></div>
        </div>
        <div class="site-popup_body">
          <div class="entry-container">
            <div class="entry-row">
              <p class="grid-label popup-label">资产名称</p>
              <input class="grid-content ng-valid ng-dirty ng-touched ng-empty" type="text" v-model="asset.name">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">入账日期</p>
              <input class="grid-content grid-content--lock ng-pristine ng-untouched ng-valid ng-not-empty" type="text"
                     v-model="asset.beginIssue" disabled="disabled">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">原值</p>
              <input class="grid-content ng-valid ng-dirty ng-touched ng-not-empty" type="number"
                     v-model="asset.initVal">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">预计残值率</p>
              <input class="grid-content ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
                     v-model="asset.residualRate">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">折旧周期</p>
              <input class="grid-content ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
                     v-model="asset.depreciationPeriod">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">累计折旧周期</p>
              <input class="grid-content ng-valid ng-dirty ng-touched ng-not-empty" type="number"
                     v-model="asset.beginIssueUsedPeriod" ng-disabled="lock || !canEditBeginIssueUsedPeriod">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">累计折旧</p>
              <input class="grid-content ng-valid ng-dirty ng-touched ng-not-empty" type="number"
                     v-model="asset.beginIssueUsedVal">
            </div>
            <div class="entry-row">
              <p class="grid-label popup-label">入账科目</p>
              <select class="grid-content ng-pristine ng-untouched ng-valid ng-not-empty"
                      v-model="asset.accountedSubject">
                <option ng-repeat="sub in fixedAssetModel.ACCOUNTED_SUBJECTS" value="4101" class="ng-binding ng-scope">
                  4101 - 制造費用
                </option><!-- end ngRepeat: sub in fixedAssetModel.ACCOUNTED_SUBJECTS -->
                <option ng-repeat="sub in fixedAssetModel.ACCOUNTED_SUBJECTS" value="5401" class="ng-binding ng-scope">
                  5401 - 主营业务成本
                </option><!-- end ngRepeat: sub in fixedAssetModel.ACCOUNTED_SUBJECTS -->
                <option ng-repeat="sub in fixedAssetModel.ACCOUNTED_SUBJECTS" value="5601" class="ng-binding ng-scope">
                  5601 - 销售费用
                </option><!-- end ngRepeat: sub in fixedAssetModel.ACCOUNTED_SUBJECTS -->
                <option ng-repeat="sub in fixedAssetModel.ACCOUNTED_SUBJECTS" value="5602" class="ng-binding ng-scope">
                  5602 - 管理费用
                </option><!-- end ngRepeat: sub in fixedAssetModel.ACCOUNTED_SUBJECTS --> </select></div>
            <div class="entry-row">
              <p class="grid-label popup-label">折旧方法</p>
              <select class="grid-content ng-pristine ng-untouched ng-valid ng-not-empty" v-model="asset.arithmetic">
                <option ng-repeat="a in fixedAssetModel.ARITHMETICS" value="平均折旧" class="ng-binding ng-scope">平均折旧
                </option>
                <option ng-repeat="a in fixedAssetModel.ARITHMETICS" value="一次性折旧" class="ng-binding ng-scope">一次性折旧
                </option>
              </select>
            </div>
            <div class="entry-row flex-left">
              <p class="grid-label popup-label">本月计提</p>
              <label class="checkbox icon-select"
                     :class="{'icon-select': !asset.isIssueAccrued, 'icon-selected': asset.isIssueAccrued}">
                <input type="checkbox" v-model="asset.isIssueAccrued" id="fixedAssetAccrued"
                       class="ng-valid ng-dirty ng-valid-parse ng-touched ng-empty">
              </label>
            </div>
          </div>
        </div>
        <div class="site-popup_footer"><p class="popup-error ng-binding"></p>
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

    <!-- 固定资产折旧操作 -->
    <div class="site-mask anime site-mask--shade" v-if="showDisposeAssets">
      <div class="disposeAssetsBox anime site-popup--expand" ng-class="{'site-popup--expand' : showDisposeAssets}">
        <div class="voucherBox">
          <div class="disposeAssets-title"> 固定资产处理操作
            <div class="closeDisposeAssetsPop-icon" data-toggle="tooltip" title="关闭"
                 @click.stop="disposeSelectPop('false')"></div>
          </div>
          <div class="disposeAssets-btn-sell" ng-click="disposeSelect('sale')">出售</div>
          <div class="disposeAssets-btn-scrap" ng-click="disposeSelect('报废')">报废</div>
          <div class="disposeAssets-btn-loss" ng-click="disposeSelect('盘亏')">盘亏</div>
        </div>
      </div>
    </div>

    <!-- 添加待摊费用 -->
    <div class="site-mask anime site-mask--shade" v-if="isAmortise">
      <div class="site-popup anime popup-amortise site-popup--expand">
        <div class="site-popup_head"><p class="ng-binding">添加待摊费用</p>
          <div class="site-popup_close g-icon-close" @click.stop="hide"></div>
        </div>
        <div class="site-popup_body">
          <div class="entry-container">
            <div class="entry-row"><p class="grid-label popup-label">费用名称</p> <input
              class="grid-content ng-pristine ng-untouched ng-valid ng-empty" type="text" ng-model="amortisation.name"
              ng-disabled="lock"></div>
            <div class="entry-row"><p class="grid-label popup-label">摊销起始期</p> <input
              class="grid-content grid-content--lock ng-pristine ng-untouched ng-valid ng-not-empty" type="text"
              ng-model="amortisation.beginIssue" ng-disabled="true" disabled="disabled"></div>
            <div class="entry-row"><p class="grid-label popup-label">摊销金额</p> <input
              class="grid-content ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
              ng-model="amortisation.cash" ng-disabled="lock"></div>
            <div class="entry-row flex-left"><p class="grid-label popup-label">摊销期限</p> <input
              class="grid-content grid-content--short ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
              ng-model="amortisation.depreciationPeriod" ng-disabled="lock"> <span class="grid-tail">月</span></div>
            <div class="entry-row flex-left"><p class="grid-label popup-label">已摊销期数</p> <input
              class="grid-content grid-content--short ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
              ng-model="amortisation.beginIssueUsedPeriod" ng-disabled="lock"> <span class="grid-tail">月</span></div>
            <div class="entry-row"><p class="grid-label popup-label">已摊销金额</p> <input
              class="grid-content ng-pristine ng-untouched ng-valid ng-not-empty" type="number"
              ng-model="amortisation.beginIssueUsedVal" ng-disabled="lock"></div>
            <div class="entry-row"><p class="grid-label popup-label">入账科目</p> <select
              class="grid-content grid-content--lock ng-pristine ng-untouched ng-valid ng-not-empty"
              ng-model="amortisation.accountedSubject"> <!-- ngRepeat: sub in amortisationModel.ACCOUNTED_SUBJECTS -->
              <option ng-repeat="sub in amortisationModel.ACCOUNTED_SUBJECTS" value="5602" class="ng-binding ng-scope">
                5602 - 管理费用
              </option><!-- end ngRepeat: sub in amortisationModel.ACCOUNTED_SUBJECTS -->
              <option ng-repeat="sub in amortisationModel.ACCOUNTED_SUBJECTS" value="4101" class="ng-binding ng-scope">
                4101 - 制造費用
              </option><!-- end ngRepeat: sub in amortisationModel.ACCOUNTED_SUBJECTS --> </select></div>
          </div>
        </div>
        <div class="site-popup_footer"><p class="popup-error ng-binding"></p>
          <div class="entry-row">
            <div class="btn-cancel com-button anime ng-isolate-scope com-button--cancel" @click.stop="hide">
              <div><span class="ng-scope">取消</span></div>
            </div>
            <div class="btn-ok com-button anime ng-isolate-scope com-button--ok" @click.stop="okAmortise">
              <div><span class="ng-scope">确定</span></div>
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
        reportMenu: [
          {index: 1, type: 'income', name: '辅助核算余额表', isSelected: false},
          {index: 2, type: 'income', name: '资产负债表', isSelected: false},
          {index: 3, type: 'income', name: '利润表', isSelected: false},
          {index: 4, type: 'income', name: '现金流量表', isSelected: false},
          {index: 5, type: 'income', name: '科目余额表', isSelected: true},
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
        // 添加固定资产对象
        asset: {
          // 资产名字
          name: '',
          // 入账日期
          beginIssue: '',
          // 原值
          initVal: '',
          // 预计残值率
          residualRate: '',
          // 折旧周期
          depreciationPeriod: '',
          // 累计折旧周期
          beginIssueUsedPeriod: '',
          // 累计折旧
          beginIssueUsedVal: '',
          // 入账科目
          accountedSubject: '',
          // 折旧方法
          arithmetic: '',
          // 本月计提
          isIssueAccrued: ''
        },
        // 固定资产折旧弹层
        showDisposeAssets: false,
        // 待摊费用弹层
        isAmortise: false,
        // 固定资产数据
        assetTableList: [
          {
            code: '001',
            name: '家用电器',
            beginIssue: '2018-10',
            type: 'jd',
            arithmetic: '平均折旧',
            initVal: '6000',
            depreciationPeriod: '60',
            beginIssueUsedVal: '4560',
            beginIssueUsedPeriod: '48',
            residualRate: '300',
            netVal: '1140',
            mouthNow: '95',
            status: '准备折旧'
          }
        ],
        // 当前日期
        dateNow: ""
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
            if (utils.isExist(opt)) {
              this.navMenuSubject.forEach(function (el) {
                if (opt.index == el.index) {
                  el.isSelected = true
                } else {
                  el.isSelected = false
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

          } else if (opt.index == 4) {
            // this.getDate()
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
      addFixedAsset() {
        console.log("添加固定资产")
        this.isFixedAssets = true
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
      },
      // 确认添加固定资产
      ok() {
        console.log("确认添加固定资产")
      },
      // 固定资产处理弹层
      disposeSelectPop(value) {
        if (value == "false") {
          this.showDisposeAssets = false
        } else {
          this.showDisposeAssets = true
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
      // 添加待摊费用
      addAmortise() {
        this.isAmortise = true
      },
      // 待摊费用-导入模板
      downloadTemplate() {
        console.log("待摊费用-导入模板")
      },
      // 添加待摊费用数据
      okAmortise() {
        console.log("添加待摊费用数据")
      }
    },
    created() {
      this.subjectClassify({index: 1}, 'subject')
    },
    mounted() {

    }
  }
</script>

<style scoped src="./css/index.css"></style>
<style scoped>

</style>
