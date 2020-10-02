<template>
  <div class="editUser">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text" v-if="userEditType == 1">编辑住户信息</div>
      <div class="head_text" v-if="userEditType == 0">增加住户信息</div>
      <div class="head_add">
        <!-- <img src="@/assets/add.png" alt /> -->
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
        <van-form ref="Form" @submit="onSubmit" @failed="failed">
          <div class="info_item" v-for="item in basic" :key="item.id">
            <!-- {{item.dataIndex in basicInfo.governRealPopulation}} -->
            <div v-if="item.isSpecial">
              <van-field
                autofocus
                v-if="item.isSelect"
                v-model="basicInfo[item.dataIndex]"
                :name="item.dataIndex"
                :label="item.title"
                :readonly="item.isSelect"
                colon
                :required="item.isRequire"
                :rules="item.isRequire?[{ required: true,trigger:'o' }]:[]"
                @click="showName(basicInfo,item.title,item.dataIndex)"
              />
              <van-field
                v-else
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
                v-if="item.isSelect"
                v-model="basicInfo.governRealPopulation[item.dataIndex]"
                :name="item.dataIndex"
                :label="item.title"
                :readonly="item.isSelect"
                colon
                :required="item.isRequire"
                :rules="item.isRequire?[{ required: true,trigger:'o' }]:[]"
                @click="showName(basicInfo,item.title,item.dataIndex,true)"
              />
              <van-field
                v-else
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
        </van-form>
        <div
          style="width:100%;margin-top:10px;display:flex;aligin-items:center; justify-content: flex-end;"
        >
          <van-button
            plain
            size="mini"
            :loading="subLoading"
            type="info"
            loading-text="提交中..."
            text="提交"
            @click.native="submit('basicInfo',basicInfo)"
          />
        </div>
      </div>
      <!-- 暂住信息 -->
      <div class="content_flow" v-if="navType == 1">
        <van-form ref="Form1" @submit="onSubmit" @failed="failed">
          <div class="info_item" v-for="item in flow" :key="item.id">
            <van-field
              autofocus
              v-if="item.isSelect"
              v-model="flowInfo[item.dataIndex]"
              :name="item.dataIndex"
              :label="item.title"
              readonly
              colon
              :required="item.isRequire"
            />
            <van-field
              v-else
              v-model="flowInfo[item.dataIndex]"
              :name="item.dataIndex"
              :label="item.title"
              :readonly="item.isSelect"
              colon
              :required="item.isRequire"
              :rules="item.isRequire?[{ required: true,trigger:'o' }]:[]"
              @click="showName(flowInfo,item.governRealPopulation.title,item.governRealPopulation.dataIndex)"
            />
            <!-- 占位 -->
            <span></span>
          </div>
        </van-form>
        <div
          style="width:100%;margin-top:10px;display:flex;aligin-items:center; justify-content: flex-end;"
        >
          <van-button
            plain
            size="mini"
            :loading="subLoading"
            type="info"
            loading-text="提交中..."
            text="提交"
            @click.native="submit('flowInfo',flowInfo)"
          />
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
            <van-form :ref="item.name" @submit="onSubmit" @failed="failed">
              <div class="info_item" v-for="items in item.type" :key="items.id">
                <div>
                  <van-field
                    autofocus
                    v-if="items.isSelect"
                    v-model="item.names[items.dataIndex]"
                    :name="items.dataIndex"
                    :label="items.title"
                    :readonly="items.isSelect"
                    colon
                    placeholder="请输入"
                    :required="items.isRequire"
                    :rules="items.isRequire?[{ required: true,trigger:'o' }]:[]"
                    @click="showName(item.names,items.title,items.dataIndex)"
                  />
                  <van-field
                    v-else
                    autofocus
                    v-model="item.names[items.dataIndex]"
                    :name="items.dataIndex"
                    :label="items.title"
                    :readonly="items.isSelect"
                    colon
                    placeholder="请输入"
                    :required="items.isRequire"
                    :rules="items.isRequire?[{ required: true,trigger:'o' }]:[]"
                  />
                  <!-- 占位 -->
                  <span></span>
                </div>
              </div>
            </van-form>
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
            <van-form :ref="item.name" @submit="onSubmit" @failed="failed">
              <div class="info_item" v-for="items in item.type" :key="items.id">
                <van-field
                  autofocus
                  v-if="items.isSelect"
                  v-model="item.names[items.dataIndex]"
                  :name="items.dataIndex"
                  :label="items.title"
                  :readonly="items.isSelect"
                  colon
                  :required="items.isRequire"
                  @click="showName(item.names,items.title,items.dataIndex)"
                  :rules="items.isRequire?[{ required: true,trigger:'o' }]:[]"
                />
                <van-field
                  autofocus
                  v-else
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
            </van-form>
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
                @click.native="submit(item.name,item,item.name)"
              />
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>

    <!-- 下拉框弹框 -->
    <van-dialog v-model="show" title :showConfirmButton="false" closeOnClickOverlay>
      <div class="orgname">
        <p>{{dialogText}}</p>
        <p
          v-for="item in dialogList"
          :key="item.id"
          @click="changeInfo(item.dictionaryValue,item.dictionaryName)"
        >{{item.dictionaryName}}</p>
      </div>
    </van-dialog>
    <!-- 时间选择弹框 -->
    <van-calendar :show-confirm="false" v-model="Timeshow" :minDate="minDate" @confirm="onConfirm" />
    <!-- 省市区选择弹框 -->
    <!-- 省市区  -->
    <van-popup v-model="cityVisable" position="bottom">
      <van-picker
        show-toolbar
        title="请选择地区"
        value-key="name"
        :columns="areaList"
        @change="onAreaChange"
        @cancel="onCancel"
        @confirm="onAreaConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
