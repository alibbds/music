import { reqAlbumComment, reqAlbumDetail, reqArtistAlbum } from "@/api"

const state = {
    songs: [],
    album: {},
    comment:[],
    commentTotal:null,
    hotAlbums:[],
}
const actions = {
    async getAlbumDetail({ commit }, id) {
        let result = await reqAlbumDetail(id)
        console.log(result)
        if (result.code === 200) {
            commit('GETALBUMDETAIL', result)
            return 'ok'
        } else {
            return Promise.reject(result.msg)
        }
    },
    async getAlbumComment({ commit }, { id, limit, offset }) {
        let result = await reqAlbumComment({ id, limit, offset })
        console.log(result)
        if (result.code === 200) {
            commit('GETALBUMCOMMENT', result)
            return 'ok'
        } else {
            return Promise.reject(result.msg)
        }
    },
    async getArtistAlbum({ commit }, { id, limit='6', offset='0' }) {
        let result = await reqArtistAlbum({ id, limit, offset })
        console.log(result)
        if (result.code === 200) {
            commit('GETARTISTALBUM', result.hotAlbums)
            return 'ok'
        } else {
            return Promise.reject(result.msg)
        }
    }
}
const mutations = {
    GETALBUMDETAIL(state, result) {
        state.songs = result.songs
        state.album = result.album
    },
    GETALBUMCOMMENT(state, result) {
        if (result.hotComments) {
            let comment = result.comments.filter((item) => {
                let symbol = true
                for (let i of result.hotComments) {
                    if (i.commentId === item.commentId) {
                        symbol = false
                    }
                }
                return symbol
            })
            state.comment = result.hotComments.concat(comment)
        } else {
            state.comment = result.comments
        }
        state.commentTotal = result.total
    },
    GETARTISTALBUM(state,hotAlbums){
        state.hotAlbums = hotAlbums.filter((element)=>{
            return element.id!==state.album.id
        })
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}