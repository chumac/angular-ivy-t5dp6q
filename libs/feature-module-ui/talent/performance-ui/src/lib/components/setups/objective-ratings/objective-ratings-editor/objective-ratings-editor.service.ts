import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IObjectiveRating } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveRatingsEditorService {
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
      rating_value: [null, Validators.required],
      description: ['', Validators.required],
      dictionary: ['', Validators.required],
      is_active: [false],
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

  fieldData(data: IObjectiveRating): IObjectiveRating | {} {
    if (data) {
      return {
        rating_value: data.rating_value,
        description: data.description,
        dictionary: data.dictionary,
        is_active: data.is_active,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      rating_value: {
        fieldTitle: `Rating Value`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      dictionary: {
        fieldTitle: `Dictionary`,
        required: `This field is required.`
      },
      is_active: {
        fieldTitle: `Is Active`,
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

}
