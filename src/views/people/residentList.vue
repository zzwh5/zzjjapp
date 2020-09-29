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
    <!-- 房主信息 -->
    <div class="people_item">
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
    <!-- 住户信息 -->
    <div class="zhuhuTitle">
      住户信息
    </div>
      <!-- 容器 -->
    <div class="zhuhuMsg">
      <div class="zhuhu_item">
        <div class="avater">
          <!-- <img src="https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E6%AF%94%E5%9F%BA%E5%B0%BC&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=1368272940,3215149429&os=3202387521,3637661848&simid=54324146,652366876&pn=89&rn=1&di=99660&ln=356&fr=&fmq=1601299326233_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&objurl=http%3A%2F%2Fwww.zhucefw.com%2Fimages%2FT1Uu.OFaJgXXXXXXXX_%2521%25210-item_pic.jpg&rpstart=0&rpnum=0&adpicid=0&force=undefined" /> -->
          丛
        </div>
        <div class="message">
          <div class="msg_top">
            <div class="msg_name">丛玉荣</div>
            <div class="isHuzhu">户主</div>
          </div>
          <div class="typeNumber">
            <div class="type">人口类型<span style="margin-left:10px;color:#0072E7">常驻人口</span></div>
            <div class="type">证件号码<span style="margin-left:10px;color:#0072E7">37048119610214156X</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return{

    }
  },
  methods:{
    // 点击了新增
    headAdd() {
      console.log('点击了新增')
    }
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
        img {
          width: 18px;
          height: 18px;
        }
      }
    }
    .people_item{
        overflow: hidden;
        // width: 100%;
        margin: 15px 15px 0;
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
    .zhuhuTitle{
      margin: 10px 15px 4px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #6E6E6E;
    }
    .zhuhuMsg{
      margin: 0 15px;
      overflow-y: scroll;
      height: 60vh;
      border-radius: 10px;
      box-shadow: 0px 0px 21px 0px rgba(44, 44, 44, 0.1);
      .zhuhu_item{
        display: flex;
        flex-direction: row;
        height: 123px;
        padding: 10px 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #EEEEEE;

        .avater{
          height: 56px;
          width: 56px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #1B88F7;
          // img{
          //   height: 100%;
          //   width: 100%;
          // }
          font-size: 22px;
          line-height: 56px; 
          font-family: PingFang SC;
          font-weight: bold;
          color: #FFFFFF;
          text-align: center;
        }
        .message{
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 8px;
          .msg_top{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-bottom: 1px solid #E7E7E7;
            font-size: 16px;
            padding: 6px 0;
            box-sizing: border-box;
            font-family: PingFang SC;
            font-weight: bold;
            color: #2E2E2E;
            .isHuzhu{
              height: 20px;
              font-size: 13px;
              font-family: PingFang SC;
              font-weight: 500;
              color: #FFFFFF;
              padding: 0 10px;
              // background: #1B88F7;
              // box-shadow: 0px 0px 21px 0px rgba(44, 44, 44, 0.1);
              // border-radius: 10px 0px 10px 0px;
              background: url('../../assets/image/bg_user.png') no-repeat;
              background-size: 100% 20px;
            }
          }
          .typeNumber{
            margin-top: 14px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #2C2C2C;
            .type{
              color: #2C2C2C;
              &>span{
                color: #0072E7;
              }
            }
          }
        }
      }
    }

  }
</style>