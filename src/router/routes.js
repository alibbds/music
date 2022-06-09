export default [
    {
        path:'/home',
        component: resolve => { require(['@/views/Home'], resolve) },
        meta:{footerShow:true,title:'主页',keepAlive:true}
    },
    {
        path:'/playlist',
        component: resolve => { require(['@/views/PlayList'], resolve) },
        meta:{title:'歌单',keepAlive:false}

    },
    {
        path:'/ranklist',
        component: resolve => { require(['@/views/RankingList'], resolve) },
        meta:{title:'排行榜',keepAlive:false}

    },
    {
        path:'/mv',
        component: resolve => { require(['@/views/Mv'], resolve) },
        meta:{title:'MV',keepAlive:false}
    },
    {
        path:'/artist',
        component: resolve => { require(['@/views/Artist'], resolve) },
        meta:{title:'歌手',keepAlive:false}

    },
    {
        path:'/user',
        component: resolve => { require(['@/views/User'], resolve) },
        meta:{title:'我的主页',keepAlive:false}

    },
    {
        name:'Search',
        path:'/search/:keywords',
        component: resolve => { require(['@/views/Search'], resolve) },
        meta:{title:'搜索',keepAlive:false}

    },
    {
        name:'Playlistdetail',
        path:'/playlistdetail/:id',
        component: resolve => { require(['@/views/PlayListDetail'], resolve) },
        meta:{title:'歌单详情',keepAlive:false}

    },
    {
        name:'Mvdetail',
        path:'/mvdetail/:id',
        component: resolve => { require(['@/views/MvDetail'], resolve) },
        meta:{title:'MV详情',keepAlive:false}

    },
    {
        name:'Album',
        path:'/album',
        component: resolve => { require(['@/views/Album'], resolve) },
        meta:{title:'专辑',keepAlive:true}

    },
    {
        name:'Albumdetail',
        path:'/albumdetail/:id',
        component: resolve => { require(['@/views/AlbumDetail'], resolve) },
        meta:{title:'专辑详情',keepAlive:false}

    },
    {
        name:'Artistdetail',
        path:'/artistdetail/:id',
        component: resolve => { require(['@/views/ArtistDetail'], resolve) },
        meta:{title:'歌手详情',keepAlive:false}

    },
    {
        name:'Songsdetail',
        path:'/songsdetail/:id',
        component: resolve => { require(['@/views/SongsDetail'], resolve) },
        meta:{title:'歌曲详情',keepAlive:false}

    },
    {
        path:'*',
        redirect:'/home'
    }
]