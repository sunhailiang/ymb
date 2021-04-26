<template>
  <div id="app" data-app>
    <v-alert
      text
      color="#D9006C"
      prominent
      type="error"
      icon="mdi-cloud-alert"
      :dismissible="true"
      class="global-tips"
      transition="scroll-x-reverse-transition"
      width="300"
    >
      <div>
        <div class="title">错误</div>
        <div class="title">错误信息</div>
      </div>
    </v-alert>
    <router-view> </router-view>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log('注册成功吗？', this)
    this.$bus.$on('requestError', (obj) => {
      console.log('请求错误了', obj)
    })
  }
}
</script>
<style lang="less" scoped>
.global-tips {
  .w(300);
  position: absolute;
  .r(30);
  .t(50);
}
</style>
