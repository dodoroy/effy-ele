<template>
<div class="loginContainer">
  <app-header :head-title="loginWay? '登录':'密码登录'" go-back="true">
      <!-- <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay? "密码登录":"短信登录"}}</div> -->
  </app-header>
  <form class="loginForm" v-if="loginWay">
    <section class="input_container phone_number">
      <input type="text" placeholder="账号密码随便输入" name="phone" maxlength="11" v-model="phoneNumber">
      <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
      <button  @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
    </section>
    <section class="input_container">
      <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
    </section>
  </form>
  <form class="loginForm" v-else>
    <section class="input_container">
      <input type="text" placeholder="账号" v-model.lazy="userAccount">
    </section>
    <section class="input_container">
      <input v-if="!showPassword" type="password" placeholder="密码"  v-model="password">
      <input v-else type="text" placeholder="密码"  v-model="password">
      <div class="button_switch" :class="{change_to_text: showPassword}">
        <div class="circle_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
        <span>abc</span>
        <span>...</span>
      </div>
    </section>
    <section class="input_container captcha_code_container">
      <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
      <div class="img_change_img">
        <img v-show="captchaCodeImg" :src="captchaCodeImg">
        <div class="change_img" @click="getCaptchaCode">
          <p>看不清</p>
          <p>换一张</p>
        </div>
      </div>
    </section>
  </form>
  <p class="login_tips">
    温馨提示：未注册过的账号，登录时将自动注册
  </p>
  <p class="login_tips">
    注册过的用户可凭账号密码登录
  </p>
  <div class="login_container" @click="mobileLogin">登录</div>
  <router-link to="/forget" class="to_forget" v-if="!loginWay">重置密码？</router-link>
  <AlertTip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></AlertTip>
</div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AlertTip from '@/components/AlertTip'
import { localapi, proapi, imgBaseUrl } from '@/config/env'
import { mapState, mapMutations } from 'vuex'
import { mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin } from '@/service/getData'

export default {
  data() {
    return {
      loginWay: false, // 登录方式，默认短信登录
      showPassword: false, // 是否显示密码
      phoneNumber: null, // 电话号码
      mobileCode: null, // 短信验证码
      validateToken: null, // 获取短信时返回的验证值，登录时需要
      computedTime: 0, // 倒数记时
      userInfo: null, // 获取到的用户信息
      userAccount: null, // 用户名
      password: null, // 密码
      captchaCodeImg: null, // 验证码地址
      codeNumber: null, // 验证码
      showAlert: false, // 显示提示组件
      alertText: null, // 提示的内容
    }
  },
  created() {
    this.getCaptchaCode()
  },
  components: {
    AppHeader,
    AlertTip,
  },
  computed: {
    // 判断手机号码
    rightPhoneNumber() {
      return /^1\d{10}$/gi.test(this.phoneNumber)
    },
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO',
    ]),
    // 改变登录方式
    changeLoginWay() {
      this.loginWay = !this.loginWay
    },
    // 是否显示密码
    changePassWordType() {
      this.showPassword = !this.showPassword
    },
    // 获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
    async getCaptchaCode() {
      const res = await getcaptchas()
      this.captchaCodeImg = res.code
    },
    // 获取短信验证码
    async getVerifyCode() {
      if (this.rightPhoneNumber) {
        this.computedTime = 30
        this.timer = setInterval(() => {
          this.computedTime--
          if (this.computedTime == 0) {
            clearInterval(this.timer)
          }
        }, 1000)
        // 判读用户是否存在
        const exsis = await checkExsis(this.phoneNumber, 'mobile')
        if (exsis.message) {
          this.showAlert = true
          this.alertText = exsis.message
          return
        } else if (!exsis.is_exists) {
          this.showAlert = true
          this.alertText = '您输入的手机号尚未绑定'
          return
        }
        // 发送短信验证码
        const res = await mobileCode(this.phoneNumber)
        if (res.message) {
          this.showAlert = true
          this.alertText = res.message
          return
        }
        this.validateToken = res.validate_token
      }
    },
    // 发送登录信息
    async mobileLogin() {
      if (this.loginWay) {
        if (!this.rightPhoneNumber) {
          this.showAlert = true
          this.alertText = '手机号码不正确'
          return
        } else if (!(/^\d{6}$/gi.test(this.mobileCode))) {
          this.showAlert = true
          this.alertText = '短信验证码不正确'
          return
        }
        // 手机号登录
        this.userInfo = await sendLogin(this.mobileCode, this.phoneNumber, this.validateToken)
      } else {
        if (!this.userAccount) {
          this.showAlert = true
          this.alertText = '请输入手机号/邮箱/用户名'
          return
        } else if (!this.password) {
          this.showAlert = true
          this.alertText = '请输入密码'
          return
        } else if (!this.codeNumber) {
          this.showAlert = true
          this.alertText = '请输入验证码'
          return
        }console.log('-------------',this.userAccount,this.password,this.codeNumber)
        // 用户名登录
        //this.userInfo = await accountLogin(this.userAccount, this.password, this.codeNumber)
        this.userInfo = {
          username: "dodo_yin",
          user_id: 14251,
          id: 14251,
          city: "北京",
          registe_time: "2018-10-16 10:26",
          column_desc: {
            gift_mall_desc: "0元好物在这里",
            game_link: "https://gamecenter.faas.ele.me",
            game_is_show: 1,
            game_image_hash: "05f108ca4e0c543488799f0c7c708cb1jpeg",
            game_desc: "玩游戏领红包"
          },
          point: 0,
          mobile: "",
          is_mobile_valid: true,
          is_email_valid: false,
          is_active: 1,
          gift_amount: 3,
          email: "",
          delivery_card_expire_days: 0,
          current_invoice_id: 0,
          current_address_id: 0,
          brand_member_new: 0,
          balance: 0,
          avatar: "default.jpg",
          __v: 0
        }
      }
      // 如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
      if (!this.userInfo.user_id) {
        this.showAlert = true
        this.alertText = this.userInfo.message
        if (!this.loginWay) this.getCaptchaCode()
      } else {
        this.RECORD_USERINFO(this.userInfo)
        this.$router.go(-1)
      }
    },
    closeTip() {
      this.showAlert = false
    },
  },
}

