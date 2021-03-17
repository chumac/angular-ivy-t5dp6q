import { ActionReducerMap } from "@ngrx/store";

import { IRootState } from "./root.state";
import { toDoCardReducer } from "../to-do-card";
import { teamLeaveCardReducer } from "../team-leave-card";
import { noticeBoardCardReducer } from "../notice-board-card";

export const rootReducer: ActionReducerMap<IRootState> = {
  toDoCard: toDoCardReducer,
  teamLeaveCard: teamLeaveCardReducer,
  noticeBoardCard: noticeBoardCardReducer,
};
