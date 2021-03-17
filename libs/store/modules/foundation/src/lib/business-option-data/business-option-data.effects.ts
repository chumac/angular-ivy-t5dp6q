import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { ApiService } from '@nutela/core-services';
import * as constants from '@nutela/shared/app-global';

import {
  BusinessOptionDataActionTypes,
  BusinessOptionDataLoadSuccess,
  BusinessOptionDataLoadFailure
} from './business-option-data.actions';
import { IBusinessOption } from '@nutela/models/core-data';

@Injectable()
export class BusinessOptionDataEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$.pipe(
    ofType(BusinessOptionDataActionTypes.LOAD),
    switchMap(() =>
      this.apiService.read(constants.BUSINESS_OPTION_DATA_URLs.getData).pipe(
        switchMap(data => {
          const options = this.getUpdatedOptions(<IBusinessOption[]>data.Results);

          return from([
            new BusinessOptionDataLoadSuccess({options: options})
          ]);
        }),
        catchError((error: any) => of(new BusinessOptionDataLoadFailure(error)))
      )
    )
  );

  getUpdatedOptions(list: IBusinessOption[]): IBusinessOption[] {
    let newList: IBusinessOption[] = [];

    for (let item of list) {
      item.id = item.option_key;
      newList.push(item);
    }

   return newList;
  }
}
