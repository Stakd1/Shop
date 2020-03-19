<template>
  <div class="shop">
    <van-nav-bar title="购物车" />
    <div class="shop-list">
      <div class="mask" v-show="isShow">
        <span>暂无商品!</span>
      </div>

      <div class="shop-box clearfix" v-for="(item,index) in shopData" :key="index">
        <van-checkbox class="check-box" v-model="item.isCheck" @change="simpleSelect()"></van-checkbox>
        <div class="shop-img">
          <img class="auto-img" :src="item.goods_info.picture" alt />
        </div>
        <div class="title">
          <p>{{item.goods_info.title}}</p>
          <p>¥{{item.goods_info.price}}</p>
        </div>
        <div class="icon fr">
          <van-icon color="#333" size="26px" name="delete" />
        </div>
        <div class="step">
          <van-stepper disable-input v-model="item.selectedNum" @change="modifyCount()" />
        </div>
      </div>

      <div class="meau-box">
        <van-divider>猜你喜欢</van-divider>

        <div class="like-box" v-for="(item,index) in pageData" :key="index">
          <div class="like-card">
            <img class="auto-img" :src="item.imgurl" alt />
          </div>
          <p>{{item.pname}}</p>
          <div class="like-price">
            <span>¥{{item.price}}</span>
            <van-icon class="fr" size="18px" color="#f23030" name="shopping-cart-o" />
          </div>
        </div>
      </div>
      <van-submit-bar :price="submitInfo.price" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="submitInfo.allCheck" @click="allSelect">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
export default {
  name: "shop",
  data() {
    return {
      isShow: false,
      checked: null,
      price: 0,
      // number: 0,

      //购物车数据
      shopData: "",
      pageData: null,

      loginStatus: {
        isLogin: true,
        text: "管理"
      },

      submitInfo: {
        //订单总价格
        price: 0,
        allCheck: false
      }
    };
  },
  created() {
    this.axios({
      method: "GET",
      url: "/api/shop"
    })
      .then(data => {
        this.pageData = data.data.data.shouye;
      })
      .catch(err => {
        console.log("出错了");
      });
    let shopCart = localStorage.getItem("cartInfo");
    shopCart = JSON.parse(shopCart);

    if (shopCart == null) {
      console.log("请登录");
      this.isShow = true;
      return;
    }

    shopCart.forEach(v => {
      v.isCheck = false;
    });
    console.log(shopCart);

    this.shopData = shopCart.concat();
  },
  methods: {
    //管理
    manager() {
      if (!this.isEdit) {
        this.loginStatus.text = "完成";
      } else {
        this.loginStatus.text = "管理";
      }
      this.isEdit = !this.isEdit;
    },

    //全选
    allSelect() {
      this.shopData.forEach(v => {
        v.isCheck = !this.submitInfo.allCheck;
      });

      //计算订单总价
      this.calcTotalPrice();
    },

    //单选
    simpleSelect() {
      //如果有一个单选没有勾选，则全选就不能勾选

      this.calcTotalPrice();

      for (let i = 0; i < this.shopData.length; i++) {
        if (!this.shopData[i].isCheck) {
          this.submitInfo.allCheck = false;
          return;
        }
      }

      this.submitInfo.allCheck = true;
    },
    modifyCount() {
      this.calcTotalPrice();
    },

    calcTotalPrice() {
      this.submitInfo.price = 0;
      this.shopData.forEach(v => {
        if (v.isCheck) {
          this.submitInfo.price += v.goods_info.price * v.selectedNum * 100;
        }
      });
    },

    onSubmit() {
      console.log("提交");
    }
  }
};
</script>

<style lang="less" scoped>
.shop-list {
  width: 100%;
  position: fixed;
  height: calc(100% - 46px - 50px - 50px);
  overflow-y: auto;
  .mask {
    text-align: center;
    margin: 50px;
    font-size: 18px;
    color: #666;
  }
  .check-box {
    height: 100%;
    float: left;
    margin-right: 10px;
    // padding: 30px 15px 30px 0  ;
  }
  .shop-box {
    height: 90px;
    padding: 10px;
    // background: #ddd;
  }
  .shop-img {
    width: 120px;
    height: 100%;
    float: left;
    background: #fff;
    margin-right: 10px;
  }
  .van-submit-bar {
    bottom: 50px;
  }
  .icon {
    width: 30px;
    height: 30px;
    display: inline-block;
    margin: 30px 0;
  }

  .step {
    width: 165px;
    display: inline-block;
  }
  .title {
    width: 165px;
    font-size: 16px;
    color: #333;
    display: inline-block;
    p {
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    p:last-child {
      font-size: 14px;
      color: #f23030;
    }
  }

  .like-box {
    width: 44.5%;
    padding: 10px;
    // background: #eee;
    float: left;
    color: #333;
    .like-card {
      height: 150px;
      background: #fff;
    }
    p {
      font-size: 16px;
      padding: 3px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .like-price {
      padding-right: 10px;
    }
    .like-price > span {
      font-size: 14px;
      color: #f23030;
    }
  }
}
</style>