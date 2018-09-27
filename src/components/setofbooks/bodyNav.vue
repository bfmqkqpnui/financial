<template>
  <div class="module-title ng-scope" style="position: relative;">
    <div class="com-issue ng-isolate-scope" ui-issue="" i-link-system="true" i-show-title="true">
      <div class="com-issue_display" ng-show="iShowTitle === 'true'" ng-click="showPicker()">
        <div class="display_icon icon-40"></div>
        <div class="display_tag ng-binding">2018-03期</div>
      </div>
      <div class="com-issue_container anime com-issue_container--hidden"
           ng-class="{'com-issue_container--hidden': !show}">
        <div click-test="" listen="clicktest" onmouselost="hidePicker()" class="ng-isolate-scope" yjpijgfx="">
          <div class="year">
            <div class="year_btn--last ng-hide" ng-show="isLastYearValid()" ng-click="lastYear()"></div>
            <div class="year_tag ng-binding">2018</div>
            <div class="year_btn--next ng-hide" ng-show="isNextYearValid()" ng-click="nextYear()"></div>
          </div>
          <div class="month"> <!-- ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 1
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 2
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope month_box--valid month_box--focus" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 3
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 4
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 5
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 6
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 7
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 8
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 9
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 10
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 11
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] -->
            <div class="month_box anime ng-binding ng-scope" ng-class="{
               'month_box--valid': isMonthValid(month),
               'month_box--focus': isCurrentMonth(month)
             }" ng-repeat="month in [1,2,3,4,5,6,7,8,9,10,11,12]" ng-click="selectMonth(month)"> 12
            </div><!-- end ngRepeat: month in [1,2,3,4,5,6,7,8,9,10,11,12] --> </div>
        </div>
      </div>
    </div>
    <div class="com-cs ng-scope" ui-comp-status="">
      <div class="brief"><p class="brief_name ng-binding">天机</p>
        <p class="brief_type ng-binding">[小规模纳税人&amp;季报]</p></div>
      <div class="state ng-binding">
        <div class="button equilibrium ng-hide" ng-hide="equilibrium" ng-click="showEquilibrium()"></div>
        做账中
      </div>
      <div class="button switch ng-hide" v-show="canSwitch" ng-click="switchState()">
        <div class="switch_icon"></div>
        <p class="switch_tag ng-binding">做账中</p></div>
    </div>

    <div class="module-title_gap"></div>
    <div class="com-memo anime ng-scope" ui-memo="">
      <div class="icon-noteBtn" ng-click="toggle($event)" title="备忘录"></div>
      <div class="pointer ng-binding ng-hide" ng-show="memos.length !== 0">0</div>
      <div class="memoBox ng-isolate-scope" v-if="remarkComponentFlag">
        <div class="memo-title">备忘录</div>
        <div class="memo-containerBox">
          <div class="container-top"><textarea placeholder="填写备忘" ng-model="text"
                                               class="ng-pristine ng-untouched ng-valid ng-empty"></textarea></div>
          <div class="container-bottom">
            <div class="memo-container-left ng-binding">2018-09</div>
            <div class="memo-container-right anime" title="提交备忘" ng-click="addMemo()"></div>
          </div>
        </div>
        <div class="memo-listBox ps-container ps-theme-default" scroll="" scroll-behavior="top"
             data-ps-id="80fe126e-101d-d442-4a93-44b9f8f08a6f"> <!-- ngRepeat: x in memos -->
          <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;">
            <div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
          </div>
          <div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;">
            <div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="com-ds ng-scope" ui-data-source="">
      <div class="com-ds_switch icon-dataSource icon-40" title="数据源" ng-click="open()"></div>
    </div>
  </div>
</template>

<script>
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        canSwitch: false,
        remarkComponentFlag: false,
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {},
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {

    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style>

</style>
