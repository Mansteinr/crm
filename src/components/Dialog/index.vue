<template>
  <el-dialog
    :title="title"
    :show-close="false"
    custom-class="customize-dialog"
    :visible="dialogShow"
    :width="width"
    :destroy-on-close="destroyOnClose"
    @close="close">
    <slot></slot>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '新增'
      },
      primaryText: {
        type: String,
        default: '确定'
      },
      subText: {
        type: String,
        default: '取消'
      },
      dialogShow: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '50%'
      },
      destroyOnClose: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }

</script>

<style lang="stylus">
.customize-dialog
  .dialog-footer
    text-align center
</style>