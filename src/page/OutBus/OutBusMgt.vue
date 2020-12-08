<!--外围团队-->
<template>
	<div class="wrap container">
		<tabs ref="tabs" :class="[tabClass]" v-model="activeName" @tab-click="tabSwitch">
			<tab-pane label="团队管理" name="teamgt" v-if="HasPermission('teamgt')">
				<div class="details">
					<component :is="leftview" class="details_left"></component>
					<component :is="rightview" class="details_right" @reload="obtainTeamDetails"></component>
					<div style="height: 24px;"></div>
				</div>
			</tab-pane>
		</tabs>
	</div>
</template>

<script>
	let Tabs = () =>
		import('@/components/tabs/Tabs.vue')
	let TabPane = () =>
		import('@/components/tabs/TabPane.vue')

	let OutTeamMgtDetails_Left = () =>
		import("@/modules/Out/OutTeamMgtDetails_Left/OutTeamMgtDetails_Left.vue");
	let OutTeamMgtDetails_Right = () =>
		import("@/modules/Out/OutTeamMgtDetails_Right/OutTeamMgtDetails_Right.vue");

	export default {
		name: "OutBusMgt",
		data() {
			return {
				activeName: null,
				leftview: null,
				rightview: null,
				tabClass: ''
			};
		},
		components: {
			Tabs,
			TabPane
		},
		beforeCreate() {},
		watch: {},
		created() {
			this.leftview = OutTeamMgtDetails_Left
			this.rightview = OutTeamMgtDetails_Right
		},
		mounted: function() {
			this.$nextTick(() => {
				this.obtainTeamDetails()
			})
		},
		beforeDestroy() {},
		methods: {
			obtainTeamDetails() {
				this.$http.post("/api/bus/detailOutTeam", {
							id: this.$store.getters.loginInfo.bus.id
						}, {
							emulateJSON: true
						}
				).then(res => {
						this.$store.commit("teamDetails", res.data.result)
				}).catch(err => {})
			},
			tabSwitch(tab, event) {}
		}
	};
</script>

<style scoped>
	.details_left {
		float: left;
		min-height: 100%;
		background: #fff;
		
	}
	
	.details_right {
		min-height: 100%;
		margin-left: 374px;
	}
	
	.details {
		height: 100%;
		box-sizing: border-box;
		padding-top: 24px;
		padding-bottom: 24px;
	}
</style>