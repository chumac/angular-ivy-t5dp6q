import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';

export interface IGeneralState {
  approvedData: IGeneral;
  awaitingApprovalData: IGeneral;
  awaitingApprovalDocument: any;
  birthStateList: IStateSelectOption[];
  birthCityList: ISelectOption[];
  stateOfOriginList: IStateSelectOption[];
  lgaList: ISelectOption[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}


export const initialGeneralState: IGeneralState = {
  approvedData: null,
  awaitingApprovalData: null,
  awaitingApprovalDocument: null,
  birthStateList: [],
  birthCityList: [],
  stateOfOriginList: [],
  lgaList: [],
  isProcessing: false,
  showEditor: false,
  showViewer: false
};
