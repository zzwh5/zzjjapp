<template>
  <div class="basicInfo">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text">查看住户信息</div>
      <div class="head_add" @click="editInfo">
        <img src="@/assets/image/edit.png" alt />
      </div>
    </div>
    <!-- 导航列表 -->
    <div class="nav">
      <div
        class="nav_item"
        v-for="(item,i) in navList"
        :class="navType==i?'active':''"
        :key="item.id"
        @click="changeNavType(i)"
      >
        <p class="text">{{item.title}}</p>
        <p class="line"></p>
      </div>
    </div>
    <div class="info">
      <!-- 基本信息 -->
      <div class="content_basic" v-if="navType == 0">
        <div class="info_item" v-for="item in basic" :key="item.id">
          <div v-if="basicInfo[item.dataIndex]">
            <van-field
              v-model="basicInfo[item.dataIndex]"
              :name="item.dataIndex"
              :label="item.title"
              :readonly="item.isSelect"
              colon
              :required="item.isRequire"
            />
            <!-- 占位 -->
            <span></span>
          </div>
          <div v-else>
            <van-field
              v-model="basicInfo.governRealPopulation[item.dataIndex]"
              :name="item.dataIndex"
              :label="item.title"
              :readonly="item.isSelect"
              colon
              :required="item.isRequire"
            />
            <!-- 占位 -->
            <span></span>
          </div>
        </div>
      </div>
      <!-- 暂住信息 -->
      <div class="content_flow" v-if="navType == 1">
        <div class="info_item" v-for="item in flow" :key="item.id">
          <van-field
            v-model="flowInfo[item.dataIndex]"
            :name="item.dataIndex"
            :label="item.title"
            readonly
            colon
            :required="item.isRequire"
          />
          <!-- 占位 -->
          <span></span>
        </div>
      </div>
      <!-- 特殊人群 -->
      <div class="content_special" v-if="navType == 2">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            v-for="(item) in specialList"
            :key="item.id"
            :title="item.title"
            :name="item.name"
            :is-link="false"
            :disabled="!item.turn"
          >
            <template #value>
              <van-button
                hairline
                :color="item.turn?'#1B88F7':'#EBEBEB'"
                style="width:56px;height:31px;border-radius:5px;"
                :style="{color:(item.turn?'#fff':'#000')}"
                @click.native.prevent.stop="item.turn =true"
              >是</van-button>
              <van-button
                :color="item.turn?'#EBEBEB':'#1B88F7'"
                hairline
                type="danger"
                style="width:56px;height:31px;border-radius:5px;"
                :style="{color:(item.turn?'#000':'#fff')}"
                @click.native.prevent.stop="delSpecial(item)"
              >否</van-button>
            </template>
            <div class="info_item" v-for="items in item.type" :key="items.id">
              <div>
                <van-field
                  v-model="item.names[items.dataIndex]"
                  :name="items.dataIndex"
                  :label="items.title"
                  :readonly="items.isSelect"
                  colon
                  :required="items.isRequire"
                />
                <!-- 占位 -->
                <span></span>
              </div>
            </div>
            <div
              style="width:100%;margin-top:10px;display:flex;aligin-items:center; justify-content: flex-end;"
            >
              <van-button
                plain
                size="mini"
                :loading="item.loading"
                type="info"
                loading-text="提交中..."
                text="提交"
                @click.native="submit(item.name,item)"
              />
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
      <!-- 实有人口 -->
      <div class="content_more" v-if="navType == 3">
        <van-collapse v-model="activeNames" accordion>
          <van-collapse-item
            v-for="item in moreList"
            :key="item.id"
            :title="item.title"
            :name="item.name"
            :is-link="false"
            :disabled="!item.turn"
          >
            <!-- value="value" -->
            <template #value>
              <van-button
                hairline
                :color="item.turn?'#1B88F7':'#EBEBEB'"
                style="width:56px;height:31px;border-radius:5px;"
                :style="{color:(item.turn?'#fff':'#000')}"
                @click.native.prevent.stop="item.turn =true"
              >是</van-button>
              <van-button
                :color="item.turn?'#EBEBEB':'#1B88F7'"
                hairline
                type="danger"
                style="width:56px;height:31px;border-radius:5px;"
                :style="{color:(item.turn?'#000':'#fff')}"
                @click.native.prevent.stop="delSpecial(item)"
              >否</van-button>
            </template>
            <div class="info_item" v-for="items in item.type" :key="items.id">
              <van-field
                v-model="item.names[items.dataIndex]"
                :name="items.dataIndex"
                :label="items.title"
                :readonly="items.isSelect"
                colon
                :required="items.isRequire"
              />
              <!-- 占位 -->
              <span></span>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>
