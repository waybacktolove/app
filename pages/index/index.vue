<template>
	<view class="content">
		<view class="head"><view class="head-nav">测试题库</view></view>
		<view class="center">
			<image class="center-img" src="../../static/head.png" mode="widthFix"></image>
			<u-button v-for="(item,index) in list" :key="item.title" shape="circle" class="btn-boder" :type="index%2 === 0 ? 'primary' : 'default'" :ripple="true" ripple-bg-color="#BCD2EB" @tap="goUser(item.id)">{{item.title}}</u-button>
			<!-- <u-button shape="circle" :ripple="true" ripple-bg-color="#BCD2EB" @tap="goUser">霍兰德职业兴趣测试</u-button> -->
		</view>
		<view class="center-bottom">
			<view class="">注：</view>
			<view>1.参加测试的人员请务必诚实、独立的回答问题，只有如此，才能得到 有效的结果。</view>
			<view class="">2.请根据对每一题目的第一印象作答，不必仔细推敲，答案没有好坏、 对错之分</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: []
		};
	},
	onLoad() {
		this.getList();
	},
	methods: {
		// 获取数据
		getList() {
			this.$api.request('data', 'GET', {}, false, false, false).then(res => {
				this.list = res.data;
			});
		},
		goUser(id) {
			uni.setStorage({
				key:'id',
				data:id
			})
			this.$goTo('/pages/login/index');
		}
	}
};
</script> :ripple="true" ripple-bg-color="#BCD2EB" @tap="goUser">MBIT测试

<style lang="scss" scoped>
.content {
	.head {
		height: 422rpx;
		background: no-repeat center center url(../../static/bg.png);
	}
	.head-nav {
		text-align: center;
		font-size: 32rpx;
		height: 150rpx;
		line-height: 150rpx;
		color: #ffffff;
	}
	.center {
		background-color: #ffffff;
		border-radius: 46rpx;
		margin: -224rpx 40rpx 0;
		text-align: center;
		padding: 110rpx 100rpx;
		.btn-boder {
			// border-radius: 50rpx 50rpx 0 50rpx !important;
			margin-bottom: 42rpx;
		}
		.u-round-circle {
			// &:after{
			// 	border-radius: 50rpx 50rpx 0 50rpx !important;
			// 	border: 2px solid #606266;
			// }
		}
		.center-img {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			margin-bottom: 70rpx;
		}
	}
	.center-bottom {
		margin: 50rpx 40rpx;
		font-size: 28rpx;
		color: rgba(138, 138, 138, 1);
		line-height: 50rpx;
	}
}
</style>
