import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LeaveHourlyCancelApprovedService } from './leave-hourly-cancel-approved.service';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, ApiService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { BaseFormComponent } from '@nutela/shared/app-global';

// import { ProcessingLeaveHourlyCancelApproved, SaveLeaveHourlyCancelApproved, isProcessingLeaveHourlyCancelApproved, NotProcessingLeaveHourlyCancelApproved, IAbsenceState } from '@nutela/feature-module-ui/workforce/absence-ui';
import { ILeaveHourlyData } from '@nutela/models/workforce/leave';

import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { ShowToast } from '@nutela/store/shared';
import { IAbsenceState } from '../../../store/root';
import { isProcessingLeaveHourlyCancelApproved, ProcessingLeaveHourlyCancelApproved, SaveLeaveHourlyCancelApproved, NotProcessingLeaveHourlyCancelApproved } from '../../../store/leave-hourly-cancel-approved';

@Component({
  selector: 'x365-fm-workforce-absence-leave-hourly-cancel-approved',
  templateUrl: './leave-hourly-cancel-approved.component.html',
  styleUrls: ['./leave-hourly-cancel-approved.component.scss'],
  providers: [LeaveHourlyCancelApprovedService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveHourlyCancelApprovedComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  isProcessing$: Observable<boolean>;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public comprehensiveData: IComprehensiveData;
  @Input() public data: ILeaveHourlyData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(
    public fs: LeaveHourlyCancelApprovedService,
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
    this.isProcessing$ = this.store.pipe(select(isProcessingLeaveHourlyCancelApproved));
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
        this.store.dispatch(new ProcessingLeaveHourlyCancelApproved());
        this.store.dispatch(new SaveLeaveHourlyCancelApproved({leaveCancelApprovedData: <ILeaveHourlyData>this.fs.value, leaveTransId: this.data.leave_trans_id}));
    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingLeaveHourlyCancelApproved());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
