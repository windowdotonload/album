<template>
  <img
    ref="imgMask"
    src="../assets/all_bg.png"
    :style="{ ...style }"
    class="img__mask"
  />
  <img @load="load" :src="src" :style="{ ...style }" v-show="loaded" />
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  src: String,
  style: Object,
});
const imgMask = ref(null);
const loaded = ref(false);
const load = () => {
  loaded.value = true;
  imgMask.value.style.opacity = 0;
};
</script>

<style scoped>
.img__mask {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.7;
  transition: all 0.3s ease;
}
</style>
