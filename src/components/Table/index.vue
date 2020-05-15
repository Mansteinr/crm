<template>
  <div class="table">
    <el-col :class="showPlusIcon ? 'table-tools': ''" :span="showPlusIcon ? 8 : 4" :offset="showPlusIcon ? 16 : 20" >
      <el-input  v-show="showSearchIcon" v-model.trim="search" size="mini" :placeholder="`请输入${placeholder}`"/>
      <el-button v-show="showPlusIcon" @click="addFun" type="primary" icon="el-icon-plus" size="mini"></el-button>
    </el-col>
    
    <el-table
      :data="sidePagination === 'customer' ? tableDataComputed.slice(start, end) : tableData"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      :stripe="true"
      :span-method="mergeCell?objectSpanMethod:null"
      :border="isBorder"
      :tree-props="treeProps"
      @selection-change="handleSelectionChange"
      style="width: 100%">
        <slot name="selection"></slot>
        <template  v-for="(v, k) in columns">
          <el-table-column
            v-if="v.type === 'image'"
            :key="k"
            :label="v.label"
            :fixed="v.fixed"
            :class-name="v.className"
            :width="v.width"
            :align="v.align"
            :min-width="v.minWidth"
            :show-overflow-tooltip="v.showOverflow?v.showOverflow:true"
            :formatter="v.formatter"
            :sortable="v.sortable"
            :type="v.type"
            :prop='v.prop'>
            <template slot-scope="scope">
              <el-image style="width: 34px; height: 34px"
                :alt="v.urlType === 'base64' ? `data:image/jpeg;base64,${scope.row[v.prop]}` : scope.row[v.prop]"
                :src="v.urlType === 'base64' ? `data:image/jpeg;base64,${scope.row[v.prop]}` : scope.row[v.prop]"
                fit="contain"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="k"
            :label="v.label"
            :fixed="v.fixed"
            :class-name="v.className"
            :width="v.width"
            :align="v.align"
            :min-width="v.minWidth"
            :show-overflow-tooltip="v.showOverflow?v.showOverflow:true"
            :formatter="v.formatter"
            :sortable="v.sortable"
            :type="v.type"
            :prop='v.prop'>
             <template slot-scope="scope">
               <div :class="v.template ? 'template-wrapper' : ''" v-html="v.template ? v.template(scope.row): scope.row[v.prop]"></div>
            </template>
          </el-table-column>
        </template>
        <slot name="tableTail"></slot>
    </el-table>
    <Pagination
      @changePage="changePage" 
      :tatalPage="sidePagination === 'customer' ? total : tatalPage" 
      v-show="tatalPage>1"></Pagination>
   </div>
</template>

