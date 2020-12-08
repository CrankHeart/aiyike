<template>
	<div class="roleconfig">
		<div class="backbg">
			<div class="roletitle">角色配置</div>
			<el-form :model="roleConfigForm" ref="roleConfigForm" label-width="65px" class="roleConfigForm">
			  <el-form-item
			    v-for="(item, index) in roleConfigForm.roles"
			    :label="'角色' + (index+1)"
			    :key="item.key"
			    :prop="'roles.' + index + '.value'"
			    :rules="{
			      required: true, message: '域名不能为空', trigger: 'blur'
			    }"
			  >
			    <el-input v-model="item.role"></el-input>
			    <el-button @click="editResource(item)" type="text" size="small" class="editresource">权限设置</el-button>
			    <i class="el-icon-delete" @click.prevent="removeDomain(item)"></i>
			  </el-form-item>
			  <el-form>
			  	<el-button @click="addDomain" class="addRolebtn"> + 添加一个角色</el-button>
			  </el-form>
			  <el-form-item class="bottom">
			    <el-button type="primary" @click="submitForm('roleConfigForm')"class="submitbtn">提交</el-button>
			    <el-button type="primary" @click="resetForm('roleConfigForm')" class="submitbtn">重置</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<!--权限设置弹框-->
		<el-dialog class="dialog442" title="编辑权限" :visible.sync="editResourceDialog" :modal="true" :close-on-click-modal="false">
			<zTree ref="ztree" :id="ztreeId" :list="pList"></zTree>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editResourceDialog = false" class="cancelbtn">取消</el-button>
				<el-button type="primary" @click="editResourceSubmit" class="submitbtn">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import zTree from "@/components/tree/zTree.vue"
	export default {
		name: 'roleconfig',
	    data() {
	      return {
	      	editResourceDialog: false,
	        roleConfigForm: {
	          roles: [{
	            role: ''
	          }]
	        }
	      };
	    },
	    components:{
	    	zTree
	    },
	    methods: {
	      submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            alert('submit!');
	          } else {
	            ;
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      },
	      removeDomain(item) {
	        var index = this.roleConfigForm.roles.indexOf(item)
	        if (index !== -1) {
	          this.roleConfigForm.roles.splice(index, 1)
	        }
	      },
	      addDomain() {
	        this.roleConfigForm.roles.push({
	          role: '',
	          key: Date.now()
	        });
	      },
	      editResource(){
	      	this.editResourceDialog = true;
	      },
	      editResourceSubmit(){
	      	this.editResourceDialog = false;
	      }
	    }
	}
</script>

<style scoped>
.backbg{
	width: 825px;
	height: 723px;
	background: url(../../assets/img/page.png) no-repeat;
	background-size: 825px 723px;
	padding-left: 10px;
	padding-right: 20px;
	margin: 0 auto;
}
.roletitle{
	font-family: "PingFangSC-Semibold","Microsoft YaHei", Arial, Helvetica, sans-serif, "SimSun";
	font-size: 14px;
	color: #000000;
	letter-spacing: 0;
}
.editresource{
	font-size: 12px;
	color: #295DCF;
	letter-spacing: 0;
	margin-left: 36px;
	margin-right: 36px;
}
.el-icon-delete{
	color: #999;
	cursor: pointer;
}
.addRolebtn{
	background: #FFFFFF;
	border: 1px solid #F1F1F1;
	border-radius: 2px;
	font-size: 12px;
	color: #D0D0D0;
	letter-spacing: 0;
	margin-left: 65px;
}
.bottom{
	text-align: right;
	margin-top: 30px;
}
</style>