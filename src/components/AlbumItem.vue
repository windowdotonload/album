<template>
  <div
    class="album-content__img-box"
    :style="{
      width: `${width}px` || `300px`,
      height: `${height}px` || `168px`,
    }"
  >
    <img
      :src="type == 'video' ? albumItem.poster : albumItem.url"
      :style="{
        objectFit: 'cover',
        'border-radius': '12px',
        width: `${width}px`,
        height: `${height}px`,
      }"
    />
    <div class="album-content__img-mask">
      <div class="album-content__img-icon-box" v-if="type == 'video'">
        <img
          src="../assets/view_video.png"
          style="object-fit: contain; width: 16px; height: 16px"
        />
      </div>
      <div
        class="album-content__img-icon-box"
        style="background: none"
        v-if="type == 'pic'"
      >
        <img
          src="../assets/view_pic.png"
          style="object-fit: contain; width: 56px; height: 65px"
        />
      </div>
      <p
        v-if="type == 'video'"
        style="
          width: 100%;
          text-align: center;
          margin: 0;
          font-size: 13px;
          margin-top: 3px;
        "
      >
        观看
      </p>
      <p class="album-content__time-stamp" v-if="type == 'video'">
        更新：{{ albumItem.updateTime }}
      </p>
    </div>
    <div class="album-content__info" v-if="type == 'video'">
      <div class="album-content__info-line">
        <span class="album-content__info-name"> {{ albumItem?.name }}</span>
      </div>
      <div class="album-content__info-line" style="font-weight: normal">
        {{ albumItem?.updateTime.split(" ")[1] }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  albumItem: Object,
  width: { type: Number, default: 300 },
  height: { type: Number, default: 168 },
  type: String,
});
</script>

<style scoped>
.album-content__img-box {
  position: relative;
  width: 300px;
  height: 168px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}
.album-content__img-box:hover {
  transform: translateY(-5px);
}
.album-content__img-box:hover .album-content__img-mask {
  opacity: 1;
}
.album-content__img-mask {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease;
}
.album-content__img-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  background: rgba(255, 255, 255, 0.3);
}
.album-content__time-stamp {
  position: absolute;
  bottom: 0;
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: 13px;
  bottom: 5px;
}
.album-content__info {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
}
.album-content__img-box:hover .album-content__info {
  display: none;
}
.album-content__info-line {
  width: 100%;
  overflow: hidden;
  height: 13px;
  line-height: 15px;
  text-overflow: ellipsis;
  text-align: start;
  margin-bottom: 5px;
}
.album-content__info-pic {
  position: relative;
  width: 100%;
}
.album-content__info-name {
  display: inline-block;
  width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
}
.album-content__info-name {
  display: inline-block;
  width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 13px;
  height: 13px;
  white-space: nowrap;
}
</style>
