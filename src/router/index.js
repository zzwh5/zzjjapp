import Vue from "vue";
import VueRouter from "vue-router";
import House from "../views/House.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/house",
    name: "House",
    component: House
  },
  {
    path: "/addEstateOrFloor",
    name: "AddEstateOrFloor",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/add/addEstateOrFloor.vue")
  },
  {
    path: "/floor",
    name: "Floor",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/house/floor.vue")
  },
  {
    path: "/estateInfo",
    name: "EstateInfo",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/house/estateInfo.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
