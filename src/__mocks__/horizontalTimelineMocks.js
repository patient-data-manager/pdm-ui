const groupsMock = [
  { 'id': 1, 'title': 'procedure' },
  { 'id': 2, 'title': 'condition' },
  { 'id': 3, 'title': 'lab' },
  { 'id': 4, 'title': 'medication' }
];

const legendItemsMock =[
  { icon: 'hospital', text: 'procedure' },
  { icon: 'heartbeat', text: 'condition' },
  { icon: 'flask', text: 'lab' },
  { icon: 'pills', text: 'medication' }
];

const rangeItemsMock = [
  { rangeText: '1mo', rangeNum: 1, rangeType: 'months', rangeFutureType: 'days' },
  { rangeText: '3mo', rangeNum: 3, rangeType: 'months', rangeFutureType: 'days' },
  { rangeText: '6mo', rangeNum: 6, rangeType: 'months', rangeFutureType: 'months' },
  { rangeText: '1yr', rangeNum: 1, rangeType: 'year', rangeFutureType: 'months' },
  { rangeText: '5yr', rangeNum: 5, rangeType: 'year', rangeFutureType: 'months' },
  { rangeText: 'all' }
];

export {
  groupsMock,
  legendItemsMock,
  rangeItemsMock
};