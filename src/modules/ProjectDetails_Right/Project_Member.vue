<!--项目管理-项目详情页-项目周报模块-->
<template>
	<div class="layout">
		<div class="pro-manager clearfix">
			<div class="fl">项目经理：{{pmembers.pm}}</div>
			<div class="fr">成员<b>{{pmembers.count}}</b>人</div>
		</div>
		<div class="departments" v-for="depart in pmembers.itemDeparts">
			<p class="department">{{depart.departName}}（{{depart.num}}人）</p>
			<ul class="depMember clearfix">
				<li v-for="member in depart.itemUsers" :class="[member.status==0?'gray':'']">
					<img :src="getSrc(member.avatar)" class="memHead" />
					<p class="memName"><span>{{member.name}}</span></p>
					<p class="position"><span>{{member.station}}</span></p>
					<div class="res" v-if="member.leader==member.userId"></div>
					<div class="tx-gray" v-if="member.status==0"></div>
					<div @click="leave(member.itemUserId)" class="set-leave middle" v-if="!member.status==0 && member.leader==userId&&member.leader!=member.userId "><span>设置离开</span></div>
					<div @click="add(member.itemUserId)" class="set-leave middle" v-if="member.status==0 && member.leader==userId&&member.leader!=member.userId "><span>设置添加</span></div>
				</li>
			</ul>
		</div>
		<div class="layout">
			<el-dialog title="提示" :visible.sync="dialogVisible" class="auditTermDialog">
				<p class="content">您确定要设置该员工为离开状态？</p>
				<span slot="footer" class="dialog-footer">
			    	<el-button class="submitbtn" type="primary" @click="sure(0)">确定</el-button>
				    <el-button class="cancelbtn" @click="cancel">取消</el-button>
			    </span>
			</el-dialog>
			<el-dialog title="提示" :visible.sync="dialogVisible2" class="auditTermDialog">
				<p class="content">您确定要设置该员工为在线状态？</p>
				<span slot="footer" class="dialog-footer">
			    	<el-button class="submitbtn" type="primary" @click="sure(1)">确定</el-button>
				    <el-button class="cancelbtn" @click="cancel">取消</el-button>
			    </span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Project_Member',
		props: {
			itemId: {
				type: String,
				default: 0
			}
		},
		data() {
			return {
				pmembers: {},
				itemUserId: '',
				dialogVisible: false,
				dialogVisible2: false,
				manager: "xx",
				totalMember: "15",
				userId: JSON.parse(Cache.local(Config.Login)).uc.id,
				departments: [{
						department: '交互部',
						num: '3',
						members: [{
								headImg: require('../../assets/img/head.png'),
								memName: '朱佳',
								position: '负责人',
								res: true
							}, {
								headImg: require('../../assets/img/head.png'),
								memName: '朱佳',
								position: '交互设计师',
								res: false,
								leave: true
							}, {
								headImg: require('../../assets/img/head.png'),
								memName: '朱佳',
								position: '交互设计师',
								res: false,
								leave: false
							}

						]
					}, {
						department: 'UI设计师',
						num: '3',
						members: [{
								headImg: require('../../assets/img/head.png'),
								memName: '朱佳',
								position: '负责人',
								res: true
							}, {
								headImg: require('../../assets/img/head.png'),
								memName: '朱佳',
								position: '交互设计师',
								res: false
							}, {
								headImg: require('../../assets/img/head.png'),
								memName: '朱佳',
								position: '交互设计师',
								res: false
							}

						]
					}

				]
			}
		},
		components: {},
		mounted() {
			this.queryPmembers()
		},
		methods: {
			queryPmembers() {
				let itemId=this.itemId.split('-')[0]
				this.$http.post('/api/itemUser/projectPersons?itemId=' + itemId, {
					emulateJSON: true
				}).then((res) => {
					let flag = res.data.success
					let result = res.data.result
					if(flag) {
						for (let i in result.itemDeparts) {
							let depart = result.itemDeparts[i].itemUsers
							for (let ii in depart) {
								if (depart[ii].leader == depart[ii].userId) {
									
									let leaderPer = depart.splice(ii, 1)[0]
									depart.unshift(leaderPer)
									break
								}
							}
						}
						this.pmembers = result
					}
					console.log('result',JSON.parse(JSON.stringify(result)))
				}).catch((err) => {
					
				});
			},
			sure(status) {
				this.dialogVisible = false
				this.dialogVisible2 = false
				this.$http.post('/api/itemUser/modifyItemUserStatus?itemUserId=' + this.itemUserId + '&status=' + status, {
					emulateJSON: true
				}).then((res) => {
					let flag = res.data.success
					if(flag) {
						this.$message({
							message: '修改成功',
							customClass: 'success'
						});
						this.queryPmembers()
					}
					this.itemUserId = ''
				}).catch((err) => {
					
				});
			},
			cancel() {
				this.dialogVisible = false
			},
			leave(row) {
				this.dialogVisible = true
				this.itemUserId = row
			},
			add(row) {
				this.dialogVisible2 = true
				this.itemUserId = row
			},
			getSrc(src){
				if(!src){
					return src = "/static/img/userIcon.png"
				}
				return src=Config.StaticUrl+src
			}
		}
	}
