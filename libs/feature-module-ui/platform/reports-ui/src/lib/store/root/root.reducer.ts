import { ActionReducerMap } from '@ngrx/store';

import { IRootState } from './root.state';
import { reportReducer } from '../report';

export const rootReducer: ActionReducerMap<IRootState> = {
  report: reportReducer
};
