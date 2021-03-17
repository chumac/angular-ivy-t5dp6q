import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPerformanceState } from '../../root';
import { IAppraisalFormsState } from './appraisal-forms.state';
import { getComprehensiveData, IComprehensiveDataState } from '@nutela/store/modules/workforce/employee-profiles';
import { of } from 'rxjs';
// import { getEmployeeName } from '@nutela/store/modules/workforce/employee-profiles';

const getState = createFeatureSelector<IPerformanceState>('performance');
const getAppraisalFormsState = createSelector(getState, (state: IPerformanceState) => state.appraisalForms);

export const getEmployeeReviewForms = createSelector(
  getAppraisalFormsState,
  (state: IAppraisalFormsState) => state.employeeReviewForms
);

export const getPageNavigatorList = createSelector(
  getAppraisalFormsState,
  (state: IAppraisalFormsState) => state.pageNavigatorList
);

export const getSaveContinueDisabledStatus = createSelector(
  getAppraisalFormsState,
  (state: IAppraisalFormsState) => state.saveContinueDisabledStatus
);

export const getReviewWorkflowProcess = createSelector(
  getAppraisalFormsState,
  (state: IAppraisalFormsState) => state.reviewWorkflowProcess
);

export const getComprehensiveDataReviewWorkflowProcess = createSelector(
  getAppraisalFormsState, getComprehensiveData,
  (state: IAppraisalFormsState, employeeData: IComprehensiveDataState) => {
    return {
      reviewWorkflowProcess: state.reviewWorkflowProcess,
      employeeData: employeeData
    };
  }
);

export const getEmployeePageScores = createSelector(
  getAppraisalFormsState,
  (state: IAppraisalFormsState) => state.employeePageScores
);

export const getEmployeeConfirmationStatus = createSelector(
  getAppraisalFormsState,
  (state: IAppraisalFormsState) => state.employeeConfirmationStatus
);
