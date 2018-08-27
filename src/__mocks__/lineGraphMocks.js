const graphDataMockA = {
  'value': 200,
  'date': '1977-12-16T14:40:51-05:00'
};

const graphDataMockB = {
  'value': 100,
  'date': '2017-12-16T14:40:51-05:00'
};

const graphDataMockC = {
  'value': 300,
  'date': '2009-12-16T14:40:51-05:00'
};

const graphDataMockD = {
  'value': 500,
  'date': '2001-12-16T14:40:51-05:00'
};

const graphDataMockE = {
  'value': 50,
  'date': '1998-12-16T14:40:51-05:00'
};

const graphDataMockF = {
  'value': 250,
  'date': '2004-06-16T14:40:51-05:00'
};

const graphDataMockG = {
  'value': 400,
  'date': '1982-12-16T14:40:51-05:00'
};

const referenceRangesMock = [
  {
    low: 450,
    high: 'max',
    assessment: 'high'
  },
  {
    low: 105,
    high: 450,
    assessment: 'average'
  },
  {
    low: 0,
    high: 105,
    assessment: 'low'
  }
];

const tooltipPayloadMockA = [
  {
    color: '#4a4a4a',
    dataKey: 'value',
    fill: '#fff',
    formatter: undefined,
    name: 'value',
    payload: {
      value: 200,
      date: 251149251000
    },
    stroke: '#4a4a4a',
    strokeWidth: 1,
    unit: undefined,
    value: 200
  }
];

const tooltipPayloadMockB = [
  {
    color: '#4a4a4a',
    dataKey: 'value',
    fill: '#fff',
    formatter: undefined,
    name: 'value',
    stroke: '#4a4a4a',
    strokeWidth: 1,
    unit: undefined,
    value: 200
  }
];

export {
  graphDataMockA,
  graphDataMockB,
  graphDataMockC,
  graphDataMockD,
  graphDataMockE,
  graphDataMockF,
  graphDataMockG,
  referenceRangesMock,
  tooltipPayloadMockA,
  tooltipPayloadMockB
};
