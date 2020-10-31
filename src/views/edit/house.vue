<template>
  <div class="editHouse">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div v-if="houseEditType == 0" class="head_text">添加房户信息</div>
      <div v-if="houseEditType == 1" class="head_text">编辑房户信息</div>
      <div class="head_add" @click="save">
        <img src="@/assets/image/save.png" alt />
      </div>
    </div>
    <div class="info">
      <van-form ref="Form" @submit="onSubmit">
        <div class="info_item" @click="showName('orgName')">
          <van-field
            v-model="houseInfo.orgName"
            name="所属网格"
            label="所属网格"
            placeholder="所属网格位置"
            required
            readonly
            :rules="[{ required: true, trigger: 'o' }]"
          />
          <img src="@/assets/image/more.png" alt />
        </div>
        <div v-for="item in columns" :key="item.id" class="info_item">
          <van-field
            v-if="item.isSelect"
            v-model="houseInfo[item.dataIndex]"
            :name="item.dataIndex"
            :label="item.title"
            readonly
            placeholder="请选择"
            :required="item.isRequire"
            :rules="[{ required: item.isRequire, trigger: 'o' }]"
            @click="showName(item.title, item.dataIndex)"
          />
          <span v-if="item.isSelect"></span>
          <div v-if="!item.isSelect">
            <div v-if="item.title == '单元' || item.title == '楼层'">
              <van-field
                v-if="houseType != 2 && houseType != 3"
                v-model="houseInfo[item.dataIndex]"
                :name="item.dataIndex"
                :label="item.title"
                placeholder="请输入"
                :rules="[{ required: item.isRequire }]"
                :required="item.isRequire"
              />
              <!-- 占位 -->
              <span></span>
            </div>

            <!-- {{ item.title != "单元" }} -->
            <van-field
              v-if="item.title != '单元' && item.title != '楼层'"
              v-model="houseInfo[item.dataIndex]"
              :name="item.dataIndex"
              :label="item.title"
              placeholder="请输入"
              :rules="[{ required: item.isRequire }]"
              :required="item.isRequire"
            >
              <template v-if="item.title == '房主身份证号'" #button>
                <van-button
                  size="small"
                  type="primary"
                  @click.native.stop.prevent="searchfangzhu"
                  >搜索</van-button
                >
              </template>
            </van-field>
            <!-- 占位 -->
            <span></span>
          </div>
        </div>
        <div class="info_item" @click="goMap">
          <van-field
            v-model="isLocation"
            name="位置"
            label="位置"
            placeholder="请选择"
            readonly
            :rules="[{ required: true, trigger: 'o' }]"
          />
          <!-- 占位 -->
          <img class="map" src="@/assets/image/map.png" alt="" />
        </div>
      </van-form>
    </div>
    <!-- 弹框 -->
    <van-dialog
      v-model="show"
      title
      :showConfirmButton="false"
      closeOnClickOverlay
    >
      <div v-if="dialogType == 'orgName'" class="orgname">
        <p>请选择所属网格</p>
        <p>{{ houseInfo.orgName }}</p>
      </div>
      <div v-else class="orgname">
        <p>{{ dialogText }}</p>
        <p
          v-for="item in dialogList"
          :key="item.id"
          @click="changeHouseInfo(item.dictionaryValue, item.dictionaryName)"
        >
          {{ item.dictionaryName }}
        </p>
      </div>
    </van-dialog>
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

    <!-- 正在加载中的组件 -->
    <loading :show="loadingTurn" :text="loadingText" />
  </div>
