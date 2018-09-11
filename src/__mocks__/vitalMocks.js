const vitalMockA = {
  code: {
    coding: [{
      code: '55284-4',
      display: 'Blood Pressure',
      system: 'http://loinc.org'
    }],
    text: 'Blood Pressure'
  },
  component: [
    {
      code: {
        coding: [{
          code: '8462-4',
          display: 'Diastolic Blood Pressure',
          system: 'http://loinc.org'
        }],
        text: 'Diastolic Blood Pressure'
      },
      valueQuantity: {
        code: 'mmHg',
        system: 'http://unitsofmeasure.org',
        unit: 'mmHg',
        value: 70.90576527982091
      }
    },
    {
      code: {
        coding: [{
          code: '8480-6',
          display: 'Systolic Blood Pressure',
          system: 'http://loinc.org'
        }],
        text: 'Systolic Blood Pressure'
      },
      valueQuantity: {
        code: 'mmHg',
        system: 'http://unitsofmeasure.org',
        unit: 'mmHg',
        value: 101.51342240564382
      }
    },
  ],
  effectiveDateTime: '2017-09-10T18:19:22-04:00',
  id: 'f38885e0-6db1-0136-7846-4a00016726c0',
};

const vitalMockB = {
  code: {
    coding: [{
      code: '364075005',
      display: 'Heart rate (observable)',
      system: 'http://snomed.info/sct'
    }],
    text: 'Heart rate (observable)'
  },
  id: '7b3c17a0-6e53-0136-7848-4a00016726c0',
  effectiveDateTime: '2012-04-05T18:19:22-04:00',
  valueQuantity: { value: '50', unit: 'bpm' }
};

const vitalMockC = {
  code: {
    coding: [{
      code: '386725007',
      display: 'Body Temperature',
      system: 'http://snomed.info/sct'
    }],
    text: 'Body Temperature'
  },
  effectiveDateTime: '2016-04-05T18:19:22-04:00',
  id: '7b3c17a0-6e53-0136-7848-4a00016726c0',
  valueQuantity: { value: '97', unit: 'F' }
};

const vitalMockD = {
  code: {
    coding: [{
      code: '386725007',
      display: 'Body Height',
      system: 'http://snomed.info/sct'
    }],
    text: 'Body Height'
  },
  effectiveDateTime: '2018-07-05T18:19:22-04:00',
  id: '7b3c17a0-6e53-0136-7848-4a00016726c0',
  valueQuantity: { value: '165.279192834129348', unit: 'cm' }
};

const vitalMockE = {
  code: {
    coding: [{
      code: '364075005',
      display: 'Heart rate (observable)',
      system: 'http://snomed.info/sct'
    }],
    text: 'Heart rate (observable)'
  },
  effectiveDateTime: '2011-04-05T18:19:22-04:00',
  id: '7b3c17a0-6e53-0136-7848-4a00016726c0',
  valueQuantity: { value: '40', unit: 'bpm' }
};

export {
  vitalMockA,
  vitalMockB,
  vitalMockC,
  vitalMockD,
  vitalMockE
};
