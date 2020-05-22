<template>
	<view class="mbit">
		<u-navbar :backIconSize="38" :title="id === 1 ? 'MBIT测试题' : '霍兰德测试题'"></u-navbar>
		<view class="example-body"><uni-steps :options="list1" active-color="#00D1A0" :active="active" /></view>
		<swiper :current="currentIndex - 1" @change="changeIndex" :disableTouch="true" :duration="300">
			<swiper-item v-for="(item, index) in list" :key="item.id">
				<view class="swiper-item">
					<view class="test-title">{{ currentIndex }}.{{ item.title }}</view>
					<view class="list">
						<view
							class="item"
							:class="selecList[index].answer == item.answer[questionIndex] ? 'active' : ''"
							v-for="(qitem, questionIndex) in item.question"
							:key="qitem"
						>
							<image
								class="radio-img"
								:src="selecList[index].answer == item.answer[questionIndex] ? '../../static/mbit/ac.png' : '../../static/mbit/d.png'"
								mode="widthFix"
							></image>
							<view @tap="radioChange(index, questionIndex)" class="text">{{ qitem }}</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<!-- 底部操作 -->
		<view class="action">
			<image @tap="back()" :class="currentIndex !== 1 ? 'open' : 'close'" class="action-btn" src="../../static/mbit/back.png" mode="widthFix"></image>
			<!-- 			<view v-show="currentIndex !== 1 && currentIndex !== list.length" class="center-box"></view>
			<view class="action-btn" :class="currentIndex !== list.length ? 'open' : 'close'">
				<image @tap="next()" class="action-btn" src="../../static/mbit/next.png" mode="widthFix"></image>
			</view> -->
		</view>
		<!-- 弹窗 -->
		<u-popup v-model="show" mode="center" length="90%" border-radius="42" :maskCloseAble="false">
			<view class="alert">
				<view class="alert-title">恭喜您完成测试！</view>
				<image class="alert-img" src="../../static/mbit/alert.png" mode="widthFix"></image>
				<view class="alert-dis">
					<text class="alert-time">{{ time }}秒</text>
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
var timer;
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
				}
			],
			list: [],
			currentIndex: 1,
			selecList: [],
			heightS: 0,
			current: 0,
			show: false,
			time: 5,
			id: 0
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
		// uni.showToast({
		// 	title: '46545'
		// });
	},
	onLoad() {
		let id = uni.getStorageSync('id');
		this.id = uni.getStorageSync('id');
		this.$api.request('data/title', 'GET', { id: id }, false, true, false).then(res => {
			// console.log(res.data);
			this.list = res.data;
			let arr = res.data;
			arr.filter(res => {
				res.question = res.question.split('||');
				res.answer = res.answer.split(',');
				this.selecList.push({ id: '', answer: '', section_id: '' });
			});
			console.log(this.selecList);
		});
	},
	onHide() {
		clearInterval(timer);
	},
	methods: {
		// 查看结果
		lookResult() {
			clearInterval(timer);
			uni.redirectTo({
				url: '../result/result?code='+this.result_code
			});
		},
		// 单选按钮
		radioChange: function(index, questionIndex) {
			let data = {
				id: this.list[index].id,
				answer: this.list[index].answer[questionIndex],
				section_id: this.list[index].section_id
			};
			// this.selecList[index] = data; //视图不更新
			this.selecList.splice(index, 1, data); //视图更新
			console.log(this.selecList);
			this.value = questionIndex;
			console.log(this.value);
			setTimeout(() => {
				this.next();
			}, 100);
		},
		// 滑动页面选择
		changeIndex(e) {
			this.currentIndex = e.detail.current + 1;
			this.setup();
		},
		// 下一页
		next() {
			this.setup();
			if (this.currentIndex === this.list.length) {
				
				this.sendRsult();
			} else {
				this.currentIndex++;
			}
		},
		// 上一页
		back() {
			if (this.currentIndex === 1) return;
			this.currentIndex--;
			this.setup();
		},
		//进度
		setup() {
			if (this.currentIndex > 29 && this.currentIndex < 60) {
				this.active = 1;
			} else if (this.currentIndex > 59 && this.currentIndex < 90) {
				this.active = 2;
			} else if (this.currentIndex > 89 && this.currentIndex < 119) {
				this.active = 3;
			}
			// else if (this.currentIndex > 119) {
			// 	this.active = 4;
			// }
			else {
				this.active = 0;
			}
		},
		// 提交
		sendRsult() {
			let formData = {
				data_id: uni.getStorageSync('id'),
				list: this.selecList
			};
			this.$api.request('data/subdata', 'POST', formData, false, false, false).then(res => {
				this.result_code = res.data.result_code
				this.show = true;
				timer = setInterval(() => {
					this.time--;
					if (this.time === 0) {
						clearInterval(timer);
						uni.redirectTo({
							url: '../result/result?code=' + this.result_code
						});
					}
				}, 1000);
			});
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
			// transition: all 0.3s linear;
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
			color: #3072f6;
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
