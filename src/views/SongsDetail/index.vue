<template>
  <div class="SongsDetail" ref="SongsDetail">
    <aside class="aside">
      <img v-if="songInfo.al" :src="songInfo.al.picUrl" alt="" />
      <h4>相似歌曲</h4>
      <div class="similarSongs">
        <div class="similarSong" v-for="item of similarSongs" :key="item.id">
          <h5 @click="goSong(item.id)">{{ item.name }}</h5>
          <span @click="goArtist(item.artists[0].id)">{{ item.artists[0].name }}</span>
        </div>
      </div>
    </aside>
    <main class="mains">
      <h1 v-if="JSON.stringify(songInfo) !== '{}'">{{ songInfo.name }}</h1>
      <div class="artists" v-if="JSON.stringify(songInfo) !== '{}'">
        <span v-for="item of songInfo.ar" :key="item.id" @click="goArtist(item.id)">
          {{ item.name }}
        </span>
      </div>
      <div class="publishTimeAndAlbum">
        <span class="album" @click="goAlbum(songInfo.al.id)" v-if="JSON.stringify(songInfo) !== '{}'">专辑：{{ songInfo.al.name }}</span>
        <span class="publish"
          >发行日期：{{
            $utils.formartDate(songInfo.publishTime, "yyyy-MM-dd")
          }}</span
        >
      </div>
      <div class="edit">
        <el-button icon="el-icon-caret-right" @click="play">立即播放</el-button>
        <el-button icon="el-icon-star-off" @click="like">喜欢</el-button>
      </div>
      <div class="songLrc">
        <span v-for="(item, index) of smallLyc" :key="index">{{ item }}</span>
        <div class="extend" @click="flag = !flag" v-if="lyc.length > 1">
          <el-button type="text">{{ extendOr }}</el-button>
          <i :class="flag ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
        </div>
        <span v-else>暂无歌词</span>
      </div>
      <CommentList
        ref="CommentList"
        :comment="comment"
        :commentTotal="commentTotal"
      ></CommentList>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="20"
          layout="prev, pager, next, jumper"
          :total="commentTotal"
        >
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CommentList from "@/components/CommentList";
export default {
  name: "SongsDetail",
  components: { CommentList },
  data() {
    return {
      //控制歌词的展开与收缩
      flag: true,
      offset: 0,
    };
  },
  computed: {
    ...mapState("songsDetail", [
      "songInfo",
      "similarSongs",
      "comment",
      "commentTotal",
    ]),
    ...mapGetters("songsDetail", ["lyc"]),
    //展开与收起tag的互换
    extendOr() {
      return this.flag ? "展开" : "收起";
    },
    smallLyc() {
      if (this.flag) {
        return this.lyc.slice(0, 15);
      }
      return this.lyc;
    },
  },
  methods: {
    init() {
      this.$store.dispatch("songsDetail/getSongInfo", this.$route.params.id);
      this.$store.dispatch(
        "songsDetail/getSimilarSongs",
        this.$route.params.id
      );
      this.$store.dispatch("songsDetail/getSongLrc", this.$route.params.id);
      this.$store.dispatch("songsDetail/getSongComment", {
        id: this.$route.params.id,
        offset: 0,
        limit: 20,
      });
    },
    handleCurrentChange(currentPage) {
      this.offset = (currentPage - 1) * 20;
      this.$store.dispatch("songsDetail/getSongComment", {
        id: this.$route.params.id,
        offset: this.offset,
        limit: 20,
      });
      this.$nextTick(() => {
        console.log(this.$refs.CommentList);
        window.scrollTo({
          top: this.$refs.CommentList.$el.offsetTop - 50,
        });
      });
    },
    //喜欢该歌曲
    async like() {
      try {
        await this.$store.dispatch("songsDetail/getSongLike", {
          like: true,
          id: this.$route.params.id,
        });
        this.$message.success("成功添加至喜欢！");
      } catch (error) {
        this.$message.error("喜欢失败！");
      }
    },
    //播放歌曲
    async play() {
      await this.$store.dispatch("songs/getAudio", this.$route.params.id);
      this.$bus.$emit("play");
    },
    //点击相似歌曲名字跳转
    goSong(id) {
      this.$router.push({
        name: "Songsdetail",
        params: {
          id,
        },
      });
      this.init();
    },
    //点击歌手跳转
    goArtist(id){
      this.$router.push({
        name:'Artistdetail',
        params:{
          id
        }
      })
    },
    //点击专辑跳转
    goAlbum(id){
      this.$router.push({
        name:'Albumdetail',
        params:{
          id
        }
      })
    }
  },
  created() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.SongsDetail {
  width: 1080px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  .aside {
    width: 300px;
    position: fixed;
    display: flex;
    flex-direction: column;
    img {
      width: 300px;
      height: 300px;
      border-radius: 5px;
    }
    h4 {
      margin-top: 20px;
    }
    .similarSongs {
      width: 100%;
      margin-top: 15px;
      .similarSong {
        width: 100%;
        display: flex;
        padding: 5px;
        justify-content: space-between;
        background-color: #f4f4f4;
        margin-top: 8px;
        border-radius: 2px;
        &:hover {
          background-color: #f1f1f1;
          cursor: pointer;
        }
        span {
          font-size: 12px;
          color: #777;
          &:hover {
            color: orange;
            cursor: pointer;
          }
        }
        h5 {
          font-size: 13px;
          color: #777;
          &:hover {
            color: orange;
            cursor: pointer;
          }
        }
      }
    }
  }
  .mains {
    width: 700px;
    margin-left: 380px;
    display: flex;
    flex-direction: column;
    .artists {
      margin-top: 15px;
      span {
        font-size: 14px;
        color: #999;
        &:hover {
          color: orange;
          cursor: pointer;
        }
      }
    }
    .publishTimeAndAlbum {
      margin-top: 10px;
      .album {
        font-size: 14px;
        color: #999;
        &:hover {
          color: orange;
          cursor: pointer;
        }
      }
      .publish {
        margin-left: 15px;
        font-size: 14px;
        color: #999;
      }
    }
    .edit {
      margin-top: 15px;
      .el-button {
      }
    }
    .songLrc {
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      span {
        font-size: 13px;
        line-height: 25px;
      }
      .extend {
        cursor: pointer;
      }
    }
    .pagination {
      margin: 15px 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>