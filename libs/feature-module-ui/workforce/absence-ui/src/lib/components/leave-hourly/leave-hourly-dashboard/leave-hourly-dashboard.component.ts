import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { HrzCommandTypes, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ILeaveEntitlement, ILeaveHourlyData } from '@nutela/models/workforce/leave';
import { LeaveHourlyApplyComponent } from '../leave-hourly-apply/leave-hourly-apply.component';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { ISelectOptionData } from '@nutela/models/common';
import { ISelectOption } from '@nutela/models/core-data';
import { map } from 'rxjs/internal/operators/map';
import { getSelectOptionData, getActivePersonnel, LoadHourlyLeaveTypes, getHourlyLeaveTypes } from '@nutela/store/modules/foundation';
import { LeaveHourlyCancelApprovedComponent } from '../leave-hourly-cancel-approved/leave-hourly-cancel-approved.component';
import { IAbsenceState } from '../../../store/root';
import { LeaveDailyLoadEntitlements, getLeaveEntitlements } from '../../../store/leave-daily';
import { LoadEntitlementLeaveHourly, LoadApprovedDataLeaveHourly, getEntitlementLeaveHourly, LoadAwaitingApprovalDataLeaveHourly, showEditorLeaveHourly, getLeaveHourlyApprovedData, getLeaveHourlyAwaitingApprovalData, ShowEditorLeaveHourly, HideEditorLeaveHourly } from '../../../store/leave-hourly';
import { showEditorLeaveHourlyCancelApproved, HideEditorLeaveHourlyCancelApproved, ShowEditorLeaveHourlyCancelApproved } from '../../../store/leave-hourly-cancel-approved';
import { RemoveHourlyAwaitingApprovalDataLeaveDaily } from '../../../store/leave-hourly-cancel-awaiting-approval';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from "@nutela/shared/app-global";
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-workforce-absence-leave-hourly-dashboard',
  templateUrl: './leave-hourly-dashboard.component.html',
  styleUrls: ['./leave-hourly-dashboard.component.scss']
})
export class LeaveHourlyDashboardComponent implements OnInit {

  @ViewChild('editor') editor: LeaveHourlyApplyComponent;
  @ViewChild('cancelApproved') cancelApproved: LeaveHourlyCancelApprovedComponent;

  showEditor$: Observable<boolean>;
  showCancelApprovedEditor$: Observable<boolean>;

  comprehensiveData$: Observable<IComprehensiveData>;
  selectOptionData$: Observable<ISelectOptionData>;
  leaveTypes$: Observable<ISelectOption[]>;
  leaveEntitlements$: Observable<ILeaveEntitlement[]>;
  leaveEntitlement$: Observable<ILeaveEntitlement>;
  activePersonnel$: Observable<ISelectOption[]>;

  approvedData$: Observable<ILeaveHourlyData[]>;
  awaitingApprovalData$: Observable<ILeaveHourlyData[]>;

  constructor(private store: Store<IAbsenceState>, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LeaveDailyLoadEntitlements());
    this.store.dispatch(new LoadEntitlementLeaveHourly());
    this.store.dispatch(new LoadHourlyLeaveTypes());
    this.store.dispatch(new LoadApprovedDataLeaveHourly());
    this.store.dispatch(new LoadAwaitingApprovalDataLeaveHourly());
  }

  storeSelects() {
    this.leaveEntitlements$ = this.store.pipe(select(getLeaveEntitlements));
    this.leaveEntitlement$ = this.store.pipe(select(getEntitlementLeaveHourly));
    this.showEditor$ = this.store.pipe(select(showEditorLeaveHourly));
    this.showCancelApprovedEditor$ = this.store.pipe(select(showEditorLeaveHourlyCancelApproved));

    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.leaveTypes$ = this.store.pipe(select(getHourlyLeaveTypes));

    this.approvedData$ = this.store.pipe(select(getLeaveHourlyApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getLeaveHourlyAwaitingApprovalData));

    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
  }


  onButtonClicked($event) {
    switch ($event) {
      case HrzCommandTypes.APPLY: {
        this.editor.fs.buildForm();
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
   this.editor.reset();
   this.store.dispatch(new ShowEditorLeaveHourly());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorLeaveHourly());
  }

  onCancelApprovedEditor () {
    this.store.dispatch(new HideEditorLeaveHourlyCancelApproved());
  }

  refreshData() {
    this.store.dispatch(new ShowToast({title: null, message: `Leave data is being refreshed.`, type: ToastTypes.INFO}));
    this.storeDispatches();
  }

  onApprovedCancelIconClicked(rowId: number) {
    this.cancelApproved.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.cancelApproved.data = result;
          this.cancelApproved.reset();
          this.store.dispatch(new ShowEditorLeaveHourlyCancelApproved());
        }
      );
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<ILeaveHourlyData> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.leave_id === rowId)),
      map(e => e.shift()))
  }

  getRowApprovedData$(rowId: number): Observable<ILeaveHourlyData> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.leave_trans_id === rowId)),
      map(e => e.shift()))
  }

  onAwaitingApprovalCancelIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`)
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new RemoveHourlyAwaitingApprovalDataLeaveDaily({recordId: rowId}));
      }
    });
  }

}
