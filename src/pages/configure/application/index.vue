<template>
  <div class="template-wrapper">
    <!--配置管理 -->
    <Content
      title="应用配置管理"
      @addFun="addFun"
      :data="allApplicationList" 
      :addIcon="true">
      <Table
        placeholder="应用配置名称"
        @changePage="changePage"
        @searchChange="searchChange"
        :tableData="allApplicationList" 
        :tatalPage="allApplicationListLength" 
        :columns="columns">
          <el-table-column
            label="操作"
            fixed="right"
            slot="tableTail"
            width="100">
            <template slot-scope="scope" >
              <div class="tableTail">
                <el-button type="primary" class="mr"  @click="handleEdit(scope.row)" plain slot="reference" size="small">编辑</el-button>
                <el-popconfirm
                  :title="`确定删除 ${scope.row.configName} 吗？`"
                  @onConfirm="handleDelete(scope.row)"
                  >
                    <el-button type="primary" plain slot="reference" size="small">删除</el-button>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </Table>
    </Content>
    <Dialog
      @close="close"
      :title="dialogTitle"
      :dialogShow="addNewApplicationFlag"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="配置名称" prop="configName">
          <el-input v-model.trim="ruleForm.configName" :disabled="dialogTitle === '编辑'"></el-input>
        </el-form-item>
        <el-form-item label="配置值" prop="configValue">
          <el-input v-model.trim="ruleForm.configValue"></el-input>
        </el-form-item>
        <el-form-item label="配置类型" prop="configType">
          <el-radio-group v-model="ruleForm.configType">
          <el-radio :label="0">字符串</el-radio>
          <el-radio :label='1'>集合</el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="配置描述" prop="configDesc">
          <el-input v-model.trim="ruleForm.configDesc"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="determineClick">确 定</el-button>
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
      dialogTitle: '新增配置',
      labelName: '',
      pageSize: 10,
      pageNum: 1,
      ruleForm: {
        configName: '',
        configType: 0,
        configValue: '',
        configDesc: '',
        configId: '',
      },
      rules: {
        configName: [
          { required: true, message: '请输入配置名称', trigger: 'blur' }
        ],
        configValue: [
          { required: true, message: '请输入配置描述', trigger: 'blur' }
        ],
        configType: [
          { required: true, trigger: 'blur' }
        ]
      },
      columns: [{
        prop: 'configName',
        label: '配置项名称'
      }, {
        prop: 'configValue',
        label: '配置项值'
      }, {
        prop: 'configType',
        label: '配置项类型',
        width: '90px',
        template: row => {
          return row.configType ? '集合' : '字符串'
        }
      }, {
        prop: 'configDesc',
        label: '配置项描述'
      }, {
        prop: 'createTime',
        width: '138px',
        label: '添加时间'
      }, {
        prop: 'updateTime',
        width: '138px',
        label: '更新时间'
      }]
    }
  },
  components: {
    Table,
    Dialog,
    Content
  },
  methods: {
    // 编辑
    handleEdit (value) {
      this.dialogTitle = '编辑'
      this.ruleForm.configName = value.configName
      this.ruleForm.configId = value.configId
      this.ruleForm.configValue = value.configValue
      this.ruleForm.configDesc = value.configDesc
      this.ruleForm.configType = value.configType
      this.changeNewApplicationFlag(true)
    },
    // 删除
    handleDelete (value) {
     this.deleteApplicationAjax(value.configId)
    },
    searchChange(value) {
      let option = {}
      this.configName = value
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.configName = this.configName
      this.getAllApplicationAjax(option)
    },
    changePage(value) {
      let option = {}
      this[value.split('-')[0]] = value.split('-')[1] / 1
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.configName = this.configName
      this.getAllApplicationAjax(option)
    },
    // 新增
    addFun() {
      this.dialogTitle = '新增配置'
      this.changeNewApplicationFlag(true)
    },
    determineClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.dialogTitle === '新增配置') {
            this.addNewApplicationAjax(this.ruleForm)
          } else {
            this.updateApplicationAjax(this.ruleForm)
          }
        } else {
          return false
        }
      })
    },
    close() {
      this.$refs.ruleForm.resetFields()
    },
    resetForm() {
      this.changeNewApplicationFlag(false)
    },
    ...mapActions({
      deleteApplicationAjax: 'configureModule/deleteApplicationAjax',
      addNewApplicationAjax: 'configureModule/addNewApplicationAjax',
      updateApplicationAjax: 'configureModule/updateApplicationAjax',
      getAllApplicationAjax: 'configureModule/getAllApplicationAjax',
    }),
    ...mapMutations({
      changeNewApplicationFlag: 'configureModule/ADD_NEW_APPLICATION' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
  },
  computed: {
    ...mapGetters({
      allApplicationList: 'configureModule/allApplicationList',
      allApplicationListLength: 'configureModule/allApplicationListLength',
      addNewApplicationFlag: 'configureModule/addNewApplicationFlag',
   })
  },
  mounted() {
    this.getAllApplicationAjax()
  }
}
</script>

