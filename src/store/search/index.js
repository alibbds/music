import { reqHotSearch, reqSearchDetail, reqSearchSuggest } from "@/api"
import album from "../album"

const state = {
    //热门搜索
    hots: [],
    //各部分详情
    item: [],
    //详情总量
    total: null,
    //item的类型防止交叉渲染
    itemType: 1,
    //搜索建议
    searchSuggest: [],
}
const actions = {
    async getHotSearch({ commit }) {
        let result = await reqHotSearch()
        console.log(result)
        if (result.code === 200) {
            console.log(result);
            commit('GETHOTSEARCH', result.result.hots)
            return 'ok'
        } else {
            return Promise.reject(result.msg)
        }
    },
    async getSearchDetail({ commit }, { keywords, limit, offset, type }) {
        let result = await reqSearchDetail({ keywords, limit, offset, type })
        console.log(result)
        if (result.code === 200) {
            commit('GETSEARCHDETAIL', result.result)
            return 'ok'
        } else {
            return Promise.reject(result.msg)
        }
    },
    async getSearchSuggest({ commit }, keywords) {
        let result = await reqSearchSuggest(keywords);
        if (result.code === 200) {
            console.log(result)
            commit('GETSEARCHSUGGEST', result);
        } else {
            return Promise.reject(new Error("无"));
        }
    }
}
const mutations = {
    GETHOTSEARCH(state, hots) {
        state.hots = hots
    },
    GETSEARCHDETAIL(state, result) {
        if (result.hasOwnProperty("songs")) {
            state.item = result.songs
            state.total = result.songCount
            state.itemType = 1
        } else if (result.hasOwnProperty("albums")) {
            state.item = result.albums
            state.total = result.albumCount
            state.itemType = 10
        } else if (result.hasOwnProperty("artists")) {
            state.item = result.artists
            state.total = result.artistCount
            state.itemType = 100
        } else if (result.hasOwnProperty("playlists")) {
            state.item = result.playlists
            state.total = result.playlistCount
            state.itemType = 1000
        } else if (result.hasOwnProperty("mvs")) {
            state.item = result.mvs
            state.total = result.mvCount
            state.itemType = 1004
        } else {
            state.item = []
            state.total = 0
        }
    },
    GETSEARCHSUGGEST(state, result) {
        let songs = [];
        let albums = [];
        let playlists = [];
        let artists = [];

        if (result.result.songs) {
            songs = result.result.songs.slice(0, 10);
        }
        if (songs.length < 10 && result.result.albums) {
            albums = result.result.albums.slice(0, 10)
        }
        if ((songs.length + albums.length) < 10 && result.result.artists) {
            artists = result.result.artists.slice(0, 10)
        }
        if ((songs.length + albums.length + artists.length) < 10 && result.result.playlists) {
            playlists = result.result.playlists.slice(0, 10)
        }
        let arr = songs.concat(albums);
        arr = arr.concat(artists);
        arr = arr.concat(playlists);
        state.searchSuggest = arr;
    },
    //如果搜索匹配的字符串为空应该把searchSuggest置空并且展示热门搜索(getters中已实现)
    CLEARSEARCHSUGGEST(state){
        state.searchSuggest = [];
    }
}
const getters = {
    //搜索框下面的展示是展示热门搜索(未键入keywords)还是搜索建议(已经键入keywords)
    showSearchList(state) {
        if (state.searchSuggest.length !== 0) {
            return state.searchSuggest;
        } else {
            return state.hots;
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}