<template>
  <div class="template-wrapper label-wrapper">
    <!--标签管理 -->
    <Content
    @addFun="addFun"
    :data="allLabelList" 
    :addIcon="true">
      <Table
        placeholder="标签名称"
        @changePage="changePage"
        @searchChange="searchChange"
        :tableData="allLabelList" 
        :tatalPage="allLabelListLength" 
        :columns="columns">
          <el-table-column
            label="操作"
            fixed="right"
            slot="tableTail"
            width="180">
            <template slot-scope="scope" >
              <el-button type="primary" class="mr"  @click="handleEdit(scope.row)" plain slot="reference" size="small">编辑</el-button>
              <el-popconfirm
                :title="`确定删除 ${scope.row.labelName} 吗？`"
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
      :dialogShow="addNewLabelFlag"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="标签名称" prop="labelName">
          <el-input v-model.trim="ruleForm.labelName"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" prop="labelDesc">
          <el-input v-model.trim="ruleForm.labelDesc"></el-input>
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
      dialogTitle: '新增标签',
      labelName: '',
      pageSize: 10,
      pageNum: 1,
      ruleForm: {
        labelDesc: '',
        labelName: ''
      },
      rules: {
        labelName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ]
      },
      columns: [{
        prop: 'labelName',
        label: '标签名称'
      },{
        prop: 'labelDesc',
        label: '标签说明'
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
      this.ruleForm.labelId = value.labelId
      this.ruleForm.labelName = value.labelName
      this.ruleForm.labelDesc = value.labelDesc
      this.changeNewLabelFlag(true)
    },
    // 删除
    handleDelete (value) {
     this.deleteLabelAjax(value.labelId)
    },
    searchChange(value) {
      let option = {}
      this.labelName = value
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.labelName = this.labelName
      this.getAllLabelAjax(option)
    },
    changePage(value) {
      let option = {}
      this[value.split('-')[0]] = value.split('-')[1] / 1
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.labelName = this.labelName
      this.getAllLabelAjax(option)
    },
    // 新增
    addFun() {
      this.dialogTitle = '新增标签'
      this.changeNewLabelFlag(true)
    },
    determineClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.dialogTitle === '新增标签') {
            this.addNewLabelAjax(this.ruleForm)
          } else {
            this.updateLabelAjax(this.ruleForm)
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
      this.changeNewLabelFlag(false)
    },
    ...mapActions({
      deleteLabelAjax: 'configureModule/deleteLabelAjax',
      addNewLabelAjax: 'configureModule/addNewLabelAjax',
      updateLabelAjax: 'configureModule/updateLabelAjax',
      getAllLabelAjax: 'configureModule/getAllLabelAjax',
    }),
    ...mapMutations({
      changeNewLabelFlag: 'configureModule/ADD_NEW_LABEL' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
  },
  computed: {
    ...mapGetters({
      allLabelList: 'configureModule/allLabelList',
      allLabelListLength: 'configureModule/allLabelListLength',
      addNewLabelFlag: 'configureModule/addNewLabelFlag',
   })
  },
  mounted() {
    this.getAllLabelAjax()
  }
}
</script>

