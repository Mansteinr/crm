<template>
  <el-pagination 
    @size-change="handleSizeChange" 
    @current-change="handleCurrentChange" 
    :current-page="pageNum" 
    :page-sizes="[10, 20, 50, tatalPage]" 
    :page-size="pageSize" 
    background 
    layout="total, sizes, prev, pager, next, jumper" 
    :total="tatalPage">
  </el-pagination>
</template>

<script>
  export default {
    data () {
      return {
        pageNum: 1,
        pageSize: 10
      }
    },
    props: {
      tatalPage: {
        type: Number,
        default: 0
      }
    },
    methods: {
      handleSizeChange (val) {
        if (val) {
          this.pageSize = val
        } else {
          this.pageSize = this.tableData.length
        }
        this.$emit('changePage','pageSize' + '-' + this.pageSize)
      },
      handleCurrentChange (val) {
        this.pageNum = val
        this.$emit('changePage', 'pageNum' + '-' + this.pageNum)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .el-pagination
    text-align: right;
    margin-top: 15px;
</style>