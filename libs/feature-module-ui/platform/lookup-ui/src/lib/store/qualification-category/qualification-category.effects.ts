import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  QualificationCategoryActionTypes,
  LoadQualificationCategoryData,
  LoadQualificationCategorySuccess,
  SaveQualificationCategory,
  NotProcessingQualificationCategory,
  HideEditorQualificationCategory,
  UpdateQualificationCategory,
  DeleteQualificationCategory,
} from './qualification-category.actions';
import { ShowToast } from '@nutela/store/shared';
import { IQualificationCategory } from '@nutela/models/platform/lookup';
import { IApiResult} from '@nutela/models/core-data';
import { ILookupState } from '../../store';

@Injectable()
export class QualificationCategoryEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<ILookupState>) {}

  @Effect()
  loadCategoryData$: Observable<Action> = this.actions$
    .ofType<LoadQualificationCategoryData>(QualificationCategoryActionTypes.LOAD_QUALIFICATION_CATEGORY_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.Qualifications_Category_URLs.data)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotProcessingQualificationCategory());
                return new LoadQualificationCategorySuccess(<IQualificationCategory[]>(
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
      .ofType<SaveQualificationCategory>(QualificationCategoryActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data',payload.data);
          return this.apiService
            .create(constants.Qualifications_Category_URLs.add, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingQualificationCategory(),
                    new HideEditorQualificationCategory(),
                    new LoadQualificationCategoryData()
                  ]);
                } else {
                  return from([
                    new NotProcessingQualificationCategory(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingQualificationCategory(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateQualificationCategory>(QualificationCategoryActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data update',payload.data);
          return this.apiService
            .update(`${constants.Qualifications_Category_URLs.update}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingQualificationCategory(),
                    new HideEditorQualificationCategory(),
                    new LoadQualificationCategoryData()
                  ]);
                } else {
                  return from([
                    new NotProcessingQualificationCategory(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingQualificationCategory(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );


     @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteQualificationCategory>(QualificationCategoryActionTypes.DELETE)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            console.log(`${constants.Qualifications_URLs.delete}/${payload.recordId}`);
            return this.apiService
              .delete(`${constants.Qualifications_Category_URLs.delete}/${payload.recordId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                     new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                     new LoadQualificationCategoryData(),
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
}

