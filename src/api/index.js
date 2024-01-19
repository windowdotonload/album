import { reactive, ref } from "vue";
const state = reactive({
  loading: false,
  isLoaded: false,
  picList: [],
});
const hoverHead = ref(false);
const chunkHeight = ref(0);
const top = ref(0);
export const fetchPicList = async () => {
  state.loading = true;
  const res = await fetch("https://general.feicut.com/resource/project.json");
  const data = await res.json();
  state.loading = false;
  state.picList = data;
  state.isLoaded = true;
  return state;
};

export const useHover = () => {
  const setHoverHead = (state) => {
    hoverHead.value = state;
  };
  return { hoverHead, setHoverHead };
};

export const usePicList = async () => {
  if (!state.isLoaded) {
    const state = await fetchPicList();
    return state;
  }
  return state;
};

export const useScrollBar = () => {
  const setTop = (val) => {
    top.value = val;
  };
  const setChunkHeight = (val) => {
    chunkHeight.value = val;
  };
  return {
    chunkHeight,
    setChunkHeight,
    top,
    setTop,
  };
};
