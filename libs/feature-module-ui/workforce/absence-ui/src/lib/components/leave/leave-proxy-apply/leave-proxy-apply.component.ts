import { Component, OnInit, ViewChild } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { ILeaveEntitlement, ILeaveDailyData, LeaveDailyModes } from '@nutela/models/workforce/leave';
import { Observable } from 'rxjs/internal/Observable';
import { HrzCommandTypes, SwitchComponent } from '@nutela/shared/ui';
import { LoadLeaveTypes, getLeaveTypes, getSelectOptionData, getActivePersonnel, allowBackupOfficerSelectionForLeaveApply, allowSupervisorSelectionForLeaveApply } from '@nutela/store/modules/foundation';
import { ISelectOption } from '@nutela/models/core-data';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { ISelectOptionData } from '@nutela/models/common';
import { map, take } from 'rxjs/operators';
import { LeaveProxyApplyEditorComponent } from './leave-proxy-apply-editor/leave-proxy-apply-editor.component';
import { LeaveHistoricalComponent } from '../leave-historical/leave-historical.component';

import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { IAbsenceState } from '../../../store/root';
import { LoadApprovedDataLeaveProxyApply, LoadAwaitingApprovalDataLeaveProxyApply, showEditorLeaveProxyApply, getLeaveProxyApplyApprovedData, getLeaveProxyApplyAwaitingApprovalData, ShowEditorLeaveProxyApply, HideEditorLeaveProxyApply, HideFullFormLeaveProxyApply, LoadInlineDocumentLeaveProxyApply, isProcessingLeaveProxyApply, ProcessingLeaveProxyApply, InvalidateLeaveProxyApply, ShowViewerLeaveProxyApply, showViewerLeaveProxyApply, showEditorLeaveProxyReset, ShowEditorLeaveProxyReset, HideEditorLeaveProxyReset } from '../../../store/leave-proxy-apply';
import { showEditorLeaveReturn, HideEditorLeaveReturn, ShowEditorLeaveReturn } from '../../../store/leave-return';
import { showEditorLeaveCancelApproved, HideEditorLeaveCancelApproved, ShowEditorLeaveCancelApproved } from '../../../store/leave-cancel-approved';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from "@nutela/shared/app-global";
import { toastOptionsInformation, toastOptionsError } from '@nutela/core-services';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { FilteringLogic, IgxStringFilteringOperand, IgxGridComponent } from 'igniteui-angular';
import { LeaveProxyApplyService } from './leave-proxy-apply.service';
import { ShowEditorLeaveHistorical, showEditorLeaveHistorical, HideEditorLeaveHistorical } from '../../../store/leave-historical';
import { LeaveProxyApplyViewerComponent } from './leave-proxy-apply-viewer/leave-proxy-apply-viewer.component';
import { LeaveProxyResetEditorComponent } from './leave-proxy-reset-editor/leave-proxy-reset-editor.component';

@Component({
  selector: 'x365-fm-workforce-leave-proxy-apply',
  templateUrl: './leave-proxy-apply.component.html',
  styleUrls: ['./leave-proxy-apply.component.scss'],
  providers: [LeaveProxyApplyService],
})
export class LeaveProxyApplyComponent implements OnInit {
  @ViewChild('editor') editor: LeaveProxyApplyEditorComponent;
  @ViewChild('viewer') viewer: LeaveProxyApplyViewerComponent;
  @ViewChild('historicalEditor') historicalEditor: LeaveHistoricalComponent;
  @ViewChild('employeeLook') employeeLook: DxLookupComponent;
  @ViewChild('switch') switch: SwitchComponent;
  @ViewChild('approvedDataGrid') approvedDataGrid: IgxGridComponent;
  @ViewChild('awaitingApprovalData') awaitingApprovalData: IgxGridComponent;
  @ViewChild('resetEditor') resetEditor: LeaveProxyResetEditorComponent;


  showEditor$: Observable<boolean>;
  showResetEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  showHistoricalEditor$: Observable<boolean>;

  showReturnEditor$: Observable<boolean>;
  showCancelApprovedEditor$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  comprehensiveData$: Observable<IComprehensiveData>;
  selectOptionData$: Observable<ISelectOptionData>;
  leaveTypes$: Observable<ISelectOption[]>;
  leaveEntitlements$: Observable<ILeaveEntitlement[]>;
  allowBackupOfficerSelectionForLeaveProxyApply$: Observable<string>;
  allowSupervisorSelectionForLeaveProxyApply$: Observable<string>;
  activePersonnel$: Observable<ISelectOption[]>;
  dropDownFilterValue: string = '';

  approvedData$: Observable<ILeaveDailyData[]>;
  awaitingApprovalData$: Observable<ILeaveDailyData[]>;

