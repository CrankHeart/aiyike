<template>
	<div class="wrap container">
		<tabs v-model="activeName" @tab-click="handleClick">
			<tab-pane label="组织架构" name="depart" v-if="HasPermission('depart')">
				<component :is="depart" @replace-module="replaceModule" ref="depart"></component>
			</tab-pane>
			<tab-pane label="岗位管理" name="pos" v-if="HasPermission('pos')">
				<component :is="pos" ref="pos"></component>
			</tab-pane>	
			</tab-pane>
            <tab-pane label="员工管理" name="uc" v-if="HasPermission('uc')">
                <component :is="uc" ref="uc"></component>
            </tab-pane>
            <template slot="right">
            	<el-button v-if="HasPermission('addDepart')" class="add" type="primary" @click="addBtn">新增部门</el-button>
            	<el-button v-if="HasPermission('newaddposbtn')" class="addposbtn" type="primary" @click="newAddPosClick">新增岗位</el-button>
            	<el-button v-if="HasPermission('ucstatesetbtn')" type="primary" class="statusbtn" @click="paddstatus">员工状态设置</el-button>
            	<el-button v-if="HasPermission('newperbtn')" type="primary" class="submitbtn newaddperbtn" @click="newaddstaff">新增员工</el-button>
            	<el-button v-if="HasPermission('holidaysetbtn')" type="primary" class="holidaybtn submitbtn" @click="paddholiday">假期设置</el-button>
            </template>
		</tabs>
		<AddDepartDialog v-if="HasPermission('addDepart')" :visible.sync="addDepartFlag"></AddDepartDialog>
	</div>
</template>
<script>
	function syncComponent(path) {
		return () => import('@/' + path + '.vue')
	}
	let ExecuteTeam = () => import('@/modules/Org/depart/ExecuteTeam.vue')
	let TwoLevelTreeMap = () => import('@/modules/Org/depart/TwoLevelTreeMap.vue')
	
	let pos = syncComponent('modules/Org/pos/pos')
	
	let uc = syncComponent('modules/Org/uc/uc')
	let Tabs = syncComponent('components/tabs/Tabs')
	let TabPane = syncComponent('components/tabs/TabPane')
	let AddDepartDialog = () => import('@/modules/Org/depart/AddDepart_Dialog.vue')
	
	export default {
		name: 'OrgMgt',
		beforeRouteUpdate (to, from, next) {
			next()
  		},
		data() {
			return {
				addDepartFlag: false,
				activeName: null,
				depart: null,
				pos: null,
				uc: null,
				ucStateSetDialogFlag: false
			}
		},
		watch: {
		},
		components: {
			Tabs,
			TabPane,
			AddDepartDialog
		},
		mounted: function() {
		},
		methods: {
			newaddstaff() {
				this.$router.push('/org/orgMgt/uc/addstaff')
			},
			paddstatus(row) {
				this.$refs.uc.openStateSetDialog()
			},
			paddholiday() {
				this.$refs.uc.openHolidaySetDialog()
			},
			newAddPosClick() {
				this.$refs.pos.openNewAddPosDialog()
			},
			replaceModule(name) {
				//one-level:1级页面
				//two-level:2级页面
				//three-level:3级页面
				switch (name){
					case 'one-level':
						this.depart = ExecuteTeam
						break;
					case 'two-level':
						this.depart = TwoLevelTreeMap
						break;
					case 'three-level':
						this.$router.push('/org/orgMgt/depart/threemap')
						break;
					default:
						alert('未知节点等级：' + name)
						break;
				}
			},
			addBtn() {
				this.addDepartFlag = true
			},
			hasOtherJump() {
				let store = this.$store
				let org = store.getters.org
				if (org.link2level) {
					this.depart = TwoLevelTreeMap
					store.commit('setOrgLink2level', false)
				}
			},
			handleClick(tab, event) {
				if(tab.name=="depart"){
					this.depart = ExecuteTeam
					this.hasOtherJump()
				}else if(tab.name=="pos"){
					this.pos = pos;
				}else if(tab.name=="uc"){
					this.uc = uc;
					this.$refs.uc && this.$refs.uc.reload && this.$refs.uc.reload()
				}
			}
		}
	}
</script>

<style scoped>
	.newaddperbtn{
		margin:0;
	}
	.add{
		width: 116px;
		height: 30px;
		padding: 0;
		line-height: 1;
		margin:0;
	}
	.addposbtn {
	    width: 116px;
	    height: 30px;
	    border-radius: 2px;
	    padding: 0;
	    line-height: 0;
	    border: none;
	    margin:0;
	}
	.statusbtn{
		margin:0;
	}
	.holidaybtn {
		margin:0;
	}
</style>