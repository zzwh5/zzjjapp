import request from '@/service/request'
import qs from 'qs'

const api = {
  // 获取小区
  getEstat: '/smartCity/governHousingEstate/findGovernHousingEstatePage',
  // 根据小区名获取楼栋
  getFloorByEstate: '/smartCity/governHousingEstate/findGovernHousingEstateAndGovernBuilding',
  // 获取楼栋
  getFloor: '/smartCity/governBuilding/findGovernBuildingPage',
}

// 小区
export function getEstat(parameter) {
  return request({
    url: api.getEstat,
    method: 'post',
    data: parameter
  })
}

// 根据小区名获取楼栋
export function getFloorByEstate(parameter) {
  return request({
    url: api.getFloorByEstate,
    method: 'post',
    data: parameter
  })
}

// 楼栋
export function getFloor(parameter) {
  return request({
    url: api.getFloor,
    method: 'post',
    data: parameter
  })
}


