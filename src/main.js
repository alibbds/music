import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Element from 'element-ui'
import router from '@/router'
import APlayer from '@moefe/vue-aplayer';
import utils from '@/utils/index.js'
import VueLazyLoad from 'vue-lazyload'

Vue.use(APlayer, {
  defaultCover: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F1Z92Z01U14227-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650373701&t=f81eb01ca37567bb92b101fea3a67525',
  productionTip: true,
});
Vue.use(VueLazyLoad,{
  perLoad:1.4,
  error:'@/assets/img/图片加载失败.png'
})
Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$message = Element.Message;
Vue.prototype.$utils = utils

new Vue({
  router,
  store,
  beforeMount() {
    Vue.prototype.$bus = this;
  },
  render: h => h(App),
}).$mount('#app')
