import { createFeatureSelector } from '@ngrx/store';

import { IReportState } from '../report';

export interface IRootState {
  report: IReportState;
}

export const initialState: IRootState = {
  report: null
};

export const getRootState = createFeatureSelector<IRootState>('report');
