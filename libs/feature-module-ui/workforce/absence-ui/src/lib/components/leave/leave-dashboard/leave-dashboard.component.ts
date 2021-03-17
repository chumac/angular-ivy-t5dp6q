import { Component, OnInit, ViewChild } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { LeaveDailyLoadEntitlements, getLeaveEntitlements, LoadLeaveContactInfo, getLeaveContactInfo } from '../../../store/leave-daily';
import { ILeaveEntitlement, ILeaveDailyData, LeaveDailyModes, ILeaveContactInfo } from '@nutela/models/workforce/leave';
import { Observable } from 'rxjs/internal/Observable';
import { HrzCommandTypes } from '@nutela/shared/ui';
import { LoadLeaveTypes, getLeaveTypes, getSelectOptionData, getActivePersonnel, allowBackupOfficerSelectionForLeaveApply, allowSupervisorSelectionForLeaveApply, LoadDailyLeaveTypes, getDailyLeaveTypes } from '@nutela/store/modules/foundation';
import { ISelectOption } from '@nutela/models/core-data';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { ISelectOptionData } from '@nutela/models/common';
import { map, take } from 'rxjs/operators';
import { LeaveApplyComponent } from '../leave-apply/leave-apply.component';
import { LeaveReturnComponent } from '../leave-return/leave-return.component';
import { LeaveCancelApprovedComponent } from '../leave-cancel-approved/leave-cancel-approved.component';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { IAbsenceState } from '../../../store/root';
import { LoadApprovedDataLeaveApply, LoadAwaitingApprovalDataLeaveApply, showEditorLeaveApply, getLeaveApplyApprovedData, getLeaveApplyAwaitingApprovalData, ShowEditorLeaveApply, HideEditorLeaveApply, HideFullFormLeaveApply, LoadInlineDocumentLeaveApply } from '../../../store/leave-apply';
import { showEditorLeaveReturn, HideEditorLeaveReturn, ShowEditorLeaveReturn } from '../../../store/leave-return';
import { showEditorLeaveCancelApproved, HideEditorLeaveCancelApproved, ShowEditorLeaveCancelApproved } from '../../../store/leave-cancel-approved';
import { RemoveAwaitingApprovalDataLeaveDaily } from '../../../store/leave-cancel-awaiting-approval';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from "@nutela/shared/app-global";
import { toastOptionsInformation, UtilService, toastOptionsError } from '@nutela/core-services';

@Component({
  selector: 'x365-fm-workforce-absence-leave-dashboard',
  templateUrl: './leave-dashboard.component.html',
  styleUrls: ['./leave-dashboard.component.scss']
})
export class LeaveDashboardComponent implements OnInit {
  @ViewChild('editor') editor: LeaveApplyComponent;
  @ViewChild('return') return: LeaveReturnComponent;
  @ViewChild('cancelApproved') cancelApproved: LeaveCancelApprovedComponent;

  showEditor$: Observable<boolean>;
  showReturnEditor$: Observable<boolean>;
  showCancelApprovedEditor$: Observable<boolean>;
  contactInfo$: Observable<ILeaveContactInfo>;
  comprehensiveData$: Observable<IComprehensiveData>;
  selectOptionData$: Observable<ISelectOptionData>;
  leaveTypes$: Observable<ISelectOption[]>;
  leaveEntitlements$: Observable<ILeaveEntitlement[]>;
  allowBackupOfficerSelectionForLeaveApply$: Observable<string>;
  allowSupervisorSelectionForLeaveApply$: Observable<string>;
  activePersonnel$: Observable<ISelectOption[]>;

  approvedData$: Observable<ILeaveDailyData[]>;
  awaitingApprovalData$: Observable<ILeaveDailyData[]>;

