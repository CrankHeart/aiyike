<template>
	<div class="ProjectData-wrap">
		<section class="layout-list">
			<el-form :model="ruleForm" ref="ruleForm" :label-position="labelPosition" label-width="68px" class="demo-ruleForm clearfix">
				<el-form-item label="项目名称:" prop="projectName" class="fl">
					<el-select v-model="ruleForm.projectName" placeholder="请选择或输入" class="fr" style="width: 190px;" v-sicon1 @change="getProjectName">
						<el-option v-for="item in projectOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
				</el-form-item>
				<el-form-item class="fr">
					<el-button type="primary" @click="searchProject" class="search-btn">搜索</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData" style="width: 100%" class="tablePadd20">
				<el-table-column prop="itemName" label="项目名称">
				</el-table-column>
				<el-table-column prop="baName" align="left" label="商务经理">
				</el-table-column>
				<el-table-column prop="comName" align="left" label="客户公司">
				</el-table-column>
				<el-table-column prop="yamount" align="left" label="已收款 (元)">
				</el-table-column>
				<el-table-column prop="damount" align="left" label="待收款 (元)">
					<template slot-scope="props">
						<span class="receivables">{{props.row.damount}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="dpayAmount" align="center" label="待付款 (元)">
					<template slot-scope="props">
						<span class="pending-payment">{{props.row.dpayAmount}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="nextPayDate" align="left" label="下一笔付款日期">
				</el-table-column>
			</el-table>
			
			<el-pagination class="ui-cpagina" small @current-change="pageChange" :current-page="pagination.curPage" :page-size="pagination.pageSize" layout="total,prev,pager,next,jumper" :total="pagination.total">
			</el-pagination>
		</section>
	</div>
</template>
<script>
import { bus } from "@/utils/bus";

export default {
  name: "",
  data() {
    return {
      projectOptions: [],
      labelPosition: "left",
      ruleForm: {
        name: ""
      },
      pagination: {
        total: 0,
        pagesize: 0,
        curPage: 1
      },
      tableData: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getProjectData();
      this.getAllProject();
    });
  },
  created() {
    bus.$on("projectEvent", this.getProjectData);
    bus.$on("switchProjectEvent", this.getProjectData);
  },
  components: {
    bus
  },
  methods: {
    search() {},
    pageChange(val) {
      this.pagination.curPage = val;
      this.getProjectData();
    },
    getProjectData() {
      let data = {
        order: "DESC",
        curPage: this.pagination.curPage
      };
      this.$http
        .post("/api/itemData/list", data, {
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
    getAllProject() {
      this.$http
        .post("/api/item/normalItem", {
          emulateJSON: true
        })
        .then(res => {
          this.projectOptions = res.data.result;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getProjectName(val){
      this.searchProjectName=val;
    },
    searchProject(){
      let data = {
        itemId:this.searchProjectName
      };
      this.$http
        .post("/api/itemData/list",data, {
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
.ProjectData-wrap {
}

.search-btn {
  width: 90px;
  height: 30px;
  line-height: 0.66;
}

.receivables {
  color: #1abf69;
}

.pending-payment {
  color: #ee5a5a;
}

.pagination {
  margin-top: 15px;
}
</style>