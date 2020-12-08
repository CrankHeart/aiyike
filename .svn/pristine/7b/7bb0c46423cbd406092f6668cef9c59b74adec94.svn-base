<template>
	<div class="multiple-select">
		<div class="multiple-input" ref="multiple-input" @click.stop="inputClick">
			<i class="_input_icon el-icon-caret-top middle" :class="[downMenuVisible?'is-r':'']"></i>
			<el-input ref="validateInput" readonly v-show="placeHolderVisible" placeholder="请选择"></el-input>
			<div class="el-input disBlurInput" v-show="placeHolderVisible">
				<input class="disBlurVali" readonly="readonly">
			</div>
			<div class="_input_inner" v-if="search">
				<span class="tag">{{selectText}}</span>
				<input type="text" ref="searchInput" v-model="searchModel" @click.stop="searchClick" class="searchInput" />
			</div>
			<input v-if="!search" :value="selectText" placeholder="请选择" readonly="readonly" type="text" class="_input_inner">
		</div>
		<transition name="el-zoom-in-top">
			<div v-show="downMenuVisible" class="el-select-dropdown" :style="{minWidth: downMenuWidth + 'px'}" style="transform-origin: center top 0px; z-index: 2001;">
				<herghost-scroll class="multiple-select-scroll">
					<ul class="multiple-select-list">
						<li v-if="itemIsVisible(index)" @click.stop="itemClick(item, index)" v-for="(item, index) in options" :class="[item.isChecked?'is-checked':'']">
							<span class="el-checkbox__input" :class="[item.isChecked?'is-checked':'']">
								<span class="el-checkbox__inner"></span>
							</span>
							<span class="label">{{item[fieldsOptinos.label]}}</span>
						</li>
					</ul>
				</herghost-scroll>
			</div>
		</transition>
	</div>
</template>

