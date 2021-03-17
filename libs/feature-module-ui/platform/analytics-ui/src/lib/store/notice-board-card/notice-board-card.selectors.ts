import { createSelector } from '@ngrx/store';

import { IRootState, getRootState} from '../root/root.state';
import { INoticeBoardCardState } from './notice-board-card.state';

const getState = createSelector(getRootState, (state: IRootState) => state.noticeBoardCard);

export const getViewTypeNoticeBoardCard = createSelector(getState, (state: INoticeBoardCardState) => {
  return state.viewType;
} );

export const getAnnouncementsNoticeBoardCard = createSelector(getState, (state: INoticeBoardCardState) => {
  return state.viewType;
} );
