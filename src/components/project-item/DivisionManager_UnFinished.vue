<template>
	<div >
		<el-row :gutter="24">
			<el-col :span="24" class="col-mb">
				<ul v-for="item in projectList" :key="item.id" class="uncompletTem clearfix el-col-12" @click="click">
					<li class="temLeft">
						<p class="percent"><span class="percentNum">{{ (item.ph/item.totalHours1*100).toFixed(0) | nullformat }}</span><span class="percentUnit"> %</span></p>
						<span class="percentTxt">项目进度</span>
					</li>
					<li class="temRight">
						<p class="projectTitle">{{item.name}}</p>
						<div class="clearfix textLeft">
							<div class="fl">
								<p class="projectItem">项目经理</p>
								<p class="font16">{{item.manager}}</p>
							</div>
							<div class="fl margR">
								<p class="projectItem">剩余实施额度</p>
								<p class="font16">{{item.balance1}}<span class="tian">元</span></p>
							</div>
						</div>
					</li>
				</ul>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
  name: "UnFinished",
  data() {
    return {
      projectList: []
    };
  },
  mounted() {
    this.getProjectProgressStatistics();
  },
  methods: {
    click() {

    //   this.$router.push("/businessaffairs/pj/details");
    //   this.$store.commit("setPjManageUnFinishedSwitchState", true);
    //   this.$router.push("/businessaffairs/pj/unproject");
    },
    getProjectProgressStatistics() {
      let data = {
        curpage: 0
      };
      this.$http
        .post("/api/item/searchItemUnByDepart", data, {
          emulateJSON: true
        })
        .then(res => {
          let dataList = res.data.result.content
          this.projectList = dataList;
          this.loading = false;
        })
        .catch(err => {
          this.$message({
            customClass: "error",
            customClass: "error",
            message: err.data.message
          });
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.uncompletTem {
  padding: 43px 37px 43px 37px;
  background: #ffffff;
}

.uncompletTem li {
  float: left;
}

.temLeft {
  width: 91.5px;
  height: 74px;
  padding-top: 20px;
  text-align: center;
  box-sizing: border-box;
  font-size: 13px;
  background: url(../../assets/img/folder.png) no-repeat;
  background-size: 100% 100%;
}

.temRight {
  margin-left: 25px;
  color: #333333;
  min-width: 170px;
}

.percent {
  color: #ffffff;
}

.percent .percentNum {
  font-size: 20px;
}

.percent .percentUnit {
  font-size: 18px;
}

.percentTxt {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  display: inline-block;
  transform: scale(0.833);
}

.projectTitle {
  font-size: 16px;
  color: #000000;
  margin-bottom: 16px;
  font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
}

.projectItem {
  font-size: 12px;
  transform: scale(0.8333);
  transform-origin: left;
  color: #999999;
  margin-bottom: 5px;
}

.textLeft {
  text-align: left;
}

.font16 {
  font-size: 14px;
  color: #333333;
  font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
}

.tian {
  font-size: 14px;
  font-weight: normal;
  margin-left: 3px;
}

.margR {
  margin-left: 50px;
}
</style>