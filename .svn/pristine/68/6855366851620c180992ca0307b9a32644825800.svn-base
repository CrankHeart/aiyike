<template>
	<div class="layout">
		<el-table :data="teamDetails.itemList" style="width: 100%">
			<el-table-column prop="ItemName" label="项目名称">
			</el-table-column>
			<el-table-column prop="progress" label="项目进度" align="center">
				<template slot-scope="props">
					<span class="tips-text" :status="props.row.progress">{{(props.row.progress/props.row.totalHours*100) .toFixed(0) | nullformat }}</span><span class="percentUnit"> %</span>
				</template>
			</el-table-column>
			<el-table-column prop="tAmount" label="外围总价 (元)" align="center">
				<template slot-scope="props">
					{{props.row.tAmount | moneyformat}}
				</template>
			</el-table-column>
			<el-table-column prop="manager" label="艾艺负责人" align="center">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: 'CpItem',
		data() {
			return {
				state: this.$store.state,
				teamDetails: {}
			}
		},
		components: {},
		watch: {
			'state.teamDetails': {
				deep: true,
				handler(val) {
					this.teamDetails = Object.deepClone(val)
					Object.isNotEmpty(this.teamDetails) && this.init()
				}
			}
		},
		mounted: function() {
			this.$nextTick(() => {
				this.teamDetails = Object.deepClone(this.$store.getters.teamDetails)
				Object.isNotEmpty(this.teamDetails) && this.init()
			})
		},
		methods: {
			init() {
			}
		}
	}
</script>

<style scoped>
	.layout {
		width: auto;
		padding-top: 24px;
		position: relative;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.tips-text[status="挂起"] {
		color: #EDC156;
	}
</style>