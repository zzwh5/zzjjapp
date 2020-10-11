<template>
  <div class="estate">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text" v-if="estateEditType == 0">新增小区</div>
      <div class="head_text" v-if="estateEditType == 1">修改小区</div>
      <div class="head_add">
        <img src="@/assets/image/save.png" @click="save" alt />
      </div>
    </div>
    <!-- 提示 -->
    <div class="hint">
      <p>基本信息</p>
      <p>标*的为必填项</p>
    </div>
    <!-- 小区信息展示 -->
    <div class="info">
      <van-form ref="Form" @submit="onSubmit">
        <div class="info_item" @click="showName('orgName')">
          <van-field
            v-model="estateInfo.orgName"
            name="所属网格"
            label="所属网格"
            placeholder="所属网格位置"
            required
            readonly
            :rules="[{ required: true, trigger: 'o' }]"
          />
          <img src="@/assets/image/more.png" alt />
        </div>
        <div class="info_item">
          <van-field
            v-model="estateInfo.villageName"
            name="小区名称"
            label="小区名称"
            placeholder="请输入"
            required
            :rules="[{ required: true }]"
          />
          <!-- 占位 -->
          <span></span>
        </div>
        <div class="info_item" @click="changeAddress()">
          <van-field
            v-model="estateInfo.addressStr"
            name="镇街"
            label="镇街"
            placeholder="请选择"
            required
            readonly
            :rules="[{ required: true, trigger: 'o' }]"
          />
          <img src="@/assets/image/more.png" alt />
        </div>
        <div class="info_item">
          <van-field
            v-model="estateInfo.houseNumber"
            name="门牌号"
            label="门牌号"
            placeholder="请输入"
            required
            :rules="[{ required: true }]"
          />
          <!-- 占位 -->
          <span></span>
        </div>
        <div class="info_item" @click="showName('propertyManagement')">
          <van-field
            v-model="estateInfo.propertyManagementStr"
            name="物业管理"
            label="物业管理"
            placeholder="请输入"
            :rules="[{ required: false }]"
          />
          <img src="@/assets/image/more.png" alt />
        </div>
      </van-form>
    </div>

    <!-- 弹框 -->
    <van-dialog
      v-model="show"
      title
      :showConfirmButton="false"
      closeOnClickOverlay
    >
      <div class="orgname" v-if="dialogType == 'orgName'">
        <p>请选择所属网格</p>
        <p>{{ estateInfo.orgName }}</p>
      </div>
      <div class="propertyManagement" v-if="dialogType == 'propertyManagement'">
        <p>请选择是否物业管理</p>
        <p @click="changePropertyManagement(1)">是</p>
        <p @click="changePropertyManagement(0)">否</p>
      </div>
    </van-dialog>

    <!-- 省市区  -->
    <van-popup v-model="cityVisable" position="bottom">
      <van-picker
        show-toolbar
        title="请选择地区"
        value-key="name"
        :columns="areaList"
        @change="onAreaChange"
        @cancel="onCancel"
        @confirm="onAreaConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
// 接口引入
import { detailEstate, editEstate } from "@/api/house";
import { getAddress } from "@/api/common";
// 提示框
import { Notify } from "vant";
// 引入弹框
import { Dialog } from "vant";

