import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { LeaveProxyResetEditorService } from './leave-proxy-reset-editor.service';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { DialogService } from '@nutela/shared/ui';

import { showEditorLeaveProxyReset, ProcessingLeaveProxyApply, isProcessingLeaveProxyApply, SaveLeaveProxyReset } from '../../../../store/leave-proxy-apply';
import { LeaveDailyLoadEntitlements } from '../../../../store/leave-daily';
import { IAbsenceState } from '../../../../store/root';
import { ILeaveType } from '@nutela/models/workforce/leave';
import { ISelectOption } from '@nutela/models/core-data';

import DataSource from 'devextreme/data/data_source';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { LoadLeaveTypes, leaveTypes } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { take } from 'rxjs/internal/operators';

@Component({
  selector: 'x365-fm-workforce-absence-leave-proxy-reset-editor',
  templateUrl: './leave-proxy-reset-editor.component.html',
  styleUrls: ['./leave-proxy-reset-editor.component.scss'],
  providers: [LeaveProxyResetEditorService]
})
export class LeaveProxyResetEditorComponent extends BaseFormComponent
  implements OnInit, OnChanges {

  showEditor$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  leaveTypes$: Observable<ILeaveType[]>;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public comprehensiveData: IComprehensiveData;
  @Input() public data: any;
  @Input() public leaveTypes: ISelectOption[];
  @Input() public activePersonnel: ISelectOption[];
  @Input() public selectedEmployeeId: number;

  @Output() cancelClick = new EventEmitter<any>();


  activePersonnelDataSource: any = null;

  constructor(
    public fs: LeaveProxyResetEditorService,
    public utilService: UtilService,
    private store: Store<IAbsenceState>,
    private dialogService: DialogService,
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activePersonnel']) {
      this.activePersonnelDataSource = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }
    if (changes['selectedEmployeeId']) {
      console.log(this.selectedEmployeeId)
      this.fs.init({ selectedEmployeeId: this.selectedEmployeeId })
    }
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LeaveDailyLoadEntitlements());
    this.store.dispatch(new LoadLeaveTypes());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingLeaveProxyApply));
    this.showEditor$ = this.store.pipe(select(showEditorLeaveProxyReset));
    this.leaveTypes$ = this.store.pipe(select(leaveTypes));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onLeaveTypeSelected($event) {
    console.log($event)
  }

  onSubmit() {
    if (this.fs.valid) {
      this.dialogService.show(this.dialogService.options(), `This action will reset ${this.fs.value.leave_id ? 'this' : 'all'} leave record${this.fs.value.leave_id ? '' : 's'} for this employee. Continue?`);

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingLeaveProxyApply());
          this.store.dispatch(new SaveLeaveProxyReset({ data: this.fs.value }));
        }
      });
    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancelEditor() {
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
  }
}
