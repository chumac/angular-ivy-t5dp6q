import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { ApiService,UtilService } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { LoadReport, ApprovalActionTypes, LoadDocument, LoadApprovalPath, LoadApprovalPathSuccess, LoadQueueList, LoadQueueListSuccess, LoadLabelValue, LoadLabelValueSuccess } from './approval.actions';
import { APPROVE_DATA_URLs } from '../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import { IWorkflowApprovalPath } from '@nutela/models/foundation';

@Injectable()
export class ApprovalEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadReport$: Observable<Action> = this.actions$.pipe(
    ofType<LoadReport>(ApprovalActionTypes.LOAD_REPORT),
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${APPROVE_DATA_URLs.report}?msgID=${payload}`).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              return from([
                new ShowToast({title: null, message: 'Loading report ...', type: ToastTypes.INFO}),
                new Download(data.Results[0])
              ]);
            } else {
              return from([ new ShowToast({title: null, message: 'Report not available.', type: ToastTypes.ERROR})]);
            }
          }),
          catchError((error: any) =>
            of(new ShowToast({title: 'Report Could Not Be Loaded', message: 'Something went wrong. Report data could not be loaded.', type: ToastTypes.ERROR}))
          )
        )
      }
    )
  );

  @Effect()
  loadDocument$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDocument>(ApprovalActionTypes.LOAD_DOCUMENT),
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${APPROVE_DATA_URLs.document}?docGuid=${payload.docGuid}.${payload.docExtension}`).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const docData = this.utilService.getDocumentData(data.Results[0], payload.docExtension);

              return from([
                new ShowToast({title: null, message: 'Loading document ...', type: ToastTypes.INFO}),
                new Download(docData)
              ]);
            } else {
              return from([ new ShowToast({title: null, message: 'Document not available.', type: ToastTypes.ERROR})]);
            }
          }),
          catchError((error: any) =>
            of(new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Report data could not be loaded.', type: ToastTypes.ERROR}))
          )
        )
      }
    )
  );

  @Effect()
  loadApprovalPath$: Observable<Action> = this.actions$
    .ofType<LoadApprovalPath>(ApprovalActionTypes.LOAD_APPROVAL_PATH)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${APPROVE_DATA_URLs.workflowApprovalPath}/${payload.msgId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovalPathSuccess(<IWorkflowApprovalPath[]>(data.Results));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR});
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
  loadQueueLists$: Observable<Action> = this.actions$
    .ofType<LoadQueueList>(ApprovalActionTypes.LOAD_QUEUE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${APPROVE_DATA_URLs.queueList}`)
          .pipe(
            map((data: any) => {
              const list=this.utilService.transformToSelectDataList2(data.Results,"id","description","item_count");

              if (data.Success && data.Results) {
                return new LoadQueueListSuccess(<ISelectOption[]>(list));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR});
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
    loadLabelValue$: Observable<Action> = this.actions$
      .ofType<LoadLabelValue>(ApprovalActionTypes.LOAD_LABEL_VALUE)
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService
            .read(`${APPROVE_DATA_URLs.labelValueUrl}/${payload.msgId}`)
            .pipe(
              map((data: any) => {
                const list=this.utilService.transformToSelectDataList(data.Results,"value","field");
                if (data.Success && data.Results) {
                  return new LoadLabelValueSuccess(<ISelectOption[]>(list));
                } else {
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR});
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
}