<script>
	let HerGhostScroll = () =>
		import('@/components/scroll/HerGhostScroll.vue')
	export default {
		name: 'MultipleSelect',
		props: {
			search: {
				type: Boolean,
				default: false
			},
			value: {
				type: Array,
				default: function() {
					return []
				}
			},
			fieldsOptinos: {
				type: Object,
				default: function() {
					return {
						label: 'label',
						value: 'value'
					}
				}
			},
			sp: {
				type: String,
				default: ';'
			},
			options: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		components: {
			'herghost-scroll': HerGhostScroll
		},
		data() {
			return {
				downMenuWidth: 0,
				downMenuVisible: false,
				dcClickFn: null,
				searchModel: '',
				optionsBack: {}
			}
		},
		watch: {
			value(val) {
				console.log('value')
				this.setItems()
				this.$nextTick(() => {
					this.$refs.validateInput.handleFocus()
					this.$refs.validateInput.handleBlur()
				})
			},
			options: {
				deep: true,
				handler(val) {
					this.setItems()
				}
			},
			downMenuVisible(val) {
				if(!val) {
					this.searchModel = ''
				}
			}
		},
		created() {
			this.addDcClick()
			this.setItems()
		},
		mounted() {
			this.$nextTick(() => {
				this.setDownMenuWidth()
			})
		},
		beforeDestroy() {
			this.rmDcClick()
		},
		computed: {
			placeHolderVisible() {
				let ret = false
				if(this.search) {
					ret = (this.value.length == 0)
					if(this.downMenuVisible) {
						ret = false
					}
				}
				return ret
			},
			selectText() {
				let ret = ''
				for(let ii in this.value) {
					for(let i in this.options) {
						if(this.value[ii] == this.options[i][this.fieldsOptinos.value]) {
							ret += `${this.options[i][this.fieldsOptinos.label]}${this.sp}`
						}
					}
				}
				return ret.slice(0, ret.length)
			}
		},
		methods: {
			searchClick() {
				this.downMenuVisible = true
			},
			itemIsVisible(index) {
				let ret = true
				if(this.search) {
					let [label, model] = [this.options[index][this.fieldsOptinos.label], this.searchModel]
					if (Object.isEmpty(label)) {
						label = ""
					} else {
						label = label.toLowerCase()
					}
					if (Object.isEmpty(model)) {
						model = ""
					} else {
						model = model.toLowerCase()
					}
					if(label.indexOf(model) == -1) {
						ret = false
					}
				}
				return ret
			},
			setItems() {
				for(let i in this.options) {
					if(this.value.indexOf(this.options[i][this.fieldsOptinos.value]) != -1) {
						this.$set(this.options[i], 'isChecked', true)
					} else {
						this.$set(this.options[i], 'isChecked', false)
					}
				}
			},
			itemClick(item, index) {
				item.isChecked = !item.isChecked
				if(item.isChecked) {
					this.value.push(item[this.fieldsOptinos.value])
				} else {
					this.value.splice(this.value.indexOf(item[this.fieldsOptinos.value]), 1)
				}
				this.searchFocus()
			},
			searchFocus() {
				if(this.downMenuVisible && this.search) {
					this.$refs.searchInput.focus()
				}
			},
			addDcClick() {
				let _self = this
				this.dcClickFn = function(e) {
					_self.downMenuVisible = false
				}
				document.addEventListener('click', this.dcClickFn, false)
			},
			rmDcClick() {
				document.removeEventListener('click', this.dcClickFn, false)
			},
			inputClick() {
				this.downMenuVisible = !this.downMenuVisible
				this.searchFocus()
			},
			setDownMenuWidth() {
				this.downMenuWidth = parseFloat(this.getStyle(this.$refs['multiple-input'], 'width')).toFixed(0)
			},
			getStyle(obj, attr) {
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
<style>
	.multiple-select-scroll .hg-wrap {
		padding: 0px 10px 0 10px;
		max-height: 270px;
	}
	
	.multiple-select-scroll .el-checkbox__input {
		margin-right: 8px;
	}
	
	.el-form-item.is-error .multiple-input ._input_inner {
		background: #fffafa;
		border-color: #ff4949 !important;
	}
	
	.multiple-input .el-input input {
		cursor: pointer;
	}
</style>
<style scoped>
	.el-input {
		position: absolute;
		z-index: 1;
	}
	.disBlurInput {
		position: absolute;
		z-index: 3;
	}
	.el-select-dropdown__list {
		text-align: left;
	}
	
	.multiple-input {
		position: relative;
	}
	
	.multiple-input .disBlurVali {
		padding-right: 35px;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: transparent;
		background-image: none;
		border-radius: 2px;
		border: 1px solid transparent;
		box-sizing: border-box;
		color: #000;
		display: inline-block;
		height: 26px;
		line-height: 1;
		cursor: pointer;
		outline: none;
		padding: 3px 30px 3px 10px;
		transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		width: 100%;
		font-size: 12px;
		position: absolute;
		z-index: 3;
	}
	
	.multiple-input ._input_icon {
		color: #979797;
		transform-origin: center;
		line-height: inherit;
		transform: translateY(-50%) rotateZ(180deg) scale(1);
		height: inherit;
		top: 50%;
		cursor: pointer;
		font-size: 12px;
		transition: transform .3s;
		width: 28px;
		position: absolute;
		text-align: center;
		right: 0;
		z-index: 2;
	}
	
	.multiple-input ._input_icon.is-r {
		transform: translateY(-50%) rotateZ(360deg) scale(1);
	}
	
	.multiple-select {
		width: 216px;
	}
	
	.multiple-input ._input_inner {
		padding-right: 35px;
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
		height: 26px;
		line-height: 1;
		cursor: pointer;
		outline: none;
		padding: 3px 30px 3px 10px;
		transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		width: 100%;
		font-size: 12px;
	}
	
	.multiple-input ._input_inner .searchInput {
		border: none;
		outline: none;
		padding: 0;
		color: #000;
		font-size: 12px;
		vertical-align: baseline;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		height: 100%;
		display: inline-block;
		width: 35px;
		max-width: 198px;
		background-color: transparent;
	}
	
	.multiple-input ._input_inner .tag {
		font-size: 12px;
		line-height: 18px;
		display: inline-block;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		max-width: 138px;
		float: left;
	}
	
	.multiple-select-list li {
		line-height: 36px;
		border-bottom: 1px solid #F1F1F1;
		cursor: pointer;
	}
	
	.multiple-select-list li.is-checked .label {
		color: #333333;
	}
	
	.multiple-select-list .label {
		font-size: 12px;
		color: #999999;
	}
</style>