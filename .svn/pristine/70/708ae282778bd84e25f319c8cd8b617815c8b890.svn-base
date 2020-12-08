<template>
	<el-dialog :title="title" class="dialog442 alertDialog" :visible.sync="alertVisible">
        <div class="tip">{{text}}</div>
        <span slot="footer" class="dialog-footer">
        	<el-button class="submitbtn" type="primary"  @click="sureClick">确定</el-button>
            <el-button class="cancelbtn" @click="cancelClick">取消</el-button>
	    </span>
    </el-dialog>
</template>

<script>
	export default {
		name: 'AlertDialog',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			text: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			}
		},
		watch: {
			visible(val) {
				this.alertVisible = val
			},
			alertVisible(val) {
				this.$emit('update:visible', val)
			}
		},
		data() {
			return {
				alertVisible: false,
			};
		},
		mounted: function() {this.alertVisible = this.visible},
		methods: {
			sureClick() {
				this.$emit('submit')
			},
			cancelClick() {
				this.$emit('cancel')
			}
		}
	}
</script>

<style scoped>
	.alertDialog .tip{
        padding-top: 44px;
        padding-bottom: 44px;
        text-align: center;
    }
</style>