  constructor(private store: Store<IAbsenceState>, private utilService: UtilService, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LeaveDailyLoadEntitlements());
    this.store.dispatch(new LoadDailyLeaveTypes());
    this.store.dispatch(new LoadApprovedDataLeaveApply());
    this.store.dispatch(new LoadAwaitingApprovalDataLeaveApply());
    this.store.dispatch(new LoadLeaveContactInfo());
  }

  storeSelects() {
    this.leaveEntitlements$ = this.store.pipe(select(getLeaveEntitlements));
    this.showEditor$ = this.store.pipe(select(showEditorLeaveApply));
    this.showReturnEditor$ = this.store.pipe(select(showEditorLeaveReturn));
    this.showCancelApprovedEditor$ = this.store.pipe(select(showEditorLeaveCancelApproved));

    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.contactInfo$ = this.store.pipe(select(getLeaveContactInfo));
    this.leaveTypes$ = this.store.pipe(select(getDailyLeaveTypes));

    this.allowBackupOfficerSelectionForLeaveApply$ = this.store.pipe(select(allowBackupOfficerSelectionForLeaveApply));
    this.allowSupervisorSelectionForLeaveApply$ = this.store.pipe(select(allowSupervisorSelectionForLeaveApply));

    this.approvedData$ = this.store.pipe(select(getLeaveApplyApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getLeaveApplyAwaitingApprovalData));

    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
  }

  onButtonClicked($event) {
    switch ($event) {
      case HrzCommandTypes.APPLY: {
        this.editor.mode = LeaveDailyModes.APPLY;
        this.editor.header = 'Apply for Leave';
        this.showEditor();
        break;
      }
      case HrzCommandTypes.REFRESH: {
        this.refreshData();
        break;
      }
      default:
        break;
    }
  }

  showEditor() {
    this.resetForm();
    this.store.dispatch(new ShowEditorLeaveApply());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorLeaveApply());
  }

  onCancelReturnEditor() {
    this.store.dispatch(new HideEditorLeaveReturn());
  }

  onCancelApprovedEditor() {
    this.store.dispatch(new HideEditorLeaveCancelApproved());
  }

  refreshData() {
    this.store.dispatch(new ShowToast({title: null, message: `Leave data is being refreshed.`, type: ToastTypes.INFO}));
    this.storeDispatches();
  }

  onRescheduleIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
        if (new Date(result.start_date) > new Date(this.utilService.currentDate)) {
          this.editor.data = result;
          this.editor.mode = LeaveDailyModes.RESCHEDULE;
          this.editor.header = 'Reschedule Leave Request';
          this.editor.reset();
          this.editor.onLeaveTypeSelected({ value: result.LeaveInfo.leave_id, label: '' });
          this.store.dispatch(new ShowEditorLeaveApply());
        } else {
          this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'Cannot reschedule leave already started', options: toastOptionsError() }))
        }
      }
      );
  }

  onReturnIconClicked(rowId: number) {
    this.return.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
        if (new Date(result.start_date) < new Date(this.utilService.currentDate)) {
          this.return.data = result;
          this.return.reset();
          this.store.dispatch(new ShowEditorLeaveReturn());
        } else {
          this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'Cannot return when leave has not started', options: toastOptionsError() }))
        }
      }
      );
  }

  onApprovedCancelIconClicked(rowId: number) {
    this.cancelApproved.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.cancelApproved.data = result;
          this.cancelApproved.reset();
          this.store.dispatch(new ShowEditorLeaveCancelApproved());
        }
      );
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getRowApprovedData$(rowId).pipe(take(1))
    .subscribe((result) => {
        if (result.doc_url === null || result.doc_url === '') {
          this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
        } else {
          this.store.dispatch(new LoadInlineDocumentLeaveApply({recordId: rowId, isApproved: true}));
        }
      }
    );
  }

  hasDocumentApproved(rowId: number) {
    let status = false;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if(result){
            if (result.doc_url !== null || result.doc_url === '') {
              status = true;
            } else {
              status = false;
            }
          }
        }
      );
    return status;
  }

  onRecallIconClicked(rowId: number) {
    this.editor.data = null;
    this.resetForm();

    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.mode = LeaveDailyModes.RECALL;
        this.editor.header = 'Recall Leave Request';
        this.editor.reset();
        this.editor.onLeaveTypeSelected({ value: result.LeaveInfo.leave_id, label: '' });
        this.store.dispatch(new ShowEditorLeaveApply());
      }
      );
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<ILeaveDailyData> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.leave_trans_id === rowId)),
      map(e => e.shift()))
  }

  getRowApprovedData$(rowId: number): Observable<ILeaveDailyData> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.leave_trans_id === rowId)),
      map(e => e.shift()))
  }

  onAwaitingApprovalCancelIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to cancel this leave application?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new RemoveAwaitingApprovalDataLeaveDaily({recordId: rowId}));
      }
    });
  }

  onAwaitingApprovalDownloadIconClicked(rowId: number) {
    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
    .subscribe((result) => {
        if (result.doc_url === null || result.doc_url === '') {
          this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
        } else {
          this.store.dispatch(new LoadInlineDocumentLeaveApply({recordId: rowId, isApproved: false}));
        }
      }
    );
  }

  hasDocumentAwaitingApproval(rowId: number):boolean {
    let status = false;

    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if(result){
            if (result.doc_url !== null || result.doc_url === '') {
              status = true;
            } else {
              status = false;
            }
          }
        }
      );

    return status;
  }

  resetForm(){
    this.editor.fs.enablePreFormControls();
    this.editor.fs.form = this.editor.fs.buildForm();
    this.store.dispatch(new HideFullFormLeaveApply());
  }

}
