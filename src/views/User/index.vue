<template>
  <div class="User">
    <div class="playlist">
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">创建的歌单</template>
          <el-menu-item
            index="2-1"
            v-for="item of playlistCreateByUser"
            :key="item.id"
            @click="checkPlaylist(item.id)"
          >
            <div class="playlistitem">
              <img :src="item.coverImgUrl" alt="" />
              <span class="playlistName">{{ item.name }}</span>
            </div>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">收藏的歌单</template>
          <el-menu-item
            index="2-1"
            v-for="item of playlistCreateByOthers"
            :key="item.id"
            @click="checkPlaylist(item.id)"
          >
            <div class="playlistitem">
              <img :src="item.coverImgUrl" alt="" />
              <span class="playlistName">{{ item.name }}</span>
            </div>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="playlistInfo">
      <div class="maindetail">
        <div class="imgInfo">
          <img :src="playlistDetail.coverImgUrl" alt="" />
        </div>
        <div class="detailInfo">
          <div class="detailname">
            <h2>{{ playlistDetail.name }}</h2>
            <span v-if="playlistDetail.updateTime"
              >({{
                $utils.formartDate(playlistDetail.updateTime, "MM月dd日")
              }}更新)</span
            >
          </div>
          <div class="playdetail">
            <span class="rank-playCount"
              ><i class="el-icon-headset"></i>
              {{ $utils.formartNum(playlistDetail.playCount) }}次</span
            >
            <span class="rank-collect"
              ><i class="el-icon-circle-plus"></i>
              {{ $utils.formartNum(playlistDetail.subscribedCount) }}</span
            >
            <span class="rank-comment"
              ><i class="el-icon-chat-round"></i>
              {{ $utils.formartNum(playlistDetail.commentCount) }}</span
            >
          </div>
          <div class="detailDesc">{{ playlistDetail.description }}</div>
        </div>
      </div>
      <Songs :tracks='playlistDetail.tracks'></Songs>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapState } from "vuex";
import Songs from '@/components/Songs'
export default {
  name: "User",
  components:{Songs},
  data() {
    return {
      clickId: null,
    };
  },
  computed: {
    ...mapGetters("user", [
      "playlistCreateByUser",
      "playlistCreateByOthers"
    ]),
    ...mapState('user',["playlistDetail"])
  },
  methods: {
    checkPlaylist(id) {
      this.$router.push({
        path: "/user",
        query: {
          id: id,
        },
      });
    },
  },
  watch: {
    playlistCreateByUser(newValue, oldValue) {
      this.clickId = newValue[0].id;
      this.$router.push({
        path: "/user",
        query: {
          id: this.clickId,
        },
      });
    },
    $route(newValue) {
      this.$store.dispatch("user/getUserPlayListDetail", newValue.query.id);
    },
  },
  created() {
    this.$store.dispatch("user/getUserPlayList");
  },
};
</script>

<style lang="less" scoped>
.User {
  width: 1080px;
  display: flex;
  justify-content: space-between;
  .playlist {
    width: 300px;
    .playlistitem {
      overflow: hidden;
      img {
        width: 30px;
        height: 30px;
        border-radius: 2px 2px;
      }
      span {
        margin-left: 15px;
        font-size: 12px;
        color: #999;
        font-weight: bold;
      }
    }
  }
  .playlistInfo {
    width: 700px;
    .maindetail {
      display: flex;
      .imgInfo {
        border: 1px solid #999;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 160px;
        height: 160px;
        border-radius: 2px 2px;
        flex-shrink: 0;
        img {
          width: 150px;
          height: 150px;
        }
      }
      .detailInfo {
        margin-left: 20px;
        .detailname {
          display: flex;
          span {
            color: #999;
            font-size: 14px;
            line-height: 40px;
            margin-left: 10px;
          }
        }
        .playdetail {
          margin-top: 15px;
          .rank-playCount {
            color: #999;
            font-size: 14px;
          }
          .rank-collect {
            margin-left: 5px;
            color: #999;
            font-size: 14px;
          }
          .rank-comment {
            margin-left: 5px;
            color: #999;
            font-size: 14px;
          }
        }
        .detailDesc {
          color: #999;
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>