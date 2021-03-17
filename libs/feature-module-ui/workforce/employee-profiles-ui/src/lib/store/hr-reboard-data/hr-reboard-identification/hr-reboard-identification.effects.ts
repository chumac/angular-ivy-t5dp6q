import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService } from '@nutela/core-services';

import {
  HrReboardIdentificationActionTypes,
  LoadDataHrReboardIdentification,
  LoadDataHrReboardIdentificationSuccess,
  SaveHrReboardIdentification,
  NotProcessingHrReboardIdentification,
  HideEditorHrReboardIdentification,
  LoadSignatureImageHrReboardIdentification,
  LoadSignatureImageHrReboardIdentificationSuccess,
  LoadPaygroupDataHrReboardIdentification,
  LoadPaygroupDataHrReboardIdentificationSuccess,
  LoadGradeDataHrReboardIdentification,
  LoadGradeDataHrReboardIdentificationSuccess,
  NotLoadingHrReboardIdentification,
  LoadPositionDataHrReboardIdentification,
  LoadPositionDataHrReboardIdentificationSuccess,
  SaveUpdateHrReboardIdentification,
  LoadJobTitleDataHrReboardIdentification,
  LoadPaymentModeDataHrReboardIdentification,
  LoadPaymentModeDataHrReboardIdentificationSuccess,
  LoadStaffListDataHrReboardIdentification,
  LoadStaffListDataHrReboardIdentificationSuccess
} from './hr-reboard-identification.actions';
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { GENERAL, ToastTypes } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../root/employees-profile.state';

@Injectable()
export class HrReboardIdentificationEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataHrReboardIdentification>(HrReboardIdentificationActionTypes.LOAD_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_REBOARD_IDENTIFICATION_DATA_URLs.awaitingApprovalData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataHrReboardIdentificationSuccess(<IIdentification>(
                  data.Results[0]
                ));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
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
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveHrReboardIdentification>(HrReboardIdentificationActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.HR_REBOARD_IDENTIFICATION_DATA_URLs.updateAwaitingApprovalData, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success && data.Results) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardIdentification(),
                  new HideEditorHrReboardIdentification(),
                  new LoadDataHrReboardIdentification({employeeId: payload.employeeId}),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardIdentification(),
                  new ShowToast({ title: 'Data Could Not Be Saved ', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardIdentification(),
                new ShowToast({ title: 'Data Could Not Be Saved ', message: `Something went wrong. Form data could not be saved . Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
  );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateHrReboardIdentification>(HrReboardIdentificationActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.HR_REBOARD_IDENTIFICATION_DATA_URLs.updateAwaitingApprovalData}/${payload.employeeId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success && data.Results) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardIdentification(),
                  new HideEditorHrReboardIdentification(),
                  new LoadDataHrReboardIdentification({employeeId: payload.employeeId}),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardIdentification(),
                  new ShowToast({ title: 'Data Could Not Be Saved ', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardIdentification(),
                new ShowToast({ title: 'Data Could Not Be Saved ', message: `Something went wrong. Form data could not be saved . Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  loadSignatureImageHrReboardIdentification$: Observable<Action> = this.actions$
    .ofType<LoadSignatureImageHrReboardIdentification>(HrReboardIdentificationActionTypes.LOAD_SIGNATURE_IMAGE)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_REBOARD_IDENTIFICATION_DATA_URLs.signatureImage}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const image = `${GENERAL.pngBase64Header}${data.Results[0]}`;
                return new LoadSignatureImageHrReboardIdentificationSuccess(image);
              } else {
                return new LoadSignatureImageHrReboardIdentificationSuccess({});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Signature Image Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadPaygroups$: Observable<Action> = this.actions$
    .ofType<LoadPaygroupDataHrReboardIdentification>(HrReboardIdentificationActionTypes.LOAD_PAYGROUP)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.HR_REBOARD_IDENTIFICATION_DATA_URLs.paygroup}/${payload.gradeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const paygroupsTransformed = this.utilService.transformToSelectDataList(data.Results, 'paygroup_id', 'description');
                this.store.dispatch(new NotLoadingHrReboardIdentification());
                return new LoadPaygroupDataHrReboardIdentificationSuccess(
                  paygroupsTransformed
                );
              } else {
                this.store.dispatch(new NotLoadingHrReboardIdentification());
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingHrReboardIdentification(),
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPaygrades$: Observable<Action> = this.actions$
    .ofType<LoadGradeDataHrReboardIdentification>(HrReboardIdentificationActionTypes.LOAD_GRADE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.HR_REBOARD_IDENTIFICATION_DATA_URLs.grade)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const paygradesTransformed = this.utilService.transformToSelectDataList(data.Results, 'grade_id', 'description');
                this.store.dispatch(new NotLoadingHrReboardIdentification());
                return new LoadGradeDataHrReboardIdentificationSuccess(
                  <ISelectOption[]>paygradesTransformed
                );
              } else {
                this.store.dispatch(new NotLoadingHrReboardIdentification());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingHrReboardIdentification(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPositions$: Observable<Action> = this.actions$
    .ofType<LoadPositionDataHrReboardIdentification>(HrReboardIdentificationActionTypes.LOAD_GRADE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.HR_REBOARD_IDENTIFICATION_DATA_URLs.position)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const positionsTransformed = this.utilService.transformToSelectDataList(data.Results, 'position_id', 'description');
                this.store.dispatch(new NotLoadingHrReboardIdentification());
                return new LoadPositionDataHrReboardIdentificationSuccess(
                  <ISelectOption[]>positionsTransformed
                );
              } else {
                this.store.dispatch(new NotLoadingHrReboardIdentification());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingHrReboardIdentification(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              )
            )
          );
      })
  );


  @Effect()
  loadJobTitle$: Observable<Action> = this.actions$
    .ofType<LoadJobTitleDataHrReboardIdentification>(HrReboardIdentificationActionTypes.HR_LOAD_JOB_TITLES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.HR_REBOARD_IDENTIFICATION_DATA_URLs.jobTitle)
          .pipe(
            map((data: any) => {
              const Title = this.utilService.transformToSelectDataList(data.Results, "title_id", "description");
              if (data.Success && data.Results) {
                return new LoadPositionDataHrReboardIdentificationSuccess(<ISelectOption[]>(
                  Title
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
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
  loadPaymentMode$: Observable<Action> = this.actions$
    .ofType<LoadPaymentModeDataHrReboardIdentification>(HrReboardIdentificationActionTypes.HR_LOAD_PAYMENT_MODES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.HR_REBOARD_IDENTIFICATION_DATA_URLs.paymentMode)
          .pipe(
            map((data: any) => {
              const paymentMode = this.utilService.transformToSelectDataList(data.Results, "description", "description");
              if (data.Success && data.Results) {
                return new LoadPaymentModeDataHrReboardIdentificationSuccess(<ISelectOption[]>(
                  paymentMode
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
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
  loadStaffList$: Observable<Action> = this.actions$
    .ofType<LoadStaffListDataHrReboardIdentification>(HrReboardIdentificationActionTypes.HR_LOAD_STAFF_LIST)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.HR_REBOARD_IDENTIFICATION_DATA_URLs.staffList)
          .pipe(
            map((data: any) => {
              const list = this.utilService.transformToSelectDataList(data.Results, "employee_id", "emp_fullname");
              if (data.Success && data.Results) {
                return new LoadStaffListDataHrReboardIdentificationSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
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
