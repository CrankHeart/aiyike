<template>
	<ul class="uncompletTemm clearfix" v-if="type === 'wkbench'">
		<li class="temLeft">
			<p class="percent"><span class="percentNum">{{progressText | nullformat}}</span><span class="percentUnit">%</span></p>
			<span class="percentTxt">项目进度</span>
		</li>
		<li class="temRight">
			<p class="projectTitle">{{listData.name | nullformat}}</p>
			<div class="clearfix textLeft">
				<div class="fl">
					<p class="projectItem">项目经理</p>
					<p class="font16">{{listData.manager | nullformat}}</p>
				</div>
				<div class="fl margR" v-if="HasPermission('times')">
					<p class="projectItem">剩余周期</p>
					<p class="font16">{{obtainDay | nullformat}}<span class="tian">天</span></p>
				</div>
				<div class="fl margR" v-if="HasPermission('balance')">
					<p class="projectItem">剩余实施额度</p>
					<p class="font16">{{listData.balance1 | nullformat}}<span class="tian">元</span></p>
				</div>
			</div>
		</li>
	</ul>
	<ul class="uncompletTem clearfix" v-else @click="click" @mouseup="mouseup">
		<li class="temLeft">
			<p class="percent"><span class="percentNum">{{progressText | nullformat}}</span><span class="percentUnit">%</span></p>
			<span class="percentTxt">项目进度</span>
		</li>
		<li class="temRight">
			<p class="projectTitle">{{listData.name | nullformat}}</p>
			<div class="clearfix textLeft">
				<div class="fl">
					<p class="projectItem">项目经理</p>
					<p class="font16">{{listData.manager | nullformat}}</p>
				</div>
				<div class="fl margR" v-if="HasPermission('times')">
					<p class="projectItem">剩余周期</p>
					<p class="font16">{{obtainDay | nullformat}}<span class="tian">天</span></p>
				</div>
				<div class="fl margR" v-if="HasPermission('balance')">
					<p class="projectItem">剩余实施额度</p>
					<p class="font16">{{listData.balance1 | nullformat}}<span class="tian">元</span></p>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
	export default {
		name: "UnFinished",
		props: {
			datasource: {
				type: Object,
				default: function() {
					return {};
				}
			},
			authType: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: ""
			},
		},
		data() {
			return {
				state: this.$store.state,
				listData: {},
				textSelectFlag: true,
				flag: true
			};
		},
		mounted() {

			this.listData = !this.datasource ? {} : this.datasource;
		},
		computed: {
			progressText() {
				let ret = 0;
				try {
					switch(this.authType) {
						case "upuc":
							ret =
								this.listData.ph * 100 / (this.listData.hours);
							break;
						case "updepart":
							ret = this.listData.ph * 100 / this.listData.totalHours1;
							break;
						case "upall":
							ret = this.listData.progress * 100 / this.listData.totalHours;
							break;
						case "upmgr":
							ret = this.listData.progress * 100 / this.listData.totalHours;
							break;
						case "upba":
							ret = this.listData.progress * 100 / this.listData.totalHours;
							break;
						default:
							break;
					}
					//ret = this.listData.progress * 100 / this.listData.totalHours
					ret = ret.toFixed(0);
					let splitArr = `${ret}`.split(".");
					let l = splitArr[0];
					let r = splitArr.length == 2 ? splitArr[1] : "";
					if(r == "0") {
						ret = l;
					}
				} catch(err) {
					ret = 0;
				}
				return ret;
			},
			obtainDay() {
				let status = this.listData.status;
				let e = this.listData.planEndTime;
				let f = this.listData.finishTime;
				let days = 0;
				if(status == 9) {
					return days;
				}
				if(status == 10) {
					days = new Date(e).getTime() - new Date(f).getTime();
					return parseInt(days / (1000 * 60 * 60 * 24));
				}
				days = new Date(e).getTime() - new Date().getTime();
				return Math.ceil(days / (1000 * 60 * 60 * 24));
			}
		},
		methods: {
			click(e) {
				if(this.textSelectFlag) {
					this.$store.commit("setUnFinishAuthType", this.authType);
					this.$store.commit("setPjManageUnFinishedItem", this.listData);
					this.$router.push({
						path: `/businessaffairs/pj/details/${this.listData.id}-${
            this.listData.status
          }`
					});
				}
			},
			mouseup(e) {
				var event = window.event || e;
				var target = event.srcElement ? event.srcElement : event.target;
				if(
					/input|textarea/i.test(target.tagName) &&
					/firefox/i.test(navigator.userAgent)
				) {
					//Firefox在文本框内选择文字
					var staIndex = target.selectionStart;
					var endIndex = target.selectionEnd;
					if(staIndex != endIndex) {
						var sText = target.value.substring(staIndex, endIndex);
						this.textSelectFlag = false;
					} else {
						this.textSelectFlag = true;
					}
				} else {
					//获取选中文字
					var sText =
						document.selection == undefined ?
						document.getSelection().toString() :
						document.selection.createRange().text;
					if(sText != "") {
						this.textSelectFlag = false;
					} else {
						this.textSelectFlag = true;
					}
				}
			}
		}
	};
</script>

<style scoped>
	.uncompletTem {
		cursor: pointer;
		background: #ffffff;
		height: 162px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.uncompletTemm {
		padding: 43px 37px 43px 37px;
		background: #ffffff;
		height: 162px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.uncompletTem li {}
	
	.temLeft {
		width: 91.5px;
		height: 74px;
		padding-top: 20px;
		text-align: center;
		box-sizing: border-box;
		font-size: 13px;
		background: url(../../assets/img/folder.png) no-repeat;
		background-size: 100% 100%;
		float: left;
	}
	
	.temRight {
		margin-left: 115px;
		color: #333333;
	}
	
	.percent {
		color: #ffffff;
	}
	
	.percent .percentNum {
		font-size: 20px;
	}
	
	.percent .percentUnit {
		font-size: 12px;
	}
	
	.percentTxt {
		color: rgba(255, 255, 255, 0.5);
		font-size: 12px;
		transform: scale(0.83);
		display: inline-block;
	}
	
	.projectTitle {
		font-size: 16px;
		color: #000000;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		margin-bottom: 16px;
		white-space: nowrap;
		text-overflow: ellipsis;
		word-break: break-all;
		word-wrap: break-word;
		overflow: hidden;
	}
	
	.projectItem {
		font-size: 12px;
		transform: scale(0.8333);
		transform-origin: left;
		color: #999999;
		margin-bottom: 5px;
	}
	
	.textLeft {
		text-align: left;
	}
	
	.font16 {
		font-size: 14px;
		color: #333333;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.tian {
		font-size: 14px;
		font-weight: normal;
		margin-left: 3px;
	}
	
	.margR {
		margin-left: 32px;
	}
	
	@media (max-width: 1400px) {
		/*.margR{
			margin-left: 25px;
		}*/
	}
</style>