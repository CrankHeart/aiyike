<!--项目管理-->
<template>
	<div class="wrap container">
		<tabs ref="tabs" :class="[tabClass,'hgscroll-lefttab']" v-model="activeName" @tab-click="handleClick" :right="tabright">
			<tab-pane label="统计" name="count" v-if="HasPermission('count')">
				<component :is="countview"></component>
			</tab-pane>

			<!-- 未完结项目-项目成员 -->
			<tab-pane label="未完结项目" name="upuc" v-if="HasPermission('upuc')">
				<component :is="upucview" @discriminationBtn="discriminationBtn" ref="unprojectview" authType="upuc"></component>
			</tab-pane>
			<!--未完结项目-部门-->
			<tab-pane label="未完结项目" name="updepart" v-if="HasPermission('updepart')">
				<component :is="updepartview" @discriminationBtn="discriminationBtn" ref="unprojectview" authType="updepart"></component>
			</tab-pane>
			<!--未完结项目-全部-->
			<tab-pane label="未完结项目" name="upall" v-if="HasPermission('upall')">
				<component :is="upallview" @discriminationBtn="discriminationBtn" ref="unprojectview" authType="upall"></component>
			</tab-pane>
			<!--未完结项目-项目经理-->
			<tab-pane label="未完结项目" name="upmgr" v-if="HasPermission('upmgr')">
				<component :is="upmgrview" @discriminationBtn="discriminationBtn" ref="unprojectview" authType="upmgr"></component>
			</tab-pane>
			<!--未完结项目-商务经理-->
			<tab-pane label="未完结项目" name="upba" v-if="HasPermission('upba')">
				<component :is="upbaview" @discriminationBtn="discriminationBtn" ref="unprojectview" authType="upba"></component>
			</tab-pane>


			<!--历史项目-项目成员-->
			<tab-pane label="历史项目" name="hisuc" v-if="HasPermission('hisuc')">
				<component :is="hisucview" authType="hisuc"></component>
			</tab-pane>
			<!--历史项目-部门-->
			<tab-pane label="历史项目" name="hisdepart" v-if="HasPermission('hisdepart')">
				<component :is="hisdepartview" authType="hisdepart"></component>
			</tab-pane>
			<!--历史项目-全部-->
			<tab-pane label="历史项目" name="hisall" v-if="HasPermission('hisall')">
				<component :is="hisallview" authType="hisall"></component>
			</tab-pane>
			<!--历史项目-项目经理-->
			<tab-pane label="历史项目" name="hismgr" v-if="HasPermission('hismgr')">
				<component :is="hismgrview" authType="hismgr"></component>
			</tab-pane>
			<!--历史项目-商务经理-->
			<tab-pane label="历史项目 " name="hisba" v-if="HasPermission('hisba')">
				<component :is="hisbaview" authType="hisba"></component>
			</tab-pane>


			<tab-pane label="新邀请" name="newinvite" v-if="HasPermission('newinvite')">
				<component :is="newinviteview"></component>
			</tab-pane>
			<tab-pane label="洽谈中" name="talks" v-if="HasPermission('talks')">
				<component :is="talksview"></component>
			</tab-pane>
			<tab-pane label="已合作" name="alreadycp" v-if="HasPermission('alreadycp')">
				<component :is="alreadycpview"></component>
			</tab-pane>
			<tab-pane label="未中标" name="unbid" v-if="HasPermission('unbid')">
				<component :is="unbidview"></component>
			</tab-pane>
			<template slot="right">
				<ExportButton class="export_btn" v-if="exportVisible"></ExportButton>
				<CreatProjectButton class="createProjectBtn2" :type="2" v-if="HasPermission('cp_btn_type_circle')"></CreatProjectButton>
			</template>
		</tabs>
		<ProjectAudit class="todo-module" v-if="pBacklog" v-show="auditView"></ProjectAudit>
	</div>
</template>

