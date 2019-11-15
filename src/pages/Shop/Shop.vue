<template>
  <div>
      <ShopHeader/>
      <div class="tab">
        <div class="tab-item">
          <router-link to="/shop/goods">订餐</router-link>  
        </div>
        <div class="tab-item" >
          <router-link to="/shop/rating">评价</router-link>
        </div>
        <div class="tab-item" >
          <router-link to="/shop/info">商家</router-link>
        </div>
      </div>
      <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import ShopHeader from '../../components/shopHeader/ShopHeader.vue'
import { SAVE_SHOPDATA } from '../../store/mutations-type'
import { mapState} from 'vuex'
  export default {
    components:{
      ShopHeader,
    },
    mounted(){
      // 分发之前应该先看是否存在值，如果存在则使用内存中的
      if(sessionStorage.getItem('SHOP_DATA')){
        // 取出并保存到vuex中
        let shopData = JSON.parse(sessionStorage.getItem('SHOP_DATA'))
        // 保存到vuex中
        this.$store.commit(SAVE_SHOPDATA,shopData)
      }else{
        this.$store.dispatch('getShopData')
      }   
    },
    computed: {
      ...mapState({
        shopData: state => state.shop.shopData
      })
    },
    beforeDestroy(){
      // 组件销毁之前把购物车的信息存储到sesshopDatasionStorge
      console.log('销毁之前')
      sessionStorage.setItem('SHOP_DATA',JSON.stringify(this.shopData))
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>

