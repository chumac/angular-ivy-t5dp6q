import { EntityState } from '@ngrx/entity';

import { reboardGeneralAdapter } from './reboard-general.adapter';
import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption, IStateSelectOption } from '@nutela/models/core-data';

export interface IReboardGeneralState extends EntityState<IGeneral> {
  data: IGeneral;
  document: any;
  birthStateList: IStateSelectOption[];
  birthCityList: ISelectOption[];
  stateOfOriginList: IStateSelectOption[];
  lgaList: ISelectOption[];
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
}

export const initialReboardGeneralState: IReboardGeneralState = reboardGeneralAdapter.getInitialState(
  {
    data: null,
    document: null,
    birthStateList: [],
    birthCityList: [],
    stateOfOriginList: [],
    lgaList: [],
    isProcessing: false,
    showEditor: false,
    showViewer: false
  }
);
