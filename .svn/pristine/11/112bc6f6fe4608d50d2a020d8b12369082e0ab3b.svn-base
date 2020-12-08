<template>
    <div class="wrap container">
        <div class="backToPre" @click="goBackToContent()"><i class="el-icon-arrow-left"></i><span class="return">返回</span></div>
        <div class="weekly-container clearfix">
            <div class="fl weekly-container-left">
    			<weekly-list :weeklyList="weeklyList"></weekly-list>
            </div>
            <div class="weekly-container-right">
        		<component :is = 'showRightContent' :rightWeeklyList = "rightWeeklyList"></component>
            </div>
        </div>

    </div>
</template>

<script>
    let WeeklyList = function(resolve) {
        require(['@/modules/week/WeeklyListM'], resolve);
    }
    let WeeklyContentProjectM = function(resolve) {
        require(['@/modules/week/WeeklyContent_ProjectM'], resolve);
    }
    let WeeklyDetailsComponentsD = function(resolve) {          //部门周报详情
        require(['@/modules/week/WeeklyDetailsComponentsD'], resolve);
    }
    let WeeklyDetailsComponentsP = function(resolve) {          //项目周报详情
        require(['@/modules/week/WeeklyDetailsComponentsP'], resolve);
    }


    let routeFrom = null
    export default {
        beforeRouteEnter (to, from, next) {
            routeFrom = from
            next()
        },
        name: '',
        data() {
            return {
                dataList: JSON.parse(Cache.local(Config.Login)),
                path:'',
                whetherMy:false,
                whetherSearch:false,            //是否查询页面跳转到详情页
                showRightContent:'',
                state:this.$store.state,
                weeklyList:[],
                rightWeeklyList: [],
                jumpStatus:null,
                cacheListData:{}               //使用代理模式缓存数据
            }
        },
        components: {
            WeeklyList,
            WeeklyContentProjectM,
            WeeklyDetailsComponentsD,
            WeeklyDetailsComponentsP
        },
        mounted: function() {
            if (routeFrom.path == '/') {
                this.$router.go(-1)
            }
            this.jumpStatus = this.$route.query.jumpstatus
            this.judgeRightContent()

        },
        watch:{
            "state.WeeklyDetalisData":{
                handler(val,oldVal){
                    if(val.category == 1){
                        this.showRightContent = WeeklyContentProjectM
                        this.rightWeeklyList = val
                    }else if(val.category == 2){
                        this.showRightContent = WeeklyDetailsComponentsD
                        this.rightWeeklyList = val
                    }else if(val.dtype){            //dtype判断项目周报详情列表转到他的转详情
                        this.showRightContent = WeeklyDetailsComponentsP
                        this.rightWeeklyList = val
                        delete this.$store.getters.WeeklyDetalisData.dtype
                    }
                },
                deep:true
            }
        },
        methods: {
            judgeRightContent(){
                let val = this.$store.getters.WeeklyDetalisData
                if(!val){
                    return
                }
                if(val.category == 1){
                    this.showRightContent = WeeklyContentProjectM
                    this.rightWeeklyList = val
                }else if(val.category == 2){
                    this.showRightContent = WeeklyDetailsComponentsD
                    this.rightWeeklyList = val
                }else if(val.dtype){
                    this.showRightContent = WeeklyDetailsComponentsP
                    this.rightWeeklyList = val
                    delete this.$store.getters.WeeklyDetalisData.dtype
                }
            },
            goBackToContent(){
                switch (routeFrom.path){
                    case '/':
                        this.$router.push('/weeklymanagement')
                        break
                    case '/weeklymanagement/my':
                        this.$router.push('/weeklymanagement/my')
                        break
                    case '/weeklymanagement/omy':
                        this.$router.push('/weeklymanagement/omy')
                        break
                }
            }
        }
    }
</script>

<style scoped>
    .wrap{
        background: #f8f9fb;
    }
    .backToPre{
    	margin-left: 28px;
    	margin-right: 28px;
        font-size: 18px;
        height: 60px;
        line-height: 60px;
        color: #333;
        border-bottom: 1px solid #F1F2F3;
        cursor: pointer;
    }
    .backToPre i{
        margin-right: 5px;
    }
    .weekly-container{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding-top: 81px;
        margin-top: -61px;
        padding-left: 28px;
        padding-right: 28px;
    }
    .weekly-container-left{
        width: 242px;
        height: 100%;
        padding-right: 20px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .weekly-container-right{
        width: auto;
        margin-left: 242px;
        height: 100%;
        background-color: #F8F9FB;
        padding: 0 0 0 0;
		box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .return{
    	font-family: "PingFangSC-Medium","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
    }
</style>