<template>
	<div>
		<div :id="id" class="ztree"></div>
	</div>
</template>
<script type="text/javascript">
	
	require.ensure([], function(require) {
		return require('@/plug/ztree/zTreeStyle/zTreeStyle.css')
	})
	import $ from 'jquery'
	
	export default{
		name: "zTree",
		props:{
			list:{
				type:Array,
				required: true
			},
			id:{
				type:String,
				required:true
			}
		},
		data(){
			return {
				zTreeObj: null,
				setting :{check: {enable: true,chkboxType:{Y : "", N : ""}},data: {simpleData: {enable: true}}	}
			}
		},
		watch: {
			id() {
				$.fn.zTree.init($("#"+this.id),this.setting, this.list);
			},
			list: {
                handler(val,oldVal){
                	$.fn.zTree.init($("#"+this.id),this.setting, this.list);
                },
                deep:true
	        }
		},
		mounted(){
			this.$nextTick(() => {
				this.init()
			});
		},
		methods:{
			init() {
				let ztreePromise = require.ensure([], function(require) {
					return require('@/plug/ztree/jquery.ztree.all.min.js')
				})
				ztreePromise.then(()=>{
					$.fn.zTree.init($("#"+this.id),this.setting, this.list);
					this.zTreeObj = $.fn.zTree.getZTreeObj(this.id)
				})
			},
			getAllNode() {
				return this.zTreeObj.getCheckedNodes(); 
			},
			getNode(bool){
				return this.zTreeObj.getCheckedNodes(bool); 
			}
		}
	}
</script>