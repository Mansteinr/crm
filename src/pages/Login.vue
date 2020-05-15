<template>
  <div class="login-wrapper">
    <div class="login-container" :class="{ bias: biasFlag, move: moveFlag }">
      <div class="login-input-warp">
        <span class="iconfont icon-guanliyuan"></span>
        <input
          type="text"
          v-model="loginName"
          :placeholder="$t('m.login.loginName')"
          @keyup.enter="goLogin"
        />
      </div>
      <div class="login-input-warp login-pwd">
        <span class="iconfont icon-mima"></span>
        <input
          :type="isShow ? 'text' : 'password'"
          v-model="auth"
          :placeholder="$t('m.login.auth')"
          @keyup.enter="goLogin"
        />
        <span
          @click="toggelShow"  class="iconfont toggelShow"
          :class="isShow ? 'icon-buxianshimima' : 'icon-xianshimima'"
        ></span>
      </div>
      <div class="input-code">
        <input
          type="text"
          id="code"
          v-model.trim="verifyCode"
          class="user-input"
          :placeholder="$t('m.login.placeholder')"
          @keyup.enter="goLogin"
          maxlength="4"
        />
        <img class="code-img" :src="`data:image/png;base64,${vCode}`" :alt="$t('m.login.imageAlt')" @click="reloadImg" />
      </div>
      <div @click="goLogin" class="login-button">{{$t('m.login.loginBtnText')}}</div>
    </div>
    <div class="authent" :class="{ visible: visibleFlag }">
      <div class="loader" style="height: 44px;width: 44px;margin-left: 28px;">
        <div class="loader-inner ball-clip-rotate-multiple">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <p>验证登录中...</p>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5"
