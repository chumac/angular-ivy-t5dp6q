import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, ApiService, toastOptionsError, formatDate } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { BaseFormComponent } from '@nutela/shared/app-global';
import * as constants from '@nutela/shared/app-global';

import { isProcessingLeaveHistorical, NotProcessingLeaveHistorical, HideEditorLeaveHistorical, SaveLeaveHistorical, ProcessingLeaveHistorical } from '../../../store/leave-historical';
import { IAbsenceState } from '../../../store/root';
import { ILeaveDailyData, ILeaveEntitlement, LeaveDailyModes } from '@nutela/models/workforce/leave';
import { ISelectOption, INationalitySelectOption, IStateSelectOption, IApiResult } from '@nutela/models/core-data';

import DataSource from 'devextreme/data/data_source';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { LoadLeaveTypes, leaveTypes } from '@nutela/store/modules/foundation';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { LeaveHistoricalService } from './leave-historical.service';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-workforce-absence-leave-historical',
  templateUrl: './leave-historical.component.html',
  styleUrls: ['./leave-historical.component.scss'],
  providers: [LeaveHistoricalService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveHistoricalComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  showEditor$: Observable<boolean>;

  leaveTypes$: Observable<ISelectOption[]>;
  leaveEntitlements$: Observable<ILeaveEntitlement[]>;
  leaveEntitlement$: Observable<ILeaveEntitlement>;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public comprehensiveData: IComprehensiveData;

  @Input() public data: ILeaveDailyData;
  @Input() public leaveTypes: ISelectOption[];
  @Input() public activePersonnel: ISelectOption[];
  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['activePersonnel']) {
      this.activePersonnelDataSource = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }

    if(changes['data']) {
      this.fs.init(this.data, this.selectOptionData);
    }
  }

  @ViewChild('employeeLookup') employeeLookup: DxLookupComponent; 

  isProcessing$: Observable<boolean>;
  activePersonnelDataSource: any = null;
  reasonOptions = constants.LEAVE_RETURN_REASON_CONSTANTs

  constructor(
    public fs: LeaveHistoricalService,
    public utilService: UtilService,
    public apiService: ApiService,
    private store: Store<IAbsenceState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadLeaveTypes());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingLeaveHistorical));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.fs.valid) {
      this.fs.startDate.setValue(formatDate(this.fs.startDate.value));
      this.fs.endDate.setValue(formatDate(this.fs.endDate.value));
      this.store.dispatch(new ProcessingLeaveHistorical());
      this.store.dispatch(new SaveLeaveHistorical({leaveData: <ILeaveDailyData>this.fs.value}));
    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }

  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingLeaveHistorical());
    this.reset();
    this.cancelClick.emit();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorLeaveHistorical());
  }

  reset() {
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data, this.selectOptionData);
  }

  ngOnDestroy() {
  }
}
