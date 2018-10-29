<template>
  <div>
    <nav-list></nav-list>
    <agent-list></agent-list>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import AgentList from './agentList'

  export default {
    name: 'agentListAll',
    components: {
      NavList,
      AgentList,
    },
    data () {
      return {}
    }
}
</script>

<style scoped>

</style>
