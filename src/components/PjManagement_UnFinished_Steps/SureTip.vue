<template>
    <div>
        <!--项目挂起/终止/结项-->
        <el-dialog  title="提示"  class="dialogSize-Hang" :visible.sync="dialogVisible">
            <div class="tip">{{currStepsTip}}，将不能修改信息！</div>
            <div class="btn">
                <el-button class="submitbtn" type="primary"  @click="confirmReject()">确定</el-button>
                <el-button class="cancelbtn" @click="cancelReject()">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export  default  {
        props: {
            visible: {
                type: Boolean
            },
            currStepsTip:{
                type:String,
                default(){
                    return '审核通过'
                }
            }
        },
        data()  {
            return  {
                dialogVisible: false
            }
        },
        watch:{
            visible(val){
                this.dialogVisible = val
            },
            dialogVisible(val){
                this.$emit('update:visible', val)
            }
        },
        mounted(){},
        methods:{
            confirmReject(){
                this.$emit('submit',true)
                this.$emit('update:visible',false)
            },
            cancelReject(){
                this.$emit('update:visible',false)
            }
        }

    };
</script>

<style>
    /*公用部分*/
    .dialogPosition  .el-dialog{
        top:  50%!important;
        transform:  translate(-50%,-50%);
    }
    .dialogPosition  .el-dialog__title  {
        font-size:  14px;
        color:  #000000;
        font-weight:  normal;
        font-family: PingFangSC-Semibold;
    }
    .el-dialog__footer{
        text-align:  center!important;
    }
    /*公用部分end*/


    .dialogSize-Hang  .el-dialog--small{
        width:  442px!important;
    }
    .tip{
        padding-top: 54px;
        padding-bottom: 64px;
        text-align: center;
    }
    .btn{
        text-align: center;
    }

</style>