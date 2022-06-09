<template>
  <div class="artistList">
    <div
      class="artistInfo"
      v-for="item of artistList"
      :key="item.id"
    >
      <el-popover
        placement="top-start"
        title="描述"
        width="200"
        trigger="hover"
      >
      <div>
        <span v-if="item.alias">英文名：{{item.alias[0]}}</span>
        <br>
        <span>作品：{{item.musicSize}}</span>
        <br>
        <span>粉丝：{{$utils.formartNum(item.fansCount)}}</span>
      </div>
        <img v-lazy="item.img1v1Url" alt="" slot="reference" @click="goArtistDetail(item.id)" />
      </el-popover>
      <span class="artistName">{{ item.name }}</span>
      <span class="artistAlbum">专辑:{{ item.albumSize }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistList",
  props: ["artistList"],
  methods: {
    goArtistDetail(id) {
      this.$router.push({
        name:'Artistdetail',
        params:{
          id
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.artistList {
  width: 1080px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  .artistInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 216px;
    height: 233px;
    img {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      cursor: pointer;
    }
    span {
      font-size: 12px;
      &.artistName {
        font-weight: bold;
        font-size: 13px;
      }
      &.artistAlbum {
        color: #999;
      }
    }
  }
}
</style>