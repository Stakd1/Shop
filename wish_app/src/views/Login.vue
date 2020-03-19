<template>
  <div class="login">
    <div class="header">
      <div class="ret-n">
        <van-icon class="icon" name="arrow-left" @click="upper()" />
      </div>
      <div class="portrait">
        <img class="initial" src="../assets/icon/initial-h.png" alt />
      </div>
    </div>
    <div class="account">
      <div class="num-box">
        <input
          type="number"
          v-model="modelObj.phone"
          @input="validPhone(modelObj.phone)"
          placeholder="请输入手机号"
        />
        <span v-show="modelError.phoneError.isShow">{{modelError.phoneError.text}}</span>
      </div>
      <div class="pass-box">
        <input
          :type="typePass"
          v-model="modelObj.password"
          @input="validPassWord(modelObj.password)"
          placeholder="输入密码"
        />
        <van-icon class="icon" :name="icon" @click="lookPass()" />
        <span v-show="modelError.passwordError.isShow">{{modelError.passwordError.text}}</span>
      </div>
      <div class="btn-box">
        <van-button
          @click="loginAccount(modelObj.phone,modelObj.password)"
          class="btn"
          text="登录"
          type="info"
           loading-text="登录中..."
        />
        <span @click="toForget">忘记密码？</span>
      </div>
      <!-- loading loading-text="加载中..." -->

      <div class="reg-box">
        <span @click="toRegister">没有账号吗？注册一个吧~</span>
      </div>
    </div>
  </div>
</template>

<script>
//引入类
import { valid } from "../assets/js/valid";

