<template>
	<div class="plus-minus-int-float">
		<span class="winter" :class="inputOutStyle">
			<i class="el-icon-plus" @click.stop="plus"></i>
			<el-input type="text" v-model="num" class="opc" ref="elinput"></el-input>
			<input :class="inputStyle" type="text" v-model="num" @input="inputText" @focus="inputFocus" @blur="inputBlur">
			<i class="el-icon-minus" @click.stop="minus"></i>
		</span>
	</div>
</template>

<script>
	export default {
		name: 'plusminusintfloat',
		props: {
			value: {
				default: 0
			},
			decimal: {
				default: 1
			},
			validate: {
				type: Boolean,
				default : false
			},
			unit: {
				default: 'h'
			}
		},
		data(){
			return{
				num: 0,
				firstOutInit: true,
				firstInnerInit: true,
				inputOutStyle: '',
				inputStyle: ''
			}
		},
		watch: {
			value(val) {
				this.num = val
			},
			num(val) {
				this.$emit('input', val)
			}
		},
		created() {
			this.num = this.value
			
		},
		methods:{
			valiHandler(){
				if (!Number.isNumber(this.num) && this.validate) {
					this.inputOutStyle = 'inputOutStyle'
					this.inputStyle = 'inputStyle'
				} else {
					this.inputOutStyle = ''
					this.inputStyle = ''
				}
			},
			inputFocus() {
				this.$refs.elinput.handleFocus()
			},
			inputBlur() {
				this.$refs.elinput.handleBlur()
				this.valiHandler()
			},
			inputText() { //最多输入this.decimal位小数
				let intNum = `${this.num}`.split('.')[0]    //.前面的整数   `${this.num}`首先把this.num变成字符串，然后以.为分割线分割成数组
				let _decimal = `${this.num}`.split('.')[1]  //.后面的小数 
				
				if (_decimal) {
					if (_decimal.length > this.decimal) {
						let r = +((intNum) + '.' + _decimal.substring(0, this.decimal))
						if (!Number.isNaN(r)) {
							this.num = r
						} else {
							this.num = (intNum) + '.' + _decimal.substring(0, this.decimal)
						}
					} else {
						let r = +((intNum) + '.' + _decimal)
						if (!Number.isNaN(r)) {
							this.num = r
						} else {
							this.num = ((intNum) + '.' + _decimal)
						}
					}
				}
				if(/^[0-9]+([.]{1}[0-9']+){0,1}$/.test(this.num)){
					
					this.num = +this.num
			   	} else {
			   		if (this.validate) {
			   			
			   		}
			   	}
				this.valiHandler()
			},
			plus(){//单击加1
				let intNum = `${this.num}`.split('.')[0]
				let _decimal = `${this.num}`.split('.')[1]
				let ret = ''
				intNum = parseInt(intNum)
				if (Number.isNaN(intNum)) {
					intNum = 0
				}
				if (_decimal) {
					if (_decimal.length > this.decimal) {
						ret = parseFloat((intNum + 1) + '.' + _decimal.substring(0, this.decimal))
					} else {
						ret = parseFloat((intNum + 1) + '.' + _decimal)
					}
				}else{
					ret = intNum + 1
				}
				this.num = ret
				this.valiHandler()
			},
			minus(){//单击减1
				if(parseFloat(this.num) >= 1){
					let intNum = `${this.num}`.split('.')[0]
					let _decimal = `${this.num}`.split('.')[1]
					let ret = ''
					intNum = parseInt(intNum)
					if (Number.isNaN(intNum)) {
						intNum = 0
					}
					if (_decimal) {
						if (_decimal.length > this.decimal) {
							ret = parseFloat((intNum - 1) + '.' + _decimal.substring(0, this.decimal))
						} else {
							ret = parseFloat((intNum - 1) + '.' + _decimal)
						}
					}else{
						ret = (intNum - 1)
					}
					this.num = ret
					this.valiHandler()
				}else{
					return false;
				}
			}
		}
	}
</script>

<style scoped>
	.inputOutStyle {
		border-color: #ff4949 !important;
	}
	.inputStyle {
		background: #fffafa;
	}
	/**2017.12.13***/
	.opc {
		opacity: 0;
		position: relative;
		z-index: -1;
	}
.winter{
	width: 100%;
    height: 26px;
    line-height: 26px;
    border: 1px solid #f1f1f1;
    border-radius: 2px;
	display: inline-block;
    overflow: hidden;
    position: relative;
    top: 5px;
}
.winter .el-icon-plus{
	color: #979797;
	position: absolute;
    right: 4px;
    top: 3px;
    z-index: 1;
    font-size: 12px;
    transform: scale(0.833);
    cursor: pointer;
}
.winter .el-icon-minus{
	color: #979797;
	position: absolute;
    right: 4px;
    bottom: 0px;
    font-size: 12px;
    transform: scale(0.833);
    cursor: pointer;
}
.winter input{
	width: 100%;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding-right: 20px;
	position: absolute;
    top: 0px;
    left: 0;
    line-height: 26px;
    border: none;
    outline: none;
    padding-left: 10px;
    font-size: 12px;
}
.winter:after{
	position: absolute;
	content: "h";
	font-size: 12px;
	color: #999;
	right: 18px;
	top: 0;
}
.winter input::-webkit-outer-spin-button,
.winter input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.winter input[type="number"]{
  -moz-appearance: textfield;
}
</style>