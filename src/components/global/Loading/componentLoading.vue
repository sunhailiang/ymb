<template>
  <div
    v-if="isShow"
    class="component-loading"
  >
    <img
      :src="require('@/assets/imgs/common/component-loading.gif')"
      alt=""
    />
    <img
      :src="require('@/assets/imgs/common/component-loading.gif')"
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
<style lang="less" scoped></style>
