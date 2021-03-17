import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  IEducation
} from '@nutela/models/workforce/employee-profiles';
import { greaterThanValidator, UtilService } from '@nutela/core-services';
import { LoadInstitutionsEducation } from '@nutela/store/modules/workforce/employee-profiles';
import { Store } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';

@Injectable({
  providedIn: 'root'
})
export class HrReboardEduHistoryEditorService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    private store: Store<IAppState>,
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      requirement_type: [null],
      country: [null],
      institution_id: [null, Validators.required],
      faculty: [null],
      department: [null],
      course_id: [null, Validators.required],
      matricno: [null],
      qualification_id: [null, Validators.required],
      edugrade_id: [null, Validators.required],
      graduation_year: [null, [Validators.required]],
      location: [{ value: null, disabled: true }],
      certificate_picture: [null],
      img_extension: [null],
      img_url: [null],
      img_size: [null],
      //img_size: [null, Validators.compose([Validators.required, greaterThanValidator(this.util.maximumImageSize)])]
    }, {
      validator: []
    }
    );
  }

  init(
    data: IEducation
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: IEducation): IEducation | {} {
    if (data) {
      return {
        requirement_type: data.requirement_type,
        country: data.country,
        institution_id: data.institution_id,
        faculty: data.faculty,
        department: data.department,
        course_id: data.course_id,
        matricno: data.matricno,
        qualification_id: data.qualification_id,
        edugrade_id: data.edugrade_id,
        graduation_year: data.graduation_year,
        location: data.location,
        certificate_picture: data.certificate_picture,
        img_extension: data.img_extension,
        img_url: data.img_url,
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
      faculty: {
        fieldTitle: `Faculty`,
        required: `This field is required.`
      },
      department: {
        fieldTitle: `Department`,
        required: `This field is required.`,
      },
      course_id: {
        fieldTitle: `Course`,
        required: `This field is required.`,
      },
      qualification_id: {
        fieldTitle: `Qualification`,
        required: `This field is required.`
      },
      edugrade_id: {
        fieldTitle: `Educational Grade`,
        required: `This field is required.`
      },
      graduation_year: {
        fieldTitle: `Graduation Year`,
        required: `This field is required.`,
        nonFutureDate: `Graduation year can't be in the future.`
      },
      location: {
        fieldTitle: `Location`,
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

  get location(): AbstractControl {
    return this.form.get('location');
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
