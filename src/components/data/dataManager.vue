<template>
    <div>
      <div class="module-content ng-scope booksList">
        <div class="module-content_wrapper">
            <div class="module-content_page page-vouchers">
            <div class="page-title">
                <p class="title" :class="{'title--on': tabType === 'list'}" @click="chooseTabType('list')">数据列表</p>
                <div class="title-gap"></div>
            </div>
            <!-- 列表-->
            <div class="page-tab ng-isolate-scope" v-if="tabType == 'list'">
                <!-- 页面工具 -->
                <div class="page-tools">
                    <div class="title-gap"></div>
                    <div class="searchInput">
                        <input class="search" type="text" placeholder="搜索数据..." v-model.trim="userFilter" @keyup.enter="searchByKey" @keyup="searchByKey"> 
                        <i class="search-icon icon-search icon-30" v-if="userFilter === ''"></i>
                        <i class="search-icon g-icon-close icon-30" v-if="userFilter.length > 0"
                        @click.stop="clearFilter"></i>
                    </div>
                    <div class="funcBtn com-button anime ng-isolate-scope com-button--hollow" @click.stop="createUser">
                        <div><span class="ng-scope">添加数据</span></div>
                    </div>
                </div>
                <!-- 表单主体 -->
                <div class="page-content">
                    <div class="accountsBody">
                        <div class="accBody-tableHead-2">
                            <div class="tabHeadBox">
                                <div class="ng-scope span-25">
                                    <div  class="ng-binding">数据类型</div>
                                </div> 
                                <div  class="ng-scope span-20">
                                    <div class="ng-binding">手机号码</div>
                                </div> 
                                <div  class="ng-scope span-35">
                                    <div class="ng-binding">电子邮箱</div>
                                </div> 
                                <div class="ng-scope span-20">
                                    <div class="ng-binding">操作</div>
                                </div> 
                            </div>
                        </div> 
                        <div class="accBody-tabBody ps-theme-default" id="defaultComponent">
                            <div  class="tabBodyBox accTabBody ng-scope" v-for="item in userData.result" :key="item.id">
                                <div class="ng-binding span-25" v-text="item.adminName"></div> 
                                <div title="test" class="ng-binding span-20" v-text="item.phone"></div> 
                                <div class="ng-binding span-35" v-text="item.email"></div> 
                                <div class="span-20">
                                            <div class="entryOptsBox">
                                                <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canDeleteVoucher(v)"
                                                @click.stop="showDeleteUser(item)">
                                                    <div class="optIcon icon-40 icon-voucher-delete"></div>
                                                    <p class="optTag optTag--orange">删除</p>
                                                </div>
                                                <div class="button entryOpt ng-scope" ng-if="!v.vAudited && canEditVoucher(v)"
                                                    @click.stop="showUserEditor(item)">
                                                    <div class="optIcon icon-40 icon-voucher-edit"></div>
                                                    <p class="optTag optTag--blue">编辑</p>
                                                </div>
                                                <div class="button entryOpt ng-scope" @click.stop="showEditorUserPwd(item)" v-if="1 != 1">
                                                    <div class="optIcon icon-40 icon-voucher-edit"></div> 
                                                    <p class="optTag optTag--blue">改密</p> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <pageComponent :resultCount="userData.resultCount" :currentPage='pageNum' :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" v-if="userData.result && userData.result.length > 0" style="position: fixed;bottom:2rem;left:310px;"></pageComponent>
                                    <div class="dataIsNull" v-if="!userData.result || userData.result.length == 0">暂无用户信息</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 添加用户信息蒙层 -->
        <div class="site-mask anime site-mask--shade" v-if="addAccountPop">
            <div class="site-popup anime pop-container site-popup--expand"><p v-text="maskTitle"></p>
                <div class="btn-closePop" title="关闭" @click.stop="toggleAddAccountPop('hide')"></div>
                <div class="messageBox">
                    <div class="message-title">用户名称</div>
                    <div class="message-input">
                        <input type="text" v-model.trim="submitAddAccInfo.adminName" maxlength="30">
                        <div class="icon-required"></div>
                    </div>
                </div>
                <div class="messageBox">
                    <div class="message-title">手机号码</div>
                    <div class="message-input">
                        <input type="text" v-model.trim="submitAddAccInfo.phone" maxlength="11">
                        <div class="icon-required"></div>
                    </div>
                </div>
                <div class="messageBox">
                    <div class="message-title">电子邮箱</div>
                    <div class="message-input">
                        <input type="text" v-model.trim="submitAddAccInfo.email" maxlength="30">
                        <div class="icon-required"></div>
                    </div>
                </div>
                <div class="messageBox" v-if="!submitAddAccInfo.id">
                    <div class="message-title">登录密码</div>
                    <div class="message-input">
                        <input type="password" v-model.trim="submitAddAccInfo.passWord" maxlength="18">
                        <div class="icon-required"></div>
                    </div>
                </div>
                <div class="messageBox submitBox">
                    <div class="message-title">
                        <div class="btn-cancel" @click.stop="toggleAddAccountPop('hide')">取消</div>
                    </div>
                    <div class="message-input">
                        <div class="btn-submit anime" @click.stop="addUser">确定</div>
                        <div class="size-hint ng-binding" v-text="hint"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 更新用户登录密码弹层 -->
        <div class="site-mask anime site-mask--shade" v-if="showUserPassWord">
            <div class="site-popup anime pop-container site-popup--expand"><p>更新登录密码</p>
                <div class="btn-closePop" title="关闭" @click.stop="toggleShowUserPassWord('hide')"></div>
                <div class="messageBox">
                    <div class="message-title">原密码</div>
                    <div class="message-input">
                        <input type="password" v-model.trim="pwd.old" maxlength="18">
                        <div class="icon-required"></div>
                    </div>
                </div>
                <div class="messageBox">
                    <div class="message-title">新密码</div>
                    <div class="message-input">
                        <input type="password" v-model.trim="pwd.new" maxlength="18">
                        <div class="icon-required"></div>
                    </div>
                </div>
                <div class="messageBox submitBox">
                    <div class="message-title">
                        <div class="btn-cancel" @click.stop="toggleShowUserPassWord('hide')">取消</div>
                    </div>
                    <div class="message-input">
                        <div class="btn-submit anime" @click.stop="changePwd">确定</div>
                        <div class="size-hint ng-binding" v-text="pwdhint"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 删除确认 -->
        <div class="site-mask anime ng-isolate-scope site-mask--shade" v-if="showCanDel"> 
            <div class="site-popup anime popup-confirm flex--column site-popup--expand"> 
                <div class="site-popup_head"> 
                    <div class="site-popup_title">财税通提醒您：</div> 
                </div> 
                <div class="site-popup_body"> 
                    <div class="site-popup_type"> 
                        <div class="typeIcon g-icon-warn"></div> 
                        <p class="typeTitle typeTitle--warn ng-binding">确定要删除手机号为“ {{submitAddAccInfo.phone}} ”的用户吗？</p> 
                    </div> 
                </div> 
                <div class="site-popup_footer"> 
                    <div class="btn--cancel com-button anime ng-isolate-scope com-button--cancel" @click.stop="cancelDeleteUser"> 
                        <div>
                            <span class="ng-scope">否</span>
                        </div> 
                    </div> 
                    <div class="btn--ok com-button anime ng-isolate-scope com-button--ok" @click.stop="deleteUser"> 
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
import api from "./api/index";
import utils from "../../utils";
import pageComponent from "@/components/pagination/paginationFull";
export default {
  data() {
    return {
      tabType: "list",
      userFilter: "",
      userData: {},
      pageNum: 1,
      pageSize: 10,
      adminId: utils.dbGet("userInfo").id,
      token: utils.dbGet("userInfo").token,
      // 需要操作的弹层对象
      submitAddAccInfo: {},
      // 是否显示弹层
      addAccountPop: false,
      // 弹层错误信息
      hint: '',
      // 弹层标题
      maskTitle: '添加用户',
      // 是否可以删除弹层展示
      showCanDel: false,
      // 修改密码弹层展示
      showUserPassWord: false,
      pwd: {
          old: '',
          new: ''
      },
      pwdhint: '',
    };
  },
  methods: {
    // 查询用户信息
    queryData(params) {
        this.userData = {}
      console.log("查询用户列表数据入参：", JSON.stringify(params));
      api.queryUserList(params).then(res => {
        console.log("查询用户列表数据结果：", res.body);
        if (res.body.result == 0) {
          this.userData = res.body.data;
        }
      });
    },
    createUser() {
        this.submitAddAccInfo = {}
        this.maskTitle = '添加用户'
        this.toggleAddAccountPop('show')
    },
    // 添加用户
    addUser() {
        console.log("添加用户", this.submitAddAccInfo)
        if (this.submitAddAccInfo.id) {
            let params = this.submitAddAccInfo
            params.token = this.token
            console.log("添加用户信息入参:", JSON.stringify(params))
            if (this.checkData(params, 'update')) {
                api.update(params).then(res => {
                    console.log("添加用户信息结果：", res.body)
                    if (res.body.result == 0) {
                        this.toggleAddAccountPop('hide')
                        this.queryData({
                            pageIndex: this.pageNum,
                            pageSize: this.pageSize,
                            token: this.token
                        })
                    } else {
                        this.hint = res.body.msg
                    }
                })
            }
        } else {
            let params = this.submitAddAccInfo
            params.token = this.token
            if (this.checkData(params, 'create')) {
                console.log("添加用户信息入参:", JSON.stringify(params))
                api.backInsert(params).then(res => {
                    console.log("添加用户信息结果：", res.body)
                    if (res.body.result == 0) {
                        this.toggleAddAccountPop('hide')
                        this.queryData({
                            pageIndex: this.pageNum,
                            pageSize: this.pageSize,
                            token: this.token
                        })
                    } else {
                        this.hint = res.body.msg
                    }
                })
            }
        }
    },
    // 校验基础数据的准确性
    checkData(opt, type) {
        console.log("校验基础数据的准确性：", opt, type)
        let flag = false
        if (opt) {
            if (utils.valPhone(opt.phone)) {
                if (type == 'create') {
                    if (opt.passWord.length >= 6) {
                        flag = true
                    } else {
                        this.hint = '登录密码的长度至少6位'
                    }
                }
            } else {
                this.hint = '请输入正确的手机号码'
            }
        }
        return flag
    },
    // 删除前置提示
    showDeleteUser(opt) {
        this.showCanDel = true
        this.submitAddAccInfo = opt
    },
    // 取消删除
    cancelDeleteUser() {
        console.log("取消删除:", this.submitAddAccInfo)
        this.submitAddAccInfo = {}
        this.showCanDel = false
    },
    // 删除用户信息
    deleteUser() {
        this.showCanDel = false
        let params = this.submitAddAccInfo
        params.token = this.token
        console.log("删除用户信息入参:", JSON.stringify(params))
        api.delete(params).then(res => {
            console.log("删除用户信息结果：", res.body)
            if (res.body.result == 0) {
                this.queryData({
                            pageIndex: this.pageNum,
                            pageSize: this.pageSize,
                            token: this.token
                        })
            } else {
                this.$emit('error', res.body.msg)
            }
        })
    },
    // 编辑用户信息
    showUserEditor(opt) {
      console.log("编辑用户信息:", opt);
      this.maskTitle = '编辑用户'
      this.submitAddAccInfo = opt
      this.toggleAddAccountPop('show')
    },
    // 分页
    handleCurrentChange(currentPage) {
      console.log('当前页:', currentPage);
      if (currentPage && Number(currentPage)) {
        this.pageNum = currentPage
        let params = {
            search: this.userFilter,
            pageIndex: this.pageNum,
            pageSize: this.pageSize,
            token: this.token
        }
        this.queryData(params)
      }
    },
    // 分页
    handleSizeChange(pageSize) {
      console.log('当前记录条数: ', pageSize);
      if (pageSize && Number(pageSize)) {
        this.pageSize = pageSize
        this.pageNum = 1
        let params = {
            search: this.userFilter,
            pageIndex: this.pageNum,
            pageSize: this.pageSize,
            token: this.token
        }
        this.queryData(params)
      }
    },
    // 隐藏显示弹层
    toggleAddAccountPop(type) {
        this.hint = ''
        if (type) {
            if (type == 'show') {
                this.addAccountPop = true
            } else {
                this.addAccountPop = false
            }
        } else {
            this.addAccountPop = false
        }
    },
    // 清空搜索关键词
    clearFilter() {
        this.userFilter = ''
    },
    // 搜索
    searchByKey() {
        this.pageNum = 1
        let params = {
        search: this.userFilter,
        pageIndex: this.pageNum,
        pageSize: this.pageSize,
        token: this.token
      }
    this.queryData(params);
    },
    // 展示修改密码弹层
    toggleShowUserPassWord(type) {
        this.pwdhint = ''
        if (type) {
            if (type == 'show') {
                this.showUserPassWord = true
            } else {
                this.showUserPassWord = false
            }
        } else {
            this.showUserPassWord = false
        }
    },
    // 展示改密弹层
    showEditorUserPwd(opt) {
        this.toggleShowUserPassWord('show')
        this.submitAddAccInfo = opt
    },
    // 更新登录密码
    changePwd() {
        if (this.checkPwd(this.pwd)) {
            let params = {
                id: this.submitAddAccInfo.id,
                token: this.token,
                oldPassWord: this.pwd.old,
                newPassWord: this.pwd.new
            }
            console.log("更新登录密码入参：", JSON.stringify(params))
            api.updateAdminPassWord(params).then(res => {
                console.log("更新登录密码结果：", res.body)
                if (res.body.result == 0) {
                    this.toggleShowUserPassWord('hide')
                    this.$emit('success', res.body.msg)
                } else {
                    this.pwdhint = res.body.msg
                }
            })
        }
    },
    // 更新密码前置校验
    checkPwd(pwd) {
        let flag = false
        if (pwd) {
            if (pwd.old.length > 0) {
                if (pwd.old == pwd.new) {
                    this.pwdhint = '新密码不能跟原密码相同'
                } else {
                    flag = true
                }
            } else {
                this.pwdhint = '原密码不能为空'
            }
        }
        return flag
    }
  },
  created() {
    this.$emit("sel", { index: 1, type: "data" });
    let params = {
        pageIndex: this.pageNum,
        pageSize: this.pageSize,
        token: this.token
      }
    this.queryData(params);
  },
  components: {
    pageComponent
  }
};
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
.page-vouchers .page-title .title--on,
.page-vouchers .page-title .title--on:hover {
  border-bottom: 5px solid #5fbbfc;
}
.page-vouchers .page-title .title--on,
.page-vouchers .page-title .title--on:hover {
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

.accBody-tabBody {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
}

[class*="-tableHead-2"] {
  height: 60px;
}

[class*="accBody-tableHead"] {
  width: 100%;
  background: #5fbbfc;
  border-radius: 3px 3px 0 0;
  border-left: 1px solid #5fbbfc;
  border-right: 1px solid #5fbbfc;
}

[class*="-tableHead-2"] .tabHeadBox > div {
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


/**添加组件样式*/
 .pop-container .btn-closePop {
    background: url(../../views/home/i/closePop.png) no-repeat 50%;
  }
  .message-input .icon-required {
    background: url(../../views/home/i/required.png) no-repeat 50%;
    background-size: 7px;
  }
  .popSelectBox .icon-select-radio-on {
    background: url(../../views/home/i/selected.png) no-repeat 50%;
  }
  .popSelectBox .icon-select-radio-off {
    background: url(../../views/home/i/unselected.png) no-repeat 50%;
  }

  .dataIsNull{
    padding-top: 160px;
    background: url(./i/notFound.png) no-repeat center 0;
  }
  /**隐藏滚动条*/
  #defaultComponent::-webkit-scrollbar, #ui-et-807744::-webkit-scrollbar {
    width: 0 !important;
  }
  #defaultComponent{
    -ms-overflow-style: none !important;
    overflow: -moz-scrollbars-none !important;
    overflow: auto;
  }
</style>