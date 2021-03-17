import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  EducationalInstitutionActionTypes,
  LoadEducationalInstitution,
  LoadEducationalInstitutionSuccess,
  NotProcessingEducationalInstitution,
  HideEditorEducationalInstitution,
  SaveEducationalInstitution,
  UpdateEducationalInstitution,
  DeleteEducationalInstitution,
  LoadNationEducationalInstitution,
  LoadNationEducationalInstitutionSuccess,
  LoadStateEducationalInstitution,
  LoadStateEducationalInstitutionSuccess,
  LoadProfessionalInstitution,
  LoadProfessionalInstitutionSuccess,

} from './educational-institution.actions';
import { ShowToast } from '@nutela/store/shared';
import { IEducationalInstitution } from '@nutela/models/platform/lookup';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ILookupState } from '../../store';

@Injectable()
export class EducationalInstitutionEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<ILookupState>) {}

  @Effect()
  loadEducationalInstitutionData$: Observable<Action> = this.actions$
    .ofType<LoadEducationalInstitution>(EducationalInstitutionActionTypes.LOAD_EDUCATIONAL_INSTITUTION_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url= `${constants.Education_Institutions_URLs.educational}/${payload.countryName}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotProcessingEducationalInstitution());
                return new LoadEducationalInstitutionSuccess(<IEducationalInstitution[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage:'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
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
    loadProfessionInstitutionData$: Observable<Action> = this.actions$
      .ofType<LoadProfessionalInstitution>(EducationalInstitutionActionTypes.LOAD_PROFESSIONAL_INSTITUTION_DATA)
      .pipe(
        switchMap(()=> {
          const url= `${constants.Education_Institutions_URLs.professional}`;
          return this.apiService
            .read(url)
            .pipe(
              map((data: any) => {
                console.log('data', data);
                if (data.Success) {
                  this.store.dispatch(new NotProcessingEducationalInstitution());
                  return new LoadProfessionalInstitutionSuccess(<IEducationalInstitution[]>(
                    data.Results
                  ));
                } else {
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
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
      .ofType<SaveEducationalInstitution>(EducationalInstitutionActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data',payload.data);
          return this.apiService
            .create(constants.Education_Institutions_URLs.add, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingEducationalInstitution(),
                    new HideEditorEducationalInstitution(),
                    new LoadProfessionalInstitution(),
                    new LoadEducationalInstitution({countryName:payload.countryName})
                  ]);
                } else {
                  return from([
                    new NotProcessingEducationalInstitution(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingEducationalInstitution(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateEducationalInstitution>(EducationalInstitutionActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data update',payload.data);
          return this.apiService
            .update(`${constants.Education_Institutions_URLs.update}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingEducationalInstitution(),
                    new HideEditorEducationalInstitution(),
                    new LoadProfessionalInstitution(),
                    new LoadEducationalInstitution({countryName:payload.countryName})
                  ]);
                } else {
                  return from([
                    new NotProcessingEducationalInstitution(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingEducationalInstitution(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteEducationalInstitution>(EducationalInstitutionActionTypes.DELETE)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            console.log(`${constants.Education_Institutions_URLs.delete}/${payload.recordId}`);
            return this.apiService
              .delete(`${constants.Education_Institutions_URLs.delete}/${payload.recordId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                      new LoadProfessionalInstitution(),
                      new LoadEducationalInstitution({countryName:payload.countryName})
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
        loadNationData$: Observable<Action> = this.actions$
          .ofType<LoadNationEducationalInstitution>(EducationalInstitutionActionTypes.LOAD_NATIONALITY_DATA)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.Location_URLs.nationalityData)
                .pipe(
                  map((data: any) => {
                    console.log('data',data);
                    if (data.Success) {
                      return new LoadNationEducationalInstitutionSuccess(<ISelectOption[]>(
                        data.Results
                      ));
                    } else {
                      return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage? data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
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
          loadStateData$: Observable<Action> = this.actions$
            .ofType<LoadStateEducationalInstitution>(EducationalInstitutionActionTypes.LOAD_STATE_DATA)
            .pipe(
              map(action => action.payload),
              switchMap(payload=> {
                return this.apiService
                  .read(`${constants.Location_URLs.stateData}/${payload.countryId}`)
                  .pipe(
                    map((data: any) => {
                      console.log('data',data);
                      if (data.Success) {
                        return new LoadStateEducationalInstitutionSuccess(<ISelectOption[]>(
                          data.Results
                        ));
                      } else {
                        return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage? data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
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

