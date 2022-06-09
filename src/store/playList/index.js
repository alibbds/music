import { reqHotList, reqPlaylistCategory } from "@/api"

const state = {
    all:{},
    sub:[],
    categories:{},
    playlists:[],
    cat:'',
}
const actions = {
    //获取歌单页面的分类
    async getAlbumCategory({commit}){
        let result =  await reqPlaylistCategory()
        if(result.code === 200){
            commit('GETALBUMCATEGORY',result)
        }else{
            return Promise.reject(result.message)
        }
    },
    //获取歌单(只有封面)
    async getAlbum({commit},{offset,limit,cat,order}){
        let detail = {offset,limit,cat,order}
        let result = await reqHotList(detail)
        if(result.code === 200){
            commit('GETALBUM',result)
        }else{
            return Promise.reject(result.message)
        }
    }
}
const mutations = {
    //获取歌单页面的分类
    GETALBUMCATEGORY(state,value){
        state.all = value.all
        state.sub = value.sub
        state.categories = value.categories
    },
    //获取各种歌单
    GETALBUM(state,result){
        state.playlists = result.playlists
        state.cat = result.cat
    }
}
const getters = {
    type0(state){
        return state.sub.filter((item)=>{
            return item.category === 0
        }) || []
    },
    type1(state){
        return state.sub.filter((item)=>{
            return item.category === 1
        }) || []
    },
    type2(state){
        return state.sub.filter((item)=>{
            return item.category === 2
        }) || []
    },
    type3(state){
        return state.sub.filter((item)=>{
            return item.category === 3
        }) || []
    },
    type4(state){
        return state.sub.filter((item)=>{
            return item.category === 4
        }) || []
    },
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}