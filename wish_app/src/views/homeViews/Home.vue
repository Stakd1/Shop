<template>
  <div class="home">
    <!-- 加载框 -->
    <div class="load" v-show="isShow">
      <div class="tip">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>

    <div class="search-box clearfix">
      <van-search placeholder="请输入搜索关键词" v-model="value" />
    </div>
    <div class="tab">
      <div class="commend">
        <div class="rotation">
          <van-swipe style="height: 180px"  :autoplay="autoplay" indicator-color="white">
             <van-swipe-item v-for="item in imgArr" :key="item">
              <img class="auto-img" :src="item" />
            </van-swipe-item>
          </van-swipe>

        
        </div>
        <div class="grid-box">
          <ul>
            <li v-for="(item,index) in gridData" :key="index">
              <div class="card">
                <div class="img-box">
                  <img class="auto-img" :src="item.icon" alt />
                </div>
                <span>{{item.title}}</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="exhibi-box">
          <div class="imgs">
            <img class="auto-img" src="../../assets/image/a.jpg" />
          </div>
          <div class="imgs">
            <img class="auto-img" src="../../assets/image/b.jpg" />
          </div>
        </div>
        
        <div class="sell-well">
          <div class="sell">
            <span class="fl">畅销商品</span>
            <div class="fr">
              <span>更多</span>
              <div class="more-icon fr">
                <van-icon name="arrow" size="16px" />
              </div>
            </div>
          </div>
          <div class="well">
            <div class="crad" v-for="(item,index) in wellData" :key="index" @click="shopDetil(item)" >
              <div class="crad-img">
                <img class="auto-img" :src="item.imgurl" alt />
              </div>
              <div>
                <p class="crad-name">{{item.pname}}</p>
                <p class="crad-price">￥{{item.price}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="find-more">
          <div class="sell">
            <span class="mon">推荐商品</span>
          </div>
          <div class="more-list clearfix">
            <div class="more-item" v-for="(item,index) in pageData" :key="index"  @click="shopDetil(item)">
              <div class="more-img">
                <img class="auto-img" :src="item.imgurl" alt />
              </div>

              <div class="more-details">
                <span>{{item.pname}}</span>
                <span class="price">¥{{item.price}}</span>
                <span class="identical">看相似</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      isShow: false,
      autoplay: 5000,
      active: "a",
      value: "",
      imgArr: [
        require("../../assets/image/01.jpg"),
        require("../../assets/image/02.jpg"),
        require("../../assets/image/03.jpg"),
        require("../../assets/image/04.jpg")
      ],

      wellData: [

         {
            pid:1,
            ptype:"",
            pname:"电视",
            price:1000,
            pdetail:"",
            pcount:2000,
            imgurl:"https://img14.360buyimg.com/mobilecms/s316x316_jfs/t1/75789/35/11712/280578/5d917003Ed09dfe49/07e840c7da938d06.jpg!q70.dpg.webp"
        },
             {
            pid:2,
            ptype:"",
            pname:"电脑",
            price:1000,
            pdetail:"",
            pcount:2000,
            imgurl:"https://img20.360buyimg.com/mobilecms/s316x316_jfs/t1/101687/14/10610/285917/5e1d14e5E0adeee22/b519e197c0e82ccd.jpg!q70.dpg.webp"
        },
              {
            pid:3,
            ptype:"",
            pname:"手机",
            price:1000,
            pdetail:"",
            pcount:2000,
            imgurl:"https://img13.360buyimg.com/mobilecms/s316x316_jfs/t1/52208/11/14456/453762/5db7b9cbE4a5306b4/d07aa92378655ab7.jpg!q70.dpg.webp"
        }
      ],

      gridData: [
        {
          title: "聚划算",
          icon: require("../../assets/icon/10.png")
        },
        {
          title: "排行榜",
          icon: require("../../assets/icon/11.png")
        },
        {
          title: "大额券",
          icon: require("../../assets/icon/13.png")
        },
        {
          title: "品牌购",
          icon: require("../../assets/icon/14.png")
        },
        {
          title: "床上用品",
          icon: require("../../assets/icon/20.png")
        },
        {
          title: "家用电器",
          icon: require("../../assets/icon/21.png")
        },
        {
          title: "母婴",
          icon: require("../../assets/icon/22.png")
        },
        {
          title: "女包",
          icon: require("../../assets/icon/23.png")
        }
      ],

      pageData: null
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
  },
  methods: {
    shopDetil(item){
      // console.log(item);
      this.$router.push({name:'detail',params: { item }});
    }


  }
};
</script>

