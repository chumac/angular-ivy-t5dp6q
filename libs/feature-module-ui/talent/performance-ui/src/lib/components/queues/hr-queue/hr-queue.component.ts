
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { filter, take, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { IPlan, IReviewWorkflowProcess } from '@nutela/models/talent/performance';
import { IPerformanceState } from '../../../store/root';
import { LoadCurrentPlan, getCurrentPlan } from '../../../store';
import { getDataHRQueue, LoadDataHRQueue } from '../../../store/queues/hr-queue';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { WorkflowProcessStatus, HRQueueFeedbackStatus } from '../../../enumerations';
import { ReviewWorkflowProcessService } from '../../../services';
import { ISubscriptions } from '@nutela/models/common';
import { UtilService } from '@nutela/core-services';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import * as constants from '../../../constants';
import { getHRTeamListFeedbackForm, LoadHRTeamFeedbackForm, LoadEmployeeInfoFeedbackFormSuccess, SetMetadataFeedbackForm, HRCloseSingleFeedbackForm, HRCloseMultipleFeedbackForm } from '../../../store/reviews/feedback-form';
import { IgxGridComponent } from 'igniteui-angular';
import { SwitchComponent, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { from, of } from 'rxjs';

@Component({
  selector: 'x365-fm-talent-hr-queue',
  templateUrl: './hr-queue.component.html',
  styleUrls: ['./hr-queue.component.scss']
})
export class HrQueueComponent implements OnInit, OnDestroy {
  hrQueue$: Observable<IReviewWorkflowProcess[]>;
  currentPlan$: Observable<IPlan>;
  feedbackTeamList$: Observable<IReviewWorkflowProcess[]>;
  selectedFeedbackGridRowsCount: number;
  selectedFeedbackGridRowsData: any[];
  @ViewChild('feedbackQueueGrid', { read: IgxGridComponent }) feedbackQueueGrid: IgxGridComponent;
  @ViewChild('switch') switch: SwitchComponent;
  closeStatus = HRQueueFeedbackStatus;

  private subscriptions: ISubscriptions = {};

  constructor(
    private router: Router,
    private utilService: UtilService,
    private dialogBoxService: DialogBoxService,
    private reviewWorkflowProcessService: ReviewWorkflowProcessService,
    private store: Store<IPerformanceState>
  ) {}

  ngOnInit() {
    this.storeSelects();
    this.currentPlanInit();
    this.storeDispatches();
    // this.loadHRTeamFeedbackForm();
  }

  storeDispatches() {
    this.store.dispatch(new LoadCurrentPlan());
  }

  storeSelects() {
    this.hrQueue$ = this.store.pipe(select(getDataHRQueue));
    this.currentPlan$ = this.store.pipe(select(getCurrentPlan));
    this.feedbackTeamList$ = this.store.pipe(select(getHRTeamListFeedbackForm));
  }

  currentPlanInit() {
    this.currentPlan$
      .pipe(
        filter(plan => plan !== null),
        take(1)
      )
      .subscribe((plan: IPlan) => {
        if (plan) {
          this.store.dispatch(new LoadDataHRQueue(plan.id));
          this.store.dispatch(new LoadHRTeamFeedbackForm(plan.id));
        }
      });
  }

  gethrQueue$(rowId: number): Observable<IReviewWorkflowProcess[]> {
    return this.hrQueue$.pipe(
      map(c => c.filter(val => val.workflow_process_id === rowId))
    );
  }

  onRowIconClicked(rowId) {
    this.gethrQueue$(rowId)
      .pipe(
        map(e => e.shift()),
        take(1)
      )
      .subscribe((result: IReviewWorkflowProcess) => {
        if (
          result.status === WorkflowProcessStatus.NOT_STARTED ||
          result.status === WorkflowProcessStatus.STARTED
        ) {
          this.subscriptions[
            'startReview'
          ] = this.reviewWorkflowProcessService
            .startReviewHR(result.workflow_process_id)
            .subscribe(
              data => {
                // console.log('result.workflow_process_id', result.workflow_process_id);
                // console.log('startReview data', data);

                this.navigateToAppraisalForm(result);
              },
              error => {
                this.utilService.showToast(
                  null,
                  `Something went wrong. Review could not be started.`,
                  ToastTypes.ERROR
                );
              }
            );
        } else {
          this.navigateToAppraisalForm(result);
        }
      });
  }

  navigateToAppraisalForm(data: IReviewWorkflowProcess) {
    if (
      (data && data.status === WorkflowProcessStatus.NOT_STARTED) ||
      data.status === WorkflowProcessStatus.STARTED ||
      data.status === WorkflowProcessStatus.SAVED
    ) {
      this.router.navigate([
        `${STANDARD_ROUTES.selfServiceAppraisalForms}/${
          data.workflow_process_id
        }`
      ]);
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
          this.store.dispatch(new LoadDataHRQueue(plan.id));
          this.store.dispatch(new LoadHRTeamFeedbackForm(plan.id));
          this.store.dispatch(
            new ShowToast({
              title: null,
              message: `Data is being refreshed.`,
              type: ToastTypes.INFO
            })
          );
        }
      });
  }

  //Feed back Zone
  loadHRTeamFeedbackForm() {
    this.currentPlan$.pipe().subscribe((plan: IPlan) => {
        this.store.dispatch(new LoadHRTeamFeedbackForm(plan.id));
    });
  }

  onCloseSingleFeedbackIconClicked(val) {
    this.currentPlan$.pipe(take(1)).subscribe((plan: IPlan) => {
      this.dialogBoxService.show(`Are you sure you want to close this employee feedback?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new HRCloseSingleFeedbackForm({ planId: plan.id, employeeId: val }));
        }
      });
    });
  }

  onCloseMultipleFeedbackIconClicked() {
    this.currentPlan$.pipe(take(1)).subscribe((plan: IPlan) => {
      if(this.feedbackQueueGrid.selectedRows().length > 0) {
        this.dialogBoxService.show(`Are you sure you want to close this employee feedback(s)?`).pipe(take(1))
        .subscribe((command: string) => {
          if (command === DialogBoxCommandTypes.COMMAND1) {
            this.selectedFeedbackGridRowsData = this.feedbackQueueGrid.selectedRows();
            let finalData = this.selectedFeedbackGridRowsData.map((obj) => {
              return {
                employee_id: obj.employee_id,
              }
            });
            this.store.dispatch(new HRCloseMultipleFeedbackForm({ planId: plan.id, employeeIds: finalData }));
          }
        });
      } else {
        this.utilService.showToast(
          null,
          `Make a selection.`,
          ToastTypes.ERROR
        );
      }
    });
  }

  onViewFeedbackIconClicked(data) {
    this.store.dispatch(
      new LoadEmployeeInfoFeedbackFormSuccess({
        employee_id: data.employee_id,
        employee_name: data.emp_fullname,
        employee_number: data.employee_number
      })
    );
    this.store.dispatch(
      new SetMetadataFeedbackForm({ isEmp: false, isLm: false, isHr: true })
    );
    this.router.navigate(
      [constants.MANAGE_OBJECTIVES_URLs.objectiveFeedbackUrl],
      { skipLocationChange: false }
    );
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
