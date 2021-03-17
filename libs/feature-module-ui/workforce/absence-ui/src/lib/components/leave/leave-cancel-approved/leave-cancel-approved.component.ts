import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LeaveCancelApprovedService } from './leave-cancel-approved.service';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, ApiService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { BaseFormComponent } from '@nutela/shared/app-global';

import { isProcessingLeaveCancelApproved, ProcessingLeaveCancelApproved, SaveLeaveCancelApproved, NotProcessingLeaveCancelApproved, HideEditorLeaveCancelApproved } from '../../../store/leave-cancel-approved';
import { ILeaveDailyData } from '@nutela/models/workforce/leave';

import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { ShowToast } from '@nutela/store/shared';
import { IAbsenceState } from '../../../store/root';


@Component({
  selector: 'x365-fm-workforce-absence-leave-cancel-approved',
  templateUrl: './leave-cancel-approved.component.html',
  styleUrls: ['./leave-cancel-approved.component.scss'],
  providers: [LeaveCancelApprovedService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveCancelApprovedComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public comprehensiveData: IComprehensiveData;
  @Input() public data: ILeaveDailyData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: LeaveCancelApprovedService,
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
    this.isProcessing$ = this.store.pipe(select(isProcessingLeaveCancelApproved));
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
        this.store.dispatch(new ProcessingLeaveCancelApproved());
        this.store.dispatch(new SaveLeaveCancelApproved({leaveCancelApprovedData: <ILeaveDailyData>this.fs.value, leaveTransId: this.data.leave_trans_id}));
    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingLeaveCancelApproved());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onCancelApprovedEditor() {
    this.store.dispatch(new HideEditorLeaveCancelApproved());
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
