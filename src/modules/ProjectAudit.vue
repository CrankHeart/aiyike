<template>
	<div class="todo">
		<div class="header">
			<span class="middle text">项目审核</span>
			<span class="alert-tag">3</span>
		</div>
		<div class="todo-wrap">
			<div class="todo-item" v-for="task in taskData">
				<div class="title clearfix">
					<span class="primary-tag">进度更新</span>
					<span class="content">{{task.item.name}}</span>
				</div>
				<div class="dsc">
					<span class="tip">立项时间：</span>
					<span class="content">{{task.item.createTime | fmtDate}}</span>
				</div>
				<div class="dsc">
					<span class="tip">项目简介：</span>
					<span class="content">{{task.item.description}}</span>
				</div>
				<el-button type="primary" class="btn" @click="audit">审核</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ProjectAudit',
		data() {
			return {
				taskData:{}
			}
		},
		mounted: function() {
			this.getToDoTask()
			
		},
		methods: {
			getToDoTask:function(){
				this.$http.post('/api/item/selfToDoTask', null, {emulateJSON: true})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							this.taskData=data.result
						}
						this.loading = false
					}).catch((err) => {
						this.loading = false
						
					})
			},
			audit(){
				
			}
		}
	}
</script>

<style scoped>
	.todo-item .btn {
		font-size: 14px;
		margin-top: 12px;
		width: 90px;
		height: 30px;
		padding: 0;
		background-color: #295DCF;
		border-color: #295DCF;
	}
	.todo-wrap:after{
		position: relative;
		content: "";
		display:block;
		width: 100%;
		height: 50px;
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
	
	.header {
		height: 60px;
		padding-left: 20px;
		border-bottom: 1px solid #f0f0f0;
	}
	
	.header .text {
		font-size: 18px;
		color: #000000;
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
	.todo-wrap{
		height: 100%;
		width: 354px;
		overflow-y: scroll;
	}
	.alert-tag {
		position: relative;
		top: -2px;
		margin-left: 9px;
		    padding: 1px 16.5px;
	}
	
	.primary-tag {
		font-size: 10px;
		border-radius: 2px;
		border: 1px solid #3e6dd4;
		display: inline-block;
	    padding: 1px 6px;
		color: #3e6dd4;
		float: left;
	}
	.todo-item.no .primary-tag{
		font-size: 10px;
		background: #F9F9F9;
		border-radius: 2px;
		display: inline-block;
		color: #295DCF;
	    padding: 1.5px 5.5px;
	    border: none;
	    float: none;
	}
	.todo-item.no .content{
		left: 0;
		margin-top: 12px;
	}
</style>