<script>
	let HerGhostScroll = () => import('@/components/scroll/HerGhostScroll.vue')
	let Tabs = () =>
		import('@/components/tabs/Tabs.vue')
	let TabPane = () =>
		import('@/components/tabs/TabPane.vue')
	let ProjectAudit = () =>
		import('@/modules/ProjectDetails_Right/ProjectAudit.vue')

	let PjManagement_Count = () =>
		import('./PjManagement_Count.vue')

	let UnFinishedProjectList = () =>
		import('@/modules/UnFinishedProjectList.vue')
	let PjManagement_UnFinished_Details = () =>
		import('@/page/BusinessAffairs/PjManagement_UnFinished_Details.vue')
	let PjManagement_UnFinished_Steps = () =>
		import('@/page/BusinessAffairs/PjManagement_UnFinished_Steps.vue')

	let PjManagement_History = () =>
		import('@/modules/HistoryProjectSearch.vue')

	let NewInviteSearch = () =>
		import('@/modules/NewInvite/NewInviteSearch.vue')
	let UnBidSearch = () =>
		import('@/modules/UnBidSearch.vue')
	let TalksSearch = () =>
		import('@/modules/TalksSearch.vue')
	let AlReadyCpSearch = () =>
		import('@/modules/AlreadyCp/AlReadyCpSearch.vue')
	let CreatProjectButton = () =>
		import('@/modules/Creat_Project_Button.vue')
	let ExportButton = () =>
		import('@/modules/Export_Button.vue')
		
	export default {
		name: 'PjManagement',
		data() {
			return {
				tabright: 108,
				exportVisible: false,
				activeName: null,
				auditView: false,
				countview: null,
				upucview: null,
				updepartview: null,
				upallview: null,
				upmgrview: null,
				upbaview: null,
				hyprojectview: null,
				hisucview: null,
				hisdepartview: null,
				hisallview: null,
				hismgrview: null,
				hisbaview: null,
				newinviteview: null,
				talksview: null,
				alreadycpview: null,
				unbidview: null,
				tabClass: '',
				state: this.$store.state,
				judgeBtn: '',
				taskData: {},
			}
		},
		beforeMount() {},
		watch: {
		},
		components: {
			Tabs,
			TabPane,
			ProjectAudit,
			CreatProjectButton,
			ExportButton,
			'herghost-scroll' : HerGhostScroll
		},
        computed:{
            pBacklog(){
                if(this.HasPermission('pBacklog')) {
                    return true
                }
                return false
			}
		},
		mounted: function() {
		},
		beforeDestroy() {
		},
		methods: {
			checkPermission(name) {
				if(name == 'hisuc') {
					this.exportVisible = true
					this.tabright = 190
				} else {
					this.exportVisible = false
					this.tabright = 118
				}
			},
			handleClick(tab, event) {
				this.checkPermission(tab.name)
				this.showProjectAudit()
				if(tab.name == 'count') {
					this.countview = PjManagement_Count
				}
				if(tab.name == 'upuc') {
					this.upucview = UnFinishedProjectList
				}
				if(tab.name == 'updepart') {
					this.updepartview = UnFinishedProjectList
				}
				if(tab.name == 'upall') {
					this.upallview = UnFinishedProjectList
				}
				if(tab.name == 'upmgr') {
					this.upmgrview = UnFinishedProjectList
				}
				if(tab.name == 'upba') {
					this.upbaview = UnFinishedProjectList
				}
				if(tab.name == 'hisuc') {
					this.hisucview = PjManagement_History
				}
				if(tab.name == 'hisdepart') {
					this.hisdepartview = PjManagement_History
				}
				if(tab.name == 'hisall') {
					this.hisallview = PjManagement_History
				}
				if(tab.name == 'hismgr') {
					this.hismgrview = PjManagement_History
				}
				if(tab.name == 'hisba') {
					this.hisbaview = PjManagement_History
				}
				if(tab.name == 'newinvite') {
					this.newinviteview = NewInviteSearch
				}
				if(tab.name == 'talks') {
					this.talksview = TalksSearch
				}
				if(tab.name == 'alreadycp') {
					this.alreadycpview = AlReadyCpSearch
				}
				if(tab.name == 'unbid') {
					this.unbidview = UnBidSearch
				}
			},
			showProjectAudit() {
				if (this.pBacklog) {
					this.tabClass = 'tabss'
                	this.auditView = true
				}
			},
			hideProjectAudit() {
				if (this.pBacklog) {
					this.tabClass = ''
                	this.auditView = false
				}
			},
			discriminationBtn(val) {
				this.judgeBtn = val;
			}
		}
	}
</script>

<style scoped>
	.el-breadcrumb {
		margin-top: 14px;
	}
	.tabss {
		margin-right: 334px;
	}
	
	.todo-module {
		position: absolute;
		top: 0;
		right: 0;
		width: 334px;
		overflow: hidden;
		height: 100%;
		background: #fff;
	}
</style>