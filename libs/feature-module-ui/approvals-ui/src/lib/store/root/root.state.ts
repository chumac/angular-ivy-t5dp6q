
import { createFeatureSelector } from '@ngrx/store';

import { IApprovalState } from '../approval';
import { ILeaveEditState } from '../leave-edit';

export interface IRootState {
  approval: IApprovalState;
  leaveEdit: ILeaveEditState;
}

export const initialState: IRootState = {
  approval: null,
  leaveEdit: null
};

export const getRootState = createFeatureSelector<IRootState>('approvals');
