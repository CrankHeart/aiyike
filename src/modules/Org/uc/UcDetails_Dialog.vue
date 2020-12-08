<template>
	<!--员工信息-->
	<el-dialog title="员工信息详情" :visible.sync="dialogVisible" class="dialogWidth-em dialogPosition">
		<div class="employee-state">
			<span>是否在职:</span>
			<el-switch class="switch-type-2" v-model="form.jobStatus" readonly  on-color="#295dcf" off-color="#f2f2f2" :on-value="1" :off-value="0" on-text="" off-text=""></el-switch>
		</div>
		<div class="employee-info">
			<div class="head-img">
				<img :src="txSrc"  id="image"></img>
			</div>
			<section>
				<h3 class="title">账号信息</h3>
				<div class="item-wrap clearfix">
					<div class="item-info fl">
						<span class="item-name">工号:</span><span class="item-data">{{form.jobNum | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">用户名:</span><span class="item-data">{{form.userName | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">初始口令:</span><span class="item-data">{{form.password | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">所在部门:</span><span class="item-data">{{departText | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">所属岗位:</span><span class="item-data">{{stationText | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">拥有角色:</span><span class="item-data">{{roleText | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">员工状态:</span><span class="item-data">{{jobStatusText | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">是否允许登陆:</span>
						<el-switch class="switch-type-2" v-model="form.isLogin"  on-color="#295dcf" off-color="#f2f2f2" :on-value="1" :off-value="0" on-text="" off-text=""></el-switch>
					</div>

				</div>
			</section>
			<section>
				<h3 class="title">个人资料</h3>
				<div class="item-wrap clearfix">
					<div class="item-info fl">
						<span class="item-name">姓名:</span><span class="item-data">{{form.chName | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">英文名:</span><span class="item-data">{{form.enName | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">性别:</span><span class="item-data">{{genderText | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">出生日期:</span><span class="item-data">{{form.birthTime?new Date(form.birthTime).format('yyyy-MM-dd'):'' | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">工资:</span><span class="item-data" v-if="HasPermission('salaryPm') && iscludeUcId(form.id)  ">{{form.salary | nullformat}}</span>
						<span class="item-data" v-else="false">{{salartText}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">级别:</span><span class="item-data">{{form.busRank | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">公司邮箱:</span><span class="item-data">{{form.email | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">分机号码:</span><span class="item-data">{{form.extPhone | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">手机号码:</span><span class="item-data">{{form.phone | nullformat}}</span>
					</div>

				</div>
			</section>
			<section>
				<h3 class="title">个人简历</h3>
				<div class="item-wrap clearfix">
					<div class="item-info fl">
						<span class="item-name">入职时间:</span><span class="item-data">{{form.entryTime?new Date(form.entryTime).format('yyyy-MM-dd'):'' | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">辞职时间:</span><span class="item-data">{{form.quitTime?new Date(form.quitTime).format('yyyy-MM-dd'):'' | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">毕业学校:</span><span class="item-data">{{form.graduateSchool | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">毕业时间:</span><span class="item-data">{{form.graduateTime?new Date(form.graduateTime).format('yyyy-MM-dd'):'' | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">学历:</span><span class="item-data">{{educationsText | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">专业:</span><span class="item-data">{{form.major | nullformat}}</span>
					</div>
					<div class="item-info fl">
						<span class="item-name">备注:</span><span class="item-data">{{form.description | nullformat}}</span>
					</div>

				</div>
			</section>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		name: 'UcDetails_Dialog',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			form: {
				type: Object,
				default: function() {
					return {}
				}
			},
			roleArray:{
				type: Object,
				default:function(){
					return {}
				}
			},
			stations: {
				type: Array,
				default: []
			},
			departs: {
				type: Array,
				default: []
			},
			departSelect: {
				type: Array,
				default: []
			},
			roles: {
				type: Array,
				default: []
			},
			jobStatus: {
				type: Object,
				default: {}
			},
			educations: {
				type: Array,
				default: []
			}
		},
		watch: {
			visible(val) {
				this.dialogVisible = val
			},
			dialogVisible(val) {
				this.$emit('update:visible', val)
			}
		},
		data() {
			return {
				dialogVisible: false,
				isJob: true
			};
		},
		components: {},
		mounted: function() {
			this.dialogVisible = this.visible
			document.getElementsByClassName('image').src=Config.StaticUrl+this.form.userIcon;
		},
		computed: {
			salartText() {
				let salary = `${this.form.salary}`;
				if(salary&&salary!=''){
					let len = salary.length
					let str = ''
					for (var i = 0;i < len;i++){
						str += '*'
					}
					return str
				}
				return "*";
				
			},
			txSrc() {
				let imgPath = ''
				if (Object.isNotEmpty(this.form.userIcon)) {
					imgPath = [Config.StaticUrl,this.form.userIcon].join('')
				} else{
					imgPath = "/static/img/userIcon.png"
				}
				return imgPath
			},
			stationText() {
				let ret = ''
				for (let i in this.stations) {
					if (this.stations[i].id == this.form.stationId) {
						ret = this.stations[i].name
					}
				}
				return ret
			},
			educationsText() {
				let ret = ''
				for (let i in this.educations) {
					if (this.educations[i].id == this.form.education) {
						ret = this.educations[i].name
					}
				}
				return ret
			},
			genderText() {
				return this.form.gender==1?'男':'女'
			},
			jobStatusText() {
			/*	;
				let ret = ''
				for (let i in this.jobStatus) {
					;
					if (this.form.status == this.jobStatus[i]) {
						ret = this.jobStatus[i].name
					}
				}*/
				if(!this.form.status){
					return '暂无';
				}
				return this.jobStatus[this.form.status]
			},
			roleText() {
				let ret = ''
					for (let ii in this.roles) {
							ret += `${this.roles[ii].name}、`
					}
				return ret
			},
			
			departText() {
				let ret = ''
				function findChild(node, id) {
					let tret = ''
					for (let i in node) {
						if (id == node[i].value) {
							tret = `${node[i].label}` 
							break
						} else if (node[i].children && node[i].children.length) {
							tret = findChild(node[i].children, id)
							if (tret) {
								break
							}
						}
					}
					return tret
				}
				for (let oi in this.departSelect) {
					ret += findChild(this.departs, this.departSelect[oi]) + '-'
					if (this.departSelect.length-1 == parseInt(oi)) {
						ret = ret.slice(0, ret.length - 1)
					}
				}
				return ret
			},
			formatDate(data){
				return new Date(data).format('yyyy-MM-dd');
			}
		},
		methods: {
			iscludeUcId(args){
		    	let list = JSON.parse( Cache.local(Config.Login))
		    	if(list && list.salaryPM && list.salaryPM.indexOf(args) != -1){
		    		return true;
		    	}
		    	return false;
		    }
		}
	}
</script>

<style scoped>
	/*员工信息*/
	
	.dialogWidth-em .el-dialog--small {
		width: 1024px!important;
	}
	
	.box .el-switch__core .el-switch__button {
		border-radius: 0;
		width: 14px;
		height: 13px;
	}
	
	.box .el-switch__core {
		border-radius: 3px;
		width: 36px !important;
		height: 18px!important;
	}
	
	.employee-state {
		font-size: 12px;
		color: #999999;
	}
	
	.employee-state>span {
		margin-right: 10px;
		vertical-align: middle;
	}
	
	.employee-info {
		padding: 50px 10px;
	}
	
	.head-img {
		width: 76px;
		height: 76px;
		border-radius: 50%;
		margin: 0 auto 50px;
		overflow: hidden;
	}
	.head-img > img{
		width: 100%;
		height: 100%;
	}
	section .title {
		font-size: 14px;
		color: #333333;
		font-weight: normal;
	}
	
	.item-wrap {
		margin: 12px 0;
	}
	
	.item-info {
		width: 50%;
		padding-left: 50px;
		font-size: 12px;
		line-height: 30px;
		box-sizing: border-box;
	}
	
	.item-name {
		display: block;
		width: 120px;
		color: #999999;
		float: left;
	}
	
	.item-data {
		color: #000000;
		margin-left: 120px;
    	display: block;
    	font-weight: 600;
	}
	/*员工信息 end*/
</style>