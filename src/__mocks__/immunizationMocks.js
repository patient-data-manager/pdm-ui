const immunizationMockA = {
  date: '2017-04-05T18:19:22-04:00',
  vaccineCode: {
    coding: [ 
      {
        code: '435',
        display: 'Flu Shot',
        system: 'http://hl7.org/fhir/sid/cvx'
      }
    ],
    text: 'Flu Shot'
  }
};

const immunizationMockB = {
  date: '2015-04-05T18:19:22-04:00',
  vaccineCode: {
    coding: [ 
      {
        code: '113',
        display: 'Rabies Vaccine',
        system: 'http://hl7.org/fhir/sid/cvx'
      }
    ],
    text: 'Rabies Vaccine'
  }
};

const immunizationMockC = {
  date: '2003-09-05T18:19:22-04:00',
  vaccineCode: {
    coding: [ 
      {
        code: '123',
        display: 'Tetnis Shot',
        system: 'http://hl7.org/fhir/sid/cvx'
      }
    ],
    text: 'Tetnis Shot'
  }
};

const immunizationMockD = {
  date: '2002-09-05T18:19:22-04:00',
  vaccineCode: {
    coding: [ 
      {
        code: '451',
        display: 'Chicken Pox Vaccine',
        system: 'http://hl7.org/fhir/sid/cvx'
      }
    ],
    text: 'Chicken Pox Vaccine'
  }
};

export {
  immunizationMockA,
  immunizationMockB,
  immunizationMockC,
  immunizationMockD
};
