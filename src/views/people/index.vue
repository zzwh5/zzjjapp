<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="head_back">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text">住户管理</div>
      <div class="head_add" @click="headAdd">
        <img src="@/assets/add.png" alt />
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="search">
      <input type="text" placeholder="请输入搜索关键字" v-model="searchText" />
      <img @click="searchByidCard" src="@/assets/search.png" alt />
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
      </div> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多数据"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        offset="30"
      >
        <div class="people_item" @click="goPeopleDetail">
            <div class="peopleType">
              户主
            </div>
            <div class="peopleMsg">
              <div class="msg_top">
                <div class="peopleName">丛玉荣</div>
                <div class="isResident">常住人口<span>1人</span></div>
              </div>
              <div class="msg_bottom">
                <div class="numberOrAddress">户主证件号：<span>37048119610214156X</span></div>
                <div class="numberOrAddress">住 户 地 址：<span>山东省枣庄市滕州市龙阳镇龙阳村 	51号</span></div>
              </div>
            </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { getGovernRentingHouse, searchPeopleByidCard } from "@/api/people";
export default {
  name: 'People',
  data() {
    return {
      // 房屋户主信息
      peopleData: [],
      error: false,
      loading: false,
      finished: true,
      // orgid 应该是用户登录之后拿到的
      orgId: "370481",
      pageSize: 10,
      pageNo: 1,
      // 搜索信息
      searchText:''
    }
  },
  methods:{
    //  跳转详情
    goPeopleDetail () {
      this.$router.push({ name: "ResidentList" });
    },
    // 顶部导航栏新增事件
    headAdd() {
      console.log('点击新增按钮');
    },
    onLoad() {
      // this.getPeopleData()
    },
    // 获取房屋人口数据
    getPeopleData() {
      var that = this
      var data = {}
      data.pageSize = this.pageSize
      data.pageNo = this.pageNo
      data.orgId = this.orgId
      //  把搜索数据也加上
      // data.householderIdCard = this.householderIdCard
      return getGovernRentingHouse(data).then(res => {
        console.log('打印请求的数据', res)
        this.loading = false
        if(res.code === 200){
          this.peopleData = res.result.data
           if (res.result.total == that.peopleData.length) {
            that.finished = true;
          }
        }
      }).catch(res => {
          that.finished = true;
      });
    },
    //  根据身份证号查询搜索数据
    searchByidCard() {
      var data = {}
      data.householderIdCard = this.searchText
      data.orgId = this.orgId
      var that = this
      return searchPeopleByidCard(data).then(res => {
        console.log(res, '搜索得到的数据')
        if(res.code === 200){
          that.peopleData = res.ret
        }
      })
    }
  },
  created(){
    // this.getPeopleData()
  }
}
</script>
<style lang="scss" scoped>
  .home{
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
      background: #5EACFB;
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
        color: #C1E3FF;
        background: #5EACFB;
      }
      img {
        width: 16px;
        height: 16px;
      }
    }
    .peopleList{
      // width: 100%;
      height: 85vh;
      margin: 0 12px;
      z-index: 10;
      overflow-y: scroll;
      .people_item{
        overflow: hidden;
        width: 100%;
        height: 97px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        box-shadow: 0px 0px 21px 0px rgba(44, 44, 44, 0.1);
        border-radius: 5px;
        .peopleType{
          width: 20px;
          height: 100%;
          background: url('../../assets/image/peopleType_bg.png');
          background-size: 100%;
          font-size: 14px;        
          line-height: 14px;
          flex-direction: column; 
          font-family: PingFang SC;
          font-weight: 400;
          color: #C7E3FF;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          
        }
        .peopleMsg{
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0 15px;
          box-sizing: border-box;
          font-size: 12px;
          font-family: PingFang SC;
          background: #FFFFFF;
          .msg_top{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            width: 100%;
            padding: 4px 0;
            box-sizing: border-box;
            border-bottom: 1px solid #E7E7E7;
            margin-top: 10px;
            .peopleName{
              font-size: 18px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #1570D8;
            }
            .isResident{
              font-size: 12px;
              color: #999999;
              &>span{
                font-size: 14px;
                color: #323232;
                margin-left: 5px;
              }
            }
          }
          .msg_bottom{
            width: 100%;
            display: flex;
            flex-direction: column;
            color: #8D8D8D;
            font-size: 14px;
            font-family: PingFang SC;
            .numberOrAddress{
              width: 300px;
              overflow: hidden;    
              text-overflow:ellipsis;    
              white-space: nowrap;
              &>span{
                color: #29292A;
              }
            }
          }
        }
      }
    }
  }
  .showLoading{
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    
  }
</style>