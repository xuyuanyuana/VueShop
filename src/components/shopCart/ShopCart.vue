<template>
  <div>
  <div class="shopcart" >
    <div class="content2" @click="toggle">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight:cartCount}">
            <i class="iconfont icon-gouwuche1" :class="{highlight:cartCount}"></i>
          </div>
          <div :class="{num:cartCount}">{{cartCount}}</div>
        </div>
        <div class="price" :class="{highlight:cartCount}">￥{{cartPrice?cartPrice : 0  }}</div>
        <div class="desc">配送费￥{{info.deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="isEnough">
          {{payText}}
        </div>
      </div>
    </div>
    <transition name="move">
      <div class="shopcart-list" v-show="isShowCartList">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food,index) in carShop" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price"><span>￥{{food.price}}</span></div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food"></CartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <div class="list-mask" v-show="isShowCartList"></div>
</div>

</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { mapState,mapGetters } from 'vuex'
  export default {
    data(){
      return {
        isShowCartList: false
      }
    },
    computed: {
      ...mapState({
        info: state => state.shop.shopData.info,
        carShop: state => state.shop.carShop
      }),
      ...mapGetters(['cartCount','cartPrice']),
      shopCount(){
        return this.cartCout
      },
      // 计算起送提示
      payText(){
        let {info, cartPrice} = this
        if(info){
          if(cartPrice === 0){
            return `${info.minPrice}元起送`
          }else if(cartPrice < info.minPrice){
            return `还差${info.minPrice - cartPrice}元起送`
          }else{
            return '去结账'
          }
        }
      },
      // 去结算高亮
      isEnough(){
        if(this.info){
          return this.cartPrice >= this.info.minPrice? 'enough' : 'no-enough'
        }
      }
    },
    methods: {
      toggle(){
        this.isShowCartList = !this.isShowCartList
      }
    },
    watch: {
      carShop(){
        // 性能优化：如果存在bScroll时不重新创建，使用refresh()方法
          if(!this.bScroll){
            this.bScroll = new BScroll('.list-content',{
              scrollY: true,
            })
          }else{  
            this.bScroll.refresh()
          }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content2
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-gouwuche1
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition all 1s
      &.move-enter, &.move-leave-to
        transform translateY(0)
        opacity 0
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>

