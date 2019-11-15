<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:!isShowPwdLogin}" @click="isShowPwdLogin = false;isPwdLogin = false">短信登录</a>
            <a href="javascript:;" :class="{on:isShowPwdLogin}"  @click="isShowPwdLogin = true;isPwdLogin = true">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:!isShowPwdLogin}">
              <section class="login_message">
                <input 
                  v-model="phone"
                  type="tel" 
                  maxlength="11" 
                  placeholder="手机号" 
                  name="phone" 
                  v-validate="'required|tel'">
                <span style="color:red" v-show="errors.has('phone')">{{errors.first('phone')}}</span>
                <button 
                  :disabled="!isRightPhone || !!countNum" 
                  class="get_verification" 
                  :class="{active:isRightPhone}"
                  @click.prevent="getCode"
                  ref="code"
                  >
                  {{countNum? `验证码在${countNum}秒后失效`: '获取验证码'  }}
                </button>
              </section>
              <section class="login_verification">
                <input 
                  v-model="code"
                  type="tel" 
                  maxlength="8" 
                  placeholder="验证码" 
                  name="code" 
                  v-validate="{required: true,regex: /\d{4,6}$/}">
                <span style="color:red" v-show="errors.has('code')">{{errors.first('code')}}</span>
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:isShowPwdLogin}">
              <section>
                <section class="login_message">
                  <input 
                    v-model="name" 
                    type="tel" 
                    maxlength="11" 
                    placeholder="手机/邮箱/用户名" 
                    name="username" 
                    v-validate="'required'">
                  <span style="color:red" v-show="errors.has('username')">{{errors.first('username')}}</span>
                </section>
                <section class="login_verification">
                  <input 
                    v-model="pwd" 
                    :type="isShowPwd?'text':'password'" 
                    maxlength="8" 
                    placeholder="密码" 
                    name="pwd" 
                    v-validate="'required'">
                  <span style="color:red" v-show="errors.has('pwd')">{{errors.first('pwd')}}</span>
                  <div class="switch_button" :class="{off:!isShowPwd,on:isShowPwd}" @click="isShowPwd = !isShowPwd">
                    <div class="switch_circle" :class="{active:isShowPwd}"></div>
                    <span class="switch_text">{{isShowPwd? "abc" : "..."}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input 
                    type="text"  
                    v-model="captcha"
                    maxlength="11" 
                    placeholder="验证码" 
                    name="phoneCode" 
                    v-validate="'required'">
                  <span style="color:red" v-show="errors.has('phoneCode')">{{errors.first('phoneCode')}}</span>
                  <img  ref="captcha" class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="updateCode">
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back">
          <i class="iconfont icon-jiantouzuo"></i>
        </a>
      </div>
    </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        isShowPwdLogin: false,
        isPwdLogin: false,
        isShowPwd: false,
        phone:'',
        code:'',
        captcha: '',
        pwd:'',
        name:'',
        countNum: 0
      }
    },
    methods: {
      // 更新验证码
      updateCode(){
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      },
      //统一登录的表单验证
      // 注意：验证的那些项
      async login(){
        let { isPwdLogin,phone,code,name,pwd,captcha } = this
        let names = isPwdLogin ? ['name','pwd','captcha'] : ['phone','code']
        const success = await this.$validator.validateAll(names) // 对所有表单项进行验证
        if(success){
          alert('前端验证success')
          // 判断是手机号登录/密码登录--邮箱
          console.log(name,pwd,captcha)
          let result
          if(isPwdLogin){
            // 密码登录
            console.log(captcha)
            result = await this.$API.reqLoginWithPwd(name,pwd,captcha)
            console.log(result)
            if(result.code === 1){
              // 密码登录失败，清空验证码
              this.captcha = ''
              this.updateCode()
              alert('登录失败')
            }
          }else{
            // 手机号登录，收集信息发送请求--验证码
            result = await this.$API.reqLoginWithSms(phone,code)
            console.log(result)
            if(result.code === 1){
              // 手机号登录失败，清空验证码
              this.code = ''
              alert('登录失败')
            }
          }
          
          // 验证成功
          if(result.code === 0){
            // 跳转页面
            alert('登录成功')
            // 保存数据到vuex
            this.$store.dispatch('getUser',result.data)
            this.$router.replace('/mine')
          }

        }else{
          alert('前端验证失败')
        }
      },
      async getCode(){
        // 发送验证码
        let { phone } = this
        let result =  await this.$API.reqSendCode(phone)
        if(result.code === 0){
          alert('发送成功')
        }else{
          alert('发送失败')
        }
        this.countNum = 30
        this.intervalId = setInterval(() => {
          this.countNum--
          if (this.countNum <= 0) {
            clearInterval(this.intervalId)
          }
        }, 1000);
      }
    },
    computed: {
      isRightPhone(){
        return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.active
                color #333
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.active
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
