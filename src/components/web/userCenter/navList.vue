<template>
  <div class="lmc_lf">
    <ul>
      <li class="active"><a href="javascript:void(0);">个人首页</a></li>
      <li><a href="javascript:void(0);">用户信息</a></li>
      <li><a href="javascript:void(0);">推广效果</a></li>
      <li class="li_erji" v-on:click="show = !show"><a href="javascript:void(0);">账户信息</a><i class="lmc_arr" :class="{ up: show }"></i>
        <dl v-show = "show">
          <dd><a href="javascript:void(0);">个人中心</a></dd>
          <dd><a href="javascript:void(0);">网站管理</a></dd>
          <dd><a href="javascript:void(0);">客户申诉</a></dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "navList"
    }
</script>

<style scoped>

</style>
