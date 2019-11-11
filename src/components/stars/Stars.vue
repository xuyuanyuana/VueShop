<template>
  <div class="star star-24">
    <span class="star-item" v-for="(star,index) in starsArr" :key="index" :class="star"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      rating:{
        type: Number,
        required:true
      }
    },
    computed: {
      starsArr(){
        let arr = []
        let onNum = Math.floor(this.rating)
        for (let index = 0; index < onNum; index++) {
          arr.push('on')    
        }
        this.rating - onNum !== 0 && arr.push('half')

        while(arr.length < 5){
          arr.push('off')
        }
        console.log(arr)
        return arr
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('../../common/images/stars/star48_on')
      &.half
        bg-image('../../common/images/stars/star48_half')
      &.off
        bg-image('../../common/images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('../../common/images/stars/star36_on')
      &.half
        bg-image('../../common/images/stars/star36_half')
      &.off
        bg-image('../../common/images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('../../common/images/stars/star24_on')
      &.half
        bg-image('../../common/images/stars/star24_half')
      &.off
        bg-image('../../common/images/stars/star24_off')
</style>
