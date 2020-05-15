<template>
  <div class="template-wrapper">
    <!--角色管理 -->
    <Content
    @addFun="addFun"
    :data="allRoleList"
    title="角色管理"
    :addIcon="true">
      <Table
        placeholder="角色名称"
        @changePage="changePage"
        @searchChange="searchChange"
        :tableData="allRoleList" 
        :tatalPage="allRoleListLength" 
        :columns="columns">
          <el-table-column
            label="操作"
            fixed="right"
            slot="tableTail"
            width="280">
            <template slot-scope="scope" >
              <el-button type="primary" class="mr"  @click="handleEdit(scope.row)" plain slot="reference" size="small">编辑</el-button>
              <el-button type="primary" class="mr"  @click="bindMeun(scope.row)" plain slot="reference" size="small">绑定菜单</el-button>
              <el-popconfirm
                :title="`确定删除 ${scope.row.roleName} 吗？`"
                @onConfirm="handleDelete(scope.row)"
                >
                  <el-button type="primary" plain slot="reference" size="small">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </Table>
    </Content>
    <Dialog
      @close="close"
      :title="dialogTitle"
      :dialogShow="addNewRoleFlag"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="数据范围">
          <el-radio-group v-model="ruleForm.dataRange">
            <el-radio :label='0'>所有</el-radio>
            <el-radio :label='1'>个人数据</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model.trim="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model.trim="ruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
        <div class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="determineClick">确 定</el-button>
      </div>
    </Dialog>
    <Dialog
      title="绑定菜单"
      :dialogShow="bindMeunFlag"
    >
        <el-tree
          ref="tree"
          :data="hasBindMenuList"
          show-checkbox
          node-key="id"
          highlight-current
          :default-checked-keys="defaultCheckedKeys"
          default-expand-all>
        </el-tree>
        <div class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Table from '@/components/Table'
import Dialog from '@/components/Dialog'
import Content from '@/components/Content'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialogTitle: '新增角色',
      roleName: '',
      pageSize: 10,
      pageNum: 1,
      roleId: '',
      ruleForm: {
        dataRange: 0,
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
      },
      columns: [{
        prop: 'roleName',
        label: '角色名称'
      },{
        prop: 'roleDesc',
        label: '角色说明'
      },{
        prop: 'dataRange',
        label: '数据范围',
        template: row => {
          return row.dataRange ? '个人数据' : '所有'
        }
      }]
    }
  },
  components: {
    Table,
    Dialog,
    Content
  },
  methods: {
    // 绑定菜单
    bindMeun(value) {
      this.roleId = value.roleId
      this.changeBindMeunFlag(true)
      this.hasBindMenuAjax(value.roleId)
    },
    getCheckedKeys() {
      let option = {}
      option.roleId = this.roleId
      option.menuIds = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      this.bindMenuAjax(option)
    },
    // 编辑
    handleEdit (value) {
      this.dialogTitle = '编辑'
      this.ruleForm.dataRange = value.dataRange
      this.ruleForm.roleId = value.roleId
      this.ruleForm.roleName = value.roleName
      this.ruleForm.roleDesc = value.roleDesc
      this.changeNewRolelFlag(true)
    },
    // 删除
    handleDelete (value) {
     this.deleteRoleAjax(value.roleId)
    },
    searchChange(value) {
      let option = {}
      this.roleName = value
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.roleName = this.roleName
      this.getAllRoleAjax(option)
    },
    changePage(value) {
      let option = {}
      this[value.split('-')[0]] = value.split('-')[1] / 1
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.roleName = this.roleName
      this.getAllRoleAjax(option)
    },
    close() {
      this.$refs.ruleForm.resetFields()
    },
    dialogCancel() {
      this.changeBindMeunFlag(false)
    },
    // 新增
    addFun() {
      this.dialogTitle = '新增角色'
      this.changeNewRolelFlag(true)
    },
    determineClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.dialogTitle === '新增角色') {
            this.addNewRoleAjax(this.ruleForm)
          } else {
            this.updateRoleAjax(this.ruleForm)
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.changeBindMeunFlag(false)
      this.changeNewRolelFlag(false)
    },
    ...mapActions({
      deleteRoleAjax: 'configureModule/deleteRoleAjax',
      addNewRoleAjax: 'configureModule/addNewRoleAjax',
      updateRoleAjax: 'configureModule/updateRoleAjax',
      getAllRoleAjax: 'configureModule/getAllRoleAjax',
      hasBindMenuAjax: 'configureModule/hasBindMenuAjax',
      bindMenuAjax: 'configureModule/bindMenuAjax',
    }),
    ...mapMutations({
      changeNewRolelFlag: 'configureModule/ADD_NEW_ROLE',
      changeBindMeunFlag: 'configureModule/BIND_MEUN',
    }),
  },
  computed: {
    ...mapGetters({
      allRoleList: 'configureModule/allRoleList',
      allRoleListLength: 'configureModule/allRoleListLength',
      addNewRoleFlag: 'configureModule/addNewRoleFlag',
      bindMeunFlag: 'configureModule/bindMeunFlag',
      hasBindMenuList: 'configureModule/hasBindMenuList',
      defaultCheckedKeys: 'configureModule/defaultCheckedKeys',
   })
  },
  mounted() {
    this.getAllRoleAjax()
  }
}
</script>
