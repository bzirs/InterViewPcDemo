/**
 * @Author: bzirs
 * @Date: 2022-12-08 15:42:59
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-09 22:21:40
 * @FilePath: /interview-pc/src/main.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入elem
import '@/utils/element'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
