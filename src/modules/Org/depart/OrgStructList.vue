<!--组织架构编辑列表 -->
<template>
	<section class="layout-o">
		<div class="org-struct-list">
			<div class="header">
				<span class="middle text">组织架构</span>
			</div>
			<el-table class="structListTable" :data="parseListData" style="width: 100%" :row-class-name="tableRowClassName">
				<el-table-column label="部门名称" align="left">
					<template slot-scope="scope">
						<div>
							<i v-if="scope.row.parentId != 0" class="icon-list-lv" :style="departIconStyle(scope.row.level)"></i>
							<span>{{scope.row.label}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="right" v-if="HasPermission('listeditbtn')">
					<template slot-scope="scope">
						<el-button @click="editBtn(scope, scope.row)" type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<EditDepart :visible.sync="editDepartVisible" :dataSource="editDepartData" :parentData="parentData"></EditDepart>
	</section>
</template>

<script>
	let EditDepart = () =>
		import('./EditDepart_Dialog.vue')

	export default {
		name: 'OrgStructList',
		props: {},
		data() {
			return {
				remoteData: null,
				listData: [],
				editDepartVisible: false,
				editDepartData: null,
				maxLevelNum: 0,
				maxLevelList: [],
				parseListData: [],
				parentData: {}
			}
		},
		components: {
			EditDepart
		},
		watch: {},
		mounted: function() {
			this.queryOrgStructChart()
		},
		methods: {
			departIconStyle(level){
				let l = 0
				if (level > 1) {
					l = (level - 1) * 10 + (level - 2) * 26
				}
				return {
					'marginLeft': `${l}px`
				}
			},
			find1LevelDepart(){
				for (let i in this.listData){
					if (this.listData[i].parentId == 0) {
						this.$set(this.listData[i], 'level', 1)
					} 
				}
			},
			findDepartChildren(node, levelnum) {
				let _levelnum = levelnum
				if (Object.isEmpty(levelnum)) {
					_levelnum = 1
				}
				for (let i in node) {
					if (_levelnum != 1) {
						if (this.maxLevelNum < levelnum) {
							this.maxLevelNum = levelnum
						}
						node[i].level = levelnum
						this.parseListData.push(node[i])
					} else if (node[i].id == -1) {
						
					} else {
						this.parseListData.push(node[i])
					}
					if (Array.isArray(node[i].children) && node[i].children.length) {
						this.findDepartChildren(node[i].children, _levelnum + 1)
					}
				}
			},
			allocMaxLevelList() {
				for (let i = 1; i <= this.maxLevelNum;i++) {
					this.maxLevelList.push(i)
				}
			},
			queryOrgStructChart() {
				this.$http.post('/api/depart/departTreeNo', {}, {
					emulateJSON: true
				}).then((res) => {
					this.parseListData = []
					this.listData = res.data.result
					this.find1LevelDepart()
					this.findDepartChildren(this.listData, 1)
					this.allocMaxLevelList()
				}).catch((err) => {
					
				})
			},
			tableRowClassName(row, index) {
				if(parseInt(row.parentId) != 0) {
					return 'info-row';
				}
				return '';
			},
			findParentData(data) {
				for (let i in this.parseListData) {
					if (this.parseListData[i].id == data.parentId) {
						return this.parseListData[i]
					}
				}
				return {}
			},
				isPerformerFormatter(row) {
				  if(row.isPerformer == 0) {
					return "否";
				 }if(row.isPerformer == 1) {
					return "是";
				}
			},
			editBtn(scop, row) {
				this.editDepartVisible = true
				this.editDepartData = row
				this.parentData = this.findParentData(row)
				//console.log(this.editDepartData.isPerformer)
				//this.editDepartData.isPerformer = this.isPerformerFormatter(row);
				
			}
		}
	}
</script>

<style scoped>
	
	.icon-list-lv {
		display: inline-block;
		width: 14px;
		height: 14px;
		background: url(../../../assets/img/icon-list-lv.png) no-repeat;
		background-size: 14px 14px;
	    vertical-align: super;
    	margin-right: 12px;
    	margin-left: 10px;
	}
	.header {
		height: 68px;
		line-height: 68px;
	}
	
	.header .text {
		font-size: 14px;
		color: #000000;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.header .el-date-editor {
		float: right;
	}
	
	.org-struct-list {
		background: #fff;
		padding: 0 20px 20px 20px;
	}
</style>