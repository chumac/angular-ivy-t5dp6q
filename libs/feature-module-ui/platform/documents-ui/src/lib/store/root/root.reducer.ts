import { ActionReducerMap } from '@ngrx/store';

import { IRootState } from './root.state';
import { documentReducer } from '../document';

export const rootReducer: ActionReducerMap<IRootState> = {
  document: documentReducer
};
