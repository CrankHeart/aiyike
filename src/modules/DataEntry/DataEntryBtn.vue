<!--数据录入按钮-->
<template>
	<div class="entrybtn-wrap">
		<el-button ref="entrybtn" class="entrybtn" type="primary" @click.stop="entryClick">录入</el-button>

		<!-- 运营数据 -->
		<el-dialog class="dialog442" title="运营数据" :visible.sync="operate_dialog" close-on-press-escape :modal="true" :before-close="operateDialogClose">

			<el-form ref="operateData" :model="operateData" label-width="80px" :rules="operateRules">

				<el-tabs class="tabsOne" v-model="typeMonthData" @tab-click="typeMonthClick">
					<el-tab-pane label="企业月度数据" name="company_month"></el-tab-pane>
					<el-tab-pane label="事业部月度数据" name="division_month"></el-tab-pane>
					<el-tab-pane label="执行部月度数据" name="execute_month"></el-tab-pane>
				</el-tabs>
        
				<el-form-item label="日期：" prop="time" label-width="100px">
					<el-date-picker class="time_input" v-model="operateData.time" type="date" :editable="false" :picker-options="pickerBeginDateBefore">
					</el-date-picker>
				</el-form-item>

				<el-form-item v-if="typeMonthData === 'division_month'" label="事业部：" prop="busDepart" label-width="100px">
					<GroupSelect class="my-input" v-model="operateData.busDepart" :treeData="treeData" placeholder="所属部门"></GroupSelect>
				</el-form-item>

				<el-form-item v-if="typeMonthData !== 'execute_month'" label="目标到款额：" unit="元" prop="planAmount" label-width="100px">
					<el-input style="width:176px" v-model="operateData.planAmount" placeholder="请输入" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>

				<el-form-item v-if="typeMonthData === 'company_month'" label="其它到款额：" unit="元" prop="otherAmount" label-width="100px">
					<el-input style="width:176px" v-model="operateData.otherAmount" placeholder="请输入" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>

				<el-form-item v-if="typeMonthData === 'company_month'" label="运营成本:" unit="元" prop="operAmount" label-width="100px">
					<el-input style="width:176px" v-model="operateData.operAmount" placeholder="请输入" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>

				<el-form-item v-if="typeMonthData === 'execute_month'" label="执行部门：" prop="impDepart" label-width="100px">
					<GroupSelect class="my-input" v-model="operateData.impDepart" :treeData="treeData" placeholder="所属部门"></GroupSelect>
				</el-form-item>

				<el-form-item v-if="typeMonthData === 'execute_month'" label="平摊成本：" unit="元" prop="amount" label-width="100px">
					<el-input style="width:176px" v-model="operateData.amount" placeholder="请输入" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>

				<el-form-item v-if="typeMonthData === 'execute_month'" label="日常成本：" unit="元" prop="dAvgAmount" label-width="100px">
					<el-input style="width:176px" v-model="operateData.dAvgAmount" placeholder="请输入" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="cancelbtn" @click="operateClose">取消</el-button>
				<el-button class="submitbtn" type="primary" @click="operateSubmit">确定</el-button>
			</div>
		</el-dialog>

		<!-- 项目数据 -->
		<el-dialog class="dialog442" title="项目数据" :visible.sync="project_dialog" close-on-press-escape :modal="true" :before-close="projectDialogClose">
			<el-form ref="projectData" :model="projectData" label-width="80px" :rules="projectRules">

				<el-tabs class="tabsTwo" v-model="amount_record" @tab-click="recordClick">
					<el-tab-pane label="到款记录" name="payment_record"></el-tab-pane>
					<el-tab-pane label="支出记录" name="expense_record"></el-tab-pane>
				</el-tabs>

				<!-- 到款记录 -->
				<el-form-item v-if="amount_record === 'payment_record'" label="项目名称：" prop="projectId1">
					<el-select class="nor_input" v-model="projectData.projectId1" clearable placeholder="请选择或输入项目名称" @change="projectChange1" v-sicon1>
						<el-option v-for="item in projectIds1" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<!-- 不可操作 -->
				<el-form-item v-if="amount_record === 'payment_record'" label="合同金额：" unit="元" prop="contract1">
					<el-input style="width:176px" :disabled="true" v-model="projectData.contract1" placeholder="请输入" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>

				<el-form-item v-if="amount_record === 'payment_record'" label="到款金额：" unit="元" prop="account1">
					<el-input style="width:176px" v-model="projectData.account1" placeholder="请输入" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>

				<el-form-item v-if="amount_record === 'payment_record'" label="到款时间：" prop="accountTime1">
					<el-date-picker class="time_input" v-model="projectData.accountTime1" type="date" :editable="false" :picker-options="pickerBeginDateBefore">
					</el-date-picker>
				</el-form-item>

        <el-form-item v-if="amount_record === 'payment_record'" label="备注：" prop="remark1">
					<el-input v-model="projectData.remark1" type="textarea" :rows="4" placeholder="备注说明"></el-input>
				</el-form-item>


				<!-- 支出记录 -->
				<el-form-item v-if="amount_record === 'expense_record'" label="项目名称：" prop="projectId2">
					<el-select class="nor_input" v-model="projectData.projectId2" clearable placeholder="请选择或输入项目名称" @change="projectChange2" v-sicon1>
						<el-option v-for="item in projectIds2" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>


				<el-form-item v-if="amount_record === 'expense_record'" label="事由：" prop="cause">
					<el-select class="nor_input" v-model="projectData.cause" clearable placeholder="请选择事由" v-sicon1 @change="causeChange">
						<el-option v-for="item in causes" :key="item.dkey" :label="item.aliasName" :value="item.dkey">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item v-if="amount_record === 'expense_record' && payType === 1" label="外围团队：" prop="peripheralTeam">
					<el-select class="nor_input" value-key="id" v-model="projectData.peripheralTeam" clearable placeholder="请选择外围团队" v-sicon1 @change="peripheralTeamChange">
						<el-option v-for="item in peripheralTeams" :key="item.id" :label="item.name" :value="item">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item v-if="amount_record === 'expense_record' && payType === 1" label="付款计划：" prop="paymentPlan">
					<el-select class="nor_input" v-model="projectData.paymentPlan" clearable placeholder="请选择付款计划" v-sicon1>
						<el-option v-for="item in paymentPlans" :key="item.id" :label="item.payAmount" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item v-if="amount_record === 'expense_record' && payType === 3" label="小部门：" prop="sDepart">
					<el-select class="nor_input" v-model="projectData.sDepart" clearable placeholder="请选择小部门" v-sicon1>
						<el-option v-for="item in sDeparts" :key="item.depart_id" :label="item.label" :value="item.depart_id">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item v-if="amount_record === 'expense_record'" label="支出金额：" unit="元" prop="amount">
					<el-input style="width:176px" v-model="projectData.amount" placeholder="请正确输入付款金额" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>

				<el-form-item v-if="amount_record === 'expense_record'" label="支出时间：" prop="amountTime">
					<el-date-picker class="time_input" v-model="projectData.amountTime" type="date" :editable="false" :picker-options="pickerBeginDateBefore">
					</el-date-picker>
				</el-form-item>

				<el-form-item v-if="amount_record === 'expense_record'" label="备注：" prop="remark2">
					<el-input v-model="projectData.remark2" type="textarea" :rows="4" placeholder="备注说明"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="cancelbtn" @click="projectClose">取消</el-button>
				<el-button class="submitbtn" type="primary" @click="projectSubmit">确定</el-button>
			</div>
		</el-dialog>

		<!-- 指标数据 -->
		<el-dialog class="dialog442" title="指标数据" :visible.sync="index_dialog" close-on-press-escape :modal="true" :before-close="indexDialogClose">
			<el-form ref="indexData" :model="indexData" label-width="80px" :rules="indexRules">
				<el-form-item label="时间：" label-width="100px" prop="time">
					<el-date-picker class="time_input" v-model="indexData.time" type="date" :editable="false" :picker-options="pickerBeginDateBefore">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="平均单人指标：" label-width="100px" unit="元" prop="amount">
					<el-input class="nor_input" v-model="indexData.amount" placeholder="请输入" auto-complete="off" :maxlength="20" style="width:176px"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="cancelbtn" @click="indexClose">取消</el-button>
				<el-button class="submitbtn" type="primary" @click="indexSubmit">确定</el-button>
			</div>
		</el-dialog>

		<!-- 额度调整 -->
		<el-dialog class="dialog442" title="额度调整" :visible.sync="quota_dialog" close-on-press-escape :modal="true" :before-close="quotaDialogClose">

			<el-form ref="quotaData" :model="quotaData" label-width="80px" :rules="quotaRules">
				<el-form-item label="项目名称：" prop="project">
					<el-select class="nor_input" v-model="quotaData.project" clearable placeholder="请选择或输入项目名称" @change="quotaSelectDepa" v-sicon1>
						<el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="执行部门：" prop="departId">
					<el-select class="nor_input" v-model="quotaData.departId" clearable placeholder="请选择或输入项目名称" v-sicon1>
						<el-option v-for="item in departIds" :key="item.depart_id" :label="item.label" :value="item.depart_id">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="调配额：" unit="元" prop="amount">
					<el-input style="width:176px" v-model="quotaData.amount" placeholder="请输入金额" auto-complete="off" :maxlength="20"></el-input>
				</el-form-item>

				<el-form-item label="调整日期：" prop="amountTime">
					<el-date-picker class="time_input" v-model="quotaData.amountTime" type="date" :editable="false" :picker-options="pickerBeginDateBefore">
					</el-date-picker>
				</el-form-item>

				<el-form-item label="调整原因：" prop="reason">
					<el-input v-model="quotaData.reason" type="textarea" :rows="4" placeholder="填写备注"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="cancelbtn" @click="quotaClose">取消</el-button>
				<el-button class="submitbtn" type="primary" @click="quotaSubmit">确定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
