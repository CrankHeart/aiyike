<!--部门周报的详情页-->
<template>
    <div class="wrap WeeklyDetailsComponents">
        <div class="weekly-container-right-content" id="weekly-container-right-content">
            <div ref="getPaddingBottom">
                <p class="weekly-details-title">周报详情<i v-if="editStatus" :style="editorWeeklyBtn()" @click="editWeekly"></i></p>
                <p class="department">{{allData.week.depart}}</p>
                <div class="clearfix">
                    <div class="fl fake-form">
                        <i>周报周期：</i>
                        <span>{{allData.week.monthCode}}月第{{allData.week.num | n2cformat}}周</span>
                    </div>
                    <div class="fl fake-form">
                        <i>提交日期：</i>
                        <span>{{allData.week.updateTime | totimestamp | fmtDate}}</span>
                    </div>
                </div>
                <div class="reject-infor" v-show="showReject">
                    <ul class="reject-list" ref="rejectList">
                        <li class="clearfix" v-if="!!value.remark" v-for="(value,index) in allData.audit" :key="index" ref="rejectListLi">
                            <span class="reject-title" v-if="value.status==3">审核说明:</span>
                            <span class="reject-title" v-if="value.status==2 || value.status==0">驳回说明:</span>
                            <div class="audit-statement">
                                <p>{{value.createTime}}</p>
                                <div class="clearfix">
                                    <span class="reject-name fl">{{value.author}}</span>
                                    <div class="reject-remark fl">{{value.remark}}</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <hr>
            </div>
            <div class="weekly-content-wrap">
                <herghost-scroll ref="hgscroll" :options="{
				paddingLeft: '0px',
				paddingRight: '0px',
			}">
                    <div class="weekly-content-scroll margin_right" ref="weeklyContentScroll">
                    	<div class="weekly_div">
                    		<div class="weekly-content" ref="weeklyContent"></div>
                    	</div>
                        <div class="not-audit-btn clearfix" v-if="authStatus&&(jumpStatus == 2||jumpStatus == 3)" v-show="(!rejectShow&&!auditShow)">
                            <el-button class="fr btn reject" @click="reject">驳回</el-button>
                            <el-button type="primary" class="fr btn audited" @click="whetherAudited(3)">审核</el-button>
                        </div>
                        <!--分割线-->
                        <div class="line" v-if="auditShow || rejectShow"></div>
                        <!--点击审核-->
                        <div class="audit-weekly" v-if="auditShow">
                            <p class="reason-title">周报审核</p>
                            <el-form ref="auditForm" :model="auditForm" label-position="left" label-width="86px">
                                <el-form-item
                                        prop="reason"
                                        label="审核说明:"
                                        :rules="[
                                    { required: true, message: '审核说明不能为空'},
                                    { min: 10, message: '输入长度不能小于10', trigger: 'blur' }
                                ]">
                                    <el-input type="textarea"  placeholder="请填写项目审核说明" v-model="auditForm.reason"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitAuditForm('auditForm')">确 定</el-button>
                                    <el-button @click="cancelAuditForm('auditForm')">取 消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <!--点击驳回-->
                        <div class="reject-weekly" v-if="rejectShow">
                            <p class="reason-title">周报驳回</p>
                            <el-form ref="rejectForm" :model="rejectForm" label-position="left" label-width="86px">
                                <el-form-item
                                        prop="reason"
                                        label="驳回说明:"
                                        :rules="[
                                    { required: true, message: '驳回说明不能为空'},
                                    { min: 10, message: '输入长度不能小于10', trigger: 'blur' }
                                ]">
                                    <el-input type="textarea"  placeholder="请填写项目驳回说明" v-model="rejectForm.reason"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitRejectForm('rejectForm')">确 定</el-button>
                                    <el-button @click="cancelRejectForm('rejectForm')">取 消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </herghost-scroll>
                <div class="audit-status" :style="auditStatusCss()">
                    <span class="rotate45">{{auditStatus}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let HerGhostScroll = () => import('@/components/scroll/HerGhostScroll.vue')
    export default {
        name: 'WeeklyDetailsComponentsD',
        props:["rightWeeklyList"],
        data() {
            return {
                rejectDialogVisible:false,       //是否驳回弹框状态
                dataList: JSON.parse(Cache.local(Config.Login)),
                state: this.$store,
                sendData:null,
                weeklyCycle:'',
                submissionDate:'',
                jumpStatus:null,
                leftWeeklyState: false,
                parentData:this.$parent.$data,
                allData:{
                    week:{
                        depart:'',
                        status:''
                    },
                    audit:null
                },
                showReject:false,
                rejectForm:{
                    reason:null
                },
                rejectShow:false,
                auditForm:{
                    reason:null
                },
                auditShow:false,
                auditStatus:'',
                cacheData:this.$parent.cacheListData,
                rightComponent:true
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.jumpStatus = this.$route.query.jumpstatus
                this.leftWeeklyState = this.$store.getters.leftWeeklyList
                this.dealSendData()
                this.getDetailsData()
            })
        },
        components: {
            'herghost-scroll' : HerGhostScroll,
        },
        watch:{
            'rightWeeklyList':{
                deep:true,
                handler(val){
                    this.jumpStatus = this.$route.query.jumpstatus
                    this.leftWeeklyState = this.$store.getters.leftWeeklyList
                    this.dealSendData()
                    this.proxyData(val.id)
                    console.log(val.id+'===========val')
                }
            }
        },
        computed:{
        	editStatus() {
        		let status = this.allData.week && this.allData.week.status
        		switch (status) {
        			case 0:
        				return true
        			case 2:
        				return true
        			default: 
        				return false
        		}
        	},
            authStatus(){
                if(Array.isArray(this.allData.audit)&&this.allData.audit.length>0){
                    for(let i =0, val;val = this.allData.audit[i++];i<this.allData.audit.length){
                        if(val.authId == this.sendData.ucId && val.status == 0){        //匹配到当前登录人的审核状态是否为0
                            return true
                        }
                    }
                    return false
                }
            },
        },
        methods: {
            editWeekly(){
                if(this.allData.week.status == 3 || this.jumpStatus != 1){
                    return
                }
                this.state.commit('editStatus', true) //发送编辑状态
                this.state.commit('WeeklyDetalisData', this.allData.week) //发送编辑数据
                this.$router.push('/weeklymanagement/writed')
            },
            //审核状态样式
            auditStatusCss(){
                switch(this.allData.week.status){
                    case 3:
                        this.auditStatus = '已审核'
                        return {
                            background:"url('/static/img/auditing-weekly-bg.png') no-repeat",
                            "bacground-size":'51px 52px',
                            color:'#fff'
                        }
                        break
                    case 2:
                        this.auditStatus = '已驳回'
                        return {
                            background:"url('/static/img/reject-weekly-bg.png') no-repeat",
                            "bacground-size":'51px 52px',
                            color:'#fff'
                        }
                        break
                    case  1:
                        this.auditStatus = '未审核'
                        return {
                            background:"url('/static/img/no-audited-weekly-bg.png') no-repeat",
                            "bacground-size":'51px 52px',
                            color:'#999'
                        }
                        break
                    default:
                        this.auditStatus = '未审核'
                        return {
                            background:"url('/static/img/no-audited-weekly-bg.png') no-repeat",
                            "bacground-size":'51px 52px',
                            color:'#999'
                        }
                        break
                }
            },
            //编辑按钮样式
            editorWeeklyBtn(){
                if(this.jumpStatus != 1){
                    return {
                        display:'none'
                    }
                }else if(this.jumpStatus == 1&&this.allData.week.status != 3&&this.allData.week.status != 1){
                    return {
                        background:"url('/static/img/editor-weekly-in.png') no-repeat 5px 0",
                        display:'inline-block',
                        "bacground-size":'15px 14px',
                        width:'20px',
                        height:'14px',
                        cursor:'pointer'
                    }
                }else{
                    return {
                        background:"url('/static/img/editor-weekly-off.png') no-repeat 5px 0",
                        display:'inline-block',
                        "bacground-size":'15px 14px',
                        width:'20px',
                        height:'14px',
                        cursor:'pointer'
                    }
                }
            },
            dealSendData(){
                this.sendData = {
                    ucId: this.dataList.uc.id
                }
                this.sendData.logId = this.$route.query.id
            },
            getDetailsData1(id){
            	this.sendData.logId=id
                this.$http.post('/api/week/detail', this.sendData, {emulateJSON: true})
                    .then((res) => {
                        var _d = res.data;
                        if(_d.success) {
                            this.allData = _d.result
                            this.cacheData[this.allData.week.id] = this.allData                //缓存数据
                            this.dealSomething()
                        }
                    }).catch((err) => {
                })
            },
            getDetailsData(){
                this.$http.post('/api/week/detail', this.sendData, {emulateJSON: true})
                    .then((res) => {
                        var _d = res.data;
                        if(_d.success) {
                            this.allData = _d.result;
                            console.log(this.allData,123)
                            this.cacheData[this.allData.week.id] = this.allData                //缓存数据
                            this.dealSomething()
                        }
                    }).catch((err) => {
                })
            },
            dealSomething(){
                this.$nextTick(()=>{
                    this.setContent()
                    if(!!this.allData.audit&&this.allData.audit.length>0){
                        this.allData.audit.forEach(val=>{
                            if(val.remark!=null){
                                this.showRejectFun()
                            }
                            this.setPaddingBottom()
                        })
                    }
                })
            },
            proxyData(id){
                let args = Array.prototype.join.call(arguments,',')
                if(args in this.cacheData){
                    this.allData = this.cacheData[args]
                    this.dealSomething()
                    return
                }
                this.getDetailsData1(id)
            },
            //动态设置padding-bottom
            setPaddingBottom(){
                let paBottom = this.$refs.getPaddingBottom.clientHeight
                this.$refs.weeklyContentScroll.style.paddingBottom = paBottom + 'px'
            },
            showRejectFun(){
                let _self = this
                let tempInterval = requestAnimationFrame(function fn(){
                    if(!!_self.$refs.rejectListLi&&_self.$refs.rejectListLi.length>0){
                        cancelAnimationFrame(tempInterval)
                        _self.showReject = true
                        // 
                    }else{
                        tempInterval = requestAnimationFrame(fn)
                    }
                })
            },
            setContent(){
                let _self = this
                let tempInterval = requestAnimationFrame(function fn(){
                    if(_self.$refs.weeklyContent){
                        cancelAnimationFrame(tempInterval)
                        _self.$refs.weeklyContent.innerHTML = _self.allData.week.description
                    }else{
                        tempInterval = requestAnimationFrame(fn)
                    }
                })
            },
            reject(){
                this.rejectShow = true
            },
            whetherAudited(status){
                this.auditShow = true
            },
            getData(){
                var _self = this
                this.$http.post('/api/week/auth', this.sendData, {
                    emulateJSON: true
                }).then((res) => {
                    var data = res.data
                    if(data.success) {
                        this.$message({
                            showClose: true,
                            message: '处理成功',
                            duration:'1000',
                            customClass: 'success',
                            onClose:function (message) {
                                _self.$router.push('/weeklymanagement')
                            }
                        });

                    }
                }).catch((err) => {

                })
            },
            //审核表单取消
            cancelAuditForm(formName){
                this.$refs[formName].resetFields()
                this.auditShow = false
            },
            //驳回表单取消
            cancelRejectForm(formName){
                this.$refs[formName].resetFields()
                this.rejectShow = false
            },
            //审核表单提交
            submitAuditForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.sendData.status = 3        //3代表审核完成
                        this.sendData.description = this.auditForm.reason
                        this.getData()
                    } else {
                        
                        return false
                    }
                });
            },
            //驳回表单提交
            submitRejectForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.sendData.description = this.rejectForm.reason
                        this.sendData.status = 2            //2代表驳回
                        this.getData()
                    } else {
                        
                        return false
                    }
                });
            }
        }
    }
