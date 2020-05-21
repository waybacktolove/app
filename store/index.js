import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		vuex_token: '123654789',
		vuex_status: false, //登陆状态
		vuex_userInfo: null,
	},
	mutations: {
		// payload为用户传递的值，可以是单一值或者对象
		modifyToken(state, payload) {
			state.vuex_token = payload.token;
		},
		// 改变登录状态
		changeStatus(state, val) {
			state.vuex_status = val
		},
		// 存储用户信息
		changeUserInfo(state, val) {
			state.vuex_userInfo = val
		},
	}
})

export default store
