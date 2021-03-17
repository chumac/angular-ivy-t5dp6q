
import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IAppState } from '@nutela/store/app-state';

import { IWorkflowMessage } from '@nutela/models/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { NotProcessingDecline, LoadQueueList } from '../../../store/approval';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { RequestEditorService } from './request-editor.service';
import { ISelectOption, IErrorMessage } from '@nutela/models/core-data';
import { WorkLifeDataLoadWorkflowMessages } from '@nutela/store/modules/workforce/employee-profiles';
import { ILeaveDailyData } from '@nutela/models/workforce/leave';
import { LoadDataLeaveEdit, getLeaveEditData, isProcessingLeaveEdit, SaveLeaveEdit, ProcessingLeaveEdit } from '../../../store/leave-edit';
import { filter, take } from 'rxjs/operators';
import { ISubscriptions } from '@nutela/models/common';
import { ShowToast } from '@nutela/store/shared'; 
import { ExternalNotificationService } from '@nutela/shared/ui';
import { LoadQueueNotification } from 'libs/store/shared/src/lib/notification';

@Component({
  selector: 'x365-fm-approvals-request-editor',
  templateUrl: './request-editor.component.html',
  styleUrls: ['./request-editor.component.scss'],
  providers: [RequestEditorService, ExternalNotificationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestEditorComponent extends BaseFormComponent implements OnInit, OnDestroy  {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IWorkflowMessage;
  @Input() public activePersonnel: ISelectOption[];

  @Output() cancelClick = new EventEmitter<any>();
  @Output() workCompleted = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  leaveEditData$: Observable<ILeaveDailyData>;

  private subscriptions: ISubscriptions = {};

  constructor(public fs: RequestEditorService, private notificationService: ExternalNotificationService, public utilService: UtilService, private store: Store<IAppState>, private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingLeaveEdit));
    this.leaveEditData$ = this.store.pipe(select(getLeaveEditData));
  }

  storeDispatches() {

  }

  loadData() {
    if (this.data) {
      this.store.dispatch(new LoadDataLeaveEdit(this.data.msg_id));
      this.displayData();
    }
  }

  displayData() {
    this.reset();
    this.subscriptions['leaveEditData'] =  this.leaveEditData$.pipe(filter(plan => plan !== null), take(1))
      .subscribe((data: ILeaveDailyData) => {
        if (data) {
          this.fs.init(data);
        }
      });
  }

  get subTitle() {
    return "Edit leave request";
  }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingLeaveEdit());
      this.store.dispatch(new SaveLeaveEdit({body: this.fs.value, recordId: this.data.msg_id}));
    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }
  

  getBody(item: IWorkflowMessage): any {
    const body = {
      'msg_status': 2,
      'exit_comments': this.fs.exitComment.value,
      'redirect_to': '',
      'finalize_transaction': true,
      'use_manual': false,
      'send_to_specific_employee_logon': '',
      'is_temp_permission': true,
    };

    return body;
  }

  triggerRefresh() {
    this.store.dispatch(new WorkLifeDataLoadWorkflowMessages({id:this.fs.queueId?this.fs.queueId:0}));
    this.store.dispatch(new LoadQueueList());
    this.store.dispatch(new LoadQueueNotification());
  }

  getMethodErrorMessage(errorMessages: IErrorMessage[]): string {
    return this.utilService.errorHtmlString(errorMessages);
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.reset();
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
    this.cancelClick.emit();
  }

  reset() {
    this.fs.init({
        no_of_days: null,
        start_date: null,
        assigned_backup_id: null
    });
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
