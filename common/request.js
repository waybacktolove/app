/**
 * 常用方法封装 请求，文件上传等
 * @author echo. 
 **/

const tui = {
	//接口地址
	interfaceUrl: function() {
		return 'http://49.233.15.235:3000/mock/11/test/'
	},
	toast: function(text, duration, success) {
		uni.showToast({
			title: text || "出错啦~",
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	modal: function(title, content, showCancel, callback, confirmColor, confirmText) {
		uni.showModal({
			title: '提示',
			content: content,
			showCancel: showCancel,
			cancelColor: "#555",
			confirmColor: confirmColor || "#5677fc",
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			}
		})
	},
	isAndroid: function() {
		const res = uni.getSystemInfoSync();
		console.log(res.platform.toLocaleLowerCase())
		return res.platform.toLocaleLowerCase() == "android"
	},
	constNum: function() {
		let time = 0;
		// #ifdef APP-PLUS
		time = this.isAndroid() ? 300 : 0;
		// #endif
		return time
	},
	delayed: null,
	/**
	 * 请求数据处理
	 * @param string url 请求地址
	 * @param string method 请求方式
	 *  GET or POST
	 * @param {*} postData 请求参数
	 * @param bool isDelay 是否延迟显示loading
	 * @param bool isForm 数据格式
	 *  true: 'application/x-www-form-urlencoded'
	 *  false:'application/json'
	 * @param bool hideLoading 是否隐藏loading
	 *  true: 隐藏
	 *  false:显示
	 */
	request: function(url, method, postData, isDelay, isForm, hideLoading) {
		//接口请求
		let loadding = false;
		tui.delayed && uni.hideLoading();
		clearTimeout(tui.delayed);
		tui.delayed = null;
		if (!hideLoading) {
			tui.delayed = setTimeout(() => {
				uni.showLoading({
					mask: true,
					title: '请稍候...',
					success(res) {
						loadding = true
					}
				})
			}, isDelay ? 1000 : 0)
		}

		return new Promise((resolve, reject) => {
			uni.request({
				url: tui.interfaceUrl() + url,
				data: postData,
				header: {
					'content-type': isForm ? 'application/x-www-form-urlencoded' : 'application/json',
					// 'Authorization': tui.getToken()
				},
				method: method, //'GET','POST'
				dataType: 'json',
				success: (res) => {
					clearTimeout(tui.delayed)
					tui.delayed = null;
					if (loadding && !hideLoading) {
						uni.hideLoading()
					}
					// if (res.data && res.data.code == 1) {
					// 	uni.clearStorageSync()
					// 	tui.modal("登录信息已失效，请重新登录", false, () => {
					// 		//store.commit("logout") 登录页面执行
					// 		uni.redirectTo({
					// 			url: '/pages/common/login/login'
					// 		})
					// 	})
					// 	return
					// }
					if(res.data.errcode!==0){
						uni.showToast({
							title:res.data.errmsg,
							icon:"none"
						})
					}else{
						resolve(res.data)
					}
				},
				fail: (res) => {
					clearTimeout(tui.delayed)
					tui.delayed = null;
					tui.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})
	},
}

export default tui