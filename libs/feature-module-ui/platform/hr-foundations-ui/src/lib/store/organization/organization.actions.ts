import { Action } from '@ngrx/store';

import { IOrganization } from '@nutela/models/foundation';
import {
  ISelectOption,
  INationalitySelectOption,
  IStateSelectOption
} from '@nutela/models/core-data';

export enum OrganizationActionTypes {
  SHOW_EDITOR = '[ ORGANIZATION] Show Editor',
  HIDE_EDITOR = '[ORGANIZATION] Hide Editor',


  PROCESSING = '[ORGANIZATION] Processing',
  NOT_PROCESSING = '[ORGANIZATION] Not Processing',

  LOAD_ORGANIZATION_DATA = '[ORGANIZATION] Load Organization Data',
  LOAD_ORGANIZATION_DATA_SUCCESS = '[ORGANIZATION] Load Organization Data Success',

  LOAD_STATES = '[ORGANIZATION] Load States',
  LOAD_STATES_READY = '[ORGANIZATION] Load States Ready',

  LOAD_CITIES = '[ORGANIZATION] Load Cities',
  LOAD_CITIES_READY = '[ORGANIZATION] Load Cities Ready',



  SAVE = '[ORGANIZATION] Save',
  SAVE_SUCCESS = '[ORGANIZATION] Save Success',

  DELETE_ORGANIZATION_DATA = '[ORGANIZATION] Delete Awaiting Approval Data',

}

export class ShowEditorOrganization implements Action {
  readonly type = OrganizationActionTypes.SHOW_EDITOR;
}

export class HideEditorOrganization implements Action {
  readonly type = OrganizationActionTypes.HIDE_EDITOR;
}


export class ProcessingOrganization implements Action {
  readonly type = OrganizationActionTypes.PROCESSING;
}

export class NotProcessingOrganization implements Action {
  readonly type = OrganizationActionTypes.NOT_PROCESSING;
}


export class LoadApprovedDataOrganization implements Action {
  readonly type = OrganizationActionTypes.LOAD_ORGANIZATION_DATA;


}

export class LoadApprovedDataOrganizationSuccess implements Action {
  readonly type = OrganizationActionTypes.LOAD_ORGANIZATION_DATA_SUCCESS;

  constructor(public payload: IOrganization[]) {}
}

export class LoadStatesOrganization implements Action {
  readonly type = OrganizationActionTypes.LOAD_STATES ;

  constructor(
    public payload: { selectedCountry: INationalitySelectOption }
  ) {}
}

export class LoadStatesOrganizationReady implements Action {
  readonly type = OrganizationActionTypes.LOAD_STATES_READY;

  constructor(public payload: { stateList: IStateSelectOption[] }) {}
}

export class LoadCitiesOrganization implements Action {
  readonly type = OrganizationActionTypes.LOAD_CITIES;

  constructor(public payload: { selectedState: IStateSelectOption }) {}
}

export class LoadCitiesOrganizationReady implements Action {
  readonly type = OrganizationActionTypes.LOAD_CITIES_READY;

  constructor(public payload: { cityList: ISelectOption[] }) {}
}


export class SaveOrganization implements Action {
  readonly type = OrganizationActionTypes.SAVE;

  constructor(public payload: {data: IOrganization, recordId: number}) {}
}


export class DeleteApprovedDataOrganization implements Action {
  readonly type = OrganizationActionTypes.DELETE_ORGANIZATION_DATA;

  constructor(public payload: {recordId: number}) {}
}


export type OrganizationActions =
  | ShowEditorOrganization
  | HideEditorOrganization
  | ProcessingOrganization
  | NotProcessingOrganization
  | LoadApprovedDataOrganization
  | LoadApprovedDataOrganizationSuccess
  | LoadStatesOrganization
  | LoadStatesOrganizationReady
  | LoadCitiesOrganization
  | LoadCitiesOrganizationReady
  | SaveOrganization
  | DeleteApprovedDataOrganization;
