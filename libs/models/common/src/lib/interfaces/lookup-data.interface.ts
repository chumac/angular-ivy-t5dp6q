import {
  ICountry,
  IReligion,
  IBusinesType,
  IRequirementType,
  IDependentType,
  IAgeLimit,
  IDocMaxSize,
} from '@nutela/models/core-data';
import { IOrganization } from './organization.interface';
import { IPFA } from './pfa.interface';
import { IWorkflowEntity } from '@nutela/models/foundation';
import { IBank } from './bank.interface';
import { IQualification, IEducationalGrade, IProfessionalAward } from '@nutela/models/talent/learning';

export interface ILookupData {
  id: string;
  Titles: string[];
  MaritalStatus: string[];
  Nationality: ICountry;
  Gender: string[];
  BankList: IBank[];
  BusinessType: IBusinesType;
  Religion: IReligion;
  RelationshipType: string[];
  BeneficiaryRelationshipTypes: IRequirementType[];
  RequirementTypeEducationalLevels: IRequirementType[];
  RequirementTypeQualificationLevels: IRequirementType[];
  RequirementTypeGuarantorLevels: IRequirementType[];
  RequirementTypeFamilyRelationshipLevels: IRequirementType[];
  RequirementTypeEmployerLevels: IRequirementType[];
  DependantRelationshipTypes: IDependentType[];
  RequirementTypeRefereeLevels: IRequirementType[];
  OrgInfo: IOrganization;
  pFAUpdateOption: number;
  PFA: IPFA[];
  AgeLimit: IAgeLimit;
  DocMaxSize: IDocMaxSize;
  WorkflowEntityList: IWorkflowEntity[];
  EducationGradeList: IEducationalGrade[];
  QualificationList: IQualification[];
  ProAwardList: IProfessionalAward[];
}
