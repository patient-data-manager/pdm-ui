const procedureMockA = {
  code: {
    coding: [{
      code: '428191000124101',
      display: 'Documentation of current medications',
      system: 'http://snomed.info/sct'
    }],
    text: 'Documentation of current medications'
  },
  id: '3ac29330-70cb-0136-784d-4a00016726c0',
  performedPeriod: {
    end: '2009-08-26T07:55:06-04:00',
    start: '2009-08-26T07:40:06-04:00'
  },
  resourceType: 'Procedure',
  status: 'completed'
};

const procedureMockB = {
  code: {
    coding: [{
      code: '18286008',
      display: 'Catheter ablation of tissue of heart',
      system: 'http://snomed.info/sct'
    }],
    text: 'Catheter ablation of tissue of heart'
  },
  id: '3a88f3f0-70cb-0136-784d-4a00016726c0',
  performedPeriod: {
    end: '2011-09-07T07:55:06-04:00',
    start: '2011-09-07T07:40:06-04:00'
  },
  resourceType: 'Procedure',
  status: 'completed'
};

const procedureMockC = {
  code: {
    coding: [{
      code: '180325003',
      display: 'Electrical cardioversion',
      system: 'http://snomed.info/sct'
    }],
    text: 'Electrical cardioversion'
  },
  id: '39ede360-70cb-0136-784d-4a00016726c0',
  performedPeriod: {
    end: '2016-10-05T07:55:06-04:00',
    start: '2016-10-05T07:55:06-04:00'
  },
  resourceType: 'Procedure',
  status: 'completed'
};

const procedureMockD = {
  code: {
    coding: [{
      code: '73761001',
      display: 'Colonoscopy',
      system: 'http://snomed.info/sct'
    }],
    text: 'Colonoscopy'
  },
  id: '7ca75ba0-70ca-0136-784c-4a00016726c0',
  performedPeriod: {
    end: '2009-10-03T11:19:12-04:00',
    start: '2009-10-03T10:34:15-04:00'
  },
  resourceType: 'Procedure',
  status: 'completed'
};

export {
  procedureMockA,
  procedureMockB,
  procedureMockC,
  procedureMockD
};