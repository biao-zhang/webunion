<template>
  <div>
    <nav-list></nav-list>
    <add-class></add-class>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import addClass from './addClass'
  export default {
      name: "addCourse",
      components : {
        NavList,
        addClass
      }
  }
</script>

