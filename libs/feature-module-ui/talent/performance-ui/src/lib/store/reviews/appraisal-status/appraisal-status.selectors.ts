import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPerformanceState } from '../../root';
import { IAppraisalStatusState } from './appraisal-status.state';

const getState = createFeatureSelector<IPerformanceState>('performance');
const getAppraisalStatusState = createSelector(getState, (state: IPerformanceState) => state.appraisalStatus);

export const getDataAppraisalStatus = createSelector(getAppraisalStatusState, (state: IAppraisalStatusState) => state.data);
