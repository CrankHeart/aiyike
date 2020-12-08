<template>
	<div class="layout">
		<el-dialog title="评价外围团队" :visible.sync="dialogVisible" class="dialog442 customer_ev_dialog peripheralteam_dialog">
			<el-form :model="form">
				<el-form-item label="星级：">
					<el-rate v-model="form.type"></el-rate>
				</el-form-item>
				<el-form-item class="clearfix pteam_item nopadding-label" label="评价：">
					<el-input placeholder="填写评论" :rows="3" class="textarea" type="textarea" v-model="form.content"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		    	<el-button class="submitbtn" type="primary" @click="sure">确定</el-button>
			    <el-button class="cancelbtn" @click="cancel">取消</el-button>
		    </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'Peripheral_Team_Dialog',
		props: {
			visible: {
				type: Boolean,
				default: false
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
				form: {
					type: 1,
					content: ''
				},
				data: [{
					title: '审核结项',
					content: '项目经理 苏瑞利于 2017-10-10提交了结项申请。'
				}, {
					title: '审核中止',
					content: '项目经理 苏瑞利于 2017-10-10提交了中止申请。'
				}, {
					title: '审核挂起',
					content: '项目经理 苏瑞利于 2017-10-10提交了结项申请。'
				}, {
					title: '审核项目进度',
					content: '项目总进度更新15%，当前项目总进度为80%。'
				}]
			};
		},
		components: {},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {
			sure() {
				this.dialogVisible = false
			},
			cancel() {
				this.dialogVisible = false
			}
		}
	}
</script>

<style scoped>
	.el-rate{
		line-height: 2;
	}
	.el-form-item{
		margin-bottom: 10px;
	}
	.textarea {
		margin-left: 62px;
		display: block;
		margin-right: 62px;
		box-sizing: border-box;
		padding-right: 62px;
	}
	
	.btn {
		width: 90px;
		height: 30px;
		padding: 0;
		border-radius: 2px;
	}
	
	.sure {
		background: #295DCF;
	}
	
	.cancel {
		background: #F2F2F2;
		border: none;
	}
</style>