import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ITrainingRooms } from '@nutela/models/talent/learning';

@Injectable({
  providedIn: 'root'
})
export class TrainingRoomsEditorService {
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
      code: ['', Validators.required],
      description: ['', Validators.required],
      capacity: [null, Validators.compose([Validators.pattern('^[0-9]*$')])],
      address: ['', Validators.required],
      country_id: [null],
      state_id: [null],
      city_id: [null],
    }, {
      validator: []
    }
    );
  }

  init(
    data: any,
    selectOptionData: any
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }

  fieldData(data: ITrainingRooms): ITrainingRooms | {} {
    if (data) {
      return {
        code: data.code,
        description: data.description,
        capacity: data.capacity,
        address: data.address,
        country_id: data.CountryInfo ? data.CountryInfo.nationality_id : null,
        state_id: data.StateInfo ? data.StateInfo.state_id : null,
        city_id: data.CityInfo ? data.CityInfo.city_id : null,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      code: {
        fieldTitle: `Code`,
        required: `This field is required.`
      },
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      capacity: {
        fieldTitle: `Capacity`,
        pattern: `Please enter only numbers`,
      },

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

  get description(): AbstractControl {
    return this.form.get('description');
  }

  get country(): AbstractControl {
    return this.form.get('country_id');
  }

  get state(): AbstractControl {
    return this.form.get('state_id');
  }

  get city(): AbstractControl {
    return this.form.get('city_id');
  }

}
