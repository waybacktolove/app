r
<template>
	<view class="content">
		<view class="center_box">
			<view class="header_icon">
				<image src="../../static/icon/head_boy.png" :class="[sex == 1 ? 'sexClass' : '']" mode="" @click="chooseSex(1)"></image>
				<text>-or-</text>
				<image src="../../static/icon/head_girl.png" :class="[sex == 0 ? 'sexClass' : '']" mode="" @click="chooseSex(0)"></image>
			</view>
			<view class="form_area">
				<text class="label_class">名字</text>
				<input
					type="text"
					class="input_class"
					v-model="name"
					placeholder="请输入名字"
					placeholder-class="placeClass"
					:class="[isFocus == 1 ? 'focusClass' : '']"
					@focus="inputFocus(1)"
					@blur="blur"
				/>
				<text class="label_class label_special">学校</text>
				<input
					type="text"
					class="input_class"
					v-model="school"
					placeholder="请输入学校名字"
					placeholder-class="placeClass"
					:class="[isFocus == 2 ? 'focusClass' : '']"
					@focus="inputFocus(2)"
					@blur="blur"
				/>
				<text class="label_class label_special">手机</text>
				<input
					type="number"
					class="input_class"
					v-model="tel"
					placeholder="请输入手机号码"
					placeholder-class="placeClass"
					:class="[isFocus == 3 ? 'focusClass' : '']"
					@focus="inputFocus(3)"
					@blur="blur"
				/>
			</view>
			<view class="btn_area">
				<u-button shape="circle" :disabled="btnDisable" :plain="true" :ripple="true" ripple-bg-color="#BCD2EB" @click="confirm">开始测试</u-button>
			</view>
			<!-- toast提示 -->
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			sex: 1,
			mobile: '',
			name: '',
			school: '',
			tel: '',

			btnDisable: false,
			errorName: '',
			errorSchool: '',
			errorTel: '',

			/* 	errorName:'名字不能为空',
			errorSchool:'学校不能为空',
			errorTel:'电话不能为空', */
			/* focusClass: {
				'border-bottom': '2px solid #000',
				height: '98rpx',
				'box-shadow': '0px 12px 18px 2px rgba(215,222,231,0.18)'
			}, */
			focusClass: 'focusClass',
			input_class: {
				border: 'none'
			},
			placeClass: {
				'font-size': '28rpx',
				'font-family': 'PingFang SC',
				'font-weight': 'bold',
				color: '#ccc'
			},
			activeClass: {
				color: '#ccc !important'
			},
			isFocus: 0
			// activeColor: '#ccc'
		};
	},
	computed: {
		// 样式激活的样式
		/* activeColor() {
			return '#ccc';
		} */
	},
	onLoad() {},
	onShow() {
		// onShow周期中获取全局变量
		let globalData = getApp().globalData.projectName;
		/* console.log('全局变量值', globalData);
		console.log('用户登录状态', this.status);
		console.log('token值', this.vuex_token); */
	},
	computed: {
		...mapState(['vuex_token', 'vuex_status'])
	},
	methods: {
		...mapMutations(['changeStatus', 'changeUserInfo']),
		confirm() {
			let data = {
				sex: this.sex,
				name: this.name,
				school: this.school,
				tel: this.tel
			};
			// 直接存sessionStorage中
			for (let key in data) {
				console.log(data[key]);
				if (data[key].length == 0) {
					this.$refs.uToast.show({
						title: '内容不能为空',
						type: 'warning',
						position: 'top',
						duration: 1500
						// url: '/pages/user/index' //结束后跳转的页面路径
					});
					// return
				}
			}
			console.log('不请求')
			this.$goTo('/pages/test/index');
		},
		inputFocus(index) {
			console.log('获得焦点');
			console.log(index);
			this.isFocus = index;
		},
		blur() {
			this.isFocus = 0;
		},
		// 选择性别
		chooseSex(index) {
			//
			this.sex = index;
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	box-sizing: border-box;
	.center_box {
		margin: 40rpx 40rpx;
		background: #fff;
		width: calc(100% - 80rpx);
		height: calc(100% - 120rpx);
		box-sizing: border-box;
		border-radius: 42rpx;
		padding: 86rpx 60rpx;
		box-shadow: 0px 12px 18px 2px rgba(215, 222, 231, 0.18);
		.header_icon {
			height: 128rpx;
			margin-bottom: 80rpx;
			display: flex;
			justify-content: space-around;
			padding: 0 50rpx;
			align-items: center;
			image {
				height: 100%;
				width: 128rpx;
				border-radius: 50%;
			}
			.sexClass {
				box-sizing: border-box;
				border: 2px solid #2979ff;
			}
		}
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 50rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.form_area {
		width: 100%;
		.label_class {
			display: block;
			height: 25px;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(102, 102, 102, 1);
			margin-top: 38px;
		}
		.label_special {
			margin-top: 28rpx;
		}
		.input_class {
			border-bottom: 1px solid #ccc;
			height: 98rpx;
			line-height: 98rpx;
			box-sizing: border-box;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(17, 17, 17, 1);
		}
		.focusClass {
			box-sizing: border-box;
			border-bottom: 2px solid #258dff;
			box-shadow: 0px 12px 18px 2px rgba(215, 222, 231, 0.18);
		}
	}
	.btn_class {
		margin: 20rpx;
	}
	.btn_area {
		margin-top: 40rpx;
		padding: 40rpx 0;
		width: 100%;
	}
}

.header {
	height: 80rpx;
	// display: flex;
	text-align: center;
	line-height: 80rpx;
	justify-content: center;
}

.title {
	font-size: 34rpx;
	font-weight: bold;
	color: $u-content-color;
}

.button-demo {
	margin-top: 80rpx;
}

.link-demo {
	margin-top: 80rpx;
}
</style>
