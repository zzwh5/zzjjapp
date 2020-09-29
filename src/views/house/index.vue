<template>
  <div class="home">
    <div class="header">
      <div class="head_back">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text">房屋管理</div>
      <div class="head_add" @click="headAdd">
        <img src="@/assets/add.png" alt />
      </div>
    </div>
    <div class="search">
      <input type="text" placeholder="请输入搜索关键字" @input="Input" />
      <img src="@/assets/search.png" alt />
    </div>
    <div class="tabs">
      <van-tabs @change="onClick" animated v-model="type">
        <van-tab title="整套小区">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多数据"
            @load="onLoad"
            offset="10"
          >
            <div class="list">
              <div class="list_item" v-for="item in list" :key="item.id" @click="goFloor(item)">
                <div class="list_item_l">
                  <p>{{item.villageName}}</p>
                  <p>{{item.streetCommunity}}{{item.houseNumber}}号</p>
                </div>
                <div class="list_item_r">
                  <img src="@/assets/image/more.png" alt />
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
        <van-tab title="单栋楼房">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多数据"
            @load="onLoad"
            offset="30"
          >
            <div class="list">
              <div class="list_item" @click="goSFloor(item)" v-for="item in list" :key="item.id">
                <div class="list_item_l">
                  <p>{{item.buildingName}}号楼</p>
                </div>
                <div class="list_item_r">
                  <img src="@/assets/image/more.png" alt />
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
        <van-tab title="单栋民房">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多数据"
            @load="onLoad"
            offset="30"
          >
            <div class="list">
              <div
                class="list_item"
                v-for="item in list"
                @click="goFloorDetail(item)"
                :key="item.id"
              >
                <div class="list_item_l">
                  <p>{{item.buildingName}}号楼</p>
                </div>
                <div class="list_item_r">
                  <img src="@/assets/image/more.png" alt />
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
        <van-tab title="别墅">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多数据"
            @load="onLoad"
            offset="30"
          >
            <div class="list">
              <div
                class="list_item"
                v-for="item in list"
                :key="item.id"
                @click="goFloorDetail(item)"
              >
                <div class="list_item_l">
                  <p>{{item.buildingName}}号楼</p>
                </div>
                <div class="list_item_r">
                  <img src="@/assets/image/more.png" alt />
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// 获取接口
import { getEstat, getFloor } from "@/api/house";
export default {
  name: "House",
  data() {
    return {
      // 顶部的搜索框内容
      values: "",
      // orgid 应该是用户登录之后拿到的
      orgId: "370481",
      // 楼栋类型
      buildingTypeList: [1],
      // 列表数组
      list: [],
      // 当前的类型 小区 0 单栋楼房 1 单栋民房 2 别墅 3
      type: 0,
      // 分页
      pageSize: 10,
      pageNo: 1,
      // 下拉到底部
      finished: false,
      loading: false
    };
  },
  created() {
    // console.log(process.env.VUE_APP_BASE_API);
    var type = sessionStorage.getItem("hType");
    sessionStorage.clear();
    if (type) {
      sessionStorage.setItem("hType", type);
      if (type == 1) {
        this.buildingTypeList = [1];
      } else if (type == 2) {
        this.buildingTypeList = [2];
      } else if (type == 3) {
        this.buildingTypeList = [3, 4, 5];
      }
      this.type = Number(type);
      // console.log(this.type);
    }
  },
  mounted() {},
  methods: {
    // 顶部搜索
    Input(e) {
      var that = this;
      this.list = [];
      this.loading = true;
      // console.log(e.data);
      this.values = e.data;
      var index = this.type;
      if (index == 0) {
        that.getEstat();
      } else {
        if (index == 1) {
          that.buildingTypeList = [1];
        } else if (index == 2) {
          that.buildingTypeList = [2];
        } else if (index == 3) {
          that.buildingTypeList = [3, 4, 5];
        }
        that.getFloor();
      }
    },
    // 点击tab切换的时候
    onClick(index, title) {
      // console.log(index == this.type);
      // if (index == this.type) {
      //   return false;
      // }
      var that = this;
      console.log(this.loading);
      // console.log(this.pageNo);
      // console.log(index);
      // 为了下次进来还在当前的tab下面所以 设置一个本地存储 hType
      sessionStorage.setItem("hType", index);
      // 改变当前的tab索引
      this.type = index;
      // 改变当前数据的页数
      this.pageNo = 1;
      // 先清空数据列表
      this.list = [];
      // console.log(this.list);
      // 允许继续请求数据
      this.finished = false;
      // this.loading = false;
      this.loading = true;
      // setTimeout(function() {
      if (index == 0) {
        that.getEstat();
      } else {
        if (index == 1) {
          that.buildingTypeList = [1];
        } else if (index == 2) {
          that.buildingTypeList = [2];
        } else if (index == 3) {
          that.buildingTypeList = [3, 4, 5];
        }
        that.getFloor();
      }
      // this.$router.go(0);
      // }, 100);
    },
    // 点击顶部的add新增
    headAdd() {
      if (this.type == 0) {
        // console.log("新增小区");
        // 改变session中的小区的操作类型为修改  0为新增 1为修改
        sessionStorage.setItem("estateEditType", 0);
        this.$router.push({ name: "EditEstate" });
      } else {
        // 更改当前操作楼栋的类型
        sessionStorage.setItem("residentType", this.type);
        // 更改当前的楼栋编辑类型
        sessionStorage.setItem("floorEditType", 0);
        this.$router.push({ name: "EditFloor" });
      }
    },
    // 前往楼栋
    goFloor(item) {
      var id = item.id;
      // 小区id
      // console.log(id);
      sessionStorage.setItem("estateId", id);
      this.$router.push({ name: "Floor" });
    },
    // 前往楼栋下的房间页面   单栋民房
    goSFloor(item) {
      // console.log(item.id);
      // return false;
      // 更改session中设置楼栋id
      sessionStorage.setItem("residentId", item.id);
      // console.log(residentId);
      this.$router.push({ name: "Resident" });
    },
    // 前往楼栋详情页面
    goFloorDetail(item) {
      // console.log(22222222);
      sessionStorage.setItem("residentId", item.id);
      this.$router.push({ name: "ResidentInfo" });
    },
    // 下拉到底部请求数据
    onLoad() {
      // console.log(this.finished);
      var that = this;
      // this.pageNo = Number(this.pageNo) + 1;
      // if (this.pageNo == 1) {
      //   return false;
      // }
      if (this.type == 0) {
        // console.log("到底部了");
        this.getEstat();
      } else {
        this.getFloor();
      }
    },
    // 获取小区
    getEstat() {
      var that = this;
      var obj = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        orgId: this.orgId,
        villageName: this.values
      };
      return getEstat(obj)
        .then(res => {
          if (res.code != 200) {
            return false;
          }

          // console.log(res);
          // that.list = res.result.data;
          res.result.data.forEach((el, i) => {
            that.list.push(el);
          });
          that.loading = false;
          that.pageNo = Number(this.pageNo) + 1;
          if (res.result.total == that.list.length) {
            that.finished = true;
          }
        })
        .catch(res => {
          // console.log(res);
          that.finished = true;
        });
    },
    // 获取楼栋
    getFloor() {
      var that = this;
      var obj = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        orgId: this.orgId,
        buildingTypeList: this.buildingTypeList,
        buildingName: this.values
      };
      return getFloor(obj)
        .then(res => {
          // console.log(res);
          // that.list = res.result.data;
          res.result.data.forEach((el, i) => {
            that.list.push(el);
          });
          that.loading = false;
          that.pageNo = Number(this.pageNo) + 1;
          if (res.result.total == that.list.length) {
            that.finished = true;
          }
        })
        .catch(res => {
          that.finished = true;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
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
  .search {
    flex-shrink: 0;
    width: 95%;
    height: 31px;
    font-size: 13px;
    font-weight: 500;
    margin: 9px auto;
    background: #e1e1e1;
    border-radius: 31px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 12px;
    input {
      width: 90%;
      height: 28px;
      border: none;
      color: #8d8d8d;
      background: #e1e1e1;
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
  /deep/.van-tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
    .van-tabs__wrap {
      flex-shrink: 0;
      box-shadow: 0px 3px 6px 0px #e2e2e2;
      margin-bottom: 3px;
    }
    .van-tabs__content {
      flex-shrink: 0;
      flex: 1;
      .van-tab__pane {
        height: 100%;
        overflow-y: scroll;
        // padding-bottom: 10px;
        // box-sizing: content-box;
      }
      // .van-list {
      //   // height: 100%;
      //   // height: 20%;
      //   // overflow-y: scroll;
      // }
    }
  }
  /deep/.van-tabs__line {
    background-color: #0080ce;
  }
  /deep/.van-tab--active {
    font-weight: 600;
  }
  /deep/.van-tab {
    color: #2e2e2e;
    font-size: 15px;
  }
  /deep/.van-tabs__content {
    background-color: #fff;
  }

  .tabs {
    // flex: 1;
    height: 86vh;
    overflow-y: scroll;
    .list {
      width: 100%;
      box-sizing: border-box;
      .loading {
        display: flex;
        align-items: center;
        // margin: 0 auto;
        justify-content: center;
      }
      .list_item {
        border-bottom: 1px solid #eeeeee;
        padding: 0 15px;
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .list_item_l {
          width: 80%;
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
        .list_item_r {
          display: flex;
          align-items: center;
          img {
            width: 10px;
            height: 17px;
          }
        }
      }
    }
  }
}
</style>
