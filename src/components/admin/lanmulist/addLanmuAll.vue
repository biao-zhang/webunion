<template>
  <div>
    <nav-list></nav-list>
    <add-lanmu></add-lanmu>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import AddLanmu from './addLanmu'

  export default {
    name: 'addLanmuAll',
    components: {
      NavList,
      AddLanmu,
    },
    data () {
      return {}
    }
}
</script>

<style scoped>

</style>
