// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
// 引入全局变量
import global from './components/GLobal'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 兼容ie9
import 'babel-polyfill'
// 本地样式
import '../static/css/style.css'
//引入ueditor
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.js'




Vue.use(ElementUI)

Vue.config.productionTip = false

/*axios相关*/
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'; // "Accept": "application/json"
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;

Vue.prototype.GLOBAL = global;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
