import { allergyMockA, allergyMockB, allergyMockC, allergyMockD, allergyMockE } from './allergyMocks';
import { conditionMockA, conditionMockB, conditionMockC, conditionMockD, conditionMockE } from './conditionMocks';
import { immunizationMockA, immunizationMockB, immunizationMockC, immunizationMockD } from './immunizationMocks';
import { medicationRequestMockA, medicationRequestMockB, medicationRequestMockC, 
  medicationRequestMockD, medicationRequestMockE } from './medicationRequestMocks';
import { procedureMockA, procedureMockB, procedureMockC, procedureMockD } from './procedureMocks';

const healthRecordMockA = {
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
  AllergyIntolerance: [
    allergyMockA,
    allergyMockB,
    allergyMockC,
    allergyMockD,
    allergyMockE
  ],
  CarePlan: [],
  Condition: [
    conditionMockA,
    conditionMockB,
    conditionMockC,
    conditionMockD,
    conditionMockE
  ],
  Encounter: [],
  Immunization: [
    immunizationMockA,
    immunizationMockB,
    immunizationMockC,
    immunizationMockD
  ],
  MedicationRequest: [
    medicationRequestMockA,
    medicationRequestMockB,
    medicationRequestMockC,
    medicationRequestMockD,
    medicationRequestMockE
  ],
  Observation: [],
  Procedure: [
    procedureMockA,
    procedureMockB,
    procedureMockC,
    procedureMockD
  ]
};

const healthRecordMockB = {
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
  healthRecordMockA,
  healthRecordMockB
};