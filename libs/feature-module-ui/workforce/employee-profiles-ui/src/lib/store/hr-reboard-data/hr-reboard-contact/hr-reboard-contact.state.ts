import { EntityState } from '@ngrx/entity';

import { hrReboardContactAdapter } from './hr-reboard-contact.adapter';
import { IContact } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption, IStateSelectOption } from '@nutela/models/core-data';

export interface IHrReboardContactState extends EntityState<IContact> {
  data: IContact;
  raStateList: IStateSelectOption[];
  raCityList: ISelectOption[];
  paStateList: IStateSelectOption[];
  paCityList: ISelectOption[];
  nokStateList: IStateSelectOption[];
  nokCityList: ISelectOption[];
  nokPhoto: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  document: any;
  inlineDocument: any;

}

export const initialHrReboardContactState: IHrReboardContactState = hrReboardContactAdapter.getInitialState(
  {
    data: null,
    raStateList: [],
    raCityList: [],
    paStateList: [],
    paCityList: [],
    nokStateList:[],
    nokCityList:[],
    nokPhoto:null,
    isProcessing: false,
    showEditor: false,
    showViewer: false,
    document: null,
    inlineDocument: null,
  }
);
