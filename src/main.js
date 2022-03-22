import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/css/reset.css'
import '@/assets/css/iconfont.css'
import api from '@/api/index'
import i18n from '@/language/index'//语言插件
import '@/router/permission' //路由拦截
import '@/utils/localstorage'
import * as echarts from 'echarts'
import '@/excel/Blob'
import '@/excel/Export2Excel'
Vue.prototype.$api = api
Vue.prototype.$echarts = echarts  //挂载到vue原型上
Vue.config.productionTip = false

//持久化


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
