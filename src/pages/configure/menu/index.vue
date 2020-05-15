<template>
  <div class="template-wrapper" style="margin-bottom: 70px">
    <!--菜单管理 -->
    <Content
    title="菜单管理"
    @addFun="addFun"
    :data="meunTreeList" 
    :addIcon="true">
      <div class="table">
      <el-table
        :stripe="true"
        :border="false"
        :data="meunTreeList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children',hasChildren: 'hasChildren'}">
        <el-table-column
          prop="menuName"
          label="菜单名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="href"
          label="识别路径"
          width="180">
        </el-table-column>
        <el-table-column
          prop="menuType"
          label="菜单类型">
           <template slot-scope="scope" >
            <span>{{scope.row.menuType === 0 ? '菜单' : '按钮' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="icon"
          label="图标">
          <template slot-scope="scope" >
            <i :class="`table-icon icon iconfont ${scope.row.icon}`"></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="menuShow"
          label="是否展示">
            <template slot-scope="scope" >
               <el-tag :type="scope.row.menuShow ? 'success' : 'warning'">
                {{ scope.row.menuShow ? '是' : '否' }}
              </el-tag>
            </template>
        </el-table-column>
        <el-table-column
          prop="备注信息"
          label="remark">
        </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="180">
            <template slot-scope="scope" >
              <div class="tableTail" :data-children='JSON.stringify(scope.row.children)'>
                <el-button type="primary" class="mr"  @click="handleEdit(scope.row, $event)" plain slot="reference" size="small">编辑</el-button>
                <el-button type="primary" class="mr"  @click="addFun(scope.row)" plain slot="reference" size="small">新增子菜单</el-button>
                <el-popconfirm
                  :title="`确定删除 ${scope.row.menuName} 吗？`"
                  @onConfirm="handleDelete(scope.row)"
                  >
                    <el-button type="primary" plain slot="reference" size="small">删除</el-button>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
      </el-table>
      </div>
    </Content>
    <Dialog
      @close="close"
      :title="dialogTitle"
      :dialogShow="addNewMeunFlag"
    >
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model.trim="ruleForm.menuName"></el-input>
        </el-form-item>
        <el-form-item label="识别路径" prop="href">
          <el-input v-model.trim="ruleForm.href"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="ruleForm.menuType">
          <el-radio :label="0">菜单</el-radio>
          <el-radio :label='1'>按钮</el-radio>
          <el-radio :label='2'>目录</el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="位置" prop="preMenuId">
          <el-select v-model="ruleForm.preMenuId" filterable placeholder="请选择">
            <el-option
              v-for="item in menuTypeData"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图标" prop="icon" class="icon-label">
          <el-button type="primary" plain @click="choseIcon">选择图标</el-button>
          <span style="margin-left: 10px;" :class="`table-icon icon iconfont ${ruleForm.icon}`"></span>
        </el-form-item>
        <el-form-item label="权限标识符" prop="permission">
          <el-input v-model.trim="ruleForm.permission"></el-input>
        </el-form-item>
        <el-form-item label="是否展示" prop="menuShow">
          <el-radio-group v-model="ruleForm.menuShow">
            <el-radio :label="true">是</el-radio>
            <el-radio :label='false'>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model.trim="ruleForm.remark"></el-input>
        </el-form-item>
      </el-form>
        <el-dialog
          title="选择icon"
          append-to-body
          custom-class="customize-dialog"
          :visible.sync="iconShow"
          width="750px"
        >
        <icon @selectIcon="selectIcon"/>
        <div class="dialog-footer">
          <el-button @click="iconShow = false">取 消</el-button>
      </div>
      </el-dialog>
      <div class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="determineClick">确 定</el-button>
      </div>
    </Dialog>


  </div>
</template>

<script>
import icon from './icon'
import Dialog from '@/components/Dialog'
import Content from '@/components/Content'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialogTitle: '新增菜单',
      iconShow: false,
      checkedkey: [],
      objectData: {},
      filterData: [],
      filterFlag: false,
      menuTypeData: [{
        id: '0',
        label: '默认第一个'
      }],
      ruleForm: {
        menuName: '',
        href: '',
        preMenuId: '0',
        parentId: '0',
        menuType: 0,
        icon: '',
        permission: '',
        remark: '',
        menuShow: true,
      },
      rules: {
        menuName: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        href: [
          { required: true, message: '请输入识别路径', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    icon,
    Dialog,
    Content
  },
  methods: {
    selectIcon(value) {
      this.iconShow = false
      this.ruleForm.icon  = value
    },
    choseIcon() {
      this.iconShow = true
    },
    getTreeData(data, parentId, id) {
      let localData = JSON.parse(JSON.stringify(data))
      if(!data) return
      if (localData && localData.length > 0) {
        localData.some((v, i) => {
          if(v.id === parentId) {
            let filterData = []
            v.children.forEach(v1 => {
              if(v1.id !== id) {
                filterData.push(v1)
              }
            })
            this.filterFlag = true
            this.menuTypeData =  [...this.menuTypeData, ...filterData]
            return true 
          }
          if(v.children) {
            this.getTreeData(v.children, parentId)
          }
        })
      }
      // return trueData
    },
    // 编辑
    handleEdit (value, e) {
      this.menuTypeData = [{
        id: '0',
        label: '默认第一个'
      }]
      // 目录
      if(value.menuType === 2) {
        this.meunTreeList.forEach(v => {
          this.menuTypeData.push(v)
        })
      } else { // 菜单
        this.getTreeData(this.meunTreeList, value.parentId, value.id)
      }
      this.dialogTitle = '编辑'
      Object.keys(this.ruleForm).map(v => {
        if(v === 'menuType') {
          this.ruleForm[v] = value[v] / 1
        } else if(v === 'menuShow') {
          this.ruleForm[v] = Boolean(value[v])
        } else {
          this.ruleForm[v] = value[v] || '0'
        }
        
      })
      this.ruleForm.menuId = value.id
      this.changeNewMeunFlag(true)
    },
    // 删除
    handleDelete (value) {
     this.deleteMenuAjax(value.menuId)
    },
    // 新增
    addFun(value) {
      this.dialogTitle = '新增菜单'
      this.objectData = value
      // value 存在则不为一级菜单 反之为一级菜单
      this.menuTypeData = [{
        id: '0',
        label: '默认第一个'
      }]
      if(!value) { // 新增一级菜单
        this.meunTreeList.map(v => {
          this.menuTypeData.push(v)
        })
        this.ruleForm.parentId = '0'
      } else { // 子菜单
        this.ruleForm.parentId = value.id
        if(value.children && value.children.length) {
          value.children.map(v => {
            this.menuTypeData.push(v)
          })
        }
      }
      this.ruleForm.preMenuId = this.menuTypeData[0].id
      this.changeNewMeunFlag(true)
    },
    determineClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(this.dialogTitle === '编辑') {
            this.updateMenuAjax(this.ruleForm)
          } else {
            this.addNewMenuAjax(this.ruleForm)
          }
        } else {
          return false
        }
      })
    },
    close() {
      this.$refs.ruleForm.resetFields()
    },
    resetForm() {
      this.changeNewMeunFlag(false)
    },
    ...mapActions({
      updateMenuAjax: 'configureModule/updateMenuAjax',
      deleteMenuAjax: 'configureModule/deleteMenuAjax',
      addNewMenuAjax: 'configureModule/addNewMenuAjax',
      getMenuTreeAjax: 'configureModule/getMenuTreeAjax',
    }),
    ...mapMutations({
      changeNewMeunFlag: 'configureModule/ADD_NEW_MEUN' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
  },
  computed: {
    ...mapGetters({
      meunTreeList: 'configureModule/meunTreeList',
      addNewMeunFlag: 'configureModule/addNewMeunFlag',
   })
  },
  mounted() {
    this.getMenuTreeAjax(this.$route)
  }
}
</script>

<style lang="stylus">
@import '../../../common/css/iconfont.css'
.table-icon
  display block
  width 32px
  height 32px
  color #409eff
  &:before
    font-size 25px
    line-height 32px
.icon-label
  .el-form-item__content
    display flex
</style>
