const medicationRequestMockA = {
  authoredOn: '1996-12-16T14:40:51-05:00',
  id: 'b6090560-6e55-0136-7849-4a00016726c0',
  medicationCodeableConcept: {
    coding: [{
      code: '727316',
      display: '0.3 ML EPINEPHrine 0.5 MG/ML Auto-Injector',
      system: 'http://www.nlm.nih.gov/research/umls/rxnorm'
    }],
    text: '0.3 ML EPINEPHrine 0.5 MG/ML Auto-Injector'
  },
  status: 'active'
};

const medicationRequestMockB = {
  authoredOn: '2015-05-17T18:19:22-04:00',
  id: '45589320-6db1-0136-7845-4a00016726c0',
  medicationCodeableConcept: {
    coding: [{
      code: '824184',
      display: 'Amoxicillin 250 MG / Clavulanate 125 MG [Augmentin]',
      system: 'http://www.nlm.nih.gov/research/umls/rxnorm'
    }],
    text: 'Amoxicillin 250 MG / Clavulanate 125 MG [Augmentin]'
  },
  status: 'stopped'
};

const medicationRequestMockC = {
  authoredOn: '2017-05-29T15:40:51-04:00',
  id: 'b848d660-6e55-0136-7849-4a00016726c0',
  medicationCodeableConcept: {
    coding: [{
      code: '807283',
      display: 'Mirena 52 MG Intrauterine System',
      system: 'http://www.nlm.nih.gov/research/umls/rxnorm'
    }],
    text: 'Mirena 52 MG Intrauterine System'
  },
  status: 'intended'
};

const medicationRequestMockD = {
  authoredOn: '2016-06-03T15:40:51-04:00',
  id: 'b8306100-6e55-0136-7849-4a00016726c0',
  medicationCodeableConcept: {
    coding: [{
      code: '748962',
      display: 'Camila 28 Day Pack',
      system: 'http://www.nlm.nih.gov/research/umls/rxnorm'
    }],
    text: 'Camila 28 Day Pack'
  },
  status: 'active'
};

const medicationRequestMockE = {
  authoredOn: '1996-10-16T14:40:51-05:00',
  id: 'b5eb5310-6e55-0136-7849-4a00016726c0',
  medicationCodeableConcept: {
    coding: [{
      code: '665078',
      display: 'Loratadine 5 MG Chewable Tablet',
      system: 'http://www.nlm.nih.gov/research/umls/rxnorm'
    }],
    text: 'Loratadine 5 MG Chewable Tablet'
  },
  status: 'active'
};

export {
  medicationRequestMockA,
  medicationRequestMockB,
  medicationRequestMockC,
  medicationRequestMockD,
  medicationRequestMockE
};