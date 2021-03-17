import { ActionReducerMap } from "@ngrx/store";

import { IRootState } from "./root.state";
import { payDeskReducer } from "../setup/pay-desk";
import { scheduleReducer } from "../schedule";
import { scheduleDetailReducer } from "../schedule-details";
import { pendingScheduleReducer } from "../pending";
import { closedReducer } from "../closed";
import { completedReducer } from "../completed";
import { processingReducer } from "../processing";

export const rootReducer: ActionReducerMap<IRootState> = {
  payDesk: payDeskReducer,
  schedule: scheduleReducer,
  pending: pendingScheduleReducer,
  closed: closedReducer,
  completed: completedReducer,
  processing: processingReducer,
  scheduleDetail: scheduleDetailReducer,
};
