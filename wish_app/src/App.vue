<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
//样式初始化
h1,
h2,
h3,
h4,
h5,
h6,
p {
  padding: 0;
  margin: 0;
}
body {
  margin: 0 auto;

}
.fl {
  float: left;
}
.fr {
  float: right;
}
.auto-img {
  width: 100%;
  height: 100%;
  display: block;
}
.clearfix::after {
  content: "";
  clear: both;
  display: block;
}
input {
  border: none;
  outline: none;
}
button {
  background: transparent;
  border: none;
  padding: 0;
}
</style>
