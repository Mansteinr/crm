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
    </Inquiry>
    <!--账户管理 -->
    <Content>
      <Table
        :showSearchIcon="false"
        @changePage="changePage"
        :tableData="rechargeRecordList" 
        :showSearch="false"
        :tatalPage="rechargeRecordLength" 
        :columns="columns">
        </Table>
    </Content>
  </div>
</template>

<script>
import Table from '@/components/Table'
import Dialog from '@/components/Dialog'
import Content from '@/components/Content'
import Inquiry from '@/components/Inquiry'
import { formaterTime } from '@/common/js/utils'
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
      queryParams: {
        endTime: formaterTime(+date),
        startTime: formaterTime(date.getTime() - 3600 * 1000 * 24),
        accountId: ''
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
        width: '120px',
        label: '账户名称'
      },{
        prop: 'companyName',
        label: '公司名称'
      }, {
        prop: 'preValue',
        width: '100px',
        label: '操作前金额'
      }, {
        prop: 'rechargeValue',
        width: '100px',
        label: '充值金额'
      }, {
        prop: 'afterValue',
        width: '100px',
        label: '当前金额'
      }, {
        prop: 'rechargeDesc',
        label: '充值描述'
      }, {
        prop: 'rechargeType',
        label: '充值类型',
        width: '80px',
        template: row => {
          return row.rechargeType ? '预付' : '后付'
        }
      }, {
        prop: 'userName',
        width: '80px',
        label: '操作人'
      }, {
        prop: 'createTime',
        width: '140px',
        label: '充值时间'
      }]
    }
  },
  components: {
    Table,
    Inquiry,
    Content
  },
  methods: {
    changePage(value) {
      let option = {}
      this[value.split('-')[0]] = value.split('-')[1] / 1
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize

      this.rechargeRecordAjax(Object.assign(option, this.queryParams))
    },
    initFun (options) {
      this.accountPriceRecordAjax(options)
    },
    ...mapActions({
      rechargeRecordAjax: 'customerModule/rechargeRecordAjax',
      getAllBasicAccountAjax: 'basics/getAllBasicAccountAjax',
    })
  },
  computed: {
    ...mapGetters({
      rechargeRecordList: 'customerModule/rechargeRecordList',
      rechargeRecordLength: 'customerModule/rechargeRecordLength',
      allBasicAccountList: 'basics/allBasicAccountList'
   })
  },
  mounted() {
    this.getAllBasicAccountAjax()
    this.rechargeRecordAjax(this.queryParams)
  }
}
</script>

