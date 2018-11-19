<template>
    <div>
      <div class="module-content ng-scope booksList">
        <div class="module-content_wrapper">
            <div class="module-content_page page-vouchers">
            <div class="page-title">
                <p class="title" :class="{'title--on': tabType === 'list'}" @click="chooseTabType('list')">用户列表</p>
                <div class="title-gap"></div>
            </div>
            <!-- 列表-->
            <div class="page-tab ng-isolate-scope" v-if="tabType == 'list'">
                <!-- 页面工具 -->
                <div class="page-tools">
                    <div class="title-gap"></div>
                    <div class="searchInput">
                        <input class="search ng-pristine ng-untouched ng-valid ng-empty" type="text"
                                                    placeholder="搜索用户..." v-model.trim="userFilter"> 
                        <i class="search-icon icon-search icon-30" v-if="userFilter === ''"></i>
                        <i class="search-icon g-icon-close icon-30" v-if="userFilter.length > 0"
                        @click.stop="clearFilter"></i>
                    </div>
                    <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow" @click.stop="createVoucher">
                        <div><span class="ng-scope">新建用户</span></div>
                    </div>
                </div>
                <!-- 表单主体 -->
                <div class="page-content">
                    <div class="accountsBody">
                        <div class="accBody-tableHead-2">
                            <div class="tabHeadBox">
                                <div class="ng-scope span-25">
                                    <div  class="ng-binding">名字</div>
                                </div> 
                                <div  class="ng-scope span-25">
                                    <div class="ng-binding">手机号</div>
                                </div> 
                                <div  class="ng-scope span-35">
                                    <div class="ng-binding">邮箱</div>
                                </div> 
                                <div class="ng-scope span-15">
                                    <div class="ng-binding">操作</div>
                                </div> 
                            </div>
                        </div> 
                        <div class="accBody-tabBody ps-container ps-theme-default">
                            <div  class="tabBodyBox accTabBody ng-scope" v-for="item in userData.result" :key="item.id">
                                <div class="ng-binding span-25" v-text="item.adminName"></div> 
                                <div title="test" class="ng-binding span-25" v-text="item.phone"></div> 
                                <div class="ng-binding span-35" v-text="item.email"></div> 
                                <div class="span-15">
                                    <div class="entryOptsBox">
                                        <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                                        @click.stop="deleteUser(item)">
                                        <div class="optIcon icon-40 icon-voucher-delete"></div>
                                        <p class="optTag optTag--orange">删除</p></div>
                                    <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                                        @click.stop="showUserEditor(item)">
                                        <div class="optIcon icon-40 icon-voucher-edit"></div>
                                        <p class="optTag optTag--blue">编辑</p></div>
                                        <div class="button entryOpt ng-scope" @click.stop="showVoucherEditor(item)" v-if="1 != 1">
                                        <div class="optIcon icon-40 icon-voucher-view"></div> 
                                        <p class="optTag optTag--blue">查看</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <pageComponent :resultCount="userData.resultCount" :currentPage='pageNum' @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" style=""></pageComponent>
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
import api from "./api/index";
import utils from "../../utils";
import pageComponent from '@/components/pagination/paginationFull'
export default {
    data() {
        return {
            tabType: 'list',
            userFilter: '',
            userData: {},
            pageNum: 1,
            pageSize: 10,
            adminId: utils.dbGet("userInfo").id,
            token: utils.dbGet("userInfo").token,
        }
    },
    methods: {
        // 查询用户信息
        queryData() {
            let params = {
                search: this.userFilter,
                pageIndex: this.pageNum,
                pageSize: this.pageSize,
                token: this.token
            }
            console.log("查询用户列表数据入参：", JSON.stringify(params))
            api.queryUserList(params).then(res => {
                console.log("查询用户列表数据结果：", res.body)
                if (res.body.result == 0) {
                    this.userData = res.body.data
                }
            })
        },
        // 删除用户信息
        deleteUser(opt) {
            console.log("删除用户信息:", opt)
        },
        // 编辑用户信息
        showUserEditor(opt) {
            console.log("编辑用户信息:", opt)
        },
        handleCurrentChange(currentPage){
            console.log(`当前页:`+currentPage);
            if(currentPage && Number(currentPage)){
            this.currentPage = currentPage;
            this.config(this.currentPage,this.display);
            }
        },
        handleSizeChange(pageSize){
            console.log(`当前记录条数: `+pageSize);
            if(pageSize && Number(pageSize)){
            this.display = pageSize;
            this.config(this.currentPage,this.display);
            }
        },
    },
    created() {
        this.$emit("sel", { index: 1, type: "user" }); 
        this.queryData()
    },
    components: {
        pageComponent
    },
}
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

.module-content.booksList {
    top: 50px;
  }

/**标题*/
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
.page-vouchers .page-title .title--on, .page-vouchers .page-title .title--on:hover {
    border-bottom: 5px solid #5fbbfc;
}
/**标题右侧*/
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
.page-vouchers .searchInput .search-icon {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
.icon-search {
  background-image: url(./i/search.png);
}
.page-vouchers .funcBtn {
    margin-left: 10px;
    width: 100px;
}

/**列表*/
.accountsBody {
    width: 100%;
    height: 100%;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}

[class*=-tableHead-2] {
    height: 60px;
}

[class*=accBody-tableHead] {
    width: 100%;
    background: #5fbbfc;
    border-radius: 3px 3px 0 0;
    border-left: 1px solid #5fbbfc;
    border-right: 1px solid #5fbbfc;
}

[class*=-tableHead-2] .tabHeadBox>div {
    line-height: 60px;
}

.page-content .entryOptsBox {
    position: absolute;
    right: 50%;
    top: 0;
    display: block;
    margin: 0 -65px 0;
}
.page-content .entryOpt {
    position: relative;
    float: right;
    width: 65px;
    height: 40px;
}
.page-content .entryOpt .optIcon {
    position: absolute;
    left: 0;
    top: 0;
}
.icon-voucher-edit {
  background-image: url(./i/edit.png);
}

.icon-voucher-delete {
  background-image: url(./i/delete.png);
}

.icon-voucher-view {
  background-image: url(./i/view.png);
}

.page-content .entryOpt .optTag {
    position: absolute;
    right: 8px;
    font-size: 12px;
    line-height: 40px;
}

.page-content .entryOpt .optTag--orange {
    color: #ff8a52;
}

.page-content .entryOpt .optTag--blue {
    color: #5fbbfc;
}
</style>



