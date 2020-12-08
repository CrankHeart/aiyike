import Vuex from 'vuex'
/**
 * 作用域：整个SPA应用生命周期
 * 作用：全局状态存储
 */
export var store = new Vuex.Store({
	state: {
		loginInfo: {},
		testvalue: 999,
		dicinitPwd: null,
		pjManagement_UnFinished: {
			project_item_data: null,
			viewName: '',
			clickState: false,
			switchState:false,			//部门经理工作台未完成项目切换详情页
            // switchStepsState:false,			//切换到项目立项页面
            itemPassingStatus:{
            	
            },								//创项传审核状态
            cusCommentReload:false,
            authType: '',
		},
		pjDetails: {
			leftData: {}
		},
		pjManagement_New_Invite: {
			project_item_data: null,
			viewName: '',
			clickState: false
		},
		pjManagement_AlreadyCp: {
			project_item_data: null,
			viewName: '',
			clickState: false
		},
		org: {
			link2level: false,
			link1Data: null
		},
        LogManagement:{
            switchToLogViewData: {},
        },
		menu$route: null,
		currentItemOutId: null,
		itemOutData: {},
		maxScreenHeight: null,
		islogin: false,
		logAuditState: null, //日志审核模块的显示隐藏状态
		logSearchReload:false,//日志查询页面更新
		projectAuditState: false, //项目审核模块的显示隐藏状态
		paneResize: false, //window窗口大小变化，tabs-pane组件观察此值的变化，重置pane的宽高
		vueInstance: null,
		isSetRoute: false,
		isWeeklyDetails:0,
        writeWeeklyType:'',					//写周报类型  1为项目周报 0为非项目周报
        doTaskItem:{},
        doTaskitemRequireList:[{}],
        doTaskItemProgressRecord: [],
        WeeklyDetalisData:null,		//周报数据
        wiListData:null,				//项目周报文件夹里的子文件列表
        editStatus:false,					//false为添加,true状态为编辑
        lookUpWeeklyActiveKey:null,
        leftWeeklyList:false,		//点击左侧取数据的时候是logId，其余的是id
        myWeeklyList:[],
		searchWeeklyList:[],
		staffRegInfo: {
			userName: '',
			email: '',
			valiCode: '',
			password: '',
			checkPass: '',
			isread: true
		},
		teamDetails: {},
		outItemItem: {},
		outItemLeftDetails: {},
		outItemProgressLeftDetails: {},
		outItemAudit: {},
		outEvInfoItem: {
			ratio: '',
			id: '',
			budget: ''
		},
		outItemMgtSteps: {
			state: '',
			jumpData: {}
		},
		outReporting: {
			state: '',
			data: {}
		}
	},

	/**
	 * 以键值得到状态值
	 * store.getters.test为999
	 */
	getters: {
		org: (state, getters) => {
			return state.org
		},
		test: (state, getters) => {
			return state.testvalue
		},
		context: (state, getters) => {
			return state.context
		},
		vueInstance: (state, getters) => {
			return state.vueInstance
		},
		dicInitPwdVal: (state, getters) => {
			return state.dicinitPwd
		},
        pjManageUnFinished: (state, getters) => {
            return state.pjManagement_UnFinished
		},
		pjManageNewInvite: (state, getters) => {
            return state.pjManagement_New_Invite
		},
		pjManagementAlreadyCp: (state, getters) => {
            return state.pjManagement_AlreadyCp
		},
		itemOutData: (state, getters) => {
			return state.itemOutData
		},
		currentItemOutId: (state, getters) => {
			return state.currentItemOutId
		},
		userInfo(state, getters) {
			return state.userInfo
		},
		isSetRoute(state, getters) {
			return state.isSetRoute
		},
		menu$route(state, getters) {
			return state.menu$route
		},
        isWeeklyDetails:(state,getters)=>{
			return state.isWeeklyDetails;
		},
        writeWeeklyType:(state,getters)=>{
            return state.writeWeeklyType;
        },
        switchToLogViewData:(state,getters)=>{
            return state.LogManagement.switchToLogViewData
        },
        doTaskItem(state, getters){
        	return state.doTaskItem
        },
        doTaskitemRequireList(state, getters){
        	return state.doTaskitemRequireList
        },
        doTaskItemProgressRecord(state, getters){
        	return state.doTaskItemProgressRecord
        },
        WeeklyDetalisData:(state,getters)=>{
            return state.WeeklyDetalisData
        },
		wiListData:(state,getters)=>{
			return state.wiListData
		},
        editStatus:(state, getters)=>{
            return state.editStatus
		},
		lookUpWeeklyActiveKey(state, getters){
            return state.lookUpWeeklyActiveKey
		},
        leftWeeklyList(state, getters){
            return state.leftWeeklyList
		},
        myWeeklyList(state, getters){
            return state.myWeeklyList
		},
        searchWeeklyList(state, getters){
            return state.searchWeeklyList
        },
		unFinishAuthType(state, getters) {
			return state.pjManagement_UnFinished.authType
		},
		pjDetailsLeftData(state, getters) {
			return state.pjDetails.leftData
		},
		staffRegInfo(state, getters) {
			return state.staffRegInfo
		},
		teamDetails(state, getters) {
			return state.teamDetails
		},
		outItemLeftDetails(state, getters) {
			return state.outItemLeftDetails
		},
		outItemProgressLeftDetails(state, getters) {
			return state.outItemProgressLeftDetails
		},
		loginInfo(state, getters) {
			return state.loginInfo
		},
		outItemAudit(state, getters) {
			return state.outItemAudit
		},
		outEvInfoItem(state, getters) {
			return state.outEvInfoItem
		},
		outItemMgtSteps_State(state, getters) {
			return state.outItemMgtSteps.state
		},
		outItemMgtSteps_JumpData(state, getters) {
			return state.outItemMgtSteps.jumpData
		},
		outItemItem(state, getters) {
			return state.outItemItem
		},
		outReporting_State(state, getters) {
			return state.outReporting.state
		},
		outReporting_Data(state, getters) {
			return state.outReporting.data
		},
	},
	/**
	 * 通过this.$store.commit('increment')唤醒一个 mutation handler
	 */
	mutations: {
		//测试
		increment(state) {
			state.testvalue++
		},
		setLoginInfo(state, val) {
			state.loginInfo = val
		},
		setOrgLink2level(state, val) {
			state.org.link2level = val
		},
		setOrgLink1Data(state, val) {
			state.org.link1Data = val
		},
		logSearchReload(state) {
			state.logSearchReload = !state.logSearchReload
		},
		hideLogAudit(state) {
			state.logAuditState = false
		},
		showLogAudit(state) {
			state.logAuditState = true
		},
		hideProjectAudit(state) {
			state.projectAuditState = false
		},
		showProjectAudit(state) {
			state.projectAuditState = true
		},
		resizePane(state) {
			state.paneResize = !state.paneResize
		},
		setScreenHeight(state, val) {
			state.maxScreenHeight = val
		},
		setPjManageUnFinishedItem(state, val) {
			state.pjManagement_UnFinished.project_item_data = val
		},
        setPjManageUnFinishedViewName(state, val) {
            state.pjManagement_UnFinished.viewName = val
        },
        setPjManageUnFinishedSwitchState(state, val) {
            state.pjManagement_UnFinished.switchState = val
        },
        // setPjManageUnFinishedSwitchStepsState(state, val) {
        //     state.pjManagement_UnFinished.switchStepsState = val
        // },
        setPjManageUnFinishedItemPassingStatus(state, val) {
            state.pjManagement_UnFinished.itemPassingStatus = val
        },
		changePjManageUnFinishedClickState(state) {
			state.pjManagement_UnFinished.clickState = !state.pjManagement_UnFinished.clickState
		},
		setPjManageNewInviteItem(state, val) {
			state.pjManagement_New_Invite.project_item_data = val
		},
        setPjManageNewInviteViewName(state, val) {
            state.pjManagement_New_Invite.viewName = val
        },
		changePjManageNewInviteClickState(state) {
			state.pjManagement_New_Invite.clickState = !state.pjManagement_New_Invite.clickState
		},
		setPjManagementAlreadyCpItem(state, val) {
			state.pjManagement_AlreadyCp.project_item_data = val
		},
        setPjManageAlreadyCpViewName(state, val) {
            state.pjManagement_AlreadyCp.viewName = val
        },
		changePjManageAlreadyCpClickState(state) {
			state.pjManagement_AlreadyCp.clickState = !state.pjManagement_AlreadyCp.clickState
		},
		setVueInstance(state, val) {
			state.vueInstance = val
		},
		setDicInitPwd(state, val) {
			state.dicinitPwd = val
		},
		setItemOutData(state, val) {
			state.itemOutData = val
		},
		setItem(state, val){
			state.item = val
		},
		setItemRequireList(state,val){
        	state.itemRequireList = val
        },
		setCurrentItemOutId(state, val) {
			state.currentItemOutId = val
		},
		setRouteFlag(state, val) {
			state.isSetRoute = val
		},
		setMenuRoute(state, val) {
			state.menu$route = val
		},
        changeWeeklyContentView(state,val){
			state.isWeeklyDetails = val;
		},
        LogManagementToEditViewData(state,val){
            state.LogManagement.switchToLogViewData = val
        },
        setDoTaskItem(state, val){
        	return state.doTaskItem = val
        },
        setDoTaskitemRequireList(state, val){
        	return state.doTaskitemRequireList = val
        },
        setDoTaskItemProgressRecord(state, val){
        	return state.doTaskItemProgressRecord = val
        },
        writeWeeklyType(state,val){
            state.writeWeeklyType = val
        },
        WeeklyDetalisData(state,val){
            state.WeeklyDetalisData = val
        },
        wiListData(state,val){
            state.wiListData = val
        },
        editStatus(state,val){
            state.editStatus = val
		},
        lookUpWeeklyActiveKey(state,val){
            state.lookUpWeeklyActiveKey = val
		},
        leftWeeklyList(state,val){
            state.leftWeeklyList = val
		},
        myWeeklyList(state,val){
            state.myWeeklyList = val
		},
        searchWeeklyList(state,val){
            state.searchWeeklyList = val
        },
		toggleCusCommentReload(state){
            state.pjManagement_UnFinished.cusCommentReload = !state.pjManagement_UnFinished.cusCommentReload
		},
		setUnFinishAuthType(state, val) {
			state.pjManagement_UnFinished.authType = val
		},
		setPjDetailsLeftData(state, val) {
			state.pjDetails.leftData = val
		},
		staffRegInfo(state, val) {
			state.staffRegInfo = val
		},
		teamDetails(state, val) {
			state.teamDetails = val
		},
		outItemLeftDetails(state, val) {
			state.outItemLeftDetails = val
		},
		outItemProgressLeftDetails(state, val) {
			state.outItemProgressLeftDetails = val
		},
		outItemAudit(state, val) {
			state.outItemAudit = val
		},
		outEvInfoItem(state, val) {
			state.outEvInfoItem = val
		},
		outItemMgtSteps_State(state, val) {
			state.outItemMgtSteps.state = val
		},
		outItemMgtSteps_JumpData(state, val) {
			state.outItemMgtSteps.jumpData = val
		},
		outItemItem(state, val) {
			state.outItemItem = val
		},
		outReporting_State(state, val) {
			state.outReporting.state = val
		},
		outReporting_Data(state, val) {
			state.outReporting.data = val
		}
	},
	/**
	 * 通过this.$store.dispatch('INCREMENT')唤醒一个 actions,actions触发一个mutation
	 */
	actions: {
        CHANGE_WEEKLY_CONTENT_VIEW({commit}, val) {
            commit("changeWeeklyContentView", val)
        },
		//测试
		INCREMENT({commit}) {
			commit("increment")
		},
		HIDE_LOG_AUDIT({commit}) {
			commit("hideLogAudit")
		},
		SHOW_LOG_AUDIT({commit}) {
			commit("showLogAudit")
		},
		HIDE_PROJECT_AUDIT({commit}) {
			commit("hideProjectAudit")
		},
		SHOW_PROJECT_AUDIT({commit}) {
			commit("showProjectAudit")
		},
		RESIZE_PANE({commit}) {
			commit("resizePane")
		},
		SET_SCREEN_MAX_HEIGHT({commit}, val) {
			commit("setScreenHeight", val)
		},
		DICTIONARY({commit}, code) {
			const vue = this.getters.vueInstance
			return new Promise((resolve, reject) => {
				vue.$http.post('/api/dictionaryCategory/queryDictionByCode', {
					code
				}, {
					emulateJSON: true
				}).then((res) => {
					let data = res.data;
					if(data.success) {
						resolve(data.result)
					} else {
						reject(data)
					}
				}).catch((err) => {
					reject(err)
				})
			})
		},
		LOGIN({commit}, obj) {
			const vue = this.getters.vueInstance
			console.log(vue);
			return new Promise(function(resolve, reject) {
				vue.$http.post("/api/bus/login", obj, {
					emulateJSON: true
				}).then((res) => {
					console.log(res)
					var data = res.data
					if(data.success) {
						if(!data.result.pList) {
							data.result.pList = []
						}
//						if (Object.isEmpty(data.result.depart)) {
//							console.log('#####'+data.result)
//							data.result.depart = {}
//							vue.$message({
//								customClass: 'error',
//								message: '未找到此用户所在部门！'
//							});
//						}
						Cache.local(Config.Login, data.result)
						resolve(data.result)
					} else {
						reject(data)
					}
				}).catch((err) => {
					reject(err)	
				})
			})
		},
		QUIT({commit}) {
			const vue = this.getters.vueInstance
			return new Promise(function(resolve, reject) {
				vue.$http.post("/api/bus/logout", {}, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data
					if(data.success) {
						commit('setRouteFlag', false)
						commit('setMenuRoute', null)
						Cache.removeLocal(Config.Login)
						vue.$router.push('/')
						location.reload()
						resolve(data)
					} else {
						reject(data)
					}
				}).catch((err) => {
					reject(err)	
				})
			})
		},
		QUITNOTREMOVE({commit}) {
			const vue = this.getters.vueInstance
			return new Promise(function(resolve, reject) {
				vue.$http.post("/api/bus/logout", {}, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data
					if(data.success) {
						resolve(data)
					} else {
						reject(data)
					}
				}).catch((err) => {
					reject(err)	
				})
			})
		}
	}
})