<!--外围项目-->
<template>
	<div class="wrap container">
		<tabs ref="tabs":class="[tabClass]" v-model="activeName" @tab-click="tabSwitch">
			<tab-pane label="新邀请" name="newinvite" v-if="HasPermission('newinvite')">
				<component :is="newinviteview"></component>
			</tab-pane>
			<tab-pane label="洽谈中" name="talks" v-if="HasPermission('talks')">
				<component :is="talksview"></component>
			</tab-pane>
			<tab-pane label="已合作" name="alreadycp" v-if="HasPermission('alreadycp')">
				<component :is="alreadycpview"></component>
			</tab-pane>
			<tab-pane label="未中标" name="unbid" v-if="HasPermission('unbid')">
				<component :is="unbidview"></component>
			</tab-pane>
		</tabs>
		<outApplyAudit class="out-apply-audit-module" v-if="auditView"></outApplyAudit>
	</div>
</template>

<script>
    let Tabs = () => import('@/components/tabs/Tabs.vue')
    let TabPane = () => import('@/components/tabs/TabPane.vue')
    
	let NewInviteSearch = () =>
		import('@/modules/NewInvite/NewInviteSearch.vue')
	let UnBidSearch = () =>
		import('@/modules/UnBidSearch.vue')
	let TalksSearch = () =>
		import('@/modules/TalksSearch.vue')
	let AlReadyCpSearch = () =>
		import('@/modules/AlreadyCp/AlReadyCpSearch.vue')
	let outApplyAudit = () =>
		import('@/modules/Out/outApplyAudit.vue')
	
    export default {
        name: 'OutItemMgt',
        data() {
            return {
                activeName: null,
                newinviteview: null,
				talksview: null,
				alreadycpview: null,
				unbidview: null,
				auditView: true,
				tabClass: 'tabss'
            }
        },
        watch: {
        },
        components: {
            Tabs,
            TabPane,
            outApplyAudit
		},
        mounted: function() {
		},
		created(){
		},
        beforeDestroy() {
        },
        methods: {
        	showProjectAudit() {
				if (this.pBacklog) {
					this.tabClass = 'tabss'
                	this.auditView = true
				}
			},
			hideProjectAudit() {
				if (this.pBacklog) {
					this.tabClass = ''
                	this.auditView = false
				}
			},
        	tabSwitch(tab, event) {
        		if(tab.name == 'newinvite') {
					this.newinviteview = NewInviteSearch
				}
				if(tab.name == 'talks') {
					this.talksview = TalksSearch
				}
				if(tab.name == 'alreadycp') {
					this.alreadycpview = AlReadyCpSearch
				}
				if(tab.name == 'unbid') {
					this.unbidview = UnBidSearch
				}
			}
        }
    }
</script>

<style scoped>
	.tabss {
		margin-right: 334px;
	}
	.out-apply-audit-module {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>