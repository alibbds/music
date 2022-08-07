import {
  reqLikeComment,
  reqMvComment,
  reqMvDetail,
  reqMvLink,
  reqSendOrDeleteComment,
  reqSimilarMv,
} from "@/api";

const state = {
  //mv的URL
  mvUrl: "",
  //mv详情
  detail: {},
  //评论
  comment: {},
  //评论数量
  commentTotal: null,
  //相似mv
  mvs: [],
};
const actions = {
  //获取mv的url
  async getMvLink({ commit }, id) {
    let result = await reqMvLink(id);
    if (result.code === 200) {
      commit("GETMVLINK", result.data.url);
      return "ok";
    } else {
      return Promise.reject(result.message);
    }
  },
  //获取mv详情
  async getMvDetail({ commit }, id) {
    let result = await reqMvDetail(id);
    if (result.code === 200) {
      commit("GETMVDETAIL", result.data);
      return "ok";
    } else {
      return Promise.reject(result.message);
    }
  },
  //获取评论
  async getMvComment({ commit }, { limit, id, offset }) {
    let result = await reqMvComment({ limit, id, offset });
    if (result.code === 200) {
      commit("GETMVCOMMENT", result);
      return "ok";
    } else {
      return Promise.reject(result.message);
    }
  },
  //发评论
  async sendComment({ commit }, { t, type, id, content }) {
    let result = await reqSendOrDeleteComment({ t, type, id, content });
    if (result.code === 200) {
      return "已发送";
    } else {
      return Promise.reject(result.msg);
    }
  },
  //获取相似mv
  async getSimilarMv({ commit }, id) {
    let result = await reqSimilarMv(id);
    if (result.code === 200) {
      commit("GETSIMILARMV", result.mvs);
      return "";
    } else {
      return Promise.reject(new Error("请求失败"));
    }
  },
  //给品论点赞
  async getLikeComment({}, { type, cid, t, id }) {
    let result = await reqLikeComment({ type, cid, t, id });
  },
};
const mutations = {
  GETMVLINK(state, url) {
    state.mvUrl = url;
  },
  GETMVDETAIL(state, data) {
    state.detail = data;
  },
  GETMVCOMMENT(state, result) {
    if (result.hotComments) {
      let comment = result.comments.filter((item) => {
        let symbol = true;
        for (let i of result.hotComments) {
          if (i.commentId === item.commentId) {
            symbol = false;
          }
        }
        return symbol;
      });
      state.comment = result.hotComments.concat(comment);
    } else {
      state.comment = result.comments;
    }
    state.commentTotal = result.total;
  },
  GETSIMILARMV(state, mvs) {
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
