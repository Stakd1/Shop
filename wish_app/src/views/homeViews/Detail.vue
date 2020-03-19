<template>
  <div class="detail">
    <van-nav-bar title="商品详情" fixed left-text="返回" @click-left="onClickLeft" />
    <div class="detail-wrap">
      <div class="detail-box">
        <div>
          <img class="auto-img" :src="productDetailData.imgurl" alt />
        </div>
        <div class="price">{{productDetailData.price}}￥</div>
        <div class="pro-detail">
          <div class="pro-name">{{productDetailData.pname}}</div>
          <div class="pro-subname">{{productDetailData.pdetail}}</div>
        </div>
      </div>
      <van-cell-group>
        <van-cell :is-link="true">
          <template slot="title">
            <span class="custom-title c-title">领券：</span>
            <span>标签</span>
          </template>
        </van-cell>

        <van-cell :is-link="true">
          <template slot="title">
            <span class="custom-title c-title">配送：</span>
            <span>广东省广州市</span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-tabs v-model="activeName" :sticky="true" :offset-top="46">
        <van-tab title="商品详情" name="detail">
          内容
          内容
          <hr />内容
          内容
        </van-tab>
        <van-tab title="商品评论" name="comment">
          内容 2
          内容
          内容
          <hr />内容
          内容
        </van-tab>
      </van-tabs>
    </div>

    <van-goods-action class="goods-nav">
      <van-goods-action-icon icon="wap-home-o" @click="goHome" text="首页" />
      <van-goods-action-icon @click="goShopCart" icon="shopping-cart-o" text="购物车" />
      <van-goods-action-button type="warning" @click="showSku" text="加入购物车" />
      <van-goods-action-button type="danger" @click="showSku" text="立即购买" />
    </van-goods-action>

    <van-sku
      v-model="show"
      :sku="skuData.sku"
      :goods="skuData.goods"
      :goods-id="skuData.goods_id"
      :hide-stock="skuData.sku.hide_stock"
      :quota="skuData.quota"
      :quota-used="skuData.quota_used"
      :start-sale-num="skuData.start_sale_num"
      :custom-stepper-config="customStepperConfig"
      hide-quota-text
      safe-area-inset-bottom
      @add-cart="addCart"
    />
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      show: false,
      customStepperConfig: {
        quotaText: "单次限购1件",
        stockFormatter: stock => `剩余${stock}件`,
        handleOverLimit: data => {
          const { action, limitType, quota, startSaleNum = 1 } = data;

          if (action === "minus") {
            this.$toast(
              startSaleNum > 1 ? `${startSaleNum}件起售` : "至少选择一件商品"
            );
          } else if (action === "plus") {
            if (limitType === 0) {
              this.$toast(`限购${quota}件`);
            } else {
              this.$toast("库存不够了");
            }
          }
        }
      },

      skuData: {
        //商品id
        goods_id: "",
        //至少购买一件
        start_sale_num: 1,

        //商品信息
        goods: {
          //商品名称
          title: "",

          //商品图片
          picture: "",

          //商品价格
          price: 0
        },
        sku: {
          //商品价格
          price: "0",

          //库存量
          stock_num: 0,

          //隐藏规格
          none_sku: true,

          //是否隐藏库存量
          hide_stock: false,

          tree: [],
          list: []
        }
      },

      // imgBaseUrl: "http://192.168.0.104:10020/assets/",
      activeName: "detail",
      productDetailData: {},

      //购物车数组
      shopCart: [],

      shopTwo: [],

      shop: [],
      //加入购物车数据
      shopData: {
        id: "",
        goods_info: "",
        selectedNum: 0
      }
    };
  },
  created() {
    let shopCart = localStorage.getItem("shopCart");
    shopCart = JSON.parse(shopCart);

    this.shopTwo = shopCart;
    // console.log(this.shopTwo);
    // console.log(this.$route.params.item);
    this.productDetailData = this.$route.params.item;
    // console.log(this.productDetailData);

    this.skuData.goods_id = this.productDetailData.pid;
    this.skuData.goods.title = this.productDetailData.pname;
    this.skuData.goods.picture = this.productDetailData.imgurl;
    this.skuData.goods.price = this.productDetailData.price;
    this.skuData.sku.price = this.productDetailData.price;
    this.skuData.sku.stock_num = this.productDetailData.pcount;
    this.customStepperConfig.quotaText = `单次限购买${this.productDetailData.pcount}件`;

    // 设置购物数据

    //当data初始化完成时
    //截取路由参数
    // this.axios({
    //   method: "GET",
    //   url: "/productDetail",
    //   params: {
    //     id: this.$route.params.id
    //   }
    // })
    //   .then(result => {
    //     console.log(result.data);
    //     if (result.data.status === "200") {
    //       console.log("进来");
    //       result.data.data[0].pimg = this.imgBaseUrl + result.data.data[0].pimg;
    //       this.productDetailData = result.data.data[0];

    //       this.skuData.goods_id = result.data.data[0].pid;
    //       this.skuData.goods_info.title = result.data.data[0].pname;
    //       this.skuData.goods_info.picture = result.data.data[0].pimg;
    //       this.skuData.goods_info.price = result.data.data[0].price;
    //       this.skuData.sku.price = result.data.data[0].price;
    //       this.skuData.sku.stock_num = result.data.data[0].pcount;
    //       this.customStepperConfig.quotaText = `单次限购买${result.data.data[0].pcount}件`;
    //     }
    //   })
    //   .catch(err => {
    //     console.log("出错了");
    //   });
  },
  methods: {
    onClickLeft() {
      // this.$router.push({ name: "home" });
      this.$router.go(-1);
    },
    //显示商品操作面板sku
    showSku() {
      this.show = true;
    },
    // 加入购物车
    addCart(data) {
      this.shopData.goods_info = this.skuData.goods;
      this.shopData.id = this.skuData.goods_id;
      this.shopData.selectedNum = data.selectedNum;

      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      // find,查找
      let isHaveGoods = cartInfo.find(cart => cart.id == this.shopData.id);
      // console.log(cartInfo);
      if (!isHaveGoods) {
        let newGoodsInfo = this.shopData;
        cartInfo.push(newGoodsInfo);
        localStorage.cartInfo = JSON.stringify(cartInfo);
        this.$toast.success("加入购物车成功");
      } else {
        console.log("已有此商品");
        return;
      }

      // // 发起请求
      // this.axios({
      //   method: "POST",
      //   url: "/addShopcart",
      //   data: {
      //     //需要验证登录
      //     key: "default",
      //     count: data.selectedNum,
      //     pid: data.goodsId
      //   }
      // })
      //   .then(result => {
      //     console.log("result ==> ", result);
      //     //关闭sku面板
      //     this.show = false;

      //     //提示
      //     this.$toast.success(result.data.msg);
      //   })
      //   .catch(err => {
      //     console.log("出错了");
      //     this.$toast.success(result.data.msg);
      //   });
    },

    goShopCart() {
      this.$router.push({ name: "shop" });
    },
    goHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style lang="less" scoped>
// body,html{
//   height: 100%;
// }
// .detail {
//   height: auto;
//   overflow: hidden;

//   .detail-wrap{
//     position: relative;
//     height: calc(100% - 50px);
//     overflow-y: auto;
//   }
//   .goods-nav{
//     z-index: 999;
//   }
// }

.detail {
  padding-top: 46px;
  padding-bottom: 50px;
  .price {
    line-height: 34px;
    background-color: #fe374e;
    color: #fff;
    font-size: 14px;
    padding: 0 10px;
  }
  .pro-detail {
    padding: 10px;
    background-color: #fff;
  }
  .pro-name {
    font-size: 16px;
  }
  .pro-subname {
    margin-top: 10px;
    font-size: 12px;
    color: #a0a0a0;
    margin-bottom: 20px;
  }
  .c-title {
    margin-right: 10px;
    color: #a0a0a0;
  }
  .goods-nav {
    z-index: 10;
  }
}
</style>