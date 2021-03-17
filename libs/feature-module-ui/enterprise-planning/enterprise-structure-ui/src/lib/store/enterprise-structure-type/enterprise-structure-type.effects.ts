import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../constants/api-urls/enterprise-structure.constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  EnterpriseStructureTypeActionTypes,
  SaveEnterpriseStructureType,
  NotProcessingEnterpriseStructureType,
  HideEditorEnterpriseStructureType,
  LoadEnterpriseStructureTypes,
  LoadEnterpriseStructureTypesSuccess,
  LoadVirtualLinks,
  LoadVirtualLinksSuccess,
  SaveVirtualLinks,
  HideEditorVirtualLink,
  DeactivateDataEnterpriseStructureType,
  RemoveDataEnterpriseStructureType,
  NotProcessingVirtualLinks,
  SaveUpdateEnterpriseStructureType,
  LoadKnownTypesEnterpriseStructure,
  LoadKnownTypesEnterpriseStructureSuccess
} from './enterprise-structure-type.actions';

import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IVirtualLinkTransform, IEnterpriseStructure } from '../../models/interfaces';
import { EnterpriseStructureUtilService } from '../../services';
import { IAppState } from '@nutela/store/app-state';



@Injectable()
export class EnterpriseStructureTypeEffect {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: EnterpriseStructureUtilService, private store: Store<IAppState>) { }

  @Effect()
  loadEnterpriseStructureTypes$: Observable<Action> = this.actions$
    .ofType<LoadEnterpriseStructureTypes>(EnterpriseStructureTypeActionTypes.LOAD_ENTERPRISE_STRUCTURE_TYPES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.ENTERPRISE_STRUCTURE_DATA_URLs.enterpriseStructureData)
          .pipe(
            map((data: any) => {
              let entStrucTypeTransformed
              if (data.Success && data.Results) {
                entStrucTypeTransformed = this.utilService.transformToSelectDataList(data.Results, 'analysis_id_link', 'description');
                this.store.dispatch(new NotProcessingEnterpriseStructureType());
                return new LoadEnterpriseStructureTypesSuccess(<IEnterpriseStructure[]>(
                  data.Results

                ), <ISelectOption[]>(entStrucTypeTransformed));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  loadKnownTypes$: Observable<Action> = this.actions$
    .ofType<LoadKnownTypesEnterpriseStructure>(EnterpriseStructureTypeActionTypes.LOAD_DATA_KNOWN_TYPES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.ENTERPRISE_STRUCTURE_DATA_URLs.knownTypes)
          .pipe(
            map((data: any) => {
              console.log(data);
              let knownTypesTransformed: ISelectOption[];
              if (data.Success && data.Results) {
                knownTypesTransformed = this.utilService.transformToSelectDataList(data.Results, 'description', 'description');
                this.store.dispatch(new NotProcessingEnterpriseStructureType());
                return new LoadKnownTypesEnterpriseStructureSuccess(<ISelectOption[]>(
                  knownTypesTransformed
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  loadVirtualLinks$: Observable<Action> = this.actions$
    .ofType<LoadVirtualLinks>(EnterpriseStructureTypeActionTypes.LOAD_VIRTUAL_LINKS)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.VIRTUAL_LINKS_DATA_URLs.virtualLinksData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingVirtualLinks());
                const virtualLinksData = this.utilService.transformToVirtualLinksDataList(data.Results, 'VanalysisID.analysis_id', 'VanalysisID.description');
                console.log(virtualLinksData);
                return new LoadVirtualLinksSuccess(<IVirtualLinkTransform[]>(
                  virtualLinksData
                ));
              } else {
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );


  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveEnterpriseStructureType>(EnterpriseStructureTypeActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.ENTERPRISE_STRUCTURE_DATA_URLs.create;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureType(),
                  new HideEditorEnterpriseStructureType(),
                  new LoadEnterpriseStructureTypes()
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureType(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureType(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateEnterpriseStructureType>(EnterpriseStructureTypeActionTypes.SAVE_UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.ENTERPRISE_STRUCTURE_DATA_URLs.update}/${payload.recordId}`
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureType(),
                  new HideEditorEnterpriseStructureType(),
                  new LoadEnterpriseStructureTypes()
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureType(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureType(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveVirtualLinksData$: Observable<Action> = this.actions$
    .ofType<SaveVirtualLinks>(EnterpriseStructureTypeActionTypes.SAVE_VIRTUAL_LINKS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.VIRTUAL_LINKS_DATA_URLs.create}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureType(),
                  new HideEditorVirtualLink(),
                  new LoadEnterpriseStructureTypes()
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureType(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureType(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );


  @Effect()
  deactivateEnterpriseStructureTypeData$: Observable<Action> = this.actions$
    .ofType<DeactivateDataEnterpriseStructureType>(EnterpriseStructureTypeActionTypes.DEACTIVATE_ENTERPRISE_STRUCTURE_TYPE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.ENTERPRISE_STRUCTURE_DATA_URLs.deactivate}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new RemoveDataEnterpriseStructureType({ recordId: payload.recordId }),
                  new LoadEnterpriseStructureTypes()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

}
