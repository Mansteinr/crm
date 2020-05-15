<template>
  <div class="template-wrapper label-wrapper">
    <Inquiry
      @initFun="initFun"
      :queryParams="queryParams"
    >
      <el-form-item label="账户名称：" prop="accountName">
        <el-input placeholder="请输入账户名称" v-model.trim="queryParams.accountName"></el-input>
      </el-form-item>
      <el-form-item label="商务姓名：" prop="bussName">
        <el-input placeholder="请输入商务姓名" v-model.trim="queryParams.bussName"></el-input>
      </el-form-item>
    </Inquiry>
    <!--账户管理 -->
    <Content
    @addFun="addFun"
    :data="allAccountList"
    title="账户管理"
    :addIcon="true">
      <Table
        @changePage="changePage"
        :tableData="allAccountList" 
        :showSearchIcon="false"
        :tatalPage="allAccountListLength" 
        :columns="columns">
          <el-table-column
            label="操作"
            fixed="right"
            slot="tableTail"
            width="280">
            <template slot-scope="scope" >
              <div class="tableTail">
                <el-button type="primary" class="mr"  @click="handleEdit(scope.row)" plain size="small">编辑</el-button>
                <el-button type="primary" class="mr"  @click="recharge(scope.row)" plain size="small">充值</el-button>
                <el-button type="primary" class="mr"  @click="setService(scope.row)" plain size="small">服务</el-button>
                <el-button type="primary" class="mr"  @click="setCredit(scope.row)" plain size="small">授信</el-button>
                <el-button type="primary" class="mr"  @click="changeAlarm(scope.row)" plain size="small">告警</el-button>
                <el-popconfirm
                  :title="`确定删除${scope.row.companyName}？`"
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
      @close="close('ruleForm')"
      :title="dialogTitle"
      :dialogShow="addNewAccountFlag"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="账户名称" prop="accountName">
          <el-input placeholder="请输入账户名称" v-model.trim="ruleForm.accountName" :disabled="dialogTitle === '编辑'"></el-input>
        </el-form-item>
   
        <el-form-item label="账户密码" v-if="dialogTitle !== '编辑'" prop="accountKey">
          <el-input placeholder="请输入账户密码" v-model.trim="ruleForm.accountKey"></el-input>
        </el-form-item>
  
        <el-form-item label="商务" prop="bussId">
          <el-select v-model="ruleForm.bussId" filterable placeholder="请选择商务">
            <el-option
              v-for="v in allBasicUserList"
              :key="v.userId"
              :label="v.userName"
              :value="v.userId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogTitle === '编辑'" label="是否启用" prop="accountEnable">
          <el-radio-group v-model="ruleForm.accountEnable">
            <el-radio :label="true">是</el-radio>
            <el-radio :label='false'>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="公司名称"  v-if="dialogTitle !== '编辑'" prop="companyId">
          <el-select v-model="ruleForm.companyId" filterable placeholder="请选择公司名称">
            <el-option
              v-for="v in allBasicCompanyList"
              :key="v.companyId"
              :label="v.companyName"
              :value="v.companyId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogTitle !== '编辑'" label="账户描述" prop="accountDesc">
          <el-input v-model.trim="ruleForm.accountDesc" placeholder="请输入账户描述"></el-input>
        </el-form-item>
        <el-form-item label="ip白名单" prop="whiteIp">
          <el-input v-model.trim="ruleForm.whiteIp" placeholder="请输入ip白名单，多个用；隔开"></el-input>
        </el-form-item>
      </el-form>
        <div class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="determineClick">确 定</el-button>
      </div>
    </Dialog>
    <Dialog
      title="绑定服务"
      width="750px"
      :dialogShow="setServiceFlag"
    >

      <div class="checked-wrapper" ref="checkedWrapper" >
        <div class="checked-box-item" v-for="v in allProductList" :key="v.typeName">
          <div class="checked-box-title el-icon-arrow-down">{{v.typeName}}</div>
          <div class="checked-box-wrapper">
            <el-checkbox v-for="v1 in v.productDetais" :data-id="v1.productId" v-model="v1.hasBind" :value="v1.hasBind" :key="v1.productId">{{ v1.productNameZh }}</el-checkbox>
          </div>
        </div>
      </div>

        <div class="dialog-footer">
        <el-button @click="cancelService">取 消</el-button>
        <el-button type="primary" @click="determineService">确 定</el-button>
      </div>
    </Dialog>
    <Dialog
      title="充值"
       @close="close('chargeForm')"
      :dialogShow="setChargeFlag"
    >
      <el-form :model="chargeForm" ref="chargeForm" :rules="chargeRules">
      
        <el-form-item label="充值金额" prop="rechargeValue">
          <el-input v-model.trim="chargeForm.rechargeValue" placeholder="请输入充值金额"></el-input>
        </el-form-item>
          <el-form-item label="充值描述" prop="rechargeDesc">
          <el-input v-model.trim="chargeForm.rechargeDesc" placeholder="请输入充值描述"></el-input>
        </el-form-item>
        <el-form-item label="充值类型" prop="rechargeType">
          <el-select v-model="chargeForm.rechargeType" placeholder="请选择充值类型">
            <el-option
              :key="0"
              label="预付"
              :value="0">
            </el-option>
            <el-option
              :key="1"
              label="后付"
              :value="1">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
        <div class="dialog-footer">
        <el-button @click="cancelRecharge">取 消</el-button>
        <el-button type="primary" @click="determineRecharge">确 定</el-button>
      </div>
    </Dialog>
    <Dialog
      title="授信额度"
      @close="close('creditForm')"
      :dialogShow="changCreditFlag"
    >
      <el-form :model="creditForm" ref="creditForm" :rules="creditRules">
        <el-form-item label="授信额度" prop="creditLine">
          <el-input v-model.trim="creditForm.creditLine"></el-input>
        </el-form-item>
          <el-form-item label="备注" prop="remark">
          <el-input v-model="creditForm.remark"></el-input>
        </el-form-item>
      </el-form>
        <div class="dialog-footer">
        <el-button @click="cancelCredit">取 消</el-button>
        <el-button type="primary" @click="determineCredit">确 定</el-button>
      </div>
    </Dialog>
    <Dialog
    title="告警额度"
    @close="close('alarmForm')"
    :dialogShow="updateAlarmLineFlag"
    >
      <el-form :model="alarmForm" ref="alarmForm" :rules="alarmRules">
        <el-form-item label="告警值" prop="alarmLine">
          <el-input v-model.number="alarmForm.alarmLine"></el-input>
        </el-form-item>
          <el-form-item label="备注" prop="remark">
          <el-input v-model="alarmForm.remark"></el-input>
        </el-form-item>
      </el-form>
        <div class="dialog-footer">
        <el-button @click="cancelAlarm">取 消</el-button>
        <el-button type="primary" @click="determineAlarm">确 定</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Table from '@/components/Table'
