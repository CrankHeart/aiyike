<!--外围项目管理详情-右侧-范围描述-->
<template>
	<div class="range_dsc">
		<div class="line"></div>
		<div class="title">
			业务范围
		</div>
		<ul class="tag-area">
			<li :key="index" v-for="(item, index) in labels"><span>{{item.name}}</span></li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'Range_Dsc',
		data() {
			return {
				state: this.$store.state,
				leftDetail: {},
				labels: []
			};
		},
		watch: {
			'state.outItemLeftDetails' : {
				deep: true,
				handler(val) {
					this.leftDetail = val
					this.labelsHandler()
				}
			}
		},
		mounted: function() {
			this.$nextTick(()=>{
				this.leftDetail = this.$store.getters.outItemLeftDetails
				this.labelsHandler()
			})
		},
		methods: {
			labelsHandler() {
				if (String.isString(this.leftDetail.labels)) {
					try{
						this.labels = JSON.parse(this.leftDetail.labels)
					}catch(e){
					}
				}
			},
			sureClick() {
			},
			cancelClick() {
			}
		}
	}
</script>

<style>
	.range_dsc{
		padding: 0px 20px 14px 20px;
		min-height: 346px;
	}
	.range_dsc .line {
		margin-left: -20px;
		margin-right: -20px;
		opacity: 0.26;
		border-bottom: 1px solid #D5D5D5;
	}
	.range_dsc .title{
		padding-top: 18px;
		padding-bottom: 8px;
	}
	.tag-area li{
		display: inline-block;
		width: 90px;
		height: 24px;
		line-height: 24px;
		font-size: 12px;
		color: #666666;
		background: #F8F9FB;
		margin-right: 10px;
		margin-top: 10px;
		text-align: center;
	}
	.tag-area li:nth-of-type(3n) {
		margin-right: 0;
	}
	.tag-area li span{
		display: inline-block;
		transform: scale(0.83333);
	}
</style>