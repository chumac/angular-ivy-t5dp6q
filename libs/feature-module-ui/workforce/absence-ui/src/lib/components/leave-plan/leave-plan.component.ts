
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';
import { LeavePlanEditorComponent } from './leave-plan-editor/leave-plan-editor.component';
import { LeaveDetailEditorComponent } from './leave-detail-editor/leave-detail-editor.component';
import { LeavePlanViewerComponent } from './leave-plan-viewer/leave-plan-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, getActivePersonnel, getLeaveTypes, LoadLeaveTypes } from '@nutela/store/modules/foundation';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { SwitchComponent } from '@nutela/shared/ui';
import {
  IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand
} from 'igniteui-angular';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowEditorLeavePlan, showViewerLeavePlan, showEditorLeavePlan, HideEditorLeavePlan, getLeavePlanApprovedData, getLeavePlanAwaitingApprovalData, LoadApprovedDataLeavePlan, LoadAwaitingApprovalDataLeavePlan, LoadLeavePlanIdentity, DeleteDetailLeavePlan, DeletePlanLeavePlan, showDetailEditorLeavePlan, ShowDetailEditorLeavePlan, HideDetailEditorLeavePlan, SaveLeavePlan, getLeavePlanType, LoadLeavePlanType, CancelLeavePlan, ReviewLeavePlan } from '../../store/leave-plan';
import { ISelectOption } from '@nutela/models/core-data';
import { ILeaveDailyData, ILeavePlanDetail, ILeaveContactInfo } from '@nutela/models/workforce/leave';
import * as constants from '@nutela/shared/app-global';
import { LeavePlanService } from './leave-plan.service';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { getLeaveContactInfo, LoadLeaveContactInfo } from '../../store/leave-daily';

@Component({
  selector: 'x365-fm-workforce-leave-plan',
  templateUrl: './leave-plan.component.html',
  styleUrls: ['./leave-plan.component.scss'],
  providers: [LeavePlanService],
})
export class LeavePlanComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showDetailEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;
  contactInfo$: Observable<ILeaveContactInfo>;
  leaveTypes$: Observable<ISelectOption[]>;
  public data: any[];
  approvedData$: Observable<ILeaveDailyData[]>;
  awaitingApprovalData$: Observable<ILeaveDailyData[]>;
  activePersonnel$: Observable<ISelectOption[]>;
  comprehensiveData$: Observable<IComprehensiveData>;
  dropDownFilterValue;
  approvalStatus = constants.LEAVE_APPROVAL_STATUS;

  @ViewChild('editor') editor: LeavePlanEditorComponent;
  @ViewChild('detail_editor') detail_editor: LeaveDetailEditorComponent;
  @ViewChild('viewer') viewer: LeavePlanViewerComponent;
  @ViewChild('switch') switch: SwitchComponent;
  @ViewChild('approvedDataGrid') approvedDataGrid: IgxGridComponent;
  @ViewChild('awaitingApprovalDataGrid') awaitingApprovalDataGrid: IgxGridComponent;

  constructor(private store: Store<IAppState>, private dialogBoxService: DialogBoxService, public service: LeavePlanService, public utilService: UtilService,) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
    this.leaveTypes$ = this.store.pipe(select(getLeavePlanType));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.contactInfo$ = this.store.pipe(select(getLeaveContactInfo));
    this.showEditor$ = this.store.pipe(select(showEditorLeavePlan));
    this.showDetailEditor$ = this.store.pipe(select(showDetailEditorLeavePlan));
    this.showViewer$ = this.store.pipe(select(showViewerLeavePlan));
    this.approvedData$ = this.store.pipe(select(getLeavePlanApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getLeavePlanAwaitingApprovalData));
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadLeavePlanType());
    this.store.dispatch(new LoadApprovedDataLeavePlan());
    this.store.dispatch(new LoadAwaitingApprovalDataLeavePlan());
    this.store.dispatch(new LoadLeaveContactInfo());  
  }

  onApplyBtnClicked() {
    this.store.dispatch(new LoadLeavePlanIdentity());
    this.editor.data = null;
    this.editor.reset();
    this.editor.prePopulateForm();
    this.store.dispatch(new ShowEditorLeavePlan());
    this.editor.showSubForm();
  }

  onDeletePlanIconClicked(id) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeletePlanLeavePlan({recordId: id}));
      }
    });
  }

  onSubmitPlanIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to submit this leave plan for approval?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new SaveLeavePlan({leavePlanId: rowId}));
      }
    });
  }

  onAddDetailIconClicked(rowId: number, supportPayment: boolean) {
    this.detail_editor.data = null;
    this.detail_editor.leavePlanId = rowId;
    this.detail_editor.supportPayment = supportPayment;
    this.detail_editor.reset();
    this.store.dispatch(new ShowDetailEditorLeavePlan());
  }

  onEditDetailIconClicked(data) {
    this.detail_editor.data = null;
    this.detail_editor.data = data;
    this.detail_editor.reset();
    this.store.dispatch(new ShowDetailEditorLeavePlan());
  }

  onDeleteDetailIconClicked(data: ILeavePlanDetail) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDetailLeavePlan({recordId: data.id}));
        }
      });
  }

  onCancelPlanIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to cancel this plan?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new CancelLeavePlan({leavePlanId: rowId}));
        }
      });
  }

  onReviewPlanIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to review this plan? Note: This leave plan would be reverted to pending status`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new ReviewLeavePlan({leavePlanId: rowId}));
        }
      });
  }

  onRefreshBtnClicked() {
    this.store.dispatch(new LoadApprovedDataLeavePlan());
    this.store.dispatch(new LoadAwaitingApprovalDataLeavePlan());
    this.store.dispatch(new ShowToast({title: null, message: `Leave Plan Information is being refreshed.`, type: ToastTypes.INFO}));

  }

  filter(term: string, filterValue: string) {
    if(!this.switch.value) {
      if (this.approvedDataGrid) {
        if (filterValue) {
          this.approvedDataGrid.clearFilter();
          this.approvedDataGrid.filteringLogic = FilteringLogic.Or;
          this.approvedDataGrid.filter(
            filterValue,
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        } else {
          this.approvedDataGrid.clearFilter();
          this.approvedDataGrid.filteringLogic = FilteringLogic.Or;
          this.approvedDataGrid.filterGlobal(
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        }
      }
    }

    if(this.switch.value) {
      if (this.awaitingApprovalDataGrid) {
        if (filterValue) {
          this.awaitingApprovalDataGrid.clearFilter();
          this.awaitingApprovalDataGrid.filteringLogic = FilteringLogic.Or;
          this.awaitingApprovalDataGrid.filter(
            filterValue,
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        } else {
          this.awaitingApprovalDataGrid.clearFilter();
          this.awaitingApprovalDataGrid.filteringLogic = FilteringLogic.Or;
          this.awaitingApprovalDataGrid.filterGlobal(
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        }
      }
    }
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorLeavePlan());
  }

  onCancelDetailEditor() {
    this.store.dispatch(new HideDetailEditorLeavePlan());
  }

  onCancelViewer() {
    // this.store.dispatch(new HideViewerLeavePlan());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
