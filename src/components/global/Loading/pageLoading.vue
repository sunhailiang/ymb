<template>
  <div
    v-if="isShow"
    class="page-loading"
  >
    <img
      :src="require('@/assets/imgs/common/page-loading.gif')"
      alt=""
    />
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  created() { },
  mounted() { }
}
</script>
<style lang="less" scoped>
.page-loading {
  img {
    background-color: unset;
    .w(200);
    .h(200);
  }
}
</style>
