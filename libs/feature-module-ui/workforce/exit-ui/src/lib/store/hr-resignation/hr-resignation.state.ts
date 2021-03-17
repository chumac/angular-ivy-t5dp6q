
import {
  IResignationSubmitted,
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { ISelectOption } from '@nutela/models/core-data';
import { IQueueItem } from '../../interfaces';

export interface IHrResignationState {
  showEditor
  submittedLetters: IResignationSubmitted[];
  isLoading: boolean;
  isProcessing: boolean;
  document: any;
  resignationTypes: ISelectOption[];
  hrResponseQueue: IQueueItem[];
  reportUrl: any;
}

export const initialHrResignationState: IHrResignationState = {
  showEditor: false,
  submittedLetters: [],
  isLoading: false,
  isProcessing: false,
  document: null,
  resignationTypes: null,
  hrResponseQueue: null,
  reportUrl: null,
};
