<template>
	<div class="org-Percent">
		<el-date-picker  format="yyyy年全年" class="date-select"  align="right" type="year" placeholder="选择年"></el-date-picker>
		<p style="padding-top: 20px;">
		<el-row :gutter="20">
		  <el-col :span="12">
		  	<div class="grid-content bg-purple">
		  		<div class="p">
		  			<span class="f">组织架构专业占比</span>
		  		</div>
		  		<el-table
				    :data="tableData1"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="service"
				      label="后台开发"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="design"
				      label="设计"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="h5"
				      label="前端开发">
				    </el-table-column>
				     <el-table-column
				      prop="qu"
				      label="质量管理">
				    </el-table-column>
				     <el-table-column
				      prop="plan"
				      label="策划">
				    </el-table-column>
				     <el-table-column
				      prop="operate"
				      label="运营服务管理">
				    </el-table-column>
  				</el-table>
		  	</div>
		  </el-col>
		  <el-col :span="12">
		  		<div class="grid-content bg-purple">
		  			<span>项目专业利用率</span>
		  			<el-table
				    :data="tableData1"
				    border
				    style="width: 100%">
				    <el-table-column
				      prop="service"
				      label="后台开发"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="design"
				      label="设计"
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="h5"
				      label="前端开发">
				    </el-table-column>
				     <el-table-column
				      prop="qu"
				      label="质量管理">
				    </el-table-column>
				     <el-table-column
				      prop="plan"
				      label="策划">
				    </el-table-column>
				     <el-table-column
				      prop="operate"
				      label="运营服务管理">
				    </el-table-column>
  				</el-table>
		  		</div>
		  </el-col>
		</el-row>
		</p>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData1: [{
          service: '40%',
          design: '17%',
          h5: '23%',
          qu:'7%',
          plan:'10%',
          operate:'18%'
        }],
	    tableData2: [{
	      service: '40%',
	      design: '17%',
	      h5: '23%',
	      qu:'7%',
	      plan:'10%',
	      operate:'18%'
	    }]
      }
    }
  }
</script>

<style scoped>
   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>