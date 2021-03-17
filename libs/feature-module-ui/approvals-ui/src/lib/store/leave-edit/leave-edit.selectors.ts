import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveEditState } from './leave-edit.state';
import { IRootState, getRootState} from '../root/root.state';


export const getLeaveEditState = createSelector(getRootState, (state: IRootState) => state.leaveEdit);

export const isProcessingLeaveEdit = createSelector(getLeaveEditState, (state: ILeaveEditState) => state.isProcessing );

export const showEditorLeaveEdit = createSelector(getLeaveEditState, (state: ILeaveEditState) => state.showEditor);

export const getLeaveEditData = createSelector(getLeaveEditState, (state: ILeaveEditState) => state.data);


