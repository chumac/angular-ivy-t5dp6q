
import {
  IResignationSubmitted,
  IResponse
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { ISelectOption } from '@nutela/models/core-data';
import { IEmployee } from '@nutela/models/compensation/loans';

export interface IResignationState {
  showEditor: boolean;
  submittedData: IResignationSubmitted[];
  proxyResignations: IResignationSubmitted[];
  processListData: any[];
  responsesData: IResponse[];
  workflowSelectOption: ISelectOption[];
  showViewerResponses: boolean;
  showValidateEditor: boolean;
  isLoading: boolean;
  isProcessing: boolean;
  document: any;
  submitSuccessful: boolean;
  resignationTypes: ISelectOption[];
  mySubordinates: IEmployee[];
  employeeProcessInitiated: boolean;
  numberOfNotifications: number
  myProcessInitiated: boolean;
  interviewStarted: boolean;
}

export const initialResignationState: IResignationState = {
  submittedData: [],
  proxyResignations: [],
  processListData: [],
  responsesData: [],
  workflowSelectOption: null,
  showViewerResponses: false,
  showEditor: false,
  showValidateEditor: false,
  isLoading: false,
  isProcessing: false,
  document: null,
  resignationTypes: null,
  mySubordinates: null,
  submitSuccessful: false,
  employeeProcessInitiated: null,
  numberOfNotifications: null,
  myProcessInitiated: null,
  interviewStarted: null,
};
