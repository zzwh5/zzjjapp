const communityCorrection = [
  {
    id: 1,
    title: '社区矫正人员编号',
    dataIndex: 'communityCorrectionNumber',
    isSelect: false
  },
  {
    id: 2,
    title: '原羁押场所',
    dataIndex: 'originalCustodyPlace',
    isSelect: false
  },
  {
    id: 3,
    title: '矫正类别',
    dataIndex: 'correctionCategoryStr',
    isSelect: true
  },
  {
    id: 4,
    title: '案件类别',
    dataIndex: 'casesTypeStr',
    isSelect: true
  },
  {
    id: 5,
    title: '具体罪名',
    dataIndex: 'specificCharges',
    isSelect: false
  },
  {
    id: 6,
    title: '原判刑期',
    dataIndex: 'originalSentence',
    isSelect: false
  },
  {
    id: 7,
    title: '原判刑开始日期',
    dataIndex: 'originalSentenceStartingDate',
    isSelect: true,
    isRequire: true
  },
  {
    id: 8,
    title: '原判刑结束日期',
    dataIndex: 'originalSentenceEndDate',
    isSelect: true,
    isRequire: true
  },
  {
    id: 9,
    title: '矫正开始日期',
    dataIndex: 'correctionStartDate',
    isSelect: true,
    isRequire: true
  },
  {
    id: 10,
    title: '矫正结束日期',
    dataIndex: 'correctionEndDate',
    isSelect: true,
    isRequire: true
  },
  {
    id: 11,
    title: '接收方式',
    dataIndex: 'receivingModeStr',
    isSelect: true
  },
  {
    id: 12,
    title: '四史情况',
    dataIndex: 'fourHistoriesStr',
    isSelect: true
  },
  {
    id: 13,
    title: '是否累惯犯',
    dataIndex: 'recidivistStr',
    isSelect: true
  },
  {
    id: 14,
    title: '三涉情况',
    dataIndex: 'threeStepsStr',
    isSelect: true
  },
  {
    id: 15,
    title: '是否建立矫正小组',
    dataIndex: 'correctiveTeamEstablishedStr',
    isSelect: true
  },
  {
    id: 16,
    title: '矫正小组人员组成类型',
    dataIndex: 'correctionTeamCompositionStr',
    isSelect: true
  },
  {
    id: 17,
    title: '矫正解除(终止)类型',
    dataIndex: 'correctionReleaseTypeStr',
    isSelect: true
  },
  {
    id: 18,
    title: '是否有托管',
    dataIndex: 'custodyStr',
    isSelect: true
  },
  {
    id: 19,
    title: '托管原因',
    dataIndex: 'trusteeshipReason',
    isSelect: false
  },
  {
    id: 20,
    title: '检查监督托管情况',
    dataIndex: 'checkSuperviseTrusteeship',
    isSelect: false
  },
  {
    id: 21,
    title: '托管矫正情况',
    dataIndex: 'custodyCorrection',
    isSelect: false
  },
  {
    id: 22,
    title: '是否有漏管',
    dataIndex: 'leakageStr',
    isSelect: true
  },
  {
    id: 23,
    title: '漏管原因',
    dataIndex: 'leakageCauses',
    isSelect: false
  },
  {
    id: 24,
    title: '检查监督漏管情况',
    dataIndex: 'inspectSuperviseLeakage',
    isSelect: false
  },
  {
    id: 25,
    title: '漏管纠正情况',
    dataIndex: 'leakageCorrection',
    isSelect: false
  },
  {
    id: 26,
    title: '奖惩情况',
    dataIndex: 'rewardPunishment',
    isSelect: false
  },
  {
    id: 27,
    title: '刑罚变更执行情况',
    dataIndex: 'penaltyChangeExecution',
    isSelect: false
  },
  {
    id: 28,
    title: '是否重新犯罪',
    dataIndex: 'recidivismStr',
    isSelect: true
  },
  {
    id: 29,
    title: '重新犯罪名称',
    dataIndex: 'recidivismName',
    isSelect: false
  }
]
export default communityCorrection
