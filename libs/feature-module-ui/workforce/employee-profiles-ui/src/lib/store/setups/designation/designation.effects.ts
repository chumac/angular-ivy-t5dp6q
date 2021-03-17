import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  DesignationSetupActionTypes,
  LoadDataDesignationSetup,
  LoadDataDesignationSetupSuccess,
  SaveDesignationSetup,
  NotProcessingDesignationSetup,
  HideEditorDesignationSetup,
  DeleteDataDesignationSetup,
  AddDesignationSetup,
  NotLoadingDesignationSetup,
  LoadDataAwaitingDesignationSetup,
  LoadDataAwaitingDesignationSetupSuccess,
  LoadDataPositionSelectOptionDesignationSetup,
  LoadDataPositionSelectOptionDesignationSetupSuccess,
} from './designation.actions';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IPersonal, IDesignationDefinition } from '@nutela/models/workforce/employee-profiles';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../root';

@Injectable()
export class DesignationSetupEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService, private store: Store<IEmployeesProfileState>) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataDesignationSetup>(DesignationSetupActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.DESIGNATION_SETUP_URLs.loadApproved)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDesignationSetup())
                return new LoadDataDesignationSetupSuccess(<IDesignationDefinition[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message: (data.error.status == 401) ? data.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDesignationSetup(),
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadAwaitingData$: Observable<Action> = this.actions$
    .ofType<LoadDataAwaitingDesignationSetup>(DesignationSetupActionTypes.LOAD_AWAITING_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.DESIGNATION_SETUP_URLs.loadAwaiting)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDesignationSetup())
                return new LoadDataAwaitingDesignationSetupSuccess(<IDesignationDefinition[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPositionData$: Observable<Action> = this.actions$
    .ofType<LoadDataPositionSelectOptionDesignationSetup>(DesignationSetupActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.DESIGNATION_SETUP_URLs.loadPositions)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'position_id', 'description');
                return new LoadDataPositionSelectOptionDesignationSetupSuccess(<ISelectOption[]>(
                  transformed
                ));
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
  addData$: Observable<Action> = this.actions$
    .ofType<SaveDesignationSetup>(DesignationSetupActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.editMode ? `${constants.DESIGNATION_SETUP_URLs.update}/${payload.recordId}` : constants.DESIGNATION_SETUP_URLs.add;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingDesignationSetup(),
                  new HideEditorDesignationSetup(),
                  new LoadDataDesignationSetup()
                ]);
              } else {
                return from([
                  new NotProcessingDesignationSetup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingDesignationSetup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  // @Effect()
  // saveData$: Observable<Action> = this.actions$
  //   .ofType<SaveDesignationSetup>(DesignationSetupActionTypes.SAVE)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       return this.apiService
  //         .create(, payload.data)
  //         .pipe(
  //           switchMap((data: IApiResult) => {
  //             if (data.Success) {
  //               return from([
  //                 new ShowToast({ title: null, message: `Your data was updated successfully.`, type: ToastTypes.SUCCESS }),
  //                 new NotProcessingDesignationSetup(),
  //                 new HideEditorDesignationSetup(),
  //                 new LoadDataDesignationSetup()
  //               ]);
  //             } else {
  //               return from([
  //                 new NotProcessingDesignationSetup(),
  //                 new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
  //               ]);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             from([
  //               new NotProcessingDesignationSetup(),
  //               new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
  //             ])
  //           )
  //         );
  //     })
  //   );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataDesignationSetup>(DesignationSetupActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.DESIGNATION_SETUP_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataDesignationSetup()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );
}
