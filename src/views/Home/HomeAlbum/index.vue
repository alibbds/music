<template>
  <div class="homeAlbum">
    <h2>最新专辑</h2>
    <AlbumList :albums='albums'></AlbumList>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AlbumList from "@/components/AlbumList";
export default {
  name: "HomeAlbum",
  components: { AlbumList },
  computed: {
    ...mapState({albums: (state) => state.home.albums}),
  },
  created() {
    this.$store.dispatch("home/getHomeAlbum");
  },
};
</script>

<style scoped>
.homeAlbum {
  width: 1080px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 15px;
}
</style>