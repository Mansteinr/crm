<template>
  <div class="template-wrapper label-wrapper">
    <!--属性管理 -->
    <Content
      title="属性管理"
      @addFun="addFun"
      :data="allAttributeList" 
      :addIcon="true">
      <Table
        placeholder="属性名称"
        @changePage="changePage"
        @searchChange="searchChange"
        :tableData="allAttributeList" 
        :tatalPage="allAttributeListLength" 
        :columns="columns">
          <el-table-column
            label="操作"
            fixed="right"
            slot="tableTail"
            width="180">
            <template slot-scope="scope" >
              <el-button type="primary" class="mr"  @click="handleEdit(scope.row)" plain slot="reference" size="small">编辑</el-button>
              <el-popconfirm
                :title="`确定删除${scope.row.configName}？`"
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
      :dialogShow="addNewAttributeFlag"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="属性名称" prop="configName">
          <el-input v-model.trim="ruleForm.configName"></el-input>
        </el-form-item>
        <el-form-item label="属性描述" prop="configDesc">
          <el-input v-model.trim="ruleForm.configDesc"></el-input>
        </el-form-item>
         <el-form-item label="属性类型">
          <el-radio-group v-model="ruleForm.configType">
            <el-radio label='0'>全部</el-radio>
            <el-radio label='1'>部分</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="属性值" prop="configValue">
          <el-input v-model.trim="ruleForm.configValue"></el-input>
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
      dialogTitle: '新增属性',
      configName: '',
      pageSize: 10,
      pageNum: 1,
      ruleForm: {
        configName: '',
        configDesc: '',
        configType: '0',
        configValue: '',
      },
      rules: {
        configName: [
          { required: true, message: '请输入属性名称', trigger: 'blur' }
        ],
        configValue: [
          { required: true, message: '请输入属性值', trigger: 'blur' }
        ]
      },
      columns: [{
        prop: 'configName',
        label: '属性名称'
      },{
        prop: 'configDesc',
        label: '属性描述'
      },{
        prop: 'configType',
        label: '属性类型'
      },{
        prop: 'configValue',
        label: '属性值'
      },{
        prop: 'createTime',
        label: '创建时间'
      },{
        prop: 'updateTime',
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
      this.ruleForm.configId = value.configId
      Object.keys(this.ruleForm).map(k => {
        this.ruleForm[k] = value[k] + ''
      })
      this.changeNewAttributeFlag(true)
    },
    // 删除
    handleDelete (value) {
     this.deleteAttributeAjax(value.labelId)
    },
    searchChange(value) {
      let option = {}
      this.configName = value
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.configName = this.configName
      this.getAllAttributeAjax(option)
    },
    changePage(value) {
      let option = {}
      this[value.split('-')[0]] = value.split('-')[1] / 1
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.configName = this.configName
      this.getAllAttributeAjax(option)
    },
    // 新增
    addFun() {
      this.dialogTitle = '新增属性'
      this.changeNewAttributeFlag(true)
    },
    determineClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.dialogTitle === '编辑') {
            this.updateAttributeAjax(this.ruleForm)
          } else {
            this.addNewAttributeAjax(this.ruleForm)
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
      this.changeNewAttributeFlag(false)
    },
    ...mapActions({
      deleteAttributeAjax: 'configureModule/deleteAttributeAjax',
      addNewAttributeAjax: 'configureModule/addNewAttributeAjax',
      updateAttributeAjax: 'configureModule/updateAttributeAjax',
      getAllAttributeAjax: 'configureModule/getAllAttributeAjax',
    }),
    ...mapMutations({
      changeNewAttributeFlag: 'configureModule/ADD_NEW_ATTRIBUTE' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
  },
  computed: {
    ...mapGetters({
      allAttributeList: 'configureModule/allAttributeList',
      allAttributeListLength: 'configureModule/allAttributeListLength',
      addNewAttributeFlag: 'configureModule/addNewAttributeFlag',
   })
  },
  mounted() {
    this.getAllAttributeAjax()
  }
}
</script>


