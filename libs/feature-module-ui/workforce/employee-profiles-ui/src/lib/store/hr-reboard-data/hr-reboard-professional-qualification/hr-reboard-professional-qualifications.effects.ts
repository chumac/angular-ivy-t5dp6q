import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  HrReboardProfessionalQualificationsActionTypes,
  LoadDataHrReboardProfessionalQualifications,
  LoadDataHrReboardProfessionalQualificationsSuccess,
  SaveHrReboardProfessionalQualifications,
  NotProcessingHrReboardProfessionalQualifications,
  HideEditorHrReboardProfessionalQualifications,
  LoadDocumentHrReboardProfessionalQualifications,
  LoadDocumentHrReboardProfessionalQualificationsSuccess,
  LoadInlineDocumentHrReboardProfessionalQualifications,
  SaveUpdateHrReboardProfessionalQualifications,
  DeleteDataHrReboardProfessionalQualifications,
} from './hr-reboard-professional-qualifications.actions';
import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class HrReboardProfessionalQualificationsEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataHrReboardProfessionalQualifications>(HrReboardProfessionalQualificationsActionTypes.LOAD_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_REBOARD_PROFESSIONAL_QUALIFICATIONS_DATA_URLs.awaitingApprovalData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataHrReboardProfessionalQualificationsSuccess(<IProfessionalQualification[]>(
                  data.Results
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
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveHrReboardProfessionalQualifications>(HrReboardProfessionalQualificationsActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.HR_REBOARD_PROFESSIONAL_QUALIFICATIONS_DATA_URLs.updateAwaitingApprovalData;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingHrReboardProfessionalQualifications(),
                  new HideEditorHrReboardProfessionalQualifications(),
                  new LoadDataHrReboardProfessionalQualifications({ employeeId: payload.employeeId }),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardProfessionalQualifications(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardProfessionalQualifications(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateHrReboardProfessionalQualifications>(HrReboardProfessionalQualificationsActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.HR_REBOARD_PROFESSIONAL_QUALIFICATIONS_DATA_URLs.updateAwaitingApprovalData}/${payload.recordId}`;
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingHrReboardProfessionalQualifications(),
                  new HideEditorHrReboardProfessionalQualifications(),
                  new LoadDataHrReboardProfessionalQualifications({ employeeId: payload.employeeId }),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardProfessionalQualifications(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardProfessionalQualifications(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );


  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataHrReboardProfessionalQualifications>(HrReboardProfessionalQualificationsActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.PROFESSIONAL_QUALIFICATIONS.deleteApprovedData}?proQualificationID=${payload.recordId}&employeeID=${payload.employeeId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataHrReboardProfessionalQualifications({ employeeId: payload.employeeId })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
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
  loadDocument$: Observable<Action> = this.actions$
    .ofType<LoadDocumentHrReboardProfessionalQualifications>(HrReboardProfessionalQualificationsActionTypes.LOAD_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isApproved?`${constants.HR_REBOARD_PROFESSIONAL_QUALIFICATIONS_DATA_URLs.documentApproved}`: constants.HR_REBOARD_PROFESSIONAL_QUALIFICATIONS_DATA_URLs.documentAwaitingApproval;
        return this.apiService
          .read(`${url}/${payload.recordId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                let docData = null;

                if (data.Results && data.Results.length > 0) {
                  const result = data.Results[0];
                  docData = this.utilService.getDocumentData(result.data, result.extension);
                }

                return new LoadDocumentHrReboardProfessionalQualificationsSuccess(docData);
              } else {
                return new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadInlineDocument$: Observable<Action> = this.actions$
    .ofType<LoadInlineDocumentHrReboardProfessionalQualifications>(HrReboardProfessionalQualificationsActionTypes.LOAD_INLINE_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isApproved?`${constants.HR_REBOARD_PROFESSIONAL_QUALIFICATIONS_DATA_URLs.documentApproved}`: constants.HR_REBOARD_PROFESSIONAL_QUALIFICATIONS_DATA_URLs.documentAwaitingApproval;
        return this.apiService
          .read(`${url}/${payload.recordId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                let docData = null;

                if (data.Results && data.Results.length > 0) {
                  const result = data.Results[0];
                  docData = this.utilService.getDocumentData(result.data, result.extension);

                  return new Download(docData);
                } else {
                  return new Download(null);
                }
              } else {
                return new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );
}
