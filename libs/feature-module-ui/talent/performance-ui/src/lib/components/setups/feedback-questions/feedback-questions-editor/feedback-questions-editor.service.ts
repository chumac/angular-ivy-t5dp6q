import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IFeedbackQuestion } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class FeedbackQuestionsEditorService {
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
      question_text: [null, Validators.required],
      question_role: [null, Validators.required],
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

  fieldData(data: IFeedbackQuestion): IFeedbackQuestion | {} {
    if (data) {
      return {
        question_text: data.question_text,
        question_role: data.question_role,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      question_text: {
        fieldTitle: `Question`,
        required: `This field is required.`
      },
      question_role: {
        fieldTitle: `Role`,
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

  get questionRole(): AbstractControl {
    return this.form.get('question_role');
  }

}
