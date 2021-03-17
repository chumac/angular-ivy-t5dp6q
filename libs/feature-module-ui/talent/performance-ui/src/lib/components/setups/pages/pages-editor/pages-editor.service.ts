import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IPage } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class PagesEditorService {
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
      asset_type: ['', Validators.required],
      asset_key: [''],
      parent_id: [''],
      code: ['', Validators.required],
      description: ['', Validators.required],
      title: ['', Validators.required],
      sub_title: ['', Validators.required],
      widget: ['', Validators.required],
      json_properties: [''],
      eligibility: ['', Validators.required],
      rank: ['', Validators.required],
      perm_emp: ['', Validators.required],
      perm_lm: ['', Validators.required],
      perm_reviewer: ['', Validators.required],
      perm_moderator: ['', Validators.required],
      perm_hr: ['', Validators.required],
      perm_reviewer_assessing: ['', Validators.required],
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

  fieldData(data: IPage): IPage | {} {
    if (data) {
      return {
        asset_type: data.asset_type, 
        asset_key: data.asset_key,
        parent_id: data.parent_id,
        code: data.code,
        description: data.description,
        widget: data.widget,
        json_properties: data.json_properties,
        eligibility: data.eligibility,
        rank: data.rank,
        perm_emp: data.perm_emp,
        perm_lm: data.perm_lm,
        perm_reviewer: data.perm_reviewer,
        perm_moderator: data.perm_moderator,
        perm_hr: data.perm_hr,
        perm_reviewer_assessing: data.perm_reviewer_assessing,
        title: data.title,
        sub_title: data.sub_title,

      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      asset_type: {
        fieldTitle: `Page Type`,
        required: `This field is required.`
      },
      code: {
        fieldTitle: `Code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      title: {
        fieldTitle: `Title`,
        required: `This field is required.`
      },
      sub_title: {
        fieldTitle: `Sub-Title`,
        required: `This field is required.`
      },
      eligibility: {
        fieldTitle: `Eligibility Rule`,
        required: `This field is required.`
      },
      rank: {
        fieldTitle: `Rank`,
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
        fieldTitle: `Reviewer Assessing Permission`,
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

  get assetKey(): AbstractControl {
    return this.form.get('asset_key');
  }

  get widget(): AbstractControl {
    return this.form.get('widget');
  } 

  get parentId(): AbstractControl {
    return this.form.get('parent_id');
  } 


}
