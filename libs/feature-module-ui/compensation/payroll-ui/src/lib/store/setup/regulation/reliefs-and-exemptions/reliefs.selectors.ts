import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IRootState } from '../../../root/root.state';
import { IReliefState } from './reliefs.state';


const getState = createFeatureSelector<IRootState>('payroll');
const getRunState = createSelector(getState, (state: IRootState) => state.relief);

export const getReliefsData = createSelector(
  getRunState,
  (state: IReliefState) => state.reliefsList
);

export const selectedReliefProfileData = createSelector(
  getRunState,
  (state: IReliefState) => state.reliefProfile
);

export const showEditorRelief = createSelector(
  getRunState,
  (state: IReliefState) => state.showEditor
);

export const showEditorAddRelief = createSelector(
  getRunState,
  (state: IReliefState) => state.showAddReliefEditor
);

export const showEditorConfigRelief = createSelector(
  getRunState,
  (state: IReliefState) => state.showConfigReliefEditor
);

export const showViewEditorRelief = createSelector(
  getRunState,
  (state: IReliefState) => state.showViewEditor
);

export const showEditorGradesRelief = createSelector(
  getRunState,
  (state: IReliefState) => state.showGradesReliefEditor
);

export const showEditorPayGroupRelief = createSelector(
  getRunState,
  (state: IReliefState) => state.showPayGroupReliefEditor
);

export const showEditorEmployeeRelief = createSelector(
  getRunState,
  (state: IReliefState) => state.showEmployeeReliefEditor
);

export const isProcessingRelief = createSelector(
  getRunState,
  (state: IReliefState) => state.isProcessing
);

export const isLoadingRelief = createSelector(
  getRunState,
  (state: IReliefState) => state.isLoading
);

export const getStatutoryeliefsData = createSelector(
  getRunState,
  (state: IReliefState) => state.relieStatutory
);

export const getReliefTypesData = createSelector(
  getRunState,
  (state: IReliefState) => state.reliefType
);

export const getuseRuleData = createSelector(
  getRunState,
  (state: IReliefState) => state.useRule
);
export const getReliefCurrencyData = createSelector(
  getRunState,
  (state: IReliefState) => state.reliefCurrencies
);

export const getReliefGradeData = createSelector(
  getRunState,
  (state: IReliefState) => state.reliefGrades
);

export const getByIdReliefGradeData = createSelector(
  getRunState,
  (state: IReliefState) => state.gradeData
);

export const getByIdPaygroupData = createSelector(
  getRunState,
  (state: IReliefState) => state.payGroupData
);


export const getByIdEmployeeData = createSelector(
  getRunState,
  (state: IReliefState) => state.EmployeeData
);

export const getReliefPayGroupData = createSelector(
  getRunState,
  (state: IReliefState) => state.payGroupGrades
);


export const getReliefEmployeeData = createSelector(
  getRunState,
  (state: IReliefState) => state.employee
);

export const showFixedDeductionRelief = createSelector(
  getRunState,
  (state: IReliefState) => state.showFixedDeduction
);

export const getFixedDeductionData = createSelector(
  getRunState,
  (state: IReliefState) => state.fixedDeduction
);

export const getReliefGradeDataList = createSelector(
  getRunState,
  (state: IReliefState) => state.reliefGradeList
);

export const getReliefPayGroupDataList = createSelector(
  getRunState,
  (state: IReliefState) => state.reliefPayGroupList
);

export const getReliefEmployeeDataList = createSelector(
  getRunState,
  (state: IReliefState) => state.reliefEmployeeList
);