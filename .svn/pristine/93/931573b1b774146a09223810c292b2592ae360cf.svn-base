<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>员工管理</el-breadcrumb-item>
		</el-breadcrumb>
		<section class="list-wrap layout-in">
			<!--查询表单-->
			<el-form class="sosoform form190 margin-left8" :inline="true" :model="searchParam" ref="searchParam" label-width="70px">
				<el-form-item label="用户名：" prop="userName">
					<el-input v-model="searchParam.userName" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item label="所在部门：" prop="selectedOptions">
					<el-cascader :options="data"  :change-on-select="true" v-model="searchParam.selectedOptions" @change="handleChange1"></el-cascader>
				</el-form-item>
				<el-form-item label="所在岗位：" prop="stationId">
					<template>
						<el-select v-model="searchParam.stationId" placeholder="请选择" clearable>
							<el-option v-for="(item, index) in stations" :key="index" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="姓名：" prop="chName">
					<template>
						<el-select v-model="searchParam.chName" filterable placeholder="请选择" clearable>
							<el-option v-for="(item, index) in chNames" :key="index" :label="item.chName" :value="item.chName">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item label="工号：" prop="jobNum">
					<el-input v-model="searchParam.jobNum" placeholder="工号"></el-input>
				</el-form-item>
				<el-form-item label="员工状态：" prop="status">
					<template>
						<el-select v-model="searchParam.status" placeholder="请选择" clearable>
							<el-option v-for="(item, index) in jobStatusOptions" :key="index" :label="item.name" :value="item.value">
							</el-option>
						</el-select>
					</template>
				</el-form-item>
				<el-form-item class="btn-area">
					<el-button class="searchbtn" type="primary" @click="searchBtn">搜索</el-button>
					<el-button type="primary" class="submitbtn" @click="resetForm('searchParam')">重置</el-button>
					<!--<el-button type="primary" class="btn submitbtn" @click="padd">新增员工(old)</el-button>-->
				</el-form-item>
			</el-form>
			<el-table class="uctable" ref="table" :data="tableData" v-loading="loading" element-loading-text="拼命加载中" @sort-change="sortchange" @row-click="handlerSee">
				<el-table-column sortable prop="userName" label="用户名" align="center">
				</el-table-column>
				<el-table-column sortable prop="chName" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="enName" label="英文名" align="center">
				</el-table-column>
				<el-table-column prop="jobNum" label="工号" align="center">
				</el-table-column>
				<el-table-column prop="depart" label="部门" align="center">
				</el-table-column>
				<el-table-column prop="station" label="岗位" align="center">
				</el-table-column>
				<el-table-column prop="roleName" label="角色" align="center">
				</el-table-column>
				<el-table-column prop="gender" label="性别" :formatter="gender" align="center">
				</el-table-column>
				<el-table-column prop="email" label="电子邮箱" align="center">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码" align="center">
				</el-table-column>
				<el-table-column prop="status" label="员工状态" align="center">
					<template slot-scope="scope">
						<span class="color" :type="scope.row.status">{{status(scope.row)}}</span>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="description" label="备注"  align="center" v-show="false" style="display:none">
				</el-table-column> -->
				<el-table-column prop="jobStatus" label="在职状态" align="center">
					<template slot-scope="scope">
						<span class="color" :type="scope.row.jobStatus">{{jobStatuss(scope.row)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" v-if="HasPermission('listeditbtn')">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="update(scope.row)">编辑</el-button>
						<!--<el-button type="text" size="small" @click="deleteBtn(scope.row)">删除</el-button>-->
					</template>
				</el-table-column>
			</el-table>
			<br />
			<!--分页-->
			<el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.curPage" :page-size="pagination.pagesize" layout="total, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
		</section>
		
		<!--修改员工-->
		<el-dialog title="修改" :visible.sync="update_dialog" close-on-press-escape :modal="true" class="modify_dialogx">
			<el-form :model="form" label-width="85px" :label-position="'left'" :rules="rules" ref="form" class="modifyForm form-wrap">
				<el-form-item label="是否在职: " class="isWorking">
					<el-switch class="switch-type-3" v-model="form.jobStatus" on-value="1" off-value="0" on-text="" off-text=""></el-switch>
				</el-form-item>
				<div class="yuan">
					<span class="upload_img">
						<!--<input type="text" id="userIcon" ref="userIcon" @click="showUploadDialog"/>-->
						<span id="userIcon" ref="userIcon" @click="showUploadDialog"></span>
						<img class="circlex" ref="circlex" id="circlex" :src="circlexPath"></img>
					</span>
				</div>
				<div class="boxa clearfix">
					<div class="box_name">账号信息</div>
					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="工号：" prop="jobNum">
								<el-input v-model="form.jobNum" auto-complete="off" :maxlength="15" :readonly="false"></el-input>
							</el-form-item>
						</el-col>	
						<el-col :span="12">	
							<el-form-item label="用户名：" prop="userName">
								<el-input v-model="form.userName" :maxlength="15" auto-complete="off" :readonly="false" @blur="validateUser"></el-input>
							</el-form-item>
						</el-col>	
					</el-row>
					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="初始口令：" prop="">
								<el-input v-model="form.passWord" auto-complete="off" :readonly="true"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<!--<el-form-item>-->
								<label class="depLabel"><span>*</span>所属部门：</label>
								<el-cascader class="departCascader" :options="data" :change-on-select="true" v-model="backSelectOptions" @change="handleChange"></el-cascader>
								<div class="error depart" style="display:none">不能为空</div>
							<!--</el-form-item>-->
						</el-col>	
					</el-row>
					<el-row :gutter="24">
						<el-col :span="12">
							<!--<el-form-item label="" >-->
								<label class="depLabel"><span>*</span>所在岗位：</label>
								<template>
									<el-select v-model="form.stationId" placeholder="请选择" @change="stationIsNUll">
										<el-option  :change-on-select="true"  v-for="(item, index) in stations" :key="index" :label="item.name" :value="item.id">
										</el-option>
									</el-select>
								</template>
								<div class="error stationId" style="display:none">不能为空</div>
							<!--</el-form-item>-->
						</el-col>	
						<el-col :span="12">
							<!--<el-form-item label="" >-->
								<label class="depLabel"><span>*</span>拥有角色：</label>
								<template>
									<el-select class="roleHas" :options="form.roleIds" v-model="roleIdOptions" placeholder="请选择" multiple @change="removeTag">
										<el-option v-for="(item, index) in roleIds" :key="index" :label="item.name" :value="item.id">
										</el-option>
									</el-select>
								</template>
								<div class="error roleIds" style="display:none">不能为空</div>
							<!--</el-form-item>-->
						</el-col>
					</el-row>	
					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="员工状态：">
								<template>
									<el-select v-model="form.status" placeholder="请选择">
										<el-option v-for="(item, index) in jobStatusOptions" :key="index" :label="item.name" :value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-form-item>
						</el-col>	
						<el-col :span="12">
							<el-form-item label="是否允许登录：" prop='isLogin'>
								<el-switch class="switch-type-3" v-model="form.isLogin" :on-value="1" :off-value="0" on-text="" off-text=""></el-switch>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="是否执行人员：" prop='isPerformer'>
								<el-switch class="switch-type-3" v-model="form.isPerformer" :on-value="1" :off-value="0" on-text="" off-text=""></el-switch>
							</el-form-item>
						</el-col>
					</el-row>
				</div>	
				<div class="boxa clearfix">
					<div class="box_name">个人资料</div>
					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="姓名：" prop="chName">
								<el-input v-model="form.chName" auto-complete="off" :maxlength="15" :readonly="false"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="出生日期：" prop='birth'>
								<el-date-picker v-model="form.birth" type="date" placeholder="出生日期">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="24">
							<el-form-item label="英文名：" prop='enName'>
								<el-input v-model="form.enName" :maxlength="15" auto-complete="off" :readonly="false"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="24">
							<el-form-item label="性别：">
								<el-radio-group v-model="form.gender" prop='gender'>
									<el-radio class="radio" :label="1">男</el-radio>
									<el-radio class="radio" :label="0">女</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="12">
							<el-form-item label="工资：" prop="salary">
								<el-input :maxlength="8" v-model="form.salary" auto-complete="off" :readonly="false" @blur="salaryClick"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="级别：" prop="busRank" class="paddl">
								<el-input v-model="form.busRank" placeholder="" :disabled="true" class="levelx"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="24">
							<el-form-item prop="email" label="公司邮箱："  :rules="[
								      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
								      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
								    ]">
								<el-input v-model="form.email"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="24">
							<el-form-item label="分机号码：" prop='extPhone'>
								<el-input :maxlength="20" v-model="form.extPhone" auto-complete="off" :readonly="false"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="24">
							<el-form-item label="手机号码：" prop="phone" >
								<el-input :maxlength="11" v-model="form.phone" auto-complete="off" :readonly="false"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>	
				<div class="boxa clearfix">
					<div class="box_name">个人简历</div>
					<el-row :gutter="24">
						<el-col :span="12">	
							<el-form-item label="入职时间：" prop='entryTime'>
								<el-date-picker v-model="form.entryTime" type="date" placeholder="入职时间"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">	
							<el-form-item prop="quitTime" label="辞职时间：">
								<el-date-picker v-model="form.quitTime" type="date" placeholder="辞职时间"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="12">	
							<el-form-item label="毕业学校：">
								<el-input :maxlength="30" v-model="form.graduateSchool" auto-complete="off" :readonly="false"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">	
							<el-form-item label="毕业时间：">
								<el-date-picker v-model="form.graduateTime" type="date" placeholder="毕业时间" format="yyyy-MM-dd"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="12">	
							<el-form-item label="学历：">
								<template>
									<el-select v-model="form.education" placeholder="请选择">
										<el-option v-for="(item, index) in educations" :key="index" :label="item.name" :value="item.id">
										</el-option>
									</el-select>
								</template>
							</el-form-item>
						</el-col>
						<el-col :span="12">	
							<el-form-item label="专业：">
								<el-input :maxlength="30" v-model="form.major" auto-complete="off" :readonly="false"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="24">
							<el-form-item class="mt8 pad_r" label="备注：" prop="description">
								<el-input :maxlength="200" type="textarea" :rows="4" placeholder="请输入" v-model="form.description" class="note"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="24">
						<el-col :span="24" class="text-center marginbt">
							<el-button type="primary" @click="editSubmit('form')" class="submitbtn">确定</el-button>
							<el-button @click="update_dialog = false" class="cancelbtn">取消</el-button>
						</el-col>
					</el-row>
				</div>	
			</el-form>
		</el-dialog>
		<UploadAvator :visible.sync="UploadAvatorVisible" @imgData = 'imgData' :back.sync="backFlag"></UploadAvator>
		<UcStateSetDialog :visible.sync="ucStateSetDialogFlag" :row.sync="dataRow" :ucId="ucId" :_form="form" :ucStatus="ucStatus" :ucNames="ucInfo"></UcStateSetDialog>
		<UcDetailsDialog 
			:visible.sync="ucDetailsDialogFlag" 
			:form="form" 
			:stations="stations" 
			:departs="data" 
			:departSelect="backSelectOptions" 
			:roles="roleArrayIds" 
			:jobStatus="jobStatusArray" 
			:educations="educations"
			:isHasPermissions="isHasPermissions"
			>
		</UcDetailsDialog>
		<HolidaySetDialog :visible.sync="addholiday_dialog" :row="dataRow"></HolidaySetDialog>
	</div>
</template>

<script>
let md5 = require("@/utils/md5.js");
let UcStateSetDialog = () => import("@/modules/Org/uc/UcStateSet_Dialog.vue");
let UcDetailsDialog = () => import("@/modules/Org/uc/UcDetails_Dialog.vue");
let HolidaySetDialog = () => import("@/modules/Org/uc/HolidaySet_Dialog.vue");
let UploadAvator = () => import("@/modules/Org/uc/UploadAvator.vue");
import Cropper from "cropperjs";

export default {
  name: "uc",
  components: {
    UcStateSetDialog,
    UcDetailsDialog,
    HolidaySetDialog,
    UploadAvator
  },
  props: {
    stateDialog: {
      Object: Boolean,
      default: false
    }
  },
  beforeRouteEnter(to, from, next) {
    fromRoute = from;
    next();
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value && value != "") {
        this.$http
          .post(
            "/api/uContact/queryUcByAccount",
            { ucId: this.uContactId, account: value },
            {
              emulateJSON: true
            }
          )
          .then(res => {
            if (res.data.result) {
              callback(new Error("数据已存在！"));
            } else {
              callback();
            }
          })
          .catch(err => {});
      } else {
        callback(new Error("不能为空"));
      }
    };
    return {
      dataList: JSON.parse(Cache.local(Config.Login)),
      ucDetailsDialogFlag: false,
      ucStateSetDialogFlag: false,
      pagination: {
        total: 0,
        pagesize: 0,
        curPage: 0
      },
      ruleForm: {
        chName: "",
        jobNum: "",
        departId: "",
        stationId: "",
        jobStatus: "",
        birth: ""
      },
      data: [],
      pDefaultProps: {
        children: "children",
        label: "label"
      },
      loading: true,
      add_dialog: false,
      addholiday_dialog: false,
      addstatus_dialog: false,
      update_dialog: false,
      tableData: [],
      obj: {},
      formLabelWidth: "120px",
      title: "",
      form: {
        id: null,
        userName: null,
        chName: null, //姓名
        enName: null, //英文名
        userIcon: null, // 头像
        jobNum: null,
        depart: null,
        departId: null,
        gender: 1,
        email: null,
        phone: null,
        status: null,
        jobStatus: null,
        passWord: null,
        isLogin: 1,
        isPerformer: 1,
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
        endTime: null,
        birth: null
      },
      searchParam: {
        chName: "",
        jobNum: "",
        departId: "",
        stationId: "",
        jobStatus: "",
        curPage: 1,
        selectedOptions: [],
        status: "",
        userName: ""
      },
      backSelectOptions: [],
      jobStatusOptions: [],
      jobStatus: "",

      stations: [{}],
      stationId: "",
      departs: [{}],
      departId: "",
      chNames: [{}],
      chName: "",
      workStatus: [],
      educations: [],
      roleIds: [],
      ucNames: [{}],
      ucInfo: [],
      ucStatus: [{}],
      roleIdOptions: [],
      rules: {
        jobNum: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        userName: [
          {
            required: true,
            message: "用户名不能为空"
          }
        ],
        password: [
          {
            required: true,
            message: "初始口令不能为空"
          }
        ],
        stationId: [
          {
            required: true,
            message: "请选择所属岗位",
            trigger: "change"
          }
        ],
        roleIds: [
          {
            required: true,
            message: "请选择角色",
            trigger: "change"
          }
        ],
        chName: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          },
          {
            pattern: /^[\u2E80-\u9FFF]+$/,
            message: "只能输入中文",
            trigger: "blur"
          }
        ],
        enName: [
          {
            pattern: /^[a-zA-Z]+$/,
            message: "只允许输入英文",
            trigger: "change"
          }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        salary: [
          {
            required: true,
            message: "不能为空"
          },
          {
            pattern: /^(0(?!\.0{1,7}$)(\.[0-9]{1,2})?|[1-9][0-9]{0,7}(\.[0-9]{1,2})?)$/,
            message: "只能输入数字",
            trigger: "change,blur"
          }
        ],
        email: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/gi,
            type: "email",
            message: "必须为合法的邮箱地址"
          }
        ],
        extNum: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        entryTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        jobStatusOptions: [],
        store: [],
        birth: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        extPhone: [
          {
            pattern: /^((\d{3,4}-?\d{7,8})|(\d{3,4}-?\d{3,4}-?\d{3,4}))$/,
            message: "输入有误",
            trigger: "change"
          }
        ],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }]
      },
      jobStatusArray: null,
      uContactId: "",
      passWord: null,
      userName: null,
      ucId: null,
      circlexPath: "",
      roleArrayIds: [],
      roleName: "",
      dataRow: "",
      isHasPermissions: true,

      headerImage: "",
      picValue: "",
      cropper: "",
      croppable: false,
      panel: false,
      url: "",
      UploadAvatorVisible: false,
      backFlag: false
    };
  },
  watch: {
    UploadAvatorVisible(val) {
      if (!val && this.backFlag) {
        this.update_dialog = true;
        this.backFlag = false;
      }
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      //初始化工作的状态
      if (!this.jobStatusArray) {
        this.$http
          .post(
            "/api/dictionary/queryDictionary",
            {
              categoryCode: "job_status"
            },
            {
              emulateJSON: true
            }
          )
          .then(res => {
            let data = res.data;
            if (data.success) {
              let result = data.result;
              this.jobStatusArray = {};
              if (result && result != "") {
                for (let i in result) {
                  let value = result[i].value;
                  let name = result[i].name;
                  this.jobStatusArray[value] = name;
                }
              }
            }
          })
          .catch(err => {
            this.loading = false;
          });
      }

      this.link2Page(1);
      this.queryParam();
      this.initDepartTree();
    });
  },
  beforeRouteEnter(to, from, next) {
    fromRoute = from;
    next();
  },
  methods: {
    backToPre() {
      this.$router.go(-1);
    },
    openStateSetDialog() {
      this.ucId = "";
      this.ucStateSetDialogFlag = true;
    },
    sortchange(column, prop, order) {},
    loadMpProgressCircle() {
      let MpCircleBar = require("@/utils/canvas-progress.js").MpCircleBar;
      MpCircleBar.init(this.$refs.ccc, [
        {
          color: "#f8f6f1",
          value: 25,
          child: {
            color: "#f5bf3c",
            value: 20,
            endimg: "./static/img/1.png"
          }
        },
        {
          color: "#dbe6ff",
          value: 25,
          child: {
            color: "#295dcf",
            value: 20,
            endimg: "./static/img/2.png"
          }
        },
        {
          color: "#edf5f1",
          value: 25,
          child: {
            color: "#1abf69",
            value: 16,
            endimg: "./static/img/3.png"
          }
        }
      ]);
    },
    link2Page(curPage) {
      this.searchParam.curPage = curPage;
      this.$http
        .post("/api/uContact/list", this.searchParam, {
          emulateJSON: true
        })
        .then(res => {
          this.tableData = res.data.result.content;
          this.pagination.total = res.data.result.total;
          this.pagination.pagesize = res.data.result.helper.pageSize;
          this.pagination.curPage = res.data.result.helper.curPage;
          this.loading = false;
          //this.queryUcRole();
        })
        .catch(err => {
          this.loading = false;
        });
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.loading = true;
      this.link2Page(val);
    },
    queryUcRole(row) {
      this.roleName = "";
      let id = null;
      if (row && row.id) {
        id = row.id;
      }
      this.$http
        .post(
          "/api/role/queryRoleInfoByUcId",
          { ucId: id },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          let data = res.data;
          if (data.success) {
            let result = data.result;
            this.roleArrayIds = result;
            if (result) {
              for (let i in result) {
                this.roleName += result[i].name;
              }
            }
          }
        })
        .catch(err => {
          this.loading = false;
        });
      return this.roleName;
    },
    handlerSee(row, $event, column) {
      this.queryUcRole(row);
      if (column && column.label == "操作") {
        return;
      }
      if (column && column.label == "员工状态") {
        this.ucId = row.id;
        this.ucStateSetDialogFlag = true;
        this.queryUcStatus(row);
        return;
      }
      for (let i in this.form) {
        this.$set(this.form, i, row[i]);
      }
      this.form.statusName = this.status(row);
      this.form.jobStatusName = this.jobStatuss(row);
      this.form.genderName = this.gender(row);
      this.form.isLogin = row.isLogin;
      this.form.isPerformer = row.isPerformer;
      this.form.gender = row.gender;
      this.form.eduction = row.eduction;
      this.form.stationId = row.stationId;
      this.form.description = row.description;
      this.form.id = row.id;
      this.queryUpdte(row);
      this.common(row);
      this.uStation(row);
      let departIds = row.departsId;
      this.form.userIcon = row.userIcon;
      if (departIds && departIds != "") {
        this.$set(
          this.$data,
          "backSelectOptions",
          departIds.split(",").map(s => +s)
        );
      }
      this.ucDetailsDialogFlag = true;
    },
    queryUcStatus(row) {
      this.$http
        .post(
          "/api/uContact/queryLeaveByUcId",
          { ucId: row.id },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          this.dataRow = res.data.result;
          console.log(res);
        })
        .catch(err => {
          this.loading = false;
        });
    },
    uStation(row) {
      //查询岗位
      this.$http
        .post(
          "/api/station/queryStationByRedis",
          { busId: this.dataList.bus.id },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          let station = res.data.result;
          if (station && station != "") {
            for (let i in station) {
              if (row.stationId == station[i].stationId) {
                this.form.station = station[i].stationName;
                break;
              }
            }
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    gender(row) {
      let gender = row.gender;
      if (gender == 0) {
        return "女";
      } else if (gender == 1) {
        return "男";
      } else {
        return "未知";
      }
    },
    //字典表1:正常,2:休婚假,3:修产假,4:驻场，５：事假，６：调休
    status(row) {
      //查询 工作状态
      return this.jobStatusArray[row.status];
    },
    //在职状态(0:离职,1:在职)',
    jobStatuss(row) {
      switch (row.jobStatus) {
        case 0:
          return "已离职";
          break;
        case 1:
          return "在职";
          break;
        default:
          return "未知";
      }
    },
    queryParam() {
      //查询 工作状态
      this.$http
        .post(
          "/api/dictionary/queryDictionary",
          {
            categoryCode: "job_status"
          },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          this.ucStatus = res.data.result;
        })
        .catch(err => {
          this.loading = false;
        });
      // this.$http.post('/api/uContact/queryAllSonDepart', {
      // 	emulateJSON: true
      // }).then((res) => {
      // 	this.ucInfo = res.data.result;
      // }).catch((err) => {
      // 	this.loading = false
      // });
      this.$http
        .post("/api/uContact/queryUcBlur", {
          emulateJSON: true
        })
        .then(res => {
          this.ucNames = res.data.result;
        })
        .catch(err => {
          this.loading = false;
        });
      //查询岗位
      this.$http
        .post("/api/station/queryStationByRedis", {
          emulateJSON: true
        })
        .then(res => {
          this.stations = res.data.result;
        })
        .catch(err => {
          this.loading = false;
        });
      //查询员工
      this.$http
        .post("/api/uContact/queryUContactAllByRedis", {
          emulateJSON: true
        })
        .then(res => {
          this.chNames = res.data.result;
          this.ucInfo = res.data.result;
        })
        .catch(err => {
          this.loading = false;
        });
      //工作的状态
      this.$http
        .post(
          "/api/dictionaryCategory/queryDictionByCode",
          {
            code: "job_status"
          },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          let result = res.data.result;
          let array = [];
          if (result && result != "") {
            for (let i in result) {
              let json = {};
              let results = result[i];
              let value = results.value;
              let label = results.name;
              json["value"] = value;
              json["label"] = label;
              array.push(json);
            }
            this.workStatus = array;
          }
        })
        .catch(err => {
          this.loading = false;
        }),
        this.$http
          .post(
            "/api/dictionaryCategory/queryDictionByCode",
            {
              code: "init_pwd"
            },
            {
              emulateJSON: true
            }
          )
          .then(res => {
            let result = res.data.result;
            let array = [];
            if (result && result != "") {
              for (let i in result) {
                this.form.passWord = result[i].value;
              }
            }
          })
          .catch(err => {
            this.loading = false;
          });
    },
    reload() {
      this.link2Page(1);
    },
    searchBtn() {
      this.reload();
    },
    update(row) {
      this.update_dialog = true;
      for (let i in this.form) {
        this.$set(this.form, i, row[i]);
      }
      this.form.passWord = this.dataList.initPwd.value;
      this.form.statusName = this.status(row);
      this.form.jobStatusName = this.jobStatuss(row);
      this.form.jobStatus = JSON.stringify(this.form.jobStatus); //在职状态
      this.form.genderName = this.gender(row);
      this.form.isLogin = row.isLogin;
      this.form.isPerformer = row.isPerformer;
      this.form.status = row.status + "";
      this.form.gender = row.gender;
      this.form.eduction = row.eduction + "";
      this.form.stationId = row.stationId;
      this.form.description = row.description;
      this.form.birth = new Date(row.birthTime);
      this.form.entryTime = new Date(row.entryTime);
      this.queryUpdte(row);
      this.common(row);
      this.uContactId = row.id;
      let departIds = row.departsId;
      if (departIds && departIds != "") {
        this.$set(
          this.$data,
          "backSelectOptions",
          departIds.split(",").map(s => +s)
        );
      }
      let userIcon = row.userIcon;
      if (userIcon && userIcon != "") {
        this.circlexPath = Config.StaticUrl + userIcon;
      } else {
        this.circlexPath = "/static/img/userIcon.png";
      }
    },
    queryUpdte(row) {
      //查询学历
      this.$http
        .post(
          "/api/dictionaryCategory/queryDictionByCode",
          {
            code: "education"
          },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          this.educations = res.data.result;
          //	;
        })
        .catch(err => {
          this.loading = false;
          //
        });
    },
    common(row) {
      //查询角色
      let busId = row.busId;
      this.$http
        .post(
          "/api/role/queryRole",
          {
            ucId: row.id
          },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          let result = res.data.result;
          this.roleIds = result;
        })
        .catch(err => {
          this.loading = false;
        });

      this.$http
        .post(
          "/api/uRole/queryURoleByUcId",
          {
            busId: busId,
            ucId: row.id
          },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          this.roleIdOptions = [];
          let result = res.data.result;
          for (let i in result) {
            this.roleIdOptions.push(result[i].roleId);
          }
        })
        .catch(err => {
          this.loading = false;
        });
      this.$http
        .post("/api/busRank/detail/" + row.rank, {
          emulateJSON: true
        })
        .then(res => {
          var data = res.data;
          var result = data.result;
          if (data.success) {
            this.form.rank = result.id;
            this.form.busRank = result.name;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    deleteBtn(row) {
      this.$confirm("是否删除？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(
              "/api/uContact/del",
              {
                ucId: row.id
              },
              {
                emulateJSON: true
              }
            )
            .then(res => {
              var data = res.data;
              if (data.success) {
                this.$message({ customClass: "error", message: "删除成功" });
              } else {
                this.$message({ customClass: "error", message: "删除失败" });
              }
              this.reload();
            })
            .catch(err => {
              this.$message({ customClass: "error", message: "删除失败" });
            });
        })
        .catch(() => {
          this.$message({ customClass: "error", message: "已取消删除" });
        });
    },
    education(row) {
      this.$http
        .post(
          "/api/dictionaryCategory/queryDictionByCode",
          {
            code: "education"
          },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          let result = res.data.result;
          if (result && result != "") {
            for (let i in result) {
              let results = result[i];
              if (results.value == row.education) {
                this.form.education = results.name;
                break;
              }
            }
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    isLogin(row) {
      switch (row.isLogin) {
        case 0:
          this.form.isLogin = "否";
          break;
        case 1:
          this.form.isLogin = "是";
          break;
        default:
          return "";
      }
    },
    arrayInsert(array, insertArray) {
      if (array && array.length > 0 && insertArray && insertArray.length > 0) {
        for (let j in insertArray) {
          let data = insertArray[j];
          if (array.indexOf(data) < 0) {
            array.push(data);
          }
        }
      }
      return array;
    },
    editSubmit(formName) {
      //修改
      let roleIds = this.form.roleIds;
      let roleIdOptions = this.roleIdOptions;
      if (roleIdOptions && roleIdOptions != "") {
        this.form.roleIds = this.arrayInsert(roleIdOptions, roleIds);
      } else if (roleIds && roleIds != "") {
        this.form.roleIds = this.arrayInsert(roleIds, roleIdOptions);
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.passWord = null;
          this.form.busId = this.dataList.bus.id;
          this.form.graduateTime = this.form.graduateTime
            ? new Date(this.form.graduateTime).format("yyyy-MM-dd")
            : null;
          this.form.birthTime = this.form.birth
            ? new Date(this.form.birth).format("yyyy-MM-dd")
            : null;
          this.form.entryTime = this.form.entryTime
            ? new Date(this.form.entryTime).format("yyyy-MM-dd")
            : null;
          this.form.quitTime = this.form.quitTime
            ? new Date(this.form.quitTime).format("yyyy-MM-dd")
            : null;
          if (this.validateObj()) {
            return false;
          }
          this.form.passWord = this.passWord;
          this.$http
            .post("/api/uContact/update", this.form, {
              emulateJSON: true
            })
            .then(res => {
              var data = res.data;
              if (data.success) {
                this.$message({ customClass: "success", message: "修改成功" });
                this.update_dialog = false;
                this.reload();
              } else {
                this.$message({ customClass: "error", message: data.message });
              }
            })
            .catch(err => {
              this.update_dialog = false;
            });
        } else {
          this.validateObj();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.searchParam.departId = "";
      this.reload();
    },
    validateObj() {
      let flag = false;
      let departId = this.form.departId;
      let departIds = this.form.departsId;
      if (!departId || departId == "" || !departIds || departIds == "") {
        document.getElementsByClassName("depart")[0].style.display = "";
        flag = true;
      } else {
        document.getElementsByClassName("depart")[0].style.display = "none";
      }
      let stationId = this.form.stationId;
      if (!stationId || stationId == "") {
        document.getElementsByClassName("stationId")[0].style.display = "";
        flag = true;
      } else {
        document.getElementsByClassName("stationId")[0].style.display = "none";
      }
      let roleIds = this.form.roleIds;
      if (
        (!roleIds || roleIds == "" || roleIds.length <= 0) &&
        this.roleIdOptions.length <= 0
      ) {
        document.getElementsByClassName("roleIds")[0].style.display = "";
        flag = true;
      } else {
        document.getElementsByClassName("roleIds")[0].style.display = "none";
      }
      if (flag) {
        return true;
      } else {
        return false;
      }
    },
    padd(row) {
      this.add_dialog = true;
      this.queryUpdte(row);
      this.uStation(row);
      this.$http
        .post(
          "/api/role/queryRole",
          {
            busId: this.dataList.bus.id
          },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          this.roleIds = res.data.result;
        })
        .catch(err => {
          this.loading = false;
        });
      this.initDepartTree();
    },
    openHolidaySetDialog(row) {
      this.addholiday_dialog = true;
    },
    addSubmit() {
      let graduteTime = this.form.graduateTime;
      let birthTime = this.form.birthTime;
      let entryTime = this.form.entryTime;
      let quitTime = this.form.quitTime;
      this.form.graduateTime = graduteTime
        ? new Date(graduteTime).format("yyyy-MM-dd")
        : null;
      this.form.birthTime = birthTime
        ? new Date(birthTime).format("yyyy-MM-dd")
        : null;
      this.form.entryTime = entryTime
        ? new Date(entryTime).format("yyyy-MM-dd")
        : null;
      this.form.quitTime = quitTime
        ? new Date(quitTime).format("yyyy-MM-dd")
        : null;
      this.form.busId = this.dataList.bus.id;
      this.$http
        .post("/api/uContact/add", this.form, {
          emulateJSON: true
        })
        .then(res => {
          var data = res.data;
          if (data.success) {
            this.$message({ customClass: "success", message: "添加成功" });
          } else {
            this.$message({ customClass: "error", message: data.message });
          }
          this.add_dialog = false;
          this.reload();
        })
        .catch(err => {
          this.add_dialog = false;
        });
    },
    salaryClick() {
      this.$http
        .post(
          "/api/busRank/queryBusRankBySalary",
          {
            busId: this.dataList.bus.id,
            salary: this.form.salary
          },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          var data = res.data;
          var result = data.result;
          if (data.success) {
            this.form.rank = result.id;
            this.form.busRank = result.name;
          }
        })
        .catch(err => {});
    },
    initDepartTree() {
      //初始员工状态
      this.$http
        .post(
          "/api/dictionaryCategory/queryDictionByCode",
          {
            code: "job_status"
          },
          {
            emulateJSON: true
          }
        )
        .then(res => {
          let data = res.data;
          if (data.success) {
            this.jobStatusOptions = data.result;
          }
        })
        .catch(err => {
          this.loading = false;
        });

      this.$http
        .post("/api/depart/departPack", null, {
          emulateJSON: true
        })
        .then(res => {
          var data = res.data;
          if (data.success) {
            var result = data.result;
            this.data = result;
          }
        })
        .catch(err => {});
    },
    handleNodeClick(data) {
      //	;
      this.form.departId = data.$treeNodeId;
    },
    validateUser() {
      let userName = this.form.userName;
      if (userName && userName != "" && userName != this.userName) {
        this.$http
          .post(
            "/api/user/validateUserIsExits",
            {
              userName: userName
            },
            {
              emulateJSON: true
            }
          )
          .then(res => {
            var data = res.data;
            if (data.success) {
              var result = data.result;
              if (result) {
                this.$prompt(
                  "请输入密码",
                  "谨慎提示：此用户已存在，如果您想覆用此用户，请输入正确密码",
                  {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                  }
                )
                  .then(({ value }) => {
                    this.passWord = value;
                    this.$message({
                      customClass: "success",
                      message: "你的密码是: " + value
                    });
                  })
                  .catch(() => {
                    this.$message({
                      customClass: "error",
                      message: "取消输入"
                    });
                  });
              }
            }
          })
          .catch(err => {});
      }
    },
    handleChange(value, label) {
      if (value && value != "") {
        this.form.departId = value[value.length - 1];
        this.form.departsId = value.join(",");
        this.validateObj();
      }
    },
    handleChange1(value) {
      if (value && value != "") {
        this.searchParam.departId = value[value.length - 1];
      }
    },
    removeTag(value) {
      this.form.roleIds = value;
      if (value) {
        this.validateObj();
      }
    },
    stationIsNUll() {
      this.validateObj();
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //接收上传图片的数据
    imgData(data) {
      this.form.userIcon = data;
      this.circlexPath = Config.StaticUrl + data;
    },
    showUploadDialog() {
      this.UploadAvatorVisible = true;
      this.update_dialog = false;
    }
  }
};
</script>
<style scoped>
.uctable {
  margin-top: 22px;
}
.el-form-item {
  margin-bottom: 2px;
}
.color[type="1"] {
  color: #28d096;
}
.color[type="0"] {
  color: #ee5a5a;
}
.sosoform {
  position: relative;
  padding-right: 200px;
}
.sosoform .btn-area {
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 0;
}
.btn {
  margin-left: 0;
  margin-right: 10px;
}
.sosoform .btn-area .btn:nth-child(2n) {
  margin-right: 0;
}
.layout-in {
  margin-bottom: 20px;
  margin-top: 24px;
}
.yuan {
  text-align: center;
  margin: 0px auto 10px auto;
}

.circlex {
  width: 80px;
  height: 80px;
  border-radius: 100%;
}
.box_name {
  font-family: "PingFangSC-Semibold", "Microsoft YaHei", Arial, Helvetica,
    sans-serif, "SimSun";
  font-size: 14px;
  color: #000;
  letter-spacing: 0;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 10px;
}
.wage:after {
  position: absolute;
  content: "工资=合同工资+公司承担的五险一金";
  right: 0;
  top: 10px;
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  transform: scale(0.833);
}

.note {
  width: 603px;
}
.pad_r {
  padding-right: 25px;
}
.upload_img {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 0 auto;
  position: relative;
  border-radius: 50%;
  background-color: #d8d8d8;
  border: 1px solid #979797;
  overflow: hidden;
  cursor: pointer;
  vertical-align: middle;
}
#userIcon {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  top: 0;
  left: 0;
  opacity: 0;
}
.modifyForm {
  padding-left: 30px;
}

.depLabel {
  display: inline-block;
  width: 81px;
  text-align: left;
  font-size: 12px;
  color: #000;
  letter-spacing: 0;
  position: relative;
}
.depLabel span {
  position: absolute;
  left: -10px;
  top: 3px;
  color: #ff4949;
  padding-right: 4px;
}

.error {
  text-align: right;
  color: #ff4949;
  font-size: 12px;
  width: 134px;
  height: 20px;
  line-height: 20px;
}
.form-wrap .el-row {
  margin-bottom: 13px;
}
</style>