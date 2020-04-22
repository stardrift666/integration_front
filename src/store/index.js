import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //用户信息
    isLogined: false,
    userInfo: {
      name: "",
      username: "",
      job:"0"
    }
  },
  getters: {
    //用户
    //返回登录状态
    getIsLogined: state => {
      return state.isLogined
    },
    //返回用户信息
    getUserInfo: state => {
      return state.userInfo
    },
    //患者
    getPickInfo: state => {
      return state.pickInfo
    }
  },
  mutations: {
    //用户
    //登录，保存登录状态和用户信息
    LOGIN: (state, loginInfo) => {
      state.isLogined = true;
      state.userInfo.username = loginInfo.username;
      state.userInfo.name = loginInfo.name;
      window.sessionStorage.setItem('isLogined',true);
      window.sessionStorage.setItem('username',loginInfo.username);
      window.sessionStorage.setItem('name',loginInfo.name);
      window.sessionStorage.setItem('job',loginInfo.job);
    },
    //退出登录，清除登录状态和用户信息
    LOGOUT: state => {
      state.isLogined = false
      state.userInfo.username = ''
      state.userInfo.name = ''
      window.sessionStorage.setItem('isLogined',false);
      window.sessionStorage.setItem('username','');
      window.sessionStorage.setItem('name','');
      window.sessionStorage.setItem('job','');
    },
    //清除全部信息
    REMOVEALL: state => {
      state.isLogined = false
      state.userInfo.username = ''
      state.userInfo.name = ''
      state.userInfo.job = ''
    },
    //同步信息
    SYNCHRONOUS:state=>{
      state.isLogined = window.sessionStorage.getItem('isLogined');
      state.userInfo.username = window.sessionStorage.getItem('username');
      state.userInfo.name =  window.sessionStorage.getItem('name');
    },
    //患者
    PICKINFO: (state, pickInfo) => {
      state.pickInfo = pickInfo;
    }
  },
  actions: {
    //用户
    loginAction: (context, loginInfo) => {
      context.commit('LOGIN', loginInfo)
    },
    logoutAction: context => {
      context.commit('LOGOUT')
    },
    removeAllAction: context => {
      context.commit('REMOVEALL')
    },
    synchronousAction:context=>{
      context.commit('SYNCHRONOUS')
    },
    //患者
    pickInfoAction: (context, pickInfo) => {
      context.commit('PICKINFO', pickInfo)
    }
  }
})
