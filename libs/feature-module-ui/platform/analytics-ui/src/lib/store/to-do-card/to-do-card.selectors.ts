import { createSelector } from '@ngrx/store';

import { IRootState, getRootState} from '../root/root.state';
import { IToDoCardState } from './to-do-card.state';

const getState = createSelector(getRootState, (state: IRootState) => state.toDoCard);

export const getViewTypeToDoCard = createSelector(getState, (state: IToDoCardState) => {
  return state.viewType;
} );
