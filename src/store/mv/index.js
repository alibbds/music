import { reqAllMv } from "@/api";

const state = {
  //mv
  data: [],
  //mv数量
  count: null,
};
const actions = {
  //获取mv
  async getMv({ commit }, { area, type, order, offset }) {
    let result = await reqAllMv({ area, type, order, offset });

    if (result.code === 200) {
      commit("GETMV", result);
    } else {
      return Promise.reject(result.message);
    }
  },
};
const mutations = {
  GETMV(state, result) {
    state.data = result.data;
    if (result.count) {
      state.count = result.count;
    }
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
