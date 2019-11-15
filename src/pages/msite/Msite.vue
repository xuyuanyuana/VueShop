<template>
    <section class="msite">
        <!--首页头部-->
        <Gheader :title="address.name ? address.name : '加载中'">
          <span class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
          </span>
          <span class="header_login" slot="right">
              <span class="header_login_text">登录|注册</span>
          </span>
        </Gheader>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys,index) in NewCategories" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="`https://fuss10.elemecdn.com${category.image_url}`">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </nav>
        <ShopList/>
      </section>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import {chunk} from 'lodash/array'
import Gheader from '../../components/gheader/Gheader'
import ShopList from '../../components/shopList/ShopList'
  export default {
    components: {
      Gheader,
      ShopList
    },
    mounted(){
      // // 发送请求
      // let result = await getAddress({latitude:40.10038,longitude:116.36867})
      // console.log(result)
      this.$store.dispatch('getAddress')
      this.$store.dispatch('getCategories')

    
    },
    computed: {
      ...mapState({
        address: state => state.msite.address,
        categories: state => state.msite.categories
      }),
      NewCategories(){
        return chunk(this.categories,8)
      }
    },
    watch: {
      categories(){
        this.$nextTick(() =>{
          new Swiper('.swiper-container',{
                  loop:true,
                  pagination: {
                    el: '.swiper-pagination',
                  }
                })
        })
      }
    }
  }
</script>

<style scoped lang='stylus' rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            height 100%
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        /deep/.swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    
</style>
