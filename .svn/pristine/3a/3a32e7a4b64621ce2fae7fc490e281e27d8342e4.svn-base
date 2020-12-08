<template>
	<div class="wrap middle">
		<div class="content-out">
			<RegInner v-show="viewName== 'reg'" :data="RegForm" @actionHandler="actionHandler"></RegInner>
			<RegSucVer v-show="viewName== 'suc'" :data="RegForm" @actionHandler="actionHandler"></RegSucVer>
		</div>
	</div>
</template>

<script>
	let RegInner = () => import('@/page/Reg/Reg_Inner.vue')
	let RegSucVer = () => import('@/page/Reg/Reg_Suc_Ver.vue')
	
	export default {
		name: 'Reg',
		components: {
			RegInner,
			RegSucVer
		},
		data: function() {
			return {
				RegForm: {
					userName: '',
					email: '',
					valiCode: '',
					password: '',
					checkPass: '',
					isread: true
				},
				viewName: "reg"
			}
		},
		methods: {
			actionHandler(name) {
				this.viewName = name
			}
		}
	}
</script>

<style scoped>
	
	.wrap {
		background: #f8f9fb;
		overflow-y: auto;
		text-align: center;
	}
	
	.content-out {
		width: 906px;
		height: 548px;
		background: #fff;
		overflow: hidden;
		vertical-align: middle;
		margin-top: 20px;
		margin-bottom: 20px;
		display: inline-block;
	}
</style>