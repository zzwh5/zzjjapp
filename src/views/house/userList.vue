<template>
  <div class="userList">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text">住户列表</div>
      <div class="head_add" @click="addUser">
        <img src="@/assets/add.png" alt />
      </div>
    </div>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多数据"
        @load="onLoad"
        offset="30"
      >
        <div class="user_list">
          <div class="user_item" v-for="item in list" :key="item.id" @click="userInfo(item)">
            <div class="user_items" v-if="item.governRegisteredPopulation">
              <div class="item_l">{{(item.governRegisteredPopulation.householderName).substr(0,1)}}</div>
              <div class="item_r">
                <div class="name">
                  <p>{{item.governRegisteredPopulation.householderName}}</p>
                  <p>{{item.governRegisteredPopulation.householderRelationshipStr}}</p>
                </div>
                <div class="line"></div>
                <p class="idcard">
                  <span>证件号</span>
                  <span>{{item.governRegisteredPopulation.householderIdCard}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { getUserList } from "@/api/house";
export default {
  name: "UserList",
  data() {
    return {
      // orgid
      orgId: "370481115",
      // 房屋id
      id: sessionStorage.getItem("houseId"),
      // 下拉到底部
      finished: false,
      loading: false,
      // 用户列表
      list: [],
      // 分页
      pageSize: 10,
      pageNo: 0
    };
  },
  methods: {
    // 返回
    goback() {
      this.$router.go(-1);
    },
    onLoad() {
      this.pageNo = Number(this.pageNo) + 1;
      console.log("bottom");
      this.getUserList();
    },
    // 查看住户信息
    userInfo(item) {
      // console.log(item);
      this.$router.push({ name: "UserInfo" });
      sessionStorage.setItem(
        "basicId",
        item.governRegisteredPopulation.basicsId
      );
    },
    // 新增住户信息
    addUser() {
      sessionStorage.setItem("userEditType", 0);
      this.$router.push({ name: "EditUser" });
    },
    // 获取住户列表
    getUserList() {
      var that = this;
      var obj = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        orgId: this.orgId,
        houseId: this.houseId
      };
      return getUserList(obj).then(res => {
        // console.log(res);
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
<style scoped lang="scss">
.userList {
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
  .content {
    margin-top: 1%;
    // flex: 1;
    overflow-y: scroll;
    height: 93vh;
    .van-list {
      height: 100%;
      .user_list {
        width: 100%;
        // height: 100%;
        // overflow: hidden;
        box-sizing: border-box;
        background-color: #fff;
        .user_items {
          display: flex;
          justify-content: space-between;
          border-bottom: 2px solid #eeeeee;
          padding: 0 5%;
          padding-bottom: 4%;
          padding-top: 3.5%;
          height: 124px;
          box-sizing: border-box;
          .item_l {
            flex-shrink: 0;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background-color: #1b87f7;
            font-size: 23px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #ffffff;
            margin-right: 4%;
          }
          .item_r {
            flex-shrink: 0;
            width: 80%;
            padding-top: 3%;
            .name {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 4%;
              p:nth-child(1) {
                font-weight: bold;
                color: #2d2d2d;
              }
              p:nth-child(2) {
                width: 51px;
                height: 20px;
                background: url("../../assets/image/bg_user.png") no-repeat 0 0;
                background-size: 100% 100%;
                font-size: 14px;
                text-align: center;
                line-height: 20px;
                color: #fff;
              }
            }
            .line {
              width: 100%;
              height: 1px;
              background: #e7e7e7;
              margin-bottom: 4%;
            }
            .idcard {
              span {
                font-size: 16px;
              }
              span:nth-child(1) {
                color: #8d8d8d;
                margin-right: 5%;
              }
              span:nth-child(2) {
                color: #0072e6;
              }
            }
          }
        }
      }
    }
  }
}
</style>