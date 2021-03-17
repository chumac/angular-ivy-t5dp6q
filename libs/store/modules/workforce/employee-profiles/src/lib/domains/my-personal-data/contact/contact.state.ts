import { EntityState } from '@ngrx/entity';

import { contactAdapter } from './contact.adapter';
import { IContact } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption, IStateSelectOption } from '@nutela/models/core-data';

export interface IContactState extends EntityState<IContact> {
  approvedData: IContact;
  awaitingApprovalData: IContact;
  raStateList: IStateSelectOption[];
  raCityList: ISelectOption[];
  paStateList: IStateSelectOption[];
  paCityList: ISelectOption[];
  nokStateList: IStateSelectOption[];
  nokCityList: ISelectOption[];
  nokPhoto: any;
  awaitingApprovalNokPhoto: any;
  isProcessing: boolean;
  showEditor: boolean;
  showViewer: boolean;
  document: any;
  inlineDocument: any;

}

export const initialContactState: IContactState = contactAdapter.getInitialState(
  {
    approvedData: null,
    awaitingApprovalData: null,
    raStateList: [],
    raCityList: [],
    paStateList: [],
    paCityList: [],
    nokStateList:[],
    nokCityList:[],
    nokPhoto:null,
    awaitingApprovalNokPhoto: null,
    isProcessing: false,
    showEditor: false,
    showViewer: false,
    document: null,
    inlineDocument: null,
  
  }
);
