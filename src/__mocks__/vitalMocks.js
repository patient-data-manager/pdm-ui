const vitalMockA = {
  effectiveDateTime: '2011-04-05T18:19:22-04:00',
  code: {
    coding: [{
      code: 	'364075005',
      display: 'Heart rate (observable)',
      system: 'http://snomed.info/sct'
    }],
    text: 'Heart rate (observable)'
  },
  id: '7b3c17a0-6e53-0136-7848-4a00016726c0',
  valueQuantity: {value: '40', unit: 'bpm' }
};

const vitalMockB = {
  effectiveDateTime: '2012-04-05T18:19:22-04:00',
  code: {
    coding: [{
      code: 	'364075005',
      display: 'Heart rate (observable)',
      system: 'http://snomed.info/sct'
    }],
    text: 'Heart rate (observable)'
  },
  id: '7b3c17a0-6e53-0136-7848-4a00016726c0',
  valueQuantity: {value: '50', unit: 'bpm' }
};

const vitalMockC = {
  effectiveDateTime: '2018-04-05T18:19:22-04:00',
  code: {
    coding: [{
      code: 	'386725007',
      display: 'Body Temperature',
      system: 'http://snomed.info/sct'
    }],
    text: 'Body Temperature'
  },
  id: '7b3c17a0-6e53-0136-7848-4a00016726c0',
  valueQuantity: {value: '97', unit: 'F' }
};

const vitalMockD = {
  effectiveDateTime: '2018-07-05T18:19:22-04:00',
  code: {
    coding: [{
      code: 	'386725007',
      display: 'Body Temperature',
      system: 'http://snomed.info/sct'
    }],
    text: 'Body Temperature'
  },
  id: '7b3c17a0-6e53-0136-7848-4a00016726c0',
  valueQuantity: {value: '98', unit: 'F' }
};

export {
  vitalMockA,
  vitalMockB,
  vitalMockC,
  vitalMockD
};
