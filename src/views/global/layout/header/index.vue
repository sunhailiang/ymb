<template>
  <div class="layout-box">
    <div class="layout-top">
      <div class="layout-left">
        <Img :src="'/common/ic_logo.png'" class="logo-img" />
        <ul
          style="
            display: flex;
            justify-content: space-between;
            list-style: none;
            width: 400px;
          "
        >
          <li><router-link to="/workbench">工作台</router-link></li>
          <li><router-link to="/analysis">统计分析</router-link></li>
          <li><router-link to="/collaboration">协作</router-link></li>
          <li><router-link to="/conclusion">小结</router-link></li>
          <li><router-link to="/kpi">绩效</router-link></li>
          <li><router-link to="/okr">okr</router-link></li>
          <li><router-link to="/todo">todo</router-link></li>
          <li><router-link to="/meeting">会议</router-link></li>
        </ul>
      </div>
      <div class="layout-right"></div>
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
.layout-top {
  height: 52px;
  padding-left: 30px;
  box-shadow: 0px 0px 50px 0px rgba(0, 24, 87, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 2;
  display: flex;
  flex-direction: row;
  .layout-left {
    flex: 1;
    display: flex;
    flex-direction: row;
    .logo-img {
      width: 136px;
    }
  }
  .layout-right {
    width: 400px;
  }
}
</style>
