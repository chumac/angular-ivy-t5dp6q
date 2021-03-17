import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IGuarantor
} from '@nutela/models/workforce/employee-profiles';
import { UtilService, greaterThanValidator } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class GuarantorsEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder, private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      requirement_type: [null, Validators.required],
      title: [null, Validators.required],
      // other_titles: [''],
      ref_surname: ['', Validators.required],
      ref_firstname: ['', Validators.required],
      ref_othernames: [''],
      gender: [null, Validators.required],
      fulladdress: ['', Validators.required],
      bvn: [''],
      company_name: [''],
      company_address: [''],
      phone1: [''],
      phone2: [''],
      email: ['', Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
        // passport_picture: [''],
        // attach_document: [''],
        // img_extension_passport: [''],
        // img_size: [null, Validators.compose([Validators.required, greaterThanValidator(this.util.maximumImageSize)])]
      passport_picture: [null],
      attach_document: [null],
      img_extension_passport: [null],
      img_size: [null],
      img_extension: [null],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IGuarantor
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IGuarantor): IGuarantor | {} {
    if (data) {
      return {
        requirement_type: data.requirement_type,
        title: data.title,
        ref_surname: data.ref_surname,
        ref_firstname: data.ref_firstname,
        ref_othernames: data.ref_othernames,
        gender: data.gender,
        fulladdress: data.fulladdress,
        bvn: data.bvn,
        company_name: data.company_name,
        company_address: data.company_address,
        phone1: data.phone1,
        phone2: data.phone2,
        email: data.email,
        attach_document: data.attach_document,
        passport_picture: data.passport_picture,
        img_extension_passport: data.img_extension_passport,
        img_extension: data.img_extension || null
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      requirement_type_text: {
        fieldTitle: `Tag`,
        required: `This field is required.`
      },
      title: {
        fieldTitle: `Title`,
        required: `This field is required.`
      },
      ref_surname: {
        fieldTitle: `Surname`,
        required: `This field is required.`
      },
      ref_firstname: {
        fieldTitle: `First Name`,
        required: `This field is required.`
      },
      gender: {
        fieldTitle: `Gender`,
        required: `This field is required.`
      },
      fulladdress: {
        fieldTitle: `Address`,
        required: `This field is required.`
      },
      email: {
        fieldTitle: `Email`,
        pattern: `Provide a valid email address.`
      },
      flx: {
        fieldTitle: `Other Errors`
      }
    };
  }

  convertToLowerCase() {
    const val = this.email.value ? this.email.value.toLowerCase() : null
    this.email.setValue(val)
  }

  // getUpdatedFormValues(formValue = this.value) {
  //   const bvn = formValue.bvn ? formValue.bvn.toString() : null;
  //   const phone1 = formValue.phone1 ? formValue.phone1.toString() : null;
  //   const phone2 = formValue.phone2 ? formValue.phone2.toString() : null;
  //   const newValue = { ...formValue, bvn, phone1, phone2 };

  //   return newValue;
  // }

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



  get title(): AbstractControl {
    return this.form.get('title');
  }

  get gender(): AbstractControl {
    return this.form.get('gender');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }
}