import $ from "jquery";
import { bus } from "@/utils/bus";

let Tabs = () => import("@/components/tabs/Tabs.vue");
let TabPane = () => import("@/components/tabs/TabPane.vue");
let GroupSelect = () => import("@/components/select/GroupSelect.vue");

export default {
  name: "OperateData",
  data() {
    return {
      eluid: "",
      treeData: [],
      dataList: JSON.parse(Cache.local(Config.Login)),
      operateType: 1,
      busId: "",
      isShow: false,
      financeType: "indexData",
      amount_record: "payment_record",
      typeMonthData: "company_month",
      payType: "",
      itemOutId: "",
      operate_dialog: false,
      project_dialog: false,
      index_dialog: false,
      quota_dialog: false,
      cause_num: true,
      projectIds1: [],
      projectIds2: [],
      sDeparts: [],
      peripheralTeams: [],
      projectName1: "",
      projectName2: "",
      operateData: {
        time: "",
        busDepart: "",
        planAmount: "",
        otherAmount: "",
        operAmount: "",
        impDepart: "",
        amount: "",
        dAvgAmount: ""
      },
      projectData: {
        itemId: "",
        itemName: "",
        contract1: "",
        contract2: "",
        amount: "",
        amountTime: "",
        remark1: "",
        remark2: "",
        peripheralTeam: {
          bus_id: "",
          id: ""
        }
      },

      indexData: {
        singleIndex: null,
        time: ""
      },
      quotaData: {
        projectOne: "",
        projectTwo: "",
        amount: "",
        amountTime: "",
        resaon: ""
      },
      operateRules: {
        time: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        busDepart: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        planAmount: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        otherAmount: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        operAmount: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        impAmount: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        amount: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        dAvgAmount: [
          {
            required: true,
            message: "不能为空"
          }
        ]
      },
      projectRules: {
        projectId1: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        projectId2: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        contract1: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        account1: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        accountTime1: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        cause: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        sDepart: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        remark1: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        remark2: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        amount: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        amountTime: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        peripheralTeam: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        paymentPlan: [
          {
            required: true,
            message: "不能为空"
          }
        ]
      },
      indexRules: {
        amount: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        time: [
          {
            required: true,
            message: "不能为空"
          }
        ]
      },
      quotaRules: {
        project: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        departId: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        amount: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        amountTime: [
          {
            required: true,
            message: "不能为空"
          }
        ],
        reason: [
          {
            required: true,
            message: "不能为空"
          }
        ]
      },
      pickerBeginDateBefore: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      departIds: [],
      projects: [],
      causes: [],
      paymentPlans: []
    };
  },
  components: {
    Tabs,
    TabPane,
    bus,
    GroupSelect
  },
  beforeMount() {
    this.addEl();
    this.bindDomEvent();
    this.bindLiEvent();
  },
  mounted() {
    this.getDepartmentData();
    this.getProjectIds();
    this.getCauses();
  },
  beforeDestroy() {
    $("#" + this.eluid).remove();
  },
  methods: {
    operateDialogClose() {
      this.$refs.operateData.resetFields();
      this.operate_dialog = false;
    },
    projectDialogClose() {
      this.$refs.projectData.resetFields();
      this.project_dialog = false;
    },
    indexDialogClose() {
      this.$refs.indexData.resetFields();
      this.index_dialog = false;
    },
    quotaDialogClose() {
      this.$refs.quotaData.resetFields();
      this.quota_dialog = false;
    },
    bindDomEvent() {
      $(document).bind("click", () => {
        this.isShow = false;
        this.hide();
      });
    },
    getProjectIds() {
      this.$http
        .post("/api/item/normalItem", {
          emulateJSON: true
        })
        .then(res => {
          this.projectIds1 = res.data.result;
          this.projectIds2 = [].concat(res.data.result);
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getCauses() {
      let data = {
        code: "reason"
      };
      this.$http
        .post("/api/dictionaryCategory/queryDictionByCode", data, {
          emulateJSON: true
        })
        .then(res => {
          this.causes = res.data.result;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getDepartmentData() {
      this.$http
        .post(
          "/api/depart/departTree",
          {},
          {
            emulateJSON: true
          }
        )
        .then(res => {
          let ar = res.data.result;
          Object.isNotEmpty(ar) ? ar.pop() : void 0;
          this.treeData = ar || [];
        })
        .catch(err => {});
    },
    bindLiEvent() {
      const _self = this;
      $(document).on("click", `#${this.eluid} li:first-child`, e => {
        this.operate_dialog = true;
      });
      $(document).on("click", `#${this.eluid} li:nth-child(2)`, e => {
        this.project_dialog = true;
      });
      $(document).on("click", `#${this.eluid} li:nth-child(3)`, e => {
        this.index_dialog = true;
      });
      $(document).on("click", `#${this.eluid} li:last-child`, e => {
        this.departIds = [];
        this.quota_dialog = true;
        this.$http
          .post("/api/item/normalItem", {
            emulateJSON: true
          })
          .then(res => {
            this.projects = res.data.result;
          })
          .catch(err => {
            this.loading = false;
          });
      });
      this.hide();
      this.bindDomEvent();
    },
    operateClose() {
      this.operate_dialog = false;
      this.$refs.operateData.resetFields();
    },
    operateSubmit() {
      this.$refs.operateData.validate(valid => {
        if (valid) {
          if (this.operateType === 1) {
            let ymd;
            if (this.operateData.time) {
              ymd = this.operateData.time.format("yyyy-MM-dd hh:mm:ss");
            } else {
              ymd = "";
            }
            let sbody = {
              bus: {
                type: 1,
                ymd: ymd,
                planAmount: this.operateData.planAmount,
                otherAmount: this.operateData.otherAmount,
                operAmount: this.operateData.operAmount
              }
            };
            let body = JSON.stringify(sbody);
            let data = {
              body: body
            };
            this.$http
              .post("/api/operate/add", data, {
                emulateJSON: true
              })
              .then(res => {
                if (res.data.success) {
                  this.$message({
                    customClass: "success",
                    customClass: "success",
                    message: res.data.message
                  });
                  bus.$emit("operateEvent", "");
                  this.operate_dialog = false;
                  this.loading = false;
                } else {
                  this.$message({
                    customClass: "error",
                    customClass: "error",
                    message: res.data.message
                  });
                  this.operate_dialog = true;
                  this.loading = false;
                }
              })
              .catch(err => {
                this.$message({
                  customClass: "error",
                  customClass: "error",
                  message: err.data.message
                });
                this.operate_dialog = true;
                this.loading = false;
              });
          }
          if (this.operateType === 2) {
            let ymd;
            if (this.operateData.time) {
              ymd = this.operateData.time.format("yyyy-MM-dd hh:mm:ss");
            } else {
              ymd = "";
            }
            let sbody = {
              depart: {
                type: 2,
                ymd: ymd,
                departId: this.operateData.busDepart.id,
                departName: this.operateData.busDepart.label,
                planAmount: this.operateData.planAmount
              }
            };
            let body = JSON.stringify(sbody);
            let data = {
              body: body
            };
            this.$http
              .post("/api/operate/add", data, {
                emulateJSON: true
              })
              .then(res => {
                if (res.data.success) {
                  this.$message({
                    customClass: "success",
                    customClass: "success",
                    message: res.data.message
                  });
                  bus.$emit("operateEvent", "");
                  this.operate_dialog = false;
                  this.loading = false;
                } else {
                  this.$message({
                    customClass: "error",
                    customClass: "error",
                    message: res.data.message
                  });
                  this.operate_dialog = true;
                  this.loading = false;
                }
              })
              .catch(err => {
                this.$message({
                  customClass: "error",
                  customClass: "error",
                  message: err.data.message
                });
                this.operate_dialog = true;
                this.loading = false;
              });
          }
          if (this.operateType === 3) {
            let ymd;
            if (this.operateData.time) {
              ymd = this.operateData.time.format("yyyy-MM-dd hh:mm:ss");
            } else {
              ymd = "";
            }
            let sbody = {
              excu: {
                type: 3,
                ymd: ymd,
                departId: this.operateData.impDepart.id,
                departName: this.operateData.impDepart.label,
                amount: this.operateData.amount,
                dAvgAmount: this.operateData.dAvgAmount
              }
            };
            let body = JSON.stringify(sbody);
            let data = {
              body: body
            };
            this.$http
              .post("/api/operate/add", data, {
                emulateJSON: true
              })
              .then(res => {
                if (res.data.success) {
                  this.$message({
                    customClass: "success",
                    customClass: "success",
                    message: res.data.message
                  });
                  bus.$emit("operateEvent", "");
                  this.operate_dialog = false;
                  this.loading = false;
                } else {
                  this.$message({
                    customClass: "error",
                    customClass: "error",
                    message: res.data.message
                  });
                  this.operate_dialog = true;
                  this.loading = false;
                }
              })
              .catch(err => {
                this.$message({
                  customClass: "error",
                  customClass: "error",
                  message: err.data.message
                });
                this.operate_dialog = true;
                this.loading = false;
              });
          }
          this.$refs.operateData.resetFields();
        } else {
          return false;
        }
      });
    },
    projectClose() {
      this.project_dialog = false;
      this.$refs.projectData.resetFields();
    },
    peripheralTeamChange(val) {
      this.busId = val.bus_id;
      this.itemOutId = val.id;
      let data = {
        itemId: this.projectData.projectId2,
        itemOutId: this.itemOutId
      };
      this.$http
        .post("/api/payPlan/queryPayPlan", data, {
          emulateJSON: true
        })
        .then(res => {
          if (res.data.result !== []) {
            this.paymentPlans = res.data.result;
          } else {
            this.paymentPlans = [];
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    projectChange1(val) {
      let data = {
        id: val
      };
      this.$http
        .post("/api/item/findItemById", data, {
          emulateJSON: true
        })
        .then(res => {
          this.projectData.contract1 = res.data.result.totalAmount;
          this.projectName1 = res.data.result.name;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    projectChange2(val) {
      let teamData = {
        itemId: val
      };
      this.$http
        .post("/api/itemOut/queryItemOutByItemId", teamData, {
          emulateJSON: true
        })
        .then(res => {
          if (res.data.result) {
            this.peripheralTeams = res.data.result;
          } else {
            this.projectData.peripheralTeam = "无";
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    projectSubmit() {
      this.$refs.projectData.validate(valid => {
        if (valid) {
          //到款记录
          if (this.amount_record === "payment_record") {
            let ymd;
            if (this.projectData.accountTime1) {
              ymd = this.projectData.accountTime1.format("yyyy-MM-dd hh:mm:ss");
            } else {
              ymd = "";
            }
            let data = {
              itemId: this.projectData.projectId1,
              itemName: this.projectName1,
              contract: this.projectData.contract1,
              account: this.projectData.account1,
              ymd: ymd,
              remark: this.projectData.remark1
            };
            this.$http
              .post("/api/arrival/add", data, {
                emulateJSON: true
              })
              .then(res => {
                if (res.data.success) {
                  this.$message({
                    customClass: "success",
                    customClass: "success",
                    message: res.data.message
                  });
                  bus.$emit("projectEvent", "");
                  this.project_dialog = false;
                  this.loading = false;
                } else {
                  this.$message({
                    customClass: "error",
                    customClass: "error",
                    message: res.data.message
                  });
                  this.project_dialog = true;
                  this.loading = false;
                }
              })
              .catch(err => {
                this.$message({
                  customClass: "error",
                  customClass: "error",
                  message: err.data.message
                });
                this.project_dialog = true;
                this.loading = false;
              });
          } else if (this.amount_record === "expense_record") {
            let ymd;
            if (this.projectData.amountTime) {
              ymd = this.projectData.amountTime.format("yyyy-MM-dd hh:mm:ss");
            } else {
              ymd = "";
            }
            let data = {
              type: this.payType,
              itemId: this.projectData.projectId2,
              amount: this.projectData.amount,
              ymd: ymd,
              remark: this.projectData.remark2
            };
            if (this.payType === 1) {
              data.busId = this.busId;
              data.payPlanId = this.projectData.paymentPlan;
              data.itemOutId = this.itemOutId;
            }
            if (this.payType === 3) {
              data.departId = this.projectData.sDepart;
            }
            this.$http
              .post("/api/payment/add", data, {
                emulateJSON: true
              })
              .then(res => {
                if (res.data.success) {
                  this.$message({
                    customClass: "success",
                    customClass: "success",
                    message: res.data.message
                  });
                  bus.$emit("projectEvent", "");
                  this.project_dialog = false;
                  this.loading = false;
                } else {
                  this.$message({
                    customClass: "error",
                    customClass: "error",
                    message: res.data.message
                  });
                  this.project_dialog = true;
                  this.loading = false;
                }
              })
              .catch(err => {
                this.$message({
                  customClass: "error",
                  customClass: "error",
                  message: err.data.message
                });
                this.project_dialog = true;
                this.loading = false;
              });
          } else {
            return;
          }
          this.$refs.projectData.resetFields();
        } else {
          return false;
        }
      });
    },
    indexClose() {
      this.$refs.indexData.resetFields();
      this.index_dialog = false;
    },
    indexSubmit() {
      this.$refs.indexData.validate(valid => {
        if (valid) {
          let data = {
            ymd: this.indexData.time.format("yyyy-MM-dd hh:mm:ss"),
            amount: this.indexData.amount
          };
          this.$http
            .post("/api/quota/add", data, {
              emulateJSON: true
            })
            .then(res => {
              if (res.data.success) {
                this.$message({
                  customClass: "success",
                  customClass: "success",
                  message: res.data.message
                });
                bus.$emit("indexEvent", "");
                this.index_dialog = false;
                this.loading = false;
              } else {
                this.$message({
                  customClass: "error",
                  customClass: "error",
                  message: res.data.message
                });
                this.index_dialog = true;
                this.loading = false;
              }
            })
            .catch(err => {
              this.$message({
                customClass: "error",
                customClass: "error",
                message: err.data.message
              });
              this.loading = false;
            });

          this.$refs.indexData.resetFields();
        } else {
          return false;
        }
      });
    },
    quotaClose() {
      this.quota_dialog = false;
      this.$refs.quotaData.resetFields();
    },
    quotaSelectDepa(val) {
      let data = {
        itemId: val
      };
      this.$http
        .post("/api/item/perform", data, {
          emulateJSON: true
        })
        .then(res => {
          this.departIds = res.data.result;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    quotaSubmit() {
      this.$refs.quotaData.validate(valid => {
        if (valid) {
          let data = {
            departId: this.quotaData.departId,
            itemId: this.quotaData.project
          };
          if (this.quotaData.amountTime) {
            let ymd = this.quotaData.amountTime.format("yyyy-MM-dd hh:mm:ss");
            data.ymd = ymd;
          }
          if (this.quotaData.amount) {
            data.amount = this.quotaData.amount;
          }
          if (this.quotaData.reason) {
            data.remark = this.quotaData.reason;
          }
          if (this.quotaData.departId !== "" || this.quotaData.project !== "") {
            this.$http
              .post("/api/quotaAdjust/add", data, {
                emulateJSON: true
              })
              .then(res => {
                if (res.data.success) {
                  this.$message({
                    customClass: "success",
                    customClass: "success",
                    message: res.data.message
                  });
                  this.quota_dialog = false;
                  this.loading = false;
                } else {
                  this.$message({
                    customClass: "error",
                    customClass: "error",
                    message: res.data.message
                  });
                  this.quota_dialog = true;
                  this.loading = false;
                }
              })
              .catch(err => {
                this.$message({
                  customClass: "error",
                  customClass: "error",
                  message: err.data.message
                });
                this.quota_dialog = true;
                this.loading = false;
              });
          }
          this.$refs.quotaData.resetFields();
        } else {
          return false;
        }
      });
    },
    typeMonthClick(tab, event) {
      if (this.typeMonthData === "company_month") {
        this.operateType = 1;
      } else if (this.typeMonthData === "division_month") {
        this.operateType = 2;
      } else if (this.typeMonthData === "execute_month") {
        this.operateType = 3;
      }
      this.$refs.operateData.resetFields();
    },
    recordClick(tab, event) {
      this.projectData = {
        itemId: "",
        itemName: "",
        contract1: "",
        contract2: "",
        amount: null,
        amountTime: "",
        remark1: "",
        remark2: "",
        peripheralTeam: {
          bus_id: "",
          id: ""
        }
      };
      this.$refs.projectData.resetFields();
      this.getProjectIds();
    },
    causeChange(val) {
      if (val === 'reason_pcost') {
        this.payType = 1;
      } else if (val === 'reason_bcost') {
        this.payType = 2;
      } else if (val === 'reason_bnomal') {
        this.payType = 3;
        this.getSDepart();
      } else if (val === 'reason_hardware') {
        this.payType = 4;
      } else if (val === 'reason_contract') {
        this.payType = 5;
      } else {
        return;
      }
    },
    getSDepart() {
      let data = {
        itemId: this.projectData.projectId2
      };
      this.$http
        .post("/api/operate/queryDepartByItemId", data, {
          emulateJSON: true
        })
        .then(res => {
          this.sDeparts = res.data.result;
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
    },
    guid() {
      return (
        "uid-" +
        "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
          let r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        })
      );
    },
    addEl() {
      if (!this.eluid) {
        this.eluid = this.guid();
      }
      $(
        [
          '<ul id="' + this.eluid + '" class="entrybtn-wrap-menu">',
          "<li>运营数据</li>",
          "<li>项目数据</li>",
          "<li>指标数据</li>",
          "<li>额度调整</li>",
          "</ul>"
        ].join("")
      ).appendTo("body");
      $(`#${this.eluid} li`).attr("cursor", "pointer");
    },
    entryClick() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.show();
        this.draw();
      } else {
        this.hide();
      }
    },
    hide() {
      $("#" + this.eluid).hide();
    },
    show() {
      $("#" + this.eluid).show();
    },
    draw() {
      let offset = $(this.$refs.entrybtn.$el).offset();
      let x = offset.left;
      let y = offset.top;
      let $el = $(this.$refs.entrybtn.$el);
      let elw = $el.width();
      let elh = $el.height();
      let $menu = $("#" + this.eluid);
      let menuW = $menu.width();
      let menuH = $menu.height();
      $menu.css("left", x + elw / 2 - menuW / 2);
      $menu.css("top", y + elh + 5);
    }
  }
};
</script>

<style scoped>
.entrybtn-wrap {
  line-height: normal;
  position: relative;
  display: inline-block;
}

.entrybtn {
  border-radius: 2px;
  border: none;
  padding: 0;
  line-height: 0;
  height: 30px;
  width: 58px;
}

.time_input {
  width: 109px;
}

.nor_input {
  width: 176px;
}

.el-form-item {
  margin-bottom: 0;
}

.el-dialog__body {
  padding: 0;
}

.el-form-item__content .group-select {
  width: 50%;
}
</style>

<style>
.entrybtn-wrap-menu {
  position: absolute;
  background: #171718;
  top: -9999px;
  left: -9999px;
}

.entrybtn-wrap-menu li {
  padding-left: 14px;
  padding-right: 14px;
  font-size: 14px;
  border-bottom: 1px solid #303031;
  height: 42px;
  width: 61px;
  line-height: 40px;
  color: #dcdcdc;
  text-align: left;
  cursor: pointer;
}

.entrybtn-wrap-menu:before {
  content: "";
  position: absolute;
  top: -3px;
  left: 41.5px;
  width: 0;
  height: 0;
  border-bottom: 6px solid #171718;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
}

.entrybtn-wrap-menu li:nth-last-of-type(1) {
  border: none;
}
</style>