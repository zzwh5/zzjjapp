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
    <!--  -->
    <div class="peopleList">
      <!-- <div class="people_item">
          <div class="peopleType">
            住户
          </div>
          <div class="peopleMsg">
            <div class="msg_top">
              <div class="peopleName">苏伟</div>
              <div class="isResident">常住人口<span>3人</span></div>
            </div>
            <div class="msg_bottom">
              <div class="numberOrAddress">户主证件号：<span>370829199710131015</span></div>
              <div class="numberOrAddress">住 户 地 址：<span>测试地址测试地址测试地址测测测测试地址测试地址测试地址测测测</span></div>
            </div>
          </div>
      </div>-->
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
          <!-- <template v-for="item in peopleData" :key="item.basicsId" > -->
          <div v-for="item in peopleData" :key="item.basicsId">
            <div class="people_item" @click="goPeopleDetail(item.id, item.basicsId, item.houseAddress)">
              <div class="peopleType">{{ item.governRegisteredPopulation ? '户主' : '' }}</div>
              <div class="peopleMsg">
                <div class="msg_top">
                  <div class="peopleName">{{ item.governRegisteredPopulation ? item.governRegisteredPopulation.householderName : '' }}</div>
                  <div class="isResident">
                    常住人口
                    <span>{{ item.num ? item.num : 0 }}人</span>
                  </div>
                </div>
                <div class="msg_bottom">
                  <div class="numberOrAddress">
                    户主证件号：
                    <span>{{ item.governRegisteredPopulation ? item.governRegisteredPopulation.householderIdCard : '' }}</span>
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
  </div>
</template>
<script>
import { getGovernRentingHouse, searchPeopleByidCard } from "@/api/people";
export default {
  name: "People",
  data() {
    return {
      // 房屋户主信息
      peopleData: [],
      error: false,
      loading: false,
      finished: true,
      isLoading: false,
      // orgid 应该是用户登录之后拿到的
      orgId: "370481115",
      pageSize: 10,
      pageNo: 1,
      // 搜索信息
      searchText: ""
    };
  },
  methods: {
    //  下拉刷新
    onRefresh() {
       this.pageSize = 10
        this.pageNo = 1
        this.searchText = ''
        this.peopleData = []
        this.isLoading = true;
        this.getPeopleData()
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    goHouse() {
      this.$router.push({ name: "House" });
    },
    //  跳转详情
    goPeopleDetail(id, basicsId, houseAddress) {
      sessionStorage.setItem('id', id)
      sessionStorage.setItem('zhuhuBasicsId', basicsId)
      sessionStorage.setItem('zhuhuHouseAddress', houseAddress)
      this.$router.push({ name: "ResidentList" });
    },
    // 顶部导航栏新增事件
    headAdd() {
      console.log("点击新增按钮");
       sessionStorage.setItem("userEditType", 0);
      this.$router.push({ name: 'EditUser'})
    },
    onLoad() {
      this.getPeopleData()
    },
    // 获取房屋人口数据
    getPeopleData() {
      var that = this;
      var data = {};
      data.pageSize = this.pageSize;
      data.pageNo = this.pageNo;
      data.orgId = this.orgId;
      data.governRegisteredPopulation = {}
      data.governRegisteredPopulation.householderName = this.searchText
      // data.householderName = this.searchText
      //  把搜索数据也加上
      that.loading = true
      return getGovernRentingHouse(data)
        .then(res => {
          // console.log("打印请求的数据", res);
          this.isLoading = false;
          this.loading =  false
          if (res.code === 200) {
            that.peopleData.push(...res.result.data)
            that.pageNo++
            console.log(that.peopleData)
            that.finished = false
            if (!res.result.data) {
              that.finished = true;
            }
          }
        })
        .catch(res => {
          that.finished = true;
          this.loading =  false;
        });
    },
    //  根据姓名查询搜索数据
    searchByName() {
      this.pageNo = 1
      this.pageSize = 10
      this.peopleData = []
      this.getPeopleData()
    }

  },
  created() {
    this.getPeopleData()
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
            &>span {
              color: #29292a;
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