<script>
/**
 * 支持多选 单选 搜索 前端分页 后端分页 前端导出excel txt等格式 单元格合并
 */
  
        let timer
  // import NoData from '../NoData'
  import Pagination from '../Pagination'
  export default {
    data () {
      return {
        end: 10,
        start:0,
        josn: {},
        search: '',
        pageSize: 10,
        pageNum: 1,
        dialogVisible: false,
        spanArr: [] // 合并单元格时 统计需要合并单元格数量
      }
    },
    props: {
      showSearchIcon: {
        type: Boolean,
        default: true
      },
      showPlusIcon: {
        type: Boolean,
        default: false
      },
      tatalPage: {
        type: Number,
        default: 0
      },
      tableData: {
        type: Array,
        default: () => []
      },
      treeProps: {
        type: Object,
        default: () => {}
      },
      showSummary: {
        type: Boolean,
        default: false
      },
      sidePagination: {
        type: String,
        default: 'server'
      },
      placeholder: {
        type: String,
        default: '关键字'
      },
      columns: { // 定义表格
        type: Array,
        default: () => []
      },
      isBorder: { // 是否现在网格
        type: Boolean,
        default: false
      },
      mergeCell: { // 合并单元格
        type: String,
        default: ''
      },
      getTableDataFun: {
        type: Function,
        default: () => {}
      },
      showPlusIcon: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Pagination
    },
    watch: {
      search() {
        // 节流
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          this.$emit('searchChange', this.search)
        }, 600)
      }
    },
    methods: {
      searchChange(value) {
        this.search = value
        this.$emit('searchChange', value)
      },
      handleSelectionChange(val) {
        this.$emit('handleSelectionChange', val)
      },
      addFun() {
        this.$emit('addFun')
      },
      changeDialog (val) {
        this.dialogVisible = val
      },
      getSummaries (param) {
        const { columns } = param, sums = []
        columns.forEach((column, index) => {
          if (!column || column.label === '操作') return
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          // column.property 为自己定义的 data为table中的数据 即会计算当前页面的总和
          // const values = data.map(item => Number(item[column.property]))
          const values = this.tableDataComputed.map(item => 
            (column.property.toLowerCase().indexOf('time')>-1||column.property.toLowerCase().indexOf('date')>-1||column.property.toLowerCase().indexOf('day')>-1)? Number(item[column.property])+',' : Number(item[column.property])
          )
          // !values.some(value => isNaN(value)) 是判断数组中是否含有NaN
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index]
          } else {
            sums[index] = '-'
          }
        })
        sums.forEach((v, k) => { // 保留两位
          if (Number(v)) {
            sums[k] = Math.round(v * 100) / 100 // 防止出现很多为小数
          }
        })
        return sums
      },
      changePage (value) {
        this[value.split('-')[0]] = value.split('-')[1] / 1
        this.start = this.pageSize * (this.pageNum - 1)
        this.end = Math.min(this.pageSize * (this.pageNum), this.tableData.length)

        if(this.sidePagination === 'server') {
          this.$emit('changePage', value)
        }
      },
      objectSpanMethod({ rowIndex, columnIndex }) {  // 合并单元格
        if (columnIndex === 0) {
          return {
            rowspan: this.spanArr[rowIndex],
            colspan: 1
          }
        }
      },
      getSpanArr(data) {  // 统计需要合并的格数
        if (data.length <= 0) return // 没数据时 直接返回
        this.spanArr = []
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1);
            this.pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i][this.mergeCell] === data[i - 1][this.mergeCell]) {
              this.spanArr[this.pos] += 1 // 索引加1
              this.spanArr.push(0)  // 索引加1之后 push 0
            } else {
              this.spanArr.push(1) //不同之后 直接push 1
              this.pos = i
            }
          }
        }
      }
    },
    computed: {
      tableDataComputed (param) {
        const { $children } = param, searchKeys = [], search = this.search
        $children.map(v => {
          if (v.$el.className.indexOf('el-table') > -1) {
            v.columns.map(v1 => {
              searchKeys.push(v1.property)
            })
          }
        })
        if (search) {
          return this.tableData.filter(v => {
            return searchKeys.some(key => {
              // 非对象
              if (typeof v[key] !== 'object') {
                return String(v[key]).toLowerCase().indexOf(search) > -1
              } else { 
                // 数组
                if (Array.isArray(v[key])) {
                  return v[key].includes(search)
                } else {
                  if (key.indexOf('?') === -1) { // 带有参数的
                    Object.keys(v[key]).some(objKey => {
                      return String(v[key][objKey]).toLowerCase().indexOf(search) > -1
                    })
                  } else { // 带有参数的 防止过多的搜索
                    key.split('?')[1].split('&').some(arrKey => {
                      return String(v[key][arrKey]).toLowerCase().indexOf(search) > -1
                    })
                  }
                }
              }
            })
          })
        }
        if (this.mergeCell) {
          this.getSpanArr(this.tableData)
        }
        return this.tableData
      },
      total () {
        return this.tableDataComputed.length
      }
    }
  }
</script>
<style lang="stylus">
  .table
    overflow hidden
    .table-tools
      .el-input
        width 70%
        margin-right 10px

</style>
