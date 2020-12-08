<template>
	<div class="tabs_pane" v-show="active == name">
		<div :class="[paneVisible?'visible':'']" class="tabs-pane-wrap wrap" ref="tabs-pane-wrap">
			<herghost-scroll :success="hgScrollSuc" :options="hgoptions">
				<slot></slot>
			</herghost-scroll>
		</div>
	</div>
</template>
<script>
	
	let HerGhostScroll = () => import('@/components/scroll/HerGhostScroll.vue')

	export default {
		name: 'TabPane',
		props: {
			label: String,
			name: String,
			tips: {
				type: Number,
				default: 0
			}
		},
		watch: {
			active(value) {
			},
			'parent.paneWidth'(val) {
			}
		},
		data() {
			return {
				active: null,
				parent: this.$parent,
				hgoptions: this.$parent.hgoptions,
				paneVisible: false
			}
		},
		components: {
			'herghost-scroll': HerGhostScroll
		},
		computed: {
		},
		created(){
		},
		mounted: function() {
		},
		methods: {
			hgScrollSuc() {
				this.paneVisible = true
			},
			to(name) {
				this.$parent.to(name)
			}
		}
	}
</script>

<style scoped>
	.tabs_pane{
		overflow-x: hidden;
		height: 100%;
		margin-top: -61px;
	    padding-top: 61px;
	    box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	}
	.tabs-pane-wrap {
		/*overflow-y: scroll;
		overflow-x: hidden;*/
		overflow: hidden;
		box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	    transition: opacity .1s linear;
	    opacity: 0;
	}
	.tabs-pane-wrap.visible{
		opacity: 1;
	}
	.tabs-pane-wrap{
		/*padding-left: 28px;
	    padding-right: 28px;*/
	}
	.tabs-pane-wrap>div,.tabs-pane-wrap>section{
		width: 100%;
		box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	}
	
</style>