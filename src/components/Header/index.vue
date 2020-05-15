<!-- 头部 -->
<template>
  <!-- <div> -->
  <el-header class="m-header">
    <div class="header-logo"></div>
    <div class="header-menu-warp">
      <el-select v-model="chooseLanguageTitle" class="chooseLanguageSelect" :placeholder="$t('m.header.choosePlaceholder')">
        <el-option @click.native="selectLang('zh')" value="中文"></el-option>
        <el-option @click.native="selectLang('en')" value="English"></el-option>
      </el-select>
      <el-select v-model="userName" class="chooseLanguageSelect" >
        <el-option :value="userName">{{userName}}</el-option>
        <el-option @click.native="loginOut" :value="$t('m.header.loginOut')">{{$t('m.header.loginOut')}}</el-option>
      </el-select>
    </div>
  </el-header>
</template>

<script type="text/ecmascript-6">
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        chooseLanguageTitle: '中文',
        userName: 'zhoumingye'
      }
    },
    methods: {
      // 选择语言
      selectLang (value) {
        this.$i18n.locale = value
      },
      loginOut () { // 退出
        this.doLoginOutAjax()
      },
      ...mapActions({
        doLoginOutAjax: 'basics/doLoginOutAjax'
      })
    },
    mounted() {
      this.userName = JSON.parse(localStorage.getItem('userInfo')).loginName
    },
    computed: {
      ...mapGetters({
        loginOutFlag: 'basics/loginOutFlag',
      })
    }
  }
</script>

<style  lang="stylus" rel="stylesheet/stylus">
@import '../../common/css/variable';
  .m-header
    box-shadow 0 4px 16px rgba(0, 0, 0, 0.08)
    width: 100%;
    position: fixed;
    background $color-nave;
    padding-right: 0
    .header-menu-warp 
      position relative
      float right
      height 60px
      line-height 60px
      width 240px
      padding 0
      display flex
      .chooseLanguageSelect
        width 40%
        .el-select__caret
          position relative
          top -1px
      .chooseNameSelect
        width 68%
      span 
        color white
      input 
        background-color rgba(43, 63, 115, 0) !important
        border none !important
        color white
        padding 0
    .header-logo 
      display inline-block
      width 250px
      height 100%
      background url('../../common/images/logo.png') no-repeat 16px center
</style>