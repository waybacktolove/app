<template>
	<view class="content">
		<view class="ques_card" v-for="(item, index) in arr" :key="item.id">
			<text class="title">{{ index + 1 + '.' + item.name }}</text>
			<u-radio-group v-model="item.value" class="radio_box">
				<u-radio class="radio_class" shape="circle" v-for="(item, index) in item.answer" :key="index" :name="item.value">
					{{ item.value + '、' + item.desc }}
				</u-radio>
			</u-radio-group>
			<u-line type="info" />
		</view>

		<view class="btn_area"><button type="default" @click="confirm">确定提交</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
			arr: [
				{
					id: 0,
					name: '当你要外出一整天，你会?',
					answer: [
						{
							value: 'A',
							desc: '计划你要做什么和在什么时候做'
						},
						{
							value: 'B',
							desc: '说去就去'
						}
					],
					value: ''
				},
				{
					id: 1,
					name: '当你要外出一整天，你会?',
					answer: [
						{
							value: 'A',
							desc: '计划你要做什么和在什么时候做'
						},
						{
							value: 'B',
							desc: '说去就去'
						}
					],
					value: ''
				},
				{
					id: 2,
					name: '当你要外出一整天，你会?',
					answer: [
						{
							value: 'A',
							desc: '计划你要做什么和在什么时候做'
						},
						{
							value: 'B',
							desc: '说去就去'
						}
					],
					value: ''
				}
			]
		};
	},
	onLoad() {},
	methods: {
		confirm() {
			console.log(this.arr);
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	// display: flex;
	// flex-direction: column;
	// align-items: center;
	// justify-content: center;
	padding: 20rpx;
	.ques_card {
		padding: 20rpx;
		.title {
			display: block;
		}
		.radio_box {
			display: flex;
			flex-direction: column;
			.radio_class {
				display: flex;
				align-items: center;
				margin: 16rpx;
			}
		}
	}
	.btn_area {
		padding: 40rpx 0;
		width: 100%;
	}
}
</style>
