import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IProfessionalQualification
} from '@nutela/models/workforce/employee-profiles';
import { futureDateValidator, UtilService, greaterThanValidator } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalQualificationsEditorService {
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
      requirement_type: ['', Validators.required],
      institution_id: ['', Validators.required],
      qualification_id: ['', Validators.required],
      membershipID: ['', Validators.required],
      award_id: ['', Validators.required],
      year_of_award: ['', Validators.compose([Validators.required, futureDateValidator(this.util.currentDate)])],
      req_renewal: [true],
      next_renewal_date: [''],
      certificate_picture: [''],
      img_extension: [''],
      img_size:[null],
      // img_size: [null, Validators.compose([Validators.required, greaterThanValidator(this.util.maximumImageSize)])]
      }, {
        validator: []
      }
    );
  }

  init(
    data: IProfessionalQualification
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IProfessionalQualification): IProfessionalQualification | {} {
    if (data) {
      return {
        requirement_type: data.requirement_type,
        institution_id: data.institution_id,
        qualification_id: data.qualification_id,
        membershipID: data.membershipID,
        award_id: data.award_id,
        year_of_award: data.year_of_award,
        req_renewal: data.req_renewal,
        next_renewal_date: data.next_renewal_date,
        certificate_picture: data.certificate_picture,
        img_extension: data.img_extension,
        img_size: data.img_size
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      requirement_type: {
        fieldTitle: `Tag`,
        required: `This field is required.`
      },
      institution_id: {
        fieldTitle: `Institution`,
        required: `This field is required.`
      },
      qualification_id: {
        fieldTitle: `Qualification`,
        required: `This field is required.`
      },
      membershipID: {
        fieldTitle: `Member ID`,
        required: `This field is required.`,
      },
      award_id: {
        fieldTitle: `Professional Award`,
        required: `This field is required.`,
      },
      year_of_award: {
        fieldTitle: `Award Year`,
        required: `This field is required.`,
        futureDate: `Date can't be in the future.`
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

  get reqRenewal(): AbstractControl {
    return this.form.get('req_renewal');
  }

  formToolTips = {
    qualificationToolTip: '',
    institutionToolTip: ''
  }

  setToolTip(fieldName: string, fieldLabel: string) {
    switch (fieldName) {
      case 'qualification':
        this.formToolTips.qualificationToolTip = fieldLabel;
        break;

      case 'institution':
        this.formToolTips.institutionToolTip = fieldLabel;
        break;

      default:
        break;
    }
  }

  resetToolTipTexts() {
    this.formToolTips.qualificationToolTip = '';
    this.formToolTips.institutionToolTip = '';
  }
}
