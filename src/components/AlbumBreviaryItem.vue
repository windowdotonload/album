<template>
  <div class="img-box__container">
    <img src="../assets/all_bg.png" class="img_box" v-show="!loaded" />
    <img
      v-show="loaded"
      :src="breviaryInfo.poster"
      class="img_box"
      @load="load"
    />
  </div>
</template>

<script setup>
import { defineProps, watch, ref } from "vue";
const props = defineProps({
  breviaryInfo: Object,
  hvoerState: Boolean,
});
const loaded = ref(false);
const load = () => {
  loaded.value = true;
};
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