</script>

<style scoped>
	.layout {
		width: 100%;
		height: 100%;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding-bottom: 25px;
	}
	
	.pro-manager {
		margin-top: 30px;
		margin-bottom: 24px;
		line-height: 39px;
		font-size: 14px;
		color: #333333;
		border-bottom: 1px solid rgba(213, 213, 213, 0.26);
	}
	
	.pro-manager b {
		font-size: 18px !important;
		color: #151515;
		font-weight: normal;
	}
	
	.pro-manager .fl {
		font-size: 14px;
		color: #333;
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.pro-manager .fr {
		font-size: 10px;
	}
	
	.department {
		font-size: 14px;
		color: #000000;
		margin: 10px 0 0 0;
	}
	
	.depMember li {
		float: left;
		position: relative;
		text-align: center;
		width: 94px;
		height: 100px;
		padding: 10px;
		margin: 10px 20px 10px 0;
		border: 1px solid #F2F2F2;
		border-radius: 2px;
		cursor: pointer;
	}
	
	.memHead {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		margin-top: 10px;
		margin-bottom: 5px;
	}
	
	.memName {
		font-size: 14px;
		color: #333333;
	}
	/*.memName span{
		display: inline-block;
		transform: scale(0.83333);
	}*/
	
	.gray .memName {
		color: #999999;
	}
	
	.position {
		font-size: 12px;
		color: #5D5D5D;
		margin-top: 10px;
		padding-top: 2px;
		border-top: 1px solid #F5F5F5;
	}
	/*.position span{
		display: inline-block;
		transform: scale(0.6666);
	}*/
	
	.res {
		position: absolute;
		top: 0;
		right: 0;
		width: 0;
		height: 0;
		border-top: 18px solid #F5A623;
		border-left: 18px solid transparent;
	}
	
	.gray .res {
		border-top: 18px solid #D5D5D5;
		border-left: 18px solid transparent;
	}
	
	.gray .position {
		color: #999;
	}
	
	.gray .tx-gray {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		position: absolute;
		background: #d5d5d5;
		left: 38px;
		top: 20px;
		opacity: 0.8;
	}
	
	.depMember li .set-leave {
		width: auto;
		height: 23px;
		position: absolute;
		background: #f2f2f2;
		bottom: 0px;
		left: 0;
		right: 0;
		font-size: 12px;
		color: #666666;
		text-align: center;
		line-height: 23px;
		display: none;
	}
	
	.depMember li .set-leave span {
		display: inline-block;
		transition: none;
	}
	
	.depMember li:hover .set-leave {
		display: block;
	}
	
	.depMember li .set-leave:hover {
		background: #295DCF;
		color: #fff;
	}
	
	.content {
		text-align: center;
		font-size: 12px;
		color: #000000;
	}
	
</style>