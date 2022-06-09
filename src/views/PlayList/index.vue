<template>
  <div class="album">
    <div class="category">
      <div class="crad" v-for="(item, index) of 5" :key="index">
        <span>{{ categories[index] }}</span>
        <div class="craditem">
          <div v-for="(ele, index1) of type[index]" :key="index1"><span @click="checkCategory(ele.name)" :class="ele.name === clickName?'active':''">{{ele.name}}</span></div>
        </div>
      </div>
    </div>
    <h2>{{clickName}}</h2>
    <SongsList :taplaylists="playlists"></SongsList>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SongsList from '@/components/SongsList'
export default {
  name: "PlayList",
  components:{SongsList},
  data() {
    return {
      clickName: '',
    };
  },
  computed: {
    ...mapState("playList", ["all", "categories","playlists","cat"]),
    ...mapGetters("playList", ["type0", "type1", "type2", "type3", "type4"]),
    type() {
      return [this.type0, this.type1, this.type2, this.type3, this.type4];
    },
  },
  methods: {
    checkCategory(categoryName) {
      this.clickName = categoryName
      this.$store.dispatch('playList/getAlbum',{cat:categoryName,limit:50})
    },
  },
  watch:{
    cat:{
      handler(newVal){
        this.clickName = newVal
      }
    }
  },
  created() {
    this.$store.dispatch("playList/getAlbumCategory");
    this.$store.dispatch('playList/getAlbum',{limit:50})
  },
};
</script>

<style lang="less" scoped>
.album {
  width: 1080px;
  display: flex;
  flex-direction: column;
  .category {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    .crad {
      width: 216px;
      display: flex;
      flex-direction: column;
      .craditem{
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        div{
          width: 33%;
          font-size: 14px;
          color: #999;
          margin-top: 5px;
          span{
            cursor: pointer;
            &:hover{
              color: black;
            }
          }
          .active{
            color: orange;
          }
        }
      }
    }
  }
}
</style>>
