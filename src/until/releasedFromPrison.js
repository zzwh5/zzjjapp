// 刑满释放人员
const releasedFromPrison = [
  {
    id: 1,
    title: '是否累犯',
    dataIndex: 'recidivistStr',
    isSelect: true,
    isRequire: false
  },
  {
    id: 2,
    title: '原罪名',
    dataIndex: 'originalSin',
    isSelect: false,
    isRequire: false
  },
  {
    id: 3,
    title: '原判刑期',
    dataIndex: 'originalSentence',
    isSelect: false,
    isRequire: false
  },
  {
    id: 4,
    title: '服刑场所',
    dataIndex: 'servicePlace',
    isSelect: false,
    isRequire: false
  },
  {
    id: 5,
    title: '释放日期',
    dataIndex: 'releaseDate',
    isSelect: true,
    isRequire: true
  },
  {
    id: 6,
    title: '危险性评估类型',
    dataIndex: 'riskAssessmentTypeStr',
    isSelect: true,
    isRequire: false
  },
  {
    id: 7,
    title: '衔接日期',
    dataIndex: 'connectingDate',
    isSelect: true,
    isRequire: true
  },
  {
    id: 8,
    title: '衔接情况',
    dataIndex: 'connection',
    isSelect: false,
    isRequire: false
  },
  {
    id: 9,
    title: '安置日期',
    dataIndex: 'placementDate',
    isSelect: true,
    isRequire: true
  },
  {
    id: 10,
    title: '安置情况',
    dataIndex: 'resettlement',
    isSelect: false,
    isRequire: false
  },
  {
    id: 11,
    title: '未安置原因',
    dataIndex: 'nonResettlementReasons',
    isSelect: false,
    isRequire: false
  },
  {
    id: 12,
    title: '帮扶情况',
    dataIndex: 'assistance',
    isSelect: false,
    isRequire: false
  },
  {
    id: 13,
    title: '是否重新犯罪',
    dataIndex: 'recidivismStr',
    isSelect: true,
    isRequire: false
  },
  {
    id: 14,
    title: '重新犯罪罪名',
    dataIndex: 'recidivismName',
    isSelect: false,
    isRequire: false
  }
]
export default releasedFromPrison