import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IFormTemplateDetail } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class FormTemplateDetailsEditorService {
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
      review_form_id: ['', Validators.required],
      asset_type: [null, Validators.required],
      asset_id: [null],
      weight: ['', Validators.required],
      page_rank: ['', Validators.required],
      is_active: [false],
      perm_emp: ['', Validators.required],
      perm_lm: ['', Validators.required],
      perm_reviewer: ['', Validators.required],
      perm_moderator: ['', Validators.required],
      perm_hr: ['', Validators.required],
      perm_reviewer_assessing: ['', Validators.required]
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

  fieldData(data: IFormTemplateDetail): IFormTemplateDetail | {} {
    if (data) {
      return {
        review_form_id: data.ReviewFormInfo? data.ReviewFormInfo.id:0,
        asset_type: data.asset_type,
        asset_id: data.AssetInfo? data.AssetInfo.id:0,
        weight: data.weight,
        page_rank: data.page_rank,
        is_active: data.is_active,
        perm_emp: data.perm_emp,
        perm_lm: data.perm_lm,
        perm_reviewer: data.perm_reviewer,
        perm_moderator: data.perm_moderator,
        perm_hr: data.perm_hr,
        perm_reviewer_assessing: data.perm_reviewer_assessing  
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      review_form_id: {
        fieldTitle: `Review Form`,
        required: `This field is required.`
      },
      asset_type: {
        fieldTitle: `Page`,
        required: `This field is required.`
      },
      weight: {
        fieldTitle: `Weight`,
        required: `This field is required.`
      },
      page_rank: {
        fieldTitle: `Page Rank`,
        required: `This field is required.`
      },
      perm_emp: {
        fieldTitle: `Employee Permission`,
        required: `This field is required.`
      },
      perm_lm: {
        fieldTitle: `Line Manager Permission`,
        required: `This field is required.`
      },
      perm_reviewer: {
        fieldTitle: `Reviewer Permission`,
        required: `This field is required.`
      },
      perm_moderator: {
        fieldTitle: `Moderator Permission`,
        required: `This field is required.`
      },
      perm_hr: {
        fieldTitle: `HR Permission`,
        required: `This field is required.`
      },
      perm_reviewer_assessing: {
        fieldTitle: `Reviewer Accessing Permission`,
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

  get assetType(): AbstractControl {
    return this.form.get('asset_type');
  }

  get assetId(): AbstractControl {
    return this.form.get('asset_id');
  }

  get reviewFormId(): AbstractControl {
    return this.form.get('review_form_id');
  }

}
