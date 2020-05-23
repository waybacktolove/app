<template>
	<view class="qiun-columns">
		<!-- <view><u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper></view> -->
		<u-sticky>
			<!-- 只能有一个根元素 -->
			<view class="sticky"><u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs></view>
		</u-sticky>
		<!-- MBIT -->
		<view class="" v-show="current == 0">
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt">王小二的测试报告</view>
			<view class="qiun-bg-white qiun-padding"><textarea class="qiun-textarea" auto-height="true" maxlength="-1" v-model="textarea" /></view>
			<view class="qiun-charts"><canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas></view>
			<view class="top_bg" :class="scrollTop > 150 ? 'show' : 'hide'" @tap="goTop"><u-avatar :src="topImag" mode="square"></u-avatar></view>
			<view class="" v-for="i in 50">{{ i }}</view>
		</view>
		<!-- 霍兰德 -->
		<view class="" v-show="current == 1">
			<!-- <u-empty text="暂无历史数据" mode="list"></u-empty> -->
			<view class="qiun-charts"><canvas canvas-id="canvasRadar" id="canvasRadar" class="charts" @touchstart="touchRadar"></canvas></view>
			<view class="" v-for="i in 50">{{ i }}</view>
			<view class="top_bg" :class="scrollTop > 150 ? 'show' : 'hide'" @tap="goTop"><u-avatar :src="topImag" mode="square"></u-avatar></view>
		</view>
		
		<!-- <view class="share"  @tap="goTop"><u-avatar :src="topImag" mode="square"></u-avatar></view> -->
		<!-- 		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" style="height: 100%;width: 100%;">
					<view class="">
						<view class="qiun-charts"><canvas canvas-id="canvasRadar" id="canvasRadar" class="charts" @touchstart="touchRadar"></canvas></view>
						<view class="" v-for="i in 50">{{ i }}</view>
					</view>
					<view class="top_bg" :class="scrollTop > 150 ? 'show' : 'hide'" @tap="goTop"><u-avatar :src="topImag" mode="square"></u-avatar></view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<view class="">
						<view class="qiun-bg-white qiun-title-bar qiun-common-mt"><view class="qiun-title-dot-light">标准数据格式</view></view>
						<view class="qiun-bg-white qiun-padding"><textarea class="qiun-textarea" auto-height="true" maxlength="-1" v-model="textarea" /></view>
						<view class="qiun-charts"><canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas></view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper> -->
	</view>
</template>

<script>
import uCharts from '@/common/u-charts/u-charts.js';
var _self;
var canvaRadar = null;
var canvaColumn = null;

