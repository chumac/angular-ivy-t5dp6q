
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';
import { LeaveStaggeredEditorComponent } from './leave-staggered-editor/leave-staggered-editor.component';
import { LeaveStaggeredDetailEditorComponent } from './leave-staggered-detail-editor/leave-staggered-detail-editor.component';
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
import { ShowEditorLeaveStaggered, showViewerLeaveStaggered, showEditorLeaveStaggered, HideEditorLeaveStaggered, getLeaveStaggeredApprovedData, getLeaveStaggeredAwaitingApprovalData, LoadApprovedDataLeaveStaggered, LoadAwaitingApprovalDataLeaveStaggered, LoadLeaveStaggeredIdentity, DeleteDetailLeaveStaggered, DeleteMasterLeaveStaggered, showDetailEditorLeaveStaggered, ShowDetailEditorLeaveStaggered, HideDetailEditorLeaveStaggered, getLeaveStaggeredCurrencyList, LoadLeaveStaggeredCurrencyList, SaveLeaveStaggered, getLeaveStaggeredType, LoadLeaveStaggeredType, CancelLeaveStaggered, ReviewLeaveStaggered } from '../../store/leave-staggered';
import { ISelectOption } from '@nutela/models/core-data';
import { ILeaveDailyData, ILeaveStaggeredDetail, ILeaveContactInfo } from '@nutela/models/workforce/leave';
import * as constants from '@nutela/shared/app-global';
import { LeaveStaggeredService } from './leave-staggered.service';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { getLeaveContactInfo, LoadLeaveContactInfo } from '../../store/leave-daily';

@Component({
  selector: 'x365-fm-workforce-leave-staggered',
  templateUrl: './leave-staggered.component.html',
  styleUrls: ['./leave-staggered.component.scss'],
  providers: [LeaveStaggeredService],
})
export class LeaveStaggeredComponent implements OnInit {
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

  @ViewChild('editor') editor: LeaveStaggeredEditorComponent;
  @ViewChild('detail_editor') detail_editor: LeaveStaggeredDetailEditorComponent;
  @ViewChild('switch') switch: SwitchComponent;
  @ViewChild('approvedDataGrid') approvedDataGrid: IgxGridComponent;
  @ViewChild('awaitingApprovalDataGrid') awaitingApprovalDataGrid: IgxGridComponent;

  constructor(private store: Store<IAppState>,  public service: LeaveStaggeredService, private dialogBoxService: DialogBoxService, public utilService: UtilService,) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
    this.leaveTypes$ = this.store.pipe(select(getLeaveStaggeredType));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.contactInfo$ = this.store.pipe(select(getLeaveContactInfo));
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.showEditor$ = this.store.pipe(select(showEditorLeaveStaggered));
    this.showDetailEditor$ = this.store.pipe(select(showDetailEditorLeaveStaggered));
    this.showViewer$ = this.store.pipe(select(showViewerLeaveStaggered));
    this.approvedData$ = this.store.pipe(select(getLeaveStaggeredApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getLeaveStaggeredAwaitingApprovalData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadLeaveStaggeredType());
    this.store.dispatch(new LoadApprovedDataLeaveStaggered());
    this.store.dispatch(new LoadAwaitingApprovalDataLeaveStaggered());
    this.store.dispatch(new LoadLeaveContactInfo());  
  }

  onApplyBtnClicked() {
    this.store.dispatch(new LoadLeaveStaggeredIdentity());
    this.editor.data = null;
    this.editor.reset();
    this.editor.prePopulateForm();
    this.store.dispatch(new ShowEditorLeaveStaggered());
    this.editor.showSubForm();
  }

  onSubmitPlanIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to submit this leave data for approval?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new SaveLeaveStaggered({staggeredLeaveId: rowId}));
      }
    });
  }

  onDeletePlanIconClicked(id) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteMasterLeaveStaggered({recordId: id}));
      }
    });
  }

  onAddDetailIconClicked(rowId: number, supportPayment: boolean) {
    this.detail_editor.data = null;
    this.detail_editor.leaveStaggeredId = rowId;
    this.detail_editor.supportPayment = supportPayment;
    this.detail_editor.reset();
    this.store.dispatch(new ShowDetailEditorLeaveStaggered());
  }

  onEditDetailIconClicked(data) {
    this.detail_editor.data = null;
    this.detail_editor.data = data;
    this.detail_editor.leaveStaggeredId = data.id;
    this.detail_editor.reset();
    this.store.dispatch(new ShowDetailEditorLeaveStaggered());
  }

  onDeleteDetailIconClicked(data: ILeaveStaggeredDetail) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDetailLeaveStaggered({recordId: data.id}));
        }
      });
  }

  onCancelRecordIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to cancel this leave record?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new CancelLeaveStaggered({leaveStaggeredId: rowId}));
        }
      });
  }

  onReviewRecordIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to review this record? Note: This leave record would be reverted to pending status`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new ReviewLeaveStaggered({leaveStaggeredId: rowId}));
        }
      });
  }

  onRefreshBtnClicked() {
    this.store.dispatch(new LoadApprovedDataLeaveStaggered());
    this.store.dispatch(new LoadAwaitingApprovalDataLeaveStaggered());
    this.store.dispatch(new ShowToast({title: null, message: `Staggered Leave Information is being refreshed.`, type: ToastTypes.INFO}));

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
    this.store.dispatch(new HideEditorLeaveStaggered());
  }

  onCancelDetailEditor() {
    this.store.dispatch(new HideDetailEditorLeaveStaggered());
  }

  onCancelViewer() {
    // this.store.dispatch(new HideViewerLeaveStaggered());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
    
  }
}
