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
      <input type="text" placeholder="请输入搜索关键字" />
      <img src="@/assets/search.png" alt />
    </div>
    <div class="tabs">
      <van-tabs @click="onClick" animated>
        <van-tab title="整套小区">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多数据"
            @load="onLoad"
            offset="30"
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
              <div class="list_item" v-for="item in list" :key="item.id">
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
        <van-tab title="单栋民房">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多数据"
            @load="onLoad"
            offset="30"
          >
            <div class="list">
              <div class="list_item" v-for="item in list" :key="item.id">
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
        <van-tab title="别墅">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多数据"
            @load="onLoad"
            offset="30"
          >
            <div class="list">
              <div class="list_item" v-for="item in list" :key="item.id">
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
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getEstat, getFloor } from "@/api/house";
export default {
  name: "House",
  data() {
    return {
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
  },
  mounted() {},
  methods: {
    // 点击tab切换的时候
    onClick(index, title) {
      // console.log(name, title);
      // console.log(this.pageNo);
      // console.log(index);
      this.type = index;
      this.pageNo = 1;
      this.list = [];
      if (index == 0) {
        this.getEstat();
      } else {
        if (index == 1) {
          this.buildingTypeList = [1];
        } else if (index == 2) {
          this.buildingTypeList = [2];
        } else if (index == 3) {
          this.buildingTypeList = [3, 4, 5];
        }
        this.getFloor();
      }
    },
    // 点击顶部的add新增
    headAdd() {
      console.log("新增小区");
      this.$router.push({ name: "AddEstateOrFloor" });
    },
    // 前往楼栋
    goFloor(item) {
      var id = item.id;
      var estateName = item.villageName;
      var estateAddress = item.streetCommunity + item.houseNumber;
      sessionStorage.setItem("estateId", id);
      this.$router.push({ name: "Floor" });
    },
    // 下拉到底部请求数据
    onLoad() {
      var that = this;
      // console.log("到底部了");
      this.pageNo++;
      this.getEstat();
    },
    // 获取小区
    getEstat() {
      var that = this;
      var obj = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        orgId: this.orgId
      };
      return getEstat(obj).then(res => {
        // console.log(res);
        // that.list = res.result.data;
        res.result.data.forEach((el, i) => {
          that.list.push(el);
        });
        that.loading = false;
        if (res.result.total == that.list.length) {
          that.finished = true;
        }
      });
    },
    // 获取楼栋
    getFloor() {
      var that = this;
      var obj = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        orgId: this.orgId,
        buildingTypeList: this.buildingTypeList
      };
      return getFloor(obj).then(res => {
        // console.log(res);
        // that.list = res.result.data;
        res.result.data.forEach((el, i) => {
          that.list.push(el);
        });
        that.loading = false;
        if (res.result.total == that.list.length) {
          that.finished = true;
        }
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
      }
      .van-list {
        height: 100%;
        // height: 20%;
        // overflow-y: scroll;
      }
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
    flex: 1;
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
        height: 47px;
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
