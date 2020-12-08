<template>
	<div class="wrap">
		<NoDetails :isloading.sync="isloading" v-show="!hasData" class="loadingpr"></NoDetails>
		<template v-for="(listItem,index) in taskDataList">
			<div class="todo-item">
				<div class="title clearfix">
					<span class="content">{{titleText(listItem)}}</span>
				</div>
				<div class="dsc">
					<span class="tip">{{timeTipsText(listItem)}}</span>
					<span class="content">{{listItem.taskCteateTime|fmtDate}}</span>
				</div>
				<div class="dsc">
					<span class="tip">{{rejectResonText(listItem).tip}}</span>
					<span class="content">{{rejectResonText(listItem).content}}</span>
				</div>
				<div class="dsc">
					<span class="tip">{{departNameText(listItem).tip}}</span>
					<span class="content">{{departNameText(listItem).content}}</span>
				</div>
				
				<div class="dsc">
					<span class="tip">{{requireText(listItem).tip}}</span>
					<span class="content">{{requireText(listItem).content}}</span>
				</div>
				
				<div class="dsc">
					<span class="tip">{{projectDscText(listItem).tip}}</span>
					<span class="content">{{projectDscText(listItem).content}}</span>
				</div>
				<el-button type="primary" class="btn" @click="projectApproval(listItem)">{{btnText(listItem)}}</el-button>
			</div>
		</template>
	</div>
</template>

