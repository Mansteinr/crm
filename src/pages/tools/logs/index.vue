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
      <el-form-item label="操作人：" prop="operatorId">
        <el-select filterable  v-model="queryParams.operatorId" placeholder="请选择操作人">
            <el-option
              v-for="v in allBasicUserList"
              :key="v.userId"
              :label="v.userName"
              :value="v.userId">
            </el-option>
        </el-select>
      </el-form-item>
    </Inquiry>
    <!--账户管理 -->
    <Content>
      <Table
        :showSearchIcon="false"
        @changePage="changePage"
        :tableData="allLogsList" 
        :showSearch="false"
        :tatalPage="allLogsListLength" 
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
      afterValue: '',
      accountPriceRecordId: '',
      preRegular: [],
      afterRegular: [],
      queryParams: {
        endTime: formaterTime(+date),
        startTime: formaterTime(date.getTime() - 3600 * 1000 * 24),
        operatorId: ''
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
        prop: 'action',
        width: '80px',
        label: '动作类型'
      },{
        prop: 'module',
        width: '80px',
        label: '模块编号'
      }, {
        prop: 'operatorName',
        width: '80px',
        label: '操作人'
      }, {
        prop: 'objectName',
        label: '操作对象'
      }, {
        prop: 'ip',
        width: '110px',
        label: '操作ip'
      }, {
        prop: 'logId',
        label: '日志id'
      }, {
        prop: 'operateTime',
        width: '140px',
        label: '操作时间'
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

      this.getAllLogsAjax(Object.assign(option, this.queryParams))
    },
    initFun (options) {
      this.getAllLogsAjax(options)
    },
    ...mapActions({
      getAllLogsAjax: 'logsModule/getAllLogsAjax',
      getAllBasicUserAjax: 'basics/getAllBasicUserAjax',
    })
  },
  computed: {
    ...mapGetters({
      allLogsList: 'logsModule/allLogsList',
      allBasicUserList: 'basics/allBasicUserList',
      allLogsListLength: 'logsModule/allLogsListLength',
   })
  },
  mounted() {
    this.getAllBasicUserAjax()
    this.getAllLogsAjax(this.queryParams)
  }
}
</script>

