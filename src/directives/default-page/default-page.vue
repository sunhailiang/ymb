<template>
  <div v-show="visible" class="default-page">
    <div :class="['default-img', type]"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: true,
      type: 'a'
    }
  }
}
</script>
<style lang="scss" scoped>
.default-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.3);
  color: #ffffff;

  .a {
    background: url('./imgs/demo.png') no-repeat;
  }
  .b {
    background: url('./imgs/demo2.png') no-repeat;
  }
  .default-img {
    background-size: 140px 140px;
    background-position: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
