<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="head_back" @click="goHouse">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text">住户管理</div>
      <div class="head_add" @click="headAdd">
        <img src="@/assets/add.png" alt />
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="search">
      <input type="text" placeholder="请输入姓名" v-model="searchText" />
      <img @click="searchByName" src="@/assets/search.png" alt />
    </div>
    <!-- 列表 -->
    <div class="peopleList">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多数据"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          offset="30"
        >
          <div v-for="item in peopleData" :key="item.basicsId">
            <div
              class="people_item"
              @click="goPeopleDetail(item.id, item, item.houseAddress)"
            >
              <div class="peopleType">
                <span v-if="item.governRealPopulation">
                  {{
                    item.governRealPopulation.householderRelationship == 0
                      ? "户主"
                      : ""
                  }}
                </span>
              </div>
              <div class="peopleMsg">
                <div class="msg_top">
                  <div class="peopleName">
                    <span
                      v-if="item.governRealPopulation && item.houseType === 0"
                    >
                      {{ item.governRealPopulation.fullName }}
                    </span>
                    <span v-if="item.houseType !== 0">
                      {{ item.ownerName }}
                    </span>
                  </div>
                  <div class="isResident">
                    常住人口
                    <span>{{ item.num ? item.num : 0 }}人</span>
                  </div>
                </div>
                <div class="msg_bottom">
                  <div class="numberOrAddress">
                    户主证件号：
                    <span
                      v-if="item.governRealPopulation && item.houseType === 0"
                    >
                      {{ item.governRealPopulation.idCard }}
                    </span>
                    <span v-if="item.houseType !== 0">
                      {{ item.idNumber }}
                    </span>
                  </div>
                  <div class="numberOrAddress">
                    房 屋 地 址：
                    <span>{{ item.houseAddress }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- </template> -->
        </van-list>
      </van-pull-refresh>
    </div>

    <!-- 权限弹框 -->
    <van-dialog
      class="permission"
      v-model="show"
      title
      :showConfirmButton="false"
    >
      <div class="dialog_con">
        <p class="title">
          <span>请选择所属网格</span>
          <span @click="confirmPermisson">确认</span>
        </p>
        <!-- 一级 -->
        <div class="list">
          <div class="list_item" v-for="item in data" :key="item.id">
            <div class="tit" @click="changeActiveName(item)">
              <p :class="item.id == permission.id ? 'active' : ''">
                {{ item.name }}
              </p>
              <p v-if="item.hasChildren">
                <van-icon name="arrow-up" v-if="item.isdown" />
                <van-icon name="arrow-down" v-else />
              </p>
            </div>
            <!-- 二级 -->
            <div class="list children" v-if="item.isdown && item.hasChildren">
              <div
                class="list_item"
                v-for="(item1, index) in item.children"
                :key="item1.id"
              >
                <div class="tit" @click="changeActiveName(item1, index)">
                  <p :class="item1.id == permission.id ? 'active' : ''">
                    {{ item1.name }}
                  </p>
                  <p v-if="item1.hasChildren">
                    <van-icon name="arrow-up" v-if="item1.isdown" />
                    <van-icon name="arrow-down" v-else />
                  </p>
                </div>
                <!-- 三级 -->
                <div
                  class="list children"
                  v-if="item1.isdown && item1.hasChildren"
                >
                  <!-- {{ item1.isdown }} -->
                  <div
                    class="list_item"
                    v-for="item2 in item1.children"
                    :key="item2.id"
                  >
                    <div class="tit" @click="changeActiveName(item2)">
                      <p :class="item2.id == permission.id ? 'active' : ''">
                        {{ item2.name }}
                      </p>
                      <p v-if="item2.hasChildren">
                        <van-icon name="arrow-up" v-if="item2.isdown" />
                        <van-icon name="arrow-down" v-else />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-dialog>

    <!-- 提示弹框 -->
    <van-dialog
      v-model="shows"
      title=""
      show-cancel-button
      @cancel="cancelEdit"
      @confirm="confirmEdit"
      style="padding:5% 10%;box-sizing:border-box;padding-bottom:2%"
    >
      是否不选择对应的网格只是查看信息
    </van-dialog>
  </div>
</template>
<script>
import { getGovernRentingHouse, searchPeopleByidCard } from "@/api/people";
// 组织结构的接口
import { getTree, getChildTree } from "@/api/common";
// 引入弹框
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  name: "People",
  data() {
    return {
      // 房屋户主信息
      peopleData: [],
      error: false,
      loading: false,
      finished: false,
      isLoading: false,
      // orgid 应该是用户登录之后拿到的
      orgId: "",
      pageSize: 10,
      pageNo: 1,
      // 搜索信息
      searchText: "",

      // 权限弹框的显示与否
      show: true,
      // 确认选择的权限弹框的提示
      shows: false,
      // 用户选择的权限
      permission: {
        name: "",
        id: ""
      },
      // 组织结构数据
      data: [
        {
          id: sessionStorage.getItem("orgId"),
          name: sessionStorage.getItem("name"),
          hasChildren: true,
          isdown: false,
          children: []
        }
      ],
      // 是否可操作
      onlySee: true
    };
  },
  methods: {
    //  下拉刷新
    onRefresh() {
      this.pageSize = 10;
      this.pageNo = 1;
      this.searchText = "";
      this.peopleData = [];
      this.isLoading = true;
      this.getPeopleData();
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
    goHouse() {
      this.$router.push({ name: "House" });
    },
    //  跳转详情
    goPeopleDetail(id, item, houseAddress) {
      sessionStorage.setItem("peopleHouseType", item.houseType);
      if (item.houseType === 0 && item.governRealPopulation) {
        sessionStorage.setItem("zhuhuBasicsId", item.governRealPopulation.id);
      } else {
        sessionStorage.setItem("zhuhuBasicsId", item.idNumber);
      }
      sessionStorage.setItem("id", id);
      sessionStorage.setItem("zhuhuHouseAddress", houseAddress);
      this.$router.push({ name: "ResidentList" });
    },
    // 顶部导航栏新增事件
    headAdd() {
      console.log("点击新增按钮");
      sessionStorage.setItem("userEditType", 0);
      this.$router.push({ name: "EditUser" });
    },
    onLoad() {
      this.getPeopleData();
    },
    // 获取房屋人口数据
    getPeopleData() {
      var that = this;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNo = this.pageNo;
      data.orgId = this.orgId;
      data.governRealPopulation = {};
      data.governRealPopulation.fullName = this.searchText;

      // data.householderName = this.searchText
      //  把搜索数据也加上
      that.loading = true;
      return getGovernRentingHouse(data)
        .then(res => {
          // console.log("打印请求的数据", res);
          this.isLoading = false;
          this.loading = false;
          if (res.code === 200) {
            that.peopleData.push(...res.result.data);
            that.pageNo++;
            console.log(that.peopleData);
            that.finished = false;
            if (!res.result.data || res.result.data.length == 0) {
              that.finished = true;
            }
          }
        })
        .catch(res => {
          that.finished = true;
          this.loading = false;
        });
    },
    //  根据姓名查询搜索数据
    searchByName() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.peopleData = [];
      this.getPeopleData();
    },
    // 权限模块
    // 选择网格
    getTree() {
      getChildTree(370481115).then(res => {
        console.log(res);
      });
    },
    // 点击网格的时候
    changeActiveName(item, index) {
      // console.log(item);
      // 将点击的orgid和orgName保存到data的permission中  点击确定的时候更改sessionStorage
      this.permission.id = item.id;
      this.permission.name = item.name;
      // console.log(item.hasChildren, item.isdown);
      // 判断是不是拥有子级内容 没有直接返回
      if (!item.hasChildren || item.isdown) {
        // console.log(11111);
        item.isdown = !item.isdown;
        // console.log(item);
        this.$forceUpdate();
        return;
      }
      item.isdown = !item.isdown;
      item.children = [];
      var id = item.id;
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 10000
      });
      getChildTree(id).then(res => {
        Toast.clear();
        // console.log(res);
        var turn = res.ret[0].name.indexOf("网格") == -1 ? false : true;
        // console.log(turn);
        if (turn) {
          // console.log(index);
          res.ret.forEach(el => {
            // console.log(el);
            el.hasChildren = false;
            el.isdown = false;
          });

          item.children = res.ret;
          // console.log(item.children);
          this.$forceUpdate();
          return;
        }
        item.children = res.ret;
        item.children.forEach(el => {
          el.hasChildren = true;
          el.isdown = false;
          el.children = [];
        });
        this.$forceUpdate();
        // console.log(item);
      });
    },
    // 确认选择的权限
    confirmPermisson() {
      console.log(this.permission);
      // this.show = false;
      if (this.permission.name == "" || this.permission.id.length !== 15) {
        this.shows = true;
        console.log(3333);
      } else if (
        this.permission.name != "" ||
        this.permission.id.length == 15
      ) {
        console.log(3333);
        this.peopleData = [];
        this.show = false;
        this.shows = false;
        this.orgId = this.permission.id;
        this.onlySee = false;
        sessionStorage.setItem("name", this.permission.name);
        sessionStorage.setItem("orgId", this.permission.id);
        sessionStorage.setItem("onlySee", false);

        this.getPeopleData();
      }
    },
    // 确认更改权限
    confirmEdit() {
      // 如果用户没有选择权限话 还事默认的
      if (this.permission.name == "") {
        this.show = false;
        this.shows = false;
        return;
      }
      this.list = [];
      this.show = false;
      this.shows = false;
      this.orgId = this.permission.id;
      sessionStorage.setItem("name", this.permission.name);
      sessionStorage.setItem("orgId", this.permission.id);
      this.getPeopleData();
    },
    // 取消更改权限
    cancelEdit() {}
  },
  created() {
    this.orgId = sessionStorage.getItem("orgId");
    this.getPeopleData();
    // 判断是否选择权限
    // console.log(this.orgId);
    if (this.orgId.length == 6) {
      // console.log("滕州市");
      this.show = false;
      sessionStorage.setItem("onlySee", true);
    } else if (this.orgId.length == 15) {
      this.show = false;
      sessionStorage.setItem("onlySee", false);
      this.onlySee = false;
    } else {
      this.show = true;
      sessionStorage.setItem("onlySee", true);
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
  background: url("../../assets/image/bg.png") no-repeat;
  background-size: 100% 194px;
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
    background: #5eacfb;
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
      color: #c1e3ff;
      background: #5eacfb;
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
  .peopleList {
    // width: 100%;
    height: 85vh;
    margin: 0 12px;
    z-index: 10;
    overflow-y: scroll;
    .people_item {
      overflow: hidden;
      width: 100%;
      height: 97px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-shadow: 0px 0px 21px 0px rgba(44, 44, 44, 0.1);
      border-radius: 5px;
      margin: 10px 0;
      .peopleType {
        width: 20px;
        height: 100%;
        background: url("../../assets/image/peopleType_bg.png");
        background-size: 100%;
        font-size: 14px;
        line-height: 14px;
        flex-direction: column;
        font-family: PingFang SC;
        font-weight: 400;
        color: #c7e3ff;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .peopleMsg {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0 15px;
        box-sizing: border-box;
        font-size: 12px;
        font-family: PingFang SC;
        background: #ffffff;
        .msg_top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          padding: 4px 0;
          box-sizing: border-box;
          border-bottom: 1px solid #e7e7e7;
          margin-top: 10px;
          .peopleName {
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #1570d8;
          }
          .isResident {
            font-size: 12px;
            color: #999999;
            & > span {
              font-size: 14px;
              color: #323232;
              margin-left: 5px;
            }
          }
        }
        .msg_bottom {
          width: 100%;
          display: flex;
          flex-direction: column;
          color: #8d8d8d;
          font-size: 14px;
          font-family: PingFang SC;
          .numberOrAddress {
            width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            & > span {
              color: #29292a;
            }
          }
        }
      }
    }
  }
}
/deep/.van-dialog.permission {
  width: 90%;
  border-radius: 9px;
  height: 60vh;
  overflow-y: scroll;
  .dialog_con {
    background-color: #fff;
    .title {
      width: 100%;
      padding: 2% 4%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #000;
    }
    .list {
      width: 100%;
      padding: 2% 4%;
      box-sizing: border-box;
      color: #000;
      .list_item {
        .tit {
          display: flex;
          align-content: center;
          justify-content: space-between;
          p:nth-child(1) {
            &.active {
              color: #0f75e8;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}
.showLoading {
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}
</style>