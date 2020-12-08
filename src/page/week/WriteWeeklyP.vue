<!--项目管理-未完结项目详情页-->
<template>
	<section class="wrap">
		<div class="backToPre" @click="backToPre">
			<i class="el-icon-arrow-left"></i>
			<span class="return">返回</span>
		</div>
		<div class="layout-container" ref="pane-o">
			<div class="layout-in" ref="pane-i">
				<section class="layout">
					<div class="writeform-wrap">
						<span class="release-weekly">发布周报</span>
						<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" label-position="left" label-width="75px">
							<el-form-item
									label="项目名称："
									placeholder="请选择项目名称"
									prop="entryNameValue"
									:rules="[
									  { required: true, message: '请选择项目名称', trigger: 'change' }
									]">
								<el-select v-model="formInline.entryNameValue" class="select-wrap" filterable  placeholder="选择项目名称" v-sicon1>
									<el-option
											v-for="item in formInline.entryName"
											:key="item.id"
											:label="stringSplit(item.name)"
											:value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="周报周期：">
								<el-col :span="11">
									<el-select v-model="formInline.month" style="width: 86px" @change="monthChange">
										<el-option v-for="item in monthOptions" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col>
								<el-col class="line" :span="2" style="text-align: center; color: #999999">-</el-col>
								<el-col :span="11">
									<el-select v-model="formInline.week" style="width: 86px">
										<el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col>
							</el-form-item>
						</el-form>
						<script id="editor" type="text/plain" style="width:100%;height:500px;"></script>
						<div class="opeartion-btn clearfix">
							<el-button @click="cancel()" class="fr cancelbtn" style="margin-left: 10px;">取消</el-button>
							<el-button type="primary" @click="resetForm('formInline')" class="fr submitbtn">重置</el-button>
							<el-button type="primary" @click="submitForm('formInline')" class="fr submitbtn">提交</el-button>
						</div>
					</div>
				</section>
			</div>
		</div>
	</section>

</template>

