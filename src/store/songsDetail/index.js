import {
  reqLikeSong,
  reqSongComment,
  reqSongDetails,
  reqSongSimilars,
  reqSongsLyric,
} from "@/api";

const state = {
  songInfo: {},
  similarSongs: [],
  lyric: "",
  comment: [],
  commentTotal: null,
};
const actions = {
  async getSongInfo({ commit }, id) {
    let result = await reqSongDetails(id);
    if (result.code === 200) {
      commit("GETSONGINFO", result.songs[0]);
    } else {
      return Promise.reject("error");
    }
  },
  async getSimilarSongs({ commit }, id) {
    let result = await reqSongSimilars(id);
    if (result.code === 200) {
      commit("GETSIMILARSONGS", result.songs);
    } else {
      return Promise.reject("error");
    }
  },
  //获取音乐歌词
  async getSongLrc({ commit }, id) {
    let result = await reqSongsLyric(id);
    if (result.code === 200) {
      commit("GETSONGLRC", result.lrc.lyric);
    } else {
      return Promise.reject("");
    }
  },
  //获取歌曲评论
  async getSongComment({ commit }, { limit, id, offset }) {
    let result = await reqSongComment({ limit, id, offset });
    if (result.code === 200) {
      commit("GETSONGCOMMENT", result);
    } else {
      return Promise.reject("");
    }
  },
  //喜欢该音乐或取消喜欢
  async getSongLike({ commit }, { id, like }) {
    let result = await reqLikeSong({ id, like });
    if (result.code === 200) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  },
};
const mutations = {
  GETSONGINFO(state, songs) {
    state.songInfo = songs;
  },
  GETSIMILARSONGS(state, songs) {
    state.similarSongs = songs.slice(0, 5);
  },
  GETSONGLRC(state, lyric) {
    state.lyric = lyric;
  },
  GETSONGCOMMENT(state, result) {
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
};
const getters = {
  //对传过来的lyric格式的歌词处理
  lyc(state) {
    let arr1 = state.lyric.split("\n");
    let arr2 = [];
    if (arr1[0].slice(0, 1) === "[") {
      let reg = /(?<=\[[0-9]{2}\:[0-9]{2}\.[0-9]{2,3}\])[^\:]*/;
      arr1.forEach((element) => {
        arr2 = arr2.concat(reg.exec(element));
      });
      return arr2 || [];
    } else {
      return arr1 || [];
    }
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
