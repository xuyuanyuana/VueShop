<template>
<form>
      <div class="on">
        <section class="login_message">
          <input type="tel" maxlength="11" placeholder="手机号">
          <button disabled="disabled" class="get_verification">获取验证码</button>
        </section>
        <section class="login_verification">
          <input type="tel" maxlength="8" placeholder="验证码">
        </section>
        <section class="login_hint">
          温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
          <a href="javascript:;">《用户服务协议》</a>
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
