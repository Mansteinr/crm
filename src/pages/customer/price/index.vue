<template>
  <div class="template-wrapper label-wrapper">
    <Inquiry
      @initFun="initFun"
      :queryParams="queryParams"
    >
      <el-form-item label="开始时间：" prop="startTime">
         <el-date-picker
            v-model="queryParams.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" prop="endTime">
         <el-date-picker
            v-model="queryParams.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
      </el-form-item>
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
      <el-form-item label="商务姓名：" prop="bussName">
        <el-input placeholder="请输入商务名称" v-model="queryParams.bussName"></el-input>
      </el-form-item>
    </Inquiry>
    <!--账户管理 -->
    <Content
    :addIcon="true">
      <Table
        :showSearchIcon="false"
        @changePage="changePage"
        :tableData="accountPriceRecordList" 
        :showSearch="false"
        :tatalPage="accountPriceRecordListLength" 
        :columns="columns">
          <el-table-column
            label="操作"
            width="160px"
            slot="tableTail">
            <template slot-scope="scope" >
              <div class="tableTail">
                <el-button type="primary"  class="mr" @click="lookDetail(scope.row)" plain size="small">查看详细</el-button>
                <el-button type="primary" class="mr" :disabled="scope.row.priceStatus !== 0" @click="handleEdit(scope.row)" plain size="small">取消调价</el-button>
              </div>
            </template>
          </el-table-column>
        </Table>
    </Content>
     <Dialog
      width="860px"
      title="规则变化详情"
      :dialogShow="ruleChangeFlag"
    >
      <Regulars
        :priceValue="preValue"
        :priceRegular="preRegular"
      />
       <Regulars
        title="调价后"
        :priceValue="afterValue"
        :priceRegular="afterRegular"
      />
      <div class="dialog-footer">
        <el-button @click="cancelPrice">取 消</el-button>
      </div>
    </Dialog>
     <Dialog
      width="860px"
      title="确定取消？"
      :dialogShow="cancelWaitPriceFlag"
    >
      <el-form :model="waitForm" ref="waitForm" :rules="waitFormRules">
        <el-form-item label="价格变更描述" prop="priceDesc">
          <el-input v-model.number="waitForm.priceDesc"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="cancelWait">取 消</el-button>
        <el-button type="primary" @click="determineWait">确 定</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Table from '@/components/Table'
import Dialog from '@/components/Dialog'
import Content from '@/components/Content'
import Inquiry from '@/components/Inquiry'
import { formaterTime } from '@/common/js/utils'
import Regulars from '@/components/Regulars/preview'
import { mapActions, mapMutations, mapGetters } from 'vuex'
const date = new Date()
export default {
  data () {
    return {
      preValue: '',
      afterValue: '',
      accountPriceRecordId: '',
      preRegular: [],
      afterRegular: [],
      ruleChangeFlag: false,
      queryParams: {
        endTime: formaterTime(+date),
        startTime: formaterTime(date.getTime() - 3600 * 1000 * 24),
        accountId: '',
        productId: '',
        accountName: ''
      },
      waitForm: {
        priceDesc: '',
        accountPriceRecordId: ''
      },
      typeName: '',
      pageSize: 10,
      pageNum: 1,
      waitFormRules: {
        priceDesc: [
          { required: true, message: '请输入价格变更描述', trigger: 'blur' }
        ]
      },
      columns: [{
        prop: 'accountName',
        label: '账户名称'
      }, {
        prop: 'productName',
        label: '产品名',
        template: row => {
          return `${row.productName}(${row.productNameZh})`
        }
      }, {
        prop: 'companyName',
        label: '公司名称'
      }, {
        prop: 'activeTime',
        label: '生效时间'
      }, {
        prop: 'createTime',
        label: '新增时间'
      }, {
        prop: 'priceStatus',
        width: '80px',
        label: '改价状态',
        template: row => {
          return row.priceStatus === 0 ? '待生效' : (row.priceStatus === 1 ? '已生效' : '已取消') 
        }
      }, {
        prop: 'userName',
        width: '80px',
        label: '操作人员'
      }]
    }
  },
  components: {
    Table,
    Dialog,
    Inquiry,
    Content,
    Regulars
  },
  methods: {
    cancelWait() {
      this.changeCancelWaitPriceFlag(false)
    },
    determineWait() {
      this.$refs.waitForm.validate(valid => {
        if (valid) {
           this.cancelWaitPriceAjax(this.waitForm)
        } else {
          return false
        }
      })
     
    },
    cancelPrice() {
      this.ruleChangeFlag = false
    },
    lookDetail(value) {
      this.ruleChangeFlag = true
      this.preValue = value.preValue
      this.afterValue = value.afterValue
      this.afterRegular = JSON.parse(value.afterRegular)
      this.preRegular = JSON.parse(value.preRegular)
    },
    changePage(value) {
      let option = {}
      this[value.split('-')[0]] = value.split('-')[1] / 1
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize

      this.getAllProductAjax(Object.assign(option, this.queryParams))
    },
    initFun (options) {
      this.accountPriceRecordAjax(options)
    },
    // 取消调价
    handleEdit (value) {
      this.waitForm.accountPriceRecordId = value.accountPriceRecordId
      this.changeCancelWaitPriceFlag(true)
    },
    ...mapActions({
      getAllBasicAccountAjax: 'basics/getAllBasicAccountAjax',
      getAllBasicProductAjax: 'basics/getAllBasicProductAjax',
      accountPriceRecordAjax: 'customerModule/accountPriceRecordAjax',
      cancelWaitPriceAjax: 'customerModule/cancelWaitPriceAjax',
    }),
    ...mapMutations({
      changeCancelWaitPriceFlag: 'customerModule/CANCEL_WAIT_PRICE'
    }),
  },
  computed: {
    ...mapGetters({
      allBasicAccountList: 'basics/allBasicAccountList',
      allBasicProductList: 'basics/allBasicProductList',
      accountPriceRecordList: 'customerModule/accountPriceRecordList',
      accountPriceRecordListLength: 'customerModule/accountPriceRecordListLength',
      cancelWaitPriceFlag: 'customerModule/cancelWaitPriceFlag',
   })
  },
  mounted() {
    this.getAllBasicAccountAjax()
    this.getAllBasicProductAjax()
    this.accountPriceRecordAjax()
  }
}
</script>

