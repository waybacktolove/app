<template>
	<view class="mbit">
		<u-navbar :backIconSize="38" title="MBIT测试题"></u-navbar>
		<view class="example-body"><uni-steps :options="list1" active-color="#00D1A0" :active="active" /></view>
		<swiper :current="currentIndex - 1" @change="changeIndex" :duration="300">
			<swiper-item v-for="(item, index) in list" :key="item.id">
				<view class="swiper-item">
					<view class="test-title">{{ currentIndex }}.123144sdashdjkhsahdshadsqadasdsadsa</view>
					<view class="list">
						<view class="item" :class="value === index ? 'active' : ''" v-for="(item, index) in items" :key="item.name">
							<image class="radio-img" :src="value === index ? '../../static/mbit/ac.png' : '../../static/mbit/d.png'" mode="widthFix"></image>
							<view @tap="radioChange(index)" class="text">1111111111111111111111111111111123333333333333333333313213132145465446546546</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<!-- 底部操作 -->
		<view class="action">
			<image @tap="back()" :class="currentIndex !== 1 ? 'open' : 'close'" class="action-btn" src="../../static/mbit/back.png" mode="widthFix"></image>
			<view v-show="currentIndex !== 1 && currentIndex !== list.length" class="center-box"></view>
			<view class="action-btn" :class="currentIndex !== list.length ? 'open' : 'close'">
				<image @tap="next()" class="action-btn" src="../../static/mbit/next.png" mode="widthFix"></image>
			</view>
		</view>
		<!-- 弹窗 -->
		<u-popup v-model="show" mode="center" length="90%" border-radius="42" :maskCloseAble="false">
			<view class="alert">
				<view class="alert-title">恭喜您完成测试！</view>
				<image class="alert-img" src="../../static/mbit/alert.png" mode="widthFix"></image>
				<view class="alert-dis">
					<text class="alert-time">5秒</text>
					后自动跳转结果页
				</view>
				<u-button shape="circle" type="primary" class="alert-btn" @tap="lookResult">查看结果</u-button>
				<u-button shape="circle" type="default">继续-霍兰德职业兴趣测试</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
import uniSteps from '@/uview-ui/components/uni-steps/uni-steps.vue';
export default {
	components: {
		uniSteps
	},
	data() {
		return {
			value: '',
			active: 0,
			list1: [
				{
					title: '0'
				},
				{
					title: '30'
				},
				{
					title: '60'
				},
				{
					title: '90'
				},
				{
					title: '120'
				}
			],
			list: [
				{
					id: 1014222,
					title: '32121'
				},
				{
					id: 10142,
					title: '32121'
				},
				{
					id: 1014123,
					title: '32121'
				}
			],
			currentIndex: 1,
			heightS: 0,
			items: [
				{
					name: 'apple',
					checked: false,
					disabled: false
				},
				{
					name: 'banner',
					checked: false,
					disabled: false
				}
			],
			current: 0,
			show: false
		};
	},
	onShow() {
		// 获取屏幕高度
		uni.getSystemInfo({
			success: function(res) {
				this.heightS = res.windowHeight;
			}
		});
	},
	onBackPress() {
		uni.showToast({
			title: '46545'
		});
	},
	onLoad() {
		let id = uni.getStorageSync('id');
		this.$api.request('data/title', 'GET', { id: id }, false, false, false).then(res => {
			let arr = res.data.list;
			// this.list = arr.sort(() => Math.random() - 0.5);
		});
	},
	methods: {
		// 查看结果
		lookResult() {
			uni.navigateTo({
				url: '../result/result'
			});
		},
		radioGroupChange(e) {
			console.log(e);
			console.log(this.value);
		},
		// 单选按钮
		radioChange: function(index) {
			console.log(index);
			this.value = index;
			// this.items.filter((res, index) => (res.value === evt.target.value ? (this.current = index) : (this.current = this.current)));
			// this.next();
			if (this.currentIndex === this.list.length) {
				this.show = true;
				return;
			}
		},
		// 滑动页面选择
		changeIndex(e) {
			this.currentIndex = e.detail.current + 1;
			this.setup();
		},
		// 下一页
		next() {
			this.currentIndex++;
			this.setup();
		},
		// 上一页
		back() {
			if (this.currentIndex === 1) return;
			this.currentIndex--;
			this.setup();
		},
		//进度
		setup() {
			if (this.currentIndex > 29) {
				this.active = 1;
			} else if (this.currentIndex > 59) {
				this.active = 2;
			} else if (this.currentIndex > 89) {
				this.active = 3;
			} else {
				this.active = 0;
			}
		}
	}
};
</script>

<style lang="scss">
input[type='radio']:checked {
	background-color: red;
	box-shadow: 0 0 0 3px orange;
}
page,
.mbit {
	background-color: #f5f7fa;
}
.example-body {
	padding-top: 60rpx;
	margin-bottom: 50rpx;
}
.test-menue {
	bottom: 0;
	left: 0;
	position: fixed;
	right: 0;
	padding: 0 20rpx;
	display: flex;
	justify-content: space-between;
	height: 80rpx;
	background-color: #e5e5e5;
	align-items: center;
	color: #000000;
	font-size: 30rpx;
}
uni-swiper {
	height: 844rpx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 12rpx 18rpx 2rpx rgba(215, 222, 231, 0.18);
	border-radius: 36rpx;
	margin: 0 40rpx;
}
.swiper-item {
	padding: 60rpx 35rpx;
	.test-title {
		font-size: 36rpx;
		font-weight: bold;
		color: rgba(48, 114, 246, 1);
		line-height: 54rpx;
		word-wrap: break-word;
		padding-bottom: 50rpx;
		border-bottom: 1rpx solid rgba(225, 225, 225, 1);
		margin-bottom: 60rpx;
	}
	.list {
		.item {
			font-size: 30rpx;
			display: flex;
			align-items: center;
			padding: 34rpx 24rpx;
			color: #3072f6;
			transition: all 0.3s linear;
			.radio-img {
				width: 24rpx;
				height: 24rpx;
				flex-shrink: 1;
			}
			.text {
				width: 90%;
				padding-left: 20rpx;
				word-wrap: break-word;
			}
		}
		.active {
			background-color: #f5f8fe;
		}
	}
}
.uni-list-cell {
	display: flex;
	font-size: 28rpx;
	.radio {
		transform: scale(0.7);
	}
}
.action {
	margin-top: 50rpx;
	display: flex;
	justify-content: center;
	.center-box {
		width: 220rpx;
	}
	.action-btn {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		transition: all 0.2s linear;
	}
	.close {
		opacity: 0;
		transform: translateY(40px);
		width: 0;
		height: 0;
	}
	.open {
		opacity: 1;
		transform: translateY(0px);
	}
}
.alert {
	text-align: center;
	padding: 100rpx 60rpx;
	height: 1050rpx;
	.alert-title {
		font-size: 36rpx;
		font-weight: bold;
		color: rgba(17, 17, 17, 1);
	}
	.alert-dis {
		font-size: 22rpx;
		color: #666666;
		.alert-time {
			color: #ff2525;
			font-weight: bold;
		}
	}
	.alert-btn {
		margin-top: 46rpx;
		margin-bottom: 40rpx;
		box-shadow: 0px 6px 10px 1px rgba(37, 141, 255, 0.2);
	}
	.alert-img {
		width: 500rpx;
		height: 346rpx;
		margin: 80rpx 0;
	}
}
</style>
