<template>
	<view class="content">
		<view class="center_box">
			<view class="header_icon">
				<view class="header_box " :class="[sexsDefault === 2 ? '' : sex === 0 ? 'close' : '']">
					<image v-if="sexsDefault !== 2" class="swich" src="../../static/switch.png" mode="widthFix"></image>
					<image src="../../static/icon/head_boy.png" class="sexClass" mode="" @click="chooseSex(1)"></image>
				</view>
				<text v-if="sexsDefault === 2" class="header_or">-or-</text>
				<view class="header_box  " :class="[sexsDefault === 2 ? '' : sex === 1 ? 'close' : '']">
					<image v-if="sexsDefault !== 2" class="swich" src="../../static/switch.png" mode="widthFix"></image>
					<image src="../../static/icon/head_girl.png" mode="" @click="chooseSex(0)"></image>
				</view>
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
				<u-button
					shape="circle"
					:disabled="sex === 3 || name === '' || school === '' || tel === ''"
					type="primary"
					:ripple="true"
					ripple-bg-color="#BCD2EB"
					@click="confirm"
				>
					开始测试
				</u-button>
			</view>
			<view class="text">注：参加测试的人员请务必诚实、独立的回答问题，只有 如此，才能得到有效的结果。</view>
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
			sexsDefault: 2,
			sex: 3,
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
				gender: this.sex,
				username: this.name,
				school: this.school,
				mobile: this.tel
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
					});
					return;
				}
			}
			this.login(data);
			// this.$goTo('/pages/mbit/mbit');
		},
		// 登录
		login(data) {
			this.$api.request('user/register', 'POST', data, false, true, false).then(res => {
				console.log(res.data.userinfo);
				try {
				    uni.setStorageSync('userInfo', res.data.userinfo);
				} catch (e) {
					console.log('erroe'+e)
				}
				this.$goTo('/pages/mbit/mbit');
			});
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
			if (this.sex === index) {
				this.sexsDefault = 2;
				this.sex = 3;
				return;
			}
			this.sexsDefault = index;
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
	// height: 100vh;
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
			justify-content: center;
			padding: 0 50rpx;
			align-items: center;
			.header_box {
				height: 128rpx;
				width: 128rpx;
				transition: all 0.3s linear;
				position: relative;
				.swich {
					position: absolute;
					z-index: 50;
					bottom: 0;
					width: 34rpx;
					height: 34rpx;
					right: 0;
				}
				image {
					height: 100%;
					width: 128rpx;
					border-radius: 50%;
				}
			}
			.header_or {
				margin: 0 40rpx;
			}

			.close {
				opacity: 0;
				width: 0;
				height: 0;
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
	.text {
		font-size: 22rpx;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
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
