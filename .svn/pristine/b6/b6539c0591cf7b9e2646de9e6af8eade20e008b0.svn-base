<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!--查询表单-->
		<el-form :inline="true" :model="searchParam" ref="ruleForm" class="ui-demo-form-inline">
			<el-form-item label="姓名:" prop="chName">
				<template>
					<el-select v-model="searchParam.chName" filterable placeholder="请选择">
						<el-option v-for="item in chNames" :key="item.name" :label="item.chName" :value="item.chName">
						</el-option>
					</el-select>
				</template>
			</el-form-item>
			<el-form-item label="工号:" prop="jobNum">
				<el-input v-model="searchParam.jobNum" placeholder="工号"></el-input>
			</el-form-item>
			<el-form-item label="所在部门:" prop="departId">
				<el-cascader :options="data" v-model="selectedOptions" @change="handleChange1">
				</el-cascader>
				<!--<template>
					<el-select v-model="searchParam.departId" placeholder="请选择">
						<el-option v-for="item in departs" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
						
					</el-select>
				</template>-->
			</el-form-item>
			<el-form-item label="所在岗位:" prop="stationId">
				<template>
					<el-select v-model="searchParam.stationId" placeholder="请选择">
						<el-option v-for="item in stations" :key="item.value" :label="item.stationName" :value="item.stationId">
						</el-option>
					</el-select>
				</template>

			</el-form-item>

			<el-form-item label="在职状态:" prop="jobStatus">
				<template>
					<el-select v-model="searchParam.jobStatus" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</template>

			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="searchBtn" class="searchbtn" icon="search"></el-button>
				<el-button type="primary" class="submitbtn" @click="resetForm('ruleForm')">重置</el-button>
				<!--
          	 dmary" @click="roleAddDialogFormVisible=true" class="el-page-add">添加<i class="el-icon-plus el-icon--right"></i></el-button>-->
			</el-form-item>
		</el-form>
		<el-button type="primary" class="add" @click="paddholiday">假期设置<i class="el-icon-plus el-icon--right"></i></el-button>
		<el-button type="primary" class="add" @click="paddstatus">员工状态设置<i class="el-icon-plus el-icon--right"></i></el-button>
		<el-button type="primary" class="add" @click="padd">添加<i class="el-icon-plus el-icon--right"></i></el-button>
		<el-table ref="table" :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中" element-loading.customClass="aaaaa" @sort-change="sortchange">
			<el-table-column prop="id" label="ID" width="">
			</el-table-column>
			<el-table-column sortable prop="chName" label="姓名" width="">
			</el-table-column>
			<el-table-column prop="enName" label="英文名" width="">
			</el-table-column>
			<el-table-column prop="jobNum" label="工号" width="">
			</el-table-column>
			<el-table-column prop="depart" label="部门" width="">
			</el-table-column>
			<el-table-column prop="gender" label="性别" :formatter="gender" width="">
			</el-table-column>
			<el-table-column prop="email" label="电子邮箱" width="">
			</el-table-column>
			<el-table-column prop="phone" label="手机号码" width="">
			</el-table-column>
			<el-table-column prop="status" label="员工状态" :formatter="status">
			</el-table-column>
			<el-table-column prop="jobStatus" label="在职状态" :formatter="jobStatuss">
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handlerSee(scope.row)" type="text" size="small">查看</el-button>
					<el-button type="text" size="small" @click="update(scope.row)">编辑</el-button>
					<el-button type="text" size="small" @click="deleteBtn(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<br />
		<!--分页-->
		<el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.curPage" :page-size="pagination.pagesize" layout="total, prev, pager, next, jumper" :total="pagination.total">
		</el-pagination>



	<el-dialog title="假期设置" :visible.sync="addholiday_dialog" close-on-press-escape :modal="true">
			<el-form :model="form" label-width="70px" ref="form" >
											
				   <el-form-item label="起止日期:" class="clearfix" required>
                <div class="fl">
                    <el-form-item prop="date1" style="margin-bottom: 0">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 119px;"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="line fl" style="width: 20px; text-align: center">-</div>
                <div class="fl">
                    <el-form-item prop="date2" style="margin-bottom: 0">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 119px;"></el-date-picker>
                    </el-form-item>
                </div>
           </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addholiday_dialog = false">取 消</el-button>
				<el-button type="primary" @click="addholiday">保存</el-button>
			</div>
		</el-dialog>
		
			<el-dialog title="员工状态设置" :visible.sync="addstatus_dialog" close-on-press-escape :modal="true">
			<el-form :model="form" label-width="70px" ref="form" >
											
				   <el-form-item label="起止日期:" class="clearfix" required>
                <div class="fl">
                    <el-form-item prop="date1" style="margin-bottom: 0">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 119px;"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="line fl" style="width: 20px; text-align: center">-</div>
                <div class="fl">
                    <el-form-item prop="date2" style="margin-bottom: 0">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 119px;"></el-date-picker>
                    </el-form-item>
                </div>
           </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addstatus_dialog = false">取 消</el-button>
				<el-button type="primary" @click="addstatus">保存</el-button>
			</div>
		</el-dialog> 

		<!--员工详情-->
		<el-dialog title="详情" :visible.sync="detail_dialog" close-on-press-escape :modal="true">
			<el-form :model="form" label-width="80px">
				<el-form-item label="工号：" :label-width="formLabelWidth">
					<el-input v-model="form.jobNum" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="初始密码：" :label-width="formLabelWidth">
					<el-input v-model="form.password" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="用户名：" :label-width="formLabelWidth">
					<el-input v-model="form.userName" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="所属部门：" :label-width="formLabelWidth">
					<el-input v-model="form.depart" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="拥有岗位：" :label-width="formLabelWidth">
					<el-input v-model="form.station" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="拥有角色：" :label-width="formLabelWidth">
					<template>
						<el-select v-model="form.roleIds" placeholder="请选择" multiple :disabled="true">
							<el-option v-for="item in roleIds" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</template>
					<!--<el-input v-model="form.role" auto-complete="off" :readonly="false"></el-input>-->
				</el-form-item>
				<!--<el-form-item label="拥有角色：" :label-width="formLabelWidth">
					<el-input v-model="form.role" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>-->
				<el-form-item label="员工状态：" :label-width="formLabelWidth">
					<el-input v-model="form.statusName" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>

				<el-form-item label="是否允许登录：" :label-width="formLabelWidth">
					<el-input v-model="form.isLogin" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="姓名：" :label-width="formLabelWidth">
					<el-input v-model="form.chName" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="英文名：" :label-width="formLabelWidth">
					<el-input v-model="form.enName" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="出生日期：" :label-width="formLabelWidth">
					<el-input v-model="form.birthTime" auto-complete="off" :readonly="true" :formatter="gender"></el-input>
				</el-form-item>
				<el-form-item label="性别：" :label-width="formLabelWidth">
					<el-input v-model="form.genderName" auto-complete="off" :readonly="true" :formatter="gender"></el-input>
				</el-form-item>
				<el-form-item label="工资：" :label-width="formLabelWidth">
					<el-input v-model="form.salary" auto-complete="off" :readonly="true" :formatter="gender"></el-input>
				</el-form-item>
				<el-form-item label="p级：" :label-width="formLabelWidth">
					<el-input v-model="form.busRank" auto-complete="off" :readonly="true" :formatter="gender"></el-input>
				</el-form-item>
				<el-form-item label="公司邮箱：" :label-width="formLabelWidth">
					<el-input v-model="form.email" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="手机号码：" :label-width="formLabelWidth">
					<el-input v-model="form.phone" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="分机号码：" :label-width="formLabelWidth">
					<el-input v-model="form.extPhone" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="入职日期：" :label-width="formLabelWidth">
					<el-input v-model="form.entryTime" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="辞职日期：" :label-width="formLabelWidth">
					<el-input v-model="form.quitTime" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="毕业学校：" :label-width="formLabelWidth">
					<el-input v-model="form.graduateSchool" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="毕业时间：" :label-width="formLabelWidth">
					<el-input v-model="form.graduateTime" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="学历：" :label-width="formLabelWidth">
					<el-input v-model="form.education" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="专业：" :label-width="formLabelWidth">
					<el-input v-model="form.major" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<div slot="footer" class="dialog-footer">
					<el-button @click="detail_dialog = false">关闭</el-button>

				</div>
				<!--  <el-form-item label="工作状态：" :label-width="formLabelWidth">
                	 <el-input v-model="form.status" auto-complete="off" :readonly="true" :formatter="status"></el-input>
                </el-form-item>-->
				<!-- <el-form-item label="在职状态：" :label-width="formLabelWidth">
                	 <el-input v-model="form.jobStatus" auto-complete="off" :readonly="true" :formatter="jobStatuss"></el-input>
                </el-form-item>-->
			</el-form>
		</el-dialog>

		<!--修改员工-->
		<el-dialog title="修改" :visible.sync="update_dialog" close-on-press-escape :modal="true">
			<el-form :model="form" label-width="80px">
				<el-form-item label="工号：" :label-width="formLabelWidth">
					<el-input v-model="form.jobNum" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="初始密码：" :label-width="formLabelWidth">
					<el-input v-model="form.password" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="用户名：" :label-width="formLabelWidth">
					<el-input v-model="form.userName" auto-complete="off" :readonly="false" @blur="validateUser"></el-input>
				</el-form-item>
				<el-form-item label="所属部门：" :label-width="formLabelWidth">
					<el-cascader :options="data" v-model="selectedOptions" @change="handleChange">
					</el-cascader>
					<!--<el-input v-model="form.depart" auto-complete="off" :readonly="false"></el-input>-->
				</el-form-item>
				<el-form-item label="所在岗位：" :label-width="formLabelWidth">
					<template>
						<el-select v-model="form.stationId" placeholder="请选择">
							<el-option v-for="item in stations" :key="item.stationId" :label="item.stationName" :value="item.stationId">
							</el-option>
						</el-select>
					</template>

				</el-form-item>
				<el-form-item label="拥有角色：" :label-width="formLabelWidth">
					<template>
						<el-select v-model="form.roleIds" placeholder="请选择" multiple>
							<el-option v-for="item in roleIds" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</template>
					<!--<el-input v-model="form.role" auto-complete="off" :readonly="false"></el-input>-->
				</el-form-item>
				<el-form-item label="员工状态:" :label-width="formLabelWidth">
					<template>
						<el-select v-model="form.jobStatus" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="是否允许登录：" :label-width="formLabelWidth">
					<el-tooltip :content="'Switch value: ' + form.isLogin" placement="top">
						<el-switch v-model="form.isLogin" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
						</el-switch>
					</el-tooltip>
					<!--<template>
					<el-select v-model="form.isLogin" placeholder="请选择">
						<el-option v-for="item in isLogins" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</template>-->
					<!--<el-input v-model="form.isLogin" auto-complete="off" :readonly="false"></el-input>-->
				</el-form-item>
				<el-form-item label="姓名：" :label-width="formLabelWidth">
					<el-input v-model="form.chName" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="英文名：" :label-width="formLabelWidth">
					<el-input v-model="form.enName" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="出生日期：" :label-width="formLabelWidth">
					<el-date-picker v-model="form.birthTime" type="date" placeholder="出生日期">
					</el-date-picker>
					<!--<el-input v-model="form.birthTime" auto-complete="off" :readonly="false" :formatter="gender"></el-input>-->
				</el-form-item>
				<el-form-item label="性别：" :label-width="formLabelWidth">
					<template>
						<el-radio class="radio" v-model="form.gender" label="1">男</el-radio>
						<el-radio class="radio" v-model="form.gender" label="0">女</el-radio>
					</template>
					<!--<el-input v-model="form.gender" auto-complete="off" :readonly="false" :formatter="gender"></el-input>-->
				</el-form-item>
				<el-form-item label="工资：" :label-width="formLabelWidth">
					<el-input v-model="form.salary" auto-complete="off" :readonly="false" :formatter="gender"></el-input>
				</el-form-item>
				<el-form-item label="p级：" :label-width="formLabelWidth">
					<el-input v-model="form.busRank" auto-complete="off" :readonly="true" :formatter="gender"></el-input>
				</el-form-item>
				<el-form-item label="公司邮箱：" :label-width="formLabelWidth">
					<el-input v-model="form.email" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="手机号码：" :label-width="formLabelWidth">
					<el-input v-model="form.phone" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="分机号码：" :label-width="formLabelWidth">
					<el-input v-model="form.extPhone" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="入职日期：" :label-width="formLabelWidth">
					<el-date-picker v-model="form.entryTime" type="date" placeholder="入职日期"></el-date-picker>
					<!--<el-input v-model="form.entryTime" auto-complete="off" :readonly="false"></el-input>-->
				</el-form-item>
				<el-form-item label="辞职日期：" :label-width="formLabelWidth">
					<el-date-picker v-model="form.quitTime" type="date" placeholder="辞职日期"></el-date-picker>
					<!--<el-input v-model="form.quitTime" auto-complete="off" :readonly="false"></el-input>-->
				</el-form-item>
				<el-form-item label="毕业学校：" :label-width="formLabelWidth">
					<el-input v-model="form.graduateSchool" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="毕业时间：" :label-width="formLabelWidth">
					<el-date-picker v-model="form.graduateTime" type="date" placeholder="毕业时间"></el-date-picker>
					<!--<el-input v-model="form.graduateTime" auto-complete="off" :readonly="false"></el-input>-->
				</el-form-item>
				<el-form-item label="学历：" :label-width="formLabelWidth">
					<template>
						<el-select v-model="form.education" placeholder="请选择">
							<el-option v-for="item in educations" :key="item.value" :label="item.name" :value="item.value">
							</el-option>
						</el-select>
					</template>
					<!--<el-input v-model="form.education" auto-complete="off" :readonly="false"></el-input>-->
				</el-form-item>
				<el-form-item label="专业：" :label-width="formLabelWidth">
					<el-input v-model="form.major" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="update_dialog = false">取 消</el-button>
				<el-button type="primary" @click="editSubmit">确 定</el-button>
			</div>

		</el-dialog>

		<!--添加员工-->
		<el-dialog title="添加" :visible.sync="add_dialog" close-on-press-escape :modal="true">
			<el-form :model="form" label-width="80px" ref="form" >
				<el-form-item label="用户名：" :label-width="formLabelWidth">
					<el-input v-model="form.userName" auto-complete="off" :readonly="false" @blur="validateUser"></el-input>
				</el-form-item>
				<el-form-item label="姓名：" :label-width="formLabelWidth">
					<el-input v-model="form.chName" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="英文名：" :label-width="formLabelWidth">
					<el-input v-model="form.enName" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="出生日期：" :label-width="formLabelWidth">
					<el-date-picker v-model="form.birthTime" type="date" placeholder="出生日期"></el-date-picker>
				</el-form-item>
				<el-form-item prop="email" label="公司邮箱：" :rules="[
					      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
					      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
					    ]" :label-width="formLabelWidth">
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="手机号码：" :label-width="formLabelWidth">
					<el-input v-model="form.phone" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="分机号码：" :label-width="formLabelWidth">
					<el-input v-model="form.extPhone" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="工号：" :label-width="formLabelWidth">
					<el-input v-model="form.jobNum" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="密码：" :label-width="formLabelWidth">
					<el-input v-model="form.password" auto-complete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="所属部门：" :label-width="formLabelWidth">
					<el-cascader :options="data" v-model="selectedOptions" @change="handleChange"></el-cascader>
				</el-form-item>
				<el-form-item label="所在岗位：" :label-width="formLabelWidth">
					<template>
						<el-select v-model="form.stationId" placeholder="请选择">
							<el-option v-for="item in stations" :key="item.stationId" :label="item.stationName" :value="item.stationId">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="性别：" :label-width="formLabelWidth">
					<el-radio-group v-model="form.gender">
						<el-radio :label="1">男</el-radio>
						<el-radio :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="工资：" :label-width="formLabelWidth">
					<el-input v-model="form.salary" auto-complete="off" :readonly="false" @blur="salaryClick"></el-input>
				</el-form-item>
				<el-form-item label="p级" :label-width="formLabelWidth">
					<el-input v-model="form.busRank" auto-complete="off" :readonly="true" :formatter="gender"></el-input>
				</el-form-item>
				<el-form-item label="入职日期：" :label-width="formLabelWidth">
					<el-date-picker v-model="form.entryTime" type="date" placeholder="入职日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="辞职日期：" :label-width="formLabelWidth">
					<el-date-picker v-model="form.quitTime" type="date" placeholder="辞职日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="毕业学校：" :label-width="formLabelWidth">
					<el-input v-model="form.graduateSchool" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="毕业时间：" :label-width="formLabelWidth">
					<el-date-picker v-model="form.graduateTime" type="date" placeholder="毕业时间" format="yyyy-MM-dd"></el-date-picker>
				</el-form-item>
				<el-form-item label="学历：" :label-width="formLabelWidth">
					<template>
						<el-select v-model="form.education" placeholder="请选择">
							<el-option v-for="item in educations" :key="item.value" :label="item.name" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="专业：" :label-width="formLabelWidth">
					<el-input v-model="form.major" auto-complete="off" :readonly="false"></el-input>
				</el-form-item>
				<el-form-item label="拥有角色：" :label-width="formLabelWidth">
					<template>
						<el-select v-model="form.roleIds" placeholder="请选择" multiple>
							<el-option v-for="item in roleIds" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="是否允许登录：" :label-width="formLabelWidth">
					<el-tooltip :content="'Switch value: ' + form.isLogin" placement="top">
						<el-switch v-model="form.isLogin" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
						</el-switch>
					</el-tooltip>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="add_dialog = false">取 消</el-button>
				<el-button type="primary" @click="addSubmit">提 交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	let md5 = require('@/utils/md5.js')
	export default {
		name: 'Index',
		data() {
			return {
				dataList:JSON.parse(Cache.local(Config.Login)),
				aaaaa: 'aaaa',
				pagination: {
					total: 0,
					pagesize: 0,
					curPage: 0
				},
				ruleForm: {
					chName: '',
					jobNum: '',
					departId: '',
					stationId: '',
					jobStatus: ''

				},
				data: [],
				pDefaultProps: {
					children: 'children',
					label: 'label'
				},
				loading: true,
				add_dialog: false,
				addholiday_dialog: false,
				addstatus_dialog: false,
				update_dialog: false,
				detail_dialog: false,
				tableData: [],
				obj: {},
				formLabelWidth: "120px",
				title: '',
				form: {
					id: null,
					chName: null, //姓名
					enName: null, //英文名
					jobNum: null,
					depart: null,
					departId: null,
					gender: 1,
					email: null,
					phone: null,
					status: null,
					jobStatus: null,
					password: null,
					isLogin: null,
					birthTime: null,
					salary: null,
					extPhone: null,
					graduateSchool: null,
					entryTime: null,
					quitTime: null,
					graduateTime: null,
					education: null,
					major: null,
					stationId: null,
					jobStatuss: null,
					statusName: null,
					genderName: null,
					roleIds: null,
					idCardNo: null,
					departId: null,
					busId: null,
					rank: null,
					busRank: null,
					userName: null,
					departsId: null,
					startTime: null,
					endTime: null
				},
				searchParam: {
					chName: '',
					jobNum: '',
					departId: '',
					stationId: '',
					jobStatus: '',
					curPage: 1
				},
				options: [{
					value: '1',
					label: '在职'
				}, {
					value: '0',
					label: '离职'
				}],
				jobStatus: '',

				stations: [{

				}],
				stationId: "",
				departs: [{}],
				departId: "",
				chNames: [{

				}],
				chName: '',
				genderStatus: [{
					value: '1',
					label: '男'
				}, {
					value: '0',
					label: '女'
				}],
				workStatus: [],
				isLogins: [{
					value: '1',
					label: '是'
				}, {
					value: '0',
					label: '否'
				}],
				educations: [],
				roleIds: [],
				selectedOptions: []/*,
				rules2: {
					phone: [{
						validator: checkPhone,
						trigger: 'blur'
					}]
				}*/

			}

		},
		mounted: function() {
			this.$nextTick(() => {
				//				this.loadMpProgressCircle()
				this.link2Page(1);
				this.queryParam();
				this.initDepartTree();
			})
		},
		methods: {
			sortchange(column, prop, order) {
			},
			loadMpProgressCircle() {
				let MpCircleBar = require('@/utils/canvas-progress.js').MpCircleBar
				MpCircleBar.init(this.$refs.ccc, [{
						color: '#f8f6f1',
						value: 25,
						child: {
							color: '#f5bf3c',
							value: 20,
							endimg: './static/img/1.png'
						}
					},
					{
						color: '#dbe6ff',
						value: 25,
						child: {
							color: '#295dcf',
							value: 20,
							endimg: './static/img/2.png'
						}
					},
					{
						color: '#edf5f1',
						value: 25,
						child: {
							color: '#1abf69',
							value: 16,
							endimg: './static/img/3.png'
						}
					}
				])
			},
			link2Page(curPage) {
				this.searchParam.curPage = curPage;
				/* var formdata = new FormData();
				 for (let i in this.searchParam){
				 	formdata.append(i, this.searchParam[i]);
				 }*/
				this.$http.post('/api/uContact/list', this.searchParam, {
					emulateJSON: true
				}).then((res) => {
					this.tableData = res.data.result.content
					this.pagination.total = res.data.result.total
					this.pagination.pagesize = res.data.result.helper.pageSize
					this.pagination.curPage = res.data.result.helper.curPage
					this.loading = false
				}).catch((err) => {
					this.loading = false
					
				})
			},
			handleClick(tab, event) {
			},
			handleSizeChange(val) {
			},
			handleCurrentChange(val) {
				this.loading = true
				this.link2Page(val);
			},
			handlerSee(row) {
				Object.assign(this.form, row);
				this.detail_dialog = true;
				this.form.statusName = this.status(row);
				this.form.jobStatuss = this.jobStatuss(row);
				this.form.genderName = this.gender(row);
				this.education(row);
				this.isLogin(row);
				this.common(row);
				this.uStation(row);
			},
			uStation(row) {
				//查询岗位
				this.$http.post('/api/station/queryStationByRedis', {
					emulateJSON: true
				}).then((res) => {
					let station = res.data.result
					if(station && station != '') {
						for(let i in station) {
							if(row.stationId == station[i].stationId) {
								this.form.station = station[i].stationName;
								break;
							}

						}
					}

				}).catch((err) => {
					this.loading = false
					
				});
			},
			gender(row) {
				let gender = row.gender;
				if(gender == 0) {
					return '女';
				} else if(gender == 1) {
					return '男';
				} else {
					return '未知';
				}
			},
			//字典表1:正常,2:休婚假,3:修产假,4:驻场，５：事假，６：调休
			status(row) {
				switch(row.status) {
					case 1:
						return '正常';
						break;
					case 2:
						return '休婚假';
						break;
					case 3:
						return '修产假';
						break;
					case 4:
						return '驻场';
						break;
					case 5:
						return '事假';
						break;
					case 6:
						return '调休';
						break;
					default:
						return '其他';

				}

			},
			//在职状态(0:离职,1:在职)',
			jobStatuss(row) {
				switch(row.jobStatus) {
					case 0:
						return '离职';
						break;
					case 1:
						return '在职';
						break;
					default:
						return '未知';
				}
			},
			queryParam() {
				//查询岗位
				this.$http.post('/api/station/queryStationByRedis', {
					emulateJSON: true
				}).then((res) => {
					this.stations = res.data.result;

				}).catch((err) => {
					this.loading = false
					
				});
				//查询员工
				this.$http.post('/api/uContact/queryUContactAllByRedis', {
					emulateJSON: true
				}).then((res) => {
					this.chNames = res.data.result;
					/*let array = [];
					if(result && result != '') {
						for(let i in result) {
							let json = {};
							let results = result[i];
							let busId = results.busId;
							let value = results.chName;
							let label = results.chName;
							json['value'] = value;
							json['label'] = label;
							array.push(json);
						}

						this.chNames = array;
					}*/

				}).catch((err) => {
					this.loading = false
					
				})
				//工作的状态

				this.$http.post('/api/dictionaryCategory/queryDictionByCode', {
						code: 'job_status'
					}, {
						emulateJSON: true
					}).then((res) => {
						let result = res.data.result;
						let array = [];
						if(result && result != '') {
							for(let i in result) {
								let json = {};
								let results = result[i];
								//let busId = results.busId;
								let value = results.value;
								let label = results.name;
								json['value'] = value;
								json['label'] = label;
								array.push(json);
							}

							this.workStatus = array;
						}

					}).catch((err) => {
						this.loading = false
						
					}),

					this.$http.post('/api/dictionaryCategory/queryDictionByCode', {
						code: 'init_pwd'
					}, {
						emulateJSON: true
					}).then((res) => {
						let result = res.data.result;
						let array = [];
						if(result && result != '') {
							for(let i in result) {
								this.form.password = result[i].value;
							}

						}

					}).catch((err) => {
						this.loading = false
						
					})

			},
			reload() {
				this.link2Page(1);
			},
			searchBtn() {
				// this.searchParam.endTime = (!!this.searchParam.endTime) ? new Date(this.searchParam.endTime).format("yyyy-MM-dd") : '';
				this.reload();
			},
			update(row) {
				this.update_dialog = true
				Object.assign(this.form, row)
				this.form.statusName = this.status(row)
				this.form.jobStatusName = this.jobStatuss(row)
				this.form.genderName = this.gender(row)
				this.form.isLogin = row.isLogin + ''
				this.form.gender = row.gender + ''
				this.form.eduction = row.eduction + ''
				this.form.stationId = row.stationId
				this.queryUpdte(row);
				this.common(row);
				let departIds = row.departsId;
				if(departIds && departIds != '') {
					this.selectedOptions = departIds.split(",").map(s => +s);
				}
			},
			queryUpdte(row) {
				//查询学历
				this.$http.post('/api/dictionaryCategory/queryDictionByCode', {
					code: 'education'
				}, {
					emulateJSON: true
				}).then((res) => {
					this.educations = res.data.result;
				}).catch((err) => {
					this.loading = false
					
				});

			},
			common(row) {
				let busId = row.busId;
				this.$http.post('/api/role/queryRole', {
					busId: busId
				}, {
					emulateJSON: true
				}).then((res) => {
					this.roleIds = res.data.result;

				}).catch((err) => {
					this.loading = false
					
				});
				this.$http.post('/api/uRole/queryURoleByUcId', {
					busId: busId,
					ucId: row.id
				}, {
					emulateJSON: true
				}).then((res) => {
					this.form.roleIds = res.data.result;

				}).catch((err) => {
					this.loading = false
					
				});
				this.$http.post('/api/busRank/detail/' + row.rank, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data;
					var result = data.result;
					if(data.success) {
						this.form.rank = result.id;
						this.form.busRank = result.name;
					} else {
						//this.$message({ customClass: 'error', message: '添加失败'});
					}

				}).catch((err) => {
					this.loading = false
					
				});

			},
			deleteBtn(row) {
				this.$confirm('是否删除？, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post("/api/uContact/del", {
							ucId: row.id
						}, {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {
								this.$message({
									customClass: 'success',
									message: '删除成功'
								});
							} else {
								this.$message({
									customClass: 'error',
									message: '删除失败'
								});
							}
							this.reload();
						}).catch((err) => {
							this.$message({
								customClass: 'error',
								message: '删除失败'
							});
						});
				}).catch(() => {
					this.$message({
						customClass: 'success',
						message: '已取消删除'
					});
				});
			},
			education(row) {
				this.$http.post('/api/dictionaryCategory/queryDictionByCode', {
					code: 'education'
				}, {
					emulateJSON: true
				}).then((res) => {
					let result = res.data.result;
					if(result && result != '') {
						for(let i in result) {
							let results = result[i];
							if(results.value == row.education) {
								this.form.education = results.name;
								break;
							}

						}

					}

				}).catch((err) => {
					this.loading = false
					
				})
			},
			isLogin(row) {
				switch(row.isLogin) {
					case 0:
						this.form.isLogin = '否';
						break;
					case 1:
						this.form.isLogin = '是'
						break;
					default:
						return '';
				}
			},
			editSubmit() { //修改
				let graduteTime = this.form.graduateTime;
				let birthTime = this.form.birthTime;
				let entryTime = this.form.entryTime;
				let quitTime = this.form.quitTime;
				this.form.graduateTime = (graduteTime) ? new Date(graduteTime).format("yyyy-MM-dd") : '';
				this.form.birthTime = (birthTime) ? new Date(birthTime).format("yyyy-MM-dd") : '';
				this.form.entryTime = (entryTime) ? new Date(entryTime).format("yyyy-MM-dd") : '';
				this.form.quitTime = (quitTime) ? new Date(quitTime).format("yyyy-MM-dd") : '';
				this.$http.post("/api/uContact/update", this.form, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							this.$message({
								customClass: 'success',
								message: '修改成功'
							});
						} else {
							this.$message({
								customClass: 'error',
								message: '修改失败'
							});
						}
						this.update_dialog = false;
						this.reload();
					}).catch((err) => {
						this.update_dialog = false;
					});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.reload();
			},
			padd(row) {
				this.add_dialog = true;
				this.queryUpdte(row);
				this.uStation(row);
				this.$http.post('/api/role/queryRole', {
					busId: this.dataList.bus.id
				}, {
					emulateJSON: true
				}).then((res) => {
					this.roleIds = res.data.result;

				}).catch((err) => {
					this.loading = false
					
				});
				this.initDepartTree();
			},
			paddholiday(row) {
				this.addholiday_dialog = true;
			},
			paddstatus(row) {
				this.addstatus_dialog = true;
			},
			addSubmit() { //entryTime: null,
				let graduteTime = this.form.graduateTime;
				let birthTime = this.form.birthTime;
				let entryTime = this.form.entryTime;
				let quitTime = this.form.quitTime;
				this.form.graduateTime = (graduteTime) ? new Date(graduteTime).format("yyyy-MM-dd") : '';
				this.form.birthTime = (birthTime) ? new Date(birthTime).format("yyyy-MM-dd") : '';
				this.form.entryTime = (entryTime) ? new Date(entryTime).format("yyyy-MM-dd") : '';
				this.form.quitTime = (quitTime) ? new Date(quitTime).format("yyyy-MM-dd") : '';
				this.form.busId = dataList.bus.id;
				/*var depart={};
				var selNodes = this.$refs.p_tree.getCheckedNodes();
				if(selNodes && selNodes.length>0){
					for(var i=0;i<selNodes.length;i++){
						 depart = selNodes[i];
					}
				}else{
					depart.id=0
				}*/
				this.$http.post('api/uContact/add', this.form, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data;
					if(data.success) {
						this.$message({
							customClass: 'success',
							message: '添加成功'
						});
					} else {
                        let str = this.dealResData(data.message)
						this.$message({
							customClass: 'error',
							message: str
						});
					}
					this.add_dialog = false;
					this.reload();
				}).catch((err) => {
					this.add_dialog = false;
				});
			},
            dealResData(str){
                if(str.toLowerCase()==='no'){
                    str = '操作失败'
                }
                if(str.toLowerCase()==='ok'){
                    str = '操作成功'
                }
                return str
            },
			salaryClick() {
				this.$http.post('/api/busRank/queryBusRankBySalary', {
					busId: this.dataList.bus.id,
					salary: this.form.salary
				}, {
					emulateJSON: true
				}).then((res) => {
					var data = res.data;
					var result = data.result;
					if(data.success) {
						this.form.rank = result.id;
						this.form.busRank = result.name;
					} else {
						//this.$message({ customClass: 'error', message: '添加失败'});
					}
				}).catch((err) => {});
			},
			 addholiday() {
			 	this.form.startTime = (!!this.form.startTime) ? new Date(this.form.startTime).format("yyyy-MM-dd hh:mm:ss") : '';
				this.form.endTime = (!!this.form.endTime) ? new Date(this.form.endTime).fullCurTime().format("yyyy-MM-dd hh:mm:ss") : '';
                    this.$http.post("/api/holiday/add",this.form,{emulateJSON: true})
                            .then((res)=>{
                                var data=res.data;
                                if(data.success){
                                	
                                    this.$message({ 
                                    	customClass: 'success',
                                    	message: '添加成功'
                                    });
                                }else{
                                    this.$message({ 
                                    	customClass: 'error',
                                    	message: '添加失败'
                                    });
                                }
                                this.addholiday_dialog = false;
                                this.reload();
                        }).catch((err)=>{
                            this.addholiday_dialog = false;
                        });
                },
			initDepartTree() {
				this.$http.post("/api/depart/departPack", null, {
						emulateJSON: true
					})
					.then((res) => {
						var data = res.data;
						if(data.success) {
							var result = data.result;
							this.data = result;
						}
					}).catch((err) => {
						
					});
			},
			handleNodeClick(data) {
				this.form.departId = data.$treeNodeId;
			},
			validateUser() {
				let userName = this.form.userName;
				if(userName && userName != '') {
					this.$http.post("/api/user/validateUserIsExits", {
							"userName": userName
						}, {
							emulateJSON: true
						})
						.then((res) => {
							var data = res.data;
							if(data.success) {
								var result = data.result;
								if(result) {
									/*var password = prompt("请输入密码？");
									if(password){*/
									this.$prompt('请输入密码', '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消'
									}).then(({
										value
									}) => {
										this.form.password = md5(value);
										this.$message({
											customClass: 'success',
											message: '你的密码是: ' + value
										});
									}).catch(() => {
										this.$message({
											customClass: 'error',
											message: '取消输入'
										});
									});

									/*}*/

								}
							}
						}).catch((err) => {
							
						});
				}

			},
			handleChange(value, label) {
				if(value && value != '') {
					this.form.departId = value[value.length - 1];
					this.form.departsId = value.join(",");
				}

			},
			handleChange1(value) {
				if(value && value != '') {
					this.searchParam.departId = value[value.length - 1];
				}
			}
		}
	}
</script>

<style scoped>
	.add {
		float: right;
		margin-right: 28px;
		margin-bottom: 10px;
	}
</style>