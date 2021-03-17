import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LeaveHourlyApplyService } from './leave-hourly-apply.service';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, ApiService, toastOptionsError, formatDate } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { BaseFormComponent } from '@nutela/shared/app-global';

// import { NotProcessingLeaveHourly, isProcessingLeaveHourly, ProcessingLeaveHourly, SaveLeaveHourly, IAbsenceState } from '@nutela/feature-module-ui/workforce/absence-ui';
import { ILeaveHourlyData, LeaveDailyModes } from '@nutela/models/workforce/leave';
import { ISelectOption } from '@nutela/models/core-data';

import DataSource from 'devextreme/data/data_source';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { ShowToast } from '@nutela/store/shared';
import { IAbsenceState } from '../../../store/root';
import { isProcessingLeaveHourly, ProcessingLeaveHourly, SaveLeaveHourly, NotProcessingLeaveHourly } from '../../../store/leave-hourly';

@Component({
  selector: 'x365-fm-workforce-absence-leave-hourly-apply',
  templateUrl: './leave-hourly-apply.component.html',
  styleUrls: ['./leave-hourly-apply.component.scss'],
  providers: [LeaveHourlyApplyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveHourlyApplyComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  leaveTypes$: Observable<ISelectOption[]>;
  isProcessing$: Observable<boolean>;
  activePersonnelDataSource: any = null;


  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public comprehensiveData: IComprehensiveData;

  @Input() public data: ILeaveHourlyData;
  @Input() public hourlyLeaveEntitlement: any;
  @Input() public leaveTypes: ISelectOption[];
  @Input() public activePersonnel: ISelectOption[];
  @Input() public mode: LeaveDailyModes;

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
      this.fs.init(this.data);
      this.subscriptions();
    }

    if(changes['hourlyLeaveEntitlement']) {
      this.fs.init(this.data);
      this.subscriptions();
    }

    if(changes['selectOptionData']) {
      this.fs.init(this.data);
      this.subscriptions();
    }
  }


  constructor(
    public fs: LeaveHourlyApplyService,
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

  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingLeaveHourly));
  }

  subscriptions() {
    this.fs.entitlement.setValue(this.hourlyLeaveEntitlement + ' Hours');
    this.fs.supervisorId.setValue(this.comprehensiveData.reports_to_id);
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
      this.fs.f.removeControl('entitlementHourly');
      this.fs.requestDate.setValue(formatDate(this.fs.requestDate.value));
      this.store.dispatch(new ProcessingLeaveHourly());
      this.store.dispatch(new SaveLeaveHourly({leaveData: <ILeaveHourlyData>this.fs.value, saveMode: this.mode}));

    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }

  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingLeaveHourly());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.leaveId.reset();
    this.fs.requestDate.reset();
    this.fs.numberOfHours.reset();
    this.fs.leaveReason.reset();
    this.fs.assignedBackupId.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}

