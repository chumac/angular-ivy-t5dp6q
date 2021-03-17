import { EntityState } from '@ngrx/entity';

import { reboardContactAdapter } from './reboard-contact.adapter';
import { IContact, IReboardContact } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption, IStateSelectOption } from '@nutela/models/core-data';

export interface IReboardContactState extends EntityState<IContact> {
  data: IReboardContact;
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

export const initialReboardContactState: IReboardContactState = reboardContactAdapter.getInitialState(
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
