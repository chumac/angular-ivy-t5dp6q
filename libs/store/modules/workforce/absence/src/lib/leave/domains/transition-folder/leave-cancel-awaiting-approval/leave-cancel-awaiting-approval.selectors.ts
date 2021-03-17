import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILeaveCancelAwaitingApprovalState } from './leave-cancel-awaiting-approval.state';
import { ISelfServiceState } from '@nutela/store/self-service';

const getSelfServiceState = createFeatureSelector<ISelfServiceState>('self-service');

// export const getLeaveCancelAwaitingApprovalState = createSelector(getSelfServiceState, (state: ISelfServiceState) => state.leaveCancelAwaitingApproval);



