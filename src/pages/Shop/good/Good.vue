<template>
  <div id="container">
    <div class="leftWrap" ref="left">
      <ul class="content" ref="leftUl">
        <li 
          v-for="(good,index) in goods" 
          :key="index" 
          :class="{active: index === navIndex}"
          @click="changeNavIndex(index)"
        >
          <p>{{good.name}}</p>
        </li>
      </ul>
    </div>
    <div class="rigthWrap" ref="right">
      <ul ref="rigthUl">
        <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="food in good.foods">
              <div class="icon">
                <img width="57" height="57"
                    src="food.image">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
  export default {
    data(){
      return {
        rightHeigth:[],
        scrollY: 0
      }
    },
    mounted(){
      if(this.goods){
        this.initScroll()
        this.initRightArr()
      }
    },
    computed: {
      ...mapState({
        goods: state => state.shop.shopData.goods  
      }),
      navIndex(){
        // 滚动时动态计算得到leftNav
        let { rightHeigth, scrollY } = this
        let index = rightHeigth.findIndex((top,index) => scrollY >= top && scrollY < rightHeigth[index+1])
        if(this.leftScroll && this.index !== index){
          this.index = index
          this.leftScroll.scrollToElement(this.$refs.leftUl.children[index],1000)
        }
        return index
      }
    },
    methods: {
      initScroll(){
        let left = this.$refs.left
        this.leftScroll = new BScroll(left,{
            scrollY: true,
            click:true
        })
        let right = this.$refs.right
        this.rightScroll = new BScroll(right,{
          scrollY: true,
          probeType: 2, //实时，但是没有惯性滑动
          click:true
        })
        this.rightScroll.on('scroll',({x,y}) => {
          this.scrollY = Math.abs(y)
        })
        this.rightScroll.on('scrollEnd',({x,y}) => {
          this.scrollY = Math.abs(y)
        })
      },
      initRightArr(){
        let lis = this.$refs.rigthUl.children
        let tops = []
        let top = 0    
        tops[0] = top
        for (let i = 0; i < lis.length; i++) {
          top += lis[i].clientHeight
          tops.push(top)
        }
        this.rightHeigth.push(...tops)
      },
      changeNavIndex(index){
        // 根据当前index计算right高度
        this.scrollY = this.rightHeigth[index]
        this.rightScroll.scrollTo(0,-this.scrollY,2000)
      }
    },
    watch: {
      goods(){
        this.$nextTick(() => {
          this.initScroll()
          this.initRightArr()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
  #container
    display flex
    overflow hidden
    position absolute
    bottom  0 
    top 223px
    .leftWrap
      width 80px
      text-align center
      li
        height 30px
        line-height 30px
        background #f3f5f7
        &.active
          background #fff
        p
          width 60px
          margin 0 3px
          bottom-border-1px(rgba(7,17,27,0.1))
          

    .rigthWrap
      width 295px
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px  


</style>
