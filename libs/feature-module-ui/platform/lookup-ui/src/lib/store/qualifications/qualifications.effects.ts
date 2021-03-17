import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  QualificationActionTypes,
  LoadQualificationData,
  LoadQualificationSuccess,
  SaveQualification,
  NotProcessingQualification,
  HideEditorQualification,
  UpdateQualification,
  DeleteQualification,
  LoadCategory,
  LoadCategorySuccess,

} from './qualifications.actions';
import { ShowToast } from '@nutela/store/shared';
import { IQualifications } from '@nutela/models/platform/lookup';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ILookupState } from '../../store';

@Injectable()
export class QualificationEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<ILookupState>) {}

  @Effect()
  loadQualificationData$: Observable<Action> = this.actions$
    .ofType<LoadQualificationData>(QualificationActionTypes.LOAD_QUALIFICATION_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.Qualifications_URLs.data)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotProcessingQualification());
                return new LoadQualificationSuccess(<IQualifications[]>(
                  data.Results
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
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveQualification>(QualificationActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data',payload.data);
          return this.apiService
            .create(constants.Qualifications_URLs.add, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingQualification(),
                    new HideEditorQualification(),
                    new LoadQualificationData()
                  ]);
                } else {
                  return from([
                    new NotProcessingQualification(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingQualification(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateQualification>(QualificationActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data update',payload.data);
          return this.apiService
            .update(`${constants.Qualifications_URLs.update}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingQualification(),
                    new HideEditorQualification(),
                    new LoadQualificationData()
                  ]);
                } else {
                  return from([
                    new NotProcessingQualification(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingQualification(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );


     @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteQualification>(QualificationActionTypes.DELETE)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            console.log(`${constants.Qualifications_URLs.delete}/${payload.recordId}`);
            return this.apiService
              .delete(`${constants.Qualifications_URLs.delete}/${payload.recordId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                      new LoadQualificationData()
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
        loadCategory$: Observable<Action> = this.actions$
          .ofType<LoadCategory>(QualificationActionTypes.LOAD_CATEGORY_DATA)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.Qualifications_Category_URLs.data)
                .pipe(
                  map((data: any) => {
                    console.log('data',data);
                    if (data.Success && data.Results) {
                      return new LoadCategorySuccess(<ISelectOption[]>(
                        data.Results
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
}

