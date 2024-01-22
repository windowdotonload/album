<template>
  <div class="back-top__container" @click="backToTop">
    <img src="../assets/backTop.png" style="width: 100%; height: 100%" />
  </div>
</template>

<script setup>
import { useBackTop } from "../api/index";
const backToTop = () => {
  const { scrollToTop, setScrollToTop } = useBackTop();
  setScrollToTop(!scrollToTop.value);
};
</script>

<style scoped>
.back-top__container {
  position: absolute;
  width: 1.5em;
  height: 1.5em;
  right: 2%;
  bottom: 2%;
  cursor: pointer;
}
</style>
