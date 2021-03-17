import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LeaveReturnService } from './leave-return.service';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, ApiService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { BaseFormComponent } from '@nutela/shared/app-global';

// import { HideEditorLeaveReturn, NotProcessingLeaveReturn, ProcessingLeaveReturn, SaveLeaveReturn, isProcessingLeaveReturn, IAbsenceState } from '@nutela/feature-module-ui/workforce/absence-ui';
import { ILeaveDailyData } from '@nutela/models/workforce/leave';
import { ShowToast } from '@nutela/store/shared';
import { IAbsenceState } from '../../../store/root';
import { isProcessingLeaveReturn, NotProcessingLeaveReturn, ProcessingLeaveReturn, SaveLeaveReturn, HideEditorLeaveReturn } from '../../../store/leave-return';

@Component({
  selector: 'x365-fm-workforce-absence-leave-return',
  templateUrl: './leave-return.component.html',
  styleUrls: ['./leave-return.component.scss'],
  providers: [LeaveReturnService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaveReturnComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ILeaveDailyData;


  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  isProcessing$: Observable<boolean>;
  activePersonnelDataSource: any = null;

  constructor(
    public fs: LeaveReturnService,
    public utilService: UtilService,
    public apiService: ApiService,
    private store: Store<IAbsenceState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingLeaveReturn));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    const earlyResumptn = this.isGreaterThanResumptnDate(new Date(this.fs.returnDate.value), new Date(this.data.resumption_date));
    const lateResumptn = this.isLessThanResumptnDate(new Date(this.fs.returnDate.value), new Date(this.data.resumption_date));
    if (this.fs.valid) {
      if (new Date(this.fs.returnDate.value) < new Date(this.data.start_date)) {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Your return date is invalid. It cannot be earlier than the start date of your leave.', options: toastOptionsError()}));
        this.store.dispatch(new NotProcessingLeaveReturn());
      } else if(earlyResumptn && this.fs.returnComment.value === null) {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'You are returning earlier than your expected return date. Please, provide comments regarding your early resumption.', options: toastOptionsError()}));
        this.store.dispatch(new NotProcessingLeaveReturn());
      } else if(lateResumptn && this.fs.returnComment.value === null){
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'You are returning later than your expected return date. Please, provide comments regarding your late resumption.', options: toastOptionsError()}));
        this.store.dispatch(new NotProcessingLeaveReturn());
      }
      else{
        this.store.dispatch(new ProcessingLeaveReturn());
        this.store.dispatch(new SaveLeaveReturn({leaveReturnData: <ILeaveDailyData>this.fs.value, leaveTransId: this.data.leave_trans_id}));

      }

    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }


  }

  isGreaterThanResumptnDate(returnDate: Date, resumptnDate: Date): Boolean{
    if(returnDate < resumptnDate){
      return true;
    } else {
      return false;
    }
  }

  isLessThanResumptnDate(returnDate: Date, resumptnDate: Date): Boolean{
    if(returnDate > resumptnDate){
      return true;
    } else {
      return false;
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingLeaveReturn());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onCancelReturnEditor() {
    this.store.dispatch(new HideEditorLeaveReturn());
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
