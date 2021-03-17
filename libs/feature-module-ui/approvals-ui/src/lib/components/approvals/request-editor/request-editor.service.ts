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
import { ILeaveDailyData } from '@nutela/models/workforce/leave';

@Injectable({
  providedIn: 'root'
})
export class RequestEditorService {
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
    return this.fb.group({
        no_of_days: ['', Validators.required],
        start_date: ['', Validators.required],
        assigned_backup_id: [null, Validators.required]
      }, {
        validator: []
      }
    );
  }

  init(data: ILeaveDailyData) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ILeaveDailyData): IRequestEditorData | {} {
    if (data) {
      return {
        no_of_days: data.no_of_days,
        start_date: data.start_date,
        assigned_backup_id: data.AssignedBackupInfo?data.AssignedBackupInfo.employee_id:null
      };
    } else {
      return {};
    }
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

interface IRequestEditorData {
  no_of_days: number;
  start_date: Date;
  assigned_backup_id: number;
}
