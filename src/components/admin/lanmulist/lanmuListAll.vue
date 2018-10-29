<template>
  <div>
    <nav-list></nav-list>
    <lanmu-list></lanmu-list>
  </div>
</template>

<script>
  import LanmuList from './lanmuList'
  import NavList from '../common/navList'

  export default {
    name: 'lanmuListAll',
    components: {
      NavList,
      LanmuList
    },
    data () {
      return {}
    }
}
</script>

<style scoped>

</style>
