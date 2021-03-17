import { ISelectOption } from '@nutela/models/core-data';

export interface ISelectOptionData {
  id: string;
  Titles: ISelectOption[];
  MaritalStatus: ISelectOption[];
  Nationality: ISelectOption[];
  Gender: ISelectOption[];
  Banks: ISelectOption[];
  BusinessType: ISelectOption[];
  Religion: ISelectOption[];
  RelationshipType: ISelectOption[];
  BeneficiaryRelationshipTypes: ISelectOption[];
  RequirementTypeEducationalLevels: ISelectOption[];
  RequirementTypeQualificationLevels: ISelectOption[];
  RequirementTypeGuarantorLevels: ISelectOption[];
  RequirementTypeFamilyRelationshipLevels: ISelectOption[];
  RequirementTypeEmployerLevels: ISelectOption[];
  DependantRelationshipTypes: ISelectOption[];
  RequirementTypeRefereeLevels: ISelectOption[];
  PFA: ISelectOption[];
  WorkflowEntityList: ISelectOption[];
  WorkflowEntitySourceNameMapList: ISelectOption[];
  EducationalGrades: ISelectOption[];
  Qualifications: ISelectOption[];
  ProfessionalAwards: ISelectOption[];
}
