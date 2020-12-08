<template>
	<div class="popmenu" v-if="visible">
		<div class="item bline clearfix">
			<span class="l wb">{{dataSource.itemProgressVo.departName | nullformat}}所占比重</span>
			<span class="r wb">{{amountImpl | nullformat}}%</span>
		</div>
		<div class="item mt14 clearfix">
			<span class="l wb">剩余实施额度</span>
			<span class="r wb">{{dataSource.itemProgressVo.residualMoney | nullformat}}元</span>
		</div>
		<div class="item mt14 clearfix">
			<span class="l g">总实施额度</span>
			<span class="r g">{{dataSource.itemProgressVo.totalMoney | nullformat}}元</span>
		</div>
		<div class="item bline mt10 clearfix">
			<span class="l g">已使用实施额度</span>
			<span class="r g">{{dataSource.itemProgressVo.useMoney | nullformat}}元</span>
		</div>
		<div class="item mt14 clearfix">
			<span class="l wb">剩余工时</span>
			<span class="r wb">{{dataSource.itemProgressVo.surplusTime | nullformat}}h</span>
		</div>
		<div class="item mt14 clearfix">
			<span class="l g">总工时</span>
			<span class="r g">{{dataSource.itemProgressVo.time | nullformat}}h</span>
		</div>
		<div class="item bline mt14 clearfix">
			<span class="l g">已用工时</span>
			<span class="r g">{{dataSource.itemProgressVo.workTime | nullformat}}h</span>
		</div>
		<div class="item mt14 clearfix" v-for="(item, index) in dataSource.itemProgressVo.reviewInfoVoList" v-if="dataSource.itemProgressVo.status == 2">
			<span class="l g">{{obtainRoleText(item.type)}}</span>
			<span class="r g" state="审核通过">审核通过</span>
		</div>
		<div class="item mt14 clearfix" v-for="(item, index) in obtainAuditLoading()" v-if="dataSource.itemProgressVo.status == 2">
			<span class="l g">{{obtainRoleText(item)}}</span>
			<span class="r g" state="审核中">审核中</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ProgressPopMenu2',
		props: {
			visible: {
				type: Boolean
			}
		},
		data() {
			return {
				state: this.$store.state,
				dataSource: {}
			}
		},
		watch: {
			'state.pjDetails.leftData': {
				deep: true,
				handler(val) {
					this.dataSource = {...val}
				}
			}
		},
		mounted() {
			this.dataSource = {...this.$store.getters.pjDetailsLeftData}
		},
		computed: {
			amountImpl() {
				let ret = (this.dataSource.itemProgressVo.time * 100 / this.dataSource.totalHours).toFixed(0)
				let sp = `${ret}`.split('.')
				if (sp[1] == 0) {
					ret = sp[0]
				}
				return ret
			}
		},
		methods: {
			obtainRoleText(type) {
				if (type == 2) {
					return '事业部总监'
				}
				if (type == 3) {
					return 'PMO'
				}
				if (type == 4) {
					return '商务经理'
				}
			},
			obtainAuditLoading() {
				let roleType = [2,3,4]
				let ret = []
				let list = this.dataSource.itemProgressVo.reviewInfoVoList
				let retList = []
				for (let i in list) {
					ret.push(list[i].type)
				}
				for (let i = 0;i < roleType.length;) {
					let index = ret.indexOf(roleType[i])
					if (index != -1) {
						roleType.splice(+i, 1)
						i--
					} else {
						i++
					}
				}
				return roleType
			}
		}
	}
</script>

<style scoped>
	.mt20 {
		margin-top: 20px;
	}
	
	.mt14 {
		margin-top: 14px;
	}
	
	.mb14 {
		margin-bottom: 14px;
	}
	
	.mt10 {
		margin-top: 10px;
	}
	
	.mb10 {
		margin-bottom: 10px;
	}
	.popmenu {
		background: rgba(0, 0, 0, 0.9);
		width: 300px;
		position: absolute;
		color: #fff;
		z-index: 10;
		top: 20px;
		right: -196px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		padding: 14px 18px 14px 18px;
	}
	
	.popmenu .item {}
	
	.popmenu .item .l {
		float: left;
	}
	
	.popmenu .item .r {
		float: right;
	}
	
	.popmenu .bline {
		border-bottom: 1px solid #2e2e2e;
		padding-bottom: 14px;
	}
	
	.popmenu .wb {
		font-size: 14px;
	}
	
	.popmenu .ws {
		font-size: 12px;
	}
	
	.popmenu .g {
		font-size: 12px;
		color: #d9d9d9;
	}
	.popmenu span[state="审核通过"] {
		color: #1aa85e !important;
	}
	.popmenu span[state="审核中"] {
		color: #f5bf3c !important;
	}
</style>