import axios from "axios"
import API from '@/config/api'
import { showModal } from '@/common/js/utils'
import { mapActions, mapGetters, mapMutations } from "vuex"
export default {
  data() {
    return {
      auth: "",
      loginName: "",
      isShow: false,
      biasFlag: false,
      moveFlag: false,
      verifyCode: '',
      visibleFlag: false
    }
  },
  computed: {
    ...mapGetters({
      random: "basics/random",
      vCode: "basics/verifyCode"
    })
  },
  methods: {
     ...mapMutations({
      setNavMeunList: 'basics/GET_NAV_MEUN_LIST',
    }),
     ...mapActions({
      getVerifyCodeAjax: "basics/getVerifyCodeAjax", //获取验证码
    }),
    toggelShow() {
      this.isShow = !this.isShow
    },
    reloadImg() {
      this.getVerifyCodeAjax()
    },
    goLogin() {
    if (!this.auth || !this.loginName) {
        showModal('密码账户不能为空', 'error')
      } else {
        this.biasFlag = true
        let timer = setTimeout(() =>{
          this.moveFlag = true
          this.visibleFlag = true
          axios({
            method: 'post',
            url: API.base.login,
            data: { auth: md5(this.auth), loginName: this.loginName, random: this.random,verifyCode: this.verifyCode },
            responseType: 'json'
          }).then(res => {
            if (res.data.messageCode === 10000) {
              this.setNavMeunList(res.data.resData.menuTrees)
              localStorage.setItem('userInfo', JSON.stringify(res.data.resData))
              localStorage.setItem('token', res.data.resData.token)
              let firstHref = res.data.resData.menuTrees[0].children.length > 0 ? res.data.resData.menuTrees[0].children[0].href : res.data.resData.menuTrees[0].href
              this.$router.push(firstHref)
              showModal('登录成功')
            } else {
              this.getVerifyCodeAjax()
              this.verifyCode = ''
              showModal(res.data.messageText, 'error')
            }
            this.biasFlag = false
            this.moveFlag = false
            this.visibleFlag = false
            if(timer) {
              clearTimeout(timer)
            }
          }).catch(err => {
            this.biasFlag = false
            this.moveFlag = false
            this.visibleFlag = false
            if(timer) {
              clearTimeout(timer)
            }
          })
        }, 800)
    
      }
    }
  },
  mounted() {
    this.getVerifyCodeAjax()
  }
}
</script>
<style lang="stylus" scoped>
.login-wrapper {
  height 100%
  background url(../common/images/kehuan_shangmao-008.jpg) repeat
  background-size 100% 100%
  .login-container {
    position absolute
    width 350px
    height 300px
    top 20px
    left 0
    right 0
    margin auto
    top 0
    bottom 0
    padding 50px 70px
    border-radius 8px
    box-shadow -15px 15px 15px rgba(6, 17, 47, 0.7)
    -webkit-transition-property -webkit-transform, opacity, box-shadow, top, left
    transition-property transform, opacity, box-shadow, top, left
    -webkit-transition-duration 0.9s
    transition-duration 0.9s
    -webkit-transform-origin 161px 100%
    -ms-transform-origin 161px 100%
    transform-origin 161px 100%
    -webkit-transform rotateX(0deg)
    transform rotateX(0deg)
    background-image linear-gradient(
      230deg,
      rgba(53, 57, 74, 0) 0%,
      rgb(0, 0, 0) 100%
    )
    opacity 0.9
    &.bias {
      box-shadow 0px 20px 30px 3px rgba(0, 0, 0, 0.55)
      pointer-events none
      top -100px !important
      -webkit-transform rotateX(70deg) scale(0.8) !important
      transform rotateX(70deg) scale(0.8) !important
      opacity 0.6 !important
      -webkit-filter blur(1px)
      filter blur(1px)
    }
    &.move {
      left -320px !important
    }
    .login-input-warp {
      position relative
      border solid 1px #c1c4cd
      line-height 40px
      background-color #f3f6fd
      border-radius 6px
      padding 0 10px 0 40px
      background-repeat no-repeat
      background-position 11px center
      margin-bottom 30px
      transition all 0.3s
      .iconfont {
        position absolute
        left 13px
      }
      .toggelShow {
        left 90% !important
      }
      input {
        width 100%
        height 40px
        border none
      }
    }
    .input-code {
      height 50px
      margin-bottom 30px
      .user-input {
        width 60%
        height 40px
        line-height 42px
        text-indent 10px
        outline none
        border-radius 8px
        border solid 1px rgba(153, 153, 153, 0.75)
        box-shadow 0 0 4px rgba(153, 153, 153, 0.5)
        float left
      }
      .code-img {
        float right
        width 35%
        height 40px
        border-radius 8px
        border solid 1px rgba(153, 153, 153, 0.3)
        box-shadow 0 0 4px rgba(153, 153, 153, 0.5)
      }
    }
    .login-button {
      border-radius 50px
      background transparent
      padding 10px 50px
      border 2px solid #4fa1d9
      color #4fa1d9
      text-transform uppercase
      font-size 11px
      -webkit-transition-property background, color
      transition-property background, color
      -webkit-transition-duration 0.2s
      transition-duration 0.2s
      text-align center
    }
  }
  .authent {
    position absolute
    height 70px
    width 100px
    left 0
    right -300%
    margin auto
    letter-spacing 1px
    text-align center
    padding 20px 70px
    bottom 315px !important
    text-transform uppercase
    color white
    box-shadow 0px 20px 30px 3px rgba(0, 0, 0, 0.55)
    background #35394a
    background linear-gradient(
      230deg,
      rgba(53, 57, 74, 0) 0%,
      rgb(0, 0, 0) 100%
    )
    // filter progidDXImageTransform.Microsoft.gradient( startColorstr='rgba(53, 57, 74, 0)', endColorstr='rgb(0, 0, 0)',GradientType=1 )
    &.visible {
      animation: woreMove 1s 0s ease-in-out forwards
    }
    .ball-clip-rotate-multiple {
      position: relative
      div {
        animation-fill-mode: both
        position absolute
        left 0px
        top 0px
        border 2px solid #fff
        border-bottom-color transparent
        border-top-color transparent
        border-radius 100%
        height 35px
        width 35px
        -webkit-animation rotate 1s 0s ease-in-out infinite
        animation rotate 1s 0s ease-in-out infinite
        .last-child {
          display inline-block
          top 10px
          left 10px
          width 15px
          height 15px
          -webkit-animation-duration 0.5s
          animation-duration 0.5s
          border-color #fff transparent #fff transparent
          -webkit-animation-direction reverse
          animation-direction reverse
        }
      }
    }
  }
}

@keyframes rotate {
  0% {
    -webkit-transform rotate(0deg) scale(1)
    transform rotate(0deg) scale(1)
  }
  50% {
    -webkit-transform rotate(180deg) scale(0.6)
    transform rotate(180deg) scale(0.6)
  }
  100% {
    -webkit-transform rotate(360deg) scale(1)
    transform rotate(360deg) scale(1)
  }
}
@keyframes woreMove {
  from {
    right -300%
  }
  to {
    right -35%
  }
}
</style>