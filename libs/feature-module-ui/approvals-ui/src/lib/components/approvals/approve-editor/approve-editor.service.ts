import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { UtilService, ApiService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IApiResult } from '@nutela/models/core-data';
import { APPROVE_DATA_URLs } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class ApproveEditorService {
  queueId:number;
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private util: UtilService,
    private apiService: ApiService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group(
      {
        send_to_specific_employee_logon: [''],
        exit_comments: ['']
      },
      {
        validator: []
      }
    );
  }

  approve(messageId: number, messageQueueSource: number, body: any): Observable<IApiResult> {
    const url = this.getApproveUrl(messageId, messageQueueSource);

    return this.apiService.update(url, body);
  }

  private getApproveUrl(messageId: number, messageQueueSource: number) {
    let url = '';

    if (messageQueueSource === 0) {
      url = `${APPROVE_DATA_URLs.myWorkflowTask}?id=${messageId}`;
    } else if (messageQueueSource === 1) {
      url = `${APPROVE_DATA_URLs.workflowQueueTask}?id=${messageId}`;
    } else {
      url = `${APPROVE_DATA_URLs.workflowTask}?id=${messageId}`;
    }

    return url;
  }

  getValidationMessages(): any {
    return {};
  }

  get f() {
    return this.form;
  }

  get value(): any {
    return this.form.getRawValue();
  }

  get valid(): boolean {
    return this.form.valid;
  }

  patch(value: { [key: string]: any }) {
    this.form.patchValue(value);
  }

  get sendToEmployee(): AbstractControl {
    return this.form.get('send_to_specific_employee_logon');
  }

  get exitComment(): AbstractControl {
    return this.form.get('exit_comments');
  }
}
