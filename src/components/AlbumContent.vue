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
        v-for="(item, index) in videoList"
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
    <p class="album-content__view-more" @click="viewMorePic">查看更多</p>
  </div>
</template>

<script setup>
import AblutmItem from "./AlbumItem.vue";
import { usePicList, useHover, useScrollBar, useBackTop } from "../api/index";
import { ref, watch, markRaw, nextTick } from "vue";
let picList = ref([]);
let videoList = ref([]);
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
  picIndex: { topLeave: Infinity, bottomEnter: 0 },
  videoIndex: { topLeave: Infinity, bottomEnter: 0 },
};
const visMap = {
  picVisMap: {},
  videoVisMap: {},
};
let picRawListEndIndex = 16;
let videoRawListEndIndex = 20;

usePicList().then((res) => {
  rawList = markRaw(res.picList[0]);
  picList.value = res.picList[0].imageList.toSpliced(picRawListEndIndex);
  videoList.value = res.picList[0].videoList.toSpliced(videoRawListEndIndex);
  calcScrollBar();
});

const handleVirtuallist = ({ isIntersecting, index, type }) => {
  const visMapTarget = visMap[`${type}VisMap`];
  visMapTarget[index] = isIntersecting;
  debounce();
};
let timeStamp = null;
const debounce = () => {
  if (timeStamp) clearTimeout(timeStamp);
  timeStamp = setTimeout(() => {
    console.log("timeStamp", timeStamp);
    const [picVisShowIndex, videoVisShowIndex] = handleNextLoadIndex();
    assignNewList(picVisShowIndex, videoVisShowIndex);
    timeStamp = null;
  }, 1000);
};
const handleNextLoadIndex = () => {
  const [picVisShowIndex, videoVisShowIndex] = ["pic", "video"].map((key) => {
    const mapKey = `${key}VisMap`;
    const visMapTarget = visMap[mapKey];
    return Object.keys(visMapTarget)
      .map((i) => {
        if (visMapTarget[i]) return i;
      })
      .filter((i) => i !== undefined);
  });
  return [picVisShowIndex, videoVisShowIndex];
};
const assignNewList = (picVisShowIndex, videoVisShowIndex) => {
  indexRecord.picIndex.topLeave = Math.min(...picVisShowIndex);
  indexRecord.picIndex.bottomEnter = Math.max(...picVisShowIndex);
  indexRecord.videoIndex.topLeave = Math.min(...videoVisShowIndex);
  indexRecord.videoIndex.bottomEnter = Math.max(...videoVisShowIndex);
  console.log("picVisShowIndex", indexRecord);

  const picEndIndex =
    indexRecord.picIndex.bottomEnter + 10 >= rawList.imageList.length - 1
      ? rawList.imageList.length - 1
      : indexRecord.picIndex.bottomEnter + 20;
  const picStartIndex = picEndIndex - 40 < 0 ? 0 : picEndIndex - 40;

  const videoEndIndex =
    indexRecord.videoIndex.bottomEnter + 10 >= rawList.imageList.length - 1
      ? rawList.imageList.length - 1
      : indexRecord.videoIndex.bottomEnter + 10;
  const videoStartIndex = videoEndIndex - 40 < 0 ? 0 : videoEndIndex - 40;
  videoList.value = rawList.videoList.slice(videoStartIndex, videoEndIndex);
  videoRawListEndIndex = videoEndIndex;
  console.log("picVisShowIndex", picStartIndex, picEndIndex);
  console.log("videoVisShowIndex", videoStartIndex, videoEndIndex);
  if (
    Math.abs(indexRecord.picIndex.topLeave) == Infinity ||
    Math.abs(indexRecord.videoIndex.topLeave) == Infinity
  )
    return calcScrollBar();
  picList.value = rawList.imageList.slice(picStartIndex, picEndIndex);
  picRawListEndIndex = picEndIndex;
  calcScrollBar();
};
const calcScrollBar = () => {
  nextTick(() => {
    const { scrollHeight, offsetHeight } = ablumContent.value;
    const chunkHeight = offsetHeight / scrollHeight;
    setChunkHeight(chunkHeight);
  });
};
const viewMoreVideo = () => {
  if (videoList.value.length == rawList.videoList.length) return;
  videoList.value = rawList.videoList.toSpliced(20 * ++videoPage);
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
