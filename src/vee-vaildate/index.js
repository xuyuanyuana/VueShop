// 使用vue的插件vee-validate进行表单项的验证
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)

// 自定义验证规则
VeeValidate.Validator.extend('tel',{
  // 验证规则
  validate: value => {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})

// 提示信息本地化
VeeValidate.Validator.localize('zh_CN',{
  messages: zh_CN.messages,
  attributes: {
    username: '用户名',
    code: '验证码',
    pwd:'密码',
    phoneCode: '验证码',
    phone:'手机号'
  }
})


