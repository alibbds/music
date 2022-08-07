import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
Vue.use(VueRouter);
//重写push和replace方法
let originPush = VueRouter.prototype.push;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject)
    return originPush.call(this, location, resolve, reject);
  else
    return originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
};
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject)
    return originReplace.call(this, location, resolve, reject);
  else
    return originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
};
//跳转路由后默认在顶端
let router = new VueRouter({
  mode: "hash",
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 };
  },
});
router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (localStorage.getItem("isLogin")) {
    if (to.path === "/user") {
      try {
        let a = await store.dispatch("user/getUserStatus");
        console.log("a:", a);
      } catch (error) {
        store.commit("user/DIALOGVISIBLE", true);
      }
      next();
    } else {
      next();
    }
  } else {
    if (to.path === "/user") {
      store.commit("user/DIALOGVISIBLE", true);
    } else {
      next();
    }
  }
});
export default router;
