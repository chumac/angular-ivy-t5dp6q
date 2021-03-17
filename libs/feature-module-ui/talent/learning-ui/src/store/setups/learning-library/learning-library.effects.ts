import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { IApiResult } from '@nutela/models/core-data';
import * as constants from '../../../lib/constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  ApplyLearningSaveLibrary,
  LearningLibraryActionTypes,
  EnrollLearningSaveLibrary,
  LoadDataLearningLibrary,
  LoadDataLearningLibrarySuccess,
} from './learning-library.actions';
import { ILearningLibrary } from '@nutela/models/talent/learning';
import { ShowToast } from '@nutela/store/shared';

@Injectable()
export class LearningLibraryEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {
  }

  @Effect()
  loadLearningLibraryData$: Observable<Action> = this.actions$
    .ofType<LoadDataLearningLibrary>(LearningLibraryActionTypes.LOAD_DATA)
    .pipe(
      switchMap(payload => {
        return this.apiService
          .read(constants.LEARNING_LIBRARY_URLs.getLearningLibraryData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataLearningLibrarySuccess(<ILearningLibrary[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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

  // @Effect()
  // applyLibraryData$: Observable<Action> = this.actions$
  //   .ofType<ApplyLearningSaveLibrary>(LearningLibraryActionTypes.CREATE_APPLY)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       return this.apiService
  //         .create(`${constants.LEARNING_LIBRARY_URLs.applyLearningLibraryData}`, payload.data)
  //         .pipe(
  //           switchMap((data: IApiResult) => {
  //             if (data.Success) {
  //               return from([
  //                 new ShowToast({ title: null, message: `Record was applied successfully.`, options: toastOptionsSuccess() }),
  //               ]);
  //             } else {
  //               return from([
  //                 new ShowToast({ title: 'Data Could Not Be Applied', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not Applied.`, options: toastOptionsError() })
  //               ]);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             from([
  //               new ShowToast({ title: 'Data Could Not Be Applied', message: `Something went wrong. Record was not applied.`, options: toastOptionsError() })
  //             ])
  //           )
  //         );
  //     })
  //   );

  //   @Effect()
  // enrollLibraryData$: Observable<Action> = this.actions$
  //   .ofType<EnrollLearningSaveLibrary>(LearningLibraryActionTypes.CREATE_ENROLL)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       return this.apiService
  //         .create(`${constants.LEARNING_LIBRARY_URLs.enrollLearningLibraryData}`, payload.data)
  //         .pipe(
  //           switchMap((data: IApiResult) => {
  //             if (data.Success) {
  //               return from([
  //                 new ShowToast({ title: null, message: `Record was enrolled successfully.`, options: toastOptionsSuccess() }),
  //               ]);
  //             } else {
  //               return from([
  //                 new ShowToast({ title: 'Data Could Not Be Enrolled', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not Enrolled.`, options: toastOptionsError() })
  //               ]);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             from([
  //               new ShowToast({ title: 'Data Could Not Be Enrolled', message: `Something went wrong. Record was not enrolled.`, options: toastOptionsError() })
  //             ])
  //           )
  //         );
  //     })
  //   );

}
