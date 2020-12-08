<!--项目管理-项目详情页-操作日志模块-->
<template>
	<div class="operation_record">
		<div class="operation clearfix" v-for="(item, oindex) in listData">
			<div class="operation_time">
				<p class="date">{{item[0]._month}}/{{item[0]._day}}</p>
				<p class="year">{{item[0]._year}}</p>
			</div>
			<div class="operation_con">
				<ul>
					<li v-for="(sitem, inindex) in item">
						<dl class="operdl">
							<dt>{{sitem._hours}}:{{sitem._minute}}</dt>
							<dd>
								<span class="opcon">{{sitem.title | nullformat}}。</span>
								<!--<p class="remark">备注：</p>-->
							</dd>
						</dl>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "Operation_Record",
  props: {
    type: {
      type: String,
      default: function() {
        return "1";
      }
    },
  },
  data() {
    return {
      listData: []
    };
  },
  components: {},
  mounted() {
    this.obtainListDataSource();
  },
  methods: {
    obtainListDataSource() {
      let ucId = this.$store.getters.loginInfo.uc.id;
      let outName = this.$store.getters.loginInfo.roleList[0].code;
      if(outName !== 'out'){
        this.$http
          .post(
            "/api/action/ItemRecordByIdDetail",
            {
              itemId: parseInt(this.$route.params.id.split("-")[0]),
              type: this.type
            },
            {
              emulateJSON: true
            }
          )
          .then(res => {
            if (res.data.success) {
              let ret = res.data.result;
              this.listData = this.sortListDataSource(ret);
            }
          })
          .catch(err => {});
      }else{
           this.$http
          .post(
            "/api/action/ItemRecordOutByDetail",
            {
              itemId: parseInt(this.$route.params.id.split("-")[0]),
              ucId: ucId
            },
            {
              emulateJSON: true
            }
          )
          .then(res => {
            if (res.data.success) {
              let ret = res.data.result;
              this.listData = this.sortListDataSource(ret);
            }
          })
          .catch(err => {});
      }
    },
    add0ToString(str) {
      if (str < 10 && `${str}`.length == 1) {
        str = "0" + str;
      }
      return str;
    },
    sortListDataSource(ret) {
      let mapSg = {};
      let mapSort = [];
      let mapSortRet = [];
      for (let index in ret) {
        let timeObj = new Date(ret[index].createTime);
        let year = timeObj.getFullYear();
        let month = this.add0ToString(timeObj.getMonth() + 1);
        let day = this.add0ToString(timeObj.getDate());
        let hours = timeObj.getHours();
        let minute = this.add0ToString(timeObj.getMinutes());
        ret[index]._year = year;
        ret[index]._month = month;
        ret[index]._day = day;
        ret[index]._hours = hours;
        ret[index]._minute = minute;
        let key = year+month+day;
        if (!Array.isArray(mapSg[key])) {
          mapSg[key] = [];
          mapSort.push(key);
        }
        mapSg[key].push(ret[index]);
      }
      mapSort = mapSort.sort(function(a, b) {
        return b - a;
      });
      for (let i in mapSort) {
        let key = mapSort[i];
        mapSortRet.push(mapSg[key]);
      }
      return mapSortRet;
    }
  }
};
</script>

<style scoped>
.operation_con ul {
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 6px;
}

.operation_record {
  padding-top: 30px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.operation_record .operation {
  margin-bottom: 20px;
}

.operation_record .operation_time {
  width: 56px;
  margin-right: 20px;
  float: left;
}

.operation_record .operation_con {
  opacity: 0.88;
  background-color: #f8f9fb;
  margin-left: 76px;
}

.operation_record .operation_time .date {
  font-size: 18px;
  color: #333333;
  letter-spacing: 0;
  text-align: right;
}

.operation_record .operation_time .year {
  font-size: 12px;
  color: #3f3f3f;
  letter-spacing: 0;
  line-height: 25px;
  text-align: right;
}

.operation_record .operdl {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.operation_record .operdl dt {
  padding-left: 14px;
  margin-right: 20px;
  font-size: 12px;
  color: #333333;
  font-family: "PingFangSC-Medium", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
  letter-spacing: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.operation_record .operdl dd {
  font-size: 12px;
  color: #333333;
  letter-spacing: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.operation_record .operation_con ul li {
  margin-bottom: 8px;
}
.operation_record .operation_con ul li:nth-last-of-type(1) {
  margin-bottom: 0px;
}
.remark {
  font-size: 12px;
  color: #666666;
}
</style>