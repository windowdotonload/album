<template>
  <div
    class="ablunm__breviary"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <div class="ablunm__breviary-container">
      <AlbumBreviaryAll />
      <img
        src="../assets/prev_btn.png"
        class="btn prev"
        @click="prev"
        v-show="curreneHeadIndex != 0"
      />
      <img
        src="../assets/next_btn.png"
        class="btn next"
        @click="next"
        v-show="curreneHeadIndex != breviaryList.length - 1"
      />
      <div class="ablunm__breviary-item-container" ref="albumBreviaryContainer">
        <AlbumBreviaryItem
          class="ablunm__breviary-item"
          v-for="item in breviaryList"
          :breviaryInfo="item"
          :key="item.id"
          :hvoerState="hvoerState"
        />
      </div>
      <div class="album__breviary-etc">...</div>
    </div>
    <div class="ablunm__breviary-active">全部</div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { usePicList, useHover } from "../api/index";
import AlbumBreviaryItem from "./AlbumBreviaryItem.vue";
import AlbumBreviaryAll from "./AlbumAll.vue";
const { setHoverHead } = useHover();
let tempState = ref(null);
const albumBreviaryContainer = ref(null);
const hvoerState = ref(false);
const breviaryList = ref([]);
const curreneHeadIndex = ref(0);
const getBreviaryList = async () => {
  const state = await usePicList();
  tempState.value = state;
  breviaryList.value = tempState.value.picList.toSpliced(7);
};
getBreviaryList();
const mouseenter = async () => {
  hvoerState.value = true;
  breviaryList.value = tempState.value.picList;
  setHoverHead(true);
};
const mouseleave = async () => {
  hvoerState.value = false;
  breviaryList.value = tempState.value.picList.toSpliced(7);
  setHoverHead(false);
};
const prev = () => {
  nextTick(() => {
    curreneHeadIndex.value = curreneHeadIndex.value - 7;
    if (curreneHeadIndex.value < 0) {
      curreneHeadIndex.value = 0;
    }
    albumBreviaryContainer.value.children[
      curreneHeadIndex.value
    ].scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  });
};

const next = () => {
  nextTick(() => {
    curreneHeadIndex.value = curreneHeadIndex.value + 7;
    if (curreneHeadIndex.value >= breviaryList.value.length) {
      curreneHeadIndex.value = breviaryList.value.length - 1;
    }
    albumBreviaryContainer.value.children[
      curreneHeadIndex.value
    ].scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  });
};
</script>

<style scoped>
.ablunm__breviary {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  transition: all 0.5s ease;
  flex-wrap: wrap;
  overflow: hidden;
  box-sizing: border-box;
  padding: 2% 0;
}

.ablunm__breviary-container {
  position: relative;
  justify-content: center;
  box-sizing: border-box;
  width: 60%;
  height: 50%;
  white-space: nowrap;
  text-overflow: clip;
  transition: all 0.3s ease;
  padding: 0 2%;
  display: flex;
  align-items: center;
}
.ablunm__breviary-item-container {
  position: relative;
  box-sizing: border-box;
  width: calc(100% - ((100% - 200px) / 7) - 36px);
  height: 100%;
  text-overflow: clip;
  overflow: hidden;
  overflow-x: auto;
  text-align: center;
  transition: all 0.3s ease;
}
.ablunm__breviary-item-container::-webkit-scrollbar {
  display: none;
}
.ablunm__breviary:hover .ablunm__breviary-container {
  width: 100%;
  height: 80%;
}
.ablunm__breviary:hover .album__breviary-etc {
  display: none;
}
.ablunm__breviary-active {
  width: 100%;
}
.ablunm__breviary:hover .ablunm__breviary-active {
  width: 100%;
  box-sizing: border-box;
}

.active {
  border: 3px solid #f4810f;
  border-radius: 6px;
  padding: 1px;
  position: relative;
}
.img_box {
  object-fit: cover;
  width: 100%;
  height: 100%;
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
.album__breviary-etc {
  position: absolute;
  top: 0;
  right: 0px;
  width: 2vw;
  height: 2vw;
  border-radius: 8px;
  opacity: 1;
  background: rgba(0, 0, 0, 0.1608);
  color: #fff;
  letter-spacing: 1px;
  font-size: 16px;
}
.img-box__mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  color: #fff;
  z-index: 9;
  flex-wrap: wrap;
}
.img-box__mask-hover {
  display: none;
}
.breviary__all {
  margin: 0;
  width: 100%;
}
.ablunm__breviary:hover .breviary__all {
  display: none;
}
.ablunm__breviary:hover .img-box__mask-hover {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.ablunm__breviary:hover .active {
  border: none;
}
.ablunm__breviary:hover .img-box__all {
  /* transform: translateY(5%); */
  height: 100%;
}
.img-box__mask-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  margin-bottom: 5px;
}
.img-box__mask-bg-hover {
  visibility: hidden;
}
.ablunm__breviary:hover .img-box__mask-bg-hover {
  visibility: visible;
  position: absolute;
  z-index: -1;
  box-sizing: border-box;
  width: 90%;
  height: 100%;
  left: 50%;
  filter: blur(10px);
  opacity: 0.6;
  background: #000000;
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2392);
  /* transform: translateX(-50%) translateY(-95%); */
  z-index: -1;
}
.ablunm__breviary:hover .ablunm__breviary-item-container {
  position: relative;
  padding: 0 0.8%;
}
.btn {
  width: 2vw;
  height: 2vw;
  position: fixed;
  cursor: pointer;
  z-index: 999;
  opacity: 0;
  transition: all 0.5s;
}
.ablunm__breviary:hover .btn {
  opacity: 1;
}
.prev {
  top: 30%;
  left: calc(((100% - 200px) / 7) + 3.5%);
}
.next {
  top: 30%;
  right: 3%;
}
.ablunm__breviary-item {
  transition: all 0.3s ease;
}
</style>
