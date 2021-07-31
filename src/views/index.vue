<template>
  <div ref="index-page" style="height: 200px"></div>
</template>

<script>
export default {
  name: 'Index',
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
  mounted() {
    console.log('公用库dsd', this.$utils.getQueryString('id'))
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
