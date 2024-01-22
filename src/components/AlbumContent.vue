<template>
  <div class="album-content" @scroll="scroll" ref="ablumContent">
    <div class="album-content__header-mask" :style="{ height: height }" />
    <div class="album-content__title-dir">
      <img
        src="../assets/pic_logo.png"
        style="object-fit: contain; margin-right: 10px"
      />
      <span>视频</span>
    </div>
    <div class="album-content__dir-list" style="margin-bottom: 50px">
      <AblutmItem
        v-for="item in videiList"
        :key="item.id"
        :albumItem="item"
        type="video"
      />
    </div>
    <div class="album-content__title-dir">
      <img
        src="../assets/video_logo.png"
        style="object-fit: contain; margin-right: 10px"
      />
      <span>图片</span>
    </div>
    <div class="album-content__dir-list-pic">
      <div
        v-for="item in picList"
        :key="item.id"
        class="album-content__dir-list-outer"
      >
        <AblutmItem :albumItem="item" :width="260" :height="260" type="pic" />
        <div class="album-content__dir-pic-info">
          <span class="album-content__info-name">
            {{ item.name }}
          </span>
          <span style="color: rgba(0, 0, 0, 0.1608)">|</span>
          <span style="color: #626262; font-size: 12px">
            上传：{{ item.uploadTime.replace(/-/g, "/") }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AblutmItem from "./AlbumItem.vue";
import { usePicList, useHover, useScrollBar } from "../api/index";
import { ref, watch, onMounted, nextTick } from "vue";
let picList = ref([]);
let videiList = ref([]);
const { hoverHead } = useHover();
const height = ref("16.5%");
const ablumContent = ref(null);
const { setChunkHeight, setTop } = useScrollBar();
usePicList().then((res) => {
  picList.value = res.picList[0].imageList.toSpliced(16);
  videiList.value = res.picList[0].videoList.toSpliced(12);
  nextTick(() => {
    const { scrollHeight, offsetHeight } = ablumContent.value;
    const chunkHeight = offsetHeight / scrollHeight;
    setChunkHeight(chunkHeight);
  });
});

watch(
  () => hoverHead.value,
  (newVal) => {
    height.value = newVal ? "22%" : "16.5%";
  }
);
const scroll = (e) => {
  setTop(ablumContent.value.scrollTop / ablumContent.value.scrollHeight);
};
</script>

<style scoped>
.album-content {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 7%;
  padding-top: 10%;
  overflow: scroll;
  top: 0;
  left: 0;
}
.album-content::-webkit-scrollbar {
  display: none;
}
.album-content__title-dir {
  width: 100%;
  display: flex;
  justify-content: start;
  color: #000;
  font-weight: bolder;
  margin-bottom: 10px;
}
.album-content__header-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 16.5%;
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.1s ease;
}
.album-content__dir-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-template-rows: repeat(auto-fill, 168px);
  justify-content: space-between;
  row-gap: 20px;
}
.album-content__dir-list-pic {
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-template-rows: repeat(auto-fill, 300px);
  justify-content: space-between;
  row-gap: 20px;
}

.album-content__dir-pic-info {
  box-sizing: border-box;
  font-size: 15px;
  width: 260px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.album-content__info-name {
  display: inline-block;
  width: 40%;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 15px;
  height: 15px;
  font-size: 15px;
  white-space: nowrap;
  font-weight: bolder;
  color: #000;
}
.scroll-bar {
  position: absolute;
  left: -30px;
  width: 10px;
  height: 30px;
  background: red;
}
</style>
