<template>
  <div class="header">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      router
      background-color="white"
    >
      <img
        class="logo"
        src="./images/src=http___bkimg.cdn.bcebos.com_pic_21a4462309f790525de604490ef3d7ca7acbd5c8&refer=http___bkimg.cdn.bcebos.webp"
        alt=""
      />
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/ranklist">排行榜</el-menu-item>
      <el-menu-item index="/playlist">歌单</el-menu-item>
      <el-menu-item index="/album">专辑</el-menu-item>
      <el-menu-item index="/mv">MV</el-menu-item>
      <el-menu-item index="/artist">歌手</el-menu-item>
      <el-menu-item index="/user">我的音乐</el-menu-item>
      <el-input
        placeholder="请输入歌名、歌词、歌手或专辑"
        size="medium"
        class="el-input"
        v-model="keywords"
        suffix-icon="el-icon-search"
        @keydown.enter.native="goSearch(keywords)"
        @input="searchSuggest"
        v-popover:popover
      ></el-input>
      <el-button type="text" @click="login" v-if="!isLogin">登录</el-button>
      <el-popover
        ref="popover1"
        width="150"
        trigger="click"
        :visible-arrow="false"
        popper-class="popover"
      >
        <div slot="reference">
          <el-badge :value="level" class="item" type="info">
            <img class="avatar" :src="userInfo.avatarUrl" v-if="isLogin" />
          </el-badge>
        </div>

        <div class="userSet" slot="">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item class="myItem" @click="goUserMessage">
              <i class="el-icon-message"></i>
              <span slot="title">我的通知</span>
            </el-menu-item>
            <el-menu-item @click="logout" class="myItem">
              <i class="el-icon-switch-button"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-popover>
      <el-popover
        ref="popover"
        placement="bottom"
        title="热门搜索"
        width="250"
        trigger="click"
      >
        <ul>
          <li
            v-for="(item, index) of showSearchList"
            :key="index"
            class="hotitem"
            @click="goSearch(item.first)"
          >
            <span :class="index < 3 ? 'mosthot' : ''">{{ index + 1 }}. </span>
            <span v-if="item.first">{{ item.first }}</span>
            <span v-if="item.name">{{ item.name }}</span>
          </li>
        </ul>
      </el-popover>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import _ from "lodash";
export default {
  name: "Header",
  data() {
    return {
      keywords: "",
      defaultRoute:'/home'
    };
  },
  computed: {
    ...mapState({ isLogin: (state) => state.user.isLogin }),
    ...mapState("user", ["level"]),
    ...mapGetters("search", ["showSearchList"]),
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo")) || {};
    },
  },
  methods: {
    login() {
      this.$store.commit("user/DIALOGVISIBLE", true);
    },
    logout() {
      this.$store.dispatch("user/userLogout");
      this.$router.push("/");
    },
    goSearch(keywords) {
      this.keywords = keywords;
      if (keywords === "") {
        this.$message.info("搜索内容不能为空");
        return;
      }
      this.$router.push({
        name: "Search",
        params: {
          keywords,
        },
      });
    },
    //通过kewords匹配搜索建议
    searchSuggest: _.debounce(function () {
      if (this.keywords === "") {
        this.$store.commit("search/CLEARSEARCHSUGGEST");
        return;
      }
      this.$store.dispatch("search/getSearchSuggest", this.keywords);
    }, 300),
    //去到我的主页
    goUserMessage(){
      this.$router.push('usermessage')
    }
  },
  created() {
    //获取热门搜索
    this.$store.dispatch("search/getHotSearch");
    //获取用户等级信息
    this.$store.dispatch("user/getUserLevel");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.header {
  position: fixed;
  top: 0;
  z-index: 1;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 1060px;
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
  .el-menu {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: none;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      cursor: pointer;
    }
  }
  .logo {
    width: 65px;
  }
  .el-input {
    width: 250px;
    transition: 0.5s all;
    &:hover {
      width: 280px;
    }
  }
}
.mosthot {
  color: red;
}
.hotitem {
  cursor: pointer;
  margin-top: 5px;
}
</style>
<style>
.myItem {
  font-size: 12px;
  width: 150px;
}
.popover{
  padding: 0;
  border: none;
  overflow: hidden;
  border-radius: 5px;
}
</style>
