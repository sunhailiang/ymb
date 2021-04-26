<template>
  <div ref="chart" :style="styles"></div>
</template>
<script>
import { addListener, removeListener } from 'resize-detector'
import { debounce } from 'lodash'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
])
export default {
  name: 'BaseChart',
  props: {
    styles: {
      // 设置样式
      type: String,
      default: 'width:400px;height:400px'
    },
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  watch: {
    option(val) {
      this.chart.setOption(val)
    }
  },
  created() {
    this.resize = debounce(this.resize, 300)
  },
  mounted() {
    this.renderChart()
    addListener(this.$refs.chart, this.resize)
  },
  beforeDestroy() {
    removeListener(this.$refs.chart, this)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    renderChart() {
      this.chart = echarts.init(this.$refs.chart, this.resize)
      this.chart.setOption(this.option)
    },
    resize() {
      this
    }
  }
}
</script>
<style lang="sass" scoped></style>
