<template>
  <div class="template-wrapper">
    <!--标签管理 -->
    <Content
    @addFun="addFun"
    :data="allChargeFiledList"
    title="计费字段"
    :addIcon="true">
      <Table
        placeholder="计费字段"
        @changePage="changePage"
        @searchChange="searchChange"
        :tableData="allChargeFiledList" 
        :tatalPage="allChargeFiledListLength" 
        :columns="columns">
          <el-table-column
            label="操作"
            fixed="right"
            slot="tableTail"
            width="180">
            <template slot-scope="scope" >
              <el-button type="primary" class="mr"  @click="handleEdit(scope.row)" plain slot="reference" size="small">编辑</el-button>
              <el-popconfirm
                :title="`确定删除 ${scope.row.fieldName} 吗？`"
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
      :dialogShow="addNewChargeFiledFlag"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="字段名称" prop="fieldName">
          <el-input v-model.trim="ruleForm.fieldName" placeholder="请输入字段名称"></el-input>
        </el-form-item>
        <el-form-item label="字段描述" prop="fieldDesc">
          <el-input v-model.trim="ruleForm.fieldDesc"  placeholder="请输入字段描述"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="ruleForm.remark" placeholder="请输入备注"></el-input>
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
      dialogTitle: '新增计费字段',
      fieldName: '',
      pageSize: 10,
      pageNum: 1,
      ruleForm: {
        fieldName: '',
        fieldDesc: '',
        remark: ''
      },
      rules: {
        fieldName: [
          { required: true, message: '请输入字段名称', trigger: 'blur' }
        ],
        fieldDesc: [
          { required: true, message: '请输入字段描述', trigger: 'blur' }
        ]
      },
      columns: [{
        prop: 'fieldName',
        label: '字段名称'
      },{
        prop: 'fieldDesc',
        label: '字段描述'
      },{
        prop: 'remark',
        label: '备注'
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
      this.ruleForm.fieldId = value.fieldId
      this.ruleForm.fieldName = value.fieldName
      this.ruleForm.remark = value.remark
      this.ruleForm.fieldDesc = value.fieldDesc
      this.changeNewChargeFiledFlag(true)
    },
    // 删除
    handleDelete (value) {
     this.deleteChargeFieldAjax(value.fieldId)
    },
    searchChange(value) {
      let option = {}
      this.fieldName = value
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.fieldName = this.fieldName
      this.getAllChargeFieldAjax(option)
    },
    changePage(value) {
      let option = {}
      this[value.split('-')[0]] = value.split('-')[1] / 1
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.fieldName = this.fieldName
      this.getAllChargeFieldAjax(option)
    },
    close() {
      this.$refs.ruleForm.resetFields()
    },
    // 新增
    addFun() {
      this.dialogTitle = '新增计费字段'
      this.changeNewChargeFiledFlag(true)
    },
    determineClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.dialogTitle === '新增计费字段') {
            this.addNewChargeFieldAjax(this.ruleForm)
          } else {
            this.updateChargeFieldAjax(this.ruleForm)
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.changeNewChargeFiledFlag(false)
    },
    ...mapActions({
      deleteChargeFieldAjax: 'productModule/deleteChargeFieldAjax',
      addNewChargeFieldAjax: 'productModule/addNewChargeFieldAjax',
      updateChargeFieldAjax: 'productModule/updateChargeFieldAjax',
      getAllChargeFieldAjax: 'productModule/getAllChargeFieldAjax',
    }),
    ...mapMutations({
      changeNewChargeFiledFlag: 'productModule/ADD_NEW_CHAEGE_FIELD' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  },
  computed: {
    ...mapGetters({
      allChargeFiledList: 'productModule/allChargeFiledList',
      allChargeFiledListLength: 'productModule/allChargeFiledListLength',
      addNewChargeFiledFlag: 'productModule/addNewChargeFiledFlag',
   })
  },
  mounted() {
    this.getAllChargeFieldAjax()
  }
}
</script>

