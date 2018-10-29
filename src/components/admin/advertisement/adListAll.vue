<template>
  <div>
    <nav-list></nav-list>
    <ad-list></ad-list>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import AdList from './adList'

  export default {
    name: 'adListAll',
    components: {
      NavList,
      AdList,
    },
    data () {
      return {}
    }
}
</script>

<style scoped>

</style>
