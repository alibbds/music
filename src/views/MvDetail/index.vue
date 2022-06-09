<template>
  <div class="mvDetail">
    <div class="videoSide">
      <video :src="mvUrl" controls></video>
      <div class="mvInfo">
        <div class="info">
          <span class="mvName">{{ detail.name }}</span>
          <span class="artistName">{{ detail.artistName }}</span>
          <span class="right" id="publishTime"
            >发布时间：{{ detail.publishTime }}</span
          >
          <span class="right" id="playCount"
            >播放量：{{ $utils.formartNum(detail.playCount) }}</span
          >
        </div>
        <h5 v-text="detail.desc ? '简介' : '暂无简介'"></h5>
        <p v-if="detail.desc !== ''">{{ detail.desc }}</p>
      </div>
    </div>
    <div class="otherSide">
      <div class="Comments">
        <CommentList :comment="comment" :commentTotal="commentTotal" />
        <!-- 分页器 -->
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
      <div class="similarMvSide">
        <h4>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-MV"></use>
          </svg>
          相似MV
        </h4>
        <div class="similarMvItem" v-for="item of mvs" :key="item.id">
          <div class="imgs" @click="goMvDetail(item.id)">
            <img v-lazy="item.cover" alt="" />
          </div>
          <span class="child1">{{ item.name }}</span>
          <span class="child2">{{ item.artistName }}</span>
          <div class="playCount">
            <span>{{ $utils.formartNum(item.playCount) }}</span>
            <i class="el-icon-video-camera"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import CommentList from "@/components/CommentList";
import { mapState, mapGetters } from "vuex";
export default {
  name: "MvDetail",
  components: { CommentList },
  computed: {
    ...mapState("mvDetail", [
      "comment",
      "mvUrl",
      "detail",
      "commentTotal",
      "mvs",
    ]),
  },
  methods: {
    getComments({ limit, offset, id }) {
      this.$store.dispatch("mvDetail/getMvComment", { limit, offset, id });
    },
    handleCurrentChange(currentPage) {
      this.getComments({
        limit: 20,
        offset: (currentPage - 1) * 20,
        id: this.$route.params.id,
      });
    },
    goMvDetail(id) {
      this.$router.push({
        name: "Mvdetail",
        params: {
          id,
        },
      });
    },
  },
  watch: {
    $route(newValue) {
      this.$store.dispatch("mvDetail/getMvLink", newValue.params.id);
      this.$store.dispatch("mvDetail/getMvDetail", newValue.params.id);
      this.$store.dispatch("mvDetail/getSimilarMv", newValue.params.id);
      this.getComments({ limit: 20, offset: 0, id: newValue.params.id });
    },
  },
  created() {
    this.$store.dispatch("mvDetail/getMvLink", this.$route.params.id);
    this.$store.dispatch("mvDetail/getMvDetail", this.$route.params.id);
    this.$store.dispatch("mvDetail/getSimilarMv", this.$route.params.id);
    this.getComments({ limit: 20, offset: 0, id: this.$route.params.id });
  },
};
</script>

<style lang="less" scoped>
.mvDetail {
  width: 1080px;
  display: flex;
  flex-direction: column;
  .videoSide {
    width: 100%;
    display: flex;
    flex-direction: column;
    video {
      width: 100%;
    }
    .mvInfo {
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      .info {
        .mvName {
          font-size: 20px;
          font-weight: bold;
        }
        .artistName {
          margin-left: 10px;
          font-size: 14px;
          color: #999;
        }
        .right {
          float: right;
          font-size: 14px;
          color: #999;
        }
        #playCount {
          margin-right: 10px;
        }
      }
      h5 {
        margin-top: 20px;
      }
      p {
        margin-top: 20px;
        font-size: 14px;
        color: #999;
      }
    }
  }
  .otherSide {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .Comments{
      display: flex;
      flex-direction: column;
    }
  }
  .similarMvSide {
    width: 300px;
    display: flex;
    flex-direction: column;
    .similarMvItem {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      margin-top: 15px;
      .imgs {
        width: 280px;
        height: 157px;
        border-radius: 5px 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          transition: 0.5s ease-in-out;
          &:hover {
            width: 120%;
            height: 120%;
          }
        }
      }
      span {
        font-size: 12px;
      }
      .child1 {
        font-weight: 500;
        font-size: 14px;
        color: #333;
        margin-top: 5px;
      }
      .child2 {
        color: #999;
        margin-top: 5px;
      }
      .playCount {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
      }
    }
  }
}
</style>