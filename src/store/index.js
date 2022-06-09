import Vue from 'vue'
import Vuex from 'vuex'
//需要引用一下
Vue.use(Vuex);
import home from './home';
import songs from './songs';
import user from './user';
import topList from './topList';
import playList from './playList';
import mv from './mv';
import artist from './artist';
import playListDetail from './playListDetail';
import mvDetail from './mvDetail';
import album from './album';
import albumDetail from './albumDetail';
import artistDetail from './artistDetail';
import search from './search';
import songsDetail from './songsDetail';

export default new Vuex.Store({
    modules:{
        home,
        songs,
        user,
        topList,
        playList,
        mv,
        artist,
        playListDetail,
        mvDetail,
        album,
        albumDetail,
        artistDetail,
        search,
        songsDetail
    }
})