<script>
	let NoDetails = () =>
        import('@/components/no-details/NoDetails.vue')
	export default {
		name: 'Todo',
		data() {
			return {
				isloading: true,
				hasData: false,
				taskData: [],
				taskDataList: [],
				sessionInfo: JSON.parse(Cache.local(Config.Login))
			}
		},
		components: {
			NoDetails
		},
		watch: {
			isloading(val) {
				if (val) {
					this.getToDoTask()
				}
			}
		},
		mounted: function() {
			this.$nextTick(()=>{
				this.getToDoTask()
			})
		},
		methods: {
			getToDoTask: function() {
				let curUserId = this.sessionInfo.uc.id;
				this.$http.post('/api/process/selfToDoTask?curUserId=' + curUserId, null, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							this.taskData = data.result
							this.taskDataHandler()
						}
						if(Object.isEmpty(this.taskData)) {
							this.noDetails()
						} else {
							this.hasDetails()
						}
					}).catch((err) => {
						this.noDetails()
					})
			},
            titleText(item) {
                let $theme = item.$theme
				return `${$theme.cname}——${item.name}`
			},
            timeTipsText(item) {
                let $theme = item.$theme
                return `${$theme.tname}`
			},
			rejectResonText(item) {
				let $theme = item.$theme
				let rejectReson = $theme.rejectReson
				if (Object.isNotEmpty(rejectReson)) {
					let commentList = item.commentList
					let contentItem = ''
					let content = ''
					if (Array.isArray(commentList)) {
						contentItem = (commentList.length >= 2)?commentList[commentList.length - 1]:commentList[0]
						contentItem = Object.isEmpty(contentItem)?{remark:''}:contentItem
						content =contentItem.remark&&contentItem.remark.length>20?contentItem.remark.substring(0,20).concat('...'):contentItem.remark
					}
					return {
						tip: rejectReson,
						content: content
					}
				}
				return {
					tip: '',
					content: ''
				}
			},
			departNameText(item) {
				let $theme = item.$theme
				let departName = $theme.departName
				if (Object.isNotEmpty(departName)) {
					let content = Object.isNotEmpty(item.departName)?item.departName:''
					return {
						tip: departName,
						content: content&&content.length>20?content.substring(0,20).concat('...'):content
					}
				}
				return {
					tip: '',
					content: ''
				}
			},
			requireText(item) {
				let $theme = item.$theme
				let description = $theme.description
				if (Object.isNotEmpty(description)) {
					let content = Object.isNotEmpty(item.description)?item.description:''
					return {
						tip: description,
						content: content&&content.length>20?content.substring(0,20).concat('...'):content
					}
				}
				return {
					tip: '',
					content: ''
				}
			},
			projectDscText(item) {
				let $theme = item.$theme
				let prjectDsc = $theme.prjectDsc
				if (Object.isNotEmpty(prjectDsc)) {
					let content = Object.isNotEmpty(item.item)?item.item.description:item.description
					return {
						tip: prjectDsc,
						content: content&&content.length>20?content.substring(0,20).concat('...'):content
					}
				}
				return {
					tip: '',
					content: ''
				}
			},
            btnText(item) {
                let $theme = item.$theme
                return `${$theme.btntext}`
			},
            obtainTheme(item) {
				let category = item.category
				let status = item.status
				let is_pass = item.is_pass
				let cname,tname,btntext,rejectReson,prjectDsc,departName
				switch (category) {
					case 'ItemAuth':
                        if (status == 0 && is_pass == 0) {
                            cname = '创项驳回'
                            tname = '驳回时间：'
                            btntext = '编辑'
                            rejectReson = '驳回原因：'
                        }
					    if (status == 1) {
                            cname = '创项'
                            tname = '创项时间：'
                            btntext = '审核'
                            prjectDsc = '项目简介：'
						}
                        if (status == 2 &&  is_pass == 0) {
                            cname = '立项驳回'
                            tname = '驳回时间：'
                            btntext = '编辑'
                            rejectReson = '驳回原因：'
                        }
                        if (status == 2 &&  is_pass == 1) {
                            cname = '待立项'
                            tname = '创建时间：'
                            btntext = '立项'
                            prjectDsc = '项目简介：'
                        }
                        if (status == 4) {
                            cname = '立项'
                            tname = '立项时间：'
                            btntext = '审核'
                            prjectDsc = '项目简介：'
						}
						if (status == 6) {
                            cname = '立项'
                            tname = '立项时间：'
                            btntext = '分配部门'
                            prjectDsc = '项目简介：'
						}
                        break
                    case 'ItemHangUp':
                        if (status == 0) {
                            cname = '挂起'
                            tname = '挂起时间：'
                            btntext = '审核'
                            prjectDsc = '项目简介：'
                        }
                        if (status == 2) {
                            cname = '挂起驳回'
                            tname = '驳回时间：'
                            btntext = '编辑'
                            rejectReson = '驳回原因：'
						}
                        break
                    case 'ItemFinish':
                        if (status == 0) {
                            cname = '结项'
                            tname = '结项时间：'
                            btntext = '审核'
                            prjectDsc = '项目简介：'
                        }
                        if (status == 2) {
                            cname = '结项驳回'
                            tname = '驳回时间：'
                            btntext = '编辑'
                            rejectReson = '驳回原因：'
                        }
                        break
                    case 'ItemStop':
                        if (status == 0) {
                            cname = '中止'
                            tname = '中止时间：'
                            btntext = '审核'
                            prjectDsc = '项目简介：'
                        }
                        if (status == 2) {
                            cname = '中止驳回'
                            tname = '驳回时间：'
                            btntext = '编辑'
                            rejectReson = '驳回原因：'
                        }
                        break
                    case 'ItemRequire':
                        if (status == 0) {
                            cname = '需求变更'
                            tname = '变更时间：'
                            btntext = '审核'
                            // prjectDsc = '需求内容：'
                        }
                        if (status == 2) {
                            cname = '需求变更驳回'
                            tname = '驳回时间：'
                            btntext = '编辑'
                            rejectReson = '驳回原因：'
                        }
                        break
                    case 'ItemDistribute':
                        if (status == 0 || status==1) {
                            cname = '额度分配'
                            tname = '分配时间：'
                            btntext = '分配部门'
                            prjectDsc = '项目简介：'
                        }
                        if (status == 2) {
                            cname = '额度分配驳回'
                            tname = '驳回时间：'
                            btntext = '编辑'
                            rejectReson = '驳回原因：'
                        }
                        break
                    case 'ItemProgressReview':
                        if (status == 0) {
                            cname = '进度更新'
                            tname = '更新时间：'
                            btntext = '审核'
                            prjectDsc = '项目简介：'
                        }
                        if (status == 2) {
                            cname = '进度更新驳回'
                            tname = '驳回时间：'
                            btntext = '编辑'
                            rejectReson = '驳回原因：'
                        }
                        break
                    case 'ItemProgressOrdinary':
                        if (status == 0) {
                            cname = '进度更新'
                            tname = '更新时间：'
                            btntext = '审核'
                            departName = '更新部门：'
                        }
                        if (status == 2) {
                            cname = '进度更新驳回'
                            tname = '驳回时间：'
                            btntext = '编辑'
                            rejectReson = '驳回原因：'
                        }
                        break
					default:
						break
				}
				return {
                    cname: cname,
                    tname: tname,
                    btntext: btntext,
                    rejectReson: rejectReson,
                    prjectDsc: prjectDsc,
                    departName: departName
				}
            },
			taskDataHandler() {
				let ret = []
				delete this.taskData["ioApplyList"]
				delete this.taskData["outMgrList"]
				for (let key in this.taskData) {
					let itemArr = this.taskData[key]
					for (let i in itemArr) {
                        itemArr[i].$theme = this.obtainTheme(itemArr[i])
						ret.push(itemArr[i])
					}
				}
				ret.sort(function(a,b){
					return b.taskCteateTime - a.taskCteateTime
				})
				this.$emit("obtainTipsLen", ret.length)
				this.$set(this.$data, 'taskDataList', ret)
			},
			hasDetails() {
				this.hasData = true
				this.isloading = false
			},
			noDetails() {
				this.hasData = false
				this.isloading = false
			},
			//项目立项
			projectApproval(item) {
					sessionStorage.setItem(Config.CreateStep.NAME, Config.CreateStep.ACTION_TYPE.TODO_INTO)
					if(item.category === 'ItemRequire') {
						this.$store.commit('setDoTaskitemRequireList', this.taskData.itemRequireList)
					}
					if(item.category == 'ItemProgressOrdinary') {
						this.$store.commit('setDoTaskItemProgressRecord', this.taskData.itemProgressOrdinary)
					}
					if(item.category == 'ItemProgressReview') {
						this.$store.commit('setDoTaskItemProgressRecord', this.taskData.itemProgressRiewList)
					}
					if(item.category != 'ItemAuth') {
						this.$store.commit('setUnFinishAuthType', JSON.parse(Cache.local(Config.Login)).roleType)
						this.$store.commit('setDoTaskItem', item)
						this.$router.push(`/businessaffairs/pj/details/${item.item_id}-${item.status}-${item.category}`);
					} else {
						this.toSelfTask(item)
					}
			},
			toSelfTask: function(item) {
				this.$http.post('/api/item/toSelfTask', {
						taskId: item.taskId,
						itemId: item.id
					}, {
						emulateJSON: true
					})
					.then((res) => {
						let data = res.data.result;
						if(res.data.success) {
							this.$store.commit('setPjManageUnFinishedItemPassingStatus', data);
							this.$router.push('/businessaffairs/pj/steps');
						}
					}).catch((err) => {
						
					})
			}
		}
	}
