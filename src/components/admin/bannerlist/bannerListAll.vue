<template>
  <div>
    <nav-list></nav-list>
    <banner-list></banner-list>
  </div>
</template>

<script>
  import BannerList from './bannerList'
  import NavList from '../common/navList'

  export default {
    name: "bannerListAll",
    components: {
      BannerList,
      NavList
    }
  }
</script>

<style scoped>

</style>
