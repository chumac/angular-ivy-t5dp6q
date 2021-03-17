import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from '@nutela/core-services';
import { workHourCheckValidator } from './create-work-activity.factory';
import { WORK_HOUR_TYPE_URLs, WORK_ACTIVITY_URLs } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class CreateWorkActivityService {
  private form: FormGroup = new FormGroup({});

  validationMessages: any;

  valueLabelWorkTypes: ISelectOption[];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.form = this.buildForm();
    this.validationMessages = this.getValidationMessages();
   }

   buildForm(): FormGroup {
    return this.fb.group({
      project_id: [null, Validators.required],
      cost_centre_id: [null, Validators.required],
      work_hour: [null, [Validators.required, Validators.min(0)]],
      work_min: [0, [Validators.required, Validators.min(0), Validators.max(59)]],
      wk_hours_type: [null, Validators.required],
      description: [null, Validators.max(5)]
    }, {
      validator: [workHourCheckValidator()]
    });
  }

  getWorkTypes(transDate: string): Observable<IApiResult> {
    return this.apiService.read(`${WORK_HOUR_TYPE_URLs.list}?tms_date=${transDate}`);
  }

  save(data, editMode: boolean) {
    if(editMode){
      const id = data.id;
      delete data['id'];
      return this.apiService.create(`${WORK_ACTIVITY_URLs.update}/${id}`, data);
    } else {
      delete data['id'];
      return this.apiService.create(WORK_ACTIVITY_URLs.save, data);
    }
  }

  getValidationMessages(): any {
    return {
      project_id: {
        fieldTitle: `Project`,
        required: `This field is required. Select a project.`
      },
      cost_centre_id: {
        fieldTitle: `Cost Center`,
        required: `This field is required. Select a cost centers.`
      },
      work_hour: {
        fieldTitle: `Work Hour`,
        required: `This field is required. Enter the hours spent on work.`,
        min: `The minimum value you can specify here is 0.`
      },
      work_min: {
        fieldTitle: `Work Hour/Minute`,
        required: `This field is required. Enter the hours/minutes spent on work.`,
        min: `The minimum value you can specify here is 0 (min.).`,
        max: `The maximum value you can specify here is 59 (mins.).`
      },
      wk_hours_type: {
        fieldTitle: `Work Hour Type`,
        required: `This field is required. Select work hour type.`
      },
      description: {
        fieldTitle: `Description`,
        max: `The maximum value you can specify here is 5 (chars.).`
      },
      flx: {
        fieldTitle: `Other Errors`,
        workHourCheck: `Work hours/minutes must me greater than 0.`
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


  get projectId(): AbstractControl {
    return this.form.get('project_id');
  }

  get costCenterId(): AbstractControl {
    return this.form.get('cost_centre_id');
  }

  get workHour(): AbstractControl {
    return this.form.get('work_hour');
  }

  get workMin(): AbstractControl {
    return this.form.get('work_min');
  }

  get workHourType(): AbstractControl {
    return this.form.get('wk_hours_type');
  }
  get description(): AbstractControl {
    return this.form.get('description');
  }
}
