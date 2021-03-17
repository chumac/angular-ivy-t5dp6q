import { IComprehensiveData } from './comprehensive-data.interface';
import { IEducation } from './education.interface';
import { IReferee } from './referee.interface';
import { IPreviousEmployer } from './previous-employer.interface';
import { IGuarantor } from './guarantor.interface';
import { IProfessionalQualification } from './professional-qualification.interface';
import { IBeneficiary } from './beneficiaries.interface';
import { IDependant } from './dependant.interface';
import { IFamily } from './family.interface';
import { IWorkflowMessage } from '@nutela/models/foundation';
import { ISecurityRole, IStructureTree } from '@nutela/models/common';

export interface IWorkLifeData {
  isLoading: boolean;
  ComprehensiveInfo: IComprehensiveData;
  EducationalHistories: IEducation[];
  PersonalReferees: IReferee[];
  PreviousEmployers: IPreviousEmployer[];
  Guarantors: IGuarantor[];
  ProfessionalQualifications: IProfessionalQualification[];
  Beneficiaries: IBeneficiary[];
  Dependents: IDependant[];
  FamilyInformation: IFamily[];
  WorkflowMeassages: IWorkflowMessage[];
  WorkFlowSubmissions: IWorkflowMessage[],
  Announcement: any;
  Todo: any;
  Anniversary: any;
  SecurityRoles: ISecurityRole[];
  analysisDetail: any;
}