export default {
  name: "EditEstate",
  data() {
    return {
      // 修改的小区id
      estateId: sessionStorage.getItem("estateId"),
      // 当前是新增还是修改小区信息 0 新增 1 修改
      estateEditType: sessionStorage.getItem("estateEditType"),
      // 小区信息
      estateInfo: {
        // 通过用户登录信息获得
        orgId: sessionStorage.getItem("orgId"),
        orgName: sessionStorage.getItem("name"),
        province: "370000000000",
        provinceStr: "山东省",
        city: "370400000000",
        cityStr: "枣庄市"
      },
      // 弹框的开关
      show: false,
      // 弹框内容类型
      dialogType: "orgName",
      //遮罩层显示或隐藏
      cityVisable: false,
      //自定义数据五级结构
      areaList: [
        {
          values: [
            {
              name: "请选择"
            },
            {
              code: "370481000000",
              name: "滕州市"
            }
          ]
        },
        { values: [] },
        { values: [] }
      ]
    };
  },
  watch: {
    // 监听小区信息的变化 更改addressStr
    estateInfo: {
      handler: function(value, old) {
        // console.log("changeAddress");
        if (value.provinceStr == null || !value.provinceStr) {
          console.log(1111);
          return false;
        }
        this.estateInfo.addressStr =
          this.estateInfo.provinceStr +
          this.estateInfo.cityStr +
          this.estateInfo.districtStr +
          this.estateInfo.streetStr +
          this.estateInfo.communityStr;
      },
      deep: true
    }
  },
  created() {
    // 小区详情
    if (this.estateEditType != 0) {
      this.getEstateInfo();
    }
    // 省市区
    // this.getArea("", 0);
  },
  methods: {
    // 返回上一级路由
    goback() {
      this.$router.go(-1);
    },
    // 获取小区信息
    getEstateInfo() {
      var that = this;
      var obj = {
        id: this.estateId
      };
      return detailEstate(obj).then(res => {
        // console.log(res);
        that.estateInfo = res.ret;
        that.estateInfo.addressStr =
          that.estateInfo.provinceStr +
          that.estateInfo.cityStr +
          that.estateInfo.districtStr +
          that.estateInfo.streetStr +
          that.estateInfo.communityStr;
        // console.log(that.estateInfo.addressStr);
      });
    },
    // 保存小区信息
    save() {
      console.log("save");
      this.$refs.Form.submit();
    },
    // 提交表单
    onSubmit(values) {
      // console.log("tijiao");
      var that = this;
      if (this.estateEditType == 1) {
        Dialog.alert({
          message: "您确定提交修改吗？",
          showCancelButton: true,
          cancel: () => {
            console.log("cancel");
          }
        })
          .then(() => {
            return editEstate(that.estateInfo).then(res => {
              // console.log(res);
              if (res.code != 200) {
                Notify({ type: "warning", message: res.msg });
                return;
              }
              that.$router.go(-1);
            });
          })
          .catch(() => {});

        return;
      }
      console.log(this.estateInfo);
      return editEstate(this.estateInfo).then(res => {
        // console.log(res);
        if (res.code != 200) {
          Notify({ type: "warning", message: res.msg });
          return;
        }
        that.$router.go(-1);
      });
    },
    // 弹框展示
    showName(text) {
      this.dialogType = text;
      this.show = true;
    },
    // 改变
    changePropertyManagement(type) {
      // console.log(type);
      this.estateInfo.propertyManagement = type;
      this.estateInfo.propertyManagementStr = type == 0 ? "否" : "是";
      // console.log(this.estateInfo.propertyManagementStr);
      this.show = false;
    },
    // 打开省市区的弹框
    changeAddress() {
      this.cityVisable = true;
    },
    //网络请求地区数据(难点在如何拼装三级结构)
    getArea(parentId, index) {
      return getAddress(parentId).then(res => {
        // console.log(res);
        // //当请求成功时
        const regionList = res.ret;
        this.areaList[index].values = [
          { name: "请选择" },
          ...regionList //ES6新语法
        ];
        if (index == 0) {
          //当请求的是三级内的内容时
          this.areaList[index + 1].values = [];
          this.areaList[index + 2].values = [];
        } else if (index == 1) {
          this.areaList[index + 1].values = [];
        }
        this.areaList = [...this.areaList]; //更新areaList
      });
    },
    //当地区选择变化时
    onAreaChange(picker, values, index) {
      // values 选择的内容 index当前选择的列数的索引
      // console.log(values, index);
      if (index < 2) {
        this.getArea(values[index].code, index + 1); //传参 参数为上层选择的地区的code
      }
      // else {
      //   this.cityVisable = false;
      // }
    },
    //点击取消
    onCancel() {
      this.cityVisable = false;
    },

    //点击确定
    onAreaConfirm(value) {
      console.log(value);
      // console.log(value[4], value[3], value[2], value[1], value[0]);
      // 都有内容
      if (value[2] && value[1] && value[0]) {
        console.log("有内容");
        // 如果是直辖市的特殊情况
        if (
          // 都选择了内容的情况下
          value[2].code &&
          value[1].code &&
          value[0].code
        ) {
          this.$set(this.estateInfo, "communityStr", value[2].name);
          this.$set(this.estateInfo, "streetStr", value[1].name);
          this.$set(this.estateInfo, "districtStr", value[0].name);
          this.$set(this.estateInfo, "community", value[2].code);
          this.$set(this.estateInfo, "street", value[1].code);
          this.$set(this.estateInfo, "district", value[0].code);
          console.log(this.estateInfo);
        } else {
          if (this.estateEditType == 0) {
            // console.log("有 清空");
            this.$set(this.estateInfo, "communityStr", "");
            this.$set(this.estateInfo, "streetStr", "");
            this.$set(this.estateInfo, "districtStr", "");
            this.$set(this.estateInfo, "community", "");
            this.$set(this.estateInfo, "street", "");
            this.$set(this.estateInfo, "district", "");
          }
        }
      } else {
        this.$set(this.estateInfo, "communityStr", "");
        this.$set(this.estateInfo, "streetStr", "");
        this.$set(this.estateInfo, "districtStr", "");
        this.$set(this.estateInfo, "community", "");
        this.$set(this.estateInfo, "street", "");
        this.$set(this.estateInfo, "district", "");
      }
      this.cityVisable = false;
    }
  }
};
</script>
<style scoped lang="scss">
.estate {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .header {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    height: 44px;
    background: #f5f5f5;
    box-shadow: 0px 3px 9px 0px #e1e1e1;
    justify-content: space-between;
    padding: 0 13px;
    box-sizing: border-box;
    .head_back {
      display: flex;
      align-items: center;
      img {
        width: 19px;
        height: 17px;
      }
    }
    .head_text {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 31px;
    }
    .head_add {
      display: flex;
      align-items: center;
      img {
        width: 18px;
        height: 18px;
      }
    }
  }
  .hint {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 25px;
    background-color: #f6f6f6;
    margin-top: 4px;
    box-sizing: border-box;
    padding: 0 16px;
    & > p:nth-child(1) {
      font-size: 14px;
      font-weight: 400;
      color: #2d2d2d;
    }
    & > p:nth-child(2) {
      font-size: 14px;
      font-weight: 400;
      color: #f02626;
    }
  }
  .info {
    .info_item {
      position: relative;
      /deep/.van-cell {
        line-height: 27px;
        position: relative;
        &:after {
          border-bottom: 2px solid #eeeeee;
        }
        .van-cell__value {
          .van-field__body {
            .van-field__control {
              width: 92%;
            }
          }
        }
      }
      img {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 17px;
      }
    }
  }
  /deep/.van-overlay {
    background-color: rgba(0, 0, 0, 0.2);
  }
  /deep/.van-dialog {
    width: 90%;
    border-radius: 9px;
    div {
      p {
        padding-left: 17px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        box-sizing: border-box;
      }
    }
    .orgname {
      p:nth-child(1) {
        width: 100%;
        height: 49px;
        background: #eeeeee;
      }
      p:nth-child(2) {
        width: 100%;
        height: 44px;
      }
    }
    .propertyManagement {
      p:nth-child(1) {
        width: 100%;
        height: 49px;
        background: #eeeeee;
      }
      p:nth-child(2) {
        border-bottom: 1px solid #e5e5e5;
      }
      p:nth-child(2),
      p:nth-child(3) {
        width: 100%;
        height: 39px;
      }
    }
  }
}
</style>