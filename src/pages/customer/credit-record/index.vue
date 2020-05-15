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
        :tableData="creditRecordList" 
        :showSearch="false"
        :tatalPage="creditRecordLength" 
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
        label: '账户名称'
      },{
        prop: 'companyName',
        label: '公司名称'
      }, {
        prop: 'preValue',
        label: '操作前金额'
      },  {
        prop: 'afterValue',
        label: '操作后金额'
      }, {
        prop: 'creditType',
        label: '授信类型',
        template: row => {
          return row.creditType === 0 ? '待生效' : (row.priceStatus === 1 ? '已生效' : '已取消') 
        }
      }, {
        prop: 'createTime',
        label: '授信时间'
      }, {
        prop: 'creditDesc',
        label: '授信描述'
      },{
        prop: 'userName',
        label: '操作人'
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

      this.getAllProductAjax(Object.assign(option, this.queryParams))
    },
    initFun (options) {
      this.creditRecordAjax(options)
    },
    ...mapActions({
      creditRecordAjax: 'customerModule/creditRecordAjax',
      getAllBasicAccountAjax: 'basics/getAllBasicAccountAjax',
    })
  },
  computed: {
    ...mapGetters({
      creditRecordList: 'customerModule/creditRecordList',
      creditRecordLength: 'customerModule/creditRecordLength',
      allBasicAccountList: 'basics/allBasicAccountList'
   })
  },
  mounted() {
    this.getAllBasicAccountAjax()
    this.creditRecordAjax(this.queryParams)
  }
}
</script>

