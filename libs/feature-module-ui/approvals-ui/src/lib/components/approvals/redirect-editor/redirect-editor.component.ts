
import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IAppState } from '@nutela/store/app-state';

import { IWorkflowMessage } from '@nutela/models/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { NotProcessingRedirect, ProcessingRedirect, isProcessingRedirect, HideRedirectEditor, LoadQueueList } from '../../../store/approval';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { RedirectEditorService } from './redirect-editor.service';
import { ISelectOption, IErrorMessage } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { WorkLifeDataLoadWorkflowMessages, WorkLifeDataLoadWorkflowSubmissions } from '@nutela/store/modules/workforce/employee-profiles';
import { Sources } from '../../../enumerations';
import { ExternalNotificationService } from '@nutela/shared/ui';
import { LoadQueueNotification } from 'libs/store/shared/src/lib/notification';

@Component({
  selector: 'x365-fm-approvals-redirect-editor',
  templateUrl: './redirect-editor.component.html',
  styleUrls: ['./redirect-editor.component.scss'],
  providers: [RedirectEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedirectEditorComponent extends BaseFormComponent implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IWorkflowMessage[];
  @Input() public activePersonnel: ISelectOption[];
  @Input() public source: Sources;

  @Output() cancelClick = new EventEmitter<any>();
  @Output() workCompleted = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;

  constructor(public fs: RedirectEditorService, private notificationService: ExternalNotificationService, public utilService: UtilService, private store: Store<IAppState>, private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingRedirect));
  }

  get subTitle() {
    if (this.data && this.data.length === 1) {
      return `Redirect selected notification`;
    } else if (this.data && this.data.length > 1) {
      return `Redirect selected notifications (${this.data.length} items)`;
    } else {
      return `Redirect selected notification(s)`;
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
      this.store.dispatch(new ProcessingRedirect());

      for (let i = 0; i < this.data.length ; i++) {
        const item = this.data[i];
        const body = this.getBody(item);

        this.fs.redirect(this.source,  item.msg_id, item.msg_queue_source, body).subscribe(result => {
          workCount = workCount + 1;

          if (!result.Success) {
            errorMessage.messages.push(result.ErrorMessage);
          }

          if (this.data.length === workCount) {
            if (errorMessage.messages.length > 0) {
              this.store.dispatch(new ShowToast({title: null, message: this.getMethodErrorMessage(errorMessages), type: ToastTypes.ERROR}));
            }

            if (errorMessage.messages.length !== this.data.length) {
              let messageText = 'Task was redirected successfully';

              if (this.data.length > 1) {
                messageText = `Tasks were redirected successfully`;
              }

              this.store.dispatch(new ShowToast({title: null, message: messageText, type: ToastTypes.SUCCESS}));
            }

            this.store.dispatch(new NotProcessingRedirect());
            this.store.dispatch(new HideRedirectEditor());
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

            this.store.dispatch(new NotProcessingRedirect());
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
      'msg_status': 3,
      'exit_comments': this.fs.exitComment.value,
      'redirect_to': this.fs.redirectToEmployee.value,
      'finalize_transaction': false,
      'use_manual': false,
      'send_to_specific_employee_logon': '',
      'is_temp_permission': false,
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
    this.store.dispatch(new NotProcessingRedirect());
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
  }

  ngOnDestroy() {
  }
}
