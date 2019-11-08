<template>
  <div id="footer">
    <div class="footer-item" :class="{active : $route.path === '/msite'}" @click="goPath('/msite')">
      <span>
        <i class="iconfont icon-diancan"></i>
      </span>
      <span>点餐</span>
    </div>
    <div class="footer-item" :class="{active : $route.path === '/search'}" @click="goPath('/search')">
    <span>
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span>查找</span>
    </div>
    <div class="footer-item" :class="{active : $route.path === '/order'}" @click="goPath('/order')">
      <span>
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </div>
    <div class="footer-item" :class="{active : $route.path === '/mine'}" @click="goPath('/mine')">
      <span>
        <i class="iconfont icon-wode"></i>
      </span>
      <span>我的</span>
    </div>
  </div>  
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      goPath(path){
        // 切换路由组件
        this.$route.path !== path && this.$router.replace(path)
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  #footer
    position fixed 
    left 0
    bottom 0
    height 50px
    width 100%
    background #fff
    border-top 1px solid #eee
    display flex
    justify-content space-around
    .footer-item
      display flex
      flex-direction column
      align-items center
      span 
        i 
          font-size 22px
        &:first-child
          margin 6px 0
      &.active
        color: $green

</style>
