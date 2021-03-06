import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ZipShow from "./views/ZipShow.vue";
import ZipShowData from "./views/ZipShowData.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/zip/:zipcode",
      name: "zipcode-show",
      component: ZipShow,
      props: true
    },
    {
      path: "/withdata/:zipcode",
      name: "zipcode-show-data",
      component: ZipShowData,
      props: true
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
