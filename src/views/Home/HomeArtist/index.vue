<template>
  <div class="homeArtist">
    <div class="artistInfo" v-for="item of artists" :key="item.id">
      <img v-lazy="item.img1v1Url" alt="" @click="goArtistDetail(item.id)" />
      <span class="name">{{ item.name }}</span>
      <span class="album">专辑{{ item.albumSize }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HomeArtist",
  computed: {
    ...mapState("home", ["artists"]),
  },
  methods:{
    goArtistDetail(id){
      this.$router.push({
        name:'Artistdetail',
        params:{
          id
        }
      })
    }
  },
  created() {
    this.$store.dispatch("home/getHotArtist", 6);
  },
};
</script>

<style lang="less" scoped>
.homeArtist {
  width: 1080px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .artistInfo {
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      cursor: pointer;
    }
    span {
      margin-top: 5px;
      &.name {
        font-size: 12px;
      }
      &.album {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>