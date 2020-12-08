<template>
	<div class="wrap container">
		<tabs v-model="activeName" @tab-click="handleClick">
			<tab-pane label="数据字典" name="dic" v-if="HasPermission('dic')">
				<component :is="dic"></component>
			</tab-pane>
			<tab-pane label="数据字典类别" name="diccate" v-if="HasPermission('diccate')">
				<component :is="diccate"></component>
			</tab-pane>
			<tab-pane label="标签管理" name="labels" v-if="HasPermission('label')">
				<component :is="labels"></component>
			</tab-pane>
			<tab-pane label="角色管理" name="role" v-if="HasPermission('role')">
				<component :is="role"></component>
			</tab-pane>
			<tab-pane label="资源管理" name="permission" v-if="HasPermission('permission')">
				<component :is="permission"></component>
			</tab-pane>
		</tabs>
	</div>
</template>

<script>
	let dic = function(resolve) {
		require(['./Permission/dic.vue'], resolve);
	}

    let diccate = function(resolve) {
		require(['./Permission/diccate.vue'], resolve);
	}
    
       let labels = function(resolve) {
		require(['./Permission/labels.vue'], resolve);
	}

	let role = function(resolve){
		require(['./Permission/role.vue'],resolve);
	}

	let permission = function(resolve){
		require(['./Permission/permission.vue'],resolve);
	}
	
	let Tabs = function(resolve){
		require(['@/components/tabs/Tabs.vue'],resolve);
	}
	
	let TabPane = function(resolve){
		require(['@/components/tabs/TabPane.vue'],resolve);
	}
	
	export default {
		name: 'index',
		data() {
			return {
				activeName:  null,
				dic: null,
				diccate: null,
				labels: null,
				role: null,
				permission: null
			}
		},
		components: {
			Tabs,
			TabPane
		},
		mounted: function() {
		},
		methods: {
			handleClick(tab, event) {
				if(tab.name=="dic"){
					this.dic = dic
				}
				if(tab.name=="diccate"){
					this.diccate = diccate
				}
				if(tab.name=="labels"){
					this.labels = labels
				}
				if(tab.name=="role"){
					this.role = role
				}
				if(tab.name=='permission'){
					this.permission=permission
				}
			}
		}
	}
</script>
<style scoped>
</style>