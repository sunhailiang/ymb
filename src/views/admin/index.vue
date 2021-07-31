<template>
  <div class="admin">
    我是ADMIN
    <el-button type="success">成功</el-button>
  </div>
</template>
<script>
import components from './components'
export default {
  components: {
    ...components
  },
  mounted() {
    // console.log('this', this.$apis.GETUSERINFO())
  }
}
</script>
<style lang="less" scoped>
.admin {
  font-size: 100px;
  color: palevioletred;
  text-align: center;
}
</style>
