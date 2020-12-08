<template>
<div id="layout">
	<div class="project-title clearfix">
		<div class="fl">
			<div class="progress">{{progress}}</div>
			<div class="projectName">{{projectName}}</div>
		</div>
		<div class="fr">
			<div class="arrow" @click="show = !show">
				<i :class="[show ? 'el-icon-arrow-down' : 'el-icon-arrow-right']"></i>
			</div>
		</div>
	</div>
	<div class="project-content" v-show="show">
		<div class="project-info">
			<p class="price">{{outPrice | moneyformat}}</p>
			<p class="price-unit">外围总价(元)</p>
			<div class="clearfix">
				<div class="data-box fl">
					<p class="date">{{endDate}}</p>
					<p>截止日期</p>
				</div>
				<div class="data-box fr">
					<p class="date">{{workCycle}}</p>
					<p>工作周期(日)</p>
				</div>
			</div>
			<p class="manager"><span>项目经理:</span>{{projectManager}}</p>
			<p class="manager"><span>合作方式:</span>{{cooperation}}</p>
		</div> 
		
		<div class="business-range">
			<p>业务范围</p>
			<ul class="business">
				<li v-for="busy in business">{{busy.busyItem}}</li>
			</ul>
		</div>
	</div>
	
	<div class="footer">
		<button class="pass" @click="submitPassed">通过</button>
		<button class="reject" @click="rejectReq">驳回</button>
	</div>
	<rejectDialog :visible.sync="rejectDialogVisible"></rejectDialog>
</div>
</template>

<script>

    let rejectDialog = () =>
        import('@/components/PjManagement_UnFinished_Steps/rejectDialog.vue')

    export default {
        name: '',
        data() {
	      	return {
	      		show:true,
	      		progress:"事业部总监审核中",
	      		projectName:'三菱电梯综合监控系统',
	      		outPrice:'53252',
	        	endDate:'2017.12.31',
	        	workCycle:'50',
	        	projectManager:"宿瑞利",
	        	cooperation:'项目外包',
	        	business:[{
	        		busyItem:'交互设计'
	        	},{
        			busyItem:'UI设计'
	        	},{
	        		busyItem:'WEB前端开发'
	        	},{
        			busyItem:'动画制作'
	        	},{
        			busyItem:'动画制作'
	        	}
	        	],
                rejectDialogVisible:false       //是否驳回弹框状态
      		}
    	},
        components:{
            rejectDialog
        },
        methods: {
            //点击提交
            submitPassed(){
				;
            },
            //驳回
            rejectReq(){
                this.rejectDialogVisible = true;
            },

        }
    }
</script>

<style scoped>
	#layout {
		width: 350px;
		background: #FFFFFF;
		height: 100%;
		position: relative;
	}
	.project-title{
		padding: 20px;
		border-bottom: 1px solid #D5D5D5;
	}
	.progress{
		font-size: 12px;
		color: #295DCF;
		padding: 0 15px;
		line-height: 20px;
		background: #F9F9F9;
	}
	.projectName{
		font-size: 16px;
		color: #000000;
		margin-top: 6px;
		font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	.arrow{
		width: 22px;
		height: 22px;
		color: #979797;
		text-align: center;
		line-height: 22px;
		font-size: 10px;
		border-radius: 50%;
		background: #F6F7F9;
		margin-top: 12px;
	}
	.project-info{
		text-align: center;
		padding: 20px;
		font-size: 12px;
		color: #CACACA;
		border-bottom: 1px solid #D5D5D5;
	}
	.price{
		font-size: 32px;
		color: #000000;
	}
	.data-box{
		width: 150px;
		padding: 20px 0;
		box-sizing: border-box;
		background: #F8F9FB;
		border-radius: 4px;
		margin: 30px 0 10px;
	}
	.data-box .date{
		font-size: 20px;
		color: #333333;
		margin-bottom: 5px;
	}
	.manager{
		color: #999999;
		text-align: left;
		margin-top: 10px;
	}
	.manager span{
		display: inline-block;
		width: 70px;
	}
	.business-range{
		padding: 20px;
		font-size: 14px;
		color: #000000;
	}
	.business-range > p{
		font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	.business{
		margin-top: 20px;
	}
	.business li{
		float: left;
		width: 90px;
		text-align: center;
		font-size: 10px;
		color: #666666;
		line-height: 24px;
		margin-bottom: 10px;
		margin-right: 10px;
		background: #F8F9FB;
	}
	.footer{
		position: absolute;
		bottom: 30px;
		left: 0;
		width: 100%;
		font-size: 12px;
		text-align: center;
	}
	.footer button{
		width: 100px;
		height: 30px;
		border: none;
		line-height: 30px;
		border-radius: 2px;
		margin: 0 10px;
	}
	.footer .pass{
		background: #295DCF;
		color: #FFFFFF;
		cursor: pointer;
	}
	.footer .reject{
		background: #F2F2F2;
		color: #666666;
		cursor: pointer;
	}
</style>