import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import VCalendar from 'v-calendar'

Vue.config.productionTip = false
Vue.use(VCalendar)
Vue.filter('date', dateFilter)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
