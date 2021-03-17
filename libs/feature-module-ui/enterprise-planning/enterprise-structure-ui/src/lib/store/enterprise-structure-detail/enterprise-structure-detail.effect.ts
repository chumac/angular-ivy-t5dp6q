import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { ApiService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

import {
  EnterpriseStructureDetailActionTypes,
  SaveEnterpriseStructureDetail,
  NotProcessingEnterpriseStructureDetail,
  HideEditorEnterpriseStructureDetail,
  LoadEnterpriseStructureDetails,
  LoadEnterpriseStructureDetailsSuccess,
  LoadPositionsData,
  LoadPositionsDataSuccess,
  DeactivateDataEnterpriseStructureDetail,
  RemoveDataEnterpriseStructureDetail,
  SaveEnterpriseStructureDetailPromote,
  HidePromoterEnterpriseStructureDetail,
  SaveEnterpriseStructureDetailDemote,
  ShareCodeEnterpriseStructureDetail,
  RemoveAllEmployeesFromDetail,
  SaveUpdateEnterpriseStructureDetail,
  HideEditorSharedCode,
  SaveEnterpriseStructureDetailReconnect,
  HideEditorConnectEnterpriseStructureDetail,
  HideEditorConnectChildrenEnterpriseStructureDetail,
  ChangeStructureTypeEnterpriseStructureDetail,
  AddCostCentres,
  RemoveCostCentres,
  HideEditorAddCostCentreEnterpriseStructureDetail,
  LoadCostCentresData,
  LoadCostCentresDataSuccess,
  LoadByIdCostCentresData,
  LoadByIdCostCentresDataSuccess,
  SaveEnterpriseStructureDetailReconnectChildren,
  HideEditorRemoveCostCentreEnterpriseStructureDetail,
  LoadEnterpriseStructureLink,
  LoadEnterpriseStructureLinkSuccess
} from './enterprise-structure-detail.action';

import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import * as constants from '../../constants/api-urls/enterprise-structure.constants';
import { EnterpriseStructureUtilService } from '../../services';
import { ICostCentreTransform } from '../../models/interfaces';
import { IEnterpriseStructureState } from '../root/enterprise-structure-root.state';


@Injectable()
export class EnterpriseStructureDetailEffect {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: EnterpriseStructureUtilService,
    private store: Store<IEnterpriseStructureState>
  ) { }

  @Effect()
  loadEnterpriseStructureDetails$: Observable<Action> = this.actions$
    .ofType<LoadEnterpriseStructureDetails>(EnterpriseStructureDetailActionTypes.LOAD_ENTERPRISE_STRUCTURE_DETAILS)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.ENTERPRISE_STRUCTURE_DETAILS_DATA_URLs.singleEnterpriseStructureDetailData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingEnterpriseStructureDetail());
                return new LoadEnterpriseStructureDetailsSuccess(
                  data.Results
                );
              } else {
                this.store.dispatch(new NotProcessingEnterpriseStructureDetail());
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  loadEnterpriseStructureLink$: Observable<Action> = this.actions$
    .ofType<LoadEnterpriseStructureLink>(EnterpriseStructureDetailActionTypes.LOAD_ENTERPRISE_STRUCTURE_LINK)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.ENTERPRISE_STRUCTURE_DETAILS_DATA_URLs.getSingleByIdLink}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const analysisDetail = this.utilService.transformToSelectDataList(data.Results[0].analysisDetailsInfo, 'analysis_det_id', 'description');
                new NotProcessingEnterpriseStructureDetail();
                return new LoadEnterpriseStructureLinkSuccess(<ISelectOption[]>(
                  analysisDetail
                ));
              } else {
                this.store.dispatch(new NotProcessingEnterpriseStructureDetail());
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  loadCostCentresById$: Observable<Action> = this.actions$
    .ofType<LoadByIdCostCentresData>(EnterpriseStructureDetailActionTypes.LOAD_BY_ID_COST_CENTRES)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.MANAGE_ENTERPRISE_STRUCTURE_DETAIL_URLs.getCostCentresById}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const costCentres = this.utilService.transformCostCentresList(data.Results, 'cost_centre_template_detail_id', 'description');
                new NotProcessingEnterpriseStructureDetail();
                return new LoadByIdCostCentresDataSuccess(<ICostCentreTransform[]>(
                  costCentres
                ));
              } else {
                this.store.dispatch(new NotProcessingEnterpriseStructureDetail());
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  loadPositions$: Observable<Action> = this.actions$
    .ofType<LoadPositionsData>(EnterpriseStructureDetailActionTypes.LOAD_POSITIONS_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.ENTERPRISE_STRUCTURE_DETAILS_DATA_URLs.positions)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const positionOptions = this.utilService.transformToSelectDataList(data.Results, 'position_id', 'description');
                new NotProcessingEnterpriseStructureDetail();
                return new LoadPositionsDataSuccess(<ISelectOption[]>(
                  positionOptions
                ));
              } else {
                this.store.dispatch(new NotProcessingEnterpriseStructureDetail());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  loadCostCentres$: Observable<Action> = this.actions$
    .ofType<LoadCostCentresData>(EnterpriseStructureDetailActionTypes.LOAD_COST_CENTRES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.MANAGE_ENTERPRISE_STRUCTURE_DETAIL_URLs.getCostCentres)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const costCentres = this.utilService.transformCostCentresList(data.Results, 'id', 'description');
                new NotProcessingEnterpriseStructureDetail();
                return new LoadCostCentresDataSuccess(<ICostCentreTransform[]>(
                  costCentres
                ));
              } else {
                this.store.dispatch(new NotProcessingEnterpriseStructureDetail());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveEnterpriseStructureDetail>(EnterpriseStructureDetailActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.ENTERPRISE_STRUCTURE_DETAILS_DATA_URLs.create, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureDetail(),
                  new HideEditorEnterpriseStructureDetail(),
                  // new LoadEnterpriseStructureDetails({ recordId: this.structureId })
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  changeStructureType$: Observable<Action> = this.actions$
    .ofType<ChangeStructureTypeEnterpriseStructureDetail>(EnterpriseStructureDetailActionTypes.CHANGE_STRUCTURE_TYPE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.MANAGE_ENTERPRISE_STRUCTURE_DETAIL_URLs.ChangeType}/${payload.currentType}/${payload.newType}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureDetail(),
                  new HideEditorEnterpriseStructureDetail(),
                  // new LoadEnterpriseStructureDetails({ recordId: this.structureId })
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  removeAllEmployees$: Observable<Action> = this.actions$
    .ofType<RemoveAllEmployeesFromDetail>(EnterpriseStructureDetailActionTypes.REMOVE_ALL_EMPLOYEES)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.MANAGE_ENTERPRISE_STRUCTURE_DETAIL_URLs.removeAllEmployees}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Employees have been successfully removed.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureDetail(),
                  // new LoadEnterpriseStructureDetails({ recordId: this.structureId })
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Removed', message: `Something went wrong. Action could not be carried out. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  shareCode$: Observable<Action> = this.actions$
    .ofType<ShareCodeEnterpriseStructureDetail>(EnterpriseStructureDetailActionTypes.SHARE_CODE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.MANAGE_ENTERPRISE_STRUCTURE_DETAIL_URLs.shareCode}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Shared code was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureDetail(),
                  new HideEditorSharedCode(),
                  // new LoadEnterpriseStructureDetails({ recordId: this.structureId })
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureDetail(),
                  new ShowToast({ title: 'Data Could Not Be Shared', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Shared code data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Shared', message: `Something went wrong. Action could not be carried out. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  addCostCentres$: Observable<Action> = this.actions$
    .ofType<AddCostCentres>(EnterpriseStructureDetailActionTypes.ADD_COST_CENTRES)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.MANAGE_ENTERPRISE_STRUCTURE_DETAIL_URLs.addCostCentre}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureDetail(),
                  new HideEditorAddCostCentreEnterpriseStructureDetail(),
                  // new LoadEnterpriseStructureDetails({ recordId: this.structureId })
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureDetail(),
                  new ShowToast({ title: 'Data Could Not Be Shared', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Shared', message: `Something went wrong. Action could not be carried out. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );
  @Effect()
  removeCostCentres$: Observable<Action> = this.actions$
    .ofType<RemoveCostCentres>(EnterpriseStructureDetailActionTypes.REMOVE_COST_CENTRES)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.MANAGE_ENTERPRISE_STRUCTURE_DETAIL_URLs.removeCostCentre}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureDetail(),
                  new LoadByIdCostCentresData({ recordId: payload.recordId }),
                  new HideEditorRemoveCostCentreEnterpriseStructureDetail(),
                  // new LoadEnterpriseStructureDetails({ recordId: this.structureId })
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureDetail(),
                  new ShowToast({ title: 'Data Could Not Be Shared', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Shared', message: `Something went wrong. Action could not be carried out. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveReconnect$: Observable<Action> = this.actions$
    .ofType<SaveEnterpriseStructureDetailReconnect>(EnterpriseStructureDetailActionTypes.SAVE_RECONNECT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.MANAGE_ENTERPRISE_STRUCTURE_DETAIL_URLs.reconnectTo}/${payload.recordId}/${payload.destinationId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                // this.utilService.updateManagedStructure(this.structureId);
                return from([
                  new ShowToast({ title: null, message: `Shared code was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureDetail(),
                  new HideEditorConnectEnterpriseStructureDetail(),
                  // new LoadEnterpriseStructureDetails({ recordId: this.structureId }),
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureDetail(),
                  new ShowToast({ title: 'Data Could Not Be Shared', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Shared code data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Shared', message: `Something went wrong. Action could not be carried out. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveReconnectChildren$: Observable<Action> = this.actions$
    .ofType<SaveEnterpriseStructureDetailReconnectChildren>(EnterpriseStructureDetailActionTypes.SAVE_RECONNECT_CHILDREN)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.MANAGE_ENTERPRISE_STRUCTURE_DETAIL_URLs.reconnectChildren}/${payload.analysisDetailId}/${payload.destinationId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureDetail(),
                  new HideEditorConnectChildrenEnterpriseStructureDetail(),
                  // new LoadEnterpriseStructureDetails({ recordId: this.structureId })
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Action could not be carried out. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  savePromotedData$: Observable<Action> = this.actions$
    .ofType<SaveEnterpriseStructureDetailPromote>(EnterpriseStructureDetailActionTypes.SAVE_PROMOTE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.ENTERPRISE_STRUCTURE_DETAILS_DATA_URLs.promote}/${payload.recordId}/${payload.destinationId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureDetail(),
                  new HidePromoterEnterpriseStructureDetail(),
                  // new LoadEnterpriseStructureDetails({ recordId: this.structureId })
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveDemotedData$: Observable<Action> = this.actions$
    .ofType<SaveEnterpriseStructureDetailDemote>(EnterpriseStructureDetailActionTypes.SAVE_DEMOTE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.ENTERPRISE_STRUCTURE_DETAILS_DATA_URLs.demote}/${payload.recordId}/${payload.destinationId}/${payload.orphanParentId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureDetail(),
                  new HidePromoterEnterpriseStructureDetail()
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateEnterpriseStructureDetail>(EnterpriseStructureDetailActionTypes.SAVE_UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.ENTERPRISE_STRUCTURE_DETAILS_DATA_URLs.update}/${payload.recordId}`
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingEnterpriseStructureDetail(),
                  new HideEditorEnterpriseStructureDetail(),
                  // new LoadEnterpriseStructureDetails({ recordId: this.structureId })
                ]);
              } else {
                return from([
                  new NotProcessingEnterpriseStructureDetail(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEnterpriseStructureDetail(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deactivateEnterpriseStructureTypeData$: Observable<Action> = this.actions$
    .ofType<DeactivateDataEnterpriseStructureDetail>(EnterpriseStructureDetailActionTypes.DEACTIVATE_ENTERPRISE_STRUCTURE_DETAIL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        // console.log('Structure id from effect', this.structureId);
        return this.apiService
          .update(`${constants.ENTERPRISE_STRUCTURE_DETAILS_DATA_URLs.deactivate}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record has been deactivated successfully.`, options: toastOptionsSuccess() }),
                  // new LoadEnterpriseStructureDetails({ recordId: this.structureId })
                  // new RemoveDataEnterpriseStructureDetail({ recordId: payload.recordId })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deactivated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deactivated.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deactivated', message: `Something went wrong. Record was not deactivated.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

}
