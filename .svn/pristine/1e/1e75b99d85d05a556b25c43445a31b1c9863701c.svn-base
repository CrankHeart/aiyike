<template>
	<div class="todo">
		<div class="todo-wrap">
			<div class="todo-item">
				<div class="title clearfix">
					<span class="">{{itemDataSource.name}}</span>
				</div>
				<div class="title clearfix" style="padding-top: 10px;">
					<span class="primary-tag" :status='status'>{{itemDataSource.status |fmtItemStatus}}</span>
				</div>
				<div class="dsc">
					<span class="tip">项目经理：</span>
					<span class="content">{{itemDataSource.manager}}</span>
				</div>
				<div class="dsc">
					<span class="tip">商务经理：</span>
					<span class="content">{{itemDataSource.baName}}</span>
				</div>
				<div class="dsc">
					<span class="tip">外围总价：</span>
					<span class="content">{{itemDataSource.total}}</span>
				</div>
				<div class="dsc">
					<span class="tip">合作方式：</span>
					<span class="content">{{itemDataSource.type==1?'项目外包':'其他'}}</span>
				</div>
				<div class="dsc">
					<span class="tip">截止日期：</span>
					<span class="content">{{itemDataSource.endTime}}</span>
				</div>
				<div class="dsc">
					<span class="tip">业务范围：</span>
					<span class="content">{{itemDataSource.industry}}</span>
				</div>
				<div class="operation">
					<el-button type="primary" @click="passSubmit">通过</el-button>
					<el-button @click="noPass">驳回</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'itemApply',
		data() {
			return {
				state: this.$store.state,
				itemDataSource: {},
				itemId: this.$store.getters.currentItemOutId,
				status
			}
		},
		props: {},
		watch: {
			'state.itemOutData': {　　　　　　　　　
				handler(curVal, oldVal) {　　　
					this.itemDataSource = 　curVal[this.itemId]
				},
			   deep: true　　　　　　　　
			}
		},
		computed: {

		},
		components: {

		},
		mounted: function() {
			this.$store.getters.itemOutData[this.itemId] != undefined ? this.itemDataSource = this.$store.getters.itemOutData[this.itemId] : void 0
		},
		methods: {
			passSubmit: function() {

			},
			noPass: function() {

			}
		}
	}
</script>

<style scoped>
	.todo-item .operation {
		margin-top: 15px;
	}
	
	.todo-item {
		padding-top: 26px;
		padding-bottom: 26px;
		padding-right: 39px;
		border-bottom: 1px solid #F0F0F0;
	}
	
	.todo-item .title .content {
		display: block;
		position: relative;
		left: 10px;
		font-size: 16px;
		color: #000;
		font-weight: bold;
		top: 0px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.todo-item .dsc {
		margin-top: 8px;
		color: #b9b9b9;
		font-size: 12px;
	}
	
	.dsc:nth-of-type(2) {
		margin-top: 14px;
	}
	
	.middle {
		vertical-align: center;
	}
	
	.todo {
		background: #fff;
		height: 100%;
		width: 334px;
		overflow: hidden;
	}
	
	.todo-wrap {
		height: 100%;
		width: 354px;
		overflow-y: scroll;
		padding-left: 28px;
	}
	
	.primary-tag {
		font-size: 10px;
		border-radius: 2px;
		border: 1px solid #3e6dd4;
		display: inline-block;
		color: #3e6dd4;
		float: left;
		padding: 1px 6px;
	}
</style>