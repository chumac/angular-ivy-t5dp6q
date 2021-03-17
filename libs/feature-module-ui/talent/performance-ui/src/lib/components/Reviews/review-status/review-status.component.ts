import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { IPerformanceState } from '../../../store/root';
import { IObjectiveMaster } from '@nutela/models/talent/performance';
import { getReportsToEmployeePhoto } from '@nutela/store/modules/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-talent-review-status',
  templateUrl: './review-status.component.html',
  styleUrls: ['./review-status.component.scss']
})
export class ReviewStatusComponent implements OnInit {
  reportsToEmployeePhoto$: Observable<any>;
  objectiveMaster: IObjectiveMaster;

  constructor(private route: ActivatedRoute, private store: Store<IPerformanceState>) { }

  ngOnInit() {
    this.storeSelects();
    this.objectiveMaster = this.route.snapshot.data.reviewStatus;
  }

  storeSelects() {
    this.reportsToEmployeePhoto$ = this.store.pipe(select(getReportsToEmployeePhoto));
  }

  onStartContinueIconClicked(rowId: number) {
    console.log(rowId);
  }

  onReviewIconClicked(rowId: number) {
    console.log(rowId);
  }

  onSubmitIconClicked(rowId: number) {
    console.log(rowId);
  }
}
