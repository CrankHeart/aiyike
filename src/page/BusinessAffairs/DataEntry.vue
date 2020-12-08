<!--数据录入-->
<template>
	<div class="wrap container">
		<tabs ref="tabs" v-model="activeName" @tab-click="tabSwitch" class="dataEnter" @refresh="refreshList">
			<tab-pane label="运营数据" name="operate">
				<component  :is="operateView"></component >
			</tab-pane>
			<tab-pane label="项目数据" name="project">
				<component  :is="projectView"></component >
			</tab-pane>
			<tab-pane label="指标数据" name="indexdata">
				<component  :is="indexdataView"></component >
			</tab-pane>
			<template slot="right">
				<DataEntryBtn></DataEntryBtn>
			</template>
		</tabs>
	</div>
</template>

<script>
    let Tabs = () => import('@/components/tabs/Tabs.vue')
    let TabPane = () => import('@/components/tabs/TabPane.vue')
    let OperateData = () => import('@/modules/DataEntry/OperateData.vue')
    let ProjectData = () => import('@/modules/DataEntry/ProjectData.vue')
    let IndexData = () => import('@/modules/DataEntry/IndexData.vue')
	let DataEntryBtn = () => import('@/modules/DataEntry/DataEntryBtn.vue')

	import { bus } from "@/utils/bus"

    export default {
        name: 'DataEntry',
        data() {
            return {
                activeName: null,
                operateView: null,
                projectView: null,
                indexdataView: null,
            }
        },
        watch: {
        },
        components: {
            Tabs,
            TabPane,
			DataEntryBtn,
			bus
		},
        mounted: function() {
		},
		created(){
			bus.$on('event',this.refreshList);
		},
        beforeDestroy() {
        },
        methods: {
        	tabSwitch(tab, event) {
        		switch(tab.name) {
        			case 'operate':
						this.operateView = OperateData;
						bus.$emit('switchOperateEvent',"");
        				break
        			case 'project':
                        this.projectView = ProjectData
						bus.$emit('switchProjectEvent',"");
        				break;
        			case 'indexdata':
        			    this.indexdataView = IndexData
						bus.$emit('switchIndexEvent',"");
        				break;
        		}
			},
			refreshList(){
				this.reload();
			}
        }
    }
</script>

<style scoped>
	.mr {
		margin-right: 14px;
	}
</style>