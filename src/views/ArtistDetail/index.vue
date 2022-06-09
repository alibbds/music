<template>
  <div class="ArtistDetail">
    <div class="description">
      <img :src="artist.cover" alt="" />
      <div class="desc">
        <h1>{{ artist.name }}</h1>
        <el-popover
          placement="top-start"
          title="描述"
          width="600"
          trigger="hover"
        >
          <div class="showDesc">
            <p>{{ briefDesc }}</p>
          </div>
          <p slot="reference">{{ briefDesc }}</p>
        </el-popover>
        <span class="more" @click="showMore" v-if="introduction.length !== 0">更多>></span>
        <el-dialog :visible.sync="dialogTableVisible">
          <div class="moreDesc" v-for="(item,index) of introduction" :key="index">
            <div class="descValue">
              <h3 class="valueName">{{item.ti}}</h3>
              <p class="valueText">{{item.txt}}</p>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
    <div class="artList">
      <div class="category">
        <h3>{{ clickType }}</h3>
        <span
          v-for="(item, index) of type"
          :key="index"
          @click="checkType(item)"
          >{{ item }}</span
        >
      </div>
      <div class="singerList">
        <Songs
          v-show="clickType === '热门作品'"
          :tracks="hotSongs"
          :width="380"
        />
        <AlbumList
          :albums="hotAlbums"
          v-show="clickType === '所有专辑'"
        ></AlbumList>
        <div class="pagination" v-show="clickType === '所有专辑'">
          <el-pagination
            @current-change="albumPagination"
            :page-size="12"
            layout="prev, pager, next, jumper"
            :total="artist.albumSize"
          >
          </el-pagination>
        </div>
        <MvList :newMvInfo="mvs" v-show="clickType === '相关MV'"></MvList>
      </div>
    </div>
  </div>
</template>

<script>
import Songs from "@/components/Songs";
import AlbumList from "@/components/AlbumList";
import MvList from "@/components/MvList";
import { mapState } from "vuex";
export default {
  name: "ArtistDetail",
  components: { Songs, AlbumList, MvList },
  data() {
    return {
      type: ["热门作品", "所有专辑", "相关MV"],
      clickType: "热门作品",
      albumOffset: 0,
      //点击更多弹出dialog
      dialogTableVisible: false,
    };
  },
  computed: {
    ...mapState("artistDetail", [
      "briefDesc",
      "introduction",
      "artist",
      "hotSongs",
      "hotAlbums",
      "mvs",
    ]),
  },
  methods: {
    checkType(type) {
      if (this.clickType === type) return;
      this.clickType = type;
    },
    albumPagination(page) {
      this.$store.dispatch("artistDetail/getArtistAlbum", {
        id: this.$route.params.id,
        limit: 12,
        offset: (page - 1) * 12,
      });
      this.albumOffset = page - 1;
    },
    //点击更多展示歌手更多描述
    showMore() {
      this.dialogTableVisible = true;
    },
  },
  created() {
    this.$store.dispatch("artistDetail/getArtistDesc", this.$route.params.id);
    this.$store.dispatch("artistDetail/getArtistDetail", this.$route.params.id);
    this.$store.dispatch("artistDetail/getArtistSongs", this.$route.params.id);
    this.$store.dispatch("artistDetail/getArtistMv", this.$route.params.id);
    this.$store.dispatch("artistDetail/getArtistAlbum", {
      id: this.$route.params.id,
      limit: 12,
      offset: this.albumOffset,
    });
  },
};
</script>

<style lang="less" scoped>
.ArtistDetail {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .description {
    width: 100%;
    display: flex;
    background-color: #f0f0f0;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    img {
      width: 383px;
      height: 311px;
      border-radius: 5px 5px 5px 5px;
    }
    .desc {
      width: 700px;
      height: 311px;
      margin-left: 30px;
      p {
        font-size: 14px;
        color: #999;
        margin-top: 20px;
        line-height: 25px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
      }
      .more {
        color: orange;
        cursor: pointer;
        float: right;
        margin-top: 50px;
      }
      .moreDesc {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        .descValue {
          display: flex;
          flex-direction: column;
          p{
            text-indent: 2em
          }
        }
      }
    }
  }
  .artList {
    width: 1080px;
    margin-top: 50px;
    .category {
      display: flex;
      align-items: center;
      span {
        margin-left: 20px;
        &:hover {
          color: orange;
          cursor: pointer;
        }
      }
    }
    .singerList {
      .pagination {
        width: 100%;
        height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>