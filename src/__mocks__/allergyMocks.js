const allergyMockA = {
  assertedDate: "1996-12-16T14:40:51-05:00",
  category: ["food"],
  clinicalStatus: "active",
  code: {
    coding: [{ system: "http://snomed.info/sct", code: "418689008", display: "Allergy to grass pollen" }],
    text: "Allergy to grass pollen"
  },
  criticality: "low",
  id: "b5e4f040-6e55-0136-7849-4a00016726c0",
  meta: {
    allergy: ["http://standardhealthrecord.org/fhir/StructureDefinition/shr-allergy-AllergyIntolerance"]
  },
  patient: {
    reference: "Patient/5b14691a-d9fe-4a34-b094-e09d7da8d15e"
  },
  resourceType: "AllergyIntolerance",
  type: "allergy",
  verificationStatus: "confirmed",
};

const allergyMockB = {
  assertedDate: "1996-12-16T14:40:51-05:00",
  category: ["food"],
  clinicalStatus: "inactive",
  code: {
    coding: [{ system: "http://snomed.info/sct", code: "419474003", display: "Allergy to mould" }],
    text: "Allergy to mould"
  },
  criticality: "low",
  id: "b6020c30-6e55-0136-7849-4a00016726c0",
  meta: {
    allergy: ["http://standardhealthrecord.org/fhir/StructureDefinition/shr-allergy-AllergyIntolerance"]
  },
  patient: {
    reference: "Patient/5b14691a-d9fe-4a34-b094-e09d7da8d15e"
  },
  resourceType: "AllergyIntolerance",
  type: "allergy",
  verificationStatus: "confirmed",
};

const allergyMockC = {
  assertedDate: "1921-06-16T21:40:51-05:00",
  category: ["food"],
  clinicalStatus: "active",
  code: {
    coding: [{ system: "http://snomed.info/sct", code: "414285001", display: "Allergy to peanuts" }],
    text: "Allergy to peanuts"
  },
  criticality: "high",
  id: "b5e4f040-6e55-0999-7849-4a11116726c0",
  meta: {
    allergy: ["http://standardhealthrecord.org/fhir/StructureDefinition/shr-allergy-AllergyIntolerance"]
  },
  patient: {
    reference: "Patient/5b14691a-d9fe-4a34-b094-e09d7da8d15e"
  },
  resourceType: "AllergyIntolerance",
  type: "allergy",
  verificationStatus: "confirmed",
};

const allergyMockD = {
  assertedDate: "2018-06-18T21:40:51-05:00",
  category: ["food"],
  clinicalStatus: "inactive",
  code: {
    coding: [{ system: "http://snomed.info/sct", code: 	"419199007", display: "Allergy to substance (disorder)" }],
    text: "Allergy to substance (disorder)"
  },
  criticality: "high",
  id: "b5e4f040-6e55-0136-1219-4a11116726c0",
  meta: {
    allergy: ["http://standardhealthrecord.org/fhir/StructureDefinition/shr-allergy-AllergyIntolerance"]
  },
  patient: {
    reference: "Patient/5b14691a-d9fe-4a34-b094-e09d7da8d15e"
  },
  resourceType: "AllergyIntolerance",
  type: "allergy",
  verificationStatus: "confirmed",
};

const allergyMockE = {
  assertedDate: "1939-07-01T10:04:33-04:00",
  category: ["food"],
  clinicalStatus: "active",
  code: {
    coding: [{ system: "http://snomed.info/sct", code: "232347008", display: "Dander (animal) allergy" }],
    text: "Dander (animal) allergy"
  },
  criticality: "low",
  id: "1c675510-70be-0136-784b-4a00016726c0",
  meta: {
    allergy: ["http://standardhealthrecord.org/fhir/StructureDefinition/shr-allergy-AllergyIntolerance"]
  },
  patient: {
    reference: "Patient/5b14691a-d9fe-4a34-b094-e09d7da8d15e"
  },
  resourceType: "AllergyIntolerance",
  type: "allergy",
  verificationStatus: "confirmed",
};


export {
  allergyMockA,
  allergyMockB,
  allergyMockC,
  allergyMockD,
  allergyMockE
};
