import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';


import { UtilService} from '@nutela/core-services';
import { IEducationalCourses } from '@nutela/models/platform/lookup';

@Injectable({
  providedIn: 'root'
})
export class EducationalCoursesEditorService {
  public form: FormGroup = new FormGroup({});

  validationMessages: any;

  constructor(
    private fb: FormBuilder,
    private util: UtilService
  ) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      course_id:[],
      course_code:['', Validators.required],
      description: ['', Validators.required],
      category_id:[],
      }, {
        validator: []
      }
    );
  }

  init(
    data: IEducationalCourses,
  ) {
    if (data) {
      this.form.patchValue(this.fieldData(data));
    }
  }




  fieldData(data: IEducationalCourses): IEducationalCourses | {} {
    if (data) {
      console.log('edit', data);
      return {
        course_id: data.course_id,
        course_code:data.course_code,
        description: data.description,
        category_id: data.eduCourseCategory.category_id,
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      description: {
        fieldTitle: `Description`,
        required: `This field is required.`
      },
      course_code: {
        fieldTitle: `Course Code`,
        required: `This field is required.`
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
