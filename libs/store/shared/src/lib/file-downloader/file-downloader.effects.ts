import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { FileDownloaderActionTypes, Download } from './file-downloader.actions';

@Injectable()
export class FileDownloaderEffects {
  constructor(private actions$: Actions) {}

  @Effect({dispatch: false})
  download$:Observable<any> = this.actions$
    .ofType<Download>(FileDownloaderActionTypes.DOWNLOAD)
    .pipe(
      map(action => action.payload),
      tap(payload => {
        if (payload) {
          window.open(payload, '_blank');
        }
      })
    );
}
