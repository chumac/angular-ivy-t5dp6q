
import { IScheduleState } from '../schedule';
import { IPayDeskState } from '../setup/pay-desk';
import { IScheduleDetailState } from '../schedule-details';
import { createFeatureSelector } from '@ngrx/store';
import { IPendingScheduleState } from '../pending/pending.state';
import { IClosedState } from '../closed';
import { ICompletedState } from '../completed';
import { IProcessingState } from '../processing';


export interface IRootState {
  schedule: IScheduleState;
  pending: IPendingScheduleState
  scheduleDetail: IScheduleDetailState;
  payDesk: IPayDeskState;
  closed: IClosedState;
  completed: ICompletedState;
  processing: IProcessingState;

}

export const initialState: IRootState = {
  schedule: null,
  pending: null,
  scheduleDetail: null,
  payDesk: null,
  closed: null,
  completed: null,
  processing: null

};

export const getRootState = createFeatureSelector<IRootState>('payments');
