<template>
  <div class="template-wrapper">
    <Content
    @addFun="addFun"
    :data="allProductList"
    title="产品管理"
    :addIcon="true">
      <Table
        placeholder="产品名称"
        @changePage="changePage"
        @searchChange="searchChange"
        :tableData="allProductList" 
        :tatalPage="allProductListLength" 
        :columns="columns">
          <el-table-column
            label="操作"
            fixed="right"
            slot="tableTail"
            width="150">
            <template slot-scope="scope" >
              <div class="tableTail">
                <el-button type="primary" class="mr"  @click="handleEdit(scope.row)" plain size="small">编辑</el-button>
                <el-button type="primary" class="mr"  @click="setProductPrice(scope.row)" plain size="small">定价</el-button>
                <el-popconfirm
                  :title="`确定删除 ${scope.row.productName} 吗？`"
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
      :dialogShow="addNewProductFlag"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model.trim="ruleForm.productName" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="productNameZh">
          <el-input v-model.trim="ruleForm.productNameZh" placeholder="请输入产品中文名称"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="productTypeId">
          <el-select v-model="ruleForm.productTypeId" filterable placeholder="请选择">
            <el-option
              v-for="item in allBasicProductTypeList"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="告警时间" prop="alarmTimeout">
          <el-input v-model.number="ruleForm.alarmTimeout"></el-input>
        </el-form-item>
        <el-form-item label="是否告警">
          <el-switch
            v-model="ruleForm.sendAlarm"
            active-color="#ff4949"
            inactive-color="#13ce66">
          </el-switch>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="ruleForm.enable"
            active-color="#ff4949"
            inactive-color="#13ce66">
          </el-switch>
        </el-form-item>
        <el-form-item label="超时时间" prop="serviceTimeout">
          <el-input v-model.number="ruleForm.serviceTimeout"></el-input>
        </el-form-item>
      </el-form>
        <div class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="determineClick">确 定</el-button>
      </div>
    </Dialog>
    <Dialog
      width="860px"
      title="定价规则"
      :dialogShow="setPriceRuleFlag"
    >
      <Regulars
        ref="regulars"
        :priceValue="priceValue"
        :priceRegular="priceRegular"
      />
      <div class="dialog-footer">
        <el-button @click="cancelPrice">取 消</el-button>
        <el-button type="primary" @click="determinePrice">确 定</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script>

import Table from '@/components/Table'
import Dialog from '@/components/Dialog'
import Select from "@/components/Select"
import Content from '@/components/Content'
import Regulars from '@/components/Regulars'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialogTitle: '新增产品',
      productName: '',
      priceValue: 0,// 展示价格
      changePriceRemark: '',// 调价备注
      productId: '',// 调价备注
      validate: '',
      pageSize: 10,
      pageNum: 1,
      priceRegular: [],
      ruleForm: {
        productName: '',
        productNameZh: '',
        productTypeId: '',
        alarmTimeout: 0,
        sendAlarm: false,
        enable: false,
        serviceTimeout: 0,
      },
      rules: {
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        productNameZh: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],
        productTypeId: [
          { required: true, message: '请输入产品类型', trigger: 'blur' }
        ],
        alarmTimeout: [
          { required: true, message: '请输入告警时间', trigger: 'blur' }
        ],
        sendAlarm: [
          { required: true, message: '请输入是否告警', trigger: 'blur' }
        ],
        serviceTimeout: [
          { required: true, message: '请输入超时时间', trigger: 'blur' }
        ],
      },
      columns: [{
        prop: 'productNameZh',
        label: '产品名称'
      },{
        prop: 'productName',
        label: '英文名称'
      },{
        prop: 'alarmTimeout',
        width: '100px',
        label: '告警时间'
      },{
        prop: 'serviceTimeout',
        width: '100px',
        label: '超时时间'
      },{
        prop: 'enable',
        label: '是否启用',
        template: row => {
          return `<div class=${row.enable ? 'success' : 'danger'}>${row.enable ? '是' : '否'}</div>`
        }
      },{
        prop: 'sendAlarm',
        label: '是否告警',
        template: row => {
          return `<div class=${row.sendAlarm ? 'success' : 'danger'}>${row.sendAlarm ? '是' : '否'}</div>`
        }
      },{
        prop: 'productTypeName',
        label: '产品类型'
      }]
    }
  },
  components: {
    Table,
    Dialog,
    Content,
    Select,
    Regulars
  },
  methods: {
    // 编辑
    handleEdit (value) {
      this.dialogTitle = '编辑'
      
      Object.keys(this.ruleForm).map(v => {
        this.ruleForm[v] = value[v]
      })

      this.ruleForm.productId = value.productId
      this.changeNewProductFlag(true)
    },
    // 删除
    handleDelete (value) {
     this.deleteProductAjax(value.productId)
    },
    setProductPrice(value) { // 定价
    this.priceRegular = value.priceRegular
      this.productId = value.productId
      this.priceValue = value.priceValue
      this.changePriceRuleFlag(true)
    },
    cancelPrice() {
      this.changePriceRuleFlag(false)
    },
    determinePrice() {
      let options = this.$refs.regulars.getParams()
      this.setProductPriceAjax(Object.assign(options, {
        productId: this.productId
      }))
    },
    searchChange(value) {
      let option = {}
      this.productName = value
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.productName = this.productName
      this.getAllProductAjax(option)
    },
    changePage(value) {
      let option = {}
      this[value.split('-')[0]] = value.split('-')[1] / 1
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.productName = this.productName
      this.getAllProductAjax(option)
    },
    close() {
      this.$refs.ruleForm.resetFields()
    },
    // 新增
    addFun() {
      this.dialogTitle = '新增产品'
      this.ruleForm.productTypeId =  this.allBasicProductTypeList[0].typeId
      this.changeNewProductFlag(true)
    },
    determineClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.dialogTitle === '新增产品') {
            this.addNewProductAjax(this.ruleForm)
          } else {
            this.updateProductAjax(this.ruleForm)
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.changeNewProductFlag(false)
    },
    ...mapActions({
      deleteProductAjax: 'productModule/deleteProductAjax',
      addNewProductAjax: 'productModule/addNewProductAjax',
      updateProductAjax: 'productModule/updateProductAjax',
      getAllProductAjax: 'productModule/getAllProductAjax',
      setProductPriceAjax: 'productModule/setProductPriceAjax',
      getAllBasicProductTypeAjax: 'basics/getAllBasicProductTypeAjax',
    }),
    ...mapMutations({
      changePriceRuleFlag: 'productModule/SET_PRICE_RULES', 
      changeNewProductFlag: 'productModule/ADD_NEW_PRODUCT'
    }),
  },
  computed: {
    ...mapGetters({
      allProductList: 'productModule/allProductList',
      allProductListLength: 'productModule/allProductListLength',
      addNewProductFlag: 'productModule/addNewProductFlag',
      setPriceRuleFlag: 'productModule/setPriceRuleFlag',
      allBasicProductTypeList: 'basics/allBasicProductTypeList',
   })
  },
  mounted() {
    this.getAllProductAjax()
    this.getAllBasicProductTypeAjax()
  }
}
</script>
