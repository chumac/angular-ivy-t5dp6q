import { IResignationState } from "../resignation";
import { IResignState } from "../resign";
import { IInterviewState } from "../setup/interview";
import { IChecklistState } from "../setup/checklist";
import { IQueueState } from "../queue/queue.state";
import { IProcessState } from "../process/process.state";
import { IHrProcessState } from "../hr-process/hr-process.state";
import { IHrResignationState } from "../hr-resignation";
import { IHrResponseQueueState } from "../hr-response-queue";

export interface IExitState {
  resign: IResignState,
  resignation: IResignationState,
  hrResignation: IHrResignationState,
  process: IProcessState,
  hrProcess: IHrProcessState,
  queue: IQueueState,
  hrResponseQueue: IHrResponseQueueState,
  interview: IInterviewState,
  checklist: IChecklistState
}

export const initialState: IExitState = {
  resign: null,
  resignation: null,
  hrResignation: null,
  process: null,
  hrProcess: null,
  queue: null,
  hrResponseQueue: null,
  interview: null,
  checklist: null
};
