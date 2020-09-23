<template>
  <div class="floor">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text">小区楼栋</div>
      <div class="head_add">
        <img src="@/assets/add.png" alt />
      </div>
    </div>
    <!-- 小区信息 点击会查看小区的信息 -->
    <div class="estate_info" @click="goEstateInfo">
      <div class="estate_name">
        <p>{{estateInfo.villageName}}</p>
        <p>{{estateInfo.streetCommunity}}{{estateInfo.houseNumber}}号</p>
      </div>
      <img src="@/assets/image/more.png" alt />
    </div>
    <!-- 暂无楼栋的数据 -->

    <!-- 楼栋的列表 -->
    <div class="floor_list" v-if="estateInfo.governBuildings.length>0">
      <div class="floor_item" v-for="(item,index) in estateInfo.governBuildings" :key="item.id">
        <div
          class="item_con"
          @click="changeFloor(index)"
          :class="index == nowFloorType?'active':''"
        >
          <p>{{item.buildingName}}幢</p>
          <p>{{item.time}}建</p>
        </div>
      </div>
    </div>
    <!-- 底部弹框 -->
    <van-popup v-model="dialog" position="bottom" round :style="{ height: '21%' }">
      <div>查看房户信息</div>
      <div>查看住户列表</div>
      <div @click="dialog = false">取消</div>
    </van-popup>
  </div>
</template>
<script>
import { getFloorByEstate } from "@/api/house";
export default {
  name: "Floor",
  data() {
    return {
      // 小区的id
      estateId: sessionStorage.getItem("estateId"),
      // 小区的小区
      estateInfo: {},
      // 当前点击的楼栋
      nowFloorType: null,
      // 底部弹框的显示与否
      dialog: false
    };
  },
  created() {
    this.getFloor();
  },
  methods: {
    // 前往小区详情页
    goEstateInfo() {
      this.$router.push({ name: "EstateInfo" });
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