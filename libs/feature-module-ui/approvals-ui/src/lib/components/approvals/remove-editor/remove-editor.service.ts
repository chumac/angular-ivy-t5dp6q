import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators
} from '@angular/forms';

import { UtilService, ApiService } from '@nutela/core-services';
import { Observable } from 'rxjs/internal/Observable';
import { IApiResult } from '@nutela/models/core-data';
import { APPROVE_DATA_URLs } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class RemoveEditorService {
  queueId:number;
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    private apiService: ApiService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group(
      {
        exit_comments: ['', Validators.required]
      },
      {
        validator: []
      }
    );
  }

  remove(messageId: number, messageQueueSource: number, body: any): Observable<IApiResult> {
    const url = this.getRemoveUrl(messageId, messageQueueSource);

    return this.apiService.update(url, body);
  }

  private getRemoveUrl(messageId: number, messageQueueSource: number) {
    let url = '';
    url = `${APPROVE_DATA_URLs.myWorkflowSubmissionTask}?id=${messageId}`;

    return url;
  }

  getValidationMessages(): any {
    return {
      exit_comments: {
        fieldTitle: `Comment`,
        required: `This field is required.`
      }
    };
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

  get exitComment(): AbstractControl {
    return this.form.get('exit_comments');
  }
}
