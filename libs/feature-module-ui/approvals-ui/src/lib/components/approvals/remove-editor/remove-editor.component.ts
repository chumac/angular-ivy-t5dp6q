
import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IAppState } from '@nutela/store/app-state';

import { IWorkflowMessage } from '@nutela/models/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { isProcessingRemove, ProcessingRemove, NotProcessingRemove, HideRemoveEditor, LoadQueueList } from '../../../store/approval';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { RemoveEditorService } from './remove-editor.service';
import { ISelectOption, IErrorMessage } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { WorkLifeDataLoadWorkflowMessages, WorkLifeDataLoadWorkflowSubmissions } from '@nutela/store/modules/workforce/employee-profiles';
import { ExternalNotificationService } from '@nutela/shared/ui';
import { LoadQueueNotification } from 'libs/store/shared/src/lib/notification';

@Component({
  selector: 'x365-fm-approvals-remove-editor',
  templateUrl: './remove-editor.component.html',
  styleUrls: ['./remove-editor.component.scss'],
  providers: [RemoveEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveEditorComponent extends BaseFormComponent implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IWorkflowMessage[];
  @Input() public activePersonnel: ISelectOption[];

  @Output() cancelClick = new EventEmitter<any>();
  @Output() workCompleted = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;

  constructor(public fs: RemoveEditorService, private notificationService: ExternalNotificationService, public utilService: UtilService, private store: Store<IAppState>, private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingRemove));
  }

  get subTitle() {
    if (this.data && this.data.length === 1) {
      return `Remove selected notification`;
    } else if (this.data && this.data.length > 1) {
      return `Remove selected notifications (${this.data.length} items)`;
    } else {
      return `Remove selected notification(s)`;
    }
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
      this.store.dispatch(new ProcessingRemove());

      for (let i = 0; i < this.data.length ; i++) {
        const item = this.data[i];
        const body = this.getBody(item);

        this.fs.remove(item.msg_id, item.msg_queue_source, body).subscribe(result => {
          workCount = workCount + 1;

          if (!result.Success) {
            errorMessage.messages.push(result.ErrorMessage);
          }

          if (this.data.length === workCount) {
            if (errorMessage.messages.length > 0) {
              this.store.dispatch(new ShowToast({title: null, message: this.getMethodErrorMessage(errorMessages), type: ToastTypes.ERROR}));
            }

            if (errorMessage.messages.length !== this.data.length) {
              let messageText = 'Task was removed successfully';

              if (this.data.length > 1) {
                messageText = `Tasks were removed successfully`;
              }

              this.store.dispatch(new ShowToast({title: null, message: messageText, type: ToastTypes.SUCCESS}));
            }

            this.store.dispatch(new NotProcessingRemove());
            this.store.dispatch(new HideRemoveEditor());
            this.reset();

            this.workCompleted.emit();
            this.triggerRefresh();
          }
        }, (error) => {
          workCount = workCount + 1;
          errorMessage.messages.push('Error occured while updating');

          if (this.data.length === workCount) {
            if (errorMessage.messages.length > 0) {
              this.store.dispatch(new ShowToast({title: null, message: this.getMethodErrorMessage(errorMessages), type: ToastTypes.ERROR}));
            }

            this.store.dispatch(new NotProcessingRemove());
            this.triggerRefresh();
          }
        });
      }
    } else {
      this.store.dispatch(new ShowToast({title: `Correct the following Errors`, message: this.getErrorMessage(), type: ToastTypes.ERROR}));
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
      'is_temp_permission': true
    };

    return body;
  }

  triggerRefresh() {
    this.store.dispatch(new WorkLifeDataLoadWorkflowMessages({id:this.fs.queueId?this.fs.queueId:0}));
    this.store.dispatch(new WorkLifeDataLoadWorkflowSubmissions());
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
    this.store.dispatch(new NotProcessingRemove());
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
  }

  ngOnDestroy() {
  }
}

