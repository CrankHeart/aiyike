<template>
	<!--上传头像--选择图片--弹窗-->
	<div class="select-photo-div">
		<el-dialog :title="title" class="select-photo dialogPosition" :visible.sync="dialogVisible" :close-on-click-modal="false" :close="handleClose" :class="['ayk-txupload','ayk-txupload__'+cropStyle]">
			<div class="width514">
				<div class="center-select">
					<div class="opacity1">
						<div class="select_pic"><span>+</span>选择图片</div>
						<div class="notepic">大小不超过5M</div>
					</div>
					<div class="upload">
						<input type="file" id="userIcon" ref="userIcon" @change="getIcon" />
						<!--<img class="circlex" ref="circlex"/>-->
					</div>
				</div>
				<!-- 遮罩层 -->
				<div class="container avator-set" v-show="panel">
					<div class="height369">
						<img id="image" ref="image" :src="url" alt="Picture">
						<div class="clearfix">
							<button type="button" @click="reUpload" class="re-upload">重新上传</button>
							<button type="button" @click="rotate" class="rotate"><i class="icon_rotate"></i>90 旋转</button>
						</div>
					</div>
				</div>
				<div class="footer-div">
					<button class="el-button submitbtn el-button--primary" @click="sure">确定</button>
					<button class="el-button cancelbtn el-button--default" @click="cancel">取消</button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import Cropper from 'cropperjs'
	import dataURLtoBlob from '@/utils/toBlob.js'

	export default {
		props: {
			visible: {
				type: Boolean
			},
			cropStyle: {
				type: String,
				default: "arc"
			},
			title: {
				type: String,
				default: '头像设置'
			},
			options: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
				headerImage: '',
				picValue: '',
				cropper: '',
				croppable: false,
				panel: false,
				url: '',
				dialogVisible: false,
				num: 1,
				cropperData: null
			}
		},
		mounted() {
			this.initCropper()
		},
		watch: {
			visible(val) {
				this.dialogVisible = val
			},
			dialogVisible(val) {
				this.$emit('update:visible', val)
				if(val && !!this.cropperData) {
					this.initCropperData() //二次打开重置cropper数据
				}
			}
		},
		methods: {
			initCropperData() {
				let data = JSON.parse(JSON.stringify(this.cropperData))
				data.rotate = 0
				this.num = 1
				this.cropper.setData(data)
			},
			//初始化裁剪框
			initCropper() {
				var _self = this
				let image
				let tempInterval = requestAnimationFrame(function fn() {
					image = _self.$refs.image
					if(image) {
						cancelAnimationFrame(tempInterval)
						let options = Object.assign({}, {
							center: false,
							aspectRatio: 1,
							viewMode: 3,
							background: false,
							zoomable: true,
							rotatable: true,
							ready: function() {
								_self.croppable = true
								_self.cropperData = _self.cropper.getData()
							}
						}, _self.options)
						_self.cropper = new Cropper(image, options);
					} else {
						tempInterval = requestAnimationFrame(fn)
					}
				})
			},
			getObjectURL(file) {
				var url = null;
				if(window.createObjectURL != undefined) { // basic
					url = window.createObjectURL(file);
				} else if(window.URL != undefined) { // mozilla(firefox)
					url = window.URL.createObjectURL(file);
				} else if(window.webkitURL != undefined) { // webkit or chrome
					url = window.webkitURL.createObjectURL(file);
				}
				return url;
			},
			getIcon(e) { //请求图像
				e = e || window.event;
				let files = e.target.files || e.dataTransfer.files
				if(!files.length) return
				this.picValue = files[0]
				//检验用户是否选则是图片文件
				if(this.picValue.type.split("/")[0] !== "image") {
					this.$message({
						showClose: false,
						message: '请选择图片文件',
						duration: '2000',
						type: 'info'
					})
					return
				}
				if(this.picValue.size > 5242880) {
					this.$message({
						showClose: false,
						message: '您选择的图片过大，请选择5MB以内的图片！',
						duration: '2000',
						type: 'info'
					})
					return
				}
				this.panel = true
				this.url = this.getObjectURL(this.picValue)
				//每次替换图片要重新得到新的url
				if(this.cropper) {
					this.cropper.replace(this.url)
				}
			},
			crop() {
				let croppedCanvas
				let roundedCanvas
				if(!this.croppable) {
					return
				}
				// Crop
				croppedCanvas = this.cropper.getCroppedCanvas()
				// 
				// Round
				roundedCanvas = this.getRoundedCanvas(croppedCanvas)
				this.headerImage = roundedCanvas.toDataURL("image/png")
				this.postImg()
			},
			getRoundedCanvas(sourceCanvas) {

				let canvas = document.createElement('canvas')
				let context = canvas.getContext('2d')
				let width = sourceCanvas.width
				let height = sourceCanvas.height

				canvas.width = width
				canvas.height = height

				context.imageSmoothingEnabled = true
				context.drawImage(sourceCanvas, 0, 0, width, height)
				context.globalCompositeOperation = 'destination-in'
				context.beginPath()
				switch(this.cropStyle) {
					case "arc":
						context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
						break
					case "rect":
						context.rect(0, 0, width, height)
						break
					default:
						context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
						break;
				}
				context.fill()

				return canvas
			},
			postImg() {
				//这边写图片的上传
				let Filedata = new FormData()
				if(this.headerImage) {
					let blobBin = dataURLtoBlob(this.headerImage)
					Filedata.append('Filedata', blobBin);
				}
				this.$http.post("/api/upload/avatar", Filedata)
					.then((res) => {
						this.$emit('update:visible', false)
						this.$emit('imgData', res.data.result)
						this.panel = false
						this.$emit('update:back', true)
						this.dialogVisible = false
					}).catch((err) => {

					})

			},
			rotate() {
				let data = JSON.parse(JSON.stringify(this.cropperData))
				data.rotate = 90 * this.num
				this.num++
					this.cropper.setData(data)
			},
			reUpload() {
				this.panel = false
				this.$refs.userIcon.value = ''
			},
			sure() {
				if(!this.$refs.userIcon.value) {
					this.$message({
						showClose: false,
						message: '请选择图片文件',
						duration: '2000',
						type: 'info'
					})
					return
				}
				this.crop()
				// this.$emit('update:visible', false)
			},
			cancel() {
				this.$emit('update:visible', false)
			},
			handleClose() {
				// this.$emit('update:visible', false)
			}
		}

	}
