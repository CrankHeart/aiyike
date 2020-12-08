<template>
    <div class="WeeklyList" ref="weeklylist">
    	<herghost-scroll ref="hgscroll" :success="scrollLoadSuc" :options="{
				paddingLeft: '0px',
				paddingRight: '0px',
			}">
    		<ul class="WeeklyList-content">
                <template  v-for="(item,key) in weeklyList">
                    <li
                            is="project-weekly"
                            v-if="item.category == 1"
                            :key="key" :item="item"
                            :class="[key==activeIndex?'active':'']"
                            :ishoverOrNot = 'false'
                            ref="weekly"
                            @click.native="checkWeekly(key,item)"></li>
                    <li
                            is="business-weekly"
                            v-if="item.category == 2"
                            :key="key" :item="item"
                            :class="[key==activeIndex?'active':'']"
                            :ishoverOrNot = 'false'
                            ref="weekly"
                            @click.native="checkWeekly(key,item)"></li>
                </template>
            </ul>
    	</herghost-scroll>
    </div>
</template>

<script>
    import ProjectWeekly from '@/components/weekly-component/ProjectWeekly'
    import BusinessWeekly  from '@/components/weekly-component/BusinessWeekly'
    let HerGhostScroll = () => import('@/components/scroll/HerGhostScroll.vue')
    
    export default {
        data(){
            return {
                dataList: JSON.parse(Cache.local(Config.Login)),
                state:this.$store.state,
                sendData:null,
                weeklyList:[],
                isNotAuditJump:false,
                activeIndex:null,
                siwtchData:null,         //列表中每一个点击请求到的内容 获取之后传递到右侧的WeeklyContent_DivisionManager组件映射,使用非父子间通信
                jumpStatus:null
            }
        },
        components:{
            BusinessWeekly,
            ProjectWeekly,
            'herghost-scroll' : HerGhostScroll,
        },
        watch:{},
        mounted(){
            this.sendData = {               //左侧数据
                loginId:this.dataList.uc.id
            }
            this.getSearchData()
        },
        methods:{
            getSearchData(){
                let searchListdata = this.$store.state.searchWeeklyList
                if(Array.isArray(searchListdata)&&searchListdata.length>0){
                    this.weeklyList = searchListdata
                    return
                }
                this.$http.post('/api/week/query', this.sendData, {
                    emulateJSON: true
                })
                    .then((res) => {
                        var data = res.data;
                        if(data.success) {
                            this.weeklyList = !!data.result.content?data.result.content:[]
                            this.$nextTick(()=>{
                                if(!this.activeIndex&&this.activeIndex != 0){
                                    this.resetActiveKey()
                                }
                            })
                        }
                    }).catch((err) => {

                })
            },
        	scrollLoadSuc() {
        		this.getLeftActiveKey()
        	},
            getLeftActiveKey(){
                this.activeIndex = this.state.lookUpWeeklyActiveKey
                if(!this.activeIndex&&this.activeIndex != 0){
                    this.resetActiveKey()
                }
                this.judgeWeeklyListTop(this.activeIndex)
            },
            //周报审核部分跳转,无法判断列表中第几个元素是active,根据id判断重置index
            resetActiveKey(){
                let id = this.$route.query.id
                this.weeklyList.forEach((item, index)=>{
                    if(item.id == id){
                        this.activeIndex = index
                        this.$store.commit("WeeklyDetalisData",item)
                        this.$nextTick(()=>{
                            this.judgeWeeklyListTop(this.activeIndex)
                        })
                        return
                    }
                })
            },
            checkWeekly(index,data){
                this.activeIndex = index
                this.$store.commit('wiListData',null)
                this.$router.push({path:`/weeklymanagement/weeklys`, query: {id:data.id,jumpstatus: this.$route.query.jumpstatus}})
                this.$store.commit("WeeklyDetalisData",data)
                this.$store.commit("leftWeeklyList",true)
            },
            //跳转过来时该周报距离顶部的位置
            judgeWeeklyListTop(index){
                let height = 273
                let top = (index-1)*(height+20)
                let _self = this
                let tempInterval = requestAnimationFrame(function fn(){
                    if (
                        Array.isArray(_self.$refs.weekly) &&
                        Array.isArray(_self.weeklyList) &&
                        _self.$refs.weekly.length &&
                        _self.weeklyList.length &&
                        _self.$refs.weekly.length == _self.weeklyList.length
                    ) {
                        cancelAnimationFrame(tempInterval)
                        _self.$refs.hgscroll.scrollContent(top, false, true)
                    }else{
                        tempInterval = requestAnimationFrame(fn)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .WeeklyList{
        height: 100%;
        background-color: #fff;
    }
    .WeeklyList-content{
        padding:24px;
        padding-left: 20px;
        width: 180px;
    }
</style>