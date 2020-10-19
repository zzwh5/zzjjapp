<template>
  <div class="residentInfo">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text" v-if="residentType == 0">查看小区楼栋</div>
      <div class="head_text" v-if="residentType == 1">查看单栋楼房</div>
      <div class="head_text" v-if="residentType == 2">查看单栋民房</div>
      <div
        class="head_text"
        v-if="residentType == 3 || residentType == 4 || residentType == 5"
      >
        查看别墅
      </div>
      <div class="head_add" @click="editFloor">
        <img src="@/assets/image/edit.png" v-if="!onlySee" alt />
      </div>
    </div>
    <div class="btn">
      <!-- <div>单栋民房</div> -->
      <div v-if="residentType == 0">小区楼栋</div>
      <div v-if="residentType == 1">单栋楼房</div>
      <div v-if="residentType == 2">单栋民房</div>
      <div v-if="residentType == 3 || residentType == 4 || residentType == 5">
        别墅
      </div>
      <van-button plain type="info" size="small" @click.native="goHouseInfo"
        >查看房屋信息</van-button
      >
    </div>
    <div class="info">
      <div
        class="info_item"
        v-if="residentType == 0 || residentType == 4 || residentType == 5"
      >
        <van-field
          v-model="residentInfo.housingEstateName"
          label-align="left"
          colon
          label="小区名称"
          readonly
        />
        <!-- 占位 -->
        <span></span>
      </div>
      <div
        class="info_item"
        v-if="residentType == 3 || residentType == 4 || residentType == 5"
      >
        <van-field
          v-model="residentInfo.buildingTypeStr"
          label-align="left"
          colon
          label="别墅类型"
          readonly
        />
        <!-- 占位 -->
        <span></span>
      </div>
      <div class="info_item">
        <van-field
          v-model="residentInfo.buildingName"
          label-align="left"
          :label="
            residentType == 0
              ? '楼栋号'
              : residentType == 1 || residentType == 4 || residentType == 5
              ? '楼栋名称'
              : '门牌号'
          "
          readonly
          colon
        />
        <!-- 占位 -->
        <span></span>
      </div>
      <div class="info_item" v-for="item in columns" :key="item.id">
        <van-field
          v-model="residentInfo[item.dataIndex]"
          colon
          :label="item.title"
          label-align="left"
          readonly
        />
        <!-- 占位 -->
        <span></span>
      </div>
      <div class="info_item">
        <van-field
          v-model="residentInfo.remark"
          rows="1"
          autosize
          label="备注"
          type="textarea"
          readonly
          colon
          label-align="left"
        />
      </div>
    </div>
  </div>
</template>
<script>
// 引入接口
import { detailFloor } from "@/api/house";
const columns = [
  {
    title: "楼栋编号",
    dataIndex: "buildingCode",
    id: 1
  },
  {
    title: "地上层数",
    dataIndex: "theUpperNumber",
    id: 2
  },

  {
    title: "地下层数",
    dataIndex: "numberOfUnderground",
    id: 3
  },
  {
    title: "年代",
    dataIndex: "time",
    id: 4
  },
  {
    title: "不动产编码",
    dataIndex: "buildingRealEstate",
    id: 5
  }
];
export default {
  data() {
    return {
      // 当前的权限是不是只是只查看
      onlySee: sessionStorage.getItem("onlySee") == "false" ? false : true,
      // 楼栋类型
      residentType: null,
      // 当前的楼栋的id
      id: sessionStorage.getItem("residentId"),
      // 楼栋的信息
      residentInfo: {},
      // 不同的楼栋的公共字段
      columns: columns
    };
  },
  created() {
    this.getResidentInfo();
  },
  methods: {
    // 返回上一级路由
    goback() {
      this.$router.go(-1);
    },
    // 获取楼栋详情
    getResidentInfo() {
      var obj = {
        id: this.id
      };
      return detailFloor(obj).then(res => {
        // console.log(res);
        this.residentInfo = res.ret;
        this.residentType = res.ret.buildingType;
      });
    },
    // 前往查看房户列表页面
    goHouseInfo() {
      // 如果是别墅的话 更改sessionstorage中的房屋类型 小区、单栋民房、单栋楼房、别墅(三种类型的别墅)
      if (sessionStorage.getItem("houseType") == 3) {
        // console.log(this.residentInfo.buildingType);
        sessionStorage.setItem("houseType", this.residentInfo.buildingType);
      }
      // return false;
      // 更改当前的楼栋编辑类型
      // 再session中设置楼栋id
      sessionStorage.setItem("residentId", this.id);
      // console.log(residentId);
      this.$router.push({ name: "Resident" });
    },
    // 前往编辑和新增楼栋
    editFloor() {
      // 更改当前的楼栋编辑类型
      sessionStorage.setItem("floorEditType", this.residentInfo.id);
      this.$router.push({ name: "EditFloor" });
    }
  }
};
</script>
<style scoped lang="scss">
.residentInfo {
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
  .btn {
    margin-top: 1%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 2% 4%;
  }
  .info {
    width: 100%;
    margin-top: 1%;
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