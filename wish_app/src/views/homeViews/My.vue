<template>
  <div class="my">
    <div class="banner" :style="banner">
      <div class="user-box">
        <div class="user-header" @click="loginUser">
          <img class="auto-img" :src="userImg" alt />
        </div>
        <div class="user-name">{{userName}}</div>
      </div>
    </div>
    <div class="order-box">
      <div class="my-order">
        <div class="t-order">
          <span class="title-order">我的订单</span>
          <span class="all-order fr">
            全部订单
            <van-icon class="arrow" name="arrow" />
          </span>
        </div>

        <div class="order-list clearfix">
          <div class="order-card">
            <div class="card-img">
              <van-icon name="credit-pay" />
            </div>
            <span>待付款</span>
          </div>
          <div class="order-card">
            <div class="card-img">
              <van-icon name="coupon-o" />
            </div>
            <span>待发货</span>
          </div>
          <div class="order-card">
            <div class="card-img">
              <van-icon name="logistics" />
            </div>
            <span>待收货</span>
          </div>
          <div class="order-card">
            <div class="card-img">
              <van-icon name="edit" />
            </div>
            <span>待评价</span>
          </div>
          <div class="order-card">
            <div class="card-img">
              <van-icon name="cash-back-record" />
            </div>
            <span>退款/售后</span>
          </div>
        </div>
      </div>
    </div>
    <div class="seting-box">
      <div class="seting" @click="goAddress">
        <span>收货地址</span>
        <div class="icon-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="seting">
        <span>优惠券</span>
        <div class="icon-right">
          <van-icon name="arrow" />
        </div>
      </div>

      <div class="seting">
        <span>VIP服务</span>
        <div class="icon-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="seting">
        <span>设置</span>
        <div class="icon-right">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      colu: 5,
      banner: {
        backgroundImage: "url(" + require("../../assets/image/banner.jpg") + ")"
      },
      userName: "点击头像登录",
      userData: null,
      userImg: ""
    };
  },
  created() {
    let data = localStorage.getItem("status");
    if (data != null) {
      this.userData = JSON.parse(data);
      this.userName = this.userData.userName;
      this.userImg = this.userData.portrait;
    }
  },

  methods: {
    loginUser() {
      if (this.userData == null) {
        this.$router.push({ name: "login" });
      }
    },
    goAddress() {
      this.$router.push({ name: "address" });
    }
  }
};
</script>

<style lang="less" scoped>
.my {
  position: fixed;
  width: 100%;
  height: calc(100% - 50px);
  background: #fddae0;
}
.banner {
  height: 170px;
  background: center center;
  position: relative;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-size: cover;
}
.user-box {
  position: absolute;
  width: 320px;
  height: 120px;
  left: 0;
  right: 0;
  bottom: -50px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.438);
  box-shadow: -2px -2px 3px rgba(158, 151, 151, 0.479);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  .user-header {
    width: 90px;
    height: 90px;
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: -35px;
    border-radius: 50%;
    opacity: 1;
    margin: 0 auto;
    box-shadow: 0 -3px 3px rgba(158, 151, 151, 0.479);
    img {
      border-radius: 50%;
    }
  }
  .user-name {
    text-align: center;
    font-size: 22px;
    margin-top: 70px;
    color: #666;
  }
}
.order-box {
  margin-top: 60px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.438);
  .t-order {
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
  .all-order {
    font-size: 14px;
    color: #666;
    line-height: 26px;
  }
  .arrow {
    float: right;
    line-height: 26px;
  }
  .order-card {
    width: 17.1%;
    float: left;

    padding: 5px;
    text-align: center;
    span {
      color: #333;
    }
    .card-img {
      padding: 10px;
      height: 30px;

      .van-icon {
        color: #85d3d5;
        font-size: 30px;
      }
    }
  }
}

.seting-box {
  overflow: hidden;
  background: rgba(255, 255, 255, 0.438);
  // padding: 15px;
  margin-top: 10px;
  span {
    font-size: 14px;
    color: #333;
  }
  .icon-right {
    float: right;
  }
  .seting {
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.438);

    .icon-right {
      padding: 3px 0;
    }
  }
}
</style>