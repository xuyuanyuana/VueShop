<template>
<form>
  <div>
    <section>
      <section class="login_message">
        <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
      </section>
      <section class="login_verification">
        <input type="tel" maxlength="8" placeholder="密码">
        <div class="switch_button off">
          <div class="switch_circle"></div>
          <span class="switch_text">...</span>
        </div>
      </section>
      <section class="login_message">
        <input type="text" maxlength="11" placeholder="验证码">
        <img class="get_verification" src="../../../common/images/captcha.svg" alt="captcha">
      </section>
    </section>
  </div>
  <button class="login_submit">登录</button>
</form>  
<a href="javascript:;" class="about_us">关于我们</a>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped>


</style>
