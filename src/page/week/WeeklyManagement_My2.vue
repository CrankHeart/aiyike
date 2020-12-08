<template>
	<div class="WeeklyManagement_My2">
		<section class="layout-list">
			<el-form :inline="true" :model="formInline" class="soso clearfix margin-left8" label-width="68px">
				<el-form-item class="label inlineblock" label="提交日期：">
					<el-date-picker class="input_text" type="date" placeholder="开始日期" v-model="formInline.starttime" style="width: 109px;"></el-date-picker>
					<span class="line">-</span>
					<el-date-picker class="input_text" type="date" placeholder="结束日期" v-model="formInline.endtime" style="width: 109px;"></el-date-picker>
				</el-form-item>
				<!--<el-form-item class="label inlineblock" label="周报内容：">-->
					<!--<el-input v-model="formInline.weeklycontent" class="select-wrap" filterable placeholder="选输入"></el-input>-->
				<!--</el-form-item>-->
				<el-form-item class="label inlineblock marginLeft18 form190" label="项目名称：">
					<el-select v-model="formInline.entryNameValue" class="select-wrap proName" filterable multiple placeholder="选择项目名称" v-sicon1>
						<el-option v-for="item in entryName" :key="item.id" :label="stringSplit(item.name)" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-button type="primary" @click="onSoso" class="sosobtn">搜索</el-button>
			</el-form>
			<div class="log-list clearfix" ref="panelWrap">
				<template v-for="(item,key) in weeklyList">

						<ProjectWeekly v-if="item.category == 1" :key="key" :item="item" class="fl currWeeklyList ProjectWeekly" ref="currWeeklyList" @hover="showOperationOrNot" @click.native="ProjectWeeklyDeatils(key,item)">
						</ProjectWeekly>
						<BusinessWeekly v-if="item.category == 2" :key="key" :ishoverOrNot="item.status == 0||item.status == 2 ? true:false" ref="currWeeklyList" :item="item" class="fl currWeeklyList BusinessWeekly" @hover="showOperationOrNot" @click.native="departmentWeeklyDetails(key,item)">
							<div slot="operation" class="operation-wrap" ref="operation" v-show="hoverStatus==1">
								<div class="fl" style="margin-right: 10px;">
									<i class="el-icon-edit" @click.stop.prevent="editIcon(key,item)"></i>
								</div>
								<div class="fl">
									<i class="el-icon-delete" @click.stop.prevent="deleteIcon(key,item)"></i>
								</div>
							</div>
						</BusinessWeekly>
				</template>
			</div>
		</section>
	</div>
</template>

