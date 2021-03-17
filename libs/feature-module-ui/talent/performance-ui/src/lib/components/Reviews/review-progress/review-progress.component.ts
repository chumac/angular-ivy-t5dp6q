import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IPerformanceState, LoadCurrentPlan, getCurrentPlan } from '../../../store';
import { LoadDataReviewWorkflowProcess, getDataReviewWorkflowProcess, LoadingDataReviewWorkflowProcess, isLoadingDataReviewWorkflowProcess } from '../../../store/reviews/review-workflow-process';
import { IReviewWorkflowProcess, IPlan } from '@nutela/models/talent/performance';
import { Observable } from 'rxjs/internal/Observable';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { take, map, filter } from 'rxjs/operators';
import { RoleTypes, WorkflowProcessStatus } from '../../../enumerations';
import { Router } from '@angular/router';
import { ISubscriptions } from '@nutela/models/common';
import { UtilService } from '@nutela/core-services';
import { ReviewProgressService } from './review-progress.service';

@Component({
  selector: 'x365-fm-talent-review-progress',
  templateUrl: './review-progress.component.html',
  styleUrls: ['./review-progress.component.scss'],
  providers: [ReviewProgressService]
})
export class ReviewProgressComponent implements OnInit, OnDestroy {
  reviewWorkflowProcesses$: Observable<IReviewWorkflowProcess[]>;
  currentPlan$: Observable<IPlan>;ReviewProgressService
  isLoading$: Observable<boolean>;

  private subscriptions: ISubscriptions = {};

  constructor(private router: Router, private utilService: UtilService, private service: ReviewProgressService, private store: Store<IPerformanceState>) { }

  ngOnInit() {
    this.storeSelects();
    this.currentPlanInit();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingDataReviewWorkflowProcess());
    this.store.dispatch(new LoadCurrentPlan());
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingDataReviewWorkflowProcess));
    this.reviewWorkflowProcesses$ = this.store.pipe(select(getDataReviewWorkflowProcess));
    this.currentPlan$ = this.store.pipe(select(getCurrentPlan));
  }

  currentPlanInit() {
    this.currentPlan$
      .pipe(filter(plan => plan !== null), take(1))
      .subscribe((plan: IPlan) => {
        if (plan) {
          this.store.dispatch(new LoadDataReviewWorkflowProcess(plan.id));
        }
    });
  }

  getReviewWorkflowProcesses$(rowId: number): Observable<IReviewWorkflowProcess[]> {
    return this.reviewWorkflowProcesses$.pipe(
      map(c => c.filter(val => val.workflow_process_id === rowId)));
  }

  onRowIconClicked(rowId) {
    this.getReviewWorkflowProcesses$(rowId).pipe(
      map(e => e.shift()), take(1))
      .subscribe((result: IReviewWorkflowProcess) => {
          this.navigateToAppraisalForm(result);
        }
      );
  }

  navigateToAppraisalForm(data: IReviewWorkflowProcess) {
    if (data) {
      switch (data.role) {
        case RoleTypes.EMPLOYEE:
          this.navigateToAppraisalFormById(data);
        case RoleTypes.LINE_MANAGER:
          ;
        case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
          if (data.status === WorkflowProcessStatus.NOT_STARTED) {
            this.subscriptions['startAcceptRejectReview'] =  this.service.startAcceptRejectReview(data.workflow_process_id).subscribe(result => {
              this.navigateToAppraisalFormById(data)
            }, (error) => {
              this.utilService.showToast(null, `Something went wrong. Review could not be started.`, ToastTypes.ERROR);
            });
          } else {
            this.navigateToAppraisalFormById(data)
          }
        case RoleTypes.REVIEWER_ASSESSING:
          ;
        case RoleTypes.REVIEWER_REVIEWING:
          ;
        case RoleTypes.MODERATION:
          ;
        case RoleTypes.HR:
          ;
      }
    } else {
      // display message
      console.log('Action not available.');
    }
  }

  navigateToAppraisalFormById(data: IReviewWorkflowProcess) {
    if ((data.status === WorkflowProcessStatus.NOT_STARTED) || (data.status === WorkflowProcessStatus.STARTED) || (data.status === WorkflowProcessStatus.SAVED)) {
      this.router.navigate([`${STANDARD_ROUTES.selfServiceAppraisalForms}/${data.workflow_process_id}`]);
    }
  }

  search() {

  }

  onRefresh() {
    this.currentPlan$
      .pipe(filter(plan => plan !== null), take(1))
      .subscribe((plan: IPlan) => {
        if (plan) {
          this.store.dispatch(new LoadDataReviewWorkflowProcess(plan.id));
          this.store.dispatch(new ShowToast({title: null, message: `Review Progress data is being refreshed.`, type: ToastTypes.INFO}));
        }
    });
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
