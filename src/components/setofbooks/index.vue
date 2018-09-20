<template>
  <div class="site-content ng-scope">
    <!-- 导航 -->
    <bodyNav v-if="isSecondMenuFlag"></bodyNav>
    <!-- 账套列表 -->
    <booksList></booksList>
    <!-- 凭证列表 -->
    <voucher v-if="remarkComponentFlag"></voucher>
  </div>
</template>

<script>

  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        //备忘录组件
        remarkComponentFlag: false,
        // 是否为二级目录
        isSecondMenuFlag: true,
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

<style scoped>
  .module-content {
    height: 590px;
  }

  .page-vouchers .page-title {
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

  .page-vouchers .page-title .title {
    margin-right: 20px;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
  }

  .page-vouchers .page-title .title--on, .page-vouchers .page-title .title--on:hover {
    border-bottom: 5px solid #5fbbfc;
  }

  .page-vouchers .title-gap {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
  }

  .page-vouchers .page-tools {
    position: absolute;
    top: 0;
    right: 0;
    height: 40px;
    width: 70%;
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

  .page-vouchers .title-gap {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
  }

  .page-vouchers .searchInput {
    position: relative;
  }

  .page-vouchers .searchInput .search {
    height: 30px;
  }

  .icon-search {
    background-image: url(./i/search.png);
  }

  .page-vouchers .searchInput .search-icon {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .page-vouchers .page-title .title:hover {
    border-bottom: 5px solid rgba(95, 187, 252, .8);
  }

  .page-vouchers .funcBtn {
    margin-left: 10px;
    width: 100px;
  }

  .page-vouchers .funcBtn30 {
    position: relative;
    margin-left: 10px;
  }

  .icon-attach {
    background-image: url(./i/attach.png);
  }

  .icon-bin {
    background-image: url(./i/bin.png);
  }

  .page-vouchers .page-content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .page-vouchers .contentTitle {
    padding-left: 10px;
    padding-right: 10px;
    min-height: 40px;
  }

  .page-vouchers .page-content .titleBar {
    position: relative;
    width: 100%;
    height: 40px;
    border-radius: 2px;
    background-color: #5fbbfc;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .page-vouchers .v-col-type {
    min-width: 30px;
    max-width: 30px;
    border-right: 1px solid #dadfe8;
  }

  .page-vouchers .page-content .titleBar .v-col-type {
    border: none;
  }

  .page-vouchers .v-col-content {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
  }

  .page-vouchers [class|=col], .page-vouchers [class|=h] {
    box-sizing: border-box;
    position: relative;
    float: left;
    height: 40px;
    line-height: 40px;
    padding: 0 8px;
    border-right: 1px solid #dadfe8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .page-vouchers .page-content [class|=h] {
    text-align: center;
    color: #fff;
  }

  .page-vouchers .page-content .col-name, .page-vouchers .page-content .h-name {
    width: 25%;
  }

  .page-vouchers .page-content .col-subject, .page-vouchers .page-content .h-subject {
    width: 45%;
  }

  .page-vouchers .page-content .col-credit, .page-vouchers .page-content .col-debit, .page-vouchers .page-content .h-credit, .page-vouchers .page-content .h-debit {
    width: 15%;
  }

  .page-vouchers .page-content .col-credit, .page-vouchers .page-content .col-debit {
    text-align: right;
  }

  .page-vouchers .v-col-audit {
    position: relative;
    min-width: 50px;
    max-width: 50px;
  }

  .icon-unaudited {
    background-image: url(./i/unaudited.png);
  }

  .icon-audited {
    background-image: url(./i/audited.png);
  }

  .page-vouchers .page-content .fullAuditIndicator {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .page-vouchers .toolTitle {
    min-height: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0 10px;
    margin-top: 8px;
  }

  .page-vouchers .toolTitle .voucherTypes {
    width: 120px;
  }

  .page-vouchers .toolTitle .voucherTypes li {
    float: left;
    width: 40px;
    line-height: 20px;
    text-indent: 15px;
    position: relative;
    font-size: 12px;
  }

  .page-vouchers .page-content .circle {
    position: absolute;
    z-index: 1;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    display: inline-block;
  }

  .page-vouchers .voucherTypes .cir-types {
    top: 5px;
    left: 0;
  }

  .page-vouchers .page-content .vou-gather {
    background-color: #ff8c8c;
  }

  .page-vouchers .page-content .vou-payment {
    background-color: #ffcb6a;
  }

  .page-vouchers .page-content .vou-transfer {
    background-color: #99aeff;
  }

  .page-vouchers .toolTitle .sortSwitcher {
    position: relative;
    height: 20px;
    margin-right: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
  }

  .page-vouchers .toolTitle .sortSwitcher p {
    line-height: 20px;
    font-size: 12px;
  }

  .icon-sort {
    background-image: url(./i/sort.png);
  }

  .page-vouchers .toolTitle .sortSwitcher .sort {
    width: 18px;
    height: 18px;
  }

  .page-vouchers .toolTitle .vouOprSwitcher {
    position: relative;
    height: 20px;
    margin-right: 10px;
  }

  .page-vouchers .toolTitle .vouOprSwitcher p {
    line-height: 20px;
    font-size: 12px;
  }

  .page-vouchers .toolTitle .gap {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
  }

  .page-vouchers .toolTitle .subTitle {
    line-height: 20px;
    font-size: 12px;
  }

  .page-vouchers .toolTitle .vouSwitcher {
    position: relative;
    width: 10px;
    height: 20px;
  }

  .icon-expand {
    background-image: url(./i/expand.png);
  }

  .page-vouchers .toolTitle .expand {
    position: absolute;
    top: 7px;
    right: 0;
    width: 7px;
    height: 9px;
  }

  /**凭证列表表格*/
  .page-vouchers .page-content .contentPage {
    position: relative;
    height: 100%;
  }

  .page-vouchers .page-content .pageWrapper {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
  }

  .page-vouchers .entryContainer--unremarked:hover {
    box-shadow: 0 0 3px #5fbbfc;
  }

  .page-vouchers .entryContainer {
    position: relative;
    width: 100%;
    margin-top: 3px;
    margin-bottom: 7px;
    background-color: #fff;
    box-shadow: 0 0 2px 0 #5fbbfc;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .page-vouchers .page-content .containerBorder {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .page-vouchers .v-col-type {
    min-width: 30px;
    max-width: 30px;
    border-right: 1px solid #dadfe8;
  }

  .page-vouchers .page-content .circle {
    position: absolute;
    z-index: 1;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    display: inline-block;
  }

  .page-vouchers .page-content .cir-vouList {
    left: 10px;
    top: 14px;
  }

  .page-vouchers .page-content .vou-payment {
    background-color: #ffcb6a;
  }

  .page-vouchers .page-content .entryTitlebar, .page-vouchers .page-content .sumBar {
    position: relative;
    width: 100%;
    display: table;
  }

  .page-vouchers .page-content .entryTitlebar {
    border-bottom: 1px solid #dadfe8;
  }

  .page-vouchers [class|=col], .page-vouchers [class|=h] {
    box-sizing: border-box;
    position: relative;
    float: left;
    height: 40px;
    line-height: 40px;
    padding: 0 8px;
    border-right: 1px solid #dadfe8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .page-vouchers .page-content .col-index {
    width: 10%;
  }

  .page-vouchers .page-content .col-index > input {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    line-height: 40px;
    opacity: 0;
    border: none;
    outline: none;
    padding: 0 8px;
  }

  .page-vouchers .page-content .col-summary {
    width: 15%;
  }

  .page-vouchers .page-content .col-source {
    width: 75%;
    color: #b6c0d3;
  }

  .page-vouchers .page-content .entryOptsBox {
    position: absolute;
    right: 0;
    display: none;
  }

  .page-vouchers .page-content .entryOpt {
    position: relative;
    float: right;
    width: 65px;
    height: 40px;
  }

  .icon-voucher-delete {
    background-image: url(./i/delete.png);
  }

  .icon-voucher-edit {
    background-image: url(./i/edit.png);
  }

  .page-vouchers .page-content .entryOpt .optIcon {
    position: absolute;
    left: 0;
    top: 0;
  }

  .page-vouchers .page-content .entryOpt .optTag {
    position: absolute;
    right: 8px;
    font-size: 12px;
    line-height: 40px;
  }

  .page-vouchers .page-content .entryOpt .optTag--orange {
    color: #ff8a52;
  }

  .page-vouchers .page-content .entryContainer .entryBar {
    height: 40px;
    border-bottom: 1px solid #dadfe8;
  }

  .page-vouchers .page-content .col-subNum {
    width: 10%;
  }

  .page-vouchers .page-content .col-subName {
    width: 35%;
  }

  .page-vouchers .entryContainer--unremarked:hover .containerBorder {
    box-shadow: inset 0 0 0 2px #5fbbfc;
  }

  .page-vouchers .page-content .col-cur {
    width: 12%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: distribute;
    justify-content: space-around;
  }

  .page-vouchers .page-content .col-cur > p {
    font-size: 12px;
    line-height: 13px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .icon-sum {
    background-image: url(./i/sum.png);
  }

  .page-vouchers .page-content .sumIcon {
    position: absolute;
    top: 14px;
    left: 8px;
    width: 13px;
    height: 13px;
  }

  .page-vouchers .page-content .sumBar .col-name {
    padding-left: 30px;
  }

  .page-vouchers .page-content .sumBar .col-credit, .page-vouchers .page-content .sumBar .col-debit {
    color: #66b2ff;
  }

  .page-vouchers .remarkBar {
    position: relative;
    line-height: 40px;
    padding: 0 8px;
    border-top: 1px solid #dadfe8;
    border-right: 1px solid #dadfe8;
    color: #ff8a52;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .page-vouchers .remarkBar .remark-content {
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 880px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .page-vouchers .remarkBar input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 14px;
    padding: 0;
    border: none;
    background-color: #fff;
  }

  .page-vouchers .page-content .auditIndicator {
    position: absolute;
    top: 8px;
    left: 0;
    right: 0;
    margin: auto;
  }

  .page-vouchers .page-content .entryContainer:hover .span-source, .page-vouchers .page-content .span-source-on {
    color: #ffa448;
  }

  .page-vouchers .entryContainer:hover .entryOptsBox {
    display: block;
  }

  .icon-voucher-remark {
    background-image: url(./i/remark.png);
  }

  .icon-voucher-view {
    background-image: url(./i/view.png);
  }

  [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak, .ng-hide:not(.ng-hide-animate) {
    display: none !important;
  }
</style>
