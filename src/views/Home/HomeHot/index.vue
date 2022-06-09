<template>
  <div class="hot">
    <h2>热门歌单</h2>
    <div class="category">
      <ul class="categoryList">
        <li :class="active === '' ? 'active' : ''" @click="changeList('')">
          <span>为您推荐</span>
        </li>
        <li
          :class="active === item.name ? 'active' : ''"
          v-for="item of tags"
          :key="item.id"
          @click="changeList(item.name)"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <SongsList :taplaylists='taplaylists'></SongsList>
  </div>
</template>

<script>
import SongsList from '@/components/SongsList'
import { mapState } from "vuex";
export default {
  name: "Hot",
  components:{SongsList},
  data() {
    return {
      active: "",
    };
  },
  methods: {
    changeList(name) {
      if (this.active !== name) {
        this.$store.dispatch("home/getHotList", { limit: "5", cat: name });
      }
      this.active = name;
    },
  },
  computed: {
    ...mapState({ tags: (state) => state.home.tags.slice(0, 5) }),
    ...mapState({ taplaylists: (state) => state.home.playlists }),
  },
  mounted() {
    this.$store.dispatch("home/getHotCategory");
    this.$store.dispatch("home/getHotList", { limit: "5" });
  },
};
</script>

<style scoped>
.hot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
}

.categoryList {
  display: flex;
  justify-content: center;
}
.category .categoryList li {
  display: block;
  margin: 15px;
}
.active {
  border-bottom: 2.5px solid orange;
  border-bottom-left-radius: 1.25px;
  border-bottom-right-radius: 1.25px;
}
.category .categoryList li span:hover{
  cursor: pointer;
}
</style>