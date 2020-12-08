<template>
	<div class="layout" :class="[!isHasDataComputed?'middle':'']">
		<el-breadcrumb separator=">" class="mb24">
			<el-breadcrumb-item>当前位置：项目管理</el-breadcrumb-item>
			<el-breadcrumb-item>未完结项目</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row :gutter="24">
			<el-col :span="12" class="col-mb" v-for="(item, index) in listData" :key="index">
				<UnFinished :datasource="item" :authType="authType"></UnFinished>
			</el-col>
		</el-row>
		<LoadMore :isloading.sync="isloading" v-if="showLoading"></LoadMore>
		<div class="nodata" v-if="!isHasDataComputed">暂无数据</div>
	</div>
</template>

<script>
	let UnFinished = () =>
		import('@/components/project-item/UnFinished.vue')
	let LoadMore = () => import('@/components/load-more/LoadMore.vue')
	
	export default {
		name: 'UnFinishedProjectList',
		props: {
			authType: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isloading: false,
				pagination: {
					total: 0,
					pagesize: 0,
					curPage: 0
				},
				addUnFinishedProject: "addUnFinishedProject",
				restFulUrl: '',
				listData: [],
				showLoading: false
			}
		},
		watch: {
            isloading(val) {
                if (val) {
                	this.loadMore()
                }
            }
        },
		components: {
			UnFinished,
			LoadMore
		},
		mounted() {
			this.obtainRequestUrl()
			this.loadMore()
		},
		computed: {
			isHasDataComputed() {
				if (this.listData.length) {
					return true
				}
				return false
			}
		},
		methods: {
			loadMore() {
				this.pagination.curPage++
				this.$http.post(this.restFulUrl, {
					curPage: this.pagination.curPage
				}, {
					emulateJSON: true
				}).then((res) => {
					let result = res.data.result
					if (Object.isEmpty(result)) {
						result = {}
					}
					this.listData = !result.content?this.listData:this.listData.concat(result.content)
					this.pagination.total = Number.isNumber(result.total)?result.total:1;
					this.pagination.pageSize = Object.isNotEmpty(result.helper)?result.helper.pageSize:1
					this.pagination.curPage = Object.isNotEmpty(result.helper)?result.helper.curPage:1
					this.setLoadMoreStatus()
					this.isloading = false
				}).catch((err) => {
					this.pagination.curPage--
					
				});
			},
			setLoadMoreStatus() {
				if (this.pagination.curPage >= this.pagination.total / this.pagination.pageSize) {
					this.showLoading = false
				} else {
					this.showLoading = true
				}
			},
			obtainRequestUrl() {
				switch(this.authType) {
					case 'upuc':
						this.restFulUrl = "/api/item/ItemOrdinaryByUc"
						break
					case 'updepart':
						this.restFulUrl = "/api/item/searchItemUnByDepart"
						break
					case 'upall':
						this.restFulUrl = "/api/item/ItemByAll"
						break
					case 'upmgr':
						this.restFulUrl = "/api/item/ItemByMgr"
						break
					case 'upba':
						this.restFulUrl = "/api/item/ItemByBa"
						break
					default:
						break
				}
			}
		}
	}
</script>

<style scoped>
	.layout.middle:after {
	    display: inline-block;
	    content: "";
	    height: 100%;
	    vertical-align: middle;
	    box-sizing: border-box;
	    margin-top: -50px;
	}
	.layout.middle {
		text-align: center;
		height: 100%;
	}
	.nodata {
		display: inline-block;
	    vertical-align: middle;
	    font-size: 32px;
	    color: rgba(0,0,0,0.14);
	    margin-top: -24px;
	}
	.el-icon-arrow-down{
		margin-left: 4px;
	}
	.loadmore-block{
		margin-top: 0 !important;
		margin-bottom: 26px;
	}
	.mb24 {
		margin-bottom: 24px;
	}
	
	.layout {
		position: relative;
	}
	
	.createProjectBtn {
		position: fixed;
		bottom: 6px;
		right: 370px;
	}
	
	
	.col-mb {
		margin-bottom: 24px;
	}
	
	.uncompletTem {
		padding: 43px 37px 43px 37px;
		background: #FFFFFF;
	}
	
	.uncompletTem li {
		float: left;
	}
	
	.temLeft {
		width: 89px;
		height: 76px;
		padding-top: 24px;
		text-align: center;
		box-sizing: border-box;
		font-size: 13px;
		background: url(../assets/img/folder.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.temRight {
		margin-left: 25px;
		color: #333333;
		min-width: 170px;
	}
	
	.percent {
		color: #FFFFFF;
	}
	
	.percent .percentNum {
		font-size: 22px;
	}
	
	.percent .percentUnit {
		font-size: 18px;
	}
	
	.percentTxt {
		color: rgba(255, 255, 255, 0.5);
		display: inline-block;
	}
	
	.projectTitle {
		font-size: 16px;
		color: #000000;
		margin-bottom: 22px;
		white-space: nowrap;
		text-overflow: ellipsis;
		word-break: break-all;
		word-wrap: break-word;
		overflow: hidden;
	}
	
	.projectItem {
		font-size: 12px;
		transform: scale(0.8333);
		transform-origin: left;
		color: #999999;
		margin-bottom: 5px;
	}
	
	.textLeft {
		text-align: left;
	}
	
	.font16 {
		font-size: 14px;
		color: #333333;
	}
	
	.tian {
		font-size: 14px;
		font-weight: normal;
		margin-left: 3px;
	}
	
	.margR {
		margin-left: 50px;
	}
</style>