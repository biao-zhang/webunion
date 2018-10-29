<template>
  <div>
    <nav-list></nav-list>
    <multi-course></multi-course>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import MultiCourse from './multiCourse'

  export default {
    name: "MultiClass",
    components : {
      NavList,
      MultiCourse
    }
  }
</script>

<style scoped>

</style>
