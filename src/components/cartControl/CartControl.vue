<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div class="iconfont icon-jianhao" v-show="food.count" @click="updateFood(false)"></div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="iconfont icon-add" @click="updateFood(true)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import {SAVE_ADDFOOD,SAVE_DELFOOD} from '../../store/mutations-type'
  export default {
    props:{
      food:{
        type:Object,
        required: true
      }
    },
    methods: {
      updateFood(isAdd){
        // 添加删除指定食物
        if(isAdd){
          console.log(111)
          this.$store.commit(SAVE_ADDFOOD,{food:this.food})
        }else{
          this.$store.commit(SAVE_DELFOOD,{food:this.food})
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.cartcontrol
  font-size: 0
  .icon-jianhao
    padding 4px
    color $green
  .cart-count
    display: inline-block
    width: 14px
    text-align: center
    font-size: 14px
    color: rgb(147, 153, 159)
    margin 0 8px
  .icon-add
    padding: 4px
    color $green
  .iconfont
    display: inline-block
    border 2px solid $green
    border-radius 50%
    font-size 10px
  &.fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  &.fade-enter, .fade-leave-to{
    opacity: 0;
    transform translateX(45px)
  }  

</style>

