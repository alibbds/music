<template>
  <div class="ranklist">
    <div class="side">
      <div class="rank-aside">
        <span :class="type === 'top' ? 'active1' : ''" @click="checkType('top')"
          >TOP榜</span
        >
        <span
          :class="type === 'special' ? 'active1' : ''"
          @click="checkType('special')"
          >特色榜</span
        >
        <span
          :class="type === 'other' ? 'active1' : ''"
          @click="checkType('other')"
          >其他榜</span
        >
      </div>
       <el-divider></el-divider>
      <div class="type-main">
        <div
          :class="item.id === id ? 'typemain active2' : 'typemain'"
          v-for="item of nowlist"
          :key="item.id"
          @click="checkItem(item.id)"
        >
          <img v-lazy="item.coverImgUrl" alt="" />
          <div class="iteminfo">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-updateTIme">{{ item.updateFrequency }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail">
      <div class="maindetail">
        <div class="imgInfo">
          <img :src="rankingList.coverImgUrl" alt="" />
        </div>
        <div class="detailInfo">
          <div class="detailname">
            <h2>{{rankingList.name}}</h2>
            <span v-if="rankingList.updateTime">({{$utils.formartDate(rankingList.updateTime, 'MM月dd日')}}更新)</span>
          </div>
          <div class="playdetail">
            <span class="rank-playCount"><i class="el-icon-headset"></i> {{$utils.formartNum(rankingList.playCount)}}次</span>
            <span class="rank-collect"><i class="el-icon-circle-plus"></i> {{$utils.formartNum(rankingList.subscribedCount)}}</span>
            <span class="rank-comment"><i class="el-icon-chat-round"></i> {{$utils.formartNum(rankingList.commentCount)}}</span>
          </div>
          <div class="detailDesc">{{rankingList.description}}</div>
        </div>
      </div>
      <Songs :tracks="rankingList.tracks" :width=0></Songs>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Songs from '@/components/Songs'
export default {
  name: "RankingList",
  components:{
    Songs
  },
  data() {
    return {
      type: "top",
      id: 0,
    };
  },

  computed: {
    ...mapState({
      list: (state) => state.topList.list,
      rankingList: (state) => state.topList.rankingList,
    }),
    ...mapGetters('topList',["toplist", "speciallist", "otherlist"]),
    nowlist() {
      switch (this.type) {
        case "top":
          return this.toplist;
          break;
        case "special":
          return this.speciallist;
          break;
        case "other":
          return this.otherlist;
          break;
      }
    },
  },
  methods: {
    checkType(type) {
      switch (type) {
        case "top":
          this.id = this.toplist[0].id;
          this.$store.dispatch("topList/getPlayList", this.toplist[0].id);
          break;
        case "special":
          this.id = this.speciallist[0].id;
          this.$store.dispatch("topList/getPlayList", this.speciallist[0].id);
          break;
        case "other":
          this.id = this.otherlist[0].id;
          this.$store.dispatch("topList/getPlayList", this.otherlist[0].id);
          break;
      }
      this.type = type;
    },
    checkItem(id) {
      this.id = id;
      this.$store.dispatch("topList/getPlayList", id);
    },
  },
  watch: {
    toplist:{
      handler(){
        this.id = this.toplist[0].id
      }
    }
  },
  created() {
    this.$store.dispatch("topList/getTopListDetail");
  },
};
</script>

<style scoped>
.ranklist {
  width: 1080px;
  display: flex;
  justify-content: space-between;
}
.side {
  width: 300px;
  box-shadow: 0px 3.4px 2.2px rgba(0, 0, 0, 0.02),
    0px 8.2px 5.3px rgba(0, 0, 0, 0.028), 0px 15.4px 10px rgba(0, 0, 0, 0.035),
    0px 27.5px 17.9px rgba(0, 0, 0, 0.042),
    0px 51.4px 33.4px rgba(0, 0, 0, 0.05), 0px 123px 80px rgba(0, 0, 0, 0.07);
}
.rank-aside {
  width: 300px;
  display: flex;
  justify-content: space-around;
  cursor: pointer;
}
.active1 {
  border-bottom: 2px solid orange;
  border-radius: 1px 1px;
  font-weight: bold;
}
.type-main {
  width: 300px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-top: 15px;
}
.typemain {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
}
.typemain img{
  margin-left: 15px;
}
.typemain:hover {
  background-color: #f5f5f5;
}
.typemain img {
  width: 60px;
  height: 60px;
}
.item-name {
  font-weight: bold;
  line-height: 40px;
}
.item-updateTIme {
  font-size: 12px;
  line-height: 15px;
  color: #999;
}
.iteminfo {
  margin-left: 15px;
}
.active2 {
  background-color: #efefef;
}
.detail{
  width: 700px;
}
.maindetail{
  display: flex;
}
.imgInfo{
  border: 1px solid #999;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 160px;
  height: 160px;
  border-radius: 2px 2px;
  flex-shrink:0 ;
}
.imgInfo img{
  width: 150px;
  height: 150px;
}
.detailInfo{
  margin-left: 20px;
}
.detailname{
  display: flex;
}
.detailname span{
  color: #999;
  font-size: 14px;
  line-height: 40px;
  margin-left: 10px;
}
.rank-playCount{
  color: #999;
  font-size: 14px;
}
.rank-collect{
  margin-left: 5px;
  color: #999;
  font-size: 14px;
}
.rank-comment{
  margin-left: 5px;
  color: #999;
  font-size: 14px;
}
.detailDesc{
  color: #999;
  font-size: 14px;
}
.playdetail{
  margin-top: 15px;
}
</style>