import Dialog from '@/components/Dialog'
import Content from '@/components/Content'
import Inquiry from '@/components/Inquiry'
import { isValidIP, isValidMoney } from '@/common/js/utils'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      queryParams: {
        bussName: '',
        accountName: ''
      },
      dialogTitle: '新增账户',
      typeName: '',
      accountId: '',
      pageSize: 10,
      pageNum: 1,
      ruleForm: {
        accountName: '',
        accountDesc: '',
        accountKey: '',
        bussId: '',
        companyId: '',
        whiteIp: '',
        accountEnable: false
      },
      chargeForm: {
        rechargeDesc: '',
        rechargeType: 0,
        rechargeValue: '',
      },
      creditForm: {
        remark: '',
        creditLine :'',
        accountId : '',
      },
      alarmForm: {
        remark: '',
        alarmLine : '',
        accountId :'',
      },
      rules: {
        accountName: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
        ],
        accountKey: [
          { required: true, message: '请输入账户密码', trigger: 'blur' }
        ],
        bussId: [
          { required: true, message: '请输入商务id', trigger: 'blur' }
        ],
        whiteIp: [
          { validator: function(rule,value,callback){
            let newValue = value.replace(/；/, ';').split(';'), flag = true
            newValue.forEach(v => {
              if(!isValidIP(v)) {
                flag = false
              }
            })
            if(!flag){
              callback(new Error("请输入有效IP地址"))
            }else{
              callback()
            }
          }, trigger: 'blur'}
        ]
      },
      chargeRules: {
        rechargeDesc: [{ required: true, message: '请输入充值说明', trigger: 'blur' }],
        rechargeValue: [
          { required: true, message: '请输入有效充值额度', trigger: 'blur' },
          { validator: function(rule,value,callback){
            if(!isValidMoney(value)){
                callback(new Error("请输入有效充值额度"))
            }else{
                callback()
            }
          }, trigger: 'change'}
        ]
      },
      creditRules: {
        creditLine: [
          { required: true, message: '请输入有效授信额度', trigger: 'blur' },
          {validator:function(rule,value,callback){
            if(!isValidMoney(value)){
                callback(new Error("请输入有效授信额度"))
            }else{
                callback()
            }
          }, trigger: 'change'}
        ]
      },
      alarmRules: {
        alarmLine: [
          { required: true, message: '请输入有效告警额度', trigger: 'blur' },
          {validator:function(rule,value,callback){
            if(!isValidMoney(value)){
                callback(new Error("请输入有效告警额度"))
            }else{
                callback()
            }
          }, trigger: 'change'}
        ]
      },
      columns: [{
        prop: 'accountName',
        label: '账户名称'
      }, {
        prop: 'accountKey',
        label: '密码'
      }, {
        prop: 'companyName',
        width: '180px',
        label: '公司名称'
      }, {
        prop: 'accountEnable',
        label: '客户状态',
        template: row => {
          return `<div class=${row.accountEnable  ? 'success' : 'danger'}>${row.accountEnable ? '启用' : '未启用'}</div>`
        }
      }, {
        prop: 'accountBalance',
        label: '余额'
      }, {
        prop: 'creditLine',
        label: '授信额度'
      }, {
        prop: 'alarmLine',
        label: '告警阈值'
      }, {
        prop: 'bussName',
        label: '所属商务'
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
    // 设置服务
    setService(value) {
      this.changeServiceFlag(true)
      this.getProductListAjax(value.accountId)
      this.accountId = value.accountId
    },
    cancelService() {
      this.changeServiceFlag(false)
    },
    determineService() {
      let doms = [...this.$refs.checkedWrapper.querySelectorAll('.checked-box-item')], productIds = [], option = {}
      doms.forEach(v => {
        let labels = [...v.querySelectorAll('.el-checkbox.is-checked')]
        labels.forEach(v => {
          productIds.push(v.dataset.id)
        })
      })
      option.productIds = productIds
      option.accountId = this.accountId
      this.setServiceAjax(option)
    },
       // 充值
    recharge(value) {
      this.chargeForm.accountId = value.accountId
      this.changeChargeFlag(true)
    },
    cancelRecharge() {
      this.changeChargeFlag(false)
    },
    determineRecharge(value) {
      this.chargeForm.rechargeValue = this.chargeForm.rechargeValue / 1
      this.$refs.chargeForm.validate(valid => {
        if (valid) {
          this.rechargeAjax(this.chargeForm)
        } else {
          return false
        }
      })
    },
     // 授信
    setCredit(value) {
      this.creditForm.accountId = value.accountId
      this.creditForm.creditLine = value.creditLine
      this.changeNewCreditFlag(true)
    },
    cancelCredit() {
      this.changeNewCreditFlag(false)
    },
    determineCredit() {
      this.creditForm.creditLine = this.creditForm.creditLine / 1
      this.$refs.creditForm.validate(valid => {
        if (valid) {
          this.changeCreditAjax(this.creditForm)
          this.accountId = null
        } else {
          return false
        }
      })
    },
    // 告警
    changeAlarm(value) {
      this.alarmForm.accountId = value.accountId
      this.changeAlarmFlag(true)
    },
    cancelAlarm() {
      this.changeAlarmFlag(false)
    },
    determineAlarm() {
      this.$refs.alarmForm.validate(valid => {
        if (valid) {
          this.updateAlarmLineAjax(this.alarmForm)
        } else {
          return false
        }
      })
    },
   
    initFun (options) {
      this.getAllAccountAjax(options)
    },
    // 编辑
    handleEdit (value) {
      this.dialogTitle = '编辑'
      Object.keys(this.ruleForm).map(v => {
        this.ruleForm[v] = value[v]
      })
      this.ruleForm.accountId = value.accountId
      this.changeNewAccountFlag(true)
    },
    // 删除
    handleDelete (value) {
     this.deleteAccountAjax(value.accountId)
    },
    changePage(value) {
      let option = {}
      this[value.split('-')[0]] = value.split('-')[1] / 1
      option.pageNum = this.pageNum
      option.pageSize = this.pageSize
      option.typeName = this.typeName
      this.getAllAccountAjax(option)
    },
    close(form) {
      this.$refs[form].resetFields()
    },
    // 新增
    addFun() {
      this.dialogTitle = '新增账户'
      Object.keys(this.ruleForm).map(v => {
        this.ruleForm[v] = ''
      })
      this.ruleForm.companyId = this.allBasicCompanyList[0].companyId
      this.ruleForm.bussId = this.allBasicUserList[0].userId
      this.changeNewAccountFlag(true)
    },
    determineClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.dialogTitle === '编辑') {
            this.updateAccountAjax(this.ruleForm)
          } else {
            this.addNewAccountAjax(this.ruleForm)
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.changeNewAccountFlag(false)
    },
    ...mapActions({
      setServiceAjax: 'customerModule/setServiceAjax',
      getAllBasicCompanyAjax: 'basics/getAllBasicCompanyAjax',
      deleteAccountAjax: 'customerModule/deleteAccountAjax',
      addNewAccountAjax: 'customerModule/addNewAccountAjax',
      updateAccountAjax: 'customerModule/updateAccountAjax',
      getAllAccountAjax: 'customerModule/getAllAccountAjax',
      getProductListAjax: 'customerModule/getProductListAjax',
      rechargeAjax: 'customerModule/rechargeAjax',
      changeCreditAjax: 'customerModule/changeCreditAjax',
      updateAlarmLineAjax: 'customerModule/updateAlarmLineAjax',
      getAllBasicUserAjax: 'basics/getAllBasicUserAjax',
    }),
    ...mapMutations({
      changeServiceFlag: 'customerModule/SET_SERVICE', 
      changeChargeFlag: 'customerModule/SER_CHARGE', 
      changeAlarmFlag: 'customerModule/UPDATE_ALARM_LINE', 
      changeNewCreditFlag: 'customerModule/CHANGE_CREDIT', // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      changeNewAccountFlag: 'customerModule/ADD_NEW_ACCOUNT',
    }),
  },
  computed: {
    ...mapGetters({
      allAccountList: 'customerModule/allAccountList',
      allBasicUserList: 'basics/allBasicUserList',
      allBasicCompanyList: 'basics/allBasicCompanyList',
      addNewAccountFlag: 'customerModule/addNewAccountFlag',
      allAccountListLength: 'customerModule/allAccountListLength',
      allProductList: 'customerModule/allProductList',
      setChargeFlag: 'customerModule/setChargeFlag',
      changCreditFlag: 'customerModule/changCreditFlag',
      updateAlarmLineFlag: 'customerModule/updateAlarmLineFlag',
      setServiceFlag: 'customerModule/setServiceFlag',
   })
  },
  mounted() {
    this.getAllAccountAjax()
    this.getAllBasicUserAjax()
    this.getAllBasicCompanyAjax()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>

.checked-wrapper
  margin-bottom 20px
  .checked-box-title
    height: 40px
    line-height 40px
    &:before
      margin-right 5px
  .checked-box-wrapper
      padding-left 35px
    .el-checkbox
      width 158px
      margin-right 10px
      color: #c0c4cc
</style>
