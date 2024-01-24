<template>
  <div
    class="scroll-bar"
    v-if="chunkHeightInner"
    @click="clickScrollBar"
    ref="scrollBarReff"
  >
    <div
      ref="scrollChunkRef"
      class="scroll-bar__thunk"
      :style="{
        height: `${chunkHeightInner * 100}%`,
        top: `${chunkHeightInnerTop * 100}%`,
      }"
    />
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { useScrollBar } from "../api/index";
const { chunkHeight, top, setTop } = useScrollBar();
const chunkHeightInner = ref(0);
const chunkHeightInnerTop = ref(0);
const scrollBarReff = ref(null);
const scrollChunkRef = ref(null);
const clickScrollBar = (e) => {
  const scrollBarHeight = scrollBarReff.value.getBoundingClientRect().height;
  const scrollChunkRefHeight =
    scrollChunkRef.value.getBoundingClientRect().height;
  const scrollBarTop = scrollBarReff.value.getBoundingClientRect().top;
  const clientY = e.clientY;
  const diffHeight = clientY - scrollBarTop;
  if (diffHeight + scrollChunkRefHeight > scrollBarHeight)
    return setTop((scrollBarHeight - scrollChunkRefHeight) / scrollBarHeight);
  setTop(diffHeight / scrollBarHeight);
};
watch(
  () => chunkHeight.value,
  (newVal) => {
    chunkHeightInner.value = newVal;
  }
);
watch(
  () => top.value,
  (newVal) => {
    chunkHeightInnerTop.value = newVal;
  }
);
</script>

<style scoped>
.scroll-bar {
  position: absolute;
  right: 7%;
  width: 10px;
  height: 30px;
  height: 36vh;
  width: 6px;
  border-radius: 6px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
}
.scroll-bar__thunk {
  background: #fff;
  border-radius: 6px;
  width: 100%;
  position: absolute;
  transition: all 0.3s ease-in-out;
}
</style>
