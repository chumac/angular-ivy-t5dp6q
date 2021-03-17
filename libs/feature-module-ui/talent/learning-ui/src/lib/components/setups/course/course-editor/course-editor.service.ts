import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ICourse } from '@nutela/models/talent/learning';

@Injectable({
  providedIn: 'root'
})
export class CourseEditorService {
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
      category_id: [null, Validators.required],
      course_type: [null, Validators.required],
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

  fieldData(data: ICourse): ICourse | {} {
    if (data) {
      return {
        code: data.code,
        description: data.description,
        category_id: data.category_id,
        course_type: data.course_type,
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
      category_id: {
        fieldTitle: `Course Category`,
        required: `This field is required.`
      },
      course_type: {
        fieldTitle: `Course Type`,
        required: `This field is required.`
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

  get usePrevObj(): AbstractControl {
    return this.form.get('use_prev_obj');
  }

  get prevCourseCategoryId(): AbstractControl {
    return this.form.get('prev_course_category_id');
  }

}
