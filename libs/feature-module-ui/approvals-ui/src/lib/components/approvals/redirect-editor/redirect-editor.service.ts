import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators
} from '@angular/forms';

import { Store } from '@ngrx/store';

import { UtilService, ApiService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IApiResult } from '@nutela/models/core-data';
import { APPROVE_DATA_URLs } from '../../../constants';
import { Sources } from '../../../enumerations';

@Injectable({
  providedIn: 'root'
})
export class RedirectEditorService {
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
        redirect_to: ['', Validators.required],
        exit_comments: ['', Validators.required]
      },
      {
        validator: []
      }
    );
  }

  redirect(source: Sources, messageId: number, messageQueueSource: number, body: any): Observable<IApiResult> {
    const url = this.getUrl(source, messageId, messageQueueSource);

    return this.apiService.update(url, body);
  }

  private getUrl(source: Sources, messageId: number, messageQueueSource: number) {
    let url = '';

    if (source === Sources.ITEMS_AWAITING_MY_ACTIONS) {
      if (messageQueueSource === 0) {
        url = `${APPROVE_DATA_URLs.myWorkflowTask}?id=${messageId}`;
      } else if (messageQueueSource === 1) {
        url = `${APPROVE_DATA_URLs.workflowQueueTask}?id=${messageId}`;
      } else {
        url = `${APPROVE_DATA_URLs.workflowTask}?id=${messageId}`;
      }
    } else if (source === Sources.MY_SUBMISSIONS) {
      url = `${APPROVE_DATA_URLs.myWorkflowSubmissionTask}?id=${messageId}`;
    }

    return url;
  }

  getValidationMessages(): any {
    return {
      redirect_to: {
        fieldTitle: `Redirect To`,
        required: `This field is required.`
      },
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

  get redirectToEmployee(): AbstractControl {
    return this.form.get('redirect_to');
  }

  get exitComment(): AbstractControl {
    return this.form.get('exit_comments');
  }
}
