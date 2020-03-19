import {
  routeComponent
} from './routeComponent'

export const routes = [{
    path: '/',
    name: 'index',

    //路由可见 ， 懒加载组件
    //commonJS规范 module.exports导出， require()导入
    //ES6规范 export导出 import导入

    component: routeComponent.indexComponent,
    children: [{
        path: '/home',
        name: 'home',
        component: routeComponent.homeComponent,
      },
      {
        path: '/msg',
        name: 'msg',
        component: routeComponent.msgComponent
      },
      {
        path: '/shop',
        name: 'shop',
        component: routeComponent.shopComponent
      },
      {
        path: '/my',
        name: 'my',
        component: routeComponent.myComponent
      },

    ],
    path: '/home',
    redirect: {
      name: 'home'
    }

  },
  {
    path: '/detail',
    name: 'detail',
    component: routeComponent.detailComponent
  },

  //收货地址
  {
    path: '/address',
    name: 'address',
    component: routeComponent.addressComponent,
  },
  //设置收货地址
  {
    path: '/edit',
    name: 'edit',
    component: routeComponent.editComponent,
  },



  //注册
  {
    path: '/register',
    name: 'register',
    component: routeComponent.registerComponent
  },
  //登录
  {
    path: '/login',
    name: 'login',
    component: routeComponent.loginComponent
  },
  //找回
  {
    path: '/forget',
    name: 'forget',
    component: routeComponent.forgetComponent
  },
  {
    path: '*',
    redirect: {
      name: 'home'
    }
  }

]
