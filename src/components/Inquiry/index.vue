  <!-- 查询模块 -->
<template>
  <div class="card-wrapper">
    <div class="card-title">
      {{ title || $t('m.basics.queryCardTitle') }}
    </div>
    <div class="card-container">
      <el-form :inline="true" :model="queryParams" ref="querForm" class="query-form">
        <slot></slot>
        <el-form-item class="query-item">
          <query-button @reset="resetForm" @submit="onSubmit"></query-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">


</style>

<script>
  import QueryButton from '@/components/QueryButton'
  export default {
    data () {
      return { }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      queryParams: {
        type: Object,
        default: () => { }
      }
    },
    components: {
      QueryButton
    },
    methods: {
      resetForm () {
        this.$refs.querForm.resetFields()
      },
      onSubmit() {
        this.$emit('initFun', this.queryParams)
      }
    }
  }
</script>