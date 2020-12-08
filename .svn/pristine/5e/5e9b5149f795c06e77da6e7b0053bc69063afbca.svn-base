<template>
	<div class="wrap container">
		<tabs v-model="activeName" @tab-click="handleClick" class="managerTab">
			<tab-pane label="密码配置" name="initpwd" v-if="HasPermission('initpwd')">
				<component :is="initpwd"></component>
			</tab-pane>
			<tab-pane label="全员密码管理" name="inituc" v-if="HasPermission('inituc')">
				<component :is="inituc"></component>
			</tab-pane>
			<tab-pane label="状态配置" name="status" v-if="HasPermission('status')">
				<component :is="status"></component>
			</tab-pane>
			<tab-pane label="假期列表" name="holiday" v-if="HasPermission('holiday')">
				<component :is="holiday"></component>
			</tab-pane>
		</tabs>
	</div>
</template>

<script>
	function syncComponent(path) {
		return() =>
			import('@/' + path + '.vue')
	}
	let initpwd = syncComponent('page/Super/initpwd')
	let inituc = syncComponent('page/Super/inituc')
	//let applyrate = syncComponent('page/Super/applyrate')
	let status = syncComponent('page/Super/status')
	let holiday = syncComponent('page/Super/holiday')
	let Tabs = syncComponent('components/tabs/Tabs')
	let TabPane = syncComponent('components/tabs/TabPane')
	export default {
		name: 'Superorg',
		data() {
			return {
				activeName: null,
				initpwd: null,
				inituc: null,
				status: null,
				holiday: null,
			}
		},
		watch: {},
		components: {
			Tabs,
			TabPane
		},
		mounted: function() {

		},
		methods: {
			handleClick(tab, event) {
				if(tab.name == "initpwd") {
					this.initpwd = initpwd;
				}
				if(tab.name == "inituc") {
					this.inituc = inituc;
				}
				if(tab.name == "status") {
					this.status = status;
				}
				if(tab.name == "holiday") {
					this.holiday = holiday;
				}
			}
		}
	}
</script>
<style>

</style>