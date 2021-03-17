import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { IDocumentTags } from '@nutela/models/platform/lookup';

@Injectable({
  providedIn: 'root'
})
export class DocumentTagsEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      tag_id:[null],
      description: ['', Validators.required],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IDocumentTags,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: IDocumentTags): IDocumentTags | {} {
    if (data) {
      return {
        tag_id: data.tag_id,
        description: data.description,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      flx: {
        fieldTitle: `Other Errors`
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
