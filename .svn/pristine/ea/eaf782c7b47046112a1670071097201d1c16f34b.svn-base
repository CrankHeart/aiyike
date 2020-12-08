<!--osearch-->
<template>
	<div class="WeeklyManagement_Search2">
		<section class="layout-list">
			<el-form :model="formInline" label-position="right" class="soso clearfix margin-left8" label-width="68px">
				<el-form-item class="label inlineblock" label="提交日期：">
					<el-date-picker class="input_text" type="date" placeholder="开始日期" v-model="formInline.starttime" style="width: 109px;"></el-date-picker>
					<span class="line">-</span>
					<el-date-picker class="input_text" type="date" placeholder="结束日期" v-model="formInline.endtime" style="width: 109px;"></el-date-picker>
				</el-form-item>
				<el-form-item class="label inlineblock marginleft10" label="周报内容：">
					<el-input v-model="formInline.weeklycontent" class="select-wrap" filterable placeholder="请输入关键字" style="width: 190px;"></el-input>
				</el-form-item>
				<!--<div class="clearfix">-->
					<el-form-item class="label inlineblock " label="项目名称：">
						<el-select v-model="entryNameValue" class="select-wrap proName" filterable multiple placeholder="选择项目名称" style="width: 190px;" v-sicon1>
							<el-option v-for="item in entryName" :key="item.id" :label="stringSplit(item.name)" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="label inlineblock" label="姓名：" label-width="46px" style="width: 276px">
						<el-select v-model="personnelValue" placeholder="请选择" class="select-wrap" style="width: 190px;" clearable filterable remote :remote-method="remoteNameMethod" :loading="loading" v-sicon1>
							<el-option v-for="item in personnel" :key="item.id" :label="item.chName" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				<!--</div>-->
				<el-button type="primary" @click="onSoso" class="sosobtn">搜索</el-button>
			</el-form>
			<div class="log-list clearfix" ref="panelWrap">

				<template v-for="(item,key) in weeklyList">
					<ProjectWeekly v-if="item.category == 1" :key="key" :item="item" class="fl currWeeklyList ProjectWeekly" ref="currWeeklyList" @hover="showOperationOrNot" @click.native="ProjectWeeklyDeatils(key,item)">
					</ProjectWeekly>
					<BusinessWeekly v-if="item.category == 2" :ishoverOrNot='false' v-else :key="key" :item="item" class="fl currWeeklyList BusinessWeekly" ref="currWeeklyList" @hover="showOperationOrNot" @click.native="departmentWeeklyDetails(key,item)">
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
		name: 'WeeklyManagement_Search2',
		data() {
			return {
				dataList: JSON.parse(Cache.local(Config.Login)),
                sendData: null,
				data:null,
				loading: false,
				hoverStatus: 0,
                myDate:null,
                curr_year: '',
				state:this.$store,
				formInline: {
                    starttime: '',
                    endtime: '',
                    month: '',
                    week: '',
					sendData: null,
					log: '',
					name: '',
					nameList: [],
					nameStates: [],
					weeklycontent: ''
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
				//姓名
				personnel: [],
				entryNameValue: '',
				weeklyTypeValue: '',
				personnelValue: '',
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
				loginId: this.dataList.uc.id,
				ucId: this.dataList.uc.id,
				departId: this.dataList.uc.departId
			}
            this.data = JSON.parse(JSON.stringify(this.sendData));
            delete this.data.ucId
            delete this.data.departId
			this.getSearchList()
			this.getProjectName()
		},
		methods: {
			//查询
			getSearchList() {
				//获取查询周报列表
				this.data.pageSize = 200
                this.data.status = 3
				this.$http.post('/api/week/query', this.data, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							this.weeklyList = data.result.content
							this.nextTick(()=>{
								this.forGetWeeklyDom()
							})
							//将时间转为时间戳
							this.changeDateFormat(this.weeklyList)

						}
					}).catch((err) => {

					})
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
			remoteNameMethod(query) {
				if(query !== '') {
					this.loading = true;
					this.$http.post('/api/uContact/queryUcBlur', {
						enName: query
					}, {
						emulateJSON: true
					}).then((res) => {
						this.loading = false
						this.personnelValue = query
						this.personnel = res.data.result;
					}).catch((err) => {
						
					})
				} else {
					this.personnel = [];
				}
			},
			onSoso() {
                this.data = JSON.parse(JSON.stringify(this.sendData));
                delete this.data.ucId
                delete this.data.departId
				this.dealSosoData()
				this.getSearchList()
			},
			dealSosoData() {
				//处理搜索数据
                this.data.startTime = !!this.formInline.starttime ? (new Date(this.formInline.starttime)).format("yyyy-MM-dd hh:mm:ss") : ''
                this.data.endTime = !!this.formInline.endtime ? (new Date(this.formInline.endtime)).fullCurTime().format("yyyy-MM-dd hh:mm:ss") : ''
				this.data.itemArr = !!(this.entryNameValue) ? this.entryNameValue : ''
				this.data.ucName = !!(this.personnelValue) ? this.personnelValue : ''
				this.data.description = !!(this.formInline.weeklycontent) ? this.formInline.weeklycontent : ''
			},
			showOperationOrNot(status) {
				this.hoverStatus = status
			},
            forGetWeeklyDom(){
                let _self = this
                let timer = requestAnimationFrame(function fn(){
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
			departmentWeeklyDetails(index,data) {
                this.state.commit('lookUpWeeklyActiveKey',index)
                this.state.commit('searchWeeklyList',this.weeklyList)
                this.$router.push({path:`/weeklymanagement/weeklys`, query: {id:data.logId,jumpstatus: "2"}})
			},
			ProjectWeeklyDeatils(index,data) {
                this.state.commit('lookUpWeeklyActiveKey',index)
                this.state.commit('searchWeeklyList',this.weeklyList)
                this.$router.push({path:`/weeklymanagement/weeklys`, query: {id:data.logId,jumpstatus: "2"}})
			},
            resetMargins(mval,num){
                var lis = document.getElementsByClassName("WeeklyManagement_Search2")[0].querySelectorAll(".currWeeklyList")
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
                    this.resetMargins(this.mWeekly,this.num)
                    this.calculaFlag = true
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
	.inlineblock {
		display: inline-block;
	}
	
	.soso .input_text {
		width: 110px;
		font-size: 12px;
		color: #999999;
	}
	
	.line {
		width: 20px;
	}
	
	.label {
		font-size: 12px !important;
		color: #666666 !important;
		margin-right: 10px;
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
		right: 0;
		top: 4px;
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
	
	.log-list {
		background-color: #fff;
		/*padding: 0 20px;*/
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
	.marginleft4{
		margin-left: -4px;
	}
</style>