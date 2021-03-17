import { Injectable, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IFormBuilder } from '@nutela/models/workforce/employee-profiles';
import { ReplaySubject, of, forkJoin } from 'rxjs';
import { takeUntil, map, mergeMap } from 'rxjs/operators';
import { ApiService } from '@nutela/core-services';
// import { CUSTOM_FORM_URLs } from '../../constants';
import { IApiResult } from '@nutela/models/core-data';
// import { optionsType, widgetType } from '../form-builder/config/constants.constant';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';

import { optionsType, widgetType } from 'libs/feature-module-ui/workforce/processes-ui/src/lib/com-parts/form-builder/config/constants.constant';
import { CUSTOM_FORM_URLs } from 'libs/feature-module-ui/workforce/processes-ui/src/lib/constants/api-urls/custom-processes.constants';

@Injectable({
  providedIn: 'root'
})
export class FormRendererService {
  private form: FormGroup = new FormGroup({});
  validationMessages: any;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private cd: ChangeDetectorRef
  ) {
    // this.validationMessages = this.getValidationMessages();
  }

  buildForm(data: IFormBuilder[]): void {
    this.form = new FormGroup({});
    for(let i = 0; i < data.length; i++) {
        this.form.addControl(data[i].field_name, this.fb.control(data[i].value, data[i] && data[i].validationType && JSON.parse(data[i].validationType).required? Validators.required: null));
        if(data[i].optionsType === optionsType.data_set) {
          this.getDataSets(data[i].optionsDataSetId, data[i].value)
            .subscribe((response: IApiResult) => {
              if(response.Success){
                data[i].optionsData = response.Results;
                this.cd.markForCheck();
              }
            });
        }

        if(data[i].optionsType === optionsType.cascade && (data[i].optionsDataSetId)) {
          this.getDataSets(data[i].optionsDataSetId, data[i].value)
            .subscribe((response: IApiResult) => {
              if(response.Success){
                data[i].optionsData = response.Results;
                this.cd.markForCheck();
                this.destroyed$ = new ReplaySubject(1);
                // Registers the value change to trigger child data set initially on edit
                if(data[i].value){
                  let index = data.map((val) => { return val.field_name; }).indexOf(data[i].extra.field_name);
                  if(index != -1) {
                    // this.form.get(data[index].field_name).setValue(null); // clears child
                    this.getCascadeDataSets(data[i].extra.optionDataSetId, data[i].value, data[i].value)
                    .subscribe((response: IApiResult) => {
                      if(response.Success){
                        data[index].optionsData = response.Results;
                        this.cd.markForCheck();
                      }
                    });
                  }
                }

                if(this.form.get(data[i].field_name)) {
                  this.form.get(data[i].field_name).valueChanges.pipe(takeUntil(this.destroyed$)).subscribe((val)=> {
                    // Registers the value change to trigger child data set
                    let index = data.map((val) => { return val.field_name; }).indexOf(data[i].extra.field_name);
                    if(index != -1) {
                      this.form.get(data[index].field_name).setValue(null); // clears child
                      this.getCascadeDataSets(data[i].extra.optionDataSetId, val, data[i].value)
                      .subscribe((response: IApiResult) => {
                        if(response.Success){
                          data[index].optionsData = response.Results;
                        }
                      });
                    }
  
                  });  
                }              

              }
            });
        }

        if(data[i].widget_id === widgetType.regex_text_box) {

        }
    }
  }

  init(
    data: any
  ) {
    if (data) {
        this.buildForm(data);
    }
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

  getDataSets(id: number, selectedValue: number) :any{
    return this.apiService.read(`${CUSTOM_FORM_URLs.loadDataSets}/${id}${selectedValue?'?datasetValue='+ selectedValue:''}`);
  }

  getCascadeDataSets(cascadeId: any, cascadeTypeId: number, selectedValue: number) :any{
    return this.apiService.read(`${CUSTOM_FORM_URLs.loadCascadeDataSets}/${cascadeTypeId}/${cascadeId}${selectedValue?'?datasetValue='+ selectedValue:''}`);
  }

  destroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
