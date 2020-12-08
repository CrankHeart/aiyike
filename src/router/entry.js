import Router from 'vue-router'

function asyncComponent(path) {
	return() =>
		import('@/' + path + '.vue')
}

const router = new Router({
	mode: 'history',
	routes: [{
		path: '*',
		component: asyncComponent('page/NotFound404')
	},{
		path: '/staff',
		component: asyncComponent('page/Login/InsideStaff'),
	},{
		path: '/login',
		component: asyncComponent('page/Login/User'),
	},{
		path: '/reg',
		component: asyncComponent('page/Reg/Reg')
	},{
		path: '/forget',
		component: asyncComponent('page/ForGetPassword/PerForGetPassWord')
	},{
		path: '/test',
		component: asyncComponent('page/Test')
	}]
})

let pList = null
let fragmentPageRoute = []

function spCode(code) {
	let rgx = /\[.*\]/img
	let sparr = code.split('|')
	let ret = {}
	if(Object.isNotEmpty(code)) {
		for(let i in sparr) {
			ret[sparr[i].split(':')[0]] = rgx.test(sparr[i].split(':')[1]) ? JSON.parse(sparr[i].split(':')[1]) : sparr[i].split(':')[1]
		}
	}
	return ret
}

function findNodePermission(id) {
	let permission = []
	for(let i in pList) {
		if(parseInt(pList[i].parentId) == id) {
			let p = spCode(pList[i].code).permission
			if(p) {
				Array.isArray(p) ? permission = [...permission, ...p] : permission.push(p)
			}

		}
	}
	return permission
}

function findNodeMenu$Route(id) {
	let route = [],menu = []
	for(let i in pList) {
		if(parseInt(pList[i].parentId) == id) {
			
			let sp = spCode(pList[i].code),
				page = sp.page,
				oripm = sp.permission || [],
				curpm = findNodePermission(pList[i].id),
				newpm = []
				
			if (Object.isNotEmpty(oripm) && !Array.isArray(oripm)) {
				oripm = [oripm]
			}
			newpm = [...oripm,...curpm]
			if ((page == 'true') && parseInt(pList[i].type) == 1) {
				fragmentPageRoute.push({
					path: pList[i].url,
					component: asyncComponent(pList[i].src),
					children: findNodeMenu$Route(pList[i].id).route,
					meta: {
						...sp,
						permission: newpm
					}
				})
				pList[i] = {}
			} else {
				route.push({
					path: pList[i].url,
					component: asyncComponent(pList[i].src),
					children: findNodeMenu$Route(pList[i].id).route,
					meta: {
						...spCode(pList[i].code),
						permission: newpm
					}
				})
			}
		}
		if(parseInt(pList[i].parentId) == id && parseInt(pList[i].type) == 0) {
			menu.push({
				id: pList[i].id,
				seq: pList[i].seq,
				path: pList[i].url,
				title: pList[i].title,
				icon: pList[i].icon,
				children: findNodeMenu$Route(pList[i].id).menu
			})
		}
	}
	return {
		route,
		menu
	}
}
function findNodeDecorator(id) {
	function sortPList() {
		pList.sort(function(a, b) {
			return a.id - b.id
		})
	}
	sortPList();
	let route$menu = findNodeMenu$Route(id);
	for (let i in fragmentPageRoute) {
		route$menu.route.push(fragmentPageRoute[i])
	}
	function sortMenuAbSeq(menu) {
		for (let i in menu) {
			if (Array.isArray(menu[i].children) && menu[i].children.length) {
				sortMenuAbSeq(menu[i].children)
			}
		}
		menu.sort(function(a, b) {
			return a.seq - b.seq
		})
	}
	sortMenuAbSeq(route$menu.menu)
	return route$menu
}
const whiteList = ['/login', '/staff', '/reg', '/forget']
const noJumpList = ['/staff', '/reg', '/forget']
let loginInfo = null
let store = null


router.beforeEach((to, from, next) => {
	
	store = router.app.$store
	loginInfo = JSON.parse(Cache.local(Config.Login))
	pList = loginInfo == undefined ? '' : loginInfo.pList

	fragmentPageRoute = []
	
	if(loginInfo) {
		if(whiteList.indexOf(to.path) !== -1) {
			if (noJumpList.indexOf(to.path) !== -1) {
				next()
			} else {
				next({
					path: '/'
				})
			}
		} else {
			if (store.getters.isSetRoute) {
				next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页	
			} else {
				store.commit('setLoginInfo', loginInfo)
				store.commit('setRouteFlag', true)
				const menu$route = findNodeDecorator(0)

				console.log('%cRemoteLoginInfo:','background:#6495ED;color:#ffffff;', loginInfo)
				console.log('%cLocalMenu$Route:','background:#6495ED;color:#ffffff;', JSON.parse(JSON.stringify(menu$route)))
				console.log('%c   FragmentPage:','background:#6495ED;color:#ffffff;', JSON.parse(JSON.stringify(fragmentPageRoute)))
				store.commit('setMenuRoute', menu$route)
				let redirectPath = 0
				for (let i in menu$route.menu) {
					if (menu$route.menu[i] && menu$route.menu[i].children && menu$route.menu[i].children.length && menu$route.menu[i].children[0].path) {
						redirectPath = menu$route.menu[i].path
						break
					}
				}
				try{
					if (0 == redirectPath) {
						throw new Error("未拥有相关权限,菜单下的tab选项卡未配置权限\nNo Auth RedirectPath Is Zero(0)")
					}
				}catch(e){
					console.log(e)
				}
				router.addRoutes([{
					path: '/',
					redirect: redirectPath,
					component: asyncComponent('Admin'),
					children: menu$route.route
				}])
				next(to)
			}
		}
	} else {
		if(whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next();
		} else {
			next('/login'); // 否则全部重定向到登录页
		}
	}
})

export default router