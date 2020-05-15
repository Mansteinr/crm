<!-- 显示部分 -->
<template>
  <div class="card-wrapper card-content">
    <div class="card-title">
      {{title || $t('m.basics.resultCardTitle')}}
      <el-button class="fr" size="mini" v-show="addIcon" @click="addFun" type="primary">新增</el-button>
    </div>
    <div class="card-container">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import NoData from '@/components/NoData'
export default {
  components: {
    NoData
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    addIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addFun() {
      this.$emit('addFun')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/css/variable'
.card-wrapper
  .el-icon-circle-plus-outline
    color $color-menuitemhover-color
</style>