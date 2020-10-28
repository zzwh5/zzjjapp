import request from '@/service/request'
import qs from 'qs'
// import basic from '../until/basic'

const api = {
  // 登录
  login: '/smartCity/gridOrganizationStructure/findOrgIdByName/',
  // 获取组织结构
  tree: '/smartCity/gridOrganizationStructure/findGridOrganizationStructureAll',
  childTree:
    'smartCity/gridOrganizationStructure/findGridOrganizationStructureSubordinate',
  // 获取省市区
  address: 'smartCity/addressLibrary/findSubordinateAddressLibrary',
  // 获取下拉框的数据
  select: '/smartCity/dictionaryGroup/findDictionaryGroupByCode',
  // 获取国籍的下拉框
  nation: '/smartCity/nation/findAllNation',
  // 获取档案管理 基本信息
  getGoverByBasicid: '/smartCity/governRealPopulation/echoGovernRealPopulation',
  // 根据basicId查找
  getBasicByBasicid: '/smartCity/governRegisteredPopulation/getOneByBasicsId',
  // 编辑基本信息(户籍人口)
  editBasicByBasicid:
    '/smartCity/governRegisteredPopulation/insertGovernRegisteredPopulation',
  // 编辑档案管理信息
  editGover: '/smartCity/governRealPopulation/insertGovernRealPopulation',
  // 流动人口
  getFlowByBasicid: '/smartCity/governFloatingPopulation/getOneByBasicsId',
  // 编辑流动人口
  editFlowByBasicid:
    '/smartCity/governFloatingPopulation/insertGovernFloatingPopulation',
  // 查询
  // 特殊人群
  releasedFromPrison: '/smartCity/governReleasePrisoners/getOneByBasicsId',
  communityCorrection:
    '/smartCity/governCommunityCorrectionStaff/getOneByBasicsId',
  psychosis: '/smartCity/governMentalDisorders/getOneByBasicsId',
  drugs: '/smartCity/governDrugAddicts/getOneByBasicsId',
  aids: '/smartCity/governAidsRiskPersonnel/getOneByBasicsId',
  letter: '/smartCity/governKeyPetitioners/getOneByBasicsId',
  teenager: '/smartCity/governKeyYouth/getOneByBasicsId',
  // 实有人口
  // 留守人员
  rear: '/smartCity/governLeftBehindPopulation/getOneByBasicsId',
  // 境外人员
  overseasReople: '/smartCity/governOverseasPersonnel/getOneByBasicsId',
  // 三无老人
  sanwu: '/smartCity/governThreeNonElderly/getOneByBasicsId',
  // 空巢老人
  empty: '/smartCity/governEmptyNester/getOneByBasicsId',
  // 死亡人口
  death: '/smartCity/governDeadPopulation/getOneByBasicsId',
  // 残疾人员
  disability: '/smartCity/governDisabledPersons/getOneByBasicsId',
  // 低保人员
  basicLivingAllowance:
    '/smartCity/governSubsistenceAllowances/getOneByBasicsId',
  // 特困人员
  exceptionalPoverty: '/smartCity/governExtremelyPoorPeople/getOneByBasicsId',
  // 就业/失业
  service: '/smartCity/governEmploymentServices/getOneByBasicsId',

  // 编辑
  // 特殊人群
  editreleasedFromPrison:
    '/smartCity/governReleasePrisoners/insertGovernReleasePrisoners',
  editcommunityCorrection:
    '/smartCity/governCommunityCorrectionStaff/insertGovernCommunityCorrectionStaff',
  editpsychosis: '/smartCity/governMentalDisorders/insertGovernMentalDisorders',
  editdrugs: '/smartCity/governDrugAddicts/insertGovernDrugAddicts',
  editaids: '/smartCity/governAidsRiskPersonnel/insertGovernAidsRiskPersonnel',
  editletter: '/smartCity/governKeyPetitioners/insertGovernKeyPetitioners',
  editteenager: '/smartCity/governKeyYouth/insertGovernKeyYouth',
  // 实有人口
  // 留守人员
  editrear:
    '/smartCity/governLeftBehindPopulation/insertGovernLeftBehindPopulation',
  // 境外人员
  editoverseasReople:
    '/smartCity/governOverseasPersonnel/insertGovernOverseasPersonnel',
  // 三无老人
  editsanwu: '/smartCity/governThreeNonElderly/insertGovernThreeNonElderly',
  // 空巢老人
  editempty: '/smartCity/governEmptyNester/insertGovernEmptyNester',
  // 死亡人口
  editdeath: '/smartCity/governDeadPopulation/insertGovernDeadPopulation',
  // 残疾人员
  editdisability:
    '/smartCity/governDisabledPersons/insertGovernDisabledPersons',
  // 低保人员
  editbasicLivingAllowance:
    '/smartCity/governSubsistenceAllowances/insertGovernSubsistenceAllowances',
  // 特困人员
  editexceptionalPoverty:
    '/smartCity/governExtremelyPoorPeople/insertGovernExtremelyPoorPeople',
  // 就业/失业
  editservice:
    '/smartCity/governEmploymentServices/insertGovernEmploymentServices',
  // 删除
  // 特殊人群
  delreleasedFromPrison:
    '/smartCity/governReleasePrisoners/deleteGovernReleasePrisoners',
  delcommunityCorrection:
    'smartCity/governCommunityCorrectionStaff/deleteGovernCommunityCorrectionStaff',
  delpsychosis: '/smartCity/governMentalDisorders/deleteGovernMentalDisorders',
  deldrugs: '/smartCity/governDrugAddicts/deleteGovernDrugAddicts',
  delaids: '/smartCity/governAidsRiskPersonnel/deleteGovernAidsRiskPersonnel',
  delletter: '/smartCity/governKeyPetitioners/deleteGovernKeyPetitioners',
  delteenager: '/smartCity/governVisitRecord/deleteGovernVisitRecord',
  // 实有人口
  // 留守人员
  delrear:
    '/smartCity/governLeftBehindPopulation/deleteGovernLeftBehindPopulation',
  // 境外人员
  deloverseasReople:
    '/smartCity/governOverseasPersonnel/deleteGovernOverseasPersonnel',
  // 三无老人
  delsanwu: '/smartCity/governThreeNonElderly/deleteGovernThreeNonElderly',
  // 空巢老人
  delempty: '/smartCity/governEmptyNester/deleteGovernEmptyNester',
  // 死亡人口
  deldeath: '/smartCity/governDeadPopulation/deleteGovernDeadPopulation',
  // 残疾人员
  deldisability: '/smartCity/governDisabledPersons/deleteGovernDisabledPersons',
  // 低保人员
  delbasicLivingAllowance:
    '/smartCity/governSubsistenceAllowances/deleteGovernSubsistenceAllowances',
  // 特困人员
  delexceptionalPoverty:
    '/smartCity/governExtremelyPoorPeople/deleteGovernExtremelyPoorPeople',
  // 就业/失业
  delservice:
    '/smartCity/governEmploymentServices/deleteGovernEmploymentServices'
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
    code: 'RELATIONSHIP_WITH_HEAD_OF_HOUSEHOLD'
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
  },
  {
    title: '医保状况',
    code: 'MEDICALINSURANCE_STATUS'
  },
  {
    title: '四史情况',
    code: 'FOUR_HISTORIES'
  },
  {
    title: '三涉情况',
    code: 'THREE_STEPS'
  },
  {
    title: '矫正小组人员组成类型',
    code: 'CORRECTION_TEAM_COMPOSITION'
  },
  {
    title: '感染途径',
    code: 'INFECTION_ROUTE'
  }
]

