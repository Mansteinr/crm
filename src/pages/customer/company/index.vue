<template>
  <div class="template-wrapper label-wrapper">
    <Inquiry
      @initFun="initFun"
      :queryParams="queryParams"
    >
      <el-form-item label="客户名称：" prop="companyName">
        <el-input placeholder="请输入客户名称" v-model.trim="queryParams.companyName"></el-input>
      </el-form-item>
      <el-form-item label="商务姓名：" prop="bussName">
        <el-input v-model.trim="queryParams.bussName" placeholder="请输入商务姓名"></el-input>
      </el-form-item>
    </Inquiry>
    <!--标签管理 -->
    <Content
    @addFun="addFun"
    :data="allCompanyList"
    title="客户管理"
    :addIcon="true">
      <Table
        @changePage="changePage"
        :tableData="allCompanyList" 
        :showSearchIcon="false"
        :tatalPage="allCompanyListLength" 
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
                    :title="`确定删除 ${scope.row.companyName} ？`"
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
      :dialogShow="addNewCompanyFlag"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="客户名称" prop="companyName">
          <el-input v-model.trim="ruleForm.companyName" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item label="客户简称" prop="shortName">
          <el-input v-model.trim="ruleForm.shortName" placeholder="请输入客户简称"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contectName">
          <el-input v-model.trim="ruleForm.contectName"  placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contectMobile">
          <el-input v-model.number="ruleForm.contectMobile" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="contectEmail">
          <el-input v-model.trim="ruleForm.contectEmail" placeholder="请输入联系邮箱"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model.trim="ruleForm.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="统一代码" prop="socialCode">
          <el-input v-model.trim="ruleForm.socialCode" placeholder="请输入统一代码"></el-input>
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
import Inquiry from '@/components/Inquiry'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      queryParams: {
        bussName: '',
        companyName: ''
      },
      dialogTitle: '新增客户',
      typeName: '',
      pageSize: 10,
      pageNum: 1,
      ruleForm: {
        companyName: '',
        shortName: '',
        contectName: '',
        contectMobile: '',
        contectEmail: '',
        address: '',
        socialCode: '',
      },
      rules: {
        companyName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        shortName: [
          { required: true, message: '请输入客户简称', trigger: 'blur' }
        ],
        contectName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contectMobile: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        contectMobile: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          {validator:function(rule,value,callback){
            if(/^1[34578]\d{9}$/.test(value) == false){
                callback(new Error("请输入正确的手机号"));
            }else{
                callback()
            }
          }, trigger: 'change'}
        ],
        contectEmail: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
      },
      columns: [{
        prop: 'companyName',
        width: '180px',
        label: '客户名称'
      }, {
        prop: 'shortName',
        width: '80px',
        label: '客户简称'
      }, {
        prop: 'contectName',
        width: '90px',
        label: '客户联系人'
      }, {
        width: '100px',
        prop: 'contectMobile',
        label: '联系电话'
      }, {
        prop: 'contectEmail',
        label: '联系邮箱'
      }, {
        prop: 'bussName',
        label: '所属商务',
        width: '80px',
        template: row => {
          return `<span>${row.bussName}</span>`
        }
      }, {
        prop: 'address',
        label: '地址'
      }, {
        prop: 'socialCode',
        width: '90px',
        label: '统一代码'
      }]
    }
  },
  components: {
    Table,
    Dialog,
    Inquiry,
    Content
  },
  methods: {
    initFun (options) {
      this.getAllCompanyAjax(options)
    },
    // 编辑
    handleEdit (value) {
      this.dialogTitle = '编辑'
      Object.keys(this.ruleForm).map(v => {
        this.ruleForm[v] = value[v]
      })
      this.ruleForm.companyId = value.companyId
      this.changeNewCompanyFlag(true)
    },
    // 删除
    handleDelete (value) {
     this.deleteCompanyAjax(value.companyId)
    },
    changePage(value) {
      let option = {}
      this[value.split('-')[0]] = value.split('-')[1] / 1
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.typeName = this.typeName
      this.getAllCompanyAjax(option)
    },
    close() {
      this.$refs.ruleForm.resetFields()
    },
    // 新增
    addFun() {
      this.dialogTitle = '新增客户'
      this.changeNewCompanyFlag(true)
    },
    determineClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.dialogTitle === '编辑') {
            this.updateCompanyAjax(this.ruleForm)
          } else {
            this.addNewCompanyAjax(this.ruleForm)
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.changeNewCompanyFlag(false)
    },
    ...mapActions({
      deleteCompanyAjax: 'customerModule/deleteCompanyAjax',
      addNewCompanyAjax: 'customerModule/addNewCompanyAjax',
      updateCompanyAjax: 'customerModule/updateCompanyAjax',
      getAllCompanyAjax: 'customerModule/getAllCompanyAjax',
    }),
    ...mapMutations({
      changeNewCompanyFlag: 'customerModule/ADD_NEW_COMPANY' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
  },
  computed: {
    ...mapGetters({
      allCompanyListLength: 'customerModule/allCompanyListLength',
      allCompanyList: 'customerModule/allCompanyList',
      addNewCompanyFlag: 'customerModule/addNewCompanyFlag',
   })
  },
  mounted() {
    this.getAllCompanyAjax()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.label-wrapper
  .el-form-item
    display flex
    label 
      flex 1
    .el-form-item__content
      flex 6
</style>
