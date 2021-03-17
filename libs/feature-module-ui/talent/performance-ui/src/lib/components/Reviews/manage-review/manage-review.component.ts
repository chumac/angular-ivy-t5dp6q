import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { IPerformanceState } from '../../../store/root';
import { getReportsToEmployeePhoto } from '@nutela/store/modules/workforce/employee-profiles';
import { LoadObjectiveMasterManageReview, LoadingObjectiveMasterManageReview, LoadObjectivesManageReview, getObjectiveMaster, canInitiateReview, getObjectives, InitiateReviewManageReview, getInitiateOrContinueStatus, showViewerManageReview, ShowViewerManageReview, HideViewerManageReview, getPreScoredObjectives, LoadPreScoredObjectivesManageReview } from '../../../store/reviews/manage-review';
import { IObjectiveMaster, IObjective, IPlan } from '@nutela/models/talent/performance';
import { LoadCurrentPlan, getCurrentPlan, isCurrentPlanReady, SetLMStatusProgressDefinition } from '../../../store';
import { take, filter, map } from 'rxjs/operators';
import { ObjectiveMasterViewerComponent } from '../../common';
import { MANAGE_OBJECTIVES_URLs } from '../../../constants';

@Component({
  selector: 'x365-fm-talent-manage-review',
  templateUrl: './manage-review.component.html',
  styleUrls: ['./manage-review.component.scss']
})
export class ManageReviewComponent implements OnInit {
  currentPlan$: Observable<IPlan>;
  isCurrentPlanReady$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  reportsToEmployeePhoto$: Observable<any>;

  objectiveMaster$: Observable<IObjectiveMaster>;
  objectives$: Observable<IObjective[]>;
  preScoredObjectives$: Observable<IObjective[]>;

  initiateOrContinueStatus$: Observable<boolean>;
  canInitiateReview$: Observable<boolean>;

  @ViewChild('viewer') viewer: ObjectiveMasterViewerComponent;

  constructor(private router: Router, private store: Store<IPerformanceState>) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.initSubscriptions();
  }

  storeDispatches() {
    this.store.dispatch(new LoadCurrentPlan());
  }

  storeSelects() {
    this.currentPlan$ = this.store.pipe(select(getCurrentPlan));
    this.isCurrentPlanReady$ = this.store.pipe(select(isCurrentPlanReady));

    this.reportsToEmployeePhoto$ = this.store.pipe(select(getReportsToEmployeePhoto));
    this.objectiveMaster$ = this.store.pipe(select(getObjectiveMaster));
    this.objectives$ = this.store.pipe(select(getObjectives));
    this.preScoredObjectives$ = this.store.pipe(select(getPreScoredObjectives));

    this.initiateOrContinueStatus$ = this.store.pipe(select(getInitiateOrContinueStatus));
    this.canInitiateReview$ = this.store.pipe(select(canInitiateReview));
    this.showViewer$ = this.store.pipe(select(showViewerManageReview));
  }

  private initSubscriptions() {
    this.currentPlan$
      .pipe(filter(plan => plan !== null), take(1))
      .subscribe((plan: IPlan) => {
        if (plan) {
          this.store.dispatch(new LoadingObjectiveMasterManageReview());

          this.store.dispatch(new LoadObjectiveMasterManageReview({ selectedPlan: plan.id }));

          this.store.dispatch(new LoadObjectivesManageReview({ selectedPlan: plan.id }));

          this.store.dispatch(new LoadPreScoredObjectivesManageReview({ selectedPlan: plan.id }));
        }
      });
  }

  onInitiateReview() {
    this.currentPlan$
      .pipe(filter(plan => plan !== null), take(1))
      .subscribe((plan: IPlan) => {
        if (plan) {
          this.store.dispatch(new InitiateReviewManageReview({ selectedPlan: plan.id }));
        }
      });
  }

  onContinueReview() {
    this.onInitiateReview();
  }

  getRowData$(rowId: number): Observable<IObjective> {
    return this.objectives$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerManageReview());
      }
      );
  }

  getPreScoredRowData$(rowId: number): Observable<IObjective> {
    return this.preScoredObjectives$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onViewPreScoredIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getPreScoredRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerManageReview());
      }
      );
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerManageReview());
  }

  onProgressIconClicked(rowId: number) {
    this.gotoProgressReport(rowId);
  }

  gotoProgressReport(objectiveId: number) {
    this.store.dispatch(new SetLMStatusProgressDefinition({ status: false }));
    this.router.navigate([MANAGE_OBJECTIVES_URLs.progressReportUrl, objectiveId], { skipLocationChange: false });
  }
}
