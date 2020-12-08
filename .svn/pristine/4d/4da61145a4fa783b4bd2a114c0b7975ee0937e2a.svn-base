<template>
	<div>
		<el-dialog title="请选择担当事业部" :visible.sync="dialogVisible" size="small">
			<el-tree :data="dataTree" ref="p_tree" :highlight-current="true" node-key="id" :props="pDefaultProps" @node-click="handleNodeClick"></el-tree>
			
			  <span slot="footer" class="dialog-footer">
			  	<el-button type="primary" @click="ok" class="submitbtn">确定</el-button>
			    <el-button @click="dialogVisible = false" class="cancelbtn">取消</el-button>
			  </span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		props: {
			visible: {
				type: Boolean
			},
			isedit:{
				default:function() {
                    return false
                }
			}
		},
		data() {
			return {
				dataTree: [],
				pDefaultProps: {
					children: 'children',
					label: 'label'
				},
				depart:{},
				dialogVisible: false
			};
		},
		mounted() {
			this.getDepartTree()
		},
		watch: {
			visible(val) {
				this.dialogVisible = val
			},
			dialogVisible(val) {
				this.$emit('update:visible', val)
			}
		},
		methods: {
			handleNodeClick(data) {
				this.depart = data;
			},
			getDepartTree: function() {
				this.$http.post("/api/depart/departTree", null, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							var result = data.result;
							this.dataTree = result;
						}
					}).catch((err) => {
						
					});
			},
			ok(){
				this.$emit("ok",this.depart)
				this.dialogVisible = false
			}
		}
	};
</script>

<style>

</style>