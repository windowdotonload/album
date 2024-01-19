<template>
  <div class="img-box__container-outer active img-box__all">
    <img src="../assets/all_bg.png" class="img_box" />
    <div class="img-box__mask">
      <p class="breviary__all">全部</p>
      <div class="img-box__mask-hover">
        <div class="img-box__mask-tip">
          <img src="../assets/all_icon.png" style="margin-right: 10px" />
          全部
        </div>
        <img src="../assets/triangle.png" style="margin-bottom: 5px" />
      </div>
    </div>
    <div class="img-box__mask-bg-hover"></div>
  </div>
</template>

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
.img-box__container-outer {
  display: inline-block;
  position: relative;
  margin-left: 10px;
  width: calc((100% - 200px) / 7);
  height: 90%;
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
  right: 0px;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  opacity: 1;
  background: rgba(0, 0, 0, 0.1608);
  color: #fff;
  letter-spacing: 1.5;
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
  transform: translateX(-50%) translateY(-95%);
  z-index: -1;
}
</style>
