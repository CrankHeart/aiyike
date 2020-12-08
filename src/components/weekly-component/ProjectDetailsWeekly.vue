<template>
    <div class="every-WeeklyList-modules" @click="clickHandler()" @mouseenter="ishoverOrNot && showOperationIcon()" @mouseleave="ishoverOrNot && hideOperationIcon()">
        <!--<div class="list-modules-title">周报</div>-->
        <p class="list-modules-weekly">{{item.monthCode}}月 第{{item.num | n2cformat}}周</p>
        <div class="list-modules-time">{{item.createTime | totimestamp | fmtDate}}</div>
        <div class="list-modules-time"></div>
        <!--<div class="Recently-submitted">-->
        <!--<span class="submitted-tip">最近提交</span>-->
        <!--<span class="submitted-time">{{item.createTime}}</span>-->
        <!--</div>-->
         <div class="examine-status not-audited" v-if="item.status==0" v-show="hoverStatus==0">待审核</div>
        <div class="examine-status not-audited" v-if="item.status==1" v-show="hoverStatus==0">审核中</div>
        <!--<div class="examine-status auditing" v-else-if="item.status==1" v-show="hoverStatus==0">审批中</div>-->
        <div class="examine-status rejected" v-else-if="item.status==2" v-show="hoverStatus==0">已驳回</div>
        <div class="examine-status audited" v-else-if="item.status==3" v-show="hoverStatus==0">已审核</div>
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
            ishoverOrNot:{              //鼠标移入是否有编辑删除按钮
                type:Boolean,
                default(){
                    return true
                }
            }
        },
        data() {
            return {
                hoverStatus:0,
                perData:null
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
            // this.judgeIsHover()
        },
        methods: {
            clickHandler(){
                this.perData = this.item
                this.perData.dtype = 1                   //从项目周报周报列表里转到详情的判断
                this.$store.commit("WeeklyDetalisData",this.perData)
            },
            //鼠标移入显示操作图标
            showOperationIcon(){
                this.hoverStatus=1
                this.$emit("hover",this.hoverStatus)
            },
            //鼠标离开显示操作图标
            hideOperationIcon(){
                this.hoverStatus=0
                this.$emit("hover",this.hoverStatus)
            },
            judgeIsHover(){
                if(this.item.status == 0 ||this.item.status == 2){
                    this.ishoverOrNot = true
                }else{
                    this.ishoverOrNot = false
                }
            }
        }
    }
</script>

<style scoped>
    .every-WeeklyList-modules{
        color: #fff;
        width: 140px;
        height: 170px;
        background: url('../../assets/img/business_weekly_bg.png') no-repeat center;
        background-size: 100% 100%;
        position: relative;
        cursor: pointer;

        margin-top: 20px;
        margin-bottom: 36px;
        padding: 33px 20px 20px ;
    }
    .every-WeeklyList-modules.active{

    }
    .every-WeeklyList-modules:first-child{
        /*margin-top: 0;*/
    }
    .list-modules-weekly{
        margin-top: 25px;
        color: #333;
        font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
        font-size: 20px;
        line-height: 1.5;
        margin-bottom: 10px;
    }
    .list-modules-time{
        color: #939393;
        font-size: 12px;
    }
    .examine-status{
        font-size: 14px;
        font-family: PingFangSC-Regular;
        position: absolute;
        bottom: 20px;
        left: 20px;
    }
    .auditing{
        color: #939393;
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
    .every-WeeklyList-modules.active{
        background: url('../../assets/img/business_weekly_bg-active.png') no-repeat center;
        background-size: 100% 100%;
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
</style>