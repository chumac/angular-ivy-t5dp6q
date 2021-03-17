import { ActionReducerMap } from "@ngrx/store";

import { IExitState } from "./exit.state";
import { queueReducer } from "../queue/queue.reducers";
import { hrProcessReducer } from "../hr-process/hr-process.reducers";
import { hrResignationReducer } from "../hr-resignation/hr-resignation.reducers";
import { processReducer } from "../process/process.reducers";
import { resignReducer } from "../resign/resign.reducers";
import { resignationReducer } from "../resignation/resignation.reducers";
import { hrResponseQueueReducer } from "../hr-response-queue/hr-response-queue.reducers";
import { interviewReducer } from "../setup/interview/interview.reducers";
import { checklistReducer } from "../setup/checklist/checklist.reducers";

export const exitReducer: ActionReducerMap<IExitState> = {
  resign: resignReducer,
  resignation: resignationReducer,
  hrResignation: hrResignationReducer,
  process: processReducer,
  hrProcess: hrProcessReducer,
  queue: queueReducer,
  hrResponseQueue: hrResponseQueueReducer,
  interview: interviewReducer,
  checklist: checklistReducer
};
