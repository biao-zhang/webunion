<template>
  <div>
    <nav-list></nav-list>
    <add-banner></add-banner>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import AddBanner from './addBanner'

  export default {
    name: 'addBannerAll',
    components: {
      NavList,
      AddBanner,
    },
    data () {
      return {}
    }
}
</script>

<style scoped>

</style>
