
import { IWorkLifeData } from '@nutela/models/workforce/employee-profiles';

export interface IWorkLifeDataState extends IWorkLifeData {
  queueId:number;
  hasAgreed: boolean;
}

export const initialWorkLifeDataState: IWorkLifeDataState = {
  isLoading: false,
  ComprehensiveInfo: null,
  EducationalHistories: [],
  PersonalReferees: [],
  PreviousEmployers: [],
  Guarantors: [],
  ProfessionalQualifications: [],
  Beneficiaries: [],
  Dependents: [],
  FamilyInformation: [],
  WorkflowMeassages: null,
  WorkFlowSubmissions: null,
  Announcement: [],
  Todo: [],
  Anniversary: [],
  SecurityRoles: [],
  analysisDetail: null,
  queueId: null,
  hasAgreed: false
};
