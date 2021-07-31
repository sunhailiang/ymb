<template>
  <div id="app" class="ymb-container" data-app>
    <router-view />
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  // overflow-y: hidden;
}
</style>
