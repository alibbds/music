import {
  reqCaptcha,
  reqLoginState,
  reqLogout,
  reqUserLogin,
  reqUserCollection,
  reqUserPlayList,
  reqPlayList,
  reqUserLevel,
  reqUserMessage,
} from "@/api";

const state = {
  isLogin: localStorage.getItem("isLogin") || false,
  dialogVisible: false,
  //用户创建/收藏歌单
  playlist: [],
  //每个歌单详情
  playlistDetail: [],
  //用户等级
  level: null,
  loginStatus: "",
};
const actions = {
  //密码登录
  async userLoginByPassword({ commit }, { phone, password }) {
    let result = await reqUserLogin({ phone, password });
    if (result.code === 200) {
      window.localStorage.setItem("token", result.token);
      window.localStorage.setItem("cookie", result.cookie);
      window.localStorage.setItem("isLogin", true);
      window.localStorage.setItem("userInfo", JSON.stringify(result.profile));
      commit("USERLOGIN", true);
      return "ok";
    } else {
      return Promise.reject(result.message);
    }
  },
  //登出
  async userLogout({ commit }) {
    let result = await reqLogout();
    if (result.code === 200) {
      window.localStorage.removeItem("isLogin");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("cookie");
      window.localStorage.removeItem("userInfo");
      commit("USERLOGOUT", false);
    } else {
      return Promise.reject(result.message);
    }
  },
  //获取验证码
  async getCode({ commit }, phone) {
    let result = await reqCaptcha(phone);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject("获取验证码失败");
    }
  },
  //验证码登录
  async userLoginByCode({ commit }, { phone, captcha }) {
    let result = await reqUserLogin({ phone, captcha });
    if (result.code === 200) {
      window.localStorage.setItem("token", result.token);
      window.localStorage.setItem("cookie", result.cookie);
      window.localStorage.setItem("isLogin", true);
      window.localStorage.setItem("userInfo", JSON.stringify(result.profile));
      commit("USERLOGIN", true);
      return "ok";
    } else {
      return Promise.reject(result.message);
    }
  },
  //获取用户歌单分类
  async getUserPlayList({ commit }) {
    let result = await reqUserPlayList();
    if (result.code === 200) {
      commit("GETUSERPLAYLIST", result.playlist);
      return "";
    } else {
      return Promise.reject(result.message);
    }
  },
  //获取歌单详情
  async getUserPlayListDetail({ commit }, id) {
    let result = await reqPlayList(id);
    if (result.code === 200) {
      commit("GETUSERPLAYLISTDETAIL", result.playlist);
      return;
    } else {
      return Promise.reject(result.message);
    }
  },
  //获取用户等级
  async getUserLevel({ commit }) {
    let result = await reqUserLevel();
    if (result.code === 200) {
      commit("GETUSERLEVEL", result.data.level);
    }
  },
  //获取用户通知，@，评论，私信
  async getUserMessages({ commit }) {
    let result = await reqUserMessage();
  },
  async getUserStatus({ commit }) {
    let status = await reqLoginState();
  },
};
const mutations = {
  USERLOGIN(state, value) {
    state.isLogin = value;
  },
  USERLOGOUT(state, value) {
    state.isLogin = value;
  },
  //修改登录框的显示与隐藏
  DIALOGVISIBLE(state, value) {
    state.dialogVisible = value;
  },
  GETUSERPLAYLIST(state, playlist) {
    state.playlist = playlist;
  },
  GETUSERPLAYLISTDETAIL(state, playlist) {
    state.playlistDetail = playlist;
  },
  GETUSERLEVEL(state, level) {
    state.level = level;
  },
};
const getters = {
  //用户创建的歌单
  playlistCreateByUser(state) {
    return state.playlist.filter((item) => {
      return (
        item.creator.userId ===
        JSON.parse(window.localStorage.getItem("userInfo")).userId
      );
    });
  },
  playlistCreateByOthers(state) {
    return state.playlist.filter((item) => {
      return (
        item.creator.userId !==
        JSON.parse(window.localStorage.getItem("userInfo")).userId
      );
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
