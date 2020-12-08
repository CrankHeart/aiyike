<!--周报管理-->
<template>
	<div class="wrap container">
		<tabs ref="tabs" :class="[tabClass,'hgscroll-lefttab']" v-model="activeName" @tab-click="handleClick">
			<tab-pane label="我的" name="my" v-if="HasPermission('my')">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item>{{bcMy.link}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{bcMy.link2}}</el-breadcrumb-item>
				</el-breadcrumb>
				<component :is="myview" class="logmy"></component>
			</tab-pane>
			<tab-pane label="查询" name="search" v-if="HasPermission('search')">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item>当前位置：周报管理</el-breadcrumb-item>
					<el-breadcrumb-item>查询</el-breadcrumb-item>
				</el-breadcrumb>
				<component  :is="searchview" class="logmy"></component >
			</tab-pane>
			<tab-pane label="我的(项目经理)" name="omy" v-if="HasPermission('omy')">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item>{{bcMy.link}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{bcMy.link2}}</el-breadcrumb-item>
				</el-breadcrumb>
				<component :is="myview2" class="logmy"></component>
			</tab-pane>
			<tab-pane label="查询(项目经理)" name="osearch" v-if="HasPermission('osearch')">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item>当前位置：周报管理</el-breadcrumb-item>
					<el-breadcrumb-item>查询</el-breadcrumb-item>
				</el-breadcrumb>
				<component :is="searchview2" class="logmy"></component>
			</tab-pane>
		</tabs>
		<component :is="weeklyAuditView" class="todo-module"  v-if="weeklyaudited"></component>
		<el-button  v-if="HasPermission('omyadd')" v-show="enableReleaseWeeklyBtn" class="statusbtn" :class="btnClass" type="primary" icon="icon-add1" @click="projectWeekly">发布周报</el-button>
		<!--总监身份以上可以发布部门周报和项目周报-->
		<div v-if="HasPermission('myadd')" class="statusbtn" :class="btnClass" v-show="enableReleaseWeeklyBtn">
			<el-button type="primary" icon="icon-add1" @click="departmentalWeekly" class="statusbtn">发布周报</el-button>
		</div>

	</div>
</template>

<script>
	let WeeklyAudit = () => import('@/modules/week/WeeklyAudit.vue')			//右侧审核弹窗
	let WeeklyManagement_My = () => import('./WeeklyManagement_My.vue')
    let WeeklyManagement_My_Two = () => import('./WeeklyManagement_My2.vue')
	let WeeklyManagement_Search = () => import('./WeeklyManagement_Search.vue')
    let WeeklyManagement_Search_Two = () => import('./WeeklyManagement_Search2.vue')
	let ReleaseLog = () => import('@/modules/LogManagement/ReleaseLog.vue')
	let Tabs = () => import('@/components/tabs/Tabs.vue')
	let TabPane = () => import('@/components/tabs/TabPane.vue')

	export default {
		name: 'WeeklyManagement',
		data() {
			return {
			    showWeeklyTypeTip:false,
                state: this.$store.state,
				activeName: null,
				myview: null,
                myview2: null,
				searchview: null,
                searchview2: null,
				bcMy: {
					link: '当前位置：周报管理',
					link2: '我的'
				},
                weeklyAuditView: null,
				state: this.$store.state,
				tabClass: 'tabss',
				btnClass:'btnClass0',
				enableReleaseWeeklyBtn: false
			}
		},
		watch: {
			// 'state.logAuditState'(val) {
			// 	if (val) {
			// 		this.showWeeklyAudit()
			// 	} else {
			// 		this.hideWeeklyAudit()
			// 	}
			// 	this.$store.dispatch('RESIZE_PANE')
			// }
		},
		computed:{
            weeklyaudited(){
                this.$nextTick(()=>{
                    this.$store.commit('resizePane')
				})
                if(this.HasPermission('weeklyaudited')) {
                    this.showWeeklyAudit()
                    return true
				}
                this.hideWeeklyAudit()
				return false
			}
		},
		components: {
			Tabs,
			TabPane,
            WeeklyManagement_My,
            WeeklyManagement_My_Two,
            WeeklyManagement_Search,
            WeeklyManagement_Search_Two,
			ReleaseLog
		},
		mounted: function() {
		},
		beforeDestroy() {
		},
		methods: {
			showWeeklyAudit() {
				this.tabClass = 'tabss'
				this.btnClass = 'btnClass360'
				this.weeklyAuditView = WeeklyAudit
			},
			hideWeeklyAudit() {
				this.tabClass = ''
                this.btnClass = 'btnClass0'
				this.weeklyAuditView = null
			},
			handleClick(tab, event) {
				if(tab.name == "my") {
					this.myview = WeeklyManagement_My;
					this.enableReleaseWeeklyBtn = true
				}else if(tab.name == "omy") {
                    this.myview2 = WeeklyManagement_My_Two
                    this.enableReleaseWeeklyBtn = true
                }else if(tab.name == "search") {
                    this.searchview = WeeklyManagement_Search
                    this.enableReleaseWeeklyBtn = false
                } else if(tab.name == "osearch") {		//前面带o代表职位比较低的人的
					this.searchview2 = WeeklyManagement_Search_Two
					this.enableReleaseWeeklyBtn = false
				}
				this.$store.dispatch('SHOW_LOG_AUDIT')
			},
			releaseWeekly() {
				this.myview = ReleaseLog
				this.enableReleaseWeeklyBtn = false
			},
			//高职位发布周报
            highPositionWeekly(){
			    if(!this.showWeeklyTypeTip){
                    this.showWeeklyTypeTip = true
				}else{
                    this.showWeeklyTypeTip = false
				}
			},
			//部门周报
            departmentalWeekly(){
            	this.$router.push('/weeklymanagement/writed')
			},
			//项目周报
            projectWeekly(){
                this.$router.push('/weeklymanagement/writep')
			}
		}
	}
</script>

<style scoped>
	.btnClass360{
		position: absolute;
	    right: 360px;
    	top: 15px;
	}
	.btnClass0{
		position: absolute;
		right: 46px;
		top: 15px;
	}
	.logmy{
		margin-top: 24px;
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
	.triangle{
		border-color: transparent transparent #181818 transparent;
		border-style: solid;
		border-width: 0 6px 10px 6px;
		height: 0;
		width: 0;
		position: absolute;
		left: 52px;
		top: 38px;
	}
	.weekly-type-tip-main{
		width: 94px;
		padding: 0 8px;
		background-color: #181818;
		margin-top: 10px;
	}
	.weekly-type-tip-main>div{
		height:42px;
		line-height: 42px;
		text-align: center;
		cursor: pointer;
		color:#fff;
		font-size: 14px;
	}
	.weekly-type-tip-main>div:not(:last-child){
		border-bottom: 1px solid #cfcfcf;
	}
</style>