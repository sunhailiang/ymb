<template>
  <div>
    <ul
      style="
        display: flex;
        justify-content: space-between;
        list-style: none;
        width: 400px;
      "
    >
      <li><router-link to="/analysis">统计分析</router-link></li>
      <li><router-link to="/collaboration">协作</router-link></li>
      <li><router-link to="/conclusion">小结</router-link></li>
      <li><router-link to="/kpi">绩效</router-link></li>
      <li><router-link to="/okr">okr</router-link></li>
      <li><router-link to="/todo">todo</router-link></li>
      <li><router-link to="/workbench">工作台</router-link></li>
    </ul>
    okr
  </div>
</template>
<style lang="less" scoped></style>
<script>
export default {
  data() {
    return {}
  },
  beforeCreate() {},
  mounted() {},
  created() {}
}
</script>
