import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/internal/Observable';
import { IPlan, IReviewWorkflowProcess, IAppraisalStatus } from '@nutela/models/talent/performance';
import { Store, select } from '@ngrx/store';
import { IPerformanceState } from '../../../store/root';

import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { LoadCurrentPlan, getCurrentPlan } from '../../../store';
import {
  getDataTeamReview,
  LoadDataTeamReview,
  isLoadingTeamReview,
  LoadingDataTeamReview
} from '../../../store/reviews/team-review';
import { filter, take, map } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { WorkflowProcessStatus, RoleTypes } from '../../../enumerations';
import { ReviewWorkflowProcessService } from '../../../services';
import { ISubscriptions } from '@nutela/models/common';
import { UtilService } from '@nutela/core-services';
import { ReappraiseReviewWorkflowProcess } from '../../../store/reviews/review-workflow-process';
import { AppraisalRerouteComponent } from '../../common/appraisal-reroute/appraisal-reroute.component';
import { IReRouteData } from '../../../models';
import { MatDialog, MatDialogRef } from '@angular/material';
import { IApiResult } from '@nutela/models/core-data';
import { LoadLMTeamCountFeedbackForm, getLMTeamCountFeedbackForm } from '../../../store/reviews/feedback-form';

@Component({
  selector: 'x365-fm-talent-team-review',
  templateUrl: './team-review.component.html',
  styleUrls: ['./team-review.component.scss']
})
export class TeamReviewComponent implements OnInit, OnDestroy {
  teamReview$: Observable<IReviewWorkflowProcess[]>;
  currentPlan$: Observable<IPlan>;
  isLoading$: Observable<boolean>;

  teamCountFeedbackForm$: Observable<number>; //For Feedback

  commentDialogRef: MatDialogRef<AppraisalRerouteComponent>;

  private subscriptions: ISubscriptions = {};

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private router: Router,
    private utilService: UtilService,
    private titleService: Title,
    private reviewWorkflowProcessService: ReviewWorkflowProcessService,
    private store: Store<IPerformanceState>,
    private dialogBoxService: DialogBoxService,
    public dialog: MatDialog
  ) {
    titleService.setTitle(`${'Team Review'}${this.partialDocumentTitle}`)
  }

  ngOnInit() {
    this.storeSelects();
    this.currentPlanInit();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingDataTeamReview())
    this.store.dispatch(new LoadCurrentPlan());

  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingTeamReview));
    this.teamReview$ = this.store.pipe(select(getDataTeamReview));
    this.currentPlan$ = this.store.pipe(select(getCurrentPlan));
    this.teamCountFeedbackForm$ = this.store.pipe(select(getLMTeamCountFeedbackForm));
  }

  getCurrentPlan(): Observable<IPlan> {
    return this.currentPlan$.pipe(
      filter(plan => plan !== null),
      take(1)
    );
  }

  currentPlanInit() {
      this.getCurrentPlan().subscribe((plan: IPlan) => {
        if (plan) {
          this.store.dispatch(new LoadDataTeamReview(plan.id));
          this.store.dispatch(new LoadLMTeamCountFeedbackForm(plan.id)); // For Team Feedback
        }
      });
  }

  getTeamReview$(rowId: number): Observable<IReviewWorkflowProcess[]> {
    return this.teamReview$.pipe(map(c => c.filter(val => val.workflow_process_id === rowId)));
  }

  onRowIconClicked(context: IReviewWorkflowProcess) {
    if (context.status === WorkflowProcessStatus.NOT_STARTED || context.status === WorkflowProcessStatus.STARTED) {
      this.subscriptions['startReview'] =  this.reviewWorkflowProcessService.startReview(context.workflow_process_id).subscribe(data => {
        this.navigateToAppraisalForm(context);
      }, (error) => {
        this.utilService.showToast(null, `Something went wrong. Review could not be started.`, ToastTypes.ERROR);
      });
    } else {
      this.navigateToAppraisalForm(context);
    }
  }

  onReAppraiseIconClicked(context: IReviewWorkflowProcess) {
    this.subscriptions['ReAppraisePrompt'] = this.dialogBoxService.show(`Are you sure you want to reappraise ${context.employee_name}? This action cannot be reversed.`)
      .pipe(take(1)).subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new ReappraiseReviewWorkflowProcess({employeeId: context.employee_id, planId: context.plan_id}));
        }
      });
  }

  onReRouteIconClicked(context: IReviewWorkflowProcess) {
    const role = RoleTypes.REVIEWER_REVIEWING;

    const data: IReRouteData = {role: role, planId: context.plan_id, employeeId: context.employee_id, reviewerId: context.reviewer_id};

    this.commentDialogRef = this.dialog.open(AppraisalRerouteComponent, {
      width: '450px',
      data: data,
      panelClass: 'custom-dialog-container'
    });



    // this.subscriptions['ReRoute'] = this.getCurrentPlan().subscribe((plan: IPlan) => {
    //   if (plan) {
    //     const role = RoleTypes.REVIEWER_REVIEWING;
    //     let employeeId = 0;
    //     let reviewerId = 0;

    //     if (context) {
    //       employeeId = context.employee_id;
    //       reviewerId = context.reviewer_id;
    //     }

    //     const data: IReRouteData = {role: role, planId: plan.id, employeeId: employeeId, reviewerId: reviewerId};

    //     this.commentDialogRef = this.dialog.open(AppraisalRerouteComponent, {
    //       width: '450px',
    //       data: data,
    //       panelClass: 'custom-dialog-container'
    //     });
    //   }
    // });
  }

  onEditIconClicked(context: IReviewWorkflowProcess) {
    if (context.role === RoleTypes.LINE_MANAGER) {
      this.subscriptions['editAppraisal'] =  this.reviewWorkflowProcessService.editAppraisal(context.workflow_process_id).subscribe((data: IApiResult) => {
        if (data.Success) {
          this.navigateToAppraisalForm(context);
        } else {
          this.utilService.showToast('Record Could Not Be Edited', data.ErrorMessage, ToastTypes.INFO);
        }
      }, (error) => {
        this.utilService.showToast(null, `Something went wrong. Record Could Not Be Edited.`, ToastTypes.ERROR);
      });
    }
  }

  navigateToAppraisalForm(data: IReviewWorkflowProcess) {
    if (data && data.status === WorkflowProcessStatus.NOT_STARTED || data.status === WorkflowProcessStatus.STARTED || data.status === WorkflowProcessStatus.SAVED) {
      this.router.navigate([`${STANDARD_ROUTES.selfServiceAppraisalForms}/${data.workflow_process_id}`]);
    }
  }

  search() {}

  navigateToFeedbackReviewListPage() {
    this.getCurrentPlan().subscribe((plan: IPlan) => {
      if (plan) {
        this.router.navigate([`${STANDARD_ROUTES.teamFeedbackReview}/${plan.id}`]);
      }
    });
  }

  onRefresh() {
    this.getCurrentPlan()
      .subscribe((plan: IPlan) => {
        if (plan) {
          this.store.dispatch(new LoadDataTeamReview(plan.id));
          this.store.dispatch(
            new ShowToast({
              title: null,
              message: `Team Review data is being refreshed.`,
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
