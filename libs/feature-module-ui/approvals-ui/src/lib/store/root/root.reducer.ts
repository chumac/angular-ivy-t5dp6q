import { ActionReducerMap } from "@ngrx/store";

import { IRootState } from "./root.state";
import { approvalReducer } from "../approval";
import { leaveEditReducer } from "../leave-edit";

export const rootReducer: ActionReducerMap<IRootState> = {
  approval: approvalReducer,
  leaveEdit: leaveEditReducer
};