<script>
// 引入接口
import {
  getBasicByBasicid,
  getFlowByBasicid,
  getSpecialByBasicid
} from "@/api/common";
// 引入基本信息
import basic from "@/until/basic";
// 流动人口
import flow from "@/until/flow";
// 刑满释放人员
import releasedFromPrison from "@/until/releasedFromPrison";
// console.log(releasedFromPrison);
// 社区矫正人员
import communityCorrection from "@/until/communityCorrection";
// 肇事人员
import psychosis from "@/until/psychosis";
// 吸毒人员
import drugs from "@/until/drugs";
// 艾滋病人员
import aids from "@/until/aids";
// 信访重点人员
import letter from "@/until/letter";
// 重点青少年
import teenager from "@/until/teenager";
// 留守人员
import rear from "@/until/rear";
// 境外人员
import overseasReople from "@/until/overseasReople";
// 三无老人
import sanwu from "@/until/sanwu";
// 空巢老人
import empty from "@/until/empty";
// 死亡人口
import death from "@/until/death";
// 残疾人员
import disability from "@/until/disability";
// 低保人员
import basicLivingAllowance from "@/until/basicLivingAllowance";
// 特困人员
import exceptionalPoverty from "@/until/exceptionalPoverty";
// 就业/失业
import service from "@/until/service";
export default {
  name: "UserInfo",
  data() {
    return {
      // basicId
      basicId: sessionStorage.getItem("basicId"),
      // 当前的房屋id  修改的时候用
      id: sessionStorage.getItem("houseId"),
      // navList 列表
      navList: [
        {
          id: 1,
          title: "基本信息"
        },
        {
          id: 2,
          title: "暂住信息"
        },
        {
          id: 3,
          title: "特殊信息"
        },
        {
          id: 4,
          title: "拓展信息"
        }
      ],
      // 当前的导航类型
      navType: 0,
      // 基本信息
      basicInfo: { governRealPopulation: {} },
      // 暂住信息
      flowInfo: {},
      // 特殊人群折叠面板展开的项
      activeName: null,
      // 扩展信息折叠面板展开的项
      activeNames: null,
      // 特殊人群列表
      specialList: [
        {
          id: 1,
          title: "刑满释放人口",
          type: releasedFromPrison,
          name: "releasedFromPrisonInfo",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 2,
          title: "社区矫正人口",
          type: communityCorrection,
          name: "communityCorrectionInfo",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 3,
          title: "肇事肇祸等严重精神障碍患者人口",
          type: psychosis,
          name: "psychosisInfo",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 4,
          title: "吸毒人口",
          type: drugs,
          name: "drugsInfo",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 5,
          title: "艾滋病人口",
          type: aids,
          name: "aids",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 6,
          title: "信访重点人口",
          type: letter,
          name: "letterInfo",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 7,
          title: "重点青少年",
          type: teenager,
          name: "teenagerInfo",
          names: {},
          turn: false,
          loading: false
        }
      ],
      moreList: [
        {
          id: 1,
          title: "留守人员",
          type: rear,
          name: "rearInfo",
          turn: false,
          loading: false,
          names: {}
        },
        {
          id: 2,
          title: "境外人员",
          type: overseasReople,
          name: "overseasReopleInfo",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 3,
          title: "三无老人",
          type: sanwu,
          name: "sanwuInfo",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 4,
          title: "空巢老人",
          type: empty,
          name: "emptyInfo",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 5,
          title: "死亡人口",
          type: death,
          name: "deathInfo",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 6,
          title: "残疾人员",
          type: disability,
          name: "disabilityInfo",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 7,
          title: "低保人员",
          type: basicLivingAllowance,
          name: "basicLivingAllowanceInfo",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 8,
          title: "特困人员",
          type: exceptionalPoverty,
          name: "exceptionalPovertyInfo",
          names: {},
          turn: false,
          loading: false
        },
        {
          id: 9,
          title: "就业/失业",
          type: service,
          name: "serviceInfo",
          names: {},
          turn: false,
          loading: false
        }
      ],
      // 基本信息
      basic: basic,
      // 流动人口
      flow: flow
    };
  },
  created() {
    this.getBasicByBasicid();
    this.getSpecialIsSelect();
    this.getMoreIsSelect();
    // console.log(releasedFromPrison);
  },
  methods: {
    // 返回上一级
    goback() {
      this.$router.go(-1);
    },
    // 前往编辑住户信息的页面
    editInfo() {
      // 更改当前的楼栋编辑类型
      sessionStorage.setItem("userEditType", 1);
      this.$router.push({ name: "EditUser" });
    },
    // 解析地址
    parseAddress(obj) {
      // 籍贯
      obj.nativePlaceProvince =
        obj.nativePlaceProvince === null ? "" : obj.nativePlaceProvince;
      obj.nativePlaceCity =
        obj.nativePlaceCity === null ? "" : obj.nativePlaceCity;
      obj.nativePlaceRegion =
        obj.nativePlaceRegion === null ? "" : obj.nativePlaceRegion;
      // 户籍地
      obj.placeDomicileProvince =
        obj.placeDomicileProvince === null ? "" : obj.placeDomicileProvince;
      obj.placeDomicileCity =
        obj.placeDomicileCity === null ? "" : obj.placeDomicileCity;
      obj.placeDomicileRegion =
        obj.placeDomicileRegion === null ? "" : obj.placeDomicileRegion;
      // 现住地
      obj.currentResidenceProvince =
        obj.currentResidenceProvince === null
          ? ""
          : obj.currentResidenceProvince;
      obj.currentResidenceCity =
        obj.currentResidenceCity === null ? "" : obj.currentResidenceCity;
      obj.currentResidenceRegion =
        obj.currentResidenceRegion === null ? "" : obj.currentResidenceRegion;
      obj.currentResidenceStreet =
        obj.currentResidenceStreet === null ? "" : obj.currentResidenceStreet;
      obj.currentResidenceCommunity =
        obj.currentResidenceCommunity === null
          ? ""
          : obj.currentResidenceCommunity;

      // console.log(obj)
      if (obj.nativePlaceProvince !== "") {
        obj.jiguans =
          obj.nativePlaceProvince +
          "/" +
          obj.nativePlaceCity +
          "/" +
          obj.nativePlaceRegion;
      } else {
        obj.jiguans = "";
      }
      if (obj.placeDomicileProvince !== "") {
        obj.hujidis =
          obj.placeDomicileProvince +
          "/" +
          obj.placeDomicileCity +
          "/" +
          obj.placeDomicileRegion;
      } else {
        obj.hujidis = "";
      }
      if (obj.currentResidenceProvince !== "") {
        obj.xianzhudis =
          obj.currentResidenceProvince +
          "/" +
          obj.currentResidenceCity +
          "/" +
          obj.currentResidenceRegion +
          "/" +
          obj.currentResidenceStreet +
          "/" +
          obj.currentResidenceCommunity;
      } else {
        obj.xianzhudis = "";
      }
      return obj;
    },
    // 获取基本信息
    getBasicByBasicid() {
      var that = this;
      var obj = {
        basicsId: this.basicId
      };
      return getBasicByBasicid(obj).then(res => {
        // console.log(res);
        that.basicInfo = res.ret ? res.ret : { governRealPopulation: {} };
        res.ret = that.parseAddress(res.ret);
        // console.log(res);
        that.basicInfo = res.ret ? res.ret : { governRealPopulation: {} };
      });
    },
    // 获取流动人口信息
    getFlowByid() {
      var that = this;
      var obj = {
        basicsId: this.basicId
      };
      return getFlowByBasicid(obj).then(res => {
        // console.log(res);
        that.flowInfo = res.ret ? res.ret : {};
      });
    },
    // 更改导航类型
    changeNavType(index) {
      this.navType = index;
      // console.log(index);
      if (index == 0) {
        this.getBasicByBasicid();
      } else if (index == 1) {
        this.getFlowByid();
      } else if (index == 2) {
      } else if (index == 3) {
      }
    },
    // 切换特殊人群
    getSpecialIsSelect() {
      var that = this;
      this.specialList.forEach(item => {
        var obj = {
          basicsId: this.basicId,
          name: item.name.split("Info")[0]
        };
        return getSpecialByBasicid(obj).then(res => {
          // console.log(res);
          item.turn = res.ret ? true : false;
          item.names = res.ret ? res.ret : [];
          // console.log(item.turn);
        });
      });
    },
    // 切换实有人口
    getMoreIsSelect() {
      var that = this;
      this.moreList.forEach(item => {
        var obj = {
          basicsId: this.basicId,
          name: item.name.split("Info")[0]
        };
        return getSpecialByBasicid(obj).then(res => {
          // console.log(res);
          item.turn = res.ret ? true : false;
          item.names = res.ret ? res.ret : [];
          // console.log(item.type);
        });
      });
    }, // 展示下拉框
    // 弹框展示
    showName(text, type) {
      console.log(text);
      if (text == "现住地") {
        this.cityVisable = true;
        return false;
      }
      if (text == "房主联系类型") {
        text = "联系类型";
      }
      if (text == "隐患类型") {
        text = "安全隐患类型";
      }

      return getSelect(text).then(res => {
        console.log(res);
        this.dialogList = res.ret.dictionaryList;
        // return false;
        this.dialogType = type;
        this.dialogText = text;
        this.show = true;
      });
    }
  }
};
</script>
<style scoped lang="scss">
.basicInfo {
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
  .nav {
    flex-shrink: 0;
    margin-top: 3px;
    height: 55px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    margin-bottom: 1%;
    .nav_item {
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        font-size: 16px;
        font-weight: 500;
        color: #2e2e2e;
      }
      .line {
        position: absolute;
        bottom: 5%;
        width: 100%;
        height: 3px;
        background: transparent;
        border-radius: 2px;
      }
      &.active {
        .line {
          background: #0080ce;
        }
      }
    }
  }
  .info {
    height: 84vh;
    overflow-y: scroll;
    flex-shrink: 0;
    // flex: 1;
    .info_item {
      position: relative;
      /deep/.van-cell {
        line-height: 27px;
        position: relative;
        &:after {
          border-bottom: 2px solid #eeeeee;
        }
        .van-cell__value {
          .van-field__body {
            .van-field__control {
              width: 92%;
            }
          }
        }
      }
      img {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 17px;
      }
    }
  }
  /deep/.van-collapse-item__title {
    height: 48px;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 48px;
  }
}
</style>