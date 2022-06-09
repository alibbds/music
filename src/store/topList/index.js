import { reqTopList, reqTopListDetail,reqPlayList } from "@/api"

const state = {
    topList: [],
    //榜单摘要
    list: [],
    //排行榜音乐列表
    rankingList:{},
}
const actions = {
    //获取全部排行榜
    async getTopList({ commit }) {
        let result = await reqTopList()
        if (result.code === 200) {
            console.log(result)
            commit('GETTOPLIST', result.list)
            return 'ok'
        } else {
            return Promise.reject('获取失败')
        }
    },
    //获取所有榜单详情列表
    async getTopListDetail({ commit,dispatch }) {
        let result = await reqTopListDetail()
        console.log(result)
        if (result.code === 200) {
            dispatch('getPlayList',result.list[0].id)
            commit('GETTOPLISTDETAIL', result.list)
        }
    },
    //获取音乐列表
    async getPlayList({commit},id){
        let result = await reqPlayList(id)
        if(result.code === 200){
            commit('GETPLAYLIST',result.playlist);
            return 'ok'
        }else{
            return Promise.reject(result.message)
        }
    },
}
const mutations = {
    //初始化榜单分类
    GETTOPLIST(state, value) {
        state.topList = value
    },
    //获取榜单摘要
    GETTOPLISTDETAIL(state, list) {
        state.list = list
    },
    //获取榜单歌单
    GETPLAYLIST(state,value){
        state.rankingList = value
    },
}
const getters = {
    toplist(state) {
        return state.list.filter((item) => {
            return item.ToplistType;
        }) || [];
    },
    speciallist(state) {
        return state.list.filter((item) => {
            return !item.ToplistType && item.name.indexOf('云音乐') >= 0
        }) || []
    },
    otherlist(state) {
        return state.list.filter((item) => {
            return !item.ToplistType && item.name.indexOf('云音乐') < 0
        }) || []
    },
    topid(state){
        return state.list[0].id || ''
    }
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}