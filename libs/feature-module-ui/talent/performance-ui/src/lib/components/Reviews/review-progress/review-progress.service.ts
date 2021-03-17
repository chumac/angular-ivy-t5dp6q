import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { REVIEW_PROGRESS_DATA_URLs } from '../../../constants';


@Injectable({
  providedIn: 'root'
})
export class ReviewProgressService {

  constructor(private apiService: ApiService) {}

  startAcceptRejectReview(id: number): Observable<IApiResult> {
    return this.apiService.update(`${REVIEW_PROGRESS_DATA_URLs.startAcceptReview}/${id}`, {});
  }
}
