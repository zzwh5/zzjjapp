import request from '@/service/request'
import qs from 'qs'
const api = {
  // 查询对应网格下所有房间和房间人员
  getGovernRentingHouse: '/smartCity/governRentingHouse/findGovernRentingHouseAndPersonPage',
  searchPeopleByidCard: '/smartCity/governRegisteredPopulation/findGovernRegisteredPopulationByIdCard',
  // 获取房屋里面的住户
  getHousePeople: '/smartCity/governRentingHouseDetails/findGovernRentingHouseDetailsPage',
  getZhuhu: '/smartCity/governRealPopulation/echoGovernRealPopulation',
  getZhuhubybasicid:'/smartCity/governRealPopulation/echoGovernRealPopulationByIdCard',
}

// 查询对应网格下所有房间和房间人员
export function getGovernRentingHouse(parameter) {
  return request({
    url: api.getGovernRentingHouse,
    method: 'post',
    data: parameter
  })
}

// 根据身份证号所搜户籍
export function searchPeopleByidCard (parameter) {
  return request({
    url: api.searchPeopleByidCard,
    method: 'post',
    data: parameter
  })
}

// 获取房屋住户
export function getHousePeople(parameter) {
  return request({
    url: api.getHousePeople,
    method: 'post',
    data: parameter
  })
}
// 获取住户
export function getZhuhu (parameter) {
  return request({
    url: api.getZhuhu,
    method: 'post',
    data: qs.stringify(parameter)
  })
}

// 根据身份证号获取户主信息
export function getZhuhubybasicid (parameter) {
  return request({
    url: api.getZhuhubybasicid,
    method: 'post',
    data: qs.stringify(parameter)
  })
}