import { IContact } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption, IStateSelectOption } from '@nutela/models/core-data';

export interface IContactState {
  approvedData: IContact;
  awaitingApprovalData: IContact;
  raStateList: IStateSelectOption[];
  raCityList: ISelectOption[];
  paStateList: IStateSelectOption[];
  paCityList: ISelectOption[];
  nokStateList: IStateSelectOption[];
  nokCityList: ISelectOption[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialContactState: IContactState = {
  approvedData: null,
  awaitingApprovalData: null,
  raStateList: [],
  raCityList: [],
  paStateList: [],
  paCityList: [],
  nokStateList: [],
  nokCityList: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false
}