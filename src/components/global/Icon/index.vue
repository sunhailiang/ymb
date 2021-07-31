<template>
  <div>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>
<style lang="less" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
