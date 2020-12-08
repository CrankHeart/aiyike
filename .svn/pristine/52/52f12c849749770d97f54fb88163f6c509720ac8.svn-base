<template>
    <div class="IndexData-wrap">
       <section class="layout-list">
       	 <div class="select-wrap clearfix">
            <el-select v-model="years" placeholder="请选择" class="fr" style="width: 80px;" v-sicon1 @change="searchYearData">
                <el-option
                        v-for="item in yearOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%" class="tablePadd20">
            <el-table-column
                    prop="year"
                    align="left"
                    label="年份">
            </el-table-column>
            <el-table-column
                    prop="month"
                    align="left"
                    label="月份">
            </el-table-column>
            <el-table-column
                    prop="amount"
                    align="left"
                    label="平均单人指标 (元)">
            </el-table-column>
        </el-table>
        
        <el-pagination class="ui-cpagina" small @current-change="pageChange" :current-page="pagination.curPage" :page-size="pagination.pageSize" layout="total,prev,pager,next,jumper" :total="pagination.total">
			</el-pagination>
       </section>
    </div>
</template>
<script>
import { bus } from "@/utils/bus.js";

export default {
  name: "",
  data() {
    return {
      labelPosition: "left",
      years: "",
      pagination: {
        total: 0,
        pagesize: 0,
        curPage: 1
      },
      yearOptions: (() => {
        var arr = [];
        for (var i = 1970; i <= 2060; i++) {
          arr.push({
            value: i,
            label: i
          });
        }
        return arr;
      })(),
      currentPage3: 5,
      tableData: []
    };
  },
  mounted() {
    var myDate = new Date();
    this.years = myDate.getFullYear();
    this.$nextTick(() => {
      this.getIndexData();
    });
  },
  created() {
    bus.$on("indexEvent", this.getIndexData);
    bus.$on("switchIndexEvent", this.getIndexData);
  },
  components: {
    bus
  },
  methods: {
    getIndexData() {
      let data = {
        order: "DESC",
        curPage: this.pagination.curPage
      };
      this.$http
        .post("/api/quota/list", data, {
          emulateJSON: true
        })
        .then(res => {
          this.tableData = res.data.result.content;
          this.pagination.total = res.data.result.total;
          this.pagination.pageSize = res.data.result.helper.pageSize;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    pageChange(val) {
      this.pagination.curPage = val;
      this.getIndexData();
    },
    searchYearData(val) {
      let data = {
        year: val
      };
      this.$http
        .post("/api/quota/list", data, {
          emulateJSON: true
        })
        .then(res => {
          this.tableData = res.data.result.content;
          this.pagination.total = res.data.result.total;
          this.pagination.pageSize = res.data.result.helper.pageSize;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.IndexData-wrap {
}
.select-wrap {
  margin-bottom: 15px;
}
.pagination {
  margin-top: 15px;
}
</style>