<script>
	import $ from 'jquery'
	export default {
		data() {
			return {
                editStatus:false,
                editData:null,
                myDate:null,
				dataList: JSON.parse(Cache.local(Config.Login)),
				state: this.$store,
                sendData:null,
				resizefn: null,
				curr_year: '',
				weeklyType:'',				//判断是要写部门周报还是项目周报
				formInline: {
					month: '1',
					week: 1,
					date:'',
                    entryName:[],
                    entryNameValue:''
				},
				weekNum: '5',
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
                editor:null
			};
		},
		mounted() {
		    if (this.$route.path == '/') {
		        this.$router.go(-1)
			}
			this.judgeWeeklyType()
            this.myDate = new Date()
            this.getBasicInfor()
			this.computedResize()
			this.hideAudit()
			this.loadUeJs()
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.resizefn)
		},
		destroyed() {
			this.editor.destroy();
		},
		watch: {

		},
		components: {

        },
        methods: {
            editWeekly() {
                this.editStatus = this.state.getters.editStatus
                if (this.editStatus) {
                    //编辑状态
                    this.setEditData()
                    this.state.commit('editStatus', false)				//还原状态
                } else {
                    //添加状态

                }
            },
            //设置编辑数据进页面
            setEditData() {
                this.editData = this.state.getters.WeeklyDetalisData
				this.formInline.entryNameValue = this.editData.itemId.toString()
                this.formInline.month = this.editData.monthCode
                this.formInline.week = this.editData.num
                this.editor.addListener("ready", () => {
                    this.editor.setContent(this.editData.description)
                })
            },
            //判断周报类型
            judgeWeeklyType() {
				this.sendData = {
					ucId: this.dataList.uc.id,
					departId: this.dataList.uc.departId
				}
				this.getProjectName()
            },
            getProjectName() {
                //获取项目名称
                this.$http.post('/api/item/itemNameList', this.sendData, {emulateJSON: true})
                    .then((res) => {
                        var data = res.data;
                        if (data.success) {
                            this.dealIdToString(data.result)
                            // this.formInline.entryName =
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
            dealIdToString(data){
                this.formInline.entryName = data.map((v,i)=>{
				    v.id = JSON.stringify(v.id)
					return v
				})
			},
            //获取基本信息
            getBasicInfor() {
                this.curr_year = this.myDate.getFullYear()
                this.formInline.month = this.myDate.getMonth() + 1
                this.formInline.date = this.myDate.getDate()

            },
            loadUeJs() {
                let configPomise = null, allPomise = null, zhPomise = null, parsePomise = null, _self = this
                configPomise = require.ensure([], function (require) {
                    return require('@/../static/ue/ueditor.config.js')
                })
                configPomise.then(() => {
                    allPomise = require.ensure([], function (require) {
                        return require('@/../static/ue/ueditor.all.js')
                    })
                    allPomise.then(() => {
                        zhPomise = require.ensure([], function (require) {
                            return require('@/../static/ue/lang/zh-cn/zh-cn.js')
                        })
                        zhPomise.then(() => {
                            parsePomise = require.ensure([], function (require) {
                                return require('@/../static/ue/ueditor.parse.js')
                            })
                            parsePomise.then(() => {
                                _self.setUe()
                            })
                        })
                    })
                })
            },
            setUe() {
                this.editor = UE.getEditor('editor',{
                    //关闭字数统计
                    wordCount:false,
                    //关闭elementPath
                    elementPathEnabled:false,
                })
                //编辑周报
                this.editWeekly()
            },
            // 获取ue内容方法
            getUEContent() {
                return this.editor.getContent()
            },
            computedResize() {
                this.paneScrollHandler()
                this.resizefn = () => {
                    this.paneScrollHandler()
                }
                window.addEventListener('resize', this.resizefn, true);
            },
            paneScrollHandler() {
                let paneWidth = this.$el ? this.$el.clientWidth : 0
                this.$refs['pane-o'] ? this.$refs['pane-o'].style.width = paneWidth + 'px' : void 0
                this.$refs['pane-i'] ? this.$refs['pane-i'].style.width = (paneWidth + 20) + 'px' : void 0
            },
            hideAudit() {
                this.$store.commit('hideProjectAudit');
            },
            backToPre() {
                // this.$router.go(-1);
                this.$router.push("/weeklymanagement")
            },
            monthChange(val) {
                this.weekNum = this.getWeeks(this.curr_year, val)
                this.weekOptions = this.setWeekNum(this.weekNum)
				if(val == (this.myDate.getMonth() + 1) ){
                    this.formInline.week = this.getMonthWeek(this.curr_year, this.formInline.month, this.formInline.date)
				}else{
                    this.formInline.week = 1
				}
            },
            setWeekNum(num) {
                let arr = []
                var _self = this
                for (let i = 1; i <= num; i++) {

                    arr.push({
                        value: i,
                        label: '第' + i + '周'
                    })

                }
                return arr;

            },
            getWeeks(y, m) {
                var date = new Date(y, m, 0),
                    w = date.getDay(),
                    //获取这个月有多少天
                    d = date.getDate();
                if (w == 0) {
                    w = 7;
                }
                ;
                return Math.ceil((d + 7 - w) / 7);
            },
              escapeChars(str) {
			   str = str.replace(/\<\/?[a-z]+\>/gim,'');
			    return str;
			},
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                    	let content = this.getUEContent();
                    	if(!content||content==''){
                    		this.$message({
                    			customClass: 'error',
								message: '周报内容不能为空！'
							});
							return false;
                    	}else{
                    		let content = this.escapeChars(this.getUEContent());
                    		if(content&&content.length<10){
                    			this.$message({
                    				customClass: 'error',
									message: '周报内容不能小于10个字符！'
							});
							return false;
                    		}
                    	}
                        let subData = {
                            yearCode: this.curr_year,
                            monthCode: this.formInline.month,
                            num: Number(this.formInline.week),
                            description: this.getUEContent(),
                            ucId: this.dataList.uc.id,
                            busId: this.dataList.uc.busId,
                            itemId:this.formInline.entryNameValue
                        }
                        if (this.editStatus) {
                            subData.logId = this.editData.logId
                            subData.wiId = this.editData.id
                            this.$http.post('/api/week/modify', subData, {emulateJSON: false})
                                .then((res) => {
                                    if (res.data.success) {
                                        this.$router.push("/weeklymanagement")
                                    }
                                }).catch((err) => {
                            })
                        } else {
                            this.$http.post('/api/week/add', subData, {emulateJSON: false})
                                .then((res) => {
                                    var data = res.data;
                                    if (data.success) {
                                        this.$router.push("/weeklymanagement")
                                    } else {
                                    	this.$message({
			                    			customClass: 'error',
											message: data.message
										});
                                    }
                                }).catch((err) => {

                            })
                        }
                    } else {
                        ;
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.formInline.month = this.myDate.getMonth() + 1
                this.formInline.week = this.getMonthWeek(this.curr_year, this.formInline.month, this.formInline.date)
                this.editor.setContent('')
            },
            cancel() {
                this.$router.push("/weeklymanagement")
            },
            getMonthWeek(a, b, c) {
                /*
                a = d = 当前日期
                b = 6 - w = 当前周的还有几天过完(不算今天)
                a + b 的和在除以7 就是当天是当前月份的第几周
                */
                var date = new Date(a, parseInt(b) - 1, c), w = date.getDay(), d = date.getDate();
                return Math.ceil(
                    (d + 6 - w) / 7
                );
            },
            getYearWeek(a, b, c) {
                /*
				date1是当前日期
				date2是当年第一天
				d是当前日期是今年第多少天
				用d + 当前年的第一天的周差距的和在除以7就是本年第几周
				*/
                var date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1),
                    d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
                return Math.ceil(
                    (d + ((date2.getDay() + 1) - 1)) / 7
                );
            }
        }
	}
</script>

<style scoped>
	.backToPre {
		font-size: 16px;
		height: 60px;
		line-height: 60px;
		color: #333;
		border-bottom: 1px solid #F1F2F3;
		cursor: pointer;
	}
	
	.backToPre i {
		font-size: 16px;
		margin-right: 5px;
	}
	
	.writeform-wrap {
		display: block;
		width: 800px;
		height: 100%;
		background: url("../../assets/img/page.png") no-repeat;
		background-size: 100% 100%;
		margin: 24px auto 0 auto;
		padding: 20px;
		padding-left: 30px;
	}
	
	.wrap {
		height: 100%;
		background: #f8f9fb;
		padding: 0 28px;
		overflow: hidden;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.backToPre {
		font-size: 18px;
		height: 60px;
		line-height: 60px;
		color: #000;
		border-bottom: 1px solid #F1F2F3;
		cursor: pointer;
	}
	
	.layout-container {
		overflow-x: hidden;
		height: 100%;
		margin-top: -41px;
		padding-top: 61px;
		margin-left: -56px;
		padding-left: 56px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.layout-in {
		overflow-x: hidden;
		overflow-y: scroll;
		height: 100%;
	}
	
	.layout {
		padding: 20px;
		height: auto;
		padding-right: 78px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.return {
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.submit {
		opacity: 0.33;
	}
	
	.opeartion-btn button {
		width: 90px;
		height: 30px;
		line-height: 30px;
		padding: 0;
        margin-top: 15px;
	}
</style>