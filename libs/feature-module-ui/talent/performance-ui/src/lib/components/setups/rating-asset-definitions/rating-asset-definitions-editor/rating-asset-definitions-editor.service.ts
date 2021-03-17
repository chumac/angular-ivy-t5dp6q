import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IRatingAssetDefinition } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class RatingAssetDefinitionsEditorService {
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
      title: ['', Validators.required],
      description: ['', Validators.required],
      allow_self_rating: [false, Validators.required],
      use_rating_stars: [false, Validators.required],
      widget_guid: ['', Validators.required],
      is_for_360: [false],
      role_360: [null],
      role_360_anon_emp:[false],
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

  fieldData(data: IRatingAssetDefinition): IRatingAssetDefinition | {} {
    if (data) {
      return {
        title: data.title,
        description: data.description,
        allow_self_rating: data.allow_self_rating,
        use_rating_stars: data.use_rating_stars,
        widget_guid: data.widget_guid,
        is_for_360: data.is_for_360,
        role_360: data.role_360,
        role_360_anon_emp: data.role_360_anon_emp,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      title: {
        fieldTitle: `Title`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      widget_guid: {
        fieldTitle: `Rating Page`,
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

  get code(): AbstractControl {
    return this.form.get('code');
  }

  get widgetGuid(): AbstractControl {
    return this.form.get('widget_guid');
  }

}
