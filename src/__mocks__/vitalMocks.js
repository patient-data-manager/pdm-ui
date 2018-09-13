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
      code: '8331-1',
      display: 'Oral Temperature',
      system: 'http://snomed.info/sct'
    }],
    text: 'Oral Temperature'
  },
  effectiveDateTime: '2008-12-21T06:40:06-05:00',
  id: '1e4885b0-771c-0136-3f3e-7e009128ee01',
  valueQuantity: { value: '37.91023456078337', unit: 'Cel' }
};

const vitalMockD = {
  code: {
    coding: [{
      code: '8302-2',
      display: 'Body Height',
      system: 'http://loinc.org'
    }],
    text: 'Body Height'
  },
  effectiveDateTime: '2009-07-19T15:35:55-04:00',
  id: 'a6f44bf0-8d32-0136-91c6-7e009128ee01',
  valueQuantity: { value: 179.5143676627678, unit: 'cm' }
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

const vitalMockF = {
  code: {
    coding: [{
      code: '29463-7',
      display: 'Body Weight',
      system: 'http://loinc.org'
    }],
    text: 'Body Weight'
  },
  effectiveDateTime: '2015-08-02T15:35:55-04:00',
  id: 'a83866b0-8d32-0136-91c6-7e009128ee01',
  valueQuantity: { value: 96.44676490364593, unit: 'kg' }
};

const vitalMockG = {
  code: {
    coding: [{
      code: '39156-5',
      display: 'Body Mass Index',
      system: 'http://loinc.org'
    }],
    text: 'Body Mass Index'
  },
  effectiveDateTime: '2012-07-29T15:35:55-04:00',
  id: 'a8017cf0-8d32-0136-91c6-7e009128ee01',
  valueQuantity: { value: 28.425251287577726, unit: 'kg/m2' }
};

const vitalMockH = {
  code: {
    coding: [{
      code: '39156-5',
      display: 'Body Mass Index',
      system: 'http://loinc.org'
    }],
    text: 'Body Mass Index'
  },
  effectiveDateTime: '2012-07-30T15:35:55-04:00',
  id: 'a8017cf0-8d32-0136-91c6-7e009128ee02',
  valueQuantity: { value: 29.425251287577726, unit: 'kg/m2' }
};

const vitalMockI = {
  code: {
    coding: [{
      code: '39156-5',
      display: 'Body Mass Index',
      system: 'http://loinc.org'
    }],
    text: 'Body Mass Index'
  },
  effectiveDateTime: '2012-07-31T15:35:55-04:00',
  id: 'a8017cf0-8d32-0136-91c6-7e009128ee03',
  valueQuantity: { value: 30.425251287577726, unit: 'kg/m2' }
};

export {
  vitalMockA,
  vitalMockB,
  vitalMockC,
  vitalMockD,
  vitalMockE,
  vitalMockF,
  vitalMockG,
  vitalMockH,
  vitalMockI
};
