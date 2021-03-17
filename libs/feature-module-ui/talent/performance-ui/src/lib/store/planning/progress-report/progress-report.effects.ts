import { Injectable } from '@angular/core';

import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap, take } from 'rxjs/operators';

import * as constants from '../../../constants';
import {
  ApiService,
  toastOptionsError,
  toastOptionsSuccess
} from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import {
 LoadProgressInfoProgressReport, ProgressReportActionTypes, LoadProgressInfoProgressReportSuccess, SaveProgressDefinition, SaveProgressTransaction, NotProcessingProgressReport, HideProgressDefinitionEditor, HideProgressTransactionEditor, RemoveProgressTransaction, LoadInlineDocumentProgressTransaction, LoadInlineDocumentProgressTransactionSuccess, LoadProgressTransactionInfo, LoadProgressTransactionInfoSuccess, LoadObjectiveMasterDataByIdManageObjectives, LoadObjectiveMasterDataByIdManageObjectivesSuccess, LoadSingleProgressInfoProgressReport, LoadSingleProgressInfoProgressReportSuccess, RemoveProgressDefinition, SaveProgressTransactionSuccess, RemoveProgressTransactionSuccess,
} from './progress-report.actions';
import {
  IObjectiveDto, IPlan, IObjectiveMasterDto, IProgressDefinition
} from '@nutela/models/talent/performance';
import { IPerformanceState } from '../../root/performance.state';
import { IPerspective } from 'libs/models/talent/performance/src/lib/interfaces/perspective.interface';
import { IProgressTransaction } from 'libs/models/talent/performance/src/lib/interfaces/progress-transaction.interface';

@Injectable()
export class ProgressReportEffects {
  constructor(
    private store: Store<IPerformanceState>,
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) { }


  @Effect()
  loadProgressDefinitionInfo$: Observable<Action> = this.actions$
    .ofType<LoadProgressInfoProgressReport>(
      ProgressReportActionTypes.LOAD_PROGRESS_DEFINITION_INFO
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.PROGRESS_REPORT_DATA_URLs.getProgressDefinitionInfo}/${payload}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              // this.store.dispatch(new LoadProgressTransactionInfo(defResult.progress_type_id));
              this.store.dispatch(new NotProcessingProgressReport());
              return new LoadProgressInfoProgressReportSuccess(<IProgressDefinition[]>(
                data.Results
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Progress Report data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );

    @Effect()
    loadSingleProgressDefinitionInfo$: Observable<Action> = this.actions$
      .ofType<LoadSingleProgressInfoProgressReport>(
        ProgressReportActionTypes.LOAD_SINGLE_PROGRESS_DEFINITION_INFO
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService.read(`${constants.PROGRESS_REPORT_DATA_URLs.getObjectiveByIdInfo}/${payload}`).pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadSingleProgressInfoProgressReportSuccess(<IProgressDefinition>(
                  data.Results[0]
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Progress Report data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
        })
      );
  

    @Effect()
    LoadObjectiveMasterDataByIdManageObjectives$: Observable<Action> = this.actions$
      .ofType<LoadObjectiveMasterDataByIdManageObjectives>(
        ProgressReportActionTypes.LOAD_PROGRESS_OBJECTIVE_INFO
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService.read(`${constants.PROGRESS_REPORT_DATA_URLs.getProgressDefinitionInfo}/${payload}`).pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadObjectiveMasterDataByIdManageObjectivesSuccess(<IObjectiveMasterDto>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Progress Report data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
        })
      );

