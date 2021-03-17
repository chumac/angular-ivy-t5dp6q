import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IEventDetailAssets } from '@nutela/models/talent/learning';

@Injectable({
  providedIn: 'root'
})
export class EventDetailAssetsEditorService {
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
      asset_availability: ['', Validators.required],
      asset_type: ['', Validators.required],
      asset_filename: ['', Validators.required],
      asset_filename_upload: ['', Validators.required],
      asset_ext: [''],
      asset_size: [''],
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

  fieldData(data: IEventDetailAssets): IEventDetailAssets | {} {
    if (data) {
      return {
        event_id: data.event_id,
        asset_availability: data.asset_availability,
        asset_type: data.asset_type,
        asset_filename: data.asset_filename,
        asset_filename_upload: data.asset_filename_upload,
        asset_ext: data.asset_ext,
        asset_size: data.asset_size,
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
      asset_availability: {
        fieldTitle: `Assets Availability`,
        required: `This field is required.`
      },
      asset_type: {
        fieldTitle: `Assets Type`,
        required: `This field is required.`
      },
      asset_filename: {
        fieldTitle: `File Name`,
        required: `This field is required.`
      },
      asset_filename_upload: {
        fieldTitle: `File`,
        required: `This field is required.`
      },
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
