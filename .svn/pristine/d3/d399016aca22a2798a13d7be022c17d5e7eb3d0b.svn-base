<template>
	<div class="popmenu" v-if="visible">
		<div class="item clearfix">
			<span class="l wb">项目实施额度</span>
			<span class="r wb">{{amountImpl | nullformat}}元</span>
		</div>
		<div class="item mt14 clearfix">
			<span class="l ws">原始实施额度</span>
			<span class="r ws">{{dataSource.money | nullformat('0')}}元</span>
		</div>
		<div class="item mt14 clearfix">
			<span class="l g">{{dataSource.itemProgressVo.itemRequireDate | nullformat}}</span>
			<span class="r"></span>
		</div>
		<div class="item bline mt10 clearfix">
			<span class="l g">需求变动实施额度</span>
			<span class="r ws">{{dataSource.rAmount | nullformat('0')}}元</span>
		</div>
		<div class="item mt14 clearfix">
			<span class="l wb">项目计划周期</span>
			<span class="r"></span>
		</div>
		<div class="item bline mt14 clearfix">
			<span class="l g">{{planTimeFormat(dataSource.planStartTime) | nullformat}} - {{planTimeFormat(dataSource.planEndTime) | nullformat}}</span>
			<span class="r"></span>
		</div>
		<div class="item mt20 clearfix">
			<span class="l wb">实际执行周期</span>
			<span class="r"></span>
		</div>
		<div class="item bline mt14 clearfix">
			<span class="l g">{{dataSource.itemRealStartTime | nullformat('暂未开始')}}&nbsp;<span class="r" v-if="dataSource.itemRealStartTime!=null&&dataSource.itemRealEndTime==null">&nbsp;&nbsp;至今</span><span class="r" v-if="dataSource.itemRealStartTime!=null&&dataSource.itemRealEndTime!=null">- {{dataSource.itemRealEndTime}}</span></span>
			<span class="r"></span>
		</div>
		<div class="item mt10 clearfix" v-if="HasPermission('ItemDetailLeftDiaWorkTime')">
			<span class="l wb">项目评估工时</span>
			<span class="r wb">{{dataSource.itemProgressVo.hour | nullformat}}h</span>
		</div>
		<div class="item bline mt14 clearfix" v-if="HasPermission('ItemDetailLeftDiaWorkTime')">
			<span class="l ws">剩余评估工时</span>
			<span class="r ws">{{dataSource.itemProgressVo.hour - dataSource.itemProgressVo.workTime | nullformat}}h</span>
		</div>
		<div class="item mt14 clearfix">
			<span class="l g" v-if="dataSource.node!=null">
					当项目进度更新越过{{dataSource.node | nullformat}}，
					需由事业部总监、PMO、商务经理审核
				</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ProgressPopMenu',
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
				return this.dataSource.money + this.dataSource.rAmount
			}
		},
		methods: {
			planTimeFormat(t) {
				let dStr = null
				if (t) {
					dStr = t.toString().split('-').join('/')
				}
				let time = new Date(dStr).format("yyyy-MM-dd")
				return time
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
</style>