import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WIDGET_DEFINITION, widgetType, optionsType } from '../config/constants.constant';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IFormBuilder } from '@nutela/models/workforce/employee-profiles';
import { ShowToast } from '@nutela/store/shared';
import { IProcessesState } from '../../../store/root/processes.state';
import { Store, select } from '@ngrx/store';
import { ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs';
import { IBasicData } from '@nutela/models/core-data';
import { getCustomFormDataSetType, getCustomFormCascadeDataSetType } from '../../../store/processes/custom-form';

@Component({
  selector: 'x365-form-builder-editor-form-builder-editor',
  templateUrl: './form-builder-editor.component.html',
  styleUrls: ['./form-builder-editor.component.scss']
})
export class FormBuilderEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('selectOpt') selectOpt: any;
  @ViewChild('cascChild') cascChild: ElementRef;
  @ViewChild('childDataSet') childDataSet: any;

  widgetDefinitionsList = WIDGET_DEFINITION;
  form: FormGroup;
  dataSetTypes$: Observable<IBasicData[]>; // Holds the list of select option dataset type e.g list of employees
  cascadeDataSetTypes$: Observable<IBasicData[]>; // Holds the list of select option cascade dataset type e.g list of states in a country nigeria
  selectOptionTypes = optionsType; // Enumeration for all the types of dropdowns e.g dataset, cascade, simple drop downs


  constructor(private fb: FormBuilder,  private store: Store<IProcessesState>,
    public dialogRef: MatDialogRef<FormBuilderEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFormBuilder) { 
    this.initForm();
  }

  ngOnInit() {
    this.dataSetTypes$ = this.store.pipe(select(getCustomFormDataSetType));
    this.cascadeDataSetTypes$ = this.store.pipe(select(getCustomFormCascadeDataSetType))
    let result = {
      widget_id: this.data.widget_id,
      widget: this.data.widget,
      field_name: this.data.field_name,
      label: this.data.label,
      value: this.data.value,
      type: this.data.type,
      validationType: this.data.validationType,
      extra: (this.data.optionsType === this.selectOptionTypes.cascade)?{ field_name: this.data.extra.field_name, optionDataSetId: this.data.extra.optionDataSetId }:this.data.extra,
      hasOptions: this.data.hasOptions,
      optionsType: this.data.optionsType,
      optionsData: [...this.data.optionsData], 
      optionsDataSetId: this.data.optionsDataSetId
    };
    this.form.patchValue(result);

    if(this.data.widget_id === widgetType.drop_down) {
      this.selectOpt.value = this.data.optionsType;
    }
  }

  ngAfterViewInit() {
    
  }

  submit(ctrlForm) {
    console.log('val', ctrlForm);
    ctrlForm.value.extra = (ctrlForm.value.optionsType === this.selectOptionTypes.cascade)?{ field_name: this.cascChild.nativeElement.value, optionDataSetId: this.childDataSet.value }:ctrlForm.value.extra,
    this.dialogRef.close(ctrlForm);
  }

  initForm() {
    this.form = this.fb.group({
      widget_id: [null],
      widget: [null],
      field_name: [null],
      label: [null],
      value: [null],
      type: [null],
      validationType: [null],
      extra: [null],
      hasOptions: [null],
      optionsType: [null],
      optionsData: [null], 
      optionsDataSetId: [null]
    });
  }

  parseToJson(value): any {
    let result = null;
    try {
      result = JSON.parse(value);
    } catch (e) {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Invalid key pair values', type: ToastTypes.ERROR}));
    }
    return result;
  }

}
