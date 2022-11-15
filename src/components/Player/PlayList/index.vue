<template>
  <div class="playList">
    <h2>当前播放</h2>
    <div class="edit">
      <span>共{{ audio.length }}首</span>
      <div class="editItem">
        <el-button type="text" @click="clearPlaylist">清空列表</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="audio"
        style="width: 100%"
        size="small"
        :fit="true"
        :show-header="false"
        empty-text="播放列表空空如也T^T"
        :stripe="true"
        :highlight-current-row="true"
        @row-dblclick="play"
        ref="elTable"
      >
        <el-table-column >
          <template slot-scope="{ row }">
            <span :class="row.id === currentSong.id ?'active':''" @click="goSongsDetail(row.id)">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="250">
          <template slot-scope="{ row }">
            <span :class="row.id === currentSong.id ?'active':''" @click="goArtistDetail(row.artistId)">{{ row.artist }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PlayList",
  computed: {
    ...mapState("songs", ["audio", "currentSong","index"]),
  },
  methods: {
    //双击歌曲切换歌曲
    play(row) {
      this.$store.commit('songs/SETCURRENTSONG',{song:row});
      this.$bus.$emit('play');
    },
    //清空播放列表
    clearPlaylist(){
      this.$store.commit('songs/CLEARPLAYLIST');
    },
    //前往歌曲详情页
    goSongsDetail(id){
      this.$router.push({
        name:'Songsdetail',
        params:{
          id
        }
      })
      this.$emit('closeDrawer');
    },
    //前往歌手详情页
    goArtistDetail(id){
      this.$router.push({
        name:'Artistdetail',
        params:{
          id
        }
      })
      this.$emit('closeDrawer');
    },
    //页面关闭保存播放列表到locallstore
    saveAudioInfoToLocallstore(){
      localStorage.setItem('audios',JSON.stringify(this.audio))
      localStorage.setItem('currentSong',JSON.stringify(this.currentSong))
      localStorage.setItem('index',JSON.stringify(this.index))
    }
  },
  watch: {
    currentSong() {
      console.log(this.$refs.elTable.bodyWrapper.clientTop);
    },
  },
  mounted() {
    window.addEventListener('beforeunload',this.saveAudioInfoToLocallstore)
  },
  beforeDestroy(){
    window.removeEventListener('beforeunload',this.saveAudioInfoToLocallstore)
  }
};
</script>

<style lang='less' scoped>
.playList {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  .edit {
    display: flex;
    margin-left: 5px;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 12px;
      color: #999;
    }
    .editItem {
      margin-right: 5px;
    }
  }
  h2 {
    margin-left: 5px;
  }
  .table {
    width: 100%;
    .el-table {
      span {
        font-size: 14px;
        color: #999;
        cursor: pointer;
        &:hover {
          color: #555;
        }
      }
      .active{
          color: skyblue;
        }
    }
  }
}
</style>