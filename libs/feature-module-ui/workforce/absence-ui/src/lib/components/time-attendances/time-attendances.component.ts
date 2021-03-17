import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorTimeAttendance, showViewerTimeAttendance, getTimeAttendanceData, LoadDataTimeAttendance, ShowEditorTimeAttendance, HideEditorTimeAttendance, DeleteDataTimeAttendance, ShowViewerTimeAttendance, isProcessingTimeAttendance, ProcessingTimeAttendance, HideViewerTimeAttendance, RemoveDataTimeAttendance, isLoadingTimeAttendance, LoadingTimeAttendance } from '../../store/time-attendance';
import { TimeAttendancesEditorComponent } from './time-attendances-editor/time-attendances-editor.component';
import { TimeAttendancesViewerComponent } from './time-attendances-viewer/time-attendances-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { TimeAttendancesService } from './time-attendances.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, APPROVAL_STATUS } from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { ITimeAttendance } from '@nutela/models/workforce/leave';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';


@Component({
  selector: 'x365-fm-workforce-absence-time-attendances',
  templateUrl: './time-attendances.component.html',
  styleUrls: ['./time-attendances.component.scss'],
  providers: [TimeAttendancesService],

})
export class TimeAttendancesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  activePersonnelHr$: Observable<ISelectOption[]>;

  timeAttendanceData$: Observable<ITimeAttendance[]>;
  approvedData$: Observable<ITimeAttendance[]>;
  awaitingApprovalData$: Observable<ITimeAttendance[]>;


  @ViewChild('editor') editor: TimeAttendancesEditorComponent;
  @ViewChild('viewer') viewer: TimeAttendancesViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('employeeLookup') employeeLookup: DxLookupComponent;
  @ViewChild('yearLookup') yearLookup: DxLookupComponent;
  @ViewChild('monthLookup') monthLookup: DxLookupComponent;

  dropDownFilterValue: string;
  filterByDateSelected: boolean;

  constructor(private store: Store<IAppState>, public service: TimeAttendancesService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new RemoveDataTimeAttendance());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorTimeAttendance));
    this.showViewer$ = this.store.pipe(select(showViewerTimeAttendance));
    this.isLoading$ = this.store.pipe(select(isLoadingTimeAttendance));
    this.timeAttendanceData$ = this.store.pipe(select(getTimeAttendanceData));
    this.activePersonnelHr$ = this.store.pipe(select(getActivePersonnelHR));
  }

  getRowData$(rowId: number): Observable<ITimeAttendance> {
    return this.timeAttendanceData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();
    this.store.dispatch(new ShowEditorTimeAttendance());
  }

  onRefreshButtonClicked(){
    if(this.employeeLookup.value) {
      this.storeDispatches();
      this.store.dispatch(new LoadDataTimeAttendance({employeeId: this.employeeLookup.value, year: this.yearLookup.value, month: this.monthLookup.value}));
      this.store.dispatch(new ShowToast({title: null, message: `Time and Attendance information is being refreshed.`, type: ToastTypes.INFO}));
    } else {
      this.store.dispatch(new ShowToast({title: null, message: `Select an employee.`, type: ToastTypes.ERROR}));
    }
  }

  onFetchTimeAttendanceClicked($event, year, month) {
    if(this.employeeLookup.value) {
      this.store.dispatch(new LoadingTimeAttendance());
      this.store.dispatch(new LoadDataTimeAttendance({employeeId: this.employeeLookup.value, year: year, month: month}));
      } else {
      this.store.dispatch(new ShowToast({title: null, message: `Select an employee.`, type: ToastTypes.ERROR}));
    }
  }

  onEditIconClicked(rowId: number) {
    if(this.employeeLookup.value) {
      this.editor.data = null;

      this.getRowData$(rowId).pipe(take(1))
        .subscribe((result) => {
            this.editor.data = result;
            this.editor.employeeId = this.employeeLookup.value;
            this.editor.selectedYear = this.yearLookup.value;
            this.editor.selectedMonth = this.monthLookup.value;
            this.editor.reset();
            this.store.dispatch(new ShowEditorTimeAttendance());
          }
        );
    } else {
      this.store.dispatch(new ShowToast({title: null, message: `Select an employee.`, type: ToastTypes.ERROR}));
    }
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerTimeAttendance());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    if(this.employeeLookup.value) {
      this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataTimeAttendance({recordId: rowId, employeeId: this.employeeLookup.value, year: this.yearLookup.value, month: this.monthLookup.value}));
        }
      });
    } else {
      this.store.dispatch(new ShowToast({title: null, message: `Select an employee.`, type: ToastTypes.ERROR}));
    }
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorTimeAttendance());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerTimeAttendance());
  }

  filter(term: string, filterValue: string) {
    if (this.grid) {
      if (filterValue) {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
    this.filterByDateSelected = (data.value === 'transaction_date')?true:false;
  }

  onDateFilterSelectBoxChanged($event) {
    let term = $event.value;
    let filterValue = 'transaction_date';
    this.filter(term, filterValue);
  }


  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


}