<script>
	let ProjectWeekly = function(resolve) {
		require(['@/components/weekly-component/ProjectWeekly'], resolve);
	}
	let BusinessWeekly = function(resolve) {
		require(['@/components/weekly-component/BusinessWeekly'], resolve);
	}
	export default {
		name: 'WeeklyManagement_My2',
		data() {
			return {
                dataList: JSON.parse(Cache.local(Config.Login)),
                sendData: null,
				data:null,
                myDate:null,
				hoverStatus: 0,
                state: this.$store,
				logDetailsVisible: false,
                curr_year: '',
				formInline: {
                    starttime: '',
                    endtime: '',
                    month: '',
                    week: '',
					// weeklycontent: '',
					log: '',
                    entryNameValue:[]
				},
                monthOptions: (() => {
                    var arr = []
                    for(var i = 1; i <= 12; i++) {
                        arr.push({
                            value: i,
                            label: i + '月'
                        })
                    }
                    return arr;
                })(),
                weekOptions: null,
                //周报类型
                weeklyType: [{
                    value: '0',
                    label: '部门周报'
                }, {
                    value: '1',
                    label: '项目周报'
                }],
                //项目名称
                entryName: [],
				//搜索周报
				weeklyList: [],
                num:'',
                ratio: '',
                parent: this.$parent.$parent.$parent,
                calculaFlag: true
			}
		},
		watch: {
			'parent.paneWidth'() {
				this.throttle(()=>{
					this.forGetWeeklyDom()
				},500)()
			}
		},
		components: {
			ProjectWeekly,
			BusinessWeekly
		},
		mounted: function() {
            this.myDate = new Date()
            this.sendData = {
                ucId: this.dataList.uc.id,
                departId: this.dataList.uc.departId
            }
            this.data = JSON.parse(JSON.stringify(this.sendData))
            this.getMyList()
            this.getProjectName()
		},
		methods: {
            departmentWeeklyDetails(index,data) {
                this.state.commit('lookUpWeeklyActiveKey',index)
                this.state.commit('myWeeklyList',this.weeklyList)
                this.$router.push({path:`/weeklymanagement/weeklym`, query: {id:data.id,jumpstatus: "1"}})
            },
            ProjectWeeklyDeatils(index,data) {
                this.state.commit('lookUpWeeklyActiveKey',index)
                this.state.commit('myWeeklyList',this.weeklyList)
                this.$router.push({path:`/weeklymanagement/weeklym`, query: {id:data.id,jumpstatus: "1"}})
            },
            //获取周报列表
            getMyList() {
                this.data.pageSize = 200
                //获取我的周报列表
                this.$http.post('/api/week/my', this.data, {
                    emulateJSON: true
                })
                    .then((res) => {
                        var data = res.data
                        if(data.success) {
                            this.weeklyList = data.result.content
                            this.$nextTick(()=>{
                                this.forGetWeeklyDom()
                            })
                            //将时间转为时间戳
                            this.changeDateFormat(this.weeklyList)
                        }
                    }).catch((err) => {})
            },
            getProjectName() {
                //获取项目名称
                this.$http.post('/api/item/itemNameList', this.sendData, {
                    emulateJSON: true
                })
                    .then((res) => {
                        var data = res.data;
                        if(data.success) {
                            this.entryName = data.result
                        }
                    }).catch((err) => {

                })
            },
            stringSplit(str){
            	if(str.length > 12){
            		str = str.substr(0,12) + '...'
            	}
				return str
			},
            //转换日期格式至时间戳
            changeDateFormat(stringTime) {
                for(var i = 0; i < this.weeklyList.length; i++) {
                    this.weeklyList[i].createTime = Date.parse(new Date(stringTime[i].createTime))
                }
            },
			showOperationOrNot(status) {
				this.hoverStatus = status;
			},
            editIcon(key, data) {
                this.state.commit('editStatus', true) //发送编辑状态
                this.state.commit('WeeklyDetalisData', data) //发送编辑数据
                this.$router.push('/weeklymanagement/writep')
            },
            deleteIcon(key, data) {
                var _self = this
                if(data.type != 1) {
                    this.$http.post('/api/week/delWeekLog/' + data.id, {
                        id: data.id
                    }, {
                        emulateJSON: false
                    })
                        .then((res) => {
                            var data = res.data
                            if(data.success) {
                                this.$message({
                                	customClass: 'success',
                                    message: '删除成功',
                                    duration:'1000',
                                    onClose:function (message) {
                                        _self.weeklyList.splice(key, 1);
                                    }
                                });
                            }
                        }).catch((err) => {})
                }

            },
            forGetWeeklyDom(){
            	
                let _self = this
                let timer = requestAnimationFrame(function fn(){
                //	
                    if (_self.$refs.currWeeklyList && _self.$refs.currWeeklyList.length == _self.weeklyList.length) {
                        cancelAnimationFrame(timer)
                        if (_self.calculaFlag) {
                            _self.calculaFlag = false
                            _self.calculationMargin(false,30)
                        }
                    }else{
                        timer = requestAnimationFrame(fn)
					}
                })
            },
            dealSosoData() {
                //处理搜索数据
                this.data.startTime = !!this.formInline.starttime ? (new Date(this.formInline.starttime)).format("yyyy-MM-dd hh:mm:ss") : ''
                this.data.endTime = !!this.formInline.endtime ? (new Date(this.formInline.endtime)).fullCurTime().format("yyyy-MM-dd hh:mm:ss") : ''
                this.data.itemArr = !!(this.formInline.entryNameValue) ? this.formInline.entryNameValue : ''
            },
            onSoso() {
                this.data = JSON.parse(JSON.stringify(this.sendData))		//重新拷贝一份搜索数据
                this.dealSosoData()
                this.getMyList()
            },
            resetMargins(mval,num){
                var lis = document.getElementsByClassName("WeeklyManagement_My2")[0].querySelectorAll(".currWeeklyList")
                for(let i=0;i<lis.length;i++){
                    if(((i+1)%(num))==0){
                        lis[i].style.marginRight = 0+'px'
                    }else{
                        lis[i].style.marginRight = mval + 'px'
                    }
                }
            },
            calculationMargin(is,minm){
                if (is){
                    this.num--
                    this.ratio++
                    if (this.num <= 0 || this.ratio <= 0) {
                        this.calculaFlag = true
                        return
                    }
                } else {
                    let aw = this.$refs.panelWrap.clientWidth			//总宽度
                    this.num = parseInt(aw/180)				//可放的周报数目
                    this.ratio = aw/180 - parseInt(aw/180)			//每个marginright的比例
                }
                this.mWeekly = (this.ratio*180)/(this.num - 1)
                if(this.mWeekly >= minm){
                    this.$nextTick(()=>{
                        this.resetMargins(this.mWeekly,this.num)
                        this.calculaFlag = true
                    })
                }else{
                    this.calculationMargin(true,30)					//is代表是否支出一个周报的宽度做margin
                }
            },
            throttle(fn,interval){
                var _self = this,	// 保存需要被延迟执行的函数引用
                    timer,			// 定时器
                    firstTime = true;	// 是否是第一次调用
                return function(){
                    var args = arguments,
                        _me =  this;
                    if(firstTime){		//如果是第一次调用，不需延迟执行
                        fn.apply(_me,args);
                        return firstTime = false;
                    }
                    if(timer){			//如果定时器还在，说明前一次的延迟执行还没有完成
                        return false;
                    }
                    timer = setTimeout(function(){		// 延迟一段时间执行
                        clearTimeout(timer);
                        timer = null;
                        fn.apply(_me,args);
                    },interval||500)
                }
            }

		}
	}
