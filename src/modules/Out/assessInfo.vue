<template>
	<div class="assessInfo">
		<el-table :data="assessInfoData" style="width: 100%">
			<el-table-column prop="type" label="评估类型" align="center" :formatter="fmtAssessType"></el-table-column>
			<el-table-column prop="author" label="评估人/外围团队" width="160" align="center"></el-table-column>
			<el-table-column prop="work" label="总计工作量(人/天)" width="160" align="center"></el-table-column>
			<el-table-column prop="price" label="单价(元)" align="center"></el-table-column>
			<el-table-column prop="total" label="总价(元)" align="center"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="dialogAssessInfoListVisible = true" type="text" size="small">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
	
		<!--查看弹出框begin-->
		<el-dialog title="评估详情" :visible.sync="dialogAssessInfoListVisible" :modal-append-to-body="false" size="large">
			 <div class="dw" style="margin-bottom: 20px;">
			 	<span class="gzl" style="padding-left: 20px;">工作量:(人/天)</span>
			 	<span class="jg"  style="padding-left: 40px;">价格:(元)</span>
			 </div>
			  <el-table :data="assessInfoData">
			    	<el-table-column prop="type"   label="类型"   align="center" :formatter="fmtAssessType"></el-table-column>
					<el-table-column prop="author" label="评估人" align="center"></el-table-column>
					<el-table-column prop="design" label="设计"   align="center"></el-table-column>
					<el-table-column prop="h5"     label="前端"   align="center"></el-table-column>
					<el-table-column prop="service"label="后端"   align="center"></el-table-column>
					<el-table-column prop="work"   label="总计"   align="center"></el-table-column>
					<el-table-column prop="ratio"  label="系数"   align="center"></el-table-column>
					<el-table-column prop="budget" label="预算"   align="center"></el-table-column>
					<el-table-column prop="price"  label="单价"   align="center"></el-table-column>
					<el-table-column prop="total"  label="总价"   align="center"></el-table-column>
			  </el-table>
		</el-dialog>
		<!--查看弹出框end-->
	</div>
</template>
<script>
	export default {
		name: 'assessInfo',
		data() {
			return {
				dialogAssessInfoListVisible: false,
				title: '',
				itemId: this.$store.getters.currentItemOutId,
				assessInfoData: this.$store.state.itemOutData[this.$store.getters.currentItemOutId].itemAssessList
			}
		},
		props: {
			
		},
		watch: {

		},
		computed: {

		},
		components: {

		},
		mounted: function() {
			
		},
		methods: {
			fmtAssessType:function(row){
				let type=row.type
				if(type==1){
					return '内部'
				}else if(type==2){
					return '外围'
				}else{
					return '未知'
				}
			}
		}
	}
</script>

<style scoped>
    .el-table {
    	margin-top: 5px;
    }
</style>