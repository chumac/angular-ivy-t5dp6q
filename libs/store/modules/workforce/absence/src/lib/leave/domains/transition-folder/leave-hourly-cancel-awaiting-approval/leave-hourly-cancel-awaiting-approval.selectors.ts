import { createFeatureSelector } from '@ngrx/store';

import { ISelfServiceState } from '@nutela/store/self-service';

const getSelfServiceState = createFeatureSelector<ISelfServiceState>('self-service');

// export const getLeaveCancelAwaitingApprovalState = createSelector(getSelfServiceState, (state: ISelfServiceState) => state.leaveCancelAwaitingApproval);



