const overseasReople = [
  {
    id: 1,
    title: '外文姓',
    dataIndex: 'foreignSurname',
    isSelect: false
  },
  {
    id: 2,
    title: '外文名',
    dataIndex: 'foreignName',
    isSelect: false
  },
  {
    id: 3,
    title: '国籍(地区)',
    dataIndex: 'nationalityStr',
    isSelect: true
  },
  {
    id: 4,
    title: '来华目的',
    dataIndex: 'toChinaPurposeStr',
    isSelect: true
  },
  {
    id: 5,
    title: '抵达日期',
    dataIndex: 'arrivalDate',
    isSelect: true,
    isRequire: true
  },
  {
    id: 6,
    title: '预计离开日期',
    dataIndex: 'expectedDepartureDate',
    isSelect: true,
    isRequire: true
  }
]
export default overseasReople
