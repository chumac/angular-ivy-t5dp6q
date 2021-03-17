import { createSelector } from '@ngrx/store';

import { IRootState, getRootState} from '../root/root.state';
import { ITeamLeaveCardState } from './team-leave-card.state';

const getState = createSelector(getRootState, (state: IRootState) => state.teamLeaveCard);

export const getViewTypeTeamLeaveCard = createSelector(getState, (state: ITeamLeaveCardState) => {
  return state.viewType;
} );

export const getLeaveTimeline = createSelector(getState, (state: ITeamLeaveCardState) => {
  return state.data;
} );
