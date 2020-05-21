<script>
export default {
	// 全局变量的实现方法之一
	globalData: {
		projectName: '学习通'
	},
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
/*每个页面公共css */
page {
	background: #f5f7fa;
	// margin: 20rpx 38rpx;
	// box-sizing: border-box;
}
.center_box {
}
</style>
