<template>
  <div class="user-info-template template-wrapper">
    <!-- 左侧 -->
    <div class="template-left">
      <div class="template-left-title">
        部门列表
        <el-tooltip class="item" effect="dark" content="添加一级部门" placement="left-start">
          <el-button icon="el-icon-plus" @click="addDepartment" size="mini"></el-button>
        </el-tooltip>
      </div>
      <div class="template-left-container">
        <el-tree
          :highlight-current="true"
          :data="departmentList"
          node-key="id"
          :expand-on-click-node="false"
          default-expand-all
        >
          <span 
            class="custom-tree-node"  
            @click="handleClcik(data)" 
            @mouseover="mouseover(node.data.id)" 
            @mouseout="mouseout(node.data.id)" 
            slot-scope="{ node, data }"
            :class="{ 'active': node.data.id === clickId }"
          >
            <span>{{ node.label }}</span>
            <span style="display:none;" :id="`operate-${data.id}`" class="operate-tools">
              <el-tooltip class="item" effect="dark" content="添加子级部门" placement="left-start">
                <i @click="addDepartment(data)" class="el-icon-circle-plus-outline"></i>
              </el-tooltip>
              <i class="el-icon-delete" @click="deleteDepartment(data)" slot="reference"></i>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="template-right">
      <Table
        placeholder="用户姓名"
        :showPlusIcon="true"
        @addFun="addFun"
        @searchChange="searchChange"
        @changePage="changePage"
        :tableData="allUserList" 
        :tatalPage="allUserListLength" 
        :columns="columns">
         <el-table-column
            label="操作"
            fixed="right"
            slot="tableTail"
            width="245">
            <template slot-scope="scope" >
              <div class="tableTail">
                <el-button type="primary" class="mr"  @click="handleEdit(scope.row)" plain slot="reference" size="small">编辑</el-button>
                <el-popconfirm
                class="mr"
                  :title="`确定删除 ${scope.row.userName} 吗？`"
                  @onConfirm="handleDelete(scope.row)"
                  >
                    <el-button type="primary" plain slot="reference" size="small">删除</el-button>
                </el-popconfirm>
                <el-popconfirm
                class="mr"
                  :title="`确定更改启用状态吗？`"
                  @onConfirm="changeEnable(scope.row)"
                  >
                    <el-button type="primary" plain slot="reference" size="small">更改状态</el-button>
                </el-popconfirm>
                <el-button class="mr" type="primary"  @click="resetAuth(scope.row)"  plain slot="reference" size="small">重置密码</el-button>
              </div>
            </template>
          </el-table-column>
        </Table>
    </div>
    <Dialog
      @close="close('ruleForm')"
      :title="dialogTitle"
      :dialogShow="addNewDepartmentFlag"
    >
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model.trim="ruleForm.deptName"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="determineClick">确 定</el-button>
      </div>
    </Dialog>
    <Dialog
      @close="close('userInfoForm')"
      :title="dialogUserTitle"
      :dialogShow="addNewUserFlag"
    >
      <el-form :model="userInfoForm" ref="userInfoForm" :rules="userInfoFormRules">
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model.trim="userInfoForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model.trim="userInfoForm.loginName"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptId">
          <el-cascader
            v-model="userInfoForm.deptId"
            :options="departmentList"
            :show-all-levels="false"
            :props="defaultParams"></el-cascader>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="userInfoForm.roleId" placeholder="请选择角色名称">
            <el-option
              v-for="v in allBasicRoleList"
              :key="v.roleId"
              :label="v.roleName"
              :value="v.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model.trim="userInfoForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="auth">
          <el-input v-model.trim="userInfoForm.auth"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="userInfoForm.enable">
            <el-radio :label='true'>是</el-radio>
            <el-radio :label='false'>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="boss登录名" prop="bossLoginName">
          <el-input v-model.trim="userInfoForm.bossLoginName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="userInfoForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="resetForm('userInfoForm')">取 消</el-button>
        <el-button type="primary" @click="determineUserInfo">确 定</el-button>
      </div>
    </Dialog>
    <Dialog
      @close="close('resetAuthForm')"
      title="修改密码"
      :dialogShow="resetAuthFormFlag"
    >
      <el-form :model="resetAuthForm" ref="resetAuthForm" :rules="resetAuthFormRules">
        <el-form-item class="auth" label="新密码" prop="auth">
          <el-input :type="`${isShowPassword ? 'text' : 'password'}`" v-model.trim="resetAuthForm.auth" placeholder="请输入新密码">
          </el-input>
          <span @click="togglePassword" :class="`icon iconfont ${isShowPassword ? 'icon-xianshi' : 'icon-weibiaoti-_huabanfuben'}`"></span>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="resetForm('resetAuthForm')">取 消</el-button>
        <el-button type="primary" @click="determineAuthClick">确 定</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import md5 from "js-md5"
