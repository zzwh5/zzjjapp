// 流动人口
const flow = [
  {
    id: 1,
    title: '流入原因',
    dataIndex: 'inflowReasons',
    isSelect: false
  },
  {
    id: 2,
    title: '证件类型',
    dataIndex: 'documentType',
    isSelect: true
  },
  {
    id: 3,
    title: '证件号码',
    dataIndex: 'identificationNumber',
    isSelect: false
  },
  {
    id: 4,
    title: '登记日期',
    dataIndex: 'registrationDate',
    isSelect: false
  },
  {
    id: 5,
    title: '证件到期日期',
    dataIndex: 'certificateExpirationDate',
    isSelect: false
  },
  {
    id: 6,
    title: '住所类型',
    dataIndex: 'residenceType',
    isSelect: true
  },
  {
    id: 7,
    title: '是否重点关注人员',
    dataIndex: 'focusOnPeople',
    isSelect: true
  }
]
export default flow