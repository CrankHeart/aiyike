<template>
    <div class="every-WeeklyList-modules" @click="clickHandler()" @mouseenter="ishoverOrNot && showOperationIcon()" @mouseleave="ishoverOrNot && hideOperationIcon()">
    	<div class="list-modules-title marginleft16">周报</div>
        <p class="list-modules-weekly marginleft16">{{departName}}</p>
        <!--<div class="list-modules-time">{{item.createTime | totimestamp | fmtDate}}</div>-->
        <div class="list-modules-time">{{item.monthCode}}月第{{item.num | n2cformat}}周</div>
        <!--<div class="Recently-submitted">-->
        <!--<span class="submitted-tip">最近提交</span>-->
        <!--<span class="submitted-time">{{item.createTime}}</span>-->
        <!--</div>-->
        <div class="examine-status not-audited marginleft16" v-if="!item.status||item.status==1" v-show="hoverStatus==0">待审核</div>
        <!--<div class="examine-status auditing" v-else-if="item.status==1" v-show="hoverStatus==0">审批中</div>-->
        <div class="examine-status rejected marginleft16" v-else-if="item.status==2" v-show="hoverStatus==0">已驳回</div>
        <div class="examine-status audited marginleft16" v-else-if="item.status==3" v-show="hoverStatus==0">已审核</div>
        <slot name = "operation" v-if="hoverStatus==1"></slot>
    </div>
</template>

<script>
    export default {
        name: '',
        props: {
            item:{
                type: Object,
                required: true
            },
            ishoverOrNot:{
                type:Boolean,
                default(){
                    return true
                }
            }
        },
        data() {
            return {
                hoverStatus:0,
                state:this.$store.state,
                departName:''
            }
        },
        watch:{
            ishoverOrNot(value){
                if(!value){
                    this.hoverStatus = 0
                }
            }
        },
        mounted: function() {
            this.$nextTick(()=>{
                this.splitDepartWord()
            })
        },
        methods: {
            splitDepartWord(){
                if(this.item.depart.length<=17){
                    this.departName = this.item.depart
                    return
                }
                this.departName = this.item.depart.substr(0,17)
                this.departName += '...'
            },
            clickHandler(id){
                this.$store.commit("WeeklyDetalisData",this.item)
            },
            //鼠标移入显示操作图标
            showOperationIcon(){
                this.hoverStatus=1;
                this.$emit("hover",this.hoverStatus);
            },
            //鼠标离开显示操作图标
            hideOperationIcon(){
                this.hoverStatus=0;
                this.$emit("hover",this.hoverStatus);
            }
        }
    }
</script>

<style scoped>
    /*.every-WeeklyList-modules{
        color: #fff;
        width: 140px;
        height: 192px;
        background: url('../../assets/img/business_weekly_bg.png') no-repeat center;
        background-size: 100% 100%;
        position: relative;
        cursor: pointer;

        margin-top: 20px;
        padding: 33px 20px 20px ;
    }*/
   .every-WeeklyList-modules{
        color: #fff;
        width: 180px;
        height: 192px;
        background: url('../../assets/img/business_weekly_bg.png') no-repeat center;
        background-size: 184px 192px;
        position: relative;
        cursor: pointer;
        margin-top: 20px;
    }
    .every-WeeklyList-modules:first-child{
        margin-top: 0;
    }
    .list-modules-title{
    	display: inline-block;
        color: #FFCB4C;
        font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
        border: 1px solid #FFCB4C;
        width: 38px;
        text-align: center;
        margin-bottom: 8px;
        margin-top: 36px;
        font-size: 12px;
    }
    .list-modules-weekly{
    	font-weight: 600;
        color: #000;
        font-family: "PingFa.list-modules-weeklyngSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .list-modules-time{
        color: #999;
        font-size: 12px;
        transform: scale(0.833);
    }
    .Recently-submitted{
        position: absolute;
        bottom: 50px;
        left: 20px;
        font-size: 12px;
        color: #939393;
    }
    .examine-status{
        font-size: 14px;
        position: absolute;
        bottom: 16px;
        left: 0px;
    }
    .audited{
        color: #999;
    }
    .not-audited{
        color: #295DCF;
    }
    .rejected{
        color: #EF7777;
    }
    .marginleft16{
    	margin-left: 16px;
    }
    .every-WeeklyList-modules.active{
        background: url('../../assets/img/business_weekly_bg-active.png') no-repeat center;
        background-size: 184px 196px;
    }
    .every-WeeklyList-modules.active .list-modules-title{
        color: #fff;
        border: 1px solid #fff;
    }
    .every-WeeklyList-modules.active .list-modules-weekly,
    .every-WeeklyList-modules.active .list-modules-time,
    .every-WeeklyList-modules.active .Recently-submitted,
    .every-WeeklyList-modules.active .audited,
    .every-WeeklyList-modules.active .not-audited{
        color: #fff;
    }
    /*.every-WeeklyList-modules.active .list-modules-title{
    	margin-top: 0;
    }*/
</style>