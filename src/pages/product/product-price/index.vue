<template>
  <div class="template-wrapper label-wrapper">
    <Inquiry
      @initFun="initFun"
      :queryParams="queryParams"
    >
      <el-form-item label="账户名称：" prop="accountId">
        <el-select filterable  v-model="queryParams.accountId" placeholder="请选择账户名称">
            <el-option
              v-for="v in allBasicAccountList"
              :key="v.accountId"
              :label="v.accountName"
              :value="v.accountId">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称：" prop="productId">
        <el-select filterable  v-model="queryParams.productId" placeholder="请选择产品名称">
            <el-option
              v-for="v in allBasicProductList"
              :key="v.productId"
              :label="v.productName"
              :value="v.productId">
            </el-option>
        </el-select>
      </el-form-item>
    </Inquiry>
    <Content
    :data="productPriceDetailList"
    title="客户产品">
      <Table
        placeholder="产品名称"
        @changePage="changePage"
        :showSearchIcon="false"
        :tableData="productPriceDetailList" 
        :tatalPage="productPriceDetailLength" 
        :columns="columns">
          <el-table-column
            label="操作"
            fixed="right"
            width="90px"
            slot="tableTail">
            <template slot-scope="scope" >
              <el-button type="primary" plain @click="handleEdit(scope.row)" size="small">改价</el-button>
            </template>
          </el-table-column>
        </Table>
    </Content>
    <Dialog
      width="860px"
      title="定价规则"
      :dialogShow="accountProductSerpriceFlag"
    >
      <Regulars
        ref="regulars"
        type="prodctPrice"
        :priceValue="priceValue"
        :priceRegular="priceRegular"
      />
      <div class="dialog-footer">
        <el-button @click="cancelPrice">取 消</el-button>
        <el-button type="primary" @click="determineClick">确 定</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script>

import Table from '@/components/Table'
import Inquiry from '@/components/Inquiry'
import Dialog from '@/components/Dialog'
import Content from '@/components/Content'
import Regulars from '@/components/Regulars/'
import { showModal } from '@/common/js/utils'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      productName: '',
      priceValue: 0,// 展示价格
      changePriceRemark: '',// 调价备注
      accountId: '',// 调价备注
      productId: '',// 调价备注
      validate: '',
      pageSize: 10,
      pageNum: 1,
      priceRegular: [],
      queryParams: {
        accountId: '',
        productId: '',
      },
      columns: [{
        prop: 'accountName',
        label: '账户'
      },{
        prop: 'companyName',
        label: '公司名称'
      },{
        prop: 'defaultPrice',
        label: '是否默认价格',
        width: '115px',
        template: row => {
          return `<div class=${row.defaultPrice ? 'success' : 'danger'}>${row.defaultPrice ? '是' : '否'}</div>`
        }
      },{
        prop: 'priceValue',
        width: '80px',
        label: '展示价格'
      },{
        prop: 'productName',
        label: '产品名称'
      },{
        prop: 'productNameZh',
        label: '产品中文名称'
      }, {
        prop: 'specialRegular',
        label: '是否已定制规则',
        width: '115px',
        template: row => {
          return `<div class=${row.specialRegular ? 'success' : 'danger'}>${row.specialRegular ? '是' : '否'}</div>`
        }
      }]
    }
  },
  components: {
    Table,
    Dialog,
    Content,
    Regulars,
    Inquiry
  },
  methods: {
    initFun (options) {
      this.productPriceDetailAjax(options)
    },
    // 编辑
    handleEdit (value) { 
      console.log(value)
      this.productId = value.productId
      this.accountId = value.accountId
      this.priceValue = value.priceValue
      this.priceRegular = value.priceRegular
      this.changeAccountProductSerpriceFlag(true)
      
     
    },
    determineClick() {
      let options = this.$refs.regulars.getParams()
      this.accountProductSepriceAjax(Object.assign(options, {
        productId: this.productId,
        accountId: this.accountId
      }))
    },
    cancelPrice() {
      this.changeAccountProductSerpriceFlag(false)
    },
    changePage(value) {
      let option = {}
      this[value.split('-')[0]] = value.split('-')[1] / 1
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.productName = this.productName
      this.productPriceDetailAjax(option)
    },
    ...mapActions({
      getAllBasicAccountAjax: 'basics/getAllBasicAccountAjax',
      getAllBasicProductAjax: 'basics/getAllBasicProductAjax',
      productPriceDetailAjax: 'productModule/productPriceDetailAjax',
      accountProductSepriceAjax: 'productModule/accountProductSepriceAjax',
    }),
    ...mapMutations({
      changePriceRuleFlag: 'productModule/SET_PRICE_RULES', 
      changeNewProductFlag: 'productModule/ADD_NEW_PRODUCT',
      changeAccountProductSerpriceFlag: 'productModule/ACCOUNT_PRODUCT_SETPRICE_FLAG'
    }),
  },
  computed: {
    ...mapGetters({
      allBasicAccountList: 'basics/allBasicAccountList',
      allBasicProductList: 'basics/allBasicProductList',
      productPriceDetailList: 'productModule/productPriceDetailList',
      productPriceDetailLength: 'productModule/productPriceDetailLength',
      accountProductSerpriceFlag: 'productModule/accountProductSerpriceFlag',
   })
  },
  mounted() {
    this.getAllBasicAccountAjax()
    this.getAllBasicProductAjax()
    this.productPriceDetailAjax()
  }
}
</script>