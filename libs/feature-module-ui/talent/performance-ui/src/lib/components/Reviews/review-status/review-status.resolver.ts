import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// import { Observable } from 'rxjs/internal/Observable';

import { IObjectiveMaster } from '@nutela/models/talent/performance';
import { IPerformanceState } from '../../../store/root';
import { LoadObjectiveMasterReviewStatus, getObjectiveMaster } from '../../../store/reviews/review-status';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { filter } from 'rxjs/internal/operators/filter';
import { take } from 'rxjs/internal/operators/take';

@Injectable()
export class ReviewStatusResolver implements Resolve<IObjectiveMaster> {
  objectiveMaster$: Observable<IObjectiveMaster>;

  constructor(private store: Store<IPerformanceState>) {
    this.objectiveMaster$ = this.store.pipe(select(getObjectiveMaster));
  }


  resolve(route: ActivatedRouteSnapshot): Observable<IObjectiveMaster> {
    const id = Number(route.paramMap.get('id'));

    if (!isNaN(id)) {
      this.store.dispatch(new LoadObjectiveMasterReviewStatus({selectedPlan: id}));
    } else {
      console.log('Invalid data.');     // Stop navigation
    }

    return this.store.pipe(select(getObjectiveMaster),
      filter(data => !!data),
      filter(data => data.approval_status === 1 && data.status === 0),
      take(1));


      // filter(data => data.approval_status === 2 && data.status === 3),



    // return this.store.pipe(select(getObjectiveMaster));
      // .pipe(select(getObjectiveMaster), map(data => data),tap(data => console.log(data)));
      // map(data => data),
//     map(data => data),
    // return this.store.select('profile')
    //     .map(store => store.profileData)
    //     .filter(profileData => !!profileData)
    //     .take(1);
  }
}
