<template>
	<div class="layout">
		<el-row :gutter="24">
			<el-col :span="12" class="col-mb" v-for="(item, index) in listData" :key="index">
				<UnFinished :type = 'type' :datasource="item" :authType="authType"></UnFinished>
			</el-col>
		</el-row>
		<LoadMore :isloading.sync="isloading" v-if="showLoading"></LoadMore>
	</div>
</template>

<script>
	let UnFinished = () =>
		import('@/components/project-item/UnFinished.vue')
	let LoadMore = () =>
		import('@/components/load-more/LoadMore.vue')

	export default {
		name: "UnFinishedProjectList",
		data() {
			return {
				listData: [],
				isloading: false,
				showLoading: false,
				authType: 'updepart',
				pagination: {
					total: 0,
					pagesize: 0,
					curPage: 0
				},
				type:'wkbench'
			};
		},
		watch: {
			isloading(val) {
				if(val) {
					this.loadMore()
				}
			}
		},
		components: {
			UnFinished,
			LoadMore
		},
		mounted() {
			this.loadMore()
		},
		methods: {
			loadMore() {
				this.pagination.curPage++
				let data = {
					curPage: this.pagination.curPage
				};
				this.$http
					.post("/api/item/searchItemUnByDepart", data, {
						emulateJSON: true
					})
					.then(res => {
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
					})
					.catch(err => {
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
		}
	};
</script>

<style scoped>
	.layout {
		position: relative;
	}
	
	.createProjectBtn {
		background: #295dcf;
		width: 56px;
		height: 56px;
		border-radius: 100%;
		color: #ffffff;
		text-align: center;
		display: inline-block;
		position: fixed;
		bottom: 6px;
		right: 370px;
		cursor: pointer;
		line-height: 56px;
	}
	
	.col-mb {
		margin-bottom: 24px;
	}
	
	.uncompletTem {
		padding: 43px 37px 43px 37px;
		background: #ffffff;
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
		background: url(../../assets/img/folder.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.temRight {
		margin-left: 25px;
		color: #333333;
		min-width: 170px;
	}
	
	.percent {
		color: #ffffff;
	}
	
	.percent .percentNum {
		font-size: 22px;
	}
	
	.percent .percentUnit {
		font-size: 18px;
	}
	
	.percentTxt {
		color: rgba(255, 255, 255, 0.5);
	}
	
	.projectTitle {
		font-size: 16px;
		color: #000000;
		margin-bottom: 22px;
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
	
	.nodata {
		display: inline-block;
		vertical-align: middle;
		font-size: 32px;
		color: rgba(0, 0, 0, 0.14);
		margin-top: -24px;
	}
	.loadmore-block{
		margin:0px!important;
	}
</style>