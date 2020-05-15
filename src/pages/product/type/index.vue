<template>
  <div class="template-wrapper">
    <!--标签管理 -->
    <Content
    @addFun="addFun"
    :data="allTypeList"
    title="类型管理"
    :addIcon="true">
      <Table
        placeholder="类型名称"
        @changePage="changePage"
        @searchChange="searchChange"
        :tableData="allTypeList" 
        :tatalPage="allTypeListLength" 
        :columns="columns">
          <el-table-column
            label="操作"
            fixed="right"
            slot="tableTail"
            width="180">
            <template slot-scope="scope" >
              <el-button type="primary" class="mr"  @click="handleEdit(scope.row)" plain slot="reference" size="small">编辑</el-button>
              <el-popconfirm
                :title="`确定删除${scope.row.typeName}？`"
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
      :dialogShow="addNewTypeFlag"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="类型名称" prop="typeName">
          <el-input v-model.trim="ruleForm.typeName" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="类型描述" prop="typeDesc">
          <el-input v-model.trim="ruleForm.typeDesc" placeholder="请输入类型描述"></el-input>
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
      typeName: '',
      pageSize: 10,
      pageNum: 1,
      ruleForm: {
        typeName: '',
        typeDesc: '',
        remark: ''
      },
      rules: {
        typeName: [
          { required: true, message: '请输入类型名称', trigger: 'blur' }
        ],
        typeDesc: [
          { required: true, message: '请输入类型描述', trigger: 'blur' }
        ]
      },
      columns: [{
        prop: 'typeName',
        label: '类型名称'
      },{
        prop: 'typeDesc',
        label: '类型描述'
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
      this.ruleForm.typeId = value.typeId
      this.ruleForm.typeName = value.typeName
      this.ruleForm.typeDesc = value.typeDesc
      this.changeNewTypeFlag(true)
    },
    // 删除
    handleDelete (value) {
     this.deleteTypeAjax(value.typeId)
    },
    searchChange(value) {
      let option = {}
      this.typeName = value
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.typeName = this.typeName
      this.getAllTypeAjax(option)
    },
    changePage(value) {
      let option = {}
      this[value.split('-')[0]] = value.split('-')[1] / 1
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.typeName = this.typeName
      this.getAllTypeAjax(option)
    },
    close() {
      this.$refs.ruleForm.resetFields()
    },
    // 新增
    addFun() {
      this.dialogTitle = '新增产品类型'
      this.changeNewTypeFlag(true)
    },
    determineClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.dialogTitle === '编辑') {
            this.updateTypeAjax(this.ruleForm)
          } else {
            this.addNewTypeAjax(this.ruleForm)
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.changeNewTypeFlag(false)
    },
    ...mapActions({
      deleteTypeAjax: 'productModule/deleteTypeAjax',
      addNewTypeAjax: 'productModule/addNewTypeAjax',
      updateTypeAjax: 'productModule/updateTypeAjax',
      getAllTypeAjax: 'productModule/getAllTypeAjax',
    }),
    ...mapMutations({
      changeNewTypeFlag: 'productModule/ADD_NEW_TYPE' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
  },
  computed: {
    ...mapGetters({
      allTypeListLength: 'productModule/allTypeListLength',
      allTypeList: 'productModule/allTypeList',
      addNewTypeFlag: 'productModule/addNewTypeFlag',
   })
  },
  mounted() {
    this.getAllTypeAjax()
  }
}
</script>
