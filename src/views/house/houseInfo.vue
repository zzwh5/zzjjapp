<template>
  <div class="houseInfo">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text">查看房户信息</div>
      <div class="head_add" @click="editHouse">
        <img src="@/assets/image/edit.png" v-if="!onlySee" alt />
      </div>
    </div>
    <div class="info">
      <div class="info_item" v-for="item in columns" :key="item.id">
        <div v-if="item.title == '单元' || item.title == '楼层'">
          <!-- 单元和楼层他才渲染 -->
          <van-field
            v-if="houseType != 2 && houseType != 3"
            v-model="basicInfo[item.dataIndex]"
            colon
            :label="item.title"
            label-align="left"
            readonly
          />
          <!-- 占位 -->
          <span></span>
        </div>
        <van-field
          v-if="item.title != '单元' && item.title != '楼层'"
          v-model="basicInfo[item.dataIndex]"
          colon
          :label="item.title"
          label-align="left"
          readonly
        />
        <!-- 占位 -->
        <span></span>
      </div>
    </div>
  </div>
</template>
<script>
// 接口引入
import { detailHouse } from "@/api/house";
const columns = [
  {
    title: "单元",
    dataIndex: "element",
    id: 1,
    isSelect: false
  },
  {
    title: "楼层",
    dataIndex: "floor",
    id: 2,
    isSelect: false
  },

  {
    title: "门牌号",
    dataIndex: "houseNumber",
    id: 3,
    isSelect: false
  },
  {
    title: "房屋编号",
    dataIndex: "houseCodes",
    id: 4,
    isSelect: false
  },
  {
    title: "房屋地址",
    dataIndex: "houseAddress",
    id: 5,
    isSelect: false
  },
  {
    title: "建筑用途",
    dataIndex: "houseUseStr",
    id: 6,
    isSelect: true
  },
  {
    title: "房屋来源",
    dataIndex: "houseSourceStr",
    id: 7,
    isSelect: true
  },
  {
    title: "建筑面积(平方米)",
    dataIndex: "responsibleUnit",
    id: 8,
    isSelect: false
  },
  {
    title: "建筑分摊面积(平方米)",
    dataIndex: "apportionedArea",
    id: 9,
    isSelect: false
  },
  {
    title: "建筑产权面积(平方米)",
    dataIndex: "propertyArea",
    id: 10,
    isSelect: false
  },
  {
    title: "不动产编码",
    dataIndex: "realEstate",
    id: 11,
    isSelect: false
  },
  {
    title: "房主身份证号",
    dataIndex: "idNumber",
    id: 12,
    isSelect: false
  },
  {
    title: "房主姓名",
    dataIndex: "ownerName",
    id: 13,
    isSelect: false
  },
  {
    title: "房主联系类型",
    dataIndex: "ownerContactTypeStr",
    id: 14,
    isSelect: true
  },
  {
    title: "房主联系方式",
    dataIndex: "ownerContactInformation",
    id: 15,
    isSelect: false
  },
  {
    title: "现住地",
    dataIndex: "currentResidence",
    id: 16,
    isSelect: true
  },
  {
    title: "房主现居详址",
    dataIndex: "ownerDetailedAddress",
    id: 17,
    isSelect: false
  },
  {
    title: "隐患类型",
    dataIndex: "hiddenDangerTypeStr",
    id: 18,
    isSelect: true
  },
  {
    title: "房屋类型",
    dataIndex: "houseTypeStr",
    id: 19,
    isSelect: true
  }
];
export default {
  name: "HouseInfo",
  data() {
    return {
      // 当前房屋的类型
      houseType: sessionStorage.getItem("houseType"),
      // 当前的权限是不是只是只查看
      onlySee: sessionStorage.getItem("onlySee") == "false" ? false : true,
      // 当前的房屋id  修改的时候用
      id: sessionStorage.getItem("houseId"),
      // 基本信息
      basicInfo: {},
      columns: columns
    };
  },
  created() {
    this.getHouseInfo();
  },
  methods: {
    // 返回上一级
    goback() {
      this.$router.go(-1);
    },
    // 获取房屋详情
    getHouseInfo() {
      var obj = {
        id: this.id
      };
      return detailHouse(obj).then(res => {
        // console.log(res);
        this.basicInfo = res.ret;
        var province =
          this.basicInfo.currentResidenceProvinceStr == null
            ? ""
            : this.basicInfo.currentResidenceProvinceStr;
        var city =
          this.basicInfo.currentResidenceCityStr == null
            ? ""
            : this.basicInfo.currentResidenceCityStr;
        var region =
          this.basicInfo.currentResidenceRegionStr == null
            ? ""
            : this.basicInfo.currentResidenceRegionStr;
        var street =
          this.basicInfo.currentResidenceStreetStr == null
            ? ""
            : this.basicInfo.currentResidenceStreetStr;
        var community =
          this.basicInfo.currentResidenceCommunityStr == null
            ? ""
            : this.basicInfo.currentResidenceCommunityStr;
        this.basicInfo.currentResidence =
          "" + province + city + region + street + community;
        // console.log(this.basicInfo.currentResidence);
      });
    },
    // 前往 房屋信息编辑页面
    editHouse() {
      sessionStorage.setItem("houseEditType", 1);
      this.$router.push({ name: "EditHouse" });
    }
  }
};
</script>
<style scoped lang="scss">
.houseInfo {
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
    flex-shrink: 0;
    flex: 1;
    overflow-y: scroll;
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