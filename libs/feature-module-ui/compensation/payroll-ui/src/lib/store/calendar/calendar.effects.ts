import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../constants';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  CalendarActionTypes,
  LoadDataCalendar,
  LoadCalendarSuccess,
  NotProcessingCalendar,
  HideEditorCalendar,
  SaveCalendar,
  UpdateCalendar,
  DeleteCalendar,
  NotLoadingCalendar,
  LoadPayrollProfilesCalendar,
  LoadPayrollProfilesCalendarSuccess,
  LoadPayrollProfileListCalendar,
  LoadPayrollProfileListCalendarSuccess,
  LoadSingleCalendar,
  LoadSingleCalendarSuccess,
  ResetProfileCalendar,
  LoadPaygroupListCalendar,
  LoadPaygroupListCalendarSuccess,
  LoadDeductionListCalendar,
  LoadDeductionListCalendarSuccess,
  LoadAllowanceListCalendar,
  LoadAllowanceListCalendarSuccess,

} from './calendar.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IRootState } from '../root/root.state';
import { ICalendar, IProfile, IProfileCalendar } from '@nutela/models/compensation/payroll';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class CalendarEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) { }

  @Effect()
  loadDataCalendar$: Observable<Action> = this.actions$
    .ofType<LoadDataCalendar>(CalendarActionTypes.LOAD_CALENDAR_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.CALENDAR_URLs[payload.workType]}`;
       console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('calend data', data);
              if (data.Success) {
                this.store.dispatch(new NotLoadingCalendar());
                return new LoadCalendarSuccess({workType: payload.workType, data: data.Results});
              } else {
                this.store.dispatch(new NotLoadingCalendar());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingCalendar(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

    @Effect()
    loadSingleCalendar$: Observable<Action> = this.actions$
      .ofType<LoadSingleCalendar>(CalendarActionTypes.LOAD_SINGLE_CALENDAR)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          // const url = `${constants.CALENDAR_URLs.approvedData}`;
          const url=`${constants.CALENDAR_URLs.singleData}/${payload.calendarId}`
         console.log(url)
          return this.apiService
            .read(url)
            .pipe(
              map((data: any) => {
                console.log('single cal', data);
                if (data.Success) {
                  this.store.dispatch(new NotLoadingCalendar());
                  return new LoadSingleCalendarSuccess(<IProfileCalendar[]>(
                    data.Results
                  ));
                } else {
                  this.store.dispatch(new NotLoadingCalendar());
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage:'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR});
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
      .ofType<SaveCalendar>(CalendarActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('data',payload.data);
          return this.apiService
            .create(constants.CALENDAR_URLs.update, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingCalendar(),
                    new HideEditorCalendar(),
                  ]);
                } else {
                  return from([
                    new NotProcessingCalendar(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
            catchError((error: any) =>
              from([
                new NotProcessingCalendar(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateData$: Observable<Action> = this.actions$
    .ofType<UpdateCalendar>(CalendarActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('Saving ...');
        console.log('data update', payload.data);
        return this.apiService
          .update(`${constants.CALENDAR_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingCalendar(),
                  new HideEditorCalendar(),
                ]);
              } else {
                return from([
                  new NotProcessingCalendar(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCalendar(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteCalendar>(CalendarActionTypes.DELETE_CALENDAR_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log(`${constants.CALENDAR_URLs.delete}/${payload.recordId}`);
        return this.apiService
          .delete(`${constants.CALENDAR_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),

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
  resetProfileCalendar$: Observable<Action> = this.actions$
    .ofType<ResetProfileCalendar>(CalendarActionTypes.RESET_PROFILE_CALENDAR)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.CALENDAR_URLs.reset}/${payload.payrollProfileId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new NotProcessingCalendar(),
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),

                ]);
              } else {
                return from([
                  new NotProcessingCalendar(),
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCalendar(),
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  loadPayrollProfileData$: Observable<Action> = this.actions$
    .ofType<LoadPayrollProfilesCalendar>(CalendarActionTypes.LOAD_PAYROLL_PROFILE_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.CALENDAR_URLs.payrollProfiles}`;
        console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success && data.Results) {
                return new LoadPayrollProfilesCalendarSuccess(<IProfile[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadPayrollProfileList$: Observable<Action> = this.actions$
    .ofType<LoadPayrollProfileListCalendar>(CalendarActionTypes.LOAD_PAYROLL_PROFILE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.CALENDAR_URLs.payrollProfileList}`;
        console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              const system = this.utilService.transformToSelectDataList(data.Results, "payroll_profile_id", "description");
              if (data.Success && data.Results) {
                return new LoadPayrollProfileListCalendarSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadAllowanceList$: Observable<Action> = this.actions$
    .ofType<LoadAllowanceListCalendar>(CalendarActionTypes.LOAD_ALLOWANCE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.CALENDAR_URLs.allowanceList}`;
        console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              const system = this.utilService.transformToSelectDataList(data.Results, "allowance_id", "description");
              if (data.Success && data.Results) {
                return new LoadAllowanceListCalendarSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadDeductionList$: Observable<Action> = this.actions$
    .ofType<LoadDeductionListCalendar>(CalendarActionTypes.LOAD_DEDUCTION_LIST)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.CALENDAR_URLs.deductionList)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              const deductions = this.utilService.transformToSelectDataList(data.Results, "deduction_id", "description");
              if (data.Success && data.Results) {
                return new LoadDeductionListCalendarSuccess(<ISelectOption[]>(
                  deductions
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadPaygroupList$: Observable<Action> = this.actions$
    .ofType<LoadPaygroupListCalendar>(CalendarActionTypes.LOAD_PAYGROUP_LIST)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.CALENDAR_URLs.paygroupList)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              const paygroups = this.utilService.transformToSelectDataList(data.Results, "payrgroup_id", "description");
              if (data.Success && data.Results) {
                return new LoadPaygroupListCalendarSuccess(<ISelectOption[]>(
                  paygroups
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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

