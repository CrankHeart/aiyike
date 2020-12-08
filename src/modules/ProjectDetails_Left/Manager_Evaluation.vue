<!--高端定制事业部-->
<template>
	<dl class="layout">
		<dt class="header">
			<div class="tooltip">
				<span class="title">评价项目经理</span>
			</div>
		</dt>
		<dd class="content" v-if="dataList!=null">
				<div class="l middle">
					<el-rate v-model="dataList.star" :disabled=true></el-rate>
					<!--<span class="tag" :state="dataList.star"><span class="middle">{{dataList.type | cusCommentType | nullformat}}</span></span>-->
				</div>
				<div class="r">
					<p class="content">{{dataList.description | nullformat}}</p>
					<p class="time">{{dataList.createTime | fmtDate | nullformat}}</p>
				</div>
		</dd>
	</dl>
</template>

<script>
	export default {
		name: 'Custom_Evaluation',
		props: {
			itemId: {
				type: String,
				default: 0
			}
		},
		data: function() {
			return {
				state: this.$store.state,
				dataList:{}
			}
		},
		watch: {
			'state.pjManagement_UnFinished.cusCommentReload'() {
//				this.queryCustomerComments() 
			}
		},
		mounted: function() {
			this.queryManagerComments() 
		},
		methods: {
			queryManagerComments() {
				let id = this.itemId.split('-')[0]
				this.$http.post('/api/itemComment/queryItemComment',{"itemId":id}, {
					emulateJSON: true
				}).then((res) => {
					let success = res.data.success
					let result=res.data.result
					if(success) {
						this.dataList=res.data.result
					}
				}).catch((err) => {
					this.loading = false;
					
				});
			}
		}
	}
</script>

<style scoped>
	.tag {
		position: relative;
		top: -2px;
		width: 40px;
		height: 15px;
		border-radius: 2px;
		font-size: 12px;
		color: #FFFFFF;
		display: inline-block;
		text-align: center;
	}
	
	.tag[state="3"] {
		background: #EE5A5A;
	}
	
	.tag[state="2"] {
		background: #F5BF3C;
	}
	
	.tag[state="1"] {
		background: #1ABF69;
	}
	
	.tag span {
		transform: scale(0.83333);
		display: inline-block;
	}
	
	.layout {
		background: #fff;
		margin-bottom: 70px;
	}
	
	.carea .l {
		width: 49px;
		float: left;
	}
	
	.carea .r {
		margin-left: 49px;
	}
	
	.carea .r .content {
		font-size: 12px;
		color: #333333;
		padding: 0;
	}
	
	.carea .r .time {
		font-size: 12px;
		color: #B9B9B9;
	}
	
	.content .carea {
		margin-bottom: 12px;
	}
	
	.content .carea:nth-last-of-type(1) {
		margin-bottom: 0;
	}
	
	.content {
		position: relative;
		padding: 0 20px 20px 20px;
	}
	
	.line {
		position: absolute;
		top: 0;
		left: -18px;
		right: -18px;
		height: 0px;
		opacity: 0.26;
		border-bottom: 1px solid #D5D5D5;
	}
	
	.header {
		position: relative;
		padding-bottom: 4px;
		padding: 15px 20px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.header .tooltip {
		position: relative;
	}
	
	.header .tooltip .title {
		font-size: 14px;
		color: #000000;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
</style>