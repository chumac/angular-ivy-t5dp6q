import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IControl } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class ControlsEditorService {
  private form: FormGroup = new FormGroup({});
  validationMessages: any;
  assetConstants = constants.ASSET_TYPE_CONSTANTS;
  widgetConstants = constants.WIDGET_OPT_CONSTANTS;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      asset_type: [null],
      asset_key: [''],
      parent_id: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      title: ['', Validators.required],
      sub_title: ['', Validators.required],
      widget: [null],
      json_properties: [''], 
      eligibility: ['', Validators.required],
      rank: ['', Validators.required],
      perm_emp: ['', Validators.required],
      perm_lm: ['', Validators.required],
      perm_reviewer: ['', Validators.required],
      perm_moderator: ['', Validators.required],
      perm_hr: ['', Validators.required],
      perm_reviewer_assessing: [''],
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

  fieldData(data: IControl): IControl | {} {
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
      parent_id: {
        fieldTitle: `Parent Section`,
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
  get widget(): AbstractControl {
    return this.form.get('widget');
  }
  get assetKey(): AbstractControl {
    return this.form.get('asset_key');
  }

}
