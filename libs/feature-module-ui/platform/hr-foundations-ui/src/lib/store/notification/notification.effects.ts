import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  NotificationActionTypes,
  LoadNotificationData,
  LoadNotificationDataSuccess,
  SaveNotification,
  NotProcessingNotification,
  HideEditorNotification,
  DeleteNotificationData,
  LoadPositionSuccess,
  LoadPosition,
  LoadNotificationTo,
  LoadProcess,
  LoadProcessSuccess,
  LoadNotificationToSuccess,
  NotLoadingNotification,
  LoadRolesNotification,
  LoadRolesNotificationSuccess,

} from './notification.actions';
import {  INotification } from '@nutela/models/foundation';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { IHRFoundationState } from '../root';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class NotificationEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IHRFoundationState>) {}

  @Effect()
  loadNotificationData$: Observable<Action> = this.actions$
    .ofType<LoadNotificationData>(NotificationActionTypes.LOAD_NOTIFICATION_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.NOTIFICATION_URLs.approvedData}/${payload.recordId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                console.log('notificate',data);
                this.store.dispatch(new NotLoadingNotification())
                return new LoadNotificationDataSuccess(<INotification[]>(
                    data.Results
                  ))
              } else {
                this.store.dispatch(new NotLoadingNotification())
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
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
    saveData$: Observable<Action> = this.actions$
    .ofType<SaveNotification>(NotificationActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('data from effect',payload.data);
          const url = constants.NOTIFICATION_URLs.add;
          return this.apiService
            .create(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingNotification(),
                    new HideEditorNotification(),
                    new LoadNotificationData({ recordId: payload.data.sysentity_id})
                  ]);
                } else {
                  return from([
                    new NotProcessingNotification(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingNotification(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteNotificationData>(NotificationActionTypes.DELETE_NOTIFICATION_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .delete(`${constants.NOTIFICATION_URLs.delete}/${payload.recordId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new LoadNotificationData({ recordId: payload.entityId }),
                      new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                    ]);
                  } else {
                    return from([
                      new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                  ])
                )
              );
          })
        );

        @Effect()
        loadPositionData$: Observable<Action> = this.actions$
          .ofType<LoadPosition>(NotificationActionTypes.LOAD_POSITION_DATA)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.WORKFLOW_DETAILS_URLs.positionData)
                .pipe(
                  map((data: any) => {
                    const system=this.utilService.transformToSelectDataList(data.Results,"position_id","description");
                    if (data.Success) {
                      return new LoadPositionSuccess(<ISelectOption[]>(
                        system
                      ));
                    } else {
                      return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                    }
                  }),
                  catchError((error: any) =>
                    of(
                      new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                    )
                  )
                );
            })
          );

        @Effect()
        loadRoles$: Observable<Action> = this.actions$
          .ofType<LoadRolesNotification>(NotificationActionTypes.LOAD_ROLES)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.WORKFLOW_DETAILS_URLs.roleData)
                .pipe(
                  map((data: any) => {
                    const system = this.utilService.transformToSelectDataList(data.Results, "rolename", "rolename");
                    if (data.Success) {
                      return new LoadRolesNotificationSuccess(<ISelectOption[]>(
                        system
                      ));
                    } else {
                      return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                    }
                  }),
                  catchError((error: any) =>
                    of(
                      new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                    )
                  )
                );
            })
          );

          @Effect()
          loadNotificationTo$: Observable<Action> = this.actions$
            .ofType<LoadNotificationTo>(NotificationActionTypes.LOAD_NOTIFICATION_TO)
            .pipe(
              switchMap(() => {
                return this.apiService
                  .read(constants.NOTIFICATION_URLs.notification_to)
                  .pipe(
                    map((data: any) => {
                      const system=this.utilService.transformToSelectDataList(data.Results,"id","description");
                      if (data.Success) {
                        return new LoadNotificationToSuccess(<ISelectOption[]>(
                          system
                        ));
                      } else {
                        return new ShowToast({title: 'Data Could Not Be Loaded', message:data.ErrorMessage? data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                      }
                    }),
                    catchError((error: any) =>
                      of(
                        new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                      )
                    )
                  );
              })
            );


            @Effect()
            loadProcess$: Observable<Action> = this.actions$
              .ofType<LoadProcess>(NotificationActionTypes.LOAD_PROCESS)
              .pipe(
                switchMap(() => {
                  return this.apiService
                    .read(constants.NOTIFICATION_URLs.process)
                    .pipe(
                      map((data: any) => {
                        const system=this.utilService.transformToSelectDataList(data.Results,"id","description");
                        if (data.Success) {
                          return new LoadProcessSuccess(<ISelectOption[]>(
                            system
                          ));
                        } else {
                          return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage? data.ErrorMessage:'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                        }
                      }),
                      catchError((error: any) =>
                        of(
                          new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                        )
                      )
                    );
                })
              );

}
