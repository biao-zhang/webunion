<template>
  <div>
    <nav-list></nav-list>
    <add-consult></add-consult>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import AddConsult from './addConsult'

  export default {
    name: 'addConsultAll',
    components: {
      NavList,
      AddConsult
    },
    data () {
      return {}
    }
}
</script>

<style scoped>

</style>
