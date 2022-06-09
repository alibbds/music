<template>
  <div class="category">
    <ul class="imgList">
      <li v-for="(item,index) of taplaylists" :key="item.id" :class="(index+1)%5===1?'':'leftSize'">
        <div class="useCount">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yinle1"></use>
            </svg>
            {{$utils.formartNum(item.playCount) }}
          </span>
        </div>
        <img
          v-lazy="item.coverImgUrl"
          @click="goPlayListDetail(item.id)"
          alt=""
        />
        <p class="categoryName">{{ item.name }}</p>
        <p>
          <span
            class="categoryTag"
            v-for="(tag, index) of item.tags"
            :key="index"
            >#{{ tag }}</span
          >
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
//歌单组件(复用在首页和歌单页面)
export default {
  name: "SongsList",
  props: ["taplaylists"],
  methods: {
    goPlayListDetail(id) {
      this.$router.push({
        name: "Playlistdetail",
        params: {
          id: id,
        },
      });
    },
  },
};
</script>

<style scoped>
.category {
  width: 100%;
}
.imgList {
  display: flex;
  flex-wrap: wrap;
}
.categoryName {
  font-size: 12px;
}
.categoryTag {
  font-size: 12px;
  color: rgb(212, 144, 17);
}
.useCount {
  height: 20px;
  position: relative;
  top: 20px;
}
.useCount span {
  color: bisque;
  float: right;
  margin-right: 5px;
  margin-top: 5px;
  font-size: 12px;
}
.category .imgList li img {
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
}
.category .imgList li {
  width: 186px;
  height: 265px;
}
.leftSize{
  margin-left: 37.5px;
}
</style>