<template>
  <div>
    <nav-list></nav-list>
    <consult-list></consult-list>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import ConsultList from './consultList'

  export default {
    name: 'consultListAll',
    components: {
      ConsultList,
      NavList,
    },
    data () {
      return {}
    }
}
</script>

<style scoped>

</style>
