import {
  reqNewAlbum,
  reqBanner,
  reqHotCategory,
  reqHotList,
  reqNewMv,
  reqHotArtist,
} from "@/api";
const state = {
  //轮播图数据
  bannerList: [],
  //热门歌单分类
  tags: [],
  //热门歌单
  playlists: [],
  //首页新碟上架
  albums: [],
  //最新mv(十条数据)
  newMvInfo: [],
  //热门歌手
  artists: [],
};
const actions = {
  //获取轮播图数据
  async getBannerList({ commit }) {
    let result = await reqBanner();
    if (result.code === 200) {
      commit("GETBANNERLIST", result.banners);
    } else {
      return Promise.reject("获取失败");
    }
  },
  //获取热门歌单分类数据
  async getHotCategory({ commit }) {
    let result = await reqHotCategory();
    if (result.code === 200) {
      commit("GETHOTCATEGORY", result.tags);
    } else {
      return Promise.reject("获取热门歌单分类失败");
    }
  },
  //获取热门歌单(只放在首页)
  async getHotList({ commit }, { limit, cat }) {
    let result = await reqHotList({ limit: limit, cat: cat });
    if (result.code === 200) {
      commit("GETHOTLIST", result.playlists);
    } else {
      return Promise.reject("获取热门歌单失败");
    }
  },
  //只放在首页的最新专辑（12首）
  async getHomeAlbum({ commit }) {
    let result = await reqNewAlbum();
    if (result.code === 200) {
      commit("GETHOMEALBUM", result.albums);
      return "添加成功";
    } else {
      return Promise.reject("获取失败");
    }
  },
  //最新mv
  async getNewMv({ commit }) {
    let result = await reqNewMv();
    if (result.code === 200) {
      commit("GETNEWMV", result.data);
      return "添加成功";
    } else {
      return Promise.reject("获取失败");
    }
  },
  async getHotArtist({ commit }, limit) {
    let result = await reqHotArtist(limit);
    if (result.code === 200) {
      commit("GETHOTARTIST", result.artists);
      return;
    } else {
      return Promise.reject(result.message);
    }
  },
};
const mutations = {
  //初始化轮播图数据
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  //初始化热门歌单分类数据
  GETHOTCATEGORY(state, tags) {
    state.tags = tags;
  },
  //初始化热门歌单
  GETHOTLIST(state, playlists) {
    state.playlists = playlists;
  },
  //获取首页新碟上架（12个数据）
  GETHOMEALBUM(state, albums) {
    state.albums = albums;
  },
  //获取最新mv
  GETNEWMV(state, newMvInfo) {
    state.newMvInfo = newMvInfo;
  },
  //获取首页热门歌手(仅几条数据)
  GETHOTARTIST(state, artists) {
    state.artists = artists;
  },
};
const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
