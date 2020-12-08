<!--项目管理-新邀请--洽谈中--已合作--评价模块-->
<template>
	<div class="layout">
		<div class="evaluate">
			<div class="receipt_eva" v-for="evaluate in evaluates">
				<div class="eva_title">
					{{obtainTitleByType(evaluate.type)}}
				</div>
				<el-rate v-model="evaluate.star" disabled>
				</el-rate>
				<div class="evalutioner">
					<span>{{evaluate.ucName}}</span><span>{{evaluate.updateTime}}</span>
				</div>
				<div class="evaluation">
					{{evaluate.description}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Assess_List',
		data() {
			return {
				evaluates: []
			}
		},
		components: {},
		mounted() {
			this.obtainListDataSource()
		},
		methods: {
			obtainTitleByType(type) {
				if (2 == type) {
					return "我对艾艺负责人的评价"
				}
				if (3 == type) {
					return "收到的评价"
				}
				return "评价"
			},
			obtainListDataSource() {
				let p1 = new Promise((resolve, reject) => {
					this.$http.post('/api/itemComment/itemCommentByOut', {
						applyId: parseInt(this.$route.params.id.split('-')[0]),
						type: 3,
						busId: this.$store.getters.outItemItem.busId
					}, {
						emulateJSON: true
					}).then((res) => {
						if(res.data.success) {
							let ret = res.data.result
							if (res.data.success) {
								resolve(ret)
							}
						}
					}).catch((err) => {
						reject("what???")
					})
				})
				let p2 = new Promise((resolve, reject) => {
					this.$http.post('/api/itemComment/itemCommentByOut', {
						applyId: parseInt(this.$route.params.id.split('-')[0]),
						type: 2,
						busId: this.$store.getters.outItemItem.busId
					}, {
						emulateJSON: true
					}).then((res) => {
						if(res.data.success) {
							let ret = res.data.result
							if (res.data.success) {
								resolve(ret)
							}
						}
					}).catch((err) => {
						reject("what???")
					})
				})
				Promise.all([p1, p2]).then((values) => {
					let list = [...values[0], ...values[1]]
					list.forEach((item, index) => {
						list[index].key = Date.parse(item.createTime)
					})
					this.evaluates = list.sort(function(a, b) {
						return b.key - a.key
					})
				});
			},
			add0ToString(str) {
				if (str < 10 && `${str}`.length == 1) {
					str = '0' + str
				}
				return str
			},
			sortListDataSource(ret) {
				let mapSg = {}
				let mapSort = []
				let mapSortRet = []
				for (let index in ret) {
					let timeObj = new Date(ret[index].createTime)
					let year = timeObj.getFullYear()
					let month = this.add0ToString(timeObj.getMonth() + 1)
					let day = this.add0ToString(timeObj.getDate())
					let hours = timeObj.getHours()
					let minute = this.add0ToString(timeObj.getMinutes())
					ret[index]._year = year
					ret[index]._month = month
					ret[index]._day = day
					ret[index]._hours = hours
					ret[index]._minute = minute
					let key = `${year}-${month}-${day}`
					if (!Array.isArray(mapSg[key])) {
						mapSg[key] = []
						mapSort.push(key)
					}
					mapSg[key].push(ret[index])
				}
				mapSort = mapSort.sort(function(a, b) {
					return b - a
				})
				for (let i in mapSort) {
					let key = mapSort[i]
					mapSortRet.push(mapSg[key])
				}
				return mapSortRet
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
	
	.evaluate .receipt_eva {
		padding: 14px 20px;
		background: rgba(248, 249, 251, 0.88);
		margin-bottom: 10px;
	}
	
	.evaluate .eva_title {
		font-size: 14px;
		color: #333333;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
		letter-spacing: 0;
		margin-bottom: 10px;
	}
	
	.evaluate .evalutioner {
		font-size: 14px;
		color: #999999;
		letter-spacing: 0;
		margin: 6px 0 9px;
	}
	
	.evaluate .evalutioner span:first-child {
		margin-right: 10px;
		font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.evaluate .evaluation {
		font-size: 14px;
		color: #333333;
		letter-spacing: 0;
	}
	
	.eva_fill {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	
	.eva_fill>span {
		font-size: 12px;
		color: #000000;
		letter-spacing: 0;
		width: 40px;
	}
</style>