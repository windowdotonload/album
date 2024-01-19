<template>
  <div class="ablunm__header">
    <span class="ablunm__title-text">我的相册</span>
    <AlbumBreviary class="ablunm__breviary" />
  </div>
</template>

<script setup>
import AlbumBreviary from "./AlbumBreviary.vue";
import { ref } from "vue";
import { fetchPicList } from "../api/index";
const picList = ref([]);
const getList = async () => {
  const res = await fetchPicList();
  picList.value = res;
};
getList();
</script>

<style scoped>
.ablunm__header {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 16.5%;
  padding: 0 130px;
  color: #000;
  background: linear-gradient(
    90deg,
    rgba(252, 252, 252, 1) 0%,
    rgba(225, 218, 218, 0.6) 25%,
    rgba(186, 180, 180, 0.8) 50%,
    rgba(252, 252, 252, 0.8) 75%,
    rgba(252, 252, 252, 1) 100%
  );
  opacity: 1;
  backdrop-filter: blur(100px);
  box-shadow: 0px 5px 8px rgba(153, 153, 153, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}
.ablunm__title {
  width: 20%;
  text-align: start;
}
.ablunm__title-text {
  display: inline-block;
  position: absolute;
  font-weight: bolder;
  left: 10%;
  top: 15%;
  font-size: 36px;
  transition: all 0.1s ease;
}
.ablunm__breviary {
  transition: all 0.1s ease;
}
.ablunm__header:hover {
  padding: 0;
  height: 22%;
}
.ablunm__header:hover .ablunm__title-text {
  display: none;
  opacity: 0;
}
</style>