</script>

<style scoped>
	.loadingpr {
		padding-right: 20px;
	}
	.todo-item .btn {
		font-size: 14px;
		margin-top: 10px;
		min-width: 78px;
		height: 30px;
		padding: 0;
		padding-left: 6px;
		padding-right: 6px;
		background-color: #295DCF;
		border-color: #295DCF;
	}
	
	.todo-item {
		padding-top: 26px;
		padding-bottom: 26px;
		border-bottom: 1px solid #F0F0F0;
		padding-right: 20px;
	}
	.todo-item:last-child{
		border-bottom: none;
	}
	.todo-item .title .content {
		display: block;
		position: relative;
		font-size: 16px;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.todo-item .dsc {
		margin-top: 8px;
		color: #b9b9b9;
		font-size: 12px;
	}
	
	.dsc:nth-of-type(2) {
		margin-top: 8px;
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
	}
	
	.todo-wrap .todo-item:nth-last-of-type(1) {
		border-bottom: none;
	}
	
	.primary-tag {
		font-size: 10px;
		border-radius: 2px;
		border: 1px solid #295DCF;
		display: inline-block;
		color: #295DCF;
		float: left;
		padding: 1px 6px;
	}
	
	.pending-position {
		width: auto;
		padding: 2px 13px;
		background: #F9F9F9;
		border-radius: 2px;
		font-size: 12px;
		color: #295DCF;
	}
	
	.pending-position+div {
		margin-top: 13px;
	}
</style>