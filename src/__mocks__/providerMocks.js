const providerMockA = {
  addedOn: null,
  id: 1,
  lastUpdated: undefined,
  name: 'FitBit'
};

const providerMockB = {
  id: 2,
  city: 'Boston',
  name: 'Massachusetts General Hospital',
  state: 'MA',
  street: '123 Boylston Street, P.O. Box 1',
  zip: '00000'
};

const providerMockC = {
  addedOn: '2001-09-16T18:19:22-04:00',
  id: 3,
  lastUpdated: '2018-04-05T18:19:22-04:00',
  name: 'Partners Health Care',
  state: 'MA'
};

const providerMockD = {
  id: 4,
  name: 'Blue Cross Blue Shield',
};

const providerMockE = {
  authorization_endpoint: null,
  base_endpoint: 'https://epicarr.aahs.org/fhir/api/FHIR/DSTU2/',
  city: 'Annapolis',
  client_id: null,
  client_secret: null,
  description: '',
  id: 924063134,
  logo: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  name: 'Anne Arundel Medical Center',
  parent_id: null,
  provider_type: 'smart_epic',
  scopes: null,
  state: 'MD',
  street: '2001 Medical Parkway',
  token_endpoint: null,
  zip: '21401'
};

export {
  providerMockA,
  providerMockB,
  providerMockC,
  providerMockD,
  providerMockE
};
