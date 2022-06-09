<template>
  <div class="Mv">
    <ul class="container">
      <li
        :class="(index + 1) % 5 !== 1 ? 'onelist' : ''"
        v-for="(item, index) of newMvInfo"
        :key="item.id"
      >
        <div class="imgs" @click="goMvDetail(item.id)">
          <img v-lazy="item.cover?item.cover:item.imgurl" alt="" />
        </div>
        <span class="Name">{{ item.name }}</span>
        <span class="artistName">{{ item.artistName }}</span>
        <div class="playCount">
          <span>{{ $utils.formartNum(item.playCount) }}</span>
          <i class="el-icon-video-camera"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["newMvInfo"],
  methods: {
    goMvDetail(id) {
      this.$router.push({
        name:'Mvdetail',
        params:{
          id
        }
      })
    },
  },
};
</script>

<style scoped>
.Mv {
  width: 1080px;
  margin-top: 20px;
}
.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.container li {
  width: 192px;
  height: 210px;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}
.onelist {
  margin-left: 30px;
}
.container li .imgs {
  width: 192px;
  height: 144px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 5px;
}
.imgs img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}
.imgs img:hover {
  width: 120%;
  height: 120%;
}
.Name {
  font-size: 12px;
  font-weight: bold;
}
.container li span {
  margin-top: 5px;
  font-weight: 500;
}
.artistName {
  font-size: 12px;
  color: #999;
}
.playCount span,
i {
  font-size: 12px;
  color: #999;
}
</style>