</template>
<script>
// 接口引入
import { detailHouse, editHouse, getEstateFloor } from '@/api/house'
// 查询户主的信息
import { getZhuhubybasicid } from '@/api/people'
import { getAddress, getSelect } from '@/api/common'
// 提示框
import { Notify } from 'vant'
// 引入弹框
import { Dialog } from 'vant'
// 引入正在加载中的组件
import loading from '@/components/loading'
const columns = [
  {
    title: '单元',
    dataIndex: 'element',
    id: 1,
    isSelect: false,
    isRequire: true
  },
  {
    title: '楼层',
    dataIndex: 'floor',
    id: 2,
    isSelect: false,
    isRequire: true
  },
  {
    title: '门牌号',
    dataIndex: 'houseNumber',
    id: 3,
    isSelect: false,
    isRequire: true
  },
  // {
  //   title: "房屋编号",
  //   dataIndex: "houseCodes",
  //   id: 4,
  //   isSelect: false,
  //   isRequire: false
  // },
  {
    title: '建筑用途',
    dataIndex: 'houseUseStr',
    id: 6,
    isSelect: true
  },
  {
    title: '房屋来源',
    dataIndex: 'houseSourceStr',
    id: 7,
    isSelect: true
  },
  {
    title: '建筑面积(平方米)',
    dataIndex: 'responsibleUnit',
    id: 8,
    isSelect: false,
    isRequire: false
  },
  {
    title: '建筑分摊面积(平方米)',
    dataIndex: 'apportionedArea',
    id: 9,
    isSelect: false,
    isRequire: false
  },
  {
    title: '建筑产权面积(平方米)',
    dataIndex: 'propertyArea',
    id: 10,
    isSelect: false,
    isRequire: false
  },
  {
    title: '不动产编码',
    dataIndex: 'realEstate',
    id: 11,
    isSelect: false,
    isRequire: false
  },
  {
    title: '隐患类型',
    dataIndex: 'hiddenDangerTypeStr',
    id: 18,
    isSelect: true
  },
  {
    title: '房屋类型',
    dataIndex: 'houseTypeStr',
    id: 19,
    isSelect: true,
    isRequire: true
  },
  {
    title: '房主身份证号',
    dataIndex: 'idNumber',
    id: 12,
    isSelect: false,
    isRequire: false
  },
  {
    title: '房主姓名',
    dataIndex: 'ownerName',
    id: 13,
    isSelect: false,
    isRequire: false
  },
  {
    title: '房主联系类型',
    dataIndex: 'ownerContactTypeStr',
    id: 14,
    isSelect: true
  },
  {
    title: '房主联系方式',
    dataIndex: 'ownerContactInformation',
    id: 15,
    isSelect: false,
    isRequire: false
  },
  {
    title: '现住地',
    dataIndex: 'currentResidence',
    id: 16,
    isSelect: true,
    isRequire: true
  },
  {
    title: '房主现居详址',
    dataIndex: 'ownerDetailedAddress',
    id: 17,
    isSelect: false,
    isRequire: false
  }
]
export default {
  components: {
    loading
  },
  data() {
    return {
      // 正在加载中的组件的显示与否
      loadingTurn: false,
      loadingText: '提交中',
      // 当前房屋的类型
      houseType: sessionStorage.getItem('houseType'),
      // 定位信息
      location: JSON.parse(sessionStorage.getItem('map')),
      // 当前的房屋的id
      id: sessionStorage.getItem('houseId'),
      // 楼栋id 新增的时候为了获取当前楼栋的最高 楼层
      residentId: sessionStorage.getItem('residentId'),
      // 楼栋编辑类型 0 新增 1修改
      houseEditType: sessionStorage.getItem('houseEditType'),
      // 房屋的信息
      houseInfo: {
        // 通过用户登录信息获得
        orgId: sessionStorage.getItem('orgId'),
        orgName: sessionStorage.getItem('name'),
        buildingId: sessionStorage.getItem('residentId')
      },
      address: '',
      // 最高楼层
      maxFloor: 0,
      // 最低楼层
      // 不同的楼栋的公共字段
      columns: columns,
      // 是否展示下拉框的弹框
      show: false,
      // 弹框的类型
      dialogType: 'orgName',
      // 弹框的下拉框标题
      dialogText: '',
      // 弹框的下拉数组
      dialogList: [],
      // 遮罩层显示或隐藏
      cityVisable: false,
      // 自定义数据五级结构
      areaList: [
        { values: [] },
        { values: [] },
        { values: [] },
        { values: [] },
        { values: [] }
      ]
    }
  },
  computed: {
    isLocation() {
      // if()
      // console.log(this.location);
      if (!this.location || this.location.lo == '') {
        return '未定位'
      }
      this.houseInfo.longitude = this.location.lo
      this.houseInfo.latitude = this.location.la
      return '已定位'
    }
  },
  watch: {
    // 监听楼栋信息的变化 更改addressStr
    houseInfo: {
      handler: function(value, old) {
        // console.log("changeAddress");
        if (
          value.currentResidenceProvinceStr == null ||
          !value.currentResidenceProvinceStr
        ) {
          // console.log(1111);
          return false
        }
        this.houseInfo.currentResidence =
          this.houseInfo.currentResidenceProvinceStr +
          this.houseInfo.currentResidenceCityStr +
          this.houseInfo.currentResidenceRegionStr +
          this.houseInfo.currentResidenceStreetStr +
          this.houseInfo.currentResidenceCommunityStr
        // console.log(this.houseInfo.currentResidence);
      },
      deep: true
    }
  },
  created() {
    // 省市区
    this.getArea('', 0)
    if (this.houseEditType != 0) {
      this.getHouseInfo()
    }
    // 获取楼栋小区详情
    this.getFloorDetail()
  },
  //  当前页面离开的时候判断当前页面是不是要给缓存
  beforeRouteLeave(to, from, next) {
    // console.log(to);
    if (to.name == 'Map') {
      from.meta.keepAlive = true
    } else {
      from.meta.keepAlive = false
    }
    next()
  },
  // 页面被缓存 再次展示的时候
  activated() {
    // console.log("我又回来了");
    // console.log(sessionStorage.getItem("map"));
    this.location = JSON.parse(sessionStorage.getItem('map'))
  },
  methods: {
    // 回显房主信息
    searchfangzhu() {
      console.log(this.houseInfo.idNumber)
      if (!this.houseInfo.idNumber) {
        Notify({ type: 'warning', message: '请先输入户主公民身份证号' })
        return false
      }
      var obj = {
        idCard: this.houseInfo.idNumber
      }
      return getZhuhubybasicid(obj).then(res => {
        if (res.code != 200) {
          Notify({ type: 'warning', message: '请先输入户主公民身份证号' })
          return false
        }
        if (!res.ret) {
          Notify({ type: 'warning', message: '未查询到户主信息,请手动输入' })
          return false
        }
        // this.basicInfo.householderIdCard =
        this.houseInfo.ownerName = res.ret.fullName
        this.houseInfo.ownerContactTypeStr = res.ret.contactTypeStr
        this.houseInfo.ownerContactInformation = res.ret.contactInformation
        // 现住地省市区
        this.houseInfo.currentResidence =
          res.ret.currentResidenceProvinceStr +
          res.ret.currentResidenceCityStr +
          res.ret.currentResidenceRegionStr +
          res.ret.currentResidenceStreetStr +
          res.ret.currentResidenceCommunityStr
        // 现居详址
        this.houseInfo.ownerDetailedAddress = res.ret.currentResidenceAddress
        this.$forceUpdate()
        // console.log(this.basicInfo)
      })
    },
    goMap() {
      // 定位的同时将当前定位的类型保存到本地 对象存储  例如   map:{type:'estate',lo:'经度',la:'纬度'}
      var obj = {
        type: 'house',
        lo: '',
        la: ''
      }
      sessionStorage.setItem('map', JSON.stringify(obj))
      this.$router.push({ name: 'Map' })
    },
    // 返回上一级路由
    goback() {
      this.$router.go(-1)
    },
    // 保存楼栋信息
    save() {
      // console.log("save");
      this.$refs.Form.submit()
    },
    // 获取房屋详情
    getHouseInfo() {
      var obj = {
        id: this.id
      }
      return detailHouse(obj).then(res => {
        // console.log(res);
        this.maxFloor = res.ret.governBuilding.theUpperNumber
        this.houseInfo = res.ret
        var province = this.houseInfo.currentResidenceProvinceStr
        var city = this.houseInfo.currentResidenceCityStr
        var region = this.houseInfo.currentResidenceRegionStr
        var street = this.houseInfo.currentResidenceStreetStr
        var community = this.houseInfo.currentResidenceCommunityStr
        this.houseInfo.currentResidence =
          province + city + region + street + community
      })
    },
    // 获取楼栋详情
    getFloorDetail() {
      var obj = {
        buildingId: this.residentId
      }
      return getEstateFloor(obj).then(res => {
        console.log(res)
        this.maxFloor = res.ret.theUpperNumber
        this.address = res.ret.streetCommunity
      })
    },
    // 提交表单
    onSubmit(values) {
      this.loadingTurn = true
      // console.log(this.houseInfo, this.houseEditType);
      // return false;
      var that = this
      // console.log(this.maxFloor);
      // return false;
      // 如果填了楼层要判断最高楼层
      if (this.houseInfo.floor && this.maxFloor != 0) {
        if (this.houseInfo.floor > this.maxFloor && this.maxFloor != -1) {
          Notify({ type: 'warning', message: '所填楼层大于当前楼栋最高楼层' })
          that.loadingTurn = false
          return false
        }
      }
      // 如果是houseType是 2或者3说明没有单元和楼层 否则将楼层和单元拼接到地址上面
      if (this.houseType == 2 || this.houseType == 3) {
        this.houseInfo.houseAddress = this.address + this.houseInfo.houseNumber
      } else {
        this.houseInfo.houseAddress =
          this.address +
          this.houseInfo.element +
          '单元' +
          this.houseInfo.floor +
          '层' +
          this.houseInfo.houseNumber
      }
      if (this.houseEditType == 1) {
        Dialog.alert({
          message: '您确定提交修改吗？',
          showCancelButton: true,
          cancel: () => {
            console.log('cancel')
          }
        })
          .then(() => {
            that.loadingTurn = false
            return editHouse(that.houseInfo).then(res => {
              // console.log(res);
              if (res.code != 200) {
                Notify({ type: 'warning', message: res.msg })
                return
              }
              sessionStorage.removeItem('map')
              that.$router.go(-1)
            })
          })
          .catch(() => {})

        return
      }
      // console.log(this.houseInfo);
      return editHouse(this.houseInfo).then(res => {
        that.loadingTurn = false
        // console.log(res);
        if (res.code != 200) {
          Notify({ type: 'warning', message: res.msg })
          return
        }
        sessionStorage.removeItem('map')
        that.$router.go(-1)
      })
    },
    // 弹框展示
    showName(text, type) {
      console.log(text)
      if (text == '现住地') {
        this.cityVisable = true
        return false
      }
      if (text == '房屋类型') {
        this.dialogList = [
          {
            id: 1,
            dictionaryValue: 0,
            dictionaryName: '自住房'
          },
          {
            id: 2,
            dictionaryValue: 1,
            dictionaryName: '出租房'
          },
          {
            id: 3,
            dictionaryValue: 2,
            dictionaryName: '自住+出租房'
          },
          {
            id: 4,
            dictionaryValue: 3,
            dictionaryName: '空置房'
          },
          {
            id: 5,
            dictionaryValue: 4,
            dictionaryName: '其他'
          }
        ]
        this.dialogType = type
        this.dialogText = text
        this.show = true
        return false
      }
      if (text == '房主联系类型') {
        text = '联系类型'
      }
      if (text == '隐患类型') {
        text = '安全隐患类型'
      }

      return getSelect(text).then(res => {
        console.log(res)
        this.dialogList = res.ret.dictionaryList
        // return false;
        this.dialogType = type
        this.dialogText = text
        this.show = true
      })
    },
    // 打开省市区的弹框
    // changeAddress() {
    //   this.cityVisable = true;
    // },
    // 网络请求地区数据(难点在如何拼装三级结构)
    getArea(parentId, index) {
      return getAddress(parentId).then(res => {
        // console.log(res);
        // //当请求成功时
        const regionList = res.ret
        this.areaList[index].values = [
          { name: '请选择' },
          ...regionList // ES6新语法
        ]
        if (index == 0) {
          // 当请求的是三级内的内容时
          this.areaList[index + 1].values = []
          this.areaList[index + 2].values = []
          this.areaList[index + 3].values = []
          this.areaList[index + 4].values = []
        } else if (index == 1) {
          this.areaList[index + 1].values = []
          this.areaList[index + 2].values = []
          this.areaList[index + 3].values = []
        } else if (index == 2) {
          this.areaList[index + 1].values = []
          this.areaList[index + 2].values = []
        } else if (index == 3) {
          this.areaList[index + 1].values = []
        }
        this.areaList = [...this.areaList] // 更新areaList
      })
    },
    // 当地区选择变化时
    onAreaChange(picker, values, index) {
      // values 选择的内容 index当前选择的列数的索引
      // console.log(values, index);
      if (index < 4) {
        this.getArea(values[index].code, index + 1) // 传参 参数为上层选择的地区的code
      }
      // else {
      //   this.cityVisable = false;
      // }
    },
    // 点击取消
    onCancel() {
      this.cityVisable = false
    },

    // 点击确定
    onAreaConfirm(value) {
      // console.log(value);
      // console.log(value[4], value[3], value[2], value[1], value[0]);
      // 都有内容
      if (value[0].name == '请选择') {
        this.cityVisable = false
        return false
      }
      if (
        value[4].code &&
        value[3].code &&
        value[2].code &&
        value[1].code &&
        value[0].code
      ) {
        console.log('有内容')
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
            this.houseInfo,
            'currentResidenceCommunityStr',
            value[4].name
          )
          this.$set(this.houseInfo, 'currentResidenceStreetStr', value[3].name)
          this.$set(this.houseInfo, 'currentResidenceRegionStr', value[2].name)
          this.$set(this.houseInfo, 'currentResidenceCityStr', value[1].name)
          this.$set(
            this.houseInfo,
            'currentResidenceProvinceStr',
            value[0].name
          )
          this.$set(this.houseInfo, 'currentResidenceCommunity', value[4].code)
          this.$set(this.houseInfo, 'currentResidenceStreet', value[3].code)
          this.$set(this.houseInfo, 'currentResidenceRegion', value[2].code)
          this.$set(this.houseInfo, 'currentResidenceCity', value[1].code)
          this.$set(this.houseInfo, 'currentResidenceProvince', value[0].code)
          // console.log(this.houseInfo);
        } else {
          if (this.houseEditType == 0) {
            // console.log("有 清空");
            this.$set(this.houseInfo, 'currentResidenceCommunityStr', '')
            this.$set(this.houseInfo, 'currentResidenceStreetStr', '')
            this.$set(this.houseInfo, 'currentResidenceRegionStr', '')
            this.$set(this.houseInfo, 'currentResidenceCityStr', '')
            this.$set(this.houseInfo, 'currentResidenceProvinceStr', '')
            this.$set(this.houseInfo, 'currentResidenceCommunity', '')
            this.$set(this.houseInfo, 'currentResidenceStreet', '')
            this.$set(this.houseInfo, 'currentResidenceRegion', '')
            this.$set(this.houseInfo, 'currentResidenceCity', '')
            this.$set(this.houseInfo, 'currentResidenceProvince', '')
          }
        }
      } else {
        if (value[2].name == '市辖区') {
          // console.log("市辖区");
          this.$set(this.houseInfo, 'currentResidenceCommunityStr', '')
          this.$set(this.houseInfo, 'currentResidenceStreetStr', '')
          this.$set(this.houseInfo, 'currentResidenceRegionStr', value[2].name)
          this.$set(this.houseInfo, 'currentResidenceCityStr', value[1].name)
          this.$set(
            this.houseInfo,
            'currentResidenceProvinceStr',
            value[0].name
          )
          this.$set(this.houseInfo, 'currentResidenceCommunity', '')
          this.$set(this.houseInfo, 'currentResidenceStreet', '')
          this.$set(this.houseInfo, 'currentResidenceRegion', value[2].code)
          this.$set(this.houseInfo, 'currentResidenceCity', value[1].code)
          this.$set(this.houseInfo, 'currentResidenceProvince', value[0].code)
        } else {
          console.log('不正常')
          if (this.houseEditType == 0) {
            this.$set(this.houseInfo, 'currentResidenceCommunityStr', '')
            this.$set(this.houseInfo, 'currentResidenceStreetStr', '')
            this.$set(this.houseInfo, 'currentResidenceRegionStr', '')
            this.$set(this.houseInfo, 'currentResidenceCityStr', '')
            this.$set(this.houseInfo, 'currentResidenceProvinceStr', '')
            this.$set(this.houseInfo, 'currentResidenceCommunity', '')
            this.$set(this.houseInfo, 'currentResidenceStreet', '')
            this.$set(this.houseInfo, 'currentResidenceRegion', '')
            this.$set(this.houseInfo, 'currentResidenceCity', '')
            this.$set(this.houseInfo, 'currentResidenceProvince', '')
          }
        }
      }
      this.cityVisable = false
    },
    // 点击弹框的下拉框 更改 houseInfo的内容
    changeHouseInfo(value, text) {
      this.houseInfo[this.dialogType] = text
      // console.log(this.houseInfo[text]);
      console.log(this.dialogType)
      var type = this.dialogType.split('Str')
      this.houseInfo[type] = value
      this.show = false
    }
  }
}
</script>
<style scoped lang="scss">
.editHouse {
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
  .info {
    flex: 1;
    overflow-y: scroll;
    margin-top: 1%;
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
        &.map {
          width: 16px;
          height: 20px;
        }
      }
    }
  }
  /deep/.van-overlay {
    background-color: rgba(0, 0, 0, 0.2);
  }
  /deep/.van-dialog {
    width: 90%;
    border-radius: 9px;
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