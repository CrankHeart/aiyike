<template>
    <div class="wrap container">
        <div class="tab">
            <a href="#" onClick="javascript :history.go(-1);">
                <i class="el-icon-arrow-left"></i><span class="tab-item">返回</span>
            </a>
        </div>
        <div class="content-wrap clearfix">

            <component :is="leftview" class="details_left"></component>
            <!--<already-cp-details-right></already-cp-details-right>-->
            <component :is="rightview" class="details_right"></component>
        </div>
    </div>
</template>

<script>
    let VP_Left_Modules = () =>
        import('@/modules/Console_left/VP_Left_Modules.vue')
    let AlreadyCpDetailsRight = () =>
        import('@/modules/Out/OutItemMgtDetails_Right/OutItemMgtDetails_Right.vue')
    export default {
        name: '',
        data() {
            return {
                leftview: VP_Left_Modules,
                rightview: AlreadyCpDetailsRight
            };
        },
        components: {
            VP_Left_Modules,
            AlreadyCpDetailsRight
        },
        methods: {

        }
    }
</script>

<style scoped>
    .tab{
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        color: #000;
        cursor: pointer;
        border-bottom: 1px solid #D5D5D5;
    }
    .tab-item{
        display: inline-block;
        margin-left: 6px;
        font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
    }
    .content-wrap{
        height: calc(100% - 61px);
        padding: 25px 0;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        position: relative;
    }

    .details_left {
        float: left;
    }

    .details_right {
        margin-left: 374px;
    }
</style>