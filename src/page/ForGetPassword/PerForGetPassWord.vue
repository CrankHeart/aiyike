<template>
	<div class="wrap middle">
		<div class="content-out">
			<ForGetPassWord :data="form" v-if="viewName == 'INPUT_EMAIL_NEXT'" @actionHandler="actionHandler"></ForGetPassWord>
			<ForGetEmail :data="form" v-if="viewName == 'ADD_EMAIL_NEXT'" @actionHandler="actionHandler"></ForGetEmail>
			<ChangePassWord :data="form" v-if="viewName == 'TO_PASSWORD_NEXT'" @actionHandler="actionHandler"></ChangePassWord>
			<ChangeSuc :data="form" v-if="viewName == 'CHANGE_PASSWORD_NEXT'" @actionHandler="actionHandler"></ChangeSuc>
		</div>
	</div>
</template>

<script>
	let ForGetPassWord = () =>
		import('@/page/ForGetPassword/ForGetPassWord.vue')
	let ForGetEmail = () =>
		import('@/page/ForGetPassword/ForGet_Email.vue')
	let ChangePassWord = () =>
		import('@/page/ForGetPassword/Change_PassWord.vue')
	let ChangeSuc = () =>
		import('@/page/ForGetPassword/Change_Suc.vue')

	export default {
		name: 'PerForGetPassword',
		data: function() {
			return {
				viewName: '',
				form: {
					email: '',
					password: '',
					checkpass: ''
				}
			}
		},
		components: {
			ForGetPassWord,
			ForGetEmail,
			ChangePassWord,
			ChangeSuc
		},
		mounted() {
			this.$nextTick(() => {
				if (Object.isNotEmpty(this.GetQuery())) {
					this.viewName = 'TO_PASSWORD_NEXT'
				} else {
					this.viewName = 'INPUT_EMAIL_NEXT'
				}
			})
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