export default {
  name: "login",
  data() {
    return {
      //验证格式
      modelObj: {
        //手机号
        phone: "",
        //密码
        password: ""
      },

      //错误提示
      modelError: {
        phoneError: {
          text: "手机号格式错误",
          isShow: false
        },
        passwordError: {
          text: "密码错误",
          isShow: false
        }
      },

      //查看密码
      icon: "closed-eye",
      typePass: "password",
      isPass: true,

      //登录判断
      isLogin: false

      // requestUrl: "http://192.168.53.2:10002"
    };
  },
  methods: {
    //返回登录界面
    upper() {
      this.$router.push({ name: "home" });
    },
    //查看密码
    lookPass() {
      if (this.isPass) {
        this.typePass = "text";
        this.isPass = false;
        this.icon = "eye-o";
        return;
      }
      this.typePass = "password";
      this.icon = "closed-eye";
      this.isPass = true;
    },

    //实时验证格式
    validPhone(v) {
      if (valid.isPhone(v) || v == "") {
        this.modelError.phoneError.isShow = false;
        this.isLogin = true;
      } else {
        this.modelError.phoneError.isShow = true;
      }
    },
    validPassWord(v) {
      this.isLogin = false;
      if (valid.isPassWord(v) || v == "") {
        this.modelError.passwordError.isShow = false;
        this.isLogin = true;
      } else {
        this.modelError.passwordError.isShow = true;
      }
    },

    //登录账号
    loginAccount(p, s) {
      let self = this;
      this.isLogin == true;
      // this.$toast({
      //   duration: 0,
      //   message: "登录中..."
      // });
      if (p === "" && s === "") {
        this.$toast({
          duration: 1000,
          message: "未输入信息!"
        });
        this.isLoading = false;
        return;
      }

      let time = setTimeout(function() {
        let users = localStorage.getItem("users");
        users = users ? JSON.parse(users) : [];
        if (users == "") {
          self.$toast({
            duration: 1000,
            message: "该用户不存在"
          });
          self.isLoading = false;
          clearTimeout(time);
          return;
        }
        for (let i = 0; i < users.length; i++) {
          if (users[i].userPhone === p && users[i].userPassword === s) {
            self.$toast({
              duration: 1000,
              message: "登录成功"
            });
            //记录登录状态
            let status = {
              islogin: true,
              userPhone: p,
              userName: "夜空",
              portrait:
                "http://img4.imgtn.bdimg.com/it/u=41006618,2780980478&fm=11&gp=0.jpg"
            };

            localStorage.setItem("status", JSON.stringify(status));
            self.$router.push("my");
            self.isLoading = false;
            clearTimeout(time);
            return;
          }
        }

        self.$toast({
          duration: 1000,
          message: "密码或账号错误"
        });
        self.isLoading = false;
      }, 1000);

      // this.axios({
      //   method: 'POST',
      //   url: '/appLogin',

      //   //post请求参数,登录方式loginType ==> 0: 手机号+验证码登录，1：手机号+密码登录
      //   data: {
      //     phone: this.user.phone,
      //     key: 'code',
      //     code: this.user.code,
      //     loginType: 0
      //   }
      // }).then(result => {
      //   console.log('result ==> ', result);

      //   //清除加载提示
      //   this.$toast.clear();

      //   if (result.data.status == 2000) {
      //     this.$cookies.set(result.data.__utk.key, result.data.__utk.utk, result.data.time * 24 * 60 * 60);
      //   }

      //   //登录成功提示
      //   this.$notify({
      //     type: result.data.status == 2000 ? 'success' : 'warning',
      //     message: result.data.msg,

      //     //当前关闭提示后跳转
      //     onClose: () => {
      //       if (result.data.status == 2000) {
      //         this.$router.push({name: 'home'});
      //       }
      //     }
      //   });

      // }).catch(err => {
      //   console.log('出错了');
      //   this.$toast.clear();
      // })
    },

    //找回密码
    toForget() {
      this.$router.push({ name: "forget" });
    },
    //注册
    toRegister() {
      this.$router.push({ name: "register" });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fbfbfb;
}
.header {
  width: 120%;
  margin: 0 auto;
  position: relative;
  left: -10%;
  height: 200px;
  background-image: linear-gradient(to right, #fe8362, #fd5a69);
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;

  .ret-n {
    position: absolute;
    top: 40px;
    left: 60px;
    font-size: 20px;
    color: #fff;
  }
}
.portrait {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -40px;
  margin: 0 auto;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #fff;
  overflow: hidden;
  .initial {
    display: block;
    margin: 10px auto 0;
    width: 70px;
    height: 75px;
  }
}
.account {
  height: 300px;
  margin-top: 50px;
  padding-top: 5px;
  input {
    width: 260px;
    margin: 10px auto 5px;
    display: block;
    padding: 10px 15px;
    border-radius: 20px;
    font-size: 16px;
    color: #666;
  }
  span {
    font-size: 14px;
    margin-left: 20px;
    color: #fd5a69;
  }
}
.num-box {
  width: 300px;
  margin: 0 auto;
}
.pass-box {
  width: 300px;
  margin: 0 auto;
  position: relative;
  input {
    width: 245px;
    padding-right: 30px;
  }
  .icon {
    font-size: 18px;
    position: absolute;
    right: 15px;
    top: 13px;
  }
}
.reg-box {
  width: 300px;
  margin: 0 auto;
  position: relative;
  .ver-code {
    width: 80px;
    background: #fe8362;
    position: absolute;
    right: 8px;
    top: 0;
    padding: 10px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    text-align: center;
  }
  input {
    width: 170px;
    padding-right: 100px;
  }
  button {
    font-size: 16px;
    color: #fff;
  }
}
.btn-box {
  width: 300px;
  margin: 0 auto;
  padding: 25px 0;
  span {
    display: block;
    text-align: center;
    margin-top: 20px;
  }
  .btn {
    width: 280px;
    display: block;
    margin: 0 auto;
    font-size: 16px;
    border: none;

    background-color: #fc757c;
    span {
      font-size: 18px;
      color: #fff;
      margin: 0;
    }
  }
}
.reg-box {
  text-align: center;
}
</style>