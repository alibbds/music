import { reqHotComment, reqPlayList, reqSimilarPlayList } from "@/api"
import { Result } from "element-ui"

const state = {
    playlist:{},
    //相似歌单(用每个歌单第一首歌请求的相似歌单)
    playlists:[],
    //热门评论
    hotComments:[],
}
const actions = {
    //获取歌单详情(通过点击歌单封面)
    async getPlayListDetail({commit},id){
        let result = await reqPlayList(id)
        if(result.code === 200){
            commit('GETPLAYLISTDETAIL',result.playlist)
            return 'ok'
        }else{
            return Promise.reject(result.message)
        }
    },
    //获取相似歌单(传歌曲id)
    async getSimilarPlayList({commit},id){
        let result = await reqSimilarPlayList(id)
        if(result.code === 200){
            commit('GETSIMILARPLAYLIST',result.playlists)
            return 'ok'
        }else{
            return Promise.reject(result.message)
        }
    },
    //获取歌单热门评论
    async getHotComment({commit},id,type){
        let result = await reqHotComment(id,type)
        if(result.code === 200){
            commit('GETHOTCOMMENT',result.hotComments)
            return 'ok'
        }else{
            return Promise.reject(result.message)
        }
    }
}
const mutations = {
    GETPLAYLISTDETAIL(state,playlist){
        state.playlist = playlist
    },
    GETSIMILARPLAYLIST(state,playlists){
        state.playlists = playlists
    },
    GETHOTCOMMENT(state,hotComments){
        state.hotComments = hotComments
    }
}
const getters = {}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}