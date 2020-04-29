import Vue from 'vue'
// import store from '../store/index'
import VueRouter from 'vue-router'//登录页面
import Login from '../components/Login.vue'
//老师
import Tstuinfo from '../views/teacher/tManageStudent.vue'
//管理员
import Mstuinfo from '../views/manager/mManageStudent.vue'


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component: Login,
    name: 'Login',
    hidden: true
  },
  {
    path: '/Teacher/StudentInformation',
    name: 'Tstuinfo',
    component: Tstuinfo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Manage/SInformation',
    name: 'Mstuinfo',
    component: Mstuinfo,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   const isLogined = store.getters.getIsLogined ? store.getters.getIsLogined : window.sessionStorage.getItem('isLogined');    //获取登录状态
//   /*如果进入需要登录的页面，就判断是否已经登录，如果登录》next，如果没登录》Login*/
//   if (to.meta.requiresAuth) {
//     if (isLogined) {
//       next()
//     } else {
//       next('/Login')
//     }
//   } else {
//     next()
//   }
// })
export default router;