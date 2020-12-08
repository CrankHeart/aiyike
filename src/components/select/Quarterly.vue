<template>
	<section>
		<div class="quarter_select">
			<div class="date-select" @click.stop="show()">
				<el-input placeholder="2017-09-27" icon="arrow-down" v-model="input2">
				</el-input>
			</div>
			<ul class="quarterul" v-show="isShow" @click.stop="()=>{}">
				<li v-for="quarter in quarters">
					<div class="quarter" v-for="(quarternum,index) in quarter.quarternums">
						<!--年-->
						<div v-if="index == 0">
							<span class="full_year">{{quarter.year}}</span>
						</div>
						<!--季度-->
						<div class="quartspan">
							<el-checkbox :indeterminate="quarternum.isIndeterminate" v-model="quarternum.checkAll" @change="handleCheckAllChange(quarternum,$event)"></el-checkbox>
						<span @click="unfold(quarternum)">{{quarternum.quarternum}}</span>
						</div>
						
						
					  <el-checkbox-group v-model="quarternum.months" @change="handleCheckedCitiesChange(quarternum)">
					  	<!--月份-->
					  	<div v-show="quarternum.isShowListItem == true">
					  		<div v-for="month in quarternum.cityOptions">
					  			<el-checkbox :label="month" :key="month">{{month}}</el-checkbox>
					  		</div>
					  	</div>
					    
					  </el-checkbox-group>
					</div>
				</li>
			</ul>
			<input style="opacity: 0; width: 0; height: 0;" type="text" @blur="isShow=false" ref="hideInput"/>
		</div>
	</section>
</template>

<script>

	export default{
		name: 'Quarterly',
		watch: {
			quarters: {
				deep: true,
				handler(curval, oldval) {
					
				},
			}
		},
		data(){
			return{
				input2: '',
				isShow:false,
		        quarters:[
		        	{
		        		year: "2017年全年",
		        		quarternums:[
		        			{
		        				quarternum: "第一季度",
								checkAll: true,
		        				isIndeterminate: true,
								isShowListItem : true,//用于判断是否展示子列表
								cityOptions: ['1月','2月','3月'],
				        		months:["1月","2月","3月"]
		        			},
		        			{
		        				quarternum: "第二季度",
								checkAll: false,
		        				isIndeterminate: true,
		        				isShowListItem : false,//用于判断是否展示子列表
								cityOptions: ['4月','5月','6月'],
				        		months:["4月","5月","6月"]
		        			},
		        			{
		        				quarternum: "第三季度",
								checkAll: false,
		        				isIndeterminate: true,
		        				isShowListItem : false,//用于判断是否展示子列表
								cityOptions: ['7月','8月','9月'],
				        		months:["7月","8月","9月"]
		        			},
		        			{
		        				quarternum: "第四季度",
								checkAll: false,
		        				isIndeterminate: true,
		        				isShowListItem : false,//用于判断是否展示子列表
								cityOptions: ['10月','11月','12月'],
				        		months:["10月","11月","12月"]
		        			}
		        		]
		        	},
					{
		        		year: "2016年全年",
		        		quarternums:[
		        			{
		        				quarternum: "第一季度",
								checkAll: false,
		        				isIndeterminate: true,
								isShowListItem : false,//用于判断是否展示子列表
								cityOptions: ['1月','2月','3月'],
				        		months:["1月","2月","3月"]
		        			},
		        			{
		        				quarternum: "第二季度",
								checkAll: false,
		        				isIndeterminate: true,
		        				isShowListItem : false,//用于判断是否展示子列表
								cityOptions: ['4月','5月','6月'],
				        		months:["4月","5月","6月"]
		        			},
		        			{
		        				quarternum: "第三季度",
								checkAll: false,
		        				isIndeterminate: true,
		        				isShowListItem : false,//用于判断是否展示子列表
								cityOptions: ['7月','8月','9月'],
				        		months:["7月","8月","9月"]
		        			},
		        			{
		        				quarternum: "第四季度",
								checkAll: false,
		        				isIndeterminate: true,
		        				isShowListItem : false,//用于判断是否展示子列表
								cityOptions: ['10月','11月','12月'],
				        		months:["10月","11月","12月"]
		        			}
		        		]
		        	}
		        ]/*,
		        documentClickfn: null*/
			}
		},
		mounted(){
			/*this.document_clickfn = function(e) {
				this.isShow = false
			}*/
			document.addEventListener('click', this.documentClickfn)
		},
		beforeDestroy() {
			document.removeEventListener('click',  this.documentClickfn)
		},
		methods:{
			show(){
				this.isShow = !this.isShow
				/*if(this.isShow){
					this.$refs.hideInput.focus();
				}*/
			},
			documentClickfn (){
				this.isShow = false
			},
			handleCheckAllChange(status,event) { console.log(status)
					status.isShowListItem==event.target.checked
			        status.months = event.target.checked ? status.cityOptions : [];
			        /*status.isIndeterminate = false;*/
			        status.isIndeterminate = !status.isIndeterminate;
		    },
		    handleCheckedCitiesChange(value) { 
		        let checkedCount = value.months.length;
		        value.checkAll = checkedCount === value.cityOptions.length;
		        value.isIndeterminate = checkedCount > 0 && checkedCount < value.cityOptions.length;
		    },
		    unfold(status){
		    	status.isShowListItem = !status.isShowListItem
				this.handleCheckedCitiesChange(status)
		    }
		}
		
		
	}
</script>

<style scoped>
	.date-select{
		float: right;
		width: 115px;
		cursor: pointer;
		position: relative;
	}
	.quarter_select{
		position: relative;
	}
	.quarterul{
		position: absolute;
	    top: 30px;
	    right: 0;
	    width: 115px;
	    z-index: 20;
    	background-color: #fff;
    	box-shadow: 0 7px 23px 0 rgba(0,0,0,0.04);
		border-radius: 2px;
		text-align: center;
	}
	.full_year{
		display: block;
		background-color: #EDEDED;
		font-family: 'PingFangSC-Medium';
		font-size: 12px;
		color: #333333;
		letter-spacing: 0;
		line-height: 39px;
		font-weight: 700;
	}
	.quarter .quartspan{
		display: inline-block;
		font-family: 'PingFangSC-Regular';
		font-size: 12px;
		color: #999999;
		letter-spacing: 0;
		line-height: 39px;
		cursor: pointer;
		position: relative;
	}
	.quarter .quartspan:after{
		position: absolute;
		content: "";
		bottom: 0;
		left: -10px;
	    height: 1px;
	    right: -22px;
	    background-color: #F1F1F1;
	}
</style>