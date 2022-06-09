<template>
  <div class="plays" ref="plays">
    <div class="spaceShow"></div>
    <div class="player">
      <!-- <aplayer :audio="audio" :lrcType="1" fixed ref="aplayer" /> -->
      <audio
        :src="currentSong.url"
        ref="player"
        v-if="isShowPlayer"
        v-show="false"
      ></audio>
      <div class="play">
        <i class="el-icon-caret-left" @click="before"></i>
        <i
          :class="!isPaused ? 'el-icon-video-pause' : 'el-icon-video-play'"
          @click="playOrPause"
        ></i>
        <i class="el-icon-caret-right" @click="next"></i>
      </div>
      <div class="songInfo">
        <img :src="currentSong.cover  || require('@/assets/img/空图.webp')" alt="" />
        <div class="infoText">
          <div class="text">
            <span class="mname">{{ currentSong.name }}</span>
            <span class="artist">{{ currentSong.artist }}</span>
          </div>
          <div class="progress">
            <el-slider
              v-model="progress"
              class="full"
              @change="checkTime"
              :show-tooltip="false"
            ></el-slider>
            <div class="time">
              <span class="currentTime">{{ currentTime }}/</span>
              <span v-if="duration">{{ duration }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="edit">
        <div class="sounds">
          <div class="svg">
            <svg
              class="icon"
              aria-hidden="true"
              @click="isShowSoundsControll = !isShowSoundsControll"
            >
              <use xlink:href="#icon-shengyin"></use>
            </svg>
          </div>
          <div class="el-sl" v-show="isShowSoundsControll">
            <el-slider
              v-model="volume"
              vertical
              height="100px"
              class="soundsCheck"
              @input="checkSounds"
            >
            </el-slider>
          </div>
        </div>
        <div class="songsList">
          <i class="el-icon-s-order" @click="drawer = true"></i>
        </div>
      </div>
    </div>
    <el-drawer title="" :visible.sync="drawer" :with-header="false" :modal-append-to-body="false" :size="500">
      <PlayList @closeDrawer ="drawer = false"/>
    </el-drawer>
  </div>
</template>

<script>
import { mapState,mapGetters } from "vuex";
import PlayList from './PlayList';
export default {
  name: "Player",
  components:{ PlayList },
  data() {
    return {
      //歌曲时长
      duration: "",
      //当前播放时长
      currentTime: "",
      //进度条
      progress: 0,
      //歌曲是否暂停
      isPaused: true,
      //声音控制器的开关
      isShowSoundsControll: false,
      //声音进度条
      volume: 20,
      //播放列表的显示与隐藏
      drawer: false,
    };
  },
  computed: {
    ...mapState("songs", ["currentSong"]),
    ...mapGetters('songs',['isShowPlayer']),
  },
  methods: {
    //跳转到指定时间点（歌曲）
    checkTime(value) {
      let arr = this.duration.split(":");
      let duration = parseInt(arr[0]) * 60 + parseInt(arr[1]);
      if (this.$refs.player.ended) {
        this.$refs.player.currentTime = (value / 100) * duration;
        this.$refs.player.play();
        return;
      }
      this.$refs.player.currentTime = (value / 100) * duration;
    },
    //调整声音大小
    checkSounds(value) {
      if(JSON.stringify(this.currentSong) !== '{}'){
        this.$refs.player.volume = value / 100;
      }
    },
    //获取歌曲播放状态（当前播放时间，是否暂停）
    getCurrentTime() {
      this.isPaused = this.$refs.player.paused;
      this.currentTime = `${parseInt(
        this.$refs.player.currentTime / 60
      )}:${parseInt(this.$refs.player.currentTime % 60)}`;
    },
    //点击icon播放或暂停
    playOrPause() {
      if (this.$refs.player.paused) {
        this.$refs.player.play();
      } else {
        this.$refs.player.pause();
      }
    },
    showPlayer(){
      console.log(666);
    },
    //控制播放器的显影
    before() {},
    next() {},
  },
  mounted() {
    this.$bus.$on("play", () => {
      this.$nextTick(async () => {
        console.log(this.$refs);
        this.$refs.player.volume = this.volume / 100;
        await this.$refs.player.play();
        this.$refs.player.addEventListener("timeupdate", this.getCurrentTime);
        this.duration = `${parseInt(
          this.$refs.player.duration / 60
        )}:${parseInt(this.$refs.player.duration % 60)}`;
      });
    });
    this.$bus.$on("pause", () => {
      this.$nextTick(() => {
        this.$refs.player.pause();
      });
    });
  },
  created(){
    window.addEventListener('onmousemove',this.showPlayer);
  },
  watch: {
    currentTime(newValue) {
      let { currentTime, duration } = this;
      let arr1 = duration.split(":");
      let arr2 = currentTime.split(":");
      let num1 = parseInt(arr1[0]) * 60 + parseInt(arr1[1]);
      let num2 = parseInt(arr2[0]) * 60 + parseInt(arr2[1]);
      this.progress = (num2 / num1) * 100;
    },
  },
  beforeDestroy() {
    this.$refs.player.removeEventListener("timeupdate", this.getCurrentTime);
  },
};
</script>

<style lang="less" scoped>
.plays {
  width: 100%;
  position: fixed;
  bottom: -60px;
  transition: 0.5s all;
  z-index: 2;
  &:hover {
    bottom: 0;
  }
  .spaceShow {
    width: 100%;
    height: 45px;
  }
  .player {
    width: 100%;
    height: 60px;
    background-image: linear-gradient(
      72deg,
      #6d0dd6,
      #9528af,
      #ad3e88,
      #bc5261
    );
    display: flex;
    justify-content: center;
    align-items: center;
    .play {
      color: #f3f3f3;
      margin-right: 40px;
      min-width: 150px;
      i {
        font-size: 40px;
        &:hover {
          color: #e59866;
          cursor: pointer;
        }
      }
    }
    .songInfo {
      display: flex;
      height: 40px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .infoText {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        .text {
          color: #dbf4f5;
          span {
            &:hover {
              color: #a1b4b5;
              cursor: pointer;
            }
          }
          .mname {
            font-size: 14px;
          }
          .artist {
            margin-left: 15px;
            font-size: 12px;
          }
        }
        .progress {
          display: flex;
          align-items: center;
          .full {
            width: 500px;
            height: 10px;
          }
          .time {
            width: 80px;
            text-align: center;
            overflow: hidden;
            .currentTime {
              margin-left: 15px;
            }
            span {
              color: #999;
            }
          }
        }
      }
    }
    .edit {
      height: 100%;
      display: flex;
      .sounds {
        position: relative;
        height: 100%;
        width: 50px;
        .svg {
          width: 50px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          svg {
            &:hover {
              cursor: pointer;
            }
          }
        }
        .el-sl {
          position: absolute;
          background-color: #ffcccc;
          display: flex;
          justify-content: center;
          border-top-left-radius: 25px;
          border-top-right-radius: 25px;
          width: 50px;
          height: 130px;
          bottom: 99%;
          left: 0;
          padding: 0;
          .soundsCheck {
            margin-top: 15px;
          }
        }
      }
      .songsList {
        height: 100%;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 20px;
          color: rgb(241, 80, 80);
          cursor: pointer;
          &:hover {
            color: rgb(246, 39, 39);
            font-size: 25px;
          }
        }
      }
    }
  }
}
</style>

<style>
.el-slider__runway {
  margin: 5px 0;
  padding: 0;
}
.el-slider.is-vertical .el-slider__runway {
  margin: 0;
}
.el-slider__button {
  height: 10px;
  width: 10px;
}
.soundsCheck .el-slider__runway {
  background-color: #ccccff;
}
.soundsCheck .el-slider__bar {
  background-color: #ff99cc;
}
.soundsCheck .el-slider__button {
  background-color: #663399;
  border: none;
}
.el-drawer__body{
  
}
</style>