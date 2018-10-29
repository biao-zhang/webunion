<template>
  <div>
    <nav-list></nav-list>
    <add-ad></add-ad>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import AddAd from './addAd'

  export default {
    name: 'addAdAll',
    components: {
      NavList,
      AddAd,
    },
    data () {
      return {}
    }
}
</script>

<style scoped>

</style>
