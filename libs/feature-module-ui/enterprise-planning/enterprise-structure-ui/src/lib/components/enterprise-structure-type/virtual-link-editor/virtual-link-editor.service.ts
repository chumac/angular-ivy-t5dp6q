import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl
} from '@angular/forms';

import { UtilService } from '@nutela/core-services';
import { IVirtualLinkTransform } from '../../../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class VirtualLinkEditorService {
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
      virtual_links: [[]],
    }
    );
  }

  init(
    data: IVirtualLinkTransform[],
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IVirtualLinkTransform[]): IVirtualLinkTransform[] | {} {
    if (data) {
      return {
        virtual_links: data
      };

    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      flx: {
        fieldTitle: `Other Errors`,
        employmentExitFutureDate: `Employment date cannot be after Exit date.`
      }
    };
  }

  get initialLinks(): AbstractControl {
    return this.form.get('virtual_links');
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
