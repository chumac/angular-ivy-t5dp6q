import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService, UtilService } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  LoadApprovedDirectTransfer,
  LoadApprovedDirectTransferSuccess,
  LoadAwaitingDirectTransfer,
  LoadAwaitingDirectTransferSuccess,
  TransferActionTypes,
  NotLoadingTransfer,
  LoadImportTransfer,
  LoadImportTransferSuccess,
  SaveDirectTransfer,
  NotProcessingTransfer,
  HideEditorTransfer,
  DeleteTransfer,
  SaveImportTransfer,
  LoadStatusTransfer,
  LoadStatusTransferSuccess,
  LoadBatchTransfer,
  LoadBatchTransferSuccess,
  LoadPositionTransfer,
  LoadPositionTransferSuccess,
  LoadDesignationTransfer,
  LoadDesignationTransferSuccess,
  LoadLocationTransfer,
  LoadLocationTransferSuccess,
  LoadSpecificTypeTransfer,
  LoadSpecificTypeTransferSuccess,
  LoadSpecificStructureTransfer,
  LoadSpecificStructureTransferSuccess,
  LoadCostCenterTransfer,
  LoadCostCenterTransferSuccess,
  LoadCurrentJobTransfer,
  LoadCurrentJobTransferSuccess,
  UpdateDirectTransfer,
  LoadGetStructureTransfer,
  LoadGetStructureTransferSuccess,
  LoadTreeRootTransfer,
  LoadTreeRootTransferSuccess,
  LoadTreeDetailsTransfer,
  LoadTreeDetailsTransferSuccess
} from './transfer.actions';
import { ITransferTransaction, ITransferImportTransaction, ICurrentJob, ICurrentLocation } from "@nutela/models/workforce/employee-profiles";
import * as constants from '../../../constants';
import { IEmployeesProfileState } from '../../root';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class TransferEffects {
  constructor(
    private actions$: Actions,
    private utilService: UtilService,
    private apiService: ApiService,
    private store: Store<IEmployeesProfileState>
  ) { }


  @Effect()
  LoadApprovedDirect$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDirectTransfer>(TransferActionTypes.LOAD_APPROVED_DIRECT)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TRANSFERS_URLs.approved}/${payload.employeeId ? payload.employeeId : ''}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingTransfer())
                return new LoadApprovedDirectTransferSuccess(<ITransferTransaction[]>(
                  data.Results
                ))
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  LoadAwaitingDirect$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingDirectTransfer>(TransferActionTypes.LOAD_AWAITING_DIRECT)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        // const url = payload.employeeId ? `${constants.TRANSFERS_URLs.unApproved}/${payload.employeeId}` : `${constants.TRANSFERS_URLs.unApproved}`;
        return this.apiService
          .read(`${constants.TRANSFERS_URLs.unApproved}/${payload.employeeId ? payload.employeeId : ''}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingTransfer())
                return new LoadAwaitingDirectTransferSuccess(<ITransferTransaction[]>(
                  data.Results
                ))
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  LoadImport$: Observable<Action> = this.actions$
    .ofType<LoadImportTransfer>(TransferActionTypes.LOAD_IMPORT)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.TRANSFERS_URLs.all}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingTransfer())
                return new LoadImportTransferSuccess(<ITransferImportTransaction[]>(
                  data.Results
                ))
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );
  @Effect()
  saveDirect$: Observable<Action> = this.actions$
    .ofType<SaveDirectTransfer>(TransferActionTypes.SAVE_DIRECT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('Saving ...');
        return this.apiService
          .create(constants.TRANSFERS_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingTransfer(),
                  new HideEditorTransfer(),
                  new LoadApprovedDirectTransfer({employeeId: payload.data.employee_id}),
                  new LoadAwaitingDirectTransfer({employeeId: payload.data.employee_id})
                ]);
              } else {
                return from([
                  new NotProcessingTransfer(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTransfer(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateDirect$: Observable<Action> = this.actions$
    .ofType<UpdateDirectTransfer>(TransferActionTypes.UPDATE_DIRECT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.TRANSFERS_URLs.update}/${payload.recordId}`
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingTransfer(),
                  new HideEditorTransfer(),
                  new LoadApprovedDirectTransfer({employeeId: payload.data.employee_id}),
                  new LoadAwaitingDirectTransfer({employeeId: payload.data.employee_id})
                ]);
              } else {
                return from([
                  new NotProcessingTransfer(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTransfer(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteTransfer>(TransferActionTypes.DELETE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.TRANSFERS_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadApprovedDirectTransfer({employeeId: payload.employeeId}),
                  new LoadAwaitingDirectTransfer({employeeId: payload.employeeId})
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  saveImport$: Observable<Action> = this.actions$
    .ofType<SaveImportTransfer>(TransferActionTypes.SAVE_IMPORT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.TRANSFERS_URLs.process}?batch_identifier=${payload.batchId}`;
        return this.apiService
          .read(url)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was Processed successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadImportTransfer(),
                  new NotProcessingTransfer(),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTransfer(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  loadStatus$: Observable<Action> = this.actions$
    .ofType<LoadStatusTransfer>(TransferActionTypes.LOAD_STATUS_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.TRANSFERS_URLs.status)
          .pipe(
            map((data: any) => {
              const system = this.utilService.transformToSelectDataList(data.Results, "id", "description");
              if (data.Success) {
                return new LoadStatusTransferSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadBatch$: Observable<Action> = this.actions$
    .ofType<LoadBatchTransfer>(TransferActionTypes.LOAD_BATCH_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.TRANSFERS_URLs.batch)
          .pipe(
            map((data: any) => {
              const system = this.utilService.transformToSelectDataList(data.Results, "id", "batch_identifier");
              if (data.Success) {
                return new LoadBatchTransferSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPosition$: Observable<Action> = this.actions$
    .ofType<LoadPositionTransfer>(TransferActionTypes.LOAD_POSITION_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.TRANSFERS_URLs.Position)
          .pipe(
            map((data: any) => {
              const system = this.utilService.transformToSelectDataList(data.Results, "position_id", "description");
              if (data.Success) {
                return new LoadPositionTransferSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadDesignation$: Observable<Action> = this.actions$
    .ofType<LoadDesignationTransfer>(TransferActionTypes.LOAD_DESIGNATION_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.TRANSFERS_URLs.designation}/${payload.positionId}`
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const system = this.utilService.transformToSelectDataList(data.Results, "title_id", "description");
              if (data.Success) {
                this.store.dispatch(new NotLoadingTransfer());
                return new LoadDesignationTransferSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadLocation$: Observable<Action> = this.actions$
    .ofType<LoadLocationTransfer>(TransferActionTypes.LOAD_LOCATION_DATA)
    .pipe(
      map(action => action.payload),
      mergeMap(payload => {
        const url = `${constants.TRANSFERS_URLs.location}/${payload.employeeId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadLocationTransferSuccess(<ICurrentLocation>(
                  data.Results[0]
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadSpecificType$: Observable<Action> = this.actions$
    .ofType<LoadSpecificTypeTransfer>(TransferActionTypes.LOAD_SPECIFIC_TYPE_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.TRANSFERS_URLs.specificType)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                const system = this.utilService.transformToSelectDataList(data.Results, 'analysis_id', 'description');
                return new LoadSpecificTypeTransferSuccess(<ISelectOption[]>(
                  system));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadSpecificStructure$: Observable<Action> = this.actions$
    .ofType<LoadSpecificStructureTransfer>(TransferActionTypes.LOAD_SPECIFIC_STRUCTURE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TRANSFERS_URLs.specificStructure}/${payload.Id}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingTransfer());
                const system = this.utilService.transformToSelectDataList(data.Results, 'analysis_det_id', 'description');
                return new LoadSpecificStructureTransferSuccess(<ISelectOption[]>(
                  system));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );
  @Effect()
  loadCostCenter$: Observable<Action> = this.actions$
    .ofType<LoadCostCenterTransfer>(TransferActionTypes.LOAD_COST_CENTER)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TRANSFERS_URLs.costCenter}/${payload.analysis_det_id}`)
          .pipe(
            map((data: any) => {
              this.store.dispatch(new NotLoadingTransfer());
              const system = this.utilService.transformToSelectDataList(data.Results, "analysis_det_id", "description");
              if (data.Success) {
                return new LoadCostCenterTransferSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadGetStructure$: Observable<Action> = this.actions$
    .ofType<LoadGetStructureTransfer>(TransferActionTypes.LOAD_GET_STRUCTURE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TRANSFERS_URLs.getStructure}/${payload.Id}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingTransfer());
                return new LoadGetStructureTransferSuccess((
                  data.Results[0]));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadCurrentJob$: Observable<Action> = this.actions$
    .ofType<LoadCurrentJobTransfer>(TransferActionTypes.LOAD_CURRENT_JOB)
    .pipe(
      map(action => action.payload),
      mergeMap(payload => {
        const url = `${constants.TRANSFERS_URLs.currentJob}/${payload.employeeId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingTransfer());
                return new LoadCurrentJobTransferSuccess(<ICurrentJob>(
                  data.Results[0]
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  LoadTreeRoot$: Observable<Action> = this.actions$
    .ofType<LoadTreeRootTransfer>(TransferActionTypes.LOAD_TREE_ROOT)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.TRANSFERS_URLs.treeRoot}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingTransfer())
                return new LoadTreeRootTransferSuccess(<any[]>(
                  data.Results
                ))
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );
  @Effect()
  LoadTreeDetails$: Observable<Action> = this.actions$
    .ofType<LoadTreeDetailsTransfer>(TransferActionTypes.LOAD_TREE_DETAILS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.TRANSFERS_URLs.treeRoot}/${payload.structureId}`;
        console.log(url);
        return this.apiService
          .read(url)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                if (data.Results.length) {
                  console.log('data', data.Results)
                  this.store.dispatch(new NotLoadingTransfer());
                  return new LoadTreeDetailsTransferSuccess(<any[]>(
                    data.Results
                  ));
                }
                else {
                  this.store.dispatch(new NotLoadingTransfer());
                  return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'No Record Available.', type: ToastTypes.ERROR });
                }
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );
}
