import { ActionReducerMap } from '@ngrx/store';

import { IRootState } from './root.state';
import { timeSheetReducer } from '../time-sheet';
import { timeSheetProjectReducer } from '../time-sheet-project';

export const rootReducer: ActionReducerMap<IRootState> = {
  timeSheet: timeSheetReducer,
  timeSheetProject: timeSheetProjectReducer
};
