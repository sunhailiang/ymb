<template>
  <div>
    <transition name="fade" mode="out-in">
      <div
        v-if="isShow"
        :class="[
          'msg',
          'global-msg',
          type === 'success' ? 'success' : type === 'error' ? 'error' : 'warn'
        ]"
      >
        <i
          :class="[
            'iconfont',
            type === 'success' ? 'ymbsuccess' : 'ymbguanbianniu'
          ]"
        ></i>
        <div class="content">
          <span v-if="code != 200">{{ code }}：</span>{{ msg }}
        </div>
        <i class="close iconfont ymbclose" @click="close"></i>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    isShow: { type: Boolean, default: true },
    // 文字信息
    msg: {
      type: String,
      default: '提示信息'
    },
    // 错误时给状态码
    code: {
      type: Number,
      default: 200
    },
    // 成功，失败，警告三种状态
    type: {
      type: String,
      default: 'success'
    }
  },
  data() {
    return {
      timer: null
    }
  },
  created() {},
  mounted() {
    // 添加计时器自动关闭
    let flag = 0
    this.timer = setInterval(() => {
      if (flag < 4) {
        flag++
      } else {
        this.isShow = false
        clearInterval(this.timer)
      }
    }, 1000)
  },
  beforeDestroy() {
    this.timer = null
  },
  methods: {
    close() {
      this.isShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.iconfont {
  font-size: 22px;
}
.global-msg {
  // .min-w(300);
  .h(52);
  .p-f();
  .l(30);
  .b(50);
}
.content {
  .min-w(192);
  .mg-l(10);
  .mg-r(14);
  font-size: 16px;
}
.msg {
  background: #fff5f9;
  .bd-rd(8);
  .shadow(0,4,16, 0, rgba(17, 17, 17, 0.08));
  .pl(20);
  .pr(15);
  .flex-l();
}
.title {
  .pl(12px);
}

.close {
  cursor: pointer;
}
// 各自的背景颜色和文字颜色
.error {
  background-color: #fff5f9;
  color: #e60061;
  .bd-l(solid,5,#e60061);
}
.success {
  background-color: #e9fbf5;
  color: #00b282;
  .bd-l(solid,5,#00b282);
}
.warn {
  background-color: #fff9ef;
  color: #f99602;
  .bd-l(solid,5,#f99602);
}
// 过度动画
::v-deep .slide-enter-active,
::v-deep .slide-leave-active {
  transition: opacity 0.5s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>
