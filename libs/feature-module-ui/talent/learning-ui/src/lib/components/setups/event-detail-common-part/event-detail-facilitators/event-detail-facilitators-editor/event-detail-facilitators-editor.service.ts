import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IEventDetailFacilitators } from '@nutela/models/talent/learning';

@Injectable({
  providedIn: 'root'
})
export class EventDetailFacilitatorsEditorService {
  public form: FormGroup = new FormGroup({});
  validationMessages: any;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      event_id: ['', Validators.required],
      fac_type: ['', Validators.required],
      email_address: ['', Validators.required],
      fac_title: [''],
      fac_firstname: [''],
      fac_surname: [''],
      doc_filename: [''],
      doc_filename_upload: [''],
      img_filename: [''],
      img_size: [''],
      img_ext: [''],
      doc_size: [''],
      doc_ext: [''],
      img_filename_upload: [''],
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

  fieldData(data: IEventDetailFacilitators): IEventDetailFacilitators | {} {
    if (data) {
      return {
        event_id: data.event_id,
        fac_type: data.fac_type,
        email_address: data.email_address,
        fac_title: data.fac_title,
        fac_firstname: data.fac_firstname,
        fac_surname: data.fac_surname,
        doc_filename: data.doc_filename,
        doc_filename_upload: data.doc_url,
        img_filename: data.img_filename,
        img_filename_upload: data.img_url,
        img_size: data.img_size,
        img_ext: data.img_ext,
        doc_size: data.doc_size,
        doc_ext: data.doc_ext
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      event_id: {
        fieldTitle: `Event`,
        required: `This field is required.`
      },
      fac_type: {
        fieldTitle: `Facilitators type`,
        required: `This field is required.`
      },
      email_address: {
        fieldTitle: `Email Address`,
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

}
