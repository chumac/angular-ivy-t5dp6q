import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ITransactionComment } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class SlCommentService {
  private form: FormGroup = new FormGroup({});
  validationMessages: any;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      // employee_id: [null],
      progress_trans_id: [null],
      // comment_by: [null],
      // role: [null, Validators.required],
      comment: ['', Validators.required],
      // email_sent: [false],
      doc_url: [null],
      doc_binary: [null],
      doc_extension: [null],
      doc_mime: [null],
      doc_guid: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: any
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ITransactionComment): ITransactionComment | {} {
    if (data) {
      return {
        employee_id: data.employee_id,
        progress_trans_id: data.progress_trans_id,
        comment_by: data.comment_by,
        role: data.role,
        comment: data.comment,
        email_sent: data.email_sent,
        doc_url: data.doc_url,
        doc_binary: data.doc_binary,
        doc_extension: data.doc_extension,
        doc_mime: data.doc_mime,
        doc_guid: data.doc_guid,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      role: {
        fieldTitle: `Role`,
        required: `This field is required.`
      },
      comment: {
        fieldTitle: `Comment`,
        required: `This field is required.`
      },

      flx: {}
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

  get comment(): AbstractControl {
    return this.form.get('comment');
  }

  get employeeId(): AbstractControl {
    return this.form.get('employee_id');
  }

  get transactionId(): AbstractControl {
    return this.form.get('progress_trans_id');
  }

  get commentBy(): AbstractControl {
    return this.form.get('comment_by');
  }

}

