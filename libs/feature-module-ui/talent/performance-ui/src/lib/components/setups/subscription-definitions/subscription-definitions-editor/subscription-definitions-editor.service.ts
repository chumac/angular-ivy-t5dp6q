import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ISubscriptionDefinition } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionDefinitionsEditorService {
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
      asset_id: [null],
      widget_guid: [null, Validators.required],
      subscription_type: [null, Validators.required],
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

  fieldData(data: ISubscriptionDefinition): ISubscriptionDefinition | {} {
    if (data) {
      return {
        asset_id: data.FormBuilderInfo.id,
        widget_guid: data.widget_guid,
        subscription_type: data.subscription_type,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      widget_guid: {
        fieldTitle: `Subscription Page`,
        required: `This field is required.`
      },
      subscription_type: {
        fieldTitle: `Subscription Type`,
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

  get widgetGuid(): AbstractControl {
    return this.form.get('widget_guid');
  }

  get assetId(): AbstractControl {
    return this.form.get('asset_id');
  }

}
