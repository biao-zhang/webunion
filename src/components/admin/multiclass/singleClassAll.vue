<template>
  <div>
    <nav-list></nav-list>
    <single-class></single-class>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import SingleClass from './singleClass'

  export default {
    name: 'singleClassAll',
    components: {
      NavList,
      SingleClass
    },
    data () {
      return {}
    }
}
</script>

<style scoped>

</style>
