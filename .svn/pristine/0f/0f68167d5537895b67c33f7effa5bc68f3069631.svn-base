<!--项目管理-项目详情页-阶段性汇报模块-->
<template>
	<div class="operation_record">
		<div class="details" v-show="visibleDetails">
			<div class="return">
				<span @click="returnClick" class="return-click"><i class="el-icon-arrow-left"></i> <span class="return">返回</span></span>
			</div>
			<div>
				<span class="edit-name">{{details.name}}</span>
				<span class="a edit" @click="editClick" v-if="editClickVisible"><i class="el-icon-edit"></i></span>
			</div>
			<div class="mtb20">
				<span class="edit-date-tips">提交日期：</span><span class="edit-date">{{details.createTime | timeStr2Text}}</span>
			</div>
			<div class="edit-remark">
				<div v-html="details.remark"></div>
			</div>
		</div>
		<div class="pt30" v-show="!visibleDetails"></div>
		<div class="operation clearfix" v-for="(item, oindex) in listData" v-show="!visibleDetails">
			<div class="operation_time">
				<p class="date">{{item[0]._month}}/{{item[0]._day}}</p>
				<p class="year">{{item[0]._year}}</p>
			</div>
			<div class="operation_con">
				<ul>
					<li v-for="(sitem, inindex) in item">
						<dl class="operdl">
							<dt>{{sitem._hours}}:{{sitem._minute}}</dt>
							<dd>
								<div @click="watchClick(sitem)" class="opcon" v-html="sitem.name"></div>
								<!--<p class="remark">备注：</p>-->
							</dd>
						</dl>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Periodic_Report',
		data() {
			return {
				listData: [],
				visibleDetails: false,
				details: {}
			}
		},
		computed: {
			editClickVisible() {
				let date = new Date(this.details.createTime)
				console.log(this.details.createTime)
				date.setHours(23)
				date.setMinutes(59)
				date.setSeconds(59)
				let time = date.getTime() + (1 * 24 * 60 * 60 * 1000)
				if(new Date().getTime() <= time) {
					return true
				} else {
					return false
				}
			}
		},
		components: {},
		mounted() {
			this.obtainListDataSource()
		},
		methods: {
			editClick() {
				this.$store.commit("outReporting_State", 'edit')
				this.$store.commit("outReporting_Data", this.details)
				this.$router.push(`/out/outMgt/reporting/${this.$route.params.id.split("-")[0]}`)
			},
			watchClick(item) {
				this.details = item
				this.visibleDetails = true
			},
			returnClick() {
				this.visibleDetails = false
			},
			obtainListDataSource() {
				this.$http.post('/api/itemReport/itemReportByOut', {
					applyId: parseInt(this.$route.params.id.split('-')[0]),
				}, {
					emulateJSON: true
				}).then((res) => {
					if(res.data.success) {
						let ret = res.data.result
						this.listData = this.sortListDataSource(ret)
					}
				}).catch((err) => {

				})
			},
			add0ToString(str) {
				if(str < 10 && `${str}`.length == 1) {
					str = '0' + str
				}
				return str
			},
			sortListDataSource(ret) {
				let mapSg = {}
				let mapSort = []
				let mapSortRet = []
				for(let index in ret) {
					let timeObj = new Date(ret[index].createTime)
					let year = timeObj.getFullYear()
					let month = this.add0ToString(timeObj.getMonth() + 1)
					let day = this.add0ToString(timeObj.getDate())
					let hours = this.add0ToString(timeObj.getHours())
					let minute = this.add0ToString(timeObj.getMinutes())
					ret[index]._year = year
					ret[index]._month = month
					ret[index]._day = day
					ret[index]._hours = hours
					ret[index]._minute = minute
					let key = `${year}-${month}-${day}`
					if(!Array.isArray(mapSg[key])) {
						mapSg[key] = []
						mapSort.push(key)
					}
					mapSg[key].push(ret[index])
				}
				mapSort = mapSort.sort(function(a, b) {
					return b - a
				})
				for(let i in mapSort) {
					let key = mapSort[i]
					mapSortRet.push(mapSg[key])
				}
				return mapSortRet
			}
		}
	}
</script>

<style scoped>
	.opcon {
		cursor: pointer;
	}
	
	.edit-date-tips {
		color: #000000;
	}
	
	.mtb20 {
		margin: 10px 0 10px 0;
	}
	
	.edit-name {
		font-size: 18px;
		color: #000;
	}
	
	.edit-date {
		font-size: 16px;
	}
	
	.edit-remark {
		font-size: 14px;
		color: #333;
	}
	
	.edit {
		margin-left: 10px;
	}
	
	.el-icon-edit {
		color: #295dcf;
	}
	
	.pt30 {
		padding-top: 30px;
	}
	
	.return-click {
		cursor: pointer;
		font-size: 16px;
	}
	
	.return {
		line-height: 40px;
	}
	
	.a {
		color: #409eff;
		cursor: pointer;
	}
	
	.operation_con ul {
		padding-top: 6px;
		padding-bottom: 6px;
		padding-right: 6px;
	}
	
	.operation_record {
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.operation_record .operation {
		margin-bottom: 20px;
	}
	
	.operation_record .operation_time {
		width: 56px;
		margin-right: 20px;
		float: left;
	}
	
	.operation_record .operation_con {
		opacity: 0.88;
		background-color: #F8F9FB;
		margin-left: 76px;
	}
	
	.operation_record .operation_time .date {
		font-size: 18px;
		color: #333333;
		letter-spacing: 0;
		text-align: right;
	}
	
	.operation_record .operation_time .year {
		font-size: 12px;
		color: #3F3F3F;
		letter-spacing: 0;
		line-height: 25px;
		text-align: right;
	}
	
	.operation_record .operdl {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	
	.operation_record .operdl dt {
		padding-left: 14px;
		margin-right: 20px;
		font-size: 12px;
		color: #333333;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		letter-spacing: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.operation_record .operdl dd {
		font-size: 12px;
		color: #333333;
		letter-spacing: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.operation_record .operation_con ul li {
		margin-bottom: 8px;
	}
	
	.operation_record .operation_con ul li:nth-last-of-type(1) {
		margin-bottom: 0px;
	}
	
	.remark {
		font-size: 12px;
		color: #666666;
	}
</style>