const conditionMockA = {
  abatementDateTime: '2017-04-12T18:19:22-04:00',
  assertedDate: '2017-04-05T18:19:22-04:00',
  clinicalStatus: 'resolved',
  code: {
    coding: [{
      code: '444814009',
      display: 'Viral sinusitis (disorder)',
      system: 'http://snomed.info/sct'
    }],
    text: 'Viral sinusitis (disorder)'
  },
  id: '7b3c17a0-6e53-0136-7848-4a00016726c0',
  onsetDateTime: '2017-04-05T18:19:22-04:00',
  resourceType: 'Condition',
  verificationStatus: 'confirmed'
};

const conditionMockB = {
  assertedDate: '1997-07-20T15:40:51-04:00',
  clinicalStatus: 'active',
  code: {
    coding: [{
      code: '446096008',
      display: 'Perennial allergic rhinitis',
      system: 'http://snomed.info/sct'
    }],
    text: 'Perennial allergic rhinitis'
  },
  id: 'b60fb3c0-6e55-0136-7849-4a00016726c0',
  onsetDateTime: '1997-07-20T15:40:51-04:00',
  resourceType: 'Condition',
  verificationStatus: 'confirmed'
};

const conditionMockC = {
  abatementDateTime: '2009-09-15T15:40:51-04:00',
  assertedDate: '2009-09-15T15:40:51-04:00',
  clinicalStatus: 'resolved',
  code: {
    coding: [{
      code: '444814009',
      display: 'Viral sinusitis (disorder)',
      system: 'http://snomed.info/sct'
    }],
    text: 'Viral sinusitis (disorder)'
  },
  id: 'b6b970a0-6e55-0136-7849-4a00016726c0',
  onsetDateTime: '2009-09-01T15:40:51-04:00',
  resourceType: 'Condition',
  verificationStatus: 'confirmed'
};

const conditionMockD = {
  assertedDate: '2013-10-18T15:40:51-04:00',
  clinicalStatus: 'active',
  code: {
    coding: [{
      code: '38341003',
      display: 'Hypertension',
      system: 'http://snomed.info/sct'
    }],
    text: 'Hypertension'
  },
  id: 'b81fa3c0-6e55-0136-7849-4a00016726c0',
  onsetDateTime: '2013-10-18T15:40:51-04:00',
  resourceType: 'Condition',
  verificationStatus: 'confirmed'
};

const conditionMockE = {
  assertedDate: '1994-11-19',
  clinicalStatus: 'active',
  code: {
    coding: [{
      code: '64859006',
      display: 'Osteoporosis (disorder)',
      system: 'http://snomed.info/sct'
    }],
    text: 'Osteoporosis (disorder)'
  },
  id: '1c6dc8e0-70be-0136-784b-4a00016726c0',
  onsetDateTime: '1994-11-19T23:40:13-05:00',
  resourceType: 'Condition',
  verificationStatus: 'confirmed'
};

export {
  conditionMockA,
  conditionMockB,
  conditionMockC,
  conditionMockD,
  conditionMockE
};