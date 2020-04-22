<template>
  <div id="box">
    <div id="star app">
      <!-- 
        color: String类型。默认'#dedede'。粒子颜色。
        particleOpacity: Number类型。默认0.7。粒子透明度。
        particlesNumber: Number类型。默认80。粒子数量。
        shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
        particleSize: Number类型。默认80。单个粒子大小。
        linesColor: String类型。默认'#dedede'。线条颜色。
        linesWidth: Number类型。默认1。线条宽度。
        lineLinked: 布尔类型。默认true。连接线是否可用。
        lineOpacity: Number类型。默认0.4。线条透明度。
        linesDistance: Number类型。默认150。线条距离。
        moveSpeed: Number类型。默认3。粒子运动速度。
        hoverEffect: 布尔类型。默认true。是否有hover特效。
        hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
        clickEffect: 布尔类型。默认true。是否有click特效。 
        clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"
      -->
      <vue-particles
        color="#409EFF"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#409EFF"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></vue-particles>
    </div>
    <!-- 卡片正面 -->
    <transition name="el-zoom-in-center">
      <el-card class="box-card" v-show="show">
        <div slot="header" class="clearfix">
          <h1 @click="show=!show" class="titleH1">学生信息档案系统</h1>
        </div>
        <el-form :model="userInfo">
          <el-form-item>
            <el-input placeholder="用户名" v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="密码" type="password" v-model="userInfo.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="clickLogin(userInfo)">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </transition>
    <!-- 卡片背面 -->
    <transition name="el-zoom-in-center">
      <el-card class="box-card" v-show="!show">
        <div slot="header" class="clearfix">
          <h1 @click="show=!show" class="titleH1">注册</h1>
        </div>
        <el-form :model="userZhuce" label-position="right" label-width="160px" class="moveBox">
          <el-form-item label="用户名">
            <el-input v-model="userZhuce.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userZhuce.password"></el-input>
          </el-form-item>
          <el-button type="primary" round @click="clickZhuce(userInfo)">注册</el-button>
        </el-form>
        <br />
        <el-link type="primary" @click="show=!show">已有帐号 去登陆</el-link>
      </el-card>
    </transition>
  </div>
</template>

<script>
export default {
  created() {
    this.pageShowOnly();
  },
  name: "Login",
  data() {
    return {
      show: true,
      userInfo: {
        username: "",
        // name: "管理员",
        password: ""
      },
      userZhuce: {
        username: "",
        // name: "管理员",
        password: ""
      },
      rememberID: true,
      rememberPassword: false,
      loading: false
    };
  },
  methods: {
    pageShowOnly() {
      this.$store.dispatch("removeAllAction");
    },
    // clickLogin() {
    //   if (
    //     this.userInfo.username == "admin" &&
    //     this.userInfo.password == "admin"
    //   ) {
    //     //将登录状态写入store.state
    //     this.$store.dispatch("loginAction", {
    //       loginInfo: this.userInfo
    //     });
    //     //进入DFU页面
    //     this.$router.push({ path: "/StudentInformation/Add" });
    //   }
    // },
    clickLogin() {
      //发送网络请求
      let xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        // eslint-disable-next-line no-undef
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      let self = this;
      // eslint-disable-next-line no-console
      xmlhttp.open(
        "POST",
        "http://192.168.43.35:8888/user/ifUser?username=" +
          this.userInfo.username +
          "&password=" +
          this.userInfo.password,
        true
      );
      xmlhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xmlhttp.send(null);
      xmlhttp.onreadystatechange = doResult; //设置回调函数
      // eslint-disable-next-line no-unused-vars
      function doResult(data) {
        // eslint-disable-next-line no-console
        // console.log(data);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          let data = xmlhttp.responseText;
          // eslint-disable-next-line no-console
          console.log(data);
          
          if (data == "0") {
            //将登录状态写入store.state
            self.$store.dispatch("loginAction", {
              loginInfo: self.userInfo
            });
            // 提示登录成功的信息
            //进入DFU页面
            // if (this.userInfo.job == 0) {
            self.$router.push({ name: "Sadd" });
          } 
          else if (data == "1") {
            self.$router.push({ name: "SCadd" });
          }
           else if (data == "no such user") {
            self.$notify.error({
              title: "登录失败",
              message: "没有此用户或密码错误"
            });
          } else if (data == "incorrect password") {
            self.$notify.error({
              title: "登录失败",
              message: "没有此用户或密码错误"
            });
          }
        } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
          //提示登录失败的信息
          self.$notify.error({
            title: "登录失败",
            message: "请检查网络"
          });
          return false;
        }
      }
    },
    submitSuccess() {
      this.$notify({
        title: "成功",
        message: "成功注册",
        type: "success"
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    transformRequest(obj) {
      var str = [];
      for (var p in obj) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
      return str.join("&");
    },
    clickZhuce() {
      let data = this.transformRequest(this.userZhuce);
      let xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        // eslint-disable-next-line no-undef
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      // eslint-disable-next-line no-unused-vars
      let self = this;
      xmlhttp.open("POST", "http://192.168.43.35:8888/user/addUser", true);
      xmlhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xmlhttp.send(data);
      this.submitSuccess();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#box {
  /* display: flex;
  display: -webkit-flex; */
  height: 100vh;
  width: 100vw;
  /* align-items: center;
  justify-content: center; */
}
#star {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -100;
}
#particles-js,
.particles-js-canvas-el {
  width: 100%;
  height: 100%;
}
.box-card {
  position: fixed;
  z-index: 100;
  width: 35vw;
  top: 25%;
  left: 32.5vw;
  text-align: center;
}
.titleH1 {
  transition-duration: 300ms;
}
.titleH1:hover {
  transition-duration: 300ms;
  color: #409eff;
}
</style>
