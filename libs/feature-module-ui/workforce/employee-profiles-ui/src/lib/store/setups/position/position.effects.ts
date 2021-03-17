import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  PositionSetupActionTypes,
  LoadApprovedDataPositionSetup,
  LoadApprovedDataPositionSetupSuccess,
  LoadAwaitingDataPositionSetup,
  LoadAwaitingDataPositionSetupSuccess,
  SavePositionSetup,
  NotProcessingPositionSetup,
  HideEditorPositionSetup,
  DeleteDataPositionSetup,
  LoadDocumentPositionSetup,
  LoadDocumentPositionSetupSuccess,
  LoadInlineDocumentPositionSetup,
  AddPositionSetup,
  NotLoadingPositionSetup,
  LoadSpecificTypePosition,
  LoadSpecificTypePositionSuccess,
  LoadSpecificStructurePosition,
  LoadSpecificStructurePositionSuccess,
  LoadCostCenterPosition,
  LoadCostCenterPositionSuccess,
  LoadPositionListPosition,
  LoadPositionListPositionSuccess,
  LoadGradeListPosition,
  LoadGradeListPositionSuccess,
  LoadPositionCategoryPosition,
  LoadPositionCategoryPositionSuccess,
  LoadGetStructurePosition,
  LoadGetStructurePositionSuccess
} from './position.actions';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IPositionSetup } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../root';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class PositionSetupEffects {
  constructor(private actions$: Actions,
              private apiService: ApiService,
              private store: Store<IEmployeesProfileState>,
              private utilService: UtilService) { }


  @Effect()
  approvedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataPositionSetup>(PositionSetupActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.POSITION_SETUP_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingPositionSetup());
                return new LoadApprovedDataPositionSetupSuccess(<IPositionSetup[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage :  'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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
  awaitingData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingDataPositionSetup>(PositionSetupActionTypes.LOAD_AWAITING_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.POSITION_SETUP_URLs.awaitingData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingDataPositionSetupSuccess(<IPositionSetup[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage :  'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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
  addData$: Observable<Action> = this.actions$
    .ofType<AddPositionSetup>(PositionSetupActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.POSITION_SETUP_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingPositionSetup(),
                  new HideEditorPositionSetup(),
                  new LoadApprovedDataPositionSetup(),
                  new LoadAwaitingDataPositionSetup()
                ]);
              } else {
                return from([
                  new NotProcessingPositionSetup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPositionSetup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SavePositionSetup>(PositionSetupActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.POSITION_SETUP_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingPositionSetup(),
                  new HideEditorPositionSetup(),
                  new LoadApprovedDataPositionSetup(),
                  new LoadAwaitingDataPositionSetup()
                ]);
              } else {
                return from([
                  new NotProcessingPositionSetup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPositionSetup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataPositionSetup>(PositionSetupActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.POSITION_SETUP_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadApprovedDataPositionSetup(),
                  new LoadAwaitingDataPositionSetup()
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

    @Effect()
    loadSpecificType$: Observable<Action> = this.actions$
    .ofType<LoadSpecificTypePosition>(PositionSetupActionTypes.LOAD_SPECIFIC_TYPE_DATA)
    .pipe(
       switchMap(() => {
       return this.apiService
        .read(constants.POSITION_SETUP_URLs.specificType)
          .pipe(
            map((data: any) => {
             if (data.Success) {
             const system=this.utilService.transformToSelectDataList(data.Results,'analysis_id','description');
              return new LoadSpecificTypePositionSuccess(<ISelectOption[]>(
               system                   ));
               } else {
               return new ShowToast({title: 'Data Could Not Be Loaded', message:data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR});
                }}),
                catchError((error: any) =>
                 of(
                    new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                    )));
                    })
                  );

                  @Effect()
                  loadSpecificStructure$: Observable<Action> = this.actions$
                    .ofType<LoadSpecificStructurePosition>(PositionSetupActionTypes.LOAD_SPECIFIC_STRUCTURE_DATA)
                    .pipe(
                      map(action => action.payload),
                      switchMap(payload => {
                        return this.apiService
                          .read(`${constants.POSITION_SETUP_URLs.specificStructure}/${payload.Id}`)
                          .pipe(
                            map((data: any) => {
                           if (data.Success) {
                             console.log('structurdata ',data);
                            const system=this.utilService.transformToSelectDataList(data.Results,'analysis_det_id','description');
                                return new LoadSpecificStructurePositionSuccess(<ISelectOption[]>(
                                  system                    ));
                              } else {
                                return new ShowToast({title: 'Data Could Not Be Loaded', message:data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR});
                              }
                            }),
                            catchError((error: any) =>
                              of(
                                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                              )
                            )
                          );
                      })
                    );
                    @Effect()
                    loadCostCenter$: Observable<Action> = this.actions$
                      .ofType<LoadCostCenterPosition>(PositionSetupActionTypes.LOAD_COST_CENTER)
                      .pipe(
                        map(action => action.payload),
                        switchMap(payload => {
                          return this.apiService
                            .read(`${constants.POSITION_SETUP_URLs.costCenter}/${payload.analysis_det_id}`)
                            .pipe(
                              map((data: any) => {
                                console.log('cost',data);
                                const system=this.utilService.transformToSelectDataList(data.Results,"analysis_det_id","description");
                                if (data.Success) {
                                  return new LoadCostCenterPositionSuccess(<ISelectOption[]>(
                                    system
                                  ));
                                } else {
                                  return new ShowToast({title: 'Data Could Not Be Loaded',  message:data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR});
                                }
                              }),
                              catchError((error: any) =>
                                of(
                                  new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                                )
                              )
                            );
                        })
                      );

                      @Effect()
                      loadGetStructure$: Observable<Action> = this.actions$
                        .ofType<LoadGetStructurePosition>(PositionSetupActionTypes.LOAD_GET_STRUCTURE_DATA)
                        .pipe(
                          map(action => action.payload),
                          switchMap(payload => {
                            return this.apiService
                              .read(`${constants.TRANSFERS_URLs.getStructure}/${payload.Id}`)
                              .pipe(
                                map((data: any) => {
                                  console.log('detai',data)
                               if (data.Success) {
                                this.store.dispatch(new NotLoadingPositionSetup());
                                  return new LoadGetStructurePositionSuccess((
                                      data.Results[0] ));
                                  } else {
                                    return new ShowToast({title: 'Data Could Not Be Loaded', message:data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR});
                                  }
                                }),
                                catchError((error: any) =>
                                  of(
                                    new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                                  )
                                )
                              );
                          })
                        );

                      @Effect()
                      loadPositionList$: Observable<Action> = this.actions$
                        .ofType<LoadPositionListPosition>(PositionSetupActionTypes.LOAD_POSITION_LIST)
                        .pipe(
                          switchMap(() => {
                            return this.apiService
                              .read(constants.POSITION_SETUP_URLs.positionList)
                              .pipe(
                                map((data: any) => {
                                  console.log('polist',data);
                                  const system=this.utilService.transformToSelectDataList(data.Results,"position_id","description");
                                  if (data.Success) {
                                    return new LoadPositionListPositionSuccess(<ISelectOption[]>(
                                      system
                                    ));
                                  } else {
                                    return new ShowToast({title: 'Data Could Not Be Loaded',  message:data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR});
                                  }
                                }),
                                catchError((error: any) =>
                                  of(
                                    new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                                  )
                                )
                              );
                          })
                        );
                        @Effect()
                        loadGradeList$: Observable<Action> = this.actions$
                          .ofType<LoadGradeListPosition>(PositionSetupActionTypes.LOAD_GRADE_LIST)
                          .pipe(
                            switchMap(()=> {
                              return this.apiService
                                .read(constants.POSITION_SETUP_URLs.gradeList)
                                .pipe(
                                  map((data: any) => {
                                    console.log('gradlist',data);
                                    const system=this.utilService.transformToSelectDataList(data.Results,"grade_id","description");
                                    if (data.Success) {
                                      return new LoadGradeListPositionSuccess(<ISelectOption[]>(
                                        system
                                      ));
                                    } else {
                                      return new ShowToast({title: 'Data Could Not Be Loaded',  message:data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR});
                                    }
                                  }),
                                  catchError((error: any) =>
                                    of(
                                      new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                                    )
                                  )
                                );
                            })
                          );


                          @Effect()
                          loadPositionCategory$: Observable<Action> = this.actions$
                            .ofType<LoadPositionCategoryPosition>(PositionSetupActionTypes.LOAD_POSITION_CATEGORY)
                            .pipe(
                              switchMap(() => {
                                return this.apiService
                                  .read(constants.POSITION_CATEGORY_SETUP_URLs.loadData)
                                  .pipe(
                                    map((data: any) => {
                                    const system=this.utilService.transformToSelectDataList(data.Results,"id","description");
                                    if (data.Success) {
                                      return new LoadPositionCategoryPositionSuccess(<ISelectOption[]>(
                                        system
                                      ));
                                      } else {
                                        return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage :  'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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

}
