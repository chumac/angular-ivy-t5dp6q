import { EntityState } from '@ngrx/entity';

import { generalAdapter } from './general.adapter';
import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption, IStateSelectOption } from '@nutela/models/core-data';

export interface IGeneralState extends EntityState<IGeneral> {
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

export const initialGeneralState: IGeneralState = generalAdapter.getInitialState(
  {
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
  }
);
