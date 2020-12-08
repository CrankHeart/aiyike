// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Entry from './Entry'
import VueResource from 'vue-resource'
import '@/utils/proto-utils.js'
import { store } from './store/Application.js'
import '@/filters'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import VuePreview from 'vue-preview'
import '@/assets/theme/index.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/reset.css'
import './assets/css/style.css'
import '@/assets/css/custom.css'
import '@/assets/css/animate.css'
import router from '@/router/entry.js'
import '@/mixin'
import '@/directive'
import '@/utils/constant.js'
import '@/utils/cache.js'
import '@/utils/requestAnimationFrame.js'
//element ui组件语言包修改
locale.el.pagination.goto = '跳至'
/* 相册 */
VuePreview.install(Vue, {
	shareButtons: [{
		id: 'download',
		label: '下载图片',
		url: '{{raw_image_url}}',
		download: true
	}],
	captionEl: false,
	clickToCloseNonZoomable: false,
	tapToClose: false,
	closeOnScroll: false,
	pinchToClose: false,
	closeOnVerticalDrag: false,
	escKey: true,
	closeElClasses: ['caption', 'zoom-wrap', 'ui', 'top-bar'], 
})
/* UI */
Vue.use(ElementUI, {
	locale
})
Vue.config.productionTip = false
/* eslint-disable no-new */
const vm = new Vue({
	el: '#app',
	store,
	router,
	beforeCreate() {
		this.$store.commit('setVueInstance', this)
	},
	template: '<Entry/>',
	components: {
		Entry
	},
	mounted() {
	}
})
/**
 * vue-resource-interceptors
 * 没有请求权限退出
 */
Vue.http.interceptors.push((request, next) => {
	next((response) => {
		if(response.status == 200 && response.data.code == Config.QuitCode) {
			vm.$store.dispatch('QUIT')
		}
		return response
	})
})
/**
 * vue-resource-interceptors
 * 请求超时默认：10s
 */
Vue.http.interceptors.push((request, next) => {
	let timeout
	// 這裡改用 _timeout
	if(Object.isNotEmpty(request._timeout)) {
		timeout = setTimeout(() => {
			next(request.respondWith(request.body, {
				status: 408,
				statusText: '请求超时'
			}));
		}, request._timeout);
	} else {
		timeout = setTimeout(() => {
			next(request.respondWith(request.body, {
				status: 408,
				statusText: '请求超时'
			}))
		}, 10000)
	}
	next((response) => {　　　　 //TODO:如果超时输出408(
		　　　　
		return response;
	})
})