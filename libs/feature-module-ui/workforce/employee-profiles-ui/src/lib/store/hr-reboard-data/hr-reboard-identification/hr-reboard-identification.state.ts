
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';

export interface IHrReboardIdentificationState {
  data: IIdentification;
  signature: any;
  isProcessing: boolean;
  isLoading: boolean;
  showEditor: boolean;
  showViewer: boolean;
  positionList: ISelectOption[];
  gradeList: ISelectOption[];
  paygroupList: ISelectOption[];
  reportTos: ISelectOption[];
  backupOfficers: ISelectOption[];
  paymentModes: ISelectOption[];
  jobTitles: ISelectOption[];
  actingJobTitles: ISelectOption[]

}

export const initialHrReboardIdentificationState: IHrReboardIdentificationState =  {
  data: null,
  signature: null,
  isProcessing: false,
  isLoading: false,
  showEditor: false,
  showViewer: false,
  positionList: null,
  gradeList: null,
  paygroupList: null,
  reportTos: null,
  backupOfficers: null,
  paymentModes: null,
  jobTitles: null,
  actingJobTitles: null
}
