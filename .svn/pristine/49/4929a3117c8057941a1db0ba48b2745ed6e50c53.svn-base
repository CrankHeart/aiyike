import Vue from 'vue'

export default {
	methods: {
		spCode(code) {
			let rgx = /\[.*\]/img
			let sparr = []
			if (!Object.isEmpty(code)){
				sparr = code.split('|')
			}
			let ret = {}
			if(Object.isNotEmpty(code)) {
				for(let i in sparr) {
					ret[sparr[i].split(':')[0]] = rgx.test(sparr[i].split(':')[1]) ? JSON.parse(sparr[i].split(':')[1]) : sparr[i].split(':')[1]
				}
			}
			return ret
		},
		hasPm2Role(pmStr) {
			let authType = this.$store.getters.unFinishAuthType
			let code = this.authType2CodeMapping(authType)
			let roleVoList = JSON.parse(Cache.local(Config.Login)).roleVoList
			let pmList = []
			let unpmList = []
			let isMatchCode = false
			for(let i in roleVoList) {
				unpmList = [...unpmList, ...roleVoList[i].permissionList]
				if(roleVoList[i].code == code) {
					isMatchCode = true
					pmList = roleVoList[i].permissionList
				}
			}
			if(!isMatchCode) {
				pmList = unpmList
			}
			if(this.HasPermission(pmStr)) {
				for(let i in pmList) {
					let pm = this.spCode(pmList[i].code).permission
					if(Array.isArray(pm)) {
						for(let pindex in pm) {
							if(pm[pindex] == pmStr) {
								return true
							}
						}
					}
					if(String.isString(pm) && pm == pmStr) {
						return true
					}
				}
			}
			return false
		},
		authType2CodeMapping(authType) {
			var b='';
			let roleVoList = JSON.parse(Cache.local(Config.Login)).roleVoList
			switch(authType) {
				case 'upuc':
					return "staff"
				case 'updepart':
					return "departManager"
				case 'upmgr':
					return "mgr"
				case 'upba':
					return "bus"
				default:
					return JSON.parse(Cache.local(Config.Login)).roleTypeReal
			}
		}
	}
}