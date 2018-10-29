<template>
    <div>
      <wheader></wheader>
      <banner></banner>
      <wcontent></wcontent>
      <wfooter></wfooter>
    </div>
</template>

<script>
  import wheader from '../common/wheader'
  import banner from './banner'
  import wcontent from './wcontent'
  import wfooter from '../common/wfooter'
    export default {
        name: "windex",
        components:{
          wheader,
          banner,
          wcontent,
          wfooter
        }
    }
</script>

