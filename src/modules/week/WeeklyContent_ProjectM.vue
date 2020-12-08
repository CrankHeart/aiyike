<!--项目周报-->
<template>
    <div class="WeeklyContentDivisionManager-wrap">
        <div class="weekly-container-right-content" ref="pWrapWdith">
            <div class="clearfix content-title">
                <div class="fl clearfix">
                    <div class="fl date-title">提交日期：</div>
                    <el-date-picker class="date-picker fl"
                                    v-model="value0"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0"
                                    style="width: 115px">
                    </el-date-picker>
                    <div class="fl date-link">-</div>
                    <el-date-picker class="date-picker fl"
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions1"
                                    style="width: 115px">
                    </el-date-picker>
                </div>
                <div class="fr search-btn" @click="soso">搜索</div>
            </div>
            <div class="weekly-container-right-content-container clearfix" ref="panelWrap">
                <template v-for="(item,key) in wiListData">
                    <ProjectDetailsWeekly
                            :ishoverOrNot="ishoverOrNot(item)" :key="key" :item="item"
                            ref="currWeeklyList" class="fl"
                            @hover="showOperationOrNot"
                            @click.native="sendWiListData()">
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
        </div>
    </div>
</template>

<script>
    let ProjectWeekly = function(resolve) {
        require(['@/components/weekly-component/ProjectWeekly'], resolve);
    }
    let ProjectDetailsWeekly = function(resolve) {
        require(['@/components/weekly-component/ProjectDetailsWeekly'], resolve);
    }
    let BusinessWeekly = function(resolve) {
        require(['@/components/weekly-component/BusinessWeekly'], resolve);
    }
    let vm = null
    let getValue0 = function() {
        return vm.$data.value0
    }

    export default {
        name: '',
        props:{
            rightWeeklyList:{
                type: null,
                default(){
                    return []
                }
            }
        },
        data() {
            return {
                dataList: JSON.parse(Cache.local(Config.Login)),
                datalistData:null,
                perData:'',     //每一个项目周报模块的数据
                pickerOptions0: {

                },
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.parse(new Date(getValue0()));
                    }
                },
                value0: null,
                value1: null,
                state:this.$store,
                weeklyList:[],
                hoverStatus:0,
                pWrapWdith:'',
                mWeekly:'',			//最小margin
                num:'',
                ratio: '',
                calculaFlag: true,
                jumpStatus:null,
                wiListData:[],
                cacheData:this.$parent.cacheListData,
            }
        },
        watch:{
            rightWeeklyList: {
                deep: true,
                handler(val) {
                    this.proxyData(val.id)
                    this.forGetWeeklyDom()
                }
            },
            pWrapWdith(val){
                this.forGetWeeklyDom()
            }
        },
        mounted: function() {
            vm = this;
            this.datalistData = {            //右侧数据
                loginId:this.dataList.uc.id
            }
            this.jumpStatus = this.$route.query.jumpstatus
            this.$store.commit('wiListData',null)                 //清空掉保存的项目周报子文件夹列表的数据
            this.setWrapWidth()
            this.getMyWiListData()
        },
        components: {
            ProjectWeekly,
            ProjectDetailsWeekly,
            BusinessWeekly
        },
        computed:{

        },
        methods: {
            ishoverOrNot(item){
                if(this.jumpStatus != 1){  //查询页面跳转取消编辑和删除功能
                    return false
                }
                if(item.status == 0||item.status == 2){
                    return true
                }
                return false
            },
            getMyWiListData(){
                let data = this.$store.state.wiListData             //return 将子文件夹数据列表传回来
                if(!!data&&data.length>0){
                    this.wiListData = data
                    return
                }
                let sendData = JSON.parse(JSON.stringify(this.datalistData))
                sendData.itemId = this.rightWeeklyList.itemId
                this.$http.post('/api/week/myWeekItem', sendData, {emulateJSON: true})
                    .then((res) => {
                        var data = res.data;
                        if(data.success) {
                            this.wiListData = !!data.result.content?data.result.content:[]
                            this.cacheData[this.$route.query.id] = this.wiListData                //缓存数据
                        }
                    }).catch((err) => {
                })
            },
            proxyData(){
                let args = Array.prototype.join.call(arguments,',')
                if(args in this.cacheData){
                    this.wiListData = this.cacheData[args]
                    return
                }
                this.getMyWiListData()
            },
            //动态计算项目周报详情列表的宽度
            setWrapWidth(){
                this.pWrapWdith = this.$refs.pWrapWdith.clientWidth
                this.$refs.panelWrap.style.width = this.pWrapWdith+"px"
                window.onresize = this.throttle(()=>{
                    if(this.pWrapWdith == this.$refs.pWrapWdith.clientWidth){
                        return
                    }
                    this.pWrapWdith = this.$refs.pWrapWdith.clientWidth
                    this.$refs.panelWrap.style.width = this.pWrapWdith+"px"
                },200)
            },
            showOperationOrNot(status){
                this.hoverStatus = status;
            },
            editIcon(key,data){
                //id传到后端编辑
                this.state.commit('editStatus', true) //发送编辑状态
                this.state.commit('WeeklyDetalisData', data) //发送编辑数据
                this.$router.push('/weeklymanagement/writep')
            },
            deleteIcon(key,data){
                //id传到后端删除
                var _self = this
                this.$http.post('/api/week/delWiLog/'+data.id, {id:data.id}, {emulateJSON: false})
                    .then((res) => {
                        var _d = res.data;
                        if(_d.success) {
                            this.$message({
                                showClose: true,
                                message: '删除成功',
                                duration:'1000',
                                onClose:function (message) {
                                    _self.wiListData.splice(key,1)
                                }
                            })
                        }
                    }).catch((err) => {
                })
            },
            soso(){
                this.datalistData.itemId = this.rightWeeklyList.itemId
                this.datalistData.startTime = !!this.value0?(new Date(this.value0)).format("yyyy-MM-dd"):''
                this.datalistData.endTime = !!this.value1?(new Date(this.value1)).format("yyyy-MM-dd"):''
                this.datalistData.pageSize = 200
                this.$http.post('/api/week/myWeekItem', this.datalistData, {emulateJSON: true})
                    .then((res) => {
                        var data = res.data;
                        if(data.success) {
                            this.wiListData = data.result.content
                            this.forGetWeeklyDom()
                            //将时间转为时间戳
                            if(!!this.wiListData){
                                // this.changeDateFormat(this.weeklyList)
                            }

                        }
                    }).catch((err) => {
                })
            },
            sendWiListData(){
                this.state.commit('wiListData', this.wiListData) //发送编辑数据
            },
            //转换日期格式至时间戳
            changeDateFormat(stringTime){
                for(var i = 0; i<this.weeklyList.length;i++){
                    this.weeklyList[i].createTime = Date.parse(new Date(stringTime[i].createTime))
                }
            },
            forGetWeeklyDom(){
                let tempInterval = setInterval(()=>{
                    if (this.$refs.currWeeklyList && this.$refs.currWeeklyList.length) {
                        clearInterval(tempInterval)
                        if (this.calculaFlag) {
                            this.calculaFlag = false
                            this.calculationMargin(false,30)
                        }
                    }
                }, 0)
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
                    let aw = this.pWrapWdith - 20 - 20			//总宽度,减去20是为了出去移除部分的宽度,减去右侧的padding
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
.WeeklyContentDivisionManager-wrap{
    width: 100%;
    height: 100%;
}
.weekly-container-right-content{
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
}
.weekly-container-right-content-container{
    overflow-y: scroll;
    /*width: 104%;*/
    height: auto;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:flex-start;
}
.weekly-container-right-content .el-input{
    height: 30px;
    /*line-height: 30px;*/
}
.weekly-container-right-content .el-input .el-input__inner{
    height: 30px;
    /*line-height: 30px;*/
}
.weekly-container-right-content .el-date-editor.el-input{
    width: 109px;
}

.date-title,.date-link{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
}
.date-link{
    padding: 0 5px;
}
.search-btn{
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #295DCF;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
    font-size: 14px;
}
.content-title{
    height: 30px;
    margin-bottom: 15px;
}
.weekly-container-right-content .every-WeeklyList-modules:first-child{
    margin-top: 20px;
}
.weekly-container-right-content .every-WeeklyList-modules{
    margin-right: 56px;        /*51px*/
    margin-bottom: 34px;
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
