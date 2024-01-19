<template>
  <div class="img-box__container">
    <img :src="breviaryInfo.poster" class="img_box" />
  </div>
</template>

<script setup>
import { defineProps, watch, ref } from "vue";
const props = defineProps({
  breviaryInfo: Object,
  hvoerState: Boolean,
});
</script>

<style scoped>
.img-box__container {
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  align-items: center;
  justify-content: center;
  width: calc((100%) / 7);
  height: 90%;
  padding: 0 1%;
}
.img_box {
  object-fit: cover;
  width: 100%;
  height: 100%;
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
</style>
