import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/style/reset.css'

// 无限下拉
import vueiInfinite from 'vue-infinite-scroll'
Vue.use(vueiInfinite)

// 路由跳转进度条的展示
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//配置滚动条
NProgress.configure({ showSpinner: false, ease: 'ease', speed: 3000 })
// 定义一个 数组
const whiteList = ['/login']
// 在路由守卫里去监控路由变化，从而触发进度条
// 路由变化时
router.beforeEach((to, from, next) => {
  //进度条开始
  NProgress.start();
  // console.log(to)
  const hasOrgId = sessionStorage.getItem('orgId')
  if (hasOrgId) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ name: 'House' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    /* 没有orgid的话 */

    if (whiteList.indexOf(to.path) !== -1) {
      // 如果是前往登录页面的话 直接放行
      next()
    } else {
      // 如果不是前往登录页面的话 直接跳转到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  next()
})
//后置路由守卫
router.afterEach(transition => {
  //关闭进度条
  NProgress.done();
});

Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
