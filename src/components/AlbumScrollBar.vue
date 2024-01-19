<template>
  <div class="scroll-bar" v-if="chunkHeightInner">
    <div
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
const { chunkHeight, top } = useScrollBar();
const chunkHeightInner = ref(0);
const chunkHeightInnerTop = ref(0);

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
  background: rgba(0, 0, 0, 0.25);
}
.scroll-bar__thunk {
  background: #fff;
  border-radius: 6px;
  width: 100%;
  position: absolute;
}
</style>
