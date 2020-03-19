<template>
  <div class="index">
    <router-view></router-view>
     <van-tabbar  active-color="#FC4215" v-model="tabActive"  class="item-box">
      <van-tabbar-item
        :dot="item.isHasDot"
        :name="item.name"
        v-for="(item,index) in diyItemData"
        :key="index"
        @click="getViews(item.name)"
      >
        <span>{{item.title}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? item.icon.active : item.icon.inactive"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      tabActive: "home",
       diyItemData: [
        {
          title: "首页",
          name: "home",
          icon: {
            active: require("../../assets/icon/4-1.png"),
            inactive: require("../../assets/icon/4.png")
          },
          isHasDot: false,
          info: 0
        },
        {
          title: "分类",
           name: "msg",
          icon: {
            active: require("../../assets/icon/5-1.png"),
            inactive: require("../../assets/icon/5.png")
          },
          isHasDot: false,
          info: 0
        },
        {
          title: "购物车",
           name: "shop",
          icon: {
            active: require("../../assets/icon/6-1.png"),
            inactive: require("../../assets/icon/6.png")
          },
          isHasDot: false,
          info: 0
        },
        {
          title: "我",
          name: "my",
          icon: {
            active: require("../../assets/icon/7-1.png"),
            inactive: require("../../assets/icon/7.png")
          },
          isHasDot: false,
          info: 0
        }
      ],
    };
  },
   mounted() {

     this.tabActive = this.$router.history.current.name;
    // console.log(this.$router.history.router.history.router);
    
  },
  methods: {
    getViews(n) {
      // console.log(n);
      this.$router.push({ name: n });
    }
  }
};
</script>
<style lang="less" scoped>

</style>