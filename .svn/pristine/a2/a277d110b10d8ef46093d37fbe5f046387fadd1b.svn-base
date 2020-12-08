<template>
	<div class="group-select">
		<div class="single-input" ref="single-input" @click.stop="inputClick">
			<i class="_input_icon el-icon-caret-top" :class="[downMenuVisible?'is-r':'']"></i>
			<input :value="selectText" :placeholder="placeholder" autocomplete="off" readonly="readonly" type="text" class="_input_inner">
		</div>
		<div>
		<transition name="el-zoom-in-top">
			<el-tree class="tree" :style="{minWidth: downMenuWidth + 'px'}" 
				ref="tree"
				v-show="downMenuVisible" 
				:data="innerTreeData" 
				:highlight-current="true" 
				node-key="id" 
				:accordion="true" 
				:default-expanded-keys="exnode" 
				:current-node-key="nodekey" 
				:props="defaultProps" 
				:auto-expand-parent="true" 
				@node-click="treeNodeClick">
			</el-tree>
		</transition>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'GroupSelect',
		props: {
			value: {
				default: ''
			},
			treeData: {
				type: Array,
				default: function() {
					return []
				}
			},
            editData:{

			},
			placeholder: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				innerTreeData: [],
				downMenuWidth: 0,
				downMenuVisible: false,
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				selectText: '',
				nodekey: 0,
				exnode: []
			}
		},
		watch: {
			treeData: {
				deep: true,
				handler(val) {
					this.innerTreeData = [...this.treeData]
				}
			},
			value(val) {
				this.setSelectState(val)
			}
		},
		created() {
			this.addDcClick()
		},
		mounted() {
			this.$nextTick(() => {
				this.setDownMenuWidth()
				this.setSelectState(this.value)
			})
		},
		beforeDestroy() {},
		computed: {},
		methods: {
			parseTreeData() {
				this.innerTreeData = [...this.treeData]
				for (let i in this.innerTreeData) {
					let item = this.innerTreeData[i]
					if (item.id == -1 || item.id == 0){
						item.id = 0
						return i
					}
				}
				return void 0
			},
			setSelectState(obj) {
				let _obj = obj
				if (Object.isEmpty(_obj)){
					let index = this.parseTreeData()
					if (!Object.isEmpty(this.innerTreeData[index])) {
						_obj = this.innerTreeData[index]
					}
				} else if (_obj.id == -1) {
					_obj.id = 0
				}
				this.$emit('input', _obj)
				this.selectText = _obj.label
				this.nodekey = _obj.id
			 	this.exnode = [_obj.id]
			},
			inputClick() {
				this.downMenuVisible = !this.downMenuVisible
			},
			addDcClick() {
				let _self = this
				this.dcClickFn = function(e) {
					_self.downMenuVisible = false
				}
				document.addEventListener('click', this.dcClickFn, false)
			},
			treeNodeClick(data, node, vnode) {
				this.setSelectState(data)
				this.$emit('handleNodeClick', data);
			},
			setDownMenuWidth() {

                let _self = this
                let tempInterval = requestAnimationFrame(function fn(){
                    _self.downMenuWidth = parseFloat(_self.getStyle(_self.$refs['single-input'], 'width')).toFixed(0)
                    if (_self.downMenuWidth && _self.downMenuWidth!='NaN') {
                        cancelAnimationFrame(tempInterval)
                    }else{
                        tempInterval = requestAnimationFrame(fn)
                    }
                })
			},
			getStyle(obj, attr) {
				if (!obj) {
					return 0
				}
				let ret = ''
				if(obj.style.display == 'none') {
					obj.style.display = 'inline-block'
					ret = document.defaultView.getComputedStyle(obj, null)[attr]
					obj.style.display = 'none'
				}
				return !!ret ? ret : document.defaultView.getComputedStyle(obj, null)[attr];
			}
		}
	}
</script>

<style scoped>
	.group-select {
		position: relative;
	}
	.single-input {
		/*position: relative;*/
		font-size: 12px;
		display: inline-block;
	}
	
	.single-input ._input_icon {
		position: absolute;
		color: #999;
		font-size: 12px;
		transition: transform .3s;
		transform-origin: center;
		transform: rotateZ(180deg);
		width: 26px;
		cursor: pointer;
		text-align: center;
		right: 0;
		line-height: inherit;
		height: inherit;
		top: inherit;
	}
	
	.single-input ._input_icon.is-r {
		transform: rotate(360deg);
	}
	
	.multiple-select {
	}
	.tree{
		position: absolute;
		z-index: 999;
	}
	.single-input ._input_inner {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: #fff;
		background-image: none;
		border-radius: 2px;
		border: 1px solid #f1f1f1;
		box-sizing: border-box;
		color: #000;
		display: inline-block;
		cursor: pointer;
		outline: none;
		padding: 3px 21px 3px 10px;
		transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		width: 100%;
		font-size: 12px;
		height: 26px;
		line-height: 26px;
	}
	.single-input .el-input__inner {
		font-size: 12px;
    	color: #000;
    	     display: inline-block; 
     width: 100%; 
	}
</style>