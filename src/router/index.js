import Vue from "vue";
import VueRouter from "vue-router";
import House from "../views/House.vue";
import People from "../views/People.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: House,
    redirect: '/house',
  },
  {
    path: "/login",
    name: "Login",
    component: require("../views/login/login.vue").default
  },
  {
    path: "/map",
    name: "Map",
    component: require("../components/map.vue").default
  },
  {
    path: "/house",
    name: "House",
    component: House,
    redirect: '/house/index',
    children: [
      // 房屋首页
      {
        path: "index",
        name: "Index",
        component: require("../views/house/index.vue").default
      },
      // 小区的楼栋 (1幢...)
      {
        path: "floor",
        name: "Floor",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/house/floor.vue")
      },
      // 小区详情
      {
        path: "estateInfo",
        name: "EstateInfo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/house/estateInfo.vue")
      },
      // 新增/编辑小区
      {
        path: "editEstate",
        name: "EditEstate",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/edit/estate.vue")
      },
      // 楼栋
      {
        path: "resident",
        name: "Resident",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/house/resident.vue")
      },
      // 楼栋信息
      {
        path: "residentInfo",
        name: "ResidentInfo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/house/residentInfo.vue")
      },
      // 编辑楼栋
      {
        path: "editFloor",
        name: "EditFloor",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/edit/floor.vue")
      },
      // 小区 - 楼栋 - 房屋详情
      {
        path: "houseInfo",
        name: "HouseInfo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/house/houseInfo.vue")
      },
      // 编辑房屋信息
      {
        path: "editHouse",
        name: "EditHouse",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/edit/house.vue")
      },
      // 小区 - 楼栋 - 住户列表
      {
        path: "userList",
        name: "UserList",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/house/userList.vue")
      },// 小区 - 楼栋 - 住户列表
      {
        path: "userInfo",
        name: "UserInfo",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/house/userInfo.vue")
      },
      {
        path: "editUser",
        name: "EditUser",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/edit/user.vue")
      }
    ]
  },
  {
    path: "/people",
    name: "People",
    component: People,
    redirect: '/people/index',
    children: [
      {
        path: "index",
        name: "Index",
        component: require("../views/people/index.vue").default
      },
      {
        path: "residentList",
        name: "ResidentList",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/people/residentList.vue")
      },
    ]
  }
];

const router = new VueRouter({
  // mode: "history",
  // mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
