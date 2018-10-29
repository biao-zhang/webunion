<template>
  <div>
    <nav-list></nav-list>
    <picture-list></picture-list>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import PictureList from './pictureList'

  export default {
    name: 'pictureListAll',
    components: {
      NavList,
      PictureList,
    },
    data () {
      return {}
    }
}
</script>

<style scoped>

</style>
