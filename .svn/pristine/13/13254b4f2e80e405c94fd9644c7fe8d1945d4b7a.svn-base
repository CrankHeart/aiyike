<!--项目管理-新邀请-详情页右侧-->
<template>
	<tabs ref="tabs" class="projectdetailstab" v-model="activeName" @tab-click="handleClick" :iswrap="false" :isroute="false">
		<tab-pane label="团队信息" name="teaminfo">
			<component :is="teaminfoview"></component>
		</tab-pane>
		<tab-pane label="合作项目" name="cpitem" v-if="HasPermission('outcpitem')">
			<component :is="cpitemview"></component>
		</tab-pane>
	</tabs>
</template>

<script>
	let Tabs = () =>
		import('@/components/tabs/Tabs.vue')
	let TabPane = () =>
		import('@/components/tabs/TabPane.vue')
	let CpItem = () =>
		import('./CpItem.vue')
	let TeamInfo = () =>
		import('./TeamInfo.vue')
		
	export default {
		name: 'AlreadyCpDetails_Right',
		data() {
			return {
				activeName: '',
				teaminfoview: null,
				cpitemview: null
			}
		},
		components: {
			Tabs,
			TabPane,
			TeamInfo,
			CpItem
		},
		mounted: function() {
			this.$nextTick(()=>{
			})
		},
		methods: {
			handleClick(tab, event) {
				switch(tab.name) {
					case 'teaminfo':
						this.teaminfoview = TeamInfo
						break;
					case 'cpitem':
						this.cpitemview = CpItem
						break;
					default:
						alert("你是怎么发现我的~~")
						break;
				}
			}
		}
	}
</script>

<style scoped>
	.projectdetailstab {
		background: #FFFFFF;
	}
</style>