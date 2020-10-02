import request from '@/service/request'
import qs from 'qs'

const api = {
  // 根据楼栋id获取楼栋和小区信息
  getEstateFloor: '/smartCity/governBuilding/findGovernHousingEstateBybuildingId',
  // 获取小区
  getEstat: '/smartCity/governHousingEstate/findGovernHousingEstatePage',
  // 获取小区信息
  detailEstate: '/smartCity/governHousingEstate/echoGovernHousingEstate',
  // 修改小区信息
  editEstate: '/smartCity/governHousingEstate/insertGovernHousingEstate',
  // 根据小区名获取楼栋
  getFloorByEstate: '/smartCity/governHousingEstate/findGovernHousingEstateAndGovernBuilding',
  // 获取楼栋
  // 楼栋详情
  detailFloor: '/smartCity/governBuilding/echoGovernBuilding',
  editFloor: '/smartCity/governBuilding/insertGovernBuilding',
  getFloor: '/smartCity/governBuilding/findGovernBuildingPage',
  // 根据楼栋查询楼栋的下的房屋 
  getResident: '/smartCity/governBuilding/findGovernBuildingAndRoom',
  // 房屋详情
  detailHouse: '/smartCity/governRentingHouse/echoGovernRentingHouse',
  // 房屋编辑
  editHouse: '/smartCity/governRentingHouse/insertGovernRentingHouse',
  // 获取住户列表
  getUserList: '/smartCity/governRentingHouseDetails/findGovernRentingHouseDetailsPage',
  // 增加住户信息
  editUserInfo: '/smartCity/governRentingHouseDetails/insertGovernRentingHouseDetails'
}

//  根据楼栋id获取楼栋和小区信息
export function getEstateFloor(parameter) {
  return request({
    url: api.getEstateFloor,
    method: 'post',
    data: qs.stringify(parameter)
  })
}

// 小区
export function getEstat(parameter) {
  return request({
    url: api.getEstat,
    method: 'post',
    data: parameter
  })
}

// 小区的信息
export function detailEstate(parameter) {
  return request({
    url: api.detailEstate,
    method: 'post',
    data: qs.stringify(parameter)
  })
}

// 添加/修改小区信息
export function editEstate(parameter) {
  return request({
    url: api.editEstate,
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

// 楼栋详情
export function detailFloor(parameter) {
  return request({
    url: api.detailFloor,
    method: 'post',
    data: qs.stringify(parameter)
  })
}

// 楼栋 新增/编辑
export function editFloor(parameter) {
  return request({
    url: api.editFloor,
    method: 'post',
    data: parameter
  })
}

// 楼栋下的住户信息
export function getResident(parameter) {
  return request({
    url: api.getResident,
    method: 'post',
    data: parameter
  })
}

// 房屋详情
export function detailHouse(parameter) {
  return request({
    url: api.detailHouse,
    method: 'post',
    data: qs.stringify(parameter)
  })
}

// 房屋添加/编辑
export function editHouse(parameter) {
  return request({
    url: api.editHouse,
    method: 'post',
    data: parameter
  })
}

// 获取住户列表
export function getUserList(parameter) {
  return request({
    url: api.getUserList,
    method: 'post',
    data: parameter
  })
}


// 添加住户信息

export function editUserInfo(parameter) {
  return request({
    url: api.editUserInfo,
    method: 'post',
    data: parameter
  })
}