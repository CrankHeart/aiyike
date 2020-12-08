import Vue from 'vue'

Vue.mixin({
	methods: {
		GetQuery() {
			var qs = location.search.substr(1),
				args = {},
				items = qs.length ? qs.split("&") : [],
				item = null,
				len = items.length

			for(var i = 0; i < len; i++) {
				item = items[i].split("=")
				var name = decodeURIComponent(item[0]),
					value = decodeURIComponent(item[1])
				if(name) {
					args[name] = value
				}
			}
			return args
		},
		GetQueryStr(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", i)
			var result = window.location.search.substr(1).match(reg)
			if(result != null) {
				return decodeURIComponent(result[2])
			} else {
				return null
			}
		},
		HasPermission: function(argss) {
			let p
			if(this.$route.matched.length >= 2) {
				p = this.$route.matched[1].meta.permission
			}
			let newP = []
			for(let i in p) {
				if(!(p[i] in newP)) {
					newP.push(p[i])
				}
			}

			for(let i in this.$route.meta.permission) {
				if(newP.indexOf(this.$route.meta.permission[i]) == -1) {
					newP.push(this.$route.meta.permission[i])
				}
			}
			p = newP

			function has(arr, str) {
				for(let i in arr) {
					if(str == arr[i]) {
						return true
					}
				}
				return false
			}

			if(!!p) {
				if(Array.isArray(argss)) {
					for(let i in argss) {
						if(!has(p, argss[i])) {
							return false
						}
					}
					return true
				}
				if(String.isString(argss)) {
					for(let i in p) {
						if(p[i] == argss) {
							return true
						}
					}
				}
			}
			return false
		},
		seqRequest: function(opt) {
			var pre = opt.pre;
			var index = 0;
			for(var i = 0; i < pre.length; i++) {
				var node = pre[i];
				node.fun(node.param, function() {
					index++;
					if(index == pre.length) {
						opt.next();
					}
				});
			}
		}
	}
})