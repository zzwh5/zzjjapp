import request from '@/service/request'
import qs from 'qs'
import basic from '../until/basic'

const api = {
  // 获取省市区
  address: 'smartCity/addressLibrary/findSubordinateAddressLibrary',
  // 获取下拉框的数据
  select: '/smartCity/dictionaryGroup/findDictionaryGroupByCode',
  // 根据basicId查找
  getBasicByBasicid: '/smartCity/governRegisteredPopulation/getOneByBasicsId',
  // 流动人口
  getFlowByBasicid: '/smartCity/governFloatingPopulation/getOneByBasicsId',
  releasedFromPrison: '/smartCity/governReleasePrisoners/getOneByBasicsId',
  communityCorrection: '/smartCity/governCommunityCorrectionStaff/getOneByBasicsId',
  psychosis: '/smartCity/governMentalDisorders/findGovernMentalDisordersPage',
  drugs: '/smartCity/governDrugAddicts/findGovernDrugAddictsPage',
  aids: '/smartCity/governAidsRiskPersonnel/findGovernAidsRiskPersonnelPage',
  letter: '/smartCity/governKeyPetitioners/findGovernKeyPetitionersPage',
  teenager: '/smartCity/governKeyYouth/findGovernKeyYouthPage',

}

// 下拉数据请求的code参考数组
const selectArr = [
  {
    title: '性别',
    code: 'GENDER'
  },
  {
    title: '民族',
    code: 'NATION'
  },
  {
    title: '婚姻状况',
    code: 'MARITAL'
  },
  {
    title: '政治面貌',
    code: 'POLITICAL_OUTLOOK'
  },
  {
    title: '学历',
    code: 'EDUCATION'
  },
  {
    title: '宗教信仰',
    code: 'RELIGIOUS_BELIEF'
  },
  {
    title: '职业类别',
    code: 'OCCUPATION_CATEGORY'
  },
  {
    title: '职业',
    code: 'OCCUPATION'
  },
  {
    title: '联系类型',
    code: 'CONTACT_TYPE'
  },
  {
    title: '标识',
    code: 'FLAG'
  },
  {
    title: '人员关系',
    code: 'RELATIONSHIP'
  },
  {
    title: '与户主关系',
    code: 'RELATIONSHIP_WITH_HEAD_OF_HOUSEHOLD',
  },
  {
    title: '证件类型',
    code: 'DOCUMENT_TYPE'
  },
  {
    title: '住所类型',
    code: 'RESIDENCE_TYPE'
  },
  {
    title: '人员类型',
    code: 'PERSONNEL_TYPE'
  },
  {
    title: '残疾程度',
    code: 'DISABILITY_DEGREE'
  },
  {
    title: '残疾类型',
    code: 'DISABILITY_TYPE'
  },
  {
    title: '劳动能力',
    code: 'LABOR_CAPACITY'
  },
  {
    title: '供养标准',
    code: 'SUPPORT_STANDARD'
  },
  {
    title: '供养形式',
    code: 'SUPPORT_FORMS'
  },
  {
    title: '生育证类型',
    code: 'BIRTH_CERTIFICATE_TYPE'
  },
  {
    title: '节育类型',
    code: 'BIRTH_CONTROL_TYPE'
  },
  {
    title: '政策生育类型',
    code: 'POLICY_FERTILITY_TYPE'
  },
  {
    title: '奖励救助类型',
    code: 'REWARD_ASSISTANCE_TYPE'
  },
  {
    title: '危险性评估类型',
    code: 'RISK_ASSESSMENT_TYPE'
  },
  {
    title: '矫正类别',
    code: 'CORRECTION_CATEGORY'
  },
  {
    title: '案件类别',
    code: 'CASES_TYPE'
  },
  {
    title: '接收方式',
    code: 'RECEIVING_MODE'
  },
  {
    title: '矫正解除(终止)类型',
    code: 'CORRECTION_RELEASE_TYPE'
  },
  {
    title: '诊断类型',
    code: 'DIAGNOSIS_TYPE'
  },
  {
    title: '危险性评估等级',
    code: 'RISK_ASSESSMENT_LEVEL'
  },
  {
    title: '危害程度',
    code: 'HARM_DEGREE'
  },
  {
    title: '安全隐患类型',
    code: 'POTENTIAL_SAFETY_HAZARD'
  },
  {
    title: '出租用途',
    code: 'RENTAL_PURPOSES'
  },
  {
    title: '事件类别',
    code: 'EVENT_CATEGORY'
  },
  {
    title: '化解方式',
    code: 'DISSOLVE_THE_WAY'
  },
  {
    title: '治安隐患等级',
    code: 'SAFETY_HAZARD_LEVEL'
  },
  {
    title: '学校办学类型',
    code: 'SCHOOL_TYPE'
  },
  {
    title: '学校所属主管教育行政部门',
    code: 'EDUCATIONAL_ADMINISTRATIVE_DEPARTMENT'
  },
  {
    title: '涉及区域类型',
    code: 'INVOLVED_AREA_TYPE'
  },
  {
    title: '效果评估',
    code: 'EFFECT_APPRAISAL'
  },
  {
    title: '登记注册类型',
    code: 'TYPE_OF_BUSINESS'
  },
  {
    title: '关注类型',
    code: 'ATTENTION_TYPE'
  },
  {
    title: '留守人员',
    code: 'REAR_PERSONNEL'
  },
  {
    title: '关注程度',
    code: 'CONCERN_EXTENT'
  },
  {
    title: '社会组织类型',
    code: 'TYPE_SOCIAL_ORGANIZATION'
  },
  {
    title: '机构中心',
    code: 'INSTITUTIONAL_CENTER'
  },
  {
    title: '层级编码',
    code: 'HIERARCHICAL_CODING'
  },
  {
    title: '人员级别',
    code: 'STAFF_LEVEL'
  },
  {
    title: '人员职务',
    code: 'STAFF'
  },
  {
    title: '专业特长',
    code: 'PROFESSIONAL_EXPERTISE'
  },
  {
    title: '企业类别',
    code: 'BUSINESS_CATEGORY'
  },
  {
    title: '政策种类',
    code: 'POLICY_TYPES'
  },
  {
    title: '来华目的',
    code: 'GOAL_IN_CHINA'
  },
  {
    title: '人员类别',
    code: 'PERSONNEL_CATEGORY'
  },
  {
    title: '事件规模',
    code: 'SCALE_OF_THE_EVENT'
  },
  {
    title: '房屋来源',
    code: 'HOUSING_SOURCE'
  },
  {
    title: '建筑用途',
    code: 'HOUSE_USE'
  }
]

