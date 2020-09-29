// 流动人口
const flow = [
  {
    id: 1,
    title: '流入原因',
    dataIndex: 'inflowReasons',
    isSelect: false,
    isRequire: false
  },
  {
    id: 2,
    title: '证件类型',
    dataIndex: 'documentTypeStr',
    isSelect: true,
    isRequire: false
  },
  {
    id: 3,
    title: '证件号码',
    dataIndex: 'identificationNumber',
    isSelect: false,
    isRequire: false
  },
  {
    id: 4,
    title: '登记日期',
    dataIndex: 'registrationDate',
    isSelect: true,
    isRequire: true
  },
  {
    id: 5,
    title: '证件到期日期',
    dataIndex: 'certificateExpirationDate',
    isSelect: true,
    isRequire: true
  },
  {
    id: 6,
    title: '住所类型',
    dataIndex: 'residenceTypeStr',
    isSelect: true,
    isRequire: false
  },
  {
    id: 7,
    title: '是否重点关注人员',
    dataIndex: 'focusOnPeopleStr',
    isSelect: true,
    isRequire: false
  }
]
export default flow