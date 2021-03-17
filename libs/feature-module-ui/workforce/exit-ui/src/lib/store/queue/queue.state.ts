
import {
  IResignationSubmitted,
  IResponse
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { ISelectOption } from '@nutela/models/core-data';

export interface IQueueState {
  myQueue: any[];
  interviewUrl: string;
  isLoading: boolean;
  isProcessing: boolean;
}

export const initialQueueState: IQueueState = {
  myQueue: [],
  interviewUrl: null,
  isLoading: false,
  isProcessing: false
};
