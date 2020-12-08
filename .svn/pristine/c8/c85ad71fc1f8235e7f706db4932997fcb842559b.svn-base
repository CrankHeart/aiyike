<template>
    <div>
        <!--项目挂起/终止/结项-->
        <el-dialog  title="驳回"  class="dialogSize-Hang" :visible.sync="dialogVisible">
            <p  class="hang-title">驳回原因</p>
            <el-form ref="rejectForm" :model="rejectForm" label-width="0">
                <el-form-item
                        prop="reason"
                        :rules="[
                  { required: true, message: '驳回原因不能为空'}
                ]">
                    <el-input type="textarea"  placeholder="请填写项目驳回原因" :maxlength="200" v-model="rejectForm.reason"></el-input>
                </el-form-item>
            </el-form>
            <!--<textarea  class="hangtext"  placeholder="请填写项目驳回原因"  v-model="rejectForm.reason"></textarea>-->
            <span  slot="footer"  class="dialog-footer">
        <el-button class="submitbtn" type="primary"  @click="confirmReject('rejectForm')">确定</el-button>
        <el-button class="cancelbtn" @click="cancelReject('rejectForm')">取消</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    export  default  {
        props: {
            visible: {
                type: Boolean
            }
        },
        data()  {
            return  {
            	isPass:"N",
                dialogVisible: false,
                self:'',
                rejectForm:{
                    reason:""
                },
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
        mounted(){
            this.self = this
        },
        methods:{
            //确定驳回
            confirmReject(formName){
                this.self.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('update:visible', false)
                        this.$emit('rejectCreate',this.rejectForm.reason)
                    } else {
                        return false;
                    }
                });

            },
            //取消驳回
            cancelReject(formName){
                this.$refs[formName].resetFields();
                this.$emit('update:visible', false)
                this.$router.go(-1)
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
        font-size:  16px;
        color:  #000000;
        font-weight:  normal;
    }
    .el-dialog__footer{
        text-align:  center!important;
    }
    /*公用部分end*/


    /*项目挂起*/
    .hang-title  {
        font-size:  12px;
        color:  #000000;
        margin-bottom:  10px;
    }
    textarea.hangtext  {
        display:  block;
        padding:  5px;
        border:  1px  solid  #eee;
        width:  100%!important;
        height:  80px!important;
        font-size:  12px;
        line-height:  20px;
        resize:  none;
    }
    .dialogSize-Hang  .el-dialog--small{
        width:  442px!important;
    }

    /*项目挂起end*/

</style>