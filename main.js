import Vue from 'vue'
import App from './App'
import store from './store'
// import store from '@/store'; 



Vue.config.productionTip = false
// 跳转全局挂载
Vue.prototype.$goTo = (url) => {
	uni.navigateTo({
		url: url
	})
}



App.mpType = 'app'

// vuni-app的vuex改进写法，能够避免h5版本页面刷新导致状态丢失
// let vuexStore = require("@/store/$u.mixin.js");
// Vue.mixin(vuexStore);

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
	store,
	...App
})
app.$mount()
