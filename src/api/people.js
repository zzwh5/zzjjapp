import request from '@/service/request'
import qs from 'qs'
const api = {
  // 查询对应网格下所有房间和房间人员
  getGovernRentingHouse: '/smartCity/governRentingHouse/findGovernRentingHouseAndPersonPage',
  searchPeopleByidCard: '/smartCity/governRegisteredPopulation/findGovernRegisteredPopulationByIdCard'
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