import Table from '@/components/Table'
import Dialog from '@/components/Dialog'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      defaultParams: {
        value: 'id'
      },
      clickId: '',
      isShowPassword: false,
      dialogTitle: '添加一级部门',
      dialogUserTitle: '添加用户信息',
      ruleForm: {
        deptName: '',
        parentId: '0'
      },
      resetAuthForm: {
        auth: '',
        userId: ''
      },
      userInfoForm: {
        userName: '',
        roleId: '',
        mobile: '',
        loginName: '',
        enable: true,
        deptId: '',
        bossLoginName: '',
        auth: '',
        email: '',
      },
      node: null,
      deptId: '',
      rules: {
        deptName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      },
      resetAuthFormRules: {
        auth: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      },
      userInfoFormRules: {
        auth: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ],
        enable: [
          { required: true }
        ],
        loginName: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
      },
      columns: [{
        prop: 'userName',
        minWidth: "80px",
        label: '用户姓名'
      }, {
        prop: 'loginName',
        minWidth: "100px",
        label: '登录名'
      }, {
        prop: 'mobile',
        minWidth: "100px",
        label: '手机号'
      }, {
        prop: 'deptName',
        minWidth: "75px",
        label: '所属部门'
      }, {
        prop: 'roleName',
        minWidth: "55px",
        label: '角色'
      }, {
        prop: 'enable',
        minWidth: "75px",
        label: '是否启用',
        template: row => {
          return `<div class=${row.enable ? 'success' : 'danger'}>${row.enable ? '是' : '否'}</div>`
        }
      }, {
        prop: 'bossLoginName',
        minWidth: "100px",
        label: 'boss登陆名'
      }, {
        prop: 'email',
        label: '邮箱'
      }]
    }
  },
  components: {
    Table,
    Dialog
  },
  methods: {
    togglePassword() {
      this.isShowPassword = !this.isShowPassword
    },
    resetAuth(value) { // 更新密码
      this.resetAuthForm.userId = value.userId
      this.changeResetAuthFormFlag(true)
    },
    changeEnable(value) { // 启用状态
      let options = {}
      options.id = value.userId
      options.enable = !value.enable
      this.changeEnableAjax(options)
    },
    handleEdit(value) { // 编辑
      this.dialogUserTitle = '编辑'
      this.changeNewUserFlag(true)
      Object.keys(this.userInfoForm).map(k => {
        this.userInfoForm[k] = value[k]
      })
    },
    handleDelete(value) {
      this.deleteUserAjax(value.userId)
    },
    addFun() {
      this.dialogUserTitle = '新增人员'
      this.changeNewUserFlag(true)
    },
    close(fromName) {
      this.$refs[fromName].resetFields()
    },
    searchChange(val) {
      this.getAllUsersAjax({
        userName: val
      })
    },
    changePage(value) {
      this.getAllUsersAjax(value)
    },
    mouseover(id) {
      document.getElementById(`operate-${id}`).style.display = 'block'
    },
    mouseout(id) {
      document.getElementById(`operate-${id}`).style.display = 'none'
    },
    ...mapActions({
      getAllUsersAjax: 'configureModule/getAllUsersAjax',
      deleteDepartmentAjax: 'configureModule/deleteDepartmentAjax',
      addNewDepartmentAjax: 'configureModule/addNewDepartmentAjax',
      getAllDepartmentAjax: 'configureModule/getAllDepartmentAjax',
      deleteUserAjax: 'configureModule/deleteUserAjax',
      addNewUserAjax: 'configureModule/addNewUserAjax',
      updateUserAjax: 'configureModule/updateUserAjax',
      getAllBasicRoleAjax: 'basics/getAllBasicRoleAjax',
      resetAuthAjax: 'configureModule/resetAuthAjax',
      changeEnableAjax: 'configureModule/changeEnableAjax',
    }),
    ...mapMutations({
      changeNewUserFlag: 'configureModule/ADD_NEW_USERINFO', // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      changeNewDepartmentFlag: 'configureModule/ADD_NEW_DEPAERMENT', 
      changeResetAuthFormFlag: 'configureModule/REST_AUTH', 
    }),
    addDepartment(node) {
      this.changeNewDepartmentFlag(true)
      this.node = node
      if(node.parentId) {
        this.dialogTitle = '添加子级部门'
      } else {
        this.dialogTitle = '添加一级部门'
      }
    },
    // 删除部门
    deleteDepartment(data) {
      this.$confirm(`确定删除${data.label}部门吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteDepartmentAjax(data.id)
      }).catch(err => {
        Message({
          type: 'info',
          message: err.message || '操作取消'
        })     
      })
    },
    determineClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.node) {
            this.ruleForm.parentId = this.node.id
          }
          if(this.dialogTitle === '添加一级部门') {
            this.ruleForm.parentId = '0'
          }
          this.addNewDepartmentAjax(this.ruleForm)
          this.node = null
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    determineAuthClick() {
      this.$refs.resetAuthForm.validate(valid => {
        if (valid) {
          this.resetAuthForm.auth = md5(this.resetAuthForm.auth)
          this.resetAuthAjax(this.resetAuthForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.changeNewUserFlag(false)
      this.changeNewDepartmentFlag(false)
      this.changeResetAuthFormFlag(false)
    },
    // 点击查询部门的人员
    handleClcik(data) {
      this.deptId = data.id
      this.clickId = data.id
      this.getAllUsersAjax({
        deptId: data.id
      })
    },
    determineUserInfo() {
       this.$refs.userInfoForm.validate(valid => {
        if (valid) {
          this.userInfoForm.deptId = this.userInfoForm.deptId.pop()
          this.userInfoForm.auth = md5(this.userInfoForm.auth)
          
          if(this.dialogUserTitle === '编辑') {
            this.updateUserAjax(this.userInfoForm)
          } else {
            this.addNewUserAjax(this.userInfoForm)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      allUserList: 'configureModule/allUserList',
      departmentList: 'configureModule/departmentList',
      addNewDepartmentFlag: 'configureModule/addNewDepartmentFlag',
      allUserListLength: 'configureModule/allUserListLength',
      addNewUserFlag: 'configureModule/addNewUserFlag',
      allBasicRoleList: 'basics/allBasicRoleList',
      resetAuthFormFlag: 'configureModule/resetAuthFormFlag',
   }),
  },
  mounted() {
    this.getAllBasicRoleAjax()
    this.getAllDepartmentAjax()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/css/variable'
.user-info-template
  display flex
  height calc(100% - 100px)
  overflow hidden
  &>div:not(.el-dialog__wrapper)
    height 100%
    border-radius 8px
    box-shadow 0 4px 8px rgba(0,0,0,.1)
    background white
  .template-left
    flex 2
    margin-right 10px
    min-width 150px
    .template-left-title
      position relative
      height 40px
      line-height 40px
      text-align left
      padding-left 15px
      font-size 14px
      border-bottom 1px dotted gray
      .el-button
        position absolute
        right 15px
        top 5px
    .template-left-container
      height calc(100% - 40px)
      overflow auto
      .el-tree-node, .el-tree-node__content
        min-height 40px
        font-size 12px
      .custom-tree-node
        display flex
        width 100%
        &:hover
          color #409eff
        &>span
          &:first-child
            flex 2
            line-height 30px
          &:last-child
            flex 1
        .operate-tools
          display flex
          flex-wrap nowrap 
          i 
            flex 1
            width 50%
            height 100%
            line-height 30px
            text-align center
            font-size 20px
  .template-right
    flex 8
    padding 30px 10px 10px 10px
  .el-form-item
    display flex
    label 
      flex 1
      text-align left
    .el-form-item__content
      flex 4
  .is-current > .el-tree-node__content
  .el-tree-node:focus > .el-tree-node__content 
      background-color rgba(64,158,255, 0.6) !important
      span 
        color white
      .is-leaf:not(.expanded)
        color transparent !important
</style>
