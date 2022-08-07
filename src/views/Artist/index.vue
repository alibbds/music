<template>
  <div class="artist" @scroll="scrollUpdate" ref="artist">
    <div class="category">
      <div>
        <span
          :class="item === clickInitial ? 'active' : ''"
          v-for="(item, index) of initial"
          :key="index"
          @click="checkInitial(item)"
          >{{ item }}</span
        >
      </div>
      <div>
        <span
          :class="item === clickArea ? 'active' : ''"
          v-for="(item, index) of area"
          :key="index"
          @click="checkArea(item)"
          >{{ item }}</span
        >
      </div>
      <div>
        <span
          :class="item === clickType ? 'active' : ''"
          v-for="(item, index) of type"
          :key="index"
          @click="checkType(item)"
          >{{ item }}</span
        >
      </div>
    </div>
    <ArtistList :artistList="showArtists"></ArtistList>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";
import ArtistList from "@/components/ArtistList";
export default {
  name: "Artist",
  components: { ArtistList },
  data() {
    return {
      type: ["全部", "男歌手", "女歌手", "乐队"],
      typeId: [-1, 1, 2, 3],
      area: ["全部", "华语", "欧美", "日本", "韩国", "其他"],
      areaId: [-1, 7, 96, 8, 16, 0],
      offset: 0,
      initial: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "X",
        "Y",
        "Z",
        "#",
      ],
      initialId: [
        -1,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        0,
      ],
      clickInitial: "热门",
      clickType: "全部",
      clickArea: "全部",
      //配合滚动加载
      showArtists: [],
      //配合滚动加载
      offset: 0,
    };
  },
  computed: {
    ...mapState("artist", ["more", "artists"]),
    updateSymbol() {
      return this.scrollHeight - (this.scrollTop + this.clientHeight);
    },
  },
  methods: {
    //点击首字母切换
    checkInitial(initial) {
      if (this.clickInitial === initial) {
        return;
      } else {
        this.$store.dispatch("artist/getArtistList", {
          type: this.typeId[this.type.indexOf(this.clickType)],
          area: this.areaId[this.area.indexOf(this.clickArea)],
          initial: this.initialId[this.initial.indexOf(initial)],
          offset: 0,
          limit: 30,
        });
        this.clickInitial = initial;
        this.offset = 0;
        this.showArtists = [];
      }
    },
    //点击区域切换
    checkArea(area) {
      if (this.clickArea === area) {
        return;
      } else {
        this.$store.dispatch("artist/getArtistList", {
          type: this.typeId[this.type.indexOf(this.clickType)],
          area: this.areaId[this.area.indexOf(area)],
          initial: this.initialId[this.initial.indexOf(this.clickInitial)],
          offset: 0,
          limit: 30,
        });
        this.clickArea = area;
        this.offset = 0;
        this.showArtists = [];
      }
    },
    //点击分类切换
    checkType(type) {
      if (this.clickType === type) {
        return;
      } else {
        this.$store.dispatch("artist/getArtistList", {
          type: this.typeId[this.type.indexOf(type)],
          area: this.areaId[this.area.indexOf(this.clickArea)],
          initial: this.initialId[this.initial.indexOf(this.clickInitial)],
          offset: 0,
          limit: 30,
        });
        this.clickType = type;
        this.offset = 0;
        this.showArtists = [];
      }
    },
    //向下滚动加载数据，到达底部进入loading等待数据返回，数据返回之后才能推出loading
    scrollUpdate: _.throttle(
      async function () {
        let [scrollTop, scrollHeight, clientHeight] = [
          document.documentElement.scrollTop,
          document.documentElement.scrollHeight,
          document.documentElement.clientHeight,
        ];
        if (scrollHeight - (clientHeight + scrollTop) <= 0) {
          this.offset = this.offset + 30;
          await this.$store.dispatch("artist/getArtistList", {
            type: this.typeId[this.type.indexOf(this.clickType)],
            area: this.areaId[this.area.indexOf(this.clickArea)],
            initial: this.initialId[this.initial.indexOf(this.clickInitial)],
            offset: this.offset,
            limit: 30,
          });
        }
      },
      30,
      { leading: true }
    ),
  },
  watch: {
    artists(newValue) {
      this.showArtists = this.showArtists.concat(newValue);
    },
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.scrollUpdate);
    next();
  },
  created() {
    this.$store.dispatch("artist/getArtistList", {
      type: -1,
      area: -1,
      initial: -1,
      offset: 0,
      limit: 30,
    });
  },
  mounted() {
    window.addEventListener("scroll", this.scrollUpdate);
  },
};
</script>

<style lang="less" scoped>
.artist {
  width: 1080px;
  display: flex;
  flex-direction: column;
  .category {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      align-items: center;
      margin-top: 20px;
      flex-wrap: wrap;
      span {
        display: block;
        margin-left: 20px;
        margin-top: 5px;
        padding-left: 10px;
        padding-right: 10px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 2px 2px;
        &:hover {
          background-color: orange;
          cursor: pointer;
        }
        &.active {
          background-color: orange;
        }
      }
    }
  }
}
</style>
