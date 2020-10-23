<template>
  <div class="estateInfo">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text">小区基本信息</div>
      <div class="head_add">
        <img
          @click="editEstate"
          src="@/assets/image/edit.png"
          v-if="!onlySee"
          alt
        />
      </div>
    </div>
    <!-- 小区信息展示 -->
    <div class="info">
      <van-form ref="Form">
        <div class="info_item">
          <van-field v-model="estateInfo.orgName" label="所属网格" readonly />
          <!-- 占位 -->
          <span></span>
        </div>
        <div class="info_item">
          <van-field
            v-model="estateInfo.villageName"
            label="小区名称"
            readonly
          />
          <!-- 占位 -->
          <span></span>
        </div>
        <div class="info_item">
          <van-field
            v-model="estateInfo.streetCommunity"
            label="镇街"
            readonly
          />
          <!-- 占位 -->
          <span></span>
        </div>
        <div class="info_item">
          <van-field v-model="estateInfo.houseNumber" label="门牌号" readonly />
          <!-- 占位 -->
          <span></span>
        </div>
        <div class="info_item">
          <van-field
            v-model="estateInfo.propertyManagementStr"
            label="物业管理"
            readonly
          />
          <!-- 占位 -->
          <span></span>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { detailEstate } from "@/api/house";
export default {
  name: "EstateInfo",
  data() {
    return {
      // 当前的权限是不是只是只查看
      onlySee: sessionStorage.getItem("onlySee") == "false" ? false : true,
      // 小区id
      id: sessionStorage.getItem("estateId"),
      // 小区信息
      estateInfo: {}
    };
  },
  created() {
    // console.log(this.id);
    // 小区详情
    this.getEstateInfo();
  },
  methods: {
    // 返回上一级路由
    goback() {
      this.$router.go(-1);
    },
    // 修改小区信息
    editEstate() {
      // 改变session中的小区的操作类型为修改  0为新增 1为修改
      sessionStorage.setItem("estateEditType", 1);
      this.$router.push({ name: "EditEstate" });
    },
    // 返回上一级路由
    goback() {
      this.$router.go(-1);
    },
    // 获取小区信息
    getEstateInfo() {
      var that = this;
      var obj = {
        id: this.id
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
    }
  }
};
</script>
<style lang="scss" scoped>
.estateInfo {
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
}
</style>