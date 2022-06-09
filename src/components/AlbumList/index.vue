<template>
  <div class="AlbumList" v-if="albums !== []">
    <ul class="AlbumListChild">
      <li v-for="item of albums" :key="item.id" @click="goAlbum(item.id)">
        <img v-lazy="item.blurPicUrl" alt="" />
        <div class="desicribe">
          <p class="albumName" v-if="item">{{ item.name }}</p>
          <p class="artisterName" v-if="item.artist">{{ item.artist.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AlbumList",
  props: ["albums"],
  methods: {
    goAlbum(id) {
      this.$router.push({
        name:'Albumdetail',
        params:{
          id
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.AlbumList{
  width: 1080px;
  margin-top: 50px;
  .AlbumListChild{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      width: 320px;
      height: 100px;
      display: flex;
      align-items: center;
      margin-top: 15px;
      overflow: hidden;
      border-radius: 5px 5px;
      background-color: #f0f0f0;
      &:hover{
        cursor: pointer;
      }
      img{
        width: 100px;
        height: 100px;
        border-radius: 2px 2px;
      }
      .desicribe{
        width: 100%;
        margin-left: 15px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .albumName{
          font-size: 14px;
          color: #333;
        }
        .artisterName{
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>