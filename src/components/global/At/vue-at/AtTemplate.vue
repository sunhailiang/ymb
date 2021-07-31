<style lang="less" src="./At.less"></style>

<template>
  <div
    ref="wrap"
    class="atwho-wrap"
    @compositionstart="handleCompositionStart"
    @compositionend="handleCompositionEnd"
    @input="handleInput()"
    @keydown="handleKeyDown"
  >
    <div v-if="atwho" class="atwho-panel" :style="style">
      <div class="atwho-inner">
        <div class="atwho-view">
          <ul class="atwho-ul">
            <li
              v-for="(item, index) in atwho.list"
              :key="index + Math.random()"
              :ref="isCur(index) && 'cur'"
              class="atwho-li"
              :class="isCur(index) && 'atwho-cur'"
              :data-index="index"
              @mouseenter="handleItemHover"
              @mouseleave="handleItemLeave"
              @click="handleItemClick"
            >
              <slot name="item" :item="item">
                <div ref="editor" class="editor">
                  <img :src="item.avatar" />
                  <span v-text="item.name"></span>
                </div>
              </slot>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <span v-show="false" ref="embeddedItem">
      <slot name="embeddedItem" :current="currentItem"></slot>
    </span>
    <slot></slot>
  </div>
</template>