<style lang="less" scoped>
.home {
  padding-top: 14px;
}

/* 加载框  */
.load {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: #000;
  opacity: 0.5;
}

.tip {
  width: 1.5rem;
  height: 0.3rem;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0 auto;
}

.tip > i {
  width: 0.15rem;
  height: 0.15rem;
  display: inline-block;
  background: #4dc0f3;
  border-radius: 50%;
  position: absolute;
}

.tip > i:nth-child(1) {
  top: 0.05rem;
  left: 0.15rem;
  animation: loading 0.4s linear 0s infinite alternate;
}

.tip > i:nth-child(2) {
  top: 0.05rem;
  left: 0.5rem;
  animation: loading 0.4s linear 0.1s infinite alternate;
}

.tip > i:nth-child(3) {
  top: 0.05rem;
  left: 0.8rem;
  animation: loading 0.4s linear 0.2s infinite alternate;
}

.tip > i:nth-child(4) {
  top: 0.05rem;
  left: 1.1rem;
  animation: loading 0.4s linear 0.3s infinite alternate;
}

@keyframes loading {
  0% {
    top: 0;
  }

  100% {
    top: 0.1rem;
  }
}

.search-box {
  .scan-img {
    width: 35px;
    height: 35px;
  }
}
.tab {
  height: 551px;
  overflow-y: auto;
  .box {
    height: 300px;
    text-align: center;
    line-height: 300px;
  }
  .van-tab__pane {
    padding: 10 0px;
  }
  .rotation {
    height: 180px;
    background: #eee;
  }
}
.grid-box {
  // height: 150px;
  overflow: hidden;
  text-align: center;
  margin-top: 10px;
  ul li {
    float: left;
    width: 25%;
  }
  .img-box {
    padding: 5px 0;
    margin: 0 auto;
    width: 50px;
    height: 50px;
  }
  .card span {
    font-size: 16px;
    color: #333;
  }
}
.exhibi-box {
  overflow: hidden;
  .imgs {
    width: 167px;
    height: 100px;
    margin: 0 auto;
    // background: #ddd;
    padding: 10px;
    float: left;
    img {
      border-radius: 10px;
    }
  }
}
.sell-well {
  overflow: hidden;

  .sell {
    height: 30px;
    font-size: 16px;
    padding: 10px;
    color: #333;
    border-top: 5px solid #eee;
    span {
      line-height: 30px;
    }
  }
  .more-icon {
    margin: 5px 2px;
  }
  .well {
    border-top: 2px solid #eee;
  }
  .crad {
    float: left;
    width: 28%;

    // height: 100px;
    // background: #ddd;
    padding: 10px;
    .crad-img {
      width: 100%;
      height: 70px;
      // background: #eee;
    }
    .crad-name {
      font-size: 14px;
      padding: 5px 0;
      color: #666;
    }
    .crad-price {
      font-size: 14px;
      color: #f23030;
    }
  }
}

.find-more {
  .sell {
    height: 30px;
    font-size: 16px;
    padding: 10px;
    color: #333;
    border-top: 5px solid #eee;
    border-bottom: 1px solid #eee;
    span {
      line-height: 30px;
    }
  }
}
.more-list {
  .more-item {
    float: left;
    width: 50%;
    height: 267px;
    margin-top: 5px;
  }
  .more-img {
    background: #fff;
    padding: 0 5px;
    height: 176px;
  }

  .more-details {
    span {
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      padding: 3px 5px;
    }
    .price {
      font-size: 16px;
      color: #f23030;
      float: left;
    }
    .identical {
      float: right;
      font-size: 12px;
      margin-top: 5px;
      margin-right: 5px;
      color: #444;
      border: 1px solid #eee;
    }
  }
}
</style>