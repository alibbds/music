<template>
  <div class="album">
    <div class="category">
      <span
        @click="checkArea(key)"
        v-for="(value, key, index) in area"
        :key="index"
        :class="clickArea === key ? 'now' : ''"
        >{{ value }}</span
      >
    </div>
    <AlbumList :albums="albums"></AlbumList>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="12"
        layout="prev, pager, next, jumper"
        :total="total"
        :current-page.sync="currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import AlbumList from "@/components/AlbumList";
import { mapState } from "vuex";
export default {
  name: "Album",
  components: { AlbumList },
  data() {
    return {
      area: { ALL: "全部", ZH: "华语", EA: "欧美", KR: "韩国", JP: "日本" },
      clickArea: "ALL",
      currentPage: 1,
    };
  },
  computed: {
    ...mapState("album", ["albums","total"]),
  },
  methods: {
    checkArea(area) {
      if (area === this.clickArea) {
        return;
      } else {
        this.currentPage = 1;
        this.$store.dispatch("album/getAllAlbum", {
          area,
          limit: 12,
          offset: (this.currentPage-1)*12,
        });
        this.clickArea = area;
      }
    },
    handleCurrentChange(currentPage){
      this.$store.dispatch("album/getAllAlbum", {
          area:this.clickArea,
          limit: 12,
          offset: (currentPage-1)*12,
        });
        this.currentPage = currentPage
    }
  },
  created() {
    this.$store.dispatch("album/getAllAlbum", {
      area: this.clickArea,
      limit: 12,
      offset: (this.currentPage-1)*12,
    });
  },
};
</script>

<style lang="less" scoped>
.album {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1080px;
  .category {
    width: 1080px;
    display: flex;
    justify-content: space-around;
    span {
      display: block;
      cursor: pointer;
    }
  }
  .now {
    border-bottom: 3px solid orange;
  }
  .pagination{
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>