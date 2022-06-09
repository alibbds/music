<template>
  <div class="Search">
    <header ref="header"></header>
    <main class="main">
      <div class="category">
        <span
          :class="clickType === parseInt(key) ? 'active' : ''"
          v-for="(item, key, index) of type"
          :key="index"
          @click="getInfo(parseInt(key))"
          >{{ item }}</span
        >
      </div>
      <div class="mainItem">
        <Songs
          :tracks="item"
          :width="380"
          v-if="itemType === 1 && item.length !== 0 && clickType === 1"
        ></Songs>
        <AlbumList
          :albums="item"
          v-if="itemType === 10 && item.length !== 0 && clickType === 10"
        ></AlbumList>
        <ArtistList
          :artistList="item"
          v-if="itemType === 100 && item.length !== 0 && clickType === 100"
        ></ArtistList>
        <SongsList
          :taplaylists="item"
          v-if="itemType === 1000 && item.length !== 0 && clickType === 1000"
        ></SongsList>
        <MvList
          :newMvInfo="item"
          v-if="itemType === 1004 && item.length !== 0 && clickType === 1004"
        ></MvList>
        <div class="pagination" v-if="item.length !== 0">
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="30"
            layout="prev, pager, next, jumper"
            :total="total"
            :current-page.sync="pageNo"
          >
          </el-pagination>
        </div>
        <div class="loading" v-show="item.length === 0">暂无数据</div>
      </div>
    </main>
  </div>
</template>

<script>
import rings from "vanta/src/vanta.rings";
import AlbumList from "@/components/AlbumList";
import ArtistList from "@/components/ArtistList";
import MvList from "@/components/MvList";
import SongsList from "@/components/SongsList";
import Songs from "@/components/Songs";
import { mapState } from "vuex";
export default {
  name: "Search",
  components: { AlbumList, ArtistList, MvList, SongsList, Songs },
  data() {
    return {
      keywords: "",
      pageNo: 1,
      clickType: 1,
      type: {
        1: "单曲",
        10: "专辑",
        100: "歌手",
        1000: "歌单",
        1004: "MV",
      },
      //vanta的option配置
    };
  },
  computed: {
    ...mapState("search", ["item", "total", "itemType"]),
  },
  methods: {
    getInfo(type) {
      if (this.clickType === type) return;
      this.$store.dispatch("search/getSearchDetail", {
        keywords: this.$route.params.keywords,
        limit: 30,
        offset: 0,
        type: type,
      });
      this.clickType = parseInt(type);
      this.pageNo = 1;
    },
    handleCurrentChange(pageNo) {
      this.$store.dispatch("search/getSearchDetail", {
        keywords: this.$route.params.keywords,
        limit: 30,
        offset: (pageNo - 1) * 30,
        type: this.clickType,
      });
    },
    search() {
      if (this.keywords === "") {
        this.$message.info("搜索内容不能为空");
        return;
      }
      this.$router.push({
        name: "Search",
        params: {
          keywords: this.keywords,
        },
      });
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        this.$store.dispatch("search/getSearchDetail", {
          keywords: newValue.params.keywords,
          limit: 30,
          offset: 0,
          type: 1,
        });
        this.clickType = 1;
        this.keywords = newValue.params.keywords;
      },
      immediate: true,
    },
  },
  mounted() {
    rings({
      el: this.$refs.header,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 400.0,
      minWidth: 400.0,
      scale: 1.0,
      scaleMobile: 1.0,
    });
  },
};
</script>

<style lang="less" scoped>
.Search {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  header {
    width: 100%;
    height: 500px;
  }
  .main {
    width: 1080px;
    margin-top: 50px;
    .category {
      width: 100%;
      display: flex;
      justify-content: space-between;
      span {
        display: block;
        cursor: pointer;
        &.active {
          border-bottom: 2px solid orange;
        }
      }
    }
    .mainItem {
      width: 100%;
      .loading {
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .pagination {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>