<template>
  <div class="editFloor">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div v-if="residentType == 0" class="head_text">
        小区楼栋
        <span v-if="floorEditType == 1">修改</span>
        <span v-if="floorEditType == 0">增加</span>
      </div>
      <div v-if="residentType == 1" class="head_text">
        单栋楼房
        <span v-if="floorEditType == 1">修改</span>
        <span v-if="floorEditType == 0">增加</span>
      </div>
      <div v-if="residentType == 2" class="head_text">
        单栋民房
        <span v-if="floorEditType == 1">修改</span>
        <span v-if="floorEditType == 0">增加</span>
      </div>
      <div
        v-if="residentType == 3 || residentType == 4 || residentType == 5"
        class="head_text"
      >
        别墅
        <span v-if="floorEditType == 1">修改</span>
        <span v-if="floorEditType == 0">增加</span>
      </div>
      <div class="head_add" @click="save">
        <img src="@/assets/image/save.png" alt />
      </div>
    </div>
    <div class="info">
      <van-form ref="Form" @submit="onSubmit">
        <div class="info_item" @click="showName('orgName')">
          <van-field
            v-model="residentInfo.orgName"
            name="所属网格"
            label="所属网格"
            placeholder="所属网格位置"
            required
            readonly
            :rules="[{ required: true, trigger: 'o' }]"
          />
          <img src="@/assets/image/more.png" alt />
        </div>
        <div
          v-if="residentType == 3 || residentType == 4 || residentType == 5"
          class="info_item"
          @click="showName('residentType')"
        >
          <van-field
            v-model="residentInfo.buildingTypeStr"
            name="buildingTypeStr"
            label="别墅类型"
            placeholder="别墅类型"
            required
            readonly
            :rules="[{ required: true, trigger: 'o' }]"
          />
          <img src="@/assets/image/more.png" alt />
        </div>
        <div
          v-if="residentType == 4 || residentType == 5"
          class="info_item"
          @click="showName('housingEstateName')"
        >
          <van-field
            v-model="residentInfo.housingEstateName"
            label-align="left"
            colon
            label="小区名称"
            placeholder="请输入"
            required
            readonly
            :rules="[{ required: true, trigger: 'o' }]"
          />
          <!-- 占位 -->
          <span></span>
        </div>
        <div class="info_item">
          <van-field
            v-model="residentInfo.buildingName"
            label-align="left"
            placeholder="请输入"
            :label="
              residentType == 0
                ? '楼栋号'
                : residentType == 1 || residentType == 4 || residentType == 5
                ? '楼栋名称'
                : '门牌号'
            "
            colon
            required
            :rules="[{ required: true }]"
            @input="Input"
          />

          <!-- 占位 -->
          <span></span>
        </div>
        <div v-for="item in columns" :key="item.id" class="info_item">
          <van-field
            v-if="item.title !== '单元总数'"
            v-model="residentInfo[item.dataIndex]"
            colon
            :label="item.title"
            label-align="left"
            placeholder="请输入"
            :required="item.isRequire"
            :rules="item.isRequire ? [{ required: true }] : []"
          />
          <van-field
            v-if="
              item.title == '单元总数' && residentType != 2 && residentType != 3
            "
            v-model="residentInfo[item.dataIndex]"
            type="number"
            colon
            :label="item.title"
            label-align="left"
            placeholder="请输入"
            :required="item.isRequire"
            :rules="item.isRequire ? [{ required: true }] : []"
          />
          <!-- 占位 -->
          <span></span>
        </div>
        <!-- <div
          class="info_item"
          v-if="residentType == 1 || residentType == 2 || residentType == 3"
          @click="changeAddress()"
        >
          <van-field
            v-model="residentInfo.addressStr"
            name="镇街"
            label="镇街"
            placeholder="请选择"
            required
            readonly
            :rules="[{ required: true, trigger: 'o' }]"
          />
          <img src="@/assets/image/more.png" alt />
        </div> -->
        <div class="info_item">
          <van-field
            v-model="residentInfo.remark"
            rows="1"
            autosize
            label="备注"
            type="textarea"
            colon
            label-align="left"
          />
          <!-- 占位 -->
          <span></span>
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
        <p>{{ residentInfo.orgName }}</p>
      </div>
      <div
        v-if="dialogType == 'residentType'"
        class="residentInfo propertyManagement"
      >
        <p>别墅类型</p>
        <p @click="changeResidentInfo(3)">独栋别墅</p>
        <p @click="changeResidentInfo(4)">联排别墅</p>
        <p @click="changeResidentInfo(5)">叠加别墅</p>
      </div>
      <div v-if="dialogType == 'housingEstateName'" class="housingEstateName">
        <van-search
          v-model="value"
          placeholder="请输入小区名称"
          @input="searchEstate"
        />
        <p v-for="item in estateList" :key="item.id" @click="changEstate(item)">
          {{ item.villageName }}
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
  </div>
