<!-- 显示部分 -->
<template>
  <div class="rlue-preview-wrapper">
    <el-row :gutter="20">
      <el-col :span="4"><el-button type="primary" plain>{{`${title}规则`}}</el-button></el-col>
      <el-col :span="6" :offset="1"><el-input :disabled="true" v-model="priceValue" :placeholder="title"></el-input></el-col>
    </el-row>
    <div class="rule-container">
      <div class="rule-items" v-for="(v, k)  in priceRegulars" :key="k">
        <div class="rule-items-wrapper">
          <div :class="Object.keys(priceRegulars[k].chargeField).length === 1 ? 'only-one-rule-items-container' : 'rule-items-container'" v-for="(v1, k1)  in priceRegulars[k].chargeField" :key="k1">
            <el-input :disabled="true" :value="priceRegulars[k].chargeField[k1].key || '暂无数据'"/>
            <el-input value="=" :disabled="true" ></el-input>
            <div class="produce-wrapper">
              <div class="el-input-wrapper" v-for="(v2, k2) in priceRegulars[k].chargeField[k1].value" :key="k2">
                <input class="el-input__inner" :disabled="true" placeholder="" v-model.trim="priceRegulars[k].chargeField[k1].value[k2]"/>
              </div>
            </div>
          </div>
        </div>
        <div class="rule-items-pirce">
          <el-input v-model.trim="priceRegulars[k].price" :disabled="true" placeholder=""></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { formaterTime, showModal } from '@/common/js/utils'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
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
    title: {
      type: String,
      default: '变更前'
    }
  },
  watch: {
    priceRegular: {
      handler(newValue, oldValue) {
        console.log(newValue)
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
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/css/variable'
.rlue-preview-wrapper
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
          right 0px
          height calc(50% + 10px)
          width 1px
          top 0
          background #409eff
        &:first-child:after
          top 50%
        &:last-child:after
          height calc(50%)
          bottom 50%
        &:not(:first-child)
          margin-top 10px
        .is-disabled
          width 25% !important
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
            right 0px
            background #409eff
          .el-input-wrapper
            position relative
            &:not(:first-child)
              margin-top 10px
            button
              padding 8px !important
              margin-left 10px
      .only-one-rule-items-container
        &:after
          height 1px !important
        &>div
          margin-left 1%
    .rule-items-pirce
      width 25%
      position relative
      .el-input
        position absolute
        top 50%
        margin-top -20px
        width 70%
        right 0
        &:before
          content ""
          position absolute
          top 20px
          width 61px
          height 1px
          left  -61px
          background #409eff
</style>