    @Effect()
    loadProgessTransactionInfo$: Observable<Action> = this.actions$
      .ofType<LoadProgressTransactionInfo>(
        ProgressReportActionTypes.LOAD_PROGRESS_TRANSACTION_INFO
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService.read(`${constants.PROGRESS_REPORT_DATA_URLs.getProgressTransactionInfo}/${payload}`).pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadProgressTransactionInfoSuccess(<IProgressTransaction[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Progress Transaction Report data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            })
          );
        })
      );


    @Effect()
    saveProgressDefinition$: Observable<Action> = this.actions$
      .ofType<SaveProgressDefinition>(ProgressReportActionTypes.SAVE_PROGRESS_DEFINITION)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(`${constants.PROGRESS_REPORT_DATA_URLs.createProgressDefinition}`, payload.progressDefData)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                    new NotProcessingProgressReport(),
                    new HideProgressDefinitionEditor(),
                    new LoadProgressInfoProgressReport(payload.progressDefData.objective_id),
                  ]);
                } else {
                  return from([
                    new NotProcessingProgressReport(),
                    new HideProgressDefinitionEditor(),
                    new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingProgressReport(),
                  new HideProgressDefinitionEditor(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
                ])
              )
            );
        })
      );

      @Effect()
      saveProgressTransaction$: Observable<Action> = this.actions$
        .ofType<SaveProgressTransaction>(ProgressReportActionTypes.SAVE_PROGRESS_TRANSACTION)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .create(`${constants.PROGRESS_REPORT_DATA_URLs.createProgressTransaction}`, payload.progressTransData)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                      new SaveProgressTransactionSuccess(),
                      new NotProcessingProgressReport(),
                      new HideProgressTransactionEditor(),
                      // new LoadProgressInfoProgressReport(payload.objectiveId),
                    ]);
                  } else {
                    return from([
                      new NotProcessingProgressReport(),
                      new HideProgressTransactionEditor(),
                      new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new NotProcessingProgressReport(),
                    new HideProgressTransactionEditor(),
                    new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
                  ])
                )
              );
          })
        );

        @Effect()
        removeProgressDefinition$: Observable<Action> = this.actions$
          .ofType<RemoveProgressDefinition>(ProgressReportActionTypes.REMOVE_PROGRESS_DEFINITION)
          .pipe(
            map(action => action.payload),
            switchMap(payload => {
              return this.apiService
                .delete(`${constants.PROGRESS_REPORT_DATA_URLs.removeProgressDefinition}/${payload.recordId}`)
                .pipe(
                  switchMap((data: IApiResult) => {
                    if (data.Success) {
                      return from([
                        new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                        new LoadProgressInfoProgressReport(payload.objectiveId),
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
        removeProgressTransaction$: Observable<Action> = this.actions$
          .ofType<RemoveProgressTransaction>(ProgressReportActionTypes.REMOVE_PROGRESS_TRANSACTION)
          .pipe(
            map(action => action.payload),
            switchMap(payload => {
              return this.apiService
                .delete(`${constants.PROGRESS_REPORT_DATA_URLs.removeProgressTransaction}/${payload.recordId}`)
                .pipe(
                  switchMap((data: IApiResult) => {
                    if (data.Success) {
                      this.store.dispatch(new RemoveProgressTransactionSuccess());
                      return from([
                        new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                        new LoadProgressInfoProgressReport(payload.objectiveId),
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
          loadInlineDocumentProgressTransaction$: Observable<Action> = this.actions$
            .ofType<LoadInlineDocumentProgressTransaction>(ProgressReportActionTypes.LOAD_INLINE_DOCUMENT)
            .pipe(
              map(action => action.payload),
              switchMap(payload => {
                return this.apiService
                  .read(`${constants.PROGRESS_REPORT_DATA_URLs.removeProgressTransaction}/${payload.recordId}`)
                  .pipe(
                    map((data: IApiResult) => {
                      if (data.Success) {
                        let docData = null;
        
                        if (data.Results && data.Results.length > 0) {
                          const result = data.Results[0];
                          docData = this.utilService.getDocumentData(result.data, result.extension);
                        }
        
                        return new LoadInlineDocumentProgressTransactionSuccess(docData);
                      } else {
                        return new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
                      }
                    }),
                    catchError((error: any) =>
                      of(
                        new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
                      )
                    )
                  );
              })
            );




}
