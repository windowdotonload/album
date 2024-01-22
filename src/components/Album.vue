<template>
  <div class="ablunm__container">
    <div class="ablunm__glass">
      <AlbumContent />
      <Header />
      <BackTop />
    </div>
    <AlbumScrollBar />
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import AlbumContent from "./AlbumContent.vue";
import AlbumScrollBar from "./AlbumScrollBar.vue";
import BackTop from "./BackTop.vue";
</script>

<style scoped>
.ablunm__container {
  min-width: 1500px;
  min-height: 700px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-image: url("../assets/big_bg.png");
  display: flex;
  align-items: center;
  justify-content: center;
  /* overflow: hidden; */
  position: relative;
  user-select: none;
}
.ablunm__glass {
  position: relative;
  width: 82.92%;
  height: 92%;
  border-radius: 40px;
  opacity: 1;
  background: rgba(252, 252, 252, 0.6);
  backdrop-filter: blur(20px);
  overflow: hidden;
}
</style>
