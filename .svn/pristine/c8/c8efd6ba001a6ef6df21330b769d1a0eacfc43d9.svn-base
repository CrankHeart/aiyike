<template>
    <div class="every-WeeklyList-modules" @click="clickHandler()" @mouseenter="ishoverOrNot && showOperationIcon()" @mouseleave="ishoverOrNot && hideOperationIcon()">
        <div class="list-modules-title">周报</div>
        <p class="list-modules-weekly">{{item.itemName}}</p>
        <!--<div class="list-modules-time">{{item.createTime | fmtDate}}</div>-->
        <div class="list-modules-time">{{item.monthCode}}月第{{item.num | n2cformat}}周</div>
        <!--<div class="Recently-submitted">-->
        <!--<span class="submitted-tip">最近提交</span>-->
        <!--<span class="submitted-time">{{item.createTime}}</span>-->
        <!--</div>-->
        <div class="examine-status not-audited" v-if="!item.status">未审核</div>
        <div class="examine-status auditing" v-else-if="item.status==1">审批中</div>
        <div class="examine-status rejected" v-else-if="item.status==2">已驳回</div>
        <div class="examine-status audited" v-else-if="item.status==3">已审核</div>
        <!--<slot name = "operation" v-if="hoverStatus==1"></slot>-->
    </div>
</template>

<script>
    export default {
        name: '',
        props: {
            item:{
                type: Object,
                required: true
            }
        },
        data() {
            return {
                ishoverOrNot:true,  //鼠标移入是否有编辑删除按钮
                hoverStatus:0
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
            this.judgeIsHover()
        },
        methods: {
            clickHandler(){
                this.$store.commit("WeeklyDetalisData",this.item)
            },
            //鼠标移入显示操作图标
            showOperationIcon(){
                // this.hoverStatus=1;
                this.$emit("hover",this.hoverStatus);
            },
            //鼠标离开显示操作图标
            hideOperationIcon(){
                // this.hoverStatus=0;
                this.$emit("hover",this.hoverStatus);
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
        height: 220px;
        background: url('../../assets/img/project_paper_bg.png') no-repeat center;
        background-size: 100% 100%;
        position: relative;
        cursor: pointer;

        margin-top: 20px;
        padding: 33px 20px 20px ;
    }
    .every-WeeklyList-modules.active{

    }
    .every-WeeklyList-modules:first-child{
        margin-top: 0;
    }
    .list-modules-title{
        color: #FFCB4C;
        font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
        border: 1px solid #FFCB4C;
        width: 38px;
        text-align: center;
        font-size: 12px;
        margin-bottom: 10px;
        margin-top: 15px;
    }
    .list-modules-weekly{
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
        color: #2c5fcf;
    }
    .not-audited{
        color: #939393;
    }
    .rejected{
        color: #EF7777;
    }
    .every-WeeklyList-modules.active{
        background: url('../../assets/img/project_paper_bg-active.png') no-repeat center;
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