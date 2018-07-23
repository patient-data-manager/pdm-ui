const healthRecordMock = {
  Patient: [
    {
      id: 127826653,
      name: [
        {
          use: 'official',
          family: 'Doe',
          given: [
            'John'
          ]
        }
      ],
      gender: 'male',
      resourceType: 'Patient'
    }
  ],
  AllergyIntolerance: [],
  CarePlan: [],
  Condition: [],
  Encounter: [],
  Immunization: [],
  MedicationRequest: [],
  Observation: [],
  Procedure: []
};

export {
  healthRecordMock
};
