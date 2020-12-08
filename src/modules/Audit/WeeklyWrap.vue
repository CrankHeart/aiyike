<!--周报审核模块-->
<template>
	<div class="wrap">
		<NoDetails class="ayk-audit__loading" :isloading.sync="isloading" v-show="!hasData"></NoDetails>
		<div class="todo-item" v-for="(item,key) in notAuditedList" :key='key'>
			<div class="title clearfix">
				<span class="success-tag">周报</span>
				<span class="content" v-if="item.category==1">{{item.itemName}}</span>
				<span class="content" v-if="item.category==2">{{item.depart}}</span>
			</div>
			<div class="dsc" v-if="item.category==1">
				<span class="tip">最近提交：</span>
				<span class="content">{{item.updateTime | totimestamp | fmtDate}}</span>
			</div>
			<div class="dsc" v-if="item.category==1">
				<span class="tip">项目经理：</span>
				<span class="content">{{item.ucName}}</span>
			</div>
			<div class="dsc" v-if="item.category==2">
				<span class="tip">周报周期：</span>
				<span class="content">{{item.monthCode}}月第{{item.num | n2cformat}}周</span>
			</div>
			<div class="dsc" v-if="item.category==2">
				<span class="tip">部门经理：</span>
				<span class="content">{{item.ucName}}</span> 
			</div>
			<el-button type="warning" class="btn" @click="watchLogDetails(item)">审核</el-button>
		</div>
	</div>
</template>

<script>
	let NoDetails = () =>
		import('@/components/no-details/NoDetails.vue')
	let HerGhostScroll = () =>
		import('@/components/scroll/HerGhostScroll.vue')
	export default {
		name: 'WeeklyAudit',
		data() {
			return {
				isloading: true,
				hasData: false,
				dataList: JSON.parse(Cache.local(Config.Login)),
				sendData: null,
				notAuditedNum: '',
				notAuditedList: []
			}
		},
		components: {
			NoDetails,
			'herghost-scroll': HerGhostScroll
		},
		mounted: function() {
			this.sendData = {
				loginId: this.dataList.uc.id,
				ucId: this.dataList.uc.id,
				departId: this.dataList.uc.departId
			}
			this.getNotAuditedList()
		},
		watch: {
			isloading(val) {
				if(val) {
					this.reload()
				}
			}
		},
		methods: {
			hasDetails() {
				this.hasData = true
				this.isloading = false
			},
			noDetails() {
				this.hasData = false
				this.isloading = false
			},
			reload() {
				this.getNotAuditedList()
			},
			getNotAuditedList() {
				this.sendData.status = 0
				//获取查询周报列表
				let data = Object.assign({}, this.sendData)
				delete data.ucId
				delete data.departId
				this.$http.post('/api/week/right', data, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data
						if(data.success) {
							this.notAuditedList = data.result.content
							this.$emit("obtainTipsLen", this.notAuditedList.length)
							if(Object.isEmpty(this.notAuditedList)) {
								this.noDetails()
							} else {
								this.hasDetails()
							}

						}
					}).catch((err) => {
						this.noDetails()
					})
			},
			watchLogDetails(data) {
				this.$store.commit("WeeklyDetalisData", data)
				this.$router.push({
					path: `/weeklymanagement/weeklys`,
					query: {
						id: data.logId,
						jumpstatus: "3"
					}
				})
			}
		}
	}
</script>

<style scoped>
	.todo-item .btn {
		margin-top: 12px;
		font-size: 12px;
		padding: 9px 33px;
	}
	
	.todo-wrap:after {
		position: relative;
		content: "";
		display: block;
		width: 100%;
		height: 50px;
	}
	
	.todo-item {
		padding-top: 24px;
		padding-bottom: 24px;
		padding-right: 28px;
		border-bottom: 1px solid #F0F0F0;
	}
	
	.todo-item:last-child {
		border-bottom: none;
	}
	
	.todo-item .title .content {
		display: block;
		position: relative;
		left: 10px;
		font-size: 16px;
		font-weight: bold;
		top: 0px;
		color: #000;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
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
		padding-left: 28px;
		border-bottom: 1px solid #f0f0f0;
	}
	
	.header .text {
		font-size: 18px;
		color: #000000;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.nd-wrap {
		position: relative;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		top: -60px;
		padding-top: 60px;
		height: 100%;
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
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		position: relative;
		top: -60px;
		padding-top: 60px;
	}
	
	.alert-tag {
		position: relative;
		top: -2px;
		margin-left: 9px;
		padding: 1px 16.5px;
	}
	
	.success-tag {
		font-size: 10px;
		border-radius: 2px;
		border: 1px solid #f7ba2a;
		display: inline-block;
		padding: 0.5px 7px;
		color: #f7ba2a;
		float: left;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
</style>