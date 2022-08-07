<template>
  <div class="songs">
    <div class="dagai">
      <div>
        <h2>歌曲列表</h2>
        <span>共{{ tracks ? tracks.length : "" }}首歌</span>
      </div>
    </div>
    <el-table :data="tracks" stripe class="elTable">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="name" label="歌曲" :width="180 + width">
        <template slot-scope="{ row }">
          <span class="musicName" @click="goSongsDetail(row.id)">{{
            row.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" width="130">
        <template slot-scope="{ row }" class="nameRow">
          <span
            class="artist"
            @click="goArtistDetail(item.id)"
            v-for="item of row.ar.slice(0, 2)"
            :key="item.id"
            >{{ item.name }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" width="290">
        <template slot-scope="{ row }">
          <span class="albumName" @click="goAlbumDetail(row)">{{
            row.al.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="播放" width="50">
        <template slot-scope="scope">
          <i
            :class="
              indexid === scope.row.id
                ? 'el-icon-video-pause'
                : 'el-icon-video-play'
            "
            class="playOrPause"
            @click="play(scope.row.id)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Song",
  data() {
    return {
      indexid: 0,
    };
  },
  props: ["tracks", "width"],
  methods: {
    async play(id) {
      await this.$store.dispatch("songs/getAudio", id);
      if (this.indexid !== id) {
        this.indexid = id;
        this.$bus.$emit("play");
      } else {
        this.indexid = 0;
        this.$bus.$emit("pause");
      }
    },
    //点解列表中的歌手进入歌手详情页
    goArtistDetail(id) {
      console.log(id);
      this.$router.push({
        name: "Artistdetail",
        params: {
          id,
        },
      });
    },
    //点击进入专辑页。
    goAlbumDetail(row) {
      this.$router.push({
        name: "Albumdetail",
        params: {
          id: row.al.id,
        },
      });
    },
    goSongsDetail(id) {
      this.$router.push({
        name: "Songsdetail",
        params: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
.songs {
  margin-top: 20px;
  .elTable {
    width: 100%;
    border-radius: 5px;
  }
}
.dagai {
  display: flex;
  margin: 15px 0;
  justify-content: space-between;
}
.dagai div {
  display: flex;
}
.dagai div span {
  margin-left: 15px;
  line-height: 35px;
  font-size: 14px;
  color: #999;
}
.musicName,
.artist,
.albumName {
  color: #999;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: black;
  }
}
.artist {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 3px;
}
.playOrPause {
  color: #999;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: black;
  }
}
.nameRow {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
