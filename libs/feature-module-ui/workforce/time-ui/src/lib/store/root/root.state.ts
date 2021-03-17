import { createFeatureSelector } from '@ngrx/store';

import { ITimeSheetState } from '../time-sheet';
import { ITimeSheetProjectState } from '../time-sheet-project';

export interface IRootState {
  timeSheet: ITimeSheetState;
  timeSheetProject: ITimeSheetProjectState;
}

export const initialState: IRootState = {
  timeSheet: null,
  timeSheetProject: null
};

export const getRootState = createFeatureSelector<IRootState>('time');
