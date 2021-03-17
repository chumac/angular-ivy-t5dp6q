import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ToastService, IndividualConfig } from 'ng-uikit-pro-standard';

import { ToastActionTypes, ShowToast } from './toast.actions';

import { toastOptionsError, toastOptionsSuccess, toastOptionsInformation, toastOptionsWarning } from '@nutela/core-services';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class ToastEffects {
  constructor(private actions$: Actions, private toast: ToastService) {}

  @Effect({dispatch: false})
  showToast$: Observable<any> = this.actions$
    .ofType<ShowToast>(ToastActionTypes.SHOW)
    .pipe(
      map(action => action.payload),
      tap(payload => {
        let config: IndividualConfig = toastOptionsInformation();

        if (payload.type === ToastTypes.SUCCESS) {
          config = toastOptionsSuccess();
        } else if (payload.type === ToastTypes.INFO) {
          config = toastOptionsInformation();
        } else if (payload.type === ToastTypes.WARNING) {
          config = toastOptionsWarning();
        } else if (payload.type === ToastTypes.ERROR) {
          config = toastOptionsError();
        }
        this.toast.show(payload.message, payload.title, config)
      })
    );
}
