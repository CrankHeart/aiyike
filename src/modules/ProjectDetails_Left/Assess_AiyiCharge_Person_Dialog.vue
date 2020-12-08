<template>
	<!--评价外围负责人  弹窗-->
	<el-dialog title="评价艾艺负责人" :visible.sync="dialogVisible" size="tiny" class="appraise">
		<el-form :model="evaForm" ref="evaForm">
			<div class="block star_rating">
				<span>星级:</span>
				<el-rate v-model="evaForm.value1"></el-rate>
			</div>
			<div class="eva_fill">
				<span>评价:</span>
				<el-input type="textarea" :rows="3" placeholder="填写评价" v-model="evaForm.eva_fill"></el-input>
			</div>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			    <el-button @click="dialogVisible = false">取 消</el-button>
			</span>
	</el-dialog>
</template>

<script>
	export default {
		name: 'Assess_AiyiCharge_Person_Dialog',
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
				evaForm:{
					value1:1,
					eva_fill:''
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

</style>