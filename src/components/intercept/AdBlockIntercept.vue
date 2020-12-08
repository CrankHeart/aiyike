<template>
	<div class="AdblockBanner" v-if="isdestory">
		<div class="AdblockBanner-inner">
			我们检测到你可能使用了 AdBlock 或 Adblock Plus，它的部分策略可能会影响到正常功能的使用。
			<br>
			你可以设定特殊规则或将艾艺客加入白名单，以便我们更好地提供服务。
		</div>
		<button class="Button AdblockBanner-close Button--plain" type="button" @click="close">
			<svg viewBox="0 0 14 14" class="Icon Icon--remove" width="16" height="16" aria-hidden="true" style="height: 16px; width: 16px;"><title></title><g><path d="M8.486 7l5.208-5.207c.408-.408.405-1.072-.006-1.483-.413-.413-1.074-.413-1.482-.005L7 5.515 1.793.304C1.385-.103.72-.1.31.31-.103.724-.103 1.385.305 1.793L5.515 7l-5.21 5.207c-.407.408-.404 1.072.007 1.483.413.413 1.074.413 1.482.005L7 8.485l5.207 5.21c.408.407 1.072.404 1.483-.007.413-.413.413-1.074.005-1.482L8.485 7z"></path></g></svg>
		</button>
	</div>
</template>

<script>
	export default {
		name: 'AdBlockIntercept',
		data() {
			return {
				isdestory: false
			}
		},
		created() {
			if (this.hasAdBlock()) {
				let flag = JSON.parse(Cache.local('AdblockBanner::dismiss'))
				if (flag) {
					this.isdestory = false
				} else {
					this.isdestory = true
				}
			}
		},
		methods: {
			close() {
				this.isdestory = false
				Cache.local('AdblockBanner::dismiss', true)
			},
			hasAdBlock() {
				let e = document.createElement('div')
				e.className = 'adsbox', document.body.appendChild(e);
				let t = 'none' === getComputedStyle(e).display
				return document.body.removeChild(e), t
			}
		}
	}
</script>

<style scoped>
	.AdblockBanner {
	    position: absolute;
	    top: 50%;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    transform: translateY(-50%);
	    z-index: 1001;
	    height: 88px;
	    padding: 16px;
	    line-height: 28px;
	    color: #8590a6;
	    text-align: center;
	    background-color: #e7eaf1;
	}
	.AdblockBanner-close .Icon {
    	display: block;
	}
	.Icon {
	    vertical-align: text-bottom;
	    fill: #9fadc7;
	}
	.AdblockBanner-close {
	    position: absolute;
	    top: 16px;
	    right: 16px;
	    cursor: pointer;
	}
	
	.Button--link, .Button--plain {
	    height: auto;
	    padding: 0;
	    line-height: inherit;
	    background-color: transparent;
	    border: none;
	    border-radius: 0;
	}
</style>