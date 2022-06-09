<template>
  <div class="mv">
    <div class="category">
      <div>
        <h3>区域</h3>
        <span
          :class="item === clickArea ? 'active' : ''"
          v-for="(item, index) of area"
          :key="index"
          @click="checkArea(item)"
          >{{ item }}</span
        >
      </div>
      <div>
        <h3>类型</h3>
        <span
          :class="item === clickType ? 'active' : ''"
          v-for="(item, index) of type"
          :key="index"
          @click="checkType(item)"
          >{{ item }}</span
        >
      </div>
      <div>
        <h2>全部MV</h2>
        <span
          :class="item === clickOrder ? 'active' : ''"
          v-for="(item, index) of order"
          :key="index"
          @click="checkOrder(item)"
          >{{ item }}</span
        >
      </div>
    </div>
    <MvList :newMvInfo="data"></MvList>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="30"
        layout="prev, pager, next, jumper"
        :total="count"
        :current-page.sync="currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MvList from "@/components/MvList";
export default {
  name: "Mv",
  data() {
    return {
      type: ["全部", "官方版", "原生", "现场版", "网易出品"],
      area: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      order: ["上升最快", "最热", "最新"],
      clickType: "全部",
      clickArea: "全部",
      clickOrder: "上升最快",
      currentPage: 1,
    };
  },
  components: { MvList },
  computed: {
    ...mapState("mv", ["data", "count"]),
  },
  methods: {
    checkArea(area) {
      this.$store.dispatch("mv/getMv", {
        type: this.clickType,
        area: area,
        order: this.clickOrder,
        offset: 0,
      });
      this.clickArea = area;
      this.currentPage = 1;
    },
    checkType(type) {
      this.$store.dispatch("mv/getMv", {
        type: type,
        area: this.clickArea,
        order: this.clickOrder,
        offset: 0,
      });
      this.clickType = type;
      this.currentPage = 1;
    },
    checkOrder(order) {
      this.$store.dispatch("mv/getMv", {
        type: this.clickType,
        area: this.clickArea,
        order: order,
        offset: 0,
      });
      this.clickOrder = order;
      this.currentPage = 1;
    },
    handleCurrentChange(currentPage) {
      this.$store.dispatch("mv/getMv", {
        type: this.clickType,
        area: this.clickArea,
        order: this.clickOrder,
        offset: (currentPage - 1) * 30,
      });
    },
  },
  created() {
    this.$store.dispatch("mv/getMv", {
      type: "全部",
      area: "全部",
      order: "上升最快",
      offset: 0,
    });
  },
};
</script>

<style lang="less" scoped>
.mv {
  width: 1080px;
  .category {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      align-items: center;
      margin-top: 20px;
      span {
        display: block;
        margin-left: 20px;
        padding-left: 10px;
        padding-right: 10px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 2px 2px;
        &:hover {
          background-color: orange;
          cursor: pointer;
        }
        &.active {
          background-color: orange;
        }
      }
    }
  }
  .pagination {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>