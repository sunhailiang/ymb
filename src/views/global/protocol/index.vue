<template>
  <div class="auth-index-box">
    <div class="auth-index-top">
      <img :src="require('../../../assets/imgs/common/ic_logo.png')" alt="" />
    </div>
    <div class="auth-index-main">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
export default {
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
.auth-index-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  .auth-index-top {
    padding-left: 4%;
    padding-top: 10px;
    img {
      width: 136px;
    }
  }
  .auth-index-main {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    padding: 0 15%;
  }
}
</style>
