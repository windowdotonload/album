<template>
  <div class="album-content" @scroll="scroll" ref="ablumContent">
    <div class="album-content__header-mask" :style="{ height: height }" />
    <div class="album-content__title-dir">
      <img
        src="../assets/pic_logo.png"
        style="object-fit: contain; margin-right: 10px"
      />
      <span ref="anchor">视频</span>
    </div>
    <div class="album-content__dir-list" style="margin-bottom: 50px">
      <AblutmItem
        v-for="(item, index) in videiList"
        :key="item.id"
        :index="index"
        :albumItem="item"
        type="video"
        @handleVirtuallist="handleVirtuallist"
      />
    </div>
    <p class="album-content__view-more" @click="viewMoreVideo">查看更多</p>
    <div class="album-content__title-dir">
      <img
        src="../assets/video_logo.png"
        style="object-fit: contain; margin-right: 10px"
      />
      <span>图片</span>
    </div>
    <div class="album-content__dir-list-pic">
      <div
        v-for="(item, index) in picList"
        :key="item.id"
        class="album-content__dir-list-outer"
      >
        <AblutmItem
          :index="index"
          :albumItem="item"
          :width="200"
          :height="200"
          type="pic"
          @handleVirtuallist="handleVirtuallist"
        />
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
import { usePicList, useHover, useScrollBar, useBackTop } from "../api/index";
import { ref, watch, markRaw, nextTick } from "vue";
let picList = ref([]);
let videiList = ref([]);
const { hoverHead } = useHover();
const height = ref("16.5%");
const ablumContent = ref(null);
const { top, setChunkHeight, setTop } = useScrollBar();
const { scrollToTop, setScrollToTop } = useBackTop();
const anchor = ref(null);
const manualScroll = ref(false);
const wheelScroll = ref(false);
let videoPage = 1;
let rawList = [];
const indexRecord = {
  picIndex: { topLeave: 0, bottomEnter: 0 },
  videoIndex: { topLeave: 0, bottomEnter: 0 },
};

usePicList().then((res) => {
  rawList = markRaw(res.picList[0]);
  picList.value = res.picList[0].imageList.toSpliced(16);
  videiList.value = res.picList[0].videoList.toSpliced(20);
  calcScrollBar();
});

const handleVirtuallist = ({ isIntersecting, index, type }) => {
  // console.log("isIntersecting,", isIntersecting, index, type);
  const indexKey = `${type}Index`;
  const indexTarget = indexRecord[indexKey];
  if (isIntersecting) {
    indexTarget.bottomEnter = Math.max(indexTarget.bottomEnter, index);
  } else {
    console.log("isIntersectingfalse", isIntersecting, index, type);
    const tempIndex = Math.max(indexTarget.topLeave, index);
    if (tempIndex < indexTarget.bottomEnter) {
      indexTarget.topLeave = Math.max(tempIndex, index);
    } else {
      indexTarget.topLeave = indexTarget.topLeave;
    }
  }
  flush();
};
let pending = true;
const flush = () => {
  if (!pending) return;
  pending = false;
  setTimeout(() => {
    pending = true;
    console.log(indexRecord);
  });
};
const calcScrollBar = () => {
  nextTick(() => {
    const { scrollHeight, offsetHeight } = ablumContent.value;
    const chunkHeight = offsetHeight / scrollHeight;
    setChunkHeight(chunkHeight);
  });
};
const viewMoreVideo = () => {
  if (picList.value.length == rawList.videoList.length) return;
  videiList.value = rawList.videoList.toSpliced(20 * ++videoPage);
  calcScrollBar();
};
watch(
  () => hoverHead.value,
  (newVal) => {
    height.value = newVal ? "22%" : "16.5%";
  }
);

watch(
  () => scrollToTop.value,
  (newVal) => {
    if (newVal) {
      anchor.value.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }
);
watch(
  () => top.value,
  (newVal) => {
    if (wheelScroll.value) return;
    manualScroll.value = true;
    ablumContent.value.scrollTop = ablumContent.value.scrollHeight * newVal;
    ablumContent.value.scrollTo({
      left: 0,
      top: ablumContent.value.scrollHeight * newVal,
      behavior: "smooth",
    });
  }
);
const scroll = () => {
  wheelScroll.value = true;
  clearScrollState();
  if (manualScroll.value) return;
  setTop(ablumContent.value.scrollTop / ablumContent.value.scrollHeight);
};
let timer = null;
let scrollTimer = null;
const clearScrollState = () => {
  clearTimeout(timer);
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    manualScroll.value = false;
    wheelScroll.value = false;
  }, 100);
  if (scrollToTop.value) {
    timer = setTimeout(function () {
      setScrollToTop(false);
    }, 100);
  }
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
  transition: all 0.3s ease;
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
  grid-template-columns: repeat(auto-fill, 200px);
  grid-template-rows: repeat(auto-fill, 260px);
  justify-content: space-between;
  row-gap: 20px;
}

.album-content__dir-pic-info {
  box-sizing: border-box;
  font-size: 15px;
  width: 200px;
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
.album-content__view-more {
  margin: 0;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
