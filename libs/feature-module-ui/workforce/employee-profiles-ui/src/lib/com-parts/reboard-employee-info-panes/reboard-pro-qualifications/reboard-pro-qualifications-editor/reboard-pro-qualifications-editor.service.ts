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
export class ReboardProQualificationsEditorService {
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
      institution_id: [null, Validators.required],
      qualification_id: [null, Validators.required],
      membershipID: [null, Validators.required],
      award_id: [null, Validators.required],
      year_of_award: [null, Validators.compose([Validators.required, futureDateValidator(this.util.currentDate)])],
      req_renewal: [false],
      next_renewal_date: [null,],
      certificate_picture: [null],
      img_extension: [null],
      img_size: [null, Validators.compose([greaterThanValidator(this.util.maximumImageSize)])]
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
      console.log('institution and qualification', data)
      return {
        requirement_type: data.requirement_type,
        institution_id: data.institution.institution_id,
        qualification_id: data.qualification.qualification_id,
        membershipID: data.membershipID,
        award_id: data.proAwards.proaward_id,
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
      next_renewal_date: {
        fieldTitle: `Next Renewal Date`,
        required: `This field is required.`
      },
      img_size: {
        fieldTitle: `Certificate Image`,
        required: `This field is required.`,
        greaterThan: `The selected image is too large.`
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

  get reqRenewal(): AbstractControl {
    return this.form.get('req_renewal');
  }

  patch(value: { [key: string]: any }) {
    this.form.patchValue(value);
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
