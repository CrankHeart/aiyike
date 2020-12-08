<!--外围项目管理详情-左侧评估按钮组-->
<template>
	<div>
		<div class="btn-area">
			<el-button class="btn sure" type="primary" @click="sureClick">{{sureText}}</el-button>
			<el-button class="btn cancel" @click="cancelClick">放弃</el-button>
		</div>
		<StartEvaluationDialog :visible.sync="startEvaluationDialogFlag"></StartEvaluationDialog>
		<GiveUpEvaluationDialog :visible.sync="giveUpEvaluationDialogFlag"></GiveUpEvaluationDialog>
	</div>
</template>

<script>
	let StartEvaluationDialog = () =>
		import('./Start_Evaluation_Dialog.vue')
	let GiveUpEvaluationDialog = () =>
		import('./GiveUp_Evaluation_Dialog.vue')

	export default {
		name: 'ProjectEv',
		data() {
			return {
				startEvaluationDialogFlag: false,
				giveUpEvaluationDialogFlag: false,
				sureText: "开始评估"
			};
		},
		components: {
			StartEvaluationDialog,
			GiveUpEvaluationDialog
		},
		beforeMount() {
			let taskId = this.$store.getters.outItemAudit.taskId
			if (Object.isEmpty(taskId)) {
				this.sureText = "再次评估"
			}
		},
		mounted: function() {},
		methods: {
			sureClick() {
				this.startEvaluationDialogFlag = true
			},
			cancelClick() {
				this.giveUpEvaluationDialogFlag = true
			}
		}
	}
</script>

<style>
	.btn-area {
		text-align: center;
		margin-bottom:20px;
	}
	
	.btn {
		width: 100px;
		height: 30px;
		padding: 0;
		font-size: 14px;
		border-radius: 2px;
		border: none;
	}
	
	.btn.sure {
		color: #FFFFFF;
		background: #295DCF;
	}
	
	.btn.cancel {
		color: #666666;
		background: #F2F2F2;
	}
</style>