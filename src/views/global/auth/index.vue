<template>
  <div class="auth-index-box">
    <div class="auth-index-top">
      <Img :src="'/common/ic_logo.png'" class="logo-img" />
    </div>
    <div class="auth-index-main">
      <div class="auth-index-left">
        <div class="auth-left-text">让每个人的工作简单、快乐、有价值</div>
        <Img :src="'/login/icon_user.png'" class="auth-left-img" />
      </div>
      <div class="auth-index-right">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
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
    height: 60px;
    line-height: 60px;
    .logo-img {
      width: 136px;
      vertical-align: middle;
    }
  }
  .auth-index-main {
    flex: 1;
    .w(1120);
    display: flex;
    flex-direction: row;
    margin: -90px auto 0;
    justify-content: center;
    align-items: center;
    .auth-index-left {
      text-align: center;
      .auth-left-text {
        .w(548);
        text-align: center;
        font-size: 18px;
        .lh(26);
        color: #333333;
      }
      .auth-left-img {
        .w(548);
        margin-top: 30px;
      }
    }
    .auth-index-right {
      flex: 1;
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
