<template>
  <div class="at-container">
    <at ref="at" :members="members" name-key="name" @at="getMemeber">
      <!-- 自定义样式-at组件的slot,不要动 -->
      <template #embeddedItem="s">
        <span>
          <span class="embedded-item at-name" :data-id="s.current.userId"
            >@{{ s.current.name }}</span
          >
        </span>
      </template>
      <!-- at组件写入内容的位置 -->
      <div
        id="at-content"
        ref="at-content"
        class="at-content"
        contenteditable
        @input="atContentChange"
        @click.stop="focus"
      ></div>
      <!-- 模拟placeholder -->
      <span
        v-if="!focusState"
        ref="placeholder"
        class="placeholder"
        aria-readonly="true"
        contenteditable="false"
        @click.stop="focus($event)"
        >{{ placeholder }}</span
      >
      <!-- 文字长度 -->
      <div class="text-length" @click.stop="focus($event)">
        {{ contentLength }}/{{ contentMaxLen }}
      </div>
    </at>
  </div>
</template>
<script>
import at from './vue-at/At.vue'
export default {
  components: { at },
  props: {
    // 传入默认文字
    placeholder: {
      type: String,
      default: '选中文本可以标记颜色区分重点哦 ↵'
    },
    // 内容最大长度
    contentMaxLen: {
      type: Number,
      default: 150
    },
    members: {
      type: Array,
      default: () => [
        {
          userId: '00001',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          name: 'myrtie.green'
        },
        {
          userId: '00002',
          avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
          name: '椿木'
        }
      ]
    }
  },
  data() {
    return {
      focusState: false,
      contentLength: 0, // 实际输入内容长度
      contentDom: null, // 内容dom
      atDom: null // at组件dom
    }
  },
  created() {
    // 如果传进来成员那就不需要请求了
    if (this.members.length === 0) {
      this.getMemeberByCondition()
    }
  },
  mounted() {
    // 初始化一次dom
    this.contentDom = this.$refs['at-content']
    this.atDom = this.$refs['at']
    // 监听：只要点击了非at组件输入区域，关闭成员列表
    document.addEventListener('click', this.closeMembersPannel)
    // 监听粘贴事件，只要内容，不要html以及样式
    this.contentDom.addEventListener('paste', this.pasteEvent)
    // 监听拖拽释放事件
    this.contentDom.addEventListener('drop', this.dragDropEvent)
    // 监听拖拽进入区域
    this.contentDom.addEventListener('dragenter', this.dragEnter)
    // 监听拖拽移出区域
    this.contentDom.addEventListener('dragleave', this.dragLeave)
  },
  destroyed() {
    // 释放监听
    document.removeEventListener('click', this.closeMembersPannel)
    // 释放粘贴事件监听
    this.contentDom.removeEventListener('paste', this.pasteEvent)
    // 释放拖拽事件监听
    this.contentDom.removeEventListener('drop', this.dragDropEvent)
    // 释放拖拽进入事件监听
    this.contentDom.removeEventListener('dragenter', this.dragEnter)
    // 释放拖拽离开事件监听
    this.contentDom.removeEventListener('dragleave', this.dragLeave)
  },

  methods: {
    closeMembersPannel(e) {
      if (
        e.target.className !== 'atwho-view' &&
        e.target.className !== 'atwho-li atwho-cur'
      ) {
        this.atDom.closePanel()
      }
    },
    dragEnter() {
      if (!this.focusState) {
        this.focusState = true
      }
      this.contentDom.style.backgroundColor = '#C0C0C0'
    },
    dragLeave() {
      this.contentDom.style.backgroundColor = 'white'
      this.emptyShowPlaceholder()
    },
    dragDropEvent(e) {
      this.contentDom.style.backgroundColor = 'white'
      this.emptyShowPlaceholder()
      // 阻止默认事件
      e.preventDefault()
      e.stopPropagation()
      const df = e.dataTransfer
      // 存放文件
      let dragFiles = {}
      // 获取拖拽的文件
      if (df.items !== undefined) {
        const item = df.items[0]
        // 不允许目录上传
        if (item.kind === 'file' && item.webkitGetAsEntry().isFile) {
          const file = item.getAsFile()
          dragFiles = file
        }
      } else {
        dragFiles = df.files[0]
      }
      try {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(dragFiles.slice(0, 3))
        fileReader.addEventListener('load', (e) => {
          // 上传
          const formData = new FormData()
          formData.append('file', dragFiles)
          console.log('formData就是上传内容', formData)
        })
        fileReader.addEventListener(
          'error',
          (r) => {
            // 信息提示记得修改
            console.log('不能上传文件夹')
          },
          false
        )
      } catch {
        // 信息提示记得修改
        console.log('不能上传文件夹')
        return
      }
    },
    pasteEvent(e) {
      // 绑定粘贴事件e
      if (e.clipboardData) {
        // 阻止默认行为
        e.preventDefault()
        var clipboardData = e.clipboardData
        // 只要文本
        var text = clipboardData.getData('text')
        if (window.getSelection && text !== '' && text !== null) {
          // 创建文本节点
          var textNode = document.createTextNode(text)
          // 在当前的光标处插入文本节点
          var range = window.getSelection().getRangeAt(0)
          // 先删除文本
          range.deleteContents()
          // 在插入文本
          range.insertNode(textNode)
          // 隐藏placeholder
          if (text !== '') {
            this.focusState = true
          }
        }
      }
    },
    // 根据条件获取成员列表-condition换成你自己的条件描述
    getMemeberByCondition() {},
    atContentChange() {
      // 只要输入了，隐藏placeholder
      this.focusState = true
      // 统计文本长度
      this.contentLength = this.contentDom.innerText.length
      // 最大150字符
      if (this.contentLength > 150) {
        console.log('超过150')
        // 超过提示并给提示
      }
      // 如果内容为空，展示placeholder
      this.emptyShowPlaceholder()
    },
    // 返回at成员
    getMemeber(member) {
      console.log('mmeber', member)
    },
    // 点击重新focus
    focus(e) {
      // 如果是placeholder或者统计字数dom点进来的，让编辑区域focus
      if (e && e.target.className === 'placeholder') {
        this.contentDom.focus()
        return
      }
      const range = window.getSelection() // 创建range
      this.cursorPosition = range.getRangeAt(0).startOffset
    },
    // 内容为空时展示placeholder
    emptyShowPlaceholder() {
      if (
        this.contentDom.innerText.length < 1 ||
        this.contentDom.innerText.trim() === ''
      ) {
        this.focusState = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.at-container {
  position: relative;
  .atwho-panel {
    height: 200px !important;
    width: 100px !important;
    background-color: sandybrown;
  }
  .atwho-wrap {
    border: solid 1px gray;
    border-radius: 4px;
    height: 100px;
    .at-content {
      height: calc(100% - 30px);
      border: none;
      outline: none;
      padding: 15px;
      .atName::before {
        color: red !important;
      }
    }
    .placeholder {
      position: absolute;
      top: 15px;
      left: 15px;
      color: #999999;
      font-size: 16px;
    }
    .text-length {
      text-align: right;
      position: absolute;
      right: 0;
      bottom: 0px;
      padding-right: 4px;
      color: #cccccc;
      width: calc(10% - 4px);
      font-size: 11px;
      height: 16px;
    }
  }
}
</style>
