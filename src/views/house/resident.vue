<template>
  <div class="resident">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text">
        <span v-if="houseType == 0">小区房户</span>
        <span v-if="houseType == 1">单栋楼房房户</span>
        <span v-if="houseType == 2">单栋民房房户列表</span>
        <span v-if="houseType == 3 || houseType == 4 || houseType == 5"
          >别墅房户列表</span
        >
      </div>
      <div class="head_add" @click="addHouse">
        <img src="@/assets/add.png" v-if="!onlySee" alt />
      </div>
    </div>
    <div v-if="houseType == 0 || houseType == 1">
      <div class="info">
        <div
          class="info_name"
          v-if="houseType == 0 || houseType == 4 || houseType == 5"
        >
          小区名称:{{ residentObj.housingEstateName }}
        </div>
        <div class="info_floor">{{ residentObj.buildingName }}</div>
        <div class="info_time">建于{{ residentObj.time }}年</div>
      </div>
      <nodata :text="nodataText" v-if="!residentObj.governRentingHouseMap" />
      <div class="resident_list" v-if="residentObj.governRentingHouseMap">
        <div class="cell">
          <div class="cells">
            <div
              class="cell_item"
              v-for="(item, index) in residentObj.governRentingHouseMap"
              :class="cellType == index ? 'active' : ''"
              :key="item.id"
              @click="changeCellType(index)"
            >
              {{ index }}单元
            </div>
          </div>
        </div>
        <div class="house">
          <div
            class="tier"
            v-for="(value, key) in residentObj.governRentingHouseMap[cellType]"
            :key="key"
          >
            <div class="tier_title">{{ key }}楼</div>
            <div class="tier_floor">
              <div
                class="floor_item"
                :class="item.houseNumber == houseNumber ? 'active' : ''"
                v-for="item in value"
                :key="item.id"
                @click="changFloor(item)"
              >
                {{ item.houseNumber }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- 比较特殊的列表 -->
      <div class="special_info">房户列表({{ residentList.length }})户</div>
      <div class="special_list">
        <nodata :text="nodataText" v-if="residentList.length <= 0" />
        <div
          class="special_item"
          v-for="item in residentList"
          :key="item.id"
          @click="changFloor(item)"
        >
          <span> {{ item.houseAddress || item.houseNumber }}</span>
          <img src="@/assets/image/more.png" alt="" />
        </div>
      </div>
    </div>

    <!-- 底部弹框 -->
    <van-popup
      v-model="dialog"
      position="bottom"
      round
      :style="{ height: '21%' }"
    >
      <div @click="goResidentInfo">查看房户信息</div>
      <div @click="goUserList">查看住户列表</div>
      <div @click="dialog = false">取消</div>
    </van-popup>
  </div>
</template>
<script>
// 引入接口
import { getResident } from "@/api/house";
// 引入没有数据的组件
import nodata from "@/components/nodata";
export default {
  components: {
    nodata
  },
  name: "Resident",
  data() {
    return {
      houseType: sessionStorage.getItem("houseType"),
      // 当前的权限是不是只是只查看
      onlySee: sessionStorage.getItem("onlySee") == "false" ? false : true,
      // 没有数据的提示
      nodataText: "没有更多数据",
      // 当前楼栋的id
      residentId: sessionStorage.getItem("residentId"),
      // 楼栋的信息(小区的楼栋和单栋楼房的信息)
      residentObj: {},
      // 特殊的楼栋信息  别墅和单栋民房
      residentList: [],
      // 当前的单元类型
      cellType: 0,
      // 当前的楼栋
      houseNumber: null,
      // 底部弹框的状态
      dialog: false
    };
  },
  created() {
    this.getResident();
  },
  methods: {
    // 返回上一级路由
    goback() {
      this.$router.go(-1);
    },
    // 前往新增房屋页面
    addHouse() {
      sessionStorage.setItem("houseEditType", 0);
      this.$router.push({ name: "EditHouse" });
    },
    // 根据sessionstorage中的楼栋id查询楼栋信息
    // 根据小区id获取楼栋
    getResident() {
      var type = sessionStorage.getItem("houseType");
      var that = this;
      var obj = {
        id: this.residentId
      };
      return getResident(obj).then(res => {
        if (type == 0 || type == 1) {
          // console.log(res);
          that.residentObj = res.ret;
          var arr = [];
          for (let i in res.ret.governRentingHouseMap) {
            arr.push(i);
          }
          that.cellType = arr[0];
          return false;
        }
        that.residentList = res.ret.governRentingHouseList
          ? res.ret.governRentingHouseList
          : [];
        console.log(that.residentList);
      });
    },
    // 更改单元
    changeCellType(index) {
      this.cellType = index;
    },
    // 更改房屋
    changFloor(item) {
      if (this.houseType == 0 || this.houseType == 1) {
        this.houseNumber = item.houseNumber;
      }
      // 更改sessionstorage中的当前houseId
      sessionStorage.setItem("houseId", item.id);
      this.dialog = true;
    },
    // 查看住户列表
    goUserList() {
      this.$router.push({ name: "UserList" });
    },
    // 查看房屋信息
    goResidentInfo() {
      this.$router.push({ name: "HouseInfo" });
    }
  }
};
</script>
<style scoped lang="scss">
.resident {
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
  // 特殊楼栋信息
  .special_info {
    width: 100%;
    box-sizing: border-box;
    padding: 2%;
    font-size: 14px;
    letter-spacing: 0.5px;
  }
  // 特殊列表
  .special_list {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 0 2%;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    .special_item {
      width: 100%;
      padding: 1% 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 10px;
        height: 17px;
      }
    }
  }
  .info {
    width: 100%;
    padding-left: 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #373737;
    height: 42px;
    background-color: #ededed;
    div {
      &:nth-child(1),
      &:nth-child(2) {
        margin-right: 15px;
      }
    }
  }
  .resident_list {
    background-color: #fff;
    padding: 10px;
    .cell {
      max-width: 100%;
      display: inline-block;
      overflow-x: scroll;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      background-color: #efefef;
      border-radius: 5px;
      .cells {
        display: flex;
        align-items: center;
        // justify-content: center;
        border-radius: 5px;
        height: 38px;
        padding: 0 3px;
        .cell_item {
          flex-shrink: 0;
          width: 72px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 500;
          color: #acacac;
          &.active {
            font-weight: 500;
            color: #323131;
            background-color: #fff;
            border-radius: 3px;
          }
        }
      }
    }
    .house {
      border-top: 1px solid #eeeeee;
      border-bottom: 1px solid #eeeeee;
      .tier {
        display: flex;
        align-items: center;
        padding: 10px 0;
        justify-content: space-between;
        .tier_title {
          color: #7a7a7a;
          font-size: 12px;
        }
        .tier_floor {
          width: 92%;
          display: flex;
          align-items: center;
          overflow-x: scroll;
          .floor_item {
            flex-shrink: 0;
            width: 59px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #dfdfdf;
            border-radius: 5px;
            margin-right: 14px;
            color: #2d2d2d;
            font-size: 15px;
            &.active {
              background-color: #1b87f7;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
  .van-popup {
    width: 100%;
    padding: 0 14px;
    box-sizing: border-box;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    div:nth-child(1) {
      height: 44px;
      border-bottom: 1px solid #e5e5e5;
    }
    div:nth-child(2) {
      height: 45px;
    }
    div:nth-child(1),
    div:nth-child(2) {
      font-size: 16px;
    }
    div:nth-child(3) {
      height: 39px;
      background: #f1f1f1;
      border-radius: 10px;
    }
  }
}
</style>