export default {
	data() {
		return {
			list: [
				{
					name: 'MBIT测试结果'
				},
				{
					name: '霍兰德测试结果'
				}
			],
			scrollTop: 0,
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			textarea: '',
			topImag: require('../../static/Bttop_icon.png'),
			Radar: {
				categories: ['E', 'I', 'S', 'N', 'T', 'F'],
				series: [
					{
						data: [190, 210, 105, 35, 27, 102]
					}
				]
			},
			ColumnB: {
				categories: ['外向(E)', '内向(I)', '感觉(S)', '直觉(N)', '思考(T)', '情感(F)', '判断(J)', '知识(P)'],
				series: [
					{
						name: '',
						data: [
							{ value: 8, color: '' },
							{ value: 2, color: '#01D1A0' },
							{ value: 9, color: '' },
							{ value: 1, color: '#01D1A0' },
							{ value: 15, color: '' },
							{ value: 2, color: '#01D1A0' },
							{ value: 6, color: '' },
							{ value: 6, color: '#01D1A0' }
						]
					}
				]
			}
		};
	},
	onLoad(e) {
		_self = this;
		_self.result_code = e.code || '';
		_self.data_id = uni.getStorageSync('id');
		_self.current = parseInt(_self.data_id)-1 
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.getServerData();
	},
	// 导航栏按钮
	onNavigationBarButtonTap(e) {
		uni.share({
		    provider: "weixin",
		    scene: "WXSceneSession",
		    type: 0,
		    href: "http://uniapp.dcloud.io/",
		    title: "DS测试分享",
		    summary: "我正在使用DS测试MBIT，赶紧跟我一起来体验！",
		    imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
		    success: function (res) {
		        console.log("success:" + JSON.stringify(res));
		    },
		    fail: function (err) {
		        console.log("fail:" + JSON.stringify(err));
				uni.showToast({
					title:'分享失败',
					icon:"none"
				})
		    }
		});
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	methods: {
		change(index) {
			this.current = index;
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100
			});
		},
		goTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100
			});
		},
		print() {
			// window.print()
		},
		getServerData() {
			this.$api.request('data/getResult','GET',{ result_code: this.result_code,data_id:this.data_id }, false, true, false).then(res=>{
				let Radar = { categories: [], series: [] };
				// let arr = []
				// res.data.filter(o=>{
				// 	arr.push()
				// })
				// _self.Radar.categories = 
				Radar.categories = _self.Radar.categories;
				Radar.series = _self.Radar.series;
				// _self.textarea = JSON.stringify(res.data.data.Radar);
				_self.showRadar('canvasRadar', Radar);
				
			})
			// uni.request({
			// 	url: 'https://www.ucharts.cn/data.json',
			// 	data: {},
			// 	success: function(res) {
			// 		console.log(res.data.data);
			
			let Column = { categories: [], series: [] };
			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			Column.categories = _self.ColumnB.categories;
			Column.series = _self.ColumnB.series;
			// _self.textarea = JSON.stringify(res.data.data.ColumnB);
			_self.showColumn('canvasColumn', Column);
			// },
			// fail: () => {
			// 	_self.tips = '网络错误，小程序端请检查合法域名';
			// }
			// });
		},
		// 雷达图
		showRadar(canvasId, chartData) {
			canvaRadar = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'radar',
				fontSize: 11,
				padding: [15, 15, 0, 15],
				legend: {
					show: false,
					padding: 5,
					lineHeight: 11,
					margin: 0
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				dataLabel: true,
				categories: chartData.categories,
				series: chartData.series,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					radar: {
						max: 200 //雷达数值的最大值
					}
				}
			});
		},
		touchRadar(e) {
			// canvaRadar.touchLegend(e);
			// canvaRadar.showToolTip(e, {
			// 	format: function (item) {
			// 		return item.name + ':' + item.data
			// 	}
			// });
		},
		// 柱状图s
		showColumn(canvasId, chartData) {
			canvaColumn = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				padding: [15, 15, 0, 15],
				legend: {
					show: false,
					padding: 5,
					lineHeight: 11,
					margin: 0
				},
				fontSize: 10,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true
					// axisLabel: {
					// 	interval: 0,
					// 	rotate: 40
					// }
				},
				yAxis: {
					// show: false,
					// axisLabel: {
					// 	//---坐标轴 标签
					// 	show: true, //---是否显示
					// 	inside: false, //---是否朝内
					// 	rotate: 40, //---旋转角度
					// 	margin: 8, //---刻度标签与轴线之间的距离
					// 	color:'red',				//---默认取轴线的颜色
					// },
					data: [
						{
							position: 'right',
							axisLine: false
							// format: val => {
							// 	return 1;
							// }
						}
					]
				},
				dataLabel: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						type: 'group',
						width: (_self.cWidth * _self.pixelRatio * 0.45) / chartData.categories.length
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
uni-swiper {
	height: auto;
	margin-top: 20rpx;
}
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}

.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
.top_bg {
	position: fixed;
	bottom: 300rpx;
	right: 50rpx;
	transition: all 0.3s linear;
}
.show {
	width: 90rpx;
	height: 90rpx;
	opacity: 1;
}
.hide {
	width: 0rpx;
	height: 0rpx;
	opacity: 0;
}
.share{
	
}
</style>
