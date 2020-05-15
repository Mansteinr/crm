<!-- 显示部分 -->
<template>
  <div class="rlue-wrapper">
    <el-row :gutter="20">
      <el-col :span="4"><el-button type="primary" icon="el-icon-plus" @click="addNewpriceRegular" plain>新增一组</el-button></el-col>
      <el-col :span="6"><el-input v-model="priceValue" placeholder="请输入展示价格"></el-input></el-col>
    </el-row>
    <div class="rule-container">
      <div class="rule-items" v-for="(v, k)  in priceRegulars" :key="k">
        <div class="rule-items-wrapper">
          <!--  v-if="priceRegulars[k].chargeField[k1].key" -->
          <div :class="Object.keys(priceRegulars[k].chargeField).length === 1 ? 'only-one-rule-items-container' : 'rule-items-container'" v-for="(v1, k1)  in priceRegulars[k].chargeField" :key="k1">
            <div class="btn-wrapper">
              <el-button type="primary" :icon="k1 === 'additionalProp1' ? 'el-icon-plus' : 'el-icon-minus'" @click="k1 === 'additionalProp1' ? addPriceItem(priceRegulars[k], $event) : minusPriceItem(priceRegulars[k].chargeField, k1, $event)" plain></el-button>
            </div>
            <el-select v-model="priceRegulars[k].chargeField[k1].key"  placeholder="请选择"> 
              <el-option
                v-for="item in allBasicChargeFieldList"
                :key="item.fieldName"
                :label="item.fieldName"
                :value="item.fieldName">
              </el-option> 
            </el-select>
            <el-input value="=" :disabled="true" placeholder="请输入内容"></el-input>
            <div class="produce-wrapper">
              <div class="el-input-wrapper" v-for="(v2, k2) in priceRegulars[k].chargeField[k1].value" :key="k2">
                <input class="el-input__inner" placeholder="请输入内容" v-model.trim="priceRegulars[k].chargeField[k1].value[k2]"/>
                <el-button type="primary" :icon="k2 === 'value1' ? 'el-icon-plus' : 'el-icon-minus'" @click="k2 === 'value1' ? addConditionItem(priceRegulars[k].chargeField[k1], $event) : minusConditionItem(priceRegulars[k].chargeField[k1], k2, $event)" plain></el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="rule-items-pirce">
          <el-input v-model.trim="priceRegulars[k].price" placeholder="请输入价格"></el-input>
          <el-button type="primary" v-if="k != 0" icon="el-icon-minus" @click="deleteregularField(k)" plain></el-button>
        </div>
      </div>
      <el-row :gutter="20" >

        <el-col :span="24" v-if="type === 'prodctPrice'" class="switch-date-wrapper">
          <el-radio v-model="enable" :label="true">立即生效</el-radio>
          <el-radio v-model="enable" :label="false">选择时间</el-radio>
          <el-date-picker
            v-if="type === 'prodctPrice' && !enable"
            v-model="dateTime"
            type="date"
            :picker-options="pickerOptions"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <el-time-picker
            v-if="type === 'prodctPrice' && !enable"
            v-model="timeValue"
            value-format="HH:mm:ss"
            placeholder="选择时间点">
          </el-time-picker>
        </el-col>
        <el-col :span="24"><el-input
          type="textarea"
          :rows="2"
          placeholder="请输入调价备注"
          v-model="changePriceRemark">
        </el-input></el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { formaterTime, showModal } from '@/common/js/utils'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      enable: true,
      timeValue: formaterTime(+new Date(), 'hh:ii:ss'),
      dateTime: formaterTime(+new Date() + 3600 * 1000 * 24),
      priceRegulars: [{
        chargeField: {
          additionalProp1: {
            key: '',
            value: {
              value1: ''
            }
          }
        },
        price: 0
      }],
      changePriceRemark: '', //展示价格
    }
  },
  props: {
    priceRegular: {
      type: Array,
      default: () => []
    },
    priceValue: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    }
  },
  watch: {
    priceRegular: {
      handler(newValue, oldValue) {
        
        if(newValue.length) {
          this.priceRegulars = []
          newValue.forEach((v, k) => {
            let option = {}
            option.price = v.price
            option.chargeField = {}
            
            Object.keys(v.field).forEach((v1, k1) => {
              let opt = {}
              Object.keys(v.field[v1]).forEach((v2, k2) => {
                opt[`value${k2+1}`] = v.field[v1][v2]
              })
             
              option.chargeField[`additionalProp${k1+1}`] = {
                key: v1,
                value: opt
              }
            })
            this.priceRegulars.push(option)
          })
        }
      }, 
      deep: true,
      immediate: true
    },
  },
  computed: {
    ...mapGetters({
      allBasicChargeFieldList: 'basics/allBasicChargeFieldList'
   })
  },
  mounted() {
    this.getAllBasicChargeFieldAjax()
  },
  methods: {
    ...mapActions({
      getAllBasicChargeFieldAjax: 'basics/getAllBasicChargeFieldAjax',
    }),
    disabledDate(date) {
      return new Date().now() < date.getTime()
    },
    getParams() {
      let option = {
        priceRegulars: [],
        priceValue: this.priceValue / 1
      }, flag = false
     this.priceRegulars.forEach((v, k) => {
        let itemOptions = {
          field: {},
          price: v.price / 1
        }
        Object.keys(v.chargeField).map(v1 => {
          let valueOptions = []
          if(!v.chargeField[v1].key.trim()) return
          Object.keys(v.chargeField[v1].value).map( v2 => {
            if(v.chargeField[v1].value[v2]) {
              flag = true
              valueOptions.push(v.chargeField[v1].value[v2] / 1)
            }
          })
          if(itemOptions.field[v.chargeField[v1].key]) {
            itemOptions.field[v.chargeField[v1].key].push(...valueOptions)
          } else {
            itemOptions.field[v.chargeField[v1].key] = [...valueOptions]
          }
        })
        option.priceRegulars.push(itemOptions)
      })

      if(!option.priceValue) {
        showModal('请填写展示价格', 'warning')
        return
      }
      if(!flag) {
        showModal('至少填写一条规则', 'warning')
        return
      }
      if(this.type === 'prodctPrice') {
        option.priceDesc = this.changePriceRemark
        option.enable = this.enable
        option.enableTime = this.dateTime + ' ' + this.timeValue
        // if(!this.enable) {
        //   option.enableTime = this.dateTime + ' ' + this.timeValue
        // }
      } else {
        option.changePriceRemark = this.changePriceRemark
      }
      return option
    },
    addConditionItem(value, $el){
       this.$set(value.value, `value${+new Date()}`,'')
    },
    minusConditionItem(value, key, $el){
      delete value.value[key]
      this.$forceUpdate()
    },
    addPriceItem(value, $el) {
      this.$set(value.chargeField, `additionalProp${+new Date()}`, {
        key: '',
        value: {
          value1: ''
        }
      })
    },
    deleteregularField(value) {
      this.priceRegulars.splice(value, 1)
    },
    minusPriceItem(value, key) {
      delete value[key]
      this.$forceUpdate()
    },
    addNewpriceRegular () {
      this.priceRegulars.push({
        chargeField: {
          additionalProp1: {
            key: '',
            value: {
              value1: ''
            }
          }
        },
        price: ''
      })
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/css/variable'
.rlue-wrapper
  margin-bottom 10px
  overflow hidden
  .el-row
    .el-input__inner
      height 32px
      line-height 32px
  .rule-items
    display flex
    padding 10px 0
    border-bottom 1px dotted gray
    margin-bottom 10px
    .rule-items-wrapper
      width 75%
      position relative
      .rule-items-container, .only-one-rule-items-container
        display flex
        position relative
        &:after
          content ""
          position absolute
          min-height 1px
          right 65px
          height calc(100% + 10px)
          width 1px
          top 0
          background #409eff
        &:first-child:after
          height calc(50% + 10px)
          top 50%
        &:last-child:after
          height calc(50%)
          bottom 50%
        &:not(:first-child)
          margin-top 10px
        &>div
          position relative
          &:first-child
            width 56px
          &:not(:first-child)
            width 25%
            margin-left 10px
          .el-button
            position absolute
            top 50%
            height 40px
            margin-top -20px
          &.el-select
            .el-input
              position absolute
              text-align center
              top 50%
              height 40px
              margin-top -20px
        .is-disabled
          width 10% !important
          input
            position absolute
            text-align center
            top 50%
            height 40px
            margin-top -20px
        .produce-wrapper
          padding 10px
          border 1px solid #f5f2f2
          &:after
            content ""
            position absolute
            top 50%
            width  65px
            height 1px
            right -73px
            background #409eff
          .el-input-wrapper
            position relative
            &:not(:first-child)
              margin-top 10px
            input 
              width 75%
            button
              padding 8px !important
              margin-left 10px
      .only-one-rule-items-container
        &:after
          height 1px !important
    .rule-items-pirce
      width 25%
      position relative
      .el-button
        position absolute
        width 25%
        right 0
        top 50%
        height 40px
        text-align center
        margin-top -20px
      .el-input
        position absolute
        top 50%
        margin-top -20px
        width 70%
        &:before
          content ""
          position absolute
          top 20px
          width 61px
          height 1px
          left  -65px
          background #409eff

.switch-date-wrapper
  height 60px
  line-height 60px
  .el-date-editor--time
    margin-left 10px
</style>