</script>

<style lang="scss" scoped>
@import '../assets/style/mixin';

.loginContainer{
    padding-top: 1.95rem;
    p, span, input{
        font-family: Helvetica Neue,Tahoma,Arial;
    }
}
.change_login{
    position: absolute;
    @include ct;
    right: 0.75rem;
    @include sc(.7rem, #fff);
}

.loginForm{
    background-color: #fff;
    margin-top: .6rem;
    .input_container{
        display: flex;
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #f1f1f1;
        input{
            @include sc(.7rem, #666);
        }
        button{
            @include sc(.65rem, #fff);
            font-family: Helvetica Neue,Tahoma,Arial;
            padding: .28rem .4rem;
            border: 1px;
            border-radius: 0.15rem;
        }
        .right_phone_number{
            background-color: #4cd964;
        }
    }
    .phone_number{
        padding: .3rem .8rem;
    }
    .captcha_code_container{
        height: 2.2rem;
        .img_change_img{
            display: flex;
            align-items: center;
            img{
                @include wh(3.5rem, 1.5rem);
                margin-right: .2rem;
            }
            .change_img{
                display: flex;
                flex-direction: 'column';
                flex-wrap: wrap;
                width: 2rem;
                justify-content: center;
                p{
                    @include sc(.55rem, #666);
                }
                p:nth-of-type(2){
                    color: #3b95e9;
                    margin-top: .2rem;
                }
            }
        }
    }
}
.login_tips{
    @include sc(.5rem, red);
    padding: .4rem .6rem;
    line-height: .5rem;
    a{
        color: #3b95e9;
    }
}
.login_container{
    margin: 0 .5rem 1rem;
    @include sc(.7rem, #fff);
    background-color: #4cd964;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
}
.button_switch{
    background-color: #ccc;
    display: flex;
    justify-content: center;
    @include wh(2rem, .7rem);
    padding: 0 .2rem;
    border: 1px;
    border-radius: 0.5rem;
    position: relative;
    .circle_button{
        transition: all .3s;
        position: absolute;
        top: -0.2rem;
        z-index: 1;
        left: -0.3rem;
        @include wh(1.2rem, 1.2rem);
        box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
        background-color: #f1f1f1;
        border-radius: 50%;
    }
    .trans_to_right{
        transform: translateX(1.3rem);
    }
    span{
        @include sc(.45rem, #fff);
        transform: translateY(.05rem);
        line-height: .6rem;
    }
    span:nth-of-type(2){
        transform: translateY(-.08rem);
    }
}
.change_to_text{
    background-color: #4cd964;
}
.to_forget{
    float: right;
    @include sc(.6rem, #3b95e9);
    margin-right: .3rem;
}
</style>
