<template>
	<div class="wrap">
		<div class="log-list">
			<div class="log-list-item clearfix" v-for="(item, index) in itemRecordData" :key="index">
				<div class="l data">
					{{item.create_time|fmtTime}}
				</div>
				<div class="r details">
					<div class="dsc clearfix">
						<span class="l tips">操作人：</span>
						<div class="r type"><span class="primary-type">{{item.ext}}</span></div>
					</div>
					<div class="dsc">
						<span class="dsc-item"><span class="tips">内容：</span><span class="t">{{item.remark}}</span></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	let LoadMore = () => import('@/components/load-more/LoadMore.vue')
	
	export default {
		name: 'operaRecord',
		data() {
			return {
				isloading: false,
				itemId: this.$store.getters.currentItemOutId,
				itemRecordData: this.$store.state.itemOutData[this.$store.getters.currentItemOutId].itemRecordList
			}
		},
		watch: {
			
		},
		components: {
			LoadMore
		},
		mounted: function() {
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.wrap{
		position: relative;
	}
	.aud-state{
		position: absolute;
		right: 112px;
		top: 0;
		width: 50px;
		height: 50px;
		display: inline-block;
		background-size: 50px 50px;
	}
	.aud-state.active{
		background-size: 50px 50px;
	}
	.input_text{
		font-size: 12px;
		color: #999999;
	}
	.label{
		font-size: 12px !important;
		color: #666666 !important;
	}
	.el-icon-arrow-down {
		margin-left: 13px;
	}
	.loadmore-block {
		margin-top: 26px;
		text-align: center;
	}
	
	.loadMorebtn {
		cursor: pointer;
		font-size: 14px;
		color: #5d5d5d;
	}
	
	.sosobtn {
		font-size: 14px;
		color: #FFFFFF;
		background: #295DCF;
		border-radius: 2px;
		width: 90px;
		height: 30px;
		line-height: 0px;
	}
	
	.search {
		float: right;
	}
	
	.soso {}
	
	.line {
		text-align: center;
	}
	
	.wrap {
		background: #fff;
		height: auto;
		padding: 20px;
	}
	
	.header {
		height: 64px;
	}
	
	.header .title {
		font-size: 16px;
		font-weight: bold;
	}
	
	.worktab>.el-tabs__header {
		background: #f8f9fb;
	}
	
	.tabs {
		margin-right: 334px;
	}
	
	.todo-module {
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.el-row {
		height: auto;
	}
	
	.box {
		width: 50px;
		height: 50px;
	}
	
	.log-list-item {
		overflow: hidden;
		font-size: 12px;
		margin-bottom: 22px;
		position: relative;
	}
	
	.log-list .log-list-item:nth-last-child(1) {
		margin-bottom: 0;
	}
	
	.log-list-item .l {
		float: left;
	}
	
	.log-list-item .r {
		display: inline-block;
	}
	
	.log-list-item .dsc-item {
		margin-right: 26px;
		margin-left: -3px;
	}
	
	.log-list-item .dsc-item:nth-last-of-type(1) {
		margin-right: 0;
	}
	
	.log-list-item .dsc {
		margin-bottom: 12px;
	}
	
	.log-list-item .dsc:nth-last-of-type(1) {
		margin-bottom: 0;
	}
	
	.log-list-item .tips {
		display: inline-block;
		width: 62px;
		height: 15px;
		font-size: 12px;
		color: #999999;
	}
	
	.log-list-item .t {
		font-size: 12px;
		color: #333333;
		vertical-align: middle;
	}
	
	.log-list-item .data {
		width: 90px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		text-align: right;
		padding-right: 20px;
	}
	
	.log-list-item .data .m {
		font-size: 18px;
		color: #333333;
	}
	
	.log-list-item .data .y {
		font-size: 12px;
		color: #3F3F3F;
		letter-spacing: 0;
		line-height: 25px;
	}
	
	.log-list-item .details {
		padding: 20px 20px;
		background: #fafbfd;
		width: 100%;
		margin-left: 72px;
		display: block;
		position: relative;
		cursor: pointer;
	}
	
	.log-list-item .evaluate {
		margin-top: 15px;
	}
	
	.log-list-item .evaluate .evaluate-item {
		margin-right: 18px;
	}
	
	.log-list-item .evaluate .evaluate-item:nth-last-of-type(1) {
		margin-right: 0;
	}
	
	.primary-type {
		display: inline-block;
		padding: 3px 10px;
		font-size: 12px;
		color: #295DCF;
		background: #eff2fa;
	}
	
	.log-list-item .type span {
		position: relative;
		top: -2px;
	}
</style>