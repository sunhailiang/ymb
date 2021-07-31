<template>
  <img :src="require('@/assets/imgs' + src)" alt="" />
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: '/common/img-load-err.png'
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped></style>
