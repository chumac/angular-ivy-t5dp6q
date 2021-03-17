import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IRatingAssetDetail } from '@nutela/models/talent/performance';

@Injectable({
  providedIn: 'root'
})
export class RatingAssetDetailsEditorService {
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
      rating_table_id: [null, Validators.required],
      title: ['', Validators.required],
      detail: ['', Validators.required],
      weight: [null, Validators.required],
      info: ['', Validators.required],
      emp_rating_list: ['', Validators.required],
      emp_comment_rq: [false, Validators.required],
      mgr_rating_list: ['', Validators.required],
      mgr_comment_rq: [false],
      max_rating: [null, Validators.required],
      grouping_category: ['', Validators.required],
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

  fieldData(data: IRatingAssetDetail): IRatingAssetDetail | {} {
    if (data) {
      return {
        rating_table_id: data.rating_table_id,
        title: data.title,
        detail: data.detail,
        weight: data.weight,
        info: data.info,
        emp_rating_list: data.emp_rating_list,
        emp_comment_rq: data.emp_comment_rq,
        mgr_rating_list: data.mgr_rating_list,
        mgr_comment_rq: data.mgr_comment_rq,
        max_rating: data.max_rating,
        grouping_category: data.grouping_category
      };
    } else {
      return {};
    }
  }

  getValidationMessages(): any {
    return {
      rating_table_id: {
        fieldTitle: `Rating Table`,
        required: `This field is required.`
      },
      title: {
        fieldTitle: `Title`,
        required: `This field is required.`
      },
      detail: {
        fieldTitle: `Detail`,
        required: `This field is required.`
      },
      weight: {
        fieldTitle: `Weight`,
        required: `This field is required.`
      },
      emp_rating_list: {
        fieldTitle: `Employee rating list`,
        required: `This field is required.`
      },
      emp_comment_rq: {
        fieldTitle: `Employee Comment Req`,
        required: `This field is required.`
      },
      mgr_rating_list: {
        fieldTitle: `Manager Rating List`,
        required: `This field is required.`
      },
      max_rating: {
        fieldTitle: `Maximum Rating`,
        required: `This field is required.`
      },
      grouping_category: {
        fieldTitle: `Grouping Category`,
        required: `This field is required.`
      },
      info: {
        fieldTitle: `Info`,
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

  get ratingTableId(): AbstractControl {
    return this.form.get('rating_table_id');
  }

}
