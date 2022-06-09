import request from './request'
/* 登录 */
//获取验证码
export const reqCaptcha = (phone)=>request({url:`/captcha/sent?phone=${phone}`,method:'get'})
//验证码登录
export const reqUserLogin = ({phone,captcha})=>request({url:`/login/cellphone?phone=${phone}&captcha=${captcha}`,method:'get'})
//密码登录
export const reqUserLoginByPassword =({phone,password})=>request({url:`/login/cellphone?phone=${phone}&password=${password}`})
//获取登录状态
export const reqLoginState = ()=>request({url:`/login/status`,method:'get'})
//退出登录
export const reqLogout = ()=>request({url:`/logout`})
//获取用户创建的歌单
export const reqUserPlayList = ()=>request({url:`/user/playlist?uid=${JSON.parse(window.localStorage.getItem('userInfo')).userId}`})
//获取用户收藏等等
export const reqUserCollection = ()=>request({url:`/user/subcount`,method:'get'})
//首页轮播图数据
export const reqBanner = ()=>request({url:`/banner?type=0`,method:'get'})
//获取用户等级
export const reqUserLevel = ()=>request({url:`/user/level`,method:'get'});
//获取我的消息
export const reqUserMessage = ()=>request({url:`/msg/notices?limit=3`});

/* 歌单api */
//获取热门歌单分类
export const reqHotCategory = ()=>request({url:`/playlist/hot`,method:'get'})
//获取歌单
export const reqHotList = ({offset=0,limit,cat = '',order='hot'})=>request({url:`/top/playlist?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`,method:'get'})
//获取歌单详情
export const reqPlayList = (id)=>request({url:`/playlist/detail?id=${id}`,method:'get'})
//获取歌单分类
export const reqPlaylistCategory = () =>request({url:`/playlist/catlist`,method:'get'})
//获取相似歌单
export const reqSimilarPlayList = (id) =>request({url:`/simi/playlist?id=${id}`,method:'get'})

/* 获取音乐详情 */
//获取音乐url
export const reqSongsUrl =(id)=>request({url:`/song/url?id=${id}`})
//获取音乐歌词
export const reqSongsLyric =(id)=>request({url:`/lyric?id=${id}`})
//获取音乐详情
export const reqSongDetails = (id)=>request({url:`/song/detail?ids=${id}`})
//获取相似音乐
export const reqSongSimilars = (id)=>request({url:`/simi/song?id=${id}`})
//喜欢该音乐或取消喜欢
export const reqLikeSong = ({id,like})=>request({url:`/like?id=${id}&like=${like}`})

/* 专辑 */
//所有专辑
export const reqAlbum = ({offset=0,limit='9',type='new',area='all'})=>request({url:`/top/album?limit=${limit}&offset=${offset}&area=${area}&type=${type}`,method:'get'})
//最新专辑(只有12条数据用于主页展示)
export const reqNewAlbum = ()=>request({url:`/album/newest`,method:'get'})
//全部专辑
export const reqAllAlbum = ({area,limit,offset})=>request({url:`/album/new?area=${area}&limit=${limit}&offset=${offset}`,method:'get'})
//专辑详情
export const reqAlbumDetail = (id)=>request({url:`/album?id=${id}`,method:'get'})


/* mv */
//最新mv
export const reqNewMv = ()=>request({url:`/mv/first?limit=10`})
//全部mv
export const reqAllMv = ({area="全部",type='全部',offset=0,limit="30",order="上升最快"})=>request({url:`/mv/all?area=${area}&type=${type}&offset=${offset}&limit=${limit}&order=${order}`})
//获取mv播放链接
export const reqMvLink = (id)=>request({url:`/mv/url?id=${id}`,method:'get'})
//获取mv详情
export const reqMvDetail=(id) =>request({url:`/mv/detail?mvid=${id}`,method:'get'})
//获取相似mv
export const reqSimilarMv = (id)=>request({url:`/simi/mv?mvid=${id}`})


/* 排行榜 */
//所有榜单(获得的id可以在歌单那里获取详细歌曲)
export const reqTopList = ()=>request({url:`/toplist`,method:'get'})
//获取所有榜单详情列表
export const reqTopListDetail = ()=>request({url:`/toplist/detail`,method:'get'})

/* 歌手 */
//获取歌手分类
export const reqArtistCategory = ({type,area,initial,offset,limit})=>request({url:`/artist/list?type=${type}&area=${area}&initial=${initial}&offset=${offset}&limit=${limit}`,method:'get'})
//获取热门歌手(用于首页展示)
export const reqHotArtist = (limit)=>request({url:`/top/artists?offset=0&limit=${limit}`,method:'get'})
//获取歌手专辑
export const reqArtistAlbum = ({id,limit,offset})=>request({url:`/artist/album?id=${id}&limit=${limit}&offset=${offset}`,method:'get'})
//获取歌手描述
export const reqArtistDesc = (id)=>request({url:`/artist/desc?id=${id}`,method:'get'})
//获取歌手详情
export const reqArtistDetail = (id)=>request({url:`/artist/detail?id=${id}`,method:'get'})
//歌手单曲
export const reqArtistSongs = (id)=>request({url:`/artists?id=${id}`,method:'get'})
//获取歌手MV
export const reqArtistMv = (id)=>request({url:`/artist/mv?id=${id}`,method:'get'})



/* 评论 */
//获取热门评论
export const reqHotComment = ({id,type})=>request({url:`/comment/hot?id=${id}&type=${type}`,method:'get'})
//获取所有评论(有bug)
export const reqComment = ({type,id,sortType,cursor,pageSize,pageNo})=>request({url:`/comment/new?type=${type}&id=${id}&sortType=${sortType}&cursor=${cursor}&pageSize=${pageSize}&pageNo=${pageNo}`})
//获取mv评论
export const reqMvComment = ({id,limit,offset,before=''})=>request({url:`/comment/mv?id=${id}&limit=${limit}&offset=${offset}&before=${before}`,method:'get'})
//获取专辑评论
export const reqAlbumComment = ({id,limit,offset,before=''})=>request({url:`/comment/album?id=${id}&limit=${limit}&offset=${offset}&before=${before}`,method:'get'})
//给资源发评论或删除评论(若要回复评论要穿commentId,若要回复动态则要传threadId)t:1发送t:2回复
export const reqSendOrDeleteComment = ({t,type,id,content})=>request({url:`/comment?t=${t}&type=${type}&id=${id}&content=${content}`,method:'get'})
//获取歌曲评论
export const reqSongComment = ({offset,limit,id})=>request({url:`/comment/music?id=${id}&limit=${limit}&offset=${offset}`,method:'get'})
//给评论点赞
export const reqLikeComment = ({type,cid,t,id})=>request({url:`/comment/like?type=${type}&cid=${cid}&t=${t}&id=${id}`,method:'get'})

/* 搜索 */
//获取热门搜索
export const reqHotSearch = ()=>request({url:'/search/hot',method:'get'})
//获取搜索详情
export const reqSearchDetail = ({keywords,limit,offset,type})=>request({url:`/cloudsearch?keywords=${keywords}$limit=${limit}&offset=${offset}&type=${type}`,method:'get'});
//搜索建议
export const reqSearchSuggest = (keywords)=>request({url:`/search/suggest?keywords=${keywords}`,method:'get'});