// 获取所有省份的地址
export function getAddress(parameter) {
  var data = {}
  // if (parameter) {
  data.parentCode = parameter === '' ? '' : parameter
  // }
  // console.log(data)
  data = qs.stringify(data)
  // console.log(data)
  return request({
    url: api.address,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data: data
  })
}

// 获取下拉框的数据
export function getSelect(parameter) {
  // console.log(parameter)
  var data = {}
  var code = selectArr.filter(item => item.title === parameter)[0].code
  data.code = code
  data = qs.stringify(data)
  return request({
    url: api.select,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data: data
  })
}

// 根据basicId查找基本信息
export function getBasicByBasicid(parameter) {
  return request({
    url: api.getBasicByBasicid,
    method: 'post',
    data: qs.stringify(parameter)
  })
}

// 根据basicId查找流动人口信息
export function getFlowByBasicid(parameter) {
  return request({
    url: api.getFlowByBasicid,
    method: 'post',
    data: qs.stringify(parameter)
  })
}

// 根据basicid查询 特殊人群
export function getSpecialByBasicid(parameter) {
  var { name, basicsId } = parameter
  var data = {
    basicsId: basicsId
  }
  return request({
    url: api.getFlowByBasicid,
    method: 'post',
    data: qs.stringify(data)
  })
}