r
<template>
	<view class="content">
		<!-- <view class="header"><text class="title">问卷测试</text></view> -->
		<view class="center_box">
			<view class="header_icon">
				<image src="../../static/logo.png" mode=""></image>
				<text>-or-</text>
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="form_area">
				<u-cell-group>
					<text class="label_class">名字</text>
					<u-field
						v-model="name"
						label-width="0"
						placeholder="请填写姓名"
						required
						:error-message="errorName"
						@focus="focusActive"
						@blur="focusFail"
						placeholder-style="font-size:28rpx;
									font-family:PingFang SC;
									font-weight:bold;
									color:#ccc;"
					></u-field>
					<text class="label_class">学校</text>
					<u-field
						v-model="school"
						label-width="0"
						placeholder="请填写学校名称"
						@focus="focusActive"
						@blur="focusFail"
						:error-message="errorSchool"
						placeholder-style="font-size:28rpx;
font-family:PingFang SC;
font-weight:400;
color:#ccc;"
					></u-field>
					<text class="label_class">电话</text>
					<u-field
						v-model="tel"
						label-width="0"
						placeholder="请填写学校名称"
						@focus="focusActive"
						@blur="focusFail"
						:field-style="focusClass"
						:error-message="errorSchool"
						placeholder-style="font-size:28rpx;
									font-family:PingFang SC;
									font-weight:bold;
									color:#ccc;"
					></u-field>
				</u-cell-group>
			</view>
			<view class="btn_area">
				<u-button shape="circle" :disabled="btnDisable" :plain="true" :ripple="true" ripple-bg-color="#BCD2EB" @click="confirm">开始测试</u-button>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
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
			focusClass: {
				'border-bottom': '2px solid #000',
				'box-shadow':'0px 12px 18px 2px rgba(215,222,231,0.18)'
			}
		};
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
				name: this.name,
				school: this.school,
				tel: this.tel
			};
			console.log(data);
			this.$goTo('/pages/test/index');
		},
		focusActive() {
			console.log('获得焦点');
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
	// padding: 40rpx;
	height: 100vh;
	box-sizing: border-box;
	.center_box {
		margin: 40rpx 40rpx;
		background: #fff;
		width: calc(100% - 80rpx);
		height: calc(100% - 80rpx);
		box-sizing: border-box;
		border-radius: 42rpx;
		padding: 86rpx 60rpx;
		box-shadow: 0px 12px 18px 2px rgba(215, 222, 231, 0.18);
		.header_icon {
			height: 128rpx;
			margin-bottom: 81rpx;
			display: flex;
			justify-content: space-around;
			padding: 0 40rpx;
			align-items: center;
			image {
				height: 100%;
				width: 128rpx;
				border-radius: 50%;
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
			margin-top: 4px;
		}
		/deep/.u-field {
			padding-left: 0;
			padding-right: 0;
			height: 98rpx;
		}
	}
	.btn_class {
		margin: 20rpx;
	}
	.btn_area {
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
