import { reqPlayList, reqSongDetails, reqSongsLyric, reqSongsUrl } from "@/api"

const state = {

    //播放列表
    audio: [],
    //当前播放歌曲
    currentSong:{},
    //当前播放歌曲索引
    index:0
}
const actions = {

    //获取歌词,url,信息等
    async getAudio({ commit, state }, id) {
        //获取歌词
        try {
            let [result1, result2, result3] = await Promise.all([reqSongsLyric(id), reqSongsUrl(id), reqSongDetails(id)])
            let audio = {
                name: result3.songs[0].al.name,
                cover: result3.songs[0].al.picUrl,
                artist: result3.songs[0].ar[0].name,
                url: result2.data[0].url,
                lrc: result1.lrc.lyric,
                id: id,
                artistId:result3.songs[0].ar[0].id
            }
            console.log(result1);
            console.log(result2);
            console.log(result3);
            //设置一个标志，如果歌单中已经有了这首歌就不会加入其中
            let currentIndex = 0;
            let symbols = state.audio.some((value,index)=>{
                if(value.id === audio.id){
                    currentIndex = index
                }
                return value.id === audio.id;
            })
            console.log(symbols);
            commit('GETAUDIO', { audio, symbols,currentIndex });
        } catch (error) {
            console.log(error)
        }
    },
}
const mutations = {
    GETAUDIO(state, { audio, symbols, currentIndex}) {
        if (!symbols) {
            state.audio.unshift(audio);
        }
        state.index = currentIndex;
        state.currentSong = audio;
    },
    //修改当前音乐
    SETCURRENTSONG(state,song){
        state.currentSong = song;
        state.audio.some((value,index)=>{
            if(value.id === song.id){
                state.index = index
            }
            return value.id === song.id;
        })
    },
    //清空播放器
    CLEARPLAYLIST(state){
        state.audio.splice(0,state.audio.length);
    }
}
const getters = {
    //判断播放列表audio中是否有歌（当有歌时再显示音乐播放器）
    isShowPlayer(state){
        return JSON.stringify(state.currentSong) !== '{}';
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}