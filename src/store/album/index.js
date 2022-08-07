import { reqAllAlbum } from "@/api";

const state = {
  albums: [],
  total: null,
};
const actions = {
  async getAllAlbum({ commit }, { area, limit, offset }) {
    let result = await reqAllAlbum({ area, limit, offset });
    if (result.code === 200) {
      commit("GEALLALBUM", result);
      return "ok";
    } else {
      return Promise.reject(result.msg);
    }
  },
};
const mutations = {
  GEALLALBUM(state, result) {
    state.albums = result.albums;
    state.total = result.total;
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
