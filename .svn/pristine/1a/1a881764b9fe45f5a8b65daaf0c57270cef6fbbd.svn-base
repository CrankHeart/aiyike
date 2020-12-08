<template>
	<div class="wrap container">
		<tabs v-model="activeName" @tab-click="handleClick">
			<tab-pane label="范围描述" name="scopeDesc">
				<component :is="scopeDesc"></component>
			</tab-pane>
			<tab-pane label="评估信息" name="assessInfo">
				<component :is="assessInfo"></component>
			</tab-pane>	
			<tab-pane label="操作记录" name="operaRecord">
				<component :is="operaRecord"></component>
			</tab-pane>	
		</tabs>
	</div>
</template>
<script>
	function syncComponent(path) {
		return () => import('@/' + path + '.vue')
	}
	let scopeDesc = syncComponent('modules/Out/scopeDesc')
	let assessInfo = syncComponent('modules/Out/assessInfo')
	let operaRecord = syncComponent('modules/Out/operaRecord')
	let Tabs = syncComponent('components/tabs/Tabs')
	let TabPane = syncComponent('components/tabs/TabPane')
	export default {
		name: 'OutMgt',
		data() {
			return {
				activeName: 'scopeDesc',
				scopeDesc: scopeDesc,
				assessInfo: null,
				operaRecord
			}
		},
		watch: {
		},
		components: {
			scopeDesc,
			assessInfo,
			operaRecord,
			Tabs,
			TabPane
		},
		mounted: function() {
			
		},
		methods: {
			handleClick(tab, event) {
				if(tab.name=="scopeDesc"){
					this.scopeDesc = scopeDesc;
				}else if(tab.name=="assessInfo"){
					this.assessInfo = assessInfo;
				}else if(tab.name=="operaRecord"){
					this.operaRecord = operaRecord;
				}
			}
		}
	}
</script>

<style scoped>
	
</style>