<!--项目管理-项目详情页-项目周报模块-->
<template>
	<div class="Project-weekly-module clearfix" ref="panelWrap">
		<template v-for="(item,key) in weeklyList">
			<ProjectDetailsWeekly :ishoverOrNot="ishoverOrNot" :key="key" :item="item" class="fl" @hover="showOperationOrNot" ref="currWeeklyList">
				<div slot="operation" class="operation-wrap" ref="operation" v-show="hoverStatus==1">
					<div class="fl" style="margin-right: 10px;">
						<i class="el-icon-edit" @click.stop.prevent="editIcon(key,item)"></i>
					</div>
					<div class="fl">
						<i class="el-icon-delete" @click.stop.prevent="deleteIcon(key,item)"></i>
					</div>
				</div>
			</ProjectDetailsWeekly>
		</template>
	</div>
</template>

<script>
    let ProjectDetailsWeekly = function(resolve) {
        require(['@/components/weekly-component/ProjectDetailsWeekly'], resolve);
    }
	export default {
		name: 'Project_Weekly',
		data() {
			return {
			    itemId:'',
                hoverStatus:0,
				ishoverOrNot:false,					//告诉组件能不能编辑
                weeklyList:[],
				wrapWidth:this,
                mWeekly:'',			//最小的margin
                num:'',
                ratio: '',
                parent: this.$parent.$parent,
                calculaFlag: true
			}
		},
        components: {
            ProjectDetailsWeekly
        },
		watch:{
            'parent.paneWidth'(val) {
                this.throttle(()=>{
                    this.$nextTick(()=>{
                        this.forGetWeeklyDom()
                    })
                },500)()
            }
		},
		mounted(){
            let reg=/\/details\/(\d+)/
            this.itemId = this.$route.path.match(reg)[1]
            this.getProjectList()
		},
		methods: {
            showOperationOrNot(status){
                this.hoverStatus = status;
            },
            getProjectList(){
                this.$http.post('/api/week/weekItemList', {itemId:this.itemId}, {emulateJSON: true})
                    .then((res) => {
                        var data = res.data;
                        if(data.success) {
                            this.weeklyList = !!data.result?data.result:[]
                            this.$nextTick(()=>{
                                this.forGetWeeklyDom()
                            })
                            //将时间转为时间戳
                            if(!!this.weeklyList){
                                // this.changeDateFormat(this.weeklyList)
                            }

                        }
                    }).catch((err) => {
                })
			},
            forGetWeeklyDom(){
                let _self = this
                let tempInterval = requestAnimationFrame(function fn(){
                    if (_self.$refs.currWeeklyList && _self.$refs.currWeeklyList.length) {
                        cancelAnimationFrame(tempInterval)
                        if (_self.calculaFlag) {
                            _self.calculaFlag = false
                            _self.calculationMargin(false,30)
                        }
                    }else{
                        tempInterval = requestAnimationFrame(fn)
                    }
                })
            },
            resetMargins(mval,num){
                var lis = this.$refs.currWeeklyList
                for(let i=0;i<lis.length;i++){
                    if(((i+1)%(num))==0){
                        lis[i].$el.style.marginRight = 0+'px'
                    }else{
                        lis[i].$el.style.marginRight = mval + 'px'
                    }
                }
            },
            calculationMargin(is,minm){
                if (is){
                    this.num--
                    this.ratio++
                    if (this.num <= 0 || this.ratio <= 0) {
                        this.calculaFlag = true
                        return
                    }
                } else {
                    let aw = this.$refs.panelWrap.clientWidth			//总宽度
                    this.num = parseInt(aw/180)				//可放的周报数目
                    this.ratio = aw/180 - parseInt(aw/180)			//每个marginright的比例
                }
                this.mWeekly = (this.ratio*180)/(this.num - 1)
                if(this.mWeekly >= minm){
                    this.resetMargins(this.mWeekly,this.num)
                    this.calculaFlag = true
                }else{
                    this.calculationMargin(true,30)					//is代表是否支出一个周报的宽度做margin
                }
            },
            throttle(fn,interval){
                var _self = this,	// 保存需要被延迟执行的函数引用
                    timer,			// 定时器
                    firstTime = true;	// 是否是第一次调用
                return function(){
                    var args = arguments,
                        _me =  this;
                    if(firstTime){		//如果是第一次调用，不需延迟执行
                        fn.apply(_me,args);
                        return firstTime = false;
                    }
                    if(timer){			//如果定时器还在，说明前一次的延迟执行还没有完成
                        return false;
                    }
                    timer = setTimeout(function(){		// 延迟一段时间执行
                        clearTimeout(timer);
                        timer = null;
                        fn.apply(_me,args);
                    },interval||500)
                }
            }
		}
	}
</script>

<style scoped>
	.Project-weekly-module{
		position: relative;
		padding-bottom: 20px;
	}
	.currWeeklyList{
		margin-right: 25px;
		margin-bottom: 20px;
	}

	.operation-wrap{
		position: absolute;
		bottom: 20px;
		left: 20px;
	}
	.operation-wrap i{
		font-size: 14px;
		display: block;
		border-radius: 32px;
		text-align: center;
		margin-right: 10px;
		color: #fff;
		background-color: #295DCF;
		padding: 10px;
	}

</style>