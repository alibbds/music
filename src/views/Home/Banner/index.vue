<template>
  <div class="banner">
    <el-carousel indicator-position="outside" height="400px">
      <el-carousel-item v-for="(item,index) in bannerList" :key="index">
        <img :src="item.imageUrl" alt="" class="bannerImg"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Banner",
  computed: {
    ...mapState({ bannerList: (state) => state.home.bannerList }),
  },
  created() {
    this.$store.dispatch("home/getBannerList");
  },
};
</script>

<style>
.banner{
  margin-top:20px ;
  
}
.bannerImg{
  border-radius: 5px 5px 5px 5px;
}
.el-carousel{
  z-index: -1;
}
</style>