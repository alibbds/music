<template>
  <div class="app">
    <Header></Header>
    <keep-alive>
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive" class="main"></router-view>
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive" class="main"></router-view>
    <Login v-if="dialogVisible"></Login>
    <Player></Player>
    <el-backtop></el-backtop>
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Home from "./views/Home";
import Login from "./components/Login";
import Player from "./components/Player";
import Footer from "./components/Footer";
import { mapState,mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Home,
    Player,
    Login,
    Footer,
  },
  computed: {
    ...mapState({ dialogVisible: (state) => state.user.dialogVisible }),
    ...mapState({ flag: (state) => state.songs.flag }),
    ...mapGetters('songs',['isShowPlayer'])
  },
  mounted() {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

img {
  vertical-align: top;
  border: none;
}
.app {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
a {
  text-decoration: none;
}
.main{
  margin-top:110px;
}
::-webkit-scrollbar {
  width: 7px;
  height: 20px;
}
::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #888;
}
::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>
