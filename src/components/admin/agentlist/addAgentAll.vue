<template>
  <div>
    <nav-list></nav-list>
    <add-agent></add-agent>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import AddAgent from './addAgent'

  export default {
    name: 'addAgentAll',
    components: {
      NavList,
      AddAgent,
    },
    data () {
      return {}
    }
}
</script>

<style scoped>

</style>
