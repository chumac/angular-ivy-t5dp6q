
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { filter, take, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { IPlan, IReviewWorkflowProcess } from '@nutela/models/talent/performance';
import { IPerformanceState } from '../../../store/root';
import { LoadCurrentPlan, getCurrentPlan } from '../../../store';
import { getDataModerationQueue, LoadDataModerationQueue } from '../../../store/queues/moderation-queue';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { WorkflowProcessStatus } from '../../../enumerations';
import { ReviewWorkflowProcessService } from '../../../services';
import { ISubscriptions } from '@nutela/models/common';
import { UtilService } from '@nutela/core-services';

@Component({
  selector: 'x365-fm-talent-moderation-queue',
  templateUrl: './moderation-queue.component.html',
  styleUrls: ['./moderation-queue.component.scss']
})
export class ModerationQueueComponent implements OnInit, OnDestroy {
  moderationQueue$: Observable<IReviewWorkflowProcess[]>;
  currentPlan$: Observable<IPlan>;

  private subscriptions: ISubscriptions = {};

  constructor(
    private router: Router,
    private utilService: UtilService,
    private reviewWorkflowProcessService: ReviewWorkflowProcessService,
    private store: Store<IPerformanceState>
  ) {}

  ngOnInit() {
    this.storeSelects();
    this.currentPlanInit();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadCurrentPlan());
  }

  storeSelects() {
    this.moderationQueue$ = this.store.pipe(select(getDataModerationQueue));
    this.currentPlan$ = this.store.pipe(select(getCurrentPlan));
  }

  currentPlanInit() {
    this.currentPlan$
      .pipe(
        filter(plan => plan !== null),
        take(1)
      )
      .subscribe((plan: IPlan) => {
        if (plan) {
          this.store.dispatch(new LoadDataModerationQueue(plan.id));
        }
      });
  }

  getModerationQueue$(rowId: number): Observable<IReviewWorkflowProcess[]> {
    return this.moderationQueue$.pipe(map(c => c.filter(val => val.workflow_process_id === rowId)));
  }

  onRowIconClicked(rowId) {
    this.getModerationQueue$(rowId)
      .pipe(
        map(e => e.shift()),
        take(1)
      )
      .subscribe((result: IReviewWorkflowProcess) => {
        if (result.status === WorkflowProcessStatus.NOT_STARTED || result.status === WorkflowProcessStatus.STARTED) {
          this.subscriptions['startReview'] =  this.reviewWorkflowProcessService.startReviewModeration(result.workflow_process_id).subscribe(data => {
            console.log('startReview data', data);

            this.navigateToAppraisalForm(result);
          }, (error) => {
            this.utilService.showToast(null, `Something went wrong. Review could not be started.`, ToastTypes.ERROR);
          });
        } else {
          this.navigateToAppraisalForm(result);
        }
      });
  }

  navigateToAppraisalForm(data: IReviewWorkflowProcess) {
    if (data && data.status === WorkflowProcessStatus.NOT_STARTED || data.status === WorkflowProcessStatus.STARTED || data.status === WorkflowProcessStatus.SAVED) {
      this.router.navigate([`${STANDARD_ROUTES.selfServiceAppraisalForms}/${data.workflow_process_id}`]);
    }
  }

  search() {}

  onRefresh() {
    this.currentPlan$
      .pipe(
        filter(plan => plan !== null),
        take(1)
      )
      .subscribe((plan: IPlan) => {
        if (plan) {
          this.store.dispatch(new LoadDataModerationQueue(plan.id));
          this.store.dispatch(
            new ShowToast({
              title: null,
              message: `Moderation data is being refreshed.`,
              type: ToastTypes.INFO
            })
          );
        }
      });
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
