<template>
	<ul class="uncompletTem clearfix" @click="click">
		<li class="temLeft">
			<p class="percent"><span class="percentNum">{{percent}}</span><span class="percentUnit"> %</span></p>
			<span class="percentTxt">项目进度</span>
		</li>
		<li class="temRight">
			<p class="projectTitle">{{projectName}}</p>
			<div class="clearfix textLeft">
				<div class="fl">
					<p class="projectItem">项目经理</p>
					<p class="font16">{{manager}}</p>
				</div>
				<div class="fl margR">
					<p class="projectItem">项目进度</p>
					<p class="font16">{{remainderDate}}<span class="tian">天</span></p>
				</div>
			</div>
		</li>
	</ul>
	</div>
</template>

<script>
	export default {
		name: 'UnFinished',
		data() {
			return {
				percent: "0",
				projectName: "三菱电梯综合监控系统",
				manager: "宿瑞丽",
				remainderDate: "30"
			}
		},
		methods: {
			click() {
//				this.$router.push("/businessaffairs/pj/unproject/12332312345")
                this.$store.commit('setPjManageUnFinishedViewName', 'details')
			}
		}
	}
</script>

<style scoped>
	.uncompletTem {
		padding: 43px 37px 43px 37px;
		background: #FFFFFF;
	}
	
	.uncompletTem li {
		float: left;
	}
	
	.temLeft {
		width: 89px;
		height: 76px;
		padding-top: 20px;
		text-align: center;
		box-sizing: border-box;
		font-size: 13px;
		background: url(../../assets/img/folder.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.temRight {
		margin-left: 25px;
		color: #333333;
		min-width: 170px;
	}
	
	.percent {
		color: #FFFFFF;
	}
	
	.percent .percentNum {
		font-size: 22px;
	}
	
	.percent .percentUnit {
		font-size: 18px;
	}
	
	.percentTxt {
		color: rgba(255, 255, 255, 0.5);
		font-size: 12px;
		display: inline-block;
		transform: scale(0.833);
	}
	
	.projectTitle {
		font-size: 16px;
		color: #000000;
		margin-bottom: 16px;
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
	}
	
	.tian {
		font-size: 14px;
		font-weight: normal;
		margin-left: 3px;
	}
	
	.margR {
		margin-left: 50px;
	}
</style>