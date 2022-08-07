import {
  reqArtistAlbum,
  reqArtistDesc,
  reqArtistDetail,
  reqArtistMv,
  reqArtistSongs,
} from "@/api";

const state = {
  //歌手描述
  briefDesc: "",
  //歌手详细描述
  introduction: [],
  //歌手详情
  artist: {},
  //歌手热门歌曲
  hotSongs: [],
  //歌手专辑
  hotAlbums: [],
  //歌手mv
  mvs: [],
};
const actions = {
  async getArtistDesc({ commit }, id) {
    let result = await reqArtistDesc(id);
    if (result.code === 200) {
      commit("GETARTISTDESC", result);
      return "ok";
    } else {
      return Promise.reject(result.msg);
    }
  },
  async getArtistDetail({ commit }, id) {
    let result = await reqArtistDetail(id);
    if (result.code === 200) {
      commit("GETARTISTDETAIL", result.data.artist);
      return "ok";
    } else {
      return Promise.reject(result.msg);
    }
  },
  async getArtistSongs({ commit }, id) {
    let result = await reqArtistSongs(id);
    if (result.code === 200) {
      commit("GETARTISTSONGS", result.hotSongs);
      return "ok";
    } else {
      return Promise.reject(result.msg);
    }
  },
  async getArtistAlbum({ commit }, { id, limit, offset }) {
    let result = await reqArtistAlbum({ id, limit, offset });
    if (result.code === 200) {
      commit("GETARTISTALBUM", result.hotAlbums);
      return "ok";
    } else {
      return Promise.reject(result.msg);
    }
  },
  async getArtistMv({ commit }, id) {
    let result = await reqArtistMv(id);
    if (result.code === 200) {
      commit("GETARTISTMV", result.mvs);
      return "ok";
    } else {
      return Promise.reject(result.msg);
    }
  },
};
const mutations = {
  GETARTISTDESC(state, result) {
    state.briefDesc = result.briefDesc;
    state.introduction = result.introduction;
  },
  GETARTISTDETAIL(state, artist) {
    state.artist = artist;
  },
  GETARTISTSONGS(state, hotSongs) {
    state.hotSongs = hotSongs;
  },
  GETARTISTALBUM(state, hotAlbums) {
    state.hotAlbums = hotAlbums;
  },
  GETARTISTMV(state, mvs) {
    state.mvs = mvs;
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
