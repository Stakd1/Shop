class RouteComponent {

  indexComponent(resolve) {
    return require(['../views/homeViews/Index.vue'], resolve);
  }
  homeComponent(resolve) {
    return require(['../views/homeViews/Home.vue'], resolve);
  }
  detailComponent(resolve) {
    return require(['../views/homeViews/Detail.vue'], resolve);
  }



  addressComponent(resolve) {
    return require(['../views/myViews/Address.vue'], resolve);
  }
  editComponent(resolve) {
    return require(['../views/myViews/Edit.vue'], resolve);
  }
 
 






  msgComponent(resolve) {
    return require(['../views/homeViews/Msg.vue'], resolve);
  }
  shopComponent(resolve) {
    return require(['../views/homeViews/Shop.vue'], resolve);
  }
  myComponent(resolve) {
    return require(['../views/homeViews/My.vue'], resolve);
  }




  registerComponent(resolve) {
    return require(['../views/Register.vue'], resolve);
  }

  loginComponent(resolve) {
    return require(['../views/Login.vue'], resolve);
  }
  forgetComponent(resolve) {
    return require(['../views/Forget.vue'], resolve);
  }


}
//导出路由组件
export const routeComponent = new RouteComponent();
