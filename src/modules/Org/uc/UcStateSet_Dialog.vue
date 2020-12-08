<template>
	<el-dialog class="dialog442" title="员工状态设置" :visible.sync="dialogVisible" close-on-press-escape :modal="true">
		<el-form :model="form" label-width="70px" ref="form">
			<el-form-item label="起止日期：" class="clearfix" required>
				<div class="fl">
					<el-form-item prop="date1" style="margin-bottom: 0" :rules="{
              required: true, message: '日期不能为空', trigger: 'blur'
            }">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 119px;" :editable="false" :picker-options="pickerBeginDateBefore"></el-date-picker>
					</el-form-item>
				</div>
				<div class="line fl" style="width: 20px; text-align: center">-</div>
				<div class="fl">
					<el-form-item prop="date2" style="margin-bottom: 0" :rules="{
              required: true, message: '日期不能为空', trigger: 'blur'
            }">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 119px;" :editable="false" :picker-options="pickerBeginDateAfter"></el-date-picker>
					</el-form-item>
				</div>
			</el-form-item>
			<el-form-item label="员工姓名：">
				<el-select v-model="form.ucId" filterable placeholder="请选择">
					<el-option v-for="(item, index) in ucNames" :key="index" :label="item.chName" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="假期类型：">
				<el-select v-model="form.type" placeholder="请选择状态">
					<el-option v-for="(item, index) in ucStatus" :key="index" :label="item.name" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button  v-if="saveBtnhasUcId()" type="primary" @click="addstatus" class="submitbtn">保存</el-button>
			<el-button @click="dialogVisible = false" class="cancelbtn">取消</el-button>
			<!--v-if="saveBtnhasUcId()"-->
		</div>
	</el-dialog>
</template>

<script>
export default {
  name: "UcStateSet_Dialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    _form: {
      type: Object
    },
    ucNames: {
      type: Array
    },
    ucStatus: {
      type: Array
    },
    ucId: {
      type: Number
    },
    row: {
      default: function() {
        return {};
      }
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      if (val) {
        this.init();
      } else {
        this.$emit("update:row", {});
      }
      this.$emit("update:visible", val);
    },
    ucId(val) {
      this.$set(this.form, "ucId", val);
    },
    "row.id"() {
      this.putRowData();
    }
  },
  created() {
	vueIns = this;
  },
  data() {
    return {
      form: {},
      dialogVisible: false,
      //搜索结束时间需大于等于开始时间
      pickerBeginDateBefore: {
        disabledDate(time) {
          return (
            vueIns.form.endTime &&
            vueIns.form.endTime.getTime &&
            time.getTime() > vueIns.form.endTime.getTime()
          );
        }
      },
      pickerBeginDateAfter: {
        disabledDate(time) {
          return (
            vueIns.form.startTime &&
            vueIns.form.startTime.getTime &&
            time.getTime() < vueIns.form.startTime.getTime()
          );
        }
      }
    };
  },
  components: {},
  mounted: function() {
//     this.$http
//       .post("/api/uContact/queryAllSonDepart", {
//         emulateJSON: true
//       })
//       .then(res => {
//     		this.chNames = res.data.result;
//     		console.log(this.chNames,12345)
//       })
//       .catch(err => {
//         this.dialogVisible = false;
//       });
    this.dialogVisible = this.visible;
  },
  methods: {
    saveBtnhasUcId() {
      if (Array.isArray(this.ucNames)) {
        for (let i in this.ucNames) {
          let item = this.ucNames[i];
          if (item.id == this.form.ucId) {
            return true;
          }
        }
      }
      return false;
    },
    init() {
      let f = Object.assign({}, this._form);
      this.$set(this.$data, "form", f);
      this.$set(this.form, "ucId", this.ucId);
      this.putRowData();
    },
    putRowData() {
      if (Object.isNotEmpty(this.row)) {
        let r = JSON.parse(JSON.stringify(this.row));
        this.$set(this.form, "startTime", r.startTime);
        this.$set(this.form, "endTime", r.endTime);
        this.$set(this.form, "type", r.type + "");
      }
    },
    addstatus() {
      this.form.startTime = !!this.form.startTime
        ? new Date(this.form.startTime).format("yyyy-MM-dd hh:mm:ss")
        : "";
      this.form.endTime = !!this.form.endTime
        ? new Date(this.form.endTime)
            .fullCurTime()
            .format("yyyy-MM-dd hh:mm:ss")
        : "";
      this.$http
        .post("/api/leave/add", this.form, {
          emulateJSON: true
        })
        .then(res => {
          var data = res.data;
          if (data.success) {
            this.$message({
              customClass: "success",
              message: "添加成功"
            });
          } else {
            this.$message({
              customClass: "error",
              message: "添加失败"
            });
          }
          this.dialogVisible = false;
          this.$parent.reload();
        })
        .catch(err => {
          this.dialogVisible = false;
        });
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 2px;
}
</style>