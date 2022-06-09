<template>
  <div class="PlayListDetail">
    <div class="playList">
      <div class="describe">
        <img :src="playlist.coverImgUrl" alt="" />
        <div class="describeInfo">
          <h2>{{ playlist.name }}</h2>
          <div class="creator">
            <img :src="playlist.creator.backgroundUrl" alt="" v-if="playlist.creator" />
            <span v-if="playlist.creator">{{ playlist.creator.nickname }}</span>
            <span>{{
              $utils.formartDate(playlist.createTime, "yyyy-MM-dd")
            }}</span>
          </div>
          <div class="tags">
            <span v-for="(item, index) of playlist.tags" :key="index"
              >#{{ item }}</span
            >
          </div>
          <div class="describeInfo1">
            <span class="playCount"
              ><i class="el-icon-headset"></i>
              {{ $utils.formartNum(playlist.playCount) }}次</span
            >
            <span class="collect"
              ><i class="el-icon-circle-plus"></i>
              {{ $utils.formartNum(playlist.subscribedCount) }}</span
            >
            <span class="comment"
              ><i class="el-icon-chat-round"></i>
              {{ $utils.formartNum(playlist.commentCount) }}</span
            >
          </div>
          <div class="describeInfo2">
            <h5>歌单简介</h5>
            <el-popover
              placement="top-start"
              title="描述"
              width="600"
              trigger="hover"
            >
              <div class="showDesc">
                <p>{{ playlist.description }}</p>
              </div>
              <p slot="reference">{{ playlist.description }}</p>
            </el-popover>
          </div>
        </div>
      </div>
      <Songs :tracks="playlist.tracks" :width=0></Songs>
    </div>
    <div class="sideShow">
      <div class="SimilarSongList">
        <h4>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-music"></use>
          </svg>
          相关歌单推荐
        </h4>
        <div class="SongList" v-for="item of playlists" :key="item.id" @click="goPlayListDetail(item.id)">
          <img :src="item.coverImgUrl" alt="" />
          <div class="list">
            <span class="listName">{{ item.name }}</span>
            <span class="listCreator" v-if="item.creator">By.{{ item.creator.nickname }}</span>
          </div>
        </div>
      </div>
      <div class="commentSide">
          <h4>
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huifupingluns"></use>
          </svg>
            歌单评论</h4>
          <div class="commentList" v-for="item of hotComments" :key="item.commentId">
            <img v-if="item.user" :src="item.user.avatarUrl" alt="">
            <div class="comments">
              <div class="publish">
                <span id="commentUserName">{{item.user.nickname}}</span>
                <span id="commentPublishTime">{{$utils.formartDate(item.time,'yyyy年MM月dd日')}}</span>
              </div>
              <p>{{item.content}}</p>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Songs from "@/components/Songs";
export default {
  name: "PlayListDetail",
  components: { Songs },
  computed: {
    ...mapState("playListDetail", ["playlist", "playlists","hotComments"]),
  },
  methods: {
    async getData() {
      this.$store.dispatch('playListDetail/getHotComment',{
        id:this.$route.params.id,
        //2代表歌单评论
        type:2
      })
      await this.$store.dispatch(
        "playListDetail/getPlayListDetail",
        this.$route.params.id
      );
      this.$store.dispatch(
        "playListDetail/getSimilarPlayList",
        this.playlist.tracks[0].id
      );
    },
    goPlayListDetail(id){
        this.$router.push({
            name:'Playlistdetail',
            params:{
                id
            }
        })
    }
  },
  watch: {
      $route(newValue, oldValue) {
          this.getData()
      },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.PlayListDetail {
  width: 1080px;
  display: flex;
  justify-content: space-between;
  .playList {
    width: 700px;
    display: flex;
    flex-direction: column;
    .describe {
      display: flex;
      width: 100%;
      //height: 300px;
      img {
        width: 300px;
        height: 300px;
        border-radius: 2px 2px;
      }
      .describeInfo {
        display: flex;
        flex-direction: column;
        margin-left: 30px;
        .describeInfo1 {
          font-size: 14px;
          color: #999;
        }
        .creator {
          margin-top: 20px;
          display: flex;
          align-items: center;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          span {
            font-size: 14px;
            color: #999;
            margin-left: 8px;
          }
        }
      }
      .tags {
        margin-top: 15px;
        span {
          font-size: 12px;
          color: orange;
        }
      }
      .describeInfo1 {
        margin-top: 5px;
        .collect,
        .comment {
          margin-left: 10px;
        }
      }
      .describeInfo2 {
        margin-top: 45px;
        width: 100%;
        height: 100px;
        p {
          margin-top: 10px;
          font-size: 14px;
          color: #999;
          line-height: 25px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .sideShow {
    display: flex;
    flex-direction: column;
    width: 300px;
    .SimilarSongList {
      h4 {
        .icon {
            font-size: 20px;
        }
      }
      width: 100%;
      .SongList {
        width: 100%;
        height: 80px;
        border-radius: 5px 5px;
        display: flex;
        margin-top: 10px;
        cursor: pointer;
        img {
          width: 80px;
          height: 80px;
          border-radius: 5px 5px;
        }
        .list {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          span {
            display: block;
            font-size: 12px;
            color: #999;
            &.listName {
              font-weight: bold;
            }
          }
        }
      }
    }
    .commentSide{
      width: 100%;
      margin-top: 20px;
      h4{
        .icon{
          font-size: 20px;
        }
      }
      .commentList{
        display: flex;
        width: 100%;
        margin-top: 15px;
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .comments{
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          width: 100%;
          .publish{
            #commentUserName{
              font-size: 14px;
              color: #1e90ff;
            }
            #commentPublishTime{
              font-size: 12px;
              color: #999;
              float: right;
            }
          }
          p{
            margin-top: 10px;
            font-size: 14px;
            display: block;
            background-color:#f0f0f0;
            padding: 8px 8px 8px 8px;
            border-radius: 5px 5px;
          }
        }
      }
    }
  }
}
</style>