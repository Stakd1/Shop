<template>
  <div class="msg">
    <div class="seach">
      <van-search placeholder="请输入搜索关键词" v-model="value" />
    </div>
    <van-row class="msg-box" type="flex">
      <van-col class="cation" span="6">
        <ul class="list">
          <li
            :class="{active: item.isSelect}"
            v-for="(item,index) in protypeData"
            :id="item.typeId"
            :key="index"
            @click="toggleType(item,index)"
          >{{item.typeTitle}}</li>
        </ul>
      </van-col>
      <van-col class="content" span="18">
        <div
          class="content-list"
          v-for="(item,index) in protypeduct"
          :key="index"
          @click="getProductDetails(item)"
        >
          <div class="content-img">
            <img class="auto-img" :src="item.imgurl" alt />
          </div>
          <span>{{item.pname}}</span>
        </div>
        <!-- <div class="content-list">
          <div class="content-img">图片</div>
          <span>商品名称</span>
        </div>
        <div class="content-list">
          <div class="content-img">图片</div>
          <span>商品名称</span>
        </div> -->
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "msg",
  data() {
    return {
      // imgBaseUrl: "http://192.168.0.104:10020/assets/",
      value: "",
      protypeData: null,
      activeIndex: 0,

      protypeduct: null
    };
  },
  created() {
    this.axios({
      method: "GET",
      url: "/api/shop"
    })
      .then(data => {
        // console.log("data==>", data.data.data.msg);
        // result.data.data.forEach((v, i) => {
        //   v.isSelect = i == 0;
        // });

        // this.types = result.data.data.concat();
        // this.getData(this.types[0].typeId);
        // this.protypeData = result.data.data;
        // console.log(this.protypeData);
        this.protypeData = data.data.data.msg;
        this.protypeData.forEach((v, i) => {
            v.isSelect = i == 0;
          });

      })
      .catch(err => {
        console.log("请求出错");
      });

    this.getData("mingjiuyouxuan");
  },
  methods: {
    //根据id获取对应数据
    getData(typeId) {
     
      this.axios({
        method: "GET",
        url: "/api/shop"
      })
        .then(data => {
          // console.log("data=>", data.data.data.product);
          // this.protypeduct = result.data.result.rows;
          let arr = data.data.data.product;
          
          this.protypeduct = [];

          arr.filter((item, index) => {
            // console.log(item.ptype)

            if (item.ptype === typeId) {
              // console.log(item);
              // item.isSelect = true;
              this.protypeduct.push(item); //  console.log(item.ptype === typeId)

            }
          });
        })
        .catch(err => {
          console.log("err=>", err);
        });
    },

    toggleType(item, index) {
      if (item.isSelect) {
        return;
      }
      this.protypeData[this.activeIndex].isSelect = false;
      this.activeIndex = index;
      item.isSelect = true;

      this.getData(item.typeId);
    },

    //查看商品详情
    getProductDetails(item) {
      console.log(item);
      
      this.$router.push({ name: "detail", params: { item }})
        
      
    }
  }
};
</script>

<style lang="less" scoped>
.msg {
  .msg-box {
    position: fixed;
    width: 100%;
    height: calc(100% - 50px - 54px);
    background: #ddd;
  }
  .cation {
    background: #eee;
    overflow-y: auto;
  }
  //隐藏滚动条
  .cation::-webkit-scrollbar {
    display: none;
  }
  .list {
    font-size: 16px;
    color: #666;
    li {
      text-align: center;
      padding: 12px 0;
    }
    .active {
      background: #fff;
      color: #e93b3d;
    }
  }
  .content {
    // padding: 10px;
  }
  .content-list {
    width: 26.2%;
    height: 85px;
    background: #fff;
    padding: 10px;
    float: left;
    color: #333;
    text-align: center;
    .content-img {
      height: 60px;
      background: #eee;
      
    }
    span {
      display: block;
      margin-top: 5px;
    }
  }
}
</style>