</script>

<style scoped>
	.el-form-item {
		margin-right: 0;
		margin-bottom: 2px;
	}
	.wrap {
		position: relative;
	}
	
	.aud-state {
		position: absolute;
		right: 112px;
		top: 0;
		width: 50px;
		height: 50px;
		display: inline-block;
		background: url(../../assets/img/unaudited.png) no-repeat;
		background-size: 50px 50px;
	}
	
	.aud-state.active {
		background: url(../../assets/img/audited.png) no-repeat;
		background-size: 50px 50px;
	}
	
	.input_text {
		font-size: 12px;
		color: #999999;
	}
	
	.label {
		font-size: 12px !important;
		color: #666666 !important;
		margin-right: 10px;
	}
	
	.el-icon-arrow-down {
		margin-left: 13px;
	}
	
	.loadmore-block {
		margin-top: 26px;
		text-align: center;
	}
	
	.loadMorebtn {
		cursor: pointer;
		font-size: 14px;
		color: #5d5d5d;
	}
	
	.sosobtn {
		font-size: 14px;
		color: #FFFFFF;
		background: #295DCF;
		border-radius: 2px;
		width: 90px;
		height: 30px;
		line-height: 0px;
	}
	
	.search {
		float: right;
	}
	
	.soso {
		position: relative;
		padding-right: 100px;
	}
	
	.line {
		text-align: center;
	}
	
	.wrap {
		background: #fff;
		height: auto;
		padding: 20px;
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
	
	.tabs {
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
	
	.box {
		width: 50px;
		height: 50px;
		background: url('../../assets/img/audited.png');
	}
	
	.log-list-item {
		overflow: hidden;
		font-size: 12px;
		margin-bottom: 22px;
		position: relative;
	}
	
	.log-list .log-list-item:nth-last-child(1) {
		margin-bottom: 0;
	}
	
	.log-list-item .l {
		float: left;
	}
	
	.log-list-item .r {
		display: inline-block;
	}
	
	.log-list-item .dsc-item {
		margin-right: 26px;
		margin-left: -3px;
	}
	
	.log-list-item .dsc-item:nth-last-of-type(1) {
		margin-right: 0;
	}
	
	.log-list-item .dsc {
		margin-bottom: 12px;
	}
	
	.log-list-item .dsc:nth-last-of-type(1) {
		margin-bottom: 0;
	}
	
	.log-list-item .tips {
		display: inline-block;
		width: 62px;
		height: 15px;
		font-size: 12px;
		color: #999999;
	}
	
	.log-list-item .t {
		font-size: 12px;
		color: #333333;
		vertical-align: middle;
	}
	
	.log-list-item .data {
		width: 72px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		text-align: right;
		padding-right: 20px;
	}
	
	.log-list-item .data .m {
		font-size: 18px;
		color: #333333;
	}
	
	.log-list-item .data .y {
		font-size: 12px;
		color: #3F3F3F;
		letter-spacing: 0;
		line-height: 25px;
	}
	
	.log-list-item .details {
		padding: 20px 20px;
		background: #fafbfd;
		width: 100%;
		margin-left: 72px;
		display: block;
		position: relative;
		cursor: pointer;
	}
	
	.log-list-item .evaluate {
		margin-top: 15px;
	}
	
	.log-list-item .evaluate .evaluate-item {
		margin-right: 18px;
	}
	
	.log-list-item .evaluate .evaluate-item:nth-last-of-type(1) {
		margin-right: 0;
	}
	
	.primary-type {
		display: inline-block;
		padding: 3px 10px;
		font-size: 12px;
		color: #295DCF;
		background: #eff2fa;
	}
	
	.log-list-item .type span {
		position: relative;
		top: -2px;
	}
	
	.block {
		display: block;
	}
	
	.sosobtn {
		font-size: 14px;
		color: #FFFFFF;
		background: #295DCF;
		border-radius: 2px;
		width: 90px;
		height: 30px;
		line-height: 0;
		position: absolute;
		right: 0px;
		top: 4px;
	}
	
	.log-list {
		background-color: #fff;
	}
	
	.currWeeklyList {
		margin-top: 20px !important;
		/*margin-right: 52px;*/
	}

	.BusinessWeekly{
		margin-bottom: 56px;
	}
	.ProjectWeekly{
		margin-bottom: 100px;
	}
	.operation-wrap {
		position: absolute;
		bottom: 20px;
		left: 20px;
	}
	
	.operation-wrap i {
		font-size: 14px;
		display: block;
		border-radius: 32px;
		text-align: center;
		margin-right: 10px;
		color: #fff;
		background-color: #295DCF;
		padding: 10px;
	}
	.marginLeft18{
		margin-left: -6px;
	}
</style>