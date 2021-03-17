import { Component, OnInit, ViewChild } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { SwitchComponent, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';

import { ISubscriptions } from '@nutela/models/common';
import { LoadApprovedDataTimeSheet, LoadAwaitingApprovalDataTimeSheet, showEditorTimeSheet, showViewerTimeSheet, HideEditorTimeSheet, HideViewerTimeSheet, ShowEditorTimeSheet, getTimeSheetApprovedData, getTimeSheetAwaitingApprovalData, LoadDayStreamDataTimeSheet, LoadingDayStream, ClearDayStreamDataTimeSheet, ShowViewerTimeSheet, DeleteTimeSheet, ResetTimeSheet, SubmitTimeSheet, ArchiveTimeSheet, RecallTimeSheet } from '../../store/time-sheet';
import { TimeSheetService } from './time-sheets.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { TimeSheetsEditorComponent } from './time-sheets-editor/time-sheets-editor.component';
import { TimeSheetsViewerComponent } from './time-sheets-viewer/time-sheets-viewer.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CreateTimeSheetComponent } from '../common/create-time-sheet/create-time-sheet.component';
import { ITimeSheetData } from '@nutela/models/workforce/time-sheet';
import { map, take } from 'rxjs/operators';
import { LoadProjects, LoadCostCenters, LoadWorkHourTypes } from '@nutela/store/modules/foundation';
import { IAppState } from '@nutela/store/app-state';
import { Router } from '@angular/router';
import * as constants from '../../constants'
import { RecallTimeSheetComponent } from '../common/recall-time-sheet/recall-time-sheet.component';
import { timeSheetStatus } from '@nutela/shared/app-global'; 

@Component({
  selector: 'x365-fm-workforce-time-time-sheets',
  templateUrl: './time-sheets.component.html',
  styleUrls: ['./time-sheets.component.scss'],
  providers: [TimeSheetService]
})
export class TimeSheetsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  approvedData$: Observable<ITimeSheetData[]>;
  awaitingApprovalData$: Observable<ITimeSheetData[]>;

  timeSheetDialogRef: MatDialogRef<CreateTimeSheetComponent>;
  recallTimeSheetDialogRef: MatDialogRef<RecallTimeSheetComponent>;

  @ViewChild('switch') switch: SwitchComponent;
  @ViewChild('approvedDataGrid') approvedDataGrid: IgxGridComponent;
  @ViewChild('awaitingDataGrid') awaitingDataGrid: IgxGridComponent;
  @ViewChild('editor') editor: TimeSheetsEditorComponent;
  @ViewChild('viewer') viewer: TimeSheetsViewerComponent;

  isProcessing$: Observable<boolean>;
  dropDownFilterValue: string;
  status = timeSheetStatus;

  private subscriptions: ISubscriptions = {};

  constructor(private store: Store<IAppState>, private router: Router, public service: TimeSheetService, private dialogBoxService: DialogBoxService, private dialog: MatDialog) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorTimeSheet));
    this.showViewer$ = this.store.pipe(select(showViewerTimeSheet));

    this.approvedData$ = this.store.pipe(select(getTimeSheetApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getTimeSheetAwaitingApprovalData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataTimeSheet());
    this.store.dispatch(new LoadAwaitingApprovalDataTimeSheet());
    this.store.dispatch(new LoadCostCenters());
  }

  onAddBtnClicked() {
    this.timeSheetDialogRef = this.dialog.open(CreateTimeSheetComponent, {
      width: '500px',
      data: null,
      panelClass: 'custom-dialog-container'
    });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this time sheet?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new ArchiveTimeSheet({recordId: rowId}));
        }
      });
  }

  onSubmitIconClicked(rowId: number) {
    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
    .subscribe((result: ITimeSheetData) => { 
        if(result?result.is_recall:false){
          this.submitRecallTimeSheet(rowId);
        } else {
          this.dialogBoxService.show(`You are about to submit this timesheet for approval`).pipe(take(1))
          .subscribe((command: string) => {
            if (command === DialogBoxCommandTypes.COMMAND1) {
              this.store.dispatch(new SubmitTimeSheet({recordId: rowId}));
            }
          });
        }
      }
    );

  }

  onResetIconClicked(rowId: number) {
    this.dialogBoxService.show(`You are about to clear this time sheet`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new ResetTimeSheet({recordId: rowId}));
      }
    });
  }

  onViewApprovedIconClicked(rowId: number) {
    this.getRowApprovedData$(rowId).pipe(take(1))
    .subscribe((result) => {   
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerTimeSheet());
      }
    );
  }

  onViewAwaitingApprovalIconClicked(rowId: number) {
    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
    .subscribe((result) => {   
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerTimeSheet());
      }
    );
  }

  onRecallIconClicked(rowId: number) {
    this.dialogBoxService.show(`You are about to recall this time sheet`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new RecallTimeSheet({recordId: rowId}));
      }
    });
  }

  onArchiveIconClicked(rowId: number) {
    this.dialogBoxService.show(`You are about to archive this time sheet`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new ArchiveTimeSheet({recordId: rowId}));
      }
    });
  }

  onRefreshBtnClicked() {
    this.store.dispatch(new ShowToast({title: null, message: `Time Sheet is being refreshed.`, type: ToastTypes.INFO}));
    this.storeDispatches()
  }

  getRowApprovedData$(rowId: number): Observable<ITimeSheetData> {
    return this.approvedData$.pipe(
      map(d => d.filter(data => data.tms_id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<ITimeSheetData> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(data => data.tms_id === rowId)),
      map(e => e.shift()))
  }

  showApprovedEditor(rowId: any) {

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {   
        this.router.navigate([constants.TIME_SHEET_DATA_URLs.LoadDayStreamDataTimeSheet, result.tms_id], { skipLocationChange: false });
        }
      );
  }

  showAwaitingApprovalEditor(rowId: any) {

    this.getRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {   
        this.router.navigate([constants.TIME_SHEET_DATA_URLs.LoadDayStreamDataTimeSheet, result.tms_id], { skipLocationChange: false });
        }
      );
  }

  submitRecallTimeSheet(rowId: number) {
    this.recallTimeSheetDialogRef = this.dialog.open(RecallTimeSheetComponent, {
      width: '450px',
      data: rowId,
      panelClass: 'custom-dialog-container'
    });
  }

  onCancelEditor() {
    this.store.dispatch(new ClearDayStreamDataTimeSheet());
    this.store.dispatch(new HideEditorTimeSheet());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerTimeSheet());
  }

  onFilterListselected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string, grid: boolean) {
    if(!grid) {
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

    if(grid) {
      if (this.awaitingDataGrid) {
        if (filterValue) {
          this.awaitingDataGrid.clearFilter();
          this.awaitingDataGrid.filteringLogic = FilteringLogic.Or;
          this.awaitingDataGrid.filter(
            filterValue,
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        } else {
          this.awaitingDataGrid.clearFilter();
          this.awaitingDataGrid.filteringLogic = FilteringLogic.Or;
          this.awaitingDataGrid.filterGlobal(
            term,
            IgxStringFilteringOperand.instance().condition('contains'),
            false
          );
        }
      }
    }
  }

}
