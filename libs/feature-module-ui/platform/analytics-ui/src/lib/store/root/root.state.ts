
import { createFeatureSelector } from '@ngrx/store';

import { IToDoCardState } from '../to-do-card';
import { ITeamLeaveCardState } from '../team-leave-card';
import { INoticeBoardCardState } from '../notice-board-card';

export interface IRootState {
  toDoCard: IToDoCardState;
  teamLeaveCard: ITeamLeaveCardState;
  noticeBoardCard: INoticeBoardCardState
}

export const initialAnalyticsState: IRootState = {
  toDoCard: null,
  teamLeaveCard: null,
  noticeBoardCard: null,
};

export const getRootState = createFeatureSelector<IRootState>('analytics');
