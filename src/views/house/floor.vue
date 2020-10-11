<template>
  <div class="floor">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text">小区楼栋</div>
      <div class="head_add" @click="addFloor">
        <img src="@/assets/add.png" @click="addEstate" v-if="!onlySee" alt />
      </div>
    </div>
    <!-- 小区信息 点击会查看小区的信息 -->
    <div class="estate_info" @click="goEstateInfo">
      <div class="estate_name">
        <p>{{ estateInfo.villageName }}</p>
        <p>{{ estateInfo.streetCommunity }}{{ estateInfo.houseNumber }}号</p>
      </div>
      <img src="@/assets/image/more.png" alt />
    </div>
    <!-- 暂无楼栋的数据 -->
    <nodata
      :text="nodataText"
      v-if="
        !estateInfo.governBuildings || estateInfo.governBuildings.length <= 0
      "
    />
    <!-- 楼栋的列表 -->
    <div
      class="floor_list"
      v-if="estateInfo.governBuildings && estateInfo.governBuildings.length > 0"
    >
      <!-- @click="goFloor" -->
      <div
        class="floor_item"
        v-for="(item, index) in estateInfo.governBuildings"
        :key="item.id"
      >
        <div
          class="item_con"
          @click="changeFloor(index)"
          :class="index == nowFloorType ? 'active' : ''"
        >
          <p>{{ item.buildingName }}幢</p>
          <p>{{ item.time }}建</p>
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
      <div @click="goResident">查看房户列表</div>
      <div @click="goResidentInfo">查看楼栋信息</div>
      <div @click="dialog = false">取消</div>
    </van-popup>
  </div>
</template>
<script>
// 引入接口
import { getFloorByEstate } from "@/api/house";
// 引入没有数据的组件
import nodata from "@/components/nodata";
export default {
  components: {
    nodata
  },
  name: "Floor",
  data() {
    return {
      // 当前的权限是不是只是只查看
      onlySee: sessionStorage.getItem("onlySee") == "false" ? false : true,
      // 小区的id
      estateId: sessionStorage.getItem("estateId"),
      // 小区的信息 包括楼栋
      estateInfo: {},
      // 当前点击的楼栋
      nowFloorType: null,
      // 底部弹框的显示与否
      dialog: false,
      // 没有数据的提示
      nodataText: "没有更多数据"
    };
  },
  created() {
    this.getFloor();
  },
  methods: {
    // 前往新增楼栋页面
    addFloor() {
      // 更改当前操作楼栋的类型 0为小区楼栋
      sessionStorage.setItem("residentType", 0);
      // 更改当前的楼栋编辑类型
      sessionStorage.setItem("floorEditType", 0);
      this.$router.push({ name: "EditFloor" });
    },
    // 前往小区详情页
    goEstateInfo() {
      this.$router.push({ name: "EstateInfo" });
    },
    // 千万小区详情页
    addEstate() {
      // 改变session中的小区的操作类型为修改  0为新增 1为修改
      // sessionStorage.setItem("estateEditType", 0);
      // this.$router.push({ name: "EditEstate" });
    },
    // 前往小区房户
    goResident() {
      // 当前楼栋的id
      var residentId = this.estateInfo.governBuildings[this.nowFloorType].id;
      // 再session中设置楼栋id
      sessionStorage.setItem("residentId", residentId);
      // console.log(residentId);
      this.$router.push({ name: "Resident" });
    },
    // 查看楼栋信息
    goResidentInfo() {
      // 当前楼栋的id
      var residentId = this.estateInfo.governBuildings[this.nowFloorType].id;
      // 更改session中设置楼栋id
      sessionStorage.setItem("residentId", residentId);
      this.$router.push({ name: "ResidentInfo" });
    },
    // 返回上一级路由
    goback() {
      this.$router.go(-1);
    },
    // 根据小区id获取楼栋
    getFloor() {
      var that = this;
      var obj = {
        id: this.estateId
      };
      return getFloorByEstate(obj).then(res => {
        // console.log(res);
        that.estateInfo = res.ret;
      });
    },
    // 改变当前选择的楼栋号
    changeFloor(index) {
      // 改变当前的楼栋索引
      this.nowFloorType = index;
      // 改变底部弹框的展示与否
      this.dialog = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.floor {
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
  .estate_info {
    margin-top: 7px;
    padding: 0 15px;
    width: 100%;
    height: 53px;
    background: #ffffff;
    box-shadow: 0px 3px 6px 0px #e1e1e1;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .estate_name {
      p {
        width: 100%;
        box-sizing: border-box;
        padding-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nth-child(1) {
        font-size: 15px;
        font-weight: 500;
        color: #2e2e2e;
      }
      p:nth-child(2) {
        font-size: 13px;
        font-weight: 400;
        color: #4d4d4d;
      }
    }
    img {
      width: 10px;
      height: 17px;
    }
  }
  .floor_list {
    width: 100%;
    padding: 18px;
    padding-top: 4px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #eeeeee;
    .floor_item {
      width: 67px;
      border-bottom: 1px solid #e1e0e0;
      padding-bottom: 4px;
      margin-top: 14px;
      .item_con {
        width: 54px;
        height: 54px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        p:nth-child(1) {
          font-size: 15px;
          font-weight: bold;
          color: #2e2e2e;
        }
        p:nth-child(2) {
          font-size: 11px;
          font-weight: 500;
          color: #565555;
        }
        &.active {
          background: #1b88f7;
          border-radius: 13px;
          p {
            color: #fff;
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