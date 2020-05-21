<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt"><view class="qiun-title-dot-light">雷达图</view></view>
		<view class="qiun-charts"><canvas canvas-id="canvasRadar" id="canvasRadar" class="charts" @touchstart="touchRadar"></canvas></view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt"><view class="qiun-title-dot-light">标准数据格式</view></view>
		<view class="qiun-bg-white qiun-padding"><textarea class="qiun-textarea" auto-height="true" maxlength="-1" v-model="textarea" /></view>
		<view class="qiun-charts"><canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas></view>
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
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			textarea: '',
			Radar: {
				categories: ['维度1', '维度2', '维度3', '维度4', '维度5', '维度6'],
				series: [
					{
						name: '成交量2',
						data: [190, 210, 105, 35, 27, 102]
					}
				]
			},
			ColumnB: {
				categories: ['2013', '2014', '2015', '2016', '2017', '2018'],
				series: [
					{
						name: '新成交量4',
						data: [18, 27, 21, 24, 6, 28]
					}
				]
			}
		};
	},
	onLoad() {
		_self = this;
		//#ifdef MP-ALIPAY
		uni.getSystemInfo({
			success: function(res) {
				if (res.pixelRatio > 1) {
					//正常这里给2就行，如果pixelRatio=3性能会降低一点
					//_self.pixelRatio =res.pixelRatio;
					_self.pixelRatio = 2;
				}
			}
		});
		//#endif
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.getServerData();
	},
	methods: {
		getServerData() {
			uni.request({
				url: 'https://www.ucharts.cn/data.json',
				data: {},
				success: function(res) {
					console.log(res.data.data);
					let Radar = { categories: [], series: [] };
					Radar.categories = _self.Radar.categories;
					Radar.series = _self.Radar.series;
					_self.textarea = JSON.stringify(res.data.data.Radar);
					_self.showRadar('canvasRadar', Radar);

					let Column = { categories: [], series: [] };
					//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					Column.categories = _self.ColumnB.categories;
					Column.series = _self.ColumnB.series;
					_self.textarea = JSON.stringify(res.data.data.ColumnB);
					_self.showColumn('canvasColumn', Column);
				},
				fail: () => {
					_self.tips = '网络错误，小程序端请检查合法域名';
				}
			});
		},
		showRadar(canvasId, chartData) {
			canvaRadar = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'radar',
				fontSize: 11,
				padding: [15, 15, 0, 15],
				legend: {
					show: true,
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
		showColumn(canvasId, chartData) {
			canvaColumn = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				padding: [15, 5, 0, 15],
				legend: {
					show: true,
					padding: 5,
					lineHeight: 11,
					margin: 0
				},
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true
				},
				yAxis: {
					data: [
						{
							position: 'right',
							axisLine: false,
							format: val => {
								return val.toFixed(0) + '元';
							}
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

<style>
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
</style>
