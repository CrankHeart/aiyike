<!--评价外围团队-->
<template>
</template>

<script>
	export default {
		name: 'Ev_Peripheral_Team',
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
					department: '创意事业部',
					manager: '1',
					note: ''
				}
			};
		},
		components: {},
		mounted: function() {
			this.dialogVisible = this.visible
		},
		methods: {}
	}
</script>

<style scoped>
	/*公用部分*/
	
	.dialogPosition .el-dialog {
		top: 50%!important;
		transform: translate(-50%, -50%);
	}
	
	.dialogPosition .el-dialog__title {
		font-size: 16px;
		color: #000000;
		font-weight: normal;
	}
	
	.el-dialog__footer {
		text-align: center!important;
	}
	
	/*公用部分end*/
	/*更换项目经理*/
	
	.change-manager .el-dialog--small {
		width: 442px!important;
	}
	
	.change-manager .el-form-item__label {
		text-align: left!important;
		color: #000000;
	}
	
	.inputOut {
		width: 200px;
	}
	
	.inputOut .el-input__inner {
		background: #F1F1F1;
	}
	
	.change-manager .el-textarea__inner {
		font-size: 12px!important;
		height: 56px;
		resize: none;
	}
	
	.el-form-item {
		margin-bottom: 10px;
	}
	/*更换项目经理end*/
</style>