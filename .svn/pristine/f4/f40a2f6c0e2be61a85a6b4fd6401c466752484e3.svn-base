<!--项目管理-未完结项目详情-左侧模块-下拉项目描述-->
<template>
	<div class="projectdsc" v-if="show" @click.stop="()=>{}">
		<section class="inner">
			<div class="header mb14">
				<span class="project-tag" type="短期项目"><span>{{categoryText}}</span></span>
				<span class="project-code">项目编号：<span>{{details.code}}</span></span>
			</div>
			<div class="content mb16">
				{{details.description}}
			</div>
			<table>
				<tr v-if="details.category===2">
					<td class="tip">合同编号:</td>
					<td class="text">{{details.contract | nullformat}}</td>
				</tr>
				<tr v-if="HasPermission('projectDscContractMoney')">
					<td class="tip">合同金额:</td>
					<td class="text">{{contractMoney | nullformat}}<span>&nbsp;元</span></td>
				</tr>
				<tr>
					<td class="tip">客户公司:</td>
					<td class="text">{{details.customerbus.name}}</td>
				</tr>
				<tr>
					<td class="tip">所属行业:</td>
					<td class="text">{{industryText}}</td>
				</tr>
				<tr>
					<td class="tip">商务经理:</td>
					<td class="text">{{details.baName}}</td>
				</tr>
				<tr>
					<td class="tip">项目经理:</td>
					<td class="text">{{details.manager}}</td>
				</tr>
				<tr>
					<td class="tip">甲方负责人:</td>
					<td class="text">{{details.customerName | nullformat}}</td>
				</tr>
				<tr>
					<td class="tip">联系电话:</td>
					<td class="text">{{details.user.mobile | nullformat}}</td>
				</tr>
				<tr>
					<td class="tip">联系邮箱:</td>
					<td class="text">{{details.user.email | nullformat}}</td>
				</tr>
				<tr>
					<td class="tip">资料库:</td>
					<td class="text">{{details.url | nullformat}}</td>
				</tr>
			</table>
		</section>

	</div>
</template>

<script>
	export default {
		name: 'ProjectDsc',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			details: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		watch: {
		},
		data() {
			return {
			};
		},
		components: {},
		mounted: function() {
		},
		computed: {
			categoryText() {
				let ret = ''
				switch (parseInt(this.details.category)){
					
					case 2:
						ret = '短期项目';
						break
					case 4:
						ret = '售前项目';
						break
					case 5:
						ret = '内部研发项目';
						break
					case 1:
						ret = '长期项目';
						break
					case 3:
						ret = '维护项目';
						break			
					default:
					ret = '其他';
						break;
				}
				return ret
			},
			industryText() {
				let ret = ''
				switch (parseInt(this.details.industry)){
					case 1:
						ret = '金融';
						break
					case 2:
						ret = '教育';
						break
					case 3:
						ret = '医疗';
						break
					case 4:
						ret = '化工';
						break
					case 5:
						ret = '物流';
						break
					case 6:
						ret = '电器';
						break
					case 7:
						ret = '互联网';
						break
					case 8:
						ret = '事业单位';
						break
					case 9:
						ret = '电力能源';
						break
					case 10:
						ret = '通信';
						break
					case 11:
						ret = '房产';
						break
					case 12:
						ret = '广告';
						break
					case 13:
						ret = '餐饮';
						break
					case 14:
						ret = '零售';
						break
					case 15:
						ret = '旅游';
						break
					case 16:
						ret = '文化艺术';
						break
					case 17:
						ret = '工业';
						break
					case 18:
						ret = '其他';
						break					
					default:
					ret = '金融';
						break;
				}
				return ret
			},
			contractMoney(){
				let ret = ''
				if(parseInt(this.details.category)==2){
					if(this.details.itemRequireTotalMoney!=null&&parseInt(this.details.itemRequireTotalMoney)!=0){
						ret = this.details.contractMoney + '+' + this.details.itemRequireTotalMoney
					}else{
						ret = this.details.contractMoney
					}
				}else{
					if(this.details.itemRequireTotalMoney!=null&&parseInt(this.details.itemRequireTotalMoney)!=0){
						ret = this.details.budget + '+' + this.details.itemRequireTotalMoney
					}else{
						ret = this.details.budget
					}
				}
				return ret
			}
		},
		methods: {
		}
	}
</script>

<style scoped>
	.projectdsc {
		position: absolute;
		top: -10px;
		left: 0;
		right: 0;
		box-shadow: 0px 6px 6px #f5f5f5;
		z-index: 11;
		background: #fff;
		overflow: hidden;
		padding: 0 20px 20px 20px;
	}
	.projectdsc .header {}
	
	.project-tag {
		display: inline-block;
		text-align: center;
		vertical-align: bottom;
	}
	
	.project-tag[type="短期项目"] {
		width: 90px;
	    height: 20px;
	    background: #f8f9fb;
	    font-size: 12px;
	    color: #666;
	    line-height: 20px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	
	.project-tag span {
		transform: scale(0.833333);
	}
	
	.project-code {
		margin-left: 12px;
		font-size: 12px;
		color: #999999;
	}
	
	.project-code span {
		font-size: 12px;
		color: #666666;
	}
	
	.content {
		font-size: 12px;
		color: #333333;
	}
	
	.mb14 {
		margin-bottom: 14px;
	}
	
	.mb16 {
		margin-bottom: 16px;
	}
	
	.mb8 {
		margin-bottom: 8px;
	}
	
	table {
		width: 100%;
		text-align: left;
		font-size: 12px;
		color: #999999;
	}
	
	table .tip {
		width: 74px;
	}
	
	table .tip,
	table .text {
		padding-bottom: 8px;
	}
	
	table tr:nth-last-of-type(1) .tip,
	table tr:nth-last-of-type(1) .text {
		padding-bottom: 0px;
	}
</style>