</script>

<style scoped>
    i{
        font-style: normal;
    }
    .WeeklyDetailsComponents{
        width: 100%;
        height: 100%;
    }
    .weekly-container-right-content{
        padding: 20px;
        width: 100%;
        height: 100%;
        background-color: #fff;
        box-sizing: border-box;
        -moz-box-sizing: border-box;  /*Firefox3.5+*/
        -webkit-box-sizing: border-box; /*Safari3.2+*/
        -o-box-sizing: border-box; /*Opera9.6*/
        -ms-box-sizing: border-box; /*IE8*/
        overflow: hidden;
        font-size: 12px;
    }
    .department{
        font-size: 12px;
        margin-right: 17px;
        color: #000;
        font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
        margin-bottom: 10px;
    }
    .fake-form{
        margin-right: 37px;
    }
    .fake-form span{
        color: #000000;
        font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
    }
    .weekly-details-title{
        font-size: 14px;
        margin-bottom: 14px;
        font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
    }
    hr{

        width: 100%;
        margin: 17px 0 13px;
    }
    .weekly-no-content{
        height: 100%;
        background-color:  #FBFBFB;
        padding: 20px;
        text-align: center;
        position: relative;
    }
    .weekly-no-content span{
        margin-left: -21px;
        margin-top: -16px;
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 32px;
        color: #000000;
        opacity: 0.14;
    }
    .weekly-content-wrap{
        height: 100%;
        padding: 20px;
        padding-left: 0;
        padding-right: 0;
        position: relative;
        margin-top: -10px;
        overflow: hidden;
    }

    .not-audit-btn .btn{
        border-radius: 2px;
        width: 90px;
        height: 30px;
        line-height: 30px;
        padding: 0;
        font-size: 14px;
        font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
        border:0
    }
    .not-audit-btn .audited{
        margin-right: 15px;
    }
    .not-audit-btn .reject{
        background: #F2F2F2;
        color: #666666;
    }
    .weekly-content-scroll{
        /*height: 100%;*/
        /*overflow-y: scroll;*/
        /*overflow-x: hidden;*/
        /*box-sizing: border-box;*/
    }
    .weekly-content{
        height: 100%;
        min-height: 569px;
        background: #FBFBFB;
        padding: 20px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .reject{
        margin-right: 20px;
    }
    .reject-title{
        display: inline-block;
        font-size: 12px;
        color: #000;
        font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
        margin: 10px 0;
    }
    .audit-statement{
        background: #F9FAFC;
        padding: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .audit-statement p{
        margin-bottom: 10px;
    }
    .reject-name{
        width: 80px;
    }
    .reject-remark{
        width: 100%;
        margin-left: -80px;
        padding-left: 80px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .line{
        border-bottom: 1px dashed #e2e2e2;
        margin: 20px 0;
    }
    .reason-title{
        font-size: 16px;
        font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
        margin-bottom: 15px;
    }
    .audit-status{
        position: absolute;
        right: 0;
        top: 19px;
        width:51px;
        height:52px
    }
    .weekly_div{
        background: #FBFBFB;
		/*position: relative;*/
		/*width: 100%;*/
		/*height: 100%;*/
	}
	.not-audit-btn{
        margin-top: 20px;
        margin-bottom: 20px;
        padding-right: 15px;
		/*position: absolute;*/
		/*bottom: 20px;*/
		/*right: 20px;*/
	}
	.not-audit-btn .reject{
		margin-right: 0;
	}
</style>