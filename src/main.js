import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import VCalendar from 'v-calendar'
import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VCalendar)
Vue.filter('date', dateFilter)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
