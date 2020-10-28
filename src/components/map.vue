<template>
  <div class="map">
    <div class="header">
      <div class="head_back" @click="goback">
        <img src="@/assets/back.png" alt />
      </div>
      <div class="head_text">地图</div>
      <div class="head_add" @click="comfirm">
        确定
      </div>
    </div>
    <div id="mapDiv" style="width；100vw;height:94vh"></div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      // 地图的初始化
      isMobile: false,
      lddialogwidth: '30%',
      locatInfo: {
        location: '暂无数据',
        locatTime: '暂无数据',
        lng: '暂无数据',
        lat: '暂无数据'
      },
      zoom: 12,
      detailLocation: '',
      locationDialogVisible: false,
      locationNow: false,
      // 当前的定位
      nowLoLa: {
        lo: '',
        la: ''
      },
      // 弹框的显示与否
      show: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.onloadMap()
    }, 1000)
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    onloadMap: function() {
      var T = window.T
      // var map

      // 天地图key
      const mapKey = '53a80f1a1c1822c3e83be723534c6242'

      // 初始化地图对象
      var map = new T.Map('mapDiv')
      // console.log(map);

      map.centerAndZoom(new T.LngLat(116.40969, 39.89945), this.zoom)
      var lc = new T.LocalCity()
      lc.location(function(e) {
        // alert(e.cityName);
        console.log(e)
        // var marker = new T.Marker(e.lnglat);
        // map.addOverLay(marker);
        getDetailLocation(e.lnglat, e.lnglat)
      })

      // 设置显示地图的中心点和级别
      map.centerAndZoom(new T.LngLat(116.40969, 38.89945), this.zoom)

      // 创建地图类型控件对象
      var _mapType = new T.Control.MapType()

      // 添加地图类型控件
      map.addControl(_mapType)

      // 创建控件对象
      var _zoomControl = new T.Control.Zoom()

      // 添加缩放平移控件
      map.addControl(_zoomControl)

      // 创建缩放平移控件对象
      _zoomControl.setPosition(T_ANCHOR_TOP_LEFT)

      // 创建定位对象lo
      var lo = new T.Geolocation()

      // 创建右键菜单对象
      var menu = new T.ContextMenu({
        width: 140
      })

      // 添加右键菜单
      var txtMenuItem = [
        {
          text: '放大',
          callback: () => {
            map.zoomIn()
          }
        },
        {
          text: '缩小',
          callback: () => {
            map.zoomOut()
          }
        },
        {
          text: '放置到最大级',
          callback: () => {
            map.setZoom(18)
          }
        },
        {
          text: '查看全国',
          callback: () => {
            map.setZoom(4)
          }
        },
        {
          text: '获得右键点击处坐标',
          isDisable: false,
          callback: lnglat => {
            // alert(lnglat.getLng() + "," + lnglat.getLat());
          }
        }
      ]

      for (var i = 0; i < txtMenuItem.length; i++) {
        // 添加菜单项
        var item = new T.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback)
        // item.disable();
        menu.addItem(item)
        if (i === 1 || i === 3) {
          // 添加分割线
          menu.addSeparator()
        }
      }

      // 装载菜单
      map.addContextMenu(menu)

      // 定位结果回调函数
      function fn(e) {
        console.log(e)
        // 当前为移动端时
        if (this.getStatus() === 0) {
          map.centerAndZoom(e.lnglat, 15)
          console.log(e)
          // 获取地理位置信息并设置到标注
          getDetailLocation(e.lnglat, e.lnglat)
        }

        // 当前为PC端时
        if (this.getStatus() === 1) {
          map.centerAndZoom(e.lnglat, e.level)
          console.log(e)
          // 获取地理位置信息并设置到标注
          getDetailLocation(e.lnglat, e.lnglat)
        }
      }

      // 设置标注
      function setMarker(e, d) {
        var marker = new T.Marker(e)
        map.addOverLay(marker)
        var markerInfoWin = new T.InfoWindow('' + d)
        marker.addEventListener('click', function() {
          marker.openInfoWindow(markerInfoWin)
        })
      }

      // 暂存this
      const _this = this

      // 通过经纬度获取详细地址
      function getDetailLocation(lnglat_lng, lnglat_lat) {
        axios
          .get('https://api.tianditu.gov.cn/geocoder', {
            params: {
              tk: mapKey,
              type: 'geocode',
              postStr:
                "{'lon':" +
                lnglat_lng.lng +
                ",'lat':" +
                lnglat_lat.lat +
                ",'ver':1}"
            }
          })
          .then(data => {
            map.panTo(new T.LngLat(lnglat_lng.lng, lnglat_lat.lat))
            var addressdata = data.data
            var detaillocation = addressdata.result.formatted_address
            console.log(detaillocation)
            // 截取地址信息显示
            _this.locatInfo.location = addressdata.result.formatted_address
            // 获取定位时间
            _this.locatInfo.locatTime = new Date().toLocaleDateString()
            _this.locatInfo.lng = lnglat_lng.lng
            _this.locatInfo.lat = lnglat_lat.lat
            console.log(new Date().toLocaleDateString())
            console.log(lnglat_lng.lng)
            console.log(lnglat_lat.lat)
            if (addressdata.msg == 'ok' && addressdata.status == 0) {
              // 将位置信息设置到标注
              setMarker(lnglat_lat, detaillocation)
            } else {
              // 错误处理
            }
          })
          .catch(error => {
            console.log(error)
          })
      }

      // 开始定位
      // lo.getCurrentPosition(fn);

      // 添加定位点
      var cp = new T.CoordinatePickup(map, {
        callback: p => {
          var newMarker = map.getOverlays()
          if (newMarker.length > 1) {
            // console.log(newMarker);
            map.removeOverLay(newMarker[newMarker.length - 1])
          }
          // console.log(p.lng, p.lat);
          // 保存当前用户点击的位置 (保存经纬度用)
          _this.nowLoLa = {
            lo: p.lng.toFixed(6),
            la: p.lat.toFixed(6)
          }
          console.log(_this.nowLoLa)
          // 创建图片对象
          var icon = new T.Icon({
            iconUrl: 'http://api.tianditu.gov.cn/img/map/markerA.png',
            iconSize: new T.Point(19, 27),
            iconAnchor: new T.Point(10, 25)
          })
          // 向地图上添加自定义标注
          var marker = new T.Marker(new T.LngLat(p.lng, p.lat), { icon: icon })
          map.addOverLay(marker)
        }
      })
      cp.addEvent()
    },
    comfirm() {
      console.log('用户选择的定位', this.nowLoLa)
      console.log('自动定位', this.locatInfo)
      var type = JSON.parse(sessionStorage.getItem('map')).type
      if (this.nowLoLa.lo == '') {
        // console.log("用户没有选择定位");
        var obj = {
          type: type,
          la: this.locatInfo.lat.toFixed(6),
          lo: this.locatInfo.lng.toFixed(6)
        }
      } else {
        var obj = {
          type: type,
          la: this.nowLoLa.la,
          lo: this.nowLoLa.lo
        }
      }
      console.log(obj)
      sessionStorage.setItem('map', JSON.stringify(obj))
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.map {
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
      color: #000;
      font-weight: 500;
    }
  }
}
</style>