  constructor(private store: Store<IAbsenceState>, public service: LeaveProxyApplyService, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadLeaveTypes());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorLeaveProxyApply));
    this.showResetEditor$ = this.store.pipe(select(showEditorLeaveProxyReset));
    this.showViewer$ = this.store.pipe(select(showViewerLeaveProxyApply));

    this.showHistoricalEditor$ = this.store.pipe(select(showEditorLeaveHistorical));

    this.isProcessing$ = this.store.pipe(select(isProcessingLeaveProxyApply));

    this.showReturnEditor$ = this.store.pipe(select(showEditorLeaveReturn));
    this.showCancelApprovedEditor$ = this.store.pipe(select(showEditorLeaveCancelApproved));

    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.leaveTypes$ = this.store.pipe(select(getLeaveTypes));

    this.allowBackupOfficerSelectionForLeaveProxyApply$ = this.store.pipe(select(allowBackupOfficerSelectionForLeaveApply));
    this.allowSupervisorSelectionForLeaveProxyApply$ = this.store.pipe(select(allowSupervisorSelectionForLeaveApply));

    this.approvedData$ = this.store.pipe(select(getLeaveProxyApplyApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getLeaveProxyApplyAwaitingApprovalData));

    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
  }

  onButtonClicked($event) {
    switch ($event) {
      case HrzCommandTypes.APPLY: {
        this.editor.mode = LeaveDailyModes.APPLY;
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

  onApplyBtnClicked() {
    this.editor.mode = LeaveDailyModes.APPLY;
    this.showEditor();
  }

  onHistoricalBtnClicked() {
    this.showHistoricalEditor();
  }

  onRefreshBtnClicked() {
    this.store.dispatch(new ShowToast({title: null, message: `Leave Proxy Information is being refreshed.`, type: ToastTypes.INFO}));
  }

  loadLeaveData(event: any){
    const employeeid = this.employeeLook.value;
    if(employeeid){
      this.store.dispatch(new ProcessingLeaveProxyApply());
      this.store.dispatch(new LoadApprovedDataLeaveProxyApply({employeeId: employeeid}));
      this.store.dispatch(new LoadAwaitingApprovalDataLeaveProxyApply({employeeId: employeeid}));
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select an employee', options: toastOptionsError()}))
    }
  }


  showHistoricalEditor() {
    this.resetForm();
    this.store.dispatch(new ShowEditorLeaveHistorical());
  }

  showEditor() {
    this.resetForm();
    this.store.dispatch(new ShowEditorLeaveProxyApply());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorLeaveProxyApply());
    this.store.dispatch(new HideEditorLeaveProxyReset());
  }

  onCancelHistoricalEditor() {
    this.store.dispatch(new HideEditorLeaveHistorical());
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
          this.editor.data = result;
          this.editor.mode = LeaveDailyModes.RESCHEDULE;
          this.editor.reset();
          this.editor.onLeaveTypeSelected({value: result.LeaveInfo.leave_id, label: ''});
          this.store.dispatch(new ShowEditorLeaveProxyApply());
        }
      );
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getRowApprovedData$(rowId).pipe(take(1))
    .subscribe((result) => {
        if (result.doc_url === null || result.doc_url === '') {
          this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
        } else {
          this.store.dispatch(new LoadInlineDocumentLeaveProxyApply({recordId: rowId, isApproved: true}));
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

  getRowAwaitingApprovalData$(rowId: number): Observable<ILeaveDailyData> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getRowApprovedData$(rowId: number): Observable<ILeaveDailyData> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onResetLeavePlan() {
    this.store.dispatch(new ShowEditorLeaveProxyReset());
  }

  onViewIconClicked(rowId: number) {
    console.log('viewer id: ', rowId);
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
        console.log('viewer res: ', result);

          this.viewer.data = result;
          this.store.dispatch(new ShowViewerLeaveProxyApply());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    console.log('viewer id: ', rowId);
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
        console.log('viewer res: ', result);
      });
  }

  onAwaitingApprovalCancelIconClicked(rowId: number) {
    if(this.employeeLook.value){
      this.dialogBoxService.show(`Are you sure you want to invalidate this record?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new InvalidateLeaveProxyApply({recordId: rowId, employeeId: this.employeeLook.value}));
        } else {
          this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select an employee', options: toastOptionsError()}))
        }
      });
    }
  }

  onAwaitingApprovalDownloadIconClicked(rowId: number) {
    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
    .subscribe((result) => {
        if (result.doc_url === null || result.doc_url === '') {
          this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
        } else {
          this.store.dispatch(new LoadInlineDocumentLeaveProxyApply({recordId: rowId, isApproved: false}));
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

  onCancelViewer() {

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
      if (this.awaitingApprovalData) {
        if (filterValue) {
          this.awaitingApprovalData.clearFilter();
          this.awaitingApprovalData.filteringLogic = FilteringLogic.Or;
          this.awaitingApprovalData.filter(
            filterValue,
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        } else {
          this.awaitingApprovalData.clearFilter();
          this.awaitingApprovalData.filteringLogic = FilteringLogic.Or;
          this.awaitingApprovalData.filterGlobal(
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

  resetForm(){
    this.editor.fs.form = this.editor.fs.buildForm();
    this.historicalEditor.fs.form = this.historicalEditor.fs.buildForm();
    this.store.dispatch(new HideFullFormLeaveProxyApply());
  }

}