</template>
<script>
// 引入接口
import { detailFloor, editFloor, getEstat, detailEstate } from '@/api/house'
import { getAddress } from '@/api/common'
// 提示框
import { Notify } from 'vant'
// 引入弹框
import { Dialog } from 'vant'
const columns = [
  // {
  //   title: "楼栋编号",
  //   dataIndex: "buildingCode",
  //   id: 1,
  //   isRequire: true
  // },
  {
    title: '单元总数',
    dataIndex: 'buildingElement',
    id: 1,
    isRequire: false
  },
  {
    title: '地上层数',
    dataIndex: 'theUpperNumber',
    id: 2,
    isRequire: true
  },

  {
    title: '地下层数',
    dataIndex: 'numberOfUnderground',
    id: 3,
    isRequire: false
  },
  {
    title: '年代',
    dataIndex: 'time',
    id: 4,
    isRequire: true
  },
  {
    title: '不动产编码',
    dataIndex: 'buildingRealEstate',
    id: 5,
    isRequire: false
  }
]

export default {
  name: 'EditFloor',
  data() {
    return {
      // 定位信息
      location: JSON.parse(sessionStorage.getItem('map')),
      orgId: sessionStorage.getItem('orgId'),
      // 搜索中用户输入的小区名
      value: '',
      // 小区名称列表
      estateList: [],
      // 是否为别墅
      isBieshu: false,
      // 楼栋类型 0 小区楼栋   1 单栋楼房 2 单栋民房 3 独栋别墅 4 联排别墅 5 叠加别墅
      residentType: null,
      // 楼栋编辑类型 0 新增 1修改
      floorEditType: sessionStorage.getItem('floorEditType'),
      // 当前的楼栋的id
      id: sessionStorage.getItem('residentId'),
      estateId: sessionStorage.getItem('estateId'),
      // 楼栋的信息
      residentInfo: {
        // 通过用户登录信息获得
        orgId: sessionStorage.getItem('orgId'),
        orgName: sessionStorage.getItem('name'),
        province: '370000000000',
        provinceStr: '山东省',
        city: '370400000000',
        cityStr: '枣庄市'
      },
      // 不同的楼栋的公共字段
      columns: columns,
      // 是否展示下拉框的弹框
      show: false,
      // 弹框的类型
      dialogType: 'orgName',
      // 遮罩层显示或隐藏
      cityVisable: false,
      // 自定义数据五级结构
      areaList: [
        {
          values: [
            {
              name: '请选择'
            },
            {
              code: '370481000000',
              name: '滕州市'
            }
          ]
        },
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
      this.residentInfo.longitude = this.location.lo
      this.residentInfo.latitude = this.location.la
      return '已定位'
    }
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
  watch: {
    // 监听楼栋信息的变化 更改addressStr
    residentInfo: {
      handler: function(value, old) {
        console.log(value)
        // console.log("changeAddress");
        if (value.communityStr == null || !value.communityStr) {
          // console.log(1111);
          return false
        } else {
          this.residentInfo.addressStr =
            this.residentInfo.provinceStr +
            this.residentInfo.cityStr +
            this.residentInfo.districtStr +
            this.residentInfo.streetStr +
            this.residentInfo.communityStr
        }
      },
      deep: true
    }
  },
  // 页面被缓存 再次展示的时候
  activated() {
    // console.log("我又回来了");
    // console.log(sessionStorage.getItem("map"));
    this.location = JSON.parse(sessionStorage.getItem('map'))
  },
  created() {
    // 省市区
    // this.getArea(this.code, 0);
    if (this.floorEditType != 0) {
      this.getResidentInfo()
      return false
    }
    this.residentType = sessionStorage.getItem('residentType')
    // 如果是 0 1 2的话将楼栋类型写死
    if (
      this.residentType == 0 ||
      this.residentType == 1 ||
      this.residentType == 2
    ) {
      this.residentInfo.buildingType = this.residentType
    }
  },
  methods: {
    goMap() {
      // 定位的同时将当前定位的类型保存到本地 对象存储  例如   map:{type:'estate',lo:'经度',la:'纬度'}
      var obj = {
        type: 'floor',
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
    // 获取楼栋详情
    getResidentInfo() {
      var obj = {
        id: this.id
      }
      return detailFloor(obj).then(res => {
        // console.log(res);
        this.residentInfo = res.ret
        this.residentType = res.ret.buildingType
      })
    },
    // 因为切换完别墅类型后因为buildingName的问题 一直不随着用户的操作变化 所以强制性更改了一下页面
    Input() {
      // console.log(23222222)
      // console.log(this.residentInfo.buildingName)
      this.$forceUpdate()
    },

    // 点击弹框中的楼栋类型 更改楼栋类型
    changeResidentInfo(type) {
      // buildingName 代表的不只是 门牌号 可能还是小区名称  所以每次选择别墅类型的时候都要把这个字段清空
      this.residentInfo.buildingName = ''
      // this.$forceUpdate()
      console.log(this.residentInfo.buildingName)
      this.residentType = type
      this.residentInfo.buildingType = type
      // console.log(this.residentType, this.residentInfo.buildingType);
      this.residentInfo.buildingTypeStr =
        type == 3 ? '独栋别墅' : type == 4 ? '联排别墅' : '叠加别墅'
      this.show = false
    },
    // 提交表单
    onSubmit(values) {
      if (this.residentInfo.theUpperNumber == 0) {
        Notify({ type: 'warning', message: '最高楼层不能是0' })
        return
      }
      var that = this
      // console.log(this.residentType);
      if (this.residentType == 0) {
        this.residentInfo.housingEstateId = this.estateId
      }
      var obj = {
        id: this.estateId
      }
      // 先请求小区的详情 拿到小区的地址
      return detailEstate(obj).then(res => {
        // console.log(res);
        // if (
        //   this.residentType == 0 ||
        //   this.residentType == 4 ||
        //   this.residentType == 5
        // ) {
        //   that.residentInfo.district = res.ret.district;
        //   that.residentInfo.street = res.ret.street;
        //   that.residentInfo.community = res.ret.community;
        // }

        // console.log(this.residentInfo, this.floorEditType);
        // return false;
        if (this.floorEditType == 1) {
          Dialog.alert({
            message: '您确定提交修改吗？',
            showCancelButton: true,
            cancel: () => {
              console.log('cancel')
            }
          })
            .then(() => {
              return editFloor(that.residentInfo).then(res => {
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
        // console.log(this.residentInfo);
        // return false;
        return editFloor(this.residentInfo).then(res => {
          // console.log(res);
          if (res.code != 200) {
            Notify({ type: 'warning', message: res.msg })
            return
          }
          sessionStorage.removeItem('map')
          that.$router.go(-1)
        })
      })
    },
    // 弹框展示
    showName(text) {
      this.dialogType = text
      this.show = true
    },
    // 更改小区名称
    changEstate(obj) {
      this.residentInfo.housingEstateName = obj.villageName
      this.residentInfo.housingEstateId = obj.id
      this.show = false
      this.estateList = []
      this.value = ''
    },
    // 获取小区列表
    searchEstate() {
      var obj = {
        orgId: this.orgId,
        villageName: this.value
      }
      return getEstat(obj).then(res => {
        // console.log(res);
        this.estateList = res.result.data
      })
    },
    // 打开省市区的弹框
    changeAddress() {
      this.cityVisable = true
    },
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
        } else if (index == 1) {
          this.areaList[index + 1].values = []
        }
        this.areaList = [...this.areaList] // 更新areaList
      })
    },
    // 当地区选择变化时
    onAreaChange(picker, values, index) {
      // values 选择的内容 index当前选择的列数的索引
      // console.log(values, index);
      if (index < 2) {
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
      if (value[0].name == '请选择') {
        this.cityVisable = false
        return false
      }
      // console.log(value);
      // return false;
      // 都有内容
      if (value[2].code && value[1].code && value[0].code) {
        console.log('有内容')
        // 如果是直辖市的特殊情况
        if (
          // 都选择了内容的情况下
          value[2].code &&
          value[1].code &&
          value[0].code
        ) {
          this.$set(this.residentInfo, 'communityStr', value[2].name)
          this.$set(this.residentInfo, 'streetStr', value[1].name)
          this.$set(this.residentInfo, 'districtStr', value[0].name)
          this.$set(this.residentInfo, 'community', value[2].code)
          this.$set(this.residentInfo, 'street', value[1].code)
          this.$set(this.residentInfo, 'district', value[0].code)
          console.log(this.residentInfo)
        } else {
          if (this.floorEditType == 0) {
            // console.log("有 清空");
            this.$set(this.residentInfo, 'communityStr', '')
            this.$set(this.residentInfo, 'streetStr', '')
            this.$set(this.residentInfo, 'districtStr', '')
            this.$set(this.residentInfo, 'community', '')
            this.$set(this.residentInfo, 'street', '')
            this.$set(this.residentInfo, 'district', '')
          }
        }
      } else {
        if (this.floorEditType == 0) {
          this.$set(this.residentInfo, 'communityStr', '')
          this.$set(this.residentInfo, 'streetStr', '')
          this.$set(this.residentInfo, 'provinceStr', '')
          this.$set(this.residentInfo, 'community', '')
          this.$set(this.residentInfo, 'street', '')
          this.$set(this.residentInfo, 'district', '')
        }
      }
      this.cityVisable = false
      console.log(this.residentInfo)
    }
  }
}
</script>
<style scoped lang="scss">
.editFloor {
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
    max-height: 60%;
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
    .propertyManagement {
      p:nth-child(1) {
        width: 100%;
        height: 49px;
        background: #eeeeee;
      }
      p:nth-child(2),
      p:nth-child(3),
      p:nth-child(4),
      p:nth-child(5) {
        border-bottom: 1px solid #e5e5e5;
      }
      p:nth-child(7) {
        border: none;
      }
    }
  }
}
</style>