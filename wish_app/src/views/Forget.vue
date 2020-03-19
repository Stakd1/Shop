<template>
  <div class="forget">
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
        <!-- <span v-show="phoneError.isShow">{{phoneError.text}}</span> -->
        <span v-show="modelError.phoneError.isShow">{{modelError.phoneError.text}}</span>
      </div>
      <div class="pass-box">
        <input
          :type="typePass"
          v-model="modelObj.password"
          @input="validPassWord(modelObj.password)"
          placeholder="设置6位以上字母，数字密码"
        />
        <van-icon class="icon" :name="icon" @click="lookPass()" />
        <!-- <span v-show="passError.isShow">{{passError.text}}</span> -->
        <span v-show="modelError.passwordError.isShow">{{modelError.passwordError.text}}</span>
      </div>
      <div class="reg-box">
        <input type="number" v-model="modelObj.code" placeholder="请输入验证码" />
        <div class="ver-code">
          <button :disabled="textCode.isDisa" @click="getCode(modelObj.phone)">{{textCode.text}}</button>
        </div>
        <span v-show="modelError.codeError.isShow">{{modelError.codeError.text}}</span>
        <!-- <span v-show="verErrow.isShow">{{verErrow.text}}</span> -->
      </div>
      <div class="btn-box">
        <van-button
          class="btn"
          @click="verifyAccount(modelObj.phone,modelObj.password,modelObj.code)"
          text="重设密码"
          type="info"
        />
      </div>
      <!-- loading loading-text="加载中..." -->
    </div>
  </div>
</template>

<script>
//引入类
import { valid } from "../assets/js/valid";

export default {
  name: "forget",
  data() {
    return {
      //验证格式
      modelObj: {
        //手机号
        phone: "",
        //密码
        password: "",
        //验证码
        code: ""
      },

      //错误提示
      modelError: {
        phoneError: {
          text: "手机号格式错误",
          isShow: false
        },
        passwordError: {
          text: "密码格式错误",
          isShow: false
        },
        codeError: {
          text: "验证码错误",
          isShow: false
        }
      },

      //查看密码
      icon: "closed-eye",
      typePass: "password",
      isPass: true,

      //获取验证码
      textCode: {
        text: "获取验证码",
        isActive: "",
        isDisa: false
      },

      //随机验证码
      code: null,

      //加载中状态
      isLoading: false,

      useDataArr: []
    };
  },
  created() {
    let useData = localStorage.getItem("users");
    useData = JSON.parse(useData);
    this.useDataArr = useData;
  },

  methods: {
    //返回登录界面
    upper() {
      console.log("返回");
      this.$router.push({ name: "login" });
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
      } else {
        this.modelError.phoneError.isShow = true;
      }
    },
    validPassWord(v) {
      if (valid.isPassWord(v) || v == "") {
        this.modelError.passwordError.isShow = false;
      } else {
        this.modelError.passwordError.isShow = true;
      }
    },

    //获取验证码
    getCode(num) {
      //手机号不能为空
      if (num == "") {
        this.$toast({
          duration: 2000,
          message: "未输入手机号"
        });
        return;
      }

      let self = this;
      //获取手机号
      // console.log(num);
      this.textCode.isActive = "active";
      let number = 5;
      this.textCode.isDisa = true;
      let time = setInterval(function() {
        number--;
        self.textCode.text = number;
        if (self.isLoading == true) {
          clearInterval(time);
        }
        if (number === 0) {
          self.textCode.isActive = "";
          self.textCode.text = "获取验证码";
          self.textCode.isDisa = false;
          clearInterval(time);
        }
      }, 1000);

      //生成随机验证码
      let arr = [];
      for (let i = 0; i < 6; i++) {
        let random = parseInt(Math.random() * 10);
        arr.push(random);
      }
      let str = arr.toString();
      let reg = str.replace(/,/g, "");
      this.code = reg;
      this.$toast({
        duration: 4000,
        message: "测试验证码:" + this.code
      });
    },

    //注册账号
    verifyAccount(p, s, c) {
      let self = this;

      //改变按钮状态
      this.isLoading = true;
      if (p === "" && s === "" && c === "") {
        this.$toast({
          duration: 1000,
          message: "未输入信息!"
        });
        this.isLoading = false;
        return;
      }
      if (c != this.code) {
        this.$toast({
          duration: 1000,
          message: "验证码错误!"
        });
        this.isLoading = false;
        return;
      }
      let userData = {
        userPhone: this.modelObj.phone,
        userPassword: this.modelObj.password
      };
      let users = localStorage.getItem("users");
      users = users ? JSON.parse(users) : [];

      let time = setTimeout(function() {
        let useArr = [];

        for (let i = 0; i < users.length; i++) {
          let index = i;
          if (users[index].userPhone === userData.userPhone) {
            users[index].userPassword = s;
            useArr.push(users[index]);
            self.textCode.isActive = "";
            self.textCode.text = "获取验证码";
            self.textCode.isDisa = false;
            self.isLoading = false;
            clearTimeout(time);
          } else {
            useArr.push(users[index]);
          }
        }

        // console.log(useArr);

        localStorage.setItem("users", JSON.stringify(useArr));
        self.$toast({
          duration: 1000,
          message: "修改密码成功"
        });
        self.$router.push("login");

        self.isLoading = false;
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.forget {
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
  // background: url("../assets/icon/logo(1).png") no-repeat center center;

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
</style>