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
          <div class="play_icon">
            <i class="el-icon-video-play"></i>
          </div>
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
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 5px;
  position: relative;
}
.imgs img {
  width: 100%;
  height: 100%;
  border-radius: 5px 5px;
  transition: all 0.5s ease-in-out;
}
/* mv hover 图片变大 */
/* .imgs img:hover {
  transform: scale(1.2);
} */
.imgs .play_icon{
  position: absolute;
  border-radius: 5px 5px;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}
.imgs .play_icon i{
  font-size: 35px;
}
.imgs:hover .play_icon{
  display: flex;
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