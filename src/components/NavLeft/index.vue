<template>
  <!-- 左侧导航 -->
  <div class="nav-left" :class="isCollapse?'':'active'">
    <!-- {{menuActive}} -->
    <el-menu 
      class="el-menu-vertical-demo"
      background-color="#3f455b"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true" 
      :collapse="isCollapse"
      :router="true"
      :default-active="menuActive">
      <div class="mv-collapse" @click="collapse"><i class="iconfont icon-tubiaozhizuomoban"></i></div>
        <NavItem @selectedMeun="selectedMeun" v-for="menu in meunTreeList" :key="menu.path" :item="menu" />
    </el-menu>
  </div>
</template>
<script>

import NavItem from './navItem'
import { mapGetters,mapMutations, mapActions } from 'vuex' // 获取state里面的数据
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    NavItem
  },
  methods: {
    selectedMeun(value) {
      let unqiuFlag = false // 防止重复点击
      this.$router.push({path: value.href.trim()})
      
      // 此处是单独发送一个Mutationn 设置左侧激活状态
      this.setActiveMEUN(value.href.trim())
      
      // 防止头部导航器重复添加
      unqiuFlag = this.editableTabs.some(v => v.url === value.href.trim())

      if (!unqiuFlag) {
        this.setHeaderTab([{
          title: value.menuName,
          name: value.href,
          url: value.href
        }])
      }
      this.setActiveHeaderTab(this.menuActive)
    },
    collapse () { // 左侧菜单展开折叠
      this.isCollapse = !this.isCollapse
    },
    ...mapMutations({ // 获取SET_ACTIVE_MEUN的方法
      setActiveMEUN: 'configureModule/SET_ACTIVE_MEUN',
      setHeaderTab: 'configureModule/SET_HEADER_TABS',
      setActiveHeaderTab: 'configureModule/SET_ACTIVE_HEADER_TAB'
    })
  },
  computed: {
    ...mapGetters({
      editableTabs: 'configureModule/editableTabs',
      menuActive: 'configureModule/menuActive',
      meunTreeList: 'basics/navMeunList'
   })
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
@import '../../common/css/variable'

  
.nav-left
  background-color #2d2f3b
  .el-menu
    border none !important
    span
      &.no-icon
        padding-left 24px
  .el-menu-vertical-demo
    .mv-collapse
      text-align center
      .icon-tubiaozhizuomoban
        display block
        transform rotate(0deg)
        transition transform 0.6s
      &:hover
        color #fff
        background-color #00c2de
    &:not(.el-menu--collapse) 
      width 200px
    &.el-menu--collapse
      span 
        height 0
        width 0
        overflow hidden
        visibility hidden
        display inline-block
     
      .icon-tubiaozhizuomoban
        transform rotate(90deg)
</style>
