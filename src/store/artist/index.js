import { reqArtistCategory } from "@/api";

const state = {
  //每次请求的30个歌手
  artists: [],
  //每次请求玩还有没有歌手(可否翻页)
  more: Boolean,
};
const actions = {
  //获取歌手列表
  async getArtistList({ commit }, { type, area, initial, offset, limit }) {
    let key = { type, area, initial, offset, limit };
    let result = await reqArtistCategory(key);
    if (result.code === 200) {
      commit("GETARTISTLIST", result);
    } else {
      return Promise.reject(result.message);
    }
  },
};
const mutations = {
  GETARTISTLIST(state, result) {
    state.artists = result.artists;
    state.more = result.more;
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
