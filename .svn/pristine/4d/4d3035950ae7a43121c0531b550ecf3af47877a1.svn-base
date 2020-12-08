<!--日志管理-->
<template>
	<div class="wrap container">
		<tabs ref="tabs" :class="tabClass" v-model="activeName" @tab-click="handleClick">
			<tab-pane label="我的" name="my" v-if="HasPermission('my')">
				<component :is="myview" @back="back2my" @init="hideReleaseLogBtn"  @editLog="releaseWeekly" :editLogDataSource="editLogDataSource"></component>
			</tab-pane>
			<tab-pane label="查询" name="search" v-if="HasPermission('search')">
				<component :is="searchview" class="logmy"></component>
			</tab-pane>
			<tab-pane label="项目日志" name="pm" v-if="HasPermission('pm')">
				<component :is="pmview" class="logmy"></component>
			</tab-pane>
			<template slot="right">
				<el-button v-if="releaseLogBtnPM" class="release-weekly-btn statusbtn" type="primary" icon="icon-add1" @click="releaseWeekly()">发布日志</el-button>
			</template>
		</tabs>
		<component :is="logAuditView" class="todo-module" v-if="logAuditPM"></component>
	</div>
</template>

<script>
	let LogAudit = () =>
		import('@/modules/LogAudit.vue')
	let LogManagement_My = () =>
		import('@/modules/LogManagement/My.vue')
	let LogManagement_Search = () =>
		import('@/modules/LogManagement/Search.vue')
	let LogManagement_Pm = () =>
		import('@/modules/LogManagement/Pm.vue')
	let LogManagement_My_ReleaseLog = () =>
		import('@/modules/LogManagement/ReleaseLog.vue')
	let Tabs = () =>
		import('@/components/tabs/Tabs.vue')
	let TabPane = () =>
		import('@/components/tabs/TabPane.vue')

	export default {
		name: 'LogoManagement',
		data() {
			return {
				activeName: null,
				userId: JSON.parse(Cache.local(Config.Login)).uc.id, //登录人id
				departId: JSON.parse(Cache.local(Config.Login)).depart.id,//登录人所在部门id
				myview: null,
				searchview: null,
				pmview: null,
				editLogDataSource: null,
				bcMy: {
					link: '',
					link2: ''
				},
				logAuditView: null,
				state: this.$store.state,
				tabClass: 'tabss',
				enableReleaseWeeklyBtn: false,
				releaseLogBtnVisible: true,
				enableLogAudit: true
			}
		},
		components: {
			Tabs,
			TabPane,
			LogManagement_My,
			LogManagement_Search,
			LogManagement_My_ReleaseLog
		},
		mounted: function() {
		},
		beforeDestroy() {
		},
		watch: {
			'state.logAuditState'(val) {
				if(val) {
					this.enableLogAudit = true
					this.setLogAuditState('show')
				} else {
					this.enableLogAudit = false
					this.setLogAuditState('hide')
				}
			}
		},
		computed: {
			releaseLogBtnPM() {
				if (this.HasPermission('release_log_btn') && this.releaseLogBtnVisible) {
					return true
				}
				return false
			},
			logAuditPM(){
				if (this.HasPermission('log_audit')) {
					if (this.enableLogAudit) {
						this.setLogAuditState('show')
						return true
					}
				} else {
					this.setLogAuditState('hide')
					return false
				}
			}
		},
		methods: {
			showReleaseLogBtn() {
				this.releaseLogBtnVisible = true
			},
			hideReleaseLogBtn() {
				this.releaseLogBtnVisible = false
			},
			setLogAuditState(state) {
				if (state == 'show') {
					this.showLogAudit()
				}
				if (state == 'hide') {
					this.hideLogAudit()
				}
			},
			showLogAudit() {
				if (this.HasPermission('log_audit')) {
					this.tabClass = 'tabss'
					this.logAuditView = LogAudit
				}
			},
			hideLogAudit() {
				this.tabClass = ''
				this.logAuditView = null
			},
			handleClick(tab, event) {
				if(tab.name == "my") {
					this.myview = LogManagement_My
					this.showReleaseLogBtn()
					this.$store.dispatch('SHOW_LOG_AUDIT')
				} else if(tab.name == "search") {
					this.searchview = LogManagement_Search
				} else if(tab.name = 'pm') {
					this.pmview = LogManagement_Pm
				}
			},
			back2my() {
				this.myview = LogManagement_My
				this.showReleaseLogBtn()
				this.$store.dispatch('SHOW_LOG_AUDIT')
			},
			releaseWeekly(data) {
				this.myview = LogManagement_My_ReleaseLog
				this.editLogDataSource = !!data ? data : null
			}
		}
	}
</script>

<style scoped>
	.release-weekly-btn {
		width: 116px;
		height: 30px;
		line-height: 0;
		padding: 0;
	}
	
	.logmy {}
	
	.el-breadcrumb {
		margin-top: 14px;
	}
	
	.header {
		height: 64px;
	}
	
	.header .title {
		font-size: 16px;
		font-weight: bold;
	}
	
	.worktab>.el-tabs__header {
		background: #f8f9fb;
	}
	
	.tabss {
		margin-right: 334px;
	}
	
	.todo-module {
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.el-row {
		height: auto;
	}
</style>