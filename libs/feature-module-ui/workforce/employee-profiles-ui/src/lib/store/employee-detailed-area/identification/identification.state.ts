
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export interface IIdentificationState {
  approvedData: IIdentification;
  awaitingApprovalData: IIdentification;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  grade:ISelectOption[];
  position:ISelectOption[];
  payGroup:ISelectOption[];
  jobTitle:ISelectOption[];
  actingJobTitle:ISelectOption[];
  paymentMode:ISelectOption[];
  reportsTo:ISelectOption[];
  backupOfficer:ISelectOption[];
}

export const initialIdentificationState: IIdentificationState =  {
  approvedData: null,
  awaitingApprovalData: null,
  isProcessing: false,
  showEditor: false,
  showViewer: false,
  grade:[],
  position:[],
  payGroup:[],
  jobTitle:[],
  actingJobTitle:[],
  paymentMode:[],
  reportsTo:[],
  backupOfficer:[],
}
