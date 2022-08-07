<template>
  <div class="AlbumDetail">
    <div class="playList">
      <div class="describe">
        <img :src="album.picUrl" alt="" />
        <div class="describeInfo">
          <h2>{{ album.name }}</h2>
          <div class="creator">
            <span v-if="album.artist">{{ album.artist.name }}</span>
            <span v-if="album.publishTime">{{
              $utils.formartDate(album.publishTime, "yyyy-MM-dd")
            }}</span>
          </div>
          <span class="company">发行公司：{{ album.company }}</span>
          <div class="tags">
            <span>#{{ album.type }}</span>
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
                <p>{{ album.description }}</p>
              </div>
              <p slot="reference">{{ album.description }}</p>
            </el-popover>
          </div>
        </div>
      </div>
      <Songs :tracks="songs" :width="0"></Songs>
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
    </div>
    <div class="SimilarSongList">
      <h4>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-music"></use>
        </svg>
        该作者其他专辑
      </h4>
      <div class="albumSide" v-if="hotAlbums !== []">
        <div
          class="SongList"
          v-for="item of hotAlbums"
          :key="item.id"
          @click="goAlbumDetails(item.id)"
        >
          <img :src="item.picUrl" alt="" />
          <div class="list">
            <span class="listName">{{ item.name }}</span>
            <span class="listCreator" v-if="item.artist"
              >By.{{ item.artist.name }}</span
            >
          </div>
        </div>
      </div>
      <div class="albumSide" v-if="hotAlbums === []">该作者无其他专辑</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Songs from "@/components/Songs";
import CommentList from "@/components/CommentList";
export default {
  name: "AlbumDetail",
  components: { Songs, CommentList },
  data() {
    return {
      offset: 0,
    };
  },
  computed: {
    ...mapState("albumDetail", [
      "songs",
      "album",
      "comment",
      "commentTotal",
      "hotAlbums",
    ]),
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.$store.dispatch("albumDetail/getAlbumComment", {
        id: this.$route.params.id,
        limit: 20,
        offset: (currentPage - 1) * 20,
      });
      this.$nextTick(() => {
        console.log(this.$refs.CommentList);
        window.scrollTo({
          top: this.$refs.CommentList.$el.offsetTop - 60,
        });
      });
    },
    goAlbumDetails(id) {
      this.$router.push({
        params: {
          id,
        },
        name: "Albumdetail",
      });
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        console.log(whenKeepAliveStopWatch);
        this.$store.dispatch("albumDetail/getAlbumDetail", newValue.params.id);
        this.$store.dispatch("albumDetail/getAlbumComment", {
          id: newValue.params.id,
          limit: 20,
          offset: this.offset,
        });
      },
      immediate: true,
      deep: true,
    },
    album(newValue) {
      this.$store.dispatch("albumDetail/getArtistAlbum", {
        id: newValue.artist.id,
      });
    },
  },
  activated() {
    this.activatedFlag = true;
  },
};
</script>

<style lang="less" scoped>
.AlbumDetail {
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
        .company {
          font-size: 14px;
          color: #999;
          margin-top: 10px;
        }
        .creator {
          margin-top: 20px;
          display: flex;
          align-items: center;
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
    .pagination {
      width: 100%;
      height: 180px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .SimilarSongList {
    h4 {
      .icon {
        font-size: 20px;
      }
    }
    width: 300px;
    .albumSide {
      display: flex;
      flex-direction: column;
      justify-content: center;
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
  }
}
</style>
