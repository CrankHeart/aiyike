<!--项目管理-未完结项目详情页-->
<template>
	<section class="wrap" v-show="pageShow">
		<div class="backToPre">
			<span @click="backToPre">
				<i class="el-icon-arrow-left"></i>
				<span class="return">返回</span>
			</span>
		</div>
		<div class="wrap-details">
			<herghost-scroll class="hgscroll-pdlr__28-28">
				<el-breadcrumb separator=">" class="mb24">
					<el-breadcrumb-item>当前位置：外围团队信息</el-breadcrumb-item>
					<el-breadcrumb-item>-----</el-breadcrumb-item>
				</el-breadcrumb>
				<div class="details">
					<component :is="leftview" class="details_left"></component>
					<component :is="rightview" class="details_right" @reload="obtainTeamDetails"></component>
					<div style="height: 24px;"></div>
				</div>
			</herghost-scroll>
		</div>
	</section>
</template>

<script>
	let HerGhostScroll = () =>
		import("@/components/scroll/HerGhostScroll.vue");
	let OutTeamMgtDetails_Left = () =>
		import("@/modules/Out/OutTeamMgtDetails_Left/OutTeamMgtDetails_Left.vue");
	let OutTeamMgtDetails_Right = () =>
		import("@/modules/Out/OutTeamMgtDetails_Right/OutTeamMgtDetails_Right.vue");

	let fromRoute = null;
	export default {
		name: "OutTeamMgtDetails",
		data() {
			return {
				leftview: null,
				rightview: null,
				pageShow: false
			};
		},
		beforeRouteEnter(to, from, next) {
			fromRoute = from;
			next();
		},
		components: {
			"herghost-scroll": HerGhostScroll
		},
		beforeCreate() {},
		watch: {},
		created() {
			if(fromRoute.path == "/") {
				this.$router.go(-2);
			} else {
				this.leftview = OutTeamMgtDetails_Left;
				this.rightview = OutTeamMgtDetails_Right;
				this.pageShow = true;
			}
		},
		mounted: function() {
			this.$nextTick(() => {
				this.obtainTeamDetails();
			});
		},
		beforeDestroy() {},
		methods: {
			obtainTeamDetails() {
				this.$http
					.post(
						"/api/bus/detailOutTeam", {
							id: parseInt(this.$route.params.id.split("-")[0])
						}, {
							emulateJSON: true
						}
					)
					.then(res => {
						this.$store.commit("teamDetails", res.data.result);
					})
					.catch(err => {});
			},
			backToPre() {
				this.$router.go(-1);
			}
		}
	};
</script>

<style scoped>
	.wrap-details {
		box-sizing: border-box;
		height: 100%;
		margin-top: -61px;
		padding-top: 61px;
	}
	
	.mt10 {
		margin-top: 10px;
	}
	
	.wrap {
		height: 100%;
		background: #f8f9fb;
		padding: 0 0px 0px;
		overflow: hidden;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.backToPre {
		font-size: 18px;
		height: 60px;
		line-height: 60px;
		color: #000;
		border-bottom: 1px solid #f1f2f3;
		margin-left: 28px;
		margin-right: 28px;
	}
	
	.backToPre>span {
		cursor: pointer;
	}
	
	.details-wrap {
		/*padding-right: 56px;*/
	}
	
	.layout-container {
		overflow-x: hidden;
		height: 100%;
		margin-top: -41px;
		padding-top: 41px;
		/*margin-left: -56px;
		padding-left: 56px;*/
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.layout-in {
		overflow-x: hidden;
		overflow-y: scroll;
		height: 100%;
		padding-left: 28px;
		padding-right: 1000px;
	}
	
	.mb24 {
		margin-bottom: 24px;
	}
	
	.details_left {
		float: left;
		min-height: 100%;
		background: #fff;
		margin-bottom: 24px;
	}
	
	.details_right {
		min-height: 100%;
		margin-left: 374px;
		/*margin-bottom: 24px;*/
	}
	
	.details {
		height: 100%;
		margin-top: -50px;
		padding-top: 50px;
		box-sizing: border-box;
		padding-bottom: 24px;
		/*padding-bottom: 100px;*/
	}
</style>