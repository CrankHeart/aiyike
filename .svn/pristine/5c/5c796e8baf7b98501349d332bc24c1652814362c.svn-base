# 前端环境依赖
	node.js	——下载地址：https://nodejs.org/dist/v6.11.4/node-v6.11.4-x64.msi
# 项目安装（安装项目依赖环境、插件）
	install.bat
# 项目启动（实时查看）：
	start.bat
# 项目编译（部署——生成环境）：
	build.bat
	——编译成功生成 /dist 目录，将目录下的所有文件放到http服务器上
# 项目部署（——nginx）
	——配置文件加入 try_files $uri $uri/ /index.html =404;
	——说明：将所有的请求url转发到index.html，路由 由前端控制

>主题皮肤环境安装 （皮肤——只需前端人员安装）
theme-install.bat

>主题皮肤css生成
theme-generator.bat

>主题皮肤css编译
theme-build.bat

# 目录结构
```
——src
	——assets									#资源文件
	——components								#组件(最小拆分单位)
	——filters									#过滤器
	——modules									#模块（包含多个子组件）
	——page										#路由对应页面(包含多个模块)
		——Pmo									#目录：PMO
		——Vp									#目录：VP
		——DivisionManager						#目录：部门经理
		——Purchase								#目录：采购
		——DeputyGeneral							#目录：副总
		——OrdinaryPersonnel						#目录：普通
		——PersonnelMatters						#目录：人事
		——BusinessAffairs						#目录：商务
		——Peripheral							#目录：外围
		——ProjectManager						#目录：项目经理
		——ChiefInspector						#目录：总监
	——router									#路由配置
		——entry.js								#全局路由
	——store										#状态存储
		——Application.js						#存在于整个SPA应用生命周期
	——utils										#工具
	——Admin.vue									#后台视图结构
	——Entry.vue									#全屏视图
	——main.js									#js全局入口
```
# Node 模块导出方式
	module.exports 初始值为一个空对象 {}
	exports 是指向的 module.exports 的引用
	require() 返回的是 module.exports 而不是 exports
# Node 模块异步加载
```
let xxpomise = require.ensure([], function(require) {
	return require('@/utils/XXX.js')
})
xxpomise.then((xx)=>{
	console.log(xx)
})
```


#ES6异步组件加载
```
function asyncComponent(path) {
	return() =>
		import('@/' + path + '.vue')
}
```