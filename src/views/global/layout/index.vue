<template>
  <div class="layout-box">
    <Header />
    <div class="layout-main">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
import Header from './header'
export default {
  components: {
    Header
  },
  data() {
    return {
      isRegister: false
    }
  },
  watch: {},
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.layout-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
  .layout-main {
    z-index: -1;
    margin-top: 52px;
    padding-bottom: 52px;
    height: calc(100vh - 105px);
    background: #f5f6fa;
    display: flex;
    flex-direction: row;
    overflow-y: auto;
  }
}
</style>
