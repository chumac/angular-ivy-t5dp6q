import { IQueueItem } from "../../interfaces";

export interface IHrResponseQueueState {
  hrResponseQueue: IQueueItem[];
  interviewUrl: string;
  isLoading: boolean;
  isProcessing: boolean;
}

export const initialHrResponseQueueState: IHrResponseQueueState = {
  hrResponseQueue: [],
  interviewUrl: null,
  isLoading: false,
  isProcessing: false
};
