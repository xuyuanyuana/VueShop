<template>
  <div id="app">
    <router-view></router-view>
    <FooterNav/>
  </div>
</template>

<script>
import FooterNav from './components/footerNav/FooterNav'
export default {
  name: 'app',
  components: {
    FooterNav
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