</script>

<style scoped>
	.width514 {
		width: 514px;
		height: 369px;
		background-color: #F7F8F9;
		border-radius: 2px;
		margin-bottom: 24px;
		position: relative;
	}
	
	.upload {
		opacity: 0;
		width: 100%;
		height: 100%;
	}
	
	.upload input[type="file"] {
		width: 100%;
		height: 100%;
	}
	
	.select_pic {
		width: 88px;
		height: 26px;
		line-height: 26px;
		background: #FFFFFF;
		border: 1px solid rgba(0, 0, 0, 0.16);
		border-radius: 2px;
		font-size: 12px;
		color: #000000;
		text-align: center;
	}
	
	.select_pic span {
		color: #295DCF;
		font-weight: 600;
	}
	
	.center-select {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		position: relative;
	}
	
	.opacity1 {
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.notepic {
		font-size: 12px;
		color: #999999;
		margin-top: 9px;
	}
	
	.footer-div {
		margin-top: 25px;
		text-align: center;
	}
	
	.avator-set {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		background-color: rgba(255, 255, 255, 0.2);
	}
	
	.opacity0 {
		opacity: 0;
	}
	
	.opacity1 {
		opacity: 1;
	}
	
	.height369 {
		width: 514px;
		height: 369px;
		position: relative;
		overflow: hidden;
	}
	
	.re-upload {
		position: absolute;
		bottom: 5px;
		left: 5px;
		width: 80px;
		height: 27px;
		line-height: 27px;
		text-align: center;
		background: #FFFFFF;
		border: 1px solid #DFDFDF;
		border-radius: 2px;
		font-size: 12px;
		color: #333333;
	}
	
	.rotate {
		position: absolute;
		bottom: 5px;
		right: 5px;
		width: 80px;
		height: 27px;
		line-height: 27px;
		text-align: center;
		font-size: 12px;
		color: #333333;
		background: #FFFFFF;
		border: 1px solid #DFDFDF;
		border-radius: 2px;
	}
	
	.icon_rotate {
		width: 13px;
		height: 15px;
		background: url('../../../assets/img/rotate.png') no-repeat;
		padding-left: 13px;
		margin-right: 5px;
	}
</style>