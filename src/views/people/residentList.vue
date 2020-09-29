<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text">住户列表</div>
      <div class="head_add">
        <!-- <img src="@/assets/add.png" alt /> -->
      </div>
    </div>
    <!-- 房主信息 -->
    <div class="people_item">
      <div class="peopleType">{{ huzhuData.governRealPopulation ? '户主' : '' }}</div>
      <div class="peopleMsg">
        <div class="msg_top">
          <div class="peopleName">{{ huzhuData.governRealPopulation ? huzhuData.governRealPopulation.fullName : '' }}</div>
          <!-- <div class="isResident">
            常住人口
            <span>1人</span>
          </div> -->
        </div>
        <div class="msg_bottom">
          <div class="numberOrAddress">
            户主证件号：
            <span>{{ huzhuData.governRealPopulation ? huzhuData.governRealPopulation.idCard : '' }}</span>
          </div>
          <div class="numberOrAddress">
            房 屋 地 址：
            <span>{{ houseAddress }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 住户信息 -->
    <div class="zhuhuTitle">住户信息</div>
    <!-- 容器 -->
    <div class="zhuhuMsg">
      <div v-for="item in zhuhuData" :key="item.id" @click="goAddMsg(item)">
        <div class="zhuhu_item">
          <div class="avater">
            {{ item.governRegisteredPopulation ? item.governRegisteredPopulation.householderName.trim().slice(0,1) : '' }}
          </div>
          <div class="message">
            <div class="msg_top">
              <div class="msg_name">{{ item.governRegisteredPopulation ? item.governRegisteredPopulation.householderName : '' }}</div>
              <div class="isHuzhu">{{ item.governRegisteredPopulation ? item.governRegisteredPopulation.householderRelationshipStr : '' }}</div>
            </div>
            <div class="typeNumber">
              <!-- <div class="type">
                与户主关系
                <span style="margin-left:10px;color:#0072E7">{{  }}</span>
              </div> -->
              <div class="type">
                证件号码
                <span style="margin-left:10px;color:#0072E7">{{ item.governRegisteredPopulation ? item.governRegisteredPopulation.householderIdCard : '' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import { getHousePeople, getZhuhu } from "@/api/people";
export default {
  data() {
    return {
      orgId: '370481115',
      id: '',
      zhuhuBasicsId: '',
      houseAddress: '',
      zhuhuData: [],
      huzhuData: []
    }
  },
  created(){
    this.id = sessionStorage.getItem('id')
    this.zhuhuBasicsId = sessionStorage.getItem('zhuhuBasicsId')
    this.houseAddress = sessionStorage.getItem('zhuhuHouseAddress')
    console.log(this.id)
    this.getZhuhuData()
    this.getData()
  },
  methods: {
    //  跳转用户讯息
    goAddMsg(item){
      sessionStorage.setItem("basicId", item.governRegisteredPopulation.basicsId)
      this.$router.push({name: 'HouseInfo'})
    },
    // 返回上一级
    goback() {
      this.$router.go(-1);
    },
    // 查询数据
    getData(){
      var data = {}
      data.orgId = this.orgId
      data.houseId = this.id
      return getHousePeople(data).then(res => {
        if(res.code === 200){
          console.log(res)
          if(res.code === 200){
              this.zhuhuData = res.ret
          }else{
            Notify({ type: "warning", message: res.msg });
          }
        }
      }).catch(res => {
        Notify({ type: "warning", message: '系统错误' });
      })
    },
    // 获取房主信息
    getZhuhuData(){
      var data = {
        basicsId: this.zhuhuBasicsId
      }
      getZhuhu(data).then(res => {
        if(res.code === 200){
            console.log(res)
            this.huzhuData = res.ret
            if(res.ret === null){
              Notify({ type: "warning", message: '暂无数据' });
            }
        }else{
          console.log(res)
        }
      })
    },
    // 点击了新增
    headAdd() {
      console.log("点击了新增");
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
  background-size: 100% 120px;
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
      width: 18px;
      height: 18px;
      img {
        width: 18px;
        height: 18px;
      }
    }
  }
  .people_item {
    overflow: hidden;
    // width: 100%;
    margin: 15px 15px 0;
    height: 97px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0px 0px 21px 0px rgba(44, 44, 44, 0.1);
    border-radius: 5px;
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
  .zhuhuTitle {
    margin: 10px 15px 4px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #6e6e6e;
  }
  .zhuhuMsg {
    margin: 0 15px;
    overflow-y: scroll;
    height: 60vh;
    border-radius: 10px;
    box-shadow: 0px 0px 21px 0px rgba(44, 44, 44, 0.1);
    .zhuhu_item {
      display: flex;
      flex-direction: row;
      height: 123px;
      padding: 10px 15px;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;

      .avater {
        height: 56px;
        width: 56px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #1b88f7;
        // img{
        //   height: 100%;
        //   width: 100%;
        // }
        font-size: 22px;
        line-height: 56px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
      }
      .message {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 8px;
        .msg_top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 1px solid #e7e7e7;
          font-size: 16px;
          padding: 6px 0;
          box-sizing: border-box;
          font-family: PingFang SC;
          font-weight: bold;
          color: #2e2e2e;
          .isHuzhu {
            height: 20px;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            padding: 0 10px;
            // background: #1B88F7;
            // box-shadow: 0px 0px 21px 0px rgba(44, 44, 44, 0.1);
            // border-radius: 10px 0px 10px 0px;
            background: url("../../assets/image/bg_user.png") no-repeat;
            background-size: 100% 20px;
          }
        }
        .typeNumber {
          margin-top: 14px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #2c2c2c;
          .type {
            color: #2c2c2c;
            & > span {
              color: #0072e7;
            }
          }
        }
      }
    }
  }
}
</style>