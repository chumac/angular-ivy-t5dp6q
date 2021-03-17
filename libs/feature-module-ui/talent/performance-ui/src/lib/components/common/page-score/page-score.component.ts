import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/internal/Observable';
import { IEmployeePageScore } from '@nutela/models/talent/performance';

import { IPerformanceState } from '@nutela/feature-module-ui/talent/performance-ui';
import { getEmployeePageScores, ClearEmployeePageScoresAppraisalForms } from '../../../store/reviews/appraisal-forms';

@Component({
  selector: 'x365-fm-talent-page-score',
  templateUrl: './page-score.component.html',
  styleUrls: ['./page-score.component.scss']
})
export class PageScoreComponent implements OnInit {
  pageScores$: Observable<IEmployeePageScore[]>;

  constructor(private store: Store<IPerformanceState>, private dialogRef: MatDialogRef<PageScoreComponent>) { }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.pageScores$ = this.store.pipe(select(getEmployeePageScores));
  }

  onOK() {
    this.store.dispatch(new ClearEmployeePageScoresAppraisalForms());
    this.dialogRef.close();
  }
}
