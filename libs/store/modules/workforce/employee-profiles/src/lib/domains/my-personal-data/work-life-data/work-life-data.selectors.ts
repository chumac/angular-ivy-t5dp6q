import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IWorkLifeDataState } from './work-life-data.state';
import { IWorkflowMessage } from '@nutela/models/foundation';
import { IAnniversary } from '@nutela/models/core-data';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { ISecurityRole, IStructureTree } from '@nutela/models/common';

export const getWorkLifeDataState = createFeatureSelector<IWorkLifeDataState>('workLifeData');

const getComprehensiveData = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.ComprehensiveInfo
);

export const getPreviousEmployerData = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.PreviousEmployers
);

export const isLoadingWorkData = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.isLoading
);

export const getEducationData = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.EducationalHistories
);

export const getProfessionalQualificationData = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.ProfessionalQualifications
);

export const getDependantData = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.Dependents
);

export const getBeneficiaryData = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.Beneficiaries
);

export const getPersonalRefereeData = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.PersonalReferees
);

export const getFamilyData = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.FamilyInformation
);

export const getGuarantorData = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.Guarantors
);

export const getWorkflowMessages = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.WorkflowMeassages
);

export const getWorkflowSubmissions = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.WorkFlowSubmissions
);

export const getWorkflowMessageCount = createSelector(
  getWorkflowMessages,
  (list: IWorkflowMessage[]) => {
    if (list) {
      return list.length;
    } else {
      return 0;
    }
  }
);

export const getQueueId = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.queueId
);

export const isAdmin = createSelector(
  getComprehensiveData,
  (data: IComprehensiveData):boolean => {
    if (data && data.is_hr) {
      return true;
    } else {
      return false;
    }
  }
);

export const getSecurityRoles = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState): ISecurityRole[] => state.SecurityRoles
);

export const getSecurityRole = (role: string) => createSelector(
  getSecurityRoles,
  (roles) => {
    return roles.filter(val => val.module === role).shift();
  }
);


export const getToDos = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.Todo
);

export const getAnnouncements = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.Announcement
);

export const getAnniversaries = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState) => state.Anniversary
);

export const getBirthDays = createSelector(getAnniversaries,
  (list: IAnniversary[]) => list.filter(val => val.anniversary_type === 'Birthday')
);

export const getWeddingAnniversaries = createSelector(getAnniversaries,
  (list: IAnniversary[]) => list.filter(val => val.anniversary_type === 'Wedding')
);

export const getWorkAnniversaries = createSelector(getAnniversaries,
  (list: IAnniversary[]) => list.filter(val => val.anniversary_type === 'Work')
);

export const getAnalysisDetail = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState): any => state.analysisDetail
);

export const hasAgreedToPolicy = createSelector(
  getWorkLifeDataState,
  (state: IWorkLifeDataState): any => state.hasAgreed
);
