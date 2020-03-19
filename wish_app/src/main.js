import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

import VueAxios from 'vue-axios'

import VueCookies from 'vue-cookies'
//基于meta设置rem
import 'lib-flexible/flexible'

import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



//设置基础请求路径
// axios.defaults.baseURL = 'http://192.168.0.104:10020'

//设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//导入vant
import {
  Icon,
  Button,
  NavBar,
  Search,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Image,
  Row,
  Col,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Stepper,
  Divider,
  Cell,
  CellGroup,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  Sku,
  AddressList,
  AddressEdit
} from 'vant';

//注册vant组件
Vue
  .use(Icon)
  .use(Button)
  .use(NavBar)
  .use(Search)
  .use(Tab)
  .use(Tabs)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Grid)
  .use(GridItem)
  .use(Image)
  .use(Row)
  .use(Col)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Stepper)
  .use(Divider)
  .use(Cell)
  .use(CellGroup)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(GoodsActionIcon)
  .use(Sku)
  .use(AddressList)
  .use(AddressEdit)
Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.use(VueCookies)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
