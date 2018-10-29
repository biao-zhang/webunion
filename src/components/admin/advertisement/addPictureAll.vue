<template>
  <div>
    <nav-list></nav-list>
    <add-picture></add-picture>
  </div>
</template>

<script>
  import NavList from '../common/navList'
  import AddPicture from './addPicture'

  export default {
    name: 'addPictureAll',
    components: {
      NavList,
      AddPicture,
    },
    data () {
      return {}
    }
}
</script>

<style scoped>

</style>
