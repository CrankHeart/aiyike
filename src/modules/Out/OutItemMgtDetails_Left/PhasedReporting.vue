<!--项目管理(总监及身份以上)-未完结项目详情页-->
<template>
	<section class="wrap" :class="[!pageShow? 'pageopacity' : '']">
		<div class="backToPre" @click="backToPre">
			<i class="el-icon-arrow-left"></i>
			<span class="return">返回</span>
		</div>
		<div class="layout-container" ref="pane-o">
			<div class="layout-in" ref="pane-i">
				<section class="layout">
					<div class="writeform-wrap">
						<span class="release-weekly">阶段性汇报</span>
						<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" label-position="left" label-width="75px">
							<el-form-item label="汇报主题：" class="form190" prop="name">
								<el-input v-model="formInline.name" placeholder="请输入汇报主题"></el-input>
							</el-form-item>
						</el-form>
						<script ref="editor" id="editor" type="text/plain" style="width:100%;height:500px;"></script>
						<div class="opeartion-btn clearfix">
							<el-button type="primary" @click="submitForm('formInline')" class="submitbtn">提交</el-button>
							<el-button type="primary" @click="resetForm('formInline')" class="submitbtn">重置</el-button>
							<el-button @click="cancel" class="cancelbtn" style="margin-left: 10px;">取消</el-button>
						</div>
					</div>
				</section>
			</div>
		</div>
	</section>

</template>

<script>
	let fromRoute = null

	export default {
		data() {
			return {
				state: this.$store.state,
				dataList: JSON.parse(Cache.local(Config.Login)),
				formInline: {
					name: ''
				},
				editor: null,
				pageShow: false
			};
		},
		watch: {
			'state.outReporting.data' (val) {
				this.editHandler()
			},
			'state.outReporting.state' (val) {
				this.editHandler()
			}
		},
		beforeRouteEnter(to, from, next) {
			fromRoute = from
			next()
		},
		created() {
			if(fromRoute.path == '/') {
				this.$router.go(-2)
			}
		},
		mounted() {
			if(this.$route.path == '/') {
				this.$router.go(-1)
			}
			this.loadUeJs()
		},
		beforeDestroy() {
			this.$store.commit("outReporting_State", '')
			this.$store.commit("outReporting_Data", {})
			this.$refs.editor && this.editor && this.editor.destroy()
		},
		methods: {
			//获取基本信息
			editHandler() {
				let handler = () => {
					this.formInline.name = this.state.outReporting.data.name
					this.editor.addListener("ready", () => {
						this.editor.setContent(this.state.outReporting.data.remark || '')
					})
				}
				if('edit' == this.state.outReporting.state && this.editor) {
					handler()
				}
			},
			async loadUeJs() {
				await require.ensure([], function(require) {
					return require('@/../static/ue/ueditor.config.js')
				})
				await require.ensure([], function(require) {
					return require('@/../static/ue/ueditor.all.js')
				})
				await require.ensure([], function(require) {
					return require('@/../static/ue/lang/zh-cn/zh-cn.js')
				})
				await require.ensure([], function(require) {
					return require('@/../static/ue/ueditor.parse.js')
				})
				let _self = this
				let editorInterval = requestAnimationFrame(
					function req() {
						if(_self.$refs.editor) {
							cancelAnimationFrame(editorInterval)
							_self.setUe()
						} else {
							editorInterval = requestAnimationFrame(req)
						}
					}
				)
			},
			setUe() {
				this.editor = UE.getEditor('editor', {
					//关闭字数统计
					wordCount: false,
					//关闭elementPath
					elementPathEnabled: false,
				})
				this.editor.addListener("ready", () => {
					this.pageShow = true
				})
				//编辑周报
				this.editHandler()
			},
			// 获取ue内容方法
			getUEContent() {
				return this.editor.getContent()
			},
			backToPre() {
				this.$router.go(-1);
			},
			escapeChars(str) {
				str = str.replace(/\<\/?[a-z]+\>/gim, '');
				return str;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let content = this.getUEContent();
						if(!content || content == '') {
							this.$message({
								customClass: 'error',
								message: '内容不能为空！'
							});
							return false;
						} else {
							let content = this.escapeChars(this.getUEContent());
							if(content && content.length < 10) {
								this.$message({
									customClass: 'error',
									message: '内容不能小于10个字符！'
								});
								return false;
							}
						}
						if(!this.formInline.name) {
							this.$message({
								customClass: 'error',
								message: '主题不能为空！'
							});
							return false;
						}
						let subData = {
							name: this.formInline.name,
							remark: this.getUEContent(),
							ucId: this.dataList.uc.id,
							busId: this.dataList.uc.busId,
							applyId: this.$route.params.id.split("-")[0],
							id: null
						}
						if('edit' == this.state.outReporting.state) {
							subData.id = this.state.outReporting.data.id
						}
						this.$http.post('/api/itemReport/addItemReport', subData, {
								emulateJSON: true
							})
							.then((res) => {
								var data = res.data;
								if(data.success) {
									this.$router.go(-1)
								}
							}).catch((err) => {

							})
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields()
				this.editor.setContent('')
			},
			cancel() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped>
	.pageopacity {
		opacity: 0;
	}
	
	.backToPre {
		font-size: 16px;
		height: 60px;
		line-height: 60px;
		color: #333;
		border-bottom: 1px solid #F1F2F3;
		cursor: pointer;
	}
	
	.backToPre i {
		font-size: 16px;
		margin-right: 5px;
	}
	
	.writeform-wrap {
		display: block;
		width: 800px;
		height: 100%;
		background: url("../../../assets/img/page.png") no-repeat;
		background-size: 100% 100%;
		margin: 24px auto 0 auto;
		padding: 20px;
		padding-left: 30px;
	}
	
	.wrap {
		height: 100%;
		background: #f8f9fb;
		padding: 0 28px;
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
		border-bottom: 1px solid #F1F2F3;
		cursor: pointer;
	}
	
	.layout-container {
		overflow-x: hidden;
		height: 100%;
		margin-top: -41px;
		padding-top: 61px;
		margin-left: -56px;
		padding-left: 56px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.layout-in {
		overflow-x: hidden;
		overflow-y: scroll;
		height: 100%;
	}
	
	.layout {
		padding: 20px;
		height: auto;
		padding-right: 78px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.return {
		font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	}
	
	.submit {
		opacity: 0.33;
	}
	
	.opeartion-btn {
		margin-top: 20px;
		text-align: right;
	}
</style>