import { Injectable, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  INotification
} from '@nutela/models/foundation';
import { UtilService } from '@nutela/core-services';
import { NotificationService } from '../notification.service';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationEditorService {

  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
  ) {
      this.form = this.buildForm();
      this.validationMessages = this.getValidationMessages();
  }

    buildForm(): FormGroup {
      return this.fb.group({

        sysentity_id: [null, Validators.required],
        process_id: [null, Validators.required],
        group_type: [null, Validators.required],
        group_value: [null],
        position_id: [null],
        final_actiontype: [null, Validators.required],
        }, {
          validator: []
        }
      );
    }

    init(
      data: INotification,
    ) {

      if (data) {
        this.form.patchValue(this.fieldData(data));
      }
    }


    fieldData(data: INotification): INotification | {} {
      if (data) {
        return {
           // sysentity_id: data.SysEntitesInfo.entity_id,
            process_id: data.process_id,
            group_type: data.group_type,
            group_value: data.group_value,
            position_id: data.PositionInfo.position_id,
            final_actiontype: data.final_actiontype,
        };
      } else {
        return {};
      }
    }

    getValidationMessages(): any {
      return {
        sysentity_id: {
          fieldTitle: `System Process`,
          required: `This field is required.`
        },

        process_id: {
          fieldTitle: `Process`,
          required: `This field is required.`
        },
        group_type: {
          fieldTitle: `Notification to`,
          required: `This field is required.`,

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
}