// 登录
export function login(data) {
  return request({
    url: api.login + data.name,
    method: 'get'
  })
}

export function getTree(parameter) {
  return request({
    url: api.tree,
    method: 'get',
    params: parameter
  })
}

// 获取下级的组织架构图
export function getChildTree(parameter) {
  var data = {
    id: parameter
  }
  return request({
    url: api.childTree,
    method: 'get',
    params: data
  })
}

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

// 获取国家的下拉框
// nation
export function getCountries(parameter) {
  return request({
    url: api.nation,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post'
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

// 根据basicId查找档案信息
export function getGoverByBasicid(parameter) {
  return request({
    url: api.getGoverByBasicid,
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
  // console.log(api[name])
  return request({
    url: api[name],
    method: 'post',
    data: qs.stringify(data)
  })
}

// 更改对应模块的信息
export function editSpecialByBasicid(parameter) {
  // var { name, basicsId } = parameter
  var { name } = parameter
  var data = parameter
  delete data.name
  console.log(data)
  return request({
    url: api[name],
    method: 'post',
    data: data
  })
}

// 删除对应的模块
export function delSpecialByBasicid(parameter) {
  var arr = [parameter.ids]
  var { name } = parameter
  console.log(name)

  return request({
    url: api[name],
    method: 'post',
    data: arr
  })
}

// 编辑档案管理信息(户籍人口)
export function editBasicByBasicid(parameter) {
  return request({
    url: api.editBasicByBasicid,
    method: 'post',
    data: parameter
  })
}
// 编辑 档案中心
export function editGover(parameter) {
  return request({
    url: api.editGover,
    method: 'post',
    data: parameter
  })
}
// 编辑流动人口
export function editFlowByBasicid(parameter) {
  return request({
    url: api.editFlowByBasicid,
    method: 'post',
    data: parameter
  })
}
