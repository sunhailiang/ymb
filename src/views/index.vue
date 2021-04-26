<template>
  <div style="height: 200px">
    <v-btn color="blue" dark @click="sheet = !sheet">Open v-model</v-btn>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" color="red" @click="sheet = !sheet">close</v-btn>
        <div class="py-3">
          This is a bottom sheet using the controlled by v-model instead of
          activator
        </div>
      </v-sheet>
    </v-bottom-sheet>
    <div class="test"></div>
    <ul style="display: flex; justify-content: space-between; width: 400px">
      <li><router-link to="/analysis">统计分析</router-link></li>
      <li><router-link to="/collaboration">协作</router-link></li>
      <li><router-link to="/conclusion">小结</router-link></li>
      <li><router-link to="/kpi">绩效</router-link></li>
      <li><router-link to="/okr">okr</router-link></li>
      <li><router-link to="/todo">todo</router-link></li>
      <li><router-link to="/workbench">工作台</router-link></li>
    </ul>
    <chart :option="options" />
    <i style="font-size: 50px; color: red" class="iconfont ymb404"></i>
    <h1>字体测试</h1>
    <div class="fta"></div>
    <div class="ftc">
      字体测试字体测试字体测试字体测试字体测试字体测试字体测试
    </div>
    <div class="ftd">number number number number number number number</div>
    <div class="fte">123456123456123456123456123456123456</div>
    <div class="ftf">123456123456123456123456123456123456</div>
  </div>
</template>

<script>
import chart from '@/components/charts/base.vue'
export default {
  name: 'Index',
  components: {
    chart
  },
  data() {
    return {
      sheet: false,
      arr: [1, 2, 3, 4, 5],
      options: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
    }
  },
  computed: {},
  destroyed() {
    console.log('ss')
  },
  mounted() {
    console.log('公用库', this.$utils.getQueryString('id'))
  },
  beforeDestroy() {
    console.log('ss')
  },
  beforeCreate() {
    console.log('ss')
  },
  methods: {}
}
</script>

<style scoped lang="less">
.test {
  .h(100);
  .mg-l(100);
  .mg-r(100);
  background-color: salmon;
}
.fta {
  font-size: 50px;
  font-family: 'or';
}
.ftb {
  font-family: 'om';
  font-size: 50px;
}

.ftc {
  font-family: 'ob';
  font-size: 50px;
}
.ftd {
  font-family: 'pr';
  // font-size: 50px;
}
.fte {
  font-family: 'nb';
  font-size: 50px;
}
.ftf {
  // font-family: 'nm';
  font-size: 50px;
}
</style>
