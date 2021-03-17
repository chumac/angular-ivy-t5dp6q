import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IAppState } from '@nutela/store/app-state';

import { IWorkflowMessage } from '@nutela/models/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { NotProcessingApproval, ProcessingApproval, isProcessingApproval, HideApproveEditor, LoadQueueList } from '../../../store/approval';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ApproveEditorService } from './approve-editor.service';
import { ISelectOption, IErrorMessage } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { WorkLifeDataLoadWorkflowMessages, WorkLifeDataLoadWorkflowSubmissions } from '@nutela/store/modules/workforce/employee-profiles';
import { ExternalNotificationService } from '@nutela/shared/ui';
import { LoadQueueNotification } from 'libs/store/shared/src/lib/notification';

@Component({
  selector: 'x365-fm-approvals-approve-editor',
  templateUrl: './approve-editor.component.html',
  styleUrls: ['./approve-editor.component.scss'],
  providers: [ApproveEditorService, ExternalNotificationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApproveEditorComponent extends BaseFormComponent implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IWorkflowMessage[];
  @Input() public activePersonnel: ISelectOption[];

  @Output() cancelClick = new EventEmitter<any>();
  @Output() workCompleted = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;

  constructor(public fs: ApproveEditorService, public utilService: UtilService, private store: Store<IAppState>, private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingApproval));
  }

  get subTitle() {
    if (this.data && this.data.length === 1) {
      return `Approve selected notification`;
    } else if (this.data && this.data.length > 1) {
      return `Approve selected notifications (${this.data.length} items)`;
    } else {
      return `Approve selected notification(s)`;
    }
  }

  get showActivePersonnel(): boolean {
    if (this.data && this.data.length > 0) {
      const item: IWorkflowMessage = this.data[0];
      if (item.use_manual === true && item.is_temp_permission === false) {
        return true;
      }
    }

    return false;
  }

  onSubmit() {
    let errorMessages: IErrorMessage[] = [];
    let errorMessage: IErrorMessage = {
      title: 'Errors',
      messages: []
    }
    errorMessages.push(errorMessage);

    let workCount = 0;

    if (this.fs.valid) {
      this.store.dispatch(new ProcessingApproval());

      for (let i = 0; i < this.data.length ; i++) {
        const item = this.data[i];
        const body = this.getBody(item);

        this.fs.approve(item.msg_id, item.msg_queue_source, body).subscribe(result => {
          workCount = workCount + 1;

          if (!result.Success) {
            errorMessage.messages.push(result.ErrorMessage);
          }

          if (this.data.length === workCount) {
            if (errorMessage.messages.length > 0) {
              this.store.dispatch(new ShowToast({title: null, message: this.getErrorMessage(errorMessages), type: ToastTypes.ERROR}));
            }

            if (errorMessage.messages.length !== this.data.length) {
              let messageText = 'Task was approved successfully';

              if (this.data.length > 1) {
                messageText = `Tasks were approved successfully`;
              }

              this.store.dispatch(new ShowToast({title: null, message: messageText, type: ToastTypes.SUCCESS}));
            }

            this.store.dispatch(new NotProcessingApproval());
            this.store.dispatch(new HideApproveEditor());
            this.reset();

            this.workCompleted.emit();
            this.triggerRefresh();
          }
        }, (error) => {
          workCount = workCount + 1;
          errorMessage.messages.push('Error occured while updating');

          if (this.data.length === workCount) {
            if (errorMessage.messages.length > 0) {
              this.store.dispatch(new ShowToast({title: null, message: this.getErrorMessage(errorMessages), type: ToastTypes.ERROR}));
            }

            this.store.dispatch(new NotProcessingApproval());
            this.triggerRefresh();
          }
        });
      }
    } else {
      this.store.dispatch(new ShowToast({title: `Correct the following Errors`, message: this.getErrorMessage(errorMessages), type: ToastTypes.ERROR}));
    }
  }

  getBody(item: IWorkflowMessage): any {
    let body = {};

    if (item.use_manual === true) {
      if (item.is_temp_permission === true) {
        body = {
          'msg_status': 1,
          'exit_comments': this.fs.exitComment.value,
          'redirect_to': '',
          'finalize_transaction': true,
          'use_manual': true,
          'send_to_specific_employee_logon': '',
          'is_temp_permission': true
        };
      } else {
        body = {
          'msg_status': 1,
          'exit_comments': this.fs.exitComment.value,
          'redirect_to': '',
          'finalize_transaction': false,
          'use_manual': true,
          'send_to_specific_employee_logon': this.fs.sendToEmployee.value,
          'is_temp_permission': false
        };
      }
    } else {
      body = {
        'msg_status': 1,
        'exit_comments': this.fs.exitComment.value,
        'redirect_to': '',
        'finalize_transaction': false,
        'use_manual': false,
        'send_to_specific_employee_logon': '',
        'is_temp_permission': false
      };
    }

    return body;
  }

  triggerRefresh() {
    this.store.dispatch(new WorkLifeDataLoadWorkflowMessages({id:this.fs.queueId?this.fs.queueId:0}));
    this.store.dispatch(new WorkLifeDataLoadWorkflowSubmissions());
    this.store.dispatch(new LoadQueueList());
    this.store.dispatch(new LoadQueueNotification());
  }

  getErrorMessage(errorMessages: IErrorMessage[]): string {
    return this.utilService.errorHtmlString(errorMessages);
  }

  onCancel() {
    this.store.dispatch(new NotProcessingApproval());
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
  }

  ngOnDestroy() {
  }
}