// 解析时间
import moment from "moment";
import { getAddress, getSelect } from "@/api/common";
import { editUserInfo } from "@/api/house";
// 提示框
import { Notify } from "vant";
// 引入弹框
import { Dialog } from "vant";
// 引入接口
import {
  getBasicByBasicid,
  getFlowByBasicid,
  getSpecialByBasicid,
  editSpecialByBasicid,
  delSpecialByBasicid,
  editBasicByBasicid,
  editGover,
  editFlowByBasicid
} from "@/api/common";
// 引入基本信息
import basic from "@/until/basic";
// 流动人口
import flow from "@/until/flow";
// 刑满释放人员
import releasedFromPrison from "@/until/releasedFromPrison";
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
  name: "EditUser",
  data() {
    return {
      orgId: "370481115",
      // 是不是基本信息的档案管理的下拉框
      isGover: false,
      // 住户信息的编辑类型
      userEditType: sessionStorage.getItem("userEditType"),
      // basicId
      basicId: sessionStorage.getItem("basicId"),
      // 当前模块的id 只有在保存后才有这个id 不然不能删除
      ids: "",
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
      // 弹框的开关
      show: false,
      // 弹框内容类型
      dialogType: "orgName",
      dialogText: "",
      // 弹框的下拉数组
      dialogList: [],
      // 时间选择开关
      Timeshow: false,
      // 其实日期
      minDate: new Date(1800, 0, 1),
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
          turn: true,
          loading: false
        },
        {
          id: 2,
          title: "社区矫正人口",
          type: communityCorrection,
          name: "communityCorrectionInfo",
          names: {},
          turn: true,
          loading: false
        },
        {
          id: 3,
          title: "肇事肇祸等严重精神障碍患者人口",
          type: psychosis,
          name: "psychosisInfo",
          names: {},
          turn: true,
          loading: false
        },
        {
          id: 4,
          title: "吸毒人口",
          type: drugs,
          name: "drugsInfo",
          names: {},
          turn: true,
          loading: false
        },
        {
          id: 5,
          title: "艾滋病人口",
          type: aids,
          name: "aids",
          names: {},
          turn: true,
          loading: false
        },
        {
          id: 6,
          title: "信访重点人口",
          type: letter,
          name: "letterInfo",
          names: {},
          turn: true,
          loading: false
        },
        {
          id: 7,
          title: "重点青少年",
          type: teenager,
          name: "teenagerInfo",
          names: {},
          turn: true,
          loading: false
        }
      ],
      moreList: [
        {
          id: 1,
          title: "留守人员",
          type: rear,
          name: "rearInfo",
          turn: true,
          loading: false,
          names: {}
        },
        {
          id: 2,
          title: "境外人员",
          type: overseasReople,
          name: "overseasReopleInfo",
          names: {},
          turn: true,
          loading: false
        },
        {
          id: 3,
          title: "三无老人",
          type: sanwu,
          name: "sanwuInfo",
          names: {},
          turn: true,
          loading: false
        },
        {
          id: 4,
          title: "空巢老人",
          type: empty,
          name: "emptyInfo",
          names: {},
          turn: true,
          loading: false
        },
        {
          id: 5,
          title: "死亡人口",
          type: death,
          name: "deathInfo",
          names: {},
          turn: true,
          loading: false
        },
        {
          id: 6,
          title: "残疾人员",
          type: disability,
          name: "disabilityInfo",
          names: {},
          turn: true,
          loading: false
        },
        {
          id: 7,
          title: "低保人员",
          type: basicLivingAllowance,
          name: "basicLivingAllowanceInfo",
          names: {},
          turn: true,
          loading: false
        },
        {
          id: 8,
          title: "特困人员",
          type: exceptionalPoverty,
          name: "exceptionalPovertyInfo",
          names: {},
          turn: true,
          loading: false
        },
        {
          id: 9,
          title: "就业/失业",
          type: service,
          name: "serviceInfo",
          names: {},
          turn: true,
          loading: false
        }
      ],
      // 基本信息
      basic: basic,
      // 流动人口
      flow: flow,
      // form表单提交的item
      item: "",
      // 当前提交的类型 主要是为了区分有无折叠版的模块
      submitType: null,
      subLoading: false,
      //遮罩层显示或隐藏
      cityVisable: false,
      // 联动类别 5级true 3级 false
      //自定义数据五级结构
      areaList: [
        { values: [] },
        { values: [] },
        { values: [] },
        { values: [] },
        { values: [] }
      ]
    };
  },
  created() {
    // 省市区
    this.getArea("", 0);
    if (this.userEditType != 0) {
      // 省市区
      this.getArea("", 0);
      this.getBasicByBasicid();
      this.getSpecialIsSelect();
      this.getMoreIsSelect();
    }
  },
  watch: {
    // 监听楼栋信息的变化 更改addressStr
    basicInfo: {
      handler: function(value, old) {
        console.log("changeAddress");
        if (
          value.governRealPopulation.currentResidenceProvinceStr != null ||
          value.governRealPopulation.currentResidenceProvinceStr
        ) {
          this.basicInfo.governRealPopulation.currentResidences =
            this.basicInfo.governRealPopulation.currentResidenceProvinceStr +
            this.basicInfo.governRealPopulation.currentResidenceCityStr +
            this.basicInfo.governRealPopulation.currentResidenceRegionStr +
            this.basicInfo.governRealPopulation.currentResidenceStreetStr +
            this.basicInfo.governRealPopulation.currentResidenceCommunityStr;
        }
        if (
          value.governRealPopulation.nativePlaceProvinceStr != null ||
          value.governRealPopulation.nativePlaceProvinceStr
        ) {
          console.log(12132132);
          this.basicInfo.governRealPopulation.nativePlaces =
            this.basicInfo.governRealPopulation.nativePlaceProvinceStr +
            this.basicInfo.governRealPopulation.nativePlaceCityStr +
            this.basicInfo.governRealPopulation.nativePlaceRegionStr;
        }
        if (
          value.governRealPopulation.placeDomicileProvinceStr != null ||
          value.governRealPopulation.placeDomicileProvinceStr
        ) {
          this.basicInfo.governRealPopulation.placeDomiciles =
            this.basicInfo.governRealPopulation.placeDomicileProvinceStr +
            this.basicInfo.governRealPopulation.placeDomicileCityStr +
            this.basicInfo.governRealPopulation.placeDomicileRegionStr;
        }
      },
      deep: true
    },
    moreList: {
      handler: function(value, old) {
        // console.log(value);
        var obj = value[0].names;
        if (
          obj.mainFamilyMembersWorkProvince != null ||
          obj.mainFamilyMembersWorkProvince != null
        ) {
          this.moreList[0].names.mainFamilyMembersWork =
            obj.mainFamilyMembersWorkProvinceStr +
            obj.mainFamilyMembersWorkCityStr +
            obj.mainFamilyMembersWorkRegionStr;
        }
      },
      deep: true
    }
  },
  methods: {
    // 返回上一级
    goback() {
      this.$router.go(-1);
    },
    // 弹框展示
    showName(item, text, type, turn) {
      if (turn) {
        this.isGover = true;
      }
      console.log(item, text, type);
      this.item = item;
      // return false;
      if (text == "现住地(省市区)") {
        this.cityVisable = true;
        this.cityType = 0;
        var obj = this.areaList[0];
        this.areaList = [
          obj,
          { values: [] },
          { values: [] },
          { values: [] },
          { values: [] }
        ];
        return false;
      }
      if (text == "籍贯(省市区)") {
        this.cityVisable = true;
        this.cityType = 1;
        var obj = this.areaList[0];
        this.areaList = [obj, { values: [] }, { values: [] }];
        return false;
      }
      if (text == "户籍地(省市区)") {
        this.cityVisable = true;
        this.cityType = 2;
        var obj = this.areaList[0];
        this.areaList = [obj, { values: [] }, { values: [] }];
        return false;
      }
      if (text == "家庭主要成员工作地(省市区)") {
        this.cityVisable = true;
        this.cityType = 3;
        var obj = this.areaList[0];
        this.areaList = [obj, { values: [] }, { values: [] }];
        return false;
      }

      // console.log(text.indexOf("日期") != -1);
      if (text.indexOf("日期") != -1) {
        // console.log("riqi");
        this.Timeshow = true;
        this.dialogType = type;
        this.dialogText = text;
        return false;
      }
      if (
        text.indexOf("是否") != -1 ||
        text.indexOf("人户一致标识") != -1 ||
        text.indexOf("有无") != -1
      ) {
        text = "标识";
      }
      if (text == "房屋类型") {
        this.dialogList = [
          {
            id: 1,
            dictionaryValue: 0,
            dictionaryName: "自住房"
          },
          {
            id: 2,
            dictionaryValue: 1,
            dictionaryName: "出租房"
          },
          {
            id: 3,
            dictionaryValue: 2,
            dictionaryName: "自住+出租房"
          },
          {
            id: 4,
            dictionaryValue: 3,
            dictionaryName: "空置房"
          },
          {
            id: 5,
            dictionaryValue: 4,
            dictionaryName: "其他"
          }
        ];
        this.dialogType = type;
        this.dialogText = text;
        this.show = true;
        return false;
      }
      if (text == "房主联系类型") {
        text = "联系类型";
      }
      if (text == "隐患类型") {
        text = "安全隐患类型";
      }
      if (text.indexOf("联系类型") != -1) {
        text = "联系类型";
      }
      if (text.indexOf("性别") != -1) {
        text = "性别";
      }
      console.log(text);
      // return false;
      return getSelect(text).then(res => {
        console.log(res);
        this.dialogList = res.ret.dictionaryList;
        // return false;
        this.dialogType = type;
        this.dialogText = text;
        this.show = true;
      });
    },
    // 点击弹框的下拉框 更改 houseInfo的内容
    changeInfo(value, text, turn) {
      if (this.isGover) {
        console.log(this.item);
        var type = this.dialogType.split("Str");
        this.basic.forEach(itme => {
          if (itme.dataIndex == this.dialogType) {
            if (itme.isSpecial) {
              this.basicInfo[this.dialogType] = text;
              this.basicInfo[type] = value;
            } else {
              this.basicInfo.governRealPopulation[this.dialogType] = text;
              this.basicInfo.governRealPopulation[type] = value;
            }
          }
        });
        this.item.governRealPopulation[this.dialogType] = text;
        this.item.governRealPopulation[type] = value;
        this.show = false;
        // console.log(this.item[type]);
        this.isGover = false;
        this.item = {};
        return false;
      }
      this.item[this.dialogType] = text;
      // console.log(this.houseInfo[text]);
      // console.log(this.dialogType);
      // return;
      var type = this.dialogType.split("Str");
      this.item[type] = value;
      this.show = false;
      // console.log(this.item[type]);
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
    //  如果不是对应的特殊人群或者实有人口 取消选中状态 并且调用删除接口
    delSpecial(item) {
      // 收起所有的折叠面板
      this.activeName = null;
      this.activeNames = null;
      // console.log(item.names);
      // item.names 是对应的保存字段的对象
      this.ids = item.names.id;
      if (this.ids == "") {
        Notify({ type: "warning", message: "当前模块未提交" });
        return false;
      }
      item.turn = false;
      var name = item.name.split("Info")[0];
      var obj = {
        ids: this.ids,
        name: "del" + name
      };
      return delSpecialByBasicid(obj).then(res => {
        // console.log(res);
        if (res.code != 200) {
          Notify({ type: "warning", message: "取消失败请稍后重试！" });
          return false;
        }
        // 清空 字段对象
        item.names = {};
        Notify({ type: "success", message: "取消成功" });
      });
    },
    // 提交对应的模块
    submit(name, item) {
      // console.log("dianji");
      if (name == "basicInfo") {
        this.submitType = 0;
      } else if (name == "flowInfo") {
        this.submitType = 1;
      }
      item.loading = true;
      this.item = item;
      // console.log(this.$refs.releasedFromPrisonInfo);
      if (this.submitType == 0) {
        // console.log(this.$refs.Form);
        this.$refs.Form.submit();
        // console.log("提交基本信息");
        return false;
      }
      if (this.submitType == 1) {
        this.$refs.Form1.submit();
        // console.log("提交信息");
        return false;
      }
      this.$refs[name][0].submit();
    },
    // 提交表单的时候如果有必填字段没有填的话
    failed() {
      var that = this;
      // console.log("验证不通过");
      Notify({ type: "warning", message: "请输入必填字段" });
      this.specialList.forEach(item => {
        item.loading = false;
      });
      this.moreList.forEach(item => {
        item.loading = false;
      });
      that.subLoading = false;
      that.submitType = null;
    },
    // 时间格式化
    formatDate(time) {
      var date = moment
        .parseZone(time)
        .local()
        .format("YYYY-MM-DD HH:mm:ss");
      // console.log(date)
      return date;
    },
    // 点击选中的时间
    onConfirm(date) {
      this.Timeshow = false;
      if (this.isGover) {
        // console.log(2222);
        this.item.governRealPopulation[this.dialogType] = this.formatDate(date);
        this.isGover = false;
        return false;
      }
      console.log(this.item);
      this.item[this.dialogType] = this.formatDate(date);
    },
    onSubmit() {
      var that = this;
      console.log("dayin");
      // return false;
      var item = this.item;
      // return false;
      // console.log(editGover, editBasicByBasicid);
      // return false;
      if (this.submitType == 0) {
        var obj = item.governRealPopulation;
        obj.orgId = this.orgId;
        return editGover(obj).then(res => {
          console.log(res);
          if (res.code != 200) {
            Notify({ type: "warning", message: "编辑失败请稍后重试" });
            return;
          }
          this.basicId = res.ret.id;
          // if (this.userEditType == 0) {
          that.subLoading = false;
          var data = {
            basicsId: that.basicId,
            ...item
          };
          return editBasicByBasicid(data).then(res => {
            that.submitType = null;
            // that.basicId = res.ret.id;
            console.log(res);
            if (res.code != 200) {
              Notify({ type: "warning", message: "编辑失败请稍后重试" });
            }
            var info = {
              houseId: this.id,
              basicsId: this.basicId
            };
            return editUserInfo(info).then(res => {
              // console.log(res);
              this.$router.go(-1);
            });
          });
          // }
        });
        return false;
      }
      if (this.submitType == 1) {
        var obj = {
          basicsId: this.basicId,
          ...item
        };
        return editFlowByBasicid(obj).then(res => {
          //  console.log(res)
          that.subLoading = false;
          that.submitType = null;
        });
        return false;
      }
      var name = item.name.split("Info")[0];
      var obj = {
        basicsId: this.basicId,
        name: "edit" + name,
        ...item.names
      };
      if (this.userEditType == 1) {
        Dialog.alert({
          message: "您确定提交修改吗？",
          showCancelButton: true,
          cancel: () => {
            console.log("cancel");
          }
        })
          .then(() => {
            return editSpecialByBasicid(obj).then(res => {
              // console.log(res);
              item.loading = false;
              if (res.code !== 200) {
                Notify({ type: "warning", message: "编辑失败请稍后重试" });
                return false;
              }
            });
          })
          .catch(() => {});
        return;
      }
      // console.log(obj);
      // return false;
      return editSpecialByBasicid(obj).then(res => {
        // console.log(res);
        item.loading = false;
        if (res.code !== 200) {
          Notify({ type: "warning", message: "添加失败请稍后重试" });
          return false;
        }
        that.ids = res.ret.id;
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
      if (this.userEditType == 0) {
        if (index != 0) {
          if (!this.basicId) {
            Notify({ type: "warning", message: "请先选择基本信息" });
            return false;
          }
          this.navType = index;
          return false;
        }
        return false;
      }
      this.navType = index;
      // console.log(index);
      if (index == 0) {
        // if (this.userEditType == 0) {
        //   return false;
        // }
        // console.log(22222);
        this.getBasicByBasicid();
      } else if (index == 1) {
        this.getFlowByid();
        if (this.userEditType == 0) {
          return false;
        }
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
    },
    //网络请求地区数据(难点在如何拼装三级结构)
    getArea(parentId, index) {
      return getAddress(parentId).then(res => {
        // console.log(res);
        // //当请求成功时
        const regionList = res.ret;
        // console.log(this.areaList);
        this.areaList[index].values = [
          { name: "请选择" },
          ...regionList //ES6新语法
        ];
        if (index == 0) {
          if (this.cityType == 0) {
            //当请求的是wu级内的内容时
            this.areaList[index + 1].values = [];
            this.areaList[index + 2].values = [];
            this.areaList[index + 3].values = [];
            this.areaList[index + 4].values = [];
          } else {
            //当请求的是三级内的内容时
            this.areaList[index + 1].values = [];
            this.areaList[index + 2].values = [];
          }
        } else if (index == 1) {
          if (this.cityType == 0) {
            this.areaList[index + 1].values = [];
            this.areaList[index + 2].values = [];
            this.areaList[index + 3].values = [];
          } else {
            this.areaList[index + 1].values = [];
          }
        } else if (index == 2) {
          if (this.cityType == 0) {
            this.areaList[index + 1].values = [];
            this.areaList[index + 2].values = [];
          }
        } else if (index == 3) {
          if (this.cityType) {
            this.areaList[index + 1].values = [];
          }
        }
        this.areaList = [...this.areaList]; //更新areaList
      });
    },
    //当地区选择变化时
    onAreaChange(picker, values, index) {
      // values 选择的内容 index当前选择的列数的索引
      // console.log(values, index);
      if (this.cityType == 0) {
        if (index < 4) {
          this.getArea(values[index].code, index + 1); //传参 参数为上层选择的地区的code
        }
      } else {
        if (index < 2) {
          this.getArea(values[index].code, index + 1); //传参 参数为上层选择的地区的code
        }
      }
      // else {
      //   this.cityVisable = false;
      // }
    },
    //点击取消
    onCancel() {
      this.cityVisable = false;
    },

    //点击确定
    onAreaConfirm(value) {
      // console.log(value);
      console.log(value[2], value[1], value[0], this.cityType);
      // 都有内容
      if (this.cityType == 3) {
        if (value[2] && value[1] && value[0]) {
          // console.log("有内容");
          // 如果是直辖市的特殊情况
          if (
            // 都选择了内容的情况下
            value[2].code &&
            value[1].code &&
            value[0].code
          ) {
            this.$set(
              this.moreList[0].names,
              "mainFamilyMembersWorkRegionStr",
              value[2].name
            );
            this.$set(
              this.moreList[0].names,
              "mainFamilyMembersWorkCityStr",
              value[1].name
            );
            this.$set(
              this.moreList[0].names,
              "mainFamilyMembersWorkProvinceStr",
              value[0].name
            );
            this.$set(
              this.moreList[0].names,
              "mainFamilyMembersWorkRegion",
              value[2].code
            );
            this.$set(
              this.moreList[0].names,
              "mainFamilyMembersWorkCity",
              value[1].code
            );
            this.$set(
              this.moreList[0].names,
              "mainFamilyMembersWorkProvince",
              value[0].code
            );
            // console.log(this.houseInfo);
          } else {
            if (this.houseEditType == 0) {
              // console.log("有 清空");
              this.$set(
                this.moreList[0].names,
                "mainFamilyMembersWorkRegionStr",
                ""
              );
              this.$set(
                this.moreList[0].names,
                "mainFamilyMembersWorkCityStr",
                ""
              );
              this.$set(
                this.moreList[0].names,
                "mainFamilyMembersWorkProvinceStr",
                ""
              );
              this.$set(
                this.moreList[0].names,
                "mainFamilyMembersWorkRegion",
                ""
              );
              this.$set(
                this.moreList[0].names,
                "mainFamilyMembersWorkCity",
                ""
              );
              this.$set(
                this.moreList[0].names,
                "mainFamilyMembersWorkProvince",
                ""
              );
            }
          }
        } else {
          if (value[2].name == "市辖区") {
            // console.log("市辖区");
            this.$set(
              this.moreList[0].names,
              "mainFamilyMembersWorkRegionStr",
              value[2].name
            );
            this.$set(
              this.moreList[0].names,
              "mainFamilyMembersWorkCityStr",
              value[1].name
            );
            this.$set(
              this.moreList[0].names,
              "mainFamilyMembersWorkProvinceStr",
              value[0].name
            );
            this.$set(
              this.moreList[0].names,
              "mainFamilyMembersWorkRegion",
              value[2].code
            );
            this.$set(
              this.moreList[0].names,
              "mainFamilyMembersWorkCity",
              value[1].code
            );
            this.$set(
              this.moreList[0].names,
              "mainFamilyMembersWorkProvince",
              value[0].code
            );
          } else {
            if (this.houseEditType == 0) {
              this.$set(
                this.moreList[0].names,
                "mainFamilyMembersWorkRegionStr",
                ""
              );
              this.$set(
                this.moreList[0].names,
                "mainFamilyMembersWorkCityStr",
                ""
              );
              this.$set(
                this.moreList[0].names,
                "mainFamilyMembersWorkProvinceStr",
                ""
              );
              this.$set(
                this.moreList[0].names,
                "mainFamilyMembersWorkRegion",
                ""
              );
              this.$set(
                this.moreList[0].names,
                "mainFamilyMembersWorkCity",
                ""
              );
              this.$set(
                this.moreList[0].names,
                "mainFamilyMembersWorkProvince",
                ""
              );
            }
          }
        }
        console.log(this.moreList[0].names);
      } else if (this.cityType == 2) {
        if (value[2] && value[1] && value[0]) {
          // console.log("有内容");
          // 如果是直辖市的特殊情况
          if (
            // 都选择了内容的情况下
            value[2].code &&
            value[1].code &&
            value[0].code
          ) {
            this.$set(
              this.basicInfo.governRealPopulation,
              "placeDomicileRegionStr",
              value[2].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "placeDomicileCityStr",
              value[1].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "placeDomicileProvinceStr",
              value[0].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "placeDomicileRegion",
              value[2].code
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "placeDomicileCity",
              value[1].code
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "placeDomicileProvince",
              value[0].code
            );
            // console.log(this.houseInfo);
          } else {
            if (this.houseEditType == 0) {
              // console.log("有 清空");
              this.$set(
                this.basicInfo.governRealPopulation,
                "placeDomicileRegionStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "placeDomicileCityStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "placeDomicileProvinceStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "placeDomicileRegion",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "placeDomicileCity",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "placeDomicileProvince",
                ""
              );
            }
          }
        } else {
          if (value[2].name == "市辖区") {
            // console.log("市辖区");
            this.$set(
              this.basicInfo.governRealPopulation,
              "nativePlaceRegionStr",
              value[2].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "nativePlaceCityStr",
              value[1].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "nativePlaceProvinceStr",
              value[0].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "nativePlaceRegion",
              value[2].code
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "nativePlaceCity",
              value[1].code
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "nativePlaceProvince",
              value[0].code
            );
          } else {
            if (this.houseEditType == 0) {
              this.$set(
                this.basicInfo.governRealPopulation,
                "placeDomicileRegionStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "placeDomicileCityStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "placeDomicileProvinceStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "placeDomicileRegion",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "placeDomicileCity",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "placeDomicileProvince",
                ""
              );
            }
          }
        }
      } else if (this.cityType == 1) {
        if (value[2] && value[1] && value[0]) {
          // console.log("有内容");
          // 如果是直辖市的特殊情况
          if (
            // 都选择了内容的情况下
            value[2].code &&
            value[1].code &&
            value[0].code
          ) {
            this.$set(
              this.basicInfo.governRealPopulation,
              "nativePlaceRegionStr",
              value[2].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "nativePlaceCityStr",
              value[1].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "nativePlaceProvinceStr",
              value[0].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "nativePlaceRegion",
              value[2].code
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "nativePlaceCity",
              value[1].code
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "nativePlaceProvince",
              value[0].code
            );
            // console.log(this.houseInfo);
          } else {
            if (this.houseEditType == 0) {
              // console.log("有 清空");
              this.$set(
                this.basicInfo.governRealPopulation,
                "nativePlaceRegionStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "nativePlaceCityStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "nativePlaceProvinceStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "nativePlaceRegion",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "nativePlaceCity",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "nativePlaceProvince",
                ""
              );
            }
          }
        } else {
          if (value[2].name == "市辖区") {
            // console.log("市辖区");
            this.$set(this.basicInfo, "nativePlaceRegionStr", value[2].name);
            this.$set(this.basicInfo, "nativePlaceCityStr", value[1].name);
            this.$set(this.basicInfo, "nativePlaceProvinceStr", value[0].name);
            this.$set(this.basicInfo, "nativePlaceRegion", value[2].code);
            this.$set(this.basicInfo, "nativePlaceCity", value[1].code);
            this.$set(this.basicInfo, "nativePlaceProvince", value[0].code);
          } else {
            if (this.houseEditType == 0) {
              this.$set(this.basicInfo, "nativePlaceRegionStr", "");
              this.$set(this.basicInfo, "nativePlaceCityStr", "");
              this.$set(this.basicInfo, "nativePlaceProvinceStr", "");
              this.$set(this.basicInfo, "nativePlaceRegion", "");
              this.$set(this.basicInfo, "nativePlaceCity", "");
              this.$set(this.basicInfo, "nativePlaceProvince", "");
            }
          }
        }
      } else if (this.cityType == 0) {
        if (value[4] && value[3] && value[2] && value[1] && value[0]) {
          console.log("有内容");
          // 如果是直辖市的特殊情况
          if (
            // 都选择了内容的情况下
            value[4].code &&
            value[3].code &&
            value[2].code &&
            value[1].code &&
            value[0].code
          ) {
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceCommunityStr",
              value[4].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceStreetStr",
              value[3].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceRegionStr",
              value[2].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceCityStr",
              value[1].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceProvinceStr",
              value[0].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceCommunity",
              value[4].code
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceStreet",
              value[3].code
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceRegion",
              value[2].code
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceCity",
              value[1].code
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceProvince",
              value[0].code
            );
            // console.log(this.houseInfo);
          } else {
            if (this.houseEditType == 0) {
              // console.log("有 清空");
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceCommunityStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceStreetStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceRegionStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceCityStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceProvinceStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceCommunity",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceStreet",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceRegion",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceCity",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceProvince",
                ""
              );
            }
          }
        } else {
          if (value[2].name == "市辖区") {
            // console.log("市辖区");
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceCommunityStr",
              ""
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceStreetStr",
              ""
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceRegionStr",
              value[2].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceCityStr",
              value[1].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceProvinceStr",
              value[0].name
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceCommunity",
              ""
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceStreet",
              ""
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceRegion",
              value[2].code
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceCity",
              value[1].code
            );
            this.$set(
              this.basicInfo.governRealPopulation,
              "currentResidenceProvince",
              value[0].code
            );
          } else {
            if (this.houseEditType == 0) {
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceCommunityStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceStreetStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceRegionStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceCityStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceProvinceStr",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceCommunity",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceStreet",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceRegion",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceCity",
                ""
              );
              this.$set(
                this.basicInfo.governRealPopulation,
                "currentResidenceProvince",
                ""
              );
            }
          }
        }
      }

      this.cityVisable = false;
      console.log(this.basicInfo);
    }
  }
};
</script>
<style scoped lang="scss">
.editUser {
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
  /deep/.van-overlay {
    background-color: rgba(0, 0, 0, 0.2);
  }
  /deep/.van-dialog {
    width: 90%;
    border-radius: 9px;
    max-height: 60vh;
    overflow-y: scroll;
    div {
      p {
        padding-left: 17px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        box-sizing: border-box;
        width: 100%;
        height: 39px;
        border-bottom: 1px solid #e5e5e5;
      }
      p:nth-child(1) {
        width: 100%;
        height: 49px;
        background: #eeeeee;
      }
      p:last-child {
        border: none;
      }
    }
    .orgname {
      p:nth-child(1) {
        width: 100%;
        height: 49px;
        background: #eeeeee;
      }
      p:nth-child(2) {
        width: 100%;
        height: 44px;